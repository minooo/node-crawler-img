const http = require("http");
const https = require("https");
const fs = require("fs")
const path = require("path")
const { promisify } = require("util")
const writeFile = promisify(fs.writeFile)

module.exports = async (src, dir) => {
  if(/.(jpg|png|gif)$/.test(src)) {
    await urlToImage(src, dir)
  } else {
    await base64ToImage(src, dir)
  }
};

// 随机字符串
const randomStr = () => Math.random().toString(36).substr(2)

// url => image
const urlToImage = promisify((url, dir, cb) => {
  const mod = /^https:/.test(url) ? https : http
  const ext = path.extname(url)
  const file = path.join(dir, `${randomStr()}${ext}`)
  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file)).on("finish", () => {
      // cb();
      console.log(file)
    })
  })
})

// base64 => image
const base64ToImage = async (base64Str, dir) => {
  // data:image/jpeg;base64,/asdfasdf
  const matchs = base64Str.match(/^data:(.+?);base64,(.+)$/);

  try {
    const ext = matchs[1].split("/")[1].replace("jpeg", "jpg");
    const file = path.join(dir, `${randomStr()}.${ext}`);
    writeFile(file, matchs[2], "base64")
    console.log(file)
  } catch(err) {
    console.log(err)
  }
}
