# Banner





## 前言

当我们启动基于`Spring Boot`的应用程序时，通常会看到一个`默认的图形`，它显示了`Spring标志和版本信息`。这个就是启动`Banner`，在一些开源框架中也都会使用自定义的`Banner`，当然我们也可以自定义启动`Banner`，以展示您自己的个性化信息或公司品牌。

今天和大家一起来自定义一个`Banner`体会一下哈！！

项目可以不咋地，但是启动必须够牛逼！！！



## Banner 介绍

启动`Banner`是在应用程序启动过程中`显示的一段文本或图形`。它通常包含应用程序的名称、版本信息和其他相关的元数据。启动`Banner`能够提供对应用程序正在启动的直观反馈，同时也可以为用户展示个性化的信息。



## 自定义Banner

banner.txt



| 变量                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ${application.version}                                       | 您的应用程序的版本号，如 中声明的那样MANIFEST.MF。例如，Implementation-Version: 1.0打印为1.0. |
| ${application.formatted-version}                             | 您的应用程序的版本号，如 中 声明的MANIFEST.MF和显示格式的（用方括号括起来并以 为前缀v）。例如(v1.0)。 |
| ${spring-boot.version}                                       | 您正在使用的 Spring Boot 版本。例如2.7.13。                  |
| ${spring-boot.formatted-version}                             | 您正在使用的 Spring Boot 版本，已格式化以供显示（用方括号括起来并以 为前缀v）。例如(v2.7.13)。 |
| ${Ansi.NAME}（或${AnsiColor.NAME}, ${AnsiBackground.NAME}, ${AnsiStyle.NAME}） | NAMEANSI 转义码的名称：AnsiPropertySource详情请参阅。        |
| ${application.title}                                         | 您的申请的标题，如 中声明的那样MANIFEST.MF。例如Implementation-Title: MyApp打印为MyApp. |



推荐图集：https://www.bootschool.net/ascii-art



``` java
${AnsiColor.BLUE}
${application.title}
                             ,
                              \`-,                             
                              |   `\                           
                              |     \                          
                           __/.- - -.\,__                      
                      _.-'`              `'"'--..,__           
                  .-'`                              `'--.,_    
               .'`   _                         _ ___       `)  
             .'   .'` `'-.                    (_`  _`)  _.-'   
           .'    '--.     '.                 .-.`"`@ .-'""-,   
  .------~'     ,.---'      '-._      _.'   /   `'--'"""".-'   
/`        '   /`  _,..-----.,__ `''''`/    ;__,..--''--'`      
`'--.,__ '    |-'`             `'---'|     |                   
        `\    \                       \   /                    
         |     |                       '-'                     
          \    |                                               
           `\  |                                               
             \/         

///////////////////////////////////////////////////////////////
${AnsiColor.BRIGHT_RED}
${AnsiBackground.BRIGHT_WHITE}
${AnsiStyle.BOLD}
Application Version: ${application.version}
Spring Boot Version: ${spring-boot.version}

作者 ------------ ${application.author}
```







## 总结

通过自定义启动 `Banner`，我们可以为我们的 `Spring Boot` 项目增添一些个性化的特色。这不仅可以提供更好的用户体验，还能展示我们的专业形象和品牌价值观。自定义 `Banner` 不仅限于文本，我们还可以使用图片等其他媒体类型来展示，让应用程序更加生动有趣。更多好玩的，大家慢慢去探索哈！！