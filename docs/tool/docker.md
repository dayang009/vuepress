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



