# Sistema de Matriculación Académica

Aplicación web desarrollada en React que permite a un estudiante consultar y seleccionar cursos disponibles para su semestre académico, validando cupos, créditos permitidos y estado de matrícula.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- HTML5
- CSS3
- JSON
- LocalStorage
- Git / GitHub

## Funcionalidades

La aplicación permite:

- Consultar la información del estudiante.
- Mostrar los cursos disponibles.
- Filtrar los cursos correspondientes al semestre actual.
- Mostrar créditos de cada curso.
- Mostrar los cupos disponibles.
- Seleccionar múltiples cursos.
- Evitar seleccionar cursos sin cupos.
- Validar que el estudiante esté matriculado en el periodo académico.
- Validar el límite máximo de créditos.
- Visualizar un resumen de la matrícula.
- Confirmar la matrícula.
- Guardar la matrícula en `localStorage`.
- Recuperar la matrícula después de recargar la página.
- Modificar una matrícula confirmada.
- Cancelar una matrícula.
- Mostrar mensajes de validación y confirmación.

## Estructura del proyecto

```text
matriculacion-academica/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── CourseCard.jsx
│   │   └── EnrollmentSummary.jsx
│   │
│   ├── data/
│   │   ├── cursos.json
│   │   └── estudiante.json
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

> Nota: los cursos proporcionados en el dataset de prueba suman un máximo de 14 créditos disponibles para el semestre 2, aunque el estudiante tiene permitido matricular hasta 20 créditos.
