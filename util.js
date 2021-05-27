export const randomChoice = (choices) => {
  return choices[Math.floor(Math.random() * choices.length)]
}

export const randomInt = (min, max, seed = undefined) => {
  return Math.floor(Math.random(seed) * ((max + 1) - min)) + min;
};

export const throttle = (func, wait, options) => {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    'maxWait': wait
  })
};