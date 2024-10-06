ARG MONGO_VERSION=8.0.0

FROM mongo:${MONGO_VERSION}

ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
    INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
    until (echo $MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD"); do sleep 1; done; \
    echo "REPLICA SET ONLINE"; wait $MONGOD_PID;