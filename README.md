# 🚀 La Gran Aventura Espacial de los Hermanos Díaz

Juego educativo para **Emiliano** (7 años) y **Emmanuel** (10 años) - hijos de Emmanuel Díaz, residentes en Andorra.

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
