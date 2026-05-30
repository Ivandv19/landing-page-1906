# Fluxbeats (Landing Page 1906)

## Descripción

Esta es la página pública diseñada para exhibir y vender instrumentales musicales (Beats). Funciona como un portafolio profesional y un punto de contacto directo, proporcionando a los clientes una forma rápida de escuchar de música y comunicarse para adquirir las licencias.

## Características

- **Diseño Inmersivo**: Interfaz moderna y atractiva estructurada para presentar pistas musicales de forma profesional.
- **Reproductor de Audio**: Lista de instrumentales integrada con un funcionamiento sencillo e interactivo (Play/Pause) directo en la página.
- **Contacto Directo**: Formulario web integrado y protegido contra spam para que los clientes soliciten compras o comisiones.
- **Soporte Multilingüe**: Permite cambiar el idioma y la información visual de la plataforma entre español e inglés.

## Secciones

1. **Inicio**: Presentación e introducción principal que invita a descubrir el catálogo.
2. **Catálogo de Beats**: Sección central que lista las pistas musicales y permite reproducirlas libremente.
3. **Licencias y Precios**: Resumen claro que explica los diferentes formatos y tipos de uso disponibles.
4. **Contacto**: Formulario de comunicación directa para solicitar archivos de audio o negociaciones.

## Uso

- **Visualizar Contenido**: El proyecto ya se encuentra en funcionamiento. Puedes explorarlo aquí: [Fluxbeats Landing Page](https://fluxbeats.mgdc.site/).
- **Escuchar Pistas**: Desliza hasta el apartado del catálogo de instrumentales y haz clic en reproducir.
- **Enviar Mensaje**: Rellena el formulario con tus datos en la parte de abajo; el sistema se encarga de enviarlo directamente.

## Tecnologías Utilizadas

- HTML / CSS / TypeScript
- React 19
- Vite 7
- Tailwind CSS 4
- Hono (API)
- Cloudflare Pages (hosting)
- Bun

## Instalación

1. **Clonar el Repositorio**: Descarga el código de este proyecto en tu máquina usando Git.

```bash
git clone https://github.com/Ivandv19/fluxbeats.git
```

2. **Instalar Dependencias**: Abre una terminal en la raíz del proyecto y ejecuta:

```bash
bun install
```

3. **Variables de Entorno**: Crea un archivo `.env` o `.dev.vars` en la carpeta base. Necesitarás agregar tus claves secretas de Resend (para enviar los correos), Turnstile (para evitar el spam del formulario) y el email de destino.

4. **Iniciar el Proyecto**: Ejecuta el servidor localmente con el siguiente comando:

```bash
bun run dev
```

## Créditos

Este es un proyecto dedicado a la exhibición y venta dentro del comercio de la producción musical.

- Desarrollado por Ivan Cruz.

## Despliegue

La plataforma está gestionada completamente de forma remota a través de servicios como Cloudflare Pages. En esta ubicación se aloja tanto la información visual como la función ligera que manda el propio correo de contacto. 

Puedes visitarlo permanentemente desde aquí: [landing-page.mgdc.site](https://fluxbeats.mgdc.site/).

## Licencia

Licencia de Uso Personal:

Este software es propiedad de **Ivan Cruz**. Se permite el uso de este software solo para fines personales y no comerciales. No se permite la distribución, modificación ni uso comercial de este software sin el consentimiento expreso de **Ivan Cruz**.

Cualquier uso no autorizado puede resultar en acciones legales.
