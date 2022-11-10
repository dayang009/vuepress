# Linux



## Jar包后台启动部署及日志配置

`linux`系统安装

``` bash
$ yum install -y lrzsz
```

命令解释：

- sz：从服务器下载文件到本地。
- rz：从本地上传文件到服务器。

这样可以不用`Xftp`来操作文件

Java后台启动

``` bash
nohup java -jar xxx.jar &
```

关闭进程

``` bash
## 查询过滤出运行的Jar包
$ ps -ef | grep xxx.jar

## 根据上一步查询出来的进程ID进行关闭
## 添加 -9 参数表示强制关闭进程
$ kill -9 xxxx
```

控制台日志保存输出

``` bash
> log.file 2>&1 &
```

> 2>&1 ：表示 将标准错误 2 重定向到标准输出 &1 ，标准输出 &1 再被重定向输入到 log.file 文件中。
>
> - 0 ：stdin (standard input，标准输入)
> - 1 ：stdout (standard output，标准输出)
> - 2 ：stderr (standard error，标准错误输出)

多环境部署(开发、测试、生产)

``` bash
--spring.profiles.active=dev
--spring.profiles.active=test
--spring.profiles.active=prod
```

### 最终命令

``` bash
nohup java -jar HelloWorld.jar --spring.profiles.active=prod > file.log 2>&1 &
```

查看实时滚动日志

``` bash
$ tail -f nohup.out
```

默认会输出文件最新的10行日志，并且滚动展示，按 `Ctrl + C` 可以退出

如果想要查看多行日志，改变参数，如 `-50f`，及查看最新的50行日志