FROM node:lts-alpine3.17
WORKDIR /app
COPY package*.json ./

COPY ./ ./
RUN npm install
RUN npm install -g nodemon

#WORKDIR /app
#RUN npm run build --omit=dev
#RUN npm ci --omit=dev

EXPOSE 3001
#CMD ["npm", "start"]
CMD ["nodemon","-L","index.js"]

