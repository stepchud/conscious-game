class Player {
  constructor(name, board) {
    this.name = name;
    this.asleep = false;
    this.alive = true;
    this.board_position = 0;
    this.type = board.six_sided.roll();
    this.card_hand = _.times(7, ()=>{
      return board.drawLawCard();
    });
    this.law_hand = _.times(3, ()=>{
      return board.drawCard();
    });
    this.active_laws = [];
    this.level_of_being = new CommonMan();
    this.card_plays = this.level_of_being.cardPlays();
    this.parts_of_parts = new PartsOfParts();
    this.food_diagram = new FoodDiagram();
  }

  // Food Diagram
  addNotes(notes) {
    this.food_diagram.add(notes);
  }

  takeNotes(notes) {
    this.food_diagram.remove(notes);
  }

  // Active Laws
  addActiveLaw(card) {
    this.active_laws.push(card);
  }

  hasMoon(suit) {
    return _.includes(this.active_laws, (card) => { return card.cardName()===`King of ${suit}`; });
  }

  playsPerTurn() {
    return level_of_being.cardPlays();
  }

  // Level of Being
}

class FoodDiagram {
  constructor() {
    this.inPlace = {
      food:        [1,1,1,0,0,0,0,0,0],
      air:         [1,1,1,0,0,0,0],
      impressions: [1,0,0,0,0]
    }
  }

  add(notes) {
    let {food, air, impressions} = convertNotes(notes);
    // place in empty notes
    _.each(food, (n,i) => {
      if (n && !this.inPlace.food[i]) {
        this.inPlace.food[i]++;
        food[i]--;
      }
    });
    _.each(air, (n,i) => {
      if (n && !this.inPlace.air[i]) {
        this.inPlace.air[i]++;
        air[i]--;
      }
    });
    _.each(impressions, (n,i) => {
      if (n && !this.inPlace.impressions[i]) {
        this.inPlace.impressions[i]++;
        impressions[i]--;
      }
    });
    // remaining notes must rise
    while(!_.isEmpty(food.concat(air,impressions))) {
      // first try to place chip at note. if full, move chip up one spot
      // C-6
      if (fo[7]>0) {
        if (!fd.hasChip(FOOD, 7)) {
          fd.putChip(FOOD, 7);
          fo[7]--;
        }
        excessFood += fo[7];
        fo[7]=0;
      }
      if (ao[5]>0) {
        if (!fd.hasChip(AIR, 5)) {
          fd.putChip(AIR, 5);
          ao[5]--;
        }
        excessAir += ao[5];
        ao[5]=0;
      }
      if (io[3]>0) {
        if (!fd.hasChip(IMP, 3)) {
          fd.putChip(IMP, 3);
          io[3]--;
        }
        excessImp += io[3];
        io[3]=0;    
      }
      // C-12
      while (fo[6]>0) {
          if (!fd.putChip(FOOD, 6)) {
          CBGDlgFactory.displayMessage("You drew a card by Higher 12.");
              fd.getPlayer().drawPOCCard(true);
      } 
          fo[6]--;
      }
      while (io[2]>0) {
          if (!fd.putChip(IMP, 2)) {
              CBGDlgFactory.displayMessage("You drew a card by Higher 12.");
              fd.getPlayer().drawPOCCard(true);
          }
          io[2]--;
      }
      if (ao[4]>0) {
          if (!fd.hasChip(AIR, 4)) {
              fd.putChip(AIR, 4);
              ao[4]--;
          }
          ao[5]=ao[4];
          ao[4]=0;
      }
      // C-24
      if (fo[5]>0) {
          if (!fd.hasChip(FOOD, 5)) {
              fd.putChip(FOOD, 5);
              fo[5]--;
          }
          if (fd.has6()) {
              fo[6]=fo[5];
          } else if (fo[5]>0){
              CBGDlgFactory.displayMessage("No Hydrogen-6 for food.");
          }
          fo[5]=0;
      }
      if (io[1]>0) {
          if (!fd.hasChip(IMP, 1)) {
              fd.putChip(IMP, 1);
              io[1]--;
          }
          if (fd.has6()) {
              io[2]=io[1];
          } else if (io[1]>0) {
              CBGDlgFactory.displayMessage("No Hydrogen-6 for impression.");
          }
          io[1]=0;
      }
      if (ao[3]>0) {
          if (!fd.hasChip(AIR, 3)) {
              fd.putChip(AIR, 3);
              ao[3]--;
          }
          // don't care about H-6 for air octave
          ao[4]=ao[3];
          ao[3]=0;
      }
      // C-48
      if (fo[4]>0) {
          if (!fd.hasChip(FOOD, 4)) {
              fd.putChip(FOOD, 4);
              fo[4]--;
          }
          if (fd.has12()) {
              fo[5]=fo[4];
          } else if (fo[4]>0){
              CBGDlgFactory.displayMessage("No Hydrogen-12 for food.");
          }
          fo[4]=0;
      }
      if (ao[2]>0) {
          if (!fd.hasChip(AIR, 2)) {
              fd.putChip(AIR, 2);
              ao[2]--;
          }
          while (ao[2]>0) {
              if (CBGDlgFactory.giveEWBChoice(fd.getPlayer())) {
                  ao[3]++;
              } else {
                  if (!fd.leaveMI48()) {
                      CBGDlgFactory.displayInformationMessage(
                              "Too Much Air",
                              "Hyper-ventilation - Don't Panic!"
                      );
                  }
              }
              ao[2]--;
          }
      }
      if (io[0]>0) {
          if (!fd.hasChip(IMP, 0)) {
              fd.putChip(IMP, 0);
              io[0]--;
          }
          while (io[0]>0) {
              if (CBGDlgFactory.giveSelfRemChoice(fd.getPlayer())) {
                  io[1]++;
                  if (fd.takeChip(AIR, 2)) {
                      CBGDlgFactory.displayMessage("Self-remembering shocks air.");
                      ao[3]++;
                  }
              } else {
                  if (!fd.leaveDO48()) {
                      CBGDlgFactory.displayInformationMessage(
                              "Too Many Impressions",
                              "Pouring from the empty into the void."
                      );
                  }
              }
              io[0]--;
          }
      }
      // C-96
      if (ao[1]>0) {
          if (!fd.hasChip(AIR, 1)) {
              fd.putChip(AIR, 1);
              ao[1]--;
          }
          if (fd.has24()) {
              ao[2]=ao[1];
          } else if (ao[1]>0){
              CBGDlgFactory.displayMessage("No Hydrogen-24 for air.");
          }
          ao[1]=0;
      }
      if (fo[3]>0) {
          if (!fd.hasChip(FOOD, 3)) {
              fd.putChip(FOOD, 3);
              fo[3]--;
          }
          if (fd.has24()) {
              fo[4]=fo[3];
          } else if (fo[3]>0){
              CBGDlgFactory.displayMessage("No Hydrogen-24 for food.");
          }
          fo[3]=0;
      }
      // C-192
      if (fo[2]>0) {
          if (!fd.hasChip(FOOD, 2)) {
              fd.putChip(FOOD, 2);
              fo[2]--;
          }
          while (fo[2]>0) {
              if (CBGDlgFactory.giveBWEChoice(fd.getPlayer())) {
                  fo[3]++;
                  fo[2]--;
              } else {
                  if (!fd.leaveMI192()) {
                      CBGDlgFactory.displayInformationMessage(
                              "Too Much Food",
                              "BURRRP - Indigestion!"
                      );
                  }
                  fo[2]--;
              }
          }
      }
      if (ao[0]>0) {
          if (!fd.hasChip(AIR, 0)) {
              fd.putChip(AIR, 0);
              ao[0]--;
          }
          if (fd.has48()) {
              while (ao[0]>0) {
                  ao[1]++;
                  ao[0]--;
                  if (fd.takeChip(FOOD, 2)) {
                      CBGDlgFactory.displayMessage("Air at RE-96 shocks food.");
                      fo[3]++;
                  }
              }
          } else if (ao[0]>0){
              CBGDlgFactory.displayMessage("No Hydrogen-48 for air.");
          }
          ao[0]=0;
      }
      // C-384
      if (fo[1]>0) {
          if (!fd.hasChip(FOOD, 1)) {
              fd.putChip(FOOD, 1);
              fo[1]--;
          }
          if (fd.has96()) {
              fo[2]=fo[1];
          } else if (fo[1]>0) {
              CBGDlgFactory.displayMessage("No Hydrogen-96 for food.");
          }
          fo[1]=0;
      }
      // C-768
      if (fo[0]>0) {
          if (!fd.hasChip(FOOD, 0)) {
              fd.putChip(FOOD, 0);
              fo[0]--;
          }
          if (fd.has192()) {
              fo[1]=fo[0];
          } else if (fo[0]>0) {
              CBGDlgFactory.displayMessage("No Hydrogen-192 for food.");
          }
          fo[0]=0;
      }
    }
  }

  remove(notes) {
    let {food, air, impressions} = convertNotes(notes);
    _.each(food,        (n,i) => { if(n){ this.inPlace.food[i]=0; } });
    _.each(air,         (n,i) => { if(n){ this.inPlace.air[i]=0; } });
    _.each(impressions, (n,i) => { if(n){ this.inPlace.impressions[i]=0; } });
  }

  note(n) {
    switch(n) {
    case 'DO-768':
      return food[0];
    case 'RE-384':
      return food[1];
    case 'MI-192':
      return food[2];
    case 'FA-96' :
      return food[3];
    case 'SO-48' :
      return food[4];
    case 'LA-24' :
      return food[5];
    case 'TI-12' :
      return food[6];
    case 'DO-6'  :
      return food[7];
    case 'DO-192':
      return air[0];
    case 'RE-96' :
      return air[1];
    case 'MI-48' :
      return air[2];
    case 'FA-24' :
      return air[3];
    case 'SO-12' :
      return air[4];
    case 'LA-6'  :
      return air[5];
    case 'DO-48' :
      return impressions[0];
    case 'RE-24' :
      return impressions[1];
    case 'MI-12' :
      return impressions[2];
    case 'FA-6'  :
      return impressions[3];
    }
  }

  convertNotes(string_array) {
    let food=[0,0,0,0,0,0,0,0], air=[0,0,0,0,0,0], impressions=[0,0,0,0], idx;
    string_array.forEach((string) => {
      switch(string) {
        case 'DO-768':
          food[0] += 1;
          break;
        case 'RE-384':
          food[1] += 1;
          break;
        case 'MI-192':
          food[2] += 1;
          break;
        case 'FA-96' :
          food[3] += 1;
          break;
        case 'SO-48' :
          food[4] += 1;
          break;
        case 'LA-24' :
          food[5] += 1;
          break;
        case 'TI-12' :
          food[6] += 1;
          break;
        case 'DO-6'  :
          food[7] += 1;
          break;
        case 'DO-192':
          air[0] += 1;
          break;
        case 'RE-96' :
          air[1] += 1;
          break;
        case 'MI-48' :
          air[2] += 1;
          break;
        case 'FA-24' :
          air[3] += 1;
          break;
        case 'SO-12' :
          air[4] += 1;
          break;
        case 'LA-6'  :
          air[5] += 1;
          break;
        case 'DO-48' :
          impressions[0] += 1;
          break;
        case 'RE-24' :
          impressions[1] += 1;
          break;
        case 'MI-12' :
          impressions[2] += 1;
          break;
        case 'FA-6'  :
          impressions[3] += 1;
          break;
        case 'HIGHEST-FOOD':
          idx = _.findLastIndex(this.inPlace.food);
          food[idx] += 1;
          break;
        case 'HIGHEST-AIR':
          idx = _.findLastIndex(this.inPlace.air);
          air[idx] += 1;
          break;
        case 'LOWEST-IMPRESSION':
          idx = _.findIndex(this.inPlace.impressions);
          impressions[idx] += 1;
          break;
        case 'HIGHEST-IMPRESSION':
          idx = _.findLastIndex(this.inPlace.impressions);
          impressions[idx] += 1;
          break;
      }
    });
    return {food, air, impressions};
  }
}
