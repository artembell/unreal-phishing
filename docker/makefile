mongo-dev:
	docker-compose --file docker-compose.dev.yaml up -d --build --force-recreate mongo

mongo:
	docker-compose --file docker-compose.prod.yaml up -d --build --force-recreate mongo

api:
	docker-compose --file docker-compose.prod.yaml up -d --build --force-recreate api

client:
	docker-compose --file docker-compose.prod.yaml up -d --build --force-recreate client

stop:
	docker-compose --file docker-compose.prod.yaml down --remove-orphans