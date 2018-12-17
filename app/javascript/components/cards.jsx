import React from 'react'
import {times, random, partition, map } from 'lodash'

const CardRankMap = {
    'A': ['Ace',  14],
    'K': ['King', 13],
    'Q': ['Queen',12],
    'J': ['Jack', 11]
}

const CardSuitMap = {
    'D': 'Diamonds',
    'C': 'Clubs',
    'H': 'Hearts',
    'S': 'Spades'
}

export const generateDeck = () => {
  let deck = []
  for (let suit of ['D','C','H','S']) {
    for (let j=2; j<=4; j++) {
      times(4, ()=>{deck.push(j+suit)})
    }
    for (let j=5; j<=7; j++) {
      times(3, ()=>{deck.push(j+suit)})
    }
    for (let j=8; j<=10; j++) {
      times(2, ()=>{deck.push(j+suit)})
    }
  }
  times(4, deck.push('JS'))
  times(3, deck.push('JD'))
  times(2, deck.push('JC'))
  times(2, deck.push('QD'))
  deck.push('JH')
  deck.push('QC')
  return shuffle(deck)
}

export const shuffle = (deck, num=10) => {
  const deckSize = deck.length
  const newDeck = [...deck]
  let rand =  random(deckSize-1)
  times(num, ()=>{
    for(let i=0; i<deckSize; i++){
      [newDeck[i], newDeck[rand]] = [newDeck[rand], newDeck[i]];
      rand = random(deckSize-1)
    }
  });
  return newDeck
}

const LawDeck = () => {
  return [
    {
      "card": "2D",
      "text": "YOU GET THE HICCUPS:\nCREATE MI-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('MI-192');
      }
    },
    {
      "card": "2D",
      "text": "CATCHING YOUR THING\nIN YOUR ZIPPER RESULTS\nIN NO SEX FOR TWO WEEKS:\nCREATE ALL NOTES OF FOOD.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('DO-768','RE-384','MI-192','FA-96','SO-48','LA-23','TI-12','DO-6');
      }
    },
    {
      "card": "3D",
      "text": "MASTURBATE...\nLOSE TI-12.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('TI-12');
      }
    },
    {
      "card": "3D",
      "text": "A GOOD MEAL CREATES THE\nFIRST THREE NOTES IN THE\nFOOD OCTAVE...\nCREATE\n DO-768 RE-384 MI-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('DO-768','RE-384','MI-192');
      }
    },
    {
      "card": "4D",
      "text": "FORGET YOUR AIM...\nLOSE RE-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('RE-24');
      }
    },
    {
      "card": "4D",
      "text": "EAT A REALLY HOT PEPPER,\nCREATE ALL HYDROGEN-96.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('FA-96','RE-96');
      }
    },
    {
      "card": "5D",
      "text": "A BEE STINGS YOU...\nTHE PILLS YOU TAKE\nCREATE FA-96 SO-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('FA-96','SO-48');
      }
    },
    {
      "card": "5D",
      "text": "SKIP A MEAL...\nLOSE DO-768.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('DO-768');
      }
    },
    {
      "card": "6D",
      "text": "YOU GET THE FLU...\nLOSE FA-96 AND SO-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('FA-96','SO-48');
      }
    },
    {
      "card": "6D",
      "text": "DO THE SLOW EATING\nEXERCISE: CREATE DO-768.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('DO-768');
      }
    },
    {
      "card": "7D",
      "text": "FORGET TO BREATHE\nWHEN YOU EAT...\nLOSE ALL HYDROGEN-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('MI-192','DO-192');
      }
    },
    {
      "card": "7D",
      "text": "PROPER DIET...\nCREATE T1-12 LA-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('LA-24','TI-12');
      }
    },
    {
      "card": "8D",
      "text": "WATCH AN EMOTIONAL MOVIE:\nCREATE LA-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('LA-6');
      }
    },
    {
      "card": "8D",
      "text": "INTENTIONALLY LIE\nTO THE TEACHER...\nLOSE FA-6 AND THE\nNEXT HIGHEST NOTE FILLED.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('FA-6');
        plyr.takeNotes('HIGHEST-IMPRESSION');
      }
    },
    {
      "card": "9D",
      "text": "A LITTLE ALCOHOL\nCREATE DO-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('DO-6');
      }
    },
    {
      "card": "9D",
      "text": "FAINT FROM THE SIGHT\nOF BLOOD:\nLOSE ALL HYDROGEN-96.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('FA-96','RE-96');
      }
    },
    {
      "card": "10D",
      "text": "WORKING IN THE MINES\nPOISONS YOUR LUNGS...\nLOSE YOUR AIR OCTAVE.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.takeNotes('DO-192','RE-96','MI-48','FA-24','SO-12','LA-6');
      }
    },
    {
      "card": "10D",
      "text": "PRACTICE OPPOSITE\nPOSTURES:\nCREATE ALL HYDROGEN-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.addNotes('LA-24','FA-24','RE-24');
      }
    },
    {
      "card": "JD",
      "text": "MECHANICAL LIFE:\nSTAY ASLEEP FOR\n21 SPACES.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.sleepUntil(21);
      }
    },
    {
      "card": "QD",
      "text": "PUT OTHERS FIRST...\nTRANSFORM EMOTIONS",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.transformEmotions();
      }
    },
    {
      "card": "KD",
      "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH\nFREES YOU FROM ALL\nLAWS OF ACCIDENT.",
      "enforce": function(plyr) {
        plyr.addActiveLaw(this);
      }
    },
    {
      "card": "AD",
      "text": "WALKING TO YOUR CAR DURING\nA THUNDERSTORM AND ZAP,\nYOU ARE HIT BY LIGHTNING:\nINSTANT DEATH!",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Diamonds')) return;
        plyr.experienceDeath();
      }
    },
    {
      "card": "2C",
      "text": "TAKE THE LAW CARD FROM THE\nTOP THAT EQUALS YOUR TYPE\nAND OBEY IT WITHOUT ESCAPE\n(DISCARD LAWS IN BETWEEN).",
      "enforce": function(plyr) {
        let [moons, other_laws] = partition(plyr.active_laws, (card)=>{ return card.rank==CardRankMap['K'][1]; });
        plyr.active_laws = other_laws; // temporarily remove moons: NO ESCAPE!
        var obey_law = nil;
        times(plyr.type, ()=>{ obey_law = this.drawCard(); });
        obey_law.enforce(plyr);
        plyr.active_laws = moons + other_laws; // give moons back
      }
    },
    {
      "card": "2C",
      "text": "LIE STILL FOR ONE HOUR:\nCREATE ALL HYDROGEN-12.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.addNotes('TI-12','SO-12','MI-12');
      }
    },
    {
      "card": "3C",
      "text": "MEMORIZE 1001 WORDS\nAND RECEIVE THE\nMASTER EXERCISES:\nCREATE ALL IMPRESSIONS.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.addNotes('DO-48','RE-24','MI-12','FA-6');
      }
    },
    {
      "card": "3C",
      "text": "FAIL TO INSULATE YOURSELF:\nLOSE FA-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('FA-6');
      }
    },
    {
      "card": "4C",
      "text": "REMEMBERING YOUR OBJECTIVE\nPRAYER: CREATE A MAGNETIC\nCENTER MOMENT.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.card_plays += 1;
      }
    },
    {
      "card": "4C",
      "text": "CIGARETTE SMOKING WIPES\nOUT THE FIRST THREE NOTES\nIN THE AIR OCTAVE...\nLOSE DO-192 RE-96 MI-48",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('DO-192','RE-96','MI-48');
      }
    },
    {
      "card": "5C",
      "text": "HAVE A LAPSE IN\nCONCENTRATION: LOSE DO-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('DO-48');
      }
    },
    {
      "card": "5C",
      "text": "OBEY THE MASTER:\nTRANSFORM ALL MI-12 TO\nFA-6 AND ALL TI-12\n(OR HIGHEST FOOD) TO DO-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.food_diagram.transformMiTi12();
      }
    },
    {
      "card": "6C",
      "text": "SOMEONE STARTLES YOU:\nCREATE DO-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.addNotes('DO-192');
      }
    },
    {
      "card": "6C",
      "text": "INTERNAL CONSIDER:\nLOSE THE FIRST 3 NOTES OF\nFOOD AND AIR AND THE\nFIRST IMPRESSION (3-3-1).",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('DO-768','RE-384','MI-192','DO-192','RE-96','MI-48','DO-48');
      }
    },
    {
      "card": "7C",
      "text": "SWALLOW WATER WHILE\nSWIMMING: LOSE MI-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('MI-48');
      }
    },
    {
      "card": "7C",
      "text": "YOUR UNCONSCIOUS MUSCLE\nMOVEMENT LETS EVERYONE\nKNOW THAT YOU ARE A BOOBY:\nLOSE TI-12 AND LA-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('TI-12','LA-24');
      }
    },
    {
      "card": "8C",
      "text": "PRACTICE THE CHI EXERCISE:\nCREATE ALL HYDROGEN-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.addNotes('DO-48','MI-48','SO-48');
      }
    },
    {
      "card": "8C",
      "text": "TOURING YOUR LAND YOU\nARE BIT BY A SNAKE...\nLOSE DO-6 AND THE NEXT\nHIGHEST NOTE FILLED.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.food_diagram.takeNotes('DO-6','HIGHEST-FOOD');
      }
    },
    {
      "card": "9C",
      "text": "FORGET TO MAKE\nONE THING YOUR GOD:\nLOSE ALL HYDROGEN-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('DO-48','MI-48','SO-48');
      }
    },
    {
      "card": "9C",
      "text": "RIGHT PRAYER:\nCREATE ALL HYDROGEN-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.addNotes('DO-6','LA-6','FA-6');
      }
    },
    {
      "card": "10C",
      "text": "STOP YOURSELF\nAND TAKE A DEEP BREATH:\nSHOCKS FOOD.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.food_diagram.shockFood();
      }
    },
    {
      "card": "10C",
      "text": "GO AGAINST THE WORK\nFOR SELFISH REASONS:\nLOSE ALL IMPRESSIONS.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.takeNotes('DO-48','RE-24','MI-12','FA-6');
      }
    },
    {
      "card": "JC",
      "text": "MECHANICAL LIFE:\nLOSE YOUR SKILLS\nFOR 37 SPACES.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.loseSkillsFor(37);
      }
    },
    {
      "card": "QC",
      "text": "GOD SENDS A MESSAGE AND\nEVERY PERSON RECEIVES IT:\nALL SELF-REMEMBER.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        board.sendMessage("SELF-REMEMBER");
      }
    },
    {
      "card": "KC",
      "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH\nFREES YOU FROM ALL LAWS\nOF CAUSE AND EFFECT.",
      "enforce": function(plyr) {
        plyr.addActiveLaw(this);
      }
    },
    {
      "card": "AC",
      "text": "BITING YOUR NAILS LEADS\nTO A FORM OF CANCER:\nDEATH COMES IN 41 SPACES!",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Clubs')) return;
        plyr.experienceDeath(41);
      }
    },
    {
      "card": "2H",
      "text": "FORGET TO REMEMBER\nTHE COMPLETING PRINCIPLE:\nLOSE DO-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('DO-6');
      }
    },
    {
      "card": "3H",
      "text": "STAND UP TOO FAST:\nLOSE DO-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('DO-192');
      }
    },
    {
      "card": "4H",
      "text": "PICK A CENTER:\nDRAW ONE CARD.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.card_hand.push(board.drawCard());
      }
    },
    {
      "card": "5H",
      "text": "MANIFEST UNCONTROLLED\nIMAGINATION: LOSE LA-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('LA-6');
      }
    },
    {
      "card": "6H",
      "text": "SPEND YOUR DAY IN VANITY\nAND SELF LOVE:\nLOSE MI-12 AND RE-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('RE-24','MI-12');
      }
    },
    {
      "card": "6H",
      "text": "MAKE ONE THING YOUR GOD:\nPLAY ADDITIONAL LAW\nBY CHOICE.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.playChosenLaw();
      }
    },
    {
      "card": "7H",
      "text": "SMOKING POT CREATES\nFA-24 AND SO-12.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.addNotes('FA-24','SO-12');
      }
    },
    {
      "card": "7H",
      "text": "EAT AT A DIRTY\nRESTAURANT: LOSE MI-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('MI-192');
      }
    },
    {
      "card": "8H",
      "text": "PRACTICE THREEFOLD\nATTENTION: ADD THREE\nLAWS TO YOUR LAW PILE.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        times(3, (n)=>{ plyr.law_hand.push(board.drawLawCard()) });
      }
    },
    {
      "card": "8H",
      "text": "LEARN THIRD RESPONSE:\nDRAW FIVE CARDS.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        times(5, (n)=>{ plyr.card_hand.push(board.drawCard()); });
      }
    },
    {
      "card": "9H",
      "text": "BREATHE NEGATIVE IONS:\nSHOCK ALL MI-48 TO LA-6,\nOR ENTER MI-48 IF NONE\nEXISTS.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.food_diagram.shockMI48LA6();
      }
    },
    {
      "card": "9H",
      "text": "HOLDING ACCOUNTS COSTS\nYOU ALL HYDROGEN-12:\nLOSE TI-12 MI-12 SO-12",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('TI-12','SO-12','MI-12')
      }
    },
    {
      "card": "10H",
      "text": "HAVE YOUR COFFEE WHILE\nYOU WATCH THE SUN RISE:\nCREATE ALL HYDROGEN-192.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.addNotes('MI-192','DO-192');
      }
    },
    {
      "card": "10H",
      "text": "A CAR CROSSES MEDIAN,\nHITTING YOU AT 60 MPH:\nLOSE ALL YOUR FOOD.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.takeNotes('DO-768','RE-384','MI-192','FA-96','SO-48','LA-24','TI-12','DO-6');
      }
    },
    {
      "card": "JH",
      "text": "MECHANICAL LIFE:\nLOSE YOUR POWERS\nFOR 33 SPACES.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.losePowersFor(33);
      }
    },
    {
      "card": "QH",
      "text": "PLAY THIS CARD AFTER\nANY ROLL AND TAKE\nTHE OPPOSITE SIDE\nOF THE DIE.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.addActiveLaw(this)
      }
    },
    {
      "card": "KH",
      "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH\nFREES YOU FROM ALL\nLAWS OF FATE.",
      "enforce": function(plyr) {
        plyr.addActiveLaw(this);
      }
    },
    {
      "card": "AH",
      "text": "AN OLD FAMILY DISEASE\nMANIFESTS IN YOUR BEING:\nDEATH COMES IN 27 SPACES!",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Hearts')) return;
        plyr.experienceDeath(27);
      }
    },
    {
      "card": "2S",
      "text": "TAKE ONE LAW CARD FROM\nTHE TOP, WHICH EVERYONE\nMUST OBEY WITHOUT ESCAPE.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        board.sendMessage("OBEY TOP LAW CARD");
      }
    },
    {
      "card": "3S",
      "text": "PRACTICE THE TWO ENDS\nOF THE STICK EXERCISE:\nCREATE DO-48.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.addNotes('DO-48');
      }
    },
    {
      "card": "3S",
      "text": "LAZINESS OF MIND:\nLOSE THE FIRST\nFILLED IMPRESSION.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.takeNotes('LOWEST-IMPRESSION');
      }
    },
    {
      "card": "4S",
      "text": "BREATHE WHEN YOU EAT:\nSHOCK ALL MI-192\nTO TI-12, OR ENTER MI-192\nIF NONE EXISTS",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.food_diagram.shockMI192TI12();
      }
    },
    {
      "card": "4S",
      "text": "YOU GET A POTATO CHIP\nCAUGHT IN YOUR THROAT:\nTHROW UP THE FIRST THREE\nNOTES OF FOOD.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.takeNotes('DO-768','RE-384','MI-192');
      }
    },
    {
      "card": "5S",
      "text": "LAUGHTER!\nCREATES RE-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.addNotes('RE-24');
      }
    },
    {
      "card": "5S",
      "text": "RAMBLE ON AND ON...\nLOSE ALL HYDROGEN-24.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.takeNotes('LA-24','FA-24','RE-24');
      }
    },
    {
      "card": "6S",
      "text": "ASTHMA ATTACK...\nLOSE FA-24 AND SO-12.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.takeNotes('FA-24','SO-12');
      }

    },
    {
      "card": "6S",
      "text": "REMEMBER TO PICK A CENTER:\nPLAY ONE ADDITIONAL LAW\nBY RANDOM DRAW.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.playRandomLaw();
      }
    },
    {
      "card": "7S",
      "text": "A WISE MAN TELLS YOU AN\nANCIENT TRUTH: MI-12 IS\nCREATED IN YOUR BEING.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.addNotes('MI-12');
      }
    },
    {
      "card": "7S",
      "text": "LOSE YOUR TEMPER:\nLOSE MI-12.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.takeNotes('MI-12');
      }
    },
    {
      "card": "8S",
      "text": "FORGET TO PICK A CENTER:\nDISCARD ALL LAW CARDS\nNOT IN PLAY.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.law_hand.discard();
      }
    },
    {
      "card": "8S",
      "text": "IMPROPER BREATHING\nEXERCISE DESTROYS LA-6\nAND THE NEXT HIGHEST\nNOTE FILLED.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.food_diagram.takeNotes('LA-6','HIGHEST-AIR');
      }
    },
    {
      "card": "9S",
      "text": "EXPERIENCE A DEEP CALMNESS\nAFTER LYING STILL FOR\nONE HOUR: CREATE FA-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.addNotes('FA-6');
      }
    },
    {
      "card": "9S",
      "text": "DAY DREAM:\nDISCARD ONE CARD\nBY RANDOM.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.card_hand.discardRandom();
      }
    },
    {
      "card": "10S",
      "text": "MANIFEST FROM CONSCIENCE:\nUSE THIS CARD TO ROLL AGAIN\nAFTER ANY ROLL.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.addActiveLaw(this);
      }
    },
    {
      "card": "10S",
      "text": "DOUBLE CRYSTALLIZE:\nLOSE HALF YOUR CARDS.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.card_hand.loseHalf();
      }
    },
    {
      "card": "JS",
      "text": "FORMATORY:\nLOSE HYDROGEN-6.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.takeNotes('DO-6','LA-6','FA-6');
      }
    },
    {
      "card": "QS",
      "text": "CREATE RIGHT VALUE:\nALL SHOCKS ARE BROUGHT\nTO YOUR BEING.",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.food_diagram.allShocks();
      }
    },
    {
      "card": "KS",
      "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH FREES\nYOU FROM ALL LAWS OF WILL.",
      "enforce": function(plyr) {
        plyr.addActiveLaw(this);
      }
    },
    {
      "card": "AS",
      "text": "A CRAZED IDENTIFIED MAN\nCLIMBS A TOWER AND\nSHOOTS 17 PEOPLE TO DEATH;\nYOU ARE ONE OF THEM!",
      "enforce": function(plyr) {
        if (plyr.hasMoon('Spades')) return;
        plyr.experienceDeath();
      }
    },
    {
      "card": "XJ",
      "text": "ALL THREE-BRAINED BEINGS\nFEEL THE POWER OF ETERNAL\nFORGIVNESS, CANCELS ALL\nLAW CARDS IN PLAY.",
      "enforce": function(plyr) {
        board.sendMessage("CLEAR LAWS");
      }
    },
    {
      "card": "JO",
      "text": "HASNAMUSS:\nEXERCISE NO ROLL OPTIONS\nFOR THE DURATION OF YOUR EXISTENCE.",
      "enforce": function(plyr) {
        this.becomeHasnamuss();
      }
    }
  ]
}

export const Card = ({
  card,
  onClick
}) => {
  const classes = `card ${card.selected ? 'selected' : ''}`
  return <span className={classes} onClick={onClick}>
    {card.c}
  </span>
}

const Hand = ({
  cards,
  onSelect,
}) => {
  const hand = cards.length ? (
    map(cards, (c, i) => { return <Card key={i} card={c} onClick={() => onSelect(i)} /> })
  ) : (
    <span>No Cards.</span>
    )
  return (
    <div className="cards">
      {hand}
    </div>
  )
}
export default Hand
