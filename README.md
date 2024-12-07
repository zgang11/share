#### 启动项目
```
npm install
npm run dev
```

### 项目部署
```
yum install yum-utils device-mapper-persistent-data lvm2

yum-config-manager  --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum install docker-ce docker-ce-cli containerd.io

docker pull mysql:8.0.20

vi /etc/docker/daemon.json
{
    "registry-mirrors": [
        "https://mirrors.tuna.tsinghua.edu.cn",
        "https://hub.rat.dev",
        "https://docker.1panel.live",
        "https://docker.rainbond.cc"
    ]
}

systemctl daemon-reload
systemctl restart docker

// 启动mysql
docker run -itd --name mysql-share -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql


// 启动redis
docker pull redis:latest
docker run -itd --name redis-share -p 6379:6379 redis --requirepass ***

// 启动nginx
docker run -p 80:80 --name nginx_share_web -v /root/nginx_share_web/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx_share_web/conf.d:/etc/nginx/conf.d -v /root/nginx_share_web/log:/var/log/nginx -d 1ee494ebb83f

// Dockerfile
docker build -t share:v1.0 ./
docker run -d -p 7001:7001 --name share_web imageId
```

### 链接
如何安全，高效，优雅的提升linux的glibc版本
https://blog.csdn.net/lonely__snow/article/details/142059096


centos升级python到3.8
https://www.cnblogs.com/rise0111/p/17421706.html


升级gcc
https://blog.csdn.net/tina_j/article/details/14122011

centos7 升级 gcc 版本 centos更新gcc版本 转载
https://blog.51cto.com/u_14731/10195111