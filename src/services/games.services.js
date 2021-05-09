// Random a number between 0 and 12. Equal or more than 7 wins.
const result = () => {
  let score  =  Math.floor(Math.random() * 12);
  let state = score > 7 ? true : false; 
  return [score, state];
};

module.exports = result;