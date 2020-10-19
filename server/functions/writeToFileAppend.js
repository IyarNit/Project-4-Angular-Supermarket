const fs = require("fs")

const WriteToFileAndAppend = (fileName, data) => {
    fs.appendFile(fileName, data + "\n", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
module.exports = { WriteToFileAndAppend }