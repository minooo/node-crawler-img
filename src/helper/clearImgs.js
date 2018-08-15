const fs = require("fs")
const path = require("path")

module.exports = function(dirPath) {
  const files = fs.readdirSync(dirPath)
  files.forEach(item => {
    if (/.(jpg|png|gif)$/.test(item)) {
      const curPath = path.join(dirPath, item)
      fs.unlinkSync(curPath)
    }
  })
}
