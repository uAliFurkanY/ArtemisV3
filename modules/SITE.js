////////////////////////////////////
//Website add module
//gets triggered on READY
////////////////////////////////////
module.exports = {
  site: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //Select engine used
    //In our case its ejs
    ////////////////////////////////////
    app.set("view engine", "ejs");
    app.set("views", "./content/SITE");
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    ////////////////////////////////////
    //Force https
    //triggers a 301 redirect
    ////////////////////////////////////
    app.use(function (req, res, next) {
      if (req.secure) {
        next();
      } else {
        res.redirect(301, "https://" + req.headers.host + req.url);
      }
    });

    ////////////////////////////////////
    //Static content
    //Easy to use
    ////////////////////////////////////
    app.use("/", express.static("./content/SITE"));

    ////////////////////////////////////
    //Basically index.html
    //Front page stuff
    ////////////////////////////////////
    app.get("/", async (req, res) => {
      ////////////////////////////////////
      //Command tree module
      //Fetches all usable commands
      ////////////////////////////////////
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
              `<br><h2>Category: ${cat.category}</h2>${await cats[
                cat.category
              ]}`
            );
          }
        });

        return await doneCats.join("").replace(/\,/g, "\n").replace(/\`/g, "");
      }

      ////////////////////////////////////
      //Client function
      //Basically gives us access to raw functions
      ////////////////////////////////////
      const test = {
        client: client,
      };

      ////////////////////////////////////
      //Render the final page
      //All functions gets passed trough
      ////////////////////////////////////
      res.render("index", {
        page: "index",
        test: test,
        data: await commandTree(),
      });
    });

    ////////////////////////////////////
    //Redirect to /
    //Basically no error pages
    ////////////////////////////////////
    app.get("*", function (req, res) {
      res.redirect("/");
    });

    ////////////////////////////////////
    //SSL and such
    //needs proper certificates
    ////////////////////////////////////
    const privateKey = fs.readFileSync(await CONFIG.CONFIG("privkey"), "utf8");
    const certificate = fs.readFileSync(await CONFIG.CONFIG("cert"), "utf8");
    const ca = fs.readFileSync(await CONFIG.CONFIG("chain"), "utf8");

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    ////////////////////////////////////
    //Start sites
    //Both port 80 and 443 are in use
    ////////////////////////////////////
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
