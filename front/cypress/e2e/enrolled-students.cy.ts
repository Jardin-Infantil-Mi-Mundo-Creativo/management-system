import {
  getEnrollmentsResponse,
  updateEnrollmentResponse,
} from '../fixtures/enrolled-students';

describe('enrolled students', () => {
  function checkTableStructure() {
    cy.findByRole('columnheader', { name: 'Documento del estudiante' });
    cy.findByRole('columnheader', { name: 'Nombre' });
    cy.findByRole('columnheader', { name: 'Grado' });
    cy.findByRole('columnheader', { name: 'Acciones' });
    cy.findAllByRole('columnheader').should('have.length', 4);

    cy.findAllByRole('row').should('have.length.greaterThan', 0);
  }

  const enrollmentStates = ['draft', 'completed'];

  describe('tables', () => {
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
          cy.findAllByRole('row').should('have.length', 3).as('rows');

          cy.get('@rows')
            .eq(1)
            .within(() => {
              cy.findByRole('cell', { name: '123456789' });
              cy.findByRole('cell', { name: 'John Doe' });
              cy.findByRole('cell', { name: 'Caminadores' });
              cy.findByRole('cell', { name: 'Ver Eliminar' }).within(() => {
                cy.findByRole('button', { name: 'Ver' });
                cy.findByRole('button', { name: 'Eliminar' });
              });
            });

          cy.get('@rows')
            .eq(2)
            .within(() => {
              cy.findByRole('cell', { name: '987654321' });
              cy.findByRole('cell', { name: 'Jane Doe' });
              cy.findByRole('cell', { name: 'Caminadores' });
              cy.findByRole('cell', { name: 'Ver Eliminar' }).within(() => {
                cy.findByRole('button', { name: 'Ver' });
                cy.findByRole('button', { name: 'Eliminar' });
              });
            });
        });
      });
    });

    it('it should displays tables informing no data', () => {
      cy.intercept('GET', 'http://localhost:8080/enrollments/', {
        body: [],
      });
      cy.visit('/');

      enrollmentStates.forEach((state) => {
        cy.findByTestId(`${state}-enrollments-table`).within(() => {
          checkTableStructure();
          cy.findAllByRole('row').should('have.length', 2).as('rows');
          cy.get('@rows')
            .eq(1)
            .within(() => {
              cy.findByRole('cell', {
                name: 'En este momento no hay datos registrados de este tipo',
              });
            });
        });
      });
    });

    it.only('should allow remove draft and completed enrollments', () => {
      let hasDeletedCompletedEnrollment = false;
      let hasDeletedDraftEnrollment = false;
      cy.intercept(
        'DELETE',
        'http://localhost:8080/enrollments/jxwi1KU0tT8jXapfN40op',
        {
          statusCode: 200,
        }
      );
      cy.intercept('GET', 'http://localhost:8080/enrollments/', (req) => {
        req.reply({
          statusCode: 200,
          body: [
            ...[
              hasDeletedCompletedEnrollment
                ? getEnrollmentsResponse[0]
                : getEnrollmentsResponse[0],
              getEnrollmentsResponse[1],
            ],
            ...[
              hasDeletedDraftEnrollment
                ? getEnrollmentsResponse[2]
                : getEnrollmentsResponse[2],
              getEnrollmentsResponse[3],
            ],
          ],
        });
      });
      cy.visit('/');

      enrollmentStates.forEach((state) => {
        cy.findByTestId(`${state}-enrollments-table`).within(() => {
          cy.findAllByRole('row').should('have.length', 3).as('rows');
          cy.findAllByRole('button', { name: 'Eliminar' }).as('deleteButtons');
          cy.get('@deleteButtons').should('have.length', 2);
          cy.get('@deleteButtons').first().click();
        });

        cy.findByRole('dialog', { name: 'Eliminar matrícula' });
        cy.findByText('¿Está seguro de eliminar la matrícula del estudiante')
          .parent()
          .within(() => {
            cy.findByText('John Doe');
          });

        cy.findByRole('button', { name: 'Cancelar' }).click();
        cy.findByRole('dialog', { name: 'Eliminar matrícula' }).should(
          'not.exist'
        );

        enrollmentStates.forEach((state) => {
          cy.findByTestId(`${state}-enrollments-table`).within(() => {
            cy.findAllByRole('button', { name: 'Eliminar' }).as(
              'deleteButtons'
            );
            cy.get('@deleteButtons').should('have.length', 2);
            cy.get('@deleteButtons').first().click();
          });

          cy.findByRole('dialog', { name: 'Eliminar matrícula' });
          cy.findByRole('button', { name: 'Eliminar' }).click();
          cy.findByRole('dialog', { name: 'Eliminar matrícula' }).should(
            'not.exist'
          );
          cy.findByRole('dialog', { name: 'Matrícula eliminada exitosamente' });
          cy.findByText('La matrícula se ha eliminado exitosamente.');
          cy.findByRole('button', { name: 'Entendido' }).click();

          enrollmentStates.forEach((state) => {
            cy.findByTestId(`${state}-enrollments-table`).within(() => {
              cy.findAllByRole('button', { name: 'Eliminar' }).as(
                'deleteButtons'
              );
              cy.get('@deleteButtons').should('have.length', 1);
            });
          });
        });
      });
    });
  });

  describe('enrollment details', () => {
    it('should display enrollment details with expected elements', () => {
      cy.intercept(
        'GET',
        'http://localhost:8080/enrollments/',
        getEnrollmentsResponse
      );
      cy.visit('/');

      const parents = ['mother', 'father'];

      enrollmentStates.forEach((state) => {
        cy.findByTestId(`${state}-enrollments-table`).within(() => {
          cy.findAllByRole('button', { name: 'Ver' }).first().click();
        });

        cy.findByRole('dialog', { name: 'Matrícula' });

        if (state === 'completed') {
          cy.findByRole('form').should('not.exist');
        } else {
          cy.findByRole('form');
        }

        cy.findByTestId('header').within(() => {
          cy.findByRole('heading', {
            name: 'Información personal del estudiante',
          });

          if (state === 'completed') {
            cy.findByRole('button', {
              name: 'Subir foto del estudiante Arrastra y suelta o haz clic',
            }).should('not.exist');
            cy.findByRole('link');
          } else {
            cy.findByRole('button', {
              name: 'Subir foto del estudiante Arrastra y suelta o haz clic',
            });
            cy.findByRole('link').should('not.exist');
          }

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
          if (state === 'completed') {
            cy.findByRole('button', {
              name: 'Subir archivo PDF Arrastra y suelta o haz clic para seleccionar',
            }).should('not.exist');
            cy.findByRole('button', { name: 'Abrir documento PDF' });
          } else {
            cy.findByRole('button', {
              name: 'Subir archivo PDF Arrastra y suelta o haz clic para seleccionar',
            });
            cy.findByRole('button', { name: 'Abrir documento PDF' }).should(
              'not.exist'
            );
          }
        });

        cy.findByTestId('authorized-persons').within(() => {
          cy.findByRole('heading', {
            name: 'Personas autorizadas para recoger al estudiante',
          });
          cy.findByText('Los padres son las únicas personas autorizadas.');
        });

        cy.findByRole('button', { name: /close/i }).click();

        cy.findByTestId(`${state}-enrollments-table`).within(() => {
          cy.findAllByRole('button', { name: 'Ver' }).eq(1).click();
        });

        cy.findByRole('dialog', { name: 'Matrícula' });

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

        if (state === 'completed') {
          cy.findByRole('button', { name: 'Completar matricula' }).should(
            'not.exist'
          );
        } else {
          cy.findByRole('button', { name: 'Completar matricula' });
        }

        cy.findByRole('button', { name: /close/i }).click();
      });
    });

    it('should display form errors', () => {
      cy.intercept(
        'GET',
        'http://localhost:8080/enrollments/',
        getEnrollmentsResponse
      );
      cy.visit('/');

      cy.findByTestId('draft-enrollments-table').within(() => {
        cy.findAllByRole('button', { name: 'Ver' }).first().click();
      });
      cy.findByRole('button', { name: 'Completar matricula' }).click();

      cy.findByText('La foto del estudiante es requerida');
      cy.findByText('El documento de adjuntos es requerido');
      cy.findAllByTestId('form-error-message').should('have.length', 2);
    });

    it('should allow complete enrollment', () => {
      let hasCompletedEnrollment = false;
      cy.intercept('GET', 'http://localhost:8080/enrollments/', (req) => {
        if (hasCompletedEnrollment) {
          req.reply({
            statusCode: 200,
            body: [
              getEnrollmentsResponse[0],
              getEnrollmentsResponse[1],
              getEnrollmentsResponse[2],
              {
                ...getEnrollmentsResponse[3],
                state: 'completed',
                documentsFile: getEnrollmentsResponse[0].documentsFile,
                studentPhoto: getEnrollmentsResponse[0].studentPhoto,
              },
            ],
          });
        } else {
          req.reply({
            statusCode: 200,
            body: getEnrollmentsResponse,
          });
        }
      });
      cy.intercept(
        'PUT',
        'http://localhost:8080/enrollments/jxwi1KU0tT8jXapfN40op',
        (req) => {
          hasCompletedEnrollment = true;
          req.reply({
            statusCode: 200,
            body: updateEnrollmentResponse,
          });
        }
      );
      cy.visit('/');

      cy.findByTestId('draft-enrollments-table').within(() => {
        cy.findAllByRole('row').should('have.length', 3);
      });

      cy.findByTestId('completed-enrollments-table').within(() => {
        cy.findAllByRole('row').should('have.length', 3);
      });

      cy.findByTestId('draft-enrollments-table').within(() => {
        cy.findAllByRole('button', { name: 'Ver' }).first().click();
      });
      cy.findByRole('dialog', { name: 'Matrícula' });

      cy.uploadEnrollmentPicture();
      cy.uploadEnrollmentFile();

      cy.findByRole('button', { name: 'Completar matricula' }).click();
      cy.findByRole('dialog', { name: 'Matrícula' }).should('not.exist');

      cy.findByRole('dialog', { name: 'Información actualizada exitosamente' });
      cy.findByText('El registro del estudiante se encuentra completado.');
      cy.findByRole('button', { name: 'Entendido' }).click();
      cy.findByRole('dialog', {
        name: 'Información actualizada exitosamente',
      }).should('not.exist');

      cy.findByTestId('draft-enrollments-table').within(() => {
        cy.findAllByRole('row').should('have.length', 2);
      });

      cy.findByTestId('completed-enrollments-table').within(() => {
        cy.findAllByRole('row').should('have.length', 4);
      });
    });

    it('should inform completion failure', () => {
      cy.intercept(
        'GET',
        'http://localhost:8080/enrollments/',
        getEnrollmentsResponse
      );
      cy.intercept(
        'PUT',
        'http://localhost:8080/enrollments/jxwi1KU0tT8jXapfN40op',
        {
          statusCode: 500,
        }
      );
      cy.visit('/');

      cy.findByTestId('draft-enrollments-table').within(() => {
        cy.findAllByRole('button', { name: 'Ver' }).first().click();
      });

      cy.uploadEnrollmentPicture();
      cy.uploadEnrollmentFile();
      cy.findByRole('button', { name: 'Completar matricula' }).click();

      cy.findByRole('dialog', {
        name: 'Hubo un error al actualizar la información',
      });
      cy.findByText('Por favor intente nuevamente o contacte soporte.');
      cy.findByRole('button', { name: 'Entendido' }).click();
      cy.findByRole('dialog', {
        name: 'Hubo un error al actualizar la información',
      }).should('not.exist');
    });
  });
});
