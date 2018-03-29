const Koa = require("koa");
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser");

// Resources
const purchase = require("./resources/purchase");
const qashqueue = require("./resources/qashqueue");

const app = new Koa();
const router = new Router();


// Status check
router.get("/", (ctx, next) => {
  // Extract boilerplate?
  ctx.body = "ok";
  next();
});


// User
// Login
// Session

// Pay methods
router.post("/purchases", async (ctx, next) => {
  const token = ctx.request.body.token;
  const amount = ctx.request.body.amount;  // Amount in cents
  const uuid = ctx.request.body.uuid;  // Used for idempotence

  if (!token || !amount || !uuid) {
    ctx.status = 400;
    ctx.body = "Missing required params";
    return next();
  }
  const charge = await purchase.resource.POST(token, amount, uuid);

  ctx.body = charge;
  next();
});

router.get("/purchases/:chargeId", async (ctx, next) => {
  const chargeId = ctx.params.chargeId;
  const charge = await purchase.resource.GET(chargeId);

  ctx.body = charge;
  next();
});
// Get Payment history:
// Not available until logins cause we don't want to expose customer ids

// Send to Queue
router.get("/qash", (ctx, next) => {
  ctx.body = qashqueue.GET();
  next();
});

router.patch("/qash", (ctx, next) => {
  ctx.body = qashqueue.PATCH();
  next();
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

console.log("Starting app on 8000")
app.listen(8000);
