import { postEnrollmentResponse } from '../fixtures/enrollment';

describe('enrollment form', () => {
  beforeEach(() => {
    cy.visit('/matricular-estudiante');
  });

  const parents = ['mother', 'father'];

  const fillForm = () => {
    cy.findByTestId('picture-file-upload').selectFile(
      {
        contents: Cypress.Buffer.from('fake image content'),
        fileName: 'student.jpg',
        mimeType: 'image/jpeg',
      },
      { force: true }
    );
    cy.findByTestId('pdf-file-upload').selectFile(
      {
        contents: Cypress.Buffer.from('fake pdf content'),
        fileName: 'documents.pdf',
        mimeType: 'application/pdf',
      },
      { force: true }
    );

    cy.findByTestId('personal-student-info').within(() => {
      cy.findByRole('textbox', { name: 'Nombre completo:' }).type('John Doe');
      cy.findByRole('button', { name: 'Fecha de nacimiento:' }).click();
    });
    cy.findByRole('combobox', { name: /choose the month/i }).select('Nov');
    cy.findByRole('combobox', { name: /choose the year/i }).select('2003');
    cy.findByRole('button', { name: /Friday, November 28th, 2003/i }).click();
    cy.findByTestId('personal-student-info').within(() => {
      cy.findByRole('textbox', { name: 'Ciudad de nacimiento:' }).type(
        'Bogota'
      );
      cy.findByRole('textbox', { name: 'N° Registro Civil:' }).type(
        '123456789'
      );
    });

    cy.findByRole('combobox', {
      name: 'Presenta alguna discapacidad:',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();
    cy.findByRole('combobox', {
      name: 'Presenta algún trastorno:',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();
    cy.findByRole('combobox', {
      name: 'Asiste a terapia(s):',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();
    cy.findByRole('combobox', {
      name: 'Tiene SISBEN:',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();
    cy.findByRole('textbox', { name: 'E.P.S:' }).type('Salud Total');
    cy.findByRole('combobox', {
      name: 'Tipo de sangre:',
    }).click();
    cy.findByRole('option', { name: 'A+' }).click();
    cy.findByRole('combobox', {
      name: 'Tiene alergias:',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();
    cy.findByRole('combobox', {
      name: 'Tiene enuresis:',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();
    cy.findByRole('combobox', {
      name: 'Tiene encopresis:',
    }).click();
    cy.findByRole('option', { name: 'No' }).click();

    parents.forEach((parent) => {
      cy.findByTestId(parent).within(() => {
        cy.findByRole('textbox', { name: 'Nombre completo:' }).type('John Doe');
        cy.findByRole('button', { name: 'Fecha de nacimiento:' }).click();
      });
      cy.findByRole('combobox', { name: /choose the month/i }).select('Nov');
      cy.findByRole('combobox', { name: /choose the year/i }).select('2003');
      cy.findByRole('button', { name: /Friday, November 28th, 2003/i }).click();
      cy.findByTestId(parent).within(() => {
        cy.findByRole('textbox', { name: 'Número de cédula:' }).type(
          '123456789'
        );
        cy.findByRole('textbox', { name: 'Dirección:' }).type('Calle 123');
        cy.findByRole('textbox', { name: 'Barrio:' }).type('Barrio 123');
        cy.findByRole('textbox', { name: 'Celular:' }).type('3123456789');
        cy.findByRole('textbox', { name: 'Correo:' }).type(
          'john.doe@gmail.com'
        );
        cy.findByRole('textbox', { name: 'Ocupación o profesión:' }).type(
          'Profesor'
        );
        cy.findByRole('combobox', {
          name: 'Nivel educativo:',
        }).click();
      });
      cy.findByRole('option', { name: 'Técnica' }).click();
      cy.findByTestId(parent).within(() => {
        cy.findByRole('combobox', { name: 'Estrato:' }).click();
      });
      cy.findByRole('option', { name: '4' }).click();
    });

    cy.findByRole('checkbox', { name: 'Padres' }).click();
    cy.findByRole('combobox', {
      name: 'Los padres son:',
    }).click();
    cy.findByRole('option', { name: 'Casados' }).click();

    cy.findByRole('combobox', {
      name: 'Es estudiante antiguo:',
    }).click();
    cy.findByRole('option', { name: 'Sí' }).click();
    cy.findByRole('combobox', {
      name: 'Grado al que ingresa:',
    }).click();
    cy.findByRole('option', { name: 'Caminadores' }).click();
  };

  describe('rendering', () => {
    it('should display elements and form inputs correctly', () => {
      function checkFormHeaderSection() {
        // institution logo
        cy.findByRole('link', { name: 'institution logo' }).within(() => {
          cy.findByRole('img');
        });

        // institution information
        cy.findByRole('heading', {
          name: 'Jardín Infantil Mi Mundo Creativo',
          level: 1,
        });
        cy.findByText(
          '"Educación con VALORES y manejo de las EMOCIONES para la vida"'
        );
        cy.findByText('Licencia de Funcionamiento 000028 del 24 de enero 2024');
        cy.findByText('Código DANE N° 32000180049');

        // photo input
        cy.findByRole('button', {
          name: 'Subir foto del estudiante Arrastra y suelta o haz clic',
        });
        cy.get('svg.lucide-upload');

        cy.findByRole('heading', { name: 'LIBRO DE MATRICULA' });
      }

      function checkPersonalStudentInfoSection() {
        cy.findByTestId('personal-student-info').within(() => {
          cy.findByRole('heading', {
            name: 'Información personal del estudiante',
          });
          cy.findByRole('textbox', { name: 'Nombre completo:' });
          cy.findByRole('button', { name: 'Fecha de nacimiento:' });
          cy.findByRole('textbox', { name: 'Años:' }).should('be.disabled');
          cy.findByRole('textbox', { name: 'Meses:' }).should('be.disabled');
          cy.findByRole('textbox', { name: 'Ciudad de nacimiento:' });
          cy.findByRole('textbox', { name: 'N° Registro Civil:' });
        });
      }

      function checkPersonalStudentHealthDisabilitiesSection() {
        // checkboxes and "others" text input are not visible when the combobox is not selected
        cy.findByRole('checkbox', {
          name: 'Física',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Auditiva',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Otra(s)',
        }).should('not.exist');
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');

        //checkboxes are visible when the combobox has value "yes"
        cy.findByRole('combobox', {
          name: 'Presenta alguna discapacidad:',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();
        cy.findByRole('checkbox', {
          name: 'Física',
        });
        cy.findByRole('checkbox', {
          name: 'Auditiva',
        });

        // others text input is visible only when the "others" checkbox is selected
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Otra(s)',
        }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' });

        // others text input is hidden again when the "others" checkbox is unselected
        cy.findByRole('checkbox', {
          name: 'Otra(s)',
        }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');
        cy.findByRole('combobox', {
          name: 'Presenta alguna discapacidad:',
        }).click();

        // checkboxes are hidden again when the combobox has value "no"
        cy.findByRole('option', { name: 'No' }).click();
        cy.findByRole('checkbox', {
          name: 'Física',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Auditiva',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Otra(s)',
        }).should('not.exist');
      }

      function checkPersonalStudentHealthDisordersSection() {
        // checkboxes and "others" text input are not visible when the combobox is not selected
        cy.findByRole('checkbox', {
          name: 'Autismo',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Síndrome de Down',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Conductual',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Lenguaje',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Hiperactividad',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Atención',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Ansiedad',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Otro(s)',
        }).should('not.exist');
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');

        // checkboxes are visible when the combobox has value "yes"
        cy.findByRole('combobox', {
          name: 'Presenta algún trastorno:',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();
        cy.findByRole('checkbox', {
          name: 'Autismo',
        });
        cy.findByRole('checkbox', {
          name: 'Síndrome de Down',
        });
        cy.findByRole('checkbox', {
          name: 'Conductual',
        });
        cy.findByRole('checkbox', {
          name: 'Lenguaje',
        });
        cy.findByRole('checkbox', {
          name: 'Hiperactividad',
        });
        cy.findByRole('checkbox', {
          name: 'Atención',
        });
        cy.findByRole('checkbox', {
          name: 'Ansiedad',
        });

        // "others" text input is visible only when the "others" checkbox is selected
        cy.findByRole('checkbox', {
          name: 'Otro(s)',
        }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' });

        // "others" text input is hidden again when the "others" checkbox is unselected
        cy.findByRole('checkbox', {
          name: 'Otro(s)',
        }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');

        // checkboxes are hidden again when the combobox has value "no"
        cy.findByRole('combobox', {
          name: 'Presenta algún trastorno:',
        }).click();
        cy.findByRole('option', { name: 'No' }).click();
        cy.findByRole('checkbox', {
          name: 'Autismo',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Síndrome de Down',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Conductual',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Lenguaje',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Hiperactividad',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Atención',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Ansiedad',
        }).should('not.exist');
        cy.findByRole('checkbox', {
          name: 'Otro(s)',
        }).should('not.exist');
      }

      function checkPersonalStudentHealthTherapiesSection() {
        // text input is not visible when the combobox is not selected
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');
        cy.findByRole('combobox', {
          name: 'Asiste a terapia(s):',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' });

        // text input is hidden again when the combobox has value "no"
        cy.findByRole('combobox', {
          name: 'Asiste a terapia(s):',
        }).click();
        cy.findByRole('option', { name: 'No' }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');
      }

      function checkStudentHealthSection() {
        cy.findByRole('heading', { name: 'Salud del estudiante' });
        checkPersonalStudentHealthDisabilitiesSection();
        checkPersonalStudentHealthDisordersSection();
        checkPersonalStudentHealthTherapiesSection();

        cy.findByRole('combobox', {
          name: 'Tiene SISBEN:',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();

        cy.findByRole('textbox', { name: 'E.P.S:' });

        cy.findByRole('combobox', {
          name: 'Tipo de sangre:',
        }).click();
        cy.findByRole('option', { name: 'A+' });
        cy.findByRole('option', { name: 'A-' });
        cy.findByRole('option', { name: 'B+' });
        cy.findByRole('option', { name: 'B-' });
        cy.findByRole('option', { name: 'AB+' });
        cy.findByRole('option', { name: 'AB-' });
        cy.findByRole('option', { name: 'O+' });
        cy.findByRole('option', { name: 'O-' }).click();

        // text input is not visible when the combobox is not selected
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');
        cy.findByRole('combobox', {
          name: 'Tiene alergias:',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' });
        // text input is hidden again when the combobox has value "no"
        cy.findByRole('combobox', {
          name: 'Tiene alergias:',
        }).click();
        cy.findByRole('option', { name: 'No' }).click();
        cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('not.exist');

        cy.findByRole('combobox', {
          name: 'Tiene enuresis:',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();

        cy.findByRole('combobox', {
          name: 'Tiene encopresis:',
        }).click();
        cy.findByRole('option', { name: 'No' });
        cy.findByRole('option', { name: 'Sí' }).click();
      }

      function checkParentSection(parent: string) {
        cy.findByTestId(parent).within(() => {
          cy.findByRole('heading', {
            name:
              parent === 'mother'
                ? 'Información de la madre'
                : 'Información del padre',
          });

          cy.findByRole('textbox', {
            name: 'Nombre completo:',
          });
          cy.findByRole('button', {
            name: 'Fecha de nacimiento:',
          });
          cy.findByRole('textbox', {
            name: 'Años:',
          }).should('be.disabled');
          cy.findByRole('textbox', { name: 'Número de cédula:' });
          cy.findByRole('textbox', {
            name: 'Dirección:',
          });
          cy.findByRole('textbox', {
            name: 'Barrio:',
          });
          cy.findByRole('textbox', {
            name: 'Celular:',
          });
          cy.findByRole('textbox', {
            name: 'Teléfono:',
          });
          cy.findByRole('textbox', {
            name: 'Ocupación o profesión:',
          });
          cy.findByRole('combobox', {
            name: 'Nivel educativo:',
          }).click();
        });

        cy.findByRole('option', {
          name: 'Primaria',
        });
        cy.findByRole('option', {
          name: 'Secundaria',
        });
        cy.findByRole('option', {
          name: 'Técnica',
        });
        cy.findByRole('option', {
          name: 'Universitario',
        }).click();

        cy.findByTestId(parent).within(() => {
          cy.findAllByRole('combobox', {
            name: 'Estrato:',
          }).click();
        });
        cy.findByRole('option', {
          name: '1',
        });
        cy.findByRole('option', {
          name: '2',
        });
        cy.findByRole('option', {
          name: '3',
        });
        cy.findByRole('option', {
          name: '4',
        });
        cy.findByRole('option', {
          name: '5',
        });
        cy.findByRole('option', {
          name: '6',
        }).click();
      }

      function checkFamilyRelationshipSection() {
        cy.findByRole('heading', {
          name: 'Relación familiar',
        });

        cy.findByText('Vive con:');
        cy.findByRole('checkbox', {
          name: 'Padres',
        });
        cy.findByRole('checkbox', {
          name: 'Hermanos',
        });
        cy.findByRole('checkbox', {
          name: 'Abuelos',
        });
        cy.findByRole('checkbox', {
          name: 'Tíos',
        });
        cy.findByRole('checkbox', {
          name: 'Padrastro',
        });
        cy.findByRole('checkbox', {
          name: 'Madrastra',
        });

        cy.findByRole('combobox', {
          name: 'Los padres son:',
        }).click();
        cy.findByRole('option', { name: 'Casados' });
        cy.findByRole('option', { name: 'Unión libre' });
        cy.findByRole('option', { name: 'Madre soltera' });
        cy.findByRole('option', { name: 'Separados' }).click();
      }

      function checkEnrollmentSection() {
        cy.findByRole('heading', {
          name: 'Matrícula',
        });

        cy.findByRole('textbox', { name: 'Fecha de matricula:' }).should(
          'be.disabled'
        );

        // conditional fields are not visible in the first render
        cy.findByRole('combobox', {
          name: 'Primera vez que asiste a un jardín:',
        }).should('not.exist');
        cy.findByRole('textbox', {
          name: 'Nombre de la entidad escolar a la que asistió:',
        }).should('not.exist');

        // isFirstTime should be visible only when the user selects "No" in the isOldStudent combobox
        cy.findByRole('combobox', {
          name: 'Es estudiante antiguo:',
        }).click();
        cy.findByRole('option', { name: 'Sí' });
        cy.findByRole('option', { name: 'No' }).click();

        // previousSchoolName should be visible only when the user selects "No" in the isFirstTime combobox
        cy.findByRole('textbox', {
          name: 'Nombre de la entidad escolar a la que asistió:',
        }).should('not.exist');
        cy.findByRole('combobox', {
          name: 'Primera vez que asiste a un jardín:',
        }).click();
        cy.findByRole('option', { name: 'Sí' });
        cy.findByRole('option', { name: 'No' }).click();
        cy.findByRole('textbox', {
          name: 'Nombre de la entidad escolar a la que asistió:',
        });

        // previousSchoolName should hidden again when the user selects "Sí" in the isFirstTime combobox
        cy.findByRole('combobox', {
          name: 'Primera vez que asiste a un jardín:',
        }).click();
        cy.findByRole('option', { name: 'Sí' }).click();
        cy.findByRole('textbox', {
          name: 'Nombre de la entidad escolar a la que asistió:',
        }).should('not.exist');

        // isFirstTime should be hidden again when the user selects "Sí" in the isOldStudent combobox
        cy.findByRole('combobox', {
          name: 'Es estudiante antiguo:',
        }).click();
        cy.findByRole('option', { name: 'Sí' }).click();
        cy.findByRole('combobox', {
          name: 'Primera vez que asiste a un jardín:',
        }).should('not.exist');

        cy.findByRole('combobox', {
          name: 'Grado al que ingresa:',
        }).click();
        cy.findByRole('option', { name: 'Caminadores' });
        cy.findByRole('option', { name: 'Párvulos' });
        cy.findByRole('option', { name: 'Pre jardín' });
        cy.findByRole('option', { name: 'Jardín' });
        cy.findByRole('option', { name: 'Transición' });
        cy.findByRole('option', { name: 'Primero' }).click();
      }

      function checkDocumentsSection() {
        cy.findByRole('heading', {
          name: 'Documentos',
        });

        cy.findByRole('button', {
          name: 'Subir archivo PDF Arrastra y suelta o haz clic para seleccionar',
        });
        cy.get('svg.lucide-file-text');
      }

      function checkAuthorizedPersonsSection() {
        cy.findByTestId('authorized-persons').within(() => {
          cy.findByRole('heading', {
            name: 'Personas autorizadas para recoger al estudiante',
          });

          cy.findByText('Diferentes a los padres');

          cy.findByRole('button', {
            name: 'Agregar persona',
          });
          cy.findByRole('button', {
            name: 'Agregar persona',
          }).click();
          cy.findByRole('button', {
            name: 'Agregar persona',
          }).click();

          cy.findAllByRole('textbox', {
            name: 'Nombre completo:',
          });

          cy.findAllByRole('textbox', {
            name: 'Celular:',
          });

          cy.get('svg.lucide-x').each((x) => {
            cy.wrap(x).parent().click();
          });
        });
      }

      function checkFooterSection() {
        cy.findByText(
          'ACEPTAMOS LAS NORMAS DEL JARDÍN Y NOS COMPROMETEMOS A CUMPLIR'
        );
        cy.findByText('Dirección: Manzana A casa 18 Maria Camila Sur');
        cy.findByText('Teléfono: 5884200');
        cy.findByText('Celular: 3118816946');
        cy.findByRole('button', { name: 'Guardar como borrador' });
        cy.findByText(
          'Una matricula se publica como borrador si no se sube la foto del estudiante ni los documentos, se debe completar más adelante'
        );
        cy.findByTestId('picture-file-upload').selectFile(
          {
            contents: Cypress.Buffer.from('fake image content'),
            fileName: 'student.jpg',
            mimeType: 'image/jpeg',
          },
          { force: true }
        );
        cy.findByTestId('pdf-file-upload').selectFile(
          {
            contents: Cypress.Buffer.from('fake pdf content'),
            fileName: 'documents.pdf',
            mimeType: 'application/pdf',
          },
          { force: true }
        );
        cy.findByRole('button', { name: 'Matricular estudiante' });
        cy.findByText(
          'Una matricula se publica como borrador si no se sube la foto del estudiante ni los documentos, se debe completar más adelante'
        ).should('not.exist');
      }

      checkFormHeaderSection();
      checkPersonalStudentInfoSection();
      checkStudentHealthSection();
      parents.forEach((parent) => {
        checkParentSection(parent);
      });
      checkFamilyRelationshipSection();
      checkEnrollmentSection();
      checkDocumentsSection();
      checkAuthorizedPersonsSection();
      checkFooterSection();
    });

    // test to ensure all fields are tested so this fails in case a new field is added without adding the corresponding test
    it('should display correct amount of elements', () => {
      cy.findByTestId('personal-student-info').within(() => {
        // no fields to expand here
        cy.findAllByRole('textbox').should('have.length', 5);
        cy.findAllByRole('button').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 6);
      });

      cy.findByTestId('student-health').within(() => {
        // check amount of elements before touching the section
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 9);
      });

      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);

      cy.findByRole('option', {
        name: 'Sí',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting yes for hasDisability
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 3);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 12);
      });

      cy.findByRole('checkbox', {
        name: 'Otra(s)',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after checking others checkbox
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 3);
        cy.findAllByRole('textbox').should('have.length', 2);
        cy.findAllByTestId('input').should('have.length', 13);
      });

      cy.findByRole('checkbox', {
        name: 'Otra(s)',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after unchecking others checkbox
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 3);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 12);
      });

      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', {
        name: 'No',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting no for hasDisability
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 9);
      });

      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', {
        name: 'Sí',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting yes for hasDisorders
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 8);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 17);
      });

      cy.findByRole('checkbox', {
        name: 'Otro(s)',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after checking others checkbox
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 8);
        cy.findAllByRole('textbox').should('have.length', 2);
        cy.findAllByTestId('input').should('have.length', 18);
      });

      cy.findByRole('checkbox', {
        name: 'Otro(s)',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after unchecking others checkbox
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 8);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 17);
      });

      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', {
        name: 'No',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting no for hasDisorders
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 9);
      });

      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', {
        name: 'Sí',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting yes for hasTherapies
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 2);
        cy.findAllByTestId('input').should('have.length', 10);
      });

      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', {
        name: 'No',
      }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting no for hasTherapies
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 9);
      });

      cy.findByRole('combobox', {
        name: 'Tiene SISBEN:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByTestId('student-health').within(() => {
        // check amount of elements after selecting no for hasSisben
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 9);
      });

      cy.findByRole('combobox', {
        name: 'Tiene SISBEN:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', { name: 'Sí' }).click();

      cy.findByRole('combobox', {
        name: 'Tipo de sangre:',
      }).click();
      cy.findAllByRole('option').should('have.length', 8);
      cy.findByRole('option', { name: 'A+' }).click();

      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', {
        name: 'Sí',
      }).click();

      cy.findByRole('combobox', {
        name: 'Tiene enuresis:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', { name: 'No' }).click();

      cy.findByRole('combobox', {
        name: 'Tiene encopresis:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', { name: 'No' }).click();

      parents.forEach((parent) => {
        cy.findByTestId(parent).within(() => {
          // no new fields to expand here
          cy.findAllByRole('textbox').should('have.length', 9);
          cy.findAllByRole('button').should('have.length', 1);
          cy.findAllByRole('combobox').should('have.length', 2);
          cy.findAllByTestId('input').should('have.length', 12);
        });

        cy.findByTestId(parent).within(() => {
          cy.findByRole('combobox', {
            name: 'Nivel educativo:',
          }).click();
        });
        cy.findAllByRole('option').should('have.length', 4);
        cy.findByRole('option', { name: 'Primaria' }).click();

        cy.findByTestId(parent).within(() => {
          cy.findByRole('combobox', {
            name: 'Estrato:',
          }).click();
        });
        cy.findAllByRole('option').should('have.length', 6);
        cy.findByRole('option', { name: '1' }).click();
      });

      cy.findByTestId('family-relationship').within(() => {
        // no new fields to expand here
        cy.findAllByRole('checkbox').should('have.length', 6);
        cy.findAllByRole('combobox').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 7);
      });

      cy.findByRole('combobox', {
        name: 'Los padres son:',
      }).click();
      cy.findAllByRole('option').should('have.length', 4);
      cy.findByRole('option', { name: 'Casados' }).click();

      // check amount of elements before touching the section
      cy.findByTestId('enrollment').within(() => {
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByRole('combobox').should('have.length', 2);
        cy.findAllByTestId('input').should('have.length', 3);
      });
      // expand fields phase 1
      cy.findByRole('combobox', { name: 'Es estudiante antiguo:' }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', { name: 'No' }).click();
      // check amount of elements after touching the section
      cy.findByTestId('enrollment').within(() => {
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByRole('combobox').should('have.length', 3);
        cy.findAllByTestId('input').should('have.length', 4);
      });
      // expand fields phase 2
      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      }).click();
      cy.findAllByRole('option').should('have.length', 2);
      cy.findByRole('option', { name: 'No' }).click();
      // check amount of elements after touching the section
      cy.findByTestId('enrollment').within(() => {
        cy.findAllByRole('textbox').should('have.length', 2);
        cy.findAllByRole('combobox').should('have.length', 3);
        cy.findAllByTestId('input').should('have.length', 5);
      });
      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByTestId('enrollment').within(() => {
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByRole('combobox').should('have.length', 3);
        cy.findAllByTestId('input').should('have.length', 4);
      });
      cy.findByRole('combobox', { name: 'Es estudiante antiguo:' }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByTestId('enrollment').within(() => {
        cy.findAllByRole('textbox').should('have.length', 1);
        cy.findAllByRole('combobox').should('have.length', 2);
        cy.findAllByTestId('input').should('have.length', 3);
      });

      cy.findByRole('combobox', {
        name: 'Grado al que ingresa:',
      }).click();
      cy.findAllByRole('option').should('have.length', 6);
      cy.findByRole('option', { name: 'Caminadores' }).click();

      cy.findByTestId('documents').within(() => {
        // no new fields to expand here
        cy.findAllByLabelText('Archivos adjuntos').should('have.length', 1);
      });

      cy.findByTestId('authorized-persons').within(() => {
        // check amount of elements before touching the section
        cy.findAllByRole('button').should('have.length', 1);
        cy.findAllByRole('textbox').should('have.length', 0);
        cy.get('svg.lucide-x').should('have.length', 0);
        cy.findAllByTestId('input').should('have.length', 0);

        // expand fields
        cy.findByRole('button', {
          name: 'Agregar persona',
        }).click();

        // check amount of elements after touching the section
        cy.findAllByRole('textbox').should('have.length', 2);
        cy.findAllByRole('button').should('have.length', 2);
        cy.get('svg.lucide-x').should('have.length', 1);
        cy.findAllByTestId('input').should('have.length', 2);

        // remove the person and check again
        cy.get('svg.lucide-x').each((x) => {
          cy.wrap(x).parent().click();
        });
        cy.findAllByRole('textbox').should('have.length', 0);
        cy.findAllByRole('button').should('have.length', 1);
        cy.get('svg.lucide-x').should('have.length', 0);
        cy.findAllByTestId('input').should('have.length', 0);
      });
    });
  });

  describe('validations', () => {
    it('should display initial error messages', () => {
      cy.findByRole('button', { name: 'Agregar persona' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.findByTestId('personal-student-info').within(() => {
        cy.findByText('El nombre es requerido');
        cy.findByText('La fecha de nacimiento es requerida');
        cy.findByText('La ciudad de nacimiento es requerida');
        cy.findByText('El N° Registro Civil es requerido');

        // no new fields to expand here
        cy.findAllByTestId('form-error-message').should('have.length', 4);
      });

      cy.findByTestId('student-health').within(() => {
        cy.findByText('Indique si el estudiante presenta alguna discapacidad');
        cy.findByText('Indique si el estudiante presenta algún trastorno');
        cy.findByText('Indique si el estudiante asiste a terapia(s)');
        cy.findByText('Indique si el estudiante tiene SISBEN');
        cy.findByText('La E.P.S es requerida');
        cy.findByText('Seleccione el tipo de sangre');
        cy.findByText('Indique si el estudiante tiene alergias');
        cy.findByText('Indique si el estudiante presenta enuresis');
        cy.findByText('Indique si el estudiante presenta encopresis');
        cy.findAllByTestId('form-error-message').should('have.length', 9);
      });

      parents.forEach((parent) => {
        cy.findByTestId(parent).within(() => {
          cy.findByText('El nombre es requerido');
          cy.findByText('La fecha de nacimiento es requerida');
          cy.findByText('El número de cédula es requerido');
          cy.findByText('La dirección es requerida');
          cy.findByText('El barrio es requerido');
          cy.findByText('El número de celular es requerido');
          cy.findByText('El correo electrónico no es válido');
          cy.findByText('La ocupación es requerida');
          cy.findByText('El nivel educativo es requerido');
          cy.findByText('El estrato es requerido');
          cy.findAllByTestId('form-error-message').should('have.length', 10);
        });
      });

      cy.findByTestId('family-relationship').within(() => {
        cy.findByText('La relación de los padres es requerida');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });

      cy.findByTestId('enrollment').within(() => {
        cy.findByText('El grado al que ingresa es requerido');
        cy.findByText('Indique si el estudiante es antiguo');
        cy.findAllByTestId('form-error-message').should('have.length', 2);
      });

      cy.findByTestId('authorized-persons').within(() => {
        cy.findByText('El nombre es requerido');
        cy.findByText('El número de celular es requerido');
        cy.findAllByTestId('form-error-message').should('have.length', 2);
      });
    });

    it('should display conditional and refine error messages', () => {
      cy.intercept(
        'POST',
        'http://localhost:8080/enrollments/',
        postEnrollmentResponse
      );
      fillForm();

      // personal student info section
      cy.findByRole('textbox', { name: 'N° Registro Civil:' })
        .clear()
        .type('abc');
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByTestId('personal-student-info').within(() => {
        cy.findByText('El N° Registro Civil solo debe contener números');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('textbox', { name: 'N° Registro Civil:' })
        .clear()
        .type('123456789');

      // student health section
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.findByTestId('personal-student-info').within(() => {
        cy.findByText('El N° Registro Civil solo debe contener números').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByTestId('student-health').within(() => {
        cy.findByText('Seleccione al menos un tipo de discapacidad');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('checkbox', {
        name: 'Otra(s)',
      }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son las otras discapacidades');
        cy.findByText('Seleccione al menos un tipo de discapacidad').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son las otras discapacidades').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Seleccione al menos un tipo de trastorno');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('checkbox', {
        name: 'Otro(s)',
      }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son los otros trastornos');
        cy.findByText('Seleccione al menos un tipo de trastorno').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son los otros trastornos').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son las terapias');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son las terapias').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son las alergias');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByTestId('student-health').within(() => {
        cy.findByText('Especifique cuáles son las alergias').should(
          'not.exist'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      // parent section
      parents.forEach((parent) => {
        cy.findByTestId(parent).within(() => {
          cy.findByRole('textbox', { name: 'Celular:' }).clear().type('abc');
          cy.findByRole('textbox', { name: 'Teléfono:' }).clear().type('abc');
          cy.findByRole('textbox', { name: 'Número de cédula:' })
            .clear()
            .type('abc');
        });
        cy.findByRole('button', { name: 'Matricular estudiante' }).click();
        cy.findByTestId(parent).within(() => {
          cy.findByText('El número de celular solo debe contener números');
          cy.findByText('El número de teléfono solo debe contener números');
          cy.findByText('El número de cédula solo debe contener números');
          cy.findAllByTestId('form-error-message').should('have.length', 3);
        });
        cy.findByTestId(parent).within(() => {
          cy.findByRole('textbox', { name: 'Celular:' })
            .clear()
            .type('1234567890');
          cy.findByRole('textbox', { name: 'Número de cédula:' })
            .clear()
            .type('1234567890');
          cy.findByRole('textbox', { name: 'Teléfono:' })
            .clear()
            .type('1234567890');
        });
      });

      // enrollment section
      cy.findByRole('combobox', {
        name: 'Es estudiante antiguo:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      parents.forEach((parent) => {
        cy.findByTestId(parent).within(() => {
          cy.findByText('El número de celular debe tener 10 dígitos').should(
            'not.exist'
          );
          cy.findByText('El número de teléfono debe tener 10 dígitos').should(
            'not.exist'
          );
          cy.findByText(
            'El número de cédula solo debe contener números'
          ).should('not.exist');
          cy.findAllByTestId('form-error-message').should('have.length', 0);
        });
      });

      cy.findByTestId('enrollment').within(() => {
        cy.findByText('Indique si es primera vez que asiste a un jardín');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });

      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByTestId('enrollment').within(() => {
        cy.findByText(
          'Indique si es primera vez que asiste a un jardín'
        ).should('not.exist');
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByTestId('family-relationship').within(() => {
        cy.findByRole('checkbox', { name: 'Padres' }).click();
      });

      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.findByTestId('family-relationship').within(() => {
        cy.findByText(
          'Seleccione al menos una opción de con quién vive el estudiante'
        );
        cy.findAllByTestId('form-error-message').should('have.length', 1);
        cy.findByRole('checkbox', { name: 'Padres' }).click();
      });

      cy.findByTestId('enrollment').within(() => {
        cy.findByText('Indique el nombre de la entidad escolar anterior');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });

      cy.findByRole('textbox', {
        name: 'Nombre de la entidad escolar a la que asistió:',
      }).type('Jardín infantil');
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.findByTestId('family-relationship').within(() => {
        cy.findByText(
          'Seleccione al menos una opción de con quién vive el estudiante'
        ).should('not.exist');
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByTestId('enrollment').within(() => {
        cy.findByText(
          'Indique el nombre de la entidad escolar anterior'
        ).should('not.exist');
        cy.findAllByTestId('form-error-message').should('have.length', 0);
      });

      cy.findByText(
        'Corrija los errores en el formulario antes de continuar'
      ).should('not.exist');
      cy.findByRole('dialog', { name: 'Estudiante matriculado exitosamente' });
    });
  });

  describe('correct values on value changes', () => {
    it('should set enrollment.isFirstTime and enrollment.previousSchoolName', () => {
      cy.intercept(
        'POST',
        'http://localhost:8080/enrollments/',
        postEnrollmentResponse
      ).as('postEnrollment');

      fillForm();

      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.wait('@postEnrollment').then((interception) => {
        const body = interception.request.body as string;
        const dataMatch = body.match(/name="data"\r?\n\r?\n({[\s\S]*?})\r?\n/);

        if (dataMatch) {
          const data = JSON.parse(dataMatch[1]);

          expect(data.enrollment.isFirstTime).to.equal(false);
          expect(data.enrollment.previousSchoolName).to.equal(
            'Jardín Infantil Mi Mundo Creativo'
          );
        }
      });
    });

    it('should clear enrollment.isFirstTime and enrollment.previousSchoolName when enrollment inputs are manipulated', () => {
      cy.findByRole('combobox', {
        name: 'Es estudiante antiguo:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();

      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      })
        .should('have.value', '')
        .click();
      cy.findByRole('option', { name: 'No' }).click();

      cy.findByRole('textbox', {
        name: 'Nombre de la entidad escolar a la que asistió:',
      })
        .should('have.value', '')
        .type('Jardín infantil');

      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      })
        .should('have.value', '')
        .click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      })
        .should('have.value', '')
        .click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('textbox', {
        name: 'Nombre de la entidad escolar a la que asistió:',
      }).should('have.value', '');
    });

    it('should set age correctly when birth date is selected', () => {
      const birthDate = new Date(2003, 10, 28);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      if (today.getDate() < birthDate.getDate()) {
        months--;
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const selectDate = () => {
        cy.findByRole('combobox', { name: /choose the month/i }).select('Nov');
        cy.findByRole('combobox', { name: /choose the year/i }).select('2003');
        cy.findByRole('button', {
          name: /Friday, November 28th, 2003/i,
        }).click();
      };

      const checkYears = () => {
        cy.findByRole('textbox', { name: 'Años:' }).should(
          'have.value',
          years.toString()
        );
      };

      cy.findByTestId('personal-student-info').within(() => {
        cy.findByRole('button', { name: 'Fecha de nacimiento:' }).click();
      });
      selectDate();
      cy.findByTestId('personal-student-info').within(() => {
        checkYears();
        cy.findByRole('textbox', { name: 'Meses:' }).should(
          'have.value',
          months.toString()
        );
      });

      cy.findByTestId('mother').within(() => {
        cy.findByRole('button', { name: 'Fecha de nacimiento:' }).click();
      });
      selectDate();
      cy.findByTestId('mother').within(() => {
        checkYears();
      });

      cy.findByTestId('father').within(() => {
        cy.findByRole('button', { name: 'Fecha de nacimiento:' }).click();
      });
      selectDate();
      cy.findByTestId('father').within(() => {
        checkYears();
      });
    });

    it('should clear student health fields when parent renderer field is changed', () => {
      // disabilities
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('checkbox', { name: 'Otra(s)' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).type(
        'Discapacidad motora'
      );
      cy.findByRole('checkbox', { name: 'Otra(s)' }).click();
      cy.findByRole('checkbox', { name: 'Otra(s)' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('have.value', '');

      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).type(
        'Discapacidad motora'
      );
      cy.findByRole('checkbox', { name: 'Auditiva' }).click();
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('checkbox', { name: 'Auditiva' }).should('not.be.checked');
      cy.findByRole('checkbox', { name: 'Otra(s)' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('have.value', '');
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();

      // disorders
      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('checkbox', { name: 'Otro(s)' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).type('Trastorno');
      cy.findByRole('checkbox', { name: 'Otro(s)' }).click();
      cy.findByRole('checkbox', { name: 'Otro(s)' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('have.value', '');

      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).type('Trastorno');
      cy.findByRole('checkbox', { name: 'Ansiedad' }).click();
      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('checkbox', { name: 'Ansiedad' }).should('not.be.checked');
      cy.findByRole('checkbox', { name: 'Otro(s)' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('have.value', '');
      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();

      // therapies
      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).type('Terapia');
      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('have.value', '');
      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();

      // allergies
      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).type('Alergia');
      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('textbox', { name: '¿Cuál(es)?' }).should('have.value', '');
      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
    });
  });

  describe('enrollment', () => {
    it('should set correct default form values', () => {
      fillForm();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.intercept(
        'POST',
        'http://localhost:8080/enrollments/',
        postEnrollmentResponse
      ).as('postEnrollment');

      cy.wait('@postEnrollment').then((interception) => {
        const body = interception.request.body as string;
        const dataMatch = body.match(/name="data"\r?\n\r?\n({[\s\S]*?})\r?\n/);
        const todaysDate = (() => {
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const yyyy = today.getFullYear();
          return `${dd}/${mm}/${yyyy}`;
        })();

        if (dataMatch) {
          const data = JSON.parse(dataMatch[1]);

          expect(data.studentHealth.hasAnxiety).to.equal(false);
          expect(data.studentHealth.hasAttentionDisorders).to.equal(false);
          expect(data.studentHealth.hasAutism).to.equal(false);
          expect(data.studentHealth.hasBehavioralDisorders).to.equal(false);
          expect(data.studentHealth.hasDownSyndrome).to.equal(false);
          expect(data.studentHealth.hasHearingDisability).to.equal(false);
          expect(data.studentHealth.hasHyperactivity).to.equal(false);
          expect(data.studentHealth.hasLanguageDisorders).to.equal(false);
          expect(data.studentHealth.hasPhysicalDisability).to.equal(false);
          expect(data.studentHealth.otherDisabilities).to.equal('');
          expect(data.studentHealth.otherDisorders).to.equal('');
          expect(data.studentHealth.therapies).to.equal('');

          expect(data.familyRelationship.livesWithGrandparents).to.equal(false);
          expect(data.familyRelationship.livesWithSiblings).to.equal(false);
          expect(data.familyRelationship.livesWithStepfather).to.equal(false);
          expect(data.familyRelationship.livesWithStepmother).to.equal(false);
          expect(data.familyRelationship.livesWithUncles).to.equal(false);
          expect(data.enrollment.date).to.equal(todaysDate);
          expect(data.father.telephoneNumber).to.equal('');
          expect(data.mother.telephoneNumber).to.equal('');
        }
      });
    });

    it('should allow enroll student', () => {
      cy.intercept(
        'POST',
        'http://localhost:8080/enrollments/',
        postEnrollmentResponse
      ).as('postEnrollment');
      fillForm();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.wait('@postEnrollment');

      cy.findByRole('dialog', { name: 'Estudiante matriculado exitosamente' });
      cy.findByText('El estudiante ahora se encuentra en la base de datos');
      cy.findByRole('button', { name: 'Entendido' }).click();
      cy.location('pathname').should('eq', '/');
    });

    it('should inform user when student could not be enrolled', () => {
      cy.intercept('POST', 'http://localhost:8080/enrollments/', {
        statusCode: 500,
      }).as('postEnrollment');
      fillForm();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.wait('@postEnrollment');

      cy.findByRole('dialog', {
        name: 'Hubo un error al matricular al estudiante',
      });
      cy.findByText('Contacte al ingeniero para recibir asistencia');
      cy.findByRole('button', { name: 'Entendido' }).click();
      cy.url().should('contain', '/matricular-estudiante');
    });
  });
});
