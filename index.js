const app = require("express")();

const config = require("./knexfile.js");
const knex = require("knex")(config[process.env.NODE_ENV]);

app.get("/", (req, res) => {
  res.send(process.env.GREETING);
});

app.get("/add/:name", async (req, res) => {
  const color = await knex("colors").insert({
    name: req.params.name,
  });

  const colors = await knex("colors").select();
  res.send(colors);
});

app.get("/list", async (req, res) => {
  const colors = await knex("colors").select();

  res.send(colors);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
