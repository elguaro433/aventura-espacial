#!/usr/bin/env node
// Validador de contenido del juego.
// Uso: node validate.js
// Detecta errores comunes en preguntas y diccionario:
//   - Respuesta correcta fuera de rango
//   - Opciones vacías o duplicadas
//   - Niveles desconocidos
//   - Palabras del diccionario sin traducción a algún idioma
//
// Cómo funciona: lee index.html, extrae los arrays QUESTIONS y DICT con regex
// (no hace falta empaquetar nada), y los valida.
//
// Devuelve exit code 0 si todo OK, 1 si hay errores. Útil para pre-push hooks.

const fs = require('fs');
const path = require('path');

const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// === Niveles válidos (sincronizar con GRADES en index.html) ===
const VALID_GRADES = new Set(['cp','ce1','ce2','cm1','cm2','6e','5e','4e','3e']);
const VALID_DICT_CATS = new Set(['animales','colores','numeros','familia','cuerpo','comida','casa','escuela','verbos','frases','naturaleza','tiempo','andorra']);

let errors = 0, warnings = 0, totalQuestions = 0, totalDictWords = 0;

function err(msg) { console.error('❌ ' + msg); errors++; }
function warn(msg) { console.warn('⚠️  ' + msg); warnings++; }
function ok(msg) { console.log('✅ ' + msg); }

// === Validar preguntas ===
// Cada pregunta tiene formato: {q:'...',o:[...],a:N,level:'...'?,easy:?}
const qRegex = /\{q:'((?:[^'\\]|\\.)*)',o:\[([^\]]+)\],a:(\d+)([^}]*)\}/g;
let m;
const seen = new Set();
while ((m = qRegex.exec(HTML)) !== null) {
  totalQuestions++;
  const q = m[1];
  const optsRaw = m[2];
  const a = parseInt(m[3], 10);
  const tail = m[4];

  // Parse options (quoted strings)
  const opts = [];
  const optRe = /'((?:[^'\\]|\\.)*)'/g;
  let om;
  while ((om = optRe.exec(optsRaw)) !== null) opts.push(om[1]);

  if (opts.length !== 4) {
    err('Pregunta con ' + opts.length + ' opciones (debe tener 4): ' + q.slice(0, 60));
    continue;
  }
  if (a < 0 || a >= opts.length) {
    err('Respuesta correcta fuera de rango (a=' + a + '): ' + q.slice(0, 60));
    continue;
  }
  if (opts.some(o => !o.trim())) {
    err('Opción vacía en pregunta: ' + q.slice(0, 60));
  }
  // Duplicates dentro de las opciones (suele ser bug de typo)
  const optSet = new Set(opts.map(o => o.toLowerCase().trim()));
  if (optSet.size < opts.length) {
    warn('Opciones duplicadas en pregunta: ' + q.slice(0, 60));
  }
  // Validar level si está presente
  const lvlMatch = tail.match(/level:'([^']+)'/);
  if (lvlMatch && !VALID_GRADES.has(lvlMatch[1])) {
    err('Grado desconocido "' + lvlMatch[1] + '" en pregunta: ' + q.slice(0, 60));
  }
  // Detectar duplicados (misma pregunta exacta dentro del mismo nivel/dificultad)
  const lvlKey = lvlMatch ? lvlMatch[1] : (/easy:\s*true/.test(tail) ? 'easy' : 'none');
  const key = lvlKey + '|' + q.trim();
  if (seen.has(key)) {
    warn('Pregunta duplicada en nivel "' + lvlKey + '": ' + q.trim().slice(0, 60));
  }
  seen.add(key);
}

// === Validar diccionario ===
// Cada entry: {es:'...',fr:'...',en:'...',ca:'...',cat:'...',ex:{es:..,fr:..,en:..,ca:..}}
const dictRegex = /\{es:'((?:[^'\\]|\\.)*)',fr:'((?:[^'\\]|\\.)*)',en:'((?:[^'\\]|\\.)*)',ca:'((?:[^'\\]|\\.)*)',cat:'([^']+)'/g;
let dm;
while ((dm = dictRegex.exec(HTML)) !== null) {
  totalDictWords++;
  const [_, es, fr, en, ca, cat] = dm;
  if (!es.trim() || !fr.trim() || !en.trim() || !ca.trim()) {
    err('Palabra del dict con traducción vacía: es="' + es + '"');
  }
  if (!VALID_DICT_CATS.has(cat)) {
    err('Categoría desconocida "' + cat + '" en palabra: ' + es);
  }
}

// === Resumen ===
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 ' + totalQuestions + ' preguntas validadas');
console.log('📖 ' + totalDictWords + ' palabras de diccionario validadas');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
if (errors > 0) {
  console.error('❌ ' + errors + ' error(es) — corregir antes de subir.');
  process.exit(1);
} else {
  console.log('✅ Sin errores' + (warnings > 0 ? ' (' + warnings + ' advertencia(s))' : '') + '. Listo para subir.');
  process.exit(0);
}
