# GET-DATASET-NLP
### Installation
``` cp .env.example .env ```


Complete .env file with defined parameters

``` npm run dev ```


Use This Command To Add Another Database

``` npm install sequelize-auto sequelize mysql2 --global ```

``` sequelize-auto -o "./routes/model" -d DBNAME -h HOST -u USER -p PORT -x PASSWORD -e mysql -a "./config/config.json" ```

``` pm2 start npm --name "{app_name}" -- run {script_name}
```
