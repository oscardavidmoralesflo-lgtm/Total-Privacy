/* BASTIÓN ACADEMY · Datos del programa · Parte D (Módulos 12–15) */
window.BASTION = window.BASTION || { modules: [] };

BASTION.modules.push({
  id: "m12", num: "12", icon: "🎭", color: "ro", level: 4,
  title: "Biometría y Anti-Vigilancia IA: Voz, Rostro, Estilometría y Deepfakes",
  subtitle: "Clonación de voz, Glaze/Nightshade/Fawkes, opt-outs faciales, estilometría, deepfakes y escaneo en el dispositivo",
  summary: "Tu cara, tu voz y tu forma de escribir ya son identificadores. Aprendes qué se puede hacer (y qué no) para reducir la exposición biométrica, detectar deepfakes y evitar que tu estilo te delate en la capa Fantasma.",
  outcomes: ["Reducir exposición de voz y rostro", "Proteger imágenes públicas", "Neutralizar la estilometría", "Detectar deepfakes"],
  lessons: [
    {
      id: "m12l1", title: "Tu voz y tu rostro como identificadores: reducir la superficie", min: 25,
      objectives: ["Inventariar tu voz y rostro públicos", "Reducir material para clonación", "Gestionar biometría en servicios"],
      theory: `
        <p>La clonación de voz <em>zero-shot</em> necesita muy poco audio. El reconocimiento facial masivo indexa fotos públicas. No puedes desaparecer, pero sí <strong>reducir el material disponible</strong> y <strong>controlar dónde entregas biometría</strong>.</p>
        <ul>
          <li>Prefiere desbloqueo por PIN largo en situaciones de riesgo (en algunos países pueden obligarte a desbloquear con huella/cara más fácilmente que a revelar un código).</li>
          <li>Desactiva el reconocimiento de caras en servicios que no lo necesitan (etiquetado automático en redes, agrupación por caras en nubes no cifradas).</li>
          <li>Evita verificaciones biométricas innecesarias en apps poco fiables.</li>
        </ul>
      `,
      steps: [
        "Revisa redes y canales: ¿cuántos minutos de tu voz son públicos? Haz privadas las historias/vídeos antiguos que no necesites.",
        "Cambia el saludo del buzón de voz por el genérico del sistema.",
        "Desactiva el reconocimiento facial/etiquetado automático en tus redes y en la app de fotos si no es E2EE.",
        "Aprende el atajo de 'bloqueo de emergencia': Android → botón de encendido → <b>Bloqueo de seguridad</b>; iPhone → pulsa lateral + volumen 2 s (desactiva Face ID hasta introducir el código)."
      ],
      pitfalls: ["Subir audios largos a apps de 'mejora de voz' o 'cantar con IA' de dudosa procedencia."],
      prof: "No te pido que dejes de publicar. Te pido que publiques con intención: menos voz cruda, menos caras de tu familia.",
      tools: []
    },
    {
      id: "m12l2", title: "Protección adversarial de imágenes: Glaze, Nightshade, Fawkes y opt-outs", min: 25,
      objectives: ["Conocer las herramientas de 'camuflaje' y sus límites", "Aplicar opt-outs faciales", "Proteger fotos de menores"],
      theory: `
        <ul>
          <li><strong>Fawkes</strong> (U. Chicago, 2020): altera píxeles para confundir el reconocimiento facial. Útil como capa extra, pero los sistemas modernos pueden adaptarse.</li>
          <li><strong>Glaze</strong>: protege el <em>estilo</em> artístico contra imitación por IA.</li>
          <li><strong>Nightshade</strong>: "envenena" imágenes para que perjudiquen el entrenamiento de modelos que las recogen sin permiso.</li>
          <li><strong>PhotoGuard</strong> (MIT): investigación para dificultar la edición maliciosa de fotos por IA.</li>
        </ul>
        <div class="callout warn"><span class="ci">⚠️</span><div>Ninguna de estas herramientas es una garantía permanente: es una carrera armamentística. La defensa más fiable sigue siendo <strong>no publicar</strong> o publicar en círculos cerrados.</div></div>
      `,
      steps: [
        "Usa los opt-outs de motores faciales (PimEyes, y en EE. UU. otros servicios) para tu rostro.",
        "Si eres artista o creador: prueba <b>Glaze</b> antes de publicar tu obra.",
        "Fotos de menores: compártelas solo en grupos cerrados o álbumes cifrados (Ente, Signal), nunca en perfiles públicos.",
        "Para fotos de perfil: considera una imagen que no sea tu rostro frontal nítido en servicios de capa 2."
      ],
      pitfalls: ["Creer que una foto 'protegida' puede publicarse sin riesgo alguno."],
      prof: "La mejor foto para reconocimiento facial es la que nunca subiste. La segunda mejor, la que solo ven 20 personas.",
      tools: ["Glaze / Nightshade", "Fawkes", "PimEyes"]
    },
    {
      id: "m12l3", title: "Estilometría y huella conductual: que tu forma de escribir no te delate", min: 25,
      objectives: ["Entender cómo la IA atribuye autoría", "Neutralizar el estilo en capa Fantasma", "Romper patrones temporales"],
      theory: `
        <p>Muletillas, signos de puntuación, longitud de frase, emojis, errores típicos, estructura de código y horario de publicación forman una <strong>huella estilométrica</strong>. Los LLM hacen esta comparación mucho más fácil.</p>
        <p>También existe la <strong>biometría conductual</strong>: ritmo de tecleo y movimientos del ratón, usados por bancos y sistemas antifraude (y, potencialmente, para rastreo).</p>
      `,
      steps: [
        "Para textos de capa Fantasma: redacta, luego pásalo por tu <b>LLM local</b> con el prompt de neutralización (bloque).",
        "Varía horarios de publicación y no publiques desde dos identidades en la misma ventana de tiempo.",
        "Usa usernames, avatares, emojis y temas distintos entre identidades.",
        "Nunca uses un modelo en la nube con tu cuenta personal para neutralizar textos anónimos (vincularías ambas identidades)."
      ],
      code: { title: "Prompt de neutralización estilométrica (usar en LLM LOCAL)", body: "Reescribe el siguiente texto manteniendo exactamente el significado, pero con un\nestilo neutro y estándar: frases de longitud media, puntuación convencional,\nsin muletillas, sin emojis, sin regionalismos, sin expresiones personales\nrecurrentes y sin errores ortográficos característicos. No añadas información.\n\nTEXTO:\n<<<pega aquí>>>" },
      pitfalls: ["Usar la misma firma de despedida o el mismo chiste en dos identidades."],
      prof: "La OPSEC falla más por costumbres que por tecnología. Tu forma de escribir es una costumbre.",
      tools: ["Ollama", "LM Studio"]
    },
    {
      id: "m12l4", title: "Detectar deepfakes y verificar contenido (C2PA)", min: 20,
      objectives: ["Detectar señales de deepfake en vídeo y audio", "Usar verificación por desafío", "Conocer las credenciales de contenido"],
      theory: `
        <p>Los detectores automáticos fallan a menudo; la mejor defensa es el <strong>proceso</strong>: verificar por otro canal y usar desafíos en vivo.</p>
        <ul>
          <li><strong>Desafío en videollamada</strong>: pide girar la cabeza de perfil, pasar la mano por delante de la cara, mostrar un objeto concreto o decir una frase inesperada.</li>
          <li><strong>Audio</strong>: entonación plana, respiración ausente, respuestas que evitan preguntas personales.</li>
          <li><strong>C2PA / Content Credentials</strong>: estándar de procedencia que firma imágenes y vídeos con su origen y ediciones. Comprueba en contentcredentials.org/verify.</li>
        </ul>
      `,
      steps: [
        "Acuerda con tu equipo/familia que cualquier petición de dinero por vídeo/voz se verifica por otro canal.",
        "Prueba a subir una imagen a <b>contentcredentials.org/verify</b> para ver si trae procedencia.",
        "Ante un vídeo viral impactante: busca la fuente original y medios de verificación antes de compartir."
      ],
      pitfalls: ["Fiarte de un detector online de deepfakes como única prueba."],
      prof: "No intentes ganar a la IA mirando píxeles. Gánale con procesos: segundo canal, desafío y palabra clave.",
      tools: []
    },
    {
      id: "m12l5", title: "IA en el dispositivo y escaneo del lado del cliente", min: 20,
      objectives: ["Entender el client-side scanning", "Revisar funciones de IA que observan tu pantalla", "Seguir el debate legal (Chat Control)"],
      theory: `
        <p>El <strong>escaneo del lado del cliente</strong> analiza el contenido en tu dispositivo <em>antes</em> de cifrarlo. En la UE, la propuesta conocida como <strong>"Chat Control"</strong> (Reglamento CSAR) lleva años en debate por su impacto sobre el cifrado de extremo a extremo; sigue su estado actual.</p>
        <p>A la vez, los sistemas operativos integran IA que lee pantalla, notificaciones y documentos (Recall, Apple Intelligence, Gemini en Android, asistentes de teclado). Aunque procesen en local, aumentan lo que un atacante con acceso podría obtener.</p>
      `,
      steps: [
        "Lista las funciones de IA activas en tu PC y móvil (resúmenes de notificaciones, asistentes, Recall, teclados inteligentes).",
        "Desactiva las que no aportan valor real.",
        "Revisa qué apps tienen permiso de <b>accesibilidad</b> (pueden leer tu pantalla): Android → Accesibilidad → Apps instaladas.",
        "Sigue a organizaciones como EFF, EDRi o Fundación Karisma para estar al día del debate legal."
      ],
      pitfalls: ["Conceder permisos de accesibilidad a apps de 'limpieza' o 'ahorro de batería'."],
      prof: "Una app con permiso de accesibilidad puede ver más que tu pareja. Revísalas como revisarías quién tiene llave de tu casa.",
      tools: []
    }
  ],
  quiz: [
    { q: "¿Cuál es la defensa más fiable contra deepfakes en llamadas?", o: ["Un detector online", "Verificar por otro canal y usar desafíos/palabra clave", "Subir el volumen", "Grabar la llamada"], a: 1, e: "Los procesos vencen a la detección técnica." },
    { q: "¿Qué protege Glaze?", o: ["Tu IP", "El estilo artístico frente a imitación por IA", "Tu contraseña", "Tu SIM"], a: 1, e: "Nightshade, en cambio, busca perjudicar el entrenamiento no autorizado." },
    { q: "¿Por qué no usar un chatbot en la nube con tu cuenta personal para neutralizar textos anónimos?", o: ["Es lento", "Vincularía tu identidad real con la anónima", "No sabe español", "Cuesta dinero"], a: 1, e: "Por eso se usa un LLM local." }
  ]
});

BASTION.modules.push({
  id: "m13", num: "13", icon: "🪙", color: "go", level: 4,
  title: "Soberanía Financiera: Banca Compartimentada, Pagos Privados y Bitcoin",
  subtitle: "Cuenta búnker, tarjetas virtuales, efectivo, autocustodia de Bitcoin, compra P2P, privacidad on-chain y teoría de las banderas",
  summary: "Tu dinero también necesita compartimentos. Separas ahorros de gastos, pagas online sin exponer tu tarjeta principal y, si decides usar Bitcoin, aprendes autocustodia real y los fundamentos de privacidad, siempre dentro de la ley y cumpliendo tus obligaciones fiscales.",
  outcomes: ["Separar banca búnker y operativa", "Usar tarjetas virtuales", "Custodiar Bitcoin con seguridad", "Entender la diversificación jurisdiccional"],
  lessons: [
    {
      id: "m13l1", title: "Banca compartimentada: cuenta búnker, cuenta operativa y tarjetas virtuales", min: 25,
      objectives: ["Separar ahorros de gastos", "Usar tarjetas virtuales y límites", "Reducir el riesgo del 'paseo millonario'"],
      theory: `
        <p>Si pagas en todas partes con la tarjeta conectada a tus ahorros, un datáfono clonado o una tienda hackeada vacía tu vida. Dos compartimentos:</p>
        <ul>
          <li><strong>Cuenta búnker</strong>: ahorros. Sin tarjeta en la calle, app solo en un dispositivo seguro o solo en el PC de casa.</li>
          <li><strong>Cuenta operativa</strong> (neobanco o cuenta secundaria): saldo del mes; tarjetas virtuales de un solo uso o con límite para compras online y suscripciones.</li>
        </ul>
      `,
      steps: [
        "Abre (o reutiliza) una segunda cuenta para gastos y transfiere solo el presupuesto semanal/mensual.",
        "Activa <b>tarjetas virtuales</b> (muchos bancos y neobancos las ofrecen) y usa una por comercio o suscripción.",
        "Configura límites diarios bajos, alertas de cada movimiento y desactiva compras internacionales/online si no las usas.",
        "Quita la app del banco búnker del móvil que llevas a la calle, o escóndela en un perfil/espacio privado.",
        "Usa efectivo en compras donde no quieres dejar historial (farmacia, ocio local)."
      ],
      pitfalls: ["Guardar las tarjetas en todas las tiendas online 'por comodidad'."],
      prof: "La pregunta es: si me roban el móvil desbloqueado ahora mismo, ¿cuánto dinero pueden mover? Esa cifra debe ser pequeña.",
      tools: []
    },
    {
      id: "m13l2", title: "Bitcoin en autocustodia: wallets, semillas y hardware", min: 40,
      objectives: ["Entender 'no son tus llaves, no son tus monedas'", "Configurar una wallet con seguridad", "Custodiar la semilla"],
      theory: `
        <p>Dejar fondos en un exchange implica riesgo de quiebra, hackeo o congelación (FTX, 2022). La <strong>autocustodia</strong> significa que solo tú controlas las claves.</p>
        <table>
          <tr><th>Tipo</th><th>Ejemplos</th><th>Para</th></tr>
          <tr><td>Wallet móvil</td><td>Blockstream App (antes Green), Nunchuk, BlueWallet</td><td>Cantidades pequeñas</td></tr>
          <tr><td>Wallet de escritorio</td><td>Sparrow Wallet</td><td>Control fino, coin control, conexión a tu nodo</td></tr>
          <tr><td>Hardware wallet</td><td>Coldcard, Blockstream Jade, Trezor, BitBox02, Passport</td><td>Ahorros significativos</td></tr>
          <tr><td>Multifirma</td><td>Sparrow/Nunchuk con 2-de-3 dispositivos</td><td>Patrimonio y herencia</td></tr>
        </table>
        <div class="callout danger"><span class="ci">🚨</span><div>Quien tenga tus 12/24 palabras tiene tu dinero. Ningún soporte técnico, exchange ni "validador" te las pedirá jamás. Esta lección es educativa y no es asesoría financiera ni de inversión.</div></div>
      `,
      steps: [
        "Descarga la wallet solo desde su web oficial (escribiendo la URL) y verifica la firma si es de escritorio.",
        "Antes de crear la wallet, activa la conexión por <b>Tor</b> o a tu propio nodo si la app lo permite.",
        "Escribe la semilla a mano (papel o placa de acero), nunca foto, nube, nota ni portapapeles.",
        "Haz una <b>prueba de recuperación</b> con una cantidad pequeña antes de mover sumas importantes.",
        "Considera una <b>passphrase</b> (palabra 25) para negación plausible, guardada por separado.",
        "Para montos importantes: hardware wallet comprada directamente al fabricante y, a futuro, multifirma."
      ],
      pitfalls: ["Comprar una hardware wallet de segunda mano o en marketplaces.", "Introducir la semilla en una web 'para sincronizar' (estafa clásica)."],
      prof: "La seguridad en Bitcoin es 10% tecnología y 90% procedimiento. Escribe tu procedimiento antes de mover dinero.",
      tools: ["Sparrow Wallet", "Blockstream App", "Coldcard / Jade / Trezor"]
    },
    {
      id: "m13l3", title: "Compra P2P y privacidad on-chain (dentro de la ley)", min: 30,
      objectives: ["Entender los exchanges P2P con escrow", "Conocer los límites de la privacidad on-chain", "Cumplir con tus obligaciones fiscales"],
      theory: `
        <p>Las plataformas <strong>P2P</strong> (Bisq, RoboSats, Hodl Hodl, Peach) conectan compradores y vendedores con mecanismos de garantía (escrow multifirma o fianzas) sin custodiar tus fondos. La normativa de cada país sobre exchanges, KYC e impuestos varía: <strong>infórmate y declara</strong> lo que corresponda.</p>
        <h3>Privacidad on-chain: lo básico</h3>
        <ul>
          <li>La blockchain de Bitcoin es <strong>pública</strong>: todas las transacciones son visibles para siempre.</li>
          <li>Usa una dirección nueva por cada recepción (las wallets lo hacen solas).</li>
          <li><strong>Coin control</strong>: no mezcles monedas de orígenes distintos (KYC y no-KYC) en una misma transacción.</li>
          <li>Conecta tu wallet a tu propio nodo o por Tor para no revelar tus direcciones a servidores ajenos.</li>
          <li>El panorama de CoinJoin cambió tras acciones legales en 2024 (Samourai, cierre de coordinadores): evalúa el estado legal en tu país antes de usar herramientas de mezcla.</li>
          <li>Lightning mejora la privacidad de pagos pequeños.</li>
        </ul>
      `,
      steps: [
        "Estudia el funcionamiento de una plataforma P2P (Bisq o RoboSats) en modo lectura antes de operar.",
        "Si operas: empieza con cantidades mínimas y contrapartes con buena reputación.",
        "Activa el etiquetado de transacciones (labels) en Sparrow para saber el origen de cada moneda.",
        "Lleva un registro para tu declaración de impuestos (fechas, importes, precios)."
      ],
      pitfalls: ["Escribir 'bitcoin' o 'cripto' en conceptos bancarios puede provocar bloqueos de tu banco; consulta las políticas de tu entidad.", "Ofertas con precio muy por debajo del mercado: suelen ser estafas o fondos de origen ilícito."],
      prof: "Privacidad no es evadir impuestos. Es que tu vecino, un hacker o un data broker no sepan cuánto tienes.",
      tools: ["Bisq", "RoboSats", "Sparrow Wallet"]
    },
    {
      id: "m13l4", title: "Teoría de las banderas y protección patrimonial (visión general)", min: 20,
      objectives: ["Conocer el concepto de diversificación jurisdiccional", "Saber qué preguntar a un profesional"],
      theory: `
        <p>La <strong>teoría de las banderas</strong> propone no depender de un único país para todo: <strong>1)</strong> ciudadanía/pasaporte, <strong>2)</strong> residencia fiscal, <strong>3)</strong> empresas, <strong>4)</strong> banca y custodia, <strong>5)</strong> lugar donde vives y gastas, y a veces <strong>6)</strong> activos digitales y <strong>7)</strong> red de contactos.</p>
        <p>Figuras como holdings, fideicomisos y cuentas en otras divisas pueden ser herramientas legítimas de protección y planificación sucesoria, pero tienen obligaciones de información (por ejemplo, intercambio automático de información CRS/FATCA).</p>
        <div class="callout info"><span class="ci">⚖️</span><div>Esto es formación general. Para aplicarlo necesitas un abogado y un asesor fiscal cualificados en las jurisdicciones implicadas.</div></div>
      `,
      steps: [
        "Haz un mapa: ¿cuántas de tus 'banderas' dependen de un solo país/banco?",
        "Identifica un riesgo concentrado (p. ej. todo en un solo banco local) y evalúa una diversificación sencilla y legal.",
        "Prepara preguntas para un asesor profesional antes de cualquier estructura compleja."
      ],
      pitfalls: ["Seguir 'estructuras offshore' de influencers sin asesoría: pueden acabar en sanciones."],
      prof: "La diversificación más simple y potente: no tener todos tus ahorros en una sola entidad ni en una sola moneda.",
      tools: []
    }
  ],
  quiz: [
    { q: "¿Para qué sirve una cuenta búnker?", o: ["Para pagar en tiendas", "Guardar ahorros sin exponerlos a pagos diarios", "Recibir spam", "Para el 2FA"], a: 1, e: "Los gastos van por una cuenta operativa con saldo limitado." },
    { q: "¿Dónde NUNCA debes guardar tu semilla?", o: ["Papel en lugar seguro", "Placa de acero", "Foto en el móvil o nube", "Caja fuerte"], a: 2, e: "Fotos y nube son objetivo de malware y filtraciones." },
    { q: "¿La blockchain de Bitcoin es privada?", o: ["Sí, totalmente", "No, es pública y permanente", "Solo de noche", "Solo para exchanges"], a: 1, e: "La privacidad depende de tus prácticas (direcciones nuevas, coin control, nodo propio)." }
  ]
});

BASTION.modules.push({
  id: "m14", num: "14", icon: "🏰", color: "em", level: 5,
  title: "Infraestructura Soberana: Self-Hosting para Soberanos",
  subtitle: "Homelab o VPS, Docker, WireGuard/Tailscale, AdGuard Home, Vaultwarden, SearXNG, Nextcloud/Immich y copias 3-2-1",
  summary: "El último escalón: dejar de depender de empresas para tus servicios críticos. Montas tu propia nube privada, con acceso remoto seguro, bloqueo DNS para toda la casa y copias de seguridad cifradas. Exige responsabilidad: tú eres el administrador.",
  outcomes: ["Elegir homelab o VPS", "Desplegar servicios con Docker", "Acceder sin exponer puertos", "Hacer copias cifradas"],
  lessons: [
    {
      id: "m14l1", title: "Homelab vs VPS, Docker y principios de seguridad del servidor", min: 35,
      objectives: ["Elegir dónde alojar", "Instalar Docker", "Endurecer el servidor"],
      theory: `
        <table>
          <tr><th></th><th>Homelab (en casa)</th><th>VPS (alquilado)</th></tr>
          <tr><td>Control físico</td><td>Total</td><td>El proveedor tiene acceso</td></tr>
          <tr><td>Coste</td><td>Hardware inicial (mini PC, Raspberry Pi)</td><td>Mensual</td></tr>
          <tr><td>Ideal para</td><td>Fotos, archivos, DNS doméstico, IA local</td><td>VPN propia, servicios públicos</td></tr>
        </table>
        <h3>Principios</h3>
        <ol>
          <li><strong>No expongas puertos</strong> a internet salvo que sea imprescindible: usa VPN (WireGuard/Tailscale).</li>
          <li>Acceso SSH solo con clave, sin contraseña ni root.</li>
          <li>Actualizaciones automáticas de seguridad.</li>
          <li>Copias de seguridad antes de nada (lección 4).</li>
        </ol>
      `,
      steps: [
        "Elige: mini PC/Raspberry Pi en casa o VPS de un proveedor que acepte pagos y datos mínimos.",
        "Instala Debian/Ubuntu Server, crea un usuario no-root y configura SSH con clave.",
        "Instala Docker y Docker Compose siguiendo la documentación oficial.",
        "Activa el firewall (ufw) y las actualizaciones automáticas (Módulo 05)."
      ],
      code: { title: "Endurecer SSH (servidor)", body: "# En tu PC: crear clave\nssh-keygen -t ed25519 -C \"homelab\"\nssh-copy-id usuario@IP_SERVIDOR\n\n# En el servidor: /etc/ssh/sshd_config\nPermitRootLogin no\nPasswordAuthentication no\nKbdInteractiveAuthentication no\n\nsudo systemctl restart ssh\n\n# Docker (script oficial; revisa antes de ejecutar)\ncurl -fsSL https://get.docker.com -o get-docker.sh\nless get-docker.sh\nsudo sh get-docker.sh\nsudo usermod -aG docker $USER" },
      pitfalls: ["Publicar paneles de administración (Portainer, routers, NAS) directamente en internet."],
      prof: "Empieza con un solo servicio útil (AdGuard Home). Cuando lo domines, añade el siguiente. Un homelab abandonado es un riesgo.",
      tools: ["Docker"]
    },
    {
      id: "m14l2", title: "Acceso remoto seguro: WireGuard, Tailscale/Headscale y AdGuard Home", min: 30,
      objectives: ["Conectarte a casa desde cualquier lugar", "Bloquear anuncios y rastreo en toda la red"],
      theory: `
        <ul>
          <li><strong>WireGuard</strong> (wg-easy): VPN propia, abres un solo puerto UDP.</li>
          <li><strong>Tailscale</strong>: red privada sin abrir puertos (servidor de coordinación de la empresa) · <strong>Headscale</strong>: versión autoalojada del coordinador.</li>
          <li><strong>AdGuard Home</strong> / Pi-hole: DNS con bloqueo para todos los dispositivos de casa.</li>
        </ul>
      `,
      steps: [
        "Despliega AdGuard Home con el compose del bloque y apunta el DNS de tu router a su IP.",
        "Añade las listas OISD / HaGeZi y DNS de subida cifrados (Quad9 DoH, Mullvad DoH).",
        "Instala Tailscale en servidor, PC y móvil (o Headscale si quieres todo propio) para acceder sin abrir puertos.",
        "Configura AdGuard Home como DNS de tu tailnet para tener bloqueo también fuera de casa."
      ],
      code: { title: "docker-compose.yml · AdGuard Home", body: "services:\n  adguardhome:\n    image: adguard/adguardhome:latest\n    container_name: adguardhome\n    restart: unless-stopped\n    ports:\n      - \"53:53/tcp\"\n      - \"53:53/udp\"\n      - \"3000:3000/tcp\"   # asistente inicial (ciérralo luego)\n      - \"8080:80/tcp\"     # panel\n    volumes:\n      - ./work:/opt/adguardhome/work\n      - ./conf:/opt/adguardhome/conf\n\n# docker compose up -d   → abre http://IP:3000 para configurar" },
      pitfalls: ["Dejar el DNS de AdGuard abierto a internet (resolver abierto usado en ataques DDoS)."],
      prof: "Tailscale es la forma más sencilla de tener 'tu casa en el bolsillo' sin abrir puertos. Para soberanía total, Headscale.",
      tools: ["AdGuard Home", "WireGuard", "Tailscale / Headscale"]
    },
    {
      id: "m14l3", title: "Tus propios servicios: Vaultwarden, SearXNG, Nextcloud e Immich", min: 40,
      objectives: ["Alojar tu gestor de contraseñas", "Tu buscador", "Tu nube y tus fotos"],
      theory: `
        <ul>
          <li><strong>Vaultwarden</strong>: servidor compatible con los clientes de Bitwarden, ligero.</li>
          <li><strong>SearXNG</strong>: metabuscador privado propio.</li>
          <li><strong>Nextcloud</strong>: archivos, calendario, contactos.</li>
          <li><strong>Immich</strong>: alternativa a Google Fotos con IA de reconocimiento local.</li>
        </ul>
        <div class="callout warn"><span class="ci">⚠️</span><div>Si alojas tu gestor de contraseñas, eres responsable de su seguridad, actualizaciones y copias. Si no te sientes cómodo, Bitwarden en la nube es una opción excelente.</div></div>
      `,
      steps: [
        "Despliega Vaultwarden solo accesible por Tailscale/WireGuard (no a internet).",
        "Activa HTTPS (Caddy con certificados o el HTTPS de Tailscale): los clientes de Bitwarden lo exigen.",
        "Despliega SearXNG y ponlo como buscador predeterminado.",
        "Prueba Immich con una copia de tus fotos antes de migrar del todo."
      ],
      code: { title: "docker-compose.yml · Vaultwarden (acceso solo por VPN)", body: "services:\n  vaultwarden:\n    image: vaultwarden/server:latest\n    container_name: vaultwarden\n    restart: unless-stopped\n    environment:\n      SIGNUPS_ALLOWED: \"false\"      # crea tu usuario y luego ciérralo\n      DOMAIN: \"https://vault.tu-tailnet.ts.net\"\n    volumes:\n      - ./vw-data:/data\n    ports:\n      - \"127.0.0.1:8081:80\"          # solo local; publica vía Tailscale/Caddy\n\n# Copia de seguridad: ./vw-data (db.sqlite3, attachments, rsa_key*)" },
      pitfalls: ["Dejar SIGNUPS_ALLOWED activo: cualquiera podría registrarse."],
      prof: "Tu primer objetivo no es tener 20 contenedores: es tener 3 que funcionen siempre y con copia de seguridad probada.",
      tools: ["Vaultwarden", "SearXNG", "Nextcloud", "Immich"]
    },
    {
      id: "m14l4", title: "Copias de seguridad cifradas 3-2-1 y mantenimiento", min: 25,
      objectives: ["Aplicar 3-2-1", "Cifrar copias con restic/Borg", "Probar restauraciones"],
      theory: `
        <p><strong>3-2-1</strong>: 3 copias, en 2 soportes distintos, 1 fuera de casa. Y una regla extra: <strong>una copia que no has restaurado nunca no es una copia</strong>.</p>
        <p><strong>restic</strong> y <strong>BorgBackup</strong> cifran y deduplican; puedes enviarlas a un disco externo y a un almacenamiento remoto cifrado.</p>
      `,
      steps: [
        "Instala restic y crea un repositorio cifrado en un disco externo.",
        "Crea un segundo repositorio remoto (otro servidor, almacenamiento S3 compatible o la casa de un familiar).",
        "Programa copias diarias con cron o un timer de systemd.",
        "Restaura un archivo de prueba una vez al mes y apúntalo."
      ],
      code: { title: "restic básico", body: "restic init --repo /mnt/backup/restic\nrestic -r /mnt/backup/restic backup ~/servicios ~/Documentos\nrestic -r /mnt/backup/restic snapshots\nrestic -r /mnt/backup/restic restore latest --target /tmp/prueba-restauracion\nrestic -r /mnt/backup/restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 12 --prune\n\n# Guarda la contraseña del repositorio en tu gestor y en el kit de herencia" },
      pitfalls: ["Guardar la contraseña de las copias solo dentro del servidor que estás respaldando."],
      prof: "El ransomware y los discos que mueren no avisan. La copia probada es tu seguro de vida digital.",
      tools: ["restic", "BorgBackup"]
    }
  ],
  quiz: [
    { q: "¿Cuál es el principio más importante del self-hosting seguro?", o: ["Abrir todos los puertos", "No exponer servicios a internet; usar VPN", "Usar contraseñas cortas", "No actualizar"], a: 1, e: "Menos superficie expuesta = menos ataques." },
    { q: "¿Qué significa 3-2-1?", o: ["3 contraseñas, 2 correos, 1 teléfono", "3 copias, 2 soportes, 1 fuera de casa", "3 VPN, 2 DNS, 1 router", "Nada"], a: 1, e: "Y además: prueba las restauraciones." },
    { q: "Vaultwarden es…", o: ["Un antivirus", "Un servidor compatible con Bitwarden autoalojable", "Un navegador", "Una VPN"], a: 1, e: "Permite usar las apps de Bitwarden contra tu propio servidor." }
  ]
});

BASTION.modules.push({
  id: "m15", num: "15", icon: "🗝️", color: "go", level: 5,
  title: "Herencia Digital y Continuidad: Que tu Soberanía no Muera Contigo",
  subtitle: "Kit de emergencia, USBs cifrados, división de secretos, contactos de legado y testamento",
  summary: "La paradoja final: si lo blindas todo y te pasa algo, tu familia pierde el acceso para siempre. Diseñas un sistema de herencia que nadie puede abrir antes de tiempo pero que tu familia sí podrá usar cuando haga falta.",
  outcomes: ["Crear tu kit de emergencia", "Configurar contactos de legado", "Dividir secretos", "Coordinar con el testamento"],
  lessons: [
    {
      id: "m15l1", title: "Inventario y contactos de legado de las grandes plataformas", min: 25,
      objectives: ["Inventariar activos digitales", "Configurar accesos de emergencia oficiales"],
      theory: `
        <p>Las plataformas ofrecen mecanismos oficiales:</p>
        <ul>
          <li><strong>Google</strong>: Administrador de cuentas inactivas.</li>
          <li><strong>Apple</strong>: Contacto de legado (con clave de acceso).</li>
          <li><strong>Facebook/Instagram</strong>: Contacto de legado / conmemoración.</li>
          <li><strong>Bitwarden</strong>: Acceso de emergencia (con tiempo de espera configurable).</li>
          <li><strong>Proton</strong>: revisa las opciones de recuperación y acceso de emergencia disponibles en tu plan.</li>
        </ul>
      `,
      steps: [
        "Crea un inventario (sin contraseñas) de cuentas, bancos, seguros, cripto, dominios y suscripciones.",
        "Google: myaccount.google.com/inactive → configura el Administrador de cuentas inactivas.",
        "Apple: Ajustes → [tu nombre] → Inicio de sesión y seguridad → <b>Contacto de legado</b>.",
        "Bitwarden: Ajustes → <b>Acceso de emergencia</b> → invita a una persona de confianza con espera de 7–14 días.",
        "Cancela suscripciones que nadie sabría que existen."
      ],
      pitfalls: ["Guardar el inventario con contraseñas en texto plano en el escritorio."],
      prof: "Empieza por lo oficial: es gratis, legal y tarda 15 minutos. Luego vamos al kit cifrado.",
      tools: ["Bitwarden"]
    },
    {
      id: "m15l2", title: "El kit de herencia: USBs cifrados y división del secreto", min: 35,
      objectives: ["Crear contenedores cifrados redundantes", "Separar contenido y llave", "Usar Shamir o mitades"],
      theory: `
        <p>Principio: <strong>separar el contenedor de la llave</strong>. Los USB cifrados pueden estar en manos de tu familia; la contraseña se reparte de forma que ninguna persona sola pueda abrirlos antes de tiempo.</p>
        <ul>
          <li><strong>VeraCrypt</strong>: contenedores cifrados multiplataforma.</li>
          <li><strong>Shamir's Secret Sharing</strong>: divide un secreto en N partes y se necesitan K para reconstruirlo (p. ej. 2 de 3). Para semillas de Bitcoin existe el estándar SLIP-39; o mejor, multifirma.</li>
        </ul>
      `,
      steps: [
        "Compra 2 USB de calidad. Crea en cada uno un volumen VeraCrypt (AES, contraseña larga de herencia).",
        "Dentro: exportación cifrada del gestor, códigos de recuperación 2FA, inventario, instrucciones paso a paso y un vídeo/documento explicativo.",
        "Reparte: USB 1 en casa, USB 2 en casa de un familiar o caja de seguridad.",
        "Divide la contraseña (2 de 3 personas o mitades A/B) y entrega cada parte por separado.",
        "Actualiza el kit cada 6–12 meses y tras cambios grandes (nuevas cuentas, cripto, mudanza)."
      ],
      code: { title: "Plantilla de instrucciones para tu familia", body: "INSTRUCCIONES DE ACCESO — Para [nombre]\n\n1. Reúne las dos partes de la contraseña (las tienen: ________ y ________).\n2. En un ordenador, instala VeraCrypt desde https://veracrypt.fr\n3. Conecta el USB → VeraCrypt → 'Seleccionar archivo' → montar → introducir contraseña.\n4. Abre 'LEEME.pdf'. Ahí está el orden de pasos.\n5. Lo primero: Bitwarden (correo y frase dentro), luego el correo principal.\n6. Cripto: NO introduzcas la semilla en ninguna web. Contacta con ________ (persona técnica de confianza).\n7. Abogado/notario: ________   Teléfono: ________\n\nNo tengas prisa. Nadie legítimo te pedirá estas claves." },
      pitfalls: ["Una sola persona con USB y contraseña completa.", "No probar que tu familiar sabe montar el volumen."],
      prof: "Haz un simulacro con tu familiar usando un USB de prueba sin datos reales. Si no lo consigue, simplifica las instrucciones.",
      tools: ["VeraCrypt"]
    },
    {
      id: "m15l3", title: "Testamento, cripto y coordinación legal", min: 20,
      objectives: ["Integrar lo digital en el testamento sin exponer secretos", "Saber cuándo necesitas apostilla"],
      theory: `
        <p>Un testamento es un documento que pasa por varias manos: <strong>nunca escribas contraseñas ni semillas en él</strong>. Debe indicar la existencia de activos digitales, quién hereda y dónde están las instrucciones (el kit). Si hay bienes en varios países, puede ser necesaria la <strong>Apostilla de La Haya</strong> para que los documentos tengan validez internacional.</p>
        <div class="callout info"><span class="ci">⚖️</span><div>Consulta con un notario/abogado de tu país: la regulación de la herencia digital varía y está cambiando.</div></div>
      `,
      steps: [
        "Habla con un notario o abogado sobre cómo mencionar activos digitales en tu testamento.",
        "Designa un ejecutor técnico de confianza (o una persona que pueda contratar ayuda segura).",
        "Para cripto significativa, considera una multifirma con un tercero de confianza o un servicio de herencia especializado.",
        "Revisa todo el sistema una vez al año. Pon la fecha en tu calendario."
      ],
      pitfalls: ["Que tu familia no sepa siquiera que existen activos digitales."],
      prof: "La soberanía real incluye a quienes quieres. Cerrar este módulo es el acto de privacidad más generoso del curso.",
      tools: []
    }
  ],
  quiz: [
    { q: "¿Qué nunca debe aparecer escrito en el testamento?", o: ["Tu nombre", "Contraseñas y semillas", "Tus herederos", "La fecha"], a: 1, e: "El testamento pasa por muchas manos." },
    { q: "¿Qué permite el Shamir's Secret Sharing?", o: ["Cifrar discos", "Dividir un secreto para que hagan falta K de N partes", "Navegar anónimo", "Recibir SMS"], a: 1, e: "Ninguna persona sola puede reconstruir el secreto." },
    { q: "¿Qué función de Bitwarden sirve para herencia?", o: ["Send", "Acceso de emergencia", "Generador", "Etiquetas"], a: 1, e: "Concede acceso tras un periodo de espera si no lo rechazas." }
  ]
});
