const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1

  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}

export const tenSides = Dice()
export const sixSides = Dice(6, false)
export default Dice
