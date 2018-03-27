const Promise = require("bluebird");

// Note these are dev keys
const secretKey = "sk_test_rbqdgOEazEqu1Q68AcSEFptv";
const publishableKey = "pk_test_lNd0J3OTyTy1ecIjgc6gd8yb";
const stripe = require("stripe")(secretKey);

async function create (token, amount, uuid) {
  if (!uuid) {
    throw new Error("Unique id required for safety");
  }

  createCharge = Promise.promisify(stripe.charges.create);
  // Take USD for now
  // Will automatically throw the error if we get one
  const charge = await createCharge({
    amount: amount,
    currency: "usd",
    source: token,
    description: "Charge for killer queen credits",
  }, {
    idempotency_key: uuid,
  });
  return charge;
}

async function getSingleCharge(chargeId) {
  const retrieveCharge = Promise.promisify(stripe.charges.retreive);
  const charge = await retrieveCharge({ charge: chargeId })
  return charge;
}

async function getChargesForCustomerId(customerId, pageId)  {
  const options = {
    customer: customerId,
  };
  if (pageId) {
    options.ending_before = pageId;
  }
  return stripe.charges.list(options);
}

module.exports = {
  create,
  getSingleCharge,
  getChargesForCustomerId,
}
