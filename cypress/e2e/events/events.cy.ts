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

  it('Verify that detailed information is displayed for each event when clicking on an EventRow', () => {
    cy.visit('http://localhost:3000')
  
    cy.get('[data-testid="event-row"]').first().click()
   
    cy.get('[data-testid="event-dialog"]').should('be.visible')

    cy.get('[data-testid="event-name"]').should('exist') 
    cy.get('[data-testid="event-date"]').should('exist') 
    cy.get('[data-testid="event-location"]').should('exist') 
    cy.get('[data-testid="event-price"]').should('exist') 
    cy.get('[data-testid="event-tags"]').should('exist') 
    cy.get('[data-testid="event-description"]').should('exist') 
    cy.get('[data-testid="event-image"]').should('exist') 
    cy.get('[data-testid="event-link"]').should('exist') 
  })


 
  })
  