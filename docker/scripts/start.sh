#!/bin/sh
# docker-entrypoint.sh 
# delay.sh &
docker-entrypoint.sh mongod --replSet rs0 --keyFile /etc/mongo/keys/phishing-mongo.keyfile --bind_ip_all &
# INIT_REPL_CMD="rs.initiate()"
delay.sh