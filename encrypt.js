const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc'; // encryption algorithm
const key = process.argv[2]; // pass key as first argument
const inputFile = process.argv[3]; // e.g., google-services.json
const outputFile = process.argv[4]; // e.g., google-services.json.enc

const iv = crypto.randomBytes(16); // initialization vector
const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'base64'), iv);

const input = fs.readFileSync(inputFile);
const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

// save iv + encrypted data
fs.writeFileSync(outputFile, Buffer.concat([iv, encrypted]));
console.log('File encrypted:', outputFile);
