let candidatura1 = {
    company:"IBM",
    role:"Front End Developer",
    status:"Junior", 
    date:"19/01/2026"
}

let candidatura2 = {
    company:"IBM",
    role:"Full Stack Developer",
    status:"Senior", 
    date:"15/01/2026"
}

let candidatura3 = {
    company:"IBM",
    role:"Back End Developer",
    status:"Junior", 
    date:"11/01/2026"
}

const ulCandidature = document.getElementById("applicationsList");

const candidature = [candidatura1, candidatura2, candidatura3];

const applicationForm = document.getElementById('applicationForm');


function renderCandidature(){

    ulCandidature.innerHTML = "";

    candidature.forEach(function(candidaturaSingola) {
        let stringaCandidatura = `${candidaturaSingola.company} - ${candidaturaSingola.role} - ${candidaturaSingola.status} - ${candidaturaSingola.date}`;

        let liCandidatura = document.createElement("li");
        liCandidatura.textContent = stringaCandidatura;

        ulCandidature.appendChild(liCandidatura);

    });

}
/* PRIMO RENDER CANDIDATURE */
renderCandidature();


function submitApplicationForm(event){
    event.preventDefault();

    const form = event.target;

    const company = form.company.value;
    const role = form.role.value;
    const status = form.status.value;
    const date = form.date.value;

    if ((company.trim().length === 0) || (role.trim().length === 0) || (status.trim().length === 0) || (date.trim().length === 0)){
        alert("Riempi tutti i campi");
        return;
    }
    
    let nuovaCandidatura = {
        company:company,
        role:role,
        status:status, 
        date:date
    }

    candidature.push(nuovaCandidatura);

    form.reset();

    /* NUOOVO RENDER CANDIDATURE */
    renderCandidature();
}



applicationForm.addEventListener('submit', submitApplicationForm);