export const randomChoice = (choices) => {
  return choices[Math.floor(Math.random() * choices.length)]
}

export const randomInt = (min, max, seed = undefined) => {
  return Math.floor(Math.random(seed) * ((max + 1) - min)) + min;
};
