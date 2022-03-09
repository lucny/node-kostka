/* Konstanty označující objekty stránky */
const dice = document.getElementById('dice');
const result = document.getElementById('result');
const play = document.getElementById('play');
/* Proměnná odkazující na formulář */
const savegame = document.getElementById('savegame');
/* Proměnná odkazující na formulářový input zobrazující body */
const points = document.getElementById('points');

/* Globální proměnné */
let hod; // Uložení hodnoty aktuálního hodu
let hody = []; // Pole pro uložení všech hodů
let timer = false; // Proměnná pro uložení časovače

/* Funkce zajišťující animaci */
function animace() {
    // Do proměnné hod bude uloženo náhodné číslo v rozsahu 1-6
    hod = Math.ceil(Math.random() * 6);
    // Změna obrázku podle aktuálního hodu
    dice.src = `img/kostka${hod}.png`;
}

/* Reakce na událost kliknutí na tlačítko HREJ (STOP) */
play.addEventListener('click', function() {
    // Jestliže je timer nastaven na false
    if (!timer) {
        // opakuje se volání funkce animace každých 100 ms
        timer = setInterval(animace, 100);
        // změní se nápis v tlačítku na STOP
        play.innerText = 'STOP'
    } else { // Jestliže timer není false
        // zruší se nastavený timer a zastaví se opakování animace
        clearInterval(timer);
        // proměnná timer je nastavena na false
        timer = false;
        // do pole hody se vloží hodnota aktuálního hodu
        hody.push(hod);
        // do oddílu result se vypíší statistické údaje pomocí funkce statistika()
        result.innerHTML = statistika();
        // změní se nápis v tlačítku na HREJ
        play.innerText = 'HREJ';
        // Když je odhozeno 10 hodů:
        if (hody.length == 10) {
            // znepřístupní se tlačítko HREJ
            play.disabled = true;
            // zobrazí se formulář pro odeslání výsledků
            savegame.style.display = 'block';
            // do inputu s id points se vloží součet bodů
            points.value = sum();
        }
    }
})

/* Funkce pro sečtení všech hodnot v poli hody */
function sum() {
    let suma = 0;
    // metoda forEach postupně prochází všechny prvky pole
    hody.forEach((value) => {
        // a navýší (inkrementuje) proměnnou suma o hodnotu každého prvku
        suma += value;
    })
    // vrací výsledek
    return suma;
}

/* Funkce pro zjištění nejvyšší hodnoty v poli hody */
function max() {
    // výchozí hodnota maxima musí být nastavena na nejnižší možnou hodnotu
    let maximum = 1;    
    hody.forEach((value) => {
        if (value > maximum) {
            maximum = value;
        }
    })
    return maximum;
}

/* Funkce pro zjištění nejnižší hodnoty v poli hody */
function min() {
    // výchozí hodnota minima musí být nastavena na nejvyšší možnou hodnotu
    let minimum = 6;
    hody.forEach((value) => {
        if (value < minimum) {
            minimum = value;
        }
    })
    return minimum;
}

/* Funkce pro vytvoření statistického výpisu údajů */
function statistika() {
    // Do proměnné vypis postupně připojujeme jednotlivé textové řetězce
    let vypis = `<h3>Aktuální hod: ${hod}</h3>`;
    vypis += `<p>Počet hodů: ${hody.length}</p>`;
    vypis += `<p>Součet hodů: ${sum()}</p>`;
    // Metoda .toFixed() zaokrouhlí číslo na požadovaný počet desetinných míst
    vypis += `<p>Průměr hodů: ${(sum() / hody.length).toFixed(2)}</p>`;
    vypis += `<p>MAXIMUM: ${max()}</p>`;
    vypis += `<p>MINIMUM: ${min()}</p>`;
    return vypis;
}