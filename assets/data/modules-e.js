/* BASTIÓN ACADEMY · Ampliación (temarios de referencia + actualidad 2026)
   Módulos 16–20 y lecciones extra para módulos existentes */
window.BASTION = window.BASTION || { modules: [] };

/* ---------- Lecciones extra en módulos existentes ---------- */
(function () {
  function mod(id) { return BASTION.modules.filter(function (m) { return m.id === id; })[0]; }

  mod("m05").lessons.push(
    {
      id: "m05l6", title: "Android vs iPhone vs GrapheneOS: qué móvil elegir para tu privacidad", min: 20,
      objectives: ["Comparar los tres ecosistemas con criterio", "Elegir según tu modelo de amenazas", "Saber qué ajustes compensan las debilidades de cada uno"],
      theory: `
        <table>
          <tr><th></th><th>Android de fábrica</th><th>iPhone</th><th>GrapheneOS (Pixel)</th></tr>
          <tr><td>Recolección por defecto</td><td>Alta (Google + fabricante + operadora)</td><td>Media (Apple, menos publicidad)</td><td>Mínima</td></tr>
          <tr><td>Seguridad frente a ataques</td><td>Variable según marca y actualizaciones</td><td>Alta, actualizaciones largas</td><td>Muy alta (endurecimiento extra)</td></tr>
          <tr><td>Control del usuario</td><td>Alto (apps libres, F-Droid)</td><td>Bajo (jardín cerrado)</td><td>Máximo (permisos de red y sensores)</td></tr>
          <tr><td>Cifrado de copias en la nube</td><td>Parcial</td><td>Con Advanced Data Protection</td><td>Copia local cifrada (Seedvault)</td></tr>
        </table>
        <ul>
          <li>Las marcas con mucha "bloatware" (algunas gamas de Xiaomi, Huawei, Samsung) añaden su propia telemetría además de la de Google: usa el bloqueo nativo de NextDNS para esa marca.</li>
          <li>El factor más importante en cualquier móvil: <strong>que reciba actualizaciones de seguridad</strong>. Un móvil sin parches es inseguro aunque esté bien configurado.</li>
        </ul>
      `,
      steps: [
        "Comprueba hasta cuándo recibe actualizaciones tu móvil (Ajustes → Acerca del teléfono → nivel de parche de seguridad; si tiene más de 3 meses, alerta).",
        "Si es Android de fábrica: aplica todo el Módulo 05 lección 3 y bloquea la telemetría de tu marca en NextDNS.",
        "Si es iPhone: activa ADP, Protección de dispositivo robado y revisa Rastreo/Análisis.",
        "Si tu perfil es B o C y vas a cambiar de móvil: valora un Pixel con GrapheneOS."
      ],
      pitfalls: ["Comprar un móvil barato sin actualizaciones pensando que la configuración lo compensa."],
      prof: "No hay móvil perfecto, hay móvil bien configurado y actualizado. Si me preguntas por el mejor para privacidad: Pixel con GrapheneOS. Para la mayoría: el que ya tienes, bien ajustado.",
      tools: ["GrapheneOS", "NextDNS"]
    },
    {
      id: "m05l7", title: "Borrado seguro de archivos, discos y móviles (antes de vender o tirar)", min: 20,
      objectives: ["Saber por qué 'Suprimir' no borra", "Borrar correctamente HDD, SSD y móviles", "Preparar un dispositivo para venderlo"],
      theory: `
        <p>Al borrar un archivo, el sistema solo marca su espacio como libre; los datos siguen ahí hasta que se sobrescriben. Con herramientas gratuitas se recuperan fotos "borradas" de discos y memorias usadas.</p>
        <ul>
          <li><strong>Discos duros (HDD)</strong>: la sobrescritura funciona (Eraser en Windows, <code>shred</code> en Linux).</li>
          <li><strong>SSD y memorias flash</strong>: la sobrescritura no es fiable por la nivelación de desgaste. Lo correcto es tener el disco <strong>cifrado desde el principio</strong> y, al deshacerte de él, usar el <strong>borrado seguro del fabricante</strong> (Secure Erase / Sanitize) o destruir la clave de cifrado (crypto-erase).</li>
          <li><strong>Móviles</strong>: los modernos van cifrados; el restablecimiento de fábrica destruye la clave. Antes, cierra sesión de tus cuentas y quita la SIM y la microSD.</li>
        </ul>
      `,
      steps: [
        "Asegúrate de que todos tus discos están cifrados (Módulo 05 lección 1): es el seguro para cuando los vendas o te los roben.",
        "Para archivos sueltos sensibles en HDD: usa <b>Eraser</b> (Windows) o <code>shred</code> (Linux).",
        "Antes de vender un PC: borrado seguro desde la herramienta del fabricante del SSD o 'Restablecer este PC → Quitar todo → Limpiar la unidad'.",
        "Antes de vender un móvil: cierra sesión de Google/Apple (quita la protección antirrobo), elimina eSIM, quita la tarjeta SD y restablece de fábrica.",
        "USBs y discos viejos que no vas a reutilizar: destrucción física."
      ],
      code: { title: "Borrado en Linux / Windows", body: "# Linux · sobrescribir y borrar un archivo (HDD)\nshred -u -z -n 3 documento_sensible.pdf\n\n# Linux · borrado seguro de un SSD NVMe (¡borra TODO el disco!)\nsudo nvme format /dev/nvme0n1 --ses=1\n\n# Windows · limpiar el espacio libre de C: (HDD)\ncipher /w:C:\\" },
      pitfalls: ["Vender un móvil sin quitar la cuenta de Google/Apple: el comprador no podrá usarlo y tú seguirás vinculado.", "Fiarte de 'formatear' un disco: el formateo rápido no borra los datos."],
      prof: "La regla de oro: cifra hoy lo que algún día vas a tirar. Así el borrado futuro es instantáneo.",
      tools: ["VeraCrypt", "BitLocker"]
    }
  );

  mod("m09").lessons.push(
    {
      id: "m09l5", title: "Metodología de ciberinteligencia: el ciclo de inteligencia y tu kit de 40+ herramientas", min: 35,
      objectives: ["Aplicar el ciclo de inteligencia", "Organizar un kit de herramientas por tipo de dato", "Investigar con OPSEC y documentar"],
      theory: `
        <h3>El ciclo de inteligencia</h3>
        <ol>
          <li><strong>Planificación</strong>: ¿qué pregunta quiero responder? (p. ej., "¿es real este vendedor?")</li>
          <li><strong>Recolección</strong>: fuentes abiertas, sin vulnerar sistemas ni engañar a personas.</li>
          <li><strong>Procesamiento</strong>: ordenar, deduplicar, verificar.</li>
          <li><strong>Análisis</strong>: conectar datos, valorar fiabilidad (fuente A–F, información 1–6).</li>
          <li><strong>Difusión</strong>: informe claro con evidencias y nivel de confianza.</li>
        </ol>
        <h3>Kit por tipo de dato</h3>
        <table>
          <tr><th>Dato de partida</th><th>Herramientas</th></tr>
          <tr><td>Nombre</td><td>Buscadores con dorks, registros mercantiles, boletines oficiales, LinkedIn</td></tr>
          <tr><td>Username</td><td>WhatsMyName, Sherlock, Maigret</td></tr>
          <tr><td>Correo</td><td>Have I Been Pwned, Epieos, Holehe, búsqueda de Gravatar</td></tr>
          <tr><td>Teléfono</td><td>Búsqueda entre comillas, apps de mensajería (foto/nombre visibles), PhoneInfoga, listas de spam</td></tr>
          <tr><td>Imagen / rostro</td><td>Google Lens, Bing, Yandex, TinEye, PimEyes, ExifTool</td></tr>
          <tr><td>Lugar</td><td>Google Earth/Street View, Overpass Turbo, SunCalc (sombras), Mapillary</td></tr>
          <tr><td>Dominio / web</td><td>WHOIS, crt.sh (certificados), urlscan.io, Wayback Machine, BuiltWith</td></tr>
          <tr><td>Empresa</td><td>RUES (Colombia), BORME (España), OpenCorporates</td></tr>
          <tr><td>Cripto</td><td>Exploradores de bloques (mempool.space)</td></tr>
          <tr><td>Directorio general</td><td>OSINT Framework (osintframework.com)</td></tr>
        </table>
        <div class="callout warn"><span class="ci">⚖️</span><div>Investiga con fines defensivos y legítimos. No uses estas técnicas para acosar, vigilar a tu pareja ni obtener datos protegidos: en muchos países es delito.</div></div>
      `,
      steps: [
        "Crea un <b>entorno de investigación</b>: perfil de navegador o VM de capa 3/4, VPN activa y sin sesiones personales.",
        "Prepara una plantilla de informe (bloque) y úsala en tu próximo Ego-OSINT.",
        "Guarda en marcadores de ese perfil las 15 herramientas del kit que más vayas a usar.",
        "Practica: verifica un dominio que te haya llegado por correo con WHOIS + crt.sh + Wayback Machine.",
        "Archiva las evidencias (captura + URL + fecha) para no depender de que la web siga online."
      ],
      code: { title: "Plantilla de informe OSINT", body: "INFORME OSINT — Caso: ________   Fecha: ________\nPregunta a responder: __________________________\n\nHALLAZGOS\n#  Dato encontrado        Fuente (URL)        Fecha captura   Fiabilidad (A-F/1-6)\n1. ___________________   _______________     ___________     ___\n2. ___________________   _______________     ___________     ___\n\nANÁLISIS\n- Conexiones entre datos: ___________________\n- Hipótesis y nivel de confianza (bajo/medio/alto): ______\n\nCONCLUSIÓN Y ACCIONES\n- ___________________________________________" },
      pitfalls: ["Investigar desde tu cuenta personal (dejas huella: LinkedIn muestra quién vio un perfil).", "Confundir correlación con identidad: dos usernames iguales no siempre son la misma persona."],
      prof: "Un buen analista no es el que más herramientas conoce, es el que documenta y verifica. Dos fuentes independientes antes de afirmar nada.",
      tools: ["WhatsMyName", "Epieos", "Have I Been Pwned", "URLScan", "Google Lens"]
    }
  );

  mod("m06").lessons.push(
    {
      id: "m06l6", title: "Opinar y publicar con seudónimo: libertad de expresión con OPSEC", min: 20,
      objectives: ["Separar tu identidad pública de tus opiniones", "Entender los riesgos legales y de reputación", "Publicar sin vincularte"],
      theory: `
        <p>En varios países han aumentado las detenciones e investigaciones por publicaciones en redes, y los despidos o acosos por opiniones antiguas son frecuentes. Tener una identidad seudónima para opinar es una práctica legítima (siempre dentro de la ley: el seudónimo no protege de responsabilidades por delitos como amenazas o difamación).</p>
        <h3>Qué te vincula aunque uses seudónimo</h3>
        <ul>
          <li>Registrarte con tu número o correo real.</li>
          <li>Seguir a tus amigos o a tu empresa desde la cuenta seudónima.</li>
          <li>Publicar fotos propias o de tu entorno.</li>
          <li>Tu estilo de escritura y tu horario (Módulo 12).</li>
          <li>Iniciar sesión desde la misma IP y navegador que tu cuenta real.</li>
        </ul>
      `,
      steps: [
        "Crea la cuenta seudónima en la capa 2 o 4 según el riesgo: alias de correo, sin teléfono personal, navegador separado.",
        "No sigas ni interactúes con tu círculo real desde esa cuenta.",
        "Revisa tus publicaciones antiguas con tu nombre real y archiva/borra lo que hoy no firmarías.",
        "En X: Ajustes → Privacidad → <b>Grok y colaboradores externos</b> → desactiva el uso de tus publicaciones para entrenar IA; en Ubicación, desactiva la información de ubicación.",
        "Usa la neutralización estilométrica (Módulo 12) si el riesgo lo justifica."
      ],
      pitfalls: ["Usar el mismo avatar o frase de bio en la cuenta real y en la seudónima."],
      prof: "La libertad de expresión también se protege con técnica. Opina, pero separa la persona del personaje.",
      tools: ["Mullvad Browser", "SimpleLogin"]
    }
  );
})();

/* ---------- Módulo 16 · Redes sociales ---------- */
BASTION.modules.push({
  id: "m16", num: "16", icon: "📱", color: "cy", level: 3,
  title: "Redes Sociales y Mensajería a Fondo: Meta, TikTok, X, LinkedIn y WhatsApp",
  subtitle: "Actividad fuera de Meta, secuestro de WhatsApp por buzón de voz, privacidad de perfiles, entrenamiento de IA y limpieza",
  summary: "Las redes son la mayor fuente de datos sobre ti y tu familia. Configuras cada plataforma pieza a pieza, cierras la puerta al secuestro de WhatsApp, impides que entrenen IA con tu contenido y limpias tu pasado público.",
  outcomes: ["Cortar el rastreo fuera de Meta", "Blindar WhatsApp contra secuestro", "Configurar TikTok, X y LinkedIn", "Limpiar tu historial público"],
  lessons: [
    {
      id: "m16l1", title: "Meta (Instagram y Facebook): actividad fuera de Meta, anuncios y Centro de cuentas", min: 30,
      objectives: ["Entender cómo Meta te rastrea fuera de sus apps", "Desactivar la actividad fuera de Meta", "Reducir la segmentación publicitaria"],
      theory: `
        <p>Meta tiene un largo historial de prácticas invasivas: <strong>Cambridge Analytica</strong> (2018, datos de hasta 87 millones de usuarios), el uso de la VPN <strong>Onavo</strong> para estudiar qué apps usaba la gente, o en 2025 la técnica que investigadores llamaron <em>Localhost tracking</em>, en la que el píxel de Meta en webs se comunicaba con las apps de Facebook/Instagram en Android para vincular tu navegación con tu cuenta.</p>
        <p>El <strong>píxel de Meta</strong> está en millones de webs y apps: aunque no uses Instagram en ese momento, las tiendas, clínicas o periódicos envían a Meta lo que haces allí. Eso es la "actividad fuera de las tecnologías de Meta".</p>
      `,
      steps: [
        "Instagram/Facebook → Configuración → <b>Centro de cuentas</b> → Tu información y permisos → <b>Tu actividad fuera de las tecnologías de Meta</b> → <b>Borrar actividad anterior</b> y <b>Desconectar actividad futura</b>.",
        "Centro de cuentas → <b>Preferencias de anuncios</b> → Configuración de anuncios → desactiva el uso de datos de socios y anuncios fuera de Meta.",
        "En la UE: valora la opción de <b>menos anuncios personalizados</b> o la suscripción sin anuncios.",
        "Centro de cuentas → Contraseña y seguridad → activa 2FA con app (no SMS) y revisa <b>dónde has iniciado sesión</b>.",
        "Instagram → Privacidad de la cuenta: <b>cuenta privada</b> si no eres creador; oculta estado de actividad; menciones y etiquetas solo de personas que sigues.",
        "Desactiva la <b>sincronización de contactos</b> (Instagram, Facebook, Messenger) y borra los contactos ya subidos.",
        "Revisa si Meta usa tus publicaciones públicas para IA: en la UE puedes enviar el formulario de oposición; en otros países, haz privado lo que no quieras que se use."
      ],
      pitfalls: ["Iniciar sesión con Facebook en otras webs: Meta sabe todo lo que haces allí.", "Tener la app de Facebook/Instagram instalada en el perfil principal del móvil con todos los permisos."],
      prof: "Si te cuesta dejar Instagram, enciérralo: perfil de trabajo (Shelter/Espacio privado), sin contactos, sin ubicación y con la actividad fuera de Meta desconectada.",
      tools: ["Shelter"]
    },
    {
      id: "m16l2", title: "WhatsApp y Telegram a fondo: secuestro por buzón de voz, PIN, passkeys y grupos", min: 25,
      objectives: ["Entender el secuestro de cuentas de WhatsApp", "Blindar tu cuenta y la de tu familia", "Configurar Telegram sin exponer tu número"],
      theory: `
        <p><strong>El ataque del buzón de voz</strong>: el atacante intenta registrar tu número en su móvil y pide el código por <em>llamada</em> en un momento en que no contestas (de noche, o te satura con llamadas). La llamada va al buzón de voz; si tu buzón tiene el PIN por defecto, el atacante lo escucha remotamente y se queda con tu WhatsApp. Después escribe a tus contactos pidiendo dinero o códigos, y así se propaga a toda la familia.</p>
        <p>Otra variante: te escriben "por error te envié un código de 6 dígitos, ¿me lo reenvías?". Es el código de registro de TU cuenta.</p>
      `,
      steps: [
        "WhatsApp → Ajustes → Cuenta → <b>Verificación en dos pasos</b> → PIN de 6 dígitos + correo de recuperación (un alias).",
        "WhatsApp → Ajustes → Cuenta → <b>Llaves de acceso (passkeys)</b> → crear.",
        "Cambia el <b>PIN del buzón de voz</b> de tu operadora o <b>desactiva el buzón</b> (código de desvío según tu operadora).",
        "WhatsApp → Privacidad → Grupos: <b>Mis contactos</b>; Silenciar llamadas de desconocidos: ON; Privacidad avanzada del chat en grupos sensibles.",
        "WhatsApp → Dispositivos vinculados: revisa y cierra sesiones que no reconozcas (WhatsApp Web abierto en otro PC).",
        "Telegram → Privacidad y seguridad: Número de teléfono: <b>Nadie</b>; ¿Quién puede encontrarme por mi número?: <b>Mis contactos</b>; Contraseña en dos pasos; <b>Código de bloqueo</b> de la app.",
        "Haz lo mismo con los móviles de tus padres e hijos: suelen ser el eslabón débil."
      ],
      code: { title: "Si te roban el WhatsApp", body: "1. Reinstala WhatsApp y registra tu número: recibirás el código por SMS.\n   (Si el atacante puso PIN de dos pasos, tendrás que esperar 7 días para\n   recuperar sin PIN; mientras tanto, él pierde el acceso al registrarte tú.)\n2. Escribe a support@support.whatsapp.com con asunto 'Cuenta robada/perdida'\n   y tu número en formato internacional.\n3. Avisa a tus contactos por otro canal: 'no atendáis peticiones de dinero'.\n4. Activa verificación en dos pasos y cambia el PIN del buzón de voz." },
      pitfalls: ["Reenviar un código de 6 dígitos a alguien, aunque sea un 'amigo'.", "Dejar WhatsApp Web abierto en ordenadores del trabajo."],
      prof: "Configura hoy el WhatsApp de tus padres. Es el regalo de seguridad más útil que les puedes hacer.",
      tools: ["Signal"]
    },
    {
      id: "m16l3", title: "TikTok, X, LinkedIn, YouTube y Google: privacidad e IA", min: 25,
      objectives: ["Configurar las plataformas principales", "Retirar el permiso de entrenamiento de IA", "Controlar quién te encuentra"],
      theory: `
        <p>Cada red tiene ajustes distintos, pero el patrón es el mismo: <strong>visibilidad del perfil</strong>, <strong>descubrimiento por teléfono/correo</strong>, <strong>sincronización de contactos</strong>, <strong>ubicación</strong>, <strong>anuncios personalizados</strong> y, desde 2024–2025, <strong>uso de tu contenido para entrenar IA</strong>.</p>
      `,
      steps: [
        "TikTok → Ajustes y privacidad → Privacidad: cuenta privada (si no creas contenido), <b>Sugerir tu cuenta a otros: OFF</b> (contactos, Facebook, enlaces), sincronización de contactos OFF; Anuncios: personalización OFF.",
        "X → Ajustes → Privacidad y seguridad: <b>Descubrimiento y contactos</b> OFF; <b>Grok y colaboradores externos</b> OFF; <b>Compartir datos con socios</b> OFF; ubicación OFF.",
        "LinkedIn → Configuración → Privacidad de datos: <b>Datos para mejorar la IA generativa</b> OFF; Visibilidad → perfil fuera de LinkedIn limitado; 'Modo privado' al ver perfiles.",
        "Google → myaccount.google.com → Datos y privacidad: Actividad en la Web y en Aplicaciones, Historial de YouTube y Cronología con <b>eliminación automática a 3 meses</b> o desactivados; Anuncios personalizados OFF.",
        "YouTube: sin sesión para ver contenido general, o con historial pausado.",
        "Pon un recordatorio cada 6 meses: las redes cambian sus ajustes y a veces reactivan opciones."
      ],
      pitfalls: ["Permitir que te encuentren por número de teléfono: cualquiera con tu número ve tus perfiles."],
      prof: "Haz una 'tarde de ajustes' con un café: 45 minutos y dejas todas tus redes blindadas.",
      tools: []
    },
    {
      id: "m16l4", title: "Limpieza del pasado público y protección de menores (sharenting)", min: 20,
      objectives: ["Archivar o borrar publicaciones antiguas", "Proteger a menores en redes", "Gestionar etiquetas de terceros"],
      theory: `
        <p>Las fotos de niños publicadas hoy forman su huella digital de por vida: nombre, colegio, rutinas, aspecto a lo largo de los años. Y con IA, fotos inocentes pueden ser manipuladas. Esto se llama <strong>sharenting</strong>.</p>
      `,
      steps: [
        "Instagram/Facebook → Tu actividad → selecciona publicaciones antiguas → <b>Archivar</b> o eliminar por lotes.",
        "Revisa fotos en las que <b>otros te etiquetaron</b> y quita la etiqueta; activa la revisión de etiquetas.",
        "Menores: no publiques caras, uniformes, colegio, ubicación ni rutinas. Si compartes, hazlo en grupos cerrados o álbumes cifrados.",
        "Acuerda con familia y amigos una regla: no publicar fotos de los niños sin permiso.",
        "Si un contenido íntimo tuyo o de un menor circula sin consentimiento: <b>StopNCII.org</b> (adultos) o <b>Take It Down</b> (menores) para bloquearlo en plataformas participantes."
      ],
      pitfalls: ["Publicar el primer día de colegio con el uniforme y el nombre del centro visibles."],
      prof: "Tus hijos no pueden dar su consentimiento hoy. Protégelos como querrías haber sido protegido.",
      tools: []
    }
  ],
  quiz: [
    { q: "¿Cómo funciona el secuestro de WhatsApp por buzón de voz?", o: ["Hackean el servidor de WhatsApp", "El código de verificación por llamada acaba en tu buzón con PIN por defecto", "Te roban el móvil", "Por Bluetooth"], a: 1, e: "Por eso hay que cambiar el PIN del buzón o desactivarlo y activar la verificación en dos pasos." },
    { q: "¿Qué es la 'actividad fuera de las tecnologías de Meta'?", o: ["Tus mensajes privados", "Datos que webs y apps envían a Meta sobre lo que haces en ellas", "Tus fotos en la nube", "Tus contraseñas"], a: 1, e: "Llegan a través del píxel de Meta y SDKs integrados en otras webs y apps." },
    { q: "Alguien te pide reenviarle un código de 6 dígitos que 'te envió por error'. ¿Qué es?", o: ["Un error inocente", "El código para robar tu cuenta", "Un sorteo", "Un código de descuento"], a: 1, e: "Nunca reenvíes códigos de verificación." }
  ]
});

/* ---------- Módulo 17 · Identidad y suplantación ---------- */
BASTION.modules.push({
  id: "m17", num: "17", icon: "🪪", color: "ro", level: 3,
  title: "Identidad Legal Blindada: Suplantación, Copias del DNI y Centrales de Riesgo",
  subtitle: "Cómo se roba una identidad, marcas de agua en documentos, alertas de crédito y qué hacer si te suplantan",
  summary: "Con una foto de tu documento y unos datos filtrados, alguien puede abrir créditos, contratar líneas o incluso realizar trámites a tu nombre. Aprendes a no regalar copias de tu identidad, a vigilar tu historial y a reaccionar con un plan legal.",
  outcomes: ["Proteger copias de tu documento", "Vigilar tu historial crediticio", "Actuar ante una suplantación"],
  lessons: [
    {
      id: "m17l1", title: "Cómo se roba una identidad y cómo cerrar las puertas", min: 25,
      objectives: ["Conocer los vectores de suplantación", "Aplicar marcas de agua en copias del documento", "Reducir dónde está tu documento"],
      theory: `
        <p>Casos reales de suplantación: créditos rápidos, líneas telefónicas, cuentas bancarias para blanquear dinero ("cuentas mula"), compras a plazos, multas, e incluso trámites civiles hechos con documentación falsificada. Muchas víctimas lo descubren cuando les llega una deuda o un embargo.</p>
        <h3>De dónde salen tus datos</h3>
        <ul>
          <li>Copias del DNI/cédula enviadas por WhatsApp o correo a inmobiliarias, hoteles, empresas.</li>
          <li>Filtraciones masivas de organismos y empresas.</li>
          <li>Phishing que pide "verificar tu identidad" con foto del documento y selfie.</li>
          <li>Robo físico de cartera o correo postal.</li>
        </ul>
      `,
      steps: [
        "Cada vez que envíes una copia de tu documento: añade una <b>marca de agua</b> cruzada con 'Copia para [EMPRESA] – [FECHA] – solo para [TRÁMITE]'. Así no sirve para otra cosa.",
        "Envía la copia por un canal cifrado o súbela solo a la web oficial; no la dejes en el chat. Borra la imagen de tu galería después.",
        "Tapa los datos que no sean necesarios (número de soporte, firma, foto si no la piden).",
        "Guarda los originales digitales en tu bóveda cifrada (Cryptomator/VeraCrypt), nunca sueltos en Descargas o en la galería sincronizada.",
        "Ante una petición de 'selfie con tu documento' fuera de una entidad que conozcas: sospecha."
      ],
      code: { title: "Texto de marca de agua (cópialo)", body: "COPIA EXCLUSIVA PARA: [Empresa]\nFINALIDAD: [Trámite concreto]\nFECHA: [dd/mm/aaaa]\nNO VÁLIDA PARA OTRO USO\n\n# Repítelo en diagonal sobre toda la imagen, semitransparente,\n# cruzando la foto y los datos (con un editor de imágenes o una herramienta de marcas de agua sin conexión)" },
      pitfalls: ["Enviar el DNI por WhatsApp a un 'casero' sin verificar que el piso existe (estafa clásica)."],
      prof: "Una copia sin marca de agua es una llave de tu identidad que regalas. Una copia con marca de agua es un recibo.",
      tools: ["Cryptomator", "VeraCrypt"]
    },
    {
      id: "m17l2", title: "Vigila tu historial: centrales de riesgo, alertas y bloqueos", min: 20,
      objectives: ["Consultar tu historial crediticio", "Detectar créditos o líneas a tu nombre", "Configurar alertas"],
      theory: `
        <table>
          <tr><th>País</th><th>Dónde consultar</th></tr>
          <tr><td>Colombia</td><td>DataCrédito Experian y TransUnion (consulta gratuita mensual por ley)</td></tr>
          <tr><td>España</td><td>CIRBE del Banco de España (deudas con entidades), ficheros de morosos (ASNEF, Experian BADEXCUG)</td></tr>
          <tr><td>México</td><td>Buró de Crédito y Círculo de Crédito (reporte gratuito anual)</td></tr>
          <tr><td>Argentina</td><td>Central de Deudores del BCRA</td></tr>
        </table>
        <p>En EE. UU. existe el "congelado de crédito" gratuito; en otros países, las opciones son alertas y revisión periódica.</p>
      `,
      steps: [
        "Consulta hoy tu historial en la central de riesgo de tu país y revisa productos que no reconozcas.",
        "Pon un recordatorio cada 3–6 meses para revisarlo.",
        "Activa alertas de tu banco para cualquier movimiento y alta de producto.",
        "Revisa qué líneas móviles están a tu nombre (en Colombia, consulta con cada operador; en España, puedes pedirlo a cada operadora)."
      ],
      pitfalls: ["Ignorar cartas o SMS de deudas que 'no son tuyas': pueden ser la primera señal de una suplantación."],
      prof: "La suplantación se descubre tarde porque nadie mira. Mirar dos veces al año te da ventaja de meses.",
      tools: []
    },
    {
      id: "m17l3", title: "Plan de acción si suplantan tu identidad", min: 20,
      objectives: ["Actuar en orden", "Reunir pruebas", "Usar los canales legales"],
      theory: `<p>La clave es dejar <strong>constancia oficial</strong> cuanto antes: la denuncia es la que te protege ante deudas y reclamaciones posteriores.</p>`,
      steps: [
        "Reúne pruebas: cartas, SMS, extractos, capturas con fecha.",
        "Denuncia ante la policía/fiscalía (Colombia: Fiscalía o CAI Virtual; España: Policía Nacional o Guardia Civil). Pide copia.",
        "Comunica la suplantación por escrito a cada entidad implicada y solicita anular el producto y eliminar el reporte negativo.",
        "Ejerce tus derechos de datos (Habeas Data/RGPD) para que corrijan la información en las centrales de riesgo.",
        "Si fue con tu documento: solicita uno nuevo y comunica la pérdida/robo.",
        "Guarda un expediente con todo: puede durar meses."
      ],
      code: { title: "Plantilla de comunicación a la entidad", body: "Asunto: Suplantación de identidad – Solicitud de anulación y rectificación\n\nPor la presente comunico que el producto [tipo/número] fue contratado a mi nombre\nsin mi conocimiento ni consentimiento, mediante suplantación de identidad.\nAdjunto copia de la denuncia nº [____] de fecha [____].\n\nSolicito:\n1. La anulación del producto y de cualquier deuda asociada.\n2. La rectificación/eliminación de cualquier reporte negativo en centrales de riesgo.\n3. Copia de la documentación aportada en la contratación.\n4. Respuesta escrita en el plazo legal.\n\n[Nombre] – [Fecha]" },
      pitfalls: ["Pagar una deuda que no es tuya 'para quitártela de encima': puede interpretarse como reconocimiento."],
      prof: "Papel, fechas y denuncias. En suplantación gana quien documenta.",
      tools: ["SIC Colombia"]
    }
  ],
  quiz: [
    { q: "¿Para qué sirve la marca de agua en la copia de tu documento?", o: ["Para que se vea bonito", "Para limitar su uso a un trámite y empresa concretos", "Para cifrarlo", "No sirve"], a: 1, e: "Una copia marcada no sirve para suplantarte en otro sitio." },
    { q: "¿Qué es lo primero que protege legalmente a una víctima de suplantación?", o: ["Pagar la deuda", "La denuncia oficial", "Cambiar de banco", "Borrar sus redes"], a: 1, e: "La denuncia deja constancia de que no fuiste tú." }
  ]
});

/* ---------- Módulo 18 · Vigilancia financiera ---------- */
BASTION.modules.push({
  id: "m18", num: "18", icon: "🏦", color: "go", level: 4,
  title: "Vigilancia Financiera y Pagos Privados: CBDC, Efectivo, Lightning y Nodo Propio",
  subtitle: "Euro digital, límites al efectivo, reporte automático de pagos, pagos anónimos legales, Lightning y tu propio nodo de Bitcoin",
  summary: "El dinero se está digitalizando y cada pago deja un rastro que reportan bancos y apps. Entiendes el nuevo marco (CBDC, límites de efectivo, reporte fiscal), aprendes a pagar con privacidad de forma legal y a usar Bitcoin con soberanía real: Lightning y nodo propio.",
  outcomes: ["Entender CBDC y límites al efectivo", "Pagar con privacidad legal", "Usar Lightning", "Montar tu propio nodo"],
  lessons: [
    {
      id: "m18l1", title: "El nuevo tablero del dinero: CBDC, euro digital, límites al efectivo y reporte automático", min: 25,
      objectives: ["Conocer las tendencias regulatorias", "Entender qué ve el fisco de tus pagos", "Distinguir privacidad de evasión"],
      theory: `
        <ul>
          <li><strong>CBDC / euro digital</strong>: el BCE pasó en 2025 a la siguiente fase del proyecto y contempla una posible emisión hacia 2029 si se aprueba la legislación. El debate clave es cuánta privacidad tendrán los pagos y si habrá límites de tenencia.</li>
          <li><strong>Límite al efectivo en la UE</strong>: el nuevo reglamento antiblanqueo fija un tope de <strong>10.000 € para pagos en efectivo</strong> a partir de julio de 2027 (los países pueden fijar límites menores; en España ya es 1.000 € en operaciones con empresarios).</li>
          <li><strong>Reporte automático</strong>: bancos y apps de pago informan al fisco de forma creciente (en España, cambios recientes sobre cobros por Bizum de profesionales; en Colombia, la información exógena a la DIAN incluye movimientos financieros por encima de ciertos umbrales).</li>
          <li><strong>Intercambio internacional</strong>: CRS/FATCA comparten saldos de cuentas en el extranjero con tu país de residencia fiscal.</li>
        </ul>
        <div class="callout info"><span class="ci">⚖️</span><div>Privacidad financiera = que comercios, data brokers, hackers y curiosos no conozcan tu vida económica. <strong>No</strong> es ocultar ingresos al fisco: declara siempre lo que te corresponde.</div></div>
      `,
      steps: [
        "Infórmate de los límites de efectivo y obligaciones de reporte de tu país (Colombia: DIAN; España: Agencia Tributaria).",
        "Revisa qué apps de pago usas y qué datos comparten (P2P como Bizum/Nequi/Daviplata quedan registradas a tu nombre).",
        "Mantén una pequeña reserva de efectivo en casa para emergencias y compras cotidianas privadas.",
        "Sigue el debate del euro digital/CBDC en fuentes primarias (BCE, banco central de tu país)."
      ],
      pitfalls: ["Fraccionar pagos para eludir límites legales: puede ser infracción."],
      prof: "Entender las reglas te da libertad para jugar dentro de ellas con la máxima privacidad posible.",
      tools: []
    },
    {
      id: "m18l2", title: "Pagos privados legales en el día a día", min: 20,
      objectives: ["Elegir el medio de pago según la capa", "Usar tarjetas virtuales y prepago", "Proteger compras online"],
      theory: `
        <table>
          <tr><th>Medio</th><th>Privacidad frente al comercio</th><th>Frente a tu banco/fisco</th><th>Uso ideal</th></tr>
          <tr><td>Efectivo</td><td>Alta</td><td>Alta (dentro de límites)</td><td>Compras locales sensibles</td></tr>
          <tr><td>Tarjeta virtual/desechable</td><td>Media-alta</td><td>Baja</td><td>Suscripciones y tiendas online</td></tr>
          <tr><td>Tarjeta regalo/prepago</td><td>Alta</td><td>Media</td><td>Servicios digitales de capa 2/3</td></tr>
          <tr><td>Bitcoin on-chain</td><td>Media (blockchain pública)</td><td>Depende del origen</td><td>Servicios que lo aceptan</td></tr>
          <tr><td>Bitcoin Lightning</td><td>Alta</td><td>Depende del origen</td><td>Pagos pequeños</td></tr>
        </table>
      `,
      steps: [
        "Asigna en tu Arquitecto de compartimentos un medio de pago por capa.",
        "Para suscripciones: tarjeta virtual con límite igual al precio mensual.",
        "En compras online, usa un alias de correo y la dirección de un punto de recogida o casillero en vez de tu domicilio cuando sea posible.",
        "Para servicios de privacidad (VPN, correo), valora pagar con efectivo o Bitcoin si el proveedor lo permite."
      ],
      pitfalls: ["Usar la tarjeta del banco búnker para suscripciones 'de prueba gratuita'."],
      prof: "Cada pago es una frase en el diario de tu vida. Elige quién puede leerlo.",
      tools: ["Mullvad VPN"]
    },
    {
      id: "m18l3", title: "Bitcoin Lightning: pagos rápidos, baratos y más privados", min: 25,
      objectives: ["Entender Lightning", "Usar una wallet Lightning en autocustodia", "Conocer sus límites"],
      theory: `
        <p><strong>Lightning</strong> es una red de canales de pago sobre Bitcoin: pagos casi instantáneos y de comisión mínima que no se publican uno a uno en la blockchain.</p>
        <ul>
          <li><strong>Wallets en autocustodia</strong> sencillas: Phoenix, Breez, o integradas en wallets como Blockstream App.</li>
          <li>Las wallets custodiales de Lightning (el proveedor guarda tus fondos) son cómodas pero reintroducen el riesgo de terceros y, en muchos casos, KYC.</li>
          <li>Límites: gestión de liquidez de canales y comisiones de apertura.</li>
        </ul>
      `,
      steps: [
        "Instala una wallet Lightning en autocustodia (p. ej. Phoenix) y apunta su semilla como en el Módulo 13.",
        "Recibe una cantidad pequeña y haz un pago de prueba.",
        "Compara la comisión con un pago on-chain.",
        "Mantén en Lightning solo saldo de gasto; el ahorro, en frío."
      ],
      pitfalls: ["Guardar ahorros grandes en una wallet móvil caliente."],
      prof: "Lightning es tu cartera de bolsillo; la hardware wallet, tu caja fuerte.",
      tools: ["Phoenix Wallet"]
    },
    {
      id: "m18l4", title: "Tu propio nodo de Bitcoin: verificar sin confiar", min: 30,
      objectives: ["Entender por qué un nodo propio mejora la privacidad", "Elegir hardware/software", "Conectar tu wallet a tu nodo"],
      theory: `
        <p>Cuando tu wallet consulta saldos en servidores ajenos, les revela tus direcciones y tu IP. Con un <strong>nodo propio</strong> (Bitcoin Core) y un servidor Electrum personal, consultas tu propia copia de la blockchain.</p>
        <ul>
          <li>Plataformas sencillas: <strong>Umbrel</strong>, <strong>Start9</strong>, RaspiBlitz, o Bitcoin Core en tu PC.</li>
          <li>Requisitos: disco SSD de 1–2 TB (o modo podado), conexión estable.</li>
        </ul>
      `,
      steps: [
        "Elige: Bitcoin Core en tu PC (podado) para empezar, o un mini PC con Umbrel/Start9.",
        "Deja que sincronice (puede tardar días).",
        "Instala un servidor Electrum (Fulcrum/Electrs) en tu nodo.",
        "En Sparrow Wallet: Preferencias → Servidor → <b>Private Electrum</b> o Bitcoin Core → apunta a tu nodo (por Tor o red local)."
      ],
      code: { title: "bitcoin.conf mínimo (nodo podado con Tor)", body: "# ~/.bitcoin/bitcoin.conf\nprune=10000          # guarda ~10 GB de bloques\nserver=1\nlisten=1\nproxy=127.0.0.1:9050  # salir por Tor (requiere Tor instalado)\nonlynet=onion\n\n# Arranque\nbitcoind -daemon\nbitcoin-cli getblockchaininfo" },
      pitfalls: ["Exponer el panel de Umbrel/Start9 a internet sin VPN."],
      prof: "'No confíes, verifica' es el lema de Bitcoin. El nodo propio es cómo lo cumples.",
      tools: ["Sparrow Wallet", "Umbrel / Start9"]
    },
    {
      id: "m18l5", title: "Los 5 pilares legales de protección patrimonial", min: 30,
      objectives: ["Conocer las estructuras clásicas de protección", "Entender riesgos y obligaciones", "Preparar la conversación con tu asesor"],
      theory: `
        <p>Las grandes fortunas combinan varias capas legales. Estos son los 5 pilares más habituales (visión educativa general; los métodos concretos de cualquier curso de pago pueden diferir):</p>
        <ol>
          <li><strong>Separación patrimonial</strong>: sociedades (holding) que separan el riesgo de tu actividad de tu patrimonio personal; régimen de separación de bienes o capitulaciones.</li>
          <li><strong>Fiducia / trusts / fundaciones</strong>: transfieren la titularidad a una estructura con reglas para beneficiarios (en Colombia, la fiducia mercantil; en otros países, trusts o fundaciones privadas).</li>
          <li><strong>Seguros y previsión</strong>: seguros de vida, responsabilidad civil y productos de ahorro con protección legal específica según el país.</li>
          <li><strong>Diversificación jurisdiccional y de divisas</strong>: cuentas, custodios y activos en más de un país y moneda (teoría de las banderas), cumpliendo con el reporte (CRS/FATCA).</li>
          <li><strong>Activos soberanos</strong>: bienes con custodia propia y fuera del sistema bancario, como oro físico o Bitcoin en autocustodia/multifirma.</li>
        </ol>
        <div class="callout warn"><span class="ci">⚖️</span><div>Estas estructuras no protegen de deudas o delitos previos (pueden considerarse fraude a acreedores) y tienen costes y obligaciones fiscales. Requieren abogado y asesor fiscal.</div></div>
      `,
      steps: [
        "Haz un inventario de tu patrimonio por tipo de riesgo: demandas, quiebra de una entidad, inflación, divorcio, geopolítica.",
        "Identifica cuál de los 5 pilares cubre cada riesgo.",
        "Prepara 5 preguntas para un asesor patrimonial/fiscal independiente.",
        "Empieza por lo simple: seguro de responsabilidad civil, diversificar entidades y una parte en activos de autocustodia."
      ],
      pitfalls: ["Montar estructuras complejas sin asesoría o para esconder bienes ante acreedores existentes."],
      prof: "La protección patrimonial se construye en tiempos de calma. Cuando llega la tormenta, ya es tarde.",
      tools: ["Sparrow Wallet"]
    }
  ],
  quiz: [
    { q: "¿Cuál es el límite de pagos en efectivo que fija el reglamento antiblanqueo de la UE desde 2027?", o: ["1.000 €", "10.000 €", "50.000 €", "No hay límite"], a: 1, e: "Los países pueden fijar límites menores (España ya tiene 1.000 € con empresarios)." },
    { q: "¿Qué ventaja de privacidad da un nodo propio de Bitcoin?", o: ["Mina bitcoins gratis", "No revelas tus direcciones ni tu IP a servidores ajenos", "Elimina impuestos", "Hace las transacciones invisibles"], a: 1, e: "Tu wallet consulta tu propia copia de la blockchain." },
    { q: "¿La privacidad financiera implica no declarar impuestos?", o: ["Sí", "No: es proteger tu información frente a terceros, cumpliendo la ley", "Solo con Bitcoin", "Solo en el extranjero"], a: 1, e: "Privacidad no es evasión." }
  ]
});

/* ---------- Módulo 19 · Mundo físico ---------- */
BASTION.modules.push({
  id: "m19", num: "19", icon: "🧳", color: "vi", level: 3,
  title: "Privacidad Física: Ubicación, Viajes, Fronteras, Hogar y Familia",
  subtitle: "Rastreo por antenas, 2G e IMSI catchers, bolsas Faraday, registros en fronteras, cámaras domésticas y rastreadores",
  summary: "Tu móvil delata dónde estás aunque apagues el GPS. Aprendes cómo funciona el rastreo por antenas, cuándo y cómo 'desaparecer' físicamente, cómo cruzar fronteras con tus dispositivos y cómo proteger tu casa y tu familia.",
  outcomes: ["Entender el rastreo por red móvil", "Preparar dispositivos para viajar", "Proteger el hogar y detectar rastreadores"],
  lessons: [
    {
      id: "m19l1", title: "Cómo te ubica tu móvil (aunque apagues el GPS) y cómo evitarlo", min: 25,
      objectives: ["Distinguir GPS, Wi-Fi, Bluetooth y antenas", "Desactivar 2G", "Usar modo avión y bolsas Faraday correctamente"],
      theory: `
        <ul>
          <li><strong>Antenas de telefonía</strong>: tu operadora sabe siempre a qué antena estás conectado; esos registros se conservan y pueden ser requeridos.</li>
          <li><strong>Wi-Fi y Bluetooth</strong>: tu móvil busca redes y balizas aunque no te conectes.</li>
          <li><strong>Apps y SDKs</strong>: muchas apps venden tu ubicación a data brokers.</li>
          <li><strong>IMSI catchers</strong>: falsas antenas que fuerzan conexiones 2G (sin cifrado fuerte) para identificar teléfonos.</li>
        </ul>
        <p>Para no emitir: <strong>modo avión</strong> (comprobando que Wi-Fi/Bluetooth no se reactivan), <strong>apagado</strong>, o una <strong>bolsa Faraday</strong> de calidad, que bloquea todas las señales.</p>
      `,
      steps: [
        "Android 12+: Ajustes → Redes → SIM → desactiva <b>Permitir 2G</b>. iPhone: el Modo de aislamiento desactiva 2G.",
        "Revisa qué apps tienen permiso de <b>ubicación siempre</b> y quítalo.",
        "Comprueba tu modo avión: al activarlo, ¿se encienden solos Wi-Fi o Bluetooth? Desactívalos manualmente.",
        "Si usas bolsa Faraday: prueba que funciona llamando a tu móvil dentro de ella (no debe sonar).",
        "Para reuniones o lugares sensibles: deja el móvil fuera, apagado o en la bolsa."
      ],
      pitfalls: ["Creer que desactivar 'Ubicación' oculta tu posición a la operadora."],
      prof: "La única forma de no emitir es no emitir. Todo lo demás reduce, no elimina.",
      tools: ["GrapheneOS"]
    },
    {
      id: "m19l2", title: "Viajes y fronteras: dispositivos preparados para un registro", min: 25,
      objectives: ["Conocer los riesgos en fronteras", "Preparar un 'perfil de viaje'", "Actuar ante un registro"],
      theory: `
        <p>En algunos países (por ejemplo EE. UU.) las autoridades de frontera pueden inspeccionar dispositivos electrónicos. Además, en viajes aumentan el robo y la pérdida.</p>
        <ul>
          <li>Un dispositivo <strong>apagado y cifrado</strong> está en su estado más seguro (las claves no están en memoria).</li>
          <li>La biometría puede usarse para desbloquear más fácilmente que un código: desactívala temporalmente antes del control.</li>
          <li><strong>Viaja con lo mínimo</strong>: lo que no llevas no se puede inspeccionar ni perder.</li>
        </ul>
      `,
      steps: [
        "Antes de viajar: copia de seguridad cifrada completa en casa.",
        "Cierra sesión de apps sensibles que no necesites en el viaje o usa un perfil/usuario de viaje.",
        "Antes del control: <b>apaga</b> el portátil y el móvil o usa el bloqueo de emergencia que desactiva la biometría.",
        "Lleva el gestor de contraseñas con un acceso de emergencia configurado por si pierdes el móvil.",
        "Infórmate de las leyes del país de destino (algunas prohíben ciertas apps o VPN)."
      ],
      pitfalls: ["Llevar toda tu vida digital en un portátil desbloqueado con sesión iniciada."],
      prof: "Viaja como un diplomático: con lo justo, cifrado y apagado en los momentos clave.",
      tools: ["VeraCrypt", "Bitwarden"]
    },
    {
      id: "m19l3", title: "Hogar seguro: cámaras, timbres, asistentes de voz y detección de rastreadores", min: 25,
      objectives: ["Elegir dispositivos domésticos respetuosos", "Configurar cámaras y asistentes", "Detectar rastreadores y stalkerware"],
      theory: `
        <ul>
          <li><strong>Cámaras y timbres en la nube</strong>: el proveedor almacena tus vídeos; ha habido casos de empleados con acceso indebido y de entregas a autoridades sin orden en ciertas circunstancias. Prefiere grabación local o cifrado de extremo a extremo.</li>
          <li><strong>Asistentes de voz</strong>: graban tras la palabra de activación (y a veces por falsos positivos).</li>
          <li><strong>Rastreadores Bluetooth</strong> (AirTag, SmartTag, Tile): útiles para tus llaves, peligrosos si alguien los esconde en tu bolso o coche.</li>
        </ul>
      `,
      steps: [
        "Cámaras: elige grabación local (NVR/microSD) o con E2EE; nunca apuntes al interior de zonas íntimas; cambia contraseñas por defecto; red de invitados.",
        "Asistentes de voz: borra el historial de grabaciones y desactiva la revisión humana; silencia el micrófono físico cuando no lo uses.",
        "iPhone: las alertas de rastreadores desconocidos vienen activadas. Android: Ajustes → Seguridad y emergencia → <b>Alertas de rastreadores desconocidos</b> → activar y 'Escanear ahora'.",
        "Si sospechas de stalkerware: revisa apps con permisos de accesibilidad o administrador de dispositivo y busca ayuda especializada (Coalition Against Stalkerware) antes de alertar al agresor."
      ],
      pitfalls: ["Desinstalar de golpe un stalkerware si hay riesgo de violencia: puede alertar al agresor. Primero, plan de seguridad."],
      prof: "Tu casa es tu último refugio. Que lo que pasa dentro no viva en un servidor ajeno.",
      tools: ["GL.iNet / OpenWrt"]
    }
  ],
  quiz: [
    { q: "Si desactivas la ubicación del móvil, ¿tu operadora sigue sabiendo dónde estás?", o: ["No", "Sí, por las antenas a las que te conectas", "Solo de día", "Solo con Wi-Fi"], a: 1, e: "La red móvil necesita saber tu antena para darte servicio." },
    { q: "¿Cuál es el estado más seguro de un portátil cifrado en un control de frontera?", o: ["Suspendido", "Apagado", "Desbloqueado", "Con la pantalla bloqueada"], a: 1, e: "Apagado, las claves de cifrado no están en memoria." }
  ]
});

/* ---------- Módulo 20 · Profesionales y empresas ---------- */
BASTION.modules.push({
  id: "m20", num: "20", icon: "🏢", color: "bl", level: 5,
  title: "Privacidad para Profesionales y Empresas: Proteger a tus Clientes",
  subtitle: "Obligaciones legales, minimización de datos, fraude del CEO (BEC), formación del equipo, IA en la empresa y respuesta a brechas",
  summary: "Si manejas datos de clientes o empleados, tu privacidad también es la suya. Aprendes las obligaciones básicas, cómo reducir datos y riesgos, cómo blindar a tu equipo frente al fraude con IA y cómo reaccionar ante una brecha.",
  outcomes: ["Cumplir obligaciones básicas", "Minimizar datos", "Prevenir el fraude BEC", "Gestionar una brecha"],
  lessons: [
    {
      id: "m20l1", title: "Obligaciones básicas y minimización de datos", min: 30,
      objectives: ["Conocer las obligaciones de un responsable de datos", "Aplicar minimización", "Documentar tus tratamientos"],
      theory: `
        <ul>
          <li><strong>UE/España (RGPD)</strong>: base legal para cada tratamiento, información a los interesados, registro de actividades, contratos con encargados (proveedores), medidas de seguridad y notificación de brechas a la autoridad en 72 horas cuando haya riesgo.</li>
          <li><strong>Colombia (Ley 1581)</strong>: autorización previa del titular, política de tratamiento publicada, atención de consultas y reclamos, y para empresas que superan ciertos umbrales, inscripción de bases de datos en el <strong>RNBD</strong> de la SIC y reporte de incidentes de seguridad.</li>
        </ul>
        <p><strong>Minimización</strong>: el dato que no recoges no se puede filtrar. Pide solo lo necesario, guárdalo solo el tiempo necesario y da acceso solo a quien lo necesita.</p>
      `,
      steps: [
        "Haz un mapa de datos: qué datos de clientes/empleados tienes, dónde (Excel, CRM, WhatsApp, correo) y quién accede.",
        "Elimina lo que no necesitas (copias de documentos, datos antiguos).",
        "Redacta o revisa tu política de privacidad y tu formulario de autorización.",
        "Revisa contratos con proveedores que tocan datos (hosting, CRM, nóminas, herramientas de IA).",
        "Comprueba si debes inscribirte en el RNBD (Colombia) o llevar registro de actividades (UE)."
      ],
      pitfalls: ["Guardar documentos de clientes en el WhatsApp personal del dueño del negocio."],
      prof: "Cumplir no es burocracia: es reducir el tamaño del botín que un atacante puede llevarse.",
      tools: ["SIC Colombia"]
    },
    {
      id: "m20l2", title: "Fraude del CEO, facturas falsas y formación del equipo", min: 25,
      objectives: ["Prevenir el BEC", "Implantar doble verificación de pagos", "Formar al equipo con simulacros"],
      theory: `
        <p>El <strong>Business Email Compromise (BEC)</strong> es uno de los fraudes que más dinero mueve: correos o llamadas (ahora con voz y vídeo sintéticos) que suplantan al director o a un proveedor para cambiar una cuenta bancaria o pedir una transferencia urgente.</p>
      `,
      steps: [
        "Regla: <b>ningún cambio de cuenta bancaria de un proveedor</b> se acepta sin verificar por teléfono al número que ya tenías (no al del correo).",
        "Pagos por encima de un umbral: <b>doble aprobación</b>.",
        "Activa SPF, DKIM y DMARC en tu dominio para dificultar la suplantación de tu correo.",
        "Passkeys/2FA obligatorio en correo, banca y herramientas del equipo; gestor de contraseñas de empresa.",
        "Haz un simulacro de phishing y una sesión de 30 minutos sobre deepfakes con todo el equipo cada semestre."
      ],
      code: { title: "Registros DNS antisuplantación (ejemplo)", body: "; SPF: quién puede enviar correo por tu dominio\ntudominio.com.  TXT  \"v=spf1 include:_spf.proveedor-correo.com -all\"\n\n; DMARC: qué hacer con correos que fallan SPF/DKIM (empieza en p=none para observar)\n_dmarc.tudominio.com.  TXT  \"v=DMARC1; p=quarantine; rua=mailto:dmarc@tudominio.com\"\n\n; DKIM: lo genera tu proveedor de correo (selector._domainkey)" },
      pitfalls: ["Confiar en un correo porque viene 'del dominio correcto': puede ser una cuenta hackeada del proveedor."],
      prof: "Un minuto de llamada de verificación vale más que cualquier antivirus contra el fraude del CEO.",
      tools: ["Bitwarden"]
    },
    {
      id: "m20l3", title: "IA en la empresa y respuesta a brechas", min: 25,
      objectives: ["Crear una política de uso de IA", "Preparar un plan de respuesta a brechas", "Comunicar incidentes"],
      theory: `
        <p>Los empleados ya usan IA con datos de clientes, muchas veces con cuentas personales ("shadow AI"). Una política simple y herramientas adecuadas (planes empresariales sin entrenamiento, IA local para datos sensibles) evitan filtraciones.</p>
      `,
      steps: [
        "Escribe una política de IA de 1 página con el semáforo de datos (Módulo 10).",
        "Ofrece herramientas aprobadas (plan empresarial o IA local) para que nadie use cuentas personales.",
        "Prepara un plan de brecha: quién decide, a quién se notifica (autoridad, clientes), en qué plazo y con qué plantilla.",
        "Haz un ejercicio de mesa: '¿qué haríamos si se filtra nuestra base de clientes mañana?'"
      ],
      code: { title: "Política de IA en 10 líneas", body: "1. Solo herramientas de IA aprobadas por la empresa.\n2. Prohibido introducir datos personales de clientes/empleados sin anonimizar.\n3. Prohibido introducir contraseñas, claves API o secretos comerciales.\n4. Datos sensibles: solo en la IA local aprobada.\n5. Revisar siempre la salida de la IA antes de enviarla a un cliente.\n6. No conectar agentes de IA al correo o a sistemas de pago sin aprobación.\n7. Desactivar el entrenamiento con datos en las herramientas.\n8. Reportar cualquier error o fuga a [responsable].\n9. Formación semestral obligatoria.\n10. Revisión de esta política cada 6 meses." },
      pitfalls: ["Prohibir la IA sin ofrecer alternativa: el equipo la usará a escondidas."],
      prof: "La mejor política es la que se entiende en un minuto y se cumple sin fricción.",
      tools: ["Ollama", "Presidio"]
    }
  ],
  quiz: [
    { q: "Un proveedor te pide por correo cambiar su cuenta bancaria. ¿Qué haces?", o: ["Cambiarla", "Verificar llamando al número que ya tenías", "Responder al correo preguntando", "Pagar a ambas cuentas"], a: 1, e: "Nunca uses los datos de contacto del propio correo sospechoso." },
    { q: "¿Qué registros DNS ayudan a evitar la suplantación de tu dominio de correo?", o: ["A y AAAA", "SPF, DKIM y DMARC", "MX solamente", "CNAME"], a: 1, e: "Indican qué servidores pueden enviar y qué hacer con los correos falsos." }
  ]
});

/* ---------- Arsenal y amenazas adicionales ---------- */
BASTION.arsenal.push(
  { n: "Phoenix Wallet", cat: "Finanzas", rep: "Wallets Lightning custodiales", d: "Wallet Lightning en autocustodia, sencilla, para pagos rápidos.", url: "https://phoenix.acinq.co", price: "Gratis (comisiones)", os: "Móvil", os_tag: "Open Source", mod: "m18" },
  { n: "Umbrel / Start9", cat: "Finanzas", rep: "Consultar saldos en servidores ajenos", d: "Plataformas para montar tu propio nodo de Bitcoin y servicios personales.", url: "https://umbrel.com", price: "Gratis + hardware", os: "Mini PC", os_tag: "Open Source", mod: "m18" },
  { n: "Eraser", cat: "Sistema y firewall", rep: "Borrar con Supr", d: "Borrado seguro de archivos y espacio libre en Windows (HDD).", url: "https://eraser.heidi.ie", price: "Gratis", os: "Windows", os_tag: "Open Source", mod: "m05" },
  { n: "OSINT Framework", cat: "OSINT", rep: "—", d: "Directorio de herramientas OSINT por tipo de dato.", url: "https://osintframework.com", price: "Gratis", os: "Web", os_tag: "Referencia", mod: "m09" },
  { n: "Wayback Machine", cat: "OSINT", rep: "—", d: "Versiones históricas de webs: útil para verificar y archivar evidencias.", url: "https://web.archive.org", price: "Gratis", os: "Web", os_tag: "Utilidad", mod: "m09" },
  { n: "StopNCII", cat: "Antifraude", rep: "—", d: "Bloquea la difusión de imágenes íntimas sin consentimiento en plataformas participantes.", url: "https://stopncii.org", price: "Gratis", os: "Web", os_tag: "Ayuda", mod: "m16" },
  { n: "Take It Down", cat: "Antifraude", rep: "—", d: "Ayuda a retirar imágenes íntimas de menores (NCMEC).", url: "https://takeitdown.ncmec.org", price: "Gratis", os: "Web", os_tag: "Ayuda", mod: "m16" },
  { n: "MXToolbox", cat: "Antifraude", rep: "—", d: "Comprueba los registros SPF, DKIM y DMARC de tu dominio.", url: "https://mxtoolbox.com", price: "Freemium", os: "Web", os_tag: "Utilidad", mod: "m20" }
);

BASTION.threats.push(
  { t: "Secuestro de WhatsApp por buzón de voz", sev: "high", ico: "📞", d: "El atacante pide el código de registro por llamada y lo escucha en tu buzón de voz con el PIN por defecto.", how: ["Llamadas cuando no contestas", "Buzón con PIN por defecto", "Después estafa a tus contactos"], def: ["Verificación en dos pasos y passkey", "Cambiar PIN o desactivar el buzón", "Nunca reenviar códigos"], mods: ["m16", "m04"] },
  { t: "Suplantación de identidad con copias del documento", sev: "high", ico: "🪪", d: "Créditos, líneas y trámites a tu nombre con fotos de tu documento filtradas o enviadas sin marca de agua.", how: ["Copias por WhatsApp/correo", "Filtraciones de organismos", "Phishing de 'verificación de identidad'"], def: ["Marca de agua en cada copia", "Revisar centrales de riesgo", "Denuncia inmediata"], mods: ["m17"] },
  { t: "Venta de tu ubicación por apps", sev: "high", ico: "🛰️", d: "Apps y SDKs publicitarios venden historiales de ubicación a data brokers.", how: ["Permisos de ubicación 'siempre'", "SDKs ocultos en apps gratuitas", "ID de publicidad"], def: ["Ubicación solo mientras se usa", "Eliminar el ID de publicidad", "Revisar apps con ubicación"], mods: ["m19", "m05"] }
);

BASTION.glossary.push(
  ["BEC", "Business Email Compromise: fraude por correo que suplanta a directivos o proveedores para desviar pagos."],
  ["CBDC", "Moneda digital emitida por un banco central (por ejemplo, el euro digital)."],
  ["CRS / FATCA", "Acuerdos de intercambio automático de información sobre cuentas financieras entre países."],
  ["DMARC / SPF / DKIM", "Registros que protegen un dominio de correo frente a la suplantación."],
  ["Bolsa Faraday", "Funda que bloquea todas las señales de radio del dispositivo que contiene."],
  ["IMSI catcher", "Falsa antena de telefonía que identifica o intercepta móviles cercanos."],
  ["Lightning", "Red de canales de pago sobre Bitcoin para pagos rápidos y baratos."],
  ["Nodo de Bitcoin", "Programa que guarda y verifica la blockchain; permite usar tu wallet sin depender de terceros."],
  ["RNBD", "Registro Nacional de Bases de Datos de la SIC (Colombia)."],
  ["Sharenting", "Publicar en exceso información y fotos de los hijos en internet."],
  ["Píxel de Meta", "Código de seguimiento que webs y apps integran para enviar a Meta lo que haces en ellas."]
);

BASTION.badges.push({ id: "mod10", ico: "👑", n: "Maestro", d: "Completa 10 módulos" });
