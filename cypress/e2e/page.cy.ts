describe('Navigation', () => {
    it('should navigate to the pages, select companies and be able to click Delete', () => {
      cy.visit('http://localhost:3000/')

      // Select companies
      cy.contains('p', 'Walmart').closest('li').find('input[type="checkbox"]').check();
      cy.contains('p', 'AWS').closest('li').find('input[type="checkbox"]').check();
      
      // Navigate page 3
      cy.get('button[aria-current="page"]').contains('3').should('exist').click();

      // Select another company on the page
      cy.contains('p', 'Company 25').closest('li').find('input[type="checkbox"]').check();
      
      // Click the delte button
      cy.contains('button', 'Delete').should('be.visible').click();
    })
  })