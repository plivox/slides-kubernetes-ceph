const crypto = require("crypto");

const createHash = (secret) => {
  return crypto.createCipher("blowfish", secret).final("hex");
};

const secret = (() => {
  const ts = new Date().getTime();
  const rand = Math.floor(Math.random() * 9999999);
  return ts.toString() + rand.toString();
})();

const colors = {
  brown: "\033[33m",
  green: "\033[32m",
};
const reset = "\033[0m";

console.log(`MULTIPLEX_SECRET="${colors.green}${secret}${reset}"`);
console.log(`MULTIPLEX_ID="${colors.green}${createHash(secret)}${reset}"`);
