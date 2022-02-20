const { config } = require('../package.json');

const printf = require('printf');
const { existsSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { default: axios } = require('axios');
const { FIREBASE_CREDENTIAL } = require('process').env;

if (!FIREBASE_CREDENTIAL) {
  abort('Undefined env: FIREBASE_CREDENTIAL');
}

let outputPath = resolve(process.cwd(), config.project.serviceAccount);

if (existsSync(outputPath)) {
  success('Done!');
  process.exit(0);
}

info('Downloading %s credential...', config.project.serviceAccount);

axios
  .get(FIREBASE_CREDENTIAL)
  .then(({ data }) => {
    const raw = JSON.stringify(data, null, 2);
    writeFileSync(outputPath, raw, 'utf-8');
    success('Done!');
    process.exit(0);
  })
  .catch((err) => abort(err.message));

function success(format, ...args) {
  return log('1;42;30', 'SUCCESS', [format].concat(args));
}

function info(format, ...args) {
  return log('1;44;30', 'INFO', [format].concat(args));
}

function abort(format, ...args) {
  return error([format].concat(args), 1);
}

function error(errorMessage, exitCode) {
  return log('1;41;37', 'ERROR', [errorMessage], exitCode);
}

function log(code, level, [format, ...args], exitCode) {
  console.error(
    '\033[0;%sm %s \033[0;4m %s\033[0m',
    code,
    level,
    printf(format, args)
  );
  exitCode === undefined || console.log() || process.exit(exitCode);
}
