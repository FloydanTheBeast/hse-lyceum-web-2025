---
layout: cover
hideInToc: true
---

<div class="text-align-center">

# Спасибо за внимание!

Задавайте вопросы

</div>

---

# Асинхронность

> **Асинхронное программирование** - подход, позволяющий дожидаться долгих задач - **I/O операций** (Input/Output - Ввод/Вывод), например: ожадание ответа от сервера, подключения к БД, чтение/запись файлов -, не прерывая процесса исполнения всей программы и продолжая выполнять другие задачи


<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420" viewBox="0 0 1200 420" class="mt-4 scale-70 transform-origin-lt">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" dark:fill="#fff" fill="#000"/>
    </marker>
  </defs>

  <!-- Заголовки -->
  <text x="270" y="36" font-size="7" dark:fill="#fff" fill="#000" text-anchor="middle">Синхронное программирование</text>
  <text x="930" y="36" font-size="7" dark:fill="#fff" fill="#000" text-anchor="middle">Асинхронное программирование</text>

  <!-- ====== ЛЕВАЯ ПАНЕЛЬ (синхронное) ====== -->
  <!-- Шапки -->
  <rect x="130" y="58" rx="10" ry="10" width="130" height="42" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>
  <text x="195" y="84" font-size="4" text-anchor="middle" dark:stroke="#fff" stroke="#000">клиент</text>

  <rect x="352" y="58" rx="10" ry="10" width="130" height="42" fill="#3b82f6" dark:stroke="#fff" stroke="#000"/>
  <text x="417" y="84" font-size="4" text-anchor="middle" dark:stroke="#fff" stroke="#000">сервер</text>

  <!-- Жизненные линии -->
  <circle cx="195" cy="112" r="5" dark:fill="#fff" fill="#000"/>
  <line x1="195" y1="117" x2="195" y2="392" dark:stroke="#fff" stroke="#000" z-index="10"/>
  <path d="M195,392 l0,15" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>

  <circle cx="417" cy="112" r="5" dark:fill="#fff" fill="#000"/>
  <line x1="417" y1="117" x2="417" y2="392" dark:stroke="#fff" stroke="#000"/>
  <path d="M417,392 l0,15" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>

  <!-- Подписи слева -->
  <text x="70" y="142" font-size="4" dark:stroke="#fff" stroke="#000">выполняет</text>
  <text x="70" y="160" font-size="4" dark:stroke="#fff" stroke="#000">программу</text>
  <text x="70" y="222" font-size="4" dark:stroke="#fff" stroke="#000">ждёт</text>
  <text x="70" y="240" font-size="4" dark:stroke="#fff" stroke="#000">ответа</text>
  <text x="70" y="362" font-size="4" dark:stroke="#fff" stroke="#000">выполняет</text>
  <text x="70" y="380" font-size="4" dark:stroke="#fff" stroke="#000">программу</text>

  <!-- Активности клиента (синхрон) -->
  <rect x="176" y="125" rx="10" ry="10" width="38" height="30" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>
  <!-- пауза ожидания -->
  <!-- нижняя активность после ответа -->
  <rect x="176" y="305" rx="10" ry="10" width="38" height="80" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>

  <!-- Вызов -->
  <text x="230" y="128" font-size="4" dark:stroke="#fff" stroke="#000">отправил запрос</text>
  <text x="230" y="150" font-size="4" dark:stroke="#fff" stroke="#000">во внешнюю систему</text>

  <!-- Обработка сервера -->
  <rect x="403" y="165" width="28" height="125" fill="#3b82f6" dark:stroke="#fff" stroke="#000"/>
  <line x1="195" y1="165" x2="417" y2="165" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>
  <text x="440" y="215" font-size="4" dark:stroke="#fff" stroke="#000">обработка</text>
  <text x="440" y="233" font-size="4" dark:stroke="#fff" stroke="#000">запроса</text>

  <!-- Ответ -->
  <line x1="417" y1="290" x2="195" y2="290" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>
  <text x="260" y="320" font-size="4" dark:stroke="#fff" stroke="#000">получил</text>
  <text x="260" y="338" font-size="4" dark:stroke="#fff" stroke="#000">ответ</text>

  <!-- ====== ПРАВАЯ ПАНЕЛЬ (асинхронное) ====== -->
  <!-- Шапки -->
  <rect x="790" y="58" rx="10" ry="10" width="130" height="42" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>
  <text x="855" y="84" font-size="4" text-anchor="middle" dark:stroke="#fff" stroke="#000">клиент</text>

  <rect x="1012" y="58" rx="10" ry="10" width="130" height="42" fill="#3b82f6" dark:stroke="#fff" stroke="#000"/>
  <text x="1077" y="84" font-size="4" text-anchor="middle" dark:stroke="#fff" stroke="#000">сервер</text>

  <!-- Жизненные линии -->
  <circle cx="855" cy="112" r="5" dark:fill="#fff" fill="#000"/>
  <line x1="855" y1="117" x2="855" y2="392" dark:stroke="#fff" stroke="#000"/>
  <path d="M855,392 l0,15" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>

  <circle cx="1077" cy="112" r="5" dark:fill="#fff" fill="#000"/>
  <line x1="1077" y1="117" x2="1077" y2="392" dark:stroke="#fff" stroke="#000"/>
  <path d="M1077,392 l0,15" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>

  <!-- Подписи справа -->
  <text x="730" y="142" font-size="4" dark:stroke="#fff" stroke="#000">выполняет</text>
  <text x="730" y="160" font-size="4" dark:stroke="#fff" stroke="#000">программу</text>
  <text x="730" y="214" font-size="4" dark:stroke="#fff" stroke="#000">выполняет</text>
  <text x="730" y="232" font-size="4" dark:stroke="#fff" stroke="#000">программу</text>
  <text x="730" y="362" font-size="4" dark:stroke="#fff" stroke="#000">выполняет</text>
  <text x="730" y="380" font-size="4" dark:stroke="#fff" stroke="#000">программу</text>

  <!-- Активности клиента (несколько во время ожидания) -->
  <rect x="836" y="125" rx="10" ry="10" width="38" height="30" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>
  <rect x="836" y="175" rx="10" ry="10" width="38" height="100" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>
  <rect x="836" y="305" rx="10" ry="10" width="38" height="80" fill="#22c55e" dark:stroke="#fff" stroke="#000"/>

  <!-- Вызов -->
  <text x="890" y="130" font-size="4" dark:stroke="#fff" stroke="#000">отправил запрос</text>
  <text x="890" y="154" font-size="4" dark:stroke="#fff" stroke="#000">во внешнюю систему</text>

  <!-- Обработка сервера -->
  <rect x="1063" y="165" width="28" height="125" fill="#3b82f6" dark:stroke="#fff" stroke="#000"/>
  <line x1="855" y1="165" x2="1077" y2="165" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>
  <text x="1100" y="215" font-size="4" dark:stroke="#fff" stroke="#000">обработка</text>
  <text x="1100" y="233" font-size="4" dark:stroke="#fff" stroke="#000">запроса</text>

  <!-- Ответ -->
  <line x1="1077" y1="290" x2="855" y2="290" dark:stroke="#fff" stroke="#000" marker-end="url(#arrow)"/>
  <text x="930" y="320" font-size="4" dark:stroke="#fff" stroke="#000">получил</text>
  <text x="930" y="338" font-size="4" dark:stroke="#fff" stroke="#000">ответ</text>
</svg>