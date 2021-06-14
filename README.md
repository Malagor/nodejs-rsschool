# Task 4. Typescript basics

### Author: Alex Malagor

- Description https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/docker-basics.md
- Cross-check criteria https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/docker-basics.md

| done         | deadline   |
|-------------|------------|
|13.06.2021 | 13.06.2021 |

### Скрипты
`npm install` - установка зависимостей

`npm start` - запуск сервера локально (не в докере)

`npm run lint` - запуск линтера

`npm run test` - запуск тестов

### Docker
`npm run docker:up` - создание имеждей, билдов и запуск приложения

`npm run docker:down` - остановка докера, завершение приложения

**Логи происходящие в докере** пишутся в корне проекта в папку `./logs`, Она подключена как volume к контейнеру

## Дополнительная информация
- `Dockerfile` для **базы данных** находится в папке `./database`
- `Dockerfile`  для **ноды** находится в корне проекта `./`
- `docker-compos` для **общей сборки** находится в корне проекта `./`

**Для локально запущенного приложения (не через докер)**
- Лог работы приложение пишется в файл `./src/logs/queries.log`
- Лог ошибок пишется в `./src/logs/error.log`
- Ошибки также пишутся в основной файл с кверями

### Проверки на ошибки images
![image](https://user-images.githubusercontent.com/20399054/121820921-05d9f000-cc9e-11eb-99dd-a2df4d38a612.png)
![image](https://user-images.githubusercontent.com/20399054/121820931-15f1cf80-cc9e-11eb-9e1a-b4ff6409c9b9.png)

### Образы залиты в репозиторий
![image](https://user-images.githubusercontent.com/20399054/121821108-7af9f500-cc9f-11eb-8aa1-924cf1cb27d0.png)


## Оценка за задание [110/110]

**Детали реализации:**
- [x] Наличие в Readme.md секции с инструкцией как запустить приложение +20 баллов
- [x] Используется user-defined bridge +30 баллов
- [x] При возникновении ошибки контейнер должен перезапускается автоматически +30 баллов
- [x] Логи и файлы базы данных хранятся в volumes, а не в контейнере +30 баллов

**Штрафы:**
- [ ] Внесение изменений в репозиторий после дедлайна не считая коммиты, вносящие изменения только в Readme.md минус 30% от максимального балла за задание (для этого задания 33 балла)
- [ ] За отсутствие отдельной ветки для разработки -20 баллов
- [ ] За отсутствие Pull Request -20 баллов
- [ ] За неполную информацию в описании Pull Request -10 баллов
- [ ] Используется default bridge network driver -20 баллов
- [ ] Конфигурация приложения жестко прописана в docker-compose.yml и Dockerfile -20 баллов
- [ ] При изменении файлов в папке src приложение не перезапускается -20 баллов
- [ ] Должен использоваться специфичный образ. (Например postgres и node, а не ububtu с установкой node или postgres) -20 баллов
- [ ] Postgress image не указана как зависимость для node image -20 баллов
