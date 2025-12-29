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

---

<style scoped>
  .slidev-layout {
    overflow: auto;
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
  }

  th, td {
    font-size: 12px;
  }

  th {
    font-weight: 600;
  }

  .card {
    background-color: #e5e7eb;
    padding: 8px;
    border-radius: 4px;
  }

  html.dark {
    .card {
      background-color: #1f2937;
    }
  }
</style>

# Регулярные выражения

> **Регулярные выражения (Regular Expressions, RegEx)** - формальный язык для поиска и манипуляций с подстроками в тексте. Описывается специальным шаблоном, содержащим набор символов и метасимволов для сопоставления с оригинальным текстом

<div v-click class="flex flex-col table-dense gap-4 mt-4">

<section id="anchors" class="card">
  <h2>Якоря (Anchors)</h2>
  <table data-section="Якоря">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern"><code>^</code>, <code>$</code></td>
        <td>Начало / конец строки.</td>
        <td><code>/^Hello$/</code></td>
        <td class="note">
          С флагом <code>m</code> — начало/конец каждой строки.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>\b</code>, <code>\B</code></td>
        <td>Граница слова / не граница.</td>
        <td><code>/\bword\b/</code></td>
        <td class="note">
          Основано на <code>\w</code> vs не-<code>\w</code>.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>\A</code>, <code>\Z</code> (PCRE)</td>
        <td>Начало / конец входа (не строки).</td>
        <td><code>/\A\d+/</code></td>
        <td class="note">
          В JS используйте <code>^</code> и <code>$</code>.
        </td>
      </tr>
    </tbody>
  </table>
</section>

<section id="literals" class="card">
  <h2>Литералы и экранирование</h2>
  <table data-section="Литералы">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern">
          <code>\.</code> <span class="badge">экранир.</span>
        </td>
        <td>Буквальная точка.</td>
        <td>
          <code>/file\.txt/</code> совпадёт с <code>file.txt</code>
        </td>
        <td class="note">
          Без экранирования <code>.</code> — любой символ.
        </td>
      </tr>
      <tr>
        <td class="pattern">
          <code>\*</code>, <code>\+</code>, <code>\?</code>,
          <code>\|</code>, <code>\(\)</code>, <code>\[\]</code>,
          <code>\{\}</code>
        </td>
        <td>Экранированные метасимволы.</td>
        <td><code>/price\?/</code></td>
        <td class="note">
          Экранируйте метасимволы, когда нужны буквально.
        </td>
      </tr>
      <tr>
        <td class="pattern">
          <code>\n</code>, <code>\r</code>, <code>\t</code>
        </td>
        <td>Спец-символы перевода строки/возврата/табуляции.</td>
        <td><code>/\t\w+/</code></td>
        <td class="note">
          В JS / PCRE стандартные escape-последовательности.
        </td>
      </tr>
      <tr>
        <td class="pattern">
          <code>\xHH</code>, <code>\uHHHH</code>, <code>\u{HHHH}</code>
        </td>
        <td>Шестнадцатеричные/Unicode-коды.</td>
        <td><code>/\u{1F600}/u</code></td>
        <td class="note">
          Форма <code>\u{…}</code> требует флаг <code>u</code> (JS).
        </td>
      </tr>
    </tbody>
  </table>
</section>

<section id="classes" class="card">
  <h2>Классы символов (Character classes)</h2>
  <table data-section="Классы">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern"><code>[abc]</code></td>
        <td>Любой из перечисленных символов.</td>
        <td><code>/gr[ae]y/</code> → <em>gray</em>, <em>grey</em></td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>[^abc]</code></td>
        <td>Любой, кроме перечисленных.</td>
        <td><code>/[^\d\s]/</code></td>
        <td class="note">Отрицание внутри класса.</td>
      </tr>
      <tr>
        <td class="pattern">
          <code>[a-z]</code>, <code>[A-Z]</code>, <code>[0-9]</code>
        </td>
        <td>Диапазоны символов.</td>
        <td><code>/[A-Za-z0-9_]/</code></td>
        <td class="note">Зависит от кодировки / локали.</td>
      </tr>
      <tr>
        <td class="pattern"><code>\w</code>, <code>\W</code></td>
        <td>Символ слова (<code>~[a-zA-Z0-9_]</code>) / не символ слова.</td>
        <td><code>/\w+\b/</code></td>
        <td class="note">
          В JS — [A-Za-z0-9_]. Для Unicode-слова используйте
          <code>u</code> и <code>\p{L}</code>.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>\d</code>, <code>\D</code></td>
        <td>Цифра / не цифра.</td>
        <td><code>/\d{2,4}/</code></td>
        <td class="note">
          В Unicode-режиме учитывает все цифры, завися от движка.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>\s</code>, <code>\S</code></td>
        <td>Пробельный / непрабельный символ.</td>
        <td><code>/\S+@\S+/</code></td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>.</code></td>
        <td>Любой символ кроме переноса строки.</td>
        <td><code>/a.+z/</code></td>
        <td class="note">
          С флагом <code>s</code> точка включает перенос строки.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>\p{…}</code>, <code>\P{…}</code></td>
        <td>Unicode-свойства (категории).</td>
        <td><code>/\p{L}+/u</code></td>
        <td class="note">
          Требует <code>u</code>. Примеры: <code>L</code> (буквы),
          <code>N</code> (числа), <code>Script=Greek</code>.
        </td>
      </tr>
    </tbody>
  </table>
</section>

<section id="quant" class="card">
  <h2>Квантификаторы (Quantifiers)</h2>

> **Quantifier (квантификатор)** — слово или фраза в английском языке, которая указывает на количество или объём чего-либо

  <table data-section="Кванторы">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern">
          <code>{n}</code>, <code>{n,}</code>, <code>{n,m}</code>
        </td>
        <td>Точное, минимум, диапазон повторений.</td>
        <td><code>/\d{2,4}/</code></td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern">
          <code>*</code>, <code>+</code>, <code>?</code>
        </td>
        <td>0+ / 1+ / 0 или 1 повторений.</td>
        <td><code>/a*b+/</code></td>
        <td class="note">По умолчанию жадные.</td>
      </tr>
      <tr>
        <td class="pattern">
          <code>*?</code>, <code>+?</code>, <code>??</code>
        </td>
        <td>Ленивые (lazy) квантификаторы - ищут подстроку минимальной длинны</td>
        <td><code>/".*?"/</code></td>
        <td class="note">Берут минимум, достаточный для совпадения.</td>
      </tr>
      <tr>
        <td class="pattern">
          <code>*+</code>, <code>++</code>, <code>?+</code>
        </td>
        <td>Собственнические (possessive) кванторы - ищут подстроку максимальной длинны</td>
        <td><code>/a++b/</code></td>
        <td class="note">
          Поддержка зависит от движка (PCRE поддерживает, JS — через
          атомарные группы)
        </td>
      </tr>
    </tbody>
  </table>
</section>

<section id="grouping" class="card">
  <h2>Группы (Group Constructs)</h2>
  <table data-section="Группы">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern"><code>(…)</code></td>
        <td>Захватывающая группа.</td>
        <td><code>/(\d{3})-(\d{2})-(\d{2})/</code></td>
        <td class="note">
          Доступ по <code>\1</code>, <code>$1</code>, именам.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>(?:…)</code></td>
        <td>Незахватывающая (Non-capturing) группа.</td>
        <td><code>/(?:Mr|Ms)\.?\s+\w+/</code></td>
        <td class="note">Оптимизирует без хранения подгрупп.</td>
      </tr>
      <tr>
        <td class="pattern">
          <code>(?&lt;name&gt;…)</code>, <code>(?'name'…)</code>
        </td>
        <td>Именованная группа.</td>
        <td><code>/(?&lt;area&gt;\d{3})-(?&lt;num&gt;\d{7})/</code></td>
        <td class="note">В JS доступ по <code>groups.name</code>.</td>
      </tr>
      <tr>
        <td class="pattern"><code>a|b</code></td>
        <td>Альтернация (ИЛИ).</td>
        <td><code>/(cat|dog)/</code></td>
        <td class="note">Оценивается слева направо.</td>
      </tr>
      <tr>
        <td class="pattern"><code>(?>…)</code></td>
        <td>Атомарная группа - ищет подстроку максимальной длинны без захвата.</td>
        <td><code>/(?>a+)+b/</code></td>
        <td class="note">
          Запрещает откат; в JS не поддерживается.
        </td>
      </tr>
    </tbody>
  </table>
</section>

<section id="look" class="card">
  <h2>Просмотры (Lookaround)</h2>
  <table data-section="Просмотры">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern"><code>(?=…)</code></td>
        <td>Положительный просмотр вперёд - проверяет, что данная подстрока может быть найдена в этом месте, не потребляя символов</td>
        <td><code>/\w+(?=\.)/</code> → слово перед точкой</td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>(?!…)</code></td>
        <td>Отрицательный просмотр вперёд.</td>
        <td>
          <code>/(?!https?:)\/\//</code> — двойной слэш, не протокол
        </td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>(?&lt;=…)</code></td>
        <td>Положительный просмотр назад.</td>
        <td>
          <code>/(?&lt;=\$)\d+(?:,\d{3})*/</code> — числа после
          <code>$</code>
        </td>
        <td class="note">
          В старых JS-движках не поддерживался, сейчас поддержка шире.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>(?&lt;!…)</code></td>
        <td>Отрицательный просмотр назад.</td>
        <td>
          <code>/(?&lt;!@)\b\w+/</code> — слово, не после <code>@</code>
        </td>
        <td class="note"></td>
      </tr>
    </tbody>
  </table>
</section>

<section id="backrefs" class="card">
  <h2>Обратные ссылки (Backtracking) и замены</h2>
  <table data-section="Backrefs">
    <thead>
      <tr>
        <th>Шаблон</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern"><code>\1, \2…</code></td>
        <td>Ссылка на захваченную группу.</td>
        <td><code>/(\w+)\s+\1/</code> — удвоенные слова</td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>\k&lt;name&gt;</code></td>
        <td>Ссылка на именованную группу.</td>
        <td>
          <code>/(?&lt;q&gt;"|')(.*?)\k&lt;q&gt;/</code> — совпадающие
          кавычки
        </td>
        <td class="note">
          JS: <code>\k&lt;name&gt;</code>, PCRE: тоже поддерживает.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>$1, $&amp;, $` , $'</code></td>
        <td>Спец-плейсхолдеры в подстановках (JS/PCRE).</td>
        <td><code>str.replace(/(\w+)/, "[$1]")</code></td>
        <td class="note">
          <code>$&amp;</code> — всё совпадение; <code>$`</code> — до;
          <code>$'</code> — после.
        </td>
      </tr>
    </tbody>
  </table>
</section>

<section id="flags" class="card">
  <h2>Флаги (flags) / модификаторы (modifiers)</h2>
  <table data-section="Флаги">
    <thead>
      <tr>
        <th>Флаг</th>
        <th>Что делает</th>
        <th>Пример</th>
        <th>Заметки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pattern"><code>i</code></td>
        <td>Без учета регистра.</td>
        <td><code>/user/i</code></td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>m</code></td>
        <td>Многострочный режим (^ и $ на каждую строку).</td>
        <td><code>/^\w+$/m</code></td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>s</code></td>
        <td>"dotAll": <code>.</code> включает перенос строки.</td>
        <td><code>/.+/s</code></td>
        <td class="note"></td>
      </tr>
      <tr>
        <td class="pattern"><code>g</code></td>
        <td>Глобальный поиск (JS).</td>
        <td><code>/\w+/g</code></td>
        <td class="note">Возвращает все совпадения.</td>
      </tr>
      <tr>
        <td class="pattern"><code>u</code></td>
        <td>Unicode-режим (JS).</td>
        <td><code>/\p{L}+/u</code></td>
        <td class="note">
          Нужен для <code>\u{…}</code> и <code>\p{…}</code>.
        </td>
      </tr>
      <tr>
        <td class="pattern"><code>x</code> (PCRE)</td>
        <td>Расширенный синтаксис: пробелы/комменты игнорируются.</td>
        <td><code>/\d{3} # код\n-?\d{7}/x</code></td>
        <td class="note">
          JS: аналогов нет, используйте флагов нет — или конкатенацию
          строк.
        </td>
      </tr>
    </tbody>
  </table>
</section>

</div>

---

# Регулярные выражения

Применение

```js {*}{maxHeight:'400px'}
const namePattern = /^([а-я]+)\s([а-я]+)\s([а-я]+)$/i
const namePattern2 = new RegExp('^([а-я]+)\s([а-я]+)\s([а-я]+)$', 'i')

// 1. test() - проверка наличия совпадения
'Иванов Иван Иванович'.test(namePattern)
// true
'Какой-то текст'.test(namePattern)
// false

// 2. exec() - поиск с подробной информацией, то же самое что match без флага 'g'
namePattern.exec('Иванов Иван Иванович')
// ['Иванов Иван Иванович', 'Иванов', 'Иван', 'Иванович', ...]

// 3. match() - поиск совпадений
'Иванов Иван Иванович'.match(namePattern)
// ['Иванов Иван Иванович', 'Иванов', 'Иван', 'Иванович', ...]

// 4. matchAll() - поиск всех совпадений с детальной информацией
'Иванов Иван Иванович'.match(/([а-я]+)/i)

// 5. search() - поиск индекса
'Google Yandex VK'.search(/y.+x/i)
// 7

// 6. replace() - замена
const htmlText = '<div class="container"><p>Hello</p></div>';
const cleanHtml = htmlText.replace(/<[^>]+>/g, '');

// 8. replaceAll() - замена всех вхождений, то же самое, что replace() с флагом 'g'
'Google;\n Yandex  \n\t;    VK'.replaceAll(/\s*;\s*/g, ',')
// 'Google,Yandex,VK'

// 9. split() - разделение строки
'Google;\n Yandex  \n\t;    VK'.split(/\s*;\s*/g)
// ['Google', 'Yandex', 'VK']

```

---

<style scoped>
  h3 {
    font-weight: 700;
    font-size: 18px;
  }

  li {
    font-size: 16px;
    line-height: 1.4rem;
  }

  td {
    font-size: 12px;
  }
</style>

# Сборщики

> Для использования внешних зависимостей необходим **сборщик (bundler)** - инструмент, который объединяет все файлы проекта (JS, CSS, изображения и т.д.) в оптимизированные для браузера

### Для чего нужен

- Обаботка модулей и зависимостей
- Транспиляция - JSX, преобразование новых стандартов JS к старым
- Минификация - уменьшение размера файлов
- Объединение кода в один (иногда и несколько) файл
- Трансформация файлов - например, если вы используете препроцессоры для CSS
- Поддержка "горячей перезагрузки" (Hot Module Reload, HMR) - когда вы меняете и сохраняете файл, сборщик автоматически пересоберёт проект

### Популярные сборщики

| Сборщик     | Особенности                                                         |
| ----------- | ------------------------------------------------------------------- |
| **Webpack** | Гибкий, конфигурируемый, поддерживает многочисленные плагины и лоадеры |
| **Vite**    | Быстрый и требует минимальной настройки |
| **Parcel**  | Не требует конфигурации, прост в использовании                      |
| **Rollup**  | Оптимизирован для библиотек, создаёт лёгкие сборки                  |

---

<style scoped>
  p, li {
    font-size: 16px;
    line-height: 1.4rem;
  }
</style>


# Conventional Commits

> **Conventional Commits** - простая спецификация по формированию сообщений git-коммитов

```
<тип>(<?раздел изменений>): <описание>

<?тело сообщения>

<?нижний колонтитул>
```

- **Тип** - стандартно либо `feat` для новых возможностей (от слова feature), либо `fix` для правок. Другие возможные значения: `build`, `chore`, `ci`, `docs`, `refactor`, `perf`, `test`
- **Раздел изменений (Scope)** - часть проекта, которая изменилась
- **Тело и нижний колонтитул** - необязательные части, содержащие более подробную информацию о коммите

<br />

```
feat(frontend): Добавлена страница авторизации
```

```
chore!: Убрана поддержка Python 2

BREAKING CHANGE: Использована функциональность Python версии 3
```

Символ `!` означает, что коммит содержит критические изменения