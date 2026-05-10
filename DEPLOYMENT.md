# Проверка backend и деплой

## 1. MongoDB Atlas

1. Откройте https://www.mongodb.com/atlas
2. Создайте бесплатный кластер.
3. Создайте Database User.
4. В Network Access добавьте доступ для Render. Для учебного проекта можно указать `0.0.0.0/0`.
5. В Cluster нажмите Connect -> Drivers -> Node.js.
6. Скопируйте строку вида:

```text
mongodb+srv://username:password@cluster.mongodb.net/bani_backend
```

В строке должны быть ваши username и password.

## 2. Локальная проверка

Создайте `.env` рядом с `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bani_backend
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Запустите сервер:

```bash
npm run server
```

Проверка:

```text
http://localhost:5000/api/health
http://localhost:5000/api/docs
```

Если `/api/health` возвращает `status: ok`, backend работает.

## 3. Тестовые данные

После подключения MongoDB можно создать тестовые записи:

```bash
npm run seed
```

Admin:

```text
admin@bani.kz / admin123
```

## 4. Render

1. Откройте https://render.com/
2. New -> Web Service.
3. Подключите GitHub репозиторий `Assel-zima/Backend`.
4. Настройки:

```text
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

5. Environment Variables:

```text
MONGODB_URI=ваша строка MongoDB Atlas
JWT_SECRET=любая длинная секретная строка
JWT_EXPIRES_IN=7d
CLIENT_URL=*
```

6. Нажмите Deploy.

После деплоя проверьте:

```text
https://ваш-render-url.onrender.com/api/health
https://ваш-render-url.onrender.com/api/docs
```
