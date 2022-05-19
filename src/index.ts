import Discord from './discord';
import Tofu from './tofu';
import Config from './config';
import cycle from './main';

const config = Config.getInstance();
const { email, password, channel } = config.getData();

console.log(`\nUsing the account '${email}'`);
console.log(`Using the channel '${channel}'`);

let count = 0;
setInterval(async () => {
  count++;
  const discord = await Discord.createInstance({ email, password }, channel);
  const tofu = new Tofu(discord);

  for (const { interval, action } of cycle) {
    if (count % interval === 0) await action(tofu);
  }

  await discord.close();
}, 1000 * 60);
