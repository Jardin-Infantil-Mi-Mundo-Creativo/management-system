# Project Engineering Guidelines

## Validation ownership and trusted requests

- Treat the managed frontend as the source of truth for form and user-flow business validation.
- Do not duplicate frontend business rules, validation branches, exceptions, or equivalent test cases in the backend. When the frontend guarantees an invariant before submission, the backend may assume the received request satisfies it.
- Keep backend work limited to its own responsibilities: typed contracts, null-safe transformations, persistence, external-service behavior, and operational error handling.
- Add backend runtime validation for a frontend-owned rule only when the user explicitly requests it or when the trust boundary changes to include untrusted or external clients. Document that exception before implementing it.

## Type safety

- Never use `any` or `never` in implementation code to bypass a type error, and do not use forced casts or chained casts through `unknown` merely to satisfy TypeScript or lint.
- Model values according to the data they actually contain. If a value can be absent, represent that explicitly with the appropriate optional or nullable type and update the consuming contracts accordingly.
- Treat types as part of the domain contract: resolve the underlying type mismatch instead of silencing it with a cast. Any intentional exception must be documented with its concrete reason and limited to the smallest possible scope.
- Forced or partial casts are acceptable in tests only when constructing a focused fixture with the minimum props needed for that test; they must not hide a production implementation mismatch.

## Frontend domain architecture and naming

- Organize frontend files by page domain. The current domains are `enrollment` and `enrolled-students`; domain-specific components, hooks, schemas, utilities, types, and constants belong under that domain's folder or use the existing domain-oriented file convention.
- Put code in `shared` only when it is genuinely consumed by more than one domain, using the corresponding shared subfolder (`components`, `consts`, `hooks`, `types`, and so on). Do not move enrollment-only code into shared locations.
- Preserve the domain location when adding or refactoring files. A page domain is the ownership boundary for its business logic and UI.
- Name module-level constants in uppercase with underscores (for example, `PARENT_INFORMATION_DEFAULTS`), following the existing frontend convention. Use descriptive names that communicate the value's domain and purpose.

## Test ownership and non-duplication

- Give each behavior one primary test layer.
- Use Vitest and React Testing Library for isolated React components, form validation, local state transitions, accessibility state, and submit-payload normalization.
- Use backend Jest tests only for backend-owned transformations, persistence behavior, and service/controller orchestration that is not already guaranteed by frontend tests.
- Use Cypress E2E for critical flows and integrations across components or the frontend/API boundary. Do not repeat field-level or isolated component cases already covered by Vitest/RTL.
- Before adding a test, identify the layer that owns the behavior and check whether equivalent coverage already exists elsewhere.
- Keep each RTL test focused on one initial render and one behavior. Prefer separate tests for separate prop variants or states; use `rerender` only when the behavior under test is specifically the effect of a component rerender.
- Mock only the modules, functions, hooks, and return values that the test scope actually calls or observes. Do not create broad mocks that replace unrelated behavior.
- Prefer Vitest partial typing (`vi.mocked(value, { partial: true })`) when mocking a function or hook return and only a subset of its shape is relevant; preserve the real implementation for the rest whenever practical.
