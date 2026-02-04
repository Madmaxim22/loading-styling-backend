import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import slow from "koa-slow";

const app = new Koa();
const router = new Router();

// Включаем CORS middleware перед другими middleware
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: ["Content-Type", "Accept", "Authorization"],
  }),
);

// Middleware для эмуляции задержки
app.use(
  slow({
    url: /.*/, // Применяем ко всем URL
    delay: 2000, // Задержка в 2 секунды
  }),
);

// Маршрут для получения тестовых данных
router.get("/data", async (ctx) => {
  // Симулируем данные
  ctx.body = [
    { id: 1, title: "Новость 1", body: "Это первая новость из мира кино" },
    { id: 2, title: "Новость 2", body: "Это вторая новость из мира кино" },
    { id: 3, title: "Новость 3", body: "Это третья новость из мира кино" },
  ];
});

// Добавляем маршруты к приложению
app.use(router.routes());
app.use(router.allowedMethods());

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
