## 一、格式化代码



官网：[https://github.com/spring-io/spring-javaformat](https://github.com/spring-io/spring-javaformat)





### 在配置文件中添加插件

And the `io.spring.javaformat` plugin group in `~/.m2/settings.xml` as follows:

``` xml
<pluginGroups>
	<pluginGroup>io.spring.javaformat</pluginGroup>
</pluginGroups>
```

### 完整配置参考

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0
          https://maven.apache.org/xsd/settings-1.2.0.xsd">

  <localRepository>${user.home}/.m2/repository</localRepository>

  <offline>false</offline>

  <pluginGroups>
    <pluginGroup>io.spring.javaformat</pluginGroup>
  </pluginGroups>

  <proxies></proxies>

  <servers></servers>

  <mirrors>
    <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>central,jcenter</mirrorOf>
      <name>阿里云公共仓库</name>
      <url>https://maven.aliyun.com/repository/public</url>
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
        <java.version>8</java.version>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <maven.compiler.compilerVersion>8</maven.compiler.compilerVersion>
      </properties>
    </profile>
  </profiles>

</settings>

```



### 在项目`pom.xml`中添加代码

``` xml
<build>
	<plugins>
		<plugin>
			<groupId>io.spring.javaformat</groupId>
			<artifactId>spring-javaformat-maven-plugin</artifactId>
			<version>0.0.38</version>
			<executions>
				<execution>
					<phase>validate</phase>
					<inherited>true</inherited>
					<goals>
						<goal>validate</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```



### 添加 Java 1.8 支持

> 默认需要 Java 11 及其以上，如果您使用的是 Java 8 ，则需要进行如下配置

在项目根路径下创建文件：`.springjavaformatconfig`，缩进风格可选：`tabs`和 `spaces`

`Spring`官方强烈推荐使用`tabs`

``` ini
java-baseline=8
indentation-style=tabs
```



### 不需要格式化的代码，添加注释

``` java
// @formatter:off

... 这是不希望被格式化的代码，例如：枚举类等...

// @formatter:on
```



### 命令行运行

你可以运行命令 `mvn spring-javaformat:apply` 来格式化代码





## 二、MySQL URL 

`jdbc:mysql://127.0.0.1:3306/my_db?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true`



