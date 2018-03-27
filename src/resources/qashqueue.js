const QashQueue = require("./models/QashQueue");

function GET() {
  return QashQueue.pendingAmount();
}

function PATCH() {
  return QuashQueue.drainQueue();
}

modules.export = {
  GET,
  PATCH,
};
