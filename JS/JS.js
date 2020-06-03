var hrac = 1;
var score1 = 0;
var score2 = 0;
var kolo1 = -1;
var kolo2 = -1;
var turnGuessed;
var pole = [[1, 1, 2, 2], [3, 3, 4, 4], [5, 5, 6, 6], [7, 7, 8, 8]];
shuffle();

function shuffle() {
    var i, temp;
    for (i = 0; i < 20; i++) {
        var r1 = Math.floor(Math.random() * 4);
        var c1 = Math.floor(Math.random() * 4);
        var r2 = Math.floor(Math.random() * 4);
        var c2 = Math.floor(Math.random() * 4);
        temp = pole[r1][c1];
        pole[r1][c1] = pole[r2][c2];
        pole[r2][c2] = temp;
    }
    console.log("Shuffle finished:");
    console.log(pole);
}


function pos(value) {
    if (kolo2 != -1)
        return;
    var row = Math.floor(value / 10);
    var col = value % 10;

    if (pole[row] [col] == 0)
        return;

    console.log("You clicked: row:" + row + " col:" + col);
    if (kolo1 == row * 10 + col)
        return;

    if (pole[row][col] > 0) {
        var source = "loga/img" + pole[row][col] + ".jpg";
        var imageId = "img" + row + col;
        console.log(imageId);
        document.getElementById(imageId).src = source;
    }
    if (kolo1 == -1)
        kolo1 = row * 10 + col;
    else {
        kolo2 = row * 10 + col;
        checkSelectedCards();
    }
}

function turnpozadi() {
    console.log("test");
    var row1 = Math.floor(kolo1 / 10);
    var col1 = kolo1 % 10;
    var row2 = Math.floor(kolo2 / 10);
    var col2 = kolo2 % 10;
    var imageId = "img" + row1 + col1;
    document.getElementById(imageId).src = "loga/pozadi.jpg";
    var imageId = "img" + row2 + col2;
    console.log(imageId);
    document.getElementById(imageId).src = "loga/pozadi.jpg";
    kolo1 = -1;
    kolo2 = -1;
}

function checkSelectedCards() {
    var row1 = Math.floor(kolo1 / 10);
    var row2 = Math.floor(kolo2 / 10);
    var col1 = kolo1 % 10;
    var col2 = kolo2 % 10;

    if (pole[row1][col1] == pole[row2][col2]) {
        //uhadli
        if (hrac == 1) {
            score1++;
        } else {
            score2++;
        }
        turnGuessed = kolo1;
        setTimeout(moveCard, 1500);
        updateScore();
    } else {
        setTimeout(turnpozadi, 1000);
        hrac = hrac == 1 ? 2 : 1;
    }
}


function moveCard() {
    var table;
    if (hrac == 1) {
        table = document.getElementById("tableP1");
    } else {
        table = document.getElementById("tableP2");
    }
    var row1 = Math.floor(kolo1 / 10);
    var col1 = kolo1 % 10;
    var row2 = Math.floor(kolo2 / 10);
    var col2 = kolo2 % 10;
    var imageSource = "loga/img" + pole[row1][col1] + ".jpg";

    var imageId = "img" + row1 + col1;
    document.getElementById(imageId).src = "loga/vyhra.jpg";

    imageId = "img" + row2 + col2;
    document.getElementById(imageId).src = "loga/vyhra.jpg";
    var row = table.insertRow(0);

    var cell = row.insertCell(0);
    cell.innerHTML = "<IMG SRC=\"" + imageSource + "\" WIDTH=\"75\">";

    pole[row1][col1] = 0;
    pole[row2][col2] = 0;

    kolo1 = -1;
    kolo2 = -1;

}

