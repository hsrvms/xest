const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const findJustRestProjectRoot = require("./findProjectRoot");

let schemaData;

const getSchema = () => {
  if (schemaData) {
    // return cached version
    return schemaData;
  }

  const projectDetails = findJustRestProjectRoot();
  if (!projectDetails) {
    console.log(
      chalk.red`No schema metadata was found. Autosuggestion wont work for table/column names.`
    );
    return false;
  }

  const { filename } = projectDetails;
  const rootPath = path.dirname(filename);
  try {
    console.log(`${rootPath}/.just/schema.json`);
    const schema = fs.readFileSync(`${rootPath}/.just/schema.json`, "utf-8");
    schemaData = JSON.parse(schema);
  } catch (err) {
    console.log(err);
    console.log(
      chalk.red`Corrupted schema file.  Autosuggestion wont work for table/column names.`
    );
    return false;
  }

  return schemaData;
};

module.exports = getSchema;
