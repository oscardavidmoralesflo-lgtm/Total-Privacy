/* BASTIÓN · Ampliación v4: banco de preguntas (mínimo 5 por módulo) y módulo 21 (plan maestro) */
window.BASTION = window.BASTION || { modules: [] };

(function () {
  function mod(id) { return BASTION.modules.filter(function (m) { return m.id === id; })[0]; }
  var extra = {
    m00: [
      { q: "¿Qué significa soberanía digital?", o: ["Tener muchos dispositivos", "Que tú controlas las llaves y las decisiones sobre tus datos", "Usar solo servicios de tu país", "No usar internet"], a: 1, e: "Soberanía = decidir y custodiar tú mismo: claves, datos y accesos." },
      { q: "¿Por qué la IA hace más sensibles tus datos 'inocentes'?", o: ["No lo hace", "Puede inferir salud, ingresos o ideología a partir de ellos", "Los borra", "Los cifra automáticamente"], a: 1, e: "La inferencia convierte datos triviales en datos sensibles." }
    ],
    m01: [
      { q: "Quieres que un chatbot en la nube revise un contrato con tus datos. ¿Qué haces?", o: ["Pegarlo tal cual", "Anonimizarlo antes o usar una IA local", "Usar la capa Bóveda", "Enviarlo por correo al chatbot"], a: 1, e: "Los datos de capa 1 nunca entran sin anonimizar en servicios en la nube." }
    ],
    m02: [
      { q: "¿Qué bloqueador funciona completo en Firefox y quedó limitado en Chrome por Manifest V3?", o: ["uBlock Origin", "Bitwarden", "Grammarly", "Honey"], a: 0, e: "En Brave no hace falta porque el bloqueo es nativo." },
      { q: "¿Qué buscador usa un índice propio e independiente?", o: ["Startpage", "Brave Search", "Yahoo", "Ninguno"], a: 1, e: "Startpage usa resultados de Google mediante proxy; Brave Search tiene índice propio." }
    ],
    m03: [
      { q: "¿Qué hace el 'kill switch' de una VPN?", o: ["Apaga el ordenador", "Corta internet si el túnel se cae, para que no se filtre tu IP", "Borra las cookies", "Cambia de país"], a: 1, e: "Evita fugas en los segundos en que la VPN se reconecta." }
    ],
    m04: [
      { q: "Según la pirámide de contraseñas, ¿cuántas debes memorizar?", o: ["Todas", "2–3 frases maestras", "Ninguna", "Una por banco"], a: 1, e: "Cifrado del equipo, gestor y correo principal. El resto, en el gestor." }
    ],
    m05: [
      { q: "¿Qué es Windows Recall?", o: ["Un antivirus", "Una función que guarda capturas periódicas de tu pantalla para buscarlas", "Una VPN", "Un gestor de contraseñas"], a: 1, e: "Es opcional; si no la necesitas, desactívala y borra las instantáneas." }
    ],
    m06: [
      { q: "¿Desde dónde respondes a un correo que llegó a un alias?", o: ["Desde tu buzón real", "Desde el propio alias (contacto inverso)", "Desde otra cuenta de Gmail", "No se puede responder"], a: 1, e: "Así tu dirección real nunca queda expuesta." },
      { q: "¿Qué cifra Tuta además del cuerpo del mensaje?", o: ["Nada más", "El asunto", "La IP del destinatario", "El nombre del dominio"], a: 1, e: "Tuta cifra también los asuntos, a diferencia de PGP clásico." }
    ],
    m07: [
      { q: "¿Qué servicio analiza una URL y muestra una captura sin que la visites?", o: ["urlscan.io", "Paint", "WhatsApp Web", "Google Docs"], a: 0, e: "Útil para revisar enlaces sospechosos sin exponerte." }
    ],
    m08: [
      { q: "¿Qué web reúne enlaces para eliminar cuentas de cientos de servicios?", o: ["JustDeleteMe", "Shodan", "Canva", "Wikipedia"], a: 0, e: "Indica además la dificultad de cada borrado." },
      { q: "En la UE, ¿en qué plazo debe responder una empresa a tu solicitud de derechos?", o: ["1 año", "1 mes (ampliable en casos complejos)", "24 horas", "No hay plazo"], a: 1, e: "Si no responde, puedes reclamar ante la autoridad (AEPD en España)." }
    ],
    m09: [
      { q: "¿En qué fase del ciclo de inteligencia se ordenan y verifican los datos?", o: ["Planificación", "Procesamiento", "Difusión", "Recolección"], a: 1, e: "Planificar → recolectar → procesar → analizar → difundir." },
      { q: "¿Por qué investigar desde un perfil o máquina separada?", o: ["Por velocidad", "Para no dejar huella con tu identidad real", "Por obligación legal", "Para ver más anuncios"], a: 1, e: "Por ejemplo, LinkedIn muestra quién visitó un perfil." }
    ],
    m10: [
      { q: "¿Qué es RAG?", o: ["Un antivirus", "Que la IA responda apoyándose en tus documentos indexados", "Un tipo de VPN", "Una criptomoneda"], a: 1, e: "Con RAG local, tus documentos no salen de tu equipo." },
      { q: "Con 16 GB de memoria, ¿qué tamaño de modelo cuantizado es razonable?", o: ["70B", "7–9B", "400B", "1 billón"], a: 1, e: "Modelos de 7–9B en Q4 funcionan bien en 16 GB." }
    ],
    m11: [
      { q: "¿Qué principio aplicas a los tokens que usa un servidor MCP?", o: ["Acceso total para no tener errores", "Mínimo privilegio, caducidad corta y versiones fijas", "Compartirlos con el equipo", "Sin caducidad"], a: 1, e: "Limita el daño si la herramienta o el modelo son manipulados." }
    ],
    m12: [
      { q: "¿Qué estándar firma el origen y las ediciones de imágenes y vídeos?", o: ["C2PA / Content Credentials", "MP3", "WPA3", "PDF/A"], a: 0, e: "Permite comprobar la procedencia cuando el contenido lo incluye." },
      { q: "¿Qué hace el 'bloqueo de emergencia' del móvil?", o: ["Llama a la policía", "Desactiva la biometría hasta introducir el código", "Borra el móvil", "Apaga el Wi-Fi"], a: 1, e: "Útil antes de controles o situaciones de riesgo." }
    ],
    m13: [
      { q: "¿Qué es el 'coin control'?", o: ["Minar bitcoin", "Elegir qué monedas usa una transacción para no mezclar orígenes", "Un exchange", "Una tarjeta de crédito"], a: 1, e: "Evita vincular monedas de distinta procedencia." },
      { q: "¿Qué haces antes de mover una suma importante a una wallet nueva?", o: ["Nada", "Una prueba de recuperación con una cantidad pequeña", "Fotografiar la semilla", "Compartir la semilla con soporte"], a: 1, e: "Confirma que tu copia de la semilla funciona." }
    ],
    m14: [
      { q: "¿Por qué publicar un servicio en 127.0.0.1?", o: ["Por velocidad", "Para que solo tu propio equipo pueda acceder", "Para usar IPv6", "Para ahorrar disco"], a: 1, e: "Luego lo expones de forma controlada (VPN, proxy)." },
      { q: "¿Qué opción de Vaultwarden debes desactivar tras crear tu usuario?", o: ["SIGNUPS_ALLOWED", "DOMAIN", "El volumen de datos", "El puerto"], a: 0, e: "Si no, cualquiera podría registrarse en tu servidor." }
    ],
    m15: [
      { q: "¿Dónde configuras un contacto de legado en iPhone?", o: ["Ajustes → [tu nombre] → Inicio de sesión y seguridad → Contacto de legado", "En Fotos", "En Safari", "En Notas"], a: 0, e: "El contacto necesitará la clave de acceso y un certificado de defunción." },
      { q: "¿Cada cuánto conviene revisar el kit de herencia?", o: ["Nunca", "Cada 6–12 meses o tras cambios importantes", "Cada 20 años", "Solo al crearlo"], a: 1, e: "Cuentas, claves y activos cambian con el tiempo." }
    ],
    m16: [
      { q: "¿Qué ajuste de WhatsApp evita revelar tu IP en llamadas?", o: ["Proteger la dirección IP en las llamadas", "Modo oscuro", "Copia de seguridad", "Estado"], a: 0, e: "Está en Privacidad → Avanzado." },
      { q: "¿Qué es el 'sharenting'?", o: ["Compartir contraseñas", "Publicar en exceso información y fotos de los hijos", "Un virus", "Una VPN"], a: 1, e: "Construye una huella digital de los menores sin su consentimiento." }
    ],
    m17: [
      { q: "¿Dónde consultas tu historial crediticio en Colombia?", o: ["DataCrédito Experian y TransUnion", "La DIAN", "El RUNT", "La Registraduría"], a: 0, e: "La consulta del titular es gratuita periódicamente." },
      { q: "¿Qué datos conviene tapar al enviar una copia del documento?", o: ["Ninguno", "Los que no sean necesarios para el trámite", "Solo el nombre", "Todos, incluida la foto siempre"], a: 1, e: "Comparte el mínimo imprescindible y con marca de agua." },
      { q: "Una empresa desconocida te pide un 'selfie con tu documento'. ¿Qué haces?", o: ["Enviarlo enseguida", "Sospechar y verificar por canales oficiales", "Publicarlo", "Enviar solo el documento"], a: 1, e: "Es un patrón clásico de robo de identidad." }
    ],
    m18: [
      { q: "¿Qué es una CBDC?", o: ["Una criptomoneda privada", "Una moneda digital emitida por un banco central", "Un tipo de tarjeta", "Un exchange"], a: 1, e: "El euro digital es el ejemplo europeo." },
      { q: "¿Qué es Lightning?", o: ["Un banco", "Una red de canales de pago sobre Bitcoin para pagos rápidos y baratos", "Una VPN", "Un antivirus"], a: 1, e: "Ideal para gastos pequeños; el ahorro, en frío." }
    ],
    m19: [
      { q: "¿Qué ajuste de Android reduce el riesgo de falsas antenas (IMSI catchers)?", o: ["Desactivar 'Permitir 2G'", "Modo oscuro", "Ahorro de batería", "Activar NFC"], a: 0, e: "2G tiene un cifrado débil que estas antenas aprovechan." },
      { q: "¿Cómo compruebas que una bolsa Faraday funciona?", o: ["Mirándola", "Llamando al móvil dentro de ella: no debe sonar", "Pesándola", "No se puede comprobar"], a: 1, e: "Si recibe la llamada, no bloquea bien la señal." },
      { q: "Sospechas de stalkerware y hay riesgo de violencia. ¿Qué haces primero?", o: ["Desinstalarlo enseguida", "Buscar ayuda especializada y un plan de seguridad", "Publicarlo en redes", "Formatear sin avisar"], a: 1, e: "Eliminarlo de golpe puede alertar al agresor." }
    ],
    m20: [
      { q: "Bajo el RGPD, ¿en qué plazo se notifica una brecha con riesgo a la autoridad?", o: ["72 horas", "30 días", "1 año", "No se notifica"], a: 0, e: "Desde que se tiene conocimiento de la brecha." },
      { q: "¿Qué es la 'shadow AI'?", o: ["IA usada por hackers", "Empleados que usan IA con cuentas personales sin control de la empresa", "Un modelo local", "Un antivirus"], a: 1, e: "Se evita ofreciendo herramientas aprobadas y una política clara." },
      { q: "¿Qué es el principio de minimización?", o: ["Recoger todo por si acaso", "Recoger, guardar y dar acceso solo a lo necesario", "Borrar todos los datos", "Cifrar todos los datos"], a: 1, e: "El dato que no tienes no se puede filtrar." }
    ]
  };
  Object.keys(extra).forEach(function (id) { var m = mod(id); if (m) m.quiz = m.quiz.concat(extra[id]); });
})();

BASTION.modules.push({
  id: "m21", num: "21", icon: "🧭", color: "em", level: 5,
  title: "Tu Sistema Soberano: Plan Maestro, Mantenimiento y Actualización Continua",
  subtitle: "Integrar todo en una arquitectura, rutina de mantenimiento, cómo mantenerte al día y cómo enseñar a otros",
  summary: "El cierre del programa. Unes todo lo aprendido en un sistema propio de una página, estableces una rutina que lo mantiene vivo, aprendes a evaluar novedades sin caer en modas y multiplicas el efecto protegiendo a tu entorno.",
  outcomes: ["Documentar tu sistema completo", "Seguir una rutina de mantenimiento", "Evaluar herramientas nuevas con criterio", "Proteger a tu familia y equipo"],
  lessons: [
    {
      id: "m21l1", title: "Tu arquitectura final en una página", min: 30,
      objectives: ["Reunir todas tus decisiones en un documento", "Detectar huecos", "Guardarlo de forma segura"],
      theory: `
        <p>Un sistema que solo vive en tu cabeza se rompe al primer olvido. Los profesionales documentan su arquitectura: qué herramienta cubre qué riesgo, dónde están las copias y cómo se recupera cada cosa.</p>
        <h3>Las 8 piezas del sistema</h3>
        <ol>
          <li><strong>Identidad</strong>: capas, correos, alias y números.</li>
          <li><strong>Accesos</strong>: gestor, frases maestras, 2FA, passkeys y llaves.</li>
          <li><strong>Dispositivos</strong>: cifrado, actualizaciones, firewall y móvil.</li>
          <li><strong>Red</strong>: DNS, VPN, router y red de invitados.</li>
          <li><strong>Comunicaciones</strong>: mensajería y correo por capa.</li>
          <li><strong>Datos</strong>: nube cifrada y copias 3-2-1.</li>
          <li><strong>Dinero</strong>: banca compartimentada y custodia.</li>
          <li><strong>Continuidad</strong>: plan de incidentes y herencia.</li>
        </ol>
      `,
      steps: [
        "Copia la plantilla (bloque) y complétala con tus herramientas reales.",
        "Revisa tu <b>Arquitecto de compartimentos</b> en Laboratorios y que coincida con el documento.",
        "Marca en rojo cualquier pieza sin respaldo o sin recuperación probada.",
        "Guarda el documento en tu bóveda cifrada (no contiene contraseñas, solo la estructura).",
        "Añade una copia impresa al kit de herencia."
      ],
      code: { title: "Plantilla · Mi sistema soberano", body: "MI SISTEMA SOBERANO — versión ___ — fecha ___\n\n1. IDENTIDAD\n   Capa 1 Bóveda:   correo ______  teléfono ______  navegador ______\n   Capa 2 Avatar:   alias (SimpleLogin/Addy) ______  número ______\n   Capa 3 Lab IA:   perfil ______  IA local ______\n   Capa 4 Fantasma: navegador ______  red ______\n\n2. ACCESOS\n   Gestor: ______ (KDF Argon2id) · 2FA: ______ · Llaves FIDO2: __ (respaldo en ______)\n\n3. DISPOSITIVOS\n   PC: cifrado ______  firewall ______  ·  Móvil: ______ (parche: ____)\n\n4. RED\n   DNS ______ · VPN ______ · Router: WPS/UPnP off [ ] · red invitados [ ]\n\n5. COMUNICACIONES\n   Sensible: ______ · Familia: ______ · Trabajo: ______\n\n6. DATOS\n   Nube cifrada ______ · Copias 3-2-1: local ______ externa ______ remota ______\n   Última restauración probada: ____\n\n7. DINERO\n   Cuenta búnker ______ · operativa ______ · custodia ______\n\n8. CONTINUIDAD\n   Plan de incidentes impreso [ ] · Kit de herencia (revisado: ____) · contactos de legado [ ]" },
      pitfalls: ["Incluir contraseñas o semillas en el documento de arquitectura."],
      prof: "Este documento es tu mapa del bastión. Cuando algo falle, no improvisarás: lo consultarás.",
      tools: ["Bitwarden", "Cryptomator", "VeraCrypt"]
    },
    {
      id: "m21l2", title: "Rutina de mantenimiento: semanal, mensual, trimestral y anual", min: 20,
      objectives: ["Convertir la seguridad en hábito", "Programar revisiones", "Saber qué revisar en cada periodo"],
      theory: `
        <p>La seguridad se degrada sola: aparecen apps nuevas, cambian los ajustes de las plataformas, caducan llaves y se filtran bases de datos. Una rutina corta y fija evita que tu sistema envejezca.</p>
      `,
      steps: [
        "Copia el calendario (bloque) en tu agenda con recordatorios recurrentes.",
        "Haz hoy la primera revisión mensual completa.",
        "Programa la revisión anual coincidiendo con una fecha fácil de recordar (cumpleaños, año nuevo).",
        "Anota en tus notas de esta lección la fecha de cada revisión realizada."
      ],
      code: { title: "Calendario de mantenimiento", body: "SEMANAL (5 min)\n  [ ] Instalar actualizaciones pendientes (sistema, navegador, apps)\n  [ ] Repaso diario en Bastión (tarjetas)\n\nMENSUAL (20 min)\n  [ ] Revisar alertas de Have I Been Pwned y del gestor (contraseñas expuestas)\n  [ ] Revisar sesiones activas y dispositivos vinculados (correo, WhatsApp, Google, Apple)\n  [ ] Revisar movimientos bancarios y suscripciones\n  [ ] Comprobar que las copias de seguridad se están haciendo\n\nTRIMESTRAL (45 min)\n  [ ] Revisar permisos de apps en el móvil y apps con accesibilidad\n  [ ] Revisar ajustes de privacidad e IA de redes y chatbots\n  [ ] Restaurar un archivo de prueba de las copias\n  [ ] Revisar extensiones del navegador\n\nANUAL (2 h)\n  [ ] Revisar el modelo de amenazas y la arquitectura de una página\n  [ ] Consultar historial crediticio y data brokers\n  [ ] Actualizar el kit de herencia y los contactos de legado\n  [ ] Rotar contraseñas críticas que no tengan passkey\n  [ ] Repetir el examen final de Bastión" },
      pitfalls: ["Hacer una 'gran limpieza' una vez y no volver a mirar nunca."],
      prof: "Veinte minutos al mes mantienen en pie lo que te costó semanas construir.",
      tools: ["Have I Been Pwned", "Bitwarden"]
    },
    {
      id: "m21l3", title: "Mantenerte al día sin caer en modas: fuentes y criterio", min: 20,
      objectives: ["Elegir fuentes fiables", "Evaluar una herramienta nueva en 10 minutos", "Evitar el ruido y el miedo"],
      theory: `
        <h3>Fuentes recomendadas</h3>
        <ul>
          <li><strong>Privacidad y herramientas</strong>: Privacy Guides, EFF (Surveillance Self-Defense), Mozilla *Privacy Not Included.</li>
          <li><strong>Amenazas y fraudes</strong>: INCIBE (España), ColCERT (Colombia), CCN-CERT, CISA; medios como BleepingComputer o Krebs on Security.</li>
          <li><strong>IA y seguridad de agentes</strong>: OWASP GenAI Security Project, blogs de investigadores como Simon Willison.</li>
          <li><strong>Derechos digitales</strong>: EDRi (Europa), Fundación Karisma (Colombia), Access Now, R3D (México).</li>
        </ul>
        <h3>Evalúa una novedad en 10 minutos</h3>
        <p>Aplica los 6 filtros del Módulo 01: código abierto, cifrado/conocimiento cero, modelo de negocio, auditorías, jurisdicción e historial, y minimización de datos. Si no puedes responder a tres de ellos, espera.</p>
        <div class="callout warn"><span class="ci">⚠️</span><div>Desconfía del contenido que vende miedo para colocarte un producto. La buena seguridad es aburrida, constante y explicable.</div></div>
      `,
      steps: [
        "Elige 3 fuentes de la lista y suscríbete con un alias de capa 2 o por RSS.",
        "Crea una carpeta de marcadores 'Actualidad seguridad' en tu perfil Diario.",
        "Cuando veas una herramienta nueva, pásala por los 6 filtros antes de instalarla.",
        "Una vez al mes, revisa el Radar de amenazas de esta academia y compáralo con tus fuentes."
      ],
      pitfalls: ["Cambiar de herramienta cada semana por la última recomendación de redes."],
      prof: "La experiencia se nota en lo que decides no instalar.",
      tools: ["Privacy Guides"]
    },
    {
      id: "m21l4", title: "Efecto multiplicador: proteger a tu familia y a tu equipo", min: 20,
      objectives: ["Priorizar a quién ayudar", "Hacer una sesión de blindaje familiar", "Formar sin asustar"],
      theory: `
        <p>Tu seguridad depende también de tu entorno: el WhatsApp de tus padres, el correo de tu pareja o el portátil de un compañero pueden ser la puerta de entrada a ti. Enseñar es la forma más eficaz de reducir tu propio riesgo.</p>
        <h3>Sesión de blindaje familiar (60 minutos)</h3>
        <ol>
          <li>Verificación en dos pasos de WhatsApp y PIN del buzón de voz.</li>
          <li>Gestor de contraseñas (o al menos contraseña única y 2FA en el correo).</li>
          <li>Protocolo Santo y Seña.</li>
          <li>Regla de oro antifraude: urgencia + dinero/códigos + canal que no iniciaste = estafa.</li>
          <li>Actualizaciones automáticas y bloqueo de pantalla.</li>
        </ol>
      `,
      steps: [
        "Haz una lista de las 5 personas cuya seguridad más te afecta.",
        "Agenda una sesión de 60 minutos con la primera y sigue la lista.",
        "Comparte el plan de incidentes con tu núcleo familiar.",
        "En tu trabajo, propone la política de IA y la doble verificación de pagos (Módulo 20)."
      ],
      pitfalls: ["Asustar con casos extremos: la gente se bloquea y no aplica nada."],
      prof: "El día que tu madre cuelga a un estafador usando la palabra clave, este curso habrá merecido la pena.",
      tools: ["Signal", "Bitwarden"]
    }
  ],
  quiz: [
    { q: "¿Qué NO debe incluir el documento de arquitectura de tu sistema?", o: ["Qué herramienta usa cada capa", "Contraseñas y semillas", "Dónde están las copias", "Fecha de la última restauración"], a: 1, e: "El documento describe la estructura, no los secretos." },
    { q: "¿Con qué frecuencia conviene probar a restaurar una copia de seguridad?", o: ["Nunca", "Al menos cada trimestre", "Cada 10 años", "Solo tras un desastre"], a: 1, e: "Una copia que no se ha restaurado nunca no está verificada." },
    { q: "Aparece una app de mensajería 'ultra privada' de código cerrado y sin auditorías. ¿Qué haces?", o: ["La instalo ya", "Espero: no supera los filtros básicos", "La recomiendo a todos", "La uso para la capa Bóveda"], a: 1, e: "Aplica los 6 filtros antes de confiar." },
    { q: "¿Por qué proteger a tu familia mejora tu propia seguridad?", o: ["No influye", "Sus cuentas y dispositivos pueden ser la puerta de entrada hacia ti", "Por obligación legal", "Para ganar XP"], a: 1, e: "Los atacantes usan el eslabón más débil del entorno." },
    { q: "¿Cuál es una buena señal de una fuente de seguridad fiable?", o: ["Vende miedo y productos", "Explica riesgos y soluciones de forma verificable y sin alarmismo", "Promete anonimato total", "Recomienda cambiar de app cada semana"], a: 1, e: "La buena seguridad es explicable y constante." }
  ]
});

BASTION.refs = BASTION.refs || {};
BASTION.refs.m21 = [["Privacy Guides", "https://www.privacyguides.org/es/"], ["OWASP GenAI Security Project", "https://genai.owasp.org"], ["INCIBE · Avisos de seguridad", "https://www.incibe.es/ciudadania/avisos"], ["ColCERT (Colombia)", "https://www.colcert.gov.co"]];
