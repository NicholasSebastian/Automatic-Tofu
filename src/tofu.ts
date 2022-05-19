import Discord from './discord';

// TODO: OCR to read the print value of the given cards.
// TODO: Priority list for certain characters or series to be saved.

class Tofu {
  private session: Discord;

  public constructor(session: Discord) {
    this.session = session;
  }

  public async summon() {
    const { session } = this;
    await session.sendMessage("ts");

    await session.wait(5000); // Ideally you'd wait for Tofu to reply.
    const response = await this.getLatestMessage();

    const choice = this.getRandom(1, 3);
    const button = await response?.$(`div[id^='message-reactions'] > div:nth-child(${choice})`);
    await button?.click();
    await session.wait(100);

    // await session.wait(10000); // Ideally you'd wait for Tofu to reply.
    // await this.logLatestMessage();
  }

  public async daily() {
    const { session } = this;
    await session.sendMessage("tdaily");
  }

  public async minigame() {
    const { session } = this;
    await session.sendMessage("tmg 4");
    // TODO: Wait for Tofu to reply.
  }

  public async getLatestMessage() {
    const selector = "ol[data-list-id='chat-messages'] > li:last-of-type";
    return await this.session.page.$(selector);
  }

  public async logLatestMessage() {
    const message = await this.getLatestMessage();
    const content = message?.$eval("div[id^='message-content']", e => (e as HTMLElement).innerText);
    console.log(content);
  }

  private getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default Tofu;
