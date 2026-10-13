// Bundles the game from ../web into the desktop app so it plays fully offline.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', '..', 'web', 'play.html');
const dir = path.join(__dirname, '..', 'app');
fs.mkdirSync(dir, { recursive: true });
fs.copyFileSync(src, path.join(dir, 'play.html'));
console.log('Copied game to', path.relative(process.cwd(), dir));
