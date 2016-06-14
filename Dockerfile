FROM node:5.11.1-slim

WORKDIR /src

# SET Timezone
# @see http://serverfault.com/questions/683605/docker-container-time-timezone-will-not-reflect-changes
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /src
RUN npm install --production --registry=https://registry.npm.taobao.org
RUN npm install supervisor

# node environment
ENV NODE_ENV production
ENV NODE_PORT 3006
EXPOSE  3006

CMD ["npm", "start"]
