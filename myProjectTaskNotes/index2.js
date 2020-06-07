let arr = []
let idCounter = 0
let images = ['2569919', '3253030', '3349785', '3349784'];
let optionList = [];
let searched = [];
let temp_arr = []

window.onload = function getMemory(){
    if(localStorage.getItem('notes')){
        let storageArr = localStorage.getItem('notes');
        arr = JSON.parse(storageArr);
        buildCard(arr);
    }
}

function addToLocal(note){
    temp_arr.push(note)
    localStorage.setItem('notes', JSON.stringify(temp_arr))
}

function takeValues() {
    idCounter++;
    let note = document.getElementById('note').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    class Note {
        constructor() {
            this.note = note;
            this.date = date;
            this.time = time;
            this.id = idCounter;
        }
    }
    arr.push(new Note)
    addToLocal(new Note)
    makeCard(arr)
    toSelectTag(note)
}

function makeCard(arr) {
    document.getElementById('cards').innerHTML = '';
    buildCard(arr);
}

function searchNote(note) {
    document.getElementById('cards').innerHTML = ''
    note = document.getElementById('search').value;
    arr.forEach(Element => {
        if (Element.note === note) {
            searched.push(Element)
        }
    })
    buildCard(searched)
}

function buildCard(array) {
    array.forEach(Element => {
        let randomNumber = images[Math.floor(Math.random() * images.length)]
        console.log(randomNumber)
        let backgroundColor;
        let delButton;
        if (randomNumber === `3349784`) {
            backgroundColor = '#f2d0a4', delButton = '#f2d0a4';
        }
        if (randomNumber === `2569919`) {
            backgroundColor = '#C8D6AF', delButton = '#C8D6AF';
        }
        if (randomNumber === `3253030`) {
            backgroundColor = '#46acc2', delButton = '#46acc2';
        }
        if (randomNumber === `3349785`) {
            backgroundColor = '#ffeccc', delButton = '#ffeccc';
        }


        let card = document.createElement('div');
        card.className = 'card'
        card.style = `background-color: ${backgroundColor};`


        let cover = document.createElement('div');
        cover.className = 'cover';


        cover.style = `background-image: url(/imgs/${randomNumber}.jpg);`

        let coverFront = document.createElement('div');
        coverFront.className = 'coverFront';

        let coverBack = document.createElement('div');
        coverBack.className = 'coverBack'

        let noteText = document.createElement('div');
        let p = document.createElement('p');
        p.className = `textNote`;

        let cardId = document.createElement('div');
        let span = document.createElement('span');
        cardId.className = 'cardId';
        cardId.appendChild(span);
        span.textContent = Element.id
        card.appendChild(cardId)


        let timeAndDate = document.createElement('p');
        timeAndDate.className = 'timeAndDate'

        let button = document.createElement('button');
        button.textContent = `DELETE`
        button.className = 'del'
        button.style = `background-color: ${delButton};`
        coverBack.appendChild(button);
        button.addEventListener('click', function deleteCard() {
            document.getElementById('cards').removeChild(card)
            console.log(Element.id)
            let noteIndex = arr.map(e => e.id).indexOf(Element.id)
            arr.splice(noteIndex, 1)
            console.log(arr)
            localStorage.setItem('notes',JSON.stringify(arr))
        })

        card.appendChild(cover);
        cover.appendChild(coverFront);
        coverFront.appendChild(timeAndDate);
        timeAndDate.textContent = `Date :\n\n ${Element.date} \n\n time : \n\n ${Element.time}`;
        cover.appendChild(coverBack);
        card.appendChild(noteText);
        noteText.appendChild(p);
        p.textContent = Element.note;

        document.getElementById('cards').appendChild(card);
        optionList.push(Element.note)
    })
}

function toSelectTag(noteText) {
    let option = document.createElement('option');
    option.textContent = noteText
    document.getElementById('search').appendChild(option)
}