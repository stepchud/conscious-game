export const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1

  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}
export const tenSides = Dice()
export const sixSides = Dice(6, false)

const SPACES =
  '*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC' +
  //'IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL' +
  //'FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI' +
  //'AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF' +
  'CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*'
export const BoardSpaces = (initSpaces=SPACES) => {
  let spaces = initSpaces

  const spaceMap = {
  '*': 'Wild',
  'F': 'Food',
  'A': 'Air',
  'I': 'Impression',
  'C': 'Card',
  'L': 'Law',
  'D': 'Decay',
  }
  const name = (letter) => spaceMap[letter]
  const getSpaces = () => spaces

  const before = (position) => spaces.slice(0, position)
  const at = (position) => spaces.slice(position, position+1)
  const after = (position) => spaces.slice(position+1, spaces.length)
  const split = (position) => ({
    before: before(position),
    at: at(position),
    after: after(position)
  })

  const convertToDeath = () => {
    spaces = spaces.replace(/L/g, '*');
    spaces = spaces.replace(/C/g, 'D');
    spaces = spaces.split("").reverse().join("");
    return spaces
  }

  return { name, getSpaces, split, convertToDeath }
}

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
