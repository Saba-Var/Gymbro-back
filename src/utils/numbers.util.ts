export const padToTwoDigits = (num: number) => {
  return num.toString().padStart(2, '0')
}

export const getRandomNum = (max = 100) => {
  return Math.floor(Math.random() * max) + 1
}
