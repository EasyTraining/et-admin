#!/usr/bin/env bash

# 重新编译
rm -rf dist & npm run build

## 删除旧代码
ssh root@175.27.136.178 "rm -rf /www/wwwroot/et-admin-dist/*; exit;"

### 上传文件
scp -r ./dist/* root@175.27.136.178:/www/wwwroot/et-admin-dist

echo "✅发布成功"
exit
