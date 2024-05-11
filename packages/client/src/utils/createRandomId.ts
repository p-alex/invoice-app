function createRandomId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      const rng = Math.floor(Math.random() * letters.length);
      result += letters[rng];
    } else {
      const rng = Math.floor(Math.random() * numbers.length);
      result += numbers[rng];
    }
  }

  return result;
}

export default createRandomId;
