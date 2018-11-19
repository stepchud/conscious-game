export const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1

  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}

export const tenSides = Dice()
export const sixSides = Dice(6, false)

export const SPACES = (
  '*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC' +
  'IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL' +
  'FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI' +
  'AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF' +
  'CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*'
)

export class GameBoard {

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
