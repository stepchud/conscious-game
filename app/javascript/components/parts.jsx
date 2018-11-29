export const InitialState = {
  food:        [1,1,1,0,0,0,0,0,0],
  air:         [1,1,1,0,0,0,0],
  impressions: [1,0,0,0,0],
  astral: false,
  mental: false
}
export const FoodDiagram = () => {
  // harnel-miaznel by rounds until a gap encounter
  const enter = (fd, entering) => {
    let { food, air, impressions } = entering
    // place in empty notes
    _.each(food, (n,i) => {
      if (n && !fd.food[i]) {
        fd.food[i]++;
        food[i]--;
      }
    });
    _.each(air, (n,i) => {
      if (n && !fd.air[i]) {
        fd.air[i]++;
        air[i]--;
      }
    });
    _.each(impressions, (n,i) => {
      if (n && !fd.impressions[i]) {
        fd.impressions[i]++;
        impressions[i]--;
      }
    });
    // remaining notes must rise
    while(!_.isEmpty(food.concat(air,impressions))) {
      // first try to place chip at note. if full, move chip up one spot
      // C-6
      if (food[7]>0) {
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
}
