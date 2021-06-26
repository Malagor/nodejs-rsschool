# Task 7. Postrges & ORM

### Author: Alex Malagor

- Description https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/postgresql-typeorm.md
- Cross-check https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/postgresql-typeorm.md

| done         | deadline   |
|-------------|------------|
|21.06.2021 | 21.06.2021 |

### Docker
`npm run docker:up` - создание имеждей, билдов и запуск приложения

`npm run docker:down` - остановка докера, завершение приложения

**Логи происходящие в докере** пишутся в корне проекта в папку `./logs`, Она подключена как volume к контейнеру

### Скрипты
`npm install` - установка зависимостей

`npm start` - запуск сервера локально (не в докере)

`npm run lint` - запуск линтера

`npm run test` - запуск тестов

## Дополнительная информация
- `volume DB` том для Бд находится в корне проекта в папке `./database/data`

## Самопроверка [130/180]
Максимальная оценка - **180 баллов**. Минимальная оценка - **0 баллов**.
**Штрафы отсутствуют**

- [x] В качестве источника данных для `users` используется **PostgreSQL** база данных, работа с которой происходит при помощи `typeorm` **+40 баллов**.
- [x] В качестве источника данных для `tasks` используется **PostgreSQL** база данных, работа с которой происходит при помощи `typeorm` **+40 баллов**.
- [x] В качестве источника данных для `boards` используется **PostgreSQL** база данных, работа с которой происходит при помощи `typeorm` **+40 баллов**.
- [ ] Для создания таблиц с сущностями используются миграции. **+50 баллов**
- [x] Переменные, используемые для подключения к базе данных, хранятся в `.env` **+10 баллов**.

**Штрафы:**
* Наличие изменений в тестах либо в workflow **минус 100 баллов**
* Внесение изменений в репозиторий после дедлайна не считая коммиты, вносящие изменения только в `Readme.md` **минус 30% от максимального балла за задание (для этого задания 54 баллов)**
* За **каждую** ошибку линтера при запуске `npm run lint` на основе **локального конфига** **-20 баллов** (именно `errors`, не `warnings`)
* За **каждую** ошибку компилятора **-20 баллов**
* За каждый непроходящий тест **-20 баллов**
* Имеются явно указанные типы `any`, `unknown` **-20 баллов** за каждое использование
* За отсутствие отдельной ветки для разработки **-20 баллов**
* За отсутствие `Pull Request` **-20 баллов**
* За неполную информацию в описании `Pull Request` (отсутствует либо некорректен один из 3 обязательных пунктов) **-10 баллов**
* Меньше 3 коммитов в ветке разработки, не считая коммиты, вносящие изменения только в `Readme.md` — **-20 баллов**

