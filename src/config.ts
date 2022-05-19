import { readFileSync, writeFileSync } from 'fs';
import { question } from 'readline-sync';
import Crypto from 'cryptr';

const filename = "data.manda";
const key = "mandatofumandatofu";

class Config {
  private static instance: Config;
  private static crypto = new Crypto(key);
  private data: string;

  private constructor() {
    try {
      this.data = readFileSync(filename, { encoding: 'utf-8' });
    }
    catch {
      this.data = this.initializeData();
      writeFileSync(filename, this.data);
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }

  public getData() {
    const { decrypt } = Config.crypto;
    const data = this.data.split('\n').map(d => decrypt(d));
    return {
      email: data[0],
      password: data[1],
      channel: data[2]
    };
  }

  private initializeData() {
    const { encrypt } = Config.crypto;
    return [
      question("Email: "),
      question("Password: ", { hideEchoBack: true }),
      question("Channel URL: "),
    ]
    .map(s => encrypt(s))
    .join('\n');
  }
}

export default Config;
