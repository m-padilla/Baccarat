/*
Author: Marco Padilla
Date: 05/26/2024
Filename: app.js
Supporting Files: index.html
Date Modified: 05/26/2024
*/

import {buildDeck, drawCards} from './api.js'

const NUM_DECKS = 4;
const NUM_CARDS = 2;

const deck = await buildDeck(NUM_DECKS);

let playerScore = 0;
let bankerScore = 0;

document.getElementById('pbtn').addEventListener("click", play);

document.getElementById('tbtn').addEventListener("click", play);

document.getElementById('bbtn').addEventListener("click", play);

async function play(){
    const playerCards =  await drawCards(deck.deck_id, NUM_CARDS);
    const bankerCards =  await drawCards(deck.deck_id, NUM_CARDS);


    document.getElementById('pcard1').src = playerCards.cards[0].image;
    document.getElementById('pcard2').src = playerCards.cards[1].image;

    document.getElementById('bcard1').src = bankerCards.cards[0].image;
    document.getElementById('bcard2').src = bankerCards.cards[1].image;

    playerScore += checkValue(playerCards.cards[0].value) + checkValue(playerCards.cards[1].value);
    bankerScore += checkValue(bankerCards.cards[0].value) + checkValue(bankerCards.cards[1].value);

    document.getElementById('pScore').innerHTML = reducedScore(playerScore);
    document.getElementById('bScore').innerHTML = reducedScore(bankerScore);
    
    playerThirdCard(reducedScore(playerScore));
    bankerThirdCard(reducedScore(bankerScore), playerThirdCard);
     
}

async function playerThirdCard (score){
    if(score <= 5){
        const newCard = await drawCards(deck.deck_id, 1);

        document.getElementById("pcard3").src = newCard.cards[0].image;

        playerScore += checkValue(newCard.cards[0].value);
        document.getElementById('pScore').innerHTML = reducedScore(playerScore);

        return newCard.cards[0].value;
    }
}

async function bankerThirdCard (bScore, playerThirdCard){
    if(bScore <= 2){
        bankerDrawCard();
    }
    else if (bScore === 3 && playerThirdCard != 8){
        bankerDrawCard();
    }
    else if(bScore === 4 && playerThirdCard >= 2 || playerThirdCard <= 7){
        bankerDrawCard();
    }
    else if (bScore === 5 && playerThirdCard >= 4 || playerThirdCard <= 7){
        bankerDrawCard();
    }
    else if(bScore === 6 && playerThirdCard === 6 || playerThirdCard === 7){
        bankerDrawCard();
    }
    else{
        return;
    }
}

async function bankerDrawCard (){
    const newCard = await drawCards(deck.deck_id, 1);
    
    document.getElementById("bcard3").src = newCard.cards[0].image;

    bankerScore += checkValue(newCard.cards[0].value);
    document.getElementById('bScore').innerHTML = reducedScore(bankerScore);

    return newCard.cards[0];
}

function checkValue (card) {
    
    if(card === "KING"){
        return 0;
    }
    else if(card === "QUEEN"){
        return 0;
    }
    else if(card === "JACK"){
        return 0;
    }
    else if(card === "10"){
        return 0;
    }
    else if(card === "ACE"){
        return 1;
    } 
    else {
        return parseInt(card);
    }

};

function reducedScore (score){
    if(score >= 10){
        return score % 10;
    }
    else{
        return score;
    }
}

function finalScore(pScore, bScore){
    let message = "";
    if(pScore > bScore){
        message = `Player wins with ${pScore} over ${bScore}`;
        return message
    }
    else if (pScore < bScore){
        message = `Banker wins with ${bScore} over ${pScore}`;
        return message;
    }
    else{
        message = `Game end in a tie with ${pScore}`;
        return message;
    }
}