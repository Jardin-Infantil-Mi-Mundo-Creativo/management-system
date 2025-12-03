describe('Enrollment form', () => {
  beforeEach(() => {
    cy.visit('/matricular-estudiante');
  });

  const parents = ['mother', 'father'];

  const postEnrollmentResponse = {
    id: 'jxwi1KU0tT8jXapfNRBs',
    authorizedPersons: [
      {
        cellPhoneNumber: '329847362',
        fullName: 'Luisito',
      },
    ],
    enrollment: {
      date: '24/11/2025',
      entryGrade: 'preschool',
      identificationNumber: '1',
      isFirstTime: false,
      isOldStudent: true,
      previousSchoolName: 'Jardín Infantil Mi Mundo Creativo',
    },
    familyRelationship: {
      livesWithGrandparents: false,
      livesWithParents: true,
      livesWithSiblings: false,
      livesWithStepfather: false,
      livesWithStepmother: false,
      livesWithUncles: false,
      parentsRelationship: 'single mother',
    },
    father: {
      address: 'Calle 19 4 59',
      ageYears: 41,
      birthDate: '22/11/1984',
      cellPhoneNumber: '3122773641',
      educationLevel: 'primary school',
      email: 'juliorodriguez@gmail.com',
      fullName: 'Julio Rodriguez',
      identificationNumber: '323113234',
      neighborhood: 'Las Nieves',
      occupation: 'Cerrajero',
      stratum: 4,
      telephoneNumber: '',
    },
    mother: {
      address: 'Cra 4 20 09',
      ageYears: 88,
      birthDate: '25/11/1936',
      cellPhoneNumber: '3122773641',
      educationLevel: 'technical',
      email: 'julianaprado@gmail.com',
      fullName: 'Juliana Prado',
      identificationNumber: '394837467',
      neighborhood: 'Las Nieves',
      occupation: 'Profesora',
      stratum: 5,
      telephoneNumber: '',
    },
    personalStudentInfo: {
      ageMonths: 0,
      ageYears: 6,
      birthCity: 'Bogotá',
      birthDate: '07/11/2019',
      civilRegistrationNumber: '1088236109',
      fullName: 'Sergio Franco',
    },
    rendererFieldsOnly: {
      studentHealth: {
        hasAllergy: true,
        hasDisability: false,
        hasDisabilityOther: false,
        hasDisorderOther: false,
        hasDisorders: true,
        hasTherapy: true,
      },
    },
    studentHealth: {
      allergies: 'Perros',
      eps: 'Salud Total',
      hasAnxiety: true,
      hasAttentionDisorders: false,
      hasAutism: false,
      hasBehavioralDisorders: true,
      hasDownSyndrome: false,
      hasEncopresis: false,
      hasEnuresis: true,
      hasHearingDisability: false,
      hasHyperactivity: false,
      hasLanguageDisorders: false,
      hasPhysicalDisability: false,
      hasRhPositiveBloodType: true,
      hasSisben: true,
      otherDisorders: '',
      therapies: 'Del sueño',
      otherDisabilities: '',
    },
    studentPhoto:
      'https://storage.googleapis.com/mi-mundo-creativo-7982f.firebasestorage.app/1088236109/2025_profile-picture.jpg',
    documentsFile:
      'https://storage.googleapis.com/mi-mundo-creativo-7982f.firebasestorage.app/1088236109/2025_documents.pdf',
  };

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
      name: 'R.H:',
    }).click();
    cy.findByRole('option', { name: 'Negativo' }).click();
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
          name: 'R.H:',
        }).click();
        cy.findByRole('option', { name: 'Positivo' });
        cy.findByRole('option', { name: 'Negativo' }).click();

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
          name: 'Matricula',
        });

        cy.findByRole('textbox', { name: 'Fecha de matricula:' });

        cy.findByRole('combobox', {
          name: 'Es estudiante antiguo:',
        }).click();
        cy.findByRole('option', { name: 'Sí' });
        cy.findByRole('option', { name: 'No' }).click();

        cy.findByRole('combobox', {
          name: 'Primera vez que asiste a un jardín:',
        }).click();
        cy.findByRole('option', { name: 'Sí' });
        cy.findByRole('option', { name: 'No' }).click();

        cy.findByRole('textbox', {
          name: 'Nombre de la entidad escolar a la que asistió:',
        });

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

          cy.findAllByRole('textbox', {
            name: 'Nombre completo:',
          }).should('have.length', 0);

          cy.findAllByRole('textbox', {
            name: 'Celular',
          }).should('have.length', 0);

          cy.get('svg.lucide-x').should('have.length', 0);

          cy.findByRole('button', {
            name: 'Agregar persona',
          }).click();
          cy.findByRole('button', {
            name: 'Agregar persona',
          }).click();

          cy.findAllByRole('textbox', {
            name: 'Nombre completo:',
          }).should('have.length', 2);

          cy.findAllByRole('textbox', {
            name: 'Celular:',
          }).should('have.length', 2);

          cy.get('svg.lucide-x').should('have.length', 2);

          cy.get('svg.lucide-x').each((x) => {
            cy.wrap(x).parent().click();
          });

          cy.findAllByRole('textbox', {
            name: 'Nombre completo:',
          }).should('have.length', 0);

          cy.findAllByRole('textbox', {
            name: 'Celular:',
          }).should('have.length', 0);

          cy.get('svg.lucide-x').should('have.length', 0);
        });
      }

      function checkFooterSection() {
        cy.findByText(
          'ACEPTAMOS LAS NORMAS DEL JARDIN Y NOS COMPROMETEMOS A CUMPLIR'
        );
        cy.findByText('Dirección: Manzana A casa 18 Maria Camila Sur');
        cy.findByText('Teléfono: 5884200');
        cy.findByText('Celular: 3118816946');
        cy.findByRole('button', { name: 'Matricular estudiante' });
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
        cy.findAllByRole('textbox').should('have.length', 5);
        cy.findAllByRole('button').should('have.length', 1);
      });

      // check amount of elements before touching the section
      cy.findByTestId('student-health').within(() => {
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 0);
        cy.findAllByRole('textbox').should('have.length', 1);
      });
      // expand all fields
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', {
        name: 'Sí',
      }).click();
      cy.findByRole('checkbox', {
        name: 'Otra(s)',
      }).click();

      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', {
        name: 'Sí',
      }).click();
      cy.findByRole('checkbox', {
        name: 'Otro(s)',
      }).click();

      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', {
        name: 'Sí',
      }).click();

      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', {
        name: 'Sí',
      }).click();

      // check amount of elements after touching the section
      cy.findByTestId('student-health').within(() => {
        cy.findAllByRole('combobox').should('have.length', 8);
        cy.findAllByRole('checkbox').should('have.length', 11);
        cy.findAllByRole('textbox').should('have.length', 5);
      });

      parents.forEach((parent) => {
        cy.findByTestId(parent).within(() => {
          // no new fields to expand here
          cy.findAllByRole('textbox').should('have.length', 9);
          cy.findAllByRole('button').should('have.length', 1);
          cy.findAllByRole('combobox').should('have.length', 2);
        });
      });

      cy.findByTestId('family-relationship').within(() => {
        // no new fields to expand here
        cy.findAllByRole('checkbox').should('have.length', 6);
        cy.findAllByRole('combobox').should('have.length', 1);
      });

      cy.findByTestId('documents').within(() => {
        // no new fields to expand here
        cy.findAllByLabelText('Archivos adjuntos').should('have.length', 1);
      });

      cy.findByTestId('authorized-persons').within(() => {
        // check amount of elements before touching the section
        cy.findAllByRole('button').should('have.length', 1);
        cy.findAllByRole('textbox').should('have.length', 0);

        // expand fields
        cy.findByRole('button', {
          name: 'Agregar persona',
        }).click();

        // check amount of elements after touching the section
        cy.findAllByRole('textbox').should('have.length', 2);
        cy.findAllByRole('button').should('have.length', 2);
      });
    });
  });

  describe('validations', () => {
    it('should display initial error messages', () => {
      cy.findByRole('button', { name: 'Agregar persona' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();

      cy.findByText('La foto del estudiante es obligatoria');

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
        cy.findByText('Seleccione el tipo de R.H');
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

      cy.findByTestId('authorized-persons').within(() => {
        cy.findByText('El nombre es requerido');
        cy.findByText('El número de celular es requerido');
        cy.findAllByTestId('form-error-message').should('have.length', 2);
      });

      cy.findByTestId('documents').within(() => {
        cy.findByText('El archivo PDF de documentos es obligatorio');
        cy.findAllByTestId('form-error-message').should('have.length', 1);
      });
    });

    it.only('should display conditional errors', () => {
      cy.intercept(
        'POST',
        'http://localhost:8080/enrollments/',
        postEnrollmentResponse
      ).as('enrollmentsPost');
      fillForm();

      // student health section
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Seleccione al menos un tipo de discapacidad');
      cy.findByRole('checkbox', {
        name: 'Otra(s)',
      }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Especifique cuáles son las otras discapacidades');
      cy.findByText('Seleccione al menos un tipo de discapacidad').should(
        'not.exist'
      );
      cy.findByRole('combobox', {
        name: 'Presenta alguna discapacidad:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByText('Especifique cuáles son las otras discapacidades').should(
        'not.exist'
      );

      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Seleccione al menos un tipo de trastorno');
      cy.findByRole('checkbox', {
        name: 'Otro(s)',
      }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Especifique cuáles son los otros trastornos');
      cy.findByText('Seleccione al menos un tipo de trastorno').should(
        'not.exist'
      );
      cy.findByRole('combobox', {
        name: 'Presenta algún trastorno:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByText('Especifique cuáles son los otros trastornos').should(
        'not.exist'
      );

      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Especifique cuáles son las terapias');
      cy.findByRole('combobox', {
        name: 'Asiste a terapia(s):',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByText('Especifique cuáles son las terapias').should('not.exist');

      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'Sí' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Especifique cuáles son las alergias');
      cy.findByRole('combobox', {
        name: 'Tiene alergias:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByText('Especifique cuáles son las alergias').should('not.exist');

      // enrollment section
      cy.findByRole('combobox', {
        name: 'Es estudiante antiguo:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Indique si es primera vez que asiste a un jardín');

      cy.findByRole('combobox', {
        name: 'Primera vez que asiste a un jardín:',
      }).click();
      cy.findByRole('option', { name: 'No' }).click();
      cy.findByText('Indique si es primera vez que asiste a un jardín').should(
        'not.exist'
      );
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Indique el nombre de la entidad escolar anterior');

      cy.findByRole('textbox', {
        name: 'Nombre de la entidad escolar a la que asistió:',
      }).type('Jardín infantil');
      cy.findByRole('button', { name: 'Matricular estudiante' }).click();
      cy.findByText('Indique el nombre de la entidad escolar anterior').should(
        'not.exist'
      );
    });
  });
});
