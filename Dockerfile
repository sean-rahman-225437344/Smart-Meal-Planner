FROM node:18-alpine

# create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# set working directory to /usr/src/app
WORKDIR /usr/src/app

# copy root package files (if you have frontend + backend, might need both)
COPY package*.json ./

# install root dependencies if needed
RUN npm install

# copy the entire project
COPY . .

# move into server folder
WORKDIR /usr/src/app/server

# install server dependencies
COPY server/package*.json ./
RUN npm install

# switch to non-root user
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

ENV NODE_ENV=dev
EXPOSE 4000

CMD ["npm", "run", "dev"]
