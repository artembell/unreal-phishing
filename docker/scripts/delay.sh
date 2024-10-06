TRY_COUNT=0
TRY_CONNECT_CODE=-1

echo Connect code=$TRY_CONNECT_CODE
until [ $TRY_CONNECT_CODE -eq 0 ]
do
    mongosh --host 127.0.0.1:27017 -u root -p root --eval "rs.initiate();"
    TRY_CONNECT_CODE=$?
    ((TRY_COUNT=TRY_COUNT+1))
    echo Connect try=$TRY_COUNT... code=$TRY_CONNECT_CODE
    sleep 1
done

echo "---DONE"

# sleep 10s
# mongosh -u root -p root --eval "rs.initiate();"