import fs from "fs";

const fileIn = "catharsis.json";
const fileOut = "catharsis.csv";

async function writeLineToFile(data) {
  console.log(`Writing line to file...`);
  fs.appendFileSync(fileOut, `${data.id},"${data.name}"\n`);
}

function readFile() {
  return JSON.parse(fs.readFileSync(fileIn));
}

async function main() {
  const tokens = readFile();

  for (let i = 0; i < tokens.length; i++) {
    writeLineToFile(tokens[i]);
  }
  console.log("Done.");
}
main();
