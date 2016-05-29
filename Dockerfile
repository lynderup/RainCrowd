# Our image
FROM node:latest
MAINTAINER Lukas Joergensen <lukaspj@outlook.com>

RUN apt-get install -y git

RUN git clone https://github.com/lynderup/RainCrowd.git
WORKDIR RainCrowd/src

RUN npm install

CMD node main.js 9001