let candidatura1 = {
    company:"IBM",
    role:"Front End Developer",
    status:"Colloquio", 
    date:"19/01/2026",
    id: crypto.randomUUID()
}

let candidatura2 = {
    company:"IBM",
    role:"Full Stack Developer",
    status:"Inviata", 
    date:"15/01/2026",
    id: crypto.randomUUID()
}

let candidatura3 = {
    company:"IBM",
    role:"Back End Developer",
    status:"Standby", 
    date:"11/01/2026",
    id: crypto.randomUUID()
}

// DOM references
const ulCandidature = document.getElementById("applicationsList");
const applicationForm = document.getElementById("applicationForm");
const dialogEdit = document.getElementById("editDialog");
const editCancelBtn = document.getElementById("editCancel");
const editSaveBtn = document.getElementById("editSave");

// Application state
let candidature = [candidatura1, candidatura2, candidatura3];

//Vista Filtrata
let candidatureFiltrate = undefined;

//SORTING 
const statusOrdinamento = document.getElementById("listStatus");
const selectData = document.getElementById("sortBy");
const selectOrdine = document.getElementById("sortDir");

// TIMER PER LOADING
let timeoutID = null;

// Normalizza data
function normalizzaData(dateString) {
  // Rimuovi spazi
  dateString = dateString.trim();
  
  // Verifica se è già in formato YYYY-MM-DD
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateString; // È già normalizzata!
  }

  // Assumendo formato DD/MM/YYYY (italiano)
  const parts = dateString.split('/');
  
  if (parts.length !== 3) {
    throw new Error('Formato data non valido');
  }
  
  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];
  
  return `${year}-${month}-${day}`;
}

// Check se c'è storage
const STORAGE_KEY = "jobTracker_applications";
let storageCandidature = localStorage.getItem(STORAGE_KEY);

if(storageCandidature){
    let candidatureDataNormalizzata = JSON.parse(storageCandidature).map(function(candidatura){
        candidatura.date = normalizzaData(candidatura.date);
        return candidatura;
    })
    candidature = candidatureDataNormalizzata;
}
else{
    let candidatureDataNormalizzata = candidature.map(function(candidatura){
        candidatura.date = normalizzaData(candidatura.date);
        return candidatura;
    })
    candidature = candidatureDataNormalizzata;
}

function saveCandidature(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidature));
}


// Renders the application list based on current state
function renderCandidature(candidatureFiltrate){

    let listaDaMostrare = candidature;

    if(candidatureFiltrate){
        listaDaMostrare = candidatureFiltrate;
    }

    ulCandidature.innerHTML = "";

    listaDaMostrare.forEach(function(candidaturaSingola) {
        let stringaCandidatura = `${candidaturaSingola.company} - ${candidaturaSingola.role} - ${candidaturaSingola.status} - ${ normalizzaData(candidaturaSingola.date)}`;

        let liCandidatura = document.createElement("li");
        liCandidatura.dataset.id = candidaturaSingola.id;
        liCandidatura.textContent = stringaCandidatura;
        ulCandidature.appendChild(liCandidatura);

        let bottoneDelete = document.createElement("button");
        bottoneDelete.addEventListener("click", function () {
            cancellaCandidatura(candidaturaSingola.id);
        });
        bottoneDelete.textContent = "Delete";
        liCandidatura.appendChild(bottoneDelete);


        let bottoneEdit = document.createElement("button");
        bottoneEdit.addEventListener("click", function () {
            modificaCandidatura(candidaturaSingola.id);
        });
        bottoneEdit.textContent = "Edit";
        liCandidatura.appendChild(bottoneEdit);

    });

    // NESSUN RISULTATO
    if (listaDaMostrare.length === 0) {
        statusOrdinamento.textContent = "Nessun Risultato";
    } 
    else if (statusOrdinamento.textContent === "Nessun Risultato") {
        statusOrdinamento.textContent = "";
    } 

}

// First render candidature
renderCandidature();

// Funzione che CREA nuova candidatura
function submitApplicationForm(event){
    event.preventDefault();

    const form = event.target;

    const company = form.company.value;
    const role = form.role.value;
    const status = form.status.value;
    const date = form.date.value;
    const id = crypto.randomUUID();

    /* VALIDAZIONE CAMPI NON VUOTI */
    if ((company.trim().length === 0) || (role.trim().length === 0) || (status.trim().length === 0) || (date.trim().length === 0)){
        alert("Riempi tutti i campi");
        return;
    }

    let nuovaCandidatura = {
        company:company,
        role:role,
        status:status, 
        date:normalizzaData(date),
        id:id
    }

    candidature.push(nuovaCandidatura);

    form.reset();

    // SALVA CANDIDATURE IN BROWSER
    saveCandidature()

    /* NUOVO RENDER CANDIDATURE */
    renderCandidature();
}


// Funzione che cancella id
function cancellaCandidatura(idCancellare){

    if (confirm("Vuoi davvero cancellare la candidatura?") != true) {
        return;
    }

    let newCandidature = candidature.filter(togliIdScelto);

    function togliIdScelto(tuttiID){
        return tuttiID.id != idCancellare;
    }

    candidature = newCandidature;

    // SALVA CANDIDATURE IN BROWSER
    saveCandidature();

    renderCandidature();
}


//Funzione che modifica candidatura con popup modale
function modificaCandidatura(idModificare){

    dialogEdit.showModal();

    function richiamaCandidatura(candidatura) {
        return candidatura.id === idModificare;
    }

    let candidaturaDaModificare = candidature.find(richiamaCandidatura);

    if(!candidaturaDaModificare){
        return;
    }

    const campoEditCompany = document.getElementById("editCompany");
    const campoEditRole = document.getElementById("editRole");
    const campoEditStatus = document.getElementById("editStatus");
    const campoEditDate = document.getElementById("editDate");

    campoEditCompany.value = candidaturaDaModificare.company;
    campoEditRole.value = candidaturaDaModificare.role;
    campoEditStatus.value = candidaturaDaModificare.status;
    campoEditDate.value = candidaturaDaModificare.date;


    editSaveBtn.addEventListener("click", function () {

        if((campoEditCompany.value === "") || (campoEditCompany.value === null) || (campoEditRole.value === "") || (campoEditRole.value === null) || (campoEditStatus.value === "") || (campoEditStatus.value === null) || (campoEditDate.value === "") || (campoEditDate.value === null)){
            alert("Completare tutti i campi");
            return; //break out of the function early
        }

        let candidaturaAggiornata = {
            company:campoEditCompany.value,
            role:campoEditRole.value,
            status:campoEditStatus.value, 
            date:campoEditDate.value,
            id:idModificare
        }

        let candidatureAggiornate = candidature.map(function(candidatura){
            if(candidatura.id === idModificare){
                return candidaturaAggiornata;
            }
            else{
                return candidatura;
            }
        })

        candidature = candidatureAggiornate;

        saveCandidature()

        renderCandidature();

        dialogEdit.close();
    }, {once: true});


    editCancelBtn.addEventListener("click", function () {
        dialogEdit.close();
    }, {once: true});

}


applicationForm.addEventListener('submit', submitApplicationForm);



//FILTRO CANDIDATURE

const bottoneFiltra = document.getElementById("filterButton");

bottoneFiltra.addEventListener("click", function () {
        let testoDaCercare = document.getElementById("searchInput").value;
        let statoDaCercare = document.getElementById("statusFilter").value;

            applicaFiltro(testoDaCercare, statoDaCercare);
        });

function applicaFiltro(testoDaCercare, statoDaCercare){

    candidatureFiltrate = candidature.filter(filtraCandidature);

    function filtraCandidature(candidatura){
        let query = testoDaCercare.trim().toLowerCase();
        let queryStato = statoDaCercare.trim().toLowerCase();
        let company = candidatura.company.trim().toLowerCase();
        let role = candidatura.role.trim().toLowerCase();
        let stato = candidatura.status.trim().toLowerCase();

        let matchTesto = company.includes(query) || role.includes(query);
        let matchStato = stato === queryStato;

        if(queryStato === ""){
            matchStato = true;
        }

        return matchTesto && matchStato;
    }

    if(statusOrdinamento.textContent != "Nessun Risultato"){
        statusOrdinamento.textContent = "";
    }

    renderCandidature(candidatureFiltrate);
}


//RESET FILTRO CANDIDATURE

const bottoneResetFiltri = document.getElementById("resetFiltersButton");

bottoneResetFiltri.addEventListener("click", function(){
    document.getElementById("searchInput").value = "";
    document.getElementById("statusFilter").value = "";
    statusOrdinamento.textContent = "";
    selectData.value = "";
    selectOrdine.value = "asc";
    candidatureFiltrate = undefined;

    renderCandidature();
});




//SORTING

selectData.addEventListener("change", gestisciOrdinamento);

selectOrdine.addEventListener("change", gestisciOrdinamento);

function gestisciOrdinamento(){
    // Cancella eventuale "Pronto" programmato prima
      if (timeoutID !== null) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }

    statusOrdinamento.textContent = "Caricamento";

    timeoutID = setTimeout(function () {
        let vista = [...candidature];
        if(typeof candidatureFiltrate !== 'undefined'){
            vista = [...candidatureFiltrate];
        }

        let vistaOrdinata = vista;

        if(selectData.value === "company"){
            vistaOrdinata = vista.sort(function(a, b) {
                return a.company.localeCompare(b.company);
            });
        }
        else if(selectData.value === "status"){
            vistaOrdinata = vista.sort(function(a, b) {
                return a.status.localeCompare(b.status);
            });
        }
        else if(selectData.value === "date"){
            vistaOrdinata = vista.sort(function(a, b) {
                return a.date.localeCompare(b.date);
            });
        }

        if(selectOrdine.value === "desc"){
            vistaOrdinata = vistaOrdinata.reverse();
        }

        renderCandidature(vistaOrdinata);

        if (vista.length > 0) {
            statusOrdinamento.textContent = "Pronto";
        }
        timeoutID = null;
    }, 400); 
}