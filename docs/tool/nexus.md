# Nexus



## 官网下载地址：

https://download.sonatype.com/nexus/oss/nexus-2.15.1-02-bundle.zip

https://download.sonatype.com/nexus/oss/nexus-2.15.1-02-bundle.tar.gz



> 由于没有配置`https`，所以需要的`Maven`版本小于等于`3.6.3`



### 修改启动端口

`nexus-2.xx.x-xx/conf/nexus.properties`



### 启动命令

``` bash
./bin/nexus start
```



### 解决报错：

`Connect to sonatype-download.global.ssl.fastly.net:443`



设置 --> System --> Capabilities --> Outreach: Management --> 选择Disable --> Save





### 中央仓库代理地址：

http://maven.aliyun.com/repository/public/

`Auto Blocking Enabled` 设置为 `False`





## setting.xml



``` xml
<pluginGroups>
    <pluginGroup>io.spring.javaformat</pluginGroup>
</pluginGroups>


<servers>
    <server>
        <id>releases</id>
        <username>admin</username>
        <password>admin123</password>
    </server>
    <server>
        <id>snapshots</id>
        <username>admin</username>
        <password>admin123</password>
    </server>
</servers>

<mirrors>
    <mirror>
        <id>public</id>
        <mirrorOf>central,jcenter,releases,snapshots</mirrorOf>
        <name>自建公共仓库</name>
        <url>http://127.0.0.1:8081/nexus/content/groups/public/</url>
    </mirror>
</mirrors>

<profiles>
  <profile>
    <id>jdk-8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
    </activation>

    <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
      <maven.compiler.source>8</maven.compiler.source>
      <maven.compiler.target>8</maven.compiler.target>
      <maven.compiler.compilerVersion>8</maven.compiler.compilerVersion>
      <altDeploymentRepository>
        releases::default::http://127.0.0.1:8081/nexus/content/repositories/releases/
      </altDeploymentRepository>
    </properties>
  </profile>
</profiles>
```



或者在项目父`pom.xml`文件中使用如下配置发布`Jar`包

``` xml
	<distributionManagement>
		<repository>
			<id>releases</id>
			<url>http://127.0.0.1:8081/nexus/content/repositories/releases</url>
		</repository>
		<snapshotRepository>
			<id>snapshots</id>
			<url>http://127.0.0.1:8081/nexus/content/repositories/snapshots</url>
		</snapshotRepository>
	</distributionManagement>
```



## 下载中央仓库索引（可选）

教程：https://maven.apache.org/repository/central-index.html

- download [the Central index](https://repo.maven.apache.org/maven2/.index/)

下载1：https://repo.maven.apache.org/maven2/.index/nexus-maven-repository-index.properties

下载2（文件较大）：https://repo.maven.apache.org/maven2/.index/nexus-maven-repository-index.gz



- download [Maven Indexer CLI](https://repo.maven.apache.org/maven2/org/apache/maven/indexer/indexer-cli/5.1.1/indexer-cli-5.1.1.jar) and [unpack](https://maven.apache.org/maven-indexer-archives/maven-indexer-LATEST/indexer-cli/) the index to raw Lucene index directory

``` bash
java -jar indexer-cli-5.1.1.jar 
--unpack nexus-maven-repository-index.gz 
--destination central-lucene-index 
--type full
```



- download and extract [Luke binary tarball](https://github.com/DmitryKey/luke/releases/download/luke-4.10.4/luke-with-deps.tar.gz) and launch it on the Central index with Lucene format

``` bash
luke.sh -ro -index central-lucene-index
```



---

nexus2.x: https://help.sonatype.com/repomanager2/download

nexus3.x: https://www.sonatype.com/download-nexus-repo-oss

https://download.sonatype.com/nexus/3/nexus-3.61.0-02-unix.tar.gz

``` bash
docker run -itd \
    --name nexus3 \
    --restart unless-stopped \
    --privileged=true \
    -p "8081":"8081" \
    -p "8443":"8443" \
    -v /docker/nexus3/nexus-data:/nexus-data \
    sonatype/nexus3:3.61.0
```



``` yaml
version: "3.8"

services:
  nexus:
    image: sonatype/nexus3:3.61.0
    container_name: nexus3
    restart: unless-stopped
    privileged: true
    ports:
    - "8081:8081"
    - "8443:8443"
    volumes:
    - ./nexus-data:/nexus-data
```



### 配置 HTTPS

生成秘钥

github地址：https://github.com/FiloSottile/mkcert

下载软件的链接：

https://dl.filippo.io/mkcert/latest?for=linux/amd64

https://dl.filippo.io/mkcert/v1.4.4?for=windows/amd64



``` bash
## 安装
mkcert -install

## 生产的根证书位置
/root/.local/share/mkcert

## 生成证书
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1

## 生产 p12 格式的证书
./mkcert -pkcs12 "*.dayang.com" "127.0.0.1" "localhost"

# 转换格式
keytool -importkeystore \
    -srckeystore _wildcard.dayang.com.p12 \
    -destkeystore keystore.jks \
    -srcstoretype pkcs12 \
    -deststoretype JKS \
    -srcstorepass changeit \
    -deststorepass password


    
# 迁移到行业标准格式 PKCS12，密码先输入 password，在输入 changeit
keytool -importkeystore -srckeystore keystore.jks -destkeystore keystore.jks -deststoretype pkcs12 

## 解决问题的网址
https://magicmonster.com/kb/prg/java/ssl/pkix_path_building_failed/

# 关键步骤，将根证书导入jdk环境中去 alias 设置别名
keytool -import -alias maven.dayang.com -keystore \Java\jdk8\jre\lib\security\cacerts -file rootCA.crt


```

查看根证书生成的位置: `./mkcert -CAROOT`

有两个文件：rootCA-key.pem 和 rootCA.pem

把 rootCA.pem 更改后缀为 rootCA.crt 安装到 Windows 电脑中 certmgr.msc

导入Linux系统中

``` bash
# 将CA证书放到这个目录下
cp -a rootCA.pem /etc/pki/ca-trust/source/anchors

# 执行更新命令
sudo /usr/bin/update-ca-trust
```



### nuxus3启动HTTPS链接

1. 创建一个 Java 密钥库文件，其中 `$data-dir/etc/ssl/keystore.jks` 包含要使用的 Jetty SSL 证书。
2. 编辑 `$data-dir/etc/nexus.properties`文件并保存

``` properties
# Jetty section
# 根据实际情况修改下边两个端口
application-port=8081
application-port-ssl=8443
application-host=0.0.0.0
nexus-args=${jetty.etc}/jetty.xml,${jetty.etc}/jetty-http.xml,${jetty.etc}/jetty-https.xml,${jetty.etc}/jetty-requestlog.xml
nexus-context-path=/${NEXUS_CONTEXT}

# Nexus section
nexus-edition=nexus-pro-edition
nexus-features=\
 nexus-pro-feature

nexus.hazelcast.discovery.isEnabled=true
ssl.etc=${karaf.data}/etc/ssl

```



