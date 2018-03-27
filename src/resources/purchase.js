const Purchase = require("./models/Purchase");

async function POST (token, amount, uuid) {
  const charge = await Purchase.create(token, amount, uuid);
  // TODO: Format charge for body
  return charge;
}

module.exports = {
  POST,
}
