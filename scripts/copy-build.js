// Copia o build de arquivo único (dist/app.html) para ./index.html
import fs from 'fs'

fs.copyFileSync('dist/app.html', 'dist/index.html')
let html = fs.readFileSync('dist/app.html', 'utf8')
// favicon fica em public/, ajusta caminho para abrir direto do disco
html = html.replace(/href="\.?\/favicon\.svg"/, 'href="public/favicon.svg"')
fs.writeFileSync('index.html', html)
console.log('index.html gerado - abra direto no navegador.')
