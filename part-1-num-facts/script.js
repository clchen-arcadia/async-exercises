"use strict";

const BASE_URL_NUMBERS = "http://numbersapi.com";

const $multiNumFacts = $('#multi-num-facts');
const $oneNumMultiFacts = $('#one-num-multi-facts');

/** Function accepts a number and gets four facts about it
 * from the Numbers API.
 */
async function getFourFacts(number){

  const fact1 = getOneFactPromise(number);
  const fact2 = getOneFactPromise(number);
  const fact3 = getOneFactPromise(number);
  const fact4 = getOneFactPromise(number);

  const allPromises = Promise.all(
    [fact1, fact2, fact3, fact4]
  );

  const allFacts = await allPromises;

  return allFacts;
}

/** Function accepts a number and returns a fact about it (just the text of the fact)
 * From the Numbers API
 */
async function getOneFactPromise(num){

  const response = await axios({
    url: `${BASE_URL_NUMBERS}/${num}?json`,
    method: "GET",
  });

  return response.data.text;
}


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
