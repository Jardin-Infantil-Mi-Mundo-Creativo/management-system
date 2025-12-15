import { getEnrollmentsResponse } from '../fixtures/enrolled-students';

describe('enrolled students', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:8080/enrollments/',
      getEnrollmentsResponse
    );

    cy.visit('/');
  });

  it('should display table with expected elements', () => {
    cy.findByRole('heading', { name: 'Matriculas' });

    cy.findByRole('columnheader', { name: 'Documento del estudiante' });
    cy.findByRole('columnheader', { name: 'Nombre' });
    cy.findByRole('columnheader', { name: 'Grado' });
    cy.findByRole('columnheader', { name: 'Acciones' });
    cy.findAllByRole('columnheader').should('have.length', 4);

    cy.findAllByRole('row').should('have.length', 3).as('rows');

    cy.get('@rows')
      .eq(1)
      .within(() => {
        cy.findByRole('cell', { name: '123456789' });
        cy.findByRole('cell', { name: 'John Doe' });
        cy.findByRole('cell', { name: 'Caminadores' });
        cy.findByRole('cell', { name: 'Ver' }).within(() => {
          cy.findByRole('button', { name: 'Ver' });
        });
      });

    cy.get('@rows')
      .eq(2)
      .within(() => {
        cy.findByRole('cell', { name: '987654321' });
        cy.findByRole('cell', { name: 'Jane Doe' });
        cy.findByRole('cell', { name: 'Caminadores' });
        cy.findByRole('cell', { name: 'Ver' }).within(() => {
          cy.findByRole('button', { name: 'Ver' });
        });
      });
  });

  it('should display enrollment details with expected elements', () => {
    const parents = ['mother', 'father'];

    cy.findAllByRole('button', { name: 'Ver' }).first().click();
    cy.findByRole('dialog', { name: 'Matrícula' });

    cy.findByTestId('header').within(() => {
      cy.findByRole('heading', { name: 'Información personal del estudiante' });
      cy.findByRole('link');
      cy.findByText('Nombre completo:')
        .parent()
        .within(() => {
          cy.findByText('John Doe');
        });
      cy.findByText('Fecha de nacimiento:')
        .parent()
        .within(() => {
          cy.findByText('28/11/2003');
        });
      cy.findByText('Edad:')
        .parent()
        .within(() => {
          cy.findByText('22 años, 0 meses');
        });
      cy.findByText('Ciudad de nacimiento:')
        .parent()
        .within(() => {
          cy.findByText('Bogota');
        });
      cy.findByText('N° registro civil:')
        .parent()
        .within(() => {
          cy.findByText('123456789');
        });
    });

    cy.findByTestId('health').within(() => {
      cy.findByRole('heading', { name: 'Salud del estudiante' });
      cy.findByText('Discapacidades:')
        .parent()
        .within(() => {
          cy.findByText('No registra');
        });
      cy.findByText('Trastornos:')
        .parent()
        .within(() => {
          cy.findByText('No registra');
        });
      cy.findByText('Terapias:')
        .parent()
        .within(() => {
          cy.findByText('No registra');
        });
      cy.findByText('Tiene SISBEN:')
        .parent()
        .within(() => {
          cy.findByText('No');
        });
      cy.findByText('EPS:')
        .parent()
        .within(() => {
          cy.findByText('Salud Total');
        });
      cy.findByText('Tipo de sangre:')
        .parent()
        .within(() => {
          cy.findByText('A+');
        });
      cy.findByText('Alergias:')
        .parent()
        .within(() => {
          cy.findByText('No registra');
        });
      cy.findByText('Tiene enuresis:')
        .parent()
        .within(() => {
          cy.findByText('No');
        });
      cy.findByText('Tiene encopresis:')
        .parent()
        .within(() => {
          cy.findByText('No');
        });
    });

    parents.forEach((parent) => {
      cy.findByTestId(parent).within(() => {
        cy.findByRole('heading', {
          name: `Información ${parent === 'mother' ? 'de la madre' : 'del padre'}`,
        });
        cy.findByText('Nombre:')
          .parent()
          .within(() => {
            cy.findByText('John Doe');
          });
        cy.findByText('Fecha de nacimiento:')
          .parent()
          .within(() => {
            cy.findByText('28/11/2003');
          });
        cy.findByText('Edad:')
          .parent()
          .within(() => {
            cy.findByText('22');
          });
        cy.findByText('Numero de cédula:')
          .parent()
          .within(() => {
            cy.findByText('123456789');
          });
        cy.findByText('Dirección:')
          .parent()
          .within(() => {
            cy.findByText('Calle 123');
          });
        cy.findByText('Barrio:')
          .parent()
          .within(() => {
            cy.findByText('Barrio 123');
          });
        cy.findByText('Celular:')
          .parent()
          .within(() => {
            cy.findByText('3123456789');
          });
        cy.findByText('Teléfono:')
          .parent()
          .within(() => {
            cy.findByText('No registra');
          });
        cy.findByText('Correo:')
          .parent()
          .within(() => {
            cy.findByText('john.doe@gmail.com');
          });
        cy.findByText('Ocupación o profesión:')
          .parent()
          .within(() => {
            cy.findByText('Profesor');
          });
        cy.findByText('Nivel educativo:')
          .parent()
          .within(() => {
            cy.findByText('Técnica');
          });
        cy.findByText('Estrato:')
          .parent()
          .within(() => {
            cy.findByText('4');
          });
      });
    });

    cy.findByTestId('family-relationship').within(() => {
      cy.findByRole('heading', {
        name: 'Relación familiar',
      });
      cy.findByText('Vive con:');
      cy.findByRole('list').within(() => {
        cy.findByRole('listitem').contains('Padres');
      });
      cy.findByText('Relación entre los padres:')
        .parent()
        .within(() => {
          cy.findByText('Casados');
        });
    });

    cy.findByTestId('documents').within(() => {
      cy.findByRole('heading', {
        name: 'Documentos',
      });
      cy.findByRole('button', { name: 'Abrir documento PDF' });
    });

    cy.findByTestId('authorized-persons').within(() => {
      cy.findByRole('heading', {
        name: 'Personas autorizadas para recoger al estudiante',
      });
      cy.findByText('Los padres son las únicas personas autorizadas.');
    });

    cy.findByRole('button', { name: /close/i }).click();

    cy.findAllByRole('button', { name: 'Ver' }).eq(1).click();
    cy.findByTestId('authorized-persons').within(() => {
      cy.findByRole('heading', {
        name: 'Personas autorizadas para recoger al estudiante',
      });
      cy.findByText('Nombre:')
        .parent()
        .within(() => {
          cy.findByText('Foo Bar');
        });
      cy.findByText('Celular:')
        .parent()
        .within(() => {
          cy.findByText('3123456789');
        });
    });
  });
});
