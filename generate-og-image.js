const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'assets', 'og-image.svg');
const outputFile = path.join(__dirname, 'assets', 'og-image.jpg');

sharp(inputFile)
    .jpeg({ quality: 90 })
    .toFile(outputFile)
    .then(() => console.log('Imagem OG gerada com sucesso!'))
    .catch(err => console.error('Erro ao gerar imagem OG:', err)); 