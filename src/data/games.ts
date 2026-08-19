import spaceman from "@/assets/games/spaceman.png.asset.json";
import penaltyShootout from "@/assets/games/penalty-shootout-street.png.asset.json";
import doodleCrash from "@/assets/games/doodle-crash.png.asset.json";
import zeppelin from "@/assets/games/zeppelin.png.asset.json";
import toMars from "@/assets/games/to-mars-and-beyond.png.asset.json";
import cricketCrash from "@/assets/games/cricket-crash.png.asset.json";
import saveTheHamster from "@/assets/games/save-the-hamster.png.asset.json";
import goblinRun from "@/assets/games/goblin-run.png.asset.json";
import quantumX from "@/assets/games/quantum-x.png.asset.json";
import highFlyer from "@/assets/games/high-flyer.png.asset.json";
import f777 from "@/assets/games/f777-fighter.png.asset.json";
import mriya from "@/assets/games/mriya.png.asset.json";
import longBall from "@/assets/games/long-ball.png.asset.json";
import cricketBoom from "@/assets/games/cricket-boom.png.asset.json";
import cashOrCrash2 from "@/assets/games/cash-or-crash-2.png.asset.json";
import crashPuck from "@/assets/games/crash-puck.png.asset.json";
import crashTouchdown from "@/assets/games/crash-touchdown.png.asset.json";
import spaceBlaze from "@/assets/games/space-blaze.png.asset.json";
import cashIt from "@/assets/games/cash-it.png.asset.json";
import cashOrCrash from "@/assets/games/cash-or-crash.png.asset.json";
import crashBirds from "@/assets/games/crash-birds.png.asset.json";
import kickIt from "@/assets/games/kick-it.png.asset.json";
import luckyCrumbling from "@/assets/games/lucky-crumbling.png.asset.json";
import crashHamsterCrash from "@/assets/games/crash-hamster-crash.png.asset.json";
import crashBirds2 from "@/assets/games/crash-birds-2.png.asset.json";
import fortuneTumble from "@/assets/games/fortune-tumble.png.asset.json";
import tripleCashOrCrash from "@/assets/games/triple-cash-or-crash.png.asset.json";
import cashGalaxy from "@/assets/games/cash-galaxy.png.asset.json";

export type Game = { name: string; image: string };

export const games: Game[] = [
  { name: "Spaceman", image: spaceman.url },
  { name: "Penalty Shoot-Out Street", image: penaltyShootout.url },
  { name: "Doodle Crash", image: doodleCrash.url },
  { name: "Zeppelin", image: zeppelin.url },
  { name: "To Mars and Beyond", image: toMars.url },
  { name: "Cricket Crash", image: cricketCrash.url },
  { name: "Save the Hamster", image: saveTheHamster.url },
  { name: "Goblin Run", image: goblinRun.url },
  { name: "Quantum X", image: quantumX.url },
  { name: "High Flyer", image: highFlyer.url },
  { name: "F777 Fighter", image: f777.url },
  { name: "Mriya", image: mriya.url },
  { name: "Long Ball", image: longBall.url },
  { name: "Cricket Boom", image: cricketBoom.url },
  { name: "Cash or Crash 2", image: cashOrCrash2.url },
  { name: "Crash Puck", image: crashPuck.url },
  { name: "Crash Touchdown", image: crashTouchdown.url },
  { name: "Space Blaze", image: spaceBlaze.url },
  { name: "Cash It Multiplayer", image: cashIt.url },
  { name: "Cash or Crash", image: cashOrCrash.url },
  { name: "Crash Birds Multiplayer", image: crashBirds.url },
  { name: "Kick It Multiplayer", image: kickIt.url },
  { name: "Lucky Crumbling", image: luckyCrumbling.url },
  { name: "Crash, Hamster, Crash!", image: crashHamsterCrash.url },
  { name: "Crash Birds", image: crashBirds2.url },
  { name: "Fortune Tumble", image: fortuneTumble.url },
  { name: "Triple Cash or Crash", image: tripleCashOrCrash.url },
  { name: "Cash Galaxy", image: cashGalaxy.url },
];
