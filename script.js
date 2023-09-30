function chooseRandomNumber(array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  console.log(randomNumber);
  return array[randomNumber];
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
  }
  return array;
}

// branch 3: add logic to display grid (prompt()) and select card
function runGame() {
  const uniqueCards = [1, 2, 3];
  const pairCards = uniqueCards.concat(uniqueCards);
  const cards = shuffle(pairCards);
  console.log("Shuffled Cards: " + cards);
  const cardIndexLabels = [];
  for (let i = 0; i < cards.length; i++) {
      cardIndexLabels.push(i);
  }

  const enterIndexPhrase = `Enter index to select card`;
  const invalidPhrase = `Invalid selection. Try again.`;

  let isWin = false;
  while (!isWin) {
      let selectionNum = 1;
      let cardIndex1 = prompt(`${enterIndexPhrase} ${selectionNum} \n${cardIndexLabels.join(', ')}`);
      if (cardIndex1 === null) { return; }
      cardIndex1 = parseInt(cardIndex1);
      while (isNaN(cardIndex1) || !cardIndexLabels.includes(cardIndex1)) {
          cardIndex1 = prompt(`${invalidPhrase} \n${enterIndexPhrase} ${selectionNum} \n${cardIndexLabels.join(', ')}`);
          if (cardIndex1 === null) { return; }
          cardIndex1 = parseInt(cardIndex1);
      }
      const card1 = cards[cardIndex1];

      selectionNum = 2;
      let cardIndex2 = prompt(`Flipped over card at index ${cardIndex1} to reveal ${card1}. \n${enterIndexPhrase} ${selectionNum} \n${cardIndexLabels.join(', ')}`);
      if (cardIndex2 === null) { return; }
      cardIndex2 = parseInt(cardIndex2);
      while (isNaN(cardIndex2) || !cardIndexLabels.includes(cardIndex2) || cardIndex2 === cardIndex1) {
          cardIndex2 = prompt(`${invalidPhrase} \nFlipped card: ${card1}. \n${enterIndexPhrase} ${selectionNum} \n${cardIndexLabels.join(', ')}`);
          if (cardIndex2 === null) { return; }
          cardIndex2 = parseInt(cardIndex2);
      }
      const card2 = cards[cardIndex2];

      let phrase2 = `Flipped over card at index ${cardIndex2} to reveal ${card2}.`;
      if (card1 === card2) {
          alert(`${phrase2} \nCards ${card1} and ${card2} match!`);
          cardIndexLabels.splice(cardIndexLabels.indexOf(cardIndex1), 1);
          cardIndexLabels.splice(cardIndexLabels.indexOf(cardIndex2), 1);
      } else {
          alert(`${phrase2} \nCards ${card1} and ${card2} don't match.`);
      }

      isWin = checkWinCondition(cardIndexLabels);
      if (isWin) {
          alert("You won!");
      }
  }
}

function checkWinCondition(cardIndexLabels) {
  if (cardIndexLabels.length > 2) { return false; }
  return true;
}

const card1 = document.querySelector("#card-1");
const card2 = document.querySelector("#card-2");
const card3 = document.querySelector("#card-3");
const card4 = document.querySelector("#card-4");
const card5 = document.querySelector("#card-5");
const card6 = document.querySelector("#card-6");

const card1h = document.querySelector("#card1h");
const card2h = document.querySelector("#card2h");
const card3h = document.querySelector("#card3h");
const card4h = document.querySelector("#card4h");
const card5h = document.querySelector("#card5h");
const card6h = document.querySelector("#card6h");

const cards = [card1, card2, card3, card4, card5, card6];
const cardsH = [card1h, card2h, card3h, card4h, card5h, card6h];

const uniqueCards = [1, 2, 3];
const pairCards = uniqueCards.concat(uniqueCards);
const shuffledCards = shuffle(pairCards);

let selectedCard1;
let selectedCard2;

let isWin = false;

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  cardsH[i].innerHTML = shuffledCards[i];
  card.cardNumber = shuffledCards[i];
  card.index = i;
  card.addEventListener("click", clickLogic);
  cardsH[i].style.visibility = "hidden";
}

function clickLogic(e) {
  const self = e.currentTarget;
  // console.log(self.cardNumber);
  // alert(self.cardNumber);
  // TODO: show card number in GUI (flip card)
  self.style.visibility = "hidden";
  self.nextElementSibling.style.visibility = "visible";
  
  if (!selectedCard1) {
      selectedCard1 = self;
      return;
  }
  selectedCard2 = self;

  // compare cards
  if (selectedCard1.cardNumber === selectedCard2.cardNumber) {
      alert(`Cards ${selectedCard1.cardNumber} and ${selectedCard2.cardNumber} match!`);
      // remove cards, click logic, card image
      cards.pop();
      cards.pop();
      selectedCard1.style.visibility = "hidden";
      selectedCard2.style.visibility = "hidden";
      selectedCard1.removeEventListener("click", clickLogic);
      selectedCard2.removeEventListener("click", clickLogic);
  } else {
      alert(`Cards ${selectedCard1.cardNumber} and ${selectedCard2.cardNumber} don't match.`);
      // flip cards facedown
      selectedCard1.nextElementSibling.style.visibility = "hidden";
      selectedCard1.style.visibility = "visible";
      selectedCard2.nextElementSibling.style.visibility = "hidden";
      selectedCard2.style.visibility = "visible";

  }
  
  selectedCard1 = null;
  selectedCard2 = null;

  isWin = checkWinCondition(cards);
  if (isWin) {
      alert("You won!");
  }
}