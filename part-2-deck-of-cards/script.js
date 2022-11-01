"use strict";

const BASE_URL = "https://deckofcardsapi.com/api";

const $cardButton = $('#get-card-btn');
const $cardList = $('#cards-list');


/**
 * Function queries API and returns deckID for a new shuffled deck.
 */
async function getNewShuffledDeck(){

  const response = await axios({
    url: `${BASE_URL}/deck/new/shuffle/?deck_count=1`,
    method: "GET"
  });

  return response.data.deck_id;
}


/**
 * Function queries Cards API to draw one card from our deck.
 * Function accepts deckID and returns image URL from API.
 */

async function getCardImage(deckID){

  const response = await axios({
    url: `${BASE_URL}/deck/${deckID}/draw`,
    method: "GET"
  });

  return response.data.cards[0].image;
}

// NOTE: We're not using this function anymore
/**
 * Function queries Cards API to shuffle our deck.
 */

// async function shuffleOurDeck(){
//   const response = await axios({
//     url: `${BASE_URL_OUR_DECK}/shuffle`,
//     method: "GET"
//   });

//   console.debug(response);
// }

/**
 * Function manipulates DOM and appends picture of card.
 * Function accepts URL for an image.
 */

function putCardOnPage(imageURL) {

  $cardList.append($(`
  <li>
    <img src="${imageURL}">
  </li>
  `));
}

async function handleButtonClick(){

  if(deckID === undefined){
    var deckID = await getNewShuffledDeck();
  }

  let imageURL = await getCardImage(deckID);
  putCardOnPage(imageURL);
}

let deckID;

$cardButton.on('click', handleButtonClick);
