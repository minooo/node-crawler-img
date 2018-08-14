const puppeteer = require("puppeteer-core");
const path = require("path");
const { mn } = require("./config/default");
const srcToImg = require("./helper/srcToImg");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: path.resolve(
      process.cwd(),
      "chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    ),
    headless: true
  });

  const page = await browser.newPage();
  await page.goto("https://image.baidu.com");
  console.log("go to https://image.baidu.com");

  await page.setViewport({
    width: 1620,
    height: 1080
  });
  console.log("reset viewport");

  await page.focus("#kw");
  await page.keyboard.sendCharacter("狗");
  await page.click(".s_search");
  console.log("go to search list");

  page.on("load", async () => {
    console.log("page loading done, start fetch...");
    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll("img.main_img");
      return Array.prototype.map.call(images, item => item.src);
    });
    console.log(`get ${srcs.length} images, start download.`);

    srcs.forEach(async item => {
      await srcToImg(item, mn);
    });

    await browser.close();
  });
})();
