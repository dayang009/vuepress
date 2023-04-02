# Chfs



## 1.简介

`CuteHttpFileServer/chfs`是一个免费的、`HTTP`协议的文件共享服务器，使用浏览器可以快速访问。它具有以下特点：

- 单个文件，核心功能无需其他文件
- 跨平台运行，支持主流平台：`Windows`，`Linux`和`Mac`
- 界面简洁，简单易用
- 支持扫码下载和手机端访问，手机与电脑之间共享文件非常方便
- 支持账户权限控制和地址过滤
- 支持快速分享文字片段
- 支持`webdav`协议

与其他常用文件共享方式（如`FTP`，飞秋，网盘，自己建站）相比，具有使用简单，适用场景更多的优点，在个人使用以及共享给他人的场景中非常方便快捷。

## 2.下载

官方网址：[http://iscute.cn/chfs](http://iscute.cn/chfs)

Windows版本：[http://iscute.cn/tar/chfs/2.0/gui-chfs-windows.zip](http://iscute.cn/tar/chfs/2.0/gui-chfs-windows.zip)

Linux版本：（执行`uname -a`查看系统架构，若下载不匹配的版本则无法运行）

- x86架构CPU下载链接：[http://iscute.cn/tar/chfs/2.0/chfs-linux-amd64-2.0.zip](http://iscute.cn/tar/chfs/2.0/chfs-linux-amd64-2.0.zip)
- Arm架构CPU下载链接：[http://iscute.cn/tar/chfs/2.0/chfs-linux-arm64-2.0.zip](http://iscute.cn/tar/chfs/2.0/chfs-linux-arm64-2.0.zip)

Mac版本：[http://iscute.cn/tar/chfs/2.0/chfs-mac-amd64-2.0.zip](http://iscute.cn/tar/chfs/2.0/chfs-mac-amd64-2.0.zip)

## 3.使用

### Windows版本

下载解压后，双击运行，在窗口中添加想要共享的目录，点击左上角按钮运行，然后在右上角找到提示的网址打开即可

![image-20221012205228589](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4670/image-20221012205228589.png)

### Linux版本

本教程安装路径为：`/opt/chfs`，日志路径为：`/opt/chfs/logs`, 共享文件路径为：`/myshare`

依次执行命令

``` bash
mkdir -p /opt/chfs/logs
mkdir /myshare
cd /opt/chfs
## 注意不同CPU架构链接不同
wget http://iscute.cn/tar/chfs/2.0/chfs-linux-amd64-2.0.zip
unzip chfs-linux-amd64-2.0.zip
## 赋予执行权限
sudo chmod 777 ./chfs
## 创建配置文件
touch chfs.ini
vim chfs.ini
```

将以下内容复制到`chfs.ini`文件中，可根据自己的实际情况自定义配置

> 不要将此配置文件放到共享目录中！！！
>
> 不要将此配置文件放到共享目录中！！！
>
> 不要将此配置文件放到共享目录中！！！

``` bash
#---------------------------------------
# 请注意：
#     1，如果不存在键或对应值为空，则不影响对应的配置
#     2，配置项的值，语法如同其对应的命令行参数
#---------------------------------------

# 监听端口
port=80

# 共享根目录，通过字符'|'进行分割
# 注意：
#     1，带空格的目录须用引号包住，如 path="c:\a uply name\folder"
#     2，可配置多个path，分别对应不同的目录
path=/myshare

# IP地址过滤
allow=
# 白名单模式，允许192.168.1.2-192.168.1.100以及192.168.1.200进行访问
# allow="192.168.1.2-192.168.1.100,192.168.1.200"

# 黑名单模式，禁止192.168.1.2-192.168.1.100以及192.168.1.200进行访问
# allow="not(192.168.1.2-192.168.1.100,192.168.1.200)"


#----------------- 账户控制规则 -------------------
# 注意：该键值可以同时存在多个，你可以将每个用户的访问规则写成一个rule，这样比较清晰，如：
#     rule=::
#     rule=root:123456:RW
#     rule=readonlyuser:123456:R
rule=::R
rule=admin:admin123:RWD

# 用户操作日志存放目录，默认为空
# 如果赋值为空，表示禁用日志
log=/opt/chfs/logs

# 网页标题
html.title=HelloWorld

# 网页公告版
html.notice=`<h2>内部资料，请勿传播</h2>`

#-------------- 设置生效后启用HTTPS，注意监听端口设置为443-------------
# 指定certificate文件
ssl.cert=
# 指定private key文件
ssl.key=

# 设置会话的生命周期，单位：分钟，默认为30分钟
session.timeout=999999999

```

后台运行命令

``` bash
nohup /opt/chfs/chfs --file=/opt/chfs/chfs.ini >/opt/chfs/logs/ops.log 2>&1 &
```

浏览器输入ip地址加端口号即可访问

查看运行的端口号、PID和其他信息

``` bash
netstat -ntlp
```

停止运行（PID可根据上述命令查看）

``` bash
kill -9 [PID]
```



## shell启动脚本（非必须）

``` bash
#!/bin/bash
APP_FILE_NAME=/opt/chfs/chfs
LOG_FILE_FILE=/opt/chfs/logs/ops.log
CONFIG_FILE=/opt/chfs/chfs.ini
FILE_PID=$(pgrep -f $APP_FILE_NAME)
kill -9 "$FILE_PID"
echo "close $APP_FILE_NAME"
sleep 3
if test -e $APP_FILE_NAME; then
  echo "start $APP_FILE_NAME"
  nohup $APP_FILE_NAME --file=$CONFIG_FILE >$LOG_FILE_FILE 2>&1 &
  sleep 3
  echo "start success"
else
  echo "start fail"
fi
sleep 2
tail -30f $LOG_FILE_FILE
```



## 进阶玩法(后续分享)

#### 如何启用HTTPS？

配置文件中有ssl.cert和ssl.key两个键值，设置好对应的文件目录即可。另外，chfs支持的最低SSL版本为SSLv3，不兼容SSL2的握手。对了，别忘了将监听端口设置为443

#### 我想自己搞一套页面，请问开发文档在哪里？

运行chfs后，通过地址:http://host:port/asset/api.html访问API文档。

#### 如何启用webdav？

程序默认支持webdav，跟http共用同一套访问规则。其地址为：http://host:port/webdav