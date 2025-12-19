import { getEnrollmentsResponse } from '../fixtures/enrolled-students';

const mockEnrollment = {
  id: '1',
  state: 'draft',
  personalStudentInfo: {
    ageMonths: 0,
    ageYears: 22,
    birthCity: 'Bogota',
    birthDate: '28/11/2003',
    civilRegistrationNumber: '123456789',
    fullName: 'Draft Student',
  },
  enrollment: {
    date: '2024-01-01',
    entryGrade: 'walkers',
    isFirstTime: false,
    isOldStudent: true,
    previousSchoolName: 'Institution',
  },
  studentHealth: {
    allergies: '',
    eps: 'Salud Total',
    hasAnxiety: false,
    hasAttentionDisorders: false,
    hasAutism: false,
    hasBehavioralDisorders: false,
    hasDownSyndrome: false,
    hasEncopresis: false,
    hasEnuresis: false,
    hasHearingDisability: false,
    hasHyperactivity: false,
    hasLanguageDisorders: false,
    hasPhysicalDisability: false,
    bloodType: 'A+',
    hasSisben: false,
    otherDisorders: '',
    therapies: '',
    otherDisabilities: '',
  },
  rendererFieldsOnly: {
    studentHealth: {
      hasAllergy: false,
      hasDisability: false,
      hasDisabilityOther: false,
      hasDisorderOther: false,
      hasDisorders: false,
      hasTherapy: false,
    },
  },
  familyRelationship: {
    livesWithGrandparents: false,
    livesWithParents: true,
    livesWithSiblings: false,
    livesWithStepfather: false,
    livesWithStepmother: false,
    livesWithUncles: false,
    parentsRelationship: 'married',
  },
  father: {
    address: 'Calle 123',
    ageYears: 22,
    birthDate: '28/11/2003',
    cellPhoneNumber: '3123456789',
    educationLevel: 'technical',
    email: 'john.doe@gmail.com',
    fullName: 'John Doe',
    identificationNumber: '123456789',
    neighborhood: 'Barrio 123',
    occupation: 'Profesor',
    stratum: '4',
    telephoneNumber: '',
  },
  mother: {
    address: 'Calle 123',
    ageYears: 22,
    birthDate: '28/11/2003',
    cellPhoneNumber: '3123456789',
    educationLevel: 'technical',
    email: 'john.doe@gmail.com',
    fullName: 'John Doe',
    identificationNumber: '123456789',
    neighborhood: 'Barrio 123',
    occupation: 'Profesor',
    stratum: '4',
    telephoneNumber: '',
  },
  authorizedPersons: [],
  studentPhoto: null,
  documentsFile: null,
};

describe('Enrolled Students', () => {
  function checkTableStructure() {
    cy.findByRole('columnheader', { name: 'Documento del estudiante' });
    cy.findByRole('columnheader', { name: 'Nombre' });
    cy.findByRole('columnheader', { name: 'Grado' });
    cy.findByRole('columnheader', { name: 'Acciones' });
    cy.findAllByRole('columnheader').should('have.length', 4);
    cy.findAllByRole('row').should('have.length.greaterThan', 0);
  }

  const enrollmentStates = ['draft', 'completed'];

  it('should display tables with expected elements', () => {
    cy.intercept(
      'GET',
      'http://localhost:8080/enrollments/',
      getEnrollmentsResponse
    );
    cy.visit('/');

    cy.findByRole('heading', { level: 1, name: 'Matriculas' });

    enrollmentStates.forEach((state) => {
      cy.findByTestId(`${state}-enrollments-table`).within(() => {
        cy.findByRole('heading', {
          level: 2,
          name:
            state === 'draft'
              ? 'Formularios sin completar'
              : 'Estudiantes matriculados',
        });
        checkTableStructure();
      });
    });
  });

  describe('Draft Enrollment Completion', () => {
    it('should display completion form for draft enrollment', () => {
      cy.intercept('GET', 'http://localhost:8080/enrollments/', {
        body: [mockEnrollment],
      }).as('getDraftEnrollment');

      cy.visit('/');
      cy.wait('@getDraftEnrollment');

      cy.findAllByRole('row')
        .eq(1)
        .findByRole('button', { name: /ver detalle/i })
        .click();

      cy.findByLabelText(/foto del estudiante/i).should('exist');
      cy.findByLabelText(/documentos \(pdf\)/i).should('exist');
      cy.findByRole('button', { name: /completar formulario/i }).should(
        'exist'
      );
    });

    it.skip('should not display completion form for completed enrollment', () => {
      cy.intercept('GET', 'http://localhost:8080/enrollments/', {
        body: [
          {
            ...mockEnrollment,
            id: '2',
            state: 'completed',
            studentPhoto: 'http://example.com/photo.jpg',
            documentsFile: 'http://example.com/docs.pdf',
          },
        ],
      }).as('getCompletedEnrollment');

      cy.visit('/');
      cy.wait('@getCompletedEnrollment');

      cy.findAllByRole('row')
        .eq(1)
        .findByRole('button', { name: /ver detalle/i })
        .click();

      cy.findByLabelText(/foto del estudiante/i).should('not.exist');
      cy.findByLabelText(/documentos \(pdf\)/i).should('not.exist');
      cy.findByRole('button', { name: /completar formulario/i }).should(
        'not.exist'
      );
    });

    it.skip('should show validation errors when submitting empty form', () => {
      cy.intercept('GET', 'http://localhost:8080/enrollments/', {
        body: [mockEnrollment],
      }).as('getDraftEnrollment');

      cy.visit('/');
      cy.wait('@getDraftEnrollment');

      cy.findAllByRole('row')
        .eq(1)
        .findByRole('button', { name: /ver detalle/i })
        .click();

      cy.findByRole('button', { name: /completar formulario/i }).click();

      cy.findByText(/la foto del estudiante es requerida/i).should('exist');
      cy.findByText(/el documento de identidad es requerido/i).should('exist');
    });

    it.skip('should submit form successfully', () => {
      cy.intercept('GET', 'http://localhost:8080/enrollments/', {
        body: [mockEnrollment],
      }).as('getDraftEnrollment');

      cy.intercept('PUT', 'http://localhost:8080/enrollments/1', {
        statusCode: 200,
        body: { success: true },
      }).as('completeEnrollment');

      cy.visit('/');
      cy.wait('@getDraftEnrollment');

      cy.findAllByRole('row')
        .eq(1)
        .findByRole('button', { name: /ver detalle/i })
        .click();

      // Upload files
      cy.findByLabelText(/foto del estudiante/i).selectFile(
        'cypress/fixtures/test-image.jpg',
        { force: true }
      );
      cy.findByLabelText(/documentos \(pdf\)/i).selectFile(
        'cypress/fixtures/test-document.pdf',
        { force: true }
      );

      cy.findByRole('button', { name: /completar formulario/i }).click();

      cy.wait('@completeEnrollment');

      cy.findByText(/información actualizada exitosamente/i).should('exist');
    });

    it.skip('should show error message on mutation failure', () => {
      cy.intercept('GET', 'http://localhost:8080/enrollments/', {
        body: [mockEnrollment],
      }).as('getDraftEnrollment');

      cy.intercept('PUT', 'http://localhost:8080/enrollments/1', {
        statusCode: 500,
      }).as('completeEnrollmentError');

      cy.visit('/');
      cy.wait('@getDraftEnrollment');

      cy.findAllByRole('row')
        .eq(1)
        .findByRole('button', { name: /ver detalle/i })
        .click();

      cy.findByLabelText(/foto del estudiante/i).selectFile(
        'cypress/fixtures/test-image.jpg',
        { force: true }
      );
      cy.findByLabelText(/documentos \(pdf\)/i).selectFile(
        'cypress/fixtures/test-document.pdf',
        { force: true }
      );

      cy.findByRole('button', { name: /completar formulario/i }).click();

      cy.wait('@completeEnrollmentError');

      cy.findByText(/hubo un error al actualizar la información/i).should(
        'exist'
      );
    });
  });
});
