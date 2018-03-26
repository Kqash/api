const Koa = require("koa");
const Detour = require("koa-detour")
const R = require("response-objects");

const app = new Koa();
const router = new Detour();

app.use(router.middleware());

// Status check
router.route("/", {
  GET (ctx) {
    return R.Ok()
  },
});

app.listen(8000);
