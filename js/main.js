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

candidature.forEach(function(candidaturaSingola) {
    let stringaCandidatura = `${candidaturaSingola.company} - ${candidaturaSingola.role} - ${candidaturaSingola.status} - ${candidaturaSingola.date}`;

    let liCandidatura = document.createElement("li");
    liCandidatura.textContent = stringaCandidatura;

    ulCandidature.appendChild(liCandidatura);

});