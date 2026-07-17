## Why

La matrícula exige actualmente completar tanto la información de la madre como la del padre, aunque uno de ellos puede no estar presente en la vida del estudiante. El formulario debe permitir omitir explícitamente una de las dos secciones sin rebajar la regla mínima de que exista información completa de al menos un progenitor.

## What Changes

- Añadir a las secciones **Información de la madre** e **Información del padre** un checkbox desmarcado por defecto para omitir explícitamente esa sección.
- Al marcar el checkbox, restablecer todos los valores del progenitor a sus valores por defecto, limpiar sus errores y deshabilitar visual y funcionalmente sus controles; al desmarcarlo, volver a habilitarlos y exigir su validación normal.
- Impedir que se omitan ambos progenitores y mostrar un error accesible cuando no quede al menos uno registrado.
- Hacer condicionales el esquema y el submit del frontend para aceptar madre y padre, o exactamente uno de ellos; adaptar los tipos y la persistencia backend al contrato nullable confiando en la validación realizada por el frontend administrado.
- Mantener la compatibilidad de lectura con matrículas históricas que contienen ambos progenitores y reflejar correctamente la ausencia de uno en las vistas de detalle.
- Ajustar la sección de personas autorizadas: si no se registraron personas adicionales, mostrar que ambos padres pueden recoger al estudiante o que solo la madre/el padre puede hacerlo según los progenitores presentes.
- Auditar y completar la configuración existente de Vitest, React Testing Library y `user-event`, añadir pruebas unitarias del comportamiento encapsulado y ampliar Cypress solo para los flujos integrados frontend–API que no estén cubiertos en unitarias.

## Capabilities

### New Capabilities

- `optional-parent-information`: Omisión explícita de la información de un progenitor durante la matrícula, con al menos un progenitor obligatorio, validación condicional, persistencia y presentación coherentes.

### Modified Capabilities

<!-- No existen capacidades OpenSpec activas cuyos requisitos deban modificarse. -->

## Impact

- Frontend Next.js/React: formulario de matrícula, estado React Hook Form, esquema Zod, tipos inferidos, componentes de campos/controles, mutación y vistas de detalle/personas autorizadas, manteniendo todos los textos nuevos en español.
- Backend NestJS: contrato `Enrollment`, normalización nullable del estrato y persistencia/lectura en Firestore, sin duplicar la validación de negocio del frontend.
- Contrato HTTP y datos: representación explícita y consistente del progenitor omitido; los consumidores deberán aceptar que `mother` o `father` no exista, pero nunca ambos.
- Pruebas: configuración y utilidades Vitest/RTL existentes, pruebas frontend para validación/presentación, pruebas backend solo para transformaciones propias, y un spec E2E de matrícula en Cypress sin cobertura duplicada.
