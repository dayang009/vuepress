# Nginx 安装教程



官网：http://nginx.org/

官网下载链接：

Linux版本：http://nginx.org/download/nginx-1.22.0.tar.gz

Windows版本：http://nginx.org/download/nginx-1.22.0.zip



## 安装所需依赖

``` bash
yum install -y gcc-c++  
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
yum install -y autoconf automake
```







> --prefix									## 配置安装路径
>
> --with-http_ssl_module		## 配置HTTPS时使用
>
> --with-http_v2_module 		## 配置GOLANG语言时使用
>
> --with-stream						## 启用TCP/UDP代理服务



解压缩

``` bash
$ tar -zxvf nginx-1.22.0.tar.gz
$ cd nginx-1.22.0

## 配置信息
$ ./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-stream

## 编译安装
$ make && make install
```

