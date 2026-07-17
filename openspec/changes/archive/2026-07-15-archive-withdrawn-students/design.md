## Context

La colección Firestore `enrollments` conserva tanto formularios incompletos como matrículas completas. El backend deriva hoy `state` a partir de la presencia de `studentPhoto` y `documentsFile`, y el frontend filtra ese valor para construir dos tablas en la página principal. La eliminación actual usa `DELETE /enrollments/:id` y está disponible en ambos estados.

El retiro debe ser una transición no destructiva que atraviesa el modelo, el contrato HTTP y la clasificación de la interfaz. El proyecto ya dispone de Radix/shadcn `Dialog`, un `DatePicker` basado en `react-day-picker`, React Query y Cypress E2E. El frontend todavía no dispone de un runner unitario; se añadirá Vitest con jsdom y React Testing Library. Las fechas del dominio se conservan como cadenas `DD/MM/AAAA`, siguiendo el formulario de matrícula y evitando conversiones UTC innecesarias.

## Goals / Non-Goals

**Goals:**

- Conservar íntegramente el expediente y los archivos al retirar un estudiante.
- Modelar la fecha de retiro dentro de `enrollment` y derivar de forma determinista los estados `draft`, `completed` y `retired`.
- Exponer una transición de retiro explícita cuyo input y disponibilidad controle el frontend administrado.
- Mostrar tres grupos mutuamente excluyentes, conservar **Ver/Eliminar** en todos y permitir **Retirar** solo para estudiantes activos.
- Reutilizar el patrón visual y de calendario existente, con un diálogo accesible y una fecha inicial real en el estado del formulario.
- Separar la cobertura: Jest para reglas del servicio/controlador backend, Vitest/RTL para UI encapsulada y Cypress para el recorrido integrado de retirar y reclasificar.

**Non-Goals:**

- Cambiar la semántica o el flujo existente de **Eliminar**, que seguirá disponible en las tres listas.
- Permitir el retiro de borradores.
- Restaurar o reactivar estudiantes retirados, ni modificar posteriormente su fecha de retiro.
- Migrar masivamente documentos históricos en Firestore.
- Reemplazar Cypress, el selector de fecha existente o el sistema actual de traducciones.

## Decisions

### 1. Campo nullable y precedencia de estados

Se añadirá `enrollment.withdrawalDate: string | null`. Las nuevas matrículas se guardarán con `null`; en lectura, un campo ausente se normalizará como `null` para mantener compatibilidad con documentos históricos.

El backend derivará el estado en este orden:

1. Si falta la foto o el documento requerido: `draft`.
2. Si ambos archivos existen y `withdrawalDate` no es nulo: `retired`.
3. En otro caso: `completed`.

Dar precedencia a `draft` impide que datos incompletos aparezcan como retirados incluso si un documento inconsistente contiene una fecha. La alternativa de persistir también `state` se descarta porque duplicaría información derivable y permitiría divergencias entre el estado y la fecha.

### 2. Endpoint de transición específico

Se añadirá `PATCH /enrollments/:id/withdrawal` con cuerpo JSON `{ "withdrawalDate": "DD/MM/AAAA" }`. Dado que esta aplicación solo recibe solicitudes del frontend administrado, el servicio asumirá un input válido y actualizará únicamente la ruta anidada `enrollment.withdrawalDate` mediante una actualización parcial de Firestore. La respuesta contendrá el expediente actualizado con `state: "retired"`.

Un endpoint específico expresa la intención y evita mezclar esta transición con el `PUT /enrollments/:id`, actualmente dedicado a completar archivos. Reutilizar `DELETE` se descarta porque comunica semántica destructiva. El frontend solo muestra **Retirar** para matrículas completas activas y valida el dato antes de solicitar la transición.

### 3. Política de acciones por estado

La página creará tres conjuntos y tres instancias de tabla a partir de un único mapa de filas:

- `draft`: **Ver**, **Eliminar**.
- `completed`: **Ver**, **Retirar**, **Eliminar**.
- `retired`: **Ver**, **Eliminar**.

Las columnas de acciones recibirán o derivarán el estado del registro para renderizar controles explícitos. **Eliminar** conserva el flujo destructivo actual en las tres listas, mientras que **Retirar** solo aparece para `completed`, haciendo imposible iniciar el retiro desde borradores o retirados. La alternativa de reutilizar exactamente la misma lista de acciones para todos los estados se descarta porque el retiro depende del ciclo de vida.

### 4. Diálogo controlado y fecha de retiro

Un componente dedicado de retiro reutilizará `Dialog`, `DatePicker`, React Hook Form y un esquema Zod, siguiendo el patrón del formulario de matrícula. Al abrirse, su estado/formulario se inicializará con la fecha local actual ya formateada como `DD/MM/AAAA`; no se dependerá solo del estado visual interno de `DatePicker`, porque eso podría enviar un valor vacío si la persona no toca el calendario. El selector seguirá siendo editable y estará asociado a una etiqueta accesible.

Al pulsar **Retirar**, el esquema validará antes de ejecutar la mutación que la fecha sea calendáricamente válida, igual o posterior a `enrollment.date` e igual o anterior a la fecha local actual. Una fecha anterior a la matrícula mostrará **La fecha de retiro no puede ser anterior a la fecha de matrícula.**; una fecha futura mostrará **La fecha de retiro no puede ser posterior a la fecha actual.** El mensaje se presentará junto al campo con el mismo componente/estilo de error del formulario de matrícula y la solicitud no se enviará.

**Cancelar** cerrará y reiniciará el diálogo sin mutación; el botón de confirmación se llamará **Retirar**, enviará la fecha cuando el formulario sea válido, quedará deshabilitado durante la solicitud y mostrará retroalimentación de éxito o error siguiendo el patrón existente.

Tras éxito, la mutación invalidará `['enrollments']`. La nueva respuesta de consulta moverá el registro desde la tabla de activos hacia **Estudiantes retirados** sin recargar toda la ventana. Los selectores de pruebas unitarias priorizarán roles, nombres y etiquetas; Cypress reutilizará Testing Library y los `data-testid` estables de cada sección solo para delimitar tablas.

### 5. Estrategia de pruebas sin duplicación

- Jest backend cubrirá exclusivamente reglas de dominio e integración servicio/controlador: precedencia de estados, actualización parcial y preservación de datos.
- Vitest/RTL configurará jsdom, `jest-dom`, cleanup, `userEvent` y utilidades de providers frescos. Cubrirá el diálogo aislado: fecha predeterminada, fecha anterior a la matrícula, fecha futura, fecha válida, cancelación, bloqueo durante envío y error visible; también la política encapsulada de acciones si se extrae a un componente/helper.
- Cypress ampliará `front/cypress/e2e/enrolled-students.cy.ts` y sus fixtures para un único recorrido integrado: partir de un estudiante activo, retirar con una fecha elegida, verificar el `PATCH`, reconsultar y comprobar que el registro aparece en la tabla de retirados con las acciones correctas. No repetirá casos de fecha inicial, cancelación, loading ni error cubiertos por RTL.

Se usarán interceptaciones con alias y aserciones reintentables, nunca esperas temporizadas. El estado de cada prueba será independiente y se preparará mediante fixtures/intercepts.

## Risks / Trade-offs

- **Documentos históricos sin el nuevo campo** → Normalizar ausencia a `null` al leer y establecer `null` explícitamente solo en nuevas matrículas; no exigir una migración previa.
- **Fechas ambiguas, fuera de rango o inválidas** → Validar al pulsar **Retirar** en el frontend contra `enrollment.date` y la fecha local actual, manteniendo la cadena de dominio sin conversiones UTC.
- **El selector muestra hoy pero el formulario no lo contiene** → Inicializar explícitamente el valor controlado al abrir el diálogo y probar el payload sin interacción con el calendario.
- **Actualización anidada podría reemplazar todo `enrollment`** → Usar la ruta Firestore `enrollment.withdrawalDate` y verificar en Jest que los demás campos y archivos permanecen intactos.
- **Dos acciones concurrentes sobre el mismo estudiante** → Deshabilitar **Retirar** mientras la mutación está pendiente; la aplicación asume tráfico exclusivo desde su frontend administrado.
- **Añadir Vitest incrementa configuración y dependencias** → Mantener una configuración mínima alineada con TypeScript/React 19 y centralizar wrappers/mocks en utilidades de test.

## Migration Plan

1. Desplegar el backend con lectura compatible del campo ausente, nuevo endpoint y nuevo estado, manteniendo los estados actuales para registros existentes.
2. Desplegar el frontend que reconoce `retired`, muestra la tercera sección y usa el endpoint de retiro.
3. Las nuevas matrículas comenzarán a persistir `withdrawalDate: null`; los documentos históricos se actualizarán solo cuando sean retirados.
4. Para rollback, retirar primero la UI de retiro y luego el endpoint. Los documentos que ya tengan fecha conservarán el dato; una versión antigua del backend los seguirá clasificando como `completed`, sin pérdida de información.

## Open Questions

- Ninguna para el alcance actual. La reactivación de un estudiante retirado requerirá una propuesta separada con reglas de auditoría y permisos.
