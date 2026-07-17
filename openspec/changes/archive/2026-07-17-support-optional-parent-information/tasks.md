## 1. Frontend parent contracts and defaults

- [x] 1.1 Extract a reusable frontend `ParentInformation` type and separate the editable `EnrollmentFormValues` shape from the creation payload whose `mother` and `father` values are `ParentInformation | null`.
- [x] 1.2 Centralize complete default objects for mother and father, add `omitMother: false` and `omitFather: false` to `useEnrollmentForm`, and expose the `clearErrors`, `resetField`, `setValue`, `trigger`, and watched state needed by the parent sections.
- [x] 1.3 Refactor the Zod parent rules so non-omitted sections retain every existing field validation, omitted sections do not emit field errors, and both omission flags produce an accessible at-least-one-parent error.
- [x] 1.4 Add and use a typed submit normalizer that removes the omission flags, maps an omitted parent to `null`, preserves each complete parent object, and passes only the API DTO to `usePostEnrollmentMutation`.

## 2. Parent omission user interface

- [x] 2.1 Add the Spanish-only visible copy for each **Omitir información de la madre/del padre** checkbox, the omitted-state hint, the at-least-one-parent error, and the detail placeholder without adding other-language translations or translation-specific tests.
- [x] 2.2 Refactor `EnrollmentFormSectionParent` to render a labelled native-semantic omission checkbox outside an accessible parent `fieldset`, associate group help/errors through ARIA, and keep both checkboxes unchecked on initialization.
- [x] 2.3 On omission changes, reset the selected parent's entire object to centralized defaults, clear its existing errors, validate the parent group immediately, and leave reset defaults in place when the section is re-enabled.
- [x] 2.4 Disable every input, date-picker trigger, and Radix dropdown in an omitted section, applying an obvious dimmed treatment plus textual/state indication; explicitly forward `disabled` to custom controls that do not inherit it from `fieldset`.
- [x] 2.5 Wire both sections through the enrollment page and footer/error summary so unchecked sections show their current field errors on submit and the both-omitted error prevents the mutation and can be discovered by assistive technology.

## 3. Backend nullable contracts and persistence

- [x] 3.1 Extract the backend `ParentInformation` interface and change `Enrollment.mother` and `Enrollment.father` to `ParentInformation | null`, updating derived request/read types without weakening present-parent fields.
- [x] 3.2 Update `EnrollmentService.postEnrollment` to trust the frontend-validated parent combination, normalize `stratum` only for present parents, and persist the omitted parent as `null` without adding duplicate request validation, business exceptions, or changes to file uploads.

## 4. Nullable-parent read experience

- [x] 4.1 Propagate nullable parent types through queried enrollment/shared types and all consumers that currently assume `mother` and `father` are always objects.
- [x] 4.2 Update the enrolled-student parent detail card to render all existing fields for a present parent and the Spanish **Información no suministrada** state for `null`, preserving both titled cards and avoiding fabricated values.
- [x] 4.3 Pass mother/father availability into the authorized-person card so an empty list displays the current plural message for two parents, **Solo la madre puede recoger al estudiante.** for mother-only records, or **Solo el padre puede recoger al estudiante.** for father-only records; preserve the existing person cards whenever the list is non-empty.

## 5. Vitest and React Testing Library foundation

- [x] 5.1 Audit the already-present Vitest, jsdom, React Testing Library, `jest-dom`, `user-event`, React plugin, scripts, alias, and setup configuration against the current React 19/Next.js project; add or correct only missing pieces before authoring new frontend unit tests.
- [x] 5.2 Complete shared test setup/render utilities with deterministic cleanup and fresh internationalization/query providers per render, adding only browser API mocks proven necessary by the real parent controls.

## 6. Frontend unit tests

- [x] 6.1 Add Vitest/RTL tests using `userEvent`, roles, labels, and `within` to prove both omission checkboxes default unchecked and parent controls default enabled.
- [x] 6.2 Test the encapsulated omission interaction: edit representative values, create a field error, omit the parent, assert all values/errors reset plus native/custom controls disabled and the section visibly identified as omitted, then re-enable it with clean defaults.
- [x] 6.3 Add focused schema/submit tests for unchanged required-field errors when a checkbox is unchecked, successful mother-only and father-only validation, rejection and accessible error for both omitted, and exact DTO normalization to `null` without UI flags.
- [x] 6.4 Add a focused detail-card test for a `null` parent and retain existing-present-parent rendering assertions; do not exercise page navigation or network integration in RTL.
- [x] 6.5 Add focused authorized-person card tests for the two-parent, mother-only, father-only, and non-empty-list messages without adding translation-specific assertions.

## 7. Backend-owned unit tests

- [x] 7.1 Extend service Jest tests only as needed to prove conditional stratum conversion and explicit `null` persistence; do not reproduce frontend parent-combination validation or add controller exception cases for it.

## 8. Cypress integrated enrollment flow

- [x] 8.1 Update the existing enrollment fixture/helpers so the shared full-form flow can deliberately skip one parent without duplicating all field-entry steps.
- [x] 8.2 Extend `front/cypress/e2e/enrollment.cy.ts` with one independent E2E test, prefixed by the Cypress Author generated-test comment using the implementation date, that omits one parent, completes the other, submits, aliases the POST, extracts the multipart JSON, asserts the omitted parent is `null` and the present parent is complete, and verifies the success flow.
- [x] 8.3 Keep Cypress assertions limited to cross-component and frontend–API integration; use the existing section `data-testid` boundaries plus accessible roles/names, intercept aliases, and retryable assertions, with no arbitrary waits and no repetition of reset, dimming, re-enable, per-field error, or both-omitted unit cases.

## 9. Verification

- [x] 9.1 Run backend formatting/type/build checks and targeted service Jest tests for backend-owned behavior, then resolve all regressions.
- [x] 9.2 Run frontend formatting, lint, type-check, and the targeted/new Vitest suite, then resolve all regressions.
- [x] 9.3 Run the updated Cypress enrollment spec against the local frontend/backend test setup and verify the new test is deterministic and independently runnable.
- [x] 9.4 Run OpenSpec validation/status for `support-optional-parent-information` and confirm every implementation requirement has corresponding non-duplicated automated coverage.

