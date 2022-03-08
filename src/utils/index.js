export const generateRandomNumber = () => {
  //temporarily use this to give each deck a unique ID, this is not ideal
  return Math.floor(Math.random() * 1000000000) + 1;
}