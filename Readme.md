# Interbanking Challenge

## Introducción

Presento la entrega del **challenge** realizado por Miguelangel Molero. Este sistema está construido utilizando **TypeScript**, **ESLint**, **React**, **SCSS**, entre otras tecnologías.

Este proyecto ha sido desarrollado desde cero, sin utilizar herramientas automatizadas como `npx create-react-app`. El enfoque fue optimizar la reactividad y reducir los tiempos de respuesta de la aplicación, priorizando la eficiencia en su rendimiento.

## Observaciones

1. **Uso de Redux**: 
   - Se ha implementado **Redux** únicamente en el componente `<Form />` para gestionar el almacenamiento de los elementos en la matriz de la tarjeta (CARD). Esta decisión se tomó considerando que la escala del proyecto no justifica una integración completa de Redux. Sin embargo, su inclusión en este componente específico proporciona un ejemplo claro de cómo se puede integrar Redux dentro del ecosistema Flux, cubriendo los principios clave sin agregar complejidad innecesaria a la aplicación.

   Este enfoque permite evaluar adecuadamente la funcionalidad de Redux en un entorno controlado y facilita la comprensión de su integración en proyectos de mayor escala.

2. **Dependencia de Cheerio**: 
   - Es posible que se presenten errores o vulnerabilidades debido a la biblioteca **cheerio**. Esta biblioteca es útil para mejorar el rendimiento del HTML y es necesaria para que las pruebas unitarias reconozcan **ECMAScript 6**. En caso de que experimentes algún problema relacionado con esta biblioteca, te recomiendo desinstalarla y volver a instalarla con los siguientes comandos:

     ```bash
     npm uninstall cheerio
     npm install --save-dev cheerio@1.0.0-rc.3
     ```

     Cabe destacar que si se ejecuta **npm audit fix --force** para reparar las dependencias de node se realizara exitosamente y
     se eliminara todas las vulnerabilidades pero los test unitario comenzaran a fallar porque no detectara **ECMAScript 6** por esa
     razón sugiero que desistale e instale esta dependencia. 

3. **Instalación de Dependencias**: 
   - No olvides ejecutar `npm install` para asegurarte de que todas las dependencias estén correctamente instaladas.
