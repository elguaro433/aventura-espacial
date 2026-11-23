# 🚀 La Gran Aventura Espacial de los Hermanos Díaz

Juego educativo para **Emiliano** (8 años) y **Emmanuel** (10 años) - hijos de Emmanuel Díaz, residentes en Andorra.

## 🌐 URL pública

👉 **https://elguaro433.github.io/aventura-espacial/**

## 📦 Contenido del proyecto

| Archivo | Descripción |
|---------|-------------|
| `index.html` | El juego completo (HTML/CSS/JS en un solo archivo) |
| `manifest.json` | Configuración PWA para instalar como app |
| `sw.js` | Service Worker para funcionamiento offline |
| `icon.svg` | Ícono original del juego |
| `icon-192.png` | Ícono 192×192 para Android |
| `icon-512.png` | Ícono 512×512 para Android |

## 🎮 Características del juego

### Galaxias (6 × 5 planetas = 30 niveles)
- 🔢 **Galaxia Matemática** — Sumas, restas, multiplicaciones, divisiones, problemas mixtos
- 🧩 **Galaxia Lógica** — Secuencias, patrones, acertijos, memoria, adivinanzas
- 🇫🇷 **Galaxia Francesa** — Colores, animales, números, familia, frases
- 🇪🇸 **Galaxia Española** — Ortografía, sinónimos, antónimos, frases, adivinanzas
- 🇬🇧 **Galaxia Inglesa** — Colors, animals, numbers, verbs, phrases
- 🎗️ **Galaxia Catalana** — Colors, animals, números, família, trivia de Andorra

### Jefes finales (6)
- 🤖 Robot Calculador (Matemáticas)
- 🦁 Esfinge Cósmica (Lógica)
- 👹 Le Grand Méchant (Francés)
- 🐲 Dragón de Letras (Español)
- 🧙 The Word Wizard (Inglés)
- 🐉 El Drac dels Pirineus (Catalán)

### Juegos clásicos (3)
- 🐍 Snake (con teclado y swipe)
- ⭕ 3 en raya (vs computadora)
- 🃏 Memorama (12 parejas)

### Personalización
- 🦸 **Emmanuel "El Saiyajin"** — tarjeta azul, tema Dragon Ball, avatar SVG con pelo Saiyajin
- 🦊 **Emiliano "El Constructor"** — tarjeta coral, tema Minecraft/Mario, avatar SVG

### Sistema completo
- 300 preguntas en total
- Dificultad ajustada por edad
- 16 logros desbloqueables
- Tienda con 14 items
- Música y sonidos (Web Audio: aciertos, fallos, monedas, victoria, derrota)
- Confeti y animaciones
- Guardado automático en `localStorage` (clave `aventura_espacial_v1`)
- Funciona offline gracias al Service Worker (PWA)

### Ideas para futuras versiones
- ♟️ Ajedrez · 🧩 Tetris · 🔴 Conecta 4
- Modo duelo entre hermanos
- Reto diario
- Lectura de preguntas en voz alta (TTS)

## 🚀 Despliegue actual

Desplegado en **GitHub Pages** desde la rama `main` / `(root)`.
Repo: `elguaro433/aventura-espacial`.

### Para publicar cambios
1. Subir los archivos modificados al repo (rama `main`).
2. Si tocaste `index.html`, `manifest.json`, `sw.js` o los iconos, **incrementa la versión del cache** en `sw.js` (`CACHE_NAME = 'aventura-espacial-v1'` → `v2`...). Si no, las tablets ya instaladas seguirán viendo la versión vieja.
3. Esperar 1‑2 min al deploy automático.

## 📱 Instalación en tablet Android (PWA)

1. Abrir Chrome en la tablet.
2. Ir a `https://elguaro433.github.io/aventura-espacial/`.
3. Esperar a que cargue completamente (la primera vez guarda todo offline).
4. Menú ⋮ → "Instalar app" o "Añadir a pantalla de inicio".
5. El ícono aparece en la pantalla de inicio y se abre en pantalla completa.

## 🔧 Stack y entorno de Emmanuel (contexto)

- **VPS Windows**: 161.97.106.228 — corre El Guaro Bot (MT5 + Telegram).
- **Render Starter** ($7/mes): buysell365 (Flask + PostgreSQL) → buysell365.pro.
- **GitHub**: usuario `elguaro433`.
- **Proyectos activos**: buysell365 (trading), control de contabilidad del hogar, este juego.

## 📝 Historial del proyecto

- **v1**: Juego básico con 30 planetas y 6 galaxias.
- **v2**: Sonidos, jefes, logros, mini‑juegos.
- **v3**: Personalización temática por niño (Saiyajin / Constructor).
- **v4**: Avatares SVG personalizados + juegos clásicos (Snake, 3 en raya, Memorama).
- **v5**: PWA (manifest + service worker) + persistencia en localStorage + deploy a GitHub Pages.
- **v6**: Ajustes de aprendizaje para hacerlo más amable — botón "💡 Pedir ayuda" **gratis y siempre visible** (quita 2 opciones incorrectas + muestra pista de estudio, 1 vez por pregunta), preguntas sesgadas al nivel del niño y repaso (se evita el curso siguiente), aprobar un planeta baja del 60% al 50%, jefes menos duros (menos daño al niño, ganar con 50%), corazones dinámicos (se ve el del Escudo) y el item "Bola de Fuego" reconvertido en "❤️‍🔥 Vida Extra". Corregida la pregunta del lago de Venezuela. Además se blindó la analítica (`trackAnswer`) para que un historial guardado en formato antiguo no rompa el responder preguntas, y se resetea `answerLock` al iniciar cada modo para que ningún planeta quede sin responder a los toques. **El progreso guardado de cada niño se conserva** (verificada la carga y migración desde v1/v2/v3 sin pérdidas).

- **v7** (oct 2026): revisión de fallos. Ajedrez: el mensaje de "Ganaste / La PC ganó" ya no se borra. Buscaminas: cabe en pantallas estrechas, la bandera con pulsación larga ya no se quita sola y el premio de victoria se da una sola vez. Jefes: las barras de vida son un % del HP máximo (se salían del cuadro). Preguntas corregidas (adivinanza de la noche, antónimos ambiguos, y varios datos de Venezuela y Colombia). Diccionario: sin palabras repetidas, categorías nuevas (Ropa, Transporte, Deportes, Profesiones) y las categorías ya muestran también el diccionario ampliado. Por defecto Emiliano empieza en CE2 (8 años); los niños que ya tienen partida conservan su curso (se cambia en Modo Padres).

- **v8** (23 nov 2026): más emoción en los planetas, porque a los niños les aburría. **Pregunta dorada** (una por planeta, brilla y da +10💰), **barra de velocidad** (responder antes de que se vacíe da +1💰; 10 s Emmanuel, 15 s Emiliano, sin castigo si tarda) y **combos** (x2 desde 3 aciertos seguidos, x3 desde 6, con monedas extra). Al final del planeta sale el resumen de extras. Premios pequeños a propósito para que la tienda no se vacíe. No aplica en el repaso; en el Reto Diario solo los combos.

- **v8.1** (23 nov 2026): **informe automático**, como Mi Música. Cada tablet sube a la nube familiar (Firestore `appdata/aventura-informe-<emmanuel|emiliano>`) el informe del niño que juega: tablet (id + modelo + de quién es), progreso, galaxias, últimos días, dónde más falla, juegos usados y errores de la app. Como mucho cada hora, al abrir y al salir. Solo sube desde Android/iPad (nunca desde un PC de pruebas) y solo un perfil que ya se ha usado en esa tablet. Leer: `sh ../../_utiles/leer_informes_aventura.sh [emmanuel|emiliano]`.

- **v8.2** (23 nov 2026): al pie de la pantalla de inicio, pequeñito, sale **«Versión X.Y»** y un botón **«🔄 Buscar actualización»**: mira la versión publicada (`AV_VERSION` del index.html de GitHub Pages) y, si es distinta, borra la caché, quita el service worker y recarga; si no, dice «Ya tienes la última versión». **Cada cambio: subir `AV_VERSION` en index.html y `RAW_BUILD_TIME` en sw.js.**

- **v8.3** (23 nov 2026): **enlace propio por niño**. `…/aventura-espacial/?p=emiliano` y `?p=emmanuel` dejan esa tablet fijada a ese niño (`localStorage.av_perfil`, se recuerda aunque se abra desde el icono): EMPEZAR entra directo en su perfil, al pie sale «Tablet de …» y el informe dice «(enlace propio)». `?p=todos` la vuelve a dejar para los dos.

- **v8.4** (23 nov 2026): la versión y el botón «Buscar actualización» pasan del pie (en la tablet quedaba fuera de la pantalla, por debajo del borde) a la pantalla de inicio, **justo debajo de «De los Hermanos Díaz»**, visibles sin bajar.

- **v8.5** (23 nov 2026): la versión y «Buscar actualización» van **abajo a la derecha** de la pantalla de inicio, pequeñitos (`#avVerBox`, fijo en la esquina). A Emmanuel no le gustaba en el medio, bajo el título. Solo se ve en la pantalla de inicio.

- **v8.6** (23 nov 2026): **solo en vertical**. En tablets/móviles (`pointer:coarse`) se intenta bloquear el giro (`screen.orientation.lock('portrait')`; el manifest ya decía `portrait`) y, si la ponen en horizontal, un aviso a pantalla completa (`#avGira`, «¡Pon la tablet de pie!») tapa el juego. En un PC no sale nunca.
