screen -X -S pumpserver -p 0 -X  stuff "stop $(printf '\003\003')"
screen -X -S statserver -p 0 -X  stuff "stop $(printf '\003\003')"
screen -X -S vidserver -p 0 -X  stuff "stop $(printf '\003\003')"
screen -X -S helpserver -p 0 -X  stuff "stop $(printf '\003\003')"
sleep 1
screen -S pumpserver -L -dm bash -c "cd pump.io; npm start"
screen -S statserver -L -dm bash -c "cd static; sudo node server"
# screen -S vidserver -L -dm bash -c "node holla/examples/server.js"
# screen -S vidserver -L -dm bash -c "coffee holla/examples/server.coffee"
screen -S vidserver -L -dm bash -c "cd video.io; node signaler.js"
screen -S helpserver -L -dm bash -c "cd helper; node server.js"
sleep 1
screen -ls

