const Koa = require("koa");
const Router = require("koa-router")

const app = new Koa();
const router = new Router();


// Status check
router.get("/" (ctx, next) => {
  // Extract boilerplate?
  ctx.body = "ok";
  next();
});


// Pay methods
// Pay
// Get Payment history
// Send to Queue

app
  .use(router.routes());
  .use(router.allowedMethods());

app.listen(8000);
