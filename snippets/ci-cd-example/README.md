# Todo App

Учебное приложение для демонстрации CI/CD пайплайна.  
**Стек:** React + TypeScript + Vite · Vitest · Playwright · GitHub Actions · Vercel

## Быстрый старт

```bash
npm install
npm run dev
```

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Запускает dev-сервер |
| `npm run build` | Сборка для продакшна |
| `npm run lint` | Проверка ESLint |
| `npm run typecheck` | Проверка TypeScript |
| `npm test` | Unit-тесты (Vitest) |
| `npm run test:coverage` | Unit-тесты с отчётом о покрытии |
| `npm run test:e2e` | E2E-тесты (Playwright) |
| `npm run test:e2e:ui` | E2E с интерактивным UI |

## Структура тестов

```
tests/
├── unit/
│   ├── setup.ts        ← настройка Testing Library
│   ├── todos.test.ts   ← unit-тесты чистых функций
│   └── App.test.tsx    ← тесты React-компонента
└── e2e/
    └── todo.spec.ts    ← E2E-тесты через Playwright
```

## CI/CD пайплайн

```
git push
    ↓
[quality] ESLint → TypeScript → Unit-тесты
    ↓ (если прошло)
[e2e] Playwright (Chromium + Firefox)
    ↓ (только main/master)
[deploy] Vercel production
```

## Настройка деплоя в Vercel

1. Создайте проект на [vercel.com](https://vercel.com) и подключите репозиторий
2. Получите токены: `vercel login && vercel link`
3. Добавьте в GitHub Secrets (`Settings → Secrets → Actions`):
   - `VERCEL_TOKEN` — API-токен Vercel
   - `VERCEL_ORG_ID` — из файла `.vercel/project.json`
   - `VERCEL_PROJECT_ID` — из файла `.vercel/project.json`

После этого каждый merge в `main` автоматически деплоится в продакшн.
