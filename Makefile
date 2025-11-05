.PHONY: up dev stop down build bash logs deploy run

up:
	docker-compose -f docker-compose.yml stop && docker-compose -f docker-compose.yml up && docker logs -f pokeapi-app

stop:
	docker-compose -f docker-compose.yml stop

down:
	docker-compose -f docker-compose.yml down -v

build:
	docker-compose -f docker-compose.yml down && docker-compose -f docker-compose.yml up --build --remove-orphans

bash:
	docker exec -it pokeapi-app sh

logs:
	docker logs -f pokeapi-app
 
deploy:
	docker compose -f docker-compose.yml stop && git pull && docker compose -f docker-compose.yml up -d --build

run:
	docker compose -f docker-compose.yml stop && docker compose -f docker-compose.yml up -d
