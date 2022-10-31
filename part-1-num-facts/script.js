"use strict";

const BASE_URL_NUMBERS = "http://numbersapi.com";
const numList = [5, 7, 13, 22, 36];

const $multiNumFacts = $('#multi-num-facts');
const $oneNumMultiFacts = $('#one-num-multi-facts');

/** Function accepts a number and returns an array of 4 facts
 * from the Numbers API.
 */
async function getFourFacts(number){

  const fact1p = getOneFactPromise(number);
  const fact2p = getOneFactPromise(number);
  const fact3p = getOneFactPromise(number);
  const fact4p = getOneFactPromise(number);

  const allPromises = Promise.all(
    [fact1p, fact2p, fact3p, fact4p]
  );

  const allFacts = await allPromises;

  return allFacts;
}

/** Function accepts a number and returns the promise of the fact (just the text of the fact)
 * From the Numbers API
 */
async function getOneFactPromise(num){

  const response = await axios({
    url: `${BASE_URL_NUMBERS}/${num}?json`,
    method: "GET",
  });

  return response.data.text;
}


/** Takes an array of numbers and calls the API to get facts of those numbers.
 * Returns an object containing the number as key and the fact as value.
 * Return obj ex: { num: fact }
 */
async function getMultiNumFacts(nums){

    const numStr = nums.join(',');

    const response = await axios({
      url: `${BASE_URL_NUMBERS}/${numStr}?json`,
      method: "GET",
    });

    return response.data;
}

/** Gets the Multiple Number facts and displays them as list items on the page
 * Takes the nums array. Returns nothing.
 */
async function putMultiNumFactsOnPage(nums) {

  const numsWithFacts = await getMultiNumFacts(nums);

  for (let fact in numsWithFacts) {
    $multiNumFacts.append($(`
    <li>
      ${numsWithFacts[fact]}
    </li>`));
  }
}

/** Gets the Multiple One-Number Facts and displays them as list items on the page
 * Takes in a single number. Returns nothing.
 */
async function putOneNumMultiFactsOnPage(num){

  const listFacts = await getFourFacts(num);
  for(let fact of listFacts){
    $oneNumMultiFacts.append($(`
    <li>
      ${fact}
    </li>
    `));
  }
}

putOneNumMultiFactsOnPage(42);

putMultiNumFactsOnPage(numList);
