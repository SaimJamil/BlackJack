var suits = ["<p>&spades;<p>", "<p>&clubs;</p>", "<p>&hearts;</p>", "<p>&diams;</p>"];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var deck;
var playerScore = 0;
var dealerScore = 0;
var cardsRemaining = 48;

function createDeck() {
    deck=new Array();
    let weight = 0;
    for (i = 0; i < suits.length; i++) {
        for (j = 0; j < values.length; j++) {
            if (values[j] == 'J' || values[j] == 'Q' || values[j] == 'K')
                weight = 10;
            else if (values[j] == 'A')
                weight = 11;
            else
                weight = parseInt(values[j]);

            var card = { Suit: suits[i], Value: values[j], weights: weight };
            deck.push(card);
        }
    }
    shuffle(deck);
};


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
function start() {
    if (document.getElementById("startbtn").value == "Restart") {
        var phands = document.getElementById("player-hands");
        while (phands.firstChild) {
            phands.removeChild(phands.firstChild);
        }
        var dhands = document.getElementById("dealer-hands");
        while (dhands.firstChild) {
            dhands.removeChild(dhands.firstChild);
        }
    }

    cardsRemaining = 51;

    document.getElementById("dealerscore").innerHTML = "<b>Dealer Score : --</b>";

    document.getElementById("winner").style.display = "none";

    playerScore = 0;
    dealerScore = 0;
    document.getElementById("bottom-Container").style.visibility = "visible";
    document.getElementById("hitbtn").disabled = false;
    document.getElementById("staybtn").disabled = false;
    document.getElementById("startbtn").value = "Restart";
    createDeck();
    renderPlayerCard(deck.pop());
    renderPlayerCard(deck.pop());
    renderDealerCard(deck.pop());
    createHiddenCard();


    document.getElementById("cardsremaining").innerHTML = "<b>"+cardsRemaining.toString()+"</b>";

};
function hitme() {
    let winner;
    renderPlayerCard(deck.pop());
    document.getElementById("cardsremaining").innerHTML ="<b>"+ cardsRemaining.toString()+"</b>";
    if (playerScore > 21) {
        winner = document.getElementById("winner");
        winner.innerHTML ="<b> Winner :Dealer</b>";
        winner.style.display = "flex";
        document.getElementById("hitbtn").disabled = true;
        document.getElementById("staybtn").disabled = true;
    }


}
function stay() {
    document.getElementById("hitbtn").disabled = true;
    document.getElementById("staybtn").disabled = true;

    document.getElementById("dealercard").style.display = "none";
    while (dealerScore < 17) {
        renderDealerCard(deck.pop());
    }
    if (dealerScore > playerScore && dealerScore < 22) {
        winner = document.getElementById("winner");
        winner.innerHTML = "<b>Winner :Dealer</b>";
        winner.style.display = "flex";

    }
    else if (dealerScore == playerScore) {
        winner = document.getElementById("winner");
        winner.innerHTML = "<b>Draw</b>";
        winner.style.display = "flex";

    }
    else {
        winner = document.getElementById("winner");
        winner.innerHTML = "<b>Winner :Player</b>";
        winner.style.display = "flex";

    }
    document.getElementById("dealerscore").innerHTML = "<b>Dealer Score :" + dealerScore+"</b>";
    document.getElementById("cardsremaining").innerHTML = "<b>"+(cardsRemaining+1).toString()+"</b>";



}

function getCardUI(card) {
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = card.Suit + "  " + card.Value;
    return el;
}
function renderPlayerCard(card) {
    var hand = document.getElementById("player-hands");
    hand.appendChild(getCardUI(card));
    playerScore += card.weights;
    document.getElementById("playerscore").innerHTML = "<b>Your Score :" + playerScore+"</b>";
    cardsRemaining--;

}
function renderDealerCard(card) {
    var dhand = document.getElementById("dealer-hands");
    dhand.appendChild(getCardUI(card));
    dealerScore += card.weights;
    cardsRemaining--;

}
function createHiddenCard() {
    var img = document.createElement('img');
    img.setAttribute('src', '\dealercard.jpg');
    img.setAttribute("class", "card");
    img.setAttribute("id", "dealercard");
    img.setAttribute("alt", "The Pulpit Rock");
    var dhand = document.getElementById("dealer-hands");

    dhand.appendChild(img);

}



