# Interbanking Challenge

## Introducción

Presento la entrega del **challenge** realizado por Miguel Ángel Molero. Este sistema está construido utilizando **TypeScript**, **ESLint**, **React**, **SCSS**, entre otras tecnologías.

## Observaciones

1. **Uso de Redux**: 
   - Aunque la descripción del challenge menciona **Redux** como parte de la evaluación, considero que su inclusión en esta aplicación es desproporcionada. Implementar Redux en este contexto es como romper la pared de tu cuarto con un tanque de guerra; no es necesario y puede complicar el proyecto innecesariamente.

2. **Dependencia de Cheerio**: 
   - Es posible que se presenten errores o vulnerabilidades debido a la biblioteca **cheerio**. Esta biblioteca es útil para mejorar el rendimiento del HTML y es necesaria para que las pruebas unitarias reconozcan **ECMAScript 6**. En caso de que experimentes algún problema relacionado con esta biblioteca, te recomiendo desinstalarla y volver a instalarla con los siguientes comandos:

     ```bash
     npm uninstall cheerio
     npm install --save-dev cheerio@1.0.0-rc.3
     ```

3. **Instalación de Dependencias**: 
   - No olvides ejecutar `npm install` para asegurarte de que todas las dependencias estén correctamente instaladas.
