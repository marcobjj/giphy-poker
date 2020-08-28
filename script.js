var CCDeck = ["2C","3C","4C","5C", "6C","7C","8C","9C","10C","JC","QC","KC","AC"];
var SSDeck = ["2S","3S","4S","5S", "6S","7S","8S","9S","10S","JS","QS","KS","AS"];
var HHDeck = ["2H","3H","4H","5H", "6H","7H","8H","9H","10H","JH","QH","KH","AH"];
var DDDeck = ["2D","3D","4D","5D", "6D","7D","8D","9D","10D","JD","QD","KD","AD"];

var pc1 = {cards:[],name:"Marco Evangelista"};
var pc2 = {cards:[],name:"Phil Hellmuth"};
var pc3 = {cards:[],name:"Mel Gibson"};
var pc4 = {cards:[],name:"Asian Andy"};

var players = [pc1,pc2,pc3,pc4];

var fullDeck = [];
var communityCards = [];

var winner = null;

var rounds = {

round:"",
nextRound: function (){

    if(this.round=="pre-flop") this.round = "flop";
    else if(this.round=="flop") this.round = "turn";
    else if(this.round=="turn") this.round = "river";
    else if(this.round=="river") getWinner();
    else if(this.round=="") this.round = "pre-flop";

    return this.round;

}


}

var displayRound = function (){

    var round = rounds.nextRound();

    if(round=="pre-flop") { hideShow([1,2,3,4,5],[])}
    else if(round=="flop") {hideShow([4,5],[1,2,3])}
    else if(round=="turn") {hideShow([5],[1,2,3,4])}
    else if(round=="river") {hideShow([],[1,2,3,4,5])}


}


function hideShow(array1,array2)
{

for(var i=0; i<array1.length;i++)
{

   var n = array1[i];
   var card = document.querySelector("#card"+n);
   card.style.display = 'none';

}

for( i=0; i<array2.length;i++)
{
   n = array2[i];
   var card1 = document.querySelector("#card"+n);
   card1.style.display = 'inline';

}

}


var distribute = function (){


    concat(fullDeck,CCDeck);
    concat(fullDeck,SSDeck);
    concat(fullDeck,HHDeck);
    concat(fullDeck,DDDeck);

    fullDeck = shuffle(fullDeck);

    pc1.cards.push(fullDeck[0]);
    pc1.cards.push(fullDeck[1]);
    pc2.cards.push(fullDeck[2]);
    pc2.cards.push(fullDeck[3]);
    pc3.cards.push(fullDeck[4]);
    pc3.cards.push(fullDeck[5]);
    pc4.cards.push(fullDeck[6]);
    pc4.cards.push(fullDeck[7]);

    communityCards.push(fullDeck[8]);
    communityCards.push(fullDeck[9]);
    communityCards.push(fullDeck[10]);
    communityCards.push(fullDeck[11]);
    communityCards.push(fullDeck[12]);

    console.log(pc1.cards.join());
    console.log(pc2.cards.join());
    console.log(pc3.cards.join());
    console.log(pc4.cards.join());

    callAPI();

}

function concat(array1, array2){

    for (var i=0; i < array2.length; i++)
    {

        array1.push(array2[i]);

    }
}

function callAPI()
{

    var url = 'https://api.pokerapi.dev/v1/winner/texas_holdem?cc='+communityCards.join()+"&pc[]="+pc1.cards.join()+"&pc[]="+pc2.cards.join()+"&pc[]="+pc3.cards.join()+"&pc[]="+pc4.cards.join();
    console.log(url);
   
    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                {
                    console.log(data);
                    displayCards();
                    setWinner(data);

                }
            })
        }
    })

        
    
}

function setWinner(data){

    winner = data.winners;

}

function getWinner(){


    for (var i=0; i < winner.length; i++)
    {

        var winningHand = winner[i].cards;

        for (var j = 0; j < players.length;j++)
            {

                var playerHand = players[j].cards.join();

                console.log(winningHand+" "+playerHand)

                if(winningHand == playerHand) alert(players[j].name +" Wins with "+winner[i].result);

            }
    }
}

function displayCards()
{

var cc = document.querySelector("#community");
cc.innerHTML = '';

for (var i=0; i < communityCards.length; i++)
{

        var card = document.createElement("div");
        card.setAttribute("class","col-2 mr-3 bg-light rounded poker-card p-2 shadow");
        card.setAttribute("id","card"+(i+1))

        var value = communityCards[i];
        var img = document.createElement("img");
        img.setAttribute("width","16");
        img.setAttribute("height","16");

        var span = document.createElement("span");

        console.log(value);

        if(value[value.length-1] == "D") img.setAttribute("src","assets/images/diamond.svg");
        if(value[value.length-1] == "H") img.setAttribute("src","assets/images/heart.svg");
        if(value[value.length-1] == "S") img.setAttribute("src","assets/images/spade.svg");
        if(value[value.length-1] == "C") img.setAttribute("src","assets/images/club.svg");

        value.length == 3 ? span.textContent = value[0]+value[1] : span.textContent = value[0];

        span.appendChild(img);
        card.appendChild(span);
        
        
        cc.appendChild(card);

}

displayPlayerCards();

displayRound();

}


function displayPlayerCards()
{

    var player = document.querySelector("#player");

    for (var i=0; i < pc1.cards.length; i++)
{

        var card = document.createElement("div");
        card.setAttribute("class","col-2 mr-3 bg-light rounded poker-card p-2 shadow");

        var value = pc1.cards[i];
        var img = document.createElement("img");
        img.setAttribute("width","16");
        img.setAttribute("height","16");

        var span = document.createElement("span");

        console.log(value);

        if(value[value.length-1] == "D") img.setAttribute("src","assets/images/diamond.svg");
        if(value[value.length-1] == "H") img.setAttribute("src","assets/images/heart.svg");
        if(value[value.length-1] == "S") img.setAttribute("src","assets/images/spade.svg");
        if(value[value.length-1] == "C") img.setAttribute("src","assets/images/club.svg");

        value.length == 3 ? span.textContent = value[0]+value[1] : span.textContent = value[0];

        span.appendChild(img);
        card.appendChild(span);
        
        
        player.appendChild(card);

        

}

setupControlPanel(player);

}

function setupControlPanel(player){


    var control = document.createElement("div");

control.setAttribute("class","col-5 ml-5 rounded p-2 shadow border");

player.appendChild(control);

var callBtn = document.createElement("button");
callBtn.setAttribute("class","btn btn-primary");
callBtn.textContent = "Call";

callBtn.addEventListener('click',callHandler);

var foldBtn = document.createElement("button");
foldBtn.setAttribute("class","btn btn-danger ml-2");
foldBtn.textContent = "Fold";

control.appendChild(callBtn);
control.appendChild(foldBtn);


}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.+""
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function callHandler(event){

    displayRound();

  }

  distribute();