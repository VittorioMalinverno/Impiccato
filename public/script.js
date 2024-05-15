let parola_nascosta = document.getElementById("parola_nascosta");
let errori_fatti = document.getElementById("errori_fatti");
let messaggio_hai_perso = document.getElementById("messaggio_hai_perso");
let immagine_impiccato = document.getElementById("immagine_impiccato");
let errori = 1;

//per recuperare la parola dal server
fetch("/parola")
    .then((response) => response.json())
    .then((parola) => {

        //ottiene la parola scelta dal server e la visualizza
        let parola_scelta = parola.parola_scelta;

        //stampa in console la parola (così si può barare)
        console.log(parola_scelta);

        //imposta i trattini in base alla lunghezza della parola scelta
        parola_nascosta.textContent = '_ '.repeat(parola_scelta.length).trim();

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

                //aumento del contatore degli errori
                errori++;
                errori_fatti.textContent = errori - 1;

                //ricalcola l'immagine dell'impiccato
                immagine_impiccato.src = "./immagini_impiccato/" + errori + ".png";

                //controllo degli errori massimi
                if (errori >= 8) {
                    document.querySelectorAll('.keyboard-button').forEach(button => button.disabled = true);
                    hai_perso();
                }
            }

            //disabilitazione del tasto premuto
            tasto.disabled = true;
        }

        //funzione che aggiorna la parola visualizzata
        const aggiorna_parola = (lettera) => {
            let parola_visibile = parola_nascosta.textContent.split(' ');
            for (let i = 0; i < parola_scelta.length; i++) {
                if (parola_scelta[i].toLowerCase() === lettera.toLowerCase()) {
                    parola_visibile[i] = lettera;
                }
            }
            parola_nascosta.textContent = parola_visibile.join(' ');

            //controllo se hai vinto
            verifica_vittoria();
        }

        //se vinci 
        const verifica_vittoria = () => {
            // Verifica se la parola nascosta non contiene più trattini, indicando che tutte le lettere sono state indovinate
            if (!parola_nascosta.textContent.includes('_')) {
                document.getElementById("hai_vinto").style.display = "flex";
            }
        }

        //se perdi
        const hai_perso = () => {
            messaggio_hai_perso.innerHTML = "Hai perso! La parola era: " + parola_scelta;
            document.getElementById("hai_perso").style.display = "flex";
        }
    });