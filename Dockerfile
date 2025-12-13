# Ganti citra dasar Node.js ke versi 22 LTS
FROM node:22-slim

# Tetapkan direktori kerja di dalam kontainer
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json untuk memanfaatkan caching
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin sisa kode aplikasi ke direktori kerja
COPY . .

# Ekspos port tempat aplikasi Anda berjalan (misalnya, 8080)
EXPOSE 8080

# Tentukan perintah untuk menjalankan aplikasi
CMD [ "node", "server.js" ]
