import { getEnv } from '../support/helpers'

describe('スタイル掲載情報編集', () => {
  const id = getEnv('ID')
  const password = getEnv('PASSWORD')

  console.log(id)
  console.log(password)

  it('スタイル掲載情報編集を自動化', () => {
    // サイトにアクセス
    cy.visit('https://salonboard.com/login');

    // ID を入力
    cy.get('input[name="userId"]')
      .type('CC34082');

    // パスワードを入力
    cy.get('input[name="password"]')
      .type('fifth-5555!!');

    // ログインボタンをクリック
    cy.get('a.common-CNCcommon__primaryBtn').click();

    // 画像認証対策用
    // 画像認証完了次第、再開する
    cy.pause();

    // ログイン後のページが正しく表示されていることを確認
    cy.url().should('include', '/CNC/groupTop/');

    // 「fifth LABORATORY【フィフス ラボラトリー】」をクリック
    cy.get('#H000717290').click();

    // 「ダッシュボード」画面
    cy.url().should('include', '/CLP/bt/top/');

    // 「掲載管理」をクリック
    cy.get('.cmsLink').click();

    // 「掲載管理Top」画面
    cy.url().should('include', '/CNB/reflect/reflectTop/');

    // 「スタイル」をクリック
    const STYLE_HEADER_INDEX = 12
    cy.get('a.moveBtn.chk.common-CNBcommon__primaryBtn').eq(STYLE_HEADER_INDEX).click();

    // 「スタイル掲載情報一覧」画面
    cy.url().should('include', '/CNB/draft/styleList/');

    // 「スタイル新規追加」ボタンをクリック
    cy.get('.table_list_btn.mt20')
      .find('img[alt="スタイル新規追加"]')
      .click();

    // 「スタイル掲載情報編集」画面
    cy.url().should('include', '/CNB/draft/styleEdit/');

    // 「画像アップロード」ボタンをクリック
    cy.get('.style_edit-editCommon__input--image-container.mt18')
      .eq(0)
      .get('#FRONT_IMG_ID_IMG')
      .click()

    // 「ファイルを選択」ボタンをクリック
    cy.get('label.imageUploaderModalInput')
      .should('be.visible')
      .click()

    // 画像をアップロード
    const filePath = './屋号OKスタイル1.jpg'; // 適宜変更する
    cy.get('input[type="file"]')
      .attachFile(filePath); // 画像ファイルを添付

    // 取り敢えず1秒待つ
    cy.wait(1000)

    // アップロード後、「登録する」ボタンをクリック
    cy.get('input.imageUploaderModalSubmitButton')
      .click();
  });
});