steps to config the environment

1 - Download postgreSQL v17.
2 - Download nodeJS v20.
3 - run npm install.
4 - create file .env with the information abour DB (DB_HOST
                                                    DB_PORT
                                                    DB_USERNAME
                                                    DB_PASSWORD
                                                    DB_DATABASE).
5 - create DB.
6 - run "npm run typeorm:generate" to generate de first migration.
7 - run "npm start" and await the migration creates.
8 - setup must be ok.
