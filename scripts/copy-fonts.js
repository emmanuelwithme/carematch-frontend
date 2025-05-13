const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf');
const destPath = path.resolve(__dirname, '../dist/assets/fonts/MaterialIcons.ttf');

fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.copyFileSync(srcPath, destPath);
console.log('✅ MaterialIcons.ttf 已複製到 dist/assets/fonts/');