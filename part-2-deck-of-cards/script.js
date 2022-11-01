"use strict";

const $cardButton = $('#get-card-btn');
const $cardList = $('#cards-list');

const BASE_URL = "https://deckofcardsapi.com/api";
const BASE_URL_OUR_DECK = "https://deckofcardsapi.com/api/deck/h9qmtxoemfdv";
const DECK_ID = "h9qmtxoemfdv";

//https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

/**
 * Needs to return deck ID
 */
async function getNewShuffledDeck(){

  const response = await axios({
    url: `${BASE_URL}/deck/new/shuffle/?deck_count=1`,
    method: "GET"
  });

  return response.deck_id;
}


// TODO: make a new deck every time.
// This is for exiting problems down the road! :) :)
// decks persisting over time? 2 weeks... lets just not do this.

//TODO: this needs to also accept the deck ID to do this!!
/**
 * Function queries Cards API to draw one card from our deck
 */

async function getCardImage(deckID){
  const response = await axios({
    url: `${BASE_URL}/deck/${deckID}/draw`,
    method: "GET"
  });

  return response.cards[0].image;
}

//TODO: we're not doing this
/**
 * Function queries Cards API to shuffle our deck.
 */
async function shuffleOurDeck(){
  const response = await axios({
    url: `${BASE_URL_OUR_DECK}/shuffle`,
    method: "GET"
  });

  console.debug(response);
}






async function onStart(){
  //call axios. shuffle preexisting deck.

  // return deckID;
}

const deckID = await onStart();

$cardButton.on('click', handleButtonClick)
