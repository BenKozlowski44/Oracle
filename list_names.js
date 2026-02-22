
const fs = require('fs');

const content = fs.readFileSync('src/lib/data.ts', 'utf8');

const regex = /"name":\s*"(.*?)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log(match[1]);
}
