## Context

El formulario de matrícula usa React Hook Form con un esquema Zod que hoy exige `mother` y `father` mediante el mismo `familyMemberSchema`. Ambos objetos se inicializan parcialmente, se renderizan con los mismos controles y se envían sin una normalización específica. El backend tipa ambos progenitores como obligatorios y convierte incondicionalmente sus estratos antes de guardar el documento en Firestore; las vistas de detalle también desreferencian ambos objetos sin contemplar ausencia.

La interfaz debe conservar la validación estricta de una sección mientras no se haya manifestado la intención de omitirla. El API necesita una representación inequívoca de ausencia, pero al ser consumido por el frontend administrado confiará en que este ya garantizó la regla de al menos un progenitor, sin repetirla en NestJS. Cypress ya cubre extensamente el formulario de matrícula y el frontend ya contiene una base de Vitest/React Testing Library creada por un cambio anterior, por lo que se ampliarán esas bases en lugar de instalar una segunda infraestructura.

## Goals / Non-Goals

**Goals:**

- Permitir madre y padre, solo madre o solo padre, manteniendo al menos un progenitor completo.
- Hacer explícita la omisión mediante dos checkboxes desmarcados por defecto y preservar el comportamiento de errores existente cuando no se marcan.
- Restablecer de forma determinista los datos y errores de una sección omitida, deshabilitar todos sus controles con semántica nativa y comunicar visualmente su estado.
- Definir un contrato compartido en el que cada progenitor sea un objeto completo o `null`, validar la invariancia únicamente en el frontend y persistirla sin romper documentos históricos.
- Adaptar el mensaje de personas autorizadas para nombrar correctamente a la madre, al padre o a ambos según la información registrada.
- Distribuir la cobertura entre Jest backend, Vitest/RTL y Cypress de acuerdo con el límite unitario/integrado solicitado.

**Non-Goals:**

- Permitir una matrícula sin información de ningún progenitor.
- Inferir que un progenitor está ausente porque sus campos estén vacíos; la omisión siempre requiere el checkbox explícito.
- Eliminar o alterar la información ya almacenada de matrículas históricas con ambos progenitores.
- Añadir validación runtime, excepciones o tests backend que repitan reglas ya garantizadas por el formulario administrado.
- Añadir nuevos idiomas, traducciones o pruebas específicas de internacionalización; los textos visibles de este cambio permanecerán en español.
- Rediseñar las demás secciones del formulario, migrar Jest backend a Vitest o introducir Cypress Component Testing.

## Decisions

### 1. Separar el estado editable del contrato persistido

El estado del formulario incorporará dos booleanos, `omitMother` y `omitFather`, ambos `false` por defecto, y conservará objetos editables con valores por defecto para `mother` y `father`. Antes de invocar la mutación, una función de normalización tipada construirá el payload y representará la sección omitida como `null`; los booleanos de UI no se enviarán ni persistirán.

Los tipos distinguirán `EnrollmentFormValues` del DTO de creación/entidad: el primero contiene los flags y borradores de ambos progenitores, mientras el segundo declara `mother: ParentInformation | null` y `father: ParentInformation | null`. Esto evita que controles registrados deban alternar entre objeto y `null`, y hace explícita la frontera frontend–API. Se descarta enviar objetos vacíos porque no diferencia una omisión voluntaria de datos incompletos; también se descarta persistir flags redundantes que podrían contradecir la nulabilidad.

### 2. Validación condicional con errores en rutas existentes

El esquema mantendrá una versión parcial del objeto de progenitor para admitir los valores iniciales y ejecutará `familyMemberSchema.safeParse` dentro de `superRefine` únicamente para cada sección cuyo flag sea `false`. Los issues se copiarán a las rutas `mother.*` o `father.*`, conservando los mensajes y componentes de error actuales. Si ambos flags son `true`, se añadirá un issue de grupo asociado a los controles de omisión y el submit no producirá payload.

Los cambios de checkbox usarán validación inmediata para que el error de grupo se actualice. Marcar una sección limpiará sus errores y llamará a `resetField` con el objeto de valores por defecto; desmarcarla dejará esos valores limpios y reactivará la validación normal. Se descarta hacer opcional cada campo individual sin refinamiento porque permitiría enviar un progenitor parcialmente diligenciado.

### 3. Agrupación y deshabilitado accesibles

Cada bloque de progenitor se organizará como un `fieldset` con un `legend` accesible. El checkbox de omisión permanecerá fuera del conjunto deshabilitable, junto al encabezado, para que siempre pueda revertirse. Al omitir, el `fieldset` recibirá `disabled`, lo cual inhabilita de forma nativa inputs, botones y selects; un contenedor aplicará opacidad/contraste atenuado y una transición breve, sin usar solo color para comunicar el estado. El checkbox tendrá etiqueta visible, estado nativo y `aria-describedby` hacia la ayuda o el error de al menos un progenitor.

Esta estructura se prefiere a propagar manualmente `disabled` a cada componente, lo que sería fácil de omitir en controles nuevos. Los checkboxes seguirán disponibles aunque ambos estén marcados para que la persona pueda corregir cualquiera; el error de grupo y el bloqueo de submit garantizan la invariancia.

### 4. Contrato confiado y persistencia nullable en NestJS

El backend extraerá un tipo reutilizable `ParentInformation` y declarará cada clave de progenitor como objeto completo o `null`. El controlador continuará parseando y delegando el payload tipado sin volver a validar la regla de al menos un progenitor ni crear excepciones para combinaciones que el formulario impide. El servicio convertirá `stratum` solamente cuando el progenitor exista y guardará `null` explícito para el omitido. Los documentos históricos con dos objetos siguen satisfaciendo el nuevo tipo. Se descarta eliminar la clave porque `null` ofrece un contrato estable para clientes y consultas.

Esta confianza evita dos implementaciones de una misma regla y dos suites que podrían divergir. Si el endpoint llega a exponerse a clientes no administrados, la validación de frontera deberá diseñarse como un cambio separado.

### 5. Lectura, progenitores ausentes y personas autorizadas

Los tipos de datos consultados y los componentes de detalle admitirán `null`. Cada tarjeta seguirá mostrando su título y, cuando el progenitor esté ausente, mostrará **Información no suministrada** en lugar de intentar renderizar campos o ocultar silenciosamente la sección. Así se mantiene la estructura esperada de la ficha y se evita confundir ausencia con un error de carga.

La sección de personas autorizadas conservará prioridad para las personas adicionales registradas. Solo cuando la lista esté vacía derivará el texto desde los progenitores disponibles: **Los padres son las únicas personas autorizadas.** si existen ambos, **Solo la madre puede recoger al estudiante.** si falta el padre y **Solo el padre puede recoger al estudiante.** si falta la madre. Esta decisión evita afirmar que ambos padres están autorizados cuando uno no forma parte del registro.

### 6. Estrategia de pruebas sin duplicación

- Jest backend cubrirá únicamente la conversión condicional de estrato y la persistencia de `null`, responsabilidades propias del servicio. No repetirá combinaciones válidas/inválidas ni la regla de al menos un progenitor.
- Vitest/RTL auditará la configuración existente de jsdom, `jest-dom`, cleanup, `userEvent` y providers frescos. Cubrirá el checkbox desmarcado por defecto, deshabilitado/atenuado accesible, restablecimiento de valores y errores, reactivación, validación normal de una sección no omitida, rechazo de ambos omitidos, normalización tipada a `null` y los mensajes de personas autorizadas. Se usarán roles, labels, `within` y `userEvent`, sin aserciones sobre estado interno.
- Cypress actualizará `front/cypress/e2e/enrollment.cy.ts` con un recorrido independiente que omite un progenitor, completa el restante, envía el formulario, inspecciona el multipart interceptado y comprueba la respuesta integrada. Reutilizará comandos y fixtures, delimitará secciones con sus `data-testid` existentes y localizará controles por nombre accesible. No repetirá reset, dimming, reactivación, errores de campo ni el caso de ambos omitidos ya cubiertos en unitarias.

No se crearán pruebas para traducciones ni variantes de idioma; todo el copy nuevo se mantendrá en español.

## Risks / Trade-offs

- **Los componentes Radix personalizados no respetan automáticamente un `fieldset disabled`** → Verificar el comportamiento real de dropdowns y date picker; si algún trigger no hereda el estado, derivar `isOmitted` en ese adaptador además del fieldset y cubrirlo con RTL.
- **Los valores modificados podrían sobrevivir en el estado de React Hook Form** → Centralizar objetos de defaults de progenitor y usar `resetField`/`clearErrors`, comprobando tanto valores visibles como payload normalizado.
- **Los issues de un `safeParse` anidado pueden perder sus rutas** → Anteponer explícitamente `mother` o `father` al copiar cada issue y probar mensajes de campos representativos.
- **Clientes antiguos podrían asumir que ambos objetos existen** → Desplegar primero la lectura/backend nullable y actualizar todas las vistas del repositorio en el mismo cambio; los registros históricos permanecen compatibles.
- **El backend confía en un cliente administrado** → Mantener el endpoint dentro de ese límite de confianza; si se habilitan clientes externos, proponer validación de frontera sin mezclarla retrospectivamente con este alcance.
- **La configuración Vitest ya existe aunque el requisito asumía que no** → Auditarla, completar solo mocks/providers/scripts faltantes y evitar reinstalaciones o configuraciones paralelas.

## Migration Plan

1. Desplegar backend con tipos nullable y normalización condicional, confiando en los payloads validados por el frontend; continuará aceptando los payloads actuales con ambos objetos.
2. Desplegar frontend con checkboxes, validación condicional y payloads `null`, junto con vistas de detalle tolerantes a ausencia.
3. No ejecutar migración masiva: documentos históricos con ambos objetos se leen sin cambios y las nuevas omisiones se almacenan explícitamente como `null`.
4. Para rollback, retirar primero la UI de omisión. Antes de volver a un backend que desreferencie ambos objetos, se deberá impedir o normalizar la lectura de registros ya creados con un progenitor `null`; los datos presentes no se eliminan.

## Open Questions

- Ninguna para el alcance actual. La edición posterior de información familiar o la incorporación de otros tutores requerirá una propuesta separada.
