var fs = require("fs");
var input = fs.readFileSync("hops.csv").toString().split("\n");

const returnVal = [];

input.forEach((line) => {
  const lineArray = line.split(",");
  returnVal.push({
    name: lineArray[0],
    alpha: parseFloat(lineArray[1]),
  });
});

console.log(JSON.stringify(returnVal));
