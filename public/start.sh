#!/usr/bin/env bash

pkill -f http-server

cd /home/et-admin/

nohup http-server -p=6001 >> log &