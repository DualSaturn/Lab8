describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });
  
  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(($el) => {
        expect($el).to.have.value(75);
    });
  });
  
  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#volume-number').then(($el) => {
        expect($el).to.have.value(33);
    });
  });
  
  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then(($el) => {
        expect($el).to.have.prop('volume', 0.33);
    });
  });
  
  it('image and sound sources change when you select the party horn radio button', () => {
    cy.get('#radio-party-horn').check();
    cy.get('#sound-image').then(e => expect(e).to.have.prop('src').match(/assets\/media\/images\/party-horn.svg/));
    cy.get('#horn-sound').then(e => expect(e).to.have.prop('src').match(/assets\/media\/audio\/party-horn.mp3/));
  });
  
  it('volume image changes when increasing volumes', () => {
      cy.get('#volume-slider').invoke('val', 70).trigger('input');
      cy.get('#volume-image').then(e => expect(e).to.have.prop('src').match(/assets\/media\/icons\/volume-level-3.svg/));
      cy.get('#volume-slider').invoke('val', 50).trigger('input');
      cy.get('#volume-image').then(e => expect(e).to.have.prop('src').match(/assets\/media\/icons\/volume-level-2.svg/));
      cy.get('#volume-slider').invoke('val', 20).trigger('input');
      cy.get('#volume-image').then(e => expect(e).to.have.prop('src').match(/assets\/media\/icons\/volume-level-1.svg/));
      cy.get('#volume-slider').invoke('val', 0).trigger('input');
      cy.get('#volume-image').then(e => expect(e).to.have.prop('src').match(/assets\/media\/icons\/volume-level-0.svg/));
  });
  
  it('honk button is disabled when the textbox input is a empty or a non-number', () => {
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then(e => expect(e).to.have.attr('disabled'));
    cy.get('#volume-number').clear().type('76');
    cy.get('#honk-btn').then(e => expect(e).to.not.have.attr('disabled'));
    cy.get('#volume-number').clear().type('hello TAs');
    cy.get('#honk-btn').then(e => expect(e).to.have.attr('disabled'));
  });
  
  it('error is shown when you type a number outside of the given range for the volume textbox input', () => {
    cy.get('#volume-number').clear().type('70');
    cy.get('#volume-number:invalid').should('not.exist');
    cy.get('#volume-number').clear().type('700');
    cy.get('#volume-number:invalid').should('exist');
  });
});
