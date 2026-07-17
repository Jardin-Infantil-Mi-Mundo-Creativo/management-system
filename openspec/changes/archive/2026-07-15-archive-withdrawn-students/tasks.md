## 1. Backend data model and lifecycle rules

- [x] 1.1 Extend the backend enrollment model with nullable `enrollment.withdrawalDate` and a typed `draft | completed | retired` lifecycle state.
- [x] 1.2 Add reusable helpers that normalize an absent withdrawal date to `null` and derive lifecycle state with `draft` precedence.
- [x] 1.3 Update enrollment creation to persist `withdrawalDate: null` for new records and enrollment listing to return normalized data with the derived lifecycle state.

## 2. Backend withdrawal operation

- [x] 2.1 Add `PATCH /enrollments/:id/withdrawal` accepting `{ withdrawalDate }` and route it to a dedicated service operation.
- [x] 2.2 Trust the frontend-controlled withdrawal input and update the selected enrollment without duplicating client-side date or lifecycle validation in the backend.
- [x] 2.3 Persist only the Firestore path `enrollment.withdrawalDate`, preserve all other enrollment fields/files, and return the updated record with `state: retired`.

## 3. Backend automated tests

- [x] 3.1 Extend `enrollment.service.spec.ts` with state-derivation cases for draft, active, retired, historical missing-field, and inconsistent incomplete records.
- [x] 3.2 Add a service test proving successful withdrawal performs a partial nested update and preserves student data/files.
- [x] 3.3 Extend `enrollment.controller.spec.ts` to verify the PATCH body/id delegation and HTTP error propagation without duplicating service rule cases.

## 4. Vitest and React Testing Library foundation

- [x] 4.1 Add Vitest, jsdom, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, and the minimal React transform/configuration dependencies to `front`.
- [x] 4.2 Add frontend `test` and `test:watch` scripts, a jsdom Vitest configuration compatible with the `@/` alias, and a shared setup file that registers `jest-dom`, cleanup, and only the browser API mocks required by rendered components.
- [x] 4.3 Add a test render utility that creates fresh Query Client and internationalization providers per test so state and caches cannot leak.

## 5. Frontend contract and mutation

- [x] 5.1 Extend frontend lifecycle types with `retired` while keeping `withdrawalDate` as a backend-managed enrollment field.
- [x] 5.2 Add a withdrawal mutation hook that sends the JSON date to `PATCH /enrollments/:id/withdrawal`, handles non-success HTTP responses, prevents duplicate submissions, and invalidates `['enrollments']` after success.
- [x] 5.3 Add a React Hook Form/Zod withdrawal schema that parses `DD/MM/YYYY` without UTC conversion and validates on submit that the date is not before `enrollment.date` or after today, with the established enrollment-form field-error pattern and messages.

## 6. Withdrawal dialog and state-aware homepage

- [x] 6.1 Build an accessible withdrawal confirmation dialog using the existing shadcn/Radix dialog and date picker, with the student name, a labelled editable date initialized in form state to today, and **Retirar**/**Cancelar** actions.
- [x] 6.2 Implement dialog validation, pending, success, and error behavior: show date-range errors without a request, disable **Retirar** while pending, close/reset without a request on cancel, keep failures visible, and rely on query invalidation rather than `window.location.reload()` after success.
- [x] 6.3 Refactor row action rendering so drafts and retired records show **Ver/Eliminar**, while completed records show **Ver/Retirar/Eliminar**.
- [x] 6.4 Add the **Estudiantes retirados** table, feed all three tables from mutually exclusive state filters, and retain the existing empty-state and loading/error behavior.

## 7. Frontend unit tests with Vitest and RTL

- [x] 7.1 Add isolated dialog tests using the real date picker, roles, accessible names, labels, and `userEvent` for the real default date, valid changed date, pre-enrollment and future-date messages with no mutation, cancellation, pending-button state, and visible mutation errors.
- [x] 7.2 Add focused tests for the extracted action policy or row-actions component, asserting **Eliminar** for every state and **Retirar** only for `completed`, without exercising the full page or network flow.

## 8. Cypress integrated withdrawal flow

- [x] 8.1 Extend `front/cypress/fixtures/enrolled-students.ts` with explicit active, draft, and retired records including `withdrawalDate` values, then update existing table assertions for the third section and state-specific actions.
- [x] 8.2 Extend `front/cypress/e2e/enrolled-students.cy.ts` with one independent E2E journey that selects a valid non-default withdrawal date, presses **Retirar**, aliases and asserts the PATCH payload, returns refreshed fixture state, and verifies the student moves from **Estudiantes matriculados** to **Estudiantes retirados** with **Ver/Eliminar** actions and no **Retirar** action.
- [x] 8.3 Keep Cypress coverage limited to cross-component/network integration; do not repeat RTL cases for the default date, cancel behavior, pending state, or error rendering, and use intercept aliases/retryable assertions instead of arbitrary waits.

## 9. Verification

- [x] 9.1 Run backend formatting/type/build checks and targeted Jest enrollment tests, then resolve any regressions.
- [x] 9.2 Run frontend formatting, lint, type-check, and the new Vitest suite, then resolve any regressions.
- [x] 9.3 Run the updated Cypress enrolled-students spec against the local frontend and verify every test is independent and deterministic.
