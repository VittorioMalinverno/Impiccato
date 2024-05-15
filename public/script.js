let parola_nascosta = document.getElementById("parola_nascosta");

fetch("/parola")
    .then((response) => response.json())
    .then((parola) => {

        // Ottiene la parola scelta dal server e la visualizza
        let parola_scelta = parola.parola_scelta;

        //stampa in console la parola (così si può barare)
        console.log(parola_scelta);

        // Aggiunge event listeners ai tasti della tastiera
        document.querySelectorAll('.keyboard-button').forEach(button => {
            button.addEventListener('click', function () {
                const lettera = this.textContent; // Ottiene la lettera dal tasto
                verificaLettera(lettera, this); // Verifica la presenza della lettera e aggiorna il tasto
            });
        });

        const verificaLettera = (lettera, tasto) => {

            //così verifico il tasto premuto
            console.log(lettera);

            if (parola_scelta.includes(lettera.toLowerCase())) {
                // La lettera è presente nella parola
                tasto.classList.add('btn-success'); // Cambia il colore in verde
                aggiornaParola(lettera); // Aggiorna la visualizzazione della parola
            } else {
                // La lettera non è presente nella parola
                tasto.classList.add('btn-danger'); // Cambia il colore in rosso
            }
            tasto.disabled = true; // Disabilita il tasto
        }

        const aggiornaParola = (lettera) => {
            let parolaVisibile = parola_nascosta.textContent.split(' ');
            for (let i = 0; i < parola_scelta.length; i++) {
                if (parola_scelta[i] === lettera) {
                    parolaVisibile[i] = lettera;
                }
            }
            parola_nascosta.textContent = parolaVisibile.join(' ');
        }
    });