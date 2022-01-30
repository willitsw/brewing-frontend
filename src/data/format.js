var fs = require("fs");
var input = fs.readFileSync("malts.txt").toString().split("\n");

const returnVal = [];

input.forEach((line) => {
  const lineArray = line.split(",");
  returnVal.push({
    name: lineArray[0],
    lovibond: parseInt(lineArray[1]),
    gravity: parseFloat(lineArray[2]),
  });
});

console.log(JSON.stringify(returnVal));
