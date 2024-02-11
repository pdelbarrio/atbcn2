describe('e2e tests concerning the events logic', () => {
  it('Verify event visualization or message when there are no events', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="event-row"]').then(($eventRow) => {
      if ($eventRow.length > 0) {
        // Si hay eventos, verifica que el componente EventRow esté presente
        cy.get('[data-testid="event-row"]').should('exist')
      } else {
        // Si no hay eventos, verifica que se muestre el mensaje adecuado
        cy.contains('No hi ha esdeveniments introduïts per a aquesta setmana').should('exist')
      }
    })
  })
 
  })
  