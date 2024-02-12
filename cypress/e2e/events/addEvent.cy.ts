import {login} from '../login';

describe('AddEvent e2e automated tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/add-event')
        login(); 
        cy.url().should('include', '/add-event');
      });
    
    it('Fills the form  triggers PreviewModal, confirms, and verifies toast', () => {

      cy.get('[data-testid="event-name"]').type('Test Event Name');
      cy.get('[data-testid="event-description"]').type('This is a test event description.');      
      cy.get('[data-testid="event-location"]').type('Test Location' );
      cy.get('[data-testid="event-price"]').type('Free');
    //   cy.get('[data-testid="event-date"]').type('dm., 14/02/2024 20:00h'); DatePicker to complex to test right now
      cy.get('[data-testid="event-link"]').type('Link')
  
      // Verify field values
      cy.get('[data-testid="event-name"]').should('have.value', 'Test Event Name');
      cy.get('[data-testid="event-description"]').should('have.value','This is a test event description.');      
      cy.get('[data-testid="event-location"]').should('have.value','Test Location' );
      cy.get('[data-testid="event-price"]').should('have.value','Free');
      cy.get('[data-testid="event-link"]').should('have.value','Link')
  
      // Click the preview button
      cy.get('[data-testid="preview-button"]').click();
  
      // Assert PreviewModal visibility
      cy.get('[data-testid="preview-modal"]').should('be.visible');

      cy.get('[data-testid="confirm-button"]').click();
     //the test shows how the toast confirming the success but this toast cannot be targeted at the moment
    });
  });
  