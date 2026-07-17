## ADDED Requirements

### Requirement: Parent omission is explicit and opt-in
The enrollment form SHALL provide a separately labelled omission checkbox for the mother section and the father section, and both controls SHALL be unchecked whenever a new form is initialized.

#### Scenario: New form requires both parent sections by default
- **WHEN** the user opens a new enrollment form
- **THEN** both omission checkboxes are unchecked and both parent sections are enabled

#### Scenario: User leaves a checkbox unchecked
- **WHEN** the user submits without selecting a section's omission checkbox
- **THEN** that section remains required and its existing missing-field errors are displayed

### Requirement: Omitting a parent clears and disables that section
When a user selects a parent's omission checkbox, the frontend SHALL restore every field in that parent section to its defined default value, clear the section's validation errors, disable all its interactive fields, and present a visually dimmed state that does not rely on color alone. The omission checkbox itself SHALL remain operable.

#### Scenario: Populated section is omitted
- **WHEN** the user modifies one or more mother fields and then selects the mother omission checkbox
- **THEN** every mother field returns to its default value, existing mother errors are cleared, and every mother field is functionally and visually disabled

#### Scenario: Omission is reversed
- **WHEN** the user clears a selected parent omission checkbox
- **THEN** that parent's fields become enabled with their reset default values and normal validation applies again

### Requirement: At least one complete parent is required
The frontend SHALL be the sole owner of the at-least-one-parent business rule, SHALL validate only the parent sections that have not been explicitly omitted, SHALL require each non-omitted parent to be complete under the existing parent field rules, and SHALL reject a form in which both parents are omitted before any enrollment request is sent.

#### Scenario: Both parents are complete
- **WHEN** neither omission checkbox is selected and both parent sections are valid
- **THEN** the enrollment passes the parent validation rules

#### Scenario: Mother is intentionally omitted
- **WHEN** the mother omission checkbox is selected and the father section is complete
- **THEN** missing mother fields produce no field errors and the enrollment passes the parent validation rules

#### Scenario: Father is intentionally omitted
- **WHEN** the father omission checkbox is selected and the mother section is complete
- **THEN** missing father fields produce no field errors and the enrollment passes the parent validation rules

#### Scenario: Both parents are omitted in the form
- **WHEN** both omission checkboxes are selected and the user attempts to submit
- **THEN** the frontend shows an accessible at-least-one-parent error and does not send the enrollment request

### Requirement: Omitted parent has a stable API representation
The frontend SHALL normalize an explicitly omitted parent to `null` before sending the enrollment, SHALL exclude UI-only omission flags from the payload, and SHALL send every non-omitted parent as a complete parent object. The backend SHALL accept and persist both parent objects or exactly one parent object plus one `null` value.

#### Scenario: Submit with only the mother
- **WHEN** the user submits a valid enrollment after omitting the father
- **THEN** the request and persisted record contain the complete mother object and `father` equal to `null`

#### Scenario: Submit with only the father
- **WHEN** the user submits a valid enrollment after omitting the mother
- **THEN** the request and persisted record contain the complete father object and `mother` equal to `null`

#### Scenario: Submit with both parents
- **WHEN** the user submits a valid enrollment without omitting either parent
- **THEN** the request and persisted record contain complete mother and father objects

### Requirement: Parent normalization handles nullable values
The backend SHALL convert and store parent-specific values only for parent objects that are present and SHALL preserve the omitted parent's `null` value without dereferencing it.

#### Scenario: Backend stores one parent
- **WHEN** the backend creates an enrollment with one parent object and the other parent set to `null`
- **THEN** it normalizes the present parent's stratum, preserves the other value as `null`, and completes the write without an internal error

### Requirement: Existing and omitted-parent records remain readable
The system SHALL continue to read historical enrollment records that contain both parent objects, and parent detail views SHALL handle a `null` parent without crashing or presenting fabricated field values.

#### Scenario: Historical enrollment contains both parents
- **WHEN** the system reads a historical enrollment with mother and father objects
- **THEN** both parent information sections are presented as before

#### Scenario: Enrollment contains an omitted parent
- **WHEN** the detail view receives an enrollment with one parent equal to `null`
- **THEN** it presents the available parent's information and identifies the omitted section as information not supplied

### Requirement: Authorized-person message reflects the registered parents
When no additional authorized person is registered, the completed-enrollment detail SHALL describe only the registered parent or parents as authorized to collect the student. When additional authorized people exist, the detail SHALL continue to present those people instead of the parent-only fallback message.

#### Scenario: Both parents and no additional authorized people
- **WHEN** the enrollment contains mother and father and its authorized-person list is empty
- **THEN** the detail displays **Los padres son las únicas personas autorizadas.**

#### Scenario: Only the mother and no additional authorized people
- **WHEN** the enrollment contains a mother, its father is `null`, and its authorized-person list is empty
- **THEN** the detail displays **Solo la madre puede recoger al estudiante.**

#### Scenario: Only the father and no additional authorized people
- **WHEN** the enrollment contains a father, its mother is `null`, and its authorized-person list is empty
- **THEN** the detail displays **Solo el padre puede recoger al estudiante.**

#### Scenario: Additional authorized people exist
- **WHEN** the enrollment has one or more entries in its authorized-person list
- **THEN** the detail presents those entries and does not replace them with a parent-only fallback message
