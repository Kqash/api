const Koa = require("koa");
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser");

// Resources
const purchase = require("./resources/purchase");

const app = new Koa();
const router = new Router();


// Status check
router.get("/" (ctx, next) => {
  // Extract boilerplate?
  ctx.body = "ok";
  next();
});


// User
// Login
// Session


// Pay methods
router.Post("/purchase", async (ctx, next) => {
  const token = ctx.request.body.token;
  const amount = ctx.request.body.amount;  // Amount in cents
  const uuid = ctx.request.body.uuid;  // Used for idempotence

  if (!token || !amount || !uuid) {
    ctx.status = 400;
    ctx.body = "Missing required params";
    return next();
  }
  const charge = await purchase.POST(token, amount, uuid);

  ctx.body = charge;
  next();
});
// Get Payment history
// Send to Queue

app
  .use(bodyParser())
  .use(router.routes());
  .use(router.allowedMethods());

app.listen(8000);
