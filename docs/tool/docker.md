# Docker





https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/



## 离线二进制安装

下载链接：https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/static/stable/

解压后将`docker`目录下的所有文件拷贝到`/usr/bin`中

``` bash
sudo cp docker/* /usr/bin
```



配置开机自启动

``` bash
# vim /etc/systemd/system/docker.service
# sudo systemctl daemon-reload
# sudo systemctl start docker.service
# sudo systemctl enable docker.service

[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target docker.socket firewalld.service containerd.service time-set.target
Wants=network-online.target containerd.service

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
TimeoutStartSec=0
RestartSec=2
Restart=always

# Note that StartLimit* options were moved from "Service" to "Unit" in systemd 229.
# Both the old, and new location are accepted by systemd 229 and up, so using the old location
# to make them work for either version of systemd.
StartLimitBurst=3

# Note that StartLimitInterval was renamed to StartLimitIntervalSec in systemd 230.
# Both the old, and new name are accepted by systemd 230 and up, so using the old name to make
# this option work for either version of systemd.
StartLimitInterval=60s

# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity

# Comment TasksMax if your systemd version does not support it.
# Only systemd 226 and above support this option.
TasksMax=infinity

# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes

# kill only the docker process, not all processes in the cgroup
KillMode=process
OOMScoreAdjust=-500

[Install]
WantedBy=multi-user.target

```



安装 `docker-compose`

``` bash
sudo curl -L "https://github.com/docker/compose/releases/download/2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 给docker-compose执行权限
sudo chmod +x /usr/local/bin/docker-compose 

# 测试安装是否成功，成功的话打印出docker-compose的版本信息
docker-compose --version

```



`Docker` 配置文件

``` json
{
    "registry-mirrors": [
        "https://u57ggykq.mirror.aliyuncs.com",
        "https://mirror.ccs.tencentyun.com"
    ],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "200m",
        "max-file": "3"
    },
    "data-root": "/docker/dockerData"
}
```



## JDK, Maven, Node 配置

node配置加速镜像

``` bash
在文件中：node-v16.20.2-linux-x64\etc\npmrc

## 添加如下内容
registry=https://registry.npmmirror.com/

## 查看配置列表
npm config ls -l
```



配置环境变量时，官方**不建议**直接修改`/etc/profile`文件，而是在`/etc/profile.d`目录下建立自定义的`custom.sh`文件（如下）配置，文件名随意，当刷新环境变量时，会执行次目录下所有的`.sh`文件

``` bash
vim /etc/profile.d/dayang.sh
```

配置并刷新环境变量：`sudo source /etc/profile`

``` bash
export JAVA_HOME=/usr/local/jdk1.8.0_381
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib


export M2_HOME=/usr/local/apache-maven-3.6.3
export PATH=$M2_HOME/bin:$PATH

export NODE_HOME=/usr/local/node-v16.20.2-linux-x64
export PATH=$NODE_HOME/bin:$PATH
```



