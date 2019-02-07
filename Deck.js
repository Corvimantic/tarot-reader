const Deck = function() {
  this.cards = [];
  this.stacks = [];
};

Deck.prototype.shuffle = function() {
  this._initializeDeck();
  for (var i = this.cards.length - 1; i > 0; i--) {
    const n = pickRandomInt(i);
    this._swapCards(n, i);
  }
};

Deck.prototype.cut = function() {
  for (var i = 0; i < 3; i++) {
    const stack = this.cards.splice(0, 26);
    this.stacks.push(stack);
  }
};

Deck.prototype.chooseFromTop = function(stack, amount) {
  if (typeof amount !== 'number') {
    amount = 1;
  }
  const selection = [];
  if (stack === 0 || stack === undefined) {
    for (var i = 0; i < amount; i++) {
      selection.push({
        card: this.cards.shift(),
        position: choosePosition(),
      });
    }
  } else {
    for (var i = 0; i < amount; i++) {
      selection.push({
        card: this.stacks[stack - 1].shift(),
        position: choosePosition(),
      });
    }
  }
  return selection;
};

Deck.prototype._initializeDeck = function() {
  this.cards = [];
  this.stacks = [];
  majorArcana.forEach((card) => {
    this.cards.push(card);
  });
  minorArcana.forEach((card) => {
    this.cards.push(card);
  });
}

Deck.prototype._swapCards = function(a, b) {
  const card1 = this.cards[a];
  const card2 = this.cards[b];
  this.cards[a] = card2;
  this.cards[b] = card1;
};

const pickRandomInt = function(max) {
  return Math.floor(Math.random() * max);
};

const choosePosition = function() {
  const random = pickRandomInt(2);
  if (random === 0) {
    return 'upright';
  }
  return 'reversed';
}

const generateMinorArcana = function() {
  const suits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
  const numbers = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
  const minorArcana = [];
  suits.forEach((suit) => {
    numbers.forEach((number) => {
      minorArcana.push(`${number} of ${suit}`);
    });
  })
  return minorArcana;
}

const majorArcana = ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World']
const minorArcana = generateMinorArcana();
