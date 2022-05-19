import puppeteer, { Browser, Page } from 'puppeteer-core';

const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

class Discord {
  private browser: Browser;
  public page: Page;

  private constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  public async close() {
    await this.browser.close();
  }

  public static async createInstance(credentials: ICredentials, channel: string) {
    const browser = await puppeteer.launch({ executablePath });
    const page = await browser.newPage();
    await page.goto(channel, { waitUntil: 'networkidle2' });

    const instance = new Discord(browser, page);
    await instance.authenticate(credentials);
    return instance;
  }

  private async authenticate(credentials: ICredentials) {
    const { page } = this;
    const { email, password } = credentials;
    const servers = await page.$("div[aria-label='Servers']");
    if (!servers) {
      await page.type("input[name='email']", email);
      await page.type("input[name='password']", password);
      await page.click("button[type='submit']");
    }
  }

  public async sendMessage(message: string) {
    const { page } = this;
    const selector = "div[role='textbox']";

    await page.waitForSelector(selector);
    const textbox = await page.$(selector);
    await textbox?.click();
    await textbox?.type(message);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
  }

  public async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}

interface ICredentials {
  email: string 
  password: string
}

export default Discord;
