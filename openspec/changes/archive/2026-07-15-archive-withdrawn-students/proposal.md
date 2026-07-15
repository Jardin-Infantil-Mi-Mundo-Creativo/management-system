## Why

La aplicación solo distingue matrículas incompletas y estudiantes activos, por lo que retirar a un estudiante obliga a borrar información o deja su situación académica sin representar. Se necesita conservar el expediente completo y registrar cuándo terminó la vinculación, manteniendo separados los estudiantes activos, retirados y los formularios aún incompletos.

## What Changes

- Añadir una fecha de retiro nullable dentro de `enrollment`; una matrícula sin fecha permanece activa y una matrícula con fecha queda archivada como retirada.
- Hacer que el backend derive `state: "retired"` para matrículas completas que tengan fecha de retiro, conservando `draft` para expedientes incompletos y `completed` para estudiantes activos.
- Añadir una operación de backend para retirar una matrícula completa sin eliminar el documento ni sus archivos asociados, almacenando la fecha validada por el frontend en formato `DD/MM/AAAA`.
- Añadir la sección **Estudiantes retirados** en la página principal y clasificar allí los registros con estado `retired`.
- Añadir la acción **Retirar** únicamente a estudiantes matriculados activos. La acción abre un diálogo de confirmación con una fecha editable, inicializada con la fecha local actual, y las opciones **Retirar** y **Cancelar**.
- Validar en el frontend al confirmar el retiro que la fecha sea válida, no sea anterior a `enrollment.date` ni posterior a la fecha actual, mostrando errores con el mismo patrón del formulario de matrícula y sin enviar la solicitud cuando falle.
- Mantener **Eliminar** y **Ver** en las tres listas. Los borradores y estudiantes retirados no mostrarán **Retirar**.
- Configurar Vitest, React Testing Library y `user-event` en el frontend para cubrir componentes y comportamientos encapsulados, y ampliar Cypress para cubrir solo el flujo integrado de retiro y reclasificación sin duplicar las pruebas unitarias.

## Capabilities

### New Capabilities

- `student-withdrawal`: Registro no destructivo del retiro de estudiantes, derivación del estado `retired`, confirmación con fecha y presentación separada de estudiantes retirados.

### Modified Capabilities

<!-- No existen capacidades OpenSpec previas que modificar. -->

## Impact

- Backend NestJS: entidad y tipos de matrícula, controlador, servicio Firestore y pruebas unitarias del módulo de matrículas.
- Contrato HTTP: nueva operación de retiro y ampliación del campo `state` con el valor `retired`; los consumidores deberán aceptar el nuevo estado.
- Datos Firestore: nuevo campo nullable `enrollment.withdrawalDate`; los documentos históricos sin el campo se tratarán como activos mediante compatibilidad de lectura.
- Frontend Next.js/React: tipos, consulta/mutación, tabla principal, diálogo de retiro, selector de fecha y textos visibles.
- Tooling del frontend: nuevas dependencias y configuración para Vitest, jsdom y React Testing Library; ampliación del spec y fixtures Cypress existentes.
