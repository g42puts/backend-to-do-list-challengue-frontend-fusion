## Initing API Without Docker

Run the following commands in sequence
```bash
npm install

npm run start:dev

or for prod

npm run build

npm run start:prod
```
Note: You need to create a new MongoDB Database in Atlas and change the DATABASE_URL in .env to your Database URL.

## Initing API With Docker

The following command will create a Docker Image and start the server in sequence, whose the container name will be called api and the api service will be called backend-todo-list-frontend-fusion.
```bash
docker compose -f docker-compose.yml up api -d
```