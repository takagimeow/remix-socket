describe("rooms/$id", () => {
  it("テキストを入力して、エンタキーを押下するとテキストが消えることをテスト", () => {
    cy.visit("/rooms/room-id-1");

    // 第二のユーザーを接続させる
    cy.task("connect");

    // 入力を始める前は必ずプレースホルダーが表示される
    // 第一のユーザー（自分）がHello Worldを入力するとその文字列が画面上に表示される。
    // この時、プレースホルダーは表示されていない
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

    // 第二のユーザーがこんにちは世界と入力する
    // その内容が第一ユーザー（自分）の画面に表示されていることを確認する
    cy.task("getSocketId").then((result) => {
      cy.task("getLastMessage")
      .should("include", "Hello World")
      cy.task("post", "こんにちは世界")
      cy.contains(`div#messageField-${result}`, "こんにちは世界").should("be.visible");
    });

    // 第一ユーザー（自分）がエンターキーを押下すると、
    // 入力済みのテキストが消えプレースホルダーが出現する
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
