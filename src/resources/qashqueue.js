const QashQueue = require("./models/QashQueue");

function GET() {
  return QashQueue.length();
}

function PATCH() {
  return QashQueue.drainQueue();
}

modules.export = {
  GET,
  PATCH,
};
