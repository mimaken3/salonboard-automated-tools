const path = require("path");
const dotenv = require('dotenv');
const puppeteer = require("puppeteer-extra");

// Bot 判定されにくくする
// NOTE: この設定が無いとスタイル編集の画像アップロードでコケる！
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const loginProcess = async () => {
    // See: https://pptr.dev/api/puppeteer.launchoptions
    const browser = await puppeteer.launch({
        // ヘッドレスモードで起動するかどうか
        // デバッグ段階では false を設定することで動きを目視で確認できる
        headless: false,

        // ナビゲーション中にHTTPSエラーを無視するかどうか
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    try {
        // 「ログイン」画面に移動
        await page.goto("https://salonboard.com/login/");
        // ID を入力
        await page.type("input.common-CNCcommon__loginIdInput", username);
        // パスワードを入力
        await page.type("input.common-CNCcommon__loginPwInput", password);

        // // ログインボタンをクリック
        const linkElement = await page.$("a.common-CNCcommon__primaryBtn.loginBtnSize");
        await linkElement.click();

        // ログイン完了を待つ
        await page.waitForNavigation();

        return page;
    } catch (error) {
        console.error('ログインに失敗しました:', error.message);
        throw error;
    }
}

const uploadImage = async (page) => {
    try {
        // 「画像をアップロードする」ボタンをクリック
        await page.waitForSelector(".style_edit-editCommon__input--image-container.mt18", { timeout: 60000 });
        const imageContainers = await page.$$('.style_edit-editCommon__input--image-container.mt18');
        await imageContainers[0].click();

        // 画像ファイルをアップロード
        await page.waitForSelector('input[type="file"]');
        const fileInput = await page.$('input[type="file"]');
        const filePath = './屋号OKスタイル1.jpg'; // 適宜変更
        await fileInput.uploadFile(filePath);

        // 「登録する」ボタンをクリック
        await page.waitForSelector(".style_edit-editCommon__input--image-container.mt18", { visible: true });
        const registerButton = await page.$("input.imageUploaderModalSubmitButton");
        registerButton.click();
    } catch (error) {
        console.error('画像アップロードに失敗しました:', error.message);
        throw error;
    }
};


const main = async () => {
    try {
        const page = await loginProcess();
        await uploadImage(page);
    } catch (error) {
        console.error("処理中にエラーが発生しました:", error.message);
    }
}

// .env ファイルを読み込む
const envPath = path.resolve(__dirname, './.env');
dotenv.config({ path: envPath });

// .env ファイルから読み込んだ ID とパスワードを設定
const username = process.env.SALON_USERNAME;
const password = process.env.SALON_PASSWORD;

main();
