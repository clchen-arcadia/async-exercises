"use strict";

const BASE_URL_NUMBERS = "http://numbersapi.com";

async function getFourFacts(number){
  // uses promise.all
  const fact1 = getOneFactPromise(number);
  const fact2 = getOneFactPromise(number);
  const fact3 = getOneFactPromise(number);
  const fact4 = getOneFactPromise(number);

  const allPromises = Promise.all(
    [fact1, fact2, fact3, fact4]
  );

  const allFacts = await allPromises;
  console.log('allFacts is', allFacts);
}

async function getOneFactPromise(num){
  //single request

  const response = await axios({
    url: `${BASE_URL_NUMBERS}/${num}?json`,
    method: "GET",
  });

  return response.data.text;
}
