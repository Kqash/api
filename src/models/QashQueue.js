// Keep in memory for now, but we'll want to eventually add a db to make this more durable.
// TODO: Refactor this to a class that can be declared as a singleton upon creation.
const queue = [];
const creditValue = 25;  // TODO: Make this configurable.
let remainder = 0;

function addToQueue(amount) {
  if (!amount) {
    return 0;
  }

  let fullCredits = Math.floor(amount / creditValue);
  remainder += amount % creditValue;

  if (remainder / creditValue > 1) {
    fullCredits += Math.floor(remainder / creditValue)
    remainder = remainder % creditValue;
  }

  queue.push(fullCredits);
  return fullCredits;
}

function length() {
  return queue.length;
}

function drainQueue() {
  let credits = 0;
  while(queue.length) {
    credits += queue.pop();
  }
  return credits;
}

module.exports = {
  addToQueue,
  drainQueue,
}
