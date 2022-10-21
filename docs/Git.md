```bash
git revert  # 清除上一个commit的内容并且声称一个新的commit
git reset   # git reset --hard head^ 
git fetch    # origin/main
git pull
git merge
git rebase # 修改commit的指向
```
## 概念
1. 工作区

2. 暂存区
   
## 命令
```bash
git restore <name> # 使用该命令可以丢弃工作区的修改
git restore --staged <name> # 把已经添加到暂存区但还没有commit的代码从暂存区中去除

git revert head # 回退当前commit，并且生成新的commit

git reset --hard head^ # 回退到上一个commit
git reset head^ # 回退到上一个commit，区别时之前commit修改的内容并不会消失，而是保存在工作目录中
git reset HEAD test.js # 把暂存区中的修改回退到工作区

git merge <name> # 合并分支，并且会生成新的commit
git rebase <name>  # 变基，不会生成新的commit,head会指向当前分支-指向最新的commit

git checkout -- test.js # 丢弃工作区中的修改

git pull origin master将master分支拉到自己开发的分支上

```

## 解决冲突 
git merge 的时候产生冲突
解决冲突后重新git add， git commit
git rebase
解决冲突后先git add，git rebase --continue

main: 1  3   
test:    2
