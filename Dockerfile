FROM node:lts-alpine
ENV NODE_ENV=production
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install --prod=false  
COPY . .
RUN pnpm run build
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "dist/server.js"]
