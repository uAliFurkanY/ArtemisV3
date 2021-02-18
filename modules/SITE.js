module.exports = {
  site: async function (c, client, CONFIG, npm) {
    // App view
    app.set("view engine", "ejs");
    app.set("views", "./content/SITE");
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    //require https
    app.use(function (req, res, next) {
      if (req.secure) {
        next();
      } else {
        res.redirect(301, "https://" + req.headers.host + req.url);
      }
    });

    // Asset directories
    app.use("/", express.static("./content/SITE"));

    app.get("/", async (req, res) => {
      async function commandTree() {
        let cats = [];
        await client.commands.forEach(async (com) => {
          if (!cats[com.category]) cats[com.category] = [];
          let usag = getUsage.get(com.name);
          await cats[com.category].push(
            `<div class="tooltip2">
  <br>Command name: \`!${com.name}\`<br>
  <span class="tooltiptext2">
    Command used \`${usag.number}\` times<br>
      Permission level: \`${com.permission}\`<br>
        Explanation: \`${com.explain
          .replace(/\(PREFIX\)/g, "!")
          .replace(/\n/g, "<br>")}\`<br></span></div><br>`
          );
        });
        let doneCats = [];
        let procCats = [];

        await client.commands.forEach(async (cat) => {
          if (!procCats[cat.category]) {
            procCats[cat.category] = "DONE";
            await doneCats.push(
              `<br><h2>Category: ${cat.category}</h2>${await cats[cat.category]}`
            );
          }
        });

        return await doneCats.join("").replace(/\,/g, "\n");
      }

      const test = {
        client: client,
      };

      res.render("index", {
        page: "index",
        test: test,
        data: await commandTree(),
      });
    });

    app.get("*", function (req, res) {
      res.redirect("/");
    });
    const privateKey = fs.readFileSync(await CONFIG.CONFIG("privkey"), "utf8");
    const certificate = fs.readFileSync(await CONFIG.CONFIG("cert"), "utf8");
    const ca = fs.readFileSync(await CONFIG.CONFIG("chain"), "utf8");

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };
    const httpsServer = https.createServer(credentials, app);
    const httpServer = http.createServer(app);

    httpsServer.listen(443, () => {
      //console.log("HTTPS Server running on port 443");
    });

    httpServer.listen(80, () => {
      //console.log("HTTP Server running on port 80");
    });
  },
};
