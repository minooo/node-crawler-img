const puppeteer = require("puppeteer-core");
const path = require("path");
const { screenshot } = require("./config/default");

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: path.resolve(
      process.cwd(),
      "chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    ),
    headless: false
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.screenshot({ path: `${screenshot}/${Date.now()}.png` });

  await browser.close();
})();

// const path = require("path")
// // 包含Puppeteer类库
// const puppeteer = require("puppeteer-core");

// const firstTest = async function() {    // 下面异步相当于打开浏览器
// const browser = await puppeteer.launch({
//   executablePath: path.resolve(process.cwd(), "chrome-mac/Chromium.app/Contents/MacOS/Chromium"),
//   headless: false,
//   args: ["--window-size=1360,768"]
// });
// // 开一个新的页签
// const pageGitchat = await browser.newPage();    // 设置浏览器视图大小为1360x768，就是网页所占的区域
// await pageGitchat.setViewport({width:1360, height:768});    // 输入gitchat网址并回车
// await pageGitchat.goto("http://gitbook.cn");    // 再开一个新的页签
// const pageWeibo = await browser.newPage();    // 输入我的微博地址
// await pageWeibo.goto("https://weibo.com/u/5824742984");    // 等待1s
// await pageWeibo.waitFor(1000);
// await browser.close();
// };
// firstTest();
