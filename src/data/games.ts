import g_aviator from "@/assets/g/aviator.png.asset.json";
import g_spaceman from "@/assets/g/spaceman.png.asset.json";
import g_penaltyShootOutStreet from "@/assets/g/penalty-shoot-out-street.png.asset.json";
import g_doodleCrash from "@/assets/g/doodle-crash.png.asset.json";
import g_zeppelin from "@/assets/g/zeppelin.png.asset.json";
import g_toMarsAndBeyond from "@/assets/g/to-mars-and-beyond.png.asset.json";
import g_cricketCrash from "@/assets/g/cricket-crash.png.asset.json";
import g_saveTheHamster from "@/assets/g/save-the-hamster.png.asset.json";
import g_goblinRun from "@/assets/g/goblin-run.png.asset.json";
import g_quantumX from "@/assets/g/quantum-x.png.asset.json";
import g_highFlyer from "@/assets/g/high-flyer.png.asset.json";
import g_f777Fighter from "@/assets/g/f777-fighter.png.asset.json";
import g_mriya from "@/assets/g/mriya.png.asset.json";
import g_longBall from "@/assets/g/long-ball.png.asset.json";
import g_cricketBoom from "@/assets/g/cricket-boom.png.asset.json";
import g_cashOrCrash2 from "@/assets/g/cash-or-crash-2.png.asset.json";
import g_crashPuck from "@/assets/g/crash-puck.png.asset.json";
import g_crashTouchdown from "@/assets/g/crash-touchdown.png.asset.json";
import g_spaceBlaze from "@/assets/g/space-blaze.png.asset.json";
import g_cashItMultiplayer from "@/assets/g/cash-it-multiplayer.png.asset.json";
import g_cashOrCrash from "@/assets/g/cash-or-crash.png.asset.json";
import g_crashBirdsMultiplayer from "@/assets/g/crash-birds-multiplayer.png.asset.json";
import g_kickItMultiplayer from "@/assets/g/kick-it-multiplayer.png.asset.json";
import g_luckyCrumbling from "@/assets/g/lucky-crumbling.png.asset.json";
import g_crashHamsterCrash from "@/assets/g/crash-hamster-crash.png.asset.json";
import g_crashBirds from "@/assets/g/crash-birds.png.asset.json";
import g_fortuneTumble from "@/assets/g/fortune-tumble.png.asset.json";
import g_tripleCashOrCrash from "@/assets/g/triple-cash-or-crash.png.asset.json";
import g_cashGalaxy from "@/assets/g/cash-galaxy.png.asset.json";
import g_stormyWitch from "@/assets/g/stormy-witch.png.asset.json";
import g_needForX from "@/assets/g/need-for-x.png.asset.json";
import g_9CoinsEaster from "@/assets/g/9-coins-easter.png.asset.json";
import g_raiderJaneSCryptOfF from "@/assets/g/raider-jane-s-crypt-of-f.png.asset.json";
import g_bigBassCrash from "@/assets/g/big-bass-crash.png.asset.json";
import g_rocketRace from "@/assets/g/rocket-race.png.asset.json";
import g_monsterGoShopping from "@/assets/g/monster-go-shopping.png.asset.json";
import g_flyToUniverse from "@/assets/g/fly-to-universe.png.asset.json";
import g_deepRush from "@/assets/g/deep-rush.png.asset.json";
import g_skyLantern from "@/assets/g/sky-lantern.png.asset.json";
import g_doubleBubble from "@/assets/g/double-bubble.png.asset.json";
import g_fairCrash from "@/assets/g/fair-crash.png.asset.json";
import g_spaceXy from "@/assets/g/space-xy.png.asset.json";
import g_topEagle from "@/assets/g/top-eagle.png.asset.json";
import g_limboXy from "@/assets/g/limbo-xy.png.asset.json";
import g_giftX from "@/assets/g/gift-x.png.asset.json";
import g_dragonSCrash from "@/assets/g/dragon-s-crash.png.asset.json";
import g_arizonaSmithAndT from "@/assets/g/arizona-smith-and-t.png.asset.json";
import g_magnifyMan from "@/assets/g/magnify-man.png.asset.json";
import g_chickenRoad from "@/assets/g/chicken-road.png.asset.json";
import g_plinko from "@/assets/g/plinko.png.asset.json";
import g_chickenRoad20 from "@/assets/g/chicken-road-2-0.png.asset.json";
import g_hamsterRun from "@/assets/g/hamster-run.png.asset.json";
import g_luckyMines from "@/assets/g/lucky-mines.png.asset.json";
import g_tower from "@/assets/g/tower.png.asset.json";
import g_forestArrow from "@/assets/g/forest-arrow.png.asset.json";
import g_aviaFly from "@/assets/g/avia-fly.png.asset.json";
import g_plinko1000Aztec from "@/assets/g/plinko-1000-aztec.png.asset.json";
import g_sugarDaddy from "@/assets/g/sugar-daddy.png.asset.json";
import g_mines from "@/assets/g/mines.png.asset.json";
import g_hotMines from "@/assets/g/hot-mines.png.asset.json";
import g_limbo from "@/assets/g/limbo.png.asset.json";
import g_coinflip from "@/assets/g/coinflip.png.asset.json";
import g_triple from "@/assets/g/triple.png.asset.json";
import g_bubbles from "@/assets/g/bubbles.png.asset.json";
import g_wheel from "@/assets/g/wheel.png.asset.json";
import g_stairs from "@/assets/g/stairs.png.asset.json";
import g_roulette from "@/assets/g/roulette.png.asset.json";
import g_penaltyUnlimited from "@/assets/g/penalty-unlimited.png.asset.json";
import g_squidGamebler from "@/assets/g/squid-gamebler.png.asset.json";
import g_crash from "@/assets/g/crash.png.asset.json";
import g_cryptos from "@/assets/g/cryptos.png.asset.json";
import g_jogoDoBicho from "@/assets/g/jogo-do-bicho.png.asset.json";
import g_jokerPoker from "@/assets/g/joker-poker.png.asset.json";
import g_sweetKeno from "@/assets/g/sweet-keno.png.asset.json";

export type GameCategory = "casino" | "instant";

export type Game = {
  name: string;
  image: string;
  category: GameCategory;
};

export const games: Game[] = [
  { name: "Aviator", image: g_aviator.url, category: "instant" },
  { name: "Spaceman", image: g_spaceman.url, category: "instant" },
  { name: "Penalty Shoot-Out Street", image: g_penaltyShootOutStreet.url, category: "instant" },
  { name: "Doodle Crash", image: g_doodleCrash.url, category: "instant" },
  { name: "Zeppelin", image: g_zeppelin.url, category: "instant" },
  { name: "To Mars and Beyond", image: g_toMarsAndBeyond.url, category: "instant" },
  { name: "Cricket Crash", image: g_cricketCrash.url, category: "instant" },
  { name: "Save the Hamster", image: g_saveTheHamster.url, category: "instant" },
  { name: "Goblin Run", image: g_goblinRun.url, category: "instant" },
  { name: "Quantum X", image: g_quantumX.url, category: "instant" },
  { name: "High Flyer", image: g_highFlyer.url, category: "instant" },
  { name: "F777 Fighter", image: g_f777Fighter.url, category: "instant" },
  { name: "Mriya", image: g_mriya.url, category: "instant" },
  { name: "Long Ball", image: g_longBall.url, category: "instant" },
  { name: "Cricket Boom", image: g_cricketBoom.url, category: "instant" },
  { name: "Cash or Crash 2", image: g_cashOrCrash2.url, category: "instant" },
  { name: "Crash Puck", image: g_crashPuck.url, category: "instant" },
  { name: "Crash Touchdown", image: g_crashTouchdown.url, category: "instant" },
  { name: "Space Blaze", image: g_spaceBlaze.url, category: "instant" },
  { name: "Cash It Multiplayer", image: g_cashItMultiplayer.url, category: "instant" },
  { name: "Cash or Crash", image: g_cashOrCrash.url, category: "instant" },
  { name: "Crash Birds Multiplayer", image: g_crashBirdsMultiplayer.url, category: "instant" },
  { name: "Kick It Multiplayer", image: g_kickItMultiplayer.url, category: "instant" },
  { name: "Lucky Crumbling", image: g_luckyCrumbling.url, category: "instant" },
  { name: "Crash, Hamster, Crash!", image: g_crashHamsterCrash.url, category: "instant" },
  { name: "Crash Birds", image: g_crashBirds.url, category: "instant" },
  { name: "Fortune Tumble", image: g_fortuneTumble.url, category: "instant" },
  { name: "Triple Cash Or Crash", image: g_tripleCashOrCrash.url, category: "instant" },
  { name: "Cash Galaxy", image: g_cashGalaxy.url, category: "instant" },
  { name: "Stormy Witch", image: g_stormyWitch.url, category: "instant" },
  { name: "Need for X", image: g_needForX.url, category: "instant" },
  { name: "9 Coins Easter", image: g_9CoinsEaster.url, category: "instant" },
  { name: "Raider Jane's Crypt of Fortune", image: g_raiderJaneSCryptOfF.url, category: "instant" },
  { name: "Big Bass Crash", image: g_bigBassCrash.url, category: "instant" },
  { name: "Rocket Race", image: g_rocketRace.url, category: "instant" },
  { name: "Monster Go Shopping", image: g_monsterGoShopping.url, category: "instant" },
  { name: "Fly To Universe", image: g_flyToUniverse.url, category: "instant" },
  { name: "Deep Rush", image: g_deepRush.url, category: "instant" },
  { name: "Sky Lantern", image: g_skyLantern.url, category: "instant" },
  { name: "Double Bubble", image: g_doubleBubble.url, category: "instant" },
  { name: "Fair Crash", image: g_fairCrash.url, category: "instant" },
  { name: "Space XY", image: g_spaceXy.url, category: "instant" },
  { name: "Top Eagle", image: g_topEagle.url, category: "instant" },
  { name: "Limbo XY", image: g_limboXy.url, category: "instant" },
  { name: "Gift X", image: g_giftX.url, category: "instant" },
  { name: "Dragon's Crash", image: g_dragonSCrash.url, category: "instant" },
  { name: "Arizona Smith and the Mayan Treasure", image: g_arizonaSmithAndT.url, category: "instant" },
  { name: "Magnify Man", image: g_magnifyMan.url, category: "instant" },
  { name: "Chicken Road", image: g_chickenRoad.url, category: "casino" },
  { name: "Plinko", image: g_plinko.url, category: "casino" },
  { name: "Chicken Road 2.0", image: g_chickenRoad20.url, category: "casino" },
  { name: "Hamster Run", image: g_hamsterRun.url, category: "casino" },
  { name: "Lucky Mines", image: g_luckyMines.url, category: "casino" },
  { name: "Tower", image: g_tower.url, category: "casino" },
  { name: "Forest Arrow", image: g_forestArrow.url, category: "casino" },
  { name: "Avia Fly", image: g_aviaFly.url, category: "casino" },
  { name: "Plinko 1000 Aztec", image: g_plinko1000Aztec.url, category: "casino" },
  { name: "Sugar Daddy", image: g_sugarDaddy.url, category: "casino" },
  { name: "Mines", image: g_mines.url, category: "casino" },
  { name: "Hot Mines", image: g_hotMines.url, category: "casino" },
  { name: "Limbo", image: g_limbo.url, category: "casino" },
  { name: "CoinFlip", image: g_coinflip.url, category: "casino" },
  { name: "Triple", image: g_triple.url, category: "casino" },
  { name: "Bubbles", image: g_bubbles.url, category: "casino" },
  { name: "Wheel", image: g_wheel.url, category: "casino" },
  { name: "Stairs", image: g_stairs.url, category: "casino" },
  { name: "Roulette", image: g_roulette.url, category: "casino" },
  { name: "Penalty Unlimited", image: g_penaltyUnlimited.url, category: "casino" },
  { name: "Squid Gamebler", image: g_squidGamebler.url, category: "casino" },
  { name: "Crash", image: g_crash.url, category: "casino" },
  { name: "Cryptos", image: g_cryptos.url, category: "casino" },
  { name: "Jogo Do Bicho", image: g_jogoDoBicho.url, category: "casino" },
  { name: "Joker Poker", image: g_jokerPoker.url, category: "casino" },
  { name: "Sweet Keno", image: g_sweetKeno.url, category: "casino" },
];
