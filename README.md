# DA Bani - React + Node.js Backend

Full-stack учебный проект: React/Vite сайт строительной компании и полноценный backend на Node.js, Express.js, MongoDB и JWT.

## Что реализовано во frontend

- Многостраничное React-приложение на Vite.
- Роутинг через `react-router-dom`.
- Каталог, услуги, портфолио, калькулятор, отзывы и контакты.
- React Context для темы, избранного и модального окна.

## Что реализовано во backend

- Express.js сервер в папке `server`.
- MongoDB подключение через Mongoose: `server/config/db.js`.
- 5 моделей данных:
  - `User`
  - `Service`
  - `Project`
  - `Order`
  - `Review`
- Связи между моделями:
  - one-to-many: один `User` может иметь много `Order` и `Review`.
  - many-to-many: `Project` и `Order` могут ссылаться на несколько `Service`.
- CRUD API для всех моделей.
- JWT аутентификация: регистрация, вход, получение текущего пользователя.
- Авторизация по ролям: `admin` для управления пользователями, услугами, проектами и заказами.
- Хэширование паролей через `bcrypt`.
- Валидация через `express-validator`.
- Обработка ошибок через middleware.
- Swagger документация: `/api/docs`.

## Установка

```bash
npm install
```

Создайте `.env` по примеру `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bani_backend
JWT_SECRET=change_this_secret_before_deploy
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

## Запуск frontend

```bash
npm run dev
```

## Запуск backend

```bash
npm run server
```

Для разработки с автоперезапуском:

```bash
npm run server:dev
```

## Тестовые данные

После настройки `.env` можно заполнить MongoDB тестовыми данными:

```bash
npm run seed
```

Будет создан admin-пользователь:

```text
admin@bani.kz / admin123
```

## Сборка frontend

```bash
npm run build
```

## Основные API маршруты

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/users`
- `GET|PUT|DELETE /api/users/:id`
- `GET|POST /api/services`
- `GET|PUT|DELETE /api/services/:id`
- `GET|POST /api/projects`
- `GET|PUT|DELETE /api/projects/:id`
- `GET|POST /api/orders`
- `GET|PUT|DELETE /api/orders/:id`
- `GET|POST /api/reviews`
- `GET|PUT|DELETE /api/reviews/:id`

Для защищенных маршрутов передавайте токен:

```http
Authorization: Bearer <token>
```

## Деплой на Render

1. Загрузите проект на GitHub.
2. Создайте Web Service на Render.
3. Build command: `npm install && npm run build`.
4. Start command: `npm start`.
5. Добавьте переменные окружения из `.env.example`.
6. Для базы используйте MongoDB Atlas и вставьте connection string в `MONGODB_URI`.

Подробная инструкция проверки и деплоя находится в `DEPLOYMENT.md`.
