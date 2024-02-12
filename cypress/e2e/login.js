function login() {
  cy.get('[data-testid="email-field"]').type("test@gmail.com");
  cy.get('[data-testid="password-field"]').type("Hola1234$");

  cy.get('[data-testid="login-button"]').click();
}

module.exports = {
  login,
};
