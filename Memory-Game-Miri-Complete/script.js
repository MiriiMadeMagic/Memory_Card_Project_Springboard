const gameContainer = document.getElementById("game");
// variables for the flipped cards to be stored in as well as amount of cards to
// do notClick establishes that additional cards cannot be selected
let firstCard = null;
let secondCard = null;
let numCardsFlipped = 0;
let doNotClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
//implementing the noclicking so that the user cannot click more than once
if(doNotClick) return;
//if the target has a class of flipped it cannot be flipped again
if(event.target.classList.contains("flipped")) return;
//the target of a click now becomes flipped
let currentCard = event.target;
//each of the colors is an indice of the classList; the card that is clicked is going to be the 0th index of the classlist
currentCard.style.backgroundColor = currentCard.classList[0];
//if we click on a card and we dont have two cards yet add the class of flipped to the
if(!firstCard || !secondCard) {
  currentCard.classList.add("flipped");
  //firstCard is set to itself or currentCard
  firstCard  = firstCard || currentCard;
  //if firstCard is the current card then dont assign secondCard yet otherwise it secondCard and assign it current cards
  secondCard = currentCard === firstCard ? null : currentCard;
}

//If we have both cards face we temp disable the ability to click
if(firstCard && secondCard) {
  doNotClick = true;
  //the grabs the classnames of the cards to compare 
  let check1 = firstCard.className;
  let check2 = secondCard.className;
  // if the cards are the same remove their event listener, keep track of the amnt of cards flipped
  if (check1 === check2) {
    numCardsFlipped += 2;
    firstCard.removeEventListener( "click", handleCardClick);
    secondCard.removeEventListener( "click", handleCardClick);
    firstCard = null;
    secondCard = null;
    doNotClick = false;
  } else {
  //reset the backgroundColor and flip the cards downs again if they are not matching
    setTimeout(function() {
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard = null;
    secondCard = null;
    doNotClick = false;
    }, 1000);
  }
}
if(numCardsFlipped === COLORS.length) alert("Game Over Pal!");

};
// when the DOM loads
createDivsForColors(shuffledColors);

