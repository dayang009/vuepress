# Git



## 1. 起步

### Git是什么？

#### 三种状态

Git 有三种状态，你的文件可能处于其中之一： 

**已提交（committed）**、**已修改（modified）** 和 **已暂存（staged）**。

- 已修改表示修改了文件，但还没保存到数据库中。
- 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
- 已提交表示数据已经安全地保存在本地数据库中。

这会让我们的 Git 项目拥有三个阶段：工作区、暂存区以及 Git 目录。

基本的 Git 工作流程如下：

1. 在工作区中修改文件。
2. 将你想要下次提交的更改选择性地暂存，这样只会将更改的部分添加到暂存区。
3. 提交更新，找到暂存区的文件，将快照永久性存储到 Git 目录。

如果 Git 目录中保存着特定版本的文件，就属于 **已提交** 状态。

如果文件已修改并放入暂存区，就属于 **已暂存** 状态。 

如果自上次检出后，作了修改但还没有放到暂存区域，就是 **已修改** 状态。



### 安装Git

#### 在Windows上安装

下载链接：[https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/](https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/)

#### 在Linux上安装

>  推荐使用源码安装，因为使用`yum install git`命令安装的`Git`版本非常老旧，不太实用。

从源码安装 Git，需要安装 Git 依赖的库：

`autotools`、`curl`、`zlib`、`openssl`、`expat` 和` libiconv`。

> autotools工具是个系列工具，主要有：`autoconf`、`automake`、`libtool`
>
> CentOS 可以使用`yum -y install dnf`来安装`dnf`指令



```bash
dnf install -y vim wget net-tools yum-utils xorg-x11-xauth \
autoconf automake libtool make tcl bash-completion \
curl-devel expat-devel gettext-devel systemd-devel \
openssl-devel perl-devel zlib-devel gcc-c++ gcc perl-ExtUtils-MakeMaker \
rpcbind nfs-utils
```



安装上述依赖的时候，会自动安装一个git，我们要卸载掉，执行命令：`yum -y remove git`

获取最新发布的`tar.gz`包，后续有新版本时，只替换版本号即可

**下载地址1**：[https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.40.0.tar.gz](https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.40.0.tar.gz)



**下载地址2**：[https://mirrors.kernel.org/pub/software/scm/git/git-2.40.0.tar.gz](https://mirrors.kernel.org/pub/software/scm/git/git-2.40.0.tar.gz)



接着，编译并安装：

```bash
tar -zxf git-2.40.0.tar.gz
cd git-2.40.0
make configure
./configure --prefix=/usr
make all && make install
```

> 因为我们安装了autotools工具，所以不需要配置环境变量
>
> 上述prefix的路径必须是/usr，否则还是需要自己配置环境变量

执行`git --version`，能正常打印出版本号，安装完成。



#### 在MacOS上安装

略

#### 初次运行Git前的配置

每台计算机上只需要配置一次，程序升级时会保留配置信息。 你可以在任何时候再次通过运行命令来修改它们。

#### 用户信息

安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：

```bash
git config --global user.name "ZhangSan"

git config --global user.email "ZhangSan@qq.com"
```

指定换行符和其他配置项

``` bash
## Windows系统执行
git config --global core.autocrlf true
## MacOS or Linux 系统执行
git config --global core.autocrlf input

## 配置文本编辑器（一般默认Vim即可）
git config --global core.editor vim

## 文件夹大小写敏感
git config --global core.ignorecase false


## 配置SSH, 输入指令，连续敲多次回车键
ssh-keygen -t ed25519 -C "hello@qq.com"
# 然后到 C:\Users\${username}\.ssh 路径下找到 .pub结尾的文件
# 用记事本打开，将里边的内容复制到GitHub、码云等代码托管平台，以便将来能正常推送代码
$ ssh-copy-id -i ~/.ssh/id_rsa.pub -p 22 root@192.168.xxx.xxx

## 设置初始化仓库分支名称（main or master）
git config --global init.defaultBranch main

## 跳过Git的SSL的证书验证（可选）
git config --global http.sslverify false

## 检查配置信息
git config --list
```



## 2. Git基础



### 获取Git仓库

- 本地初始化：`git init`
- 克隆：`git clone https://github.com/libgit2/libgit2`



### 记录每次更新到仓库



![文件的状态变化周期](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4670/lifecycle.png)



检查当前文件状态：`git status`

跟踪新文件：`git add README.md`，精确地将内容添加到下一次提交中



初始化仓库：`git init`，文件夹下会出现一个名为`.git`的隐藏文件，千万**不要删除**这个文件

> Windows 系统中以小数点开头命名的文件都是隐藏文件，默认不显示，需要在 此电脑 配置中开启

添加文件后要保存到暂存区：`git add file1.name file2.name file3.name`

将要添加的文件全部写出来，在文件较多的情况下，这样比较糟糕，可以使用`git add .`将当前目录下的所有已修改的文件添加到暂存区。

可以在任意位置使用`git status`来查看当前的状态，也可以使用状态简览查看`git status -s`

#### 忽略文件

一般我们总会有些文件无需纳入`Git`的管理，可以创建一个名为`.gitignore`的文件，列出要忽略的文件的模式

文件 `.gitignore` 的格式规范如下：

- 所有空行或者以 `#` 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
- 匹配模式可以以（`/`）开头防止递归。
- 匹配模式可以以（`/`）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。 星号（*）匹配零个或多个任意字符；[abc] 匹配
任何一个列在方括号中的字符 （这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）； 问号（?）只
匹配一个任意字符；如果在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内的都可以匹配
（比如 [0-9] 表示匹配所有 0 到 9 的数字）。 使用两个星号（**）表示匹配任意中间目录，比如 a/**/z 可以
匹配 a/z 、 a/b/z 或 a/b/c/z 等。

一个 `.gitignore` 文件的例子：

```bash
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

#### 查看已暂存和未暂存的修改

使用`git diff`命令查看具体修改了什么地方，他可以回答你的以下两个问题。

1. 当前做的哪些更新尚未暂存？
2. 有哪些更新已暂存并准备好下次提交？

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异。 也就是修改之后还没有暂存起来的变化内容。

要查看尚未暂存的文件更新了哪些部分，不加参数直接输入 git diff。此命令比较的是工作目录中当前文件和暂存区域快照之间的差异。 也就是修改之后还没有暂存起来的变化内容。

若要查看已暂存的将要添加到下次提交里的内容，可以用 git diff --staged 命令。 这条命令将比对已暂存文件与最后一次提交的文件差异。

请注意，git diff 本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。 所以有时候你一下子暂
存了所有更新过的文件，运行 git diff 后却什么也没有，就是这个原因。

#### 提交更新

将所有`add`到暂存区的文件进行提交

命令：`git commit -m "fix some bug."`必须在引号中输入本次的提交说明

#### 移除文件

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。 可以用 `git rm` 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。 当你忘记添加 `.gitignore` 文件，不小心把一个很大的日志文件或一堆 `.a` 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目的，使用 `--cached` 选项：

```bash
git rm --cached README
```

`git rm` 命令后面可以列出文件或者目录的名字，也可以使用 `glob` 模式。比如：

```bash
git rm log/\*.log
```

注意到星号 `*` 之前的反斜杠 `\`， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。 此命令删除 `log/` 目录下扩展名为 `.log` 的所有文件。 类似的比如：

```bash
git rm \*~
```

该命令会删除所有名字以 `~` 结尾的文件。

#### 移动文件

``` bash
git mv file-from file-to
```

其实，运行 `git mv` 就相当于运行了下面三条命令：

```bash
mv README.md README
git rm README.md
git add README
```

如此分开操作，Git 也会意识到这是一次重命名，所以不管何种方式结果都一样。 两者唯一的区别在于，`git mv` 是一条命令而非三条命令，直接使用 `git mv` 方便得多。 不过在使用其他工具重命名文件时，记得在提交前 `git rm` 删除旧文件名，再 `git add` 添加新文件名。

### 查看提交历史

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的工具是 `git log` 命令。

``` bash
## 显示最近5次提交的信息，每次提交用一行展示
git log --oneline -5

## 用图表的形式查看，存在多分支，合并分支时非常好用
git log --oneline --graph
```







### 撤消操作

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 `--amend` 选项的提交命令来重新提交：

```bash
$ git commit --amend
```

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令）， 那么快照会保持不变，而你所修改的只是提交信息。

文本编辑器启动后，可以看到之前的提交信息。 编辑后保存会覆盖原来的提交信息。

例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```bash
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

最终你只会有一个提交——第二次提交将代替第一次提交的结果。

> 当你在修补最后的提交时，与其说是修复旧提交，倒不如说是完全用一个 **新的提交** 替换旧的提交， 理解这一点非常重要。从效果上来说，就像是旧有的提交从未存在过一样，它并不会出现在仓库的历史中。
>
> 修补提交最明显的价值是可以稍微改进你最后的提交，而不会让“啊，忘了添加一个文件”或者 “小修补，修正笔误”这种提交信息弄乱你的仓库历史。



#### 取消暂存的文件

接下来的两个小节演示如何操作暂存区和工作目录中已修改的文件。 这些命令在修改文件状态的同时，也会提示如何撤消操作。 例如，你已经修改了两个文件并且想要将它们作为两次独立的修改提交， 但是却意外地输入 `git add *` 暂存了它们两个。如何只取消暂存两个中的一个呢？ `git status` 命令提示了你：

```bash
$ git add *
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
    modified:   CONTRIBUTING.md
```

在 “Changes to be committed” 文字正下方，提示使用 `git reset HEAD <file>...` 来取消暂存。 所以，我们可以这样来取消暂存 `CONTRIBUTING.md` 文件：

```bash
$ git reset HEAD CONTRIBUTING.md
Unstaged changes after reset:
M	CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```

这个命令有点儿奇怪，但是起作用了。 `CONTRIBUTING.md` 文件已经是修改未暂存的状态了。

> `git reset` 确实是个危险的命令，如果加上了 `--hard` 选项则更是如此。 然而在上述场景中，工作目录中的文件尚未修改，因此相对安全一些。

#### 撤消对文件的修改

刚拉取下来的文件改废了怎么办，运行以下命令撤销之前的修改

``` bash
git checkout -- README.md
```

> 请务必记得 `git checkout -- <file>` 是一个危险的命令。 你对那个文件在本地的任何修改都会消失——Git 会用最近提交的版本覆盖掉它。 除非你确实清楚不想要对那个文件的本地修改了，否则请不要使用这个命令。

如果你仍然想保留对那个文件做出的修改，但是现在仍然需要撤消，我们将会在 [Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching) 介绍保存进度与分支，这通常是更好的做法。

记住，在 Git 中任何 **已提交** 的东西几乎总是可以恢复的。 甚至那些被删除的分支中的提交或使用 `--amend` 选项覆盖的提交也可以恢复 （阅读 [数据恢复](https://git-scm.com/book/zh/v2/ch00/_data_recovery) 了解数据恢复）。 然而，任何你未提交的东西丢失后很可能再也找不到了。



### 远程仓库的使用

#### 查看远程仓库

`git remote -v`

#### 添加远程仓库

`git remote add <shortname> <url>`

``` bash
git remote add origin https://github.com/...

可以在命令行中使用origin字符串代替整个URL
```

#### 从远程仓库中抓取与拉取

``` bash
$ git fetch <remote>
```

这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支
的引用，可以随时合并或查看。
如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所
以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。 

必须注意 git fetch 命令只会
将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的
工作。

#### 推送到远程仓库

当你想分享你的项目时，必须将其推送到上游。 这个命令很简单：`git push <remote> <branch>`。 当你
想要将 master 分支推送到 origin 服务器时（再次说明，克隆时通常会自动帮你设置好那两个名字）， 那么
运行这个命令就可以将你所做的备份到服务器：

``` bash
$ git push origin master
```

只有当你有所克隆服务器的写入权限，并且之前没有人推送过时，这条命令才能生效。 当你和其他人在同一时
间克隆，他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。 你必须先抓取他们的工作
并将其合并进你的工作后才能推送。 阅读 Git 分支 了解如何推送到远程仓库服务器的详细信息。

#### 查看某个远程仓库

``` bash
$ git remote show <remote>
* remote origin
Fetch URL: https://github.com/schacon/ticgit
Push URL: https://github.com/schacon/ticgit
HEAD branch: master
Remote branches:
master tracked
dev-branch tracked
Local branch configured for 'git pull':
master merges with remote master
Local ref configured for 'git push':
master pushes to master (up to date)
```

它同样会列出远程仓库的 URL 与跟踪分支的信息。 这些信息非常有用，它告诉你正处于 master 分支，并且如
果运行 git pull， 就会抓取所有的远程引用，然后将远程 master 分支合并到本地 master 分支。 它也会列
出拉取到的所有远程引用。

#### 远程仓库的重命名与移除

你可以运行 git remote rename 来修改一个远程仓库的简写名。 例如，想要将 pb 重命名为 paul，可以用
git remote rename 这样做：

``` bash
$ git remote rename pb paul
$ git remote
origin
paul
```

值得注意的是这同样也会修改你所有远程跟踪的分支名字。
那些过去引用 pb/master 的现在会引用paul/master。

如果因为一些原因想要移除一个远程仓库——你已经从服务器上搬走了或不再想使用某一个特定的镜像了， 又或
者某一个贡献者不再贡献了——可以使用 git remote remove 或 git remote rm ：

``` bash
$ git remote remove paul
$ git remote
origin
```

一旦你使用这种方式删除了一个远程仓库，那么所有和这个远程仓库相关的远程跟踪分支以及配置信息也会一起被删除。



### 总结

现在，你应该能完成所有 Git 基本的本地操作了－创建或克隆一个仓库、进行更改、暂存并提交这些更改、浏览
仓库从创建到现在的所有更改历史。 接下来，将介绍 Git 的杀手级特性：分支模型。





## 3. Git分支

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。 Git 的默认分支名字是 master。 在多次提交操作之
后，你其实已经有一个指向最后那个提交对象的 master 分支。 master 分支会在每次提交时自动向前移动。

创建一个新分支：git branch dev
切换到新分支上：git checkout dev
以上命令可以合并为一条，创建一个新分支并切换过去：git checkout -b dev

现在我们有两个分支了，main和dev，那么Git如何分辨这两个分支呢？
实际上Git有一个特殊的HEAD指针，它指向当前所在的本地分支（将 HEAD 想象为当前分支的别名）

查看各个分支当前所指的对象：git log --oneline --decorate

**分支切换会改变你工作目录中的文件**
在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换到一个较旧的分支，
你的工作目录会恢复到该分支最后一次提交时的样子。 如果 Git 不能干净利落地完成这个任
务，它将禁止切换分支。

![项目分叉历史](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4670/image-20221005211937515.png)

使用命令查看项目分叉历史

``` bash
$ git log --oneline --decorate --graph --all
* c2b9e (HEAD, master) made other changes
| * 87ab2 (testing) made a change
|/
* f30ab add feature #32 - ability to add new formats to the
* 34ac2 fixed bug #1328 - stack overflow under certain conditions
* 98ca9 initial commit of my project
```

你正在tseting分支上开发，突然接到电话，线上生产分支有一个问题需要紧急修补，按照如下方式来处理

1. 切换到你的线上分支（production branch）。
2. 为这个紧急任务新建一个分支，并在其中修复它。
3. 在测试通过之后，切换回线上分支，然后合并这个修补分支，最后将改动推送到线上分支。
4. 切换回你最初工作的分支上，继续工作。

注意，当你切换分支的时候，Git会重置你的工作目录。最好的方法是，在你切换分支之前，保持好一个干净的状态。

![基于 master 分支的紧急问题分支 hotfix branch](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4670/image-20221005214217318.png)

切换到master主分支后，执行git checkout -b hotfix
问题解决后，切换到master主分支，然后将hotfix分支合并到master分支上去

``` bash
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
index.html | 2 ++
1 file changed, 2 insertions(+)
```

![master 被快进到 hotfix](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4670/image-20221005223302588.png)

hotfix修复后，你准备回到iss53分支继续工作。
然而在这之前，你应该删除掉hotfix分支，因为不再需要它了，master分支已经指向了同一位置。

``` bash
$ git branch -d hotfix
Deleted branch hotfix (3a0874c).
```

现在可以切回到之前的iss53分支上继续工作

``` sh
$ git checkout iss53
Switched to branch "iss53"
$ vim index.html
$ git commit -a -m 'finished the new footer [issue 53]'
[iss53 ad82d7a] finished the new footer [issue 53]
1 file changed, 1 insertion(+)
```















## 4. 服务器上的Git



## 5. 分布式Git



## Git撤销操作总结

本地文件改废了，要撤销操作，也就是说，把硬盘上对这个文件的修改撤销

`git checkout <changed_file>` 或者 `git restore <changed_file>`



如果将改动添加到了暂存区，也就是相当于执行了 `git add .`命令

若想要把文件从暂存区移除，但是还保留硬盘上的修改，也就是我们想撤销这个`git add ` 这个命令，

执行 `git reset <changed_file>` 或者 `git restore --staged <changed_file>`

这个命令比较安全，只会把文件从暂存区移出，让你`commit`时候不在提交这个文件，不会对硬盘上的源代码进行修改。

如果你就是想撤销掉所有的修改，包括**暂存区**和**磁盘**上的修改，则执行：`git checkout HEAD <changed_file>`命令

这个`HEAD`在表示最近的一次`commit`，这个操作会丢失硬盘上的修改，操作时候要小心。



如果在把文件添加到暂存区后，使用了`git commit`操作，那你的修改就正式成为了一个`commit`，并且被放到了`Local Git`中

在这种情况下，如果只是想撤销这个`commit`，则可以使用：`git reset --soft HEAD~1`，这意味着你的`Local Git`中的状态会变为前一个，但硬盘上的文件不会变化，这个变化也会保留到暂存区，只是`Local Git`中的`Commit`被你干掉了。

如果没有`--soft`这个选项，则表示在`Local Git`中撤销`commit`这个操作，并且撤销在暂存区的修改，磁盘上的文件不会被修改，命令是：

`git reset HEAD~1` or `git reset --mixed HEAD~1`，换句话说，他会同时撤销你的 `git commit` 和 `git add`

当然还可以更近一步，使用`git reset --hard HEAD~1`，**他会把修改从本地仓库，暂存区和磁盘上全部删除，慎用！！！**







| Disk（磁盘）      | Init | Change（×） |
| ----------------- | ---- | ----------- |
| Staging（暂存区） | Init |             |
| Local（本地）     | Init |             |
| Remote（远程）    | Init |             |

---



| Disk（磁盘）      | Init | Change | git add <changed_file>                |
| ----------------- | ---- | ------ | ------------------------------------- |
| Staging（暂存区） | Init | Change | git status -> Changes to be committed |
| Local（本地）     | Init |        |                                       |
| Remote（远程）    | Init |        |                                       |



## GitHub工作流

首先从远端克隆代码：`git clone https://127.0.0.1`

克隆到本地后，第一件事就是建立一个新的`feature branch`，使用`git cheakout -b dev`

在代码改变，`add`, `commit` 以后，要推送到远端仓库，`git push origin dev`这时候远端仓库会多出一个`dev`分支

比较常见的一种情况是这是`main`分支中的代码被别人更新了，要验证我们刚才修改的代码在新版main分支是否可以用，需要把`main`分支的`update`同步到`dev`分支中，回到主分支进行更新：`git cheakout main` and `git pull origin main`

接着回到`dev`分支中进行变基操作：`git cheakout dev ` and `git rebase main`，（如果出现冲突用图形化界面进行解决）

再推送到远端仓库，由于我们使用了`rebase`操作，则需要强制推送，`git push -f origin dev`

接着提交`Pull Request` 俗称`PR`，将`dev`分支的代码合并到`main`分支中，`Squash and merge`将多个`dev`提交合并为一个，使`main`分支提交信息变得更加简洁，合并以后一般可以删除`dev`分支了。当然，本地的`dev`分支也可以删掉了。

回到主分支：`git cheakout main`, 执行删除命令`git branch -D dev`

再更新`main`分支的代码：`git pull origin main`







## 删除Git大文件

``` bash
# 搜索
git rev-list --all | xargs -rL1 git ls-tree -r --long | sort -uk3 | sort -rnk4 | head -10

# 删除
git filter-branch --tree-filter "rm -f big.file" -- --all

# 推送
git push -f --all
```



## 忽略文件

``` txt
*.class
*.log
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, 
hs_err_pid*


HELP.md
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/

### others ###
*/.DS_Store
.DS_Store


# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

