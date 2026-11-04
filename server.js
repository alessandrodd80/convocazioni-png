const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.json({ limit: "20mb" }));

app.post("/png", async (req, res) => {

  const html = req.body.html;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 908,
    height: 1194
  });

  await page.setContent(
    html,
    {
      waitUntil: "networkidle0"
    }
  );

  const png = await page.screenshot({
    type: "png"
  });

  await browser.close();

  res.set("Content-Type", "image/png");
  res.send(png);

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    "Server avviato sulla porta " + port
  );
});
