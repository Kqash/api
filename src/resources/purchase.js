const Purchase = require("./models/Purchase");
const QashQueue = require("./models/QashQueue");

const resource = {
  async POST (token, amount, uuid) {
    const charge = await Purchase.create(token, amount, uuid);
    // Add charge to queue to get picked up.

    // Amount we actually got:
    const chargedAmount = charge.amount;
    QashQueue.addToQueue(chargedAmount);
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
