#!/usr/bin/env bash

# 重新编译
rm -rf dist & npm run build

## 删除旧代码
ssh root@101.200.215.84 "rm -rf /home/et-admin-dist/*; exit;"

### 上传文件
scp -r ./dist/* root@101.200.215.84:/home/et-admin-dist

echo "✅发布成功"
exit
