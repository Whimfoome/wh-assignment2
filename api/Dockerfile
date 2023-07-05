FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm ci --omit=dev

COPY . .

RUN npm install typescript
RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/index.js" ]