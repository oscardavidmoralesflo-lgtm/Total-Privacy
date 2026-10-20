/* BASTIÓN ACADEMY · Datos del programa · Parte B (Módulos 04–07) */
window.BASTION = window.BASTION || { modules: [] };

BASTION.modules.push({
  id: "m04", num: "04", icon: "🔐", color: "go", level: 2,
  title: "Búnker de Cuentas: Contraseñas, Passkeys y 2FA",
  subtitle: "Pirámide de contraseñas, Bitwarden/Proton Pass, passkeys, Aegis/Ente, llaves FIDO2 y anti SIM swapping",
  summary: "El 80% de los robos de cuentas vienen de contraseñas reutilizadas, phishing y SMS. Aquí construyes un sistema donde solo memorizas 3 frases y todo lo demás es único, aleatorio y protegido con un segundo factor fuerte.",
  outcomes: ["Crear frases maestras irrompibles", "Migrar a un gestor de contraseñas", "Usar passkeys y 2FA sin SMS", "Blindarte contra SIM swapping"],
  lessons: [
    {
      id: "m04l1", title: "La pirámide de contraseñas y las frases Diceware", min: 25,
      objectives: ["Entender credential stuffing", "Crear tu frase maestra", "Saber qué memorizar y qué no"],
      theory: `
        <p><strong>Credential stuffing</strong>: una web donde te registraste se filtra; bots prueban ese mismo correo+contraseña en tu banco, correo y redes. Si reutilizas, caes en cadena.</p>
        <h3>La pirámide</h3>
        <table>
          <tr><th>Nivel</th><th>Qué</th><th>Cómo</th></tr>
          <tr><td>Cúspide (memoria + papel)</td><td>1) cifrado del PC / PIN del móvil 2) gestor de contraseñas 3) correo principal</td><td>Frases de 6–7 palabras aleatorias</td></tr>
          <tr><td>Base (gestor)</td><td>Todas las demás cuentas (150+)</td><td>20–32 caracteres aleatorios, únicos</td></tr>
        </table>
        <h3>Por qué frases y no "P@ssw0rd!"</h3>
        <p>Una frase de 6 palabras elegidas al azar de una lista de 7.776 palabras tiene ~77 bits de entropía: inviable por fuerza bruta y fácil de recordar. Lo importante es que las palabras sean <strong>aleatorias</strong> (dados o generador), no una frase famosa.</p>
      `,
      steps: [
        "Ve a <b>Laboratorios → Generador de frases</b> y genera tu frase maestra de 6–7 palabras (todo ocurre en tu navegador, sin internet).",
        "Escríbela a mano en una <b>Hoja de emergencia</b> en papel y guárdala en un lugar seguro de casa. Nunca en notas del móvil ni capturas.",
        "Practícala 3 veces al día durante una semana.",
        "Comprueba si tus contraseñas antiguas están filtradas (el gestor lo hará en la próxima lección)."
      ],
      code: { title: "Ejemplo de estructura de frase (NO uses esta)", body: "volcán-trébol-micrófono-sábana-galaxia-limón7\n\n# Entropía aproximada:\n#  palabras de lista de 7.776 → 12,9 bits por palabra\n#  6 palabras ≈ 77 bits  |  7 palabras ≈ 90 bits\n# Un PIN de 6 dígitos ≈ 20 bits (por eso el PIN del móvil debe ser largo)" },
      pitfalls: ["Inventar la frase tú mismo (los humanos elegimos palabras predecibles).", "Usar la misma frase maestra para el gestor y para el correo."],
      prof: "Una frase de 6 palabras se escribe en 4 segundos. Una contraseña tipo 'Xk9#q' se olvida en 4 días. Elige la que vas a usar de verdad.",
      tools: ["Bitwarden", "KeePassXC"]
    },
    {
      id: "m04l2", title: "Gestor de contraseñas: Bitwarden / Proton Pass a fondo", min: 35,
      objectives: ["Crear y endurecer tu bóveda", "Importar y limpiar contraseñas", "Rotar las contraseñas críticas"],
      theory: `
        <p>Un gestor <strong>de conocimiento cero</strong> cifra la bóveda en tu dispositivo; el servidor solo guarda datos cifrados. Opciones:</p>
        <ul>
          <li><strong>Bitwarden</strong>: código abierto, auditado, plan gratis completo, opción de alojarlo tú (Vaultwarden, Módulo 14).</li>
          <li><strong>Proton Pass</strong>: integra alias de correo (hide-my-email) y passkeys; ideal si ya usas Proton.</li>
          <li><strong>KeePassXC</strong>: 100% local, sin nube. Para máxima soberanía.</li>
        </ul>
      `,
      steps: [
        "Crea la cuenta en <b>bitwarden.com</b> (o vault.bitwarden.eu) con un correo que no publiques y tu frase maestra.",
        "Ajustes → Seguridad → Claves → <b>KDF: Argon2id</b> (valores por defecto o superiores).",
        "Ajustes → Seguridad → <b>Inicio de sesión en dos pasos</b>: activa app TOTP o llave FIDO2 y guarda el <b>código de recuperación</b> en tu hoja de emergencia.",
        "Exporta las contraseñas del navegador (Chrome/Edge: Contraseñas → Exportar) e impórtalas en Bitwarden: Herramientas → Importar datos. <b>Borra el CSV</b> después y vacía la papelera.",
        "Borra las contraseñas guardadas en el navegador y desactiva su gestor.",
        "Abre Herramientas → <b>Informes</b>: contraseñas reutilizadas, débiles y expuestas. Cambia primero: correo, banco, gestor, redes principales.",
        "Extensión y app móvil: Tiempo de espera de la bóveda <b>15 min o al bloquear</b>, acción <b>Bloquear</b>; desbloqueo con PIN/biometría pero pidiendo la maestra al reiniciar.",
        "Android/iOS: configura Bitwarden como <b>servicio de autocompletado</b> del sistema."
      ],
      pitfalls: ["Dejar el CSV de exportación en Descargas.", "No guardar el código de recuperación del 2FA del gestor: si pierdes el móvil, pierdes la bóveda."],
      prof: "Haz la migración por oleadas: hoy las 10 cuentas críticas; el resto, cada vez que entres en una web, la cambias y la guardas. En un mes estará todo.",
      tools: ["Bitwarden", "Proton Pass", "KeePassXC"]
    },
    {
      id: "m04l3", title: "Passkeys, 2FA sin SMS y llaves físicas FIDO2", min: 30,
      objectives: ["Ordenar los métodos 2FA por seguridad", "Configurar Aegis/Ente con copias", "Adoptar passkeys y llaves de seguridad"],
      theory: `
        <h3>Jerarquía del segundo factor</h3>
        <table>
          <tr><th>Método</th><th>Seguridad</th><th>Resistente a phishing</th></tr>
          <tr><td>SMS / llamada</td><td>❌ baja (SIM swap, SS7)</td><td>No</td></tr>
          <tr><td>Correo</td><td>⚠️ depende del correo</td><td>No</td></tr>
          <tr><td>Notificación push</td><td>⚠️ media (fatiga MFA)</td><td>No</td></tr>
          <tr><td>App TOTP (Aegis/Ente)</td><td>✅ buena</td><td>No del todo</td></tr>
          <tr><td><strong>Passkey / llave FIDO2</strong></td><td>🏆 máxima</td><td><strong>Sí</strong>: vinculada al dominio real</td></tr>
        </table>
        <p>Las <strong>passkeys</strong> reemplazan la contraseña por un par de claves criptográficas atado al dominio legítimo: aunque caigas en una web falsa, la passkey <strong>no funciona allí</strong>. Por eso son la mejor defensa contra el phishing con IA.</p>
        <div class="callout warn"><span class="ci">⚠️</span><div>No guardes los códigos TOTP de tus cuentas críticas dentro del mismo gestor que sus contraseñas: rompe la separación de factores. Para cuentas menores es aceptable por comodidad.</div></div>
      `,
      steps: [
        "Instala <b>Aegis</b> (Android, F-Droid/Play) o <b>Ente Auth</b> (iOS/Android/PC con sincronización cifrada).",
        "Aegis: activa cifrado con contraseña + biometría; Ajustes → Seguridad → <b>Bloquear capturas</b>; Copias de seguridad → <b>automáticas cifradas</b> a una carpeta que sincronices.",
        "Migra cada cuenta: entra → Seguridad → 2FA → app de autenticación → escanea el QR → <b>guarda los códigos de recuperación</b>.",
        "Elimina el <b>SMS como 2FA y como método de recuperación</b> en correo, gestor, redes y exchanges cuando haya alternativa.",
        "Crea <b>passkeys</b> en Google, Microsoft, Apple, GitHub, PayPal y en todas las webs que lo permitan (guárdalas en tu gestor o en una llave).",
        "Si tu modelo de amenazas es B o C: compra 2 llaves <b>FIDO2</b> (YubiKey, Nitrokey, Token2), registra ambas y guarda una de respaldo fuera de casa.",
        "Si usas Google con alto riesgo, considera el <b>Programa de Protección Avanzada</b>."
      ],
      code: { title: "Orden de migración de 2FA", body: "1. Correo principal (es la llave maestra de todo)\n2. Gestor de contraseñas\n3. Banco / pasarelas de pago / exchanges\n4. Apple ID / cuenta Google / cuenta Microsoft\n5. Redes sociales y mensajería (WhatsApp: PIN de verificación en dos pasos)\n6. Dominio, hosting, nube, GitHub\n7. Todo lo demás" },
      pitfalls: ["Aceptar una notificación push que no iniciaste (fatiga MFA).", "Tener una sola llave física sin respaldo."],
      prof: "Si solo haces una cosa de este módulo: passkey o TOTP en tu correo principal y quítale el SMS. Es la puerta trasera de todas tus cuentas.",
      tools: ["Aegis Authenticator", "Ente Auth", "YubiKey"]
    },
    {
      id: "m04l4", title: "Anti SIM swapping y protección del número de teléfono", min: 20,
      objectives: ["Entender el SIM swap", "Poner PIN a la SIM y a la línea", "Reducir la dependencia del número"],
      theory: `
        <p>En un <strong>SIM swap</strong> el atacante convence (o soborna) a tu operadora para duplicar tu SIM. Tu móvil se queda sin señal y él recibe tus SMS de recuperación. Con eSIM, a veces basta con hackear tu cuenta de la operadora online.</p>
      `,
      steps: [
        "Activa el <b>PIN de la SIM</b>: Android → Seguridad → Más ajustes → Bloqueo de SIM; iPhone → Ajustes → Móvil → PIN de la SIM. Cambia el PIN por defecto por uno de 6–8 dígitos.",
        "Pide a tu operadora una <b>clave/contraseña de atención</b> para cambios de SIM o portabilidad (muchas lo ofrecen) y protege tu cuenta online del operador con contraseña única + 2FA.",
        "No publiques tu número en redes ni lo uses como usuario de inicio de sesión.",
        "WhatsApp: Ajustes → Cuenta → <b>Verificación en dos pasos</b> (PIN) y passkey.",
        "Telegram: Ajustes → Privacidad → <b>Verificación en dos pasos</b> (contraseña).",
        "Señal de alarma: si tu móvil se queda sin servicio sin motivo, llama inmediatamente a tu operadora desde otro teléfono."
      ],
      pitfalls: ["Usar el mismo número 'secreto' del banco en tiendas y redes."],
      prof: "En la capa Bóveda el número existe solo para el banco y la familia. Cuanta menos gente lo tenga, menos vale para un atacante.",
      tools: []
    }
  ],
  quiz: [
    { q: "¿Qué es el credential stuffing?", o: ["Robar una SIM", "Probar contraseñas filtradas en otras webs", "Llenar formularios automáticamente", "Cifrar contraseñas"], a: 1, e: "Por eso cada cuenta debe tener una contraseña única." },
    { q: "¿Qué 2FA es resistente al phishing?", o: ["SMS", "TOTP", "Passkey / llave FIDO2", "Correo"], a: 2, e: "Las passkeys están ligadas criptográficamente al dominio legítimo." },
    { q: "¿Qué KDF conviene usar en Bitwarden?", o: ["MD5", "Argon2id", "SHA-1", "Ninguno"], a: 1, e: "Argon2id es resistente a ataques con GPU." },
    { q: "¿Cuál es la primera cuenta a blindar?", o: ["Netflix", "El correo principal", "Una tienda online", "Spotify"], a: 1, e: "El correo es el método de recuperación de casi todo." }
  ]
});

BASTION.modules.push({
  id: "m05", num: "05", icon: "💻", color: "go", level: 2,
  title: "Bunkeriza tus Dispositivos: Windows, Mac, Android, iPhone y Linux",
  subtitle: "Cifrado de disco, telemetría, Recall, cortafuegos de salida, permisos, teclados, GrapheneOS y Lockdown Mode",
  summary: "Si roban tu portátil o tu móvil, o si una app espía desde dentro, ¿qué pasa? Ciframos discos, cortamos telemetría, controlamos qué programas hablan con internet y endurecemos el móvil hasta el nivel que pida tu modelo de amenazas.",
  outcomes: ["Cifrar todos tus discos", "Desactivar telemetría e IA invasiva", "Controlar conexiones salientes", "Endurecer Android/iOS"],
  lessons: [
    {
      id: "m05l1", title: "Windows 10/11: cifrado, telemetría, Recall y Copilot", min: 40,
      objectives: ["Cifrar el disco", "Reducir telemetría", "Controlar Recall y la IA del sistema"],
      theory: `
        <p>Una contraseña de inicio de sesión <strong>no protege tus archivos</strong> si el disco no está cifrado: basta con sacar el SSD o arrancar desde un USB.</p>
        <p><strong>Windows Recall</strong> (PCs Copilot+) toma capturas periódicas de tu pantalla para que puedas "buscar en tu pasado". Está cifrado y es opcional, pero crea una base de datos de todo lo que ves: un tesoro para un infostealer o para alguien con acceso a tu sesión.</p>
      `,
      steps: [
        "Cifrado: Configuración → Privacidad y seguridad → <b>Cifrado de dispositivo</b> (Home) o Panel de control → <b>BitLocker</b> (Pro). Guarda la clave de recuperación en Bitwarden, no solo en la cuenta Microsoft.",
        "Opcional avanzado: BitLocker con <b>PIN previo al arranque</b> (gpedit → Cifrado de unidad BitLocker → Requerir autenticación adicional al iniciar) o <b>VeraCrypt</b> para contenedores cifrados.",
        "Configuración → Privacidad y seguridad → <b>General</b>: desactiva todo (ID de publicidad, seguimiento de inicio de apps, contenido sugerido).",
        "<b>Diagnóstico y comentarios</b>: solo datos obligatorios; desactiva experiencias personalizadas, entrada manuscrita y escritura; <b>Eliminar datos de diagnóstico</b>.",
        "<b>Historial de actividad</b>: desactiva y borra. <b>Búsqueda</b>: desactiva búsqueda en la nube y el historial.",
        "Recall (si tu PC lo tiene): Privacidad y seguridad → <b>Recall e instantáneas</b> → desactiva y elimina instantáneas; o quítalo en 'Activar o desactivar características de Windows'.",
        "Desactiva/desinstala Copilot si no lo usas y revisa los permisos de apps (micrófono, cámara, ubicación) uno por uno.",
        "Usa una <b>cuenta local</b> o al menos desvincula OneDrive de carpetas sensibles (Escritorio/Documentos).",
        "Herramienta de apoyo: <b>O&O ShutUp10++</b> → aplica solo los ajustes 'recomendados' (verdes) y crea un punto de restauración antes.",
        "Explorador → Ver → Mostrar → <b>Extensiones de nombre de archivo</b> (detecta 'factura.pdf.exe')."
      ],
      code: { title: "Comprobar estado de BitLocker (PowerShell como admin)", body: "manage-bde -status\n\n# Ver la clave de recuperación de C: para guardarla en tu gestor\nmanage-bde -protectors -get C:\n\n# Comprobar si Recall está habilitado (Windows 11 24H2+)\nDism /Online /Get-Featureinfo /Featurename:Recall" },
      pitfalls: ["Activar BitLocker y perder la clave de recuperación.", "Ejecutar 'debloaters' agresivos de internet sin entenderlos: pueden romper actualizaciones de seguridad."],
      prof: "Haz un punto de restauración antes de tocar telemetría. Y recuerda: actualizar Windows es seguridad; no desactives las actualizaciones nunca.",
      tools: ["BitLocker", "VeraCrypt", "O&O ShutUp10++"]
    },
    {
      id: "m05l2", title: "Cortafuegos de salida: Portmaster (Windows/Linux) y Little Snitch / LuLu (Mac)", min: 30,
      objectives: ["Ver qué programas se conectan a internet", "Bloquear conexiones innecesarias", "Integrar DNS seguro"],
      theory: `
        <p>El firewall de Windows controla lo que <em>entra</em>, pero deja <em>salir</em> casi todo. Un cortafuegos de aplicación te muestra cada conexión saliente y te permite cortarla por programa.</p>
        <ul>
          <li><strong>Portmaster</strong> (Safing, código abierto): Windows y Linux, con listas de bloqueo y DNS cifrado.</li>
          <li><strong>Little Snitch</strong> (pago) o <strong>LuLu</strong> (gratis, Objective-See) en macOS.</li>
          <li>Android: <strong>RethinkDNS</strong> (firewall por app + DNS) o NetGuard.</li>
        </ul>
      `,
      steps: [
        "Instala Portmaster desde <b>safing.io</b>.",
        "Ajustes globales → <b>Filter Lists</b>: activa Ads, Trackers, Malware y las listas de telemetría.",
        "Ajustes → <b>Secure DNS</b>: añade tu NextDNS (DoH/DoT) o Quad9.",
        "Revisa la pestaña de aplicaciones: bloquea internet a programas que no lo necesitan (visores, editores offline, utilidades).",
        "Mac: instala <b>LuLu</b> (objective-see.org) y responde a cada alerta durante la primera semana.",
        "Android: instala <b>RethinkDNS</b> → modo DNS + Firewall → bloquea datos en segundo plano para apps que no lo necesitan."
      ],
      pitfalls: ["Bloquear procesos del sistema que no conoces y romper actualizaciones. Ante la duda, permite y busca qué es."],
      prof: "La primera semana es reveladora: verás programas que 'llaman a casa' cada pocos minutos sin motivo aparente.",
      tools: ["Portmaster", "LuLu", "Little Snitch", "RethinkDNS"]
    },
    {
      id: "m05l3", title: "Android endurecido: permisos, teclado, perfiles y GrapheneOS", min: 40,
      objectives: ["Ajustar permisos y sensores", "Sustituir el teclado en la nube", "Aislar apps invasivas", "Conocer GrapheneOS"],
      theory: `
        <p>El móvil es tu dispositivo más íntimo: ubicación 24/7, micrófono, cámara, contactos, fotos y teclado. Muchas filtraciones ocurren por permisos excesivos y por el <strong>teclado</strong> (lo que escribes antes de cifrarse).</p>
        <h3>Niveles</h3>
        <ul>
          <li><strong>Nivel 1</strong>: Android de fábrica bien configurado.</li>
          <li><strong>Nivel 2</strong>: apps de F-Droid/Obtainium, perfil de trabajo (Shelter) o Espacio privado (Android 15+).</li>
          <li><strong>Nivel 3</strong>: <strong>GrapheneOS</strong> en un Google Pixel: SO endurecido, Play Services en sandbox opcional, perfiles de usuario, permisos de red y sensores por app.</li>
        </ul>
      `,
      steps: [
        "Bloqueo: PIN de 6+ dígitos o contraseña; bloqueo automático en 30 s; desactiva 'mostrar contenido de notificaciones' en pantalla de bloqueo.",
        "Ubicación → Servicios de ubicación: desactiva <b>búsqueda de Wi-Fi</b> y <b>búsqueda de Bluetooth</b> en segundo plano; revisa el historial/Cronología de Google.",
        "Ajustes → Privacidad → <b>Gestor de permisos</b>: revisa ubicación, micrófono, cámara, contactos, fotos. Usa 'Solo mientras se usa' y 'Ubicación aproximada'.",
        "Ajustes → Google → Todos los servicios → Anuncios → <b>Eliminar ID de publicidad</b>.",
        "Añade los botones rápidos de <b>Acceso a cámara</b> y <b>Acceso a micrófono</b> para cortarlos a nivel de sistema.",
        "Cambia el teclado: <b>FUTO Keyboard</b> o <b>HeliBoard</b> (offline). En Gboard, si lo mantienes, desactiva sincronización, personalización y mejora de modelos.",
        "Activa <b>Espacio privado</b> (Android 15+) o instala <b>Shelter</b> para aislar WhatsApp/TikTok/Instagram en un perfil separado.",
        "Instala apps de código abierto desde <b>F-Droid</b> u <b>Obtainium</b> (directo de GitHub).",
        "Activa <b>Bloquear conexiones sin VPN</b> y el <b>DNS privado</b> (Módulo 03).",
        "Nivel 3 (opcional): instala <b>GrapheneOS</b> en un Pixel compatible con el instalador web oficial (grapheneos.org/install/web)."
      ],
      pitfalls: ["Dar a apps de linterna/edición acceso a contactos o ubicación.", "Comprar un Pixel de segunda mano bloqueado por operadora: no permitirá desbloquear el bootloader para GrapheneOS."],
      prof: "Haz este ejercicio: revisa el panel de privacidad (Ajustes → Seguridad y privacidad → Panel de privacidad). Verás qué app usó el micrófono y cuándo. Ahí está tu lista de desinstalación.",
      tools: ["GrapheneOS", "Shelter", "F-Droid", "FUTO Keyboard", "HeliBoard", "Obtainium"]
    },
    {
      id: "m05l4", title: "iPhone y Mac: Advanced Data Protection, Lockdown Mode y Apple Intelligence", min: 30,
      objectives: ["Activar cifrado E2EE de iCloud", "Conocer el Modo de Aislamiento", "Ajustar seguimiento y analítica"],
      theory: `
        <p>Apple es fuerte en seguridad, pero por defecto <strong>iCloud no cifra de extremo a extremo</strong> fotos, notas y copias de seguridad. Lo arregla <strong>Protección de datos avanzada</strong> (ADP).</p>
        <div class="callout info"><span class="ci">ℹ️</span><div>En febrero de 2025 Apple retiró ADP para nuevos usuarios del Reino Unido tras una exigencia gubernamental. Comprueba su disponibilidad en tu país.</div></div>
        <p><strong>Lockdown Mode</strong> (Modo de aislamiento) desactiva funciones complejas que usa el spyware mercenario (tipo Pegasus). Pensado para perfiles de alto riesgo.</p>
      `,
      steps: [
        "Ajustes → [tu nombre] → iCloud → <b>Protección de datos avanzada</b> → activar (configura contacto o clave de recuperación).",
        "Ajustes → Privacidad y seguridad → <b>Rastreo</b>: desactiva 'Permitir solicitudes de rastreo'.",
        "Privacidad → <b>Análisis y mejoras</b>: desactiva todo. Publicidad de Apple: desactiva anuncios personalizados.",
        "Privacidad → Localización → Servicios del sistema: desactiva lo innecesario y <b>Ubicaciones importantes</b>.",
        "Activa <b>Protección de dispositivo robado</b> (Face ID obligatorio y retraso para cambios críticos fuera de lugares conocidos).",
        "Usa <b>Retransmisión privada de iCloud</b> y <b>Ocultar mi correo</b> si tienes iCloud+.",
        "Apple Intelligence: revisa Ajustes → Apple Intelligence y Siri; desactiva extensiones de terceros (ChatGPT) si no quieres que se envíen consultas fuera.",
        "Mac: FileVault activado, Firewall activado con modo sigiloso, LuLu instalado.",
        "Si eres perfil C: Privacidad → <b>Modo de aislamiento</b> → Activar."
      ],
      pitfalls: ["Activar ADP sin configurar recuperación: si pierdes el acceso, Apple no puede ayudarte."],
      prof: "ADP + Protección de dispositivo robado son los dos ajustes que más recomiendo a cualquier usuario de iPhone en 2026.",
      tools: ["FileVault", "LuLu"]
    },
    {
      id: "m05l5", title: "Linux, máquinas virtuales y sistemas amnésicos (Tails, Qubes, Whonix)", min: 25,
      objectives: ["Saber cuándo pasarse a Linux", "Usar VMs para compartimentar", "Conocer Tails, Qubes y Whonix"],
      theory: `
        <ul>
          <li><strong>Linux de escritorio</strong> (Fedora, Linux Mint, Debian): sin telemetría por defecto, gran opción para la capa 3/4 o como sistema principal.</li>
          <li><strong>Máquinas virtuales</strong> (VirtualBox, VMware Workstation, GNOME Boxes): compartimentan identidades en un mismo PC.</li>
          <li><strong>Tails</strong>: arranca desde USB, todo por Tor, no deja rastro al apagar.</li>
          <li><strong>Whonix</strong>: dos VMs (gateway Tor + estación) que impiden fugas de IP.</li>
          <li><strong>Qubes OS</strong>: "seguridad por aislamiento"; cada actividad en su propia VM. Exigente en hardware.</li>
        </ul>
      `,
      steps: [
        "Instala <b>VirtualBox</b> y crea una VM con Linux Mint o Fedora para tu capa Laboratorio IA.",
        "Opcional: prepara un USB con <b>Tails</b> (tails.net) y practica arrancarlo.",
        "Si usas Linux: activa cifrado de disco (LUKS) durante la instalación y el firewall (ufw/firewalld)."
      ],
      code: { title: "Básicos de endurecimiento en Linux (Debian/Ubuntu)", body: "sudo apt update && sudo apt full-upgrade -y\nsudo apt install ufw unattended-upgrades -y\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw enable\nsudo dpkg-reconfigure --priority=low unattended-upgrades" },
      pitfalls: ["Creer que una VM te hace anónimo: comparte red e IP con el anfitrión salvo que la enrutes por VPN/Tor."],
      prof: "No necesitas Qubes para estar seguro. Pero una VM para experimentar con IA y código te ahorrará disgustos.",
      tools: ["Tails", "Qubes OS", "VirtualBox"]
    }
  ],
  quiz: [
    { q: "¿Por qué cifrar el disco si ya tienes contraseña de usuario?", o: ["No hace falta", "Sin cifrado, quien saque el disco puede leer todo", "Para ir más rápido", "Para ahorrar espacio"], a: 1, e: "La contraseña de sesión no protege los datos en reposo." },
    { q: "¿Qué hace Advanced Data Protection en iCloud?", o: ["Acelera iCloud", "Cifra de extremo a extremo la mayoría de categorías de iCloud", "Bloquea anuncios", "Elimina iCloud"], a: 1, e: "Incluye fotos, notas y copias de seguridad." },
    { q: "¿Por qué cambiar Gboard por un teclado offline?", o: ["Por estética", "Porque el teclado ve todo lo que escribes antes de cifrarse", "Por idioma", "Por velocidad"], a: 1, e: "El teclado es un punto de captura previo al cifrado de cualquier app." },
    { q: "¿Qué herramienta controla conexiones salientes en Windows?", o: ["Portmaster", "Paint", "BitLocker", "Defender SmartScreen"], a: 0, e: "Portmaster es un cortafuegos de aplicación de código abierto." }
  ]
});

BASTION.modules.push({
  id: "m06", num: "06", icon: "📨", color: "vi", level: 3,
  title: "Identidad Invisible: Correo Cifrado, Alias, Mensajería y Nube",
  subtitle: "Proton/Tuta, SimpleLogin/Addy conectados a Bitwarden, números alternativos, Signal, SimpleX y nube cifrada",
  summary: "Dejas de entregar tu correo y teléfono reales. Cada servicio recibe un alias único, tus conversaciones sensibles pasan a apps sin metadatos y tus archivos se cifran antes de subir a cualquier nube.",
  outcomes: ["Correo cifrado como base", "Alias únicos por servicio en un clic", "Mensajería sin metadatos", "Nube cifrada"],
  lessons: [
    {
      id: "m06l1", title: "Correo cifrado: Proton Mail y Tuta a fondo", min: 30,
      objectives: ["Elegir proveedor", "Configurar privacidad del buzón", "Entender PGP y dominios propios"],
      theory: `
        <p>Gmail/Outlook procesan tus recibos, billetes, extractos y correos médicos. Un correo de <strong>acceso cero</strong> cifra el buzón con una clave que solo tú tienes.</p>
        <table>
          <tr><th></th><th>Proton Mail</th><th>Tuta</th></tr>
          <tr><td>Sede</td><td>Suiza</td><td>Alemania</td></tr>
          <tr><td>Cifrado</td><td>PGP (interoperable)</td><td>Propio, cifra también asuntos; criptografía post-cuántica</td></tr>
          <tr><td>Ecosistema</td><td>Drive, Pass, VPN, Calendar, SimpleLogin</td><td>Calendario y contactos</td></tr>
        </table>
        <div class="callout info"><span class="ci">ℹ️</span><div>Los correos que envías a un Gmail viajan cifrados en tránsito pero Gmail los lee al recibirlos. El cifrado de extremo a extremo completo solo existe entre usuarios del mismo sistema o con PGP / correos protegidos con contraseña.</div></div>
        <h3>Dominio propio</h3>
        <p>Con un dominio propio (p. ej. <code>tunombre.xyz</code>) no dependes del proveedor: si un día cambias, tus direcciones siguen siendo tuyas. Regístralo con datos protegidos (WHOIS privacy).</p>
      `,
      steps: [
        "Crea tu cuenta de <b>Bóveda</b> en Proton o Tuta con un usuario que no contenga tu nombre real.",
        "Proton → Ajustes → Correo → <b>Privacidad de mensajes</b>: bloquea rastreadores de correo, <b>confirmar enlaces</b>, no cargar imágenes remotas automáticamente.",
        "Activa 2FA (TOTP/llave) y descarga la <b>frase de recuperación</b> a tu hoja de emergencia.",
        "Activa la <b>Protección Sentinel</b> de Proton si tu modelo de amenazas es B o C.",
        "Migra poco a poco: usa <b>Easy Switch</b> (Proton) para importar y configura el reenvío desde Gmail durante la transición.",
        "Cambia en tus cuentas críticas (banco, gobierno) el correo antiguo por el nuevo de Bóveda."
      ],
      pitfalls: ["Usar tu correo de Bóveda para registrarte en tiendas o newsletters.", "Borrar la cuenta vieja de Gmail antes de migrar todo (pierdes recuperaciones)."],
      prof: "El correo de Bóveda es como el número de tu caja fuerte: casi nadie debe saberlo. Todo lo demás irá con alias.",
      tools: ["Proton Mail", "Tuta"]
    },
    {
      id: "m06l2", title: "Alias infinitos: SimpleLogin / Addy.io integrados en Bitwarden", min: 30,
      objectives: ["Crear alias por servicio", "Responder desde alias", "Generar alias desde el gestor en un clic"],
      theory: `
        <p>Un <strong>alias</strong> es una dirección puente (<code>netflix.k3x@alias.dominio</code>) que reenvía a tu buzón real. Si una web vende tus datos o se filtra, <strong>apagas ese alias</strong> y sabes exactamente quién te traicionó.</p>
        <ul>
          <li><strong>SimpleLogin</strong> (de Proton): incluido en planes de pago de Proton; gratis con límite.</li>
          <li><strong>Addy.io</strong>: alias ilimitados con subdominio propio en el plan gratis, código abierto, autoalojable.</li>
          <li><strong>Proton Pass</strong> / <strong>iCloud Ocultar mi correo</strong> / <strong>Firefox Relay</strong>: alternativas integradas.</li>
        </ul>
      `,
      steps: [
        "Crea cuenta en SimpleLogin (puedes entrar con Proton) o en addy.io. Añade tu buzón de Proton/Tuta como destino.",
        "Genera la clave API: SimpleLogin → <b>API Keys</b>; Addy → Settings → <b>API</b> → Generate New Token.",
        "En Bitwarden: Generador → <b>Nombre de usuario</b> → Tipo: <b>Alias de correo reenviado</b> → Servicio: SimpleLogin o Addy.io → pega la clave API.",
        "A partir de ahora, al registrarte en una web: Bitwarden genera alias + contraseña en un clic.",
        "Cambia el correo de tus 20 cuentas más importantes de Capa 2 por alias únicos.",
        "Aprende a <b>responder desde el alias</b> (SimpleLogin: contactos inversos) para que nunca salga tu dirección real."
      ],
      code: { title: "Convención de nombres de alias", body: "# Formato recomendado: servicio + sufijo aleatorio\namazon.q7f2@tudominio.alias\nnetflix.m9a1@tudominio.alias\nclinica-x.p4z8@tudominio.alias\n\n# NO uses alias que contengan tu nombre real\n# Un alias = un servicio. Nunca compartas un alias entre dos webs." },
      pitfalls: ["Usar el mismo alias para varias webs.", "Responder un correo desde tu buzón real en vez de hacerlo desde el alias."],
      prof: "Lo más divertido del curso: cuando te llegue spam a 'tienda-x.a8f3@', sabrás quién vendió tus datos. Apagas el alias y adiós.",
      tools: ["SimpleLogin", "Addy.io", "Bitwarden", "Proton Pass"]
    },
    {
      id: "m06l3", title: "Teléfono: números secundarios, eSIM y verificaciones", min: 25,
      objectives: ["Separar tu número real", "Conocer opciones de números alternativos", "Proteger cuentas creadas con números temporales"],
      theory: `
        <p>Casi todo servicio pide un número para "verificar". En la mayoría de países las SIM están registradas con documento, así que tu número = tu identidad.</p>
        <h3>Opciones legales por capa</h3>
        <ul>
          <li><strong>Capa 1</strong>: tu SIM principal, solo para banco y familia.</li>
          <li><strong>Capa 2</strong>: una segunda SIM/eSIM prepago o un número virtual de tu operadora para comercios y apps.</li>
          <li><strong>Capa 4</strong>: servicios de eSIM de datos sin registro (ej. Silent.link) o números de recepción de SMS (Crypton.sh), donde la ley local lo permita.</li>
        </ul>
        <div class="callout warn"><span class="ci">⚠️</span><div>Respeta las leyes de registro de SIM de tu país y los términos de cada servicio. Los números temporales de "un solo uso" son peligrosos para cuentas que quieres conservar: si el número se recicla, otro puede recuperar tu cuenta.</div></div>
      `,
      steps: [
        "Decide qué número da cada capa y anótalo en tu Arquitecto de compartimentos.",
        "Si consigues un número secundario, úsalo para todos los comercios, apps de delivery y redes.",
        "En cualquier cuenta creada con un número que no controlarás siempre: activa 2FA por app/passkey y <b>elimina el número</b> como método de recuperación inmediatamente.",
        "Revisa en tus cuentas actuales qué servicios tienen tu número principal y cámbialo por el secundario donde sea posible."
      ],
      pitfalls: ["Usar números temporales públicos (webs gratuitas de SMS): cualquiera ve los códigos."],
      prof: "La meta realista: que tu número principal lo conozcan menos de 10 entidades. Empieza contándolas hoy.",
      tools: ["Silent.link", "Crypton.sh"]
    },
    {
      id: "m06l4", title: "Mensajería: Signal, SimpleX, Session y endurecer WhatsApp/Telegram", min: 30,
      objectives: ["Comparar apps por metadatos", "Configurar Signal sin exponer el número", "Endurecer WhatsApp y Telegram"],
      theory: `
        <table>
          <tr><th>App</th><th>E2EE</th><th>Metadatos</th><th>Necesita teléfono</th></tr>
          <tr><td>WhatsApp</td><td>Sí</td><td>Meta recoge muchos (quién, cuándo, IP, contactos)</td><td>Sí</td></tr>
          <tr><td>Telegram</td><td>Solo chats secretos</td><td>Servidor ve la mayoría</td><td>Sí</td></tr>
          <tr><td><strong>Signal</strong></td><td>Sí (protocolo con capa post-cuántica PQXDH)</td><td>Mínimos (sealed sender)</td><td>Sí, pero se oculta con username</td></tr>
          <tr><td><strong>SimpleX</strong></td><td>Sí</td><td>Sin IDs de usuario</td><td>No</td></tr>
          <tr><td>Session</td><td>Sí</td><td>Red onion</td><td>No</td></tr>
        </table>
      `,
      steps: [
        "Signal: Ajustes → Privacidad → Número de teléfono → <b>Quién puede ver mi número: Nadie</b> y <b>Quién puede encontrarme: Nadie</b>. Crea un <b>nombre de usuario</b>.",
        "Signal: activa <b>Bloqueo de registro</b> (PIN) y mensajes temporales por defecto (p. ej. 4 semanas).",
        "SimpleX: instala desde simplex.chat, crea perfil sin datos, comparte tu enlace/QR solo con quien quieras. Activa base de datos cifrada con contraseña.",
        "WhatsApp: Privacidad → Avanzado → <b>Proteger IP en llamadas</b> + <b>Desactivar vistas previas de enlaces</b>; Chats → Copia de seguridad → <b>cifrada de extremo a extremo</b>; Cuenta → Verificación en dos pasos.",
        "WhatsApp: Privacidad → foto, info y última vez: <b>Mis contactos</b>; Grupos: <b>Mis contactos</b>; Silenciar llamadas de desconocidos.",
        "Telegram: Privacidad → Número de teléfono: <b>Nadie</b>; Llamadas: P2P <b>Nadie</b>; contraseña de verificación en dos pasos; usa Chats secretos para lo sensible.",
        "Convence a 3 personas cercanas de pasarse a Signal (es el paso más difícil y el más valioso)."
      ],
      pitfalls: ["Hacer capturas de pantalla de chats cifrados y guardarlas en la galería sincronizada.", "Copias de seguridad sin cifrar en Google Drive/iCloud."],
      prof: "No hace falta abandonar WhatsApp. Usa WhatsApp para lo trivial y Signal/SimpleX para todo lo que no querrías ver publicado.",
      tools: ["Signal", "SimpleX Chat", "Session"]
    },
    {
      id: "m06l5", title: "Nube y fotos cifradas: Proton Drive, Ente Photos y Cryptomator", min: 20,
      objectives: ["Sacar tus fotos de Google Fotos", "Cifrar archivos antes de subirlos", "Diseñar copias de seguridad"],
      theory: `
        <p>Google Fotos analiza caras, lugares y objetos de toda tu vida. Alternativas E2EE:</p>
        <ul>
          <li><strong>Ente Photos</strong>: fotos cifradas con IA de búsqueda <em>en el dispositivo</em>.</li>
          <li><strong>Proton Drive</strong>: archivos y fotos E2EE.</li>
          <li><strong>Cryptomator</strong>: cifra una carpeta antes de que llegue a cualquier nube (Google Drive, OneDrive, Dropbox).</li>
        </ul>
      `,
      steps: [
        "Exporta tus fotos con <b>Google Takeout</b> e impórtalas en Ente Photos o Proton Drive.",
        "Instala <b>Cryptomator</b> y crea una bóveda dentro de la carpeta de tu nube actual para documentos sensibles (DNI, contratos, extractos).",
        "Aplica la regla <b>3-2-1</b>: 3 copias, 2 soportes distintos, 1 fuera de casa.",
        "Desactiva la copia automática de capturas de pantalla y de la carpeta de WhatsApp en tu nube."
      ],
      pitfalls: ["Subir la foto del DNI a Google Drive 'por si acaso' sin cifrar."],
      prof: "Una carpeta de Cryptomator llamada 'Papeles' dentro de tu nube de siempre resuelve el 90% del problema en 10 minutos.",
      tools: ["Proton Drive", "Ente Photos", "Cryptomator"]
    }
  ],
  quiz: [
    { q: "¿Para qué sirve un alias de correo?", o: ["Para enviar spam", "Para no revelar tu correo real y poder cortar el acceso por servicio", "Para cifrar el disco", "Para recibir SMS"], a: 1, e: "Un alias por web: si se filtra o vende, lo apagas." },
    { q: "¿Qué mensajería no requiere número ni ID de usuario?", o: ["WhatsApp", "Telegram", "SimpleX Chat", "SMS"], a: 2, e: "SimpleX funciona con enlaces/QR por contacto, sin identificadores fijos." },
    { q: "¿Qué hace Cryptomator?", o: ["Mina cripto", "Cifra archivos antes de subirlos a cualquier nube", "Es un VPN", "Es un antivirus"], a: 1, e: "La nube solo ve archivos cifrados ilegibles." }
  ]
});

BASTION.modules.push({
  id: "m07", num: "07", icon: "🛡️", color: "ro", level: 3,
  title: "Antifraude 2026: Phishing con IA, Deepfakes, Malware y Respuesta a Incidentes",
  subtitle: "Santo y seña familiar, quishing, ClickFix, infostealers, falso soporte, VirusTotal y qué hacer si te hackean",
  summary: "Los estafadores ya usan IA para escribir, hablar y verse como tu banco o tu familia. Aprendes a reconocer las estafas actuales, a montar protocolos familiares y a reaccionar en minutos si algo sale mal.",
  outcomes: ["Reconocer las estafas más comunes de 2026", "Implantar el protocolo Santo y Seña", "Analizar enlaces y archivos", "Tener un plan de respuesta a incidentes"],
  lessons: [
    {
      id: "m07l1", title: "Anatomía de las estafas actuales (y cómo detectarlas)", min: 30,
      objectives: ["Conocer los 8 fraudes más comunes", "Aplicar la regla de verificación por canal independiente"],
      theory: `
        <table>
          <tr><th>Estafa</th><th>Cómo funciona</th><th>Defensa</th></tr>
          <tr><td>Phishing/smishing con IA</td><td>SMS o correo perfecto "de tu banco" con enlace</td><td>Nunca entrar desde enlaces; usar tus marcadores</td></tr>
          <tr><td>Vishing con voz clonada</td><td>"Mamá, tuve un accidente, envía dinero"</td><td>Santo y seña + colgar y devolver la llamada</td></tr>
          <tr><td>Falso empleado del banco</td><td>Te llaman con número suplantado (spoofing) y piden códigos</td><td>El banco nunca pide códigos ni que muevas dinero a una 'cuenta segura'</td></tr>
          <tr><td>Quishing</td><td>QR falsos en parquímetros, cartas o correos</td><td>Revisar la URL antes de abrir; no pagar por QR pegados</td></tr>
          <tr><td>ClickFix / falso CAPTCHA</td><td>Web te pide pulsar Win+R y pegar un "comando de verificación"</td><td>Ninguna web legítima pide ejecutar comandos</td></tr>
          <tr><td>Falso soporte técnico</td><td>Pop-up "tu PC está infectado, llama a…" o te piden instalar AnyDesk</td><td>Nunca dar acceso remoto a quien te contacta</td></tr>
          <tr><td>Inversiones con deepfakes</td><td>Famosos "recomiendan" una plataforma cripto</td><td>Si promete rentabilidad garantizada, es estafa</td></tr>
          <tr><td>Fraude del CEO / proveedor</td><td>Videollamada falsa del jefe pide transferencia urgente</td><td>Doble verificación por otro canal + doble firma</td></tr>
        </table>
        <div class="callout prof"><span class="ci">🎓</span><div><strong>Regla de oro: URGENCIA + DINERO/CÓDIGOS + CANAL QUE NO INICIASTE = ESTAFA</strong> hasta que se demuestre lo contrario. Cuelga y verifica por un canal que tú elijas.</div></div>
      `,
      steps: [
        "Guarda en tus marcadores del perfil Bóveda las webs oficiales de tus bancos. Prométete no entrar nunca desde un enlace.",
        "Guarda en la agenda los teléfonos oficiales de tu banco (del reverso de la tarjeta) con el nombre '🏦 OFICIAL'.",
        "Explica a tu familia la regla de oro y la estafa del 'hijo en apuros'.",
        "Practica con <b>Laboratorios → Detector de URLs sospechosas</b>."
      ],
      pitfalls: ["Fiarte del identificador de llamadas: el número se puede falsificar.", "Pensar que tú no caerías: los ataques con IA están diseñados para gente inteligente con prisa."],
      prof: "Mi frase para mis alumnos: 'Los bancos no tienen prisa. Los estafadores sí.'",
      tools: ["VirusTotal", "URLScan"]
    },
    {
      id: "m07l2", title: "Protocolo Santo y Seña: tu defensa familiar contra clonación de voz", min: 20,
      objectives: ["Crear palabras de verificación y coacción", "Entrenar a tu familia", "Reducir tu voz expuesta"],
      theory: `
        <p>Con unos segundos de audio (una nota de voz, un vídeo, tu buzón de voz) se puede clonar una voz convincente. El protocolo militar de <strong>doble clave</strong>:</p>
        <ol>
          <li><strong>Pregunta-reto</strong>: suena normal, pero la respuesta pactada no es la obvia.</li>
          <li><strong>Santo y seña</strong>: palabra que confirma "soy yo y estoy bien".</li>
          <li><strong>Clave de coacción</strong>: palabra que significa "soy yo pero me obligan; avisa a la policía sin que se note".</li>
        </ol>
      `,
      steps: [
        "Genera tu protocolo en <b>Laboratorios → Santo y Seña</b>.",
        "Compártelo <b>en persona</b> con tu núcleo familiar (nunca por chat ni correo).",
        "Haced un simulacro: alguien llama fingiendo una urgencia y el otro debe pedir la verificación.",
        "Cambia el saludo de tu buzón de voz por uno genérico del sistema (sin tu voz).",
        "Ante llamadas de números desconocidos, deja que hablen primero; evita decir 'sí' a preguntas genéricas."
      ],
      pitfalls: ["Usar como clave el nombre de la mascota o algo visible en redes."],
      prof: "Es el ejercicio con más impacto por minuto invertido de todo el programa. Hazlo esta semana.",
      tools: []
    },
    {
      id: "m07l3", title: "Malware moderno: infostealers, extensiones, apps falsas y análisis con VirusTotal", min: 30,
      objectives: ["Entender los infostealers", "Analizar archivos y enlaces sin abrirlos", "Instalar software solo de fuentes seguras"],
      theory: `
        <p>Los <strong>infostealers</strong> (Lumma, RedLine, Vidar…) roban en segundos contraseñas guardadas en el navegador, <strong>cookies de sesión</strong> (que saltan el 2FA), billeteras cripto y archivos. Llegan por cracks, "mods" de juegos, falsos instaladores de IA, anuncios en buscadores y ClickFix.</p>
        <p>En 2025 incluso se distribuyeron como falsas apps de IA y en repositorios de código. Las cookies robadas se venden en mercados y permiten entrar a tus cuentas sin contraseña.</p>
      `,
      steps: [
        "Descarga software solo de webs oficiales (escribiendo la URL, no desde anuncios), tiendas oficiales, F-Droid o winget.",
        "Antes de abrir un archivo sospechoso: súbelo a <b>virustotal.com</b>. Para enlaces: <b>urlscan.io</b> (te muestra una captura sin visitarla).",
        "Nunca instales cracks, activadores ni 'versiones premium gratis'.",
        "Usa Microsoft Defender (activo y actualizado), activa <b>Protección contra alteraciones</b> y <b>Aislamiento del núcleo / integridad de memoria</b>.",
        "Cierra sesión de vez en cuando en tus cuentas importantes para invalidar cookies antiguas.",
        "Instala software con <b>winget</b> desde la terminal para evitar instaladores falsos."
      ],
      code: { title: "Instalar software de forma segura con winget (Windows)", body: "winget search bitwarden\nwinget install Bitwarden.Bitwarden\nwinget install Brave.Brave\nwinget install KeePassXCTeam.KeePassXC\nwinget install Safing.Portmaster\nwinget upgrade --all        # actualiza todo lo instalado" },
      pitfalls: ["Ejecutar en PowerShell un comando que una web o un 'técnico' te pidió pegar."],
      prof: "Si alguna vez tienes dudas sobre un archivo: no lo abras. La curiosidad es el mejor vector de infección.",
      tools: ["VirusTotal", "URLScan"]
    },
    {
      id: "m07l4", title: "Respuesta a incidentes: qué hacer en los primeros 60 minutos", min: 25,
      objectives: ["Tener un plan escrito", "Saber contener, recuperar y denunciar"],
      theory: `
        <p>Cuando ocurre, el pánico hace perder tiempo. Un plan escrito te permite actuar en orden.</p>
      `,
      steps: [
        "<b>Contener</b>: desconecta el dispositivo afectado de internet si sospechas malware.",
        "Desde un dispositivo <b>limpio</b>: cambia la contraseña del correo principal y del gestor; cierra todas las sesiones activas.",
        "Llama al banco por el número oficial y <b>bloquea tarjetas</b>; pide revisar transferencias recientes.",
        "Revisa reglas de reenvío del correo, apps conectadas y dispositivos de confianza (los atacantes dejan puertas traseras).",
        "Si fue SIM swap: llama a tu operadora desde otro teléfono para recuperar la línea.",
        "Si hubo malware: respalda solo documentos (no ejecutables) y <b>reinstala el sistema</b>.",
        "Denuncia: en Colombia, el CAI Virtual de la Policía (caivirtual.policia.gov.co); en España, INCIBE (017) y Policía/Guardia Civil; guarda capturas y números.",
        "Avisa a tus contactos si suplantaron tu cuenta."
      ],
      code: { title: "Plan de incidentes (imprímelo)", body: "PLAN DE INCIDENTES — Guárdalo en papel\n\n1. Desconectar dispositivo sospechoso\n2. Desde otro dispositivo: cambiar contraseña de CORREO → GESTOR\n3. 'Cerrar sesión en todos los dispositivos' en correo, Google, Apple, Microsoft, redes\n4. Banco: ______________ (tel. oficial) → bloquear tarjetas\n5. Operadora: __________ (tel.) → si no hay señal\n6. Revisar reenvíos de correo / apps conectadas / passkeys nuevas\n7. Denunciar: ______________ \n8. Avisar a familia/contactos\n9. Reinstalar sistema si hubo malware" },
      pitfalls: ["Cambiar contraseñas desde el mismo PC infectado (el infostealer captura las nuevas)."],
      prof: "Imprime el plan y pégalo dentro de un armario. El día que lo necesites, me lo agradecerás.",
      tools: []
    }
  ],
  quiz: [
    { q: "Te llaman 'del banco' con su número real y te piden un código para 'anular una compra'. ¿Qué haces?", o: ["Dar el código", "Colgar y llamar tú al número oficial", "Pedirles que lo envíen por correo", "Darlo si saben tu nombre"], a: 1, e: "El número puede estar suplantado y el banco nunca pide códigos." },
    { q: "Una web te pide pulsar Win+R y pegar un texto para 'verificar que eres humano'. Es…", o: ["Un CAPTCHA moderno", "Un ataque ClickFix", "Una actualización", "Un test de velocidad"], a: 1, e: "Ninguna web legítima pide ejecutar comandos en tu sistema." },
    { q: "¿Qué roban los infostealers que permite saltarse el 2FA?", o: ["Las fuentes", "Las cookies de sesión", "El fondo de pantalla", "El historial de impresión"], a: 1, e: "Con la cookie de sesión el atacante ya está 'dentro'." },
    { q: "La clave de coacción sirve para…", o: ["Abrir el banco", "Indicar que hablas bajo amenaza sin que el atacante lo note", "Cambiar la contraseña", "Bloquear la SIM"], a: 1, e: "Es la segunda palabra del protocolo Santo y Seña." }
  ]
});
