let candidatura1 = {
    company:"IBM",
    role:"Front End Developer",
    status:"Junior", 
    date:"19/01/2026",
    id: crypto.randomUUID()
}

let candidatura2 = {
    company:"IBM",
    role:"Full Stack Developer",
    status:"Senior", 
    date:"15/01/2026",
    id: crypto.randomUUID()
}

let candidatura3 = {
    company:"IBM",
    role:"Back End Developer",
    status:"Junior", 
    date:"11/01/2026",
    id: crypto.randomUUID()
}

// DOM references
const ulCandidature = document.getElementById("applicationsList");
const applicationForm = document.getElementById("applicationForm");

// Application state
let candidature = [candidatura1, candidatura2, candidatura3];

// Check se c'è storage
const STORAGE_KEY = "jobTracker_applications";
let storageCandidature = localStorage.getItem(STORAGE_KEY);

if(storageCandidature){
    candidature = JSON.parse(storageCandidature);
    console.log("Loaded from storage:", candidature);
}

function saveCandidature(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidature));
}


// Renders the application list based on current state
function renderCandidature(){

    ulCandidature.innerHTML = "";

    candidature.forEach(function(candidaturaSingola) {
        let stringaCandidatura = `${candidaturaSingola.company} - ${candidaturaSingola.role} - ${candidaturaSingola.status} - ${candidaturaSingola.date}`;

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
        date:date,
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

    let newCandidature = candidature.filter(togliIdScelto);

    function togliIdScelto(tuttiID){
        return tuttiID.id != idCancellare;
    }

    candidature = newCandidature;

    // SALVA CANDIDATURE IN BROWSER
    saveCandidature()

    renderCandidature();
}


//Funzione che modifica candidatura
function modificaCandidatura(idModificare){

    function richiamaCandidatura(candidatura) {
        return candidatura.id === idModificare;
    }

    let candidaturaDaModificare = candidature.find(richiamaCandidatura);

    if(!candidaturaDaModificare){
        return;
    }

    let newCompany = prompt("Company", candidaturaDaModificare.company);
    if ((newCompany === "") || (newCompany === null)){
        return; //break out of the function early
    }
    let newRole = prompt("Role", candidaturaDaModificare.role);
    if ((newRole === "") || (newRole === null)){
        return; //break out of the function early
    }
    let newStatus = prompt("Status", candidaturaDaModificare.status);
    if ((newStatus === "") || (newStatus === null)){
        return; //break out of the function early
    }
    let newDate = prompt("Date", candidaturaDaModificare.date);
    if ((newDate === "") || (newDate === null)){
        return; //break out of the function early
    }

    let candidaturaAggiornata = {
        company:newCompany,
        role:newRole,
        status:newStatus, 
        date:newDate,
        id:idModificare
    }

    //Aggiorna array candidature
    let candidatureAggiornate = candidature.map(function(candidatura){
        if(candidatura.id === idModificare){
            return candidaturaAggiornata;
        }
        else{
            return candidatura;
        }
    })

    candidature = candidatureAggiornate;

    // SALVA CANDIDATURE IN BROWSER
    saveCandidature()

    renderCandidature();
}


applicationForm.addEventListener('submit', submitApplicationForm);