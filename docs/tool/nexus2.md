# Nexus2



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

