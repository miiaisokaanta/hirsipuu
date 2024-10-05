// Luetaan muuttujiin käyttöliittymäelementit, joita koodissa tullaan käsittelemään.
const input = document.querySelector('input');
const output = document.querySelector('output');
const span = document.querySelector('span');

//Määritellään taulukkoon sanat, joista arvotaan arvattava sana
const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

//Funktio joka "alustaa" uuden pelin; arvotaan satunnaisluku niin että se "osuu" taulukkoon. Arvattava sana asetetaan muuttujaan (ei näytetä käyttöliittymässä) sekä muuttujaan jonka avulla sana näytetään "peitettynä"
let randomizedWord = ''
let maskedWord = ''   //"peitetty sana", tähän korvataan kirjaimet *-merkillä laskemalla sanan pituus ja toistamalla *-merkkiä
//Tässä koodissa tulostetaan oikea sana myös konsoliin, jolloin sovelluksen kehittäminen on helpompaa, kun oikean sanan tietää (tämän voi sitten poistaa lopulliseen versioon)
let guessCount= 0

const newGame = () => {
    guessCount = 0 //Nollataan laskuri
    span.textContent = guessCount; //Näytä nollattu laskuri
    const random= Math.floor(Math.random() * 10) + 1
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    console.log(randomizedWord)
    output.innerHTML = maskedWord
}

//Toteuta funktio, joka suoritetaan, kun käyttäjä arvaa sanan. Tällöin näytetänä ilmoitus ja kutsutaan newGame-funktiota, joka aloittaa pelin alusta
const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. You needed ${guessCount} guesses`)
    newGame()
}

////Jotta koodista tulee vähän siistimpää, toteutetaan funktio (newGame-funktion teon jälkeen), joka etsii käyttäjän arvaamalla kirjaimella arvattavasta sanasta löydetyt ja korvaa tähdet varsinaisella kirjaimella. Funktio saa parametrina käyttäjän arvauksen (tässä tapauksessa aina yksi kirjain), käy läpi arvattavan sanan merkki kerrallaan ja korvaa tähden, jos kirjain löytyy.
const replaceFoundChars = (guess) => {
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord.substring(i,i+1)
        if (char === guess) {
            let newString = maskedWord.split('') //merkkijono muutetaan taulukoksi (split)
            newString.splice(i,1,guess) //split jälkeen löydetty kirjain korvataan (splice)
            newString = newString.join('') // split jälkeen taulukko muutetaan takaisin merkkijonoksi (join).
            maskedWord = newString
        }
    }
    output.innerHTML = maskedWord
}

newGame()

//Input-kentän tapahtumakäsittelijä suoritetaan, kun käyttäjä painaa painiketta kentässä.
input.addEventListener('keypress',(e) => {
    if (e.key === 'Enter') {   //Jos painike on enter, tarkastetaan vastaus.
        e.preventDefault() //Prevent form submission == Koska input-kenttä on lomakkeen sisällä, selaimen oletustoiminta tekee lomakkeen lähetyksen, missä yhteydessä selain päivittää (refresh) sisällön. Tämä halutaan estää ja toteutetaan preventDefault-metodilla. Näin JavaScript käsittelee käyttäjän syötteet eikä tietoa yritetä selaimen oletustoiminnallisuuden mukaan lähettää jonnekin backendiin käsiteltäväksi

        //Käyttäjän syöte luetaan ja verrataan oikeaan sanaan. Sana on joko arvattu, yhtä kirjainta on arvattu tai käyttäjä on syöttänyt sanan, joka ei ole oikea. I
        const guess = input.value
        guessCount++ //Arvauksen laskuri kasvaa
        span.textContent = guessCount //Näytetään arvausten määrä
        if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
            win()  //Jos sana on arvattu (käyttäjä arvaa tai koko sana paljastunut), kutsutaan funktiota win
        }   else if (guess.length ===1) {
            replaceFoundChars(guess) //Jos käyttäjä on syöttänyt yhden kirjaimen, kutsutaan äsken luotua funktiota välittämällä parametrina käyttäjän arvaus (yksi kirjain)
            if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win() ////Jos sana on arvattu (käyttäjä arvaa tai koko sana paljastunut), kutsutaan funktiota win
            }
        }   else {
            alert("You guessed wrong!") //Jos käyttäjä syöttää enemmän kuin yhden merkin eikä syöte ole arvattava sana, näytetään ilmoitus, että arvaus on väärin.
        }
        input.value=''  //Input-kenttä tyhjennetään, jotta käyttäjä voi syöttää uuden arvauksen.
    }
})



//  ****** Toteuta peliin vielä ominaisuus, joka laskee, montako arvausta käyttäjä on tehnyt ja ilmoittaa arvausten määrän, kun peli päättyy



