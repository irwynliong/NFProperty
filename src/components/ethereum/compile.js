const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const input = {
    language: "Solidity",
    sources: {
        "PropertyListing.sol": {
            content: fs.readFileSync(path.resolve(__dirname, "contracts", "PropertyListing.sol"), "utf8") 
        }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode.object"],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  };

//const files = fs.readdirSync(path.resolve(__dirname, "contracts"));
//console.log(files);
/*
for (const file of files) {
  const src = fs.readFileSync(
    path.resolve(__dirname, `./contracts/${file}`),
    "utf-8"
  );
  //console.log(src);
  input.sources[file] = { content: src };
  //console.log(input.sources[file]);
}*/

const output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log(buildPath);
//var output = solc.compile(JSON.stringify(input));

const files = fs.readdirSync(path.resolve(__dirname, "contracts"));
let json = {};
for (const file of files) {
  const name = file.slice(0, -4);
  json[name] = output.contracts[file][name];
  console.log(json);
}

fs.writeFileSync(
    path.resolve(__dirname, `build/contracts.json`),
    JSON.stringify(json)
  );

//writing each contract to separate json files
/*
let json = {};
for (const file of files) {
  const name = file.slice(0, -4);
  //console.log(name);
  //console.log(output.contracts[file][name]);
  //json[name] = output.contracts[file][name];
}*/

/*
fs.writeFileSync(
    path.resolve(__dirname, `./build/contracts.json`),
    JSON.stringify(json)
  );
*/

/*
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
    //console.log('test');
}
*/