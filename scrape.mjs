import fetch from "node-fetch";
import fs from "fs";

const maxNum = 999;
// const maxNum = 8;
let startingPoint;

const baseUrl = "https://api.gmstudio.art/collections/catharsis/token";
const filename = "catharsis.json";

async function fetchMetadata(id) {
  const uri = `${baseUrl}/${id}.json`;
  console.log("Fetching", id, uri, "...");
  const metadataRes = await fetch(uri);
  return await metadataRes.json();
}

async function writeToFile(data) {
  console.log(`Writing ${data?.length} tokens to file...`);
  fs.writeFileSync(filename, JSON.stringify(data));
  console.log("Done.");
}

async function appendToFile(data) {
  const existing = readFile();
  writeToFile(existing.concat(data));
}

function readFile() {
  return JSON.parse(fs.readFileSync(filename));
}

function getCurrentMaxId() {
  const tokens = readFile();
  if (tokens.length === 0) {
    return -1;
  }
  return tokens[tokens.length - 1].id;
}

async function main() {
  if (!fs.existsSync(filename)) {
    writeToFile([]);
  }

  startingPoint = getCurrentMaxId() + 1;
  let collectionMetadata = [];
  for (let i = startingPoint; i < maxNum; i++) {
    const token = await fetchMetadata(i);
    collectionMetadata.push({ id: i, ...token });
  }
  appendToFile(collectionMetadata);
}
main();
