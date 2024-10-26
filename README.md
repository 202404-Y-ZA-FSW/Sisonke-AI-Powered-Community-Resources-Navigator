# HOW TO RUN THE APPLICATION WITH DOCKER

1. When running the application for the first time you will need to build the docker containers for the application,
so in the main directory of the application where the DOCKER-COMPOSE.YML file is run the below command

- docker-compose up --build

2. If you have have already built the docker containers then to run the application you will run the below command

- docker-compose up

3. If you have made changes and you need to rebuild your containers you will need to run the below command and followed by the first command

- docker-compose down -v

- docker-compose up --build