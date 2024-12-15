# salonboard-automated-tools

## Cypress

```sh
cp cypress.env.json.example cypress.env.json
vi cypress.env.json
```
- 上記のコマンドを実行後、cypress.env.json にログインで使用する `id` と `password` を設定する。

- Cypress コマンドがない場合、次のコマンドで Cypress をインストール。
```sh
npm install cypress --save-dev
```

- 次のコマンドを実行すると Cypress が起動する。
```sh
npx run cypress:open
```

- 「Welcome to Cypress!」という画面が出たら、左側に表示されている「E2E Testing」をクリックする。

- 「Choose a browser」画面が表示後、「Chrome」を選択して「Start E2E Testing in Chrome」をクリックする。

- 画面中央に表示されている `editStyle.cy.js` をクリックし、Cypress を実行する。
