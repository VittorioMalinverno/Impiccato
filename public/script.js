let parola_nascosta = document.getElementById("parola_nascosta");

//per recuperare la parola dal server
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
                const lettera = this.textContent;
                verifica_lettera(lettera, this);
            });
        });

        const verifica_lettera = (lettera, tasto) => {

            //così verifico il tasto premuto
            console.log(lettera);

            // Verifica la presenza della lettera e aggiorna il tasto
            if (parola_scelta.includes(lettera.toLowerCase())) {
                tasto.classList.add('btn-success');
                aggiorna_parola(lettera);
            } else {
                tasto.classList.add('btn-danger');
            }

            //disabilitazione del tasto premuto
            tasto.disabled = true;
        }

        const aggiorna_parola = (lettera) => {
            let parolaVisibile = parola_nascosta.textContent.split(' ');
            for (let i = 0; i < parola_scelta.length; i++) {
                if (parola_scelta[i] === lettera) {
                    parolaVisibile[i] = lettera;
                }
            }
            parola_nascosta.textContent = parolaVisibile.join(' ');
        }
    });