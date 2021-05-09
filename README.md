# node-srv-mongodb
# Entrega d'exercici: Node REST Server + MongoDB

The following table shows overview of the Rest API and its
routes:

Methods	Urls	Actions
* POST    /players     				        > Add/Create a new player
* PUT     /players                    > Update/Modify the name of an existing 
* POST    /players/{id}/games/        > A player plays one round.
* DELETE  /players/{id}/games         > Delete all rounds of a player
* GET     /players/                   > Retrieve the list of all players
* GET     /players/{id}/games         > Retrieve a list with all games and results of a player
* GET     /players/ranking/all        > Retrieve the ranking of all players and their average pencentage
* GET     /players/ranking/loser      > Retrieve best player average pencentage
* GET     /players/ranking/winner     > Retrieve worst player average pencentage
