FROM node:14-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn
RUN yarn add react-scripts@3.0.1 -g --silent
COPY . /app
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
