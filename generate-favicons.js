const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
];

const inputFile = path.join(__dirname, 'assets', 'favicon', 'logo.svg');
const outputDir = path.join(__dirname, 'assets', 'favicon');

// Garante que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Gera cada tamanho de favicon
sizes.forEach(({ size, name }) => {
    sharp(inputFile)
        .resize(size, size)
        .toFile(path.join(outputDir, name))
        .then(() => console.log(`Gerado: ${name}`))
        .catch(err => console.error(`Erro ao gerar ${name}:`, err));
}); 