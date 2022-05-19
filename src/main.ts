import Tofu from './tofu';

interface ICycle {
  interval: number
  action: (instance: Tofu) => void | Promise<void>
}

const activities: Array<ICycle> = [
  {
    interval: 20,
    action: async tofu => {
      console.log("Summoning");
      await tofu.summon();
    }
  },
  {
    interval: 4,
    action: async tofu => {
      console.log("Minigame");
      await tofu.minigame();
    }
  }
]

export default activities;
