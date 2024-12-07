# 使用node镜像
FROM node:18.17.0
# 在容器中新建目录文件夹 share_web
RUN mkdir -p /share_web
# 将share_web目录设置为默认工作目录
WORKDIR /share_web
# 将package.json和package-lock.json复制到容器中
COPY package.json /share_web/package.json
# 安装依赖
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn
# 将代码复制到容器
COPY ./ /share_web
# 暴露端口
EXPOSE 7001
# 启动
CMD yarn backend