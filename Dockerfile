FROM node:14
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install

CMD npm run dev