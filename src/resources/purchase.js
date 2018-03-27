const Purchase = require("./models/Purchase");

const resource = {
  async POST (token, amount, uuid) {
    const charge = await Purchase.create(token, amount, uuid);
    // Pass through charge, but maybe format one day
    return charge;
  },
  async GET(chargeId) {
    const charge = await Purchase.getSingleCharge(chargeId);
    return charge;
  },
}

const collection = {
  async GET(customerId, pageId){
    const charges = await Purchase.getChargesForCustomerId(customerId, pageId);
    return charges;
  },
}

module.exports = {
  resource,
  collection,
}
