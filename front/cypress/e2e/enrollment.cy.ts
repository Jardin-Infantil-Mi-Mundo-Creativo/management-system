describe('Enrollment form', () => {
  it('should display elements and form inputs correctly', () => {
    cy.visit('/matricular-estudiante');

    cy.findByRole('heading', { name: 'LIBRO DE MATRICULA' }).should('exist');
  });
});
