## ADDED Requirements

### Requirement: Withdrawal date is part of the enrollment record
The system SHALL store a nullable withdrawal date at `enrollment.withdrawalDate` using the `DD/MM/YYYY` format, SHALL treat an absent value as `null`, and SHALL preserve all other student information and files when the value changes.

#### Scenario: New enrollment remains active by default
- **WHEN** a new enrollment is created
- **THEN** the system stores `enrollment.withdrawalDate` as `null`

#### Scenario: Historical enrollment has no withdrawal field
- **WHEN** the system reads an existing enrollment whose `enrollment.withdrawalDate` field is absent
- **THEN** the system treats its withdrawal date as `null` without requiring a data migration

### Requirement: Backend derives enrollment lifecycle state
The backend SHALL derive exactly one lifecycle state using document completeness before withdrawal status: an enrollment missing its required photo or documents SHALL be `draft`; a complete enrollment with a non-null withdrawal date SHALL be `retired`; and a complete enrollment with a null withdrawal date SHALL be `completed`.

#### Scenario: Incomplete enrollment is a draft
- **WHEN** an enrollment is missing the required photo or documents
- **THEN** the backend returns `state` as `draft`

#### Scenario: Complete active enrollment is completed
- **WHEN** an enrollment has its required photo and documents and its withdrawal date is null or absent
- **THEN** the backend returns `state` as `completed`

#### Scenario: Complete withdrawn enrollment is retired
- **WHEN** an enrollment has its required photo and documents and a non-null withdrawal date
- **THEN** the backend returns `state` as `retired`

#### Scenario: Incomplete inconsistent record remains a draft
- **WHEN** an enrollment is missing a required file but contains a withdrawal date
- **THEN** the backend returns `state` as `draft`

### Requirement: Active enrollment can be withdrawn without deletion
The system SHALL expose a withdrawal operation for the managed frontend, SHALL update only `enrollment.withdrawalDate` without deleting or replacing the remaining record, and SHALL rely on the frontend to expose the operation only for complete active enrollments and to validate the requested date.

#### Scenario: Withdraw active student
- **WHEN** the managed frontend supplies a validated date for an enrollment whose current state is `completed`
- **THEN** the backend persists that date, preserves the complete record and files, and returns the enrollment with `state` equal to `retired`

### Requirement: Homepage separates enrollments by lifecycle state
The frontend SHALL display the mutually exclusive sections **Formularios sin completar**, **Estudiantes matriculados**, and **Estudiantes retirados**, placing each enrollment in the section that corresponds to the backend `state` value.

#### Scenario: Retired enrollment is listed separately
- **WHEN** the enrollment query returns a record with `state` equal to `retired`
- **THEN** the frontend displays that record in **Estudiantes retirados** and not in either of the other sections

#### Scenario: No retired enrollments exist
- **WHEN** the enrollment query returns no records with `state` equal to `retired`
- **THEN** the **Estudiantes retirados** section displays the existing empty-table message

### Requirement: Actions respect enrollment lifecycle state
The frontend SHALL offer **Ver** and **Eliminar** for `draft` and `retired` records, and **Ver**, **Retirar**, and **Eliminar** for `completed` records.

#### Scenario: Draft actions cannot start withdrawal
- **WHEN** a draft row is displayed
- **THEN** its actions contain **Ver** and **Eliminar** and do not contain **Retirar**

#### Scenario: Active student can start withdrawal and can be deleted
- **WHEN** a completed row is displayed
- **THEN** its actions contain **Ver**, **Retirar**, and **Eliminar**

#### Scenario: Retired student can be viewed and deleted
- **WHEN** a retired row is displayed
- **THEN** its actions contain **Ver** and **Eliminar** and do not contain **Retirar**

### Requirement: Withdrawal requires confirmed editable date
Selecting **Retirar** for an active student SHALL open an accessible confirmation dialog containing the student identity, an editable withdrawal-date field initialized to the current local date in `DD/MM/YYYY` format, and the actions **Retirar** and **Cancelar**. When **Retirar** is pressed, the frontend SHALL validate the field using the enrollment-form error pattern and SHALL not send a request if the date is invalid, before `enrollment.date`, or after the current local date.

#### Scenario: Dialog defaults to current date
- **WHEN** the user opens the withdrawal dialog
- **THEN** the date field contains the current local date formatted as `DD/MM/YYYY`

#### Scenario: User selects another date
- **WHEN** the user changes the withdrawal date with the date picker
- **THEN** the dialog displays and submits the selected date in `DD/MM/YYYY` format

#### Scenario: Withdrawal date is before enrollment date
- **WHEN** the user presses **Retirar** with a withdrawal date before `enrollment.date`
- **THEN** the frontend shows **La fecha de retiro no puede ser anterior a la fecha de matrícula.** next to the field and sends no withdrawal request

#### Scenario: Withdrawal date is in the future
- **WHEN** the user presses **Retirar** with a withdrawal date after the current local date
- **THEN** the frontend shows **La fecha de retiro no puede ser posterior a la fecha actual.** next to the field and sends no withdrawal request

#### Scenario: User cancels withdrawal
- **WHEN** the user selects **Cancelar**
- **THEN** the dialog closes without sending a withdrawal request or changing the enrollment list

#### Scenario: User withdraws enrollment
- **WHEN** the user selects **Retirar** with a valid date and the withdrawal request succeeds
- **THEN** the frontend refreshes enrollment data and the student moves from **Estudiantes matriculados** to **Estudiantes retirados**

#### Scenario: Withdrawal request fails
- **WHEN** the user selects **Retirar** and the withdrawal request fails
- **THEN** the frontend shows an error message and does not present the withdrawal as successful
