class Dice {
  constructor(sides=10, zero=true) {
    this.sides = sides;
    // this.zero = zero;
    this.basis = zero ? 0 : 1;
  }

  roll() {
    this.value = Math.floor(Math.random() * this.sides) + this.basis;
    return this.value;
  }

  opposite() {
    return this.sides - this.value + this.basis;
  }
}

class GameBoard {
  const SPACES = "*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC" +
    "IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL" +
    "FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI" +
    "AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF" +
    "CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*";

  constructor(spaces = SPACES) {
    this.game_dice = new Dice();
    this.six_sided = new Dice(6, false);
    this.poc_deck = new PoCDeck();
    this.law_deck = new LawDeck();
    this.spaces = spaces;
    this.death_board = false;
  }

  convertDeathBoard() {
    this.death_board = true;
    this.spaces = this.spaces.replace(/L/g, '*');
    this.spaces = this.spaces.replace(/C/g, 'D');
  }

  reverseBoard() {
    this.spaces = this.spaces.split("").reverse().join("");
  }

  drawCard() {
    return this.poc_deck.drawCard();
  }

  drawLawCard() {
    return this.law_deck.drawCard();
  }
}
