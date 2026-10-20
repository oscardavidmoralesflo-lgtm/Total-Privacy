/* BASTIÓN ACADEMY · Datos del programa · Parte A (Módulos 00–03) */
window.BASTION = window.BASTION || { modules: [] };

BASTION.modules.push({
  id: "m00", num: "00", icon: "🧭", color: "em", level: 1,
  title: "Mentalidad Soberana: Privacidad, Seguridad y Soberanía",
  subtitle: "Por qué importa, cómo estudiar este programa y cómo pensar como un estratega",
  summary: "Antes de instalar nada, cambias el chip. Aprendes la diferencia entre privacidad, seguridad y anonimato, desmontas el 'no tengo nada que ocultar' y entiendes el método: cero paranoia, máxima intención.",
  outcomes: ["Explicar a cualquiera por qué la privacidad importa", "Distinguir privacidad, seguridad y anonimato", "Saber cómo recorrer el programa sin abrumarte"],
  lessons: [
    {
      id: "m00l1", title: "Cómo usar esta academia (y no abandonarla)", min: 10,
      objectives: ["Entender la estructura de 5 niveles y 16 módulos", "Configurar tu ritmo de estudio", "Saber qué hacer primero si tienes poco tiempo"],
      theory: `
        <p>Este programa unifica los temas de un <strong>plan exprés</strong> (blindaje rápido en 30 días), un <strong>programa avanzado</strong> (compartimentación, alias, borrado, OSINT, finanzas, herencia) y una capa nueva que casi ningún curso cubre bien: <strong>la privacidad y la seguridad en la era de la IA masiva</strong> (deepfakes, agentes, prompt injection, IA local, escaneo en el dispositivo).</p>
        <h3>Los 5 niveles</h3>
        <table>
          <tr><th>Nivel</th><th>Nombre</th><th>Qué consigues</th></tr>
          <tr><td>1</td><td>Fundamentos</td><td>Mentalidad, modelo de amenazas y compartimentación.</td></tr>
          <tr><td>2</td><td>Blindaje</td><td>Navegador, red, cuentas y dispositivos endurecidos.</td></tr>
          <tr><td>3</td><td>Invisibilidad</td><td>Correo, alias, mensajería, antifraude y borrado de huella.</td></tr>
          <tr><td>4</td><td>Dominio</td><td>OSINT, IA privada, seguridad de agentes, biometría y finanzas.</td></tr>
          <tr><td>5</td><td>Soberano</td><td>Tu propia infraestructura y tu herencia digital.</td></tr>
        </table>
        <h3>Cada lección tiene la misma estructura</h3>
        <ul>
          <li><strong>Objetivos</strong>: qué sabrás hacer al terminar.</li>
          <li><strong>El porqué</strong>: la estrategia, explicada sin tecnicismos innecesarios.</li>
          <li><strong>Paso a paso</strong>: acciones concretas que marcas como hechas (se guardan solas).</li>
          <li><strong>Comandos / plantillas</strong>: bloques para copiar con un clic.</li>
          <li><strong>Errores comunes</strong> y la <strong>nota del profesor</strong>.</li>
        </ul>
        <div class="callout info"><span class="ci">💡</span><div>Todo tu progreso vive <strong>solo en este navegador</strong> (localStorage). No se envía a ningún servidor. Haz un <strong>Backup</strong> (arriba a la derecha) de vez en cuando.</div></div>
        <h3>Cómo cubre este programa los temarios de referencia</h3>
        <table>
          <tr><th>Bloque público</th><th>Dónde lo estudias aquí</th></tr>
          <tr><td>Programa básico · Cuentas</td><td>Módulos 04 y 06</td></tr>
          <tr><td>Programa básico · Móvil</td><td>Módulo 05 (lecciones 3, 4 y 6) y 19</td></tr>
          <tr><td>Programa básico · Ordenador</td><td>Módulo 05 (lecciones 1, 2, 5 y 7)</td></tr>
          <tr><td>Programa básico · Día a día</td><td>Módulos 08, 13, 18 y 19</td></tr>
          <tr><td>Herramientas y antifraude</td><td>Arsenal, Módulos 07, 16 y 17</td></tr>
          <tr><td>Programa avanzado · Fundamentos</td><td>Módulos 00 y 01</td></tr>
          <tr><td>Programa avanzado · Protección (móvil, PC, hogar, online)</td><td>Módulos 02, 03, 04, 05 y 16</td></tr>
          <tr><td>Programa avanzado · Borrado (data brokers, filtraciones)</td><td>Módulos 08 y 17</td></tr>
          <tr><td>Programa avanzado · Dominio (ciberinteligencia, pagos privados, patrimonio)</td><td>Módulos 09, 13, 15 y 18</td></tr>
          <tr><td>Nivel superior (soberanía)</td><td>Módulos 14, 15 y 20</td></tr>
          <tr><td>Extra 2026 · Era IA</td><td>Módulos 10, 11 y 12</td></tr>
        </table>
        <div class="callout warn"><span class="ci">📌</span><div>Este programa se construyó a partir del <strong>temario público</strong> de esos cursos (los nombres de bloques y temas que anuncian) y de fuentes abiertas actuales. No reproduce los vídeos ni materiales de pago: el contenido de cada lección es una explicación propia e independiente.</div></div>
      `,
      steps: [
        "Decide tu ritmo: <b>20 minutos al día</b> (Reto 30 días) o <b>1 módulo por semana</b> (programa completo en ~4 meses).",
        "Abre el <b>Reto 30 días</b> desde el menú: es el atajo práctico si quieres resultados rápidos.",
        "Haz ahora la <b>Auditoría de exposición</b> en Laboratorios para conocer tu punto de partida.",
        "Pulsa <b>Ctrl + K</b> en cualquier momento para buscar cualquier herramienta o tema.",
        "Haz tu primer <b>Backup</b> del progreso y guárdalo en una carpeta segura."
      ],
      pitfalls: ["Intentar aplicarlo todo en un fin de semana: te quemas y lo abandonas.", "Instalar herramientas sin entender para qué las usas (primero el porqué, luego el cómo)."],
      prof: "Yo te enseñaría así: un cambio pequeño cada día, siempre en el mismo orden (cuentas → dispositivos → red → identidad). La privacidad es un hábito, no una instalación.",
      tools: []
    },
    {
      id: "m00l2", title: "Privacidad ≠ secreto: desmontando el 'no tengo nada que ocultar'", min: 15,
      objectives: ["Argumentar por qué la privacidad es poder", "Entender la asimetría de información", "Reconocer cómo tus datos se usan contra ti"],
      theory: `
        <p>Cierras la puerta del baño aunque todos saben lo que haces dentro. No es secreto, es <strong>privacidad</strong>: el derecho a decidir <em>qué</em> se sabe de ti, <em>quién</em> lo sabe y <em>cuándo</em>.</p>
        <h3>Tres conceptos que la gente mezcla</h3>
        <table>
          <tr><th>Concepto</th><th>Pregunta que responde</th><th>Analogía</th></tr>
          <tr><td><strong>Seguridad</strong></td><td>¿Pueden entrar sin permiso?</td><td>Puerta blindada</td></tr>
          <tr><td><strong>Privacidad</strong></td><td>¿Pueden ver lo que hago?</td><td>Cortinas</td></tr>
          <tr><td><strong>Anonimato</strong></td><td>¿Saben que soy yo?</td><td>Máscara</td></tr>
          <tr><td><strong>Soberanía</strong></td><td>¿Quién tiene las llaves?</td><td>Tú y solo tú</td></tr>
        </table>
        <h3>Por qué "no tengo nada que ocultar" es un error en 2026</h3>
        <ul>
          <li><strong>Precios y decisiones personalizadas</strong>: seguros, créditos y precios dinámicos se calculan con tu perfil.</li>
          <li><strong>Fraude a medida</strong>: los estafadores usan datos filtrados + IA para crear mensajes y voces creíbles con tu nombre, tu banco y tu familia.</li>
          <li><strong>Las reglas cambian</strong>: lo que hoy es legal o aceptable puede no serlo mañana; los datos son para siempre.</li>
          <li><strong>No es solo tuyo</strong>: tus contactos, fotos y audios exponen a tu familia.</li>
          <li><strong>La IA infiere</strong>: con tus "datos inocentes" un modelo deduce salud, ideología, orientación, ingresos o embarazo.</li>
        </ul>
        <div class="callout prof"><span class="ci">🎓</span><div>Respuesta corta para la próxima cena: <em>"No es que tenga algo que esconder, es que no tengo nada que regalar."</em></div></div>
      `,
      steps: [
        "Escribe 3 situaciones reales en las que un dato tuyo podría usarse en tu contra (ej.: tu dirección en una foto, tu voz en redes, tu teléfono filtrado).",
        "Revisa qué saben de ti: descarga tu archivo de Google en <b>takeout.google.com</b> o revisa <b>myactivity.google.com</b> (solo mirarlo es revelador).",
        "En Meta/Instagram: Configuración → Centro de cuentas → <b>Tu información y permisos</b> → Descargar tu información.",
        "Anota tu conclusión en las notas de esta lección: ¿qué te sorprendió más?"
      ],
      pitfalls: ["Caer en la paranoia y querer desaparecer de internet: el objetivo es control, no aislamiento."],
      prof: "Antes de levantar muros, un buen estratega estudia el terreno. El primer movimiento es mirar el mapa. Por eso empezamos viendo qué saben de ti.",
      tools: ["Google Takeout"]
    },
    {
      id: "m00l3", title: "El tablero 2026: quién te observa y cómo te perfila la IA", min: 20,
      objectives: ["Identificar los 5 actores que recolectan tus datos", "Entender la vigilancia potenciada por IA", "Priorizar defensas según el actor"],
      theory: `
        <h3>Los 5 actores</h3>
        <ol>
          <li><strong>Big Tech y publicidad</strong>: Google, Meta, Microsoft, Amazon, TikTok. Modelo de negocio: tu atención y tu perfil.</li>
          <li><strong>Data brokers</strong>: compran, cruzan y revenden fichas con nombre, teléfono, dirección, ingresos e intereses.</li>
          <li><strong>Ciberdelincuentes</strong>: infostealers, phishing con IA, SIM swapping, extorsión, fraude con deepfakes.</li>
          <li><strong>Tu entorno</strong>: ex parejas, vecinos, compañeros curiosos, stalkers con herramientas OSINT.</li>
          <li><strong>Estados</strong>: retención de datos de telecomunicaciones, peticiones a empresas, vigilancia masiva.</li>
        </ol>
        <h3>Lo que cambió con la IA</h3>
        <ul>
          <li><strong>Correlación masiva</strong>: un LLM cruza en segundos lo que antes llevaba semanas (tu username + una foto + tu forma de escribir).</li>
          <li><strong>Phishing perfecto</strong>: sin faltas de ortografía, en tu idioma, con contexto real sacado de tus redes.</li>
          <li><strong>Clonación de voz y rostro</strong>: con pocos segundos de audio se genera una voz convincente.</li>
          <li><strong>IA en el dispositivo</strong>: funciones que "ven" tu pantalla (Recall, asistentes) crean nuevas superficies de exposición.</li>
          <li><strong>Agentes que actúan por ti</strong>: si un agente IA lee un correo malicioso, puede ser manipulado (prompt injection).</li>
        </ul>
        <div class="callout warn"><span class="ci">⚠️</span><div>No necesitas defenderte de todos a la vez. Para el 95% de las personas, los actores 1, 2 y 3 son los que realmente causan daño. Empieza por ahí.</div></div>
      `,
      steps: [
        "Ordena los 5 actores del 1 al 5 según cuánto te preocupan <b>a ti</b>. Esto será la base de tu modelo de amenazas (Módulo 01).",
        "Busca tu correo principal en <b>haveibeenpwned.com</b> para ver en cuántas filtraciones aparece.",
        "Busca tu número de teléfono entre comillas en un buscador para ver si está publicado en algún sitio."
      ],
      pitfalls: ["Pensar que una VPN te protege de todo: no protege de phishing, ni de infostealers, ni de lo que tú publicas."],
      prof: "Siempre empiezo con la pregunta: ¿de quién te proteges? Sin esa respuesta, cualquier herramienta es teatro de seguridad.",
      tools: ["Have I Been Pwned"]
    }
  ],
  quiz: [
    { q: "¿Qué protege principalmente la PRIVACIDAD?", o: ["Que nadie entre en tus cuentas", "Que no puedan observar lo que haces", "Que tu identidad sea desconocida", "Que tu disco esté cifrado"], a: 1, e: "Seguridad = que no entren; privacidad = que no miren; anonimato = que no sepan que eres tú." },
    { q: "¿Cuál de estos actores suele causar más daño directo a una persona común?", o: ["Agencias de inteligencia extranjeras", "Ciberdelincuentes y data brokers", "Investigadores académicos", "Proveedores de hosting"], a: 1, e: "El fraude, el robo de cuentas y la venta de datos personales son los daños más frecuentes." },
    { q: "Con la IA, ¿qué cambió en el phishing?", o: ["Desapareció", "Ahora es más fácil de detectar por las faltas", "Es personalizado, sin errores y puede incluir voz clonada", "Solo afecta a empresas"], a: 2, e: "La IA elimina las señales clásicas (faltas, mal idioma) y añade personalización y voz." }
  ]
});

BASTION.modules.push({
  id: "m01", num: "01", icon: "🧩", color: "em", level: 1,
  title: "OPSEC, Modelo de Amenazas y Compartimentación de 4 Capas",
  subtitle: "Identificadores, LINDDUN, STRIDE y la arquitectura que separa tu vida digital",
  summary: "El núcleo del método. Aprendes cómo te identifican (identificadores primarios y secundarios), diseñas tu modelo de amenazas y construyes compartimentos estancos para que una filtración nunca hunda todo el barco.",
  outcomes: ["Mapear tus identificadores", "Hacer un modelo de amenazas personal", "Diseñar tus 4 capas de identidad", "Evaluar herramientas con criterio"],
  lessons: [
    {
      id: "m01l1", title: "Identificadores primarios y secundarios: cómo te reconocen", min: 25,
      objectives: ["Clasificar tus identificadores", "Comprobar tu huella de navegador", "Eliminar metadatos EXIF"],
      theory: `
        <p>Todo rastreo consiste en <strong>unir puntos</strong>. Cada punto es un identificador.</p>
        <h3>Primarios: gritan tu nombre</h3>
        <ul>
          <li>Nombre completo y documento (cédula, DNI, pasaporte).</li>
          <li><strong>Número de teléfono</strong>: el identificador más peligroso de 2026. Une banco, WhatsApp, redes, ubicación por antenas y recuperación de cuentas.</li>
          <li>Correo principal (sobre todo si es nombre.apellido@).</li>
          <li>Tarjetas y cuentas bancarias.</li>
          <li>Rostro y voz (ya son identificadores primarios gracias a la IA).</li>
        </ul>
        <h3>Secundarios: te delatan sin tu nombre</h3>
        <ul>
          <li>Dirección IP (casa, trabajo, datos móviles).</li>
          <li><strong>Huella del navegador</strong> (fingerprinting): pantalla, GPU, fuentes, idioma, zona horaria… combinación casi única.</li>
          <li>IDs de hardware: MAC, IMEI, ID de publicidad (GAID/IDFA).</li>
          <li><strong>Metadatos EXIF</strong>: GPS, modelo de cámara, fecha en fotos; autor y software en PDFs y Office.</li>
          <li>Patrones de comportamiento: horario, forma de escribir (estilometría), ritmo de tecleo.</li>
          <li>Usernames reutilizados entre plataformas.</li>
        </ul>
        <div class="callout tip"><span class="ci">✅</span><div>Regla de oro: <strong>nunca reutilices un identificador entre compartimentos</strong>. Ni el correo, ni el teléfono, ni el username, ni la foto de perfil.</div></div>
      `,
      steps: [
        "Haz el test de huella en <b>coveryourtracks.eff.org</b> con tu navegador actual. Anota si tu huella es 'única'.",
        "Haz una lista de tus identificadores primarios: ¿cuántos correos?, ¿cuántos números?, ¿cuántos usernames repetidos?",
        "Instala <b>ExifCleaner</b> (PC) o <b>Scrambled Exif</b> (Android). En iPhone: al compartir una foto toca <b>Opciones</b> → desactiva <b>Ubicación</b>.",
        "Desactiva el geoetiquetado de la cámara: Android → Cámara → Ajustes → <b>Etiquetas de ubicación: off</b>. iPhone → Ajustes → Privacidad → Localización → Cámara → <b>Nunca</b>.",
        "Busca tu username habitual en <b>whatsmyname.app</b> y anota cuántas cuentas aparecen."
      ],
      code: { title: "Comprobar y limpiar metadatos con exiftool (opcional, avanzado)", body: "# Ver todos los metadatos de una imagen\nexiftool foto.jpg\n\n# Ver solo coordenadas GPS\nexiftool -gps:all foto.jpg\n\n# Eliminar TODOS los metadatos (crea copia _original)\nexiftool -all= foto.jpg\n\n# Limpiar una carpeta entera\nexiftool -all= -overwrite_original ./fotos/" },
      pitfalls: ["Creer que el modo incógnito te hace anónimo: solo no guarda historial local.", "Enviar fotos como 'documento' por WhatsApp/Telegram: así SÍ conservan los metadatos."],
      prof: "Te pido un ejercicio que nunca falla: dibuja en un papel tu nombre en el centro y une con flechas cada identificador. Verás que el teléfono es el nudo central. Por eso lo vamos a proteger tanto.",
      tools: ["ExifCleaner", "Scrambled Exif", "Cover Your Tracks", "WhatsMyName"]
    },
    {
      id: "m01l2", title: "Modelo de amenazas personal: LINDDUN + STRIDE sin complicarte", min: 30,
      objectives: ["Responder las 5 preguntas del modelo de amenazas", "Aplicar LINDDUN a tu vida", "Elegir tu nivel de protección"],
      theory: `
        <p>Un <strong>modelo de amenazas</strong> responde 5 preguntas (formato EFF / Privacy Guides):</p>
        <ol>
          <li>¿Qué quiero proteger? (activos: dinero, cuentas, ubicación, familia, reputación)</li>
          <li>¿De quién? (adversarios)</li>
          <li>¿Qué tan probable es que lo necesite?</li>
          <li>¿Qué tan graves serían las consecuencias?</li>
          <li>¿Cuánto esfuerzo estoy dispuesto a invertir?</li>
        </ol>
        <h3>LINDDUN: las 7 amenazas a la privacidad</h3>
        <table>
          <tr><th>Letra</th><th>Amenaza</th><th>Ejemplo cotidiano</th></tr>
          <tr><td>L</td><td>Linkability (vinculación)</td><td>Dos cuentas "distintas" con el mismo teléfono.</td></tr>
          <tr><td>I</td><td>Identifiability</td><td>Un PDF con tu nombre en los metadatos.</td></tr>
          <tr><td>N</td><td>Non-repudiation</td><td>Mensajes firmados o capturas que prueban que fuiste tú.</td></tr>
          <tr><td>D</td><td>Detectability</td><td>Un archivo llamado "semilla_bitcoin.txt" en el escritorio.</td></tr>
          <tr><td>D</td><td>Disclosure</td><td>Una tienda hackeada con tus datos.</td></tr>
          <tr><td>U</td><td>Unawareness</td><td>Apps que leen tu portapapeles; telemetría silenciosa.</td></tr>
          <tr><td>N</td><td>Non-compliance</td><td>Una empresa que no borra tus datos aunque lo pidas.</td></tr>
        </table>
        <h3>STRIDE: la versión de seguridad</h3>
        <p><strong>S</strong>poofing (suplantación), <strong>T</strong>ampering (manipulación), <strong>R</strong>epudiation, <strong>I</strong>nformation disclosure, <strong>D</strong>enial of service, <strong>E</strong>levation of privilege. Úsalo para tus cuentas y dispositivos.</p>
        <h3>Los 3 perfiles de amenaza</h3>
        <ul>
          <li><strong>Perfil A – Ciudadano</strong>: proteger cuentas, dinero y familia del fraude. (90% de personas)</li>
          <li><strong>Perfil B – Expuesto</strong>: creador de contenido, empresario, persona con patrimonio o con un acosador.</li>
          <li><strong>Perfil C – Alto riesgo</strong>: periodista, activista, víctima de violencia, alto patrimonio en cripto.</li>
        </ul>
      `,
      steps: [
        "Abre <b>Laboratorios → Modelo de amenazas</b> y completa el asistente. Te dirá tu perfil (A, B o C).",
        "Haz tu inventario de activos: lista 10 cosas que perderías si te hackean mañana.",
        "Para cada activo, escribe qué letra de LINDDUN lo amenaza más.",
        "Elige 3 prioridades para este mes y escríbelas en las notas de esta lección."
      ],
      code: { title: "Plantilla de modelo de amenazas (cópiala)", body: "MI MODELO DE AMENAZAS — fecha: ____\n\n1. Activos a proteger:\n   - Cuentas bancarias / correo principal / fotos familiares / cripto / ubicación\n2. Adversarios probables:\n   - Estafadores (phishing, SIM swap), data brokers, ex-pareja/curiosos\n3. Probabilidad (1-5):  ___\n4. Impacto (1-5):       ___\n5. Esfuerzo que acepto: bajo / medio / alto\n\nPrioridades de este mes:\n   [ ] 1. ____________\n   [ ] 2. ____________\n   [ ] 3. ____________\n\nRevisar este modelo cada 6 meses o tras un cambio de vida." },
      pitfalls: ["Copiar el modelo de un activista si eres un ciudadano normal: te agotas sin necesidad.", "No revisar el modelo cuando cambia tu vida (nuevo trabajo, pareja, patrimonio, fama)."],
      prof: "Lo que hago con mis alumnos: puntuamos probabilidad × impacto de 1 a 25. Todo lo que pase de 12 se ataca este mes. Lo demás, después.",
      tools: []
    },
    {
      id: "m01l3", title: "Compartimentación de 4 capas: el submarino de compuertas estancas", min: 35,
      objectives: ["Diseñar tus 4 identidades", "Saber qué herramientas van en cada capa", "Aplicar las reglas de no-cruce"],
      theory: `
        <p>Un submarino está dividido en compartimentos: si uno se inunda, se cierra la compuerta y el resto sobrevive. En digital, usar el mismo correo, número y navegador para todo es un submarino sin compuertas.</p>
        <p>El método clásico usa 3 niveles. Para 2026 añadimos una capa para la IA y el trabajo técnico:</p>
        <table>
          <tr><th>Capa</th><th>Uso</th><th>Correo</th><th>Teléfono</th><th>Navegador</th></tr>
          <tr><td><strong>1 · Bóveda</strong> (identidad real)</td><td>Banco, impuestos, salud, notaría, gobierno</td><td>Correo cifrado exclusivo, nunca publicado</td><td>SIM principal, solo banco y familia</td><td>Perfil dedicado sin extensiones extra</td></tr>
          <tr><td><strong>2 · Avatar</strong> (seudónimo)</td><td>Compras, redes, suscripciones, trabajo</td><td>1 alias por servicio</td><td>Número secundario / virtual</td><td>Brave/Firefox endurecido</td></tr>
          <tr><td><strong>3 · Laboratorio IA</strong></td><td>Chatbots, APIs, agentes, código</td><td>Alias dedicados</td><td>Ninguno si es posible</td><td>Perfil separado + IA local para datos sensibles</td></tr>
          <tr><td><strong>4 · Fantasma</strong> (anónimo)</td><td>Investigación, cripto P2P, consultas sensibles</td><td>Creado sin datos reales</td><td>Ninguno / número sin vínculo</td><td>Mullvad Browser + VPN o Tor Browser</td></tr>
        </table>
        <h3>Las 6 reglas de no-cruce</h3>
        <ol>
          <li>Nunca inicies sesión en una cuenta de una capa desde el navegador de otra.</li>
          <li>Nunca reutilices correo, teléfono, username, foto de perfil ni contraseña entre capas.</li>
          <li>Nunca pagues en capa 4 con una tarjeta a tu nombre.</li>
          <li>Nunca pegues en un chatbot en la nube documentos de capa 1 sin anonimizar.</li>
          <li>Nunca uses la red de casa sin VPN para la capa 4.</li>
          <li>Cuida el horario y el estilo: publicar desde capa 4 justo después que desde capa 2 los vincula.</li>
        </ol>
      `,
      steps: [
        "Abre <b>Laboratorios → Arquitecto de compartimentos</b> y rellena las 4 capas con tus herramientas reales. Se guarda solo.",
        "Crea en tu navegador principal 2 perfiles: <b>'1-Bóveda'</b> y <b>'2-Diario'</b> (Brave/Chrome: icono de perfil → Añadir).",
        "En el perfil Bóveda guarda como marcadores SOLO las webs oficiales de tus bancos y entidades. Entra siempre desde ahí, nunca desde enlaces.",
        "Decide qué correo será tu correo de Bóveda (lo crearemos en el Módulo 06 si aún no existe).",
        "Escribe las 6 reglas de no-cruce en un papel cerca de tu escritorio durante el primer mes."
      ],
      code: { title: "Mapa rápido de compartimentos", body: "[CAPA 1 · BÓVEDA]   banco, impuestos, salud     → perfil 'Bóveda' + correo cifrado secreto\n        ║ (muralla)\n[CAPA 2 · AVATAR]   compras, redes, trabajo     → perfil 'Diario' + alias por web\n        ║ (muralla)\n[CAPA 3 · LAB IA]   chatbots, APIs, agentes     → perfil 'IA' + IA local para datos sensibles\n        ║ (muralla)\n[CAPA 4 · FANTASMA] investigación, P2P          → Mullvad Browser + VPN / Tor Browser" },
      pitfalls: ["Hacer la capa 4 'por si acaso' sin necesitarla: mantener un anonimato real cuesta disciplina.", "Sincronizar los perfiles del navegador con la misma cuenta de Google: une todo de nuevo."],
      prof: "No construyas las 4 capas el primer día. Semana 1: separa Bóveda de Diario. Semana 2: alias. Semana 3: capa IA. La capa Fantasma solo si tu modelo de amenazas la pide.",
      tools: ["Brave", "Mullvad Browser", "Tor Browser", "SimpleLogin", "Addy.io"]
    },
    {
      id: "m01l4", title: "Cómo auditar cualquier herramienta: los 6 filtros", min: 20,
      objectives: ["Evaluar apps sin depender del marketing", "Conocer fuentes fiables", "Reemplazar software espía"],
      theory: `
        <h3>Los 6 filtros</h3>
        <ol>
          <li><strong>Código abierto</strong> (y si es posible, compilaciones reproducibles): cualquiera puede revisar que no haya puertas traseras.</li>
          <li><strong>Cifrado de extremo a extremo / conocimiento cero</strong>: la empresa no puede leer tus datos aunque quiera o se lo ordenen.</li>
          <li><strong>Modelo de negocio claro</strong>: si es gratis y cerrado, el producto eres tú.</li>
          <li><strong>Auditorías independientes</strong> publicadas (Cure53, Trail of Bits, NCC Group…).</li>
          <li><strong>Jurisdicción e historial</strong>: dónde está la empresa y cómo respondió a peticiones legales y brechas pasadas.</li>
          <li><strong>Minimización de datos</strong>: ¿pide teléfono, nombre, contactos que no necesita?</li>
        </ol>
        <div class="callout info"><span class="ci">📚</span><div>Fuentes de referencia serias: <strong>privacyguides.org</strong> (recomendaciones comunitarias revisadas), <strong>alternativeto.net</strong> con filtro "Open Source", <strong>tosdr.org</strong> para términos de servicio y los informes de <strong>Mozilla *Privacy Not Included</strong> para dispositivos.</div></div>
        <div class="callout warn"><span class="ci">⚠️</span><div>Las reseñas de "las 10 mejores VPN" suelen ser publicidad afiliada. Desconfía de cualquier comparativa que gane comisión por cada venta.</div></div>
      `,
      steps: [
        "Lista las 10 apps que más usas. Pasa cada una por los 6 filtros (sí/no).",
        "Para cada app que suspenda 3 o más filtros, busca una alternativa en <b>alternativeto.net</b> (filtro Open Source) o en <b>privacyguides.org</b>.",
        "Revisa la nota de tus 5 servicios principales en <b>tosdr.org</b>.",
        "Consulta el <b>Arsenal</b> de esta academia: cada herramienta indica qué reemplaza."
      ],
      code: { title: "Tabla de reemplazo inmediato", body: "Chrome / Edge            →  Brave (endurecido) · Firefox/LibreWolf · Mullvad Browser\nGoogle Search            →  Brave Search · Startpage · DuckDuckGo · SearXNG\nGmail / Outlook          →  Proton Mail · Tuta  (+ SimpleLogin / Addy.io)\nGestor del navegador     →  Bitwarden · Proton Pass · KeePassXC\nGoogle Authenticator     →  Aegis (Android) · Ente Auth (todas)\nGoogle Drive / Dropbox   →  Proton Drive · Ente Photos · Cryptomator encima de tu nube\nWhatsApp (para lo sensible) → Signal · SimpleX Chat\nGboard / SwiftKey        →  FUTO Keyboard · HeliBoard\nChatGPT con datos sensibles → Ollama / LM Studio / Jan (local)" },
      pitfalls: ["Cambiar todo de golpe y perder accesos.", "Elegir una app 'privada' de código cerrado solo porque lo dice su web."],
      prof: "Mi regla personal: si una herramienta me pide el teléfono sin necesitarlo, ya perdió un punto. Si además no publica auditorías, la descarto.",
      tools: ["Privacy Guides", "AlternativeTo", "ToS;DR"]
    }
  ],
  quiz: [
    { q: "¿Cuál es el identificador primario más peligroso hoy?", o: ["La resolución de pantalla", "El número de teléfono", "El idioma del navegador", "El modelo de router"], a: 1, e: "El teléfono une banco, mensajería, redes, ubicación y recuperación de cuentas." },
    { q: "En LINDDUN, la 'L' de Linkability significa…", o: ["Que alguien puede vincular dos acciones o cuentas tuyas", "Que tu enlace está roto", "Que tu contraseña es débil", "Que tus datos están cifrados"], a: 0, e: "Romper la vinculabilidad es el objetivo número uno de la compartimentación." },
    { q: "¿Qué NO deberías hacer nunca en la capa Fantasma?", o: ["Usar Mullvad Browser", "Usar una VPN", "Pagar con una tarjeta a tu nombre", "Usar un correo creado sin datos reales"], a: 2, e: "Un pago a tu nombre vincula inmediatamente la identidad anónima con la real." },
    { q: "Una app es gratis, de código cerrado y pide acceso a tus contactos. ¿Qué filtros suspende?", o: ["Ninguno", "Código abierto, modelo de negocio y minimización", "Solo jurisdicción", "Solo auditoría"], a: 1, e: "Cerrada (filtro 1), gratis sin modelo claro (filtro 3) y pide datos innecesarios (filtro 6)." }
  ]
});

BASTION.modules.push({
  id: "m02", num: "02", icon: "🌐", color: "cy", level: 2,
  title: "Navegación Fantasma: Navegadores, Extensiones y Buscadores",
  subtitle: "Brave endurecido, Firefox/LibreWolf, Mullvad Browser, fingerprinting y buscadores privados",
  summary: "El navegador es la ventana por la que te asomas a internet. Lo convertimos en un búnker: perfiles separados, anti-huella, bloqueo agresivo, sin telemetría ni IA integrada innecesaria, y buscadores que no te perfilan.",
  outcomes: ["Endurecer Brave al máximo", "Configurar Firefox/LibreWolf y Mullvad Browser", "Elegir extensiones seguras", "Cambiar a buscadores privados"],
  lessons: [
    {
      id: "m02l1", title: "Brave endurecido: configuración quirúrgica paso a paso", min: 35,
      objectives: ["Activar escudos agresivos", "Evitar fugas WebRTC", "Quitar telemetría, Rewards, Wallet y Leo si no los usas"],
      theory: `
        <p><strong>Brave</strong> es Chromium sin la recolección de Google, con bloqueador integrado (no depende de extensiones MV2) y protección de huella por <em>aleatorización</em> (farbling): cada web ve una huella ligeramente distinta.</p>
        <p>Es la base perfecta para las capas 1 y 2. Pero de fábrica trae extras (Rewards, Wallet, Leo, noticias, VPN de pago) que conviene apagar.</p>
        <div class="callout info"><span class="ci">ℹ️</span><div>Desde 2025 Chrome eliminó el soporte de extensiones Manifest V2, lo que limitó a uBlock Origin. Brave mantiene su bloqueador nativo, por lo que no te afecta.</div></div>
      `,
      steps: [
        "Escudos: ve a <code>brave://settings/shields</code> → Bloqueo de rastreadores y anuncios: <b>Agresivo</b> · Cookies: <b>Bloquear de terceros</b> · Actualizar a HTTPS: <b>Estricto</b>.",
        "Huella estricta (opcional): abre <code>brave://flags/#brave-show-strict-fingerprinting-mode</code> → Enabled → reinicia → en escudos elige <b>Estricto</b> (puede romper alguna web; úsalo en perfil Fantasma).",
        "Filtros extra: <code>brave://settings/shields/filters</code> → activa <b>Fanboy's Annoyances</b>, <b>EasyPrivacy</b> y los filtros de cookies/banners.",
        "Privacidad: <code>brave://settings/privacy</code> → Política de IP WebRTC: <b>Deshabilitar UDP sin proxy</b>. Desactiva <b>P3A</b>, <b>ping de uso diario</b> e <b>informes de fallos</b>.",
        "Activa <b>Enviar 'No rastrear'/GPC</b> y desactiva <b>Usar servicios de Google para mensajería push</b> si no la necesitas.",
        "Apaga extras: <code>brave://settings/appearance</code> → oculta botón de Rewards, Wallet y Leo. En <code>brave://settings/leo-ai</code> desactiva Leo si no lo usas. En <code>brave://settings/web3</code> → Wallet por defecto: <b>Ninguna/extensiones</b>.",
        "Contraseñas: <code>brave://settings/autofill</code> → desactiva <b>Ofrecer guardar contraseñas</b> y <b>Métodos de pago</b> (usaremos Bitwarden).",
        "Al cerrar: <code>brave://settings/cookies</code> → activa <b>Borrar cookies y datos al cerrar todas las ventanas</b> en el perfil Diario y añade excepciones solo para webs que uses a diario.",
        "Buscador: <code>brave://settings/search</code> → <b>Brave Search</b> o <b>Startpage</b>.",
        "Repite la configuración en cada perfil (Bóveda / Diario / IA)."
      ],
      code: { title: "Rutas de Brave para copiar y pegar", body: "brave://settings/shields                 # escudos: agresivo, 3rd-party cookies, HTTPS estricto\nbrave://settings/shields/filters         # listas extra: EasyPrivacy, Annoyances\nbrave://settings/privacy                 # WebRTC: 'Disable non-proxied UDP', sin P3A ni pings\nbrave://settings/autofill                # sin contraseñas ni tarjetas guardadas\nbrave://settings/cookies                 # borrar al cerrar\nbrave://settings/search                  # Brave Search / Startpage\nbrave://settings/leo-ai                  # desactivar Leo si no lo usas\nbrave://flags/#brave-show-strict-fingerprinting-mode" },
      pitfalls: ["Instalar 15 extensiones: cada extensión es un riesgo y hace tu huella más única.", "Iniciar sesión en Google dentro del navegador (sincroniza todo con tu cuenta)."],
      prof: "Después de configurar, vuelve a coveryourtracks.eff.org. Si sale 'tu navegador tiene protección contra huella aleatorizada', vas bien.",
      tools: ["Brave", "Cover Your Tracks"]
    },
    {
      id: "m02l2", title: "Firefox, LibreWolf y Mullvad Browser: la familia anti-huella", min: 30,
      objectives: ["Elegir el navegador correcto para cada capa", "Endurecer Firefox", "Usar Mullvad Browser correctamente"],
      theory: `
        <table>
          <tr><th>Navegador</th><th>Estrategia anti-huella</th><th>Ideal para</th></tr>
          <tr><td><strong>Firefox</strong> endurecido</td><td>Protección mejorada estricta + resistFingerprinting opcional</td><td>Capa 2, alternativa a Chromium</td></tr>
          <tr><td><strong>LibreWolf</strong></td><td>Firefox ya endurecido, sin telemetría, uBlock incluido</td><td>Capa 2–3</td></tr>
          <tr><td><strong>Mullvad Browser</strong></td><td>Hecho con el Proyecto Tor: <em>todos los usuarios iguales</em> (uniformidad)</td><td>Capa 4 con VPN</td></tr>
          <tr><td><strong>Tor Browser</strong></td><td>Uniformidad + red Tor</td><td>Capa 4 máxima</td></tr>
        </table>
        <p>Dos filosofías: <strong>aleatorizar</strong> (Brave) o <strong>uniformar</strong> (Tor/Mullvad: todos se ven igual). La uniformidad solo funciona si <strong>no tocas nada</strong>: ni extensiones, ni tamaño de ventana, ni fuentes.</p>
      `,
      steps: [
        "Firefox: Ajustes → Privacidad y seguridad → Protección contra rastreo mejorada: <b>Estricta</b>.",
        "Firefox: activa <b>Decir a los sitios web que no vendan ni compartan mis datos (GPC)</b> y <b>Modo solo HTTPS en todas las ventanas</b>.",
        "Firefox: desmarca todo en <b>Recopilación y uso de datos de Firefox</b> (telemetría, estudios, informes) y desactiva <b>publicidad que preserva la privacidad</b> (PPA/medición de atribución).",
        "Firefox: instala solo <b>uBlock Origin</b> (sigue soportado al 100% en Firefox). Opcional: Multi-Account Containers para separar identidades.",
        "Descarga <b>Mullvad Browser</b> desde mullvad.net/browser. Úsalo con la ventana al tamaño por defecto (letterboxing) y <b>sin extensiones</b>.",
        "En Mullvad Browser elige el nivel de seguridad: icono del escudo → <b>Más seguro</b> para webs desconocidas.",
        "Asigna en tu Arquitecto de compartimentos qué navegador usa cada capa."
      ],
      code: { title: "Ajustes avanzados de Firefox en about:config (opcional)", body: "privacy.resistFingerprinting = true          # máxima resistencia (zona horaria UTC, letterboxing)\nmedia.peerconnection.ice.default_address_only = true   # reduce fugas WebRTC\nnetwork.http.referer.XOriginPolicy = 2       # no enviar referer entre dominios\ngeo.enabled = false                          # sin geolocalización del navegador\nbrowser.urlbar.suggest.quicksuggest.sponsored = false\n\n# Alternativa sin tocar a mano: plantilla 'arkenfox user.js' (github.com/arkenfox/user.js)" },
      pitfalls: ["Maximizar Mullvad/Tor Browser: revela la resolución de tu pantalla.", "Iniciar sesión en tu cuenta personal dentro del navegador Fantasma."],
      prof: "Mi combinación favorita para empezar: Brave para Bóveda y Diario, Mullvad Browser + VPN para lo sensible. Simple y muy eficaz.",
      tools: ["Firefox", "LibreWolf", "Mullvad Browser", "uBlock Origin", "Tor Browser"]
    },
    {
      id: "m02l3", title: "Extensiones: las pocas que valen la pena y las que te espían", min: 20,
      objectives: ["Reducir extensiones al mínimo", "Detectar extensiones maliciosas", "Auditar permisos"],
      theory: `
        <p>Las extensiones tienen permisos enormes: pueden leer <strong>todo lo que ves y escribes</strong> en cada web. En 2024–2025 hubo campañas en las que extensiones legítimas con millones de usuarios fueron compradas o hackeadas y actualizadas con código que robaba sesiones y datos.</p>
        <h3>Lista corta recomendada</h3>
        <ul>
          <li><strong>uBlock Origin</strong> (Firefox) — bloqueo de rastreadores. En Brave no hace falta.</li>
          <li><strong>Bitwarden / Proton Pass</strong> — gestor de contraseñas.</li>
          <li><strong>Firefox Multi-Account Containers</strong> — separar identidades en Firefox.</li>
        </ul>
        <h3>Señales de alarma</h3>
        <ul>
          <li>"Leer y cambiar todos tus datos en todos los sitios web" sin justificación.</li>
          <li>Cambio reciente de desarrollador o de nombre.</li>
          <li>Extensiones de "VPN gratis", "descargar videos", "IA para resumir" de autores desconocidos.</li>
        </ul>
      `,
      steps: [
        "Abre <code>brave://extensions</code> (o about:addons) y <b>elimina</b> todo lo que no hayas usado en el último mes.",
        "Para cada extensión que quede, revisa <b>Detalles → Acceso a sitios</b> y cámbialo a <b>Al hacer clic</b> o <b>En sitios específicos</b>.",
        "Desactiva TODAS las extensiones en el perfil Bóveda salvo el gestor de contraseñas.",
        "Anota las extensiones que conservas en tus notas y revísalas cada 3 meses."
      ],
      pitfalls: ["Instalar extensiones de IA que leen todas tus pestañas: envían tu navegación a su servidor."],
      prof: "Menos es más: cada extensión es un empleado con llave de tu casa. Contrata solo los imprescindibles.",
      tools: ["uBlock Origin", "Bitwarden"]
    },
    {
      id: "m02l4", title: "Buscadores privados y búsqueda con IA sin regalar tus preguntas", min: 15,
      objectives: ["Cambiar de buscador", "Entender los índices propios", "Usar respuestas IA con privacidad"],
      theory: `
        <p>Tus búsquedas revelan salud, problemas legales, finanzas e intenciones. Google las asocia a tu cuenta e IP.</p>
        <table>
          <tr><th>Buscador</th><th>Índice</th><th>Nota</th></tr>
          <tr><td>Brave Search</td><td>Propio e independiente</td><td>Incluye respuestas IA opcionales sin cuenta</td></tr>
          <tr><td>Startpage</td><td>Resultados de Google vía proxy</td><td>Bueno si echas de menos a Google</td></tr>
          <tr><td>DuckDuckGo</td><td>Mayormente Bing</td><td>Duck.ai permite chatear con modelos sin cuenta, anonimizando la IP</td></tr>
          <tr><td>Mojeek</td><td>Propio</td><td>Pequeño pero independiente</td></tr>
          <tr><td>SearXNG</td><td>Metabuscador</td><td>Puedes alojarlo tú (Módulo 14)</td></tr>
        </table>
      `,
      steps: [
        "Cambia el buscador predeterminado en todos tus navegadores y en el móvil.",
        "Prueba durante 7 días <b>Brave Search</b>; si algo no lo encuentras, añade <code>!g</code> en DuckDuckGo o usa Startpage.",
        "Para preguntas a IA sin cuenta, prueba <b>duck.ai</b> o la respuesta IA de Brave Search en lugar de iniciar sesión en un chatbot.",
        "Borra tu historial de búsqueda antiguo en <b>myactivity.google.com</b> y activa la eliminación automática a 3 meses."
      ],
      pitfalls: ["Usar un buscador privado pero con la sesión de Google abierta en otra pestaña del mismo perfil."],
      prof: "La búsqueda es donde más honesto eres en tu vida. Protegerla es de lo más rentable del curso.",
      tools: ["Brave Search", "Startpage", "DuckDuckGo", "SearXNG"]
    }
  ],
  quiz: [
    { q: "¿Qué estrategia anti-huella usa Mullvad Browser?", o: ["Aleatorizar la huella", "Hacer que todos los usuarios se vean iguales", "Bloquear JavaScript siempre", "Cambiar de IP cada minuto"], a: 1, e: "Uniformidad: funciona si no modificas el navegador (sin extensiones, sin maximizar)." },
    { q: "¿Qué ajuste de Brave evita que webs vean tu IP real con WebRTC?", o: ["Cookies estrictas", "Política WebRTC: deshabilitar UDP sin proxy", "Modo oscuro", "HTTPS estricto"], a: 1, e: "WebRTC puede filtrar tu IP incluso con VPN si no se restringe." },
    { q: "¿Por qué reducir extensiones?", o: ["Gastan batería", "Pueden leer todo lo que haces y hacen tu huella más única", "Son ilegales", "Rompen HTTPS"], a: 1, e: "Una extensión comprometida puede robar sesiones y datos." }
  ]
});

BASTION.modules.push({
  id: "m03", num: "03", icon: "📡", color: "cy", level: 2,
  title: "Red Blindada: DNS Cifrado, VPN Post-Cuántica, Tor y Router",
  subtitle: "NextDNS, Mullvad/Proton/IVPN, DAITA, split tunneling, Tor, OpenWrt y Wi-Fi público",
  summary: "Protegemos el camino de tus datos: quién ve a qué servidores te conectas, cómo cortar la telemetría antes de que salga, cuándo usar VPN o Tor, y cómo convertir el router de casa en un cortafuegos.",
  outcomes: ["Configurar DNS cifrado con bloqueo", "Usar una VPN de verdad", "Entender Tor", "Blindar tu router y Wi-Fi"],
  lessons: [
    {
      id: "m03l1", title: "DNS cifrado y cortafuegos en la nube con NextDNS", min: 30,
      objectives: ["Entender qué revela el DNS", "Configurar NextDNS con listas equilibradas", "Activarlo en Android, iPhone, Windows y navegador"],
      theory: `
        <p>Antes de conectarse a cualquier servidor, tu dispositivo pregunta al <strong>DNS</strong> "¿qué IP tiene este dominio?". Por defecto lo pregunta en claro a tu operadora, que puede registrarlo todo.</p>
        <p><strong>NextDNS</strong> (o alternativas como Quad9, Mullvad DNS, AdGuard DNS, Control D) cifra esas consultas (DoH/DoT/DoQ) y además <strong>bloquea</strong> dominios de rastreo, publicidad, malware y telemetría <em>antes</em> de que tu dispositivo se conecte. Plan gratuito: 300.000 consultas/mes.</p>
        <div class="callout tip"><span class="ci">✅</span><div>Si usas una VPN con bloqueo DNS integrado (Mullvad, Proton), en el ordenador puedes usar el DNS de la VPN. NextDNS brilla en el <strong>móvil</strong> y en dispositivos donde no hay VPN.</div></div>
      `,
      steps: [
        "Crea una cuenta en <b>my.nextdns.io</b> con un alias de correo (no pide datos personales).",
        "Pestaña <b>Seguridad</b>: activa inteligencia de amenazas, Google Safe Browsing, protección contra cryptojacking, contra DNS rebinding, ataques homógrafos IDN, typosquatting, DGA y <b>Bloquear dominios recién registrados (NRD)</b>.",
        "Pestaña <b>Privacidad</b>: añade solo 2–3 listas para no romper webs: <b>NextDNS Ads & Trackers</b>, <b>OISD</b> o <b>HaGeZi Multi PRO</b>. Activa <b>Bloquear rastreadores nativos</b> de tus marcas (Windows, Apple, Samsung, Xiaomi, Huawei…).",
        "Activa <b>Bloquear afiliados y enlaces de seguimiento</b> solo si no te molesta que algunos enlaces de compras fallen.",
        "Pestaña <b>Ajustes</b>: registros desactivados o retención de 1 hora; ubicación de almacenamiento en Suiza/UE.",
        "Android 9+: Ajustes → Redes e Internet → <b>DNS privado</b> → Nombre de host del proveedor → pega <code>TU-ID.dns.nextdns.io</code>.",
        "iPhone/Mac: descarga el <b>perfil de configuración</b> desde apple.nextdns.io e instálalo en Ajustes → General → VPN y gestión de dispositivos.",
        "Windows 11: Configuración → Red e Internet → Wi-Fi/Ethernet → Asignación de servidor DNS → Editar → DNS sobre HTTPS con la plantilla de NextDNS (o instala la app de NextDNS).",
        "Comprueba en <b>test.nextdns.io</b> que dice <code>status: ok</code> y el protocolo cifrado."
      ],
      code: { title: "Referencias rápidas", body: "# Android · DNS privado (DoT)\nTU-ID.dns.nextdns.io\n\n# DoH (navegadores / Windows)\nhttps://dns.nextdns.io/TU-ID\n\n# Verificación\nhttps://test.nextdns.io     → debe mostrar status: ok\n\n# Alternativas sin cuenta\nQuad9 DoT:     dns.quad9.net\nMullvad DoT:   base.dns.mullvad.net   (bloquea anuncios+rastreadores)\nAdGuard DoT:   dns.adguard-dns.com" },
      pitfalls: ["Añadir 20 listas de bloqueo: rompes webs y acabas desactivándolo todo.", "Pensar que el DNS cifrado oculta tu IP: no, eso lo hace la VPN."],
      prof: "Mira el panel de Registros de NextDNS el primer día (luego apágalos). Ver cuántas veces por hora tu móvil llama a casa sin que lo uses cambia tu forma de ver la tecnología.",
      tools: ["NextDNS", "Quad9"]
    },
    {
      id: "m03l2", title: "VPN real en 2026: post-cuántica, DAITA, kill switch y split tunneling", min: 35,
      objectives: ["Saber qué protege y qué no una VPN", "Elegir proveedor", "Configurar WireGuard, kill switch, PQ y DAITA"],
      theory: `
        <p>Una VPN <strong>no te hace anónimo</strong>: traslada la confianza de tu operadora a la empresa de la VPN y oculta tu IP a las webs. Por eso el proveedor importa muchísimo.</p>
        <h3>Qué protege / qué no</h3>
        <table>
          <tr><th>Sí protege</th><th>No protege</th></tr>
          <tr><td>Tu operadora no ve qué webs visitas</td><td>Phishing, malware, infostealers</td></tr>
          <tr><td>Las webs no ven tu IP real</td><td>Lo que tú publicas o con qué cuenta inicias sesión</td></tr>
          <tr><td>Wi-Fi públicos hostiles</td><td>La huella del navegador</td></tr>
        </table>
        <h3>Proveedores que pasan los filtros</h3>
        <ul>
          <li><strong>Mullvad</strong>: cuenta de 16 dígitos sin correo, pago en efectivo/cripto, tarifa plana, auditorías, servidores sin disco (RAM).</li>
          <li><strong>IVPN</strong>: modelo similar, sin correo.</li>
          <li><strong>Proton VPN</strong>: plan gratuito decente, Secure Core, código abierto, sede en Suiza.</li>
        </ul>
        <h3>Conceptos 2026</h3>
        <ul>
          <li><strong>Túneles post-cuánticos</strong>: protegen contra "cosechar ahora, descifrar después" combinando intercambio clásico con <strong>ML-KEM</strong> (estándar NIST FIPS 203). Mullvad los ofrece en WireGuard.</li>
          <li><strong>DAITA</strong> (Mullvad): rellena y mezcla paquetes con tráfico señuelo para dificultar el análisis de tráfico guiado por IA.</li>
          <li><strong>Ofuscación</strong>: modos para redes que bloquean VPN (Shadowsocks, QUIC, puertos alternativos; en Proton, "Stealth").</li>
          <li><strong>Multihop</strong>: entras por un servidor y sales por otro.</li>
        </ul>
      `,
      steps: [
        "Elige proveedor según tu modelo de amenazas. Si quieres probar gratis: <b>Proton VPN Free</b>. Para anonimato de pago: <b>Mullvad</b> (paga con efectivo por correo o cripto).",
        "Protocolo: <b>WireGuard</b>.",
        "Activa <b>Kill switch / Bloquear sin VPN</b> y <b>Conexión automática al iniciar</b>.",
        "Android: Ajustes → Red → VPN → ⚙ de tu VPN → <b>VPN siempre activa</b> + <b>Bloquear conexiones sin VPN</b>.",
        "Mullvad: Ajustes → VPN → <b>Resistencia cuántica: On</b> y prueba <b>DAITA</b> en capa Fantasma (consume más datos).",
        "Split tunneling: excluye del túnel solo apps que lo necesiten (p. ej. la app del banco que bloquea IPs extranjeras), nunca el navegador Fantasma.",
        "Verifica en <b>mullvad.net/check</b> o <b>ipleak.net</b> que no hay fugas de IP, DNS ni WebRTC."
      ],
      code: { title: "Arquitectura de red por capa", body: "Capa 1 Bóveda   → conexión normal o VPN con split-tunnel para la app bancaria + DNS cifrado\nCapa 2 Avatar   → VPN WireGuard + kill switch + DNS con bloqueo\nCapa 3 Lab IA   → VPN + DNS con bloqueo (las APIs ven la IP de la VPN)\nCapa 4 Fantasma → Mullvad (PQ + DAITA/multihop) + Mullvad Browser   ó   Tor Browser" },
      pitfalls: ["VPNs 'gratis' desconocidas: muchas venden tu tráfico o instalan SDKs de rastreo.", "Usar VPN y luego entrar con tu cuenta real en la capa Fantasma."],
      prof: "La pregunta clave: ¿confío más en mi operadora o en esta empresa de VPN? Si la respuesta no es un sí rotundo, no la uses.",
      tools: ["Mullvad VPN", "Proton VPN", "IVPN", "ipleak.net"]
    },
    {
      id: "m03l3", title: "Tor y Tor Browser: cuándo, cómo y errores que te delatan", min: 25,
      objectives: ["Entender los 3 saltos de Tor", "Usar puentes cuando hay censura", "Evitar errores de OPSEC"],
      theory: `
        <p>Tor envía tu tráfico cifrado por 3 nodos voluntarios (guardia → intermedio → salida). Ningún nodo conoce a la vez quién eres y a dónde vas.</p>
        <ul>
          <li>Ideal para: capa Fantasma, investigación sensible, eludir censura, acceder a servicios .onion.</li>
          <li>No ideal para: descargas pesadas, streaming, iniciar sesión en cuentas personales.</li>
        </ul>
        <h3>Errores fatales</h3>
        <ol>
          <li>Iniciar sesión con tu cuenta real.</li>
          <li>Abrir documentos descargados (PDF/DOCX) mientras estás conectado a internet fuera de Tor: pueden hacer peticiones y revelar tu IP.</li>
          <li>Instalar extensiones o maximizar la ventana.</li>
          <li>Usar BitTorrent sobre Tor.</li>
          <li>Mezclar en la misma sesión una identidad real y una anónima.</li>
        </ol>
      `,
      steps: [
        "Descarga Tor Browser SOLO desde <b>torproject.org</b> (en Android, la app oficial de Google Play o F-Droid del Tor Project).",
        "Icono del escudo → Configuración de seguridad → <b>Más seguro</b> (o <b>El más seguro</b> en sitios desconocidos).",
        "Si tu red bloquea Tor: Configuración → Conexión → <b>Puentes</b> → obfs4, <b>Snowflake</b> o webtunnel.",
        "Para cambiar de identidad usa <b>Nueva identidad</b> (icono escoba) entre actividades distintas.",
        "Abre los archivos descargados desde Tor en una máquina sin conexión o en Tails / una VM sin red."
      ],
      pitfalls: ["Pensar que Tor cifra hasta el destino: el nodo de salida ve el tráfico si la web no es HTTPS."],
      prof: "Tor es una herramienta de precisión, no de uso diario. Para el 95% de tus días, Brave + VPN es lo correcto.",
      tools: ["Tor Browser", "Tails"]
    },
    {
      id: "m03l4", title: "Router y hogar: blindar el router del ISP, OpenWrt/GL.iNet y red IoT", min: 35,
      objectives: ["Endurecer el router de tu operadora", "Separar la red IoT/invitados", "Conocer la opción OpenWrt con VPN y AdGuard Home"],
      theory: `
        <p>El router de la operadora suele tener administración remota (TR-069), DNS fijos, WPS activo y firmware desactualizado. Y en la misma red conviven tu portátil y una cámara china o una Smart TV que espía lo que ves (ACR).</p>
        <h3>Nivel 1: endurecer el router de la operadora</h3>
        <p>Cambia contraseña de admin, apaga WPS y UPnP, usa WPA3 (o WPA2/WPA3), activa la red de invitados y actualiza firmware.</p>
        <h3>Nivel 2: router propio con OpenWrt</h3>
        <p>Routers como <strong>GL.iNet</strong> (Flint 2, Beryl AX para viaje) traen una interfaz sencilla sobre OpenWrt con <strong>AdGuard Home</strong> y cliente <strong>WireGuard</strong> integrados: toda la casa navega con bloqueo y VPN sin configurar cada dispositivo.</p>
      `,
      steps: [
        "Entra en <code>192.168.1.1</code> o <code>192.168.0.1</code> (mira la etiqueta del router).",
        "Cambia la contraseña de administrador por una de 20+ caracteres (guárdala en Bitwarden).",
        "Desactiva <b>WPS</b> y <b>UPnP</b>. Desactiva la administración remota si aparece.",
        "Wi-Fi: <b>WPA3-Personal</b> (o mixto WPA2/WPA3), contraseña larga, SSID que no revele tu apellido ni operadora.",
        "Activa la <b>red de invitados</b> aislada y mueve ahí Smart TV, Alexa, cámaras, enchufes inteligentes y visitas.",
        "Smart TV: desactiva <b>ACR / Visualización de información / Live Plus / Samba Interactive</b> según la marca y el ID de publicidad.",
        "Opcional (nivel 2): router GL.iNet → panel <code>192.168.8.1</code> → Aplicaciones → <b>AdGuard Home</b> on → VPN → Cliente WireGuard → importa la configuración de Mullvad/Proton → activa <b>Kill switch</b>.",
        "Usa <b>LocalSend</b> para pasar archivos entre móvil y PC por la red local en lugar de enviártelos por WhatsApp."
      ],
      code: { title: "Checklist del router", body: "[ ] Contraseña admin cambiada (20+ caracteres)\n[ ] Firmware actualizado\n[ ] WPS desactivado\n[ ] UPnP desactivado\n[ ] Administración remota desactivada\n[ ] WPA3 / WPA2-WPA3 + clave Wi-Fi larga\n[ ] SSID neutro (sin nombre ni operadora)\n[ ] Red de invitados para IoT y visitas\n[ ] ACR de la Smart TV desactivado\n[ ] (Opcional) Router OpenWrt con AdGuard Home + WireGuard" },
      pitfalls: ["Dejar las cámaras IP con la contraseña por defecto: son las primeras en ser hackeadas."],
      prof: "La red de invitados es el ajuste más infravalorado del curso: 5 minutos y aíslas los aparatos más inseguros de tu casa.",
      tools: ["GL.iNet / OpenWrt", "AdGuard Home", "LocalSend"]
    },
    {
      id: "m03l5", title: "Wi-Fi público, viajes y redes hostiles", min: 15,
      objectives: ["Conectarte con seguridad fuera de casa", "Evitar portales falsos y juice jacking", "Preparar un kit de viaje"],
      theory: `
        <p>Aeropuertos, hoteles y cafeterías: redes con clientes desconocidos, portales cautivos falsos ("evil twin") y puertos USB públicos.</p>
        <ul>
          <li>Usa <strong>datos móviles</strong> o tu propio punto de acceso cuando puedas.</li>
          <li>Si usas Wi-Fi público: VPN con kill switch siempre.</li>
          <li>Desactiva la conexión automática a redes abiertas y "olvida" redes viejas.</li>
          <li>Carga con tu propio cargador o un bloqueador de datos USB.</li>
        </ul>
      `,
      steps: [
        "Móvil: desactiva <b>Conectarse automáticamente a redes públicas</b> y borra redes Wi-Fi guardadas que ya no uses.",
        "Activa la <b>MAC aleatoria</b> por red (Android: Wi-Fi → red → Privacidad → MAC aleatoria; iPhone: Dirección Wi-Fi privada: Rotativa).",
        "Prepara un kit de viaje: VPN configurada, cargador propio, cable solo-carga o bloqueador USB, y opcional un router de viaje GL.iNet.",
        "En el hotel, conecta el router de viaje al Wi-Fi del hotel y tus dispositivos al router: una sola autenticación y todo por VPN."
      ],
      pitfalls: ["Introducir tu contraseña de correo en un portal cautivo que te la pide para 'acceder a internet'."],
      prof: "En viajes, el mayor riesgo no es el hacker del café, es perder el móvil desbloqueado. Bloqueo corto y PIN largo antes de salir.",
      tools: ["Mullvad VPN", "GL.iNet / OpenWrt"]
    }
  ],
  quiz: [
    { q: "¿Qué hace un DNS con bloqueo como NextDNS?", o: ["Oculta tu IP", "Cifra consultas DNS y bloquea dominios de rastreo/malware", "Cifra tu disco", "Sustituye a la VPN"], a: 1, e: "Cifra y filtra las consultas; la IP la oculta la VPN." },
    { q: "¿Para qué sirven los túneles post-cuánticos (ML-KEM)?", o: ["Más velocidad", "Proteger contra 'cosechar ahora, descifrar después'", "Desbloquear streaming", "Evitar el kill switch"], a: 1, e: "Si alguien guarda hoy tu tráfico cifrado, un ordenador cuántico futuro no podrá abrirlo." },
    { q: "¿Qué debes desactivar en el router?", o: ["WPA3", "WPS y UPnP", "La red de invitados", "El firewall"], a: 1, e: "WPS y UPnP son vectores de ataque clásicos." },
    { q: "¿Cuál es un error fatal en Tor Browser?", o: ["Usar puentes", "Iniciar sesión con tu cuenta personal", "Usar el nivel 'Más seguro'", "Pulsar 'Nueva identidad'"], a: 1, e: "Iniciar sesión con tu identidad real anula todo el anonimato." }
  ]
});
