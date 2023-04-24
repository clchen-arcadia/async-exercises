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


  console.debug("deckID is", deckID);
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
    deckID = await getNewShuffledDeck();
  }

  let imageURL = await getCardImage(deckID);
  putCardOnPage(imageURL);
}

let deckID;

$cardButton.on('click', handleButtonClick);

/**
 * How to avoid using global variable for deckId?
 * 1. enclosure. define drawCard() within handleButtonClick()
 * 2. create function that assigns deck ID, then defines drawCard() then RETURNS that fn.
 * 3. Use bind to bind context of deckID TO the drawCard() function. same principle as 2.
 * 4. not easy to test. but you can deckID.bind(function drawCardAnon(){})
 */

//NOTE: important naming! factP for promise of fact. factResp for response data object yet to be parsed
