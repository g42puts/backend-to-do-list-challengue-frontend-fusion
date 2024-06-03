# Use a imagem base do Node.js
FROM node:20.14-alpine as node

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/app

# Copie o package.json e o package-lock.json (se existir)
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o contêiner
COPY . .
