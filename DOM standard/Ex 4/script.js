'use strict:'

var points = 0, paragraphs=0;

function onBodyLoad() {
    var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    for (let header of headers){
        header.addEventListener('click', headerClick);
    }
    myGame();
}

function myGame() {
    var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    if (Math.random() < 0.5) {
        changeHeader(headers[Math.trunc(Math.random() * headers.length)]);
    }
    else {
        addParagraph(headers[Math.trunc(Math.random() * headers.length)])
    }

    if (paragraphs == 5) {       
        alert("GAME OVER! Your score: " + points);
        setTimeout(document.location.reload(), 1000);
    }

    console.log("Paragraphs " + paragraphs);
    console.log("Points " + points);
    setTimeout(myGame, Math.floor(Math.random() * (2200 - 700) + 700));
}

function changeHeader(header) {
    header.parentNode.replaceChild(createHeader(), header);
}

function headerClick(e) {
    points += parseInt(e.target.tagName.slice(-1));
}

function createHeader() {
    var level = (Math.floor(Math.random() * 5) + 1).toString()
    var newHeader = document.createElement("h" + level);
    newHeader.appendChild(document.createTextNode("Header level  " + level));
    newHeader.addEventListener('click', headerClick);
    return newHeader;
}

function addParagraph(header) {
    var paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode("Losowy akapit :D"));
    paragraph.addEventListener('click', deleteParagraph);
    header.after(paragraph);
    paragraphs++;
}

function deleteParagraph(e) {
    var paragraph = e.target;
    paragraph.parentNode.removeChild(paragraph);
    points--;
    paragraphs--;
}