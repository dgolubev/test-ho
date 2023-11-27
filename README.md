
# Home Office test task

## Prerequisite
1. checkout project
2. open terminal and open/goto project directory
3. run script
```
./docker/docker_run.sh
```
it will run docker container with api

## Testing
## postman
1. open postman
2. new tab/request
3. select GET method and set following url to location field
```
http://localhost:3000/pokemon/<POKEMON-NAME>/evolution-chain
```
change `<POKEMON-NAME>` to real pokemon name for which you want to get evolution chain,
like http://localhost:3000/pokemon/caterpie/evolution-chain

### terminal
1. open terminal
2. copy paste command to command promt and
change `<POKEMON-NAME>` to real pokemon name for which you want to get evolution chain,
like http://localhost:3000/pokemon/caterpie/evolution-chain
```
curl http://localhost:3000/pokemon/<POKEMON-NAME>/evolution-chain
```

### browser
1. open browser
2. change `<POKEMON-NAME>` to real pokemon name for which you want to get evolution chain,
   like http://localhost:3000/pokemon/caterpie/evolution-chain and paste ulr to location field 
```
http://localhost:3000/pokemon/<POKEMON-NAME>/evolution-chain
```
