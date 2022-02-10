describe("rooms/$id", () => {
  it("テキストを入力して、エンタキーを押下するとテキストが消えることをテスト", () => {
    cy.visit("/rooms/room-id-1");
    cy.get("span#textFieldPlaceholder")
      .should("exist")
      .contains("何か入力してください...");
    cy.get("div#textField")
      .type("Hello World", {
        force: true,
        delay: 500,
      })
      .contains("Hello World");
    cy.get("span#textFieldPlaceholder").should("not.exist");
    cy.get("div#textField")
      .type("{enter}", {
        force: true,
      })
      .should("have.value", "");
    cy.get("span#textFieldPlaceholder")
      .should("exist")
      .contains("何か入力してください...");
  });
});
