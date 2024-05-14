let test_parola = document.getElementById("test_parola");

fetch("/parola").then((response) => response.json()).then((parola_scelta) => { render(parola_scelta.parola_scelta) })

const render = (parola_scelta) => {
    test_parola.innerHTML = parola_scelta;
}