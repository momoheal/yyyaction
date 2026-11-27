const _e=["#c9cdd3","#5fd36a","#4aa8ff","#b56cff","#ffb93b","#ff4f4f"],
Gn=["201,205,211","95,211,106","74,168,255","181,108,255","255,185,59","255,79,79"],
li=["普通","优秀","精良","史诗","传说","至臻"],
B1=[.32,.45,.65,.9,1.25,1.8],
Vo=360,
Fs=6,
Ma=3200,
Ta=2400,
Me=(r,a,l,s,i)=>({
  id:r,
  name:a,
  icon:l,
  rarity:s,
  value:i,
  kind:"loot"
}),
Bo=[Me("crumb","面包屑","🍞",0,800),Me("news","旧报纸","📰",0,1100),Me("corn","玉米棒","🌽",0,900),Me("bolt","螺丝钉","🔩",0,1400),Me("tissue","卷纸","🧻",0,1e3),Me("sock","旧袜子","🧦",0,600),Me("can","午餐肉罐头","🥫",1,3200),Me("battery","电池","🔋",1,4200),Me("torch","手电筒","🔦",1,3800),Me("wrench","扳手","🔧",1,4800),Me("coffee","速溶咖啡","☕",1,2900),Me("magnet","强力磁铁","🧲",1,3500),Me("radio","军用对讲机","📻",2,12500),Me("hdd","机械硬盘","💽",2,14800),Me("watch","机械表","⌚",2,16500),Me("scope","望远镜","🔭",2,13200),Me("pad","游戏手柄","🎮",2,11e3),Me("chem","化学试剂","🧪",2,15500),Me("tablet","军用平板","📱",3,36e3),Me("drone","侦察无人机","🚁",3,48e3),Me("camera","古董相机","📷",3,32e3),Me("chip","加密芯片","💾",3,42e3),Me("micro","显微镜","🔬",3,38e3),Me("vase","古董花瓶","🏺",4,118e3),Me("gold","一袋金币","💰",4,135e3),Me("laptop","军用笔记本","💻",4,108e3),Me("crown","鸭王王冠","👑",4,168e3),Me("statue","神秘石像","🗿",4,125e3),Me("heart","鸭之心","💎",5,98e4),Me("tear","池塘之泪","🔮",5,72e4),Me("brain","量子鸭脑","🧠",5,65e4),Me("trophy","黄金奖杯","🏆",5,54e4),Me("rocket","火箭模型","🚀",5,48e4),Me("anchor_charm","船锚吊坠","⚓",2,14e3),Me("ship_bell","铜船钟","🔔",3,38e3),Me("pearl","黑珍珠","🦪",4,12e4),Me("slag_gem","熔渣晶石","🪨",2,13e3),Me("gear_set","精密齿轮组","⚙️",3,40e3),Me("molten_core","熔铸核心","🔶",4,13e4),Me("golden_feather","金羽毛","🪶",2,15e3),Me("duck_egg_rare","斑点鸭蛋","🥚",3,36e3),Me("swamp_orchid","沼泽兰花","🌺",4,11e4),Me("ice_shard","永冻冰晶","🧊",2,14e3),Me("radar_chip","雷达芯片","📡",3,42e3),Me("snow_medal","雪原勋章","🎖️",4,12e4),Me("flight_log","飞行日志","📒",2,13e3),Me("jet_part","喷气发动机叶片","🌀",3,44e3),Me("ace_helmet","王牌头盔","🪖",4,14e4),Me("jade_seal","玉玺","🟩",3,46e3),Me("royal_scepter","王室权杖","🔱",4,16e4),Me("bread_ration","面包干粮","🥖",0,900),Me("farm_deed","农场地契","📜",2,12e3),Me("fish_bone","咸鱼干","🐟",0,700),Me("sea_glass","海玻璃","🔷",1,2800),Me("rust_nut","锈螺母","🔩",0,800),Me("copper_wire","铜线卷","🧶",1,3e3),Me("eggshell","彩绘蛋壳","🥚",0,800),Me("nest_twig","编织鸟巢","🪺",1,2900),Me("frozen_fish","冻鱼","🐠",0,750),Me("thermos","保温壶","🧴",1,3100),Me("rivet","航空铆钉","🔘",0,850),Me("pilot_badge","飞行员胸章","🏅",1,3200),Me("incense","香烛","🕯️",0,800),Me("bronze_coin","古铜钱","🪙",1,3e3),Me("jade_bead","玉珠","🟢",2,14e3),Me("duck_comic","鸭鸭漫画","📚",1,2800),Me("rubber_duck","小黄鸭玩具","🦆",1,3300)],
ty=[0,1,2,3,4,5].map(r=>Bo.filter(a=>a.rarity===r)),
u1=[Me("duck_soda","鸭力汽水","🥤",1,2600),Me("orange_soda","柑橘汽水","🧃",1,2400),Me("water_bottle","瓶装水","💧",0,1200),Me("chips","盐味薯片","🍟",0,900),Me("coffee_can","罐装咖啡","☕",1,3200),Me("battery_pack","备用电池组","🔋",1,4200)],
Kl={
  id:"bandage",
  name:"绷带",
  icon:"🩹",
  rarity:0,
  value:1500,
  kind:"bandage"
},
Wo={
  id:"medkit",
  name:"急救针",
  icon:"💉",
  rarity:2,
  value:9e3,
  kind:"medkit"
},
L1={
  id:"grenade",
  name:"破片手雷",
  icon:"💣",
  rarity:1,
  value:4e3,
  kind:"grenade",
  throwable:"grenade"
},
E1={
  id:"smoke",
  name:"烟雾弹",
  icon:"🌫️",
  rarity:1,
  value:6e3,
  kind:"grenade",
  throwable:"smoke"
},
W1={
  id:"flash",
  name:"闪光弹",
  icon:"✨",
  rarity:2,
  value:7500,
  kind:"grenade",
  throwable:"flash"
},
Q1={
  id:"fire",
  name:"燃烧瓶",
  icon:"🔥",
  rarity:2,
  value:8500,
  kind:"grenade",
  throwable:"fire"
},
St=["grenade","smoke","flash","fire"],
ay=[L1,E1,W1,Q1],
qt={
  grenade:{
    id:"grenade",
    name:"破片手雷",
    icon:"💣",
    color:"#ff8a3c",
    radius:150,
    fuse:1.3,
    value:4e3,
    damage:135,
    desc:"范围爆发伤害，可引爆油桶"
  },
  smoke:{
    id:"smoke",
    name:"烟雾弹",
    icon:"🌫️",
    color:"#b9c6cc",
    radius:190,
    fuse:1.1,
    value:6e3,
    damage:0,
    desc:"烟雾持续 9 秒，阻断敌人视线"
  },
  flash:{
    id:"flash",
    name:"闪光弹",
    icon:"✨",
    color:"#fff3b0",
    radius:260,
    fuse:1,
    value:7500,
    damage:0,
    desc:"范围内敌人目眩 2.6 秒，停止射击"
  },
  fire:{
    id:"fire",
    name:"燃烧瓶",
    icon:"🔥",
    color:"#ff5a2a",
    radius:135,
    fuse:1.2,
    value:8500,
    damage:18,
    desc:"地面燃烧 6 秒，持续灼烧范围内目标"
  }
},
Qo=[{
  id:"armor1",
  name:"一级护甲",
  icon:"gear:armor1",
  rarity:0,
  value:4e3,
  kind:"armor",
  armor:25
},{
  id:"armor2",
  name:"二级护甲",
  icon:"gear:armor2",
  rarity:1,
  value:12e3,
  kind:"armor",
  armor:60
},{
  id:"armor3",
  name:"三级护甲",
  icon:"gear:armor3",
  rarity:2,
  value:26e3,
  kind:"armor",
  armor:90
},{
  id:"armor4",
  name:"四级护甲",
  icon:"gear:armor4",
  rarity:3,
  value:45e3,
  kind:"armor",
  armor:120
},{
  id:"armor5",
  name:"五级护甲",
  icon:"gear:armor5",
  rarity:3,
  value:78e3,
  kind:"armor",
  armor:150
},{
  id:"armor6",
  name:"六级护甲",
  icon:"gear:armor6",
  rarity:4,
  value:12e4,
  kind:"armor",
  armor:180
}];
function Zl(r){
  return Qo.find(a=>a.id===r)
}
const G1={
  armor1:0,
  armor2:0,
  armor3:1,
  armor4:1,
  armor5:2,
  armor6:2
},
ht={
  pistol:{
    id:"pistol",
    name:"M9 鸭牌手枪",
    short:"M9",
    tier:0,
    dmg:26,
    rate:4.6,
    mag:12,
    reload:1,
    spread:.035,
    pellets:1,
    speed:1350,
    range:720,
    shake:.1,
    kick:3,
    noise:520,
    sound:"pistol",
    value:3e3,
    len:12,
    color:"#2b2b2e",
    pierce:0,
    rarity:0
  },
  smg:{
    id:"smg",
    name:"MP5 冲锋枪",
    short:"MP5",
    tier:1,
    dmg:17,
    rate:11,
    mag:30,
    reload:1.5,
    spread:.075,
    pellets:1,
    speed:1400,
    range:680,
    shake:.085,
    kick:2.5,
    noise:600,
    sound:"smg",
    value:18e3,
    len:18,
    color:"#303338",
    pierce:0,
    rarity:1
  },
  shotgun:{
    id:"shotgun",
    name:"M870 霰弹枪",
    short:"M870",
    tier:2,
    dmg:19,
    rate:1.7,
    mag:8,
    reload:1.9,
    spread:.26,
    pellets:9,
    speed:1150,
    range:450,
    shake:.34,
    kick:9,
    noise:750,
    sound:"shotgun",
    value:32e3,
    len:24,
    color:"#5a3d26",
    pierce:0,
    rarity:2
  },
  rifle:{
    id:"rifle",
    name:"M4A1 突击步枪",
    short:"M4A1",
    tier:3,
    dmg:28,
    rate:8.5,
    mag:30,
    reload:1.9,
    spread:.04,
    pellets:1,
    speed:1650,
    range:950,
    shake:.13,
    kick:3.5,
    noise:800,
    sound:"rifle",
    value:42e3,
    len:25,
    color:"#3a3f36",
    pierce:0,
    rarity:2
  },
  sniper:{
    id:"sniper",
    name:"AWM 狙击步枪",
    short:"AWM",
    tier:4,
    dmg:185,
    rate:1.15,
    mag:6,
    reload:2.3,
    spread:.004,
    pellets:1,
    speed:2800,
    range:1500,
    shake:.45,
    kick:12,
    noise:1100,
    sound:"sniper",
    value:88e3,
    len:33,
    color:"#4a5a3a",
    pierce:2,
    rarity:3
  },
  lmg:{
    id:"lmg",
    name:"M249 轻机枪",
    short:"M249",
    tier:4,
    dmg:24,
    rate:12,
    mag:80,
    reload:3.4,
    spread:.085,
    pellets:1,
    speed:1550,
    range:900,
    shake:.15,
    kick:3.5,
    noise:900,
    sound:"lmg",
    value:76e3,
    len:29,
    color:"#2f3230",
    pierce:0,
    rarity:3
  },
  mp9:{
    id:"mp9",
    name:"MP9 冲锋枪",
    short:"MP9",
    tier:1,
    dmg:20,
    rate:13,
    mag:26,
    reload:1.35,
    spread:.065,
    pellets:1,
    speed:1450,
    range:640,
    shake:.08,
    kick:2.2,
    noise:580,
    sound:"smg",
    value:21e3,
    len:17,
    color:"#33373d",
    pierce:0,
    rarity:1
  },
  ak:{
    id:"ak",
    name:"AK47 突击步枪",
    short:"AK47",
    tier:3,
    dmg:36,
    rate:7.2,
    mag:30,
    reload:2,
    spread:.05,
    pellets:1,
    speed:1700,
    range:980,
    shake:.16,
    kick:5,
    noise:850,
    sound:"rifle",
    value:52e3,
    len:27,
    color:"#4a3324",
    pierce:1,
    rarity:2
  },
  dmr:{
    id:"dmr",
    name:"SVD 精确射手步枪",
    short:"SVD",
    tier:4,
    dmg:75,
    rate:3.1,
    mag:15,
    reload:2.0,
    spread:.012,
    pellets:1,
    speed:2300,
    range:1250,
    shake:.22,
    kick:7,
    noise:1e3,
    sound:"sniper",
    value:84e3,
    len:31,
    color:"#3c4631",
    pierce:1,
    rarity:3
  },
  m4legend:{
    id:"m4legend",
    name:"渐变之影 M4A1",
    short:"M4·影",
    tier:5,
    dmg:42,
    rate:9.2,
    mag:35,
    reload:1.7,
    spread:.028,
    pellets:1,
    speed:1750,
    range:1050,
    shake:.12,
    kick:3,
    noise:810,
    sound:"rifle",
    value:56e4,
    len:26,
    color:"#8e5bd6",
    pierce:2,
    rarity:5
  },
  awmlegend:{
    id:"awmlegend",
    name:"龙纹 AWM",
    short:"AWM·龙",
    tier:5,
    dmg:190,
    rate:1,
    mag:6,
    reload:2.4,
    spread:.002,
    pellets:1,
    speed:3e3,
    range:1600,
    shake:.42,
    kick:11,
    noise:1150,
    sound:"sniper",
    value:88e4,
    len:34,
    color:"#c0392b",
    pierce:3,
    rarity:5
  },
  minigun:{
    id:"minigun",
    name:"M134 火神炮",
    short:"M134",
    tier:5,
    dmg:30,
    rate:16,
    mag:150,
    reload:4.2,
    spread:.1,
    pellets:1,
    speed:1600,
    range:950,
    shake:.18,
    kick:3,
    noise:1100,
    sound:"lmg",
    value:72e4,
    len:36,
    color:"#6b4a1e",
    pierce:1,
    rarity:5
  },
  rpg:{
    id:"rpg",
    name:"RPG 火箭筒",
    short:"RPG",
    tier:5,
    dmg:110,
    rate:.9,
    mag:3,
    reload:2.5,
    spread:.008,
    pellets:1,
    speed:820,
    range:1100,
    shake:.5,
    kick:11,
    noise:1300,
    sound:"explosion",
    value:140e4,
    len:40,
    color:"#4d5238",
    pierce:0,
    rarity:5,
    blast:{
      radius:260,
      dmg:340
    }
  },
  frostmp9:{
    id:"frostmp9",
    name:"冰风 MP9",
    short:"冰MP9",
    tier:5,
    dmg:22,
    rate:13,
    mag:32,
    reload:1.4,
    spread:.045,
    pellets:1,
    speed:1500,
    range:700,
    shake:.08,
    kick:2,
    noise:560,
    sound:"smg",
    value:98e4,
    len:18,
    color:"#7fd8ef",
    pierce:0,
    rarity:5
  },
  ironbreaker:{
    id:"ironbreaker",
    name:"玄铁破壁者",
    short:"破壁者",
    tier:5,
    dmg:48,
    rate:8.5,
    mag:90,
    reload:2.6,
    spread:.055,
    pellets:1,
    speed:1700,
    range:1050,
    shake:.15,
    kick:4,
    noise:950,
    sound:"lmg",
    value:140e4,
    len:30,
    color:"#8f1d1d",
    pierce:3,
    rarity:5,
    antiArmor:.5
  },
  aa12:{
    id:"aa12",
    name:"AA12 雷霆霰弹",
    short:"AA12",
    tier:5,
    dmg:20,
    rate:2.6,
    mag:12,
    reload:2.4,
    spread:.2,
    pellets:10,
    speed:1200,
    range:500,
    shake:.36,
    kick:10,
    noise:950,
    sound:"shotgun",
    value:16e5,
    len:30,
    color:"#2d5a52",
    pierce:0,
    rarity:5
  },
  hk416:{
    id:"hk416",
    name:"HK416 疾风突击",
    short:"HK416",
    tier:5,
    dmg:29,
    rate:12.5,
    mag:45,
    reload:1.8,
    spread:.03,
    pellets:1,
    speed:1750,
    range:1050,
    shake:.13,
    kick:3,
    noise:860,
    sound:"rifle",
    value:18e5,
    len:28,
    color:"#2f3d4a",
    pierce:1,
    rarity:5
  },
  barrett:{
    id:"barrett",
    name:"巴雷特 M82 重狙",
    short:"M82",
    tier:5,
    dmg:340,
    rate:.65,
    mag:5,
    reload:2.8,
    spread:.001,
    pellets:1,
    speed:3200,
    range:1900,
    shake:.6,
    kick:16,
    noise:1400,
    sound:"sniper",
    value:22e5,
    len:42,
    color:"#5a5f45",
    pierce:4,
    rarity:5
  }
};
function bc(r){
  const a=ht[r];
  return a?Oc.has(r)?"发射器":a.pellets>1?"霰弹枪":r==="pistol"?"手枪":r==="dmr"?"精确射手":a.rate<=1.2?"狙击枪":a.rate>=10?"冲锋枪":a.mag>=60?"机枪":"突击步枪":"其他"
}
function ly(r){
  const a=ht[r];
  return a?a.blast?`爆炸 ${a.blast.dmg} · 半径 ${a.blast.radius}`:a.antiArmor?`无视 ${Math.round(a.antiArmor*100)}% 护甲`:U1.has(r)?"命中冰缓":a.pellets>1?`${a.pellets} 弹丸 · 收束改造专属`:a.pierce?`穿透 ${a.pierce}`:"通用枪械":""
}
const U1=new Set(["frostmp9"]),
Oc=new Set(["rpg"]);
function ra(r){
  const a=ht[r];
  return{
    id:"w_"+r,
    name:a.name,
    icon:`gear:w_${r}`,
    rarity:a.rarity,
    value:a.value,
    kind:"weapon",
    weapon:r
  }
}
const Yn={
  chicken:{
    id:"chicken",
    name:"暴走鸡",
    hp:26,
    armor:0,
    r:11,
    speed:250,
    vision:430,
    reaction:.12,
    accuracy:0,
    score:200,
    weapons:[],
    dmgMul:0,
    bulletSpeed:0,
    prefMin:0,
    prefMax:0,
    burst:[0,0],
    melee:6,
    boss:!1
  },
  bandit:{
    id:"bandit",
    name:"鸭匪",
    hp:70,
    armor:0,
    r:15,
    speed:150,
    vision:480,
    reaction:.75,
    accuracy:.17,
    score:600,
    weapons:["pistol","smg","smg","shotgun"],
    dmgMul:.24,
    bulletSpeed:680,
    prefMin:190,
    prefMax:370,
    burst:[3,5],
    melee:0,
    boss:!1
  },
  elite:{
    id:"elite",
    name:"精英鸭匪",
    hp:100,
    armor:50,
    r:16,
    speed:165,
    vision:520,
    reaction:.5,
    accuracy:.12,
    score:1500,
    weapons:["rifle","smg","shotgun","rifle"],
    dmgMul:.26,
    bulletSpeed:760,
    prefMin:220,
    prefMax:420,
    burst:[4,7],
    melee:0,
    boss:!1
  },
  armored:{
    id:"armored",
    name:"护甲鸭",
    hp:85,
    armor:80,
    r:17,
    speed:122,
    vision:475,
    reaction:.72,
    accuracy:.19,
    score:1300,
    weapons:["shotgun"],
    dmgMul:.23,
    bulletSpeed:630,
    prefMin:90,
    prefMax:200,
    burst:[1,1],
    melee:0,
    boss:!1
  },
  lookout:{
    id:"lookout",
    name:"哨戒鸭",
    hp:60,
    armor:0,
    r:14,
    speed:175,
    vision:600,
    reaction:.68,
    accuracy:.16,
    score:1e3,
    weapons:["rifle"],
    dmgMul:.2,
    bulletSpeed:820,
    prefMin:370,
    prefMax:570,
    burst:[2,3],
    melee:0,
    boss:!1
  },
  shield:{
    id:"shield",
    name:"盾卫鸭",
    hp:115,
    armor:200,
    r:18,
    speed:92,
    vision:480,
    reaction:.7,
    accuracy:.18,
    score:2400,
    weapons:["smg"],
    dmgMul:.22,
    bulletSpeed:700,
    prefMin:110,
    prefMax:240,
    burst:[3,5],
    melee:0,
    boss:!1,
    frontArmor:!0
  },
  hen:{
    id:"hen",
    name:"投弹母鸡",
    hp:70,
    armor:0,
    r:15,
    speed:130,
    vision:560,
    reaction:.6,
    accuracy:0,
    score:2100,
    weapons:[],
    dmgMul:0,
    bulletSpeed:0,
    prefMin:240,
    prefMax:420,
    burst:[0,0],
    melee:5,
    boss:!1,
    thrower:!0
  },
  goose:{
    id:"goose",
    name:"鹅老大",
    hp:1040,
    armor:140,
    r:26,
    speed:130,
    vision:650,
    reaction:.4,
    accuracy:.15,
    score:15e3,
    weapons:["lmg"],
    dmgMul:.24,
    bulletSpeed:700,
    prefMin:150,
    prefMax:380,
    burst:[10,16],
    melee:0,
    boss:!0,
    encounter:{
      skill:"slam",
      skillCycle:["slam","spiral"],
      skillName:"鹅鸣",
      skillLabels:{
        slam:"震地践踏",
        spiral:"鹅鸣音波"
      },
      warning:"震地波无视掩体，翻滚可躲；鹅鸣音波会向四周射出一圈音波弹，从弹幕缝隙穿过去",
      phaseWarning:"震地更频繁、范围更大，呼叫的鸭匪更多",
      phaseAt:.5,
      phases:[{
        windup:1.25,
        cooldown:8,
        damage:14,
        range:300
      },{
        windup:1,
        cooldown:5.5,
        damage:20,
        range:400
      }],
      trophy:Me("goose_crest","鹅老大羽冠","🪶",4,12e4),
      extraLootWeights:[0,0,0,1,0,0],
      rewardRolls:[{count:1,weights:[0,0,10,40,50,0]}],
      weaponDrops:["lmg"]
    }
  },
  harborBoss:{
    id:"harborBoss",
    name:"铁钩船长",
    hp:830,
    armor:90,
    r:24,
    speed:140,
    vision:620,
    reaction:.5,
    accuracy:.22,
    score:11e3,
    weapons:["shotgun"],
    dmgMul:.26,
    bulletSpeed:620,
    prefMin:90,
    prefMax:240,
    burst:[1,1],
    melee:0,
    boss:!0,
    encounter:{
      skill:"charge",
      skillCycle:["charge","barrage","slam"],
      skillName:"铁钩连击",
      skillLabels:{
        charge:"铁钩冲撞",
        barrage:"舷炮齐射",
        slam:"锚链横扫"
      },
      warning:"红线冲撞可引它撞货柜致晕；舷炮齐射会在你脚下标出红圈，看到就离开；靠太近会被锚链横扫",
      phaseWarning:"冲撞预警缩短，冲得更远，横扫更频繁",
      phaseAt:.5,
      phases:[{
        windup:1.15,
        cooldown:9,
        damage:20,
        range:360
      },{
        windup:.85,
        cooldown:6.5,
        damage:29,
        range:470
      }],
      trophy:Me("captain_log","船长航海日志","📕",4,96e3),
      extraLootWeights:[0,0,0,1,0,0],
      rewardRolls:[{count:1,weights:[0,0,0,30,60,0]},{count:1,weights:[0,0,10,45,45,0]}],
      weaponDrops:["sniper"]
    }
  },
  foundryBoss:{
    id:"foundryBoss",
    name:"炉心监工",
    hp:1300,
    armor:210,
    r:27,
    speed:112,
    vision:690,
    reaction:.42,
    accuracy:.16,
    score:22e3,
    weapons:["rifle"],
    dmgMul:.31,
    bulletSpeed:760,
    prefMin:180,
    prefMax:300,
    burst:[5,8],
    melee:0,
    boss:!0,
    encounter:{
      skill:"pulse",
      skillCycle:["pulse","magma","summon"],
      skillName:"炉心过载",
      skillLabels:{
        pulse:"炉心热浪",
        magma:"熔渣泼洒",
        summon:"呼叫工头"
      },
      hitText:"炉心热浪！",
      summonText:"工头增援！",
      summon:{
        types:["armored","bandit"],
        counts:[2,3]
      },
      warning:"热浪可被实墙阻挡；熔渣泼洒会在地上留下几滩燃烧的熔渣，别站在里面；之后会呼叫护甲工头",
      phaseWarning:"热浪范围扩大、间隔缩短，增援更多",
      phaseAt:.45,
      phases:[{
        windup:1.3,
        cooldown:9.5,
        damage:22,
        range:250
      },{
        windup:1.1,
        cooldown:6.5,
        damage:30,
        range:340
      }],
      trophy:Me("furnace_core","封存炉芯","🧿",5,26e4),
      extraLootWeights:[0,0,0,0,1,0],
      rewardRolls:[{count:1,weights:[0,0,0,20,70,0]},{count:2,weights:[0,0,10,40,50,0]}],
      weaponDrops:["dmr"]
    }
  },
  broodQueen:{
    id:"broodQueen",
    name:"孵巢鸭后",
    hp:1950,
    armor:175,
    r:30,
    speed:100,
    vision:720,
    reaction:.36,
    accuracy:.16,
    score:32e3,
    weapons:["smg"],
    dmgMul:.29,
    bulletSpeed:700,
    prefMin:180,
    prefMax:360,
    burst:[5,8],
    melee:0,
    boss:!0,
    encounter:{
      skill:"summon",
      skillName:"孵巢潮",
      skillLabels:{
        summon:"孵巢爆发",
        eggrain:"母巢抛卵",
        pulse:"腐叶孢子"
      },
      hitText:"腐叶孢子爆发！",
      ringColor:"rgba(180,255,140,0.95)",
      skillCycle:["summon","eggrain","pulse"],
      summonText:"孵巢增援！",
      summon:{
        types:["chicken","hen","chicken"],
        counts:[3,5]
      },
      warning:"孵巢会孵出小鸡；母巢抛卵会把几颗爆炸蛋扔到你附近；孢子圈可躲到墙后",
      phaseWarning:"孢子范围扩大，孵化更快更多",
      phaseAt:.5,
      phases:[{
        windup:1.4,
        cooldown:9,
        damage:17,
        range:280
      },{
        windup:1.1,
        cooldown:6.5,
        damage:23,
        range:360
      }],
      trophy:Me("queen_egg","鸭后金蛋","🥚",5,62e4),
      extraLootWeights:[0,0,0,0,1,0],
      rewardRolls:[{
        count:1,
        weights:[0,0,0,0,0,1]
      },{
        count:2,
        weights:[0,0,0,0,52,48]
      },{
        count:1,
        weights:[0,0,18,32,36,14]
      }],
      weaponDrops:["frostmp9"]
    }
  },
  frostMarshal:{
    id:"frostMarshal",
    name:"霜羽元帅",
    hp:1690,
    armor:185,
    r:28,
    speed:140,
    vision:720,
    reaction:.35,
    accuracy:.14,
    score:3e4,
    weapons:["frostmp9"],
    dmgMul:.31,
    bulletSpeed:800,
    prefMin:260,
    prefMax:460,
    burst:[6,10],
    melee:0,
    boss:!0,
    encounter:{
      skill:"pulse",
      skillName:"极夜寒潮",
      skillCycle:["pulse","blink","spiral"],
      skillLabels:{
        pulse:"霜环爆发",
        blink:"霜影闪现",
        spiral:"冰棱环射"
      },
      hitText:"霜羽释放寒潮！",
      ringColor:"rgba(105,215,255,0.98)",
      warning:"寒潮可躲到墙后；霜影闪现会瞬移到你身后再爆一次寒潮，听到提示立刻翻滚；冰棱环射从缝隙穿过。铁壁统领驻守东侧擂台",
      phaseWarning:"寒潮范围扩大、预警缩短",
      phaseAt:.45,
      phases:[{
        windup:1.2,
        cooldown:8.5,
        damage:24,
        range:300
      },{
        windup:.95,
        cooldown:6,
        damage:32,
        range:390
      }],
      trophy:Me("frost_insignia","霜羽元帅徽记","❄️",5,58e4),
      extraLootWeights:[0,0,0,0,1,0],
      rewardRolls:[{
        count:1,
        weights:[0,0,0,0,0,1]
      },{
        count:2,
        weights:[0,0,0,0,55,45]
      },{
        count:1,
        weights:[0,0,12,28,42,18]
      }],
      weaponDrops:["awmlegend"]
    }
  },
  ironGuard:{
    id:"ironGuard",
    name:"铁壁统领",
    hp:2080,
    armor:300,
    r:31,
    speed:88,
    vision:620,
    reaction:.45,
    accuracy:.2,
    score:34e3,
    weapons:["lmg"],
    dmgMul:.31,
    bulletSpeed:720,
    prefMin:120,
    prefMax:280,
    burst:[8,12],
    melee:0,
    boss:!0,
    frontArmor:!0,
    encounter:{
      skill:"charge",
      skillName:"钢铁破阵",
      skillCycle:["charge","slam","fortify"],
      skillLabels:{
        charge:"铁壁冲锋",
        slam:"重盾顿地",
        fortify:"钢铁壁垒"
      },
      ringColor:"rgba(255,92,72,0.98)",
      warning:"黑红重甲正面免疫大半伤害，绕后或将它的护甲打穿；击杀必掉传说武器「玄铁破壁者」",
      phaseWarning:"冲撞更频繁；钢铁壁垒会回复护甲，抓住它撞墙晕眩的 1.5 秒绕后输出",
      phaseAt:.5,
      phases:[{
        windup:1.3,
        cooldown:8,
        damage:26,
        range:380
      },{
        windup:1,
        cooldown:6,
        damage:36,
        range:480
      }],
      trophy:Me("iron_badge","铁壁统领勋章","🛡️",5,54e4),
      extraLootWeights:[0,0,0,0,1,0],
      rewardRolls:[{
        count:1,
        weights:[0,0,0,0,0,1]
      },{
        count:2,
        weights:[0,0,0,0,58,42]
      },{
        count:1,
        weights:[0,0,14,32,38,16]
      }],
      weaponDrops:["ironbreaker"]
    }
  },
  flameAce:{
    id:"flameAce",
    name:"烈焰王牌",
    hp:1400,
    armor:150,
    r:28,
    speed:150,
    vision:740,
    reaction:.32,
    accuracy:.15,
    score:32e3,
    weapons:["smg"],
    dmgMul:.26,
    bulletSpeed:820,
    prefMin:260,
    prefMax:480,
    burst:[6,9],
    melee:0,
    boss:!0,
    encounter:{
      skill:"strafe",
      skillCycle:["strafe","napalm","strafe","charge"],
      skillName:"焦土空袭",
      skillLabels:{
        strafe:"低空扫射",
        napalm:"凝固汽油弹",
        charge:"加力冲刺"
      },
      ringColor:"rgba(255,120,40,0.98)",
      warning:"它会呼叫僚机沿红色航线低空扫射，看到航线立刻横向离开；凝固汽油弹会留下一串燃烧带",
      phaseWarning:"扫射变成两条交叉航线，燃烧带更长",
      phaseAt:.5,
      phases:[{
        windup:1.3,
        cooldown:8,
        damage:22,
        range:900
      },{
        windup:1.05,
        cooldown:6,
        damage:28,
        range:1100
      }],
      trophy:Me("ace_wings","王牌飞行徽章","🎖️",5,56e4),
      extraLootWeights:[0,0,0,0,1,0],
      rewardRolls:[{
        count:1,
        weights:[0,0,0,0,0,1]
      },{
        count:2,
        weights:[0,0,0,0,55,45]
      },{
        count:1,
        weights:[0,0,12,28,42,18]
      }],
      weaponDrops:["minigun"]
    }
  },
  radarWarden:{
    id:"radarWarden",
    name:"冰霜雷达官",
    hp:1250,
    armor:200,
    r:27,
    speed:105,
    vision:900,
    reaction:.3,
    accuracy:.12,
    score:3e4,
    weapons:["dmr"],
    dmgMul:.28,
    bulletSpeed:1100,
    prefMin:420,
    prefMax:700,
    burst:[1,2],
    melee:0,
    boss:!0,
    encounter:{
      skill:"scan",
      skillCycle:["scan","icewall","mines","scan"],
      skillName:"极地雷网",
      skillLabels:{
        scan:"雷达锁定",
        icewall:"冰墙封锁",
        mines:"冰霜地雷"
      },
      ringColor:"rgba(120,220,255,0.98)",
      warning:"雷达扫描线扫过你时会被锁定并遭到狙击，躲进掩体切断视线；它会竖起冰墙封路、在地上撒冰霜地雷",
      phaseWarning:"雷达转速加快，冰墙更长，地雷更多",
      phaseAt:.45,
      phases:[{
        windup:1.2,
        cooldown:8.5,
        damage:26,
        range:900
      },{
        windup:.95,
        cooldown:6,
        damage:34,
        range:1000
      }],
      trophy:Me("radar_core","极地雷达核心","📡",5,54e4),
      extraLootWeights:[0,0,0,0,1,0],
      rewardRolls:[{
        count:1,
        weights:[0,0,0,0,0,1]
      },{
        count:2,
        weights:[0,0,0,0,58,42]
      },{
        count:1,
        weights:[0,0,14,32,38,16]
      }],
      weaponDrops:["frostmp9"]
    }
  },
  duckKing:{
    id:"duckKing",
    name:"鸭王",
    hp:3380,
    armor:280,
    r:35,
    speed:120,
    vision:760,
    reaction:.3,
    accuracy:.15,
    score:55e3,
    weapons:["ak"],
    dmgMul:.34,
    bulletSpeed:820,
    prefMin:200,
    prefMax:400,
    burst:[6,10],
    melee:0,
    boss:!0,
    encounter:{
      skill:"slam",
      skillCycle:["slam","barrage","summon","charge","spiral","pulse"],
      skillName:"王权轮招",
      skillLabels:{
        slam:"王座震地",
        barrage:"王命炮击",
        summon:"禁卫召集",
        charge:"御驾冲锋",
        spiral:"金币弹幕",
        pulse:"王权冲击"
      },
      ringColor:"rgba(255,205,90,0.95)",
      summonText:"禁卫召集！",
      summon:{
        types:["elite","hen","shield"],
        counts:[2,4]
      },
      warning:"鸭王六招轮换：震地、炮击红圈、召集禁卫、冲撞、金币环形弹幕、王权冲击，看清预警形状再躲",
      phaseWarning:"四连招式全面提速，召唤更多护卫",
      phaseAt:.45,
      phases:[{
        windup:1.15,
        cooldown:7.5,
        damage:26,
        range:340
      },{
        windup:.9,
        cooldown:5,
        damage:36,
        range:430
      }],
      trophy:Me("duck_throne","鸭王御座","👑",5,18e5),
      extraLootWeights:[0,0,0,0,0,1],
      rewardRolls:[{
        count:2,
        weights:[0,0,0,0,0,1]
      },{
        count:2,
        weights:[0,0,0,0,35,65]
      },{
        count:1,
        weights:[0,0,0,15,45,40]
      }],
      weaponDrops:["m4legend","awmlegend"]
    }
  }
},
Aa={
  crate:{
    name:"木箱",
    min:2,
    max:4,
    w:34,
    h:30,
    weights:[46,32,15,5.5,1.3,.2]
  },
  toolbox:{
    name:"工具箱",
    min:2,
    max:3,
    w:34,
    h:22,
    weights:[28,40,22,8,1.6,.25]
  },
  medbox:{
    name:"医疗箱",
    min:2,
    max:3,
    w:30,
    h:26,
    weights:[40,40,15,5,0,0],
    special:"med"
  },
  weaponcase:{
    name:"武器箱",
    min:1,
    max:2,
    w:46,
    h:22,
    weights:[0,0,0,0,0,0],
    special:"weapon"
  },
  pc:{
    name:"电脑机箱",
    min:1,
    max:3,
    w:24,
    h:32,
    weights:[8,22,40,22,6,.6]
  },
  desktop:{
    name:"台式电脑",
    min:1,
    max:3,
    w:44,
    h:34,
    weights:[4,16,38,28,12,2]
  },
  laptop:{
    name:"笔记本电脑",
    min:1,
    max:2,
    w:36,
    h:26,
    weights:[3,14,36,31,14,2]
  },
  safe:{
    name:"保险箱",
    min:2,
    max:3,
    w:32,
    h:32,
    weights:[0,8,28,36,22,6]
  },
  duffel:{
    name:"旅行包",
    min:2,
    max:4,
    w:36,
    h:24,
    weights:[34,34,20,9,2.5,.35]
  },
  vending:{
    name:"贩卖机",
    min:2,
    max:3,
    w:48,
    h:58,
    weights:[0,0,0,0,0,0],
    special:"vending"
  },
  treasure_chest:{
    name:"宝箱",
    min:2,
    max:3,
    w:42,
    h:32,
    weights:[0,8,28,34,22,8],
    special:"treasure"
  },
  starter:{
    name:"补给箱",
    min:2,
    max:3,
    w:32,
    h:24,
    weights:[0,0,0,0,0,0],
    special:"starter"
  },
  coin_pile:{
    name:"金币堆",
    min:1,
    max:2,
    w:36,
    h:28,
    weights:[0,0,0,0,0,0],
    special:"coins"
  }
},
Go=[{
  id:"duck",
  name:"小黄",
  role:"均衡",
  speed:240,
  armorScale:1,
  armorBonus:0,
  minArmor:25,
  feathers:["#ffd43b","#fff1a8","#ffffff","#f2c12e"]
},{
  id:"tank",
  name:"铁头",
  role:"重甲",
  speed:192,
  armorScale:1,
  armorBonus:45,
  minArmor:0,
  feathers:["#b0bca1","#728573","#d8dbb9"]
},{
  id:"scout",
  name:"快羽",
  role:"侦察",
  speed:288,
  armorScale:.55,
  armorBonus:0,
  minArmor:15,
  feathers:["#a2e1ea","#63aec1","#d8f3f3"]
}];
function Kn(r){
  return Go.find(a=>a.id===r)??Go[0]
}
function Ul(r,a){
  return Math.max(r.minArmor,Math.round(a*r.armorScale)+r.armorBonus)
}
const fa=[{
  id:"knife",
  name:"跑刀",
  tag:"零成本",
  desc:"M9 手枪 · 1 绷带",
  cost:0,
  primary:null,
  armor:0,
  bandages:1,
  medkits:0,
  throwables:{
  }
},{
  id:"assault",
  name:"突击",
  tag:"均衡",
  desc:"MP5 · 二级甲 · 绷带×2 · 急救针 · 手雷",
  cost:6e4,
  primary:"smg",
  armor:60,
  bandages:2,
  medkits:1,
  throwables:{
    grenade:1
  }
},{
  id:"heavy",
  name:"重装",
  tag:"火力压制",
  desc:"M4A1 · 四级甲 · 绷带×3 · 急救针×2 · 手雷×2",
  cost:18e4,
  primary:"rifle",
  armor:120,
  bandages:3,
  medkits:2,
  throwables:{
    grenade:2
  }
}],
ny=1e5,
Qn=5,
sy={
  capacity:{
    name:"扩容背包",
    desc:"每级 +4 格",
    icon:"🎒",
    base:"20 格"
  },
  rollCd:{
    name:"翻滚训练",
    desc:"每级翻滚冷却 −0.07 秒",
    icon:"💨",
    base:"0.72 秒"
  },
  speed:{
    name:"轻装疾行",
    desc:"每级移速 +6%",
    icon:"👟",
    base:"100%"
  }
};
function Y1(r,a){
  return Math.round((12e3+a*18e3)/1e3)*1e3
}
function d1(r,a){
  return r==="capacity"?`${20+a*4} 格`:r==="rollCd"?`${Math.max(.37,.72-a*.07).toFixed(2)} 秒`:`${100+a*6}%`
}
function Ee(r){
  return Math.round(r).toLocaleString("en-US")
}
function Po(r){
  const a=Math.max(0,Math.ceil(r)),
  l=Math.floor(a/60),
  s=a%60;
  return`${l.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`
}
const bt=1,
pa=2,
Xt=4,
jc=[{
  id:"island",
  name:"鸭鸭岛",
  requiredExtracts:0,
  theme:"农场与军事基地",
  loot:"通用补给、军械和保险箱",
  boss:"goose",
  difficulty:"入门",
  build:Z1
},{
  id:"harbor",
  name:"盐雾货港",
  requiredExtracts:1,
  theme:"水道、装卸场与集装箱",
  loot:"码头补给、武器箱和船长航海日志",
  boss:"harborBoss",
  difficulty:"普通",
  build:dy
},{
  id:"foundry",
  name:"赤炉工厂",
  requiredExtracts:3,
  theme:"铸造线、炉前广场与控制室",
  loot:"控制室机箱、保险箱和封存炉芯",
  boss:"foundryBoss",
  difficulty:"困难",
  build:hy
},{
  id:"hatchery",
  name:"腐叶孵化场",
  requiredExtracts:5,
  theme:"沼泽育雏棚、孵化控制室与巢穴",
  loot:"巢穴补给、冰风 MP9 与鸭后金蛋（孢子圈可用墙体格挡）",
  boss:"broodQueen",
  difficulty:"精英 · 持续召怪",
  build:my
},{
  id:"outpost",
  name:"霜锋哨站",
  requiredExtracts:8,
  theme:"冰封机库、雷达站与冻土广场",
  loot:"军械库、龙纹 AWM 与双首领战利品",
  boss:"frostMarshal",
  bosses:["frostMarshal","ironGuard"],
  difficulty:"噩梦 · 双首领",
  build:yy
},{
  id:"airbase",
  name:"冰火空军基地",
  requiredExtracts:10,
  theme:"熔岩焦土、冰霜雪原与中央跑道",
  loot:"机库军械、双传说保险箱与 RPG",
  boss:"flameAce",
  bosses:["flameAce","radarWarden"],
  difficulty:"噩梦 · 冰火双首领",
  build:ab
},{
  id:"mausoleum",
  name:"鸭王陵寝",
  requiredExtracts:12,
  theme:"王陵回廊、双宝库与王座大厅",
  loot:"双宝库至臻物资、RPG 与鸭王御座",
  boss:"duckKing",
  difficulty:"地狱 · 四招轮换",
  build:py
}];
function Xl(r){
  return jc.find(a=>a.id===r)??jc[0]
}
function Zc(r){
  let a=r>>>0;
  return()=>{
    a=a+1831565813>>>0;
    let l=a;
    return l=Math.imul(l^l>>>15,l|1),
    l^=l+Math.imul(l^l>>>7,l|61),
    ((l^l>>>14)>>>0)/4294967296
  }
}
const ft=16,
iy=[{
  name:"湖畔小屋",
  x:820,
  y:190,
  w:230,
  h:170,
  floor:"wood",
  doors:[["s",.5,60],["w",.55,56]],
  cont:[["crate",0,0],["duffel",1,0],["toolbox",1,1]]
},{
  name:"船屋",
  x:160,
  y:620,
  w:210,
  h:170,
  floor:"wood",
  doors:[["n",.6,60],["e",.5,56]],
  cont:[["crate",0,1],["medbox",1,1],["crate",0,0]]
},{
  name:"红色谷仓",
  x:1240,
  y:170,
  w:380,
  h:260,
  floor:"wood",
  doors:[["s",.35,90],["e",.5,60],["w",.5,60]],
  parts:[["v",.68,.5,60]],
  cont:[["crate",0,0],["crate",.1,1],["toolbox",.55,0],["weaponcase",1,0],["duffel",1,1]]
},{
  name:"农舍",
  x:1720,
  y:210,
  w:250,
  h:200,
  floor:"wood",
  doors:[["s",.3,60],["w",.65,56]],
  parts:[["h",.5,.75,60]],
  cont:[["pc",1,0],["medbox",0,0],["crate",1,1]]
},{
  name:"便利店",
  x:2480,
  y:230,
  w:300,
  h:190,
  floor:"tile",
  doors:[["s",.3,70],["e",.6,56]],
  cont:[["pc",0,0],["duffel",1,0],["crate",.55,0],["medbox",0,1]]
},{
  name:"指挥部",
  x:1500,
  y:1060,
  w:320,
  h:240,
  floor:"concrete",
  doors:[["s",.3,70],["n",.25,60],["e",.5,56]],
  parts:[["v",.58,.3,60]],
  cont:[["pc",0,0],["crate",0,1],["medbox",.45,0],["safe",1,0],["weaponcase",1,1]]
},{
  name:"民居A",
  x:180,
  y:980,
  w:230,
  h:180,
  floor:"wood",
  doors:[["e",.5,56],["s",.5,56]],
  cont:[["crate",0,0],["duffel",1,0],["medbox",0,1]]
},{
  name:"民居B",
  x:560,
  y:1e3,
  w:210,
  h:230,
  floor:"tile",
  doors:[["w",.75,56],["s",.4,56],["n",.6,56]],
  parts:[["h",.45,.3,56]],
  cont:[["pc",1,0],["crate",0,0],["toolbox",1,1]]
},{
  name:"民居C",
  x:200,
  y:1330,
  w:250,
  h:200,
  floor:"wood",
  doors:[["n",.6,56],["e",.4,56]],
  cont:[["crate",0,0],["duffel",0,1],["weaponcase",1,1]]
},{
  name:"民居D",
  x:620,
  y:1400,
  w:280,
  h:210,
  floor:"tile",
  doors:[["n",.3,56],["w",.6,56],["e",.45,56]],
  parts:[["v",.55,.6,56]],
  cont:[["safe",1,0],["crate",0,1],["pc",1,1]]
},{
  name:"一号仓库",
  x:2300,
  y:930,
  w:400,
  h:280,
  floor:"concrete",
  doors:[["w",.5,80],["s",.75,80],["n",.5,60]],
  racks:[[2390,1010,220,22],[2390,1110,220,22]],
  abs:[["crate",2342,976],["toolbox",2655,975],["duffel",2632,1071],["weaponcase",2655,1150],["crate",2345,1170]]
},{
  name:"二号仓库",
  x:2560,
  y:1340,
  w:420,
  h:300,
  floor:"concrete",
  doors:[["n",.3,80],["w",.55,70],["e",.5,60]],
  racks:[[2650,1420,22,150],[2770,1420,22,150],[2890,1420,22,150]],
  abs:[["pc",2605,1385],["crate",2935,1385],["safe",2935,1590],["crate",2605,1590],["duffel",2720,1600]]
},{
  name:"车站",
  x:1480,
  y:1830,
  w:260,
  h:160,
  floor:"tile",
  doors:[["s",.5,60],["w",.5,56],["e",.5,56]],
  cont:[["crate",0,0],["pc",1,0],["medbox",1,1]]
},{
  name:"工具棚",
  x:380,
  y:1900,
  w:170,
  h:140,
  floor:"wood",
  doors:[["e",.5,56],["n",.4,56]],
  cont:[["toolbox",0,0],["crate",0,1]]
}],
oy=[["duffel",720,640],["duffel",1600,560],["crate",2860,300],["toolbox",2560,700],["crate",1420,1050],["weaponcase",1900,1400],["duffel",1400,1380],["crate",1965,975],["crate",2460,1325],["crate",900,1900],["duffel",2100,1990],["toolbox",1250,2250],["crate",255,905],["weaponcase",330,935],["crate",1205,140],["weaponcase",1192,250],["crate",3010,760],["weaponcase",3010,905],["crate",1480,2290],["weaponcase",1765,2290]];
function ry(){
  const r=bt|pa|Xt;
  return{
    w:1280,
    h:760,
    solids:[{
      id:0,
      t:0,
      x:560,
      y:60,
      w:22,
      h:250,
      r:0,
      f:r,
      kind:"wall",
      v:0,
      stamp:0,
      dead:!1,
      hp:0
    },{
      id:1,
      t:0,
      x:560,
      y:450,
      w:22,
      h:250,
      r:0,
      f:r,
      kind:"wall",
      v:0,
      stamp:0,
      dead:!1,
      hp:0
    },{
      id:2,
      t:0,
      x:1e3,
      y:250,
      w:22,
      h:80,
      r:0,
      f:r,
      kind:"cargo",
      v:1,
      stamp:0,
      dead:!1,
      hp:0
    },{
      id:3,
      t:0,
      x:1e3,
      y:430,
      w:22,
      h:80,
      r:0,
      f:r,
      kind:"cargo",
      v:2,
      stamp:0,
      dead:!1,
      hp:0
    }],
    floors:[{
      x:90,
      y:200,
      w:450,
      h:360,
      type:"concrete",
      name:"入口训练场"
    },{
      x:600,
      y:200,
      w:590,
      h:360,
      type:"wood",
      name:"军械室"
    }],
    decor:[],
    trees:[],
    water:[],
    roads:[],
    pads:[],
    containers:[{
      type:"weaponcase",
      x:760,
      y:300
    },{
      type:"crate",
      x:760,
      y:500
    }],
    extractions:[{
      id:"A",
      name:"训练出口",
      x:1190,
      y:380,
      r:62
    }],
    spawns:[{
      x:150,
      y:380,
      chick:[400,380]
    }],
    enemySpots:[{
      type:"chicken",
      x:400,
      y:380,
      n:2
    }],
    reinforce:[],
    zones:[],
    tracks:[],
    props:[]
  }
}
function ni(r,a,l,s,i=[]){
  const c=Zc(s*7919+13),
  f=[],
  d=(m,b)=>i.some(p=>p.w&&p.h?m>=p.x-p.w/2&&m<=p.x+p.w/2&&b>=p.y-p.h/2&&b<=p.y+p.h/2:Math.hypot(m-p.x,b-p.y)<=p.r);
  for(let m=0;m<l;m++){
    let b=0,
    p=0;
    for(let y=0;y<8&&(b=60+c()*(r-120),p=60+c()*(a-120),!!d(b,p));y++);
    f.push({
      x:b,
      y:p,
      t:c()<.5?2:0,
      s:3+c()*5,
      c:Math.floor(c()*4),
      rot:c()*K1
    })
  }
  return f
}
const K1=Math.PI*2,
cy={
  bus_stop:[56,40],
  water_bucket:[24,24],
  well:[46,40],
  mailbox:[20,18],
  street_lamp:[14,14],
  bench_park:[50,24],
  trash_bin:[22,22],
  laundry_line:[52,14],
  radar_station:[42,42],
  missile_rack:[48,38],
  sandbag_wall:[50,22],
  fuel_tank:[56,28],
  antenna_mast:[24,24],
  hangar:[62,56],
  runway:[64,40],
  fighter_jet_parked:[54,54],
  rope_coil:[32,26],
  buoy:[22,22],
  ingot_stack:[44,34],
  stone_lion:[30,32],
  spore_pod:[46,40],
  cattail:[40,36],
  furnace_vent:[44,42],
  pipe_run:[60,28],
  frost_pylon:[26,26],
  snow_drift:[58,30],
  rune_pillar:[28,28],
  royal_lantern:[20,20],
  cargo_net:[52,46],
  delivery_truck:[34,54],
  pickup_truck:[34,52],
  dump_truck:[34,54],
  container_truck:[36,56],
  flatbed:[32,48],
  rowboat:[32,56],
  fishing_boat:[32,58],
  speedboat:[32,58],
  barrels:[36,36],
  bollard:[28,22],
  crane:[60,30],
  fountain:[50,36],
  duck_king_statue:[42,42],
  billboard:[46,42],
  vending_machine:[28,58],
  bed:[44,50],
  table_map_cup:[40,40],
  table_field_kit:[40,40],
  wood_chair:[30,34],
  bedside_cabinet:[30,32],
  potted_flower:[30,36],
  egg_nest:[30,28],
  ice_beacon:[30,30],
  wood_table:[54,48],
  wood_bench:[52,40],
  bar_stool:[34,30],
  metal_workbench:[50,44],
  stone_steps:[56,50],
  wood_steps:[56,50],
  duck_throne:[50,48],
  nest_cluster:[58,40],
  berry_bush:[52,40],
  thorn_bush:[52,40],
  crate_stack:[50,46],
  hay_bale:[50,36],
  ice_block:[30,34],
  ice_crystal:[32,32],
  fighter_jet:[56,56],
  lava_pool:[54,54],
  lava_fissure:[56,40],
  king_vault_gate:[52,42]
};
function fy(r){
  const a=cy[r.kind]??[50,50],
  l=Math.abs(Math.cos(r.rot)),
  s=Math.abs(Math.sin(r.rot));
  return{
    x:r.x,
    y:r.y,
    hw:(a[0]*l+a[1]*s)*r.scale,
    hh:(a[0]*s+a[1]*l)*r.scale
  }
}
function uy(r){
  const l=(c,f,d,m,b)=>Math.abs(c-b.x)<d+b.hw+9&&Math.abs(f-b.y)<m+b.hh+9,
  s=(c,f,d,m)=>r.water.some(b=>b.w&&b.h?Math.abs(c-b.x)<b.w/2+d&&Math.abs(f-b.y)<b.h/2+m:Math.hypot(c-b.x,f-b.y)<b.r+Math.max(d,m)),
  i=(c,f,d,m)=>r.solids.some(b=>b.kind==="bound"||b.kind==="container"||b.kind==="water"||!(b.f&bt)?!1:b.t===0?c+d>b.x-4&&c-d<b.x+b.w+4&&f+m>b.y-4&&f-m<b.y+b.h+4:Math.hypot(Math.max(0,Math.abs(c-b.x)-d),Math.max(0,Math.abs(f-b.y)-m))<b.r+4);
  for(const c of r.containers){
    const f=Aa[c.type];
    if(!f||c.type==="vending"&&r.props.some(v=>v.kind==="vending_machine"&&v.x===c.x&&v.y===c.y))continue;
    const d=f.w/2,
    m=f.h/2,
    b=(v,S)=>r.containers.some(T=>T!==c&&(()=>{
      const H=Aa[T.type];
      return H&&Math.abs(v-T.x)<d+H.w/2+12&&Math.abs(S-T.y)<m+H.h/2+12
    })()),
    p=(v,S)=>r.props.some(T=>l(v,S,d,m,fy(T)));
    if(!p(c.x,c.y)&&!b(c.x,c.y)&&!s(c.x,c.y,d,m)&&!i(c.x,c.y,d,m))continue;
    const y=r.floors.find(v=>c.x>v.x&&c.x<v.x+v.w&&c.y>v.y&&c.y<v.y+v.h),
    g=[];
    for(let v=1;v<=10;v++){
      for(let S=-v;S<=v;S++)for(let T=-v;T<=v;T++){
        if(Math.max(Math.abs(S),Math.abs(T))!==v)continue;
        const H=c.x+S*26,
        B=c.y+T*26;
        if(H<d+12||B<m+12||H>r.w-d-12||B>r.h-m-12||p(H,B)||b(H,B)||s(H,B,d,m)||i(H,B,d,m))continue;
        const Q=y&&H>y.x&&H<y.x+y.w&&B>y.y&&B<y.y+y.h,
        se=Math.hypot(S,T)+(Q?0:6);
        (!g.length||se<g[0].score)&&g.splice(0,1,{
          x:H,
          y:B,
          score:se
        })
      }
      if(g.length)break
    }
    g.length&&(c.x=Math.round(g[0].x),c.y=Math.round(g[0].y))
  }
}
function si(r,a){
  uy(r);
  const l={
    harbor:{
      seed:31,
      count:70
    },
    foundry:{
      seed:47,
      count:85
    },
    hatchery:{
      seed:59,
      count:190
    },
    outpost:{
      seed:71,
      count:160
    },
    mausoleum:{
      seed:83,
      count:180
    },
    airbase:{
      seed:97,
      count:120
    }
  }
  [a],
  s=Zc(l.seed*7919+29),
  i=[],
  c=(p,y,g,v,S,T)=>{
    const H=S-g,
    B=T-v,
    Q=H*H+B*B||1,
    se=Math.max(0,Math.min(1,((p-g)*H+(y-v)*B)/Q));
    return Math.hypot(p-g-H*se,y-v-B*se)
  },
  f=(p,y)=>Math.min(1/0,...r.water.map(g=>{
    if(g.w&&g.h){
      const v=Math.max(0,Math.abs(p-g.x)-g.w/2),
      S=Math.max(0,Math.abs(y-g.y)-g.h/2);
      return Math.hypot(v,S)
    }
    return Math.max(0,Math.hypot(p-g.x,y-g.y)-g.r)
  })),
  d=(p,y,g)=>!!(p<36||y<36||p>r.w-36||y>r.h-36||r.floors.some(v=>p>v.x-g&&p<v.x+v.w+g&&y>v.y-g&&y<v.y+v.h+g)||r.pads.some(v=>v.type!=="field"&&p>v.x-g&&p<v.x+v.w+g&&y>v.y-g&&y<v.y+v.h+g)||r.solids.some(v=>v.kind==="bound"||!(v.f&bt)?!1:v.t===0?p>v.x-g&&p<v.x+v.w+g&&y>v.y-g&&y<v.y+v.h+g:Math.hypot(p-v.x,y-v.y)<v.r+g)||r.roads.some(v=>{
    for(let S=0;S+3<v.length;S+=2)if(c(p,y,v[S],v[S+1],v[S+2],v[S+3])<56+g)return!0;
    return!1
  })||r.extractions.some(v=>Math.hypot(p-v.x,y-v.y)<v.r+g+16)||r.spawns.some(v=>Math.hypot(p-v.x,y-v.y)<65+g)||r.enemySpots.some(v=>Math.hypot(p-v.x,y-v.y)<72+g)||r.reinforce.some(v=>Math.hypot(p-v.x,y-v.y)<48+g)||r.containers.some(v=>Math.hypot(p-v.x,y-v.y)<45+g)||r.props.some(v=>Math.hypot(p-v.x,y-v.y)<72*v.scale+g)||r.water.some(v=>v.w&&v.h?Math.abs(p-v.x)<v.w/2+g&&Math.abs(y-v.y)<v.h/2+g:Math.hypot(p-v.x,y-v.y)<v.r+g)),
  m=[...r.decor];
  for(let p=0,y=0;p<l.count&&y<l.count*18;y++){
    const g=s();
    let v;
    a==="hatchery"?v=g<.4?1:g<.75?5:g<.92?3:0:a==="mausoleum"?v=g<.46?1:g<.68?3:2:a==="airbase"?v=g<.3?2:0:a==="outpost"?v=g<.18?1:g<.45?2:0:a==="harbor"?v=g<.12?1:g<.23?5:g<.58?0:2:v=g<.58?0:2;
    const S=36+s()*(r.w-72),
    T=36+s()*(r.h-72),
    H=f(S,T);
    if(v===5?H<8||H>135:H<48)continue;
    const B=v===3?11+s()*10:v===5?8+s()*7:3+s()*5;
    d(S,T,B+5)||m.some(Q=>Math.hypot(S-Q.x,T-Q.y)<B+Q.s+6)||i.some(Q=>Math.hypot(S-Q.x,T-Q.y)<B+Q.s+7)||(i.push({
      x:S,
      y:T,
      t:v,
      s:B,
      c:Math.floor(s()*4),
      rot:s()*K1
    }),p++)
  }
  const b=a==="outpost"?[.04,.14,.25,.75,.86,.96].flatMap((p,y)=>[{
    x:r.w*p,
    y:62+y%2*18,
    r:40+y%3*4,
    v:y%3,
    solid:!1
  },{
    x:r.w*p,
    y:r.h-62-y%2*18,
    r:40+(y+1)%3*4,
    v:(y+1)%3,
    solid:!1
  }]).concat([{
    x:56,
    y:r.h*.32,
    r:42,
    v:0,
    solid:!1
  },{
    x:58,
    y:r.h*.67,
    r:44,
    v:1,
    solid:!1
  },{
    x:r.w-58,
    y:r.h*.3,
    r:40,
    v:2,
    solid:!1
  },{
    x:r.w-56,
    y:r.h*.68,
    r:43,
    v:0,
    solid:!1
  }]):r.trees;
  const __TH={
    harbor:[34,16,["crate_stack","barrels","rope_coil","buoy","rope_coil"],10,3],
    foundry:[8,30,["crate_stack","barrels","pipe_run","ingot_stack","cargo_net"],12,3],
    hatchery:[70,12,["berry_bush","thorn_bush","cattail","spore_pod","hay_bale","cattail"],14,4],
    outpost:[60,18,["ice_block","ice_crystal","snow_drift","crate_stack","frost_pylon"],12,4],
    mausoleum:[48,16,["rune_pillar","royal_lantern","stone_lion","berry_bush","rune_pillar"],12,4],
    airbase:[16,22,["crate_stack","barrels","ice_block","lava_fissure","crate_stack"],10,3]
  }
  [a];
  if(__TH){
    const __pts=[];
    for(const q of r.solids)q.kind!=="bound"&&__pts.push([q.t===0?q.x+q.w/2:q.x,q.t===0?q.y+q.h/2:q.y]);
    for(const q of r.props)__pts.push([q.x,q.y]);
    for(const q of r.containers)__pts.push([q.x,q.y]);
    for(const q of r.floors)for(let X=q.x;X<q.x+q.w;X+=120)for(let Y=q.y;Y<q.y+q.h;Y+=120)__pts.push([X,Y]);
    const __den=(X,Y)=>{
      let n=0;
      for(const q of __pts)Math.abs(q[0]-X)<260&&Math.abs(q[1]-Y)<260&&n++;
      return n
    },
    __pick=(g,sep)=>{
      let best=null,
      bd=1e9;
      for(let k=0;k<14;k++){
        const X=60+s()*(r.w-120),
        Y=60+s()*(r.h-120);
        if(d(X,Y,g))continue;
        if(__pts.some(q=>Math.hypot(q[0]-X,q[1]-Y)<sep))continue;
        const D=__den(X,Y);
        D<bd&&(bd=D,best=[X,Y])
      }
      return best&&(__pts.push(best),best)
    };
    let __k=0;
    for(let k=0;k<__TH[0];k++){
      const P=__pick(34,95);
      if(!P)continue;
      b.push({
        x:P[0],
        y:P[1],
        r:32+s()*14,
        v:Math.floor(s()*3),
        solid:!0
      }),
      r.solids.push({
        id:9e5+__k++,
        t:1,
        x:P[0],
        y:P[1],
        w:0,
        h:0,
        r:13,
        f:bt|pa,
        kind:"tree",
        v:0,
        stamp:0,
        dead:!1,
        hp:0
      })
    }
    for(let k=0;k<__TH[1];k++){
      const P=__pick(22,70);
      P&&r.solids.push({
        id:9e5+__k++,
        t:1,
        x:P[0],
        y:P[1],
        w:0,
        h:0,
        r:13+s()*8,
        f:bt|pa,
        kind:"rock",
        v:Math.floor(s()*3),
        stamp:0,
        dead:!1,
        hp:0
      })
    }
    for(let k=0;k<__TH[3];k++){
      const P=__pick(40,110);
      P&&r.props.push({
        kind:__TH[2][Math.floor(s()*__TH[2].length)],
        x:Math.round(P[0]),
        y:Math.round(P[1]),
        rot:(s()-.5)*.6,
        scale:.85+s()*.25
      })
    }
    for(let k=0;k<__TH[4];k++){
      const P=__pick(40,140);
      P&&r.containers.push({
        type:["crate","duffel","toolbox","crate","medbox"][Math.floor(s()*5)],
        x:Math.round(P[0]),
        y:Math.round(P[1])
      })
    }
    for(let k=0;k<2;k++){
      const P=__pick(40,160);
      P&&r.enemySpots.push({
        type:k?"lookout":"bandit",
        x:Math.round(P[0]),
        y:Math.round(P[1]),
        n:1
      })
    }
  }
  {
    const P=Zc((a.length*7919+r.w)|0);
    let N=0,
    T=0;
    const WANT={
      harbor:6,
      foundry:6,
      hatchery:5,
      outpost:5,
      mausoleum:3,
      airbase:6
    }
    [a]??4;
    while(N<WANT&&T<WANT*40){
      T++;
      const X=80+P()*(r.w-160),
      Y=80+P()*(r.h-160);
      if(d(X,Y,30))continue;
      const k=P()<.6?1:2;
      for(let j=0;j<k;j++){
        const x=X+(j%2)*38,
        y=Y+Math.floor(j/2)*34;
        r.solids.push({
          id:8e5+N*4+j,
          t:0,
          x:x-17,
          y:y-15,
          w:34,
          h:30,
          r:0,
          f:bt|pa,
          kind:"woodcrate",
          v:0,
          stamp:0,
          dead:!1,
          hp:60,
          maxHp:60,
          loot:P()<.18
        })
      }
      N++
    }
  }
  {
    const P2=Zc((a.length*131+r.h)|0);
    for(const sp of r.spawns){
      let n=0;
      for(let k=0;k<40&&n<2;k++){
        const A=P2()*6.283,
        D=70+P2()*90,
        X=Math.round(sp.x+Math.cos(A)*D),
        Y=Math.round(sp.y+Math.sin(A)*D);
        if(X<40||Y<40||X>r.w-40||Y>r.h-40||d(X,Y,22))continue;
        if(r.containers.some(c=>Math.hypot(c.x-X,c.y-Y)<50))continue;
        r.containers.push({
          type:"starter",
          x:X,
          y:Y
        }),
        n++
      }
      for(let k=0;k<200&&n<2;k++){
        const A=P2()*6.283,
        D=60+P2()*200,
        X=Math.round(sp.x+Math.cos(A)*D),
        Y=Math.round(sp.y+Math.sin(A)*D);
        if(X<40||Y<40||X>r.w-40||Y>r.h-40)continue;
        if(r.solids.some(v=>v.kind!=="bound"&&(v.t===0?X>v.x-24&&X<v.x+v.w+24&&Y>v.y-22&&Y<v.y+v.h+22:Math.hypot(X-v.x,Y-v.y)<v.r+24)))continue;
        if(r.water.some(w=>w.w?Math.abs(X-w.x)<w.w/2+24&&Math.abs(Y-w.y)<w.h/2+24:Math.hypot(X-w.x,Y-w.y)<w.r+24))continue;
        if(r.containers.some(c=>Math.hypot(c.x-X,c.y-Y)<55)||r.props.some(p=>Math.hypot(p.x-X,p.y-Y)<60*p.scale))continue;
        r.containers.push({
          type:"starter",
          x:X,
          y:Y
        }),
        n++
      }
    }
  }
  const __cov={
    pipe_run:[56,10,7],
    cargo_net:[48,30,7],
    rune_pillar:[22,22,7],
    frost_pylon:[20,20,3],
    furnace_vent:[36,32,7],
    stone_lion:[22,20,7],
    ingot_stack:[34,16,3],
    bus_stop:[52,16,3],
    well:[30,30,7],
    radar_station:[38,38,7],
    missile_rack:[44,30,7],
    sandbag_wall:[46,12,3],
    fuel_tank:[52,22,7],
    water_bucket:[14,14,3],
    trash_bin:[14,14,3]
  },
  __hz={
    furnace_vent:["heat",78],
    spore_pod:["spore",72],
    snow_drift:["snow",64]
  };
  for(const q of r.props)if(q.kind==="wood_bridge"||q.kind==="stone_bridge"){
    const v=Math.abs(Math.sin(q.rot||0))>.7,
    HW=(v?(q.width??70):(q.len??180))/2,
    HH=(v?(q.len??180):(q.width??70))/2;
    r.solids=r.solids.filter(s=>!(s.kind==="water"&&s.t===0&&s.x<q.x+HW&&s.x+s.w>q.x-HW&&s.y<q.y+HH&&s.y+s.h>q.y-HH&&Math.abs((s.x+s.w/2)-q.x)<s.w/2+HW&&(()=>{
      const cut=[];
      if(s.x<q.x-HW)cut.push({
        ...s,
        w:q.x-HW-s.x
      });
      if(s.x+s.w>q.x+HW)cut.push({
        ...s,
        x:q.x+HW,
        w:s.x+s.w-q.x-HW
      });
      if(s.y<q.y-HH)cut.push({
        ...s,
        x:Math.max(s.x,q.x-HW),
        w:Math.min(s.x+s.w,q.x+HW)-Math.max(s.x,q.x-HW),
        h:q.y-HH-s.y
      });
      if(s.y+s.h>q.y+HH)cut.push({
        ...s,
        x:Math.max(s.x,q.x-HW),
        w:Math.min(s.x+s.w,q.x+HW)-Math.max(s.x,q.x-HW),
        y:q.y+HH,
        h:s.y+s.h-q.y-HH
      });
      r.solids.push(...cut.map((c,k)=>({
        ...c,
        id:7e5+k+Math.round(q.x)
      })));
      return!0
    })()))
  }
  let __id=r.solids.reduce((q,M)=>Math.max(q,M.id),0)+1;
  const __s=[...r.solids],
  __h=[];
  for(const q of r.props){
    const M=__cov[q.kind];
    if(M){
      const R=Math.abs(Math.sin(q.rot))>.7,
      L=(R?M[1]:M[0])*q.scale,
      O=(R?M[0]:M[1])*q.scale;
      __s.push(["rune_pillar","frost_pylon","stone_lion","cattail"].includes(q.kind)?{
        id:__id++,
        t:1,
        x:q.x,
        y:q.y,
        w:0,
        h:0,
        r:Math.min(L,O)*1.1,
        f:M[2],
        kind:"propcover",
        v:0,
        stamp:0,
        dead:!1,
        hp:0
      }:{
        id:__id++,
        t:0,
        x:q.x-L,
        y:q.y-O,
        w:L*2,
        h:O*2,
        r:0,
        f:M[2],
        kind:"propcover",
        v:0,
        stamp:0,
        dead:!1,
        hp:0
      })
    }
    const H=__hz[q.kind];
    H&&__h.push({
      type:H[0],
      x:q.x,
      y:q.y,
      r:H[1]*q.scale,
      tick:0,
      fx:0
    })
  }
  return{
    ...r,
    solids:__s,
    hazards:__h,
    decor:[...r.decor,...i],
    trees:b
  }
}
function ii(r){
  const a=[],
  l=[],
  s=[],
  i=[],
  c=[],
  m=b=>b==="rack"?"rack":"wall";
  for(const b of r){
    const{
      x:p,
      y,
      w:g,
      h:v
    }
    =b,
    S=a.length;
    l.push({
      name:b.name,
      x:p+18,
      y:y+18,
      w:g-36,
      h:v-36,
      type:b.floor
    }),
    c.push({
      type:"base",
      x:p+18,
      y:y+18,
      w:g-36,
      h:v-36
    });
    const T=J=>(b.doors??[]).filter(te=>te[0]===J).map(te=>te[1]),
    H=(J,te)=>{
      const j=T(J).sort((le,Z)=>le-Z);
      let ee=p;
      for(const le of j){
        const Z=p+g*le-52;
        Z>ee&&a.push([m(b.kind),ee,te,Z-ee,18]),
        ee=Z+104
      }
      p+g>ee&&a.push([m(b.kind),ee,te,p+g-ee,18])
    },
    B=(J,te)=>{
      const j=T(J).sort((le,Z)=>le-Z);
      let ee=y;
      for(const le of j){
        const Z=y+v*le-52;
        Z>ee&&a.push([m(b.kind),te,ee,18,Z-ee]),
        ee=Z+104
      }
      y+v>ee&&a.push([m(b.kind),te,ee,18,y+v-ee])
    };
    H("n",y),
    H("s",y+v-18),
    B("w",p),
    B("e",p+g-18);
    const Q=100;
    for(const[J,te,j,ee,le]of b.parts??[])if(J==="h"){
      const Z=p+g-18,
      X=Math.max(0,Z-te-Q),
      C=Math.min(ee,X);
      C>=40&&a.push([m(b.kind),te,j,C,le])
    }else{
      const Z=y+v-18,
      X=Math.max(0,Z-j-Q),
      C=Math.min(ee,X);
      C>=40&&a.push([m(b.kind),te,j,le,C])
    }
    for(const J of b.racks??[])a.push(["rack",J[0],J[1],J[2],J[3]]);
    const se=a.slice(S),
    ie=(J,te)=>!se.some(j=>J>j[1]-26&&J<j[1]+j[3]+26&&te>j[2]-26&&te<j[2]+j[4]+26),
    ce=(J,te,j)=>{
      const ee=Aa[j];
      return s.every(le=>{
        const Z=Aa[le.type];
        return Math.abs(J-le.x)>=(ee.w+Z.w)/2+12||Math.abs(te-le.y)>=(ee.h+Z.h)/2+12
      })
    },
    fe=(J,te,j)=>{
      const ee=Aa[j];
      return J>=p+18+ee.w/2+4&&J<=p+g-18-ee.w/2-4&&te>=y+18+ee.h/2+4&&te<=y+v-18-ee.h/2-4&&ie(J,te)&&ce(J,te,j)
    };
    for(const[J,te,j]of b.loot??[]){
      let ee=p+18+(g-36)*te,
      le=y+18+(v-36)*j;
      if(!fe(ee,le,J)){
        let Z=!1;
        for(let X=1;X<=6&&!Z;X++)for(let C=-X;C<=X&&!Z;C++)for(let P=-X;P<=X&&!Z;P++){
          const A=ee+C*34,
          V=le+P*34;
          fe(A,V,J)&&(ee=A,le=V,Z=!0)
        }
        if(!Z){
          const X=Aa[J],
          C=[];
          for(let A=y+18+X.h/2+4;A<=y+v-18-X.h/2-4;A+=24)for(let V=p+18+X.w/2+4;V<=p+g-18-X.w/2-4;V+=24)C.push({
            x:V,
            y:A,
            distance:Math.hypot(V-ee,A-le)
          });
          C.sort((A,V)=>A.distance-V.distance);
          const P=C.find(A=>fe(A.x,A.y,J));
          if(!P)continue;
          ee=P.x,
          le=P.y
        }
      }
      s.push({
        type:J,
        x:Math.round(ee),
        y:Math.round(le)
      })
    }
    for(let J=0;J<4;J++){
      const te=p+30+J*71%Math.max(1,g-60),
      j=y+30+J*53%Math.max(1,v-60);
      i.push({
        x:te,
        y:j,
        t:J%3,
        s:.7+J%2*.5,
        c:J%2,
        rot:J*1.3%3
      })
    }
  }
  return{
    cover:a,
    floors:l,
    containers:s,
    decor:i,
    pads:c
  }
}
function oi(r,a,l,s,i){
  const c=bt|pa|Xt,
  f=bt|pa,
  d=[...l.map(([m,b,p,y,g],v)=>({
    id:v,
    t:0,
    x:b,
    y:p,
    w:y,
    h:g,
    r:0,
    f:m==="car"||m==="pump"||m==="fence"?f:c,
    kind:m,
    v:v%4,
    stamp:0,
    dead:!1,
    hp:0
  }))];
  for(const[m,b,p,y]of[[-32,-32,r+64,32],[-32,a,r+64,32],[-32,0,32,a],[r,0,32,a]])d.push({
    id:d.length,
    t:0,
    x:m,
    y:b,
    w:p,
    h:y,
    r:0,
    f:c,
    kind:"bound",
    v:0,
    stamp:0,
    dead:!1,
    hp:0
  });
  for(const m of s)m.w&&m.h?d.push({
    id:d.length,
    t:0,
    x:m.x-m.w/2,
    y:m.y-m.h/2,
    w:m.w,
    h:m.h,
    r:0,
    f:bt,
    kind:"water",
    v:0,
    stamp:0,
    dead:!1,
    hp:0
  }):d.push({
    id:d.length,
    t:1,
    x:m.x,
    y:m.y,
    w:0,
    h:0,
    r:m.r-6,
    f:bt,
    kind:"water",
    v:0,
    stamp:0,
    dead:!1,
    hp:0
  });
  for(const[m,b]of i)d.push({
    id:d.length,
    t:1,
    x:m,
    y:b,
    w:0,
    h:0,
    r:14,
    f:bt|pa,
    kind:"barrel",
    v:0,
    stamp:0,
    dead:!1,
    hp:20
  });
  return d
}
function Pc(r,a,l,s,i){
  const c=y=>({
    ...y,
    x:y.x+a,
    y:y.y+l
  }),
  f=r.solids.filter(y=>y.kind!=="bound").map(y=>({
    ...y,
    x:y.x+a,
    y:y.y+l,
    stamp:0
  }));
  let d=f.reduce((y,g)=>Math.max(y,g.id),-1)+1;
  const m=bt|pa|Xt,
  b=[[-32,-32,s+64,32],[-32,i,s+64,32],[-32,0,32,i],[s,0,32,i]].map(([y,g,v,S])=>({
    id:d++,
    t:0,
    x:y,
    y:g,
    w:v,
    h:S,
    r:0,
    f:m,
    kind:"bound",
    v:0,
    stamp:0,
    dead:!1,
    hp:0
  })),
  p=y=>y.map((g,v)=>g+(v%2?l:a));
  return{
    ...r,
    w:s,
    h:i,
    solids:[...f,...b],
    props:r.props.map(c),
    floors:r.floors.map(c),
    decor:r.decor.map(c),
    trees:r.trees.map(c),
    water:r.water.map(c),
    roads:r.roads.map(p),
    pads:r.pads.map(c),
    containers:r.containers.map(c),
    extractions:r.extractions.map(c),
    spawns:r.spawns.map(y=>({
      ...y,
      x:y.x+a,
      y:y.y+l,
      chick:[y.chick[0]+a,y.chick[1]+l]
    })),
    enemySpots:r.enemySpots.map(c),
    reinforce:r.reinforce.map(c),
    zones:r.zones.map(c),
    tracks:r.tracks.map(y=>y+l)
  }
}
function dy(){
  const l=[{
    x:575,
    y:20,
    r:0,
    w:950,
    h:300
  },{
    x:1700,
    y:20,
    r:0,
    w:700,
    h:300
  }],
  s=ii([{
    name:"北岸补给站",
    x:210,
    y:570,
    w:274,
    h:180,
    floor:"wood",
    doors:[["s",.5],["e",.6]],
    loot:[["crate",.24,.3],["duffel",.7,.62],["toolbox",.5,.75]]
  },{
    name:"南侧货棚",
    x:682,
    y:1270,
    w:300,
    h:186,
    floor:"wood",
    doors:[["n",.45],["w",.5]],
    parts:[["v",862,1300,120,16]],
    loot:[["toolbox",.3,.35],["weaponcase",.75,.6],["crate",.5,.8]]
  },{
    name:"港区办公室",
    x:1180,
    y:560,
    w:260,
    h:190,
    floor:"tile",
    doors:[["s",.55],["w",.4]],
    parts:[["v",1380,580,140,16]],
    loot:[["pc",.12,.2],["desktop",.38,.2],["laptop",.35,.65],["safe",.86,.9],["medbox",.55,.9]]
  },{
    name:"船长仓储",
    x:1640,
    y:1180,
    w:310,
    h:210,
    floor:"concrete",
    doors:[["n",.4],["e",.5]],
    racks:[[1690,1290,170,22],[1690,1350,170,22]],
    loot:[["weaponcase",.22,.22],["safe",.9,.15],["duffel",.58,.16]]
  },{
    name:"码头仓库",
    x:1080,
    y:200,
    w:270,
    h:210,
    floor:"concrete",
    doors:[["s",.5],["e",.55]],
    parts:[["h",1150,300,150,16]],
    loot:[["toolbox",.2,.25],["weaponcase",.85,.3],["crate",.5,.8]]
  },{
    name:"南部堆场",
    x:700,
    y:1450,
    w:320,
    h:170,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    racks:[[740,1520,200,24],[740,1570,200,24]],
    loot:[["crate",.2,.2],["duffel",.9,.25],["safe",.9,.85]]
  }]),
  i=[["cargo",540,740,220,68],["cargo",875,680,208,68],["cargo",898,996,218,68],["cargo",1300,1060,220,68],["cargo",1660,650,210,68],["cargo",1600,1070,140,60],["cargo",1860,835,70,154],["cargo",1980,440,200,68],["cargo",560,990,180,60],["cargo",1080,700,70,130],["cargo",1500,1440,170,60],["cargo",300,260,180,56],["cargo",700,240,150,50],["cargo",1580,260,170,56],["wall",2140,240,20,120],["cargo",2220,200,130,46],["cargo",300,1490,170,58],["cargo",1180,1500,210,58],["cargo",1700,1480,200,58],["wall",2050,1480,18,130],["fence",200,1e3,16,180],["fence",2240,620,16,160]],
  c=[{
    kind:"delivery_truck",
    x:402,
    y:803,
    rot:Math.PI/2,
    scale:1.05
  },{
    kind:"pickup_truck",
    x:1325,
    y:954,
    rot:0,
    scale:1.05
  },{
    kind:"dump_truck",
    x:2174,
    y:1005,
    rot:Math.PI/2,
    scale:1.05
  },{
    kind:"container_truck",
    x:940,
    y:1200,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"flatbed",
    x:780,
    y:1170,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"rowboat",
    x:520,
    y:92,
    rot:0,
    scale:1
  },{
    kind:"fishing_boat",
    x:820,
    y:105,
    rot:0,
    scale:1.05
  },{
    kind:"speedboat",
    x:1750,
    y:98,
    rot:0,
    scale:1
  },{
    kind:"barrels",
    x:1580,
    y:985,
    scale:1,
    rot:0
  },{
    kind:"bollard",
    x:1117,
    y:150,
    scale:1,
    rot:0
  },{
    kind:"bollard",
    x:2118,
    y:192,
    scale:1,
    rot:0
  },{
    kind:"crane",
    x:2220,
    y:1190,
    scale:1.1,
    rot:0
  },{
    kind:"billboard",
    x:850,
    y:470,
    rot:0,
    scale:.85
  },{
    kind:"table_field_kit",
    x:1320,
    y:610,
    rot:0,
    scale:.75
  },{
    kind:"wood_table",
    x:1516,
    y:636,
    rot:0,
    scale:.9
  },{
    kind:"bar_stool",
    x:1600,
    y:590,
    rot:0,
    scale:.95
  },{
    kind:"bar_stool",
    x:1578,
    y:690,
    rot:0,
    scale:.95
  },{
    kind:"wood_bench",
    x:1520,
    y:540,
    rot:0,
    scale:.86
  },{
    kind:"crate_stack",
    x:762,
    y:902,
    rot:0,
    scale:.95
  },{
    kind:"rope_coil",
    x:1700,
    y:470,
    rot:0,
    scale:1
  },{
    kind:"rope_coil",
    x:470,
    y:905,
    rot:.4,
    scale:.9
  },{
    kind:"buoy",
    x:1560,
    y:400,
    rot:0,
    scale:1
  },{
    kind:"buoy",
    x:900,
    y:390,
    rot:0,
    scale:.9
  },{
    kind:"bus_stop",
    x:880,
    y:870,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1180,
    y:880,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1948,
    y:880,
    rot:0,
    scale:1
  },{
    kind:"trash_bin",
    x:532,
    y:880,
    rot:0,
    scale:1
  },{
    kind:"fuel_tank",
    x:2304,
    y:780,
    rot:0,
    scale:1
  },{
    kind:"water_bucket",
    x:1116,
    y:504,
    rot:0,
    scale:1
  }];
  return si({
    w:2400,
    h:1664,
    water:l,
    props:c,
    solids:oi(2400,1664,[...s.cover,...i],l,[[570,828],[1117,822],[1480,714],[1770,987],[2010,710]]),
    floors:[...s.floors,{
      name:"中央装卸场",
      type:"concrete",
      x:1180,
      y:574,
      w:770,
      h:600
    },{
      name:"主码头引道",
      type:"concrete",
      x:1050,
      y:190,
      w:300,
      h:240
    },{
      name:"登船码头",
      type:"concrete",
      x:2050,
      y:190,
      w:290,
      h:220
    },{
      name:"南侧堆货区",
      type:"concrete",
      x:1150,
      y:1450,
      w:800,
      h:160
    }],
    decor:[...s.decor,...ni(2400,1664,90,3,l)],
    trees:[],
    tracks:[],
    roads:[[100,830,2300,830],[100,1370,2300,1370],[450,300,450,1560],[1180,190,1180,1560],[1900,300,1900,1560],[1180,830,1180,190],[2200,1370,2200,210]],
    pads:[{
      type:"dock",
      x:407,
      y:610,
      w:780,
      h:34
    },{
      type:"dock",
      x:1080,
      y:30,
      w:250,
      h:180
    },{
      type:"dock",
      x:2070,
      y:30,
      w:280,
      h:180
    },...s.pads,{
      type:"platform",
      x:2050,
      y:1280,
      w:288,
      h:181
    }],
    containers:[...s.containers,{
      type:"crate",
      x:420,
      y:1190
    },{
      type:"crate",
      x:806,
      y:867
    },{
      type:"medbox",
      x:1246,
      y:1103
    },{
      type:"weaponcase",
      x:1570,
      y:754
    },{
      type:"safe",
      x:1640,
      y:924
    },{
      type:"crate",
      x:2090,
      y:547
    },{
      type:"duffel",
      x:2050,
      y:1330
    },{
      type:"toolbox",
      x:1480,
      y:1380
    },{
      type:"crate",
      x:380,
      y:280
    },{
      type:"toolbox",
      x:1050,
      y:240,
      fixedItem:"dmr"
    },{
      type:"duffel",
      x:1840,
      y:260,
      fixedItem:"ak"
    },{
      type:"crate",
      x:420,
      y:1560
    },{
      type:"weaponcase",
      x:1480,
      y:1530,
      fixedItem:"awmlegend"
    },{
      type:"safe",
      x:1880,
      y:1550,
      fixedItem:"m4legend"
    },{
      type:"vending",
      x:430,
      y:480
    },{
      type:"treasure_chest",
      x:1480,
      y:1460
    },{
      type:"coin_pile",
      x:400,
      y:1450
    }],
    spawns:[{
      x:144,
      y:470,
      chick:[676,910]
    },{
      x:144,
      y:1248,
      chick:[676,1160]
    },{
      x:1200,
      y:470,
      chick:[1280,560]
    },{
      x:1300,
      y:1580,
      chick:[1200,1450]
    }],
    extractions:[{
      id:"A",
      name:"北岸登船梯",
      x:2200,
      y:120,
      r:70,
      scene:"dock"
    },{
      id:"B",
      name:"南门停车场",
      x:2200,
      y:1370,
      r:78,
      scene:"parking"
    },{
      id:"C",
      name:"东侧快艇码头",
      x:1910,
      y:270,
      r:70,
      scene:"boat"
    }],
    enemySpots:[{
      type:"chicken",
      x:676,
      y:910,
      n:3
    },{
      type:"chicken",
      x:676,
      y:1160,
      n:2
    },{
      type:"bandit",
      x:950,
      y:852,
      n:1
    },{
      type:"bandit",
      x:1100,
      y:1240,
      n:1
    },{
      type:"bandit",
      x:1250,
      y:620,
      n:1
    },{
      type:"armored",
      x:1420,
      y:1290,
      n:1
    },{
      type:"harborBoss",
      x:1536,
      y:880,
      n:1
    },{
      type:"armored",
      x:1810,
      y:786,
      n:1
    },{
      type:"bandit",
      x:1950,
      y:1130,
      n:1
    },{
      type:"lookout",
      x:1960,
      y:360,
      n:1
    },{
      type:"bandit",
      x:480,
      y:240,
      n:1
    },{
      type:"lookout",
      x:1540,
      y:200,
      n:1
    },{
      type:"armored",
      x:1320,
      y:150,
      n:1
    },{
      type:"bandit",
      x:1400,
      y:1530,
      n:1
    },{
      type:"lookout",
      x:1827,
      y:1559,
      n:1
    },{
      type:"shield",
      x:1660,
      y:940,
      n:1
    },{
      type:"shield",
      x:1080,
      y:1330,
      n:1
    },{
      type:"hen",
      x:1473,
      y:1041,
      n:1
    },{
      type:"hen",
      x:2050,
      y:640,
      n:1
    }],
    reinforce:[{
      x:1080,
      y:1510
    },{
      x:1264,
      y:432
    },{
      x:1900,
      y:540
    },{
      x:2050,
      y:1130
    },{
      x:900,
      y:200
    },{
      x:1600,
      y:1520
    }],
    zones:[{
      name:"货港入口",
      x:0,
      y:0,
      w:520,
      h:1664
    },{
      name:"装卸通道",
      x:520,
      y:0,
      w:660,
      h:1664
    },{
      name:"中央装卸场",
      x:1180,
      y:0,
      w:770,
      h:1664
    },{
      name:"外港闸口",
      x:1950,
      y:0,
      w:450,
      h:1664
    }]
  },"harbor")
}
function hy(){
  const l=ii([{
    name:"分拣车间",
    x:470,
    y:380,
    w:620,
    h:980,
    floor:"concrete",
    kind:"rack",
    doors:[["n",.25],["s",.7],["e",.5]],
    parts:[["h",500,700,220,18],["h",830,1e3,240,18],["v",720,420,200,18]],
    racks:[[730,480,214,36],[730,674,214,36],[730,1100,214,36],[540,1300,210,34]],
    loot:[["toolbox",.22,.14],["medbox",.78,.24],["weaponcase",.3,.52],["crate",.82,.9]]
  },{
    name:"炉前控制室",
    x:1140,
    y:540,
    w:570,
    h:660,
    floor:"concrete",
    doors:[["w",.5],["e",.35],["s",.5]],
    parts:[["v",1400,613,270,24],["h",1480,1080,200,20]],
    loot:[["pc",.16,.14],["desktop",.31,.14],["laptop",.24,.42],["safe",.86,.22],["medbox",.22,.6],["weaponcase",.7,.52]]
  },{
    name:"主控室",
    x:1980,
    y:1020,
    w:300,
    h:250,
    floor:"tile",
    doors:[["w",.45],["n",.6]],
    parts:[["v",2070,1040,80,16]],
    loot:[["pc",.12,.86],["pc",.62,.86],["laptop",.37,.52],["safe",.94,.62]]
  },{
    name:"铸模仓库",
    x:1944,
    y:480,
    w:310,
    h:240,
    floor:"concrete",
    doors:[["s",.4],["w",.6]],
    racks:[[2010,540,180,26],[2110,660,130,26]],
    loot:[["weaponcase",.1,.14],["crate",.9,.14],["toolbox",.3,.9]]
  },{
    name:"备件库",
    x:350,
    y:100,
    w:300,
    h:210,
    floor:"concrete",
    doors:[["s",.5],["e",.5]],
    racks:[[390,160,170,24],[390,220,170,24]],
    loot:[["toolbox",.1,.14],["weaponcase",.9,.14],["crate",.5,.9]]
  },{
    name:"机车库",
    x:1560,
    y:100,
    w:330,
    h:220,
    floor:"concrete",
    doors:[["s",.45],["w",.6]],
    parts:[["v",1720,120,90,16]],
    loot:[["crate",.15,.3],["safe",.85,.85],["medbox",.5,.85]]
  },{
    name:"炉渣堆场",
    x:1120,
    y:1480,
    w:340,
    h:190,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    racks:[[1160,1550,210,24]],
    loot:[["crate",.2,.2],["duffel",.85,.25],["safe",.5,.85]]
  }]),
  s=[["wall",1140,570,28,180],["wall",1140,985,28,180],["wall",1710,660,28,60],["wall",1710,960,28,120],["wall",1944,665,24,230],["wall",1944,1020,24,90],["wall",2248,1084,24,160],["rack",900,1420,230,34],["cargo",1600,1420,200,60],["cargo",640,250,180,58],["cargo",900,120,190,56],["cargo",1320,150,160,54],["cargo",2060,120,180,56],["wall",240,350,20,110],["wall",2280,360,20,120],["cargo",400,1520,190,58],["cargo",1620,1540,180,58],["cargo",2140,1520,180,58],["wall",980,1520,18,120],["fence",240,620,16,200],["fence",2380,620,16,200]],
  i=[{
    kind:"dump_truck",
    x:688,
    y:1412,
    rot:Math.PI/2,
    scale:1.05
  },{
    kind:"flatbed",
    x:1848,
    y:1452,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"container_truck",
    x:2324,
    y:950,
    rot:0,
    scale:1
  },{
    kind:"delivery_truck",
    x:978,
    y:228,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"barrels",
    x:1022,
    y:543,
    scale:1,
    rot:0
  },{
    kind:"barrels",
    x:1960,
    y:943,
    scale:1,
    rot:0
  },{
    kind:"crane",
    x:409,
    y:371,
    scale:1.1,
    rot:0
  },{
    kind:"vending_machine",
    x:2160,
    y:1080,
    rot:0,
    scale:.8
  },{
    kind:"metal_workbench",
    x:1004,
    y:302,
    rot:0,
    scale:.85
  },{
    kind:"stone_steps",
    x:1240,
    y:1392,
    rot:0,
    scale:.9
  },{
    kind:"crate_stack",
    x:1782,
    y:1180,
    rot:0,
    scale:.95
  },{
    kind:"furnace_vent",
    x:1000,
    y:760,
    rot:0,
    scale:1
  },{
    kind:"furnace_vent",
    x:1880,
    y:790,
    rot:0,
    scale:1
  },{
    kind:"pipe_run",
    x:1430,
    y:1150,
    rot:0,
    scale:1.1
  },{
    kind:"pipe_run",
    x:2110,
    y:820,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"cargo_net",
    x:2010,
    y:1395,
    rot:0,
    scale:.9
  },{
    kind:"ingot_stack",
    x:2100,
    y:640,
    rot:0,
    scale:1
  },{
    kind:"ingot_stack",
    x:1250,
    y:1250,
    rot:0,
    scale:.95
  },{
    kind:"fuel_tank",
    x:2400,
    y:1100,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"water_bucket",
    x:1030,
    y:440,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1140,
    y:430,
    rot:0,
    scale:1
  },{
    kind:"trash_bin",
    x:1720,
    y:420,
    rot:0,
    scale:1
  }];
  return si({
    w:2560,
    h:1728,
    props:i,
    solids:oi(2560,1728,[...l.cover,...s],[],[[830,795],[1030,985],[1245,840],[1600,1035],[1820,845],[2150,980],[760,1300],[1880,1180]]),
    floors:[...l.floors,{
      name:"炉前广场",
      type:"concrete",
      x:1110,
      y:530,
      w:650,
      h:660
    },{
      name:"北检修道",
      type:"concrete",
      x:200,
      y:120,
      w:1e3,
      h:160
    },{
      name:"南炉渣区",
      type:"concrete",
      x:1050,
      y:1500,
      w:900,
      h:160
    }],
    decor:[...l.decor,...ni(2560,1728,80,5)],
    trees:[],
    water:[],
    roads:[[100,370,2460,370],[100,1470,2460,1470],[560,120,560,1600],[1140,120,1140,1600],[1720,120,1720,1600],[2330,310,2330,1470]],
    pads:[{
      type:"base",
      x:375,
      y:300,
      w:1940,
      h:1080
    },...l.pads,{
      type:"platform",
      x:2180,
      y:1365,
      w:290,
      h:145
    }],
    tracks:[1398,1450],
    containers:[...l.containers,{
      type:"medbox",
      x:312,
      y:515
    },{
      type:"crate",
      x:379,
      y:1197
    },{
      type:"weaponcase",
      x:958,
      y:1060
    },{
      type:"medbox",
      x:1250,
      y:710
    },{
      type:"safe",
      x:1560,
      y:1040
    },{
      type:"weaponcase",
      x:2160,
      y:850
    },{
      type:"crate",
      x:2060,
      y:1440
    },{
      type:"duffel",
      x:1780,
      y:1400
    },{
      type:"crate",
      x:780,
      y:250,
      fixedItem:"ak"
    },{
      type:"toolbox",
      x:1400,
      y:220,
      fixedItem:"dmr"
    },{
      type:"medbox",
      x:2200,
      y:230,
      fixedItem:"lmg"
    },{
      type:"crate",
      x:560,
      y:1580
    },{
      type:"weaponcase",
      x:1480,
      y:1580,
      fixedItem:"sniper"
    },{
      type:"safe",
      x:2050,
      y:1590
    },{
      type:"vending",
      x:2160,
      y:1080
    },{
      type:"treasure_chest",
      x:900,
      y:1540
    },{
      type:"coin_pile",
      x:1870,
      y:1570
    }],
    spawns:[{
      x:144,
      y:490,
      chick:[630,840]
    },{
      x:144,
      y:1260,
      chick:[650,1235]
    },{
      x:760,
      y:120,
      chick:[840,250]
    },{
      x:860,
      y:1665,
      chick:[760,1520]
    }],
    extractions:[{
      id:"A",
      name:"冷却塔侧门",
      x:2330,
      y:310,
      r:82,
      scene:"gate"
    },{
      id:"B",
      name:"铁路装运站台",
      x:2330,
      y:1420,
      r:82,
      scene:"rail"
    },{
      id:"C",
      name:"中央货车停车场",
      x:1270,
      y:710,
      r:76,
      scene:"parking"
    }],
    enemySpots:[{
      type:"chicken",
      x:630,
      y:840,
      n:2
    },{
      type:"bandit",
      x:650,
      y:1235,
      n:1
    },{
      type:"armored",
      x:942,
      y:560,
      n:1
    },{
      type:"bandit",
      x:1005,
      y:1280,
      n:1
    },{
      type:"bandit",
      x:830,
      y:1160,
      n:1
    },{
      type:"armored",
      x:1580,
      y:1220,
      n:1
    },{
      type:"foundryBoss",
      x:1490,
      y:875,
      n:1
    },{
      type:"elite",
      x:1520,
      y:458,
      n:1
    },{
      type:"elite",
      x:1845,
      y:995,
      n:1
    },{
      type:"armored",
      x:2320,
      y:1180,
      n:1
    },{
      type:"lookout",
      x:2140,
      y:383,
      n:1
    },{
      type:"lookout",
      x:2160,
      y:1480,
      n:1
    },{
      type:"bandit",
      x:500,
      y:220,
      n:1
    },{
      type:"armored",
      x:1451,
      y:226,
      n:1
    },{
      type:"elite",
      x:1750,
      y:210,
      n:1
    },{
      type:"bandit",
      x:1500,
      y:1560,
      n:1
    },{
      type:"armored",
      x:2280,
      y:1602,
      n:1
    },{
      type:"shield",
      x:1580,
      y:660,
      n:1
    },{
      type:"shield",
      x:1180,
      y:1280,
      n:1
    },{
      type:"hen",
      x:1700,
      y:1250,
      n:1
    },{
      type:"hen",
      x:720,
      y:700,
      n:1
    }],
    reinforce:[{
      x:820,
      y:240
    },{
      x:995,
      y:1560
    },{
      x:1760,
      y:550
    },{
      x:2020,
      y:1350
    },{
      x:1e3,
      y:180
    },{
      x:1700,
      y:1560
    }],
    zones:[{
      name:"工厂外门",
      x:0,
      y:0,
      w:530,
      h:1728
    },{
      name:"分拣车间",
      x:530,
      y:0,
      w:590,
      h:1728
    },{
      name:"炉前广场",
      x:1120,
      y:0,
      w:660,
      h:1728
    },{
      name:"控制室与装运区",
      x:1780,
      y:0,
      w:780,
      h:1728
    }]
  },"foundry")
}
function my(){
  const l=[{
    x:900,
    y:80,
    r:0,
    w:420,
    h:150
  },{
    x:1950,
    y:1450,
    r:0,
    w:380,
    h:130
  }],
  s=ii([{
    name:"育雏大棚",
    x:160,
    y:180,
    w:440,
    h:280,
    floor:"wood",
    doors:[["s",.5],["e",.6]],
    parts:[["h",200,320,200,16]],
    loot:[["crate",.2,.25],["toolbox",.75,.3],["medbox",.5,.85]]
  },{
    name:"孵化控制室",
    x:720,
    y:235,
    w:330,
    h:190,
    floor:"tile",
    doors:[["s",.5],["e",.5]],
    loot:[["pc",.15,.25],["desktop",.42,.25],["laptop",.34,.7],["safe",.85,.3]]
  },{
    name:"饲料仓",
    x:1300,
    y:150,
    w:340,
    h:240,
    floor:"wood",
    doors:[["s",.5],["w",.5]],
    racks:[[1340,200,170,22],[1340,260,170,22]],
    loot:[["crate",.2,.2],["weaponcase",.8,.2],["duffel",.5,.85]]
  },{
    name:"东北孵卵室",
    x:1790,
    y:150,
    w:300,
    h:230,
    floor:"tile",
    doors:[["s",.5],["w",.5]],
    racks:[[1820,210,150,20]],
    loot:[["pc",.2,.2],["medbox",.75,.3],["weaponcase",.5,.8]]
  },{
    name:"观察哨",
    x:150,
    y:930,
    w:300,
    h:220,
    floor:"wood",
    doors:[["n",.5],["e",.5]],
    loot:[["toolbox",.2,.2],["medbox",.8,.8]]
  },{
    name:"东侧巢室",
    x:1810,
    y:920,
    w:330,
    h:240,
    floor:"wood",
    doors:[["n",.5],["w",.5]],
    loot:[["medbox",.2,.2],["crate",.8,.3],["duffel",.5,.85]]
  },{
    name:"南巢育成房",
    x:260,
    y:1290,
    w:320,
    h:200,
    floor:"wood",
    doors:[["n",.5],["e",.5]],
    loot:[["crate",.2,.25],["duffel",.8,.3],["medbox",.5,.8]]
  },{
    name:"孵化工棚",
    x:760,
    y:1280,
    w:320,
    h:210,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    loot:[["weaponcase",.2,.25],["crate",.8,.25],["safe",.5,.8]]
  },{
    name:"东南养殖仓",
    x:1290,
    y:1270,
    w:320,
    h:210,
    floor:"wood",
    doors:[["n",.5],["w",.5]],
    loot:[["crate",.2,.25],["duffel",.8,.3],["medbox",.5,.8]]
  }]),
  i=[["wall",880,620,18,130],["wall",1402,620,18,130],["wall",880,850,18,130],["wall",1402,850,18,130],["wall",960,580,110,18],["wall",1230,580,110,18],["wall",960,1002,110,18],["wall",1230,1002,110,18],["cargo",760,520,120,48],["cargo",1440,520,120,48],["cargo",760,1050,120,48],["cargo",1440,1050,120,48],["fence",80,640,16,120],["fence",2200,640,16,120],["cargo",2000,560,150,52],["cargo",250,560,150,52],["cargo",1650,1260,52,150]],
  c=[{
    kind:"egg_nest",
    x:1150,
    y:800,
    rot:0,
    scale:1.6
  },{
    kind:"nest_cluster",
    x:1040,
    y:700,
    rot:0,
    scale:.9
  },{
    kind:"nest_cluster",
    x:1270,
    y:700,
    rot:0,
    scale:.9
  },{
    kind:"nest_cluster",
    x:1040,
    y:900,
    rot:0,
    scale:.9
  },{
    kind:"nest_cluster",
    x:1270,
    y:900,
    rot:0,
    scale:.9
  },{
    kind:"spore_pod",
    x:960,
    y:660,
    rot:0,
    scale:.8
  },{
    kind:"spore_pod",
    x:1340,
    y:950,
    rot:0,
    scale:.8
  },{
    kind:"rowboat",
    x:980,
    y:90,
    rot:0,
    scale:.9
  },{
    kind:"wood_bridge",
    x:900,
    y:80,
    rot:Math.PI/2,
    scale:1,
    len:200,
    width:64
  },{
    kind:"wood_bridge",
    x:1950,
    y:1450,
    rot:Math.PI/2,
    scale:1,
    len:220,
    width:64
  },{
    kind:"cattail",
    x:640,
    y:60,
    rot:0,
    scale:1
  },{
    kind:"cattail",
    x:1180,
    y:40,
    rot:0,
    scale:.9
  },{
    kind:"cattail",
    x:1720,
    y:1500,
    rot:0,
    scale:1
  },{
    kind:"cattail",
    x:2080,
    y:1330,
    rot:0,
    scale:.9
  },{
    kind:"well",
    x:560,
    y:1010,
    rot:0,
    scale:1
  },{
    kind:"water_bucket",
    x:640,
    y:1060,
    rot:0,
    scale:1
  },{
    kind:"water_bucket",
    x:490,
    y:1070,
    rot:0,
    scale:.9
  },{
    kind:"laundry_line",
    x:440,
    y:1220,
    rot:0,
    scale:1
  },{
    kind:"hay_bale",
    x:230,
    y:520,
    rot:0,
    scale:.95
  },{
    kind:"hay_bale",
    x:1900,
    y:470,
    rot:0,
    scale:.9
  },{
    kind:"hay_bale",
    x:1260,
    y:1540,
    rot:0,
    scale:.9
  },{
    kind:"vending_machine",
    x:870,
    y:330,
    rot:0,
    scale:.8
  },{
    kind:"street_lamp",
    x:760,
    y:470,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1540,
    y:470,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:760,
    y:1130,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1540,
    y:1130,
    rot:0,
    scale:1
  },{
    kind:"bus_stop",
    x:350,
    y:660,
    rot:0,
    scale:1
  },{
    kind:"mailbox",
    x:60,
    y:700,
    rot:0,
    scale:1
  },{
    kind:"bench_park",
    x:1270,
    y:1210,
    rot:0,
    scale:1
  },{
    kind:"trash_bin",
    x:1680,
    y:870,
    rot:0,
    scale:1
  },{
    kind:"berry_bush",
    x:1700,
    y:640,
    rot:0,
    scale:.95
  },{
    kind:"berry_bush",
    x:600,
    y:680,
    rot:0,
    scale:.95
  },{
    kind:"berry_bush",
    x:1700,
    y:1080,
    rot:0,
    scale:1
  },{
    kind:"thorn_bush",
    x:2020,
    y:700,
    rot:0,
    scale:1
  },{
    kind:"barrels",
    x:1700,
    y:420,
    scale:1,
    rot:0
  },{
    kind:"pickup_truck",
    x:2210,
    y:330,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"crate_stack",
    x:1760,
    y:1220,
    rot:0,
    scale:.95
  }];
  return si(Pc({
    w:2300,
    h:1600,
    water:l,
    props:c,
    solids:oi(2300,1600,[...s.cover,...i],l,[[1700,330],[620,1180],[2060,1240]]),
    floors:[...s.floors,{
      name:"鸭后孵化巢",
      type:"wood",
      x:898,
      y:598,
      w:504,
      h:404
    },{
      name:"环巢泥地",
      type:"concrete",
      x:740,
      y:490,
      w:820,
      h:120
    },{
      name:"环巢泥地南",
      type:"concrete",
      x:740,
      y:990,
      w:820,
      h:120
    }],
    decor:[...s.decor,...ni(2300,1600,85,7,l)],
    trees:[],
    tracks:[],
    roads:[[700,450,1600,450,1600,1150,700,1150,700,450],[80,800,700,800],[1600,800,2220,800],[1150,130,1150,450],[1150,1150,1150,1560]],
    pads:[{
      type:"field",
      x:960,
      y:660,
      w:380,
      h:280
    },...s.pads,{
      type:"platform",
      x:2150,
      y:1520,
      w:140,
      h:70
    }],
    containers:[...s.containers,{
      type:"crate",
      x:800,
      y:900
    },{
      type:"medbox",
      x:1500,
      y:700
    },{
      type:"duffel",
      x:1720,
      y:1350
    },{
      type:"crate",
      x:1710,
      y:260,
      fixedItem:"minigun"
    },{
      type:"weaponcase",
      x:1960,
      y:1230
    },{
      type:"crate",
      x:1220,
      y:1250,
      fixedItem:"rpg"
    },{
      type:"treasure_chest",
      x:1150,
      y:960
    },{
      type:"vending",
      x:870,
      y:330
    },{
      type:"treasure_chest",
      x:500,
      y:1540
    },{
      type:"coin_pile",
      x:1700,
      y:1420
    },{
      type:"medbox",
      x:900,
      y:1540
    },{
      type:"treasure_chest",
      x:1050,
      y:1540
    }],
    spawns:[{
      x:120,
      y:100,
      chick:[400,500]
    },{
      x:100,
      y:1500,
      chick:[500,1180]
    },{
      x:2200,
      y:120,
      chick:[1950,500]
    },{
      x:1150,
      y:1560,
      chick:[950,1200]
    }],
    extractions:[{
      id:"A",
      name:"北岸栈桥",
      x:1330,
      y:90,
      r:72,
      scene:"dock"
    },{
      id:"B",
      name:"东侧排水闸",
      x:2160,
      y:1430,
      r:72,
      scene:"sluice"
    },{
      id:"C",
      name:"西侧公交站",
      x:350,
      y:810,
      r:72,
      scene:"parking"
    }],
    enemySpots:[{
      type:"broodQueen",
      x:1150,
      y:800,
      n:1
    },{
      type:"chicken",
      x:1000,
      y:800,
      n:4
    },{
      type:"chicken",
      x:1300,
      y:800,
      n:3
    },{
      type:"hen",
      x:1150,
      y:660,
      n:1
    },{
      type:"hen",
      x:1150,
      y:950,
      n:1
    },{
      type:"bandit",
      x:400,
      y:520,
      n:1
    },{
      type:"bandit",
      x:1470,
      y:300,
      n:1
    },{
      type:"bandit",
      x:1960,
      y:470,
      n:1
    },{
      type:"bandit",
      x:330,
      y:1050,
      n:1
    },{
      type:"bandit",
      x:1950,
      y:1310,
      n:1
    },{
      type:"bandit",
      x:920,
      y:1380,
      n:1
    },{
      type:"armored",
      x:800,
      y:640,
      n:1
    },{
      type:"armored",
      x:1500,
      y:960,
      n:1
    },{
      type:"elite",
      x:1720,
      y:720,
      n:1
    },{
      type:"elite",
      x:620,
      y:1240,
      n:1
    },{
      type:"elite",
      x:1940,
      y:270,
      n:1
    },{
      type:"shield",
      x:800,
      y:960,
      n:1
    },{
      type:"shield",
      x:1500,
      y:640,
      n:1
    },{
      type:"lookout",
      x:2140,
      y:900,
      n:1
    },{
      type:"hen",
      x:520,
      y:700,
      n:1
    }],
    reinforce:[{
      x:-200,
      y:800
    },{
      x:2500,
      y:800
    },{
      x:1150,
      y:-150
    },{
      x:1150,
      y:1750
    },{
      x:-200,
      y:200
    },{
      x:2500,
      y:1400
    }],
    zones:[{
      name:"西北育雏区",
      x:-350,
      y:-250,
      w:1050,
      h:800
    },{
      name:"北侧孵化控制区",
      x:700,
      y:-250,
      w:900,
      h:700
    },{
      name:"东北饲料区",
      x:1600,
      y:-250,
      w:1050,
      h:800
    },{
      name:"西侧观察哨",
      x:-350,
      y:550,
      w:1050,
      h:600
    },{
      name:"鸭后孵化巢",
      x:700,
      y:450,
      w:900,
      h:700
    },{
      name:"东侧巢室",
      x:1600,
      y:550,
      w:1050,
      h:600
    },{
      name:"南侧育成区",
      x:-350,
      y:1150,
      w:1500,
      h:700
    },{
      name:"东南排水沼泽",
      x:1150,
      y:1150,
      w:1500,
      h:700
    }]
  },350,250,3e3,2100),"hatchery")
}
function yy(){
  const l=[{
    x:900,
    y:820,
    r:0,
    w:420,
    h:220
  },{
    x:2450,
    y:820,
    r:0,
    w:300,
    h:200
  }],
  s=ii([{
    name:"冰封机库",
    x:300,
    y:300,
    w:560,
    h:380,
    floor:"concrete",
    doors:[["s",.4],["e",.6],["n",.5]],
    racks:[[370,360,200,24],[370,430,200,24]],
    loot:[["crate",.15,.2],["weaponcase",.8,.2],["medbox",.5,.85]]
  },{
    name:"雷达站",
    x:1100,
    y:180,
    w:380,
    h:300,
    floor:"tile",
    doors:[["s",.5],["w",.5]],
    loot:[["pc",.18,.2],["desktop",.38,.2],["laptop",.55,.62],["safe",.85,.25],["toolbox",.3,.85]]
  },{
    name:"北兵营",
    x:1750,
    y:250,
    w:420,
    h:300,
    floor:"wood",
    doors:[["s",.5],["w",.6]],
    loot:[["duffel",.2,.25],["crate",.8,.3],["medbox",.5,.85]]
  },{
    name:"补给仓",
    x:350,
    y:1120,
    w:380,
    h:300,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    racks:[[400,1180,180,22],[400,1250,180,22]],
    loot:[["weaponcase",.15,.2],["safe",.85,.25],["crate",.5,.85]]
  },{
    name:"指挥所",
    x:1150,
    y:1080,
    w:440,
    h:340,
    floor:"concrete",
    doors:[["n",.4],["w",.5],["e",.5]],
    parts:[["v",1330,1140,160,20]],
    loot:[["pc",.15,.2],["pc",.55,.2],["laptop",.36,.62],["safe",.85,.8]]
  },{
    name:"南机修库",
    x:1900,
    y:1150,
    w:400,
    h:300,
    floor:"concrete",
    doors:[["n",.5],["w",.5]],
    loot:[["weaponcase",.2,.2],["crate",.8,.3],["medbox",.5,.85]]
  },{
    name:"冰塔观测所",
    x:1500,
    y:160,
    w:220,
    h:240,
    floor:"tile",
    doors:[["s",.5],["w",.5]],
    loot:[["pc",.2,.2],["toolbox",.75,.3],["safe",.5,.8]]
  },{
    name:"雪下军械库",
    x:780,
    y:1460,
    w:320,
    h:200,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    racks:[[810,1510,160,20]],
    loot:[["weaponcase",.2,.25],["medbox",.8,.3],["crate",.5,.8]]
  }]),
  i=[["cargo",550,760,200,64],["cargo",1250,760,220,64],["cargo",1650,620,180,60],["cargo",2050,760,200,60],["cargo",450,950,190,58],["cargo",1e3,1250,190,58],["cargo",2100,1350,180,58],["wall",1450,720,20,140],["wall",1450,960,20,140],["wall",2350,500,18,160],["fence",250,800,16,180],["fence",2480,1050,16,180],["wall",1e3,620,18,120],["wall",1550,620,18,120],["cargo",830,1040,170,56],["cargo",2300,620,160,56],["fence",1320,1480,16,140],["fence",2480,1400,16,140]],
  c=[{
    kind:"dump_truck",
    x:700,
    y:960,
    rot:Math.PI/2,
    scale:1.05
  },{
    kind:"container_truck",
    x:1300,
    y:900,
    rot:0,
    scale:1
  },{
    kind:"pickup_truck",
    x:2219,
    y:539,
    rot:Math.PI/2,
    scale:1.05
  },{
    kind:"rowboat",
    x:880,
    y:820,
    rot:0,
    scale:.9
  },{
    kind:"barrels",
    x:1180,
    y:700,
    scale:1,
    rot:0
  },{
    kind:"crane",
    x:2350,
    y:1350,
    scale:1.1,
    rot:0
  },{
    kind:"vending_machine",
    x:1780,
    y:1450,
    rot:0,
    scale:.8
  },{
    kind:"ice_beacon",
    x:898,
    y:520,
    rot:0,
    scale:1.15
  },{
    kind:"ice_beacon",
    x:2144,
    y:1072,
    rot:Math.PI/4,
    scale:1.1
  },{
    kind:"crate_stack",
    x:1660,
    y:1304,
    rot:0,
    scale:.95
  },{
    kind:"metal_workbench",
    x:1660,
    y:1410,
    rot:Math.PI/2,
    scale:.85
  },{
    kind:"wood_bench",
    x:921,
    y:1131,
    rot:0,
    scale:.86
  },{
    kind:"ice_beacon",
    x:1756,
    y:220,
    rot:0,
    scale:1
  },{
    kind:"metal_workbench",
    x:950,
    y:1560,
    rot:Math.PI/2,
    scale:.85
  },{
    kind:"crate_stack",
    x:2200,
    y:1300,
    rot:0,
    scale:.95
  },{
    kind:"wood_bench",
    x:1000,
    y:1425,
    rot:0,
    scale:.86
  },{
    kind:"fighter_jet",
    x:2240,
    y:320,
    rot:-.12,
    scale:.95
  },{
    kind:"ice_block",
    x:520,
    y:1480,
    rot:.18,
    scale:1
  },{
    kind:"ice_block",
    x:240,
    y:1320,
    rot:-.24,
    scale:.9
  },{
    kind:"ice_crystal",
    x:1320,
    y:120,
    rot:.1,
    scale:1.05
  },{
    kind:"frost_pylon",
    x:1440,
    y:560,
    rot:0,
    scale:1
  },{
    kind:"snow_drift",
    x:1400,
    y:1480,
    rot:-.16,
    scale:1
  },{
    kind:"snow_drift",
    x:2440,
    y:200,
    rot:.1,
    scale:1
  },{
    kind:"frost_pylon",
    x:1950,
    y:880,
    rot:0,
    scale:.95
  },{
    kind:"frost_pylon",
    x:2420,
    y:1100,
    rot:0,
    scale:.95
  },{
    kind:"stone_bridge",
    x:900,
    y:820,
    rot:Math.PI/2,
    scale:1,
    len:310,
    width:80
  },{
    kind:"wood_bridge",
    x:2450,
    y:820,
    rot:Math.PI/2,
    scale:1,
    len:290,
    width:64
  },{
    kind:"radar_station",
    x:1290,
    y:330,
    rot:0,
    scale:1
  },{
    kind:"missile_rack",
    x:2120,
    y:1250,
    rot:0,
    scale:1
  },{
    kind:"missile_rack",
    x:640,
    y:1250,
    rot:0,
    scale:1
  },{
    kind:"sandbag_wall",
    x:1698,
    y:880,
    rot:0,
    scale:1
  },{
    kind:"antenna_mast",
    x:1586,
    y:138,
    rot:0,
    scale:1
  },{
    kind:"fuel_tank",
    x:509,
    y:791,
    rot:0,
    scale:.9
  }];
  return si(Pc({
    w:2600,
    h:1700,
    water:l,
    props:c,
    solids:oi(2600,1700,[...s.cover,...i],l,[[1180,1e3],[1620,860],[2050,1080],[600,1320]]),
    floors:[...s.floors,{
      name:"冰封中庭东场",
      type:"concrete",
      x:1120,
      y:700,
      w:780,
      h:340
    },{
      name:"冰封中庭南岸",
      type:"concrete",
      x:900,
      y:950,
      w:220,
      h:90
    },{
      name:"霜羽元帅雪丘",
      type:"concrete",
      x:700,
      y:430,
      w:500,
      h:280
    },{
      name:"铁壁统领擂台东场",
      type:"concrete",
      x:1950,
      y:840,
      w:300,
      h:440
    },{
      name:"铁壁统领擂台南场",
      type:"concrete",
      x:1690,
      y:940,
      w:260,
      h:340
    },{
      name:"西侧冻土路",
      type:"concrete",
      x:120,
      y:700,
      w:400,
      h:380
    },{
      name:"东侧广场",
      type:"concrete",
      x:1900,
      y:960,
      w:560,
      h:160
    }],
    decor:[...s.decor,...ni(2600,1700,95,11,l)],
    trees:[],
    tracks:[],
    roads:[[80,700,2520,700],[80,1020,2520,1020],[850,120,850,1580],[1650,120,1650,1580],[2350,300,2350,1450]],
    pads:[...s.pads,{
      type:"platform",
      x:2320,
      y:180,
      w:210,
      h:130
    },{
      type:"base",
      x:1120,
      y:700,
      w:780,
      h:340
    }],
    containers:[...s.containers,{
      type:"crate",
      x:760,
      y:1050
    },{
      type:"medbox",
      x:1300,
      y:1400
    },{
      type:"duffel",
      x:2200,
      y:1e3
    },{
      type:"weaponcase",
      x:1360,
      y:420,
      fixedItem:"awmlegend"
    },{
      type:"safe",
      x:2100,
      y:1270,
      fixedItem:"m4legend"
    },{
      type:"crate",
      x:500,
      y:1200,
      fixedItem:"rpg"
    },{
      type:"vending",
      x:1780,
      y:1450
    },{
      type:"treasure_chest",
      x:1220,
      y:1450
    },{
      type:"coin_pile",
      x:900,
      y:1460
    },{
      type:"weaponcase",
      x:1600,
      y:280,
      fixedItem:"dmr"
    },{
      type:"medbox",
      x:950,
      y:1560
    },{
      type:"treasure_chest",
      x:1100,
      y:1600
    }],
    spawns:[{
      x:110,
      y:1570,
      chick:[500,1400]
    },{
      x:940,
      y:1690,
      chick:[940,1500]
    },{
      x:2500,
      y:100,
      chick:[2300,300]
    },{
      x:1450,
      y:1600,
      chick:[1400,1450]
    }],
    extractions:[{
      id:"A",
      name:"北岭直升机坪",
      x:1850,
      y:110,
      r:76,
      scene:"helipad"
    },{
      id:"B",
      name:"南岭雪地车库",
      x:2430,
      y:1500,
      r:76,
      scene:"parking"
    }],
    enemySpots:[{
      type:"frostMarshal",
      x:700,
      y:560,
      n:1
    },{
      type:"ironGuard",
      x:2150,
      y:1100,
      n:1
    },{
      type:"chicken",
      x:580,
      y:925,
      n:3
    },{
      type:"chicken",
      x:1900,
      y:700,
      n:3
    },{
      type:"bandit",
      x:620,
      y:700,
      n:1
    },{
      type:"bandit",
      x:1300,
      y:620,
      n:1
    },{
      type:"bandit",
      x:1650,
      y:1080,
      n:1
    },{
      type:"bandit",
      x:2200,
      y:920,
      n:1
    },{
      type:"elite",
      x:1520,
      y:880,
      n:1
    },{
      type:"elite",
      x:2082,
      y:1394,
      n:1
    },{
      type:"armored",
      x:1180,
      y:900,
      n:1
    },{
      type:"armored",
      x:1980,
      y:1180,
      n:1
    },{
      type:"shield",
      x:1080,
      y:1180,
      n:1
    },{
      type:"shield",
      x:1720,
      y:720,
      n:1
    },{
      type:"hen",
      x:1450,
      y:1300,
      n:1
    },{
      type:"hen",
      x:700,
      y:1320,
      n:1
    },{
      type:"lookout",
      x:2150,
      y:150,
      n:1
    },{
      type:"lookout",
      x:2300,
      y:1550,
      n:1
    },{
      type:"elite",
      x:1600,
      y:300,
      n:1
    },{
      type:"shield",
      x:900,
      y:1560,
      n:1
    },{
      type:"armored",
      x:2200,
      y:600,
      n:1
    },{
      type:"bandit",
      x:1e3,
      y:1500,
      n:1
    }],
    reinforce:[{
      x:150,
      y:950
    },{
      x:780,
      y:120
    },{
      x:1500,
      y:150
    },{
      x:2500,
      y:700
    },{
      x:2450,
      y:1180
    },{
      x:1e3,
      y:1580
    },{
      x:1900,
      y:1600
    },{
      x:1600,
      y:300
    },{
      x:950,
      y:1600
    },{
      x:2250,
      y:600
    }],
    zones:[{
      name:"北缘雷达雪坡",
      x:-300,
      y:-250,
      w:3200,
      h:650
    },{
      name:"西侧机库与元帅雪丘",
      x:-300,
      y:400,
      w:1200,
      h:1050
    },{
      name:"冻土中央走廊",
      x:900,
      y:400,
      w:900,
      h:1050
    },{
      name:"铁壁擂台与东哨所",
      x:1800,
      y:400,
      w:1100,
      h:1050
    },{
      name:"南侧运输坡",
      x:-300,
      y:1450,
      w:3200,
      h:500
    },{
      name:"冰塔观测哨",
      x:1400,
      y:150,
      w:500,
      h:500
    },{
      name:"雪下军械库",
      x:650,
      y:1400,
      w:650,
      h:450
    }]
  },300,250,3200,2200),"outpost")
}
function py(){
  const l=[{
    x:1e3,
    y:250,
    r:0,
    w:260,
    h:100
  },{
    x:2050,
    y:900,
    r:0,
    w:200,
    h:120
  }],
  s=ii([{
    name:"王座大厅",
    x:1050,
    y:650,
    w:760,
    h:560,
    floor:"concrete",
    doors:[["n",.5],["s",.5],["w",.5],["e",.5]],
    loot:[["safe",.15,.2],["weaponcase",.85,.2],["medbox",.5,.85]]
  },{
    name:"西宝库",
    x:350,
    y:350,
    w:420,
    h:340,
    floor:"tile",
    doors:[["s",.5],["e",.6]],
    loot:[["safe",.2,.2],["pc",.8,.25],["crate",.5,.85]]
  },{
    name:"东宝库",
    x:2050,
    y:350,
    w:420,
    h:340,
    floor:"tile",
    doors:[["s",.5],["w",.6]],
    loot:[["safe",.2,.2],["pc",.8,.25],["crate",.5,.85]]
  },{
    name:"禁卫营",
    x:450,
    y:1250,
    w:500,
    h:340,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    racks:[[520,1320,200,24],[520,1400,200,24]],
    loot:[["weaponcase",.2,.2],["crate",.8,.3],["medbox",.5,.85]]
  },{
    name:"鸭王私人宝库",
    x:1900,
    y:1300,
    w:560,
    h:400,
    floor:"tile",
    doors:[["n",.5],["w",.5]],
    loot:[["safe",.17,.18],["weaponcase",.83,.18],["treasure_chest",.5,.5],["safe",.18,.82],["duffel",.82,.82]]
  },{
    name:"回廊哨",
    x:1150,
    y:140,
    w:360,
    h:280,
    floor:"wood",
    doors:[["s",.5],["e",.5]],
    loot:[["crate",.2,.2],["toolbox",.8,.3]]
  },{
    name:"南库",
    x:1350,
    y:1400,
    w:380,
    h:260,
    floor:"concrete",
    doors:[["n",.5],["w",.5]],
    loot:[["weaponcase",.2,.2],["duffel",.8,.3]]
  },{
    name:"西侧碑亭",
    x:120,
    y:150,
    w:220,
    h:220,
    floor:"tile",
    doors:[["s",.5],["e",.5]],
    loot:[["crate",.2,.2],["treasure_chest",.7,.75]]
  },{
    name:"东侧祭殿",
    x:2520,
    y:180,
    w:250,
    h:300,
    floor:"tile",
    doors:[["s",.5],["w",.5]],
    loot:[["safe",.2,.2],["medbox",.75,.3],["weaponcase",.5,.8]]
  },{
    name:"碑林回廊",
    x:100,
    y:820,
    w:220,
    h:300,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    loot:[["crate",.2,.25],["duffel",.8,.3],["medbox",.5,.85]]
  }]),
  i=[["wall",1020,600,20,180],["wall",1800,600,20,180],["wall",1020,1100,20,180],["wall",1800,1100,20,180],["wall",900,1400,18,180],["wall",2500,800,18,200],["cargo",600,800,200,60],["cargo",2290,850,170,56],["cargo",1750,1500,190,58],["cargo",650,1600,190,58],["cargo",2300,650,170,56],["fence",250,850,16,240],["fence",2540,1250,16,220],["wall",980,500,18,160],["wall",1820,500,18,160],["cargo",760,1050,180,56],["cargo",2400,1170,160,56],["fence",1e3,1500,16,160],["fence",2650,700,16,160]],
  c=[{
    kind:"duck_king_statue",
    x:1560,
    y:365,
    rot:0,
    scale:1
  },{
    kind:"king_vault_gate",
    x:2180,
    y:1284,
    rot:0,
    scale:1.25
  },{
    kind:"table_map_cup",
    x:1250,
    y:300,
    rot:0,
    scale:.9
  },{
    kind:"wood_chair",
    x:1250,
    y:360,
    rot:0,
    scale:.78
  },{
    kind:"duck_throne",
    x:1466,
    y:758,
    rot:0,
    scale:1.18
  },{
    kind:"stone_steps",
    x:1430,
    y:600,
    rot:0,
    scale:.9
  },{
    kind:"wood_table",
    x:1250,
    y:780,
    rot:0,
    scale:.9
  },{
    kind:"crate_stack",
    x:2058,
    y:1602,
    rot:0,
    scale:.95
  },{
    kind:"duck_king_statue",
    x:2690,
    y:400,
    rot:0,
    scale:.9
  },{
    kind:"stone_steps",
    x:1430,
    y:1260,
    rot:0,
    scale:.9
  },{
    kind:"fountain",
    x:1800,
    y:1440,
    rot:0,
    scale:.9
  },{
    kind:"wood_table",
    x:199,
    y:1176,
    rot:0,
    scale:.85
  },{
    kind:"royal_lantern",
    x:1340,
    y:560,
    rot:0,
    scale:1
  },{
    kind:"royal_lantern",
    x:1520,
    y:560,
    rot:0,
    scale:1
  },{
    kind:"rune_pillar",
    x:1270,
    y:500,
    rot:0,
    scale:1
  },{
    kind:"rune_pillar",
    x:1590,
    y:500,
    rot:0,
    scale:1
  },{
    kind:"rune_pillar",
    x:940,
    y:600,
    rot:0,
    scale:.9
  },{
    kind:"rune_pillar",
    x:1900,
    y:600,
    rot:0,
    scale:.9
  },{
    kind:"stone_lion",
    x:1180,
    y:600,
    rot:0,
    scale:1
  },{
    kind:"stone_lion",
    x:1680,
    y:600,
    rot:0,
    scale:1
  },{
    kind:"stone_bridge",
    x:1000,
    y:250,
    rot:Math.PI/2,
    scale:1,
    len:190,
    width:72
  },{
    kind:"stone_bridge",
    x:2050,
    y:900,
    rot:Math.PI/2,
    scale:1,
    len:210,
    width:72
  },{
    kind:"well",
    x:583,
    y:1062,
    rot:0,
    scale:1
  },{
    kind:"water_bucket",
    x:658,
    y:1044,
    rot:0,
    scale:1
  },{
    kind:"bench_park",
    x:1446,
    y:1350,
    rot:0,
    scale:1
  }];
  return si(Pc({
    w:2800,
    h:1800,
    water:l,
    props:c,
    solids:oi(2800,1800,[...s.cover,...i],l,[[1000,540],[1780,1180],[820,1080],[2300,1e3]]),
    floors:[...s.floors,{
      name:"王陵广场",
      type:"concrete",
      x:900,
      y:600,
      w:1e3,
      h:700
    },{
      name:"王家秘库前厅",
      type:"tile",
      x:1850,
      y:1280,
      w:610,
      h:430
    },{
      name:"神道",
      type:"tile",
      x:1300,
      y:80,
      w:220,
      h:560
    }],
    decor:[...s.decor,...ni(2800,1800,100,13,l)],
    trees:[],
    tracks:[],
    roads:[[120,1e3,2680,1e3],[120,1550,2680,1550],[250,120,250,1650],[1400,100,1400,1700],[2550,120,2550,1650]],
    pads:[...s.pads,{
      type:"platform",
      x:2450,
      y:1550,
      w:250,
      h:140
    },{
      type:"base",
      x:1e3,
      y:650,
      w:800,
      h:600
    }],
    containers:[...s.containers,{
      type:"medbox",
      x:880,
      y:1180
    },{
      type:"crate",
      x:2100,
      y:1080
    },{
      type:"weaponcase",
      x:500,
      y:450,
      fixedItem:"rpg"
    },{
      type:"safe",
      x:2250,
      y:500,
      fixedItem:"awmlegend"
    },{
      type:"weaponcase",
      x:2100,
      y:1400,
      fixedItem:"m4legend"
    },{
      type:"crate",
      x:1550,
      y:250,
      fixedItem:"minigun"
    },{
      type:"safe",
      x:1500,
      y:1490
    },{
      type:"vending",
      x:2600,
      y:1080
    },{
      type:"treasure_chest",
      x:800,
      y:520
    },{
      type:"coin_pile",
      x:1960,
      y:520
    },{
      type:"treasure_chest",
      x:2e3,
      y:1540
    },{
      type:"coin_pile",
      x:2340,
      y:1540
    },{
      type:"weaponcase",
      x:260,
      y:280
    },{
      type:"treasure_chest",
      x:200,
      y:1e3
    },{
      type:"medbox",
      x:2600,
      y:400
    },{
      type:"safe",
      x:2600,
      y:1150
    }],
    spawns:[{
      x:110,
      y:600,
      chick:[620,800]
    },{
      x:1350,
      y:100,
      chick:[1400,520]
    },{
      x:2680,
      y:600,
      chick:[2350,800]
    },{
      x:200,
      y:1700,
      chick:[700,1500]
    }],
    extractions:[{
      id:"A",
      name:"西门牌坊",
      x:700,
      y:120,
      r:78,
      scene:"arch"
    },{
      id:"B",
      name:"东陵密道",
      x:2650,
      y:1650,
      r:78,
      scene:"tunnel"
    }],
    enemySpots:[{
      type:"duckKing",
      x:1450,
      y:930,
      n:1
    },{
      type:"elite",
      x:1180,
      y:860,
      n:1
    },{
      type:"elite",
      x:1900,
      y:700,
      n:1
    },{
      type:"elite",
      x:620,
      y:700,
      n:1
    },{
      type:"elite",
      x:2350,
      y:1250,
      n:1
    },{
      type:"shield",
      x:1120,
      y:1120,
      n:1
    },{
      type:"shield",
      x:1850,
      y:1150,
      n:1
    },{
      type:"shield",
      x:2331,
      y:926,
      n:1
    },{
      type:"armored",
      x:850,
      y:620,
      n:1
    },{
      type:"armored",
      x:2050,
      y:1120,
      n:1
    },{
      type:"armored",
      x:700,
      y:1480,
      n:1
    },{
      type:"hen",
      x:1300,
      y:1250,
      n:1
    },{
      type:"hen",
      x:2200,
      y:600,
      n:1
    },{
      type:"hen",
      x:600,
      y:1e3,
      n:1
    },{
      type:"lookout",
      x:1300,
      y:400,
      n:1
    },{
      type:"lookout",
      x:2500,
      y:1450,
      n:1
    },{
      type:"bandit",
      x:500,
      y:1e3,
      n:1
    },{
      type:"bandit",
      x:2e3,
      y:1050,
      n:1
    },{
      type:"chicken",
      x:880,
      y:1550,
      n:4
    },{
      type:"elite",
      x:260,
      y:300,
      n:1
    },{
      type:"shield",
      x:200,
      y:960,
      n:1
    },{
      type:"armored",
      x:2600,
      y:350,
      n:1
    },{
      type:"shield",
      x:2600,
      y:1150,
      n:1
    }],
    reinforce:[{
      x:150,
      y:1050
    },{
      x:1150,
      y:120
    },{
      x:2150,
      y:180
    },{
      x:2650,
      y:900
    },{
      x:2650,
      y:1400
    },{
      x:750,
      y:1720
    },{
      x:1800,
      y:1720
    },{
      x:250,
      y:300
    },{
      x:2600,
      y:350
    },{
      x:200,
      y:1e3
    }],
    zones:[{
      name:"北侧神道与殿廊",
      x:-300,
      y:-250,
      w:3400,
      h:700
    },{
      name:"西侧禁卫与西宝库",
      x:-300,
      y:450,
      w:1200,
      h:1e3
    },{
      name:"王座大厅",
      x:900,
      y:450,
      w:900,
      h:1e3
    },{
      name:"东侧王家秘库",
      x:1800,
      y:450,
      w:1300,
      h:1e3
    },{
      name:"南侧外陵与运输道",
      x:-300,
      y:1450,
      w:3400,
      h:550
    },{
      name:"西侧碑亭与碑林",
      x:-200,
      y:100,
      w:600,
      h:1250
    },{
      name:"东侧祭殿",
      x:2400,
      y:100,
      w:600,
      h:700
    }]
  },300,250,3400,2300),"mausoleum")
}
function ab(){
  const l=[{
    x:980,
    y:1500,
    r:0,
    w:360,
    h:180
  }],
  s=ii([{
    name:"西翼机库",
    x:260,
    y:260,
    w:520,
    h:340,
    floor:"concrete",
    doors:[["s",.5],["e",.6]],
    racks:[[320,320,200,24]],
    loot:[["weaponcase",.2,.25],["crate",.8,.25],["medbox",.5,.85]]
  },{
    name:"塔台",
    x:1180,
    y:180,
    w:300,
    h:260,
    floor:"tile",
    doors:[["s",.5],["w",.5]],
    loot:[["pc",.2,.25],["desktop",.5,.25],["laptop",.4,.7],["safe",.85,.3]]
  },{
    name:"东翼机库",
    x:1900,
    y:260,
    w:520,
    h:340,
    floor:"concrete",
    doors:[["s",.5],["w",.6]],
    racks:[[1960,320,200,24]],
    loot:[["weaponcase",.2,.25],["crate",.8,.25],["medbox",.5,.85]]
  },{
    name:"熔岩油库",
    x:360,
    y:1140,
    w:360,
    h:260,
    floor:"concrete",
    doors:[["n",.5],["e",.5]],
    loot:[["crate",.2,.25],["duffel",.8,.3],["safe",.5,.85]]
  },{
    name:"冰封雷达站",
    x:1980,
    y:1140,
    w:360,
    h:260,
    floor:"tile",
    doors:[["n",.5],["w",.5]],
    loot:[["pc",.2,.25],["toolbox",.8,.3],["safe",.5,.85]]
  },{
    name:"指挥掩体",
    x:1120,
    y:1160,
    w:440,
    h:260,
    floor:"concrete",
    doors:[["n",.5],["w",.5],["e",.5]],
    loot:[["safe",.15,.25],["weaponcase",.85,.25],["laptop",.5,.7]]
  }]),
  i=[["cargo",880,700,200,64],["cargo",1620,700,200,64],["wall",1320,600,20,160],["cargo",600,900,180,58],["cargo",1900,900,180,58],["cargo",1200,1000,180,56],["fence",200,700,16,200],["fence",2480,700,16,200],["wall",880,1300,18,160],["wall",1820,1300,18,160]],
  c=[{
    kind:"hangar",
    x:520,
    y:178,
    rot:0,
    scale:1.25
  },{
    kind:"hangar",
    x:2160,
    y:178,
    rot:0,
    scale:1.25
  },{
    kind:"fighter_jet_parked",
    x:520,
    y:660,
    rot:0,
    scale:1.1
  },{
    kind:"fighter_jet_parked",
    x:2160,
    y:660,
    rot:0,
    scale:1.1
  },{
    kind:"fighter_jet_parked",
    x:1080,
    y:630,
    rot:0,
    scale:1.1
  },{
    kind:"fighter_jet_parked",
    x:820,
    y:980,
    rot:Math.PI,
    scale:1
  },{
    kind:"fighter_jet_parked",
    x:2250,
    y:1000,
    rot:Math.PI,
    scale:1
  },{
    kind:"lava_pool",
    x:300,
    y:1550,
    rot:0,
    scale:1.3
  },{
    kind:"lava_pool",
    x:760,
    y:1640,
    rot:0,
    scale:1.1
  },{
    kind:"lava_fissure",
    x:560,
    y:1460,
    rot:.3,
    scale:1.1
  },{
    kind:"furnace_vent",
    x:840,
    y:1080,
    rot:0,
    scale:1
  },{
    kind:"ice_block",
    x:2380,
    y:1560,
    rot:0,
    scale:1.1
  },{
    kind:"ice_crystal",
    x:1950,
    y:1620,
    rot:0,
    scale:1.2
  },{
    kind:"frost_pylon",
    x:2100,
    y:1060,
    rot:0,
    scale:1
  },{
    kind:"snow_drift",
    x:2420,
    y:1460,
    rot:.1,
    scale:1.1
  },{
    kind:"crate_stack",
    x:780,
    y:640,
    rot:0,
    scale:1
  },{
    kind:"crate_stack",
    x:1920,
    y:640,
    rot:0,
    scale:1
  },{
    kind:"barrels",
    x:400,
    y:700,
    rot:0,
    scale:1
  },{
    kind:"barrels",
    x:2300,
    y:700,
    rot:0,
    scale:1
  },{
    kind:"stone_bridge",
    x:980,
    y:1500,
    rot:Math.PI/2,
    scale:1,
    len:270,
    width:80
  },{
    kind:"radar_station",
    x:1296,
    y:554,
    rot:0,
    scale:1.1
  },{
    kind:"missile_rack",
    x:900,
    y:470,
    rot:0,
    scale:1
  },{
    kind:"missile_rack",
    x:1780,
    y:470,
    rot:0,
    scale:1
  },{
    kind:"sandbag_wall",
    x:1150,
    y:980,
    rot:0,
    scale:1
  },{
    kind:"sandbag_wall",
    x:1550,
    y:980,
    rot:0,
    scale:1
  },{
    kind:"fuel_tank",
    x:2277,
    y:1253,
    rot:0,
    scale:1
  },{
    kind:"antenna_mast",
    x:1500,
    y:250,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1350,
    y:920,
    rot:0,
    scale:1
  }];
  return si({
    w:2700,
    h:1800,
    water:l,
    props:c,
    solids:oi(2700,1800,[...s.cover,...i],l,[[700,760],[2000,760],[1350,1080],[620,1500]]),
    floors:[...s.floors,{
      name:"熔岩焦土",
      type:"concrete",
      x:120,
      y:1450,
      w:900,
      h:260
    },{
      name:"冰霜雪原",
      type:"concrete",
      x:1700,
      y:1450,
      w:860,
      h:260
    }],
    decor:[...s.decor,...ni(2700,1800,90,17,l)],
    trees:[],
    tracks:[],
    roads:[[1350,440,1350,740],[1350,900,1350,1700],[200,1100,2500,1100],[600,820,600,1700],[2100,820,2100,1700]],
    pads:[{
      type:"runway",
      x:200,
      y:740,
      w:2300,
      h:160
    },...s.pads,{
      type:"platform",
      x:1250,
      y:60,
      w:200,
      h:120
    },{
      type:"helipad",
      x:2480,
      y:80,
      w:150,
      h:150
    }],
    containers:[...s.containers,{
      type:"weaponcase",
      x:1350,
      y:640,
      fixedItem:"rpg"
    },{
      type:"safe",
      x:460,
      y:1660,
      fixedItem:"m4legend"
    },{
      type:"safe",
      x:2240,
      y:1660,
      fixedItem:"awmlegend"
    },{
      type:"crate",
      x:900,
      y:560
    },{
      type:"crate",
      x:1800,
      y:560
    },{
      type:"medbox",
      x:1350,
      y:980
    },{
      type:"treasure_chest",
      x:200,
      y:1300
    },{
      type:"treasure_chest",
      x:2500,
      y:1300
    },{
      type:"coin_pile",
      x:1350,
      y:1500
    },{
      type:"vending",
      x:1500,
      y:460
    }],
    spawns:[{
      x:120,
      y:400,
      chick:[400,500]
    },{
      x:2580,
      y:900,
      chick:[2300,800]
    },{
      x:1350,
      y:80,
      chick:[1350,300]
    },{
      x:1350,
      y:1720,
      chick:[1350,1500]
    }],
    extractions:[{
      id:"A",
      name:"塔台直升机坪",
      x:2555,
      y:155,
      r:78,
      scene:"helipad"
    },{
      id:"B",
      name:"西侧运输机",
      x:470,
      y:1030,
      r:82,
      scene:"plane"
    },{
      id:"C",
      name:"中央停车场",
      x:1870,
      y:1150,
      r:76,
      scene:"parking"
    }],
    enemySpots:[{
      type:"flameAce",
      x:420,
      y:1580,
      n:1
    },{
      type:"radarWarden",
      x:2300,
      y:1580,
      n:1
    },{
      type:"elite",
      x:520,
      y:600,
      n:1
    },{
      type:"elite",
      x:2160,
      y:600,
      n:1
    },{
      type:"armored",
      x:1350,
      y:700,
      n:1
    },{
      type:"shield",
      x:1000,
      y:960,
      n:1
    },{
      type:"shield",
      x:1700,
      y:960,
      n:1
    },{
      type:"bandit",
      x:300,
      y:960,
      n:1
    },{
      type:"bandit",
      x:2400,
      y:960,
      n:1
    },{
      type:"lookout",
      x:1330,
      y:300,
      n:1
    },{
      type:"hen",
      x:800,
      y:1300,
      n:1
    },{
      type:"hen",
      x:1900,
      y:1300,
      n:1
    },{
      type:"chicken",
      x:1350,
      y:1350,
      n:4
    },{
      type:"armored",
      x:400,
      y:1300,
      n:1
    },{
      type:"armored",
      x:2300,
      y:1300,
      n:1
    }],
    reinforce:[{
      x:120,
      y:900
    },{
      x:2580,
      y:900
    },{
      x:1350,
      y:120
    },{
      x:600,
      y:1720
    },{
      x:2100,
      y:1720
    }],
    zones:[{
      name:"西翼机库",
      x:0,
      y:0,
      w:900,
      h:700
    },{
      name:"塔台",
      x:900,
      y:0,
      w:900,
      h:700
    },{
      name:"东翼机库",
      x:1800,
      y:0,
      w:900,
      h:700
    },{
      name:"中央跑道",
      x:0,
      y:700,
      w:2700,
      h:400
    },{
      name:"熔岩焦土",
      x:0,
      y:1100,
      w:1350,
      h:700
    },{
      name:"冰霜雪原",
      x:1350,
      y:1100,
      w:1350,
      h:700
    }]
  },"airbase")
}
function Z1(){
  const r=Zc(20251118),
  a=(q,M)=>q+r()*(M-q),
  l=[];
  let s=0;
  const i=(q,M,R,L,O,oe,re=0)=>{
    const F={
      id:s++,
      t:0,
      x:q,
      y:M,
      w:R,
      h:L,
      r:0,
      f:O,
      kind:oe,
      v:re,
      stamp:0,
      dead:!1,
      hp:0
    };
    return l.push(F),
    F
  },
  c=(q,M,R,L,O,oe=0,re=0)=>{
    const F={
      id:s++,
      t:1,
      x:q,
      y:M,
      w:0,
      h:0,
      r:R,
      f:L,
      kind:O,
      v:re,
      stamp:0,
      dead:!1,
      hp:oe
    };
    return l.push(F),
    F
  },
  f=bt|pa|Xt,
  d=bt|pa,
  m=[],
  b=[],
  p=(q,M,R,L)=>{
    const O=L.map(([re,F])=>[q+(M-q)*re-F/2,q+(M-q)*re+F/2]).sort((re,F)=>re[0]-F[0]);
    let oe=q;
    for(const[re,F]of O)re-oe>2&&i(oe,R,re-oe,ft,f,"wall"),
    oe=F;
    M-oe>2&&i(oe,R,M-oe,ft,f,"wall")
  },
  y=(q,M,R,L)=>{
    const O=L.map(([re,F])=>[q+(M-q)*re-F/2,q+(M-q)*re+F/2]).sort((re,F)=>re[0]-F[0]);
    let oe=q;
    for(const[re,F]of O)re-oe>2&&i(R,oe,ft,re-oe,f,"wall"),
    oe=F;
    M-oe>2&&i(R,oe,ft,M-oe,f,"wall")
  };
  for(const q of iy){
    const{
      x:M,
      y:R,
      w:L,
      h:O
    }
    =q;
    m.push({
      x:M,
      y:R,
      w:L,
      h:O,
      type:q.floor,
      name:q.name
    });
    const oe=re=>q.doors.filter(F=>F[0]===re).map(F=>[F[1],F[2]]);
    p(M,M+L,R,oe("n")),
    p(M,M+L,R+O-ft,oe("s")),
    y(R+ft,R+O-ft,M,oe("w")),
    y(R+ft,R+O-ft,M+L-ft,oe("e"));
    for(const[re,F,be,xe]of q.parts||[])re==="v"?y(R+ft,R+O-ft,M+L*F-ft/2,[[be,xe]]):p(M+ft,M+L-ft,R+O*F-ft/2,[[be,xe]]);
    for(const re of q.racks||[])i(re[0],re[1],re[2],re[3],f,"rack",Math.floor(r()*3));
    for(const[re,F,be]of q.cont||[]){
      const xe=Aa[re],
      $e=xe.w/2,
      gt=xe.h/2,
      It=M+ft+6+$e+F*(L-2*ft-12-2*$e),
      Il=R+ft+6+gt+be*(O-2*ft-12-2*gt);
      b.push({
        type:re,
        x:It,
        y:Il
      })
    }
    for(const[re,F,be]of q.abs||[])b.push({
      type:re,
      x:F,
      y:be
    })
  }
  for(const[q,M,R]of oy)b.push({
    type:q,
    x:M,
    y:R
  });
  for(const[q,M]of[[160,880],[200,960],[990,150],[1040,90],[3060,780],[3060,880],[1560,2260],[1700,2260]])b.push({
    type:"starter",
    x:q,
    y:M
  });
  b.push({
    type:"vending",
    x:2690,
    y:340
  });
  for(const q of b){
    const M=Aa[q.type];
    i(q.x-M.w/2,q.y-M.h/2,M.w,M.h,bt,"container")
  }
  const g=1240,
  v=860,
  S=2060,
  T=1620,
  H=8,
  B=110,
  Q=(q,M,R,L)=>i(q,M,R,L,bt,"fence");
  Q(g,v,1650-B/2-g,H),
  Q(1650+B/2,v,S-1650-B/2,H),
  Q(g,T-H,1650-B/2-g,H),
  Q(1650+B/2,T-H,S-1650-B/2,H),
  Q(g,v+H,H,1240-B/2-v-H),
  Q(g,1240+B/2,H,T-H-1240-B/2),
  Q(S-H,v+H,H,1240-B/2-v-H),
  Q(S-H,1240+B/2,H,T-H-1240-B/2);
  for(const q of[[1330,960,80,22],[1900,960,22,80],[1330,1480,22,80],[1880,1500,80,22],[1560,1420,110,22],[1350,1200,22,90],[1930,1250,22,90],[2900,2120,80,22],[260,2120,22,70]])i(q[0],q[1],q[2],q[3],d,"sandbag");
  i(2780,960,170,64,f,"cargo",0),
  i(2870,1080,64,170,f,"cargo",1),
  i(2350,1300,64,170,f,"cargo",2),
  i(1960,1880,150,60,f,"cargo",1),
  i(1e3,1780,64,150,f,"cargo",0);
  for(const q of[[700,2040,280,50],[1060,2040,280,50],[1900,2120,300,50],[2280,2040,260,50]])i(q[0],q[1],q[2],q[3],f,"train",Math.floor(r()*3));
  for(const q of[[1300,560,24],[1420,660,22],[1880,590,24],[1720,690,22]])c(q[0],q[1],q[2],d,"hay");
  for(const q of[[2470,618],[2800,640],[2640,470],[1460,960],[1960,1540],[2760,1272],[2470,1262],[1180,1960],[830,1330],[1990,470]])c(q[0],q[1],14,d,"barrel",20);
  const se=[{
    x:540,
    y:400,
    r:150
  },{
    x:680,
    y:430,
    r:120
  },{
    x:450,
    y:480,
    r:105
  },{
    x:610,
    y:300,
    r:95
  }];
  for(const q of se)c(q.x,q.y,q.r-6,bt,"water");
  i(-200,-200,Ma+400,200,f,"bound"),
  i(-200,Ta,Ma+400,200,f,"bound"),
  i(-200,0,200,Ta,f,"bound"),
  i(Ma,0,200,Ta,f,"bound");
  const ie=[[-50,830,600,842,1150,830,2170,830,2700,820,3250,832],[-50,1720,1150,1720,2170,1720,3250,1714],[1150,-50,1150,830,1150,1720,1150,1990],[2170,-50,2170,830,2170,1720,2170,1990],[1150,1240,1250,1240],[2050,1240,2170,1240],[1650,830,1650,870],[1650,1610,1650,1720],[1610,1720,1610,1830],[2170,600,2420,610],[400,842,380,990],[300,1720,290,1530]],
  ce=[{
    type:"base",
    x:1248,
    y:868,
    w:804,
    h:744
  },{
    type:"canopy",
    x:2380,
    y:490,
    w:380,
    h:110
  },{
    type:"parking",
    x:2290,
    y:630,
    w:200,
    h:100
  },{
    type:"field",
    x:1262,
    y:492,
    w:680,
    h:222
  },{
    type:"platform",
    x:2860,
    y:2150,
    w:260,
    h:120
  },{
    type:"helipad",
    x:2915,
    y:115,
    w:150,
    h:150
  },{
    type:"dock",
    x:150,
    y:260,
    w:180,
    h:34
  }],
  fe=[{
    id:"A",
    name:"湖畔码头",
    x:190,
    y:200,
    r:85,
    scene:"dock"
  },{
    id:"B",
    name:"直升机坪",
    x:2990,
    y:190,
    r:85,
    scene:"helipad"
  },{
    id:"C",
    name:"下水道井口",
    x:200,
    y:2215,
    r:85,
    scene:"sewer"
  },{
    id:"D",
    name:"火车站台",
    x:2990,
    y:2210,
    r:85,
    scene:"rail"
  }],
  J=[{
    x:80,
    y:900,
    chick:[470,930]
  },{
    x:1110,
    y:105,
    chick:[1030,420]
  },{
    x:3120,
    y:830,
    chick:[3060,1180]
  },{
    x:1620,
    y:2290,
    chick:[1300,2230]
  }],
  te=[{
    type:"bandit",
    x:480,
    y:1262,
    n:1
  },{
    type:"bandit",
    x:330,
    y:1255,
    n:1
  },{
    type:"bandit",
    x:700,
    y:1460,
    n:1
  },{
    type:"bandit",
    x:930,
    y:420,
    n:1
  },{
    type:"bandit",
    x:300,
    y:560,
    n:1
  },{
    type:"chicken",
    x:1500,
    y:610,
    n:5
  },{
    type:"lookout",
    x:1440,
    y:300,
    n:1
  },{
    type:"bandit",
    x:1840,
    y:470,
    n:1
  },{
    type:"bandit",
    x:2610,
    y:470,
    n:1
  },{
    type:"bandit",
    x:2650,
    y:330,
    n:1
  },{
    type:"elite",
    x:2900,
    y:380,
    n:1
  },{
    type:"goose",
    x:1660,
    y:1360,
    n:1
  },{
    type:"armored",
    x:1420,
    y:1300,
    n:1
  },{
    type:"elite",
    x:1890,
    y:1150,
    n:1
  },{
    type:"bandit",
    x:1650,
    y:960,
    n:1
  },{
    type:"shield",
    x:2350,
    y:860,
    n:1
  },{
    type:"shield",
    x:900,
    y:1720,
    n:1
  },{
    type:"hen",
    x:2050,
    y:1600,
    n:1
  },{
    type:"hen",
    x:600,
    y:2050,
    n:1
  },{
    type:"bandit",
    x:2480,
    y:1071,
    n:1
  },{
    type:"bandit",
    x:2830,
    y:1500,
    n:1
  },{
    type:"elite",
    x:2810,
    y:1290,
    n:1
  },{
    type:"bandit",
    x:1200,
    y:1950,
    n:1
  },{
    type:"lookout",
    x:2050,
    y:2010,
    n:1
  },{
    type:"chicken",
    x:620,
    y:2250,
    n:4
  },{
    type:"bandit",
    x:1600,
    y:1910,
    n:1
  },{
    type:"chicken",
    x:2600,
    y:1850,
    n:4
  }],
  j=[{
    x:60,
    y:420
  },{
    x:60,
    y:1500
  },{
    x:60,
    y:1950
  },{
    x:760,
    y:60
  },{
    x:2e3,
    y:60
  },{
    x:2620,
    y:60
  },{
    x:3140,
    y:560
  },{
    x:3140,
    y:1500
  },{
    x:3140,
    y:1900
  },{
    x:2450,
    y:2350
  },{
    x:860,
    y:2350
  },{
    x:1700,
    y:1770
  }],
  ee=[{
    name:"湖畔",
    x:0,
    y:0,
    w:1100,
    h:860
  },{
    name:"农场",
    x:1100,
    y:0,
    w:1100,
    h:860
  },{
    name:"加油站",
    x:2200,
    y:0,
    w:1e3,
    h:860
  },{
    name:"村庄",
    x:0,
    y:860,
    w:1150,
    h:940
  },{
    name:"军事基地",
    x:1150,
    y:860,
    w:1020,
    h:940
  },{
    name:"仓库区",
    x:2170,
    y:860,
    w:1030,
    h:940
  },{
    name:"铁路货场",
    x:0,
    y:1800,
    w:3200,
    h:600
  }],
  le=(q,M,R,L,O,oe)=>{
    const re=O-R,
    F=oe-L,
    be=re*re+F*F||1;
    let xe=((q-R)*re+(M-L)*F)/be;
    return xe=Math.max(0,Math.min(1,xe)),
    Math.hypot(q-(R+re*xe),M-(L+F*xe))
  },
  Z=(q,M,R)=>{
    for(const L of ie)for(let O=0;O+3<L.length;O+=2)if(le(q,M,L[O],L[O+1],L[O+2],L[O+3])<34+R)return!0;
    return!1
  },
  X=(q,M,R,L=R)=>{
    if(q<30||M<30||q>Ma-30||M>Ta-30)return!1;
    for(const O of m)if(q>O.x-R&&q<O.x+O.w+R&&M>O.y-R&&M<O.y+O.h+R)return!1;
    for(const O of ce)if(O.type!=="field"&&q>O.x-R&&q<O.x+O.w+R&&M>O.y-R&&M<O.y+O.h+R)return!1;
    for(const O of l)if(O.kind!=="bound"){
      if(O.t===0){
        if(q>O.x-R&&q<O.x+O.w+R&&M>O.y-R&&M<O.y+O.h+R)return!1
      }else if(Math.hypot(q-O.x,M-O.y)<O.r+R+(O.kind==="water"?24:0))return!1
    }
    for(const O of fe)if(Math.hypot(q-O.x,M-O.y)<O.r+R+10)return!1;
    for(const O of J)if(Math.hypot(q-O.x,M-O.y)<70+R)return!1;
    for(const O of j)if(Math.hypot(q-O.x,M-O.y)<50+R)return!1;
    for(const O of b)if(Math.hypot(q-O.x,M-O.y)<40+R)return!1;
    for(const O of te)if(Math.hypot(q-O.x,M-O.y)<30+R)return!1;
    return!Z(q,M,L)
  },
  C=[];
  let P=0;
  for(;C.length<125&&P<6e3;){
    P++;
    const q=a(40,Ma-40),
    M=a(40,Ta-40);
    if(q>1262&&q<1942&&M>492&&M<714||!X(q,M,30))continue;
    let R=!0;
    for(const O of C)if(Math.hypot(O.x-q,O.y-M)<70){
      R=!1;
      break
    }
    if(!R)continue;
    const L=a(32,46);
    C.push({
      x:q,
      y:M,
      r:L,
      v:Math.floor(r()*3),
      solid:!0
    }),
    c(q,M,13,d,"tree")
  }
  P=0;
  let A=0;
  for(;A<26&&P<3e3;){
    P++;
    const q=a(40,Ma-40),
    M=a(40,Ta-40);
    if(!X(q,M,26))continue;
    let R=!0;
    for(const L of C)if(Math.hypot(L.x-q,L.y-M)<60){
      R=!1;
      break
    }
    R&&(c(q,M,a(13,21),d,"rock",0,Math.floor(r()*3)),A++)
  }
  for(let q=-30;q<Ma+60;q+=a(55,80))C.push({
    x:q,
    y:a(-40,-10),
    r:a(38,52),
    v:Math.floor(r()*3),
    solid:!1
  }),
  C.push({
    x:q,
    y:Ta+a(10,40),
    r:a(38,52),
    v:Math.floor(r()*3),
    solid:!1
  });
  for(let q=20;q<Ta;q+=a(55,80))C.push({
    x:a(-40,-10),
    y:q,
    r:a(38,52),
    v:Math.floor(r()*3),
    solid:!1
  }),
  C.push({
    x:Ma+a(10,40),
    y:q,
    r:a(38,52),
    v:Math.floor(r()*3),
    solid:!1
  });
  const V=[],
  Y=(q,M,R,L,O)=>{
    let oe=0,
    re=0;
    for(;oe<q&&re<q*8;){
      re++;
      const F=a(20,Ma-20),
      be=a(20,Ta-20);
      X(F,be,R,-18)&&(V.push({
        x:F,
        y:be,
        t:M,
        s:a(L,O),
        c:Math.floor(r()*4),
        rot:a(0,Math.PI*2)
      }),oe++)
    }
  };
  Y(70,3,18,14,24),
  Y(1100,0,-4,3,7),
  Y(260,1,-4,2,3.5),
  Y(170,2,-2,2,5);
  for(let q=510;q<705;q+=26)for(let M=1280;M<1930;M+=19){
    let R=!0;
    for(const L of l)L.t===1&&L.kind==="hay"&&Math.hypot(M-L.x,q-L.y)<L.r+14&&(R=!1);
    R&&V.push({
      x:M+a(-2,2),
      y:q+a(-2,2),
      t:4,
      s:a(5,7.5),
      c:Math.floor(r()*3),
      rot:a(0,6.28)
    })
  }
  const ue=[{
    kind:"delivery_truck",
    x:2390,
    y:678,
    rot:Math.PI/2,
    scale:1.05
  },{
    kind:"pickup_truck",
    x:2960,
    y:600,
    rot:0,
    scale:1.05
  },{
    kind:"barrels",
    x:2560,
    y:542,
    scale:1,
    rot:0
  },{
    kind:"barrels",
    x:2700,
    y:542,
    scale:1,
    rot:0
  },{
    kind:"flatbed",
    x:500,
    y:1392,
    rot:Math.PI/2,
    scale:1
  },{
    kind:"rowboat",
    x:540,
    y:400,
    rot:0,
    scale:.9
  },{
    kind:"fountain",
    x:1080,
    y:1150,
    rot:0,
    scale:.9
  },{
    kind:"billboard",
    x:2240,
    y:965,
    rot:0,
    scale:.85
  },{
    kind:"vending_machine",
    x:2690,
    y:340,
    rot:0,
    scale:.8
  },{
    kind:"bedside_cabinet",
    x:900,
    y:300,
    rot:0,
    scale:.7
  },{
    kind:"table_map_cup",
    x:1830,
    y:260,
    rot:0,
    scale:.85
  },{
    kind:"wood_chair",
    x:1880,
    y:262,
    rot:0,
    scale:.75
  },{
    kind:"potted_flower",
    x:1070,
    y:280,
    rot:0,
    scale:.75
  },{
    kind:"wood_table",
    x:1930,
    y:460,
    rot:0,
    scale:.92
  },{
    kind:"wood_bench",
    x:1782,
    y:546,
    rot:0,
    scale:.86
  },{
    kind:"berry_bush",
    x:1650,
    y:500,
    rot:0,
    scale:.95
  },{
    kind:"hay_bale",
    x:2050,
    y:480,
    rot:Math.PI/2,
    scale:.9
  },{
    kind:"crate_stack",
    x:1210,
    y:640,
    rot:0,
    scale:.95
  },{
    kind:"nest_cluster",
    x:1096,
    y:738,
    rot:0,
    scale:.9
  },{
    kind:"bus_stop",
    x:770,
    y:885,
    rot:0,
    scale:1
  },{
    kind:"well",
    x:452,
    y:1214,
    rot:0,
    scale:1
  },{
    kind:"water_bucket",
    x:546,
    y:1260,
    rot:0,
    scale:1
  },{
    kind:"mailbox",
    x:440,
    y:965,
    rot:0,
    scale:1
  },{
    kind:"laundry_line",
    x:330,
    y:1570,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:1120,
    y:880,
    rot:0,
    scale:1
  },{
    kind:"street_lamp",
    x:2200,
    y:880,
    rot:0,
    scale:1
  },{
    kind:"trash_bin",
    x:2577,
    y:473,
    rot:0,
    scale:1
  },{
    kind:"bench_park",
    x:1080,
    y:1240,
    rot:0,
    scale:1
  },{
    kind:"radar_station",
    x:1398,
    y:1530,
    rot:0,
    scale:1
  },{
    kind:"missile_rack",
    x:1960,
    y:1420,
    rot:0,
    scale:1
  },{
    kind:"sandbag_wall",
    x:1650,
    y:1520,
    rot:0,
    scale:1
  },{
    kind:"antenna_mast",
    x:1961,
    y:1011,
    rot:0,
    scale:1
  }];
  return{
    w:Ma,
    h:Ta,
    solids:l,
    floors:m,
    decor:V,
    trees:C,
    water:se,
    roads:ie,
    pads:ce,
    containers:b,
    extractions:fe,
    spawns:J,
    enemySpots:te,
    reinforce:j,
    zones:ee,
    tracks:[2060,2140],
    props:ue
  }
}
const Gs=-256,
Us=-256,
Pl={
  t:0,
  nx:0,
  ny:0
};
function by(r,a,l,s,i){
  let c=0,
  f=1,
  d=0,
  m=0;
  if(Math.abs(l)<1e-9){
    if(r<i.x||r>i.x+i.w)return!1
  }else{
    const b=1/l;
    let p=(i.x-r)*b,
    y=(i.x+i.w-r)*b,
    g=-1;
    if(p>y){
      const v=p;
      p=y,
      y=v,
      g=1
    }
    if(p>c&&(c=p,d=g,m=0),y<f&&(f=y),c>f)return!1
  }
  if(Math.abs(s)<1e-9){
    if(a<i.y||a>i.y+i.h)return!1
  }else{
    const b=1/s;
    let p=(i.y-a)*b,
    y=(i.y+i.h-a)*b,
    g=-1;
    if(p>y){
      const v=p;
      p=y,
      y=v,
      g=1
    }
    if(p>c&&(c=p,d=0,m=g),y<f&&(f=y),c>f)return!1
  }
  return d===0&&m===0&&(Math.abs(l)>Math.abs(s)?d=l>0?-1:1:m=s>0?-1:1),
  Pl.t=c,
  Pl.nx=d,
  Pl.ny=m,
  !0
}
function Lo(r,a,l,s,i,c,f){
  const d=r-i,
  m=a-c,
  b=l*l+s*s;
  if(b<1e-9)return-1;
  const p=d*d+m*m-f*f;
  if(p<0)return 0;
  const y=2*(d*l+m*s),
  g=y*y-4*b*p;
  if(g<0)return-1;
  const v=(-y-Math.sqrt(g))/(2*b);
  return v>=0&&v<=1?v:-1
}
class h1{
  cs=64;
  cols;
  rows;
  cells;
  stamp=1;
  tmp=[];
  constructor(a,l,s){
    this.cols=Math.ceil((a-Gs*2)/this.cs),
    this.rows=Math.ceil((l-Us*2)/this.cs),
    this.cells=[];
    for(let i=0;i<this.cols*this.rows;i++)this.cells.push([]);
    for(const i of s){
      const c=i.t===0?i.x:i.x-i.r,
      f=i.t===0?i.y:i.y-i.r,
      d=i.t===0?i.x+i.w:i.x+i.r,
      m=i.t===0?i.y+i.h:i.y+i.r,
      b=this.cx(c),
      p=this.cx(d),
      y=this.cy(f),
      g=this.cy(m);
      for(let v=y;v<=g;v++)for(let S=b;S<=p;S++)this.cells[v*this.cols+S].push(i)
    }
  }
  cx(a){
    return Math.max(0,Math.min(this.cols-1,Math.floor((a-Gs)/this.cs)))
  }
  cy(a){
    return Math.max(0,Math.min(this.rows-1,Math.floor((a-Us)/this.cs)))
  }
  query(a,l,s,i,c,f){
    const d=++this.stamp;
    let m=0;
    const b=this.cx(a),
    p=this.cx(s),
    y=this.cy(l),
    g=this.cy(i);
    for(let v=y;v<=g;v++)for(let S=b;S<=p;S++){
      const T=this.cells[v*this.cols+S];
      for(let H=0;H<T.length;H++){
        const B=T[H];
        B.stamp===d||B.dead||(B.f&c)===0||(B.stamp=d,f[m++]=B)
      }
    }
    return m
  }
  raycast(a,l,s,i,c,f){
    const d=s-a,
    m=i-l,
    b=++this.stamp,
    p=this.cs;
    let y=2,
    g=null,
    v=0,
    S=0,
    T=Math.floor((a-Gs)/p),
    H=Math.floor((l-Us)/p);
    const B=Math.floor((s-Gs)/p),
    Q=Math.floor((i-Us)/p),
    se=d>0?1:-1,
    ie=m>0?1:-1,
    ce=Math.abs(d),
    fe=Math.abs(m),
    J=ce>1e-9?p/ce:1/0,
    te=fe>1e-9?p/fe:1/0,
    j=a-Gs-T*p,
    ee=l-Us-H*p;
    let le=ce>1e-9?(d>0?p-j:j)/ce:1/0,
    Z=fe>1e-9?(m>0?p-ee:ee)/fe:1/0;
    for(let X=0;X<600;X++){
      if(T>=0&&H>=0&&T<this.cols&&H<this.rows){
        const C=this.cells[H*this.cols+T];
        for(let P=0;P<C.length;P++){
          const A=C[P];
          if(!(A.stamp===b||A.dead||(A.f&c)===0))if(A.stamp=b,A.t===0)by(a,l,d,m,A)&&Pl.t<y&&(y=Pl.t,g=A,v=Pl.nx,S=Pl.ny);
          else{
            const V=Lo(a,l,d,m,A.x,A.y,A.r);
            if(V>=0&&V<y){
              y=V,
              g=A;
              const Y=a+d*V-A.x,
              ue=l+m*V-A.y,
              q=Math.hypot(Y,ue)||1;
              v=Y/q,
              S=ue/q
            }
          }
        }
      }
      if(y<=Math.min(le,Z)||T===B&&H===Q)break;
      le<Z?(le+=J,T+=se):(Z+=te,H+=ie)
    }
    return g&&y<=1?(f.t=y,f.s=g,f.nx=v,f.ny=S,!0):!1
  }
  add(i){
    const c=i.t===0?i.x:i.x-i.r,
    f=i.t===0?i.y:i.y-i.r,
    d=i.t===0?i.x+i.w:i.x+i.r,
    m=i.t===0?i.y+i.h:i.y+i.r;
    for(let v=this.cy(f);v<=this.cy(m);v++)for(let S=this.cx(c);S<=this.cx(d);S++)this.cells[v*this.cols+S].push(i)
  }
  losHit={
    t:0,
    s:null,
    nx:0,
    ny:0
  };
  los(a,l,s,i,c){
    return!this.raycast(a,l,s,i,c,this.losHit)
  }
  resolve(a,l,s){
    let i=!1;
    const c=this.tmp;
    for(let f=0;f<3;f++){
      const d=this.query(a.x-l,a.y-l,a.x+l,a.y+l,s,c);
      let m=!1;
      for(let b=0;b<d;b++){
        const p=c[b];
        if(p.t===0){
          const y=Math.max(p.x,Math.min(a.x,p.x+p.w)),
          g=Math.max(p.y,Math.min(a.y,p.y+p.h)),
          v=a.x-y,
          S=a.y-g,
          T=v*v+S*S;
          if(T<l*l){
            if(T>1e-8){
              const H=Math.sqrt(T),
              B=l-H;
              a.x+=v/H*B,
              a.y+=S/H*B
            }else{
              const H=a.x-p.x,
              B=p.x+p.w-a.x,
              Q=a.y-p.y,
              se=p.y+p.h-a.y,
              ie=Math.min(H,B,Q,se);
              ie===H?a.x=p.x-l:ie===B?a.x=p.x+p.w+l:ie===Q?a.y=p.y-l:a.y=p.y+p.h+l
            }
            m=!0
          }
        }else{
          const y=a.x-p.x,
          g=a.y-p.y,
          v=l+p.r,
          S=y*y+g*g;
          if(S<v*v){
            const T=Math.sqrt(S)||.001,
            H=v-T;
            a.x+=y/T*H,
            a.y+=g/T*H,
            m=!0
          }
        }
      }
      if(!m)break;
      i=!0
    }
    return i
  }
}
const Wl=[[1,0,10],[-1,0,10],[0,1,10],[0,-1,10],[1,1,14],[1,-1,14],[-1,1,14],[-1,-1,14]];
class m1{
  cs=32;
  cols;
  rows;
  blocked;
  dist;
  hi;
  hv;
  hn=0;
  constructor(a,l,s){
    this.cols=Math.ceil(a/this.cs),
    this.rows=Math.ceil(l/this.cs);
    const i=this.cols*this.rows;
    this.blocked=new Uint8Array(i),
    this.dist=new Float32Array(i).fill(1e9),
    this.hi=new Int32Array(i*8),
    this.hv=new Float32Array(i*8);
    const c=[],
    f=13;
    for(let d=0;d<this.rows;d++)for(let m=0;m<this.cols;m++){
      const b=(m+.5)*this.cs,
      p=(d+.5)*this.cs,
      y=s.query(b-f,p-f,b+f,p+f,bt,c);
      let g=0;
      for(let v=0;v<y&&!g;v++){
        const S=c[v];
        if(S.t===0){
          const T=Math.max(S.x,Math.min(b,S.x+S.w)),
          H=Math.max(S.y,Math.min(p,S.y+S.h));
          (b-T)**2+(p-H)**2<f*f&&(g=1)
        }else Math.hypot(b-S.x,p-S.y)<S.r+f&&(g=1)
      }
      this.blocked[d*this.cols+m]=g
    }
  }
  idx(a,l){
    const s=Math.max(0,Math.min(this.cols-1,Math.floor(a/this.cs)));
    return Math.max(0,Math.min(this.rows-1,Math.floor(l/this.cs)))*this.cols+s
  }
  isOpen(a,l){
    return a<20||l<20||a>this.cols*this.cs-20||l>this.rows*this.cs-20?!1:this.blocked[this.idx(a,l)]===0
  }
  nearestOpen(a,l){
    if(this.isOpen(a,l))return{
      x:a,
      y:l
    };
    for(let s=1;s<12;s++)for(let i=0;i<16;i++){
      const c=i/16*Math.PI*2,
      f=a+Math.cos(c)*s*this.cs,
      d=l+Math.sin(c)*s*this.cs;
      if(this.isOpen(f,d)){
        const m=this.idx(f,d);
        return{
          x:(m%this.cols+.5)*this.cs,
          y:(Math.floor(m/this.cols)+.5)*this.cs
        }
      }
    }
    return{
      x:a,
      y:l
    }
  }
  push(a,l){
    let s=this.hn++;
    const i=this.hi,
    c=this.hv;
    for(;s>0;){
      const f=s-1>>1;
      if(c[f]<=l)break;
      i[s]=i[f],
      c[s]=c[f],
      s=f
    }
    i[s]=a,
    c[s]=l
  }
  pop(){
    const a=this.hi,
    l=this.hv,
    s=a[0],
    i=--this.hn;
    if(i>0){
      const c=a[i],
      f=l[i];
      let d=0;
      for(;;){
        let m=2*d+1;
        if(m>=i||(m+1<i&&l[m+1]<l[m]&&m++,l[m]>=f))break;
        a[d]=a[m],
        l[d]=l[m],
        d=m
      }
      a[d]=c,
      l[d]=f
    }
    return s
  }
  compute(a,l){
    const{
      cols:s,
      rows:i,
      blocked:c,
      dist:f
    }
    =this;
    f.fill(1e9);
    const d=this.nearestOpen(a,l),
    m=this.idx(d.x,d.y);
    f[m]=0,
    this.hn=0,
    this.push(m,0);
    const b=this.hi.length-8;
    for(;this.hn>0;){
      const p=this.hv[0],
      y=this.pop();
      if(p>f[y])continue;
      const g=y%s,
      v=y/s|0;
      for(let S=0;S<8;S++){
        const T=g+Wl[S][0],
        H=v+Wl[S][1];
        if(T<0||H<0||T>=s||H>=i)continue;
        const B=H*s+T;
        if(c[B]||S>=4&&(c[v*s+T]||c[H*s+g]))continue;
        const Q=p+Wl[S][2];
        Q<f[B]&&(f[B]=Q,this.hn<b&&this.push(B,Q))
      }
    }
  }
  dir(a,l,s){
    const{
      cols:i,
      rows:c,
      blocked:f,
      dist:d,
      cs:m
    }
    =this,
    b=Math.max(0,Math.min(i-1,Math.floor(a/m))),
    p=Math.max(0,Math.min(c-1,Math.floor(l/m))),
    y=p*i+b;
    let g=d[y],
    v=-1;
    for(let le=0;le<8;le++){
      const Z=b+Wl[le][0],
      X=p+Wl[le][1];
      if(Z<0||X<0||Z>=i||X>=c)continue;
      const C=X*i+Z;
      f[C]||le>=4&&(f[p*i+Z]||f[X*i+b])||d[C]<g&&(g=d[C],v=C)
    }
    if(v<0)return!1;
    let S=v;
    const T=v%i,
    H=v/i|0;
    let B=d[v];
    for(let le=0;le<8;le++){
      const Z=T+Wl[le][0],
      X=H+Wl[le][1];
      if(Z<0||X<0||Z>=i||X>=c)continue;
      const C=X*i+Z;
      f[C]||le>=4&&(f[H*i+Z]||f[X*i+T])||d[C]<B&&(B=d[C],S=C)
    }
    const Q=(S%i+.5)*m,
    se=((S/i|0)+.5)*m,
    ie=(a+Q)/2,
    ce=(l+se)/2;
    let fe=Q,
    J=se;
    f[this.idx(ie,ce)]&&(fe=(T+.5)*m,J=(H+.5)*m);
    const te=fe-a,
    j=J-l,
    ee=Math.hypot(te,j)||1;
    return s.x=te/ee,
    s.y=j/ee,
    !0
  }
  distAt(a,l){
    return this.dist[this.idx(a,l)]
  }
  mark(a,l,s,i){
    const c=this.cs,
    f=Math.floor((a-s)/c),
    d=Math.floor((a+s)/c),
    m=Math.floor((l-s)/c),
    b=Math.floor((l+s)/c);
    for(let p=Math.max(0,m);p<=Math.min(this.rows-1,b);p++)for(let y=Math.max(0,f);y<=Math.min(this.cols-1,d);y++){
      const g=p*this.cols+y;
      i?(this.blocked[g]===0&&(this.blocked[g]=2)):this.blocked[g]===2&&(this.blocked[g]=0)
    }
  }
}
const ya={
  bandages:5,
  medkits:3,
  perThrowable:4,
  totalThrowables:6
};
function Xc(){
  return{
    bandages:0,
    medkits:0,
    throwables:{
    }
  }
}
function P1(r,a,l,s,i){
  const c=r&&typeof r=="object"?r:{
  },
  f=(p,y)=>Number.isFinite(p)?Math.max(0,Math.min(y,Math.floor(p))):0,
  d=Xc();
  d.bandages=f(c.bandages,a),
  d.medkits=f(c.medkits,l);
  let m=i;
  const b=c.throwables&&typeof c.throwables=="object"?c.throwables:{
  };
  for(const p of St){
    const y=Math.min(m,f(b[p],s));
    y>0&&(d.throwables[p]=y,m-=y)
  }
  return d
}
function ba(r){
  return P1(r,ya.bandages,ya.medkits,ya.perThrowable,ya.totalThrowables)
}
function vl(r){
  return P1(r,9999,9999,9999,9999)
}
function _s(r,a){
  const l=Xc();
  l.bandages=Math.min(r.bandages,a.bandages),
  l.medkits=Math.min(r.medkits,a.medkits);
  let s=ya.totalThrowables;
  for(const i of St){
    const c=Math.min(r.throwables[i]??0,a.throwables[i]??0,ya.perThrowable,s);
    c>0&&(l.throwables[i]=c,s-=c)
  }
  return ba(l)
}
function X1(r){
  return r==="bandages"?Kl:r==="medkits"?Wo:ay.find(a=>a.throwable===r)??Kl
}
function Eo(r,a){
  return r?a==="bandages"?r.bandages:a==="medkits"?r.medkits:r.throwables[a]??0:0
}
function $s(r,a,l){
  const s=vl(r),
  i=Math.max(0,Eo(s,a)+l);
  return a==="bandages"?s.bandages=i:a==="medkits"?s.medkits=i:i>0?s.throwables[a]=i:delete s.throwables[a],
  s
}
function gc(r,a,l){
  let s=$s(r,"bandages",l*a.bandages);
  s=$s(s,"medkits",l*a.medkits);
  for(const i of St)s=$s(s,i,l*(a.throwables[i]??0));
  return s
}
function ei(r){
  return r?r.bandages+r.medkits+St.reduce((a,l)=>a+(r.throwables[l]??0),0):0
}
const ca="warehouse";
const PASSIVE_SNIPER=new Set(["sniper","awmlegend","barrett"]),
PASSIVE_MG=new Set(["lmg","minigun","ironbreaker"]);
function weaponPassive(id){
  const w=ht[id];
  if(!w||w.blast)return null;
  if(w.pellets>1)return "shotgun";
  if(PASSIVE_SNIPER.has(id))return "sniper";
  if(PASSIVE_MG.has(id))return "mg";
  return null
}
const COMBOS=[
  [["auto","drum"],{id:"barrage",name:"弹幕模式",desc:"弹丸 +2 · 散布 −15%"}],
  [["scope","rapid"],{id:"mark",name:"精准连射",desc:"射速额外 +10%"}],
  [["match","bolt"],{id:"hunt",name:"猎杀节奏",desc:"装填额外 −10%"}],
  [["blast","heavy"],{id:"focus",name:"聚能弹头",desc:"爆炸额外 +10%"}],
  [["belt","stable"],{id:"hold",name:"定点压制",desc:"压制时长 +0.4 秒"}]
];
function weaponCombo(mods){
  for(const row of COMBOS)if(row[0].every(m=>mods.includes(m)))return row[1]
}
const I1={
  damage:"高装药",
  mag:"扩容弹匣",
  quick:"快速弹夹",
  trigger:"轻量扳机",
  rapid:"轻量复进",
  stable:"稳定枪机",
  drum:"扩容弹鼓",
  pierce:"穿甲弹",
  overload:"过载枪机",
  choke:"收束器",
  auto:"自动化枪机",
  scope:"战术准镜",
  match:"竞赛枪管",
  bolt:"快拉枪机",
  belt:"弹链箱",
  blast:"高爆战斗部",
  heavy:"重型弹头",
  cluster:"集束弹头"
},
gy={
  damage:"伤害 +25% · 爆炸伤害 +25%",
  mag:"弹匣容量 +50%",
  quick:"装填时间 −40%",
  trigger:"射速 +30%（手枪专属）",
  rapid:"射速 +20%",
  stable:"后坐 −35% · 枪口上跳 −20%（不加散布）",
  drum:"弹匣容量 +100%（冲锋枪/霰弹/机枪专属）",
  pierce:"穿透 +2",
  overload:"射速 +40%，但每发有 8% 概率卡壳空放（高风险）",
  choke:"散布 −45%（霰弹枪专属）",
  auto:"射速 ×2.2 · 单发伤害 −25% · 散布 +15%（霰弹枪转全自动）",
  scope:"散布 −40% · 射程 +15%（突击/狙击专属）",
  match:"伤害 +18% · 射程 +8%（狙击/精确射手专属）",
  bolt:"射速 +35% · 装填 −20%（狙击枪专属）",
  belt:"弹匣容量 +75%（机枪专属）",
  blast:"爆炸伤害 +40% · 范围 +15%（火箭筒专属）",
  heavy:"直击伤害 +60% · 爆炸伤害 +15%（火箭筒专属）",
  cluster:"爆炸范围 +45% · 爆炸伤害 −15% · 直击 −15%（火箭筒清群弹头）"
},
xy={
  damage:"伤害+25%",
  mag:"弹匣+50%",
  quick:"装填−40%",
  trigger:"射速+30%",
  rapid:"射速+20%",
  stable:"后坐−35%",
  drum:"弹匣+100%",
  pierce:"穿透+2",
  overload:"射速+40%·会卡壳",
  choke:"散布−45%",
  auto:"全自动",
  scope:"准镜",
  match:"伤害+18%",
  bolt:"射速+35%",
  belt:"弹匣+75%",
  blast:"爆炸+40%",
  heavy:"直击+60%",
  cluster:"范围+45%"
},
Ic=["regen","cap","plate","aegis"],
J1={
  regen:"自修复涂层",
  cap:"强化框架",
  plate:"复合插板",
  aegis:"破甲应急"
},
vy={
  regen:"脱战 4 秒后每秒恢复 5 点护甲",
  cap:"护甲上限 +25%",
  plate:"护甲吸收比例 60% → 78%",
  aegis:"护甲打空时免疫伤害 1.2 秒（CD 10 秒）"
},
wy={
  regen:"自动回甲",
  cap:"上限+25%",
  plate:"吸收78%",
  aegis:"破甲无敌"
},
ri=r=>r.startsWith("w_")?r.slice(2):r;
const PISTOL_IDS=new Set(["pistol"]),SMG_IDS=new Set(["smg","mp9","frostmp9"]),SHOTGUN_IDS=new Set(["shotgun","aa12"]),SNIPER_IDS=new Set(["sniper","awmlegend","barrett","dmr"]),MG_IDS=new Set(["lmg","minigun","ironbreaker"]);
function Jc(r){
  const a=ht[ri(r)];
  if(!a)return[];
  const c=["damage","mag","quick"];
  if(a.blast)return [...c,"blast","heavy","cluster"];
  const w=ri(r);
  if(PISTOL_IDS.has(w))return [...c,"trigger"];
  if(SHOTGUN_IDS.has(w))return [...c,"choke","auto","drum"];
  if(SNIPER_IDS.has(w))return [...c,"scope","match","bolt","pierce"];
  if(MG_IDS.has(w))return [...c,"belt","stable","pierce","overload"];
  if(SMG_IDS.has(w))return [...c,"rapid","stable","drum","overload"];
  return [...c,"scope","rapid","pierce","overload"]
}
function Fc(r){
  const a=ht[ri(r)];
  return a&&a.rarity>=5?3:2
}
function _c(r){
  return/armor[56]$/.test(r)?3:2
}
function ga(r){
  if(!r)return[];
  if(!ht[ri(r.id)])return[];
  const l=r.mod,
  s=Jc(r.id),
  i=Array.isArray(r.mods)?r.mods:l?[l]:[];
  return i.filter((c,f)=>s.includes(c)&&i.indexOf(c)===f).slice(0,Fc(r.id))
}
function ua(r){
  if(!r||!Zl(r.id))return[];
  const a=Array.isArray(r.armorMods)?r.armorMods:[];
  return a.filter((l,s)=>Ic.includes(l)&&a.indexOf(l)===s).slice(0,_c(r.id))
}
function Xs(r){
  return[...r??[]].sort().join("+")
}
function ky(r){
  return Xs(r)
}
function Is(r){
  return r?[...ga(r).map(a=>I1[a]),...ua(r).map(a=>J1[a])].join(" · "):""
}
function F1(r,a){
  const l={
    ...r,
    blast:r.blast?{
      ...r.blast
    }
    :void 0
  };
  for(const s of a){
    if(s==="damage"){l.dmg*=1.25;l.blast&&(l.blast.dmg*=1.25)}
    else if(s==="mag")l.mag=Math.round(l.mag*1.5);
    else if(s==="quick")l.reload*=.6;
    else if(s==="trigger")l.rate*=1.3;
    else if(s==="rapid")l.rate*=1.2;
    else if(s==="stable"){l.kick*=.65;l.shake*=.8}
    else if(s==="drum")l.mag=Math.round(l.mag*2);
    else if(s==="pierce")l.pierce+=2;
    else if(s==="choke")l.spread*=.55;
    else if(s==="auto"){l.rate*=2.2;l.dmg*=.75;l.spread*=1.15}
    else if(s==="scope"){l.spread*=.6;l.range*=1.15}
    else if(s==="match"){l.dmg*=1.18;l.range*=1.08}
    else if(s==="bolt"){l.rate*=1.35;l.reload*=.8}
    else if(s==="belt")l.mag=Math.round(l.mag*1.75);
    else if(s==="overload"){l.rate*=1.4;l.jamChance=(l.jamChance||0)+.08}
    else if(s==="heavy"){l.dmg*=1.6;l.blast&&(l.blast.dmg*=1.15)}
    else if(s==="cluster"&&l.blast){l.blast.radius*=1.45;l.blast.dmg*=.85;l.dmg*=.85}
    else if(s==="blast"&&l.blast){l.blast.dmg*=1.4;l.blast.radius*=1.15}
  }
  const cb=weaponCombo(a);
  if(cb){
    l.combo=cb.id;
    if(cb.id==="barrage"){l.pellets+=2;l.spread*=.85}
    else if(cb.id==="mark")l.rate*=1.1;
    else if(cb.id==="hunt")l.reload*=.9;
    else if(cb.id==="focus"&&l.blast)l.blast.dmg*=1.1
  }
  return l
}
function My(r,a){
  const l=ht[ri(r)];
  return l?F1(l,a):void 0
}
function _1(r,a){
  return a.includes("cap")?Math.round(r*1.25):r
}
function y1(r){
  return{
    regen:r.includes("regen")?5:0,
    absorb:r.includes("plate")?.78:.6,
    aegis:r.includes("aegis")?1.2:0
  }
}
function pt(r){
  const a=ri(r);
  return r.startsWith("w_")&&ht[a]?ra(a):Zl(r)
}
function zt(r,a){
  return r?.id===a.id&&r.tuned===a.tuned&&Xs(ga(r))===Xs(ga(a))&&Xs(ua(r))===Xs(ua(a))
}
function qc(r){
  const{
    items:a,
    supplies:l,
    selected:s
  }
  =r,
  i=ci(s).every(f=>a.some(d=>zt(f,d))),
  c=_s(ba(s.consumables),vl(l));
  return i?{
    ...s,
    consumables:c
  }
  :ei(c)>0?{
    consumables:c
  }
  :{
  }
}
function ci(r){
  return[r.weapon,r.armor].filter(a=>!!a)
}
function Vc(r){
  const a=r.weapon?pt(r.weapon.id)?.weapon:void 0,
  l=ba(r.consumables),
  s=[];
  l.bandages&&s.push(`绷带×${l.bandages}`),
  l.medkits&&s.push(`急救针×${l.medkits}`);
  for(const f of St)l.throwables[f]&&s.push(`${qt[f].name}×${l.throwables[f]}`);
  const i=r.armor,
  c=i?pt(i.id)?.armor??0:0;
  return{
    ...fa[0],
    id:ca,
    name:"自定义配装",
    tag:"仓库",
    desc:s.length?s.join(" · "):"仅携带入库装备",
    cost:0,
    primary:a&&a!=="pistol"?a:null,
    armor:i?_1(c,ua(i)):0,
    bandages:l.bandages,
    medkits:l.medkits,
    throwables:l.throwables
  }
}
function xc(r){
  return ci(r).length>0||ei(r.consumables)>0
}
function Za(r,a,l){
  const s=r.find(m=>zt(a,m)),
  i=ga(a),
  c=ua(a),
  f={
    id:a.id,
    tuned:i.length>0||c.length>0,
    ...i.length?{
      mods:i
    }
    :{
    },
    ...c.length?{
      armorMods:c
    }
    :{
    }
  };
  if(!s)return l>0?[...r,{
    ...f,
    count:l
  }]:r;
  const d=s.count+l;
  return r.flatMap(m=>m!==s?[m]:d>0?[{
    ...m,
    count:d
  }]:[])
}
function Uo(r){
  return Math.max(2e3,Math.ceil(r.value*.3/100)*100)
}
function $1(r){
  const a=pt(r.id);
  if(!a)return 0;
  const l=ga(r).length+ua(r).length;
  return Math.round((a.value+l*Uo(a))*.5)
}
function e2(r){
  return Math.round(X1(r).value*.5)
}
function vc(r){
  if(!r||typeof r!="object")return;
  const a=r;
  if(typeof a.id!="string"||typeof a.tuned!="boolean"||!pt(a.id))return;
  const s=ga(a),
  i=ua(a);
  return{
    id:a.id,
    tuned:s.length>0||i.length>0,
    ...s.length?{
      mods:s
    }
    :{
    },
    ...i.length?{
      armorMods:i
    }
    :{
    }
  }
}
function Ty(r){
  const a=r&&typeof r=="object"?r:{
  };
  let l=[];
  for(const d of Array.isArray(a.items)?a.items:[]){
    const m=vc(d);
    m&&Number.isSafeInteger(d.count)&&d.count>0&&(l=Za(l,m,d.count))
  }
  const s=a.supplies===void 0?t2():vl(a.supplies),
  i=vc(a.selected?.weapon),
  c=vc(a.selected?.armor),
  f=_s(ba(a.selected?.consumables),s);
  return{
    items:l,
    supplies:s,
    selected:{
      weapon:i&&pt(i.id)?.kind==="weapon"?i:void 0,
      armor:c&&pt(c.id)?.kind==="armor"?c:void 0,
      consumables:f
    }
  }
}
function t2(){
  return{
    bandages:3,
    medkits:1,
    throwables:{
      grenade:2
    }
  }
}
const ne=Math.PI*2,
ti=0,
Bc=1,
xl=2,
Un=3,
Lc=4,
Ec=5,
Js=6,
a2=7,
Yl=8,
ai=9,
pe=(r,a)=>r+Math.random()*(a-r),
Sa=(r,a)=>Math.floor(r+Math.random()*(a-r+1)),
oa=(r,a,l)=>r<a?a:r>l?l:r,
Co=r=>({
  def:r,
  revealed:!0,
  taken:!0,
  at:0
}),
Wn=(r,a)=>{
  let l=(a-r)%ne;
  return l>Math.PI&&(l-=ne),
  l<-Math.PI&&(l+=ne),
  l
},
No=(r,a,l)=>{
  const s=Wn(r,a);
  return r+oa(s,-l,l)
},
Sy=()=>(Math.random()+Math.random()+Math.random()-1.5)*1.4;
function wc(r){
  let a=0;
  for(const s of r)a+=s;
  let l=Math.random()*a;
  for(let s=0;s<r.length;s++)if(l-=r[s],l<=0)return s;
  return r.length-1
}
function p1(r){
  for(let a=r.length-1;a>0;a--){
    const l=Math.floor(Math.random()*(a+1));
    [r[a],r[l]]=[r[l],r[a]]
  }
  return r
}
const b1={
  bandit:["#a3abb0","#2f7d4f","#ffffff","#8d969c"],
  elite:["#3a3f45","#23272b","#5a6068"],
  armored:["#827887","#b898a3","#534653"],
  lookout:["#d6b681","#a37249","#f5db9e"],
  shield:["#8a99a8","#5b7590","#a8c8e8"],
  hen:["#f4edda","#e8d5b0","#d94f3d"],
  chicken:["#ffffff","#f3ead8","#e23b3b"],
  goose:["#ffffff","#f0f0ea","#ff8a1e","#ffffff"],
  harborBoss:["#9ec9d4","#366575","#ffb563","#e2f3ee"],
  foundryBoss:["#cab0a3","#684836","#ff9b3d","#ed7149"],
  broodQueen:["#f5f3d8","#b7cf7e","#ffd86b","#8ba55a"],
  frostMarshal:["#d9f3ff","#7fb9d8","#e8fbff","#5b93b5"],
  ironGuard:["#1b1518","#4a1014","#0f0c0e","#b42024"],
  duckKing:["#ffe9a8","#d4a12e","#fff6d8","#b56cff"],
  flameAce:["#3a3a3c","#ff8a3c","#e8e2d4","#7a2a12"],
  radarWarden:["#e8f4f8","#9cc6d8","#4ad1ff","#2f5f78"]
};
const __LT={
  island:["bread_ration","duck_comic","rubber_duck","farm_deed"],
  harbor:["fish_bone","sea_glass","anchor_charm","ship_bell","pearl"],
  foundry:["rust_nut","copper_wire","slag_gem","gear_set","molten_core"],
  hatchery:["eggshell","nest_twig","golden_feather","duck_egg_rare","swamp_orchid"],
  outpost:["frozen_fish","thermos","ice_shard","radar_chip","snow_medal"],
  airbase:["rivet","pilot_badge","flight_log","jet_part","ace_helmet"],
  mausoleum:["incense","bronze_coin","jade_bead","jade_seal","royal_scepter"]
},
__LTA=new Set(Object.values(__LT).flat());
class Ay{
  map;
  grid;
  nav;
  sfx;
  input;
  mode="demo";
  t=0;
  realT=0;
  hitstop=0;
  slowT=0;
  slowScale=1;
  player;
  enemies=[];
  bullets=[];
  particles=[];
  texts=[];
  containers=[];
  grenades=[];
  smokes=[];
  fires=[];
  lights=[];
  decals=[];
  beams=[];
  msgs=[];
  banner=null;
  dmgInds=[];
  extracts=[];
  exZone=null;
  exProg=0;
  exWaves=new Set;
  cam={
    x:1600,
    y:1200,
    zoom:1,
    base:1,
    trauma:0,
    punch:0,
    kx:0,
    ky:0,
    sx:0,
    sy:0,
    endZoom:1
  };
  hitmark={
    t:0,
    kill:!1
  };
  search=null;
  nearC=null;
  stats={
    kills:0,
    killScore:0,
    killsBy:{
    },
    shots:0,
    hits:0
  };
  waveT=50;
  navT=0;
  nextId=1;
  kit=fa[0];
  warehouseGear;
  boss=null;
  bossSeen=!1;
  engagedBossIds=new Set;
  zoneName="";
  zoneT=0;
  tutorialT=0;
  tutorialStage=0;
  tutorialKills=0;
  tutorialWaveSpawned=!1;
  training=!1;
  bagOpen=!1;
  mapId="island";
  get timeLimit(){
    return this.training?150:Vo
  }
  booms=[];
  flash={
    t:0,
    color:"255,255,255"
  };
  ended=!1;
  endT=0;
  endSent=!1;
  outcome=null;
  warned60=!1;
  dodgeT=0;
  bufRoll=0;
  bufHeal=0;
  bufNade=0;
  streak=0;
  lastKillT=-10;
  aimDist=200;
  maxParticles=700;
  viewW=1280;
  viewH=720;
  barrels;
  onGameOver=()=>{
  };
  hit={
    t:0,
    s:null,
    nx:0,
    ny:0
  };
  mv={
    x:0,
    y:0
  };
  fd={
    x:0,
    y:0
  };
  dv={
    x:0,
    y:0
  };
  constructor(a,l){
    this.sfx=a,
    this.input=l,
    l.onBagDrop=s=>this.dropFromBag(s),
    l.onBagDropLowest=()=>this.dropLowestValue(),
    l.onBagClose=()=>{
      this.bagOpen=!1
    },
    this.map=Z1(),
    this.grid=new h1(this.map.w,this.map.h,this.map.solids),
    this.nav=new m1(this.map.w,this.map.h,this.grid),
    this.barrels=this.map.solids.filter(s=>s.kind==="barrel"),
    this.woodcrates=this.map.solids.filter(s=>s.kind==="woodcrate"),
    this.startDemo()
  }
  selectMap(a,l){
    a===this.training&&l===this.mapId||(this.training=a,this.mapId=l,this.map=a?ry():Xl(l).build(),this.grid=new h1(this.map.w,this.map.h,this.map.solids),this.nav=new m1(this.map.w,this.map.h,this.grid),this.barrels=this.map.solids.filter(s=>s.kind==="barrel"),this.woodcrates=this.map.solids.filter(s=>s.kind==="woodcrate"))
  }
  resetWorld(){
    this.warehouseGear=void 0,
    this.bagOpen=!1,
    this.input.bagOpen=!1,
    this.input.interactVisible=!1,
    this.dodgeT=0,
    this.bufRoll=0,
    this.bufHeal=0,
    this.bufNade=0,
    this.t=0,
    this.enemies=[],
    this.bullets=[],
    this.particles=[],
    this.texts=[],
    this.containers=[],
    this.grenades=[],
    this.smokes=[],
    this.fires=[],
    this.icewalls=[],
    this.mines=[],
    this.lights=[],
    this.decals=[],
    this.beams=[],
    this.msgs=[],
    this.dmgInds=[],
    this.booms=[],
    this.banner=null,
    this.exZone=null,
    this.exProg=0,
    this.exWaves.clear(),
    this.search=null,
    this.nearC=null,
    this.stats={
      kills:0,
      killScore:0,
      killsBy:{
      },
      shots:0,
      hits:0
    },
    this.tutorialStage=0,
    this.tutorialKills=0,
    this.tutorialWaveSpawned=!1,
    this.boss=null,
    this.bossSeen=!1,
    this.engagedBossIds.clear(),
    this.ended=!1,
    this.streak=0,
    this.lastKillT=-10,
    this.endT=0,
    this.endSent=!1,
    this.outcome=null,
    this.warned60=!1,
    this.hitstop=0,
    this.slowT=0,
    this.zoneName="",
    this.zoneT=0,
    this.cam.trauma=0,
    this.cam.punch=0,
    this.cam.kx=0,
    this.cam.ky=0,
    this.cam.endZoom=1;
    for(const l of this.barrels)l.dead=!1,
    l.hp=20;
    for(const l of this.woodcrates||[])l.dead=!1,
    l.hp=l.maxHp;
    let a=0;
    for(const l of this.map.containers){
      const s=Aa[l.type];
      let i;
      if(this.training)i=a++===0?[{
        def:ra("smg"),
        revealed:!1,
        taken:!1,
        at:0
      }]:[{
        def:Bo.find(c=>c.id==="battery"),
        revealed:!1,
        taken:!1,
        at:0
      }];
      else if(l.fixedItem){
        const c=ht[l.fixedItem]?ra(l.fixedItem):Bo.find(f=>f.id===l.fixedItem);
        i=c?[{
          def:c,
          revealed:!1,
          taken:!1,
          at:0
        },...this.rollItems(l.type)]:this.rollItems(l.type)
      }else i=this.rollItems(l.type);
      this.containers.push({
        id:this.nextId++,
        type:l.type,
        name:s.name,
        x:l.x,
        y:l.y,
        w:s.w,
        h:s.h,
        items:i,
        revealed:0,
        body:!1,
        angle:0,
        open:0,
        shake:0
      })
    }
  }
  makeWeapon(a){
    const l=ht[a];
    return{
      def:l,
      ammo:l.mag,
      reloadT:0,
      cd:0
    }
  }
  upgrades={
    capacity:0,
    rollCd:0,
    speed:0
  };
  makePlayer(a,l,s,i=Kn(),c=y1([])){
    const f=Ul(i,s.armor),
    d=this.upgrades;
    return{
      character:i,
      x:a,
      y:l,
      vx:0,
      vy:0,
      kvx:0,
      kvy:0,
      r:15,
      aim:0,
      hp:120,
      maxHp:120,
      armor:f,
      armorMax:f,
      armorRegen:c.regen,
      armorAbsorb:c.absorb,
      armorAegis:c.aegis,
      armorInvuln:0,
      armorAegisCd:0,
      noHitT:0,
      weapons:[s.primary?this.makeWeapon(s.primary):null,this.makeWeapon("pistol")],
      cur:s.primary?0:1,
      rollT:0,
      rollCd:0,
      rollDx:0,
      rollDy:0,
      rollCdMax:Math.max(.37,.72-d.rollCd*.07),
      speedMul:1+d.speed*.06,
      healT:0,
      healDur:0,
      healType:null,
      bandages:s.bandages,
      medkits:s.medkits,
      throwables:{
        grenade:s.throwables.grenade??0,
        smoke:s.throwables.smoke??0,
        flash:s.throwables.flash??0,
        fire:s.throwables.fire??0
      },
      selectedThrowable:St.find(m=>(s.throwables[m]??0)>0)??"grenade",
      backpack:[],
      capacity:20+d.capacity*4,
      walk:0,
      hurtT:0,
      dead:!1,
      bloom:0,
      stepAcc:0,
      kick:0,
      flash:0,
      chillT:0
    }
  }
  startDemo(){
    this.selectMap(!1,"island"),
    this.mode="demo",
    this.resetWorld(),
    this.player=this.makePlayer(-500,-500,fa[0]),
    this.player.dead=!0;
    for(const a of this.map.enemySpots)a.type==="chicken"?this.spawnPack(a.x,a.y,a.n):this.spawnEnemy(a.type,a.x,a.y,"idle");
    this.extracts=this.map.extractions.map(a=>({
      ...a
    }))
  }
  startRaid(a,l=!1,s="island",i,c,f){
    this.upgrades=f??{
      capacity:0,
      rollCd:0,
      speed:0
    },
    this.selectMap(l,l?"island":s),
    this.mode="raid",
    this.resetWorld();
    const d=!l&&a===ca?c:void 0;
    this.warehouseGear=!l&&c?d??{
    }
    :void 0;
    const m=d?Vc(d):fa.find(Q=>Q.id===(l?fa[0].id:a))??fa[0];
    this.kit=m;
    const b=this.map.spawns[Math.floor(Math.random()*this.map.spawns.length)],
    p=this.warehouseGear?.armor,
    y=y1(p?ua(p):[]),
    g=this.makePlayer(b.x,b.y,m,Kn(i),y),
    v=g.weapons[g.cur],
    S=this.warehouseGear?.weapon,
    T=S?ga(S):[];
    if(v&&T.length){
      const Q=ht[v.def.id]??v.def;
      v.def=F1(Q,T)
    }
    if(this.player=g,g.aim=Math.atan2(this.map.h/2-b.y,this.map.w/2-b.x),l){
      this.extracts=this.map.extractions.map(Q=>({
        ...Q
      }));
      for(const Q of this.map.enemySpots)for(let se=0;se<Q.n;se++){
        const ie=this.spawnEnemy("chicken",Q.x+(se-(Q.n-1)/2)*55,Q.y);
        ie.huntT=30,
        ie.state="hunt",
        ie.alertT=1
      }
      this.nav.compute(g.x,g.y),
      this.navT=.3,
      this.cam.x=g.x,
      this.cam.y=g.y,
      this.tutorialT=0,
      this.sfx.play("deploy");
      return
    }
    const H=this.map.extractions.map(Q=>({
      e:Q,
      d:Math.hypot(Q.x-b.x,Q.y-b.y)
    }));
    let B=p1(H.filter(Q=>Q.d>1300));
    B.length<2&&(B=H.sort((Q,se)=>se.d-Q.d)),
    this.extracts=B.slice(0,2).map(Q=>({
      ...Q.e
    }));
    for(const Q of this.map.enemySpots){
      const se=Math.hypot(Q.x-b.x,Q.y-b.y);
      s==="island"&&!Yn[Q.type].boss&&(se<720||Math.random()<.15)||(Q.type==="chicken"?this.spawnPack(Q.x,Q.y,Q.n):this.spawnEnemy(Q.type,Q.x,Q.y,"idle"))
    }
    this.spawnPack(b.chick[0],b.chick[1],s==="island"?3:2),
    this.waveT=50,
    this.nav.compute(g.x,g.y),
    this.navT=.3,
    this.cam.x=g.x,
    this.cam.y=g.y,
    this.banner={
      text:Xl(s).name,
      sub:"行动开始 · 搜刮物资，活着撤离",
      color:"#ffd23f",
      t:0,
      dur:2.6
    },
    this.tutorialT=10,
    this.msg(`撤离点：${this.extracts.map(Q=>Q.name).join(" / ")}`,"#6dff9e"),
    this.sfx.play("deploy")
  }
  revive(a=.6,l=.3){
    if(this.mode!=="raid"||!this.player||this.outcome!=="dead")return!1;
    const s=this.player;
    s.dead=!1,
    s.hp=Math.max(1,Math.round(s.maxHp*a)),
    s.armor=Math.round(s.armorMax*l),
    s.hurtT=0,
    s.flash=0,
    this.ended=!1,
    this.outcome=null,
    this.endT=0,
    this.endSent=!1,
    this.slowT=0,
    this.slowScale=1,
    this.hitstop=0,
    this.search=null,
    this.banner={
      text:"广告复活",
      sub:"重返战场 · 物资保留",
      color:"#6dff9e",
      t:0,
      dur:2.6
    },
    this.flash={
      t:.4,
      color:"160,255,200"
    },
    this.bullets=this.bullets.filter(i=>i.from===1||Math.hypot(i.x-s.x,i.y-s.y)>260);
    for(const i of this.enemies){
      const c=Math.hypot(i.x-s.x,i.y-s.y);
      if(c<300){
        const f=c>0?Math.atan2(i.y-s.y,i.x-s.x):Math.random()*ne;
        i.x=s.x+Math.cos(f)*320,
        i.y=s.y+Math.sin(f)*320,
        i.atkCd=Math.max(i.atkCd,1.2),
        i.reactT=Math.max(i.reactT,1.2)
      }
    }
    return this.msg("复活成功！立刻转移，敌人暂时被击退","#6dff9e"),
    this.sfx.play("extract"),
    !0
  }
  rollLoot(a){
    const l=wc(a),
    T=__LT[this.mapId]??[],
    loc=ty[l].filter(q=>T.includes(q.id)),
    gen=ty[l].filter(q=>!__LTA.has(q.id)),
    s=loc.length&&Math.random()<.24?loc:gen.length?gen:ty[l];
    return s[Math.floor(Math.random()*s.length)]
  }
  rollThrowable(){
    const a=[[L1,50],[E1,22],[W1,16],[Q1,12]];
    return a[wc(a.map(l=>l[1]))][0]
  }
  rollItems(a){
    const l=Aa[a],
    s=[];
    if(l.special==="weapon"){
      let i=[["smg",20],["mp9",14],["shotgun",15],["rifle",16],["ak",13],["lmg",7],["sniper",5],["dmr",4.5],["m4legend",2],["awmlegend",1.5],["minigun",1.5],["aa12",1.2],["hk416",1.2],["barrett",0.8]];
      // 红色武器(rarity 5)限定第5关(霜锋哨站)起才能从容器搜到，前4关过滤掉
      if(jc.findIndex(q=>q.id===this.mapId)<4)i=i.filter(f=>ht[f[0]].rarity<5);
      s.push(ra(i[wc(i.map(f=>f[1]))][0]));
      const c=Math.random();
      c<.4?s.push(Zl(Math.random()<.65?"armor1":"armor2")):c<.7&&s.push(this.rollThrowable())
    }else if(l.special==="med")s.push(Kl),
    Math.random()<.65&&s.push(Math.random()<.5?Wo:Kl),
    Math.random()<.3&&s.push(this.rollThrowable()),
    Math.random()<.5&&s.push(this.rollLoot([30,40,22,7,1,0]));
    else if(l.special==="vending"){
      const i=Sa(l.min,l.max);
      for(let c=0;c<i;c++)s.push(u1[Sa(0,u1.length-1)])
    }else if(l.special==="treasure"){
      const i=Sa(l.min,l.max);
      for(let c=0;c<i;c++)s.push(this.rollLoot(l.weights));
      Math.random()<.35&&s.push(this.rollThrowable())
    }else if(l.special==="starter"){
      const W=[["pistol",40],["smg",35],["mp9",25]];
      Math.random()<.45&&s.push(ra(W[wc(W.map(f=>f[1]))][0]));
      s.push(Kl);
      Math.random()<.5&&s.push(Kl);
      Math.random()<.35&&s.push(Math.random()<.7?L1:E1);
      Math.random()<.4&&s.push(Zl("armor1"));
      Math.random()<.5&&s.push(this.rollLoot([70,30,0,0,0,0]))
    }else if(l.special==="coins")s.push(Bo.find(i=>i.id==="gold")),
    Math.random()<.45&&s.push(this.rollLoot([0,18,36,28,14,4]));
    else{
      const i=Sa(l.min,l.max);
      for(let c=0;c<i;c++)Math.random()<.07?s.push(Math.random()<.6?Kl:this.rollThrowable()):s.push(this.rollLoot(l.weights))
    }
    return s.map(i=>({
      def:i,
      revealed:!1,
      taken:!1,
      at:0
    }))
  }
  rollBody(a){
    const l=[],
    s=a.def.encounter;
    switch(a.type){
      case"chicken":Math.random()<.45&&l.push(this.rollLoot([70,25,5,0,0,0]));
      break;
      case"lookout":case"bandit":{
        const i=Sa(1,3);
        for(let c=0;c<i;c++)l.push(this.rollLoot([40,34,18,6,1.6,.25]));
        a.weapon&&Math.random()<.35&&l.push(ra(a.weapon.id)),
        Math.random()<.3&&l.push(Kl),
        Math.random()<.12&&l.push(this.rollThrowable());
        break
      }
      case"shield":{
        const i=Sa(1,2);
        for(let c=0;c<i;c++)l.push(this.rollLoot([18,34,28,14,5,1]));
        a.weapon&&Math.random()<.5&&l.push(ra(a.weapon.id)),
        Math.random()<.5&&l.push(Zl(Math.random()<.6?"armor2":"armor3"));
        break
      }
      case"hen":{
        for(let i=0;i<Sa(1,3);i++)l.push(this.rollLoot([35,33,20,9,2.5,.5]));
        Math.random()<.6&&l.push(this.rollThrowable());
        break
      }
      case"armored":case"elite":{
        const i=Sa(2,3);
        for(let c=0;c<i;c++)l.push(this.rollLoot([14,30,30,18,6.5,1.2]));
        a.weapon&&Math.random()<.55&&l.push(ra(a.weapon.id)),
        Math.random()<.4&&l.push(Zl(Math.random()<.6?"armor2":"armor3")),
        Math.random()<.3&&l.push(Wo);
        break
      }
    }
    if(s){
      l.push(s.trophy);
      for(const i of s.rewardRolls??[])for(let c=0;c<i.count;c++)l.push(this.rollLoot(i.weights));
      for(const i of s.weaponDrops??[])l.push(ra(i));
      l.push(this.rollLoot(s.extraLootWeights))
    }
    return p1(l).map(i=>({
      def:i,
      revealed:!1,
      taken:!1,
      at:0
    }))
  }
  spawnEnemy(a,l,s,i="idle"){
    const c=Yn[a],
    f=this.nav.nearestOpen(l,s),
    d=c.weapons.length?c.weapons[Math.floor(Math.random()*c.weapons.length)]:null,
    m=d?ht[d]:null,
    b={
      id:this.nextId++,
      type:a,
      def:c,
      x:f.x,
      y:f.y,
      vx:0,
      vy:0,
      kvx:0,
      kvy:0,
      r:c.r,
      hp:c.hp,
      maxHp:c.hp,
      armor:c.armor,
      armorMax:c.armor,
      aim:Math.random()*ne,
      state:i,
      homeX:f.x,
      homeY:f.y,
      tx:f.x,
      ty:f.y,
      weapon:m,
      ammo:m?m.mag:0,
      reloadT:0,
      cd:.4,
      burst:0,
      burstPause:.25,
      losT:Math.random()*.2,
      los:!1,
      canSee:!1,
      vis:!1,
      visA:0,
      lastX:f.x,
      lastY:f.y,
      lostT:0,
      huntT:0,
      strafe:Math.random()<.5?1:-1,
      strafeT:1,
      reactT:0,
      alertT:0,
      qT:0,
      flash:0,
      walk:Math.random()*10,
      atkCd:0,
      special:null,
      specialT:0,
      cdx:0,
      cdy:0,
      honkCd:4,
      chargeCd:6,
      nadeCd:1.5+Math.random()*1.5,
      wanderT:Math.random()*2,
      dead:!1,
      kick:0,
      hurtT:0,
      chillT:0,
      suppressT:0,
      stunT:0,
      phase:0,
      skillPhase:0,
      castCount:0,
      castSkill:null
    };
    return this.enemies.push(b),
    b
  }
  spawnHunter(a,l,s){
    const i=this.spawnEnemy(a,l,s,"hunt");
    return i.huntT=30,
    i.alertT=1,
    i.lastX=this.player.x,
    i.lastY=this.player.y,
    i
  }
  spawnPack(a,l,s){
    for(let i=0;i<s;i++)this.spawnEnemy("chicken",a+pe(-55,55),l+pe(-55,55))
  }
  spawnSquad(a,l,s,i,c){
    if(this.enemies.length>28)return!1;
    const f=this.player,
    d=[];
    for(const y of this.map.reinforce){
      const g=Math.hypot(y.x-a,y.y-l);
      g>=i&&g<=c&&d.push(y)
    }
    for(let y=0;y<16;y++){
      const g=Math.random()*ne,
      v=pe(i,c),
      S=a+Math.cos(g)*v,
      T=l+Math.sin(g)*v;
      S>40&&S<this.map.w-40&&T>40&&T<this.map.h-40&&this.nav.isOpen(S,T)&&d.push({
        x:S,
        y:T
      })
    }
    const m=d.filter(y=>Math.hypot(y.x-f.x,y.y-f.y)>560&&!this.grid.los(f.x,f.y,y.x,y.y,Xt));
    if(!m.length)return!1;
    const b=m[Math.floor(Math.random()*m.length)],
    p=this.t>150?.2:.06;
    for(let y=0;y<s;y++){
      const g=this.spawnEnemy(Math.random()<p?"elite":"bandit",b.x+pe(-40,40),b.y+pe(-40,40),"hunt");
      g.huntT=40
    }
    return!0
  }
  msg(a,l="#fff"){
    this.msgs.push({
      text:a,
      color:l,
      t:0
    }),
    this.msgs.length>5&&this.msgs.shift()
  }
  text(a,l,s,i,c=16,f=!1){
    this.texts.length>60&&this.texts.shift(),
    this.texts.push({
      x:a+pe(-6,6),
      y:l,
      text:s,
      color:i,
      life:f?1.7:.85,
      max:f?1.7:.85,
      size:c,
      vy:f?-34:-58
    })
  }
  addTrauma(a){
    this.cam.trauma=Math.min(1,this.cam.trauma+a)
  }
  P(a,l,s,i,c,f,d,m){
    if(this.particles.length>=this.maxParticles)return null;
    const b={
      x:l,
      y:s,
      z:0,
      vx:i,
      vy:c,
      vz:0,
      life:f,
      max:f,
      size:d,
      color:m,
      type:a,
      rot:0,
      vr:0,
      drag:0,
      grow:0
    };
    return this.particles.push(b),
    b
  }
  feathers(a,l,s,i,c=0,f=0,d=1){
    const m=c!==0||f!==0?Math.atan2(f,c):0;
    for(let b=0;b<s;b++){
      const p=c!==0||f!==0?m+(Math.random()-.5)*1.8:Math.random()*ne,
      y=(50+Math.random()*230)*d,
      g=this.P(Bc,a,l,Math.cos(p)*y,Math.sin(p)*y,2.5+Math.random()*3,2.6+Math.random()*3,i[Math.floor(Math.random()*i.length)]);
      g&&(g.z=6+Math.random()*14,g.vz=40+Math.random()*90*d,g.rot=Math.random()*ne,g.vr=(Math.random()-.5)*12)
    }
  }
  sparks(a,l,s,i,c,f,d){
    for(let m=0;m<s;m++){
      const b=c+(Math.random()-.5)*f,
      p=d*(.4+Math.random()*.8),
      y=this.P(ti,a,l,Math.cos(b)*p,Math.sin(b)*p,.12+Math.random()*.22,1.5+Math.random()*1.5,i);
      y&&(y.drag=6)
    }
  }
  puff(a,l,s,i,c,f,d=.6){
    for(let m=0;m<s;m++){
      const b=Math.random()*ne,
      p=Math.random()*f,
      y=this.P(a2,a+pe(-4,4),l+pe(-4,4),Math.cos(b)*p,Math.sin(b)*p,d*(.6+Math.random()*.6),c*(.6+Math.random()*.6),i);
      y&&(y.drag=4,y.grow=c*1.4)
    }
  }
  screenToWorld(a,l){
    const s=this.cam;
    return{
      x:s.x+s.kx+(a-this.viewW/2)/s.zoom,
      y:s.y+s.ky+(l-this.viewH/2)/s.zoom
    }
  }
  contDist(a,l,s){
    if(a.body)return Math.max(0,Math.hypot(a.x-l,a.y-s)-12);
    const i=oa(l,a.x-a.w/2,a.x+a.w/2),
    c=oa(s,a.y-a.h/2,a.y+a.h/2);
    return Math.hypot(l-i,s-c)
  }
  get lootValue(){
    let a=0;
    for(const l of this.player.backpack)a+=l.def.value;
    return a
  }
  update(a){
    this.realT+=a;
    let l=1;
    this.hitstop>0?(this.hitstop-=a,l=.07):this.slowT>0&&(this.slowT-=a,l=this.slowScale);
    const s=a*l,
    i=this.player;
    this.ended?(this.endT+=a,i.vx*=.9,i.vy*=.9,this.endT>(this.outcome==="extract"?1.5:1.9)&&!this.endSent&&(this.endSent=!0,this.onGameOver(this.buildResult()))):(this.t+=s,this.updatePlayer(s),this.updateContainers(s),this.training&&this.checkTutorialProgress(),this.updateExtraction(s),this.training||this.updateWaves(),this.timeLimit-this.t<=0&&this.finish("mia")),
    this.navT-=s,
    this.navT<=0&&!i.dead&&(this.navT=.3,this.nav.compute(i.x,i.y)),
    this.updateEnemies(s),
    this.updateBullets(s),
    this.updateGrenades(s),
    this.updateSmokes(s),
    this.updateFires(s),
    this.updateBooms(s),
    this.updateFx(s,a),
    this.updateCamera(a),
    this.sfx.lx=i.x,
    this.sfx.ly=i.y
  }
  updateDemo(a){
    this.realT+=a,
    this.t+=a;
    const l=this.realT;
    this.cam.x=1600+Math.sin(l*.045)*1050,
    this.cam.y=1200+Math.sin(l*.031+1)*720,
    this.cam.zoom=this.cam.base*.92,
    this.cam.sx=0,
    this.cam.sy=0,
    this.cam.kx=0,
    this.cam.ky=0,
    this.updateEnemies(a),
    this.updateFx(a,a)
  }
  updateIdle(a){
    this.realT+=a,
    this.updateFx(a*.5,a)
  }
  updatePlayer(a){
    const l=this.player,
    s=this.input;
    if(l.dead)return;
    l.rollCd-=a,
    l.hurtT-=a,
    l.flash-=a,
    l.chillT=Math.max(0,l.chillT-a),
    l.armorInvuln=Math.max(0,l.armorInvuln-a),
    l.armorAegisCd=Math.max(0,l.armorAegisCd-a),
    l.noHitT=Math.max(0,l.noHitT-a),
    l.armorRegen>0&&l.noHitT<=0&&l.armor<l.armorMax&&(l.armor=Math.min(l.armorMax,l.armor+l.armorRegen*a)),
    l.kick*=Math.exp(-a*18),
    l.bloom=Math.max(0,l.bloom-a*.35),
    this.dodgeT-=a,
    s.moveVec(this.mv);
    const i=this.mv.x,
    c=this.mv.y,
    f=Math.hypot(i,c);
    if(s.touchMode)s.aimActive()?l.aim=this.aimAssist(s.aimAngle()):f>.2&&(l.aim=No(l.aim,Math.atan2(c,i),a*10));
    else if(s.mouseX>-100){
      const y=this.screenToWorld(s.mouseX,s.mouseY);
      l.aim=Math.atan2(y.y-l.y,y.x-l.x),
      this.aimDist=Math.hypot(y.x-l.x,y.y-l.y)
    }else f>.2&&(l.aim=No(l.aim,Math.atan2(c,i),a*10));
    s.consume("bag")&&(this.bagOpen=!this.bagOpen),
    s.consume("dropLowest")&&this.dropLowestValue(),
    this.bagOpen&&s.held.clear(),
    s.consume("swap")&&this.swapWeapon(l.cur===0?1:0),
    s.consume("slot1")&&this.swapWeapon(0),
    s.consume("slot2")&&this.swapWeapon(1);
    const d=l.weapons[l.cur]??l.weapons[1];
    if(d.cd-=a,d.reloadT>0&&(d.reloadT-=a,d.reloadT<=0&&(d.ammo=d.def.mag,this.sfx.play("reloadEnd"))),s.consume("reload")&&this.startReload(d),s.consume("roll")&&(this.bufRoll=.18),this.bufRoll-=a,this.bufRoll>0&&l.rollCd<=0&&l.rollT<=0){
      this.bufRoll=0;
      let y=i,
      g=c;
      f<.2&&(y=Math.cos(l.aim),g=Math.sin(l.aim));
      const v=Math.hypot(y,g)||1;
      l.rollDx=y/v,
      l.rollDy=g/v,
      l.rollT=.3,
      l.rollCd=l.rollCdMax,
      l.healT>0&&(l.healT=0,l.healType=null),
      this.sfx.play("roll"),
      this.puff(l.x,l.y+6,8,"rgba(214,196,160,0.5)",7,90)
    }
    if(s.consume("heal")&&(this.bufHeal=.35),this.bufHeal-=a,this.bufHeal>0&&l.rollT<=0&&(this.bufHeal=0,this.startHeal()),l.healT>0&&(l.healT-=a,l.healT<=0&&this.finishHeal()),s.consume("throwableNext")&&this.cycleThrowable(),s.consume("grenade")&&(this.bufNade=.35),this.bufNade-=a,this.bufNade>0&&l.rollT<=0&&(this.bufNade=0,this.throwGrenade()),l.rollT>0){
      l.rollT-=a;
      const y=610*(.55+.45*Math.max(0,l.rollT/.3));
      l.vx=l.rollDx*y,
      l.vy=l.rollDy*y,
      Math.random()<.6&&this.puff(l.x-l.rollDx*10,l.y-l.rollDy*10+6,1,"rgba(214,196,160,0.45)",6,30,.4)
    }else{
      let y=l.character.speed*l.speedMul;
      l.healT>0&&(y*=.5),
      l.chillT>0&&(y*=.62),
      d.def.id==="lmg"&&(y*=.9);
      const g=Math.min(1,a*20);
      l.vx+=(i*y-l.vx)*g,
      l.vy+=(c*y-l.vy)*g
    }
    l.x+=(l.vx+l.kvx)*a,
    l.y+=(l.vy+l.kvy)*a,
    l.kvx*=Math.exp(-a*8),
    l.kvy*=Math.exp(-a*8),
    this.grid.resolve(l,l.r,bt);
    for(const y of this.enemies){
      const g=l.x-y.x,
      v=l.y-y.y,
      S=l.r+y.r,
      T=g*g+v*v;
      if(T<S*S&&T>.01){
        const H=Math.sqrt(T),
        B=(S-H)*.5;
        l.x+=g/H*B,
        l.y+=v/H*B,
        y.x-=g/H*B,
        y.y-=v/H*B
      }
    }
    this.grid.resolve(l,l.r,bt),
    l.x=oa(l.x,l.r,this.map.w-l.r),
    l.y=oa(l.y,l.r,this.map.h-l.r);
    const m=Math.hypot(l.vx,l.vy);
    l.walk+=m*a*.055,
    l.stepAcc+=m*a,
    l.stepAcc>52&&l.rollT<=0&&(l.stepAcc=0,this.puff(l.x-l.vx/(m||1)*8,l.y+8,1,"rgba(214,196,160,0.35)",4,12,.45));
    const b=s.firing();
    b&&l.rollT<=0&&(l.healT>0&&(l.healT=0,l.healType=null,this.msg("治疗被打断","#aaa")),d.reloadT<=0&&d.cd<=0&&(d.ammo>0?this.playerFire(d):(this.sfx.play("empty"),this.startReload(d)))),
    d.ammo===0&&d.reloadT<=0&&!b&&this.startReload(d);
    const p=this.map.zones.find(y=>l.x>=y.x&&l.x<y.x+y.w&&l.y>=y.y&&l.y<y.y+y.h);
    p&&p.name!==this.zoneName&&(this.zoneName=p.name,this.zoneT=2.6)
  }
  aimAssist(a){
    const l=this.player;
    if(!this.input.touchMode)return a;
    const s=l.weapons[l.cur]??l.weapons[1],
    i=s?s.def.speed:1200;
    let c=a,
    f=1/0;
    for(const d of this.enemies){
      if(d.dead||d.visA<.4)continue;
      const m=d.x-l.x,
      b=d.y-l.y,
      p=Math.hypot(m,b);
      if(p>900||p<30)continue;
      const y=p/i,
      g=d.x+d.vx*y*.72,
      v=d.y+d.vy*y*.72,
      S=Math.atan2(v-l.y,g-l.x),
      T=Math.abs(Wn(a,S));
      if(T>.46)continue;
      const H=T+p/900*.1;
      H<f&&(f=H,c=S)
    }
    return c
  }
  bulletMagnetism(a){
    const l=Math.atan2(a.vy,a.vx);
    let s=null,
    i=.2;
    for(const b of this.enemies){
      if(b.dead||b.visA<.4)continue;
      const p=b.x-a.x,
      y=b.y-a.y,
      g=Math.hypot(p,y);
      if(g>460||g<45)continue;
      const v=Math.abs(Wn(l,Math.atan2(y,p)));
      v<i&&(i=v,s=b)
    }
    if(!s)return;
    const c=Math.atan2(s.y-a.y,s.x-a.x),
    f=oa(Wn(l,c),-.055,.055),
    d=l+f,
    m=Math.hypot(a.vx,a.vy);
    a.vx=Math.cos(d)*m,
    a.vy=Math.sin(d)*m
  }
  dropFromBag(a){
    if(this.mode!=="raid"||this.ended)return;
    const l=this.player,
    s=l.backpack[a];
    if(s){
      if(s.def.kind==="weapon"||s.def.kind==="armor"){
        this.equipFromBag(a);
        return
      }
      l.backpack.splice(a,1),
      this.sfx.play("ui"),
      this.msg(`已丢弃 ${s.def.name}（¥${Ee(s.def.value)}）`,"#ffb37a")
    }
  }
  dropLowestValue(){
    if(this.mode!=="raid"||this.ended)return;
    const a=this.player;
    if(!a.backpack.length)return;
    let l=0;
    for(let s=1;s<a.backpack.length;s++)a.backpack[s].def.value<a.backpack[l].def.value&&(l=s);
    this.dropFromBag(l)
  }
  equipFromBag(a){
    if(this.mode!=="raid"||this.ended)return;
    const l=this.player,
    s=l.backpack[a];
    if(!s)return;
    const i=s.def;
    if(i.kind==="weapon"&&i.weapon){
      const c=l.weapons[0]?0:1,
      f=l.weapons[c];
      l.weapons[c]=this.makeWeapon(i.weapon),
      l.cur=c,
      f&&this.toBackpack(Co(ra(f.def.id))),
      l.backpack.splice(a,1),
      this.sfx.play("swap"),
      this.msg(`已装备 ${ht[i.weapon].name}`,"#ffd98a");
      return
    }
    if(i.kind==="armor"){
      const c=Ul(l.character,i.armor??0),
      f=l.armorMax;
      if(l.armorMax=c,l.armor=c,f>0){
        const d=Qo.find(m=>Ul(l.character,m.armor??0)===f);
        d&&this.toBackpack(Co(d))
      }
      l.backpack.splice(a,1),
      this.sfx.play("shield"),
      this.msg(`已装备 ${i.name}`,"#9ec5ff")
    }
  }
  swapWeapon(a){
    const l=this.player;
    if(a===l.cur||!l.weapons[a])return;
    const s=l.weapons[l.cur];
    s&&(s.reloadT=0),
    l.cur=a;
    const i=l.weapons[a];
    i.cd=Math.max(i.cd,.25),
    this.sfx.play("swap"),
    this.text(l.x,l.y-30,i.def.name,"#e8e4d8",13)
  }
  startReload(a){
    a.reloadT>0||a.ammo>=a.def.mag||(a.reloadT=a.def.reload,this.sfx.play("reload"))
  }
  startHeal(){
    const a=this.player;
    if(!(a.healT>0||a.rollT>0)){
      if(a.hp>=a.maxHp){
        this.msg("生命值已满","#aaa");
        return
      }
      if(a.medkits>0&&(a.hp<55||a.bandages===0))a.healType="medkit",
      a.healDur=2.2;
      else if(a.bandages>0)a.healType="bandage",
      a.healDur=1.4;
      else{
        this.msg("没有医疗物资","#aaa");
        return
      }
      a.healT=a.healDur,
      this.sfx.play("reload")
    }
  }
  finishHeal(){
    const a=this.player;
    if(!a.healType)return;
    const l=a.healType==="medkit"?90:40;
    a.healType==="medkit"?a.medkits--:a.bandages--,
    a.hp=Math.min(a.maxHp,a.hp+l),
    a.healType=null,
    this.text(a.x,a.y-30,`+${l}`,"#6dff9e",20,!0);
    for(let s=0;s<12;s++){
      const i=this.P(Yl,a.x+pe(-16,16),a.y+pe(-10,16),pe(-20,20),pe(-90,-40),.8,3+Math.random()*2,"#6dff9e");
      i&&(i.vr=3)
    }
    this.sfx.play("heal")
  }
  cycleThrowable(){
    const a=this.player;
    a.throwables[a.selectedThrowable]||this.selectedThrowableFallback();
    const l=St.indexOf(a.selectedThrowable);
    for(let s=1;s<=St.length;s++){
      const i=St[(l+s)%St.length];
      if(a.throwables[i]>0){
        a.selectedThrowable=i,
        this.msg(`切换至 ${qt[i].name} ×${a.throwables[i]}`,qt[i].color),
        this.sfx.play("ui");
        return
      }
    }
    this.msg("没有投掷物","#aaa")
  }
  selectedThrowableFallback(){
    const a=this.player;
    a.selectedThrowable=St.find(l=>a.throwables[l]>0)??"grenade"
  }
  throwGrenade(){
    const a=this.player;
    if(a.rollT>0)return;
    a.throwables[a.selectedThrowable]||this.selectedThrowableFallback();
    const l=a.selectedThrowable;
    if(a.throwables[l]<=0){
      this.msg("没有投掷物","#aaa");
      return
    }
    a.throwables[l]--;
    const s=qt[l];
    let i,
    c;
    if(this.input.touchMode)i=a.x+Math.cos(a.aim)*330,
    c=a.y+Math.sin(a.aim)*330;
    else{
      const p=this.screenToWorld(this.input.mouseX,this.input.mouseY);
      i=p.x,
      c=p.y
    }
    let f=i-a.x,
    d=c-a.y,
    m=Math.hypot(f,d);
    m<60&&(f=Math.cos(a.aim)*60,d=Math.sin(a.aim)*60,m=60),
    m>480&&(f*=480/m,d*=480/m,m=480);
    const b=.5+m/1500;
    this.grenades.push({
      x:a.x+Math.cos(a.aim)*16,
      y:a.y+Math.sin(a.aim)*16,
      z:14,
      vx:f/b*.9,
      vy:d/b*.9,
      vz:900*b/2,
      fuse:s.fuse,
      spin:0,
      kind:l
    }),
    this.msg(`投出 ${s.name}`,s.color),
    this.sfx.play("throw")
  }
  enemyThrowEgg(a,l,s){
    let i=l-a.x,
    c=s-a.y,
    f=Math.hypot(i,c);
    f>460&&(i*=460/f,c*=460/f,f=460);
    const d=.55+f/1400;
    this.grenades.push({
      x:a.x+Math.cos(a.aim)*14,
      y:a.y+Math.sin(a.aim)*14,
      z:12,
      vx:i/d*.9,
      vy:c/d*.9,
      vz:820*d/2,
      fuse:1.45,
      spin:0,
      kind:"grenade",
      egg:!0
    }),
    this.sfx.play("throw"),
    this.text(a.x,a.y-30,"鸡蛋！","#ffe9a8",14)
  }
  playerFire(a){
    const l=this.player,
    s=a.def;
    if(s.jamChance&&Math.random()<s.jamChance){
      a.cd=1/s.rate,
      this.text(l.x,l.y-34,"卡壳!","#ff8a5c",14),
      this.sfx.play("armor");
      return
    }
    a.ammo--,
    a.cd=1/s.rate;
    const i=Math.hypot(l.vx,l.vy)>60,
    c=s.spread*(i?1.3:1)+l.bloom;
    s.pellets===1&&(l.bloom=Math.min(l.bloom+s.spread*.22,s.spread*1.6));
    const pv=weaponPassive(s.id),
    critMul=pv==="sniper"?2.6:1.8;
    const f=Math.cos(l.aim),
    d=Math.sin(l.aim),
    m=l.r*.6+s.len+4,
    b=l.r*.3+2.5,
    p=f*m-d*b,
    y=d*m+f*b,
    g=this.grid.raycast(l.x,l.y,l.x+p,l.y+y,pa,this.hit)?this.hit.t:1,
    v=l.x+p*g,
    S=l.y+y*g;
    for(let ie=0;ie<s.pellets;ie++){
      const ce=l.aim+(Math.random()+Math.random()-1)*c,
      fe=s.speed*(s.pellets>1?.85+Math.random()*.3:1),
      J=Math.random()<.1;
      this.bullets.push({
        x:l.x,
        y:l.y,
        ox:l.x,
        oy:l.y,
        vx:Math.cos(ce)*fe,
        vy:Math.sin(ce)*fe,
        dmg:s.dmg*(J?critMul:1),
        life:s.range/fe,
        from:0,
        pierce:s.pierce,
        src:null,
        w:Oc.has(s.id)?5:s.pellets>1?1.7:s.id==="sniper"?3.4:2.3,
        crit:J,
        chill:U1.has(s.id),
        explosive:Oc.has(s.id),
        blastR:s.blast?.radius,
        blastDmg:s.blast?s.blast.dmg*(J?critMul:1):void 0,
        antiArmor:s.antiArmor,
        shotgun:pv==="shotgun",
        suppress:pv==="mg",
        combo:s.combo
      })
    }
    this.stats.shots++,
    l.kick=s.kick,
    this.cam.kx-=f*s.kick*1.3,
    this.cam.ky-=d*s.kick*1.3,
    this.addTrauma(s.shake*.5),
    s.kick>6&&(l.kvx-=f*s.kick*16,l.kvy-=d*s.kick*16),
    this.lights.push({
      x:v,
      y:S,
      r:80+s.kick*7,
      color:"#ffcf7a",
      life:.06,
      max:.06
    });
    const T=this.P(ai,v,S,0,0,.05,9+s.kick*1.4,"#fff3c4");
    T&&(T.rot=l.aim);
    const H=l.x+f*6-d*(b+3),
    B=l.y+d*6+f*(b+3),
    Q=this.P(Ec,H,B,-d*pe(70,130)+f*pe(-20,20),f*pe(70,130)+d*pe(-20,20),2.2,2.4,s.pellets>1?"#c8402a":"#e2b04a");
    Q&&(Q.z=10,Q.vz=pe(120,200),Q.vr=pe(-20,20),Q.rot=Math.random()*ne);
    const se=this.P(xl,v,S,f*30,d*30,.5,4,"rgba(220,220,220,0.25)");
    se&&(se.grow=18,se.drag=3),
    this.sfx.play(s.sound),
    this.makeNoise(l.x,l.y,s.noise)
  }
  makeNoise(a,l,s){
    for(const i of this.enemies)i.state==="idle"&&(Math.hypot(i.x-a,i.y-l)>s||(i.state="search",i.huntT=7,i.lastX=a,i.lastY=l,i.qT=1.4))
  }
  impact(a,l,s,i,c){
    const f=Math.atan2(i,s);
    this.sparks(a,l,4,"#ffd27a",f,1.6,260);
    let d="rgba(190,180,160,0.5)";
    c&&(c.kind==="tree"||c.kind==="container"||c.kind==="hay"?d="rgba(150,110,60,0.6)":c.kind==="sandbag"&&(d="rgba(205,185,140,0.6)")),
    this.puff(a,l,2,d,4,40,.4)
  }
  damageEnemy(a,l,s,i,c,f,d,m=!1,b=0){
    if(a.dead)return;
    a.special==="stun"&&(l*=1.5);
    let p=l,
    y=!1;
    if(a.armor>0){
      let v=.6,
      S=!1;
      if(a.def.frontArmor&&!m){
        const H=Math.cos(a.aim),
        B=Math.sin(a.aim);
        -(s*H+i*B)>.15?v=.85:(v=.05,S=!0)
      }
      v*=1-b;
      const T=Math.min(a.armor,l*v);
      a.armor-=T,
      p=l-T,
      y=T>0,
      S?this.text(f,d-12,"背刺!","#ff6b6b",15,!0):y&&a.def.frontArmor&&this.text(f,d-12,"格挡","#9cc8ff",13),
      a.armor<=0&&a.armorMax>0&&(this.sfx.play("shield",a.x,a.y),this.text(a.x,a.y-34,"破甲!","#7fb2ff",15))
    }
    a.hp-=p,
    a.flash=.09,
    a.hurtT=2.5;
    const g=(m?3:1)*Math.min(260,l*7)/(a.def.boss?5:1);
    a.kvx+=s*g,
    a.kvy+=i*g,
    this.text(f,d-10,Math.round(l).toString(),c?"#ffd23f":y?"#9cc8ff":"#ffffff",c?24:16),
    this.feathers(f,d,c?5:3,b1[a.type],s,i,.8),
    y&&this.sparks(f,d,3,"#9cc8ff",Math.atan2(-i,-s),2,200),
    this.hitmark.t=.14,
    this.hitmark.kill=!1,
    this.sfx.play(c?"crit":y?"armor":"hit"),
    (a.state==="idle"||a.state==="search"||a.state==="hunt")&&(a.state="react",a.reactT=Math.min(.22,a.def.reaction),a.alertT=1.2,a.lastX=this.player.x,a.lastY=this.player.y,this.sfx.play(a.type==="chicken"?"cluck":a.def.boss?"honk":"quack",a.x,a.y,.8)),
    a.def.boss&&this.engageBoss(a),
    a.hp<=0?this.killEnemy(a,s,i):a.def.encounter&&a.phase===0&&a.hp<=a.maxHp*a.def.encounter.phaseAt&&(a.phase=1,a.honkCd=Math.min(a.honkCd,1.5),a.chargeCd=Math.min(a.chargeCd,1.5),a.special=null,a.castSkill=null,a.marks=[],a.stunT=Math.max(a.stunT,.8),this.lights.push({
      x:a.x,
      y:a.y,
      r:320,
      color:a.def.encounter.ringColor?.startsWith("#")?a.def.encounter.ringColor:"#ffb37a",
      life:.7,
      max:.7
    }),this.addTrauma(.4),this.banner={
      text:`${a.def.name} · 第二阶段`,
      sub:a.def.encounter.phaseWarning,
      color:"#ff8a5c",
      t:0,
      dur:2.4
    },this.sfx.play("alarm"))
  }
  bossSkill(a){
    const l=a.def.encounter;
    return a.castSkill?a.castSkill:l?.skillCycle?.[a.castCount%l.skillCycle.length]??l?.skill??"slam"
  }
  engageBoss(a){
    if(this.boss=a,this.engagedBossIds.has(a.id))return;
    this.engagedBossIds.add(a.id),
    this.bossSeen=!0;
    const l=this.bossSkill(a),
    s=a.def.encounter?.ringColor??(l==="charge"?"#ff5a4a":l==="slam"?"#ffe06a":l==="summon"?"#b4ff8c":"#ff8a1e"),
    i=this.enemies.filter(c=>c!==a&&c.def.boss&&!c.dead).length;
    this.banner={
      text:i?`${a.def.name} 出现了！双首领战`:`${a.def.name} 出现了！`,
      sub:a.def.encounter?.warning??"注意首领技能预警",
      color:s,
      t:0,
      dur:2.8
    },
    this.sfx.play("alarm")
  }
  killEnemy(a,l,s){
    if(a.dead=!0,this.stats.kills++,this.stats.killScore+=a.def.score,this.stats.killsBy[a.type]=(this.stats.killsBy[a.type]||0)+1,this.msg(`击杀 ${a.def.name}  +${a.def.score}`,"#ffd23f"),this.training&&(this.tutorialStage===0&&a.type==="chicken"?this.tutorialChickenKilled(2):this.tutorialStage===2&&a.type==="bandit"?this.tutorialBanditKilled(2,3):this.tutorialStage===5&&a.type==="bandit"&&this.tutorialBanditKilled(2,6)),this.realT-this.lastKillT<3?this.streak++:this.streak=1,this.lastKillT=this.realT,this.streak>=2&&this.mode==="raid"){
      const f=["","","双杀","三杀","四杀","五杀"],
      d=this.streak<f.length?f[this.streak]:"暴走",
      m=150*this.streak;
      this.stats.killScore+=m,
      this.text(this.player.x,this.player.y-48,`${d}！ +${m}`,"#ff9a3c",22+Math.min(10,this.streak*2),!0),
      this.addTrauma(.1),
      this.sfx.play("r2")
    }
    this.feathers(a.x,a.y,a.def.boss?60:a.type==="chicken"?14:22,b1[a.type],l*.4,s*.4,a.def.boss?1.6:1.1);
    const i=this.P(Js,a.x,a.y,0,0,.35,a.r,"rgba(255,255,255,0.7)");
    i&&(i.grow=160),
    this.puff(a.x,a.y,5,"rgba(240,236,225,0.55)",9,70,.7),
    this.hitmark.t=.28,
    this.hitmark.kill=!0,
    this.sfx.play("kill"),
    this.hitstop=a.def.boss?.22:.045,
    this.addTrauma(a.def.boss?.75:.18);
    const c=this.rollBody(a);
    if(this.containers.push({
      id:this.nextId++,
      type:"body",
      name:`${a.def.name}的遗体`,
      x:a.x,
      y:a.y,
      w:a.r*2,
      h:a.r*2,
      items:c,
      revealed:0,
      body:!0,
      etype:a.type,
      angle:Math.atan2(s,l),
      open:0,
      shake:0
    }),a.def.boss){
      this.boss?.id===a.id&&(this.boss=this.enemies.find(d=>d.def.boss&&!d.dead&&d.id!==a.id)??null);
      const f=this.enemies.filter(d=>d.def.boss&&!d.dead).length;
      this.banner={
        text:`击败 ${a.def.name}！`,
        sub:f?`还有 ${f} 名首领存活`:"搜刮它的遗体获取顶级物资",
        color:"#ffb93b",
        t:0,
        dur:2.8
      },
      this.slowT=.9,
      this.slowScale=.3,
      this.flash={
        t:.35,
        color:"255,220,120"
      },
      this.lights.push({
        x:a.x,
        y:a.y,
        r:420,
        color:"#ffb93b",
        life:.6,
        max:.6
      })
    }
  }
  damagePlayer(a,l,s){
    const i=this.player;
    if(i.dead||this.ended||i.armorInvuln>0)return;
    if(i.rollT>0){
      this.dodgeT<=0&&(this.dodgeT=.5,this.text(i.x,i.y-28,"闪避","#cfe8ff",14));
      return
    }
    i.noHitT=4;
    let c=a;
    if(i.armor>0){
      const f=Math.min(i.armor,a*i.armorAbsorb);
      i.armor-=f,
      c=a-f,
      i.armor<=0&&(i.armor=0,this.msg("护甲已损坏！","#7fb2ff"),this.text(i.x,i.y-34,"护甲碎裂","#9ec5ff",15),i.armorAegis>0&&i.armorAegisCd<=0&&(i.armorInvuln=i.armorAegis,i.armorAegisCd=10,this.text(i.x,i.y-52,"应急护盾！","#b9f0ff",18,!0),this.msg("破甲应急护盾启动 · 1.2 秒免疫","#b9f0ff")),this.sfx.play("shield"))
    }
    i.hp-=c,
    i.hurtT=.3,
    i.flash=.08,
    this.addTrauma(.2+Math.min(.3,a*.012)),
    this.dmgInds.push({
      ang:Math.atan2(s-i.y,l-i.x),
      t:1
    }),
    this.dmgInds.length>6&&this.dmgInds.shift(),
    this.feathers(i.x,i.y,3,i.character.feathers,i.x-l,i.y-s,.7),
    this.sfx.play("hurt"),
    i.hp<=0&&(i.hp=0,i.dead=!0,this.bagOpen=!1,this.input.bagOpen=!1,this.ended=!0,this.outcome="dead",this.endT=0,this.search=null,this.slowT=1.5,this.slowScale=.3,this.feathers(i.x,i.y,45,i.character.feathers,0,0,1.4),this.sfx.play("death"),this.banner={
      text:"阵亡",
      sub:"背包物资全部丢失",
      color:"#ff4f4f",
      t:0,
      dur:3
    },this.addTrauma(.8),this.flash={
      t:.4,
      color:"255,40,40"
    })
  }
  finish(a){
    if(this.ended)return;
    this.bagOpen=!1,
    this.input.bagOpen=!1,
    this.ended=!0,
    this.outcome=a,
    this.endT=0,
    this.search=null;
    const l=this.player;
    if(a==="extract"){
      this.sfx.play("extract"),
      this.banner={
        text:"撤离成功",
        sub:`带出物资 ¥${Ee(this.lootValue)}`,
        color:"#6dff9e",
        t:0,
        dur:3
      },
      this.flash={
        t:.45,
        color:"160,255,200"
      };
      for(let s=0;s<50;s++){
        const i=Math.random()*ne,
        c=pe(80,320),
        f=this.P(Yl,l.x,l.y,Math.cos(i)*c,Math.sin(i)*c-60,pe(.8,1.6),pe(3,6),_e[Sa(1,5)]);
        f&&(f.drag=2,f.vr=pe(-6,6))
      }
    }else this.sfx.play("death"),
    this.banner={
      text:"未能撤离",
      sub:"行动时间耗尽 · 失踪",
      color:"#9aa3ad",
      t:0,
      dur:3
    },
    l.dead=!0
  }
  buildResult(){
    const a=this.player,
    l=a.backpack.map(y=>({
      name:y.def.name,
      icon:y.def.icon,
      rarity:y.def.rarity,
      value:y.def.value
    })).sort((y,g)=>g.value-y.value||g.rarity-y.rarity),
    s=l.reduce((y,g)=>y+g.value,0),
    i=this.warehouseGear?a.backpack.filter(y=>pt(y.def.id)):[],
    c=vl({
      bandages:a.backpack.filter(y=>y.def.kind==="bandage").length,
      medkits:a.backpack.filter(y=>y.def.kind==="medkit").length,
      throwables:Object.fromEntries(St.map(y=>[y,a.backpack.filter(g=>g.def.throwable===y).length]))
    }),
    f=a.backpack.filter(y=>["bandage","medkit","grenade"].includes(y.def.kind)).reduce((y,g)=>y+g.def.value,0),
    d=s-i.reduce((y,g)=>y+g.def.value,0)-f,
    b=this.outcome==="extract"?s+this.stats.killScore:Math.floor(this.stats.killScore*.3),
    p=this.warehouseGear?ba({
      bandages:this.kit.bandages,
      medkits:this.kit.medkits,
      throwables:this.kit.throwables
    }):ba({
    });
    return{
      training:this.training,
      mapId:this.mapId,
      characterId:a.character.id,
      outcome:this.outcome??"dead",
      items:l,
      value:s,
      killScore:this.stats.killScore,
      kills:this.stats.kills,
      killsBy:{
        ...this.stats.killsBy
      },
      time:this.t,
      score:b,
      kit:this.kit.id,
      kitCost:this.kit.cost,
      best:l[0]??null,
      cashValue:d,
      foundGear:i.map(y=>({
        id:y.def.id,
        tuned:!1
      })),
      usedGear:this.warehouseGear?ci(this.warehouseGear):[],
      foundSupplies:c,
      usedSupplies:p
    }
  }
  updateContainers(a){
    const l=this.player;
    if(l.dead){
      this.search=null,
      this.nearC=null;
      return
    }
    let s=null,
    i=1e9;
    for(const c of this.containers){
      if(c.shake>0&&(c.shake-=a),c.revealed>=c.items.length)continue;
      const f=this.contDist(c,l.x,l.y);
      f<40&&f<i&&(i=f,s=c)
    }
    if(this.nearC=s,this.input.interactVisible=!!s&&(!this.search||this.search.c!==s),this.input.consume("interact")&&(s&&(!this.search||this.search.c!==s)?this.openSearch(s):this.search&&(this.search=null)),this.search){
      const c=this.search.c;
      if(this.contDist(c,l.x,l.y)>78){
        this.search=null;
        return
      }
      if(c.open=Math.min(1,c.open+a*5),c.revealed<c.items.length){
        const f=c.items[c.revealed],
        d=B1[f.def.rarity]*(c.body?.8:1);
        this.search.t+=a,
        this.search.tick-=a,
        this.search.tick<=0&&(this.search.tick=.2,this.sfx.play("tick")),
        this.search.t>=d&&(this.search.t=0,this.revealItem(c,f),c.revealed++,c.shake=.25)
      }
    }
  }
  openSearch(a){
    this.search={
      c:a,
      t:0,
      tick:0
    },
    this.sfx.play("open",a.x,a.y)
  }
  toBackpack(a){
    const l=this.player;
    if(l.backpack.length<l.capacity)return l.backpack.push(a),
    l.backpack.length===l.capacity&&this.msg("背包已满 · 可以考虑撤离了","#ffb93b"),
    !0;
    let s=0;
    for(let i=1;i<l.backpack.length;i++)l.backpack[i].def.value<l.backpack[s].def.value&&(s=i);
    if(l.backpack[s].def.value<a.def.value){
      const i=l.backpack[s];
      return l.backpack[s]=a,
      i.taken=!1,
      this.msg(`背包已满，丢弃 ${i.def.name}`,"#aab"),
      !0
    }
    return!1
  }
  revealItem(a,l){
    const s=this.player,
    i=l.def,
    c=i.rarity;
    l.revealed=!0,
    l.at=this.realT;
    let f=!0,
    d="";
    switch(i.kind){
      case"bandage":s.bandages<5?(s.bandages++,d="绷带 +1"):f=this.toBackpack(l);
      break;
      case"medkit":s.medkits<3?(s.medkits++,d="急救针 +1"):f=this.toBackpack(l);
      break;
      case"grenade":{
        const p=i.throwable??"grenade",
        y=p==="grenade"?4:3;
        s.throwables[p]<y?(s.throwables[p]++,s.selectedThrowable=p,d=`${qt[p].name} +1`):f=this.toBackpack(l);
        break
      }
      case"armor":{
        const p=Ul(s.character,i.armor??0);
        if(p>s.armorMax||s.armor<p*.5){
          if(s.armorMax>0&&p!==s.armorMax){
            const y=Qo.find(g=>Ul(s.character,g.armor??0)===s.armorMax);
            y&&this.toBackpack(Co(y))
          }
          s.armorMax=p,
          s.armor=p,
          d=`装备 ${i.name}`,
          this.sfx.play("shield")
        }else f=this.toBackpack(l),
        this.msg(`拾取 ${i.name} · 点背包可装备`,"#9ec5ff");
        break
      }
      case"weapon":{
        const p=ht[i.weapon??"pistol"],
        y=s.weapons[0]?0:1,
        g=s.weapons[y];
        !g||p.tier>g.def.tier?(s.weapons[y]=this.makeWeapon(p.id),s.cur=y,g&&this.toBackpack(Co(ra(g.def.id))),d=`装备 ${p.name}`,this.sfx.play("swap"),this.msg(`获得新武器：${p.name}`,_e[p.rarity])):(f=this.toBackpack(l),this.msg(`拾取 ${p.name} · 点背包可装备`,_e[p.rarity]));
        break
      }
      default:f=this.toBackpack(l)
    }
    l.taken=f;
    const m=d||`${i.name}  +${Ee(i.value)}`;
    this.text(a.x,a.y-26-a.revealed%3*17,f?m:`${i.name} · 背包已满`,f?_e[c]:"#888",c>=4?20:15,!0),
    this.sfx.play("r"+c);
    const b=[0,3,7,12,24,42][c];
    for(let p=0;p<b;p++){
      const y=Math.random()*ne,
      g=pe(40,120+c*40),
      v=this.P(Yl,a.x,a.y-6,Math.cos(y)*g,Math.sin(y)*g-40,pe(.5,1.1),pe(2.5,3.5+c*.6),_e[c]);
      v&&(v.drag=2.5,v.vr=pe(-5,5))
    }
    if(c>=3&&this.lights.push({
      x:a.x,
      y:a.y,
      r:110+c*34,
      color:_e[c],
      life:.55,
      max:.55
    }),c>=4){
      this.beams.push({
        x:a.x,
        y:a.y,
        color:_e[c],
        life:2.4,
        max:2.4
      }),
      this.addTrauma(.22),
      this.msg(`发现${li[c]}物品：${i.name}！`,_e[c]);
      const p=this.P(Js,a.x,a.y,0,0,.5,10,_e[c]);
      p&&(p.grow=220)
    }
    c===5&&(this.slowT=.7,this.slowScale=.25,this.banner={
      text:"★ 大红出货 ★",
      sub:`${i.name} · ¥${Ee(i.value)}`,
      color:"#ff4f4f",
      t:0,
      dur:3
    },this.flash={
      t:.5,
      color:"255,90,90"
    },this.addTrauma(.45)),
    this.training&&(i.kind==="weapon"&&(this.tutorialStage===0||this.tutorialStage===1)?this.tutorialPickupWeapon():i.kind!=="weapon"&&this.tutorialStage===3&&this.tutorialPickupSupply())
  }
  tutorialPickupWeapon(){
    this.tutorialStage=2,
    this.tutorialKills=0,
    this.banner={
      text:"武器到手！",
      sub:"军械室附近出现鸭匪，开火击退它们",
      color:"#ffd23f",
      t:0,
      dur:3
    },
    this.sfx.play("alarm"),
    this.spawnHunter("bandit",820,300),
    this.spawnHunter("bandit",820,470)
  }
  tutorialPickupSupply(){
    this.tutorialStage=4,
    this.banner={
      text:"补给到手",
      sub:"前往绿色撤离点，注意最后的埋伏",
      color:"#6dff9e",
      t:0,
      dur:3
    }
  }
  checkTutorialProgress(){
    if(this.tutorialStage===3){
      const a=this.containers.find(l=>!l.body&&l.items.some(s=>s.def.id==="battery"));
      a&&a.items.every(l=>l.taken)&&this.tutorialPickupSupply()
    }
  }
  tutorialChickenKilled(a){
    if(this.tutorialKills++,this.tutorialKills<a){
      this.msg(`挡路的小鸡还剩 ${a-this.tutorialKills}`,"#ffb37a");
      return
    }
    this.tutorialStage=1,
    this.banner={
      text:"通路打开",
      sub:"向右进入军械室，搜武器箱拿枪",
      color:"#ffd23f",
      t:0,
      dur:3
    }
  }
  tutorialBanditKilled(a,l){
    if(this.tutorialKills++,this.tutorialKills<a){
      this.msg(`鸭匪还剩 ${a-this.tutorialKills}`,"#ffb37a");
      return
    }
    if(this.tutorialStage=l,l===3){
      const s=this.player.backpack.some(i=>i.def.kind==="weapon");
      this.banner={
        text:"鸭匪已清除",
        sub:s?"它们掉了枪！点「背包」点带绿点的枪即可换装":"搜第二个补给箱，然后前往撤离点",
        color:"#ffd23f",
        t:0,
        dur:4
      },
      s&&this.msg("提示：点背包 → 点绿色的枪 → 换上鸭匪的武器","#8dffbb")
    }else l===6&&(this.banner={
      text:"埋伏击退！",
      sub:"留在撤离区内完成撤离",
      color:"#6dff9e",
      t:0,
      dur:3
    })
  }
  updateExtraction(a){
    const l=this.player;
    if(l.dead||this.training&&this.tutorialStage<4)return;
    let s=null;
    for(const i of this.extracts)Math.hypot(l.x-i.x,l.y-i.y)<i.r&&(s=i);
    if(s){
      if(this.exZone!==s&&(this.exZone=s,this.exProg=0,this.msg(`开始撤离：${s.name} · 坚守 ${Fs} 秒`,"#6dff9e"),this.training&&this.tutorialStage===4&&!this.tutorialWaveSpawned?(this.tutorialWaveSpawned=!0,this.tutorialStage=5,this.tutorialKills=0,this.spawnHunter("bandit",s.x-150,s.y-90),this.spawnHunter("bandit",s.x-140,s.y+100),this.banner={
        text:"⚠ 撤离点遭伏击！",
        sub:"两名鸭匪已从近处扑来，击退它们",
        color:"#ff8a5c",
        t:0,
        dur:3
      },this.sfx.play("alarm")):!this.training&&!this.exWaves.has(s.id)&&(this.exWaves.add(s.id),this.spawnSquad(s.x,s.y,2+(this.t>150?1:0),520,850)&&this.msg("⚠ 敌人正在逼近撤离点！","#ff8a5c"))),this.training&&this.tutorialStage<6)return;
      const i=Math.floor(this.exProg);
      this.exProg+=a,
      Math.floor(this.exProg)!==i&&this.sfx.beep(660+Math.floor(this.exProg)*110),
      this.exProg>=Fs&&this.finish("extract")
    }else this.exZone&&(this.exZone=null,this.exProg=0,this.msg("撤离中断！","#ff8a5c"))
  }
  updateWaves(){
    const a=this.player;
    if(!a.dead){
      if(this.waveT<=0){
        const l=this.t/Vo;
        this.waveT=56-l*24+Math.random()*10;
        const s=2+(this.t>120?1:0)+(this.t>240?1:0);
        this.spawnSquad(a.x,a.y,s,850,1700)&&(this.msg("⚠ 侦测到敌方小队进入战区","#ff8a5c"),this.sfx.play("alarm"))
      }
      !this.warned60&&Vo-this.t<60&&(this.warned60=!0,this.banner={
        text:"剩余 60 秒",
        sub:"尽快前往撤离点！",
        color:"#ff6b5c",
        t:0,
        dur:2.4
      },this.sfx.play("alarm"))
    }
  }
  updateEnemies(a){
    for(let s=this.enemies.length-1;s>=0;s--){
      const i=this.enemies[s];
      if(i.dead){
        this.enemies.splice(s,1);
        continue
      }
      this.updateEnemy(i,a)
    }
    const l=this.enemies;
    for(let s=0;s<l.length;s++){
      const i=l[s];
      for(let c=s+1;c<l.length;c++){
        const f=l[c],
        d=i.x-f.x,
        m=i.y-f.y,
        b=i.r+f.r;
        if(Math.abs(d)>b||Math.abs(m)>b)continue;
        const p=d*d+m*m;
        if(p<b*b&&p>.01){
          const y=Math.sqrt(p),
          g=(b-y)*.5;
          i.x+=d/y*g,
          i.y+=m/y*g,
          f.x-=d/y*g,
          f.y-=m/y*g
        }
      }
    }
  }
  wander(a,l,s){
    if(a.wanderT-=l,a.wanderT<=0)if(a.wanderT=1.5+Math.random()*3,Math.random()<.35)a.tx=a.x,
    a.ty=a.y;
    else for(let d=0;d<6;d++){
      const m=Math.random()*ne,
      b=40+Math.random()*150,
      p=a.homeX+Math.cos(m)*b,
      y=a.homeY+Math.sin(m)*b;
      if(this.nav.isOpen(p,y)){
        a.tx=p,
        a.ty=y;
        break
      }
    }
    const i=a.tx-a.x,
    c=a.ty-a.y,
    f=Math.hypot(i,c);
    if(f>10){
      const d=a.def.speed*(a.type==="chicken"?.35:.4);
      s.x=i/f*d,
      s.y=c/f*d
    }else s.x=0,
    s.y=0
  }
  flow(a,l,s){
    if(this.nav.dir(a.x,a.y,this.fd))s.x=this.fd.x*l,
    s.y=this.fd.y*l;
    else if(a.def.boss&&Math.hypot(this.player.x-a.x,this.player.y-a.y)>=this.nav.cs*1.5){
      const i=this.nav.nearestOpen(a.x,a.y),
      c=i.x-a.x,
      f=i.y-a.y,
      d=Math.hypot(c,f);
      d>2?(s.x=c/d*l,s.y=f/d*l):(s.x=0,s.y=0)
    }else{
      const i=this.nav.nearestOpen(this.player.x,this.player.y);
      let c=i.x-a.x,
      f=i.y-a.y,
      d=Math.hypot(c,f);
      d<1&&(c=this.player.x-a.x,f=this.player.y-a.y,d=Math.hypot(c,f)||1);
      const m=Math.min(56,d);
      this.nav.isOpen(a.x+c/d*m,a.y+f/d*m)?(s.x=c/d*l,s.y=f/d*l):(s.x=0,s.y=0)
    }
  }
  alertEnemy(a){
    a.state="react",
    a.reactT=a.def.reaction*(.8+Math.random()*.4),
    a.alertT=1.2,
    this.sfx.play(a.type==="chicken"?"cluck":a.def.boss?"honk":"quack",a.x,a.y,.9),
    a.def.boss&&this.engageBoss(a)
  }
  updateEnemy(a,l){
    const s=this.player,
    i=a.def;
    if(a.wave2&&(a.wave2.t-=l,a.wave2.t<=0)){
      const W=a.wave2;
      a.wave2=null;
      if(!a.dead)for(let k=0;k<W.N;k++){
        const an=W.off+(k+.5)/W.N*ne;
        this.bullets.push({
          x:a.x,
          y:a.y,
          ox:a.x,
          oy:a.y,
          vx:Math.cos(an)*W.sp,
          vy:Math.sin(an)*W.sp,
          dmg:W.dm,
          life:950/W.sp,
          from:1,
          pierce:0,
          src:a,
          w:4,
          crit:!1,
          chill:W.col
        })
      }
    }
    a.flash-=l,
    a.atkCd-=l,
    a.alertT-=l,
    a.qT-=l,
    a.hurtT-=l,
    a.kick*=Math.exp(-l*16);
    const c=s.x-a.x,
    f=s.y-a.y,
    d=Math.hypot(c,f)||.001,
    m=Math.atan2(f,c),
    b=this.dv;
    b.x=0,
    b.y=0;
    let p=null;
    if(a.stunT=Math.max(0,a.stunT-l),a.stunT>0)a.canSee=!1,
    a.visA*=.88,
    p=m+Math.sin(this.realT*17+a.id)*.9,
    a.state==="engage"&&(a.state="hunt",a.huntT=Math.max(a.huntT,2.5)),
    a.special&&a.special!=="stun"&&(a.special=null,a.castSkill=null);
    else if(i.thrower&&(a.nadeCd-=l,a.nadeCd<=0&&a.canSee&&d<560&&!s.dead&&this.mode==="raid"&&(a.nadeCd=3.2+Math.random()*1.8,this.enemyThrowEgg(a,s.x,s.y))),this.mode==="demo")a.vis=!0,
    a.visA=1,
    this.wander(a,l,b);
    else{
      if(a.losT-=l,a.losT<=0){
        a.losT=.09+Math.random()*.07,
        a.los=d<1150&&!this.segmentInSmoke(a.x,a.y,s.x,s.y)&&this.grid.los(a.x,a.y,s.x,s.y,Xt),
        a.vis=a.los&&d<1100;
        let g=a.los&&!s.dead&&d<i.vision;
        g&&a.state==="idle"&&d>140&&Math.abs(Wn(a.aim,m))>1.9&&(g=!1),
        a.canSee=g
      }
      if(a.visA+=((a.vis?1:0)-a.visA)*Math.min(1,l*10),s.dead&&a.state!=="idle"&&(a.state="idle",a.homeX=a.x,a.homeY=a.y),a.special)this.updateSpecial(a,l,d,m),
      p=a.special==="charge"||a.special==="stun"?null:a.special==="chargeWind"&&i.encounter?Math.atan2(a.cdy,a.cdx):m;
      else switch(a.state){
        case"idle":this.wander(a,l,b),
        a.canSee&&this.alertEnemy(a);
        break;
        case"react":p=m,
        a.reactT-=l,
        a.reactT<=0&&(a.state="engage",a.lostT=0);
        break;
        case"search":case"hunt":a.huntT-=l,
        a.canSee?a.state==="search"?(this.alertEnemy(a),a.reactT*=.6):(a.state="engage",a.lostT=0,a.alertT=1,this.sfx.play("quack",a.x,a.y,.8)):a.huntT<=0||a.def.boss&&Math.hypot(a.x-a.homeX,a.y-a.homeY)>650?(a.state="idle",a.def.boss||(a.homeX=a.x,a.homeY=a.y),a.tx=a.homeX,a.ty=a.homeY,a.wanderT=4):this.flow(a,i.speed*(a.state==="hunt"?.95:.75),b);
        break;
        case"engage":{
          if(a.canSee?(a.lastX=s.x,a.lastY=s.y,a.lostT=0):a.lostT+=l,a.lostT>2.2){
            a.state="hunt",
            a.huntT=a.def.boss?5:10,
            a.qT=1.5;
            break
          }
          if(p=a.canSee?m:Math.atan2(a.lastY-a.y,a.lastX-a.x),a.type==="chicken")a.canSee||d<70?(b.x=c/d*i.speed,b.y=f/d*i.speed):this.flow(a,i.speed,b),
          d<a.r+s.r+7&&a.atkCd<=0&&!s.dead&&(this.damagePlayer(i.melee,a.x,a.y),a.atkCd=.7,a.kvx-=c/d*160,a.kvy-=f/d*160,this.sfx.play("peck",a.x,a.y));
          else{
            if(!a.canSee)this.flow(a,i.speed*.9,b);
            else{
              a.strafeT-=l,
              a.strafeT<=0&&(a.strafe=-a.strafe,a.strafeT=.7+Math.random()*1.1);
              const g=c/d,
              v=f/d;
              let S=0,
              T=0;
              const H=a.weapon&&a.weapon.pellets>1?200:i.prefMax,
              B=a.weapon&&a.weapon.pellets>1?90:i.prefMin;
              d>H?(S+=g,T+=v):d<B&&(S-=g,T-=v),
              S+=-v*a.strafe*.8,
              T+=g*a.strafe*.8;
              const Q=Math.hypot(S,T)||1;
              b.x=S/Q*i.speed*.8,
              b.y=T/Q*i.speed*.8
            }
            this.enemyShoot(a,l,d,m),
            a.def.boss&&this.prepareBossSkill(a,l,d,m)
          }
          break
        }
      }
    }
    if(p!==null?a.aim=No(a.aim,p,l*(a.state==="engage"?6.5:5)):Math.abs(b.x)+Math.abs(b.y)>5&&a.special!=="charge"&&(a.aim=No(a.aim,Math.atan2(b.y,b.x),l*6)),a.special==="charge")a.vx=a.cdx*640,
    a.vy=a.cdy*640;
    else{
      const g=Math.min(1,l*8);
      a.vx+=(b.x-a.vx)*g,
      a.vy+=(b.y-a.vy)*g
    }
    if(a.chillT>0){
      a.chillT-=l;
      const g=.42;
      a.vx*=g,
      a.vy*=g
    }
    if(a.suppressT>0){
      a.suppressT-=l,
      a.vx*=.72,
      a.vy*=.72
    }
    a.x+=(a.vx+a.kvx)*l,
    a.y+=(a.vy+a.kvy)*l,
    a.kvx*=Math.exp(-l*9),
    a.kvy*=Math.exp(-l*9);
    const y=this.grid.resolve(a,a.r,bt);
    a.x=oa(a.x,a.r,this.map.w-a.r),
    a.y=oa(a.y,a.r,this.map.h-a.r),
    y&&a.special==="charge"&&(a.special="stun",a.specialT=1.5,a.castSkill=null,a.castCount++,a.chargeCd=a.def.encounter?.phases[a.skillPhase].cooldown??9,this.addTrauma(Math.max(0,.6-d/1500)),this.sfx.play("stun",a.x,a.y),this.puff(a.x+a.cdx*20,a.y+a.cdy*20,8,"rgba(200,190,170,0.6)",10,120),this.text(a.x,a.y-40,"晕眩!","#ffd23f",18,!0)),
    a.walk+=Math.hypot(a.vx,a.vy)*l*.06
  }
  prepareBossSkill(a,l,s,i){
    if(a.honkCd-=l,a.chargeCd-=l,!a.canSee||a.special)return;
    const c=a.def.encounter,
    f=c?.phases[a.phase],
    d=c?.skillCycle?.[a.castCount%c.skillCycle.length]??c?.skill??"slam",
    m=d==="charge"&&a.chargeCd<=0&&s<=140?"slam":d;
    if(a.castSkill=m,["barrage","spiral","eggrain","blink","fortify","magma","strafe","napalm","scan","icewall","mines"].includes(m)){
      if(!(a.honkCd<=0&&s<900)){
        a.castSkill=null;
        return
      }
      this.bossPrep(a,m,f)
    }else if(m==="summon")if(a.honkCd<=0)a.special="summonWind",
    a.specialT=f?.windup??.9;
    else return;
    else if(m!=="charge"&&a.honkCd<=0&&s<(f?.range??290))a.special="honkWind",
    a.specialT=f?.windup??.6;
    else if(m==="charge"&&a.chargeCd<=0&&s>140&&s<(f?.range??560))a.special="chargeWind",
    a.specialT=f?.windup??.75,
    a.cdx=Math.cos(i),
    a.cdy=Math.sin(i);
    else{
      a.castSkill=null;
      return
    }
    a.skillPhase=a.phase
  }
  updateSpecial(a,l,s,i){
    const c=this.player,
    f=a.def.encounter?.phases[a.skillPhase];
    switch(a.specialT-=l,a.special){
      case"honkWind":a.specialT<=0&&(this.honk(a,s),a.special=null,a.castSkill=null,a.castCount++,a.honkCd=f?.cooldown??7+Math.random()*3);
      break;
      case"summonWind":a.specialT<=0&&(this.summonMinions(a,a.skillPhase),a.special=null,a.castSkill=null,a.castCount++,a.honkCd=f?.cooldown??9);
      break;
      case"chargeWind":f||(a.cdx=Math.cos(i),a.cdy=Math.sin(i)),
      a.specialT<=0&&(a.special="charge",a.specialT=f?f.range/640:.6,this.sfx.play("honk",a.x,a.y,.7));
      break;
      case"charge":{
        Math.random()<.7&&this.puff(a.x-a.cdx*20,a.y-a.cdy*20+8,1,"rgba(214,196,160,0.5)",8,30,.5);
        const d=s<a.r+c.r+6&&!c.dead;
        d&&(this.damagePlayer(f?.damage??30,a.x,a.y),c.rollT<=0&&(c.kvx+=a.cdx*750,c.kvy+=a.cdy*750,this.addTrauma(.5))),
        (d||a.specialT<=0)&&(a.special=null,a.castSkill=null,a.castCount++,a.chargeCd=f?.cooldown??9);
        break
      }
      case"stun":if(Math.random()<.15){
        const d=this.P(Yl,a.x+pe(-14,14),a.y-30,pe(-30,30),-30,.6,3.5,"#ffd23f");
        d&&(d.vr=6)
      }
      a.specialT<=0&&(a.special=null);
      break;
      case"newWind":a.specialT<=0&&(this.bossNew(a,a.castSkill,f),a.special=null,a.castSkill=null,a.castCount++,a.honkCd=f?.cooldown??8);
      break;
      default:a.special=null
    }
  }
  bossPrep(a,m,f){
    const p=this.player,
    L=a.def.encounter,
    col=L?.ringColor??"#ffb37a";
    a.special="newWind",
    a.specialT=(f?.windup??1)+(m==="barrage"||m==="eggrain"?.25:0),
    a.marks=[];
    const n={
      barrage:a.phase?6:4,
      eggrain:a.phase?4:3,
      magma:a.phase?3:2
    }
    [m]||0;
    if(m==="strafe"||m==="napalm"){
      const lines=m==="strafe"&&a.phase?2:1;
      a.lines=[];
      for(let k=0;k<lines;k++){
        const an=Math.atan2(p.y-a.y,p.x-a.x)+(k?Math.PI/2:0)+(Math.random()-.5)*.3,
        L=1300;
        a.lines.push({
          x0:p.x-Math.cos(an)*L/2,
          y0:p.y-Math.sin(an)*L/2,
          x1:p.x+Math.cos(an)*L/2,
          y1:p.y+Math.sin(an)*L/2,
          w:m==="strafe"?70:60
        })
      }
    }
    if(m==="scan"){
      a.scanA=Math.atan2(p.y-a.y,p.x-a.x)-1.2,
      a.scanR=f?.range??900
    }
    if(m==="icewall"){
      const an=Math.atan2(p.y-a.y,p.x-a.x)+Math.PI/2,
      cx=(a.x+p.x)/2,
      cy=(a.y+p.y)/2,
      L=a.phase?420:300;
      a.lines=[{
        x0:cx-Math.cos(an)*L/2,
        y0:cy-Math.sin(an)*L/2,
        x1:cx+Math.cos(an)*L/2,
        y1:cy+Math.sin(an)*L/2,
        w:30,
        wall:1
      }]
    }
    if(m==="mines")for(let k=0;k<(a.phase?7:5);k++){
      const an=Math.random()*ne,
      d=60+Math.random()*260;
      a.marks.push({
        x:p.x+Math.cos(an)*d,
        y:p.y+Math.sin(an)*d,
        mine:1
      })
    }
    if(m==="blink"){
      const dx=p.x-a.x,
      dy=p.y-a.y,
      D=Math.hypot(dx,dy)||1;
      for(const r of[150,110,190]){
        const X=p.x+dx/D*r,
        Y=p.y+dy/D*r;
        if(this.nav.isOpen(X,Y)){
          a.blinkTo={
            x:X,
            y:Y
          };
          a.marks.push({
            x:X,
            y:Y,
            blink:!0
          });
          break
        }
      }
    }
    for(let k=0;k<n;k++){
      const ang=Math.random()*ne,
      d=k===0?0:70+Math.random()*130;
      a.marks.push({
        x:p.x+Math.cos(ang)*d+p.vx*.35,
        y:p.y+Math.sin(ang)*d+p.vy*.35
      })
    }
    this.text(a.x,a.y-54,L?.skillLabels?.[m]??"首领技能",col,22,!0),
    this.sfx.play("alarm",a.x,a.y,.6)
  }
  bossNew(a,m,f){
    const p=this.player,
    L=a.def.encounter,
    dm=f?.damage??20;
    switch(m){
      case"barrage":a.marks.forEach((q,k)=>this.booms.push({
        x:q.x,
        y:q.y,
        t:.05+k*.09,
        r:95,
        dmg:dm*2.2,
        hostile:!0
      })),
      this.addTrauma(.35);
      break;
      case"eggrain":a.marks.forEach(q=>this.enemyThrowEgg(a,q.x,q.y));
      break;
      case"magma":a.marks.forEach(q=>{
        this.fires.push({
          x:q.x,
          y:q.y,
          r:105,
          t:0,
          dur:a.phase?6:4.5,
          tick:0,
          hostile:!0
        });
        this.puff(q.x,q.y,6,"rgba(255,120,40,0.5)",10,90)
      }),
      this.sfx.play("explosion",a.x,a.y,.4);
      break;
      case"spiral":{
        const N=a.phase?28:18,
        sp=a.type==="goose"?330:400,
        off=Math.random()*ne,
        col=a.type==="frostMarshal";
        for(let k=0;k<N;k++){
          const an=off+k/N*ne;
          this.bullets.push({
            x:a.x,
            y:a.y,
            ox:a.x,
            oy:a.y,
            vx:Math.cos(an)*sp,
            vy:Math.sin(an)*sp,
            dmg:dm*.55,
            life:950/sp,
            from:1,
            pierce:0,
            src:a,
            w:4,
            crit:!1,
            chill:col
          })
        }
        a.phase&&(a.wave2={
          t:.38,
          off:off,
          N:N,
          sp:sp,
          dm:dm*.55,
          col:col
        }),
        this.sfx.play("honk",a.x,a.y,1.1);
        break
      }
      case"blink":{
        if(a.blinkTo){
          const q=a.blinkTo;
          a.blinkTo=null;
          this.puff(a.x,a.y,10,"rgba(200,240,255,0.6)",12,120),
          a.x=q.x,
          a.y=q.y,
          this.puff(a.x,a.y,10,"rgba(200,240,255,0.6)",12,120),
          this.lights.push({
            x:q.x,
            y:q.y,
            r:220,
            color:"#9fe6ff",
            life:.4,
            max:.4
          }),
          a.castSkill="pulse",
          this.honk(a,Math.hypot(p.x-a.x,p.y-a.y));
          break
        }
        const dx=p.x-a.x,
        dy=p.y-a.y,
        D=Math.hypot(dx,dy)||1;
        let X=null,
        Y=null;
        for(const r of[150,110,190])if(this.nav.isOpen(p.x+dx/D*r,p.y+dy/D*r)){
          X=p.x+dx/D*r,
          Y=p.y+dy/D*r;
          break
        }
        if(X===null)break;
        this.puff(a.x,a.y,10,"rgba(200,240,255,0.6)",12,120),
        a.x=X,
        a.y=Y,
        this.puff(a.x,a.y,10,"rgba(200,240,255,0.6)",12,120),
        this.lights.push({
          x:X,
          y:Y,
          r:220,
          color:"#9fe6ff",
          life:.4,
          max:.4
        }),
        a.castSkill="pulse",
        this.honk(a,Math.hypot(p.x-a.x,p.y-a.y));
        break
      }
      case"strafe":{
        for(const L of a.lines||[]){
          const n=Math.hypot(L.x1-L.x0,L.y1-L.y0)/40;
          for(let k=0;k<=n;k++){
            const t=k/n,
            x=L.x0+(L.x1-L.x0)*t,
            y=L.y0+(L.y1-L.y0)*t;
            this.booms.push({
              x,
              y,
              t:.04+t*.55,
              r:L.w*.75,
              dmg:dm*.9,
              hostile:!0
            })
          }
        }
        this.sfx.play("lmg",a.x,a.y,1.2),
        this.addTrauma(.45),
        this.text(a.x,a.y-56,"僚机扫射！","#ffb03a",22,!0);
        break
      }
      case"napalm":{
        for(const L of a.lines||[]){
          const n=Math.ceil(Math.hypot(L.x1-L.x0,L.y1-L.y0)/110);
          for(let k=0;k<=n;k++){
            const t=k/n;
            this.fires.push({
              x:L.x0+(L.x1-L.x0)*t,
              y:L.y0+(L.y1-L.y0)*t,
              r:70,
              t:-t*.5,
              dur:a.phase?7:5,
              tick:0,
              hostile:!0
            })
          }
        }
        this.sfx.play("explosion",a.x,a.y,.6);
        break
      }
      case"scan":{
        const A=Math.atan2(p.y-a.y,p.x-a.x),
        D=Math.hypot(p.x-a.x,p.y-a.y);
        if(D<(a.scanR??900)&&this.grid.los(a.x,a.y,p.x,p.y,Xt)){
          this.text(p.x,p.y-40,"被雷达锁定！","#4ad1ff",20,!0);
          for(let k=0;k<(a.phase?3:2);k++){
            const sp=1600;
            this.bullets.push({
              x:a.x,
              y:a.y,
              ox:a.x,
              oy:a.y,
              vx:Math.cos(A+(k-.5)*.03)*sp,
              vy:Math.sin(A+(k-.5)*.03)*sp,
              dmg:dm*1.3,
              life:1100/sp,
              from:1,
              pierce:0,
              src:a,
              w:3.4,
              crit:!1,
              chill:!0
            })
          }
          this.sfx.play("sniper",a.x,a.y,1)
        }else this.text(a.x,a.y-56,"失去目标","#9cc8ff",16);
        break
      }
      case"icewall":{
        for(const L of a.lines||[]){
          const n=Math.ceil(Math.hypot(L.x1-L.x0,L.y1-L.y0)/34);
          for(let k=0;k<=n;k++){
            const t=k/n,
            x=L.x0+(L.x1-L.x0)*t,
            y=L.y0+(L.y1-L.y0)*t;
            if(Math.hypot(x-p.x,y-p.y)<30)continue;
            const s={
              id:6e5+(Math.random()*1e5|0),
              t:1,
              x,
              y,
              w:0,
              h:0,
              r:16,
              f:bt|pa|Xt,
              kind:"icewall",
              v:0,
              stamp:0,
              dead:!1,
              hp:60,
              life:a.phase?10:8
            };
            this.icewalls??=[],
            this.icewalls.push(s),
            this.grid.add?.(s),
            this.nav.mark(x,y,16,!0)
          }
        }
        this.sfx.play("shield",a.x,a.y,1),
        this.text(a.x,a.y-56,"冰墙封锁！","#9fe6ff",20,!0);
        break
      }
      case"mines":{
        this.mines??=[];
        for(const q of a.marks)q.mine&&this.mines.push({
          x:q.x,
          y:q.y,
          t:0,
          arm:.8,
          r:70
        });
        this.text(a.x,a.y-56,"冰霜地雷！","#9fe6ff",20,!0);
        break
      }
      case"fortify":{
        const g=a.armorMax*(a.phase?.45:.3);
        a.armor=Math.min(a.armorMax,a.armor+g),
        this.text(a.x,a.y-56,"护甲回复！","#9cc8ff",22,!0),
        this.sfx.play("shield",a.x,a.y),
        this.lights.push({
          x:a.x,
          y:a.y,
          r:180,
          color:"#9cc8ff",
          life:.5,
          max:.5
        });
        break
      }
    }
    a.marks=[],
    a.lines=null
  }
  honk(a,l){
    const s=this.player,
    i=a.def.encounter,
    c=this.bossSkill(a),
    f=i?.phases[a.skillPhase],
    d=f?.range??290;
    this.sfx.play("honk",a.x,a.y,1.3);
    const m=i?.ringColor??(c==="pulse"?"rgba(255,120,40,0.95)":"rgba(240,225,190,0.95)");
    for(let b=0;b<3;b++){
      const p=this.P(Js,a.x,a.y,0,0,.45+b*.12,20,b===0?m:"rgba(255,255,255,0.6)");
      p&&(p.grow=d*2-b*90)
    }
    if(c==="slam"){
      if(this.text(a.x,a.y-46,i?.hitText??"震地践踏！","#ffe9a8",26,!0),this.addTrauma(Math.max(0,.7-l/1500)),l<d&&!s.dead&&s.rollT<=0){
        const p=(s.x-a.x)/(l||1),
        y=(s.y-a.y)/(l||1);
        this.damagePlayer(f?.damage??18,a.x,a.y),
        s.kvx+=p*760,
        s.kvy+=y*760
      }
      const b=a.skillPhase===1?12:8;
      for(const p of this.enemies)p!==a&&p.state==="idle"&&Math.hypot(p.x-a.x,p.y-a.y)<950&&(p.state="hunt",p.huntT=b,p.qT=1.4);
      this.msg(`⚠ ${a.def.name}震地！附近鸭匪被唤醒`,"#ffd98a");
      return
    }
    this.text(a.x,a.y-46,i?.hitText??"炉心热浪！",i?.ringColor??"#ff8a1e",26,!0),
    this.addTrauma(Math.max(0,.65-l/1400)),
    l<d&&this.grid.los(a.x,a.y,s.x,s.y,Xt)&&(this.damagePlayer(f?.damage??24,a.x,a.y),a.type==="frostMarshal"&&!s.dead&&s.rollT<=0&&(s.chillT=Math.max(s.chillT,a.skillPhase===1?2.4:1.8),this.text(s.x,s.y-34,"寒潮减速！","#9fe6ff",18,!0)),s.rollT<=0&&!s.dead&&(s.kvx+=(s.x-a.x)/l*680,s.kvy+=(s.y-a.y)/l*680))
  }
  summonMinions(a,l){
    const s=a.def.encounter?.summon;
    if(!s)return;
    const i=s.counts[l];
    if(this.enemies.length>26){
      this.msg(`${a.def.name}的增援已达上限`,"#b4ff8c");
      return
    }
    this.text(a.x,a.y-52,a.def.encounter?.summonText??"召集护卫！",a.def.encounter?.ringColor??"#b4ff8c",24,!0),
    this.sfx.play("alarm");
    for(let c=0;c<i&&this.enemies.length<34;c++){
      const f=s.types[c%s.types.length],
      d=Math.random()*ne,
      m=95+Math.random()*150,
      b=this.spawnEnemy(f,a.x+Math.cos(d)*m,a.y+Math.sin(d)*m,"hunt");
      b.huntT=22,
      b.alertT=1,
      b.lastX=this.player.x,
      b.lastY=this.player.y;
      const p=this.P(xl,b.x,b.y,0,0,.4,10,"#d7f5b4");
      p&&(p.grow=46)
    }
    this.msg(`⚠ ${a.def.name}召来 ${i} 名增援`,"#ffd98a")
  }
  enemyShoot(a,l,s,i){
    const c=a.weapon;
    if(!c)return;
    const f=this.player;
    if(a.cd-=l,a.reloadT>0){
      a.reloadT-=l,
      a.reloadT<=0&&(a.ammo=c.mag);
      return
    }
    if(!a.canSee||f.dead||s>c.range*.9+60||Math.abs(Wn(a.aim,i))>.35)return;
    if(a.burst<=0){
      a.burstPause-=l,
      a.burstPause<=0&&(a.burst=c.pellets>1?1:Sa(a.def.burst[0],a.def.burst[1]));
      return
    }
    if(a.cd>0)return;
    a.cd=1/(c.rate*(a.type==="goose"?.7:.5)),
    a.ammo--,
    a.burst--,
    a.burst<=0&&(a.burstPause=(c.pellets>1?.9:.5)+Math.random()*.6),
    a.ammo<=0&&(a.reloadT=c.reload*1.4,a.burst=0);
    const d=Math.cos(a.aim),
    m=Math.sin(a.aim),
    b=a.r*.6+c.len+4,
    p=a.r*.3+2.5,
    y=a.x+d*b-m*p,
    g=a.y+m*b+d*p;
    if(this.grid.raycast(a.x,a.y,y,g,pa,this.hit))return;
    const v=a.def.accuracy*(Math.hypot(f.vx,f.vy)>100?1.25:1),
    S=a.def.bulletSpeed*(c.id==="sniper"?1.6:1);
    for(let T=0;T<c.pellets;T++){
      const H=a.aim+Sy()*v+(c.pellets>1?(Math.random()-.5)*c.spread*2:0);
      this.bullets.push({
        x:y,
        y:g,
        ox:y,
        oy:g,
        vx:Math.cos(H)*S,
        vy:Math.sin(H)*S,
        dmg:c.dmg*a.def.dmgMul,
        life:c.range*.95/S,
        from:1,
        pierce:0,
        src:a,
        w:2.4,
        crit:!1,
        chill:a.type==="frostMarshal"
      })
    }
    if(a.kick=c.kick*.8,a.visA>.05||s<900){
      this.lights.push({
        x:y,
        y:g,
        r:70,
        color:"#ff9a5a",
        life:.06,
        max:.06
      });
      const T=this.P(ai,y,g,0,0,.05,8+c.kick,"#ffb38a");
      T&&(T.rot=a.aim)
    }
    this.sfx.play("eshot",a.x,a.y,c.pellets>1?1.2:.9)
  }
  updateBullets(a){
    const l=this.player,
    s=this.bullets;
    for(let i=s.length-1;i>=0;i--){
      const c=s[i];
      c.from===0&&this.input.touchMode&&this.bulletMagnetism(c);
      const f=c.vx*a,
      d=c.vy*a;
      let m=2,
      b=null,
      p=0,
      y=0;
      this.grid.raycast(c.x,c.y,c.x+f,c.y+d,pa,this.hit)&&(m=this.hit.t,b=this.hit.s,p=this.hit.nx,y=this.hit.ny);
      let g=2,
      v=null,
      S=!1;
      if(c.from===0)for(const T of this.enemies){
        if(T.dead||c.hitIds?.includes(T.id))continue;
        const H=Lo(c.x,c.y,f,d,T.x,T.y,T.r+2);
        H>=0&&H<g&&(g=H,v=T)
      }else if(!l.dead){
        const T=Lo(c.x,c.y,f,d,l.x,l.y,l.r+1);
        T>=0&&(g=T,S=!0)
      }
      if((v||S)&&g<m){
        const T=c.x+f*g,
        H=c.y+d*g,
        B=Math.hypot(c.vx,c.vy)||1,
        Q=c.vx/B,
        se=c.vy/B;
        if(v){
          let hitDmg=c.dmg;
          if(c.shotgun){
            const tr=Math.hypot(T-c.ox,H-c.oy);
            tr<=260?hitDmg*=1.35:tr>=430&&(hitDmg*=.8)
          }
          if(this.damageEnemy(v,hitDmg,Q,se,c.crit,T,H,!1,c.from===0?c.antiArmor??0:0),this.stats.hits++,c.suppress&&!v.dead&&(v.suppressT<=0&&this.text(T,H-24,"压制!","#ffd166",12),v.suppressT=Math.max(v.suppressT,c.combo==="hold"?1.2:.8)),c.chill){
            v.chillT=2.4,
            this.text(T,H-22,"冰缓!","#9fe6ff",13);
            for(let ie=0;ie<6;ie++){
              const ce=Math.random()*ne,
              fe=pe(30,120),
              J=this.P(ti,T,H,Math.cos(ce)*fe,Math.sin(ce)*fe,pe(.3,.6),pe(1.5,3),"#8fdcff");
              J&&(J.drag=3)
            }
          }
          if(c.explosive){
            this.booms.push({
              x:T,
              y:H,
              t:.02,
              r:c.blastR??165,
              dmg:c.blastDmg??115
            }),
            s[i]=s[s.length-1],
            s.pop();
            continue
          }
          if(c.pierce>0){
            c.pierce--,
            (c.hitIds??=[]).push(v.id),
            c.x=T+Q*2,
            c.y=H+se*2,
            c.dmg*=.75;
            continue
          }
        }else{
          if(l.rollT>0){
            this.damagePlayer(c.dmg,c.x,c.y),
            c.x+=f,
            c.y+=d,
            c.life-=a,
            c.life<=0&&(s[i]=s[s.length-1],s.pop());
            continue
          }
          this.damagePlayer(c.dmg,c.src?c.src.x:c.x-Q*100,c.src?c.src.y:c.y-se*100),
          c.chill&&!l.dead&&(l.chillT=Math.max(l.chillT,1.5),this.text(l.x,l.y-32,"冰弹减速！","#9fe6ff",16,!0))
        }
        s[i]=s[s.length-1],
        s.pop();
        continue
      }
      if(b){
        const T=c.x+f*m,
        H=c.y+d*m;
        if(this.impact(T,H,p,y,b),c.explosive){
          this.booms.push({
            x:T,
            y:H,
            t:.02,
            r:c.blastR??165,
            dmg:c.blastDmg??115
          }),
          b.kind==="barrel"&&!b.dead&&(b.dead=!0,this.booms.push({
            x:b.x,
            y:b.y,
            t:.1,
            r:150,
            dmg:130
          })),
          b.kind==="woodcrate"&&!b.dead&&this.hitCrate(b,999),
          s[i]=s[s.length-1],
          s.pop();
          continue
        }
        b.kind==="barrel"&&!b.dead&&(b.hp-=c.dmg,b.hp<=0&&(b.dead=!0,this.booms.push({
          x:b.x,
          y:b.y,
          t:.03,
          r:150,
          dmg:130
        }))),
        b.kind==="woodcrate"&&!b.dead&&this.hitCrate(b,c.dmg),
        b.kind==="icewall"&&!b.dead&&(b.hp-=c.dmg,b.hp<=0&&(b.dead=!0,this.puff(b.x,b.y,4,"rgba(220,245,255,0.7)",8,60))),
        s[i]=s[s.length-1],
        s.pop();
        continue
      }
      c.x+=f,
      c.y+=d,
      c.life-=a,
      c.life<=0&&(c.explosive&&this.booms.push({
        x:c.x,
        y:c.y,
        t:.02,
        r:c.blastR??165,
        dmg:c.blastDmg??115
      }),s[i]=s[s.length-1],s.pop())
    }
  }
  updateGrenades(a){
    const l=this.grenades;
    for(let s=l.length-1;s>=0;s--){
      const i=l[s];
      if(i.fuse-=a,i.spin+=a*12,i.vz-=900*a,i.z+=i.vz*a,i.z<=0&&(i.z=0,i.vz<-80?(i.vz=-i.vz*.35,i.vx*=.7,i.vy*=.7,this.sfx.play("bounce",i.x,i.y)):i.vz=0),i.z===0){
        const d=Math.exp(-a*4);
        i.vx*=d,
        i.vy*=d
      }
      const c=i.x+i.vx*a,
      f=i.y+i.vy*a;
      if(this.grid.raycast(i.x,i.y,c,f,pa,this.hit)){
        const d=this.hit;
        i.x+=i.vx*a*d.t*.8,
        i.y+=i.vy*a*d.t*.8;
        const m=i.vx*d.nx+i.vy*d.ny;
        i.vx=(i.vx-2*m*d.nx)*.5,
        i.vy=(i.vy-2*m*d.ny)*.5,
        this.sfx.play("bounce",i.x,i.y)
      }else i.x=c,
      i.y=f;
      i.fuse<=0&&(this.resolveThrowable(i),l.splice(s,1))
    }
  }
  segmentInSmoke(a,l,s,i){
    const c=s-a,
    f=i-l;
    for(const d of this.smokes)if(!(d.t<.25)&&Lo(a,l,c,f,d.x,d.y,d.r*.85)>=0)return!0;
    return!1
  }
  resolveThrowable(a){
    const l=qt[a.kind];
    if(a.egg){
      this.explode(a.x,a.y,118,60,!0);
      return
    }
    switch(a.kind){
      case"grenade":this.explode(a.x,a.y,l.radius,l.damage);
      break;
      case"smoke":{
        this.smokes.push({
          x:a.x,
          y:a.y,
          r:l.radius,
          t:0,
          dur:9,
          pulse:Math.random()*6
        });
        for(let s=0;s<18;s++){
          const i=Math.random()*ne,
          c=Math.random()*l.radius*.6,
          f=this.P(xl,a.x+Math.cos(i)*c,a.y+Math.sin(i)*c,pe(-25,25),pe(-25,25),pe(.6,1.6),pe(18,34),"rgba(188,199,204,0.36)");
          f&&(f.grow=42)
        }
        this.text(a.x,a.y-34,"烟雾展开！",l.color,18,!0),
        this.sfx.play("throw",a.x,a.y,.6);
        break
      }
      case"flash":{
        let s=0;
        for(const i of this.enemies)if(!(i.dead||Math.hypot(i.x-a.x,i.y-a.y)>l.radius+i.r||!this.grid.los(a.x,a.y,i.x,i.y,Xt))){
          i.stunT=2.6,
          s++,
          this.text(i.x,i.y-40,"目眩!","#fff3b0",18,!0);
          for(let f=0;f<8;f++){
            const d=this.P(Yl,i.x+pe(-12,12),i.y-26+pe(-8,8),pe(-40,40),pe(-70,-20),pe(.5,1),3+Math.random()*2,"#fff6b0");
            d&&(d.vr=5)
          }
        }
        this.lights.push({
          x:a.x,
          y:a.y,
          r:l.radius*2.4,
          color:"#fffbe0",
          life:.35,
          max:.35
        }),
        this.msg(s?`闪光命中 ${s} 个目标，目眩 2.6 秒`:"闪光弹未命中目标",l.color),
        this.sfx.play("explosion",a.x,a.y,.45);
        break
      }
      case"fire":{
        this.fires.push({
          x:a.x,
          y:a.y,
          r:l.radius,
          t:0,
          dur:6,
          tick:0
        }),
        this.msg("燃烧区域形成，靠近会被灼烧",l.color),
        this.sfx.play("explosion",a.x,a.y,.35);
        break
      }
    }
  }
  updateSmokes(a){
    for(let l=this.smokes.length-1;l>=0;l--){
      const s=this.smokes[l];
      if(s.t+=a,s.pulse+=a,Math.random()<a*14){
        const i=Math.random()*ne,
        c=Math.random()*s.r*.8,
        f=this.P(xl,s.x+Math.cos(i)*c,s.y+Math.sin(i)*c,pe(-18,18),pe(-18,18),pe(1.2,2.4),pe(16,30),"rgba(190,200,205,0.28)");
        f&&(f.grow=36)
      }
      s.t>=s.dur&&this.smokes.splice(l,1)
    }
  }
  updateFires(a){
    const l=this.player;
    for(const w of this.icewalls||[])!w.dead&&(w.life-=a,w.life<=0&&(w.dead=!0,this.puff(w.x,w.y,3,"rgba(220,245,255,0.6)",8,40)));
    if(this.icewalls?.some(w=>w.dead)){
      for(const w of this.icewalls)w.dead&&this.nav.mark(w.x,w.y,16,!1);
      this.icewalls=this.icewalls.filter(w=>!w.dead);
      this.navT=0
    }
    for(let k=(this.mines||[]).length-1;k>=0;k--){
      const M=this.mines[k];
      M.t+=a;
      if(M.t<M.arm)continue;
      const hit=!l.dead&&Math.hypot(l.x-M.x,l.y-M.y)<l.r+16;
      if(hit||M.t>14){
        this.mines.splice(k,1);
        if(hit){
          this.damagePlayer(22,M.x,M.y),
          l.chillT=Math.max(l.chillT,2.2),
          this.text(l.x,l.y-34,"冰霜地雷！","#9fe6ff",18,!0)
        }
        this.puff(M.x,M.y,8,"rgba(200,240,255,0.7)",12,110),
        this.sfx.play("shield",M.x,M.y,.8)
      }
    }
    for(const h of this.map.hazards||[]){
      h.tick-=a,
      h.fx-=a;
      const D=Math.hypot(l.x-h.x,l.y-h.y)<h.r+l.r&&!l.dead&&this.mode==="raid";
      if(h.fx<=0){
        h.fx=h.type==="snow"?.5:.12;
        const c=Math.random()*ne,
        f=Math.random()*h.r*.8;
        if(h.type==="heat"){
          const d=this.P(Un,h.x+Math.cos(c)*f,h.y+Math.sin(c)*f,pe(-10,10),pe(-40,-15),pe(.4,.8),pe(6,12),Math.random()<.5?"#ff8a3c":"#ffd166");
          d&&(d.grow=-8)
        }else if(h.type==="spore"){
          const d=this.P(xl,h.x+Math.cos(c)*f,h.y+Math.sin(c)*f,pe(-8,8),pe(-14,-4),pe(1,1.8),pe(8,14),"rgba(180,255,120,0.22)");
          d&&(d.grow=20)
        }else{
          const d=this.P(xl,h.x+Math.cos(c)*f,h.y+Math.sin(c)*f,pe(-12,12),pe(-6,6),pe(.8,1.4),pe(6,10),"rgba(235,245,255,0.35)");
          d&&(d.grow=10)
        }
      }
      if(h.type==="snow"){
        D&&(l.chillT=Math.max(l.chillT,.25));
        continue
      }
      if(h.tick<=0){
        h.tick=.5;
        if(h.type==="heat"){
          for(const f of this.enemies)f.dead||f.def.boss||Math.hypot(f.x-h.x,f.y-h.y)>h.r+f.r||this.damageEnemy(f,8,f.x-h.x,f.y-h.y,!1,f.x,f.y-10,!0);
          D&&(this.damagePlayer(6,h.x,h.y),h.warn||(h.warn=1,this.msg("⚠ 炉口高温：站在通风口旁会持续掉血，可以把敌人引过来","#ff8a3c")))
        }else if(D){
          this.damagePlayer(3,h.x,h.y),
          l.chillT=Math.max(l.chillT,.6);
          h.warn||(h.warn=1,this.msg("⚠ 腐叶孢子：减速并缓慢中毒","#b4ff8c"))
        }
      }
    }
    for(let s=this.fires.length-1;s>=0;s--){
      const i=this.fires[s];
      if(i.t+=a,i.tick-=a,Math.random()<a*30){
        const c=Math.random()*ne,
        f=Math.random()*i.r,
        d=this.P(Un,i.x+Math.cos(c)*f,i.y+Math.sin(c)*f,pe(-20,20),pe(-20,20),pe(.3,.7),pe(8,18),Math.random()<.5?"#ff8a3c":"#ffd166");
        d&&(d.grow=-12)
      }
      if(i.tick<=0){
        i.tick=.5;
        const c=qt.fire.damage;
        if(!i.hostile)for(const f of this.enemies)f.dead||Math.hypot(f.x-i.x,f.y-i.y)>i.r+f.r||this.damageEnemy(f,c,f.x-i.x,f.y-i.y,!1,f.x,f.y-10,!0);
        !l.dead&&this.mode==="raid"&&Math.hypot(l.x-i.x,l.y-i.y)<i.r+l.r&&this.damagePlayer(c*(i.hostile?.55:.45),i.x,i.y)
      }
      i.t>=i.dur&&this.fires.splice(s,1)
    }
  }
  hitCrate(b,d){
    b.hp-=d,
    this.sparks(b.x+b.w/2,b.y+b.h/2,3,"#d9b47c",Math.random()*ne,ne,160);
    if(b.hp>0){
      this.sfx.play("hit",b.x,b.y,.5);
      return
    }
    b.dead=!0;
    const X=b.x+b.w/2,
    Y=b.y+b.h/2;
    this.nav.mark(X,Y,8,!1);
    for(let gy=Math.floor(b.y/32);gy<=Math.floor((b.y+b.h)/32);gy++)for(let gx=Math.floor(b.x/32);gx<=Math.floor((b.x+b.w)/32);gx++){
      const k=gy*this.nav.cols+gx;
      k>=0&&k<this.nav.blocked.length&&(this.nav.blocked[k]=0)
    }
    this.navT=0;
    for(let k=0;k<12;k++){
      const A=Math.random()*ne,
      V=pe(80,260),
      P=this.P(Lc,X,Y,Math.cos(A)*V,Math.sin(A)*V,pe(.6,1.2),pe(3,6),k%2?"#b08854":"#7a5530");
      P&&(P.z=4,P.vz=pe(120,260),P.vr=pe(-12,12))
    }
    this.puff(X,Y,5,"rgba(180,150,110,0.5)",10,80),
    this.sfx.play("armor",X,Y,.8),
    this.text(X,Y-22,"木箱碎裂","#e8c890",14);
    if(b.loot){
      const it=this.rollItems(Math.random()<.5?"crate":"duffel");
      this.containers.push({
        id:this.nextId++,
        type:"duffel",
        name:"箱底暗格",
        x:X,
        y:Y,
        w:30,
        h:20,
        items:it,
        revealed:0,
        body:!1,
        angle:0,
        open:0,
        shake:.3
      }),
      this.text(X,Y-40,"发现暗格！","#ffd23f",16,!0)
    }
  }
  updateBooms(a){
    for(let l=this.booms.length-1;l>=0;l--){
      const s=this.booms[l];
      s.t-=a,
      s.t<=0&&(this.booms.splice(l,1),this.explode(s.x,s.y,s.r,s.dmg,!!s.hostile))
    }
  }
  explode(a,l,s,i,c=!1){
    const f=this.player;
    if(!c)for(const p of this.enemies){
      if(p.dead)continue;
      const y=p.x-a,
      g=p.y-l,
      v=Math.hypot(y,g);
      if(v>s+p.r||!this.grid.los(a,l,p.x,p.y,Xt))continue;
      const S=1-Math.max(0,v-p.r)/s,
      T=v||1;
      this.damageEnemy(p,i*(.3+.7*S),y/T,g/T,!1,p.x,p.y-8,!0)
    }
    if(!f.dead&&this.mode==="raid"){
      const p=f.x-a,
      y=f.y-l,
      g=Math.hypot(p,y);
      if(g<s+f.r&&this.grid.los(a,l,f.x,f.y,Xt)){
        const v=1-Math.max(0,g-f.r)/s,
        S=g||1;
        this.damagePlayer(i*.55*(.3+.7*v),a,l),
        f.kvx+=p/S*420*v,
        f.kvy+=y/S*420*v
      }
    }
    for(const p of this.woodcrates||[])p.dead||Math.hypot(p.x+p.w/2-a,p.y+p.h/2-l)<s+20&&this.hitCrate(p,999);
    for(const p of this.barrels)p.dead||Math.hypot(p.x-a,p.y-l)<s+18&&(p.dead=!0,this.booms.push({
      x:p.x,
      y:p.y,
      t:.12+Math.random()*.1,
      r:150,
      dmg:130
    }));
    this.lights.push({
      x:a,
      y:l,
      r:s*2.6,
      color:"#ff9a3c",
      life:.4,
      max:.4
    });
    const d=this.P(Un,a,l,0,0,.18,s*.9,"#fff6d8");
    d&&(d.grow=-s*2);
    for(let p=0;p<16;p++){
      const y=Math.random()*ne,
      g=pe(60,330),
      v=this.P(Un,a,l,Math.cos(y)*g,Math.sin(y)*g,pe(.25,.55),pe(14,30),p%3===0?"#ffd166":"#ff7b2e");
      v&&(v.drag=5,v.grow=-20)
    }
    for(let p=0;p<14;p++){
      const y=Math.random()*ne,
      g=pe(30,160),
      v=this.P(xl,a+pe(-20,20),l+pe(-20,20),Math.cos(y)*g,Math.sin(y)*g,pe(.9,1.8),pe(14,26),"rgba(70,66,62,0.55)");
      v&&(v.drag=3,v.grow=34)
    }
    this.sparks(a,l,26,"#ffcf6a",0,ne,620);
    for(let p=0;p<12;p++){
      const y=Math.random()*ne,
      g=pe(120,380),
      v=this.P(Lc,a,l,Math.cos(y)*g,Math.sin(y)*g,pe(.8,1.6),pe(2,4.5),"#3a332c");
      v&&(v.z=4,v.vz=pe(150,360),v.vr=pe(-15,15))
    }
    const m=this.P(Js,a,l,0,0,.35,20,"rgba(255,230,190,0.85)");
    m&&(m.grow=s*3.6),
    this.decals.push({
      x:a,
      y:l,
      r:s*.55,
      rot:Math.random()*ne
    }),
    this.decals.length>30&&this.decals.shift();
    const b=Math.hypot(f.x-a,f.y-l);
    this.mode==="raid"&&(this.addTrauma(Math.max(0,.85-b/1100)),this.cam.punch=Math.max(this.cam.punch,.05*Math.max(0,1-b/900))),
    this.sfx.play("explosion",a,l,1.3),
    this.makeNoise(a,l,900)
  }
  updateFx(a,l){
    this.waveT-=a;
    const s=this.particles;
    for(let c=s.length-1;c>=0;c--){
      const f=s[c];
      if(f.life-=a,f.life<=0){
        s[c]=s[s.length-1],
        s.pop();
        continue
      }
      if(f.type===Bc){
        if(f.z>0){
          f.vz-=130*a,
          f.z+=f.vz*a,
          f.x+=f.vx*a,
          f.y+=f.vy*a;
          const d=Math.max(0,1-2.6*a);
          f.vx*=d,
          f.vy*=d,
          f.rot+=f.vr*a,
          f.z<=0&&(f.z=0)
        }
      }else if(f.type===Ec||f.type===Lc){
        if(f.z>0||f.vz>0)f.vz-=900*a,
        f.z+=f.vz*a,
        f.rot+=f.vr*a,
        f.z<0&&(f.z=0,f.vz=-f.vz*.4,f.vx*=.5,f.vy*=.5,Math.abs(f.vz)<40&&(f.vz=0));
        else{
          const d=Math.max(0,1-8*a);
          f.vx*=d,
          f.vy*=d
        }
        f.x+=f.vx*a,
        f.y+=f.vy*a
      }else{
        if(f.x+=f.vx*a,f.y+=f.vy*a,f.drag){
          const d=Math.max(0,1-f.drag*a);
          f.vx*=d,
          f.vy*=d
        }
        f.grow&&(f.size=Math.max(.1,f.size+f.grow*a)),
        f.rot+=f.vr*a
      }
    }
    const i=this.texts;
    for(let c=i.length-1;c>=0;c--){
      const f=i[c];
      f.life-=l,
      f.y+=f.vy*l,
      f.vy*=Math.max(0,1-3*l),
      f.life<=0&&i.splice(c,1)
    }
    for(let c=this.lights.length-1;c>=0;c--){
      const f=this.lights[c];
      f.life-=a,
      f.life<=0&&this.lights.splice(c,1)
    }
    for(let c=this.beams.length-1;c>=0;c--){
      const f=this.beams[c];
      f.life-=l,
      f.life<=0&&this.beams.splice(c,1)
    }
    for(let c=this.msgs.length-1;c>=0;c--){
      const f=this.msgs[c];
      f.t+=l,
      f.t>3.4&&this.msgs.splice(c,1)
    }
    for(let c=this.dmgInds.length-1;c>=0;c--){
      const f=this.dmgInds[c];
      f.t-=l*1.1,
      f.t<=0&&this.dmgInds.splice(c,1)
    }
    this.banner&&(this.banner.t+=l,this.banner.t>this.banner.dur&&(this.banner=null)),
    this.hitmark.t-=l,
    this.flash.t-=l,
    this.zoneT-=l,
    this.tutorialT-=l
  }
  updateCamera(a){
    const l=this.player,
    s=this.cam,
    i=this.input;
    let c=0,
    f=0;
    !l.dead&&!this.ended&&(!i.touchMode&&i.mouseX>-100?(c=oa((i.mouseX-this.viewW/2)/s.zoom*.3,-220,220),f=oa((i.mouseY-this.viewH/2)/s.zoom*.3,-170,170)):i.aimActive()&&(c=Math.cos(l.aim)*110,f=Math.sin(l.aim)*110));
    const d=1-Math.exp(-a*7);
    s.x+=(l.x+c-s.x)*d,
    s.y+=(l.y+f-s.y)*d,
    s.trauma=Math.max(0,s.trauma-a*1.5);
    const m=s.trauma*s.trauma*22,
    b=this.realT*40;
    s.sx=m*(Math.sin(b*1.13)*.6+Math.sin(b*2.71+1.3)*.4),
    s.sy=m*(Math.sin(b*1.37+2.1)*.6+Math.sin(b*2.29+.7)*.4),
    s.kx*=Math.exp(-a*12),
    s.ky*=Math.exp(-a*12),
    s.punch*=Math.exp(-a*7);
    const p=this.ended?this.outcome==="extract"?1.12:1.28:1;
    s.endZoom+=(p-s.endZoom)*(1-Math.exp(-a*2.5)),
    s.zoom=s.base*(1+s.punch)*s.endZoom;
    const y=this.viewW/2/s.zoom,
    g=this.viewH/2/s.zoom,
    v=150;
    s.x=y*2>this.map.w+2*v?this.map.w/2:oa(s.x,y-v,this.map.w-y+v),
    s.y=g*2>this.map.h+2*v?this.map.h/2:oa(s.y,g-v,this.map.h-g+v)
  }
}
function l2(r,a,l){
  const c=6*l,
  f=Math.min(58*l,(r-44)/5-c),
  d=5*f+4*c,
  m=4*f+3*c,
  b=Math.min(r-24,d+28*l),
  p=Math.min(a-24,m+92*l),
  y=(r-b)/2,
  g=(a-p)/2,
  v=y+(b-d)/2,
  S=g+34*l,
  T=[];
  for(let se=0;se<20;se++){
    const ie=se%5,
    ce=Math.floor(se/5);
    T.push({
      x:v+ie*(f+c),
      y:S+ce*(f+c),
      w:f,
      h:f,
      index:se
    })
  }
  const H=S+m+10*l,
  B=(d-c)/2,
  Q=32*l;
  return{
    x:y,
    y:g,
    w:b,
    h:p,
    slots:T,
    dropLowest:{
      x:v,
      y:H,
      w:B,
      h:Q
    },
    close:{
      x:v+B+c,
      y:H,
      w:B,
      h:Q
    }
  }
}
function Wc(r,a,l){
  return l?Math.max(.78,Math.min(1.15,Math.min(r,a)/430)):Math.max(.8,Math.min(1.25,Math.min(r,a)/820))
}
function g1(r,a){
  const l=Wc(r,a,!0),
  s=8,
  i=(f,d,m,b,p)=>({
    id:f,
    label:d,
    x:r-s-m*l,
    y:a-s-b*l,
    r:p*l
  }),
  c=Math.round(132*l);
  return{
    u:l,
    stickR:48*l,
    btns:[i("roll","翻滚",26,50,25),i("reload","换弹",150,30,21),i("heal","治疗",96,196,21),i("grenade","投掷",170,148,20),i("throwableNext","切雷",170,108,17),i("swap","切枪",170,220,20),i("bag","背包",96,268,21)],
    interact:i("interact","搜索",214,78,25),
    pause:r>=600?{
      id:"pause",
      label:"II",
      x:r-14-c-30*l,
      y:14+20*l,
      r:18*l
    }
    :{
      id:"pause",
      label:"II",
      x:r-14-24*l,
      y:14+c*.75+30*l,
      r:18*l
    },
    moveHint:{
      x:92*l,
      y:a-100*l
    },
    aimHint:{
      x:r-s-92*l,
      y:a-s-104*l
    },
    mm:c
  }
}
class zy{
  keys=new Set;
  pressed=new Set;
  mouseX=-1e3;
  mouseY=-1e3;
  mouseDown=!1;
  touchMode=!1;
  moveS={
    id:-1,
    ox:0,
    oy:0,
    x:0,
    y:0
  };
  aimS={
    id:-1,
    ox:0,
    oy:0,
    x:0,
    y:0
  };
  btnPointers=new Map;
  held=new Set;
  W=1;
  H=1;
  layout=g1(1,1);
  interactVisible=!1;
  hasHealing=!1;
  hasGrenade=!1;
  hasThrowableNext=!1;
  hasSecondWeapon=!1;
  enabled=!1;
  bagOpen=!1;
  dropLowestEnabled=!1;
  onPause=()=>{
  };
  onMute=()=>{
  };
  onBagDrop=()=>{
  };
  onBagDropLowest=()=>{
  };
  onBagClose=()=>{
  };
  el;
  cleanup=[];
  constructor(a){
    this.el=a,
    this.touchMode=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0)&&!window.matchMedia("(pointer: fine)").matches;
    const l=(s,i,c,f)=>{
      s.addEventListener(i,c,f),
      this.cleanup.push(()=>s.removeEventListener(i,c,f))
    };
    l(window,"keydown",s=>this.onKey(s,!0)),
    l(window,"keyup",s=>this.onKey(s,!1)),
    l(window,"blur",()=>this.reset()),
    l(a,"pointerdown",s=>this.onDown(s),{
      passive:!1
    }),
    l(window,"pointermove",s=>this.onMove(s),{
      passive:!1
    }),
    l(window,"pointerup",s=>this.onUp(s)),
    l(window,"pointercancel",s=>this.onUp(s)),
    l(a,"contextmenu",s=>s.preventDefault()),
    l(a,"wheel",s=>{
      this.enabled&&Math.abs(s.deltaY)>4&&this.press("swap")
    },{
      passive:!0
    }),
    l(a,"touchstart",s=>{
      s.cancelable&&s.preventDefault()
    },{
      passive:!1
    })
  }
  destroy(){
    this.cleanup.forEach(a=>a()),
    this.cleanup=[]
  }
  setSize(a,l){
    this.W=a,
    this.H=l,
    this.layout=g1(a,l)
  }
  press(a){
    this.enabled&&this.pressed.add(a)
  }
  consume(a){
    return this.pressed.has(a)?(this.pressed.delete(a),!0):!1
  }
  reset(){
    this.keys.clear(),
    this.pressed.clear(),
    this.mouseDown=!1,
    this.moveS.id=-1,
    this.aimS.id=-1,
    this.btnPointers.clear(),
    this.held.clear()
  }
  onKey(a,l){
    const s=a.code;
    if(l){
      if(this.enabled&&["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(s)&&a.preventDefault(),s==="KeyM"&&!a.repeat&&this.onMute(),a.repeat)return;
      switch(this.keys.add(s),["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(s)&&(this.touchMode=!1),s){
        case"KeyR":this.press("reload");
        break;
        case"KeyE":case"KeyF":this.press("interact");
        break;
        case"KeyG":this.press("grenade");
        break;
        case"KeyT":this.press("throwableNext");
        break;
        case"KeyH":case"KeyX":this.press("heal");
        break;
        case"KeyQ":this.press("swap");
        break;
        case"KeyB":this.press("bag");
        break;
        case"KeyV":this.press("dropLowest");
        break;
        case"Digit1":this.press("slot1");
        break;
        case"Digit2":this.press("slot2");
        break;
        case"Space":case"ShiftLeft":case"ShiftRight":this.press("roll");
        break
      }
    }else this.keys.delete(s)
  }
  buttonAvailable(a){
    return a==="heal"?this.hasHealing:a==="grenade"?this.hasGrenade:a==="throwableNext"?this.hasThrowableNext:a==="swap"?this.hasSecondWeapon:a==="dropLowest"?this.dropLowestEnabled:!0
  }
  hitBtn(a,l){
    const s=this.layout;
    if(Math.hypot(a-s.pause.x,l-s.pause.y)<s.pause.r*1.5)return"pause";
    if(this.interactVisible&&Math.hypot(a-s.interact.x,l-s.interact.y)<s.interact.r*1.25)return"interact";
    for(const i of s.btns)if(this.buttonAvailable(i.id)&&Math.hypot(a-i.x,l-i.y)<i.r*1.16)return i.id;
    return null
  }
  onDown(a){
    if(this.bagOpen){
      a.cancelable&&a.preventDefault();
      const c=a.clientX,
      f=a.clientY,
      d=l2(this.W,this.H,this.layout.u),
      m=b=>c>=b.x&&c<=b.x+b.w&&f>=b.y&&f<=b.y+b.h;
      if(m(d.dropLowest))this.onBagDropLowest();
      else if(m(d.close)||!m(d))this.onBagClose();
      else{
        const b=d.slots.find(m);
        b&&this.onBagDrop(b.index)
      }
      return
    }
    if(a.pointerType==="mouse"){
      this.touchMode=!1,
      this.mouseX=a.clientX,
      this.mouseY=a.clientY,
      a.button===0&&(this.mouseDown=!0),
      a.button===2&&this.press("roll");
      try{
        this.el.setPointerCapture(a.pointerId)
      }catch{
      }
      return
    }
    a.cancelable&&a.preventDefault(),
    this.touchMode=!0;
    const l=a.clientX,
    s=a.clientY,
    i=this.hitBtn(l,s);
    if(i){
      this.btnPointers.set(a.pointerId,i),
      this.held.add(i),
      i==="pause"?this.enabled&&this.onPause():i==="bag"?this.enabled&&this.press("bag"):this.press(i);
      return
    }
    l<this.W*.5?this.moveS.id<0&&(this.moveS={
      id:a.pointerId,
      ox:l,
      oy:s,
      x:l,
      y:s
    }):this.aimS.id<0&&(this.aimS={
      id:a.pointerId,
      ox:l,
      oy:s,
      x:l,
      y:s
    });
    try{
      this.el.setPointerCapture(a.pointerId)
    }catch{
    }
  }
  follow(a,l,s){
    a.x=l,
    a.y=s;
    const i=this.layout.stickR,
    c=l-a.ox,
    f=s-a.oy,
    d=Math.hypot(c,f);
    if(d>i*1.25){
      const m=(d-i*1.25)/d;
      a.ox+=c*m,
      a.oy+=f*m
    }
  }
  onMove(a){
    if(a.pointerType==="mouse"){
      this.mouseX=a.clientX,
      this.mouseY=a.clientY,
      (a.movementX!==0||a.movementY!==0)&&(this.touchMode=!1);
      return
    }
    a.pointerId===this.moveS.id?this.follow(this.moveS,a.clientX,a.clientY):a.pointerId===this.aimS.id&&this.follow(this.aimS,a.clientX,a.clientY)
  }
  onUp(a){
    if(a.pointerType==="mouse"){
      a.button===0&&(this.mouseDown=!1);
      return
    }
    a.pointerId===this.moveS.id&&(this.moveS.id=-1),
    a.pointerId===this.aimS.id&&(this.aimS.id=-1);
    const l=this.btnPointers.get(a.pointerId);
    l&&(this.btnPointers.delete(a.pointerId),this.held.delete(l))
  }
  moveVec(a){
    let l=0,
    s=0;
    const i=this.keys;
    if((i.has("KeyA")||i.has("ArrowLeft"))&&(l-=1),(i.has("KeyD")||i.has("ArrowRight"))&&(l+=1),(i.has("KeyW")||i.has("ArrowUp"))&&(s-=1),(i.has("KeyS")||i.has("ArrowDown"))&&(s+=1),l!==0||s!==0){
      const c=Math.hypot(l,s);
      a.x=l/c,
      a.y=s/c;
      return
    }
    if(this.moveS.id>=0){
      const c=this.layout.stickR;
      let f=(this.moveS.x-this.moveS.ox)/c,
      d=(this.moveS.y-this.moveS.oy)/c;
      const m=Math.hypot(f,d);
      if(m<.12){
        a.x=0,
        a.y=0;
        return
      }
      const b=Math.min(1,(m-.12)/.6);
      f/=m,
      d/=m,
      a.x=f*b,
      a.y=d*b;
      return
    }
    a.x=0,
    a.y=0
  }
  aimMag(){
    return this.aimS.id<0?0:Math.min(1,Math.hypot(this.aimS.x-this.aimS.ox,this.aimS.y-this.aimS.oy)/this.layout.stickR)
  }
  aimActive(){
    return this.touchMode&&this.aimS.id>=0&&this.aimMag()>.15
  }
  aimAngle(){
    return Math.atan2(this.aimS.y-this.aimS.oy,this.aimS.x-this.aimS.ox)
  }
  firing(){
    return this.touchMode?this.aimS.id>=0&&this.aimMag()>.42:this.mouseDown
  }
}
const Qc=Math.PI*2,
Ys="#1d1f22",
qn="#2a3440",
Cy="rgba(255,255,255,0.19)",
x1="#c0392b",
v1="#d9583a",
Ho="#2e6fb5",
w1="#3b82c9",
Ny="#245a93",
kc="#d9a21b",
k1="#b8861b",
Vn="#7f8a94",
Zt="#4a5057",
Mc="#a3835a",
Ks="#c4ad7e",
Bn="#5c4126",
M1="#e8e2d4",
Hy="#a8492f";
function U(r,a,l,s,i,c,f,d,m=1){
  const b=Math.min(c,s/2,i/2);
  r.beginPath(),
  r.moveTo(a+b,l),
  r.arcTo(a+s,l,a+s,l+i,b),
  r.arcTo(a+s,l+i,a,l+i,b),
  r.arcTo(a,l+i,a,l,b),
  r.arcTo(a,l,a+s,l,b),
  r.closePath(),
  r.fillStyle=f,
  r.fill(),
  d&&(r.strokeStyle=d,r.lineWidth=m,r.stroke())
}
function T1(r,a,l,s,i,c){
  r.fillStyle=c,
  r.fillRect(a,l,s,i)
}
function I(r,a,l,s,i,c,f,d=1){
  r.beginPath(),
  r.ellipse(a,l,Math.max(.01,s),Math.max(.01,i),0,0,Qc),
  r.fillStyle=c,
  r.fill(),
  f&&(r.strokeStyle=f,r.lineWidth=d,r.stroke())
}
function Oe(r,a,l){
  r.beginPath(),
  r.moveTo(a[0][0],a[0][1]);
  for(let s=1;s<a.length;s++)r.lineTo(a[s][0],a[s][1]);
  r.closePath(),
  r.fillStyle=l,
  r.fill()
}
function Ne(r,a,l,s){
  r.beginPath(),
  r.moveTo(a[0][0],a[0][1]);
  for(let i=1;i<a.length;i++)r.lineTo(a[i][0],a[i][1]);
  r.strokeStyle=l,
  r.lineWidth=s,
  r.lineCap="round",
  r.stroke()
}
function Ry(r,a){
  switch(r.translate(-64,-64),a){
    case"delivery_truck":{
      for(const l of[36,82])for(const s of[34,88])U(r,l,s,10,20,3,Ys);
      U(r,38,56,52,58,5,M1,"#b9b2a0",1.5),
      T1(r,42,60,7,50,Cy),
      Ne(r,[[64,60],[64,110]],"#c9c2b2",2);
      for(const l of[72,88,102])Ne(r,[[44,l],[84,l]],"#d6d0c1",1);
      U(r,42,20,44,38,9,x1),
      U(r,47,21,34,13,4,v1),
      U(r,48,34,32,13,3,qn),
      U(r,50,36,13,3,1,"rgba(255,255,255,0.28)"),
      U(r,62,49,4,8,1,"rgba(255,255,255,0.24)"),
      U(r,36,35,6,9,2,Zt),
      U(r,86,35,6,9,2,Zt),
      U(r,46,15,36,5,2,Zt);
      break
    }
    case"pickup_truck":{
      for(const l of[36,84])for(const s of[40,88])U(r,l,s,10,19,3,Ys);
      U(r,42,22,44,84,10,Ho),
      U(r,47,24,34,19,5,w1),
      U(r,48,44,32,12,3,qn),
      U(r,50,46,12,3,1,"rgba(255,255,255,0.28)"),
      U(r,46,68,36,33,4,Ny);
      for(const l of[74,82,90])Ne(r,[[49,l],[79,l]],"#3a7fc0",2);
      U(r,50,24,4,76,2,"rgba(255,255,255,0.17)");
      break
    }
    case"dump_truck":{
      for(const l of[36,82])for(const s of[36,88])U(r,l,s,10,20,3,Ys);
      U(r,38,54,52,60,4,k1),
      U(r,41,57,46,52,3,kc);
      for(let l=0;l<5;l++)Ne(r,[[44+l*9,104],[50+l*9,60]],"rgba(0,0,0,0.12)",6);
      U(r,42,18,44,38,9,x1),
      U(r,47,20,34,12,4,v1),
      U(r,48,32,32,13,3,qn),
      U(r,50,34,13,3,1,"rgba(255,255,255,0.28)"),
      U(r,46,14,36,5,2,Zt);
      break
    }
    case"container_truck":{
      for(const l of[38,84])for(const s of[84,106])U(r,l,s,9,17,2,Ys);
      U(r,40,50,54,44,3,"#8f402d"),
      U(r,43,53,48,38,2,Hy);
      for(let l=0;l<9;l++)Ne(r,[[46+l*5.4,55],[46+l*5.4,89]],"rgba(0,0,0,0.14)",2);
      U(r,43,22,42,36,8,Ho),
      U(r,48,25,32,12,3,w1),
      U(r,49,38,30,12,3,qn),
      U(r,51,40,12,3,1,"rgba(255,255,255,0.28)"),
      U(r,47,17,36,5,2,Zt);
      break
    }
    case"flatbed":{
      for(const l of[34,84])for(const s of[54,94])U(r,l,s,10,18,3,Ys);
      U(r,36,42,56,66,4,Zt),
      U(r,39,45,50,60,3,Vn);
      for(const l of[52,62,72,82,92])Ne(r,[[41,l],[87,l]],"#939ca5",2);
      U(r,59,20,10,24,3,"#5f6a73"),
      I(r,64,20,6,5,Vn);
      break
    }
    case"rowboat":{
      Oe(r,[[64,12],[84,40],[86,88],[64,116],[42,88],[44,40]],Bn),
      Oe(r,[[64,20],[78,44],[80,84],[64,106],[48,84],[50,44]],Mc),
      I(r,64,64,12,29,"#6b5438"),
      U(r,50,50,28,7,2,Ks),
      U(r,50,78,28,7,2,Ks),
      Ne(r,[[40,74],[88,58]],Ks,3),
      I(r,38,75,5,3,Ks),
      I(r,90,57,5,3,Ks);
      break
    }
    case"fishing_boat":{
      Oe(r,[[64,10],[86,36],[90,92],[64,118],[38,92],[42,36]],"#9aa1a8"),
      Oe(r,[[64,15],[82,39],[85,89],[64,112],[43,89],[46,39]],M1),
      Oe(r,[[64,20],[77,43],[79,85],[64,105],[49,85],[51,43]],"#cfc9ba"),
      U(r,52,42,24,28,4,"#f2eee2","#b9b2a0",1),
      U(r,55,46,18,12,2,qn),
      I(r,64,88,8,8,Zt),
      I(r,64,88,4,4,"#5f6a73"),
      Ne(r,[[64,28],[64,40]],Zt,2),
      I(r,64,26,3,3,Vn);
      break
    }
    case"speedboat":{
      Oe(r,[[64,8],[82,34],[86,86],[64,120],[42,86],[46,34]],"#1f5a75"),
      Oe(r,[[64,14],[78,38],[81,83],[64,112],[47,83],[50,38]],"#e8ecee"),
      I(r,64,62,12,27,"#d3d9dc"),
      I(r,64,58,9,18,qn),
      U(r,58,88,12,12,3,Zt),
      U(r,56,30,16,4,2,Ho),
      U(r,60,22,8,6,2,Ho);
      break
    }
    case"barrels":{
      for(const[l,s]of[[46,52],[82,52],[64,86]])I(r,l,s,16,16,"#7d2019"),
      I(r,l,s-1,14,14,"#b3342a"),
      I(r,l-4,s-5,5,4,"rgba(255,255,255,0.25)"),
      Oe(r,[[l,s-6],[l+5,s+4],[l-5,s+4]],"#f2c230");
      break
    }
    case"bollard":{
      I(r,64,66,24,19,"#2f3338"),
      I(r,64,62,21,16,Zt),
      I(r,64,58,16,12,Vn),
      I(r,58,54,6,3,"rgba(255,255,255,0.22)"),
      T1(r,62,44,4,32,"#3d4248");
      break
    }
    case"crane":{
      U(r,40,42,48,48,6,Zt),
      U(r,45,47,38,38,4,Vn),
      I(r,64,66,18,18,"#8f98a1"),
      I(r,64,66,11,11,"#5f6a73"),
      U(r,62,58,48,13,3,kc);
      for(let l=0;l<4;l++)Ne(r,[[66+l*11,60],[72+l*11,70]],"rgba(0,0,0,0.16)",2);
      U(r,30,61,30,8,2,k1),
      U(r,30,58,10,14,2,Zt),
      I(r,108,64,4,4,Zt);
      break
    }
    case"fountain":{
      I(r,64,68,48,34,"#555b57","#353c39",2),
      I(r,64,65,43,30,"#b4b0a1","#73756e",1.6),
      I(r,64,63,36,23,"#3e7885","#39606a",1),
      I(r,64,62,30,18,"#68a8b3"),
      r.strokeStyle="rgba(221,248,243,0.78)",
      r.lineWidth=1.8,
      r.lineCap="round",
      r.beginPath(),
      r.ellipse(64,62,22,11,0,Math.PI*1.12,Math.PI*1.88),
      r.stroke(),
      r.beginPath(),
      r.ellipse(64,65,14,7,0,Math.PI*.12,Math.PI*.88),
      r.stroke(),
      I(r,64,48,16,15,"#777b73","#454b47",1.5),
      I(r,64,47,12,11,"#e0d8c1","#77766a",1),
      I(r,64,47,8.5,8,"#ffd95d"),
      I(r,61,45,1,1.2,"#303637"),
      I(r,67,45,1,1.2,"#303637"),
      I(r,64,49,4.2,2.1,"#d1843f");
      break
    }
    case"duck_king_statue":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,72,40,34,"rgba(0,0,0,0.3)");
      U(r,24,24,80,80,6,G(24,24,104,104,[[0,"#a39a86"],[1,"#6f6655"]]),"#4a4437",2);
      U(r,30,30,68,68,4,"rgba(0,0,0,0)","rgba(74,68,55,0.5)",1.2);
      I(r,64,68,22,18,G(42,50,86,86,[[0,"#f0d070"],[1,"#b88a2a"]]),"#7a5a1a",2);
      I(r,64,46,14,13,G(50,33,78,59,[[0,"#f6dc7a"],[1,"#c49a3a"]]),"#7a5a1a",1.8);
      Oe(r,[[64,30],[72,34],[64,38],[56,34]],"#e08a2a");
      for(const x of[54,64,74])Oe(r,[[x-4,40],[x,32],[x+4,40]],"#f6dc7a");
      for(const k of[-1,1])I(r,64+k*16,70,7,12,"#c49a3a","#7a5a1a",1.2);
      break
    }
    case"egg_nest":{
      I(r,64,79,48,27,"#62452e","#3b3025",2),
      I(r,64,75,41,21,"#a77745","#68492f",2),
      I(r,64,72,32,15,"#523d2c"),
      r.strokeStyle="#c59a5e",
      r.lineWidth=5,
      r.lineCap="round",
      r.beginPath(),
      r.ellipse(64,75,36,17,0,Math.PI*1.05,Math.PI*1.95),
      r.stroke();
      for(const[l,s,i]of[[51,67,8],[66,63,9],[78,70,7]])I(r,l,s,i*.72,i,"#f0e6ca","#ad966d",1),
      I(r,l-2,s-3,1.5,2.2,"rgba(255,255,255,0.7)");
      break
    }
    case"ice_beacon":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,70,26,22,"rgba(20,40,60,0.3)");
      I(r,64,64,24,24,G(40,40,88,88,[[0,"#6f8d98"],[1,"#34474b"]]),"#26383b",2);
      I(r,64,64,15,15,G(49,49,79,79,[[0,"#e6ffff"],[1,"#5cb4cf"]]),"#2f7d96",1.6);
      const g=r.createRadialGradient(64,64,2,64,64,30);
      g.addColorStop(0,"rgba(200,250,255,0.6)"),
      g.addColorStop(1,"rgba(140,230,255,0)");
      r.fillStyle=g,
      r.beginPath(),
      r.arc(64,64,30,0,6.283),
      r.fill();
      for(let k=0;k<4;k++){
        const a=k/4*6.283+.78;
        Ne(r,[[64+Math.cos(a)*16,64+Math.sin(a)*16],[64+Math.cos(a)*23,64+Math.sin(a)*23]],"#a8f1f0",2.2)
      }
      I(r,60,60,4,3,"#ffffff");
      break
    }
    case"king_vault_gate":{
      U(r,14,18,100,90,14,"#393632","#242624",2),
      U(r,21,24,86,83,12,"#a99b7b","#625947",2),
      U(r,31,34,66,73,10,"#353536","#514a3e",1.5),
      U(r,36,39,56,68,8,"#20272a");
      for(const l of[44,58,72,86])U(r,l-3,43,6,59,3,"#d4b66a","#725c34",1);
      U(r,31,31,66,13,5,"#d7bd77","#78653b",1.4),
      I(r,64,37,5,5,"#f3df9e","#78653b",1);
      break
    }
    case"billboard":{
      U(r,28,77,18,18,4,"#555c58","#303635",1.3),
      U(r,82,77,18,18,4,"#555c58","#303635",1.3),
      U(r,22,89,29,9,4,"#434a47","#303635",1),
      U(r,77,89,29,9,4,"#434a47","#303635",1),
      U(r,17,20,94,57,7,"#382e35","#232a2b",2),
      U(r,22,24,84,47,5,"#e1b957","#765a2e",1.5),
      U(r,26,27,76,39,3,"#42645b","#2d4642",1),
      I(r,38,47,12,12,"#f0d485","#8f7038",1),
      I(r,38,47,7.5,8,"#f6c94f","#715c35",1),
      I(r,35,45,.9,1,"#263335"),
      I(r,41,45,.9,1,"#263335"),
      I(r,38,50,4.5,2.4,"#d98436","#71533a",.8),
      r.fillStyle="#fff1c6",
      r.font="bold 8px sans-serif",
      r.textAlign="left",
      r.fillText("鸭鸭补给",54,43),
      U(r,54,49,34,2.2,1,"#d2b56b"),
      U(r,54,55,25,2.2,1,"#d2b56b");
      break
    }
    case"vending_machine":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      U(r,40,30,52,72,4,"rgba(0,0,0,0.28)");
      U(r,36,24,56,72,5,G(36,24,92,96,[[0,"#2f6c7a"],[1,"#1a3e48"]]),"#0f2228",2);
      U(r,40,28,48,20,3,"#4fa0b0","#1a3e48",1);
      r.fillStyle="rgba(255,255,255,0.3)",
      r.fillRect(42,30,30,3);
      for(const[x,c]of[[44,"#e0533c"],[54,"#f2c230"],[64,"#5fd36a"],[74,"#4aa8ff"]])I(r,x+4,58,3.5,3.5,c);
      U(r,44,74,40,10,2,"#0f2228","#081418",1);
      U(r,76,52,10,14,2,"#c8d0d2","#4a5052",1);
      break
    }
    case"bed":{
      U(r,22,15,84,96,8,Bn,"#282d2b",2),
      U(r,26,18,77,89,7,Mc,"#644a32",1.5),
      U(r,30,23,68,81,5,"#e3dfd2","#77776c",1),
      U(r,31,24,66,13,4,"#b18a5b","#765438",1),
      U(r,37,39,54,18,5,"#f2ede0","#b0ad9e",1),
      Ne(r,[[42,48],[86,48]],"#d6d1c4",.8),
      U(r,33,59,61,40,6,"#738268","#4d5b4b",1.2),
      U(r,37,62,53,33,4.5,"#849176"),
      Ne(r,[[41,65],[86,65]],"#9ba48a",1);
      for(const[l,s]of[[30,25],[98,25],[30,102],[98,102]])I(r,l,s,1.5,1.5,"#d0aa70");
      break
    }
    case"table_map_cup":case"table_field_kit":{
      for(const[l,s]of[[34,32],[94,32],[34,90],[94,90]])U(r,l-5,s-5,10,10,2,"#493625");
      U(r,25,23,78,76,8,"#60442d","#33281f",2),
      U(r,29,27,70,68,6,"#b58a59","#755334",1.5),
      U(r,34,31,60,60,4,"#c39a67");
      for(const l of[44,59,74])Ne(r,[[36,l],[92,l]],"rgba(91,58,31,0.36)",1.2);
      U(r,39,39,32,39,2,"#ece4cc","#75644b",1),
      Ne(r,[[55,41],[55,76]],"#c0b59a",.8),
      Ne(r,[[41,58],[69,58]],"#c0b59a",.8),
      Ne(r,[[43,70],[48,63],[56,66],[66,48]],"#5c8a71",1.6),
      I(r,66,48,2.2,2.2,"#c85d45"),
      I(r,44,45,2.7,2.7,"#d5a84e"),
      a==="table_map_cup"?(I(r,82,63,9,9,"#cbb58e","#6e5739",1),U(r,75,53,14,17,3,"#ede6d4","#776448",1.2),U(r,88,57,7,9,3,"#cbb58e","#776448",1.2),I(r,82,55,5.3,2.2,"#6c4934"),r.strokeStyle="rgba(239,238,220,0.8)",r.lineWidth=1.2,r.beginPath(),r.moveTo(80,49),r.quadraticCurveTo(77,44,81,40),r.stroke()):(U(r,76,45,15,24,3,"#354943","#293731",1.2),U(r,79,49,9,9,1.5,"#bbd0b6","#4b6256",.8),Ne(r,[[83.5,47],[88,41]],"#c49b58",1.5),I(r,80,64,1.8,1.8,"#e0c36c"),I(r,86,64,1.8,1.8,"#75cb91"),U(r,77,76,15,8,2,"#8c6e48","#61482f",.8));
      break
    }
    case"wood_chair":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      U(r,44,46,40,38,5,"rgba(0,0,0,0.25)");
      U(r,42,40,44,40,5,G(42,40,86,80,[[0,"#b48858"],[1,"#7a5a34"]]),"#3a2a1a",2);
      r.strokeStyle="rgba(60,40,22,0.45)",
      r.lineWidth=1.2;
      for(const y of[50,60,70])r.beginPath(),
      r.moveTo(46,y),
      r.lineTo(82,y),
      r.stroke();
      U(r,42,32,44,10,3,"#8a6238","#3a2a1a",1.6);
      for(const x of[44,80])I(r,x,82,3,3,"#4a3218");
      break
    }
    case"bedside_cabinet":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      U(r,40,44,48,40,4,"rgba(0,0,0,0.25)");
      U(r,36,38,52,44,4,G(36,38,88,82,[[0,"#a57d4e"],[1,"#7a5a34"]]),"#3a2a1a",2);
      U(r,40,42,44,36,3,"#b8905c","#5a4024",1);
      for(const y of[52,66])I(r,62,y,3,2,"#e0c890","#5a4024",1);
      r.fillStyle="rgba(255,230,180,0.15)",
      r.fillRect(42,44,40,3);
      I(r,74,48,6,6,"#f2e6c0","#8a7040",1);
      break
    }
    case"potted_flower":{
      I(r,64,64,36,34,"#475a45","#283b34",1.5),
      I(r,64,64,31,29,"#66805a");
      for(const[l,s,i,c,f]of[[54,54,13,10,"#81996b"],[75,63,13,10,"#8ba06e"],[54,75,12,9,"#91a374"],[74,45,10,9,"#738b62"]])I(r,l,s,i,c,f,"#566d4c",1);
      I(r,64,64,11,11,"#edc85d","#9b763d",1);
      for(const[l,s]of[[64,49],[64,79],[48,64],[80,64]])I(r,l,s,6,4.5,"#f0d77a","#a88545",.7);
      I(r,64,64,4,4,"#c67a43","#7c4e32",1);
      break
    }
    case"wood_table":{
      for(const[l,s]of[[31,37],[97,37],[31,91],[97,91]])U(r,l-6,s-6,12,12,3,"#4a3626","#2a211a",1);
      I(r,64,67,51,42,"#5c4126","#33271d",2),
      I(r,64,63,46,38,"#a3835a","#6b4d31",1.6),
      I(r,64,61,41,33,"#c4ad7e"),
      r.strokeStyle="rgba(122,88,54,0.4)",
      r.lineWidth=1.4;
      for(const[l,s]of[[29,23],[21,16],[12,9]])r.beginPath(),
      r.ellipse(64,61,l,s,0,Math.PI*1.06,Math.PI*1.94),
      r.stroke();
      I(r,79,49,12,10,"#e8e2d4","#8b7a5c",1.2),
      I(r,79,48,9,7.2,"#b9563c","#7d3a28",.8),
      I(r,76,45,2.6,1.7,"rgba(255,240,210,0.5)"),
      I(r,45,73,13,10,"#e8e2d4","#a3937a",1.2),
      I(r,45,72,10,7.4,"#d9d2bf"),
      U(r,39,68,8,4.5,2,"#c99a5a","#8c6a3c",.6),
      U(r,45,70.5,8,4.5,2,"#d8ab6b","#8c6a3c",.6),
      I(r,58,45,6,5,"#cfc9b8","#7c7461",1),
      I(r,58,44.5,4.2,3.4,"#6c4934"),
      U(r,63,42,3,5,1.5,"#b9b1a0","#7c7461",.8);
      break
    }
    case"metal_workbench":{
      U(r,16,22,96,84,7,"#3f464c","#252b2f",2),
      U(r,21,27,86,74,5,Vn,"#5b666f",1.4),
      U(r,25,31,78,66,3,"#939ca5"),
      r.strokeStyle="rgba(46,56,62,0.26)",
      r.lineWidth=1;
      for(let l=33;l<=97;l+=12)r.beginPath(),
      r.moveTo(l,33),
      r.lineTo(l,95),
      r.stroke();
      for(let l=0;l<6;l++)U(r,97,33+l*11,7,8,2,l%2?"#3a3f44":kc);
      U(r,28,36,14,20,3,"#5f6a73","#333c42",1.2),
      U(r,31,41,8,9,2,"#8f98a1","#4a535a",1),
      I(r,35,58,5,3,"#4a535a"),
      Ne(r,[[56,44],[82,59]],"#cfd6da",4.5),
      I(r,54,42,4.6,4.6,"#cfd6da"),
      I(r,84,61,4.6,4.6,"#cfd6da"),
      I(r,54,42,2,2,"#5b666f"),
      I(r,84,61,2,2,"#5b666f"),
      U(r,56,72,30,18,3,"#2f3a40","#1f272b",1.2),
      U(r,59,75,24,12,2,"#8f98a1");
      for(const[l,s]of[[64,79],[69,83],[74,78],[78,84]])I(r,l,s,1.6,1.6,"#4a535a");
      break
    }
    case"bar_stool":{
      for(const l of[.6,2.1,3.7,5.2])I(r,64+Math.cos(l)*27,64+Math.sin(l)*26,5.5,4.8,"#3a3f44","#24282c",1);
      I(r,64,64,26,23,"#3a3f44","#23272b",2),
      I(r,64,62,24,21,"#b5563f","#7d3325",1.6),
      I(r,64,60,18,15,"#c96e51"),
      I(r,60,57,6,4.5,"rgba(255,232,220,0.22)"),
      r.strokeStyle="rgba(120,48,34,0.55)",
      r.lineWidth=1.2,
      r.beginPath(),
      r.ellipse(64,62,15,12,0,Math.PI*1.1,Math.PI*1.9),
      r.stroke(),
      I(r,64,62,2.2,2.2,"#7d3325");
      break
    }
    case"wood_bench":{
      for(const l of[30,98])U(r,l-5,80,10,12,2,"#443223","#291f18",1);
      U(r,14,26,100,18,5,"#5c4126","#30251d",2),
      U(r,19,29,90,12,3,"#a3835a","#6b4d31",1);
      for(const l of[34,64,94])U(r,l-3,25,6,19,1.5,"#4a3626");
      U(r,16,45,96,34,5,"#60442d","#30251d",2),
      U(r,21,48,86,28,3.5,"#b58a59","#755334",1.2),
      Ne(r,[[24,62],[104,62]],"#8d6a43",1.4),
      Ne(r,[[24,55],[104,55]],"rgba(210,173,122,0.5)",1);
      for(const[l,s]of[[27,51],[101,51],[27,73],[101,73]])I(r,l,s,1.4,1.4,"#d0aa70");
      break
    }
    case"stone_steps":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      for(let k=0;k<4;k++){
        const y=34+k*14,
        s=k*3;
        U(r,28+s,y,72-s*2,14,2,G(0,y,0,y+14,[[0,"#cbc2ae"],[1,"#8f8774"]]),"#4a4437",1.5);
        r.fillStyle="rgba(0,0,0,0.22)",
        r.fillRect(28+s,y+11,72-s*2,3);
        r.fillStyle="rgba(255,255,255,0.15)",
        r.fillRect(30+s,y+1,30,2)
      }
      break
    }
    case"wood_steps":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      for(let k=0;k<4;k++){
        const y=34+k*14,
        s=k*3;
        U(r,30+s,y,68-s*2,14,2,G(0,y,0,y+14,[[0,"#c49a62"],[1,"#8a6238"]]),"#3a2a1a",1.5);
        r.fillStyle="rgba(0,0,0,0.25)",
        r.fillRect(30+s,y+11,68-s*2,3)
      }
      break
    }
    case"berry_bush":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,98,46,10,"rgba(15,25,10,0.35)");
      const L=[[40,80,22,"#2f4a2f"],[88,80,22,"#2f4a2f"],[64,84,26,"#365536"],[48,62,24,"#3f6040"],[80,60,24,"#3f6040"],[64,48,24,"#4a6d48"],[64,68,26,"#527552"]];
      for(const[x,y,rr,c]of L){
        const g=r.createRadialGradient(x-rr*.35,y-rr*.4,rr*.1,x,y,rr);
        g.addColorStop(0,"#7aa067"),
        g.addColorStop(.5,c),
        g.addColorStop(1,"#1d2e1d"),
        r.fillStyle=g,
        r.beginPath(),
        r.arc(x,y,rr,0,Math.PI*2),
        r.fill(),
        r.strokeStyle="rgba(15,30,15,0.6)",
        r.lineWidth=1.4,
        r.stroke()
      }
      r.strokeStyle="rgba(140,180,110,0.5)",
      r.lineWidth=1.3;
      for(const[x,y,a]of[[46,52,-.8],[60,40,-.3],[80,48,.4],[52,70,-.6],[76,72,.7]])r.beginPath(),
      r.moveTo(x,y),
      r.quadraticCurveTo(x+Math.cos(a)*6,y-5,x+Math.cos(a)*11,y+Math.sin(a)*4),
      r.stroke();
      for(const[x,y,c]of[[44,60,"#c0392b"],[52,52,"#e0533c"],[60,62,"#b8342a"],[70,54,"#d1493a"],[78,62,"#c0392b"],[58,74,"#e0533c"],[72,76,"#b8342a"],[84,70,"#d1493a"],[66,44,"#e0533c"],[48,76,"#7a3d8a"],[82,52,"#7a3d8a"]]){
        I(r,x,y,3.8,3.6,c,"rgba(70,15,10,0.6)",.9),
        I(r,x-1.2,y-1.4,1.3,1,"rgba(255,225,215,0.85)")
      }
      break
    }
    case"thorn_bush":{
      Oe(r,[[20,82],[30,56],[50,40],[66,30],[86,42],[104,62],[100,88],[78,98],[46,96]],"#2f4433"),
      Oe(r,[[28,80],[38,60],[56,48],[72,40],[88,52],[96,72],[86,88],[60,92]],"#3d5741");
      for(const[l,s,i,c]of[[46,66,16,12],[66,56,17,12],[80,74,14,11],[56,82,14,10]])I(r,l,s,i,c,"#4a664a","rgba(34,48,34,0.7)",1);
      r.strokeStyle="#c8bfa2",
      r.lineWidth=1.8,
      r.lineCap="round";
      for(const[l,s,i]of[[38,62,-.7],[52,50,-1.1],[74,44,-.5],[90,60,.2],[94,80,.8],[66,90,1.6],[44,84,2.2]])r.beginPath(),
      r.moveTo(l,s),
      r.lineTo(l+Math.cos(i)*9,s+Math.sin(i)*9),
      r.stroke();
      for(const[l,s]of[[58,62],[74,70],[48,76]])I(r,l,s,3,2.8,"#6b3d6a","rgba(60,26,58,0.5)",.7);
      break
    }
    case"duck_throne":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,72,46,38,"rgba(0,0,0,0.3)");
      U(r,18,22,92,88,10,G(18,22,110,110,[[0,"#7a2a7a"],[1,"#3a1240"]]),"#e4c56d",2.5);
      U(r,30,34,68,64,8,G(30,34,98,98,[[0,"#9a4aa0"],[1,"#5a2266"]]),"#2a0a30",1.5);
      r.strokeStyle="rgba(255,220,140,0.35)",
      r.lineWidth=1;
      for(let k=0;k<5;k++)r.beginPath(),
      r.moveTo(34,42+k*12),
      r.lineTo(94,42+k*12),
      r.stroke();
      U(r,18,16,92,16,6,"#d4b66a","#7a5a1a",1.8);
      for(const x of[30,64,98])I(r,x,16,6,6,"#f6dc7a","#7a5a1a",1.2),
      I(r,x,16,2.5,2.5,"#c0392b");
      for(const x of[14,114])U(r,x-6,34,12,70,5,"#d4b66a","#7a5a1a",1.6);
      break
    }
    case"nest_cluster":{
      I(r,64,74,56,38,"#5b402b","#33271d",2),
      I(r,64,70,50,32,"#8a6238","#5c4126",2),
      I(r,64,67,43,26,"#4a3626"),
      r.strokeStyle="#c59a5e",
      r.lineWidth=4,
      r.lineCap="round";
      for(let l=0;l<9;l++){
        const s=.25+l*.31,
        i=64+Math.cos(s)*47,
        c=70+Math.sin(s)*30;
        r.beginPath(),
        r.moveTo(i-Math.sin(s)*7,c+Math.cos(s)*5),
        r.lineTo(i+Math.sin(s)*7,c-Math.cos(s)*5),
        r.stroke()
      }
      r.strokeStyle="rgba(240,214,164,0.55)",
      r.lineWidth=2,
      r.beginPath(),
      r.ellipse(64,70,40,24,0,Math.PI*1.08,Math.PI*1.92),
      r.stroke();
      for(const[l,s,i]of[[48,66,8],[64,60,9],[80,67,7.5],[56,78,7],[74,79,6.5]])I(r,l,s,i*.74,i,"#f0e6ca","#ad966d",1),
      I(r,l-2,s-3,1.5,2.2,"rgba(255,255,255,0.7)");
      Oe(r,[[86,46],[92,40],[98,46],[104,40],[108,50],[102,54],[96,52],[90,54]],"#efe3c6"),
      r.strokeStyle="#ad966d",
      r.lineWidth=1,
      r.beginPath(),
      r.moveTo(86,46);
      for(const[l,s]of[[92,40],[98,46],[104,40],[108,50],[102,54],[96,52],[90,54]])r.lineTo(l,s);
      r.closePath(),
      r.stroke(),
      I(r,34,52,8,4,"#efe6d0","rgba(160,146,116,0.7)",.8),
      Ne(r,[[34,52],[40,50]],"#c9bda0",1);
      break
    }
    case"crate_stack":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,96,46,10,"rgba(20,15,8,0.3)");
      const B=(x,y,w,h)=>{
        U(r,x,y,w,h,2,G(x,y,x+w,y+h,[[0,"#c49a62"],[1,"#8f6c40"]]),"#3a2a1a",1.8);
        U(r,x+3,y+3,w-6,h-6,1.5,"rgba(0,0,0,0)","rgba(60,40,22,0.5)",1.2);
        r.strokeStyle="#7a5530",
        r.lineWidth=3.5,
        r.beginPath(),
        r.moveTo(x+5,y+5),
        r.lineTo(x+w-5,y+h-5),
        r.moveTo(x+w-5,y+5),
        r.lineTo(x+5,y+h-5),
        r.stroke();
        for(const[px,py]of[[x+4,y+4],[x+w-4,y+4],[x+4,y+h-4],[x+w-4,y+h-4]])I(r,px,py,1.5,1.5,"#3a3a3a")
      };
      B(16,52,46,42),
      B(66,56,44,40);
      r.fillStyle="rgba(0,0,0,0.3)",
      r.fillRect(38,28,52,44);
      B(36,24,50,44);
      break
    }
    case"hay_bale":{
      U(r,16,30,96,70,16,"#7d6430","#4e3f1f",2),
      U(r,20,34,88,62,14,"#b8923f","#8a6c31",1.5),
      U(r,24,38,80,54,12,"#d0aa4e"),
      r.strokeStyle="rgba(150,116,44,0.5)",
      r.lineWidth=1.2,
      r.lineCap="round";
      for(let l=0;l<16;l++){
        const s=42+l%8*6.4,
        i=28+l%4*18;
        r.beginPath(),
        r.moveTo(i,s),
        r.lineTo(i+12,s+l%3-1),
        r.stroke()
      }
      for(const l of[44,76])U(r,l,31,8,68,2,"#6d5a2f","#4a3d20",1),
      U(r,l+2,33,3,64,1.5,"rgba(240,220,170,0.22)");
      I(r,64,66,24,12,"rgba(90,70,30,0.14)");
      break
    }
    case"ice_block":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,96,44,9,"rgba(30,60,80,0.25)");
      const K=(x,y,w,h)=>{
        r.fillStyle="rgba(20,60,80,0.25)",
        r.fillRect(x+3,y+4,w,h);
        U(r,x,y,w,h,3,G(x,y,x+w,y+h,[[0,"#f0fcff"],[.5,"#b6ecf8"],[1,"#7cc8de"]]),"#2f7d96",1.8);
        Ne(r,[[x+4,y+4],[x+w*.55,y+4]],"rgba(255,255,255,0.95)",2.2);
        Ne(r,[[x+w*.25,y+h*.35],[x+w*.55,y+h*.6],[x+w*.42,y+h*.85]],"rgba(255,255,255,0.6)",1.1);
      };
      K(20,58,42,34),
      K(66,56,42,36),
      K(42,24,44,32);
      break
    }
    case"ice_crystal":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,70,28,20,"rgba(20,40,60,0.25)");
      const P=(cx,cy,s,a)=>{
        r.save(),
        r.translate(cx,cy),
        r.rotate(a);
        Oe(r,[[0,-s],[s*.55,0],[0,s],[-s*.55,0]],"#9fe6f5");
        Oe(r,[[0,-s],[s*.55,0],[0,0]],"#e6fbff");
        Oe(r,[[0,0],[s*.55,0],[0,s]],"#5cb4cf");
        r.strokeStyle="#2f7d96",
        r.lineWidth=1.4,
        r.beginPath(),
        r.moveTo(0,-s),
        r.lineTo(s*.55,0),
        r.lineTo(0,s),
        r.lineTo(-s*.55,0),
        r.closePath(),
        r.stroke(),
        r.restore()
      };
      P(64,62,24,.2),
      P(44,74,15,-.6),
      P(84,76,14,.9),
      P(58,86,10,1.6);
      break
    }
    case"fighter_jet":{
      Oe(r,[[60,54],[14,86],[10,99],[56,92],[60,82]],"#3f4e59"),
      Oe(r,[[68,54],[114,86],[118,99],[72,92],[68,82]],"#3f4e59"),
      Oe(r,[[59,92],[29,112],[27,120],[60,112]],"#394752"),
      Oe(r,[[69,92],[99,112],[101,120],[68,112]],"#394752"),
      Oe(r,[[64,6],[72,32],[75,90],[69,118],[59,118],[53,90],[56,32]],"#5d6d78"),
      Oe(r,[[64,10],[68,34],[70,88],[64,114],[62,34]],"#7d8d97"),
      Oe(r,[[57,40],[64,44],[64,64],[55,60]],"#485761"),
      Oe(r,[[71,40],[64,44],[64,64],[73,60]],"#485761"),
      I(r,64,52,7.5,15,"#243742"),
      I(r,62,48,3.4,7,"#93c7d6"),
      U(r,44,78,8,15,2,"#2b363e"),
      U(r,76,78,8,15,2,"#2b363e"),
      I(r,64,118,9,4,"#b25c32"),
      I(r,64,120,5,2.5,"#ffcf7d");
      for(const l of[28,90])Oe(r,[[l,76],[l+12,70],[l+18,76],[l+6,82]],"rgba(232,244,246,0.78)"),
      I(r,l+10,87,6,5,"#e9eef0"),
      I(r,l+10,87,3.6,3,"#c0392b"),
      I(r,l+10,87,1.6,1.4,"#f4f6f5");
      Ne(r,[[57,74],[57,104]],"rgba(226,240,243,0.55)",2),
      Ne(r,[[71,74],[71,104]],"rgba(226,240,243,0.55)",2);
      break
    }
    case"lava_pool":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,66,58,44,"rgba(255,110,40,0.18)");
      Oe(r,[[12,64],[24,40],[50,28],[82,30],[108,44],[118,68],[104,92],[72,104],[38,98],[18,84]],"#2a1d18");
      Oe(r,[[16,70],[28,48],[52,38],[80,40],[104,52],[110,72],[98,90],[70,98],[40,92],[22,82]],"#4a2c1e");
      const g=r.createRadialGradient(64,66,4,64,68,46);
      g.addColorStop(0,"#fff2a8"),
      g.addColorStop(.3,"#ffb03a"),
      g.addColorStop(.7,"#e9561c"),
      g.addColorStop(1,"#7a2610"),
      Oe(r,[[26,68],[38,50],[58,44],[80,46],[98,56],[102,72],[92,86],[70,92],[44,88],[30,80]],g);
      for(const[x,y,w,h,a]of[[46,60,14,9,-.3],[78,56,16,10,.4],[86,76,12,8,-.2],[56,80,14,8,.25]])r.save(),
      r.translate(x,y),
      r.rotate(a),
      U(r,-w/2,-h/2,w,h,3,"#3f2921","#1d1512",1),
      U(r,-w/2+2,-h/2+1,w-4,2,1,"rgba(255,180,90,0.35)"),
      r.restore();
      Ne(r,[[34,68],[48,60],[60,66],[74,58],[88,64],[98,68]],"#ffd571",2.2);
      for(const[x,y,c]of[[48,72,2.4],[68,70,2],[84,62,2.2],[60,52,1.8]])I(r,x,y,c,c,"#fff2b2");
      break
    }
    case"lava_fissure":{
      I(r,64,62,58,27,"rgba(255,110,38,0.14)"),
      Oe(r,[[13,74],[31,50],[53,45],[76,36],[101,42],[117,60],[103,75],[76,69],[52,80],[28,85]],"#2b211c");
      const l=r.createRadialGradient(64,60,2,64,62,48);
      l.addColorStop(0,"#fff0a6"),
      l.addColorStop(.45,"#ff9b2e"),
      l.addColorStop(1,"#a83214"),
      Oe(r,[[25,69],[39,54],[57,50],[76,43],[98,49],[107,61],[93,70],[72,64],[51,73],[33,78]],l),
      Ne(r,[[29,68],[43,57],[58,61],[76,51],[94,59],[104,61]],"#fff0a6",2.4);
      for(const[s,i,c]of[[37,76,10],[64,43,12],[87,71,9]])Oe(r,[[s,i],[s+c/2,i-7],[s+c,i+1],[s+c/2,i+4]],"#3d2a22");
      for(const[s,i]of[[48,46],[69,66],[91,45],[101,72]])I(r,s,i,2,2,"#ffd77a");
      break
    }
    case"hangar":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      U(r,8,14,116,104,4,"rgba(0,0,0,0.3)");
      U(r,4,8,120,104,4,G(4,8,124,112,[[0,"#8a969c"],[1,"#56626a"]]),"#2a3236",2);
      r.strokeStyle="rgba(0,0,0,0.22)",
      r.lineWidth=1.5;
      for(let x=14;x<120;x+=10)r.beginPath(),
      r.moveTo(x,10),
      r.lineTo(x,110),
      r.stroke();
      U(r,4,56,120,6,1,"#4a555c");
      U(r,30,96,68,16,2,"#1f2528","#0f1214",1.5);
      r.strokeStyle="#e0c040",
      r.lineWidth=3,
      r.setLineDash([8,6]),
      r.beginPath(),
      r.moveTo(30,114),
      r.lineTo(98,114),
      r.stroke(),
      r.setLineDash([]);
      U(r,46,26,36,12,2,"#d9b030","#7a5a10",1);
      r.fillStyle="#2a2a2a",
      r.font="bold 8px monospace",
      r.textAlign="center",
      r.fillText("HANGAR",64,35);
      break
    }
    case"runway":{
      U(r,0,30,128,68,0,"#3c3f42");
      r.fillStyle="#2f3234",
      r.fillRect(0,30,128,4),
      r.fillRect(0,94,128,4);
      r.fillStyle="#f2f2ea";
      for(let x=6;x<128;x+=24)r.fillRect(x,62,14,4);
      r.fillStyle="#e0c040",
      r.fillRect(0,36,128,2),
      r.fillRect(0,90,128,2);
      for(const x of[10,40,70,100])I(r,x,46,2,2,"rgba(255,255,255,0.15)");
      break
    }
    case"fighter_jet_parked":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,68,90,44,14,"rgba(10,10,10,0.35)");
      r.fillStyle=G(0,20,0,108,[[0,"#8a969c"],[.5,"#5e6a70"],[1,"#3a4448"]]);
      r.beginPath(),
      r.moveTo(64,8),
      r.lineTo(72,30),
      r.lineTo(72,56),
      r.lineTo(118,74),
      r.lineTo(118,82),
      r.lineTo(72,78),
      r.lineTo(70,100),
      r.lineTo(86,110),
      r.lineTo(86,116),
      r.lineTo(64,112),
      r.lineTo(42,116),
      r.lineTo(42,110),
      r.lineTo(58,100),
      r.lineTo(56,78),
      r.lineTo(10,82),
      r.lineTo(10,74),
      r.lineTo(56,56),
      r.lineTo(56,30),
      r.closePath(),
      r.fill(),
      r.strokeStyle="#22292c",
      r.lineWidth=1.8,
      r.stroke();
      I(r,64,34,4.5,10,G(0,24,0,44,[[0,"#cfefff"],[1,"#3d6f8a"]]),"#1a2a33",1);
      Ne(r,[[64,46],[64,100]],"rgba(255,255,255,0.18)",1.5);
      for(const x of[30,98])I(r,x,78,3,3,"#c0392b");
      I(r,64,106,3,3,"#e0c040");
      break
    }
    case"bus_stop":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,104,54,8,"rgba(0,0,0,0.3)");
      U(r,8,58,112,40,3,"#8a8478","#4a4640",1.5);
      U(r,10,30,108,30,4,G(0,30,0,60,[[0,"#4f9ac0"],[1,"#2a6a8a"]]),"#1a3a4a",2);
      r.fillStyle="rgba(255,255,255,0.35)",
      r.fillRect(14,33,100,4);
      for(const x of[12,112])U(r,x-3,30,6,66,2,"#3a3f42","#1a1a1a",1);
      U(r,24,70,80,12,3,G(0,70,0,82,[[0,"#b08854"],[1,"#7a5530"]]),"#3a2a1a",1.5);
      for(const x of[28,100])I(r,x,82,3,3,"#3a3f42");
      U(r,92,14,24,18,3,"#2a5a9a","#ffffff",1.5);
      r.fillStyle="#fff",
      r.font="bold 12px sans-serif",
      r.textAlign="center",
      r.fillText("BUS",104,27);
      break
    }
    case"water_bucket":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,80,22,9,"rgba(0,0,0,0.3)");
      I(r,64,64,22,22,G(42,42,86,86,[[0,"#a0aab0"],[1,"#5a646a"]]),"#2a3236",2);
      I(r,64,64,17,17,G(48,48,80,80,[[0,"#7fc8e6"],[1,"#2f7da6"]]),"#2a5a7a",1.2);
      I(r,58,58,6,3,"rgba(255,255,255,0.55)");
      r.strokeStyle="#3a4448",
      r.lineWidth=2.5,
      r.beginPath(),
      r.arc(64,64,24,Math.PI*1.05,Math.PI*1.95),
      r.stroke();
      break
    }
    case"well":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,72,44,18,"rgba(0,0,0,0.3)");
      for(let k=0;k<14;k++){
        const a=k/14*6.283,
        x=64+Math.cos(a)*34,
        y=64+Math.sin(a)*34;
        I(r,x,y,9,9,G(x-9,y-9,x+9,y+9,[[0,"#b8ae98"],[1,"#7a705c"]]),"#4a4335",1.4)
      }
      I(r,64,64,26,26,"#1a2428","#2a2420",2);
      const g=r.createRadialGradient(60,60,2,64,64,24);
      g.addColorStop(0,"#3f84a6"),
      g.addColorStop(1,"#0f2028"),
      I(r,64,64,22,22,g);
      I(r,58,58,6,3,"rgba(255,255,255,0.4)");
      U(r,18,60,92,8,3,G(0,60,0,68,[[0,"#8a6238"],[1,"#5a3e24"]]),"#2a1a0c",1.5);
      for(const x of[16,112])U(r,x-5,52,10,24,3,"#6e4a2a","#2a1a0c",1.5);
      I(r,64,64,6,6,"#5a3e24","#2a1a0c",1);
      Ne(r,[[64,64],[72,74]],"#c8b48a",2);
      I(r,74,77,7,5,"#8a6238","#3a2814",1.2);
      break
    }
    case"mailbox":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,82,18,7,"rgba(0,0,0,0.3)");
      U(r,46,46,36,32,10,G(46,46,82,78,[[0,"#e0533c"],[1,"#8a2418"]]),"#4a120c",2);
      U(r,52,56,24,4,2,"#2a0a06");
      r.fillStyle="#fff",
      r.font="bold 9px sans-serif",
      r.textAlign="center",
      r.fillText("POST",64,72);
      I(r,54,50,5,2.5,"rgba(255,255,255,0.4)");
      break
    }
    case"street_lamp":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,64,34,34,"rgba(255,220,140,0.18)");
      I(r,68,70,14,8,"rgba(0,0,0,0.35)");
      I(r,64,64,9,9,"#3a3f42","#1a1a1a",1.5);
      U(r,62,28,4,36,2,"#4a4f52","#1a1a1a",1);
      U(r,52,20,24,12,5,G(52,20,76,32,[[0,"#5a5f62"],[1,"#2a2e30"]]),"#1a1a1a",1.5);
      I(r,64,26,8,4,"#fff4cc");
      break
    }
    case"bench_park":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,80,48,8,"rgba(0,0,0,0.3)");
      for(const y of[50,62,74])U(r,16,y,96,9,3,G(0,y,0,y+9,[[0,"#c49a62"],[1,"#8a6238"]]),"#3a2a1a",1.4);
      for(const x of[22,106])U(r,x-4,46,8,40,2,"#2a2e30","#111",1.2);
      break
    }
    case"trash_bin":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,76,20,9,"rgba(0,0,0,0.3)");
      I(r,64,64,20,20,G(44,44,84,84,[[0,"#4f8a4a"],[1,"#2a4a28"]]),"#1a2a18",2);
      I(r,64,64,15,15,"#1f2a1e");
      for(const[x,y,c]of[[58,60,"#c8c0a8"],[68,66,"#8a6a3a"],[62,70,"#d84a3a"]])I(r,x,y,4,3,c);
      r.strokeStyle="#7aa46f",
      r.lineWidth=1.5,
      r.beginPath(),
      r.arc(64,64,20,Math.PI*1.1,Math.PI*1.5),
      r.stroke();
      break
    }
    case"laundry_line":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      for(const x of[14,114])I(r,x,64,5,5,"#5a3e24","#2a1a0c",1.4);
      Ne(r,[[14,64],[114,64]],"#d8d0c0",1.4);
      for(const[x,c]of[[28,"#e0533c"],[48,"#4aa8ff"],[68,"#f2c230"],[88,"#ffffff"],[104,"#5fd36a"]])r.fillStyle="rgba(0,0,0,0.25)",
      r.fillRect(x-7,68,14,18),
      r.fillStyle=c,
      r.fillRect(x-8,64,16,18),
      r.strokeStyle="rgba(0,0,0,0.3)",
      r.lineWidth=1,
      r.strokeRect(x-8,64,16,18);
      break
    }
    case"radar_station":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,70,74,52,40,"rgba(0,0,0,0.3)");
      U(r,24,24,80,80,8,G(24,24,104,104,[[0,"#7d8a72"],[1,"#4a5440"]]),"#2a3024",2);
      r.strokeStyle="rgba(0,0,0,0.2)",
      r.lineWidth=1.5;
      for(let k=34;k<104;k+=14)r.beginPath(),
      r.moveTo(24,k),
      r.lineTo(104,k),
      r.stroke();
      I(r,64,64,22,22,"#3a4234","#1a2018",2);
      r.save(),
      r.translate(64,64),
      r.rotate((typeof performance<"u"?performance.now():0)/900);
      const g=r.createLinearGradient(0,-30,0,30);
      g.addColorStop(0,"#e8ecee"),
      g.addColorStop(1,"#9aa4a8"),
      r.fillStyle=g,
      r.strokeStyle="#3a4448",
      r.lineWidth=2,
      r.beginPath(),
      r.ellipse(0,0,12,34,0,0,6.283),
      r.fill(),
      r.stroke();
      r.strokeStyle="rgba(58,68,72,0.5)",
      r.lineWidth=1;
      for(const y of[-20,-8,8,20])r.beginPath(),
      r.moveTo(-10,y),
      r.lineTo(10,y),
      r.stroke();
      I(r,6,0,4,4,"#ff4a3a"),
      r.restore();
      for(const[x,y]of[[30,30],[98,30],[30,98],[98,98]])I(r,x,y,3,3,"#e0c040");
      break
    }
    case"missile_rack":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,68,72,52,34,"rgba(0,0,0,0.3)");
      U(r,18,30,92,68,4,G(18,30,110,98,[[0,"#6a7464"],[1,"#3a4234"]]),"#1a2018",2);
      for(const x of[24,104])U(r,x-4,26,8,76,2,"#4a5244","#1a2018",1.5);
      for(let k=0;k<4;k++){
        const y=38+k*15;
        r.fillStyle="rgba(0,0,0,0.3)",
        r.fillRect(28,y+3,72,8);
        U(r,26,y,74,9,4,G(0,y,0,y+9,[[0,"#e8ecee"],[1,"#9aa4a8"]]),"#3a4448",1.2);
        Oe(r,[[100,y],[112,y+4.5],[100,y+9]],"#c0392b");
        for(const s of[-1,1])Oe(r,[[30,y+4.5],[24,y+4.5+s*7],[36,y+4.5]],"#7a8288");
        r.fillStyle="#2a2e30",
        r.fillRect(60,y+1,3,7)
      }
      r.fillStyle="#e0c040",
      r.font="bold 8px monospace",
      r.fillText("DANGER",42,96);
      break
    }
    case"sandbag_wall":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,66,76,56,12,"rgba(0,0,0,0.3)");
      for(let row=0;row<2;row++)for(let k=0;k<5-row;k++){
        const x=16+k*22+row*11,
        y=58-row*14;
        U(r,x,y,24,16,7,G(x,y,x,y+16,[[0,"#c9b48a"],[1,"#8f7a52"]]),"#5a4a2e",1.5);
        Ne(r,[[x+4,y+8],[x+20,y+8]],"rgba(90,74,46,0.4)",1)
      }
      break
    }
    case"fuel_tank":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,68,74,52,26,"rgba(0,0,0,0.3)");
      U(r,10,40,108,46,22,G(0,40,0,86,[[0,"#e8ecee"],[.5,"#b0b8bc"],[1,"#6a7478"]]),"#2a3236",2);
      for(const x of[30,64,98])U(r,x-2,40,4,46,1,"rgba(0,0,0,0.25)");
      U(r,34,54,60,18,3,"#c0392b","#5a140c",1);
      r.fillStyle="#fff",
      r.font="bold 11px sans-serif",
      r.textAlign="center",
      r.fillText("FUEL",64,67);
      for(const x of[24,104])U(r,x-6,84,12,8,2,"#4a5052","#1a1a1a",1);
      break
    }
    case"antenna_mast":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,64,30,30,"rgba(0,0,0,0.2)");
      for(let k=0;k<3;k++){
        const a=k/3*6.283+.5;
        Ne(r,[[64,64],[64+Math.cos(a)*42,64+Math.sin(a)*42]],"rgba(200,200,190,0.7)",1.2);
        I(r,64+Math.cos(a)*42,64+Math.sin(a)*42,3,3,"#5a5f62")
      }
      U(r,56,56,16,16,2,"#c0392b","#5a140c",1.5);
      U(r,60,60,8,8,1,"#f2f2ea");
      I(r,64,64,2.5,2.5,Math.sin((typeof performance<"u"?performance.now():0)/300)>0?"#ff4a3a":"#5a140c");
      break
    }
    case"spore_pod":{
      I(r,64,98,34,10,"rgba(20,30,10,0.35)");
      for(const[l,s,i]of[[44,78,14],[82,74,17],[62,60,20]]){
        I(r,l,s,i,i*1.05,"#5d7a2e","#2f4417",2);
        I(r,l-i*.3,s-i*.35,i*.35,i*.3,"rgba(220,255,160,0.45)")
      }
      for(const[l,s]of[[52,56],[70,64],[86,70],[40,76],[60,70]])I(r,l,s,2.6,2.6,"#c9ff7a");
      I(r,64,40,26,10,"rgba(190,255,120,0.18)");
      break
    }
    case"cattail":{
      I(r,64,92,40,14,"rgba(30,60,30,0.35)");
      const L=[[40,96,-.5,52],[50,100,-.25,62],[60,98,-.08,70],[70,99,.12,66],[80,97,.32,58],[90,95,.55,48],[56,102,-.4,40],[74,102,.42,42]];
      for(const[x,y,a,h]of L){
        r.save(),
        r.translate(x,y),
        r.rotate(a);
        r.strokeStyle="#4f6b2c",
        r.lineWidth=3,
        r.lineCap="round",
        r.beginPath(),
        r.moveTo(0,0),
        r.quadraticCurveTo(a*14,-h*.5,a*22,-h),
        r.stroke();
        r.fillStyle="#6f9a3e",
        r.beginPath(),
        r.moveTo(0,-4),
        r.quadraticCurveTo(-9+a*10,-h*.45,-2+a*26,-h*.8),
        r.quadraticCurveTo(2+a*10,-h*.45,2,-4),
        r.fill();
        r.restore()
      }
      for(const[x,y,a,h]of L.slice(0,6)){
        const tx=x+Math.sin(a)*h*.95,
        ty=y-Math.cos(a)*h*.95;
        r.save(),
        r.translate(tx,ty),
        r.rotate(a),
        r.fillStyle="#6b4022",
        r.strokeStyle="#3a2010",
        r.lineWidth=1,
        r.beginPath(),
        r.ellipse(0,0,3.6,9,0,0,Math.PI*2),
        r.fill(),
        r.stroke(),
        r.fillStyle="rgba(255,220,170,0.25)",
        r.beginPath(),
        r.ellipse(-1,-2,1.2,4,0,0,Math.PI*2),
        r.fill(),
        r.restore()
      }
      break
    }
    case"furnace_vent":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,72,44,38,"rgba(0,0,0,0.25)");
      U(r,22,30,84,80,8,G(22,30,106,110,[[0,"#5a4d45"],[1,"#2e2622"]]),"#1a1614",2);
      const g=r.createRadialGradient(64,70,4,64,70,34);
      g.addColorStop(0,"#fff0a6"),
      g.addColorStop(.5,"#ff9b2e"),
      g.addColorStop(1,"#a83214");
      U(r,34,42,60,56,6,g,"#1a1614",2);
      r.strokeStyle="#2e2622",
      r.lineWidth=4;
      for(const x of[46,58,70,82])r.beginPath(),
      r.moveTo(x,44),
      r.lineTo(x,96),
      r.stroke();
      for(const y of[56,70,84])r.beginPath(),
      r.moveTo(36,y),
      r.lineTo(92,y),
      r.stroke();
      for(const[x,y]of[[28,36],[100,36],[28,104],[100,104]])I(r,x,y,2.4,2.4,"#8a7a6c");
      I(r,96,30,8,8,"#4a3f39","#1a1614",1.5);
      I(r,96,30,4,4,"#1a1614");
      break
    }
    case"pipe_run":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      r.fillStyle="rgba(0,0,0,0.25)",
      r.fillRect(8,50,116,30);
      for(const x of[26,64,102])U(r,x-8,40,16,48,2,"#3a3f42","#1a1a1a",1.2);
      U(r,6,44,116,16,8,G(0,44,0,60,[[0,"#c8d0d4"],[.4,"#8a949a"],[1,"#4f575b"]]),"#2a2e31",1.6);
      U(r,6,66,116,14,7,G(0,66,0,80,[[0,"#e0a070"],[.4,"#b06a3a"],[1,"#5e3a20"]]),"#2a1a0c",1.6);
      for(const x of[30,98]){
        U(r,x-4,42,8,20,2,"#5a646a","#1a1a1a",1);
        U(r,x-4,64,8,18,2,"#7a4a2a","#1a1a1a",1)
      }
      I(r,64,52,8,8,"#c0392b","#5a140c",1.5);
      Ne(r,[[58,52],[70,52]],"#5a140c",2);
      break
    }
    case"frost_pylon":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,68,70,26,22,"rgba(20,40,60,0.3)");
      U(r,40,40,48,48,6,G(40,40,88,88,[[0,"#6f8d98"],[1,"#3a4f58"]]),"#2c3a40",2);
      const g=r.createRadialGradient(64,64,2,64,64,32);
      g.addColorStop(0,"rgba(190,245,255,0.5)"),
      g.addColorStop(1,"rgba(140,230,255,0)");
      r.fillStyle=g,
      r.beginPath(),
      r.arc(64,64,32,0,6.283),
      r.fill();
      Oe(r,[[64,44],[80,58],[74,82],[54,82],[48,58]],"#86d2e6");
      Oe(r,[[64,44],[80,58],[64,62]],"#e6fbff");
      Oe(r,[[64,44],[64,62],[48,58]],"#b6ecf8");
      Oe(r,[[64,62],[80,58],[74,82]],"#5cb4cf");
      r.strokeStyle="#2f7d96",
      r.lineWidth=1.6,
      r.beginPath(),
      r.moveTo(64,44),
      r.lineTo(80,58),
      r.lineTo(74,82),
      r.lineTo(54,82),
      r.lineTo(48,58),
      r.closePath(),
      r.stroke();
      I(r,64,56,2.5,2.5,"#ffffff");
      break
    }
    case"snow_drift":{
      Oe(r,[[8,92],[22,66],[44,56],[70,52],[96,60],[118,86],[110,98],[18,100]],"#dfeaf0");
      Oe(r,[[24,90],[40,70],[66,64],[92,70],[104,90]],"#f7fbff");
      Ne(r,[[30,86],[52,74],[78,72],[98,84]],"rgba(150,180,200,0.55)",2);
      break
    }
    case"rune_pillar":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,68,70,30,26,"rgba(10,8,6,0.3)");
      U(r,40,40,48,48,5,G(40,40,88,88,[[0,"#b0a690"],[1,"#7a705c"]]),"#4a4335",2);
      I(r,64,64,20,20,G(44,44,84,84,[[0,"#d0c6ae"],[1,"#9a907a"]]),"#4a4335",2);
      const t=r.createRadialGradient(64,64,1,64,64,13);
      t.addColorStop(0,"rgba(255,225,130,0.95)"),
      t.addColorStop(1,"rgba(255,190,70,0)");
      r.fillStyle=t,
      r.beginPath(),
      r.arc(64,64,13,0,6.283),
      r.fill();
      r.strokeStyle="#ffd36a",
      r.lineWidth=2,
      r.lineCap="round",
      r.beginPath(),
      r.moveTo(58,58),
      r.lineTo(64,70),
      r.lineTo(70,58),
      r.moveTo(64,52),
      r.lineTo(64,76),
      r.stroke();
      for(const[x,y]of[[44,44],[84,44],[44,84],[84,84]])I(r,x,y,2,2,"#4a4335");
      break
    }
    case"royal_lantern":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,67,68,20,17,"rgba(10,8,6,0.3)");
      const g=r.createRadialGradient(64,64,2,64,64,34);
      g.addColorStop(0,"rgba(255,220,140,0.5)"),
      g.addColorStop(1,"rgba(255,170,60,0)");
      r.fillStyle=g,
      r.beginPath(),
      r.arc(64,64,34,0,6.283),
      r.fill();
      I(r,64,64,17,17,G(48,48,80,80,[[0,"#e0533c"],[1,"#7a1e14"]]),"#3b120c",2);
      r.strokeStyle="rgba(90,20,10,0.5)",
      r.lineWidth=1.2;
      for(let k=0;k<8;k++){
        const a=k/8*6.283;
        r.beginPath(),
        r.moveTo(64,64),
        r.lineTo(64+Math.cos(a)*17,64+Math.sin(a)*17),
        r.stroke()
      }
      I(r,64,64,8,8,"#d4b66a","#7a5a1a",1.4);
      I(r,64,64,3.5,3.5,"#fff4cc");
      break
    }
    case"cargo_net":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      r.fillStyle="rgba(0,0,0,0.28)",
      r.fillRect(20,28,98,80);
      for(const[x,y,w,h,c]of[[18,26,44,40,"#b08854"],[64,26,46,36,"#9a7444"],[18,68,40,38,"#8a8556"],[60,64,50,42,"#b08854"]])U(r,x,y,w,h,3,c,"#3a2a1a",1.5);
      r.save(),
      r.beginPath(),
      r.rect(14,22,100,88),
      r.clip();
      r.strokeStyle="rgba(225,210,160,0.85)",
      r.lineWidth=1.4;
      for(let k=-60;k<160;k+=12)r.beginPath(),
      r.moveTo(k,22),
      r.lineTo(k+88,110),
      r.stroke(),
      r.beginPath(),
      r.moveTo(k+88,22),
      r.lineTo(k,110),
      r.stroke();
      r.restore();
      r.strokeStyle="#6b4a26",
      r.lineWidth=2,
      r.strokeRect(14,22,100,88);
      for(const[x,y]of[[14,22],[114,22],[14,110],[114,110]])I(r,x,y,3.5,3.5,"#6b4a26","#3a2810",1);
      break
    }
    case"rope_coil":{
      I(r,64,70,30,22,"#6b5537","#3b2c1a",2);
      for(const l of[24,18,12,6])I(r,64,66,l*1.2,l*.85,"rgba(0,0,0,0)","#c9a46a",2.2);
      I(r,64,66,4,3,"#3b2c1a");
      Ne(r,[[92,70],[112,84]],"#c9a46a",2.4);
      break
    }
    case"buoy":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,64,64,28,28,"rgba(20,40,50,0.18)");
      I(r,64,64,20,20,G(44,44,84,84,[[0,"#ff6a4a"],[1,"#a8251a"]]),"#5a140c",2);
      I(r,64,64,14,14,"rgba(0,0,0,0)","#f2efe6",4);
      I(r,64,64,6,6,"#3a3f42","#1a1a1a",1.2);
      I(r,64,64,2.5,2.5,Math.sin((typeof performance<"u"?performance.now():0)/400)>0?"#ffd36a":"#6a5a20");
      I(r,58,58,4,2.5,"rgba(255,255,255,0.5)");
      break
    }
    case"ingot_stack":{
      I(r,68,70,40,24,"rgba(10,8,6,0.28)");
      const B=(x,y,a)=>{
        r.save(),
        r.translate(x,y),
        r.rotate(a);
        Oe(r,[[-16,-8],[16,-8],[19,8],[-19,8]],"#a8611f");
        Oe(r,[[-12,-5],[12,-5],[14,5],[-14,5]],"#e8a64a");
        r.fillStyle="rgba(255,240,190,0.55)",
        r.fillRect(-10,-4,14,2.4);
        r.strokeStyle="#5a3410",
        r.lineWidth=1.2,
        r.beginPath(),
        r.moveTo(-16,-8),
        r.lineTo(16,-8),
        r.lineTo(19,8),
        r.lineTo(-19,8),
        r.closePath(),
        r.stroke();
        r.restore()
      };
      B(46,54,.1),
      B(82,52,-.08),
      B(42,80,-.12),
      B(78,80,.14),
      B(62,66,0);
      break
    }
    case"stone_lion":{
      const G=(x0,y0,x1,y1,s)=>{
        const g=r.createLinearGradient(x0,y0,x1,y1);
        s.forEach(([o,c])=>g.addColorStop(o,c));
        return g
      };
      I(r,68,70,30,26,"rgba(10,8,6,0.3)");
      U(r,36,34,56,60,6,G(36,34,92,94,[[0,"#a39a86"],[1,"#6f6655"]]),"#4a4437",2);
      I(r,64,72,16,18,G(48,54,80,90,[[0,"#bdb39c"],[1,"#857d6b"]]),"#4a4437",1.6);
      for(const x of[54,74])I(r,x,86,5,4,"#9a917e","#4a4437",1);
      for(let k=0;k<12;k++){
        const a=k/12*6.283;
        I(r,64+Math.cos(a)*14,50+Math.sin(a)*13,5.5,5.5,"#8a826f","#4a4437",1)
      }
      I(r,64,50,11,10,G(54,40,74,60,[[0,"#d0c6ae"],[1,"#9a917e"]]),"#4a4437",1.6);
      I(r,60,47,1.8,1.8,"#2a2620"),
      I(r,68,47,1.8,1.8,"#2a2620");
      I(r,64,53,3,2.2,"#6b6455");
      Ne(r,[[64,90],[60,100],[66,104]],"#7a7262",3);
      break
    }
  }
}
const __OWN=new Set(["ice_beacon","ice_crystal","duck_throne","duck_king_statue","buoy","bus_stop","water_bucket","well","mailbox","street_lamp","bench_park","trash_bin","laundry_line","radar_station","missile_rack","sandbag_wall","fuel_tank","antenna_mast","bedside_cabinet","wood_chair","wood_steps","stone_steps","vending_machine","crate_stack","ice_block","furnace_vent","rune_pillar","royal_lantern","stone_lion","frost_pylon","berry_bush","lava_pool","hangar","fighter_jet_parked","cattail","spore_pod","rope_coil","ingot_stack","cargo_net","pipe_run","snow_drift"]),
__ROT=new Set(["bench_park","laundry_line","sandbag_wall","fuel_tank","missile_rack","delivery_truck","pickup_truck","dump_truck","container_truck","flatbed","rowboat","fishing_boat","speedboat","fighter_jet","fighter_jet_parked","runway","pipe_run","snow_drift","lava_fissure","rope_coil"]),
__MIR=new Set(["stone_lion","berry_bush","thorn_bush","crate_stack","ice_block","ice_crystal","cattail","hay_bale","nest_cluster","spore_pod","barrels"]);
function __bridge(r,a){
  const st=a.kind==="stone_bridge",
  L=a.len??180,
  W=a.width??70;
  r.save(),
  r.translate(a.x,a.y),
  r.rotate(a.rot||0);
  r.fillStyle="rgba(0,0,0,0.3)",
  r.fillRect(-L/2+4,-W/2+8,L,W);
  if(st){
    const g=r.createLinearGradient(0,-W/2,0,W/2);
    g.addColorStop(0,"#b0a690"),
    g.addColorStop(.5,"#9a907a"),
    g.addColorStop(1,"#7a705c"),
    r.fillStyle=g,
    r.fillRect(-L/2,-W/2,L,W);
    r.strokeStyle="rgba(50,44,34,0.35)",
    r.lineWidth=1.2;
    for(let x=-L/2+20;x<L/2;x+=20)r.beginPath(),
    r.moveTo(x,-W/2+8),
    r.lineTo(x,W/2-8),
    r.stroke();
    for(let y=-W/2+18;y<W/2-8;y+=16)r.beginPath(),
    r.moveTo(-L/2,y),
    r.lineTo(L/2,y),
    r.stroke();
    for(const s of[-1,1]){
      r.fillStyle="#7a705c",
      r.fillRect(-L/2,s*W/2-(s>0?8:0),L,8),
      r.fillStyle="#cbbfa4",
      r.fillRect(-L/2,s*W/2-(s>0?8:0),L,2.5);
      for(let x=-L/2+6;x<L/2;x+=30)r.fillStyle="#8a806a",
      r.fillRect(x,s*W/2-(s>0?12:-2),10,10),
      r.strokeStyle="#4a4335",
      r.lineWidth=1,
      r.strokeRect(x,s*W/2-(s>0?12:-2),10,10)
    }
  }else{
    r.fillStyle="#5a3e24",
    r.fillRect(-L/2,-W/2,L,W);
    for(let x=-L/2;x<L/2;x+=12){
      const g=r.createLinearGradient(x,0,x+11,0);
      g.addColorStop(0,"#b8895a"),
      g.addColorStop(1,"#8a6238"),
      r.fillStyle=g,
      r.fillRect(x+.5,-W/2+6,11,W-12);
      r.fillStyle="rgba(255,230,190,0.18)",
      r.fillRect(x+1,-W/2+6,2,W-12);
      I(r,x+6,-W/2+10,1.2,1.2,"#3a2a18");
      I(r,x+6,W/2-10,1.2,1.2,"#3a2a18")
    }
    for(const s of[-1,1]){
      r.fillStyle="#6e4a2a",
      r.fillRect(-L/2,s*W/2-(s>0?6:0),L,6);
      r.strokeStyle="#3a2814",
      r.lineWidth=1.2,
      r.strokeRect(-L/2,s*W/2-(s>0?6:0),L,6);
      for(let x=-L/2+4;x<L/2;x+=36)I(r,x,s*(W/2-3),4,4,"#4a3218","#2a1a0c",1)
    }
  }
  r.restore()
}
function Dy(r,a){
  if(a.kind==="wood_bridge"||a.kind==="stone_bridge"){
    __bridge(r,a);
    return
  }
  const __rr=__ROT.has(a.kind);
  r.save(),
  r.translate(a.x,a.y),
  r.rotate(__rr?a.rot:0),
  r.scale(a.scale*(!__rr&&__MIR.has(a.kind)&&(a.flip??a.rot<0)?-1:1),a.scale);
  const l=a.kind==="rowboat"||a.kind==="fishing_boat"||a.kind==="speedboat",
  s=a.kind==="fighter_jet",
  i=a.kind==="lava_pool"||a.kind==="lava_fissure",
  c=a.kind==="bed",
  f=a.kind==="wood_table"||a.kind==="wood_bench"||a.kind==="stone_steps"||a.kind==="wood_steps"||a.kind==="metal_workbench"||a.kind==="duck_throne"||a.kind==="nest_cluster"||a.kind==="hay_bale"||i,
  d=a.kind==="table_map_cup"||a.kind==="table_field_kit"||a.kind==="wood_chair"||a.kind==="bedside_cabinet"||a.kind==="potted_flower"||a.kind==="egg_nest"||a.kind==="ice_beacon"||a.kind==="bar_stool"||a.kind==="berry_bush"||a.kind==="thorn_bush"||a.kind==="crate_stack"||a.kind==="ice_block"||a.kind==="ice_crystal"||a.kind==="spore_pod"||a.kind==="cattail"||a.kind==="rope_coil"||a.kind==="buoy"||a.kind==="ingot_stack"||a.kind==="stone_lion"||a.kind==="frost_pylon"||a.kind==="rune_pillar"||a.kind==="royal_lantern",
  m=a.kind==="king_vault_gate"||a.kind==="snow_drift"||a.kind==="pipe_run"||a.kind==="furnace_vent"||a.kind==="cargo_net";
  __OWN.has(a.kind)||(r.fillStyle=i?"rgba(30,15,8,0.12)":"rgba(15,22,10,0.16)",r.beginPath(),r.ellipse(4,7,l?30:s?34:f?50:d?34:m?48:42,l?48:s?50:c?48:f?34:d?29:m?38:40,0,0,Qc),r.fill(),!l&&!s&&!d&&!c&&!m&&!f&&(r.beginPath(),r.ellipse(3,5,30,22,0,0,Qc),r.fill())),
  Ry(r,a.kind),
  r.restore()
}
// Weapon icons: one stylised side-view SVG per prototype (generated from src/game/gear-icons.ts).
const Py={
pistol:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#2b2b2e"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M27 33 88 31l7 4h13v6h-15l-5 4H52l-5-3H27z"/>     <path d="M54 46h17l-3 6h-11z" fill="#2c3430"/>     <path d="M57 51h14l-4 18H54z" fill="#3b332c"/>     <path d="M53 50q-8 1-8 8l4 2 1-7h9z" fill="none" stroke-width="2.4"/>     <path d="M32 32h50v3H32z" fill="#b4beb3"/>     <path d="M88 35h18v3H88z" fill="#d3dad0"/>     <circle cx="104" cy="36.5" r="1.8" fill="#0d1210" stroke="none"/>     <path d="M36 38h4m4 0h4" stroke="#6d786f" stroke-width="1.4"/></g></svg>',
smg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#303338"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M12 40h24l5-5h38l6 4h30v5H85l-6 5H39l-5 4H12z"/>     <path d="M12 36h24v5H12z" fill="#39433d"/>     <path d="M60 49q2 12 10 18l-8 2q-8-9-8-19z" fill="#2c3430"/>     <path d="M92 30h4v9h-4z"/>     <path d="M69 28h13v5H69z" fill="#39433d"/>     <path d="M116 36h12v4h-12z" fill="#b4beb3"/>     <path d="M30 35h44v2H30z" fill="#8d998f" stroke="none"/></g></svg>',
mp9:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#33373d"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M20 38h28l5-5h34l5 4h18v6H91l-5 5H50l-5 4H20z"/>   <path d="M18 34h13v11H18z" fill="#39433d"/>   <path d="M61 47h14l-1 16H63z" fill="#2c3430"/>   <rect x="64" y="26" width="16" height="8" rx="2" fill="#171e1b" stroke-width="1.8"/>   <circle cx="72" cy="30" r="1.8" fill="#e0524b" stroke="none"/>   <path d="M94 36h12v4H94z" fill="#b4beb3"/>   <path d="M34 34h42v2H34z" fill="#8d998f" stroke="none"/></g></svg>',
shotgun:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#5a3d26"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M9 34 38 32l8 5h72l9-4h14v6h-16l-8 5H49l-10-4H9z"/>     <path d="M9 31 38 30l3 4H9z" fill="#8b5e34"/>     <path d="M48 46h62v5H48z" fill="#6f4a2a"/>     <path d="M48 46h62v2H48z" fill="#a97643"/>     <path d="M50 51h58v4H50z" fill="#5a3a22"/>     <path d="M31 33h13v5H31z" fill="#8b5e34"/>     <path d="M115 33h17v3h-17z" fill="#b4beb3"/>     <path d="M46 35h59v2H46z" fill="#8d998f" stroke="none"/></g></svg>',
rifle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#3a3f36"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M14 38h34l5-5h34l6 4h33v5H93l-6 5H51l-5 4H14z"/>   <path d="M14 34h32v6H14z" fill="#39433d"/>   <path d="M48 29h40v4H48z" fill="#3b443f"/>   <path d="M61 48h14l-3 19H64z" fill="#2c3430"/>   <path d="M114 30h4v9h-4z"/>   <path d="M121 36h12v4h-12z" fill="#b4beb3"/>   <path d="M54 33h28v2H54z" fill="#8d998f" stroke="none"/></g></svg>',
ak:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#4a3324"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M8 34 40 33l9 4h56l8-4h21v6h-21l-8 5H52l-11 5H8z"/>   <path d="M8 32h32v5H8z" fill="#8b5e34"/>   <path d="M40 32h20v5H40z" fill="#a97643"/>   <path d="M66 46q3 10 12 17l-8 5q-11-8-13-20z" fill="#70472d"/>   <path d="M52 28h17v5H52z"/>   <path d="M113 32h22l4 4-4 3h-22z" fill="#b4beb3"/>   <path d="M45 35h20v2H45z" fill="#6b4a2a" stroke="none"/></g></svg>',
sniper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#4a5a3a"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M8 34 40 32l8 5h66l10-5h12v6h-14l-9 5H51l-11 5H8z"/>   <path d="M8 31h32v5H8z" fill="#4f5a4e"/>   <rect x="52" y="22" width="30" height="9" rx="4" fill="#171e1b"/>   <path d="M50 26h34" stroke="#b7c1b6" stroke-width="2"/>   <path d="M70 48h12l-2 14H71z" fill="#2c3430"/>   <path d="M48 32h6l-3 8h-5z" fill="#6c7669"/>   <path d="M124 32h14v7h-14z" fill="#b4beb3"/></g></svg>',
lmg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#2f3230"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M10 35h32l7-5h34l6 4h31v6H89l-6 5H49l-7 4H10z"/>     <path d="M10 32h30v5H10z" fill="#39433d"/>     <path d="M43 27h34v6H43z" fill="#2c3430"/>     <path d="M60 47h24v18H60z" fill="#2c3430"/>     <path d="M64 50h16m-16 4h16m-16 4h16" stroke="#6e7a6d" stroke-width="1.6"/>     <path d="M108 45l-6 18m14-18 6 18" stroke="#b4beb3" stroke-width="2.6"/>     <path d="M122 34h14v5h-14z" fill="#b4beb3"/>     <path d="M46 34h33v2H46z" fill="#8d998f" stroke="none"/></g></svg>',
dmr:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#3c4631"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M12 34 40 32l8 5h54l8-4h22v6h-22l-8 5H51l-10 5H12z"/>     <path d="M12 32h28v5H12z" fill="#8b5e34"/>     <path d="M44 31h22v5H44z" fill="#a97643"/>     <rect x="52" y="22" width="28" height="8" rx="3" fill="#171e1b"/>     <path d="M50 26h32" stroke="#b7c1b6" stroke-width="2"/>     <path d="M68 47q2 9 8 13l-6 4q-8-6-9-15z" fill="#70472d"/>     <path d="M114 31h4v8h-4z"/>     <path d="M124 33h12v4h-12z" fill="#b4beb3"/></g></svg>',
m4legend:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#8e5bd6"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M14 38h34l5-5h34l6 4h33v5H93l-6 5H51l-5 4H14z"/>   <path d="M14 34h32v6H14z" fill="#4a3a5e"/>   <path d="M48 29h40v4H48z" fill="#6a4e8a"/>   <path d="M61 48h14l-3 19H64z" fill="#2c3430"/>   <path d="M114 30h4v9h-4z"/>   <path d="M121 36h12v4h-12z" fill="#b4beb3"/>   <path d="M54 33h28v2H54z" fill="#8d998f" stroke="none"/><path d="M49 40q10-13 19-1t19-1" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".95"/><path d="M55 45q9-8 17 0t17 0" fill="none" stroke="#c77ee0" stroke-width="1.6" opacity=".85"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
awmlegend:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#c0392b"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M8 34 40 32l8 5h66l10-5h12v6h-14l-9 5H51l-11 5H8z"/>   <path d="M8 31h32v5H8z" fill="#4f5a4e"/>   <rect x="52" y="22" width="30" height="9" rx="4" fill="#171e1b"/>   <path d="M50 26h34" stroke="#b7c1b6" stroke-width="2"/>   <path d="M70 48h12l-2 14H71z" fill="#2c3430"/>   <path d="M48 32h6l-3 8h-5z" fill="#6c7669"/>   <path d="M124 32h14v7h-14z" fill="#b4beb3"/><path d="M44 39q11-14 24-3t28-2" fill="none" stroke="#e0b45c" stroke-width="2.4" opacity=".95"/><path d="m58 38 5 4 7-2 5 5" fill="none" stroke="#ffdf8a" stroke-width="1.6"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
minigun:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#6b4a1e"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M36 32h58l8-6h20v18h-20l-8-6H36z"/>     <circle cx="42" cy="36" r="10" fill="#4a5349"/>     <path d="M47 28h74v3H47zM47 33h78v3H47zM47 38h78v3H47z" fill="#889486" stroke-width="1.6"/>     <path d="M120 26h14v22h-14z" fill="#171e1b"/>     <circle cx="127" cy="37" r="8" fill="#222b26"/>     <circle cx="127" cy="37" r="3.2" fill="#0d1210" stroke="none"/>     <path d="M60 45h14l-3 14H62z" fill="#2c3430"/>     <path d="M68 50h28v10H68z" fill="#242b26"/>     <path d="M85 45h4v12h-4z" fill="#b4beb3"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
rpg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#4d5238"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M20 34h76l20 4-20 4H20z"/>     <path d="M96 29 116 33l16 5-16 5-20 4z" fill="#b8a06c"/>     <path d="M20 33h9v12h-9z" fill="#283027"/>     <path d="M40 45h16l-3 14H43z" fill="#2f382f"/>     <path d="M60 33h14v4H60z" fill="#4b5746"/>     <path d="M30 30h10v4H30z"/>     <path d="M112 31v14" stroke="#ded4aa" stroke-width="2"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
frostmp9:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#7fd8ef"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">   <path d="M20 38h28l5-5h34l5 4h18v6H91l-5 5H50l-5 4H20z"/>   <path d="M18 34h13v11H18z" fill="#39433d"/>   <path d="M61 47h14l-1 16H63z" fill="#2c3430"/>   <rect x="64" y="26" width="16" height="8" rx="2" fill="#171e1b" stroke-width="1.8"/>   <circle cx="72" cy="30" r="1.8" fill="#e0524b" stroke="none"/>   <path d="M94 36h12v4H94z" fill="#b4beb3"/>   <path d="M34 34h42v2H34z" fill="#8d998f" stroke="none"/><path d="m58 22 4-7 4 7 7 2-7 3-4 7-4-7-7-3z" fill="#c9f5ff" stroke="#6094a2" stroke-width="1.5"/><path d="m88 42 3-5 3 5 5 2-5 2-3 5-3-5-5-2z" fill="#dffaff"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
ironbreaker:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#8f1d1d"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M6 34h36l8-5h46l8 5h28v8H98l-8 5H50l-10 5H6z"/>     <path d="M6 31h34v6H6z" fill="#2a2024"/>     <path d="M46 26h42v7H46z" fill="#1a1418"/>     <rect x="58" y="20" width="26" height="10" rx="3" fill="#171014"/>     <path d="M62 46h22v20H62z" fill="#1b1013"/>     <path d="M66 49h14m-14 4h14m-14 4h14" stroke="#8f1d1d" stroke-width="1.6"/>     <path d="M120 30h18v12h-18z" fill="#2a1416"/>     <path d="m72 30 5 6 9 1-7 6 2 9-9-5-9 5 2-9-7-6 9-1z" fill="#c0262b" stroke="#ffb3a3" stroke-width="1.2"/><path d="M70 33 78 43l11 1-8 7 3 11-11-6-11 6 3-11-8-7 11-1z" fill="#c0262b" stroke="#ffb3a3" stroke-width="1.2"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
aa12:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#2d5a52"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M14 37h32l6-5h44l6 4h24v6H98l-6 5H48l-6 4H14z"/>     <path d="M14 34h30v5H14z" fill="#39433d"/>     <path d="M44 29h46v5H44z" fill="#2c3430"/>     <ellipse cx="70" cy="58" rx="16" ry="13" fill="#2c3430"/>     <circle cx="70" cy="58" r="7" fill="#171d1a" stroke="#5c685d" stroke-width="1.6"/>     <path d="M118 34h14v5h-14z" fill="#b4beb3"/>     <path d="M46 34h45v2H46z" fill="#8d998f" stroke="none"/><path d="M50 40q9-12 18-2t18-2" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
hk416:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#2f3d4a"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M12 38h36l5-5h32l6 4h35v5H91l-6 5H50l-6 4H12z"/>     <path d="M12 34h34v6H12z" fill="#2f3833"/>     <path d="M46 27h44v5H46z" fill="#38423c"/>     <path d="M52 33h30v2H52z" fill="#8d998f" stroke="none"/>     <path d="M64 48h13l-3 18H67z" fill="#2c3430"/>     <path d="M110 30h4v9h-4z"/>     <path d="M120 36h14v4h-14z" fill="#b4beb3"/>     <path d="M52 42h8v2h-8z" fill="#1d2421" stroke="none"/><path d="M50 39q9-12 18-2t18-2" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>',
barrett:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="#5a5f45"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">     <path d="M10 35h34l8-5h52l8 5h20v8h-22l-8 5H52l-10 5H10z"/>     <path d="M10 32h32v6H10z" fill="#4b554d"/>     <rect x="48" y="21" width="34" height="10" rx="4" fill="#171e1b"/>     <path d="M46 25h38" stroke="#b7c1b6" stroke-width="2"/>     <path d="M72 48h12l-2 15H74z" fill="#2c3430"/>     <path d="M116 30h20v14h-20z" fill="#b4beb3"/>     <path d="M118 33h16m-16 4h16" stroke="#4a5349" stroke-width="2"/>     <path d="M98 46l-8 18m16-18 8 18" stroke="#b4beb3" stroke-width="2.4"/><path d="M45 39q11-13 21-2t22-2" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/></g><path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="#ff4f4f"/></svg>'
};
function jy(r){return Py[r]||Py.rifle}
function n2(r){
  return`data:image/svg+xml,${encodeURIComponent(jy(r))}`
}
const qy="data:image/webp;base64,UklGRjBeAgBXRUJQVlA4ICReAgBw8QmdASp8CNQCPkkijkUioionpdQKkUAJCWdu1/wl+4sNL+4HYNI5sxe2/OU9I22XXl2L5Lu63v3guHtO+2eUFczs2eNZ/42sEfsR6m2an9PdPX/2+az5pfqt/4+/I9SmYIbk6DvC8v/s+h1yf5ffadKn/Z5CfAf+PzlPXP7Dzl/+X1x/0j/bf/b8////9hv69/sr69nsU/yH/w9WP9o/5/7h+8P/7vX3/g/UQ/s3/Q///ZMf5H1Lv3Z9Zj/6+0r/av/N+8vtmf//2AP//7eHSn8z/SN8r/sP+n4T+h37r/F+0L/LZa/eP939wfUn+h/q/+r/oPaX/n+BP0k1EfzL+x/8H/D/uv8IX6X7geL1dL9wvYg9/vwf/T/yv5M/Gp+h/7fTD+S/3//s/0PwBfsR/1v8XynX6X/yft58A/9U/zH/v/1v+t+HD/a//X/H/OL3zfrX/H/+3+2+BT+if4r/u/5H7////9+///65z91f/+TEcyNCha1266+fip82TFhPnTVerSnzZMWE+dNV6tKfNkxSyA+2ClyTL35vMfNPTt5M8pTYdnn/UnBHWDQgHlAoehOlx4b964ZrVKM6XJiP3oT26nXQnzpqvVpT1EqdyJ28cFVfKpMa7dLmuSdmfdw8U6XHhvxmNLCNzOvK7SFHhv3oT2gOp6Xvae27FahMC0P4JHgN6z4xu95KOV/UHgjieF1NAbPMsjVGrSny0XEyThHWaLzGAwraJvqLjqJ4yZfS1pCCSiu/M3cJqb42PhmVezRnNcXeH6FRpalYLKaDiR0w2Tcsli7LQRuCs/zbzCzM8gkQBaASWpm7bIZumAvUHRLgTgznmdAgjvKnja3+DjJPhJ5BGUtMO61CltW35QWq/RgSoLEWUrKwy7bzh2v4W+228rHQnmIAL5oNTP0NwRHZ8DAIPt8RmgneX9juG4PgywmZ5t8o8cf3cH3XdCxlafRWTJOabXUCM+pNsshLAYu4NUe/YayqS9k2IIiTeVZtA0PteR5F19YtdR/aYD2jiTszdBiEa6L4QnCETI7pGyeJynA3SZKl2gvNbq+5mhaptM4YxibI0VBEaeg27S/HWAgJkvrN/5o184Qy1qy4ZvpDKpoLXopn4HUljiu6/xaqlHdyKllS9vr4s+CWQWp+Le0rkrxkVdFJKwEI5H6hMuL75ok9boDAXzARwRPgYn8VMSoTwmlTraBW+cY18jGRwAarOehjKGD0jKI75QbEWvHWbxbpSOD2lnxw+JWKsQpJxr3jCNJYLJxrVdSnsEtOqX1zs42TaM172JN/PkBL2ditpI2+ihVq77+37fYHlCmP8dAWrSwaStKLgG4vwZzaqUdMBTlpGAWY5//4jqfU//cBueMTV9OcbpQtPSAwhGUiNam5+wWhE3jnKPXRR6tKFMhY5Ryc9HI9J+4sOTQla6R8jN8HWvztHbkjPiBWQQ9+3bnnR7TIRVHusny68fN6nu8CNfK+ln97iZPsPzo97of/+pXV38+7SBdCj/C1DyjLFHrFDelngobXtLXcp0JmYGFkB8R5HuEZKRgtW3VhcHMwP0/LxNBlahIrEEtBDe0qtyGdv7uwdxTOla56lOSlBGiS8altjFwfZgbqKWw86Ocmfu6dvJRfyd9pZgb31kqxUMl9pXdcNbFme7owB/TF7u8RHLhAocYUEklclWjGXdFnDVKU2JL3FDgsG/iAd1F5N6ZwPIRqzeUllsIWDbMFMxA0xMPWjnsCOqQW1dyA0qJ4hfDpc9WZI6Kgsps9b/+/Fhr7Tj3XOKBDtvQVkmgxf/iP+O6lUz+YKhK9tQDpzRPp0le92eKT4Gih2CjY4KDkuIBLedKAY9EsnSZWZA8v75uydRL9Jgq8EqX18qGIzRLqzRwerdgpRQQXXpk9LBSOi30EcJRRPBr08LurEKBbFv8Y/z+TOaeoZp+6e9qeU4Lk9TCZ9nUHw7yfPSmx2RiH4qmW3D/aRBuTdnX11Njot+ByM1STBhcRmtOAOkUpwM4CJd1A6Md/cAHKQbPovDojm4XK9gbY1zlSiR/ySA2ty7AdHudtUhP40XJGaCdqTlbqwc8JKF8eDJWjDzs+Y447/YGU9KQmiaqSeITwDhSdSYLRXLjZ0fF3CLjfEPoQ2X7pJhh7b0rsxU11OKXUludvKnu85W1lFyiplbT1oRxYpJr7ylvGXHP95ezVPiAlhFfaIR1uVayoDcZj9ypv1KP/0FnP91/+U27XAlnERMsvneKWkh0xdPQ/KB0i7bnEzf8zQWWliErgp8aWiiy6frqLJCEtSkGHTc7Z3aCLOMp0BQ30c4gV8N7q/nJK9O85Sz8GMcVhKusLNhFrzBe8f/xdQwqzUzTNFijURe+FqucQIuzDGvXzfMfF4INbubjrxEWhtX8ZFV1wQhFuy2GWw7t8lLYngECTLKpI9+RGv+m7c9iI+zPvTSZ6IyUb4XqsnnXSdIJf65wSjRN/vRzSgLci0SDgBa1uQHkSuqtLGXOAmgrCMP7HpYbZyOEqjYGnFG7gu0a3ZSmk9e4bhKUS6tuZKJFmTbjuN138EQW+iCmC0iiq6aErU8T14FZ+qXyt77c+k1aTaP+PuQwvnUr6jnVl3oMd1PRhneCNyflOhAowK/sGVqV1FzSeOxgaPUKr78md5yM8b1thfg+l/RP/oDlBtMGVjaOcc/cu/QlVEBrh11uwqr3qq4fsggBsfXWW7NELT3i/vkPeK3/FTU7z/a6K3hCPv77K4KEPnw45mN1gRlI/urgZLlZ/3U2ln7SRvUf4vmlOrodLjpo6nA/AyZdG6wWmRWMbzIkJywx5irlD59fXG0rzDgOrZAKNNmdn04Hy9wIcDwHI/PvZwcfu8zU/3LOrJ3uoDlo8ur+N8s4Ff8SGHaOV54I8/yZ/ydtopXt7R7qwtEzy1xe8Q1bZwro7Z8PQm2QP4KlSaXXRfkXYoUhYXrmP5sdulIzPFhwOZKL6nOZQF66zMSLF06VuxAfs1wrH5/bP//jbH/7bQ73NiFspxomadN6bYfu5O7BD1EUZCnTnfgK+Dnof8xTtPVnCytTDKI7lOhI0nLjm3XmsN1eyFS7pQWJcTh+ppvlWNqMd0uEbOBLT9EMdt/wTSaOfiUOK8LBOWYlCbNbcKX/n4scHJOnNCNeMVIC/PWMafqyUpKyoEMV7uw0hsKwSHyCbh8ezBRYpKdcRFqlUUSCcUiaP7lNmloLzbBuGJjmztJeZwG3BBCyoqvsvpLRjFD0Uw49Es7+n+/O6vWrwlrNra3/iWqdqHoUFvAKse1qhzFcjGrWEF/TSfZVxfbX4mV/LbAMNVKQwzV6bhMD23kMGx2+a/MOwhJOQ47z1t5dD00bXFsA9Ohb78DaRvvs4+90BVwK/4VHjcocTudsARPz/OOiibA+NmIDRC18SYoWJaIPqXvE72zAamza7/b3+sUO2/6l2L5qFM+ZcjM9mUUZTxrBpfKmcuimaeW3qcyw89x12IAoPM0m68TUEdotY45/qqtfrqm2EAlhQeIH/BzDvquBgQ/+D/6fgGlvSzUKClBbzfDipDAuXwfc+mrbjInu/x15F6Udk6b+krjLQJqOyFeL7X5hn0/9/aQScCOBOejXwpqJ6lusXSXv+gcTD/YoQGOhwje4pI13lVqWwglHNIDneKiPh8sY3onr1EHSIdVPyoqD8kHgiEWB6jwBYgbWoWiMRvb0PIyn7cJrg0g7+48aNq86fXXBz3M1VEuCED2cCfEUEZ3EMrgpNrF79VHFdzajAsYaeSWd9D/dFx3oemjwqComt6oHBlXVa4lAwMDt5heIOlj6yg3DUYyM3lUEL637TCC0zRzU0tNC/Wy9dg/A/ZhLwPlEhMTQZUseVW43rTs0hve7+1nPMPqcfug8E8Qf1p0TcHKUq7snHEoi95nT11LGgRBqB2BbivASLISmJRl2AyswmUZnGpwr6Gd9lo7A5yQ5BU8WuxceDsB/BB29RLzCOkvQD0k8XtHtGAYQpQc63KkGRMOXOJxoTSHH5GB7ScGyEddRdn4F9dLoxcdSPHjs8jKPxolbxrv7jlg0zjKKWR6pYJ98pYA5HvmSSl8dOwSte5UTlLvlc4/krk7AFG2Wp92hWww43y/OgvDfuEZmlujkUScsungmZ97DpCJOJVnMyodE9u0HdrRkpx3FpUwt1oxO3fAqaLnNuMLVFVVTkTzZ0EDaasE7qO5JtVHYku43J4venB24WY7DDf+Zu+SQviq4rW1Aoh/uXC7OX4mKDodmLpCXZxoNYF4eh66wkezNlMnmaq+fVCSigLO5bxBiX4A0ChZ2FZ17bqj9+mmWIKwpkQv85T5t7XodgEyQIRFBA5NekxeYPTI895ZDyxe/pFg7H2Cq7VFQ3PcpIZAdQI0yGd968VsOmjYhc9Al+WCt8nQVndq+Rp6ESIG2ays4Dy/9ay0mgErZzo3ozNhxIUcSacW5WQvU1uTEST/KdH/U8qGcQaRD9aU/aMSpe4fyp57ePdixmFSG5qlAhtbn++wUgxtm3w1EOpxXZB10fiolf/quj1AYA0/LSbTmL+Ho/Qia2maTnAO9MT+2UqPYvF684mTYdNdEkNGGseWBKdMQKgRbjXwszKt082kx5AN5pto9v75jN0dm/VBG37Nsi3Ay2bxlnrLqsU5TChWzRp/or1kVCRL+XCSDp5vedUYXoev61leDS6SI7Hm21+3qcszyUSH/BzpA6Wh5gvV0l5xAGsG5uRrWvrecUl/Y9Ao8s/vKAiDrxN2Nr0Csh7JQonYJcBzuhZqPiTMrKBjbn//CSds62rWR+kDQGHJ9O13ojo56qX3akwSypLxf6aG6BdIEudRQU+RSvbLlZ32KNrCoAv+qdXzg5A+VYEXTCSy0S+X2ZkRZ1MiHMMkXbzur0s/E0ZtdfUZr5Vyv0GJJHA/rDzIHuqgajxe5Lom+SxGWJ9s3Xhxot52kNEOD4bS/+cheGTIoq31BqY5QfS3XQUnkk5neZfDmOvTAoOEv5k9B0uPUgImMznae4mnaBpWz5BnRrar9aewyFKTDM+OrxkRuN4w7tgMKrlLld4ACTlYXpOoy3dhA0yhs/lYyTQ4S213jvOPtVCW6BhtZl058GutGZ+Z9wwVAWCcMlwgqh8zG73jhxRDbWmuWcOhTAJ2kN5aafOwEGIaRaO0SI7d76Dg37WUvkEFWs0N0AZk3FXDhj+q9nWmSRELpSiNjOxPk0gHf5zKceH2WqykhQDA7gW60sM9KDA7XH5bySyv5TrCgwEQGrifFlv1jTT1byPe//iZvC9EP4Q6l6FtywUWcXhVC7ooDzG9aqqRi2hCnxH/AKtvgkulgA2wZbgr3oj7JUft7GX2t/6GTqw/ynouUlPLe0JiSKu7fXUPvv1XqTP08EAVEGxPSK9gsPKbiwc/oiawNtEb49vrU5z9u2ckikz0eg5AhcZCDxisZyfXDIusRHFRUWAPLED6IfH/a8APn/XRUkb+urOdN21u8zNuRO4Kzimc23oHRxFUbajP5eq/FtNxE3XF3pXax8A0XaEJp0T7G3Tc7uMfGG3j6Yxncqw2PqkhvMP7c131tDph4dKN+LpdKaRzkFIdScrHnG12DulbM9ESXuOUlepFZ4U5vBl+77PAyK+t2ZNKCBTzfw5XFZIwI2ZdLNxlLOKrpTvgLFeg5VSz1RTcpKAyFuqS+6ShW2ALzULfu+07RKDLsYYUY+zTyTk5pBV1ZdTpeB2Zm8DMIgeqbRu3RjC9BCLjTH7DJVnUIvr+TNpnIfHoWfscdwcMsj//hl/Y3dWVXMBH71S6QfiqbtjkW7KUE2jY/A4ZGtOspCS4hlOSFRFr45gPjIBVuOnd7Eth2QBK8nUV/o9Z5mBfF1E2iNzsoLywDhRSHhjkZ8lgUM94zb7uTjtXwrqZPnQ01r5iyt/P0YhBgrLi1w58k8NDeFpTLp4ArrzKXsoU9vP/RNI+C2E84YAx7E7lSzif2hh11W7E2Evq0/PQGJpNDCPmcQoh4mqZrQHl8WQUXUWAyFvxb8FKgSazbyAYJgUC3ERAn8X8y6//+tCLfzF/4kmRiOGW6/CC6IAs85b+WIxeAzHu3xm7lpWdGt3Bb60Ix5HEGnYmtAPHNjDupY0Ii988ok8Ebn/QjVdgysGINd/K1k1H/7siqE+/57PE2hhZ17XC4ZaRfKZ+1OyMhPlu7htUYRcITLz1aXDAqpq+y7gLc9CM6S1ft5xm0aLxHm6JRwVO4IVhoJu6EOityaHRtlOM4IgWbL+H0mv0FFquR7z/N2WQl6TIXTxegDbVuyh7wZ8cS8GyRCmpAvfg+H1Mj+vuhFcR9pZ3czr477fTlQkgv+HJM7nlvqEY7nE3+Gbby7P6EmWCOl8EB15Cb4IKPV+bTdUCj4cRgWeM5BEdchfFBbPzoJVr+kSD12eBnIa47/NElIgOHvM7Jcfc38wWnJFlZ+EsfhvDkzN0CTcoz5+XBnkBGclj+x21luiIZYhHd0Rpv7VNTnrKgydOpLa7XDZuVhT3ep/dlM1uh8CgyXYzpnOUZbNdYtbSx0k77mc7uN8LLhR7Dh+i6ux8dco6SDoLfJW9Rf1kXioigXdzvbaOw3JZLq4WG6maPWOY3Xmy+nmIS07vFzThD3pKXqnHCZAYUMVgnAjDNiUAZvCLxMIcEOkZI/DECmTzxbyQlvIyipkJcrMnrN3QLS9AYiVgRIdagm//CWa0PaeK24sfAgSN0N6wml0Bvu8W/ZD5DucnC7hXrPwkaPj5Vck93OKevhLJEPaXmnO8iNGC4rTdmCJzcVLJ/WzTLttWeXIdqpSf2wwuIRAK9yuRNW17umgpkoKOqxxSFeFTee9/9jG+woWqTg8ugzcqObNdBkCz3jh8gEpFCTnKsi2/pd4mxEuYK7vv/uk1+D6K6aC4+5GxIeWLg7NyJm56c0Mao+0cHGxmBTH7Y6p5FpbM3DqYN3jMfUDRRe5CuycaeiCVtzE7UfZXWCWf60b5hYJm0C7HvBvQFoneL7cIRcY1sxezM33leBpkbCMIkMVyu/AdaIaTYOjnhfVGMMhR2Gd+e8QvcGqyqBk2Hf8Nx/tp66/wHgRcJLLsl86OohV+yyUVlNeHawFsEw94qPXSm5r7YyJpRvYASf14Ccus8uYirtKHjXP9sfQqrT2zf/v0+C/dQRG3bz4aKkaS08QruVHM+aXgW4ujo3xtmELK2SQCeNLghm8tHeo2E43quT+U6hdcDGaqmLkwqiHKfVglykM0ieot5qFCupMckKgn1aiHmgIeGn2af7GHQXbYP67IioL5wGMqu9SKerj5W5HIld49lqkc4r637aD+pgkpBC67LDDoNY7oY7AkrMnyOuv1rcHctfZTged8V5/8EY9Lzq5Wf/j3meh5RBQLXMozs/7PJtOIQ43MaAJUclfcZdfyRjqcLymg5Gy1YXSHMqyVtZZfwbLLWx+evXMoqszwn2SjzVUgeLP76lwfSCVc8Enn+zueiBXxH7vETuC964w1tzOpt/EqFXy3vYBPtVHTGbheYc1N3T/ulYPfsb+CUsWpdjCUdxYwb2nRkCmr9gJrNhljJLiwnFzd+2aZX5c5nv3yEVH905UECW1l5sxocJBLtql73EnbRue+hddcl66sfoEfd0aeHmyS6RJaqve7GFufCi35GL2Efvv15wvXydMyWEW4vRQ/9lSDmfXGEYPw0f8l4L/yWV3y+y/zE/r13uv9uQN7VZb5GVUbUJ1GBb+YpO6+zOQAobsCjWgXPSE4JNNAvtbv6rsjV+WSlGBczFd5dQWLZUUV4vJrkFknWk5sNO2aDSzF4THp3zlj8gsoP9Q/rIpJvTue3wTBTMXPwiadYcq0M9tkDCkgwLxLIZ1uLl5UcCZLVDb5RNWKJND9jhkNyTi6V6bUOQ7nMiDoBjROE1bzyWdoLuSuFqrg1K7e1HoAlp/kZqwqx4UN9BFJaZwEZVvV/gvar5HL2q04BnVU7B+ZDpYG/Cwi+hnRp3KmChPiwtWs0IfuhqHGaoV7MZ2q8zK8G+K+rskVJja3N4o1ezB00wISFn3Dw5ilrevTFfEZbTte+3NHTumS/8I84SboboPt+Vv4QJxgZQkWNlIlRYb6ILV0mf/q4bMFxu8i3N/3wvQskXH3Fmsuguv2pvgMwXQc8rbJFEtnviu1aw4ZwamNqu5kQO4sVfkKZyNQd3BzRttSrl8ia9b2qE0JqFYCnjMp6M1jmWu6L4eD0y8wWpRc+beP16oGuftpHPNSGnzepJWNeHVZELxbBe5EE3mqywAF7ng1atzhrKU621B5WPkWZcPG9aWw0WlgDdE/VflNodCAIisrZIAiGW2efNxa+N9MEGRtw9nOBRZec187/965yU1ALW28nWr+V3Qv9KwpGj3rOh5sZm09GGZSbn/74b3UtY8dXLclKpboJ9rDzSbnu8SmttLHO9aImgOgBw9Vpg59cOInTTszGRCKkNf/BoSLbsAz+4fmTOP8zOhcuTlZgtb3Tki18mCy8TT8x4PlW/azSDZ8O/wWx2Kz6d6Y7LSKf6DisDe9iyVYZRjVy/fudaUQdWVKBwjiDG6bQTNedhh84s4y/OiFmAHBsEdH1ydFdsCIOiCh72x2wHyYYjc3EU2nZ7rdbS32wVDrokMMG0w25/3mvmDBvUSLDprvbeFKcttPOHmZrmasa7tLbHBCZBe3io/B4SKXMcScykkC4ZF/ZcvSrTt9nqv4mS28/P/oHjsr30//5pFLWjKGcNQ+fcGtHRBGMiwf1viR8OcziMg42XxnFQOQtIpV+3BHiZeX9xb///96ly78Ao8dHJwGAGI9OAp6IEcA063pgXUYTADbGeiNNqZmptO4v+CYXpxKkgJJj5juhy0BhuvpRhTk3RVxScSz9Yj5qvAkjaDfbuNz7Z/ArK3MqoMH4XdGe1dX2fb4aePBHU51kDeU867M85uR7FoP/3//xz+IkNBMHJaKM+//9tPdNf/2tYw8+Si0lLTka/VobbByjtNg2uqzFu3Xr3EGe8dJ8z6VaUO9158KUDUz77OTa8TLuWu4BgTLbbRGGERZ0JzEDRfnvkP3IVss6GxGbTU2DTfKUm+czjhIbnqlwIx7UIGL+BouxwJvIFnwFPcaJP01qtm76nt/nYPpoJ5NJETBimMsZAXIjAhMTWCq4Pne1knPxtoxkKtiLNsLT9/zE/KRyXXVzBzM8Uj0kfduGVyV6jz2xF0WxiVa3nxBOSR1bvATmS9h7SwKuruorckvVH8j8D4jTcfKrCKK2Yy7uCcSE8MEjIPQmVNZfKI/D7sH7PWkWHbwCF7BeeRIq3zvdJS2Wb/vYmq1BJGAOAvyHRsOsfy2HT//26KE14LxcaFM/wIPBl0IAf/MSUJY0am22UTSkruhhcLWco2z6vF3W9/P3YqWYQsz84KRVTc/hykR1SjmX7a2m10j3oevNfd6P+E0FnBZueE6zDr3+1EwkKvDRyudVn3hLL8VbdOb/5zH6P8/89GOX+/8Hx9TxtwWGPSDNojWrXfJE/0E3QtTmg0HEhkPRsP8Pd0ErEHJswZiIzOObWl4A2PNPawsm3tVU8kjyv8taZ9CnJDi3TB+HGZQxJNZR9cyicC1lrFxjWts6siSMo98kZPkB6PMv/iU6emx56fZe7QVY9EiSQ48pSDiuCM6g5OFyt/OzdRVoJRsMQkz9BISY7Y2PiCQb2vzoAYILkaZ+L1YJczSTMSjnlnZlSgbi0/S+tF7ORieXpmFcylsAtLbjph5CX/TUkY3WvZ/2LmAaG1PR2jqnJwUuQI0BIpMb0HRBNgUjPWMSKZtwxeT8lO6Eiu7nCmFw2vX0WmvM6RBEN2QB7uoHAFPxd6Tp8UsVdKjTlz5Sw7Zn+WDOt0hbW9ODqnz9GF9stdsM02YbXRgPcTydCQHDpfNzdFmlo6YmNuCrPVyD0rlHYyCa8AW4nB66yKO3ksjEPVZq9nYfWZlF4yW2v03GeiooXRqLw8rBwGUMbpT2EWWq5K6Lv/+b5e9z9silCw0J/Fgd13YYL3rINEG7wakwLf/7fyf3kw87m87tsF5e+2tNOZwmRe8x9jJWn/5Aw9hebORZm2ULJ9gXfipZ1PdQET8f2kNzxWk/XG1h0MFXxDgeCTw8IMFHvYvAYpb0S/ZkZTJURv5hqRf7RHktNa5hCRhv2y9FOVjKd3NWYmbBP1Ov5JvtMTu5Tp6sj6MvofDpBKHBGiyM0MKm3cCBJc7uSGKXDkikfy+E5HIRRcJWgahWG/xnO3qpWO+hheTUy0i8R2p9b/CewBun1Mzq1xv4Yg3nIuYfe5Og9V38+8pKXiainDoITDo9tXi+ariaByiT1eEcINVHxFZ91q9oEZGK+gnzp6w01I50TmCMoLzeKV56jEZJg8F2Bc323evmwTqcnur82rqYvsvlCsdpbpAuB+yHboQLxB7D3LrOkLq/NLdioH6+po3yzHnfSrFdXSxr4FZhh04KNVT9Q4GVk2//o5EZV/cO5gx6jITXkCJCxcmRG74RZLw0GpPSbIhOT8bALV90cAraC3aBmuvKIfaPeK0TX5+0pOfd/tZrWfFLFvKtyvAzTy27DWi1an0az853nNtRUlz5UfmzMWvLrhl2NWWn1/wyAdHSsyxwACmlGAgIMzxC9Pi6tNIeM0UslkhkcQ/wxgEUvgPEXdU5/vZ4896hX+m7PTCnh9t+hrAf8R142odUIH7hzt+5fnA4DB/zxIDmwmukJehGL5MsD4Cuz/v2Yw8gCZz6e+5QqVsGYJZW98/0JtckMA9tjZ8DEinTayhH+0p90ZkkQdXqBpX8+wiXnya2NxMpmf++DQSj/gX84lujOGnB5zvahnTIDmU6Wk96s7dsr/QkJZs9SHAWtyKo5+LFfcJa+0x3r8n3AaG7ZJ27bVaNv+SGMBmjud/zO+Tto62jP/p9EnFFgmwBOOiNz2eRUGRP1sodR29kUWPncqRYtcCy9SgCib7MuBVd84+X8Sg9QyyCFDAi0tOFZUs1iI5wLbMETrw3/+mvSt/+fc2xGkPtw4vkxHUB2F4YP2uNkGTiNwAyt3g1XXOc/LOxNU4K9fWNUwSSTq0dVvxJu0uYURW/4Y02V1GlsCF0QUXvLD+dgG92AiQR+UcVgc396cQGllPn+rUJCfo8+8ajKh7B/g3mTTKzxbHIipmc2TxcogTjnOMzHC/UpQnEFXvsjLaeObHB3c2wRlrM6u3xNfD/V8tGfxsvGJyulhNF2rB8mZ9PZ+uKCGd28zArVFF1uhw9atW9q9ejWkhYEjCCgkyX7RxbWgCsgJ3hFJgwaUozMGaGDgR/K678BXev/mGqTSCvUbzUBBoyn/Gl0QETIOnuJwMSToe6wTDKLndq/9wfjmVok72fbgNP/kmLPqOF3B99O9fZwCi5qNpMXOIujCpnF06y6cCWyNF/V/U9VFFAyQn3lAYclbOgvlv94aog9WzOzM1LGdiitFGrNXz1RzQRBY9tJEG7VebqAf5s4oXZbmyvkBRu/SELZOLM+G2CGs1DFBc4jofxCCPrJzqtdNvjJ5yZ3ndN8ehKibUFlDm+F7sCEybNgC9mQKwimXh7am5JL5ffNjqKIUWCb9M87/wnqP+T8F0FyvH5sgExvj2HK/M7JO9K1+9iEWLKzVa6uWOmWNgtujQO+RR8p7Jhl1AGyfiAkAWgIbZmmh4FqfPeihPZLEKXo9TfuhSwuyvVlHw2xe5ASBKuSJrLDYAGfsTfrscYMrrtWCP2pyor7bpGOHePyFRqy3Q0PT1fou1kTR6lJweYeoMj9+VYOFxMeDpqFNdgdEvK5IVcA+X9T//7eTCSgIE6igg0iCrJqn3N7QUalcaHR3rDC4CREMP+0MjKJ7PZgzeFnqT/Lo0O5HVYNoyT54KaomPb+0w8hj13f/0d3/OOiZZxb7bQZDaZFEEl1jkCTM77cENtvtmQcmyyAxPfPpfOF7UOGPElZDiQ9Wuss1WpNtC/cx4R7MZGNLFydAPyXytaqIxXSKfTk9QuqQtr+AcYDvKHNZpax5aLZhDnolh+6kcsjn5rafhGKQQNy1w15BL5nCJoYLwEoJ5tFwVXUgrcTcHREUqg9kG/NlOqDVEtrdx64BgVVrCwerBlr3pjPLluKf/mWbFK9DIxYflg2l3KGTljnxTF3uItHuvx1qV/BUb6rnn9/G/u4bQhTaLUf08KCu3PAGP/q8Vck0gasC4wdr3w0iBiP7yzJmL7hSQLmkBMI+e34EBLjX7MZlz3WmC9cBmEOtFnPvtD4+E+2HwtUZNqmhwJjIAFcBrTan5UTQlUKu7wBhQMlykvXLCw4ohXlSRqIpi9Kc3NErrDPwJLA/apFny5C2CPbz3bKhmdBd27WCYq1XTPgatNwSrj3RsJ8FlwUZrt2R5/poLEkiH7Eh3/5OPB+sux2pPf47nOtx4/2SaNZgB24b+GKVldFxp+n7hNtkvCp53/b+yGw/k+zyb845eejPYrCDRF8ZneJak/TY5P2H5vY2qmXEAKoGYq/wHaIV39gPoX3C7jQYO5aSDZFuuxo6Nq5cjVP26NK7J3qZeDU03k5eLqq4fWn63ETEqeRQaRtpQlGNiETz+EPM/DA4+6myVgk/3cfXlKMnU3pD5mB3kljEUAL3tCERsBJZqgs+ocfe7v3Apn+/H8yzHcIRWDnAII7aZanr6Uks00rpNny7hQLARNL1uaS2iNwo+/AGsh3OHLK3xEtGeSoLxp+zMcUjnf1bsVHvVSyl34qHPIWWlkH1wM9oHp/0Wg7kUOqXUb/qsU8GlUuIldwxPSHyRHAqy0sYtDjQmlp5sK0n0lbZN8jbzt6PsV1twTJZZgIFGU3fRlcw8MYk//rL+OB8RK98aJHn5ev3mSGxg3RnQim4tu6OZIuRMQCwq/fs5KxjRE7Gxyhby60riRcfmFTbaI4LZQHdqVQimtOKJmj7AfqR5HOI2LNO7T0NwzVKc3skNY2bxbcyo5pGql74+4DGCKXPdh4lcrjfShsYkDrZm1Pzdcj2c9DVnfRbpexZkKfcJY3gf/nRyq41/fgtHSpFqlTD/02gPrM//GMarqrPuaRxBcKXEYkYWfR5EFjj4Y7/6Zun2qJBdu/xmR5NMv9BED/FfEKcqBoGqZjQBGCkH5gxa/fKYIxQDXrEMrgjAO3hYA2OGA5upLl4mrejtl/sX++Jl3OgtUSSmebzFACarevT29QtlkFiaHX7lNAseLtinR33CI0B9r14TG4orDa9KGM3gLPs0Z7G/ajVfXmRB0tWnJYPpKaYj6FZDsPFMP9cWDDlNvWlSydLnj9WN4mUqSImE3SI3xEieUJJVKObHsrXxrd+aZn6o+acBsxEGApSaXT650tp3pJm7Rxd88kUuowTBr9qDu8VfTjIQxa+uaPli5om9VcqYjhgFbVZwX08SqS52MYXOqB///ONqq6WxEICDdgPhRvesUxYp2Sr1fy3rp1V2A4wvTSihoR9oKhQ1QQ5UH+FyJ9esbc/AVj6CG8ihplk+iNYM7TjbyrJMPzAMAnxzjv//NKyqvsFhkS0Z1k/xdtxOuGzh35z2lHuYbVZy3UICeSsbmzKW0HIYLGqbTZoDv85RmJ+eS/XU2ET7pHyLsaZu4yHNSUn6M4nrU6zllf+5i8PKbOQeCN6VHB5YM8wOGwEM2+CSz7uUyk94QeaZxS6msrDVOmpsWAaR1Tq5dAaKKI7yN2NRT/yP0mLGpHvB9/R7T29J93/BQJl04yf1c/2W93Sr/z4p/WJadxWEbitc6omjXpuiuWgCGhA6uYiaKZI35Lizc0JrpUCAStYmwLtDzAcPlCZn59YszN5gix4XaQ2QHJLMs6F7f//z+oZCqLlHs2czzOm7D3fzMmNfmVD1MbPWZgr/LtjQKcQ4VE0ZzkoDMxytUpZ6h04cVW8eQRR/YpiegzRQUCnTiYvIAsxTLw5IZ4J+9OGUJXH3Ok91Rz16TrwWASACfQK8UQzQTeH3eGv2CcipBc9kauGM+doILf3kGbkN9RuAJixi73MvTMWc5f/kpqqFKdLue9VaJ1jVklsix3qM+4OFrDqQ2/SIsWjh/ajSW3bWNrKFtlN/Jjr9u/3gL5hZS//0ybWgIZ3v5seFyUE1iTC6OXmsJ2UIfVmfzTEl+J+Vzb+2vAI4ZkfUeGDj7LLMfc254iPA2zshS5c0mKB6A85qdFleNSC304m/buEv/z7//b/jwrw23WpSci69JcaxNzH5y4WTCfuybPGXDH8uVOcw/mA/dkRIYpGdlkbxQIvaW4SjAYhYzeeiGrQpy70BbgEyyA7R8JfsqxmRAeq1tYdK63fKyEN0AXVsGNf/6xwJPcB1J9R64u7/+tR3ByOCJNCXBq8GbxG0DSTGd+uUh9SASN9w+Y+qkQ4dUc9IR1W/Q5SrxNG7lM+87x/+uiCnvxf+g6x+P+o1azCdfyRsKIcKDg059PE/YVsrsH7lYGR+b80rUUNK8nVkAUCdEfzdHk/tSH+rQDzffJcaMyxn5bkx+x/k36ecQfUtbWFUd/BbU7eL+EVLZsN/Q9jFNAbPlX7lWs0/+ZWMIuwckJ5DEEJwwLQRY0D2v5AkHxg9TzCyxM+LxAbyckV3UUQXikuBdsi+P7yDRgkH3pmFWXnQNlxeJuF7nmjU/irdRwhExOo+e4IanEjOviPpL22QCly0gcvSi8y/xuOzwm1ugoXUjxx5LvSD7ttxtBZXcI4z/cC4ORpAE+eKsLmL2O7lQfFvNxWws0qWi6VXGz/V8TDZAJSGEW8Xe9+s5Msw42PLOMSVphZZ3cyrtA9kYR4p4jv6Qnt86hbkhVeMWNS7/iOpKq0TuiHP3XL3Y7MQIQpaAse9cmQct58Bg0Er/OOy9WVhUSRQoH7hgqxEEbpHn4Gv7j/ydDaEaumPIzlPHGJn0Dvk08I80MGupTOn9ic9CDLaXLOANLlFY6gKyvzhBe+E/0JS/gXUBQ6QiIOJAIRjLLuGkI2dqoiYWvtloH/bQxOGuuUosnDQCRKfvdZwRABZ78R7fHM+mv23n4zMFildh8AbG5gN+YsDaxXLy2EYA3Sb6Rnwnecu10tdN1akuya1OQtBAAjhIJffY5YZ8NEHhgVXZzOG7mjL/+JHobWjUTtKRiDkVn0c7u2Lh6nqdrD0+BM1iKohlmHYDgN16/mwYqAUeBtOAmfyh4MYxUR4dvo/jeIjSyRj+k9frQy5Y6/0F9Hn1wyjPeEmgd81/4N4MrnKO1vk6OBird4PsLsksrwz9M3Oo46bqW8ioMQ9UVnPqCS8k0mB7DFa1TtxBEqxZOVVcCJqaK0fR9PpZklu6yW5tHpSXujqcFgLcCjbmj6/Kex2dUYEWF2hlG5BZG7G7sf/WMo/PnwO7STg5d2BdLw6dP8Fp/XtISDrdyiNDmifuD8Rg/Ijr9BX7Fs7jA/gx9ZeGJ+4a+ThuHhUIx6jKd+Zf7C460fcmKoxtSHExGv0JVPEi5Z+pKHmIOWLGHu2A7QI1nanYzSjBQKVVm7u2z+nJD893QhJpN7m4bbiYA+He/mzw6Uuf/UUIB9s7ZWW3CtSsTHDBKaOhyv9YyzfbwEy4ZkZ2RdE9dkE50xDZn/1LQwm9Z7qNakvMK7QR5PvvDKaV36p0ai54N8xDRHWJyb0uSnsRubjFj+nRO5eEThoCNsFUirV5yquoYoiAOaO4vVXUzjSN1aoNz5stclLOL8m13Xgm2LlTga3Pk5ePDtEEsbf9bD0SlyEFvc5ymvfAm3//+4pO/z+9qn7sV8zSBmLmEsHg9JpTd6tW6QdHf4igXvbxi1WkiSUYdZpbIvplWxFPGuAqdInD1IZQQa8MThS8EqtMLME5BAMgIE1NP1utyUq8YCHAy2bQq0VYu9P6vTgtwOl64bcFjzFVi8w58JXS1MSLq113NBeqsJL3hsxVnFvteeWVO9wsIQcOnKmyAhAL/buF/N7UH0vv7RlemEbwcMnAlsnVpnnUYMSXnaxgG5HgjOvVacuXkQxMnVDqHxFNaJ3tby3ZM+DT0D4AfQxhkrmevhg4Oy8g07NY79L+Zn2vMUjFe2stfbDd+5aowJnY6ZxiSY2XbjKe8AKhTXhkLyVuWsTjlCu/LSptnWTRZ4duU1BFSLtBlpvI+lhryM5I61OGk/2AmMucmZYvKK1FPQuXDzHE4NeWZ4zRM3klX6qejRM5GTFVztci0+M1tZH3uAaXdnRpaawBchH6JQX+n8L225mm3ItMai4AZSo5Nz77Pyk+v8HGKtU0P/6G61xFzhS/VVnr5v71H1hHcst2D05/R54Zc3xc5csNL7MbshkhERA2uwa+hImMdfVXp0+GVg71B/VnFyzwK0LAcRdvQkeq67aIYOLuMatj3EoQDqRKPPLCgfyNWGAlUDwqQ8V33TfwyzdkHdZq5sKH+0iScGPcHwZvQAFqjln4ZYdwnzmt9LhAltI6DifXErYwWACsgPmFF4Yz9Ssrn3VwSkkCMkVwupqwp3AFwym0y5kKD/WEmJ2I6o9VvmA2/4qomG/N1h7iurKqjfiVEVLmbfDrhthX3rp03lrOgd5rpHNNN0bptPajxSvGHVedskqP8VUDQMeN7YdYj37tkAvkNPWFvkfjktfysd/s3wFzo1oFeDCf78q3bDFGk6Vw/0naRxn2srN0psNxea57pJP+c4Xcu+mh4fpBBlTf2j0XGeIKIBkNH4suLuPLt4ac8fidHgWiBpshugYsImpyNPuE2C0qFGk3UeDA084YuW/Ksh/VGDJVpa7Hvc/b1JNe3IXg8kURBzxWDN2YBxJE8lejuVJGZCS5RJJo2q4eMEgbnEMiqk7TYeLH6nTWw1eRFZBMsTiglVaaDzqmT45fOcgkfxIkhFAF0nVhj3dLj+9b43S6GEPY/FwUFkWXX+x+PxDcHn3HeCozPwPQUzY50cDYdW+j94ucwMkrve9y09HPRzL8lNTNXm0DAOEhWlw7xf5lPQXE9557/V6lQTWQKQ0meLo6xYMW7BOsOU2hFwHd4KlGlNVt6lUIyn4j1hAxISI81lXKm7yigylfrAGrMQzQT5dK9OxC/4soPtflT5ydniHiF+ncGjsBbuZNWeeYpvkTAMwhtyHbnfveIu7fq5nK3hA4AMNvTa2PO4jJ+drd2HFjoYmjxdNTPMh9+h7IF2hhsozNf/fxgLOIVBuSzT6F7F9vIyGbGQLthl3UVXu02KLrN+QM+r2WlLEsTZoZL7yuIoDpwFAieRS94WghTI6ud29Z0QaMRkAPHgY41+tkSZMRpuzo8jhigbNUmWJX1PvM8l5Tc5Zv1PKAME1DkD/exbW7oz8iP9Uzch07AiyvOUuaf4kQcmCjurOJf0udMafJrqJDMaV8POV/gnDrbqsPgkdTeMsdwkedr8QSZeJLojHyYwG8vd8+EqY3crbqrFrL1aejjjUk1nmD0JJqmFTnoSvIjE3qSlAiej95gbzvb/0EFW1Wt89SPupJnUP3+lPqBQagb2B3wQnnzZ1Ps7KXhjJZPd2Q63iFMMgDmJnp9cJMSIPkkPiXMif7j/UAj//M6iM/aU29sihrAGzkZ0hzMMJRSFXACFPsfHWIDVPDmS3MN90fH8wfPWfdHkdHRrA5bQeEff/7/euZuU26qTlAl68kkTd+VsH8cLPVH8YIp+X3HoY7ilwbgxv8yXAjqffEEnGKY/s/DFatmvySi37WSMXhrqpfdDKuq5dn6rjrnsnDqAlr5PXSluetHMtWaplV+bpg3QFwcqZp1oQm8mqSZQbQ/XvgpTu7z4TaP9dcr3IvP/vfEwIqHMGRFZq69Vry6Tr4uHLThHCMk2k6cJC4RBWhHHoFxsLg5qgQLMh/A+tlh/44E2I/pWW2/0+f9FuZhpZX4eOAg5cu4AiyLBWZ/9LfAI3/M9hPMjzAxeda4Hcvg3KIa7Mhv6IasiUWkTIQeKFkFpeQ7JtoshMlKJXNuOtk/SxhxpuDml+fzFionrCvyuQfh/21wEjtxVvNh2zK1yAO0dRTL6Z+bLzoUJkymtfZuuu9idRdX+G1Msv7SyZAT9MutdqwrpFF5gCCEUUGpM76Hn7QN/OiUQjc5gsxGqEYP/fI2Nbpv5mXgKStVMjurSx0urHAwtkWVVjgS+4bfH8z1xzbfnwChwcpczFOAXhKZeV1COGgmlQDUhCqvr1CK6qwvITnPclbSzQIIS6trq1lCCOi6cRSPdtB0FE2YYnS34U2bxrBG6ZxRX7hpdBX6Ea5ZP0hto8WUUrqMNegHz7exFCpRV/o4SDfWb/wwFS/yeDc/Jb1u35/laq8pRvQInFzxQIzo4OPhtLypcZqketytJBpAFDotjiWdptXQ2JUITUSMrr66X31ZYFttQ4UHbk7J9/ymZaA0XmDOj0pwguL0uskT7nnI41AUpr0L0miOrr8z0KvzBu8jYyBxfyaibNFnPAlOmCB3T5O7yzBPJTeQHETKRnYGEPmXz1wZcCTLKd1YmQ8H///W/vfeeFaSTJBvqarZ8giIyzKHgXvA5I4Q+PT/bkMklKVZXgZ8kH0zbt6mrztJG3k1w+cvAbUvD/zIs1mKCqhYi+wlYNrqFnDayVNsImFqZ4g8aK3wXdSSuSgQLgFdzwN4Z6WfHpU7y9wkHrQr30snqqE7WVfOo8NYR5coEbjB3p2yWm4obQ9aVzPfqwtBNlZROUx6Ev+TCF7J+ky0pXsZLJR05OxB8ad3tVZkqtutRCLb/oyscxWIwCpF/Gni1qFHAmiZCsS0OLPXUfxQxkqErhT3KWPa1O+OqCiKkLg4VSpnXe6Q1P/x7ZPXgc8P4TOn+wteMywRRPm5fyoepuxWJzWmNbQpXKFliqoHPcoz3smDMdlfxNRbOq3HtkO8nYmQpJP7pHRlPLamvCfrTqlorLrGK93NnRZ0oecsvBiLkL0pCpbU208fLgXPxjv4KCYR8IehpkfvfkxCa7F9i/5IpASdRAIuWXtp9c2xwmzPje92kLczC7I4VDFY7wd5J6GJZo8QOq4nsvaF7CT2bzo+jG4irtEC89c4C31JjUtXepEppFlI16pDjpZ9/L9s/xqINuDlEkbL4FknwtiUvED5sVz664thM+wXNsDEfBsK6ljuDQpWbNRvFr38eHbWZHSssr5+1silq6CddeMzQQ6IHE5hjhG6Bv54htjJic0It2t60cpwUAxhkW5bhGHW2JSJsbuoc1Nq1s85yo0O3eVKAJUV9GTlcTSA7611U/njVRx+FuH/EfiwFlgIFVf6IAJjIZ7Yej2Qr+ZCXxEtoThW7vkAlX6oxKUrjjbu3LZSx6ceBeHE3VV/WV3cuhfjD5+QFL43z+oNLKd1WDWxVlx9vpuFO3TVWPr0KQbvJj6rzefxlV1bhBiCefCZiJbWBW8Cbu5wKOFu6hXHTmISyAmwMh7pV7kXMaZkufXko8mBfrKnUyxUBPPUjqcPwdca4qnnr1IPUigg/7t3NP8UEh4hlRlNfF1yB/PanjMVn63RUcLg/EZ0ciA5IhnGXL5Ap/IIleogjBirsTT/ZaJm2opJGizAbKyVKXsSJHy7mp4WVFbKL1ou5KOf+L1zfXvF/eTKKyTzWykhyJsq+VFMw8xioLM/fRVt9vdck565r+JJGPBbLMw6kaF85KbFf1MFi3EeC2MgdgjHg15qk5YPxpJFAd1XVoJQN60r1ciRIY9MXjHlyF4CqSdQeuI3NWkwyQ4E1GAAUa7M9ZrZ5JN+kr8D7plV16ZNGsroBN+3KQ5PJsLMgYje/yKIKf+zyGXr+4bctAKWa64jQMWi+eaguTkXJ7n8G756WzB8yB/aPfliX41ha7nE3hcdWRAsCfs1cqHsf+h6pDenm7trzdgoofdZWR4BO8MfzuFn5CiMPk5VAq72uuTLsqyeLgul/pvVxWUFmKPppguJW4x+6BW2z4dlgPOZlaSjnwyb7Wa1cIVQ+6DIMXAMfB/qmctuJ5vJnIZ2i4MbOKpNBYjBBG75fqrqS+ffra+BO2WTQpcuP21ooIxsj/RZ2BnFIBsQjUH6EB+fQqtK/GXgrwD2THPXBhALun8WufWWyOJh/UHHNq7PsDmJkJMQ/DKy98Eem3QI3CwCpBF2ssQI8Fj48M+OKfcvraGyDjj5Krb20E9vFH9/20tTk0R3FFo+rTEju2F81H3RJD76bZdYHSgjOk9xm9PmhTnUthLyztOCqLiYdfRwsAnx8QcokzbGvULK4ivnM0rBBo/5wQw/0ePU6zQG8r30IEDuyf3eWQv7mNJvRYjwyEB9Aj36VlRKlauOisdhfENCJrL75WR8Uzi1kxgC+8c73JY44y1jW9CD3oxNXdJZcHCUfdoTzWR+lU4ceHgmqsh/3uODKs5ir0aNNQwTiCi95tYiB+5mhx9dswRnPoqXfIn8jXyFWXpQvaKA8MNQ4Ujv600akKxDjfCY1dgUxBTY42me0yaxd5B1xiTai4mBAQb1/Riv/fFoxeBnhTjgmat1I5IvxKuenRBUNfT8xFa4GX4xnk0bzl4DxnkpLaQVERjjsvYI23JgXgFwDQIN2HrYl4vPnePoEkInm5/VkOlyFlkSgFvlc1enQtsfnsI7ZSRJaKRpTIdHxUsQl0M9eg98bGUu37TqOgGNUoplqfVmz+o96WH9VgS8YRJUlgevb6MlFwbJJvHLTMZ2FsSS+n6EDXGq9mrUdQzYmEcXmq+bXxm5G8QiFSAOzPjRsTyixaYHoD98yHjVlbPsdjvpM8wIWVQoLuHgP7MmAk0ac55pTIWERW46+BqUcTNvuQl7VNEMl6u58B3FKqvmmIt8sJ0yksbXknGC+/8GepT/lD6T6mGfKY//1guBkJq5HlpCeuoINNDeT1EfdgfkxYCSRDPeLlu7nmKofnBjQi5JzN2pwxq0T3BDsCh8OmHYz3eel3ZQBAHfYaacMBeeG3dctuEmPnefIRv+VmLSdPEjAxtCszdMdBDSNKhNtbb4BzJjmDTWIkwyIM+HvMlaICUqfYbvqPE1tkzUY2kcgIiXUW6O1fbiKjuU5LWaXdH+ZnPtJh+3Oe9twXLsrOsoHAQ4Uaew6oK04D1QzKaP5e63HcgMEl23e0rrnNat69QgUGQM/3Bbqjl+/Zyp8ERhKICOcky3SySWputsZ453ggwKxd0c2wVvvJPEa0UCqMG2JFWjrcpWOHvtjnCiK9fQKgro/5mrqrvZcVLKrhfKeuqH4+1P4Rh3I/mWtLpyHUx7BBgE3C/mBCne/djGDxvWuZeERTGiNzrpLuAQDZlBT6EQD3PGf5jC1JO/W8/YUxSnofyjf41Sw0gt9oC0MSf4v8pJY9isPj4vp2vFs5e6xqJxI6Eijb1yii7PTL0+sxRI37NL8/HopglrGjV/W3UoT+szhOQiw4TdRF+ia/ej43/w20y6f6aHC7ijrz+Ni+8xV4eaCKtA5qtvkcx820qg9xyEv07JcxSbvdzXi/wUP80RYq9wsQmDn1AtaLrJsggQdFJPkXUPr2CAAkcaz5HfWNqlWd9KgkxtMSdNWAvH9cnlJWHAJa4SZEAe4OmuFjpFSCdbkZ4NOFw+gr1upU+0UAy6S6iUX27EiRISVFoV/qKKOajWnBQRaF5Rb9Ux2Ui/pgp2EwX2KI38Kg3ZjAMON2yBnXwua7JxVaHH5QjE/P1GtG7yJTtE7KMT+MFOnwubZriJpU2Yoljjy9PoJfxta/+kpdYsY+u/chJzsA9zEvCDpwY3aTuRAMTsCfEfWgkjmgXL++BGceH/a4wI9iJz3BZ+Iz2QAW99s6h1AsSYi5+7pbGjCUaPhT0668kLwroD00Hlo3RKgUGjmZ8ODgevqiOnRD8zLRq5tM9Qr1LAUYbWc7vPmiPDRQS69V8AyCg15tRIO0QH2+zU317nU3WRpytVq9FuUhpXQ8lrEhvIYMSAliHH4pFe/kQVcezQXqkjyNOqdq9f4Db9nIXmgBqizjMqCNOUVEj/UId0mgGPAFPso9zj9sc54nbHUqVzlG5sK42MpSOJ7pivknlPVn5ByO+9L8obMjGjHbIjVZievhccT3e/+I4TTvlZha8ll+uNoIaNjtAVeX6ZDl4wFdtHNvQf2ODKIeb8HbUZqTW1EwtpO6OdJA6bPvj88FVfA8dX7fSckE1CLdHtne+F4YHZT5lrEvRm5Nw0Z7KF7H/gAOzadzFwRo15+DAis0BcmOlAQAY3Ct6bxUphTatCFP6k2wYO2nBeqHovbHyETZ6daRDOX/sLKku7tfxg+/OMNFYEHq2g/JcKv/e92vXXnUqJ1GkrPFOoxgbD6CdBnu3dqb9hnl+2RQe/s/g/1Y+SjGDoBGQZOlH9B6cbbPDUbVnrl0FCcsJpm/r1gZ8myxTsZP1xQK6cgL56bxPlmUUZ8wnKD99Fm3FZLtsSJ/Bxt5UyOLwgB3cs9VuTjZ9kqDkMBs83OnEsbvNQofsDVI+ri699YZoitPHzeh3yx1tiVu2VNaou31kJBm4WC4zWFdPZGbrda1i1qpvuUseH/mibr7bw0A5rDwWNUSo/bGJFXF+dUtpzyZ1WvLg8TrA6Sh3DbVF8xQybEEM1QrwYpfV709H6W/wxPKyy8PrtSwCQ9yjGPlLhHB/UwCL0Jay6St1Tv300TiaXrKBsKEoTLLco8a5TSuB5qP14eiHjO9bprkOhufzf8HjAPMEnVhGr23BHnKzSxCu80/0jz/PGzd///PD7snIDxA2clG3NqDmcEO9Fz5y7GQWCVqSiex8zwgUpb4g0rEADtwap7UO7yFj/N1HUTm1MGCoN03pR0CEHrq5QkW8aMrUUHCMVqvJ2W5dgzCvmS0v54gYQwbic6SS0ulTT2a5+wkmg7pFOmp04RCOIfk12ZEtyrhtDEfaYs0ccM2j/hsMm3YyUSgpT8u8pWCA15M22GleFQYwQSOX4Z/q6NcTz3Q2+Cc/a5krKVteb6HgzPRsFz7yw2VgTyysqeGqrydvbYZt6PeW2Q7oY4cIAxrgaETShJqfZ/B0tv3H4Sg74KNVp08h6d1lTcUjz7IW7gc5UtFDsmzIUaHnh8d1s5+Ar0VWx1qTCRwzC1CmGDOjV1rX8TKqbFA+CxYYcnEPt1DEU1J7ig/gLYYyCfCS0UbObPUnTL09q4NC7w6/VWlN2F35ujxdptBOEmFmJCrQO6oQRt+CrwHi8sMlQcQDbQqRXtuOmY2eQgN+tBwAFPojeAeyaWSHnIH2dHUO8cwmfcXA4ayUBvXUO6yS8/WeaXxMUJaSIAv+OJs9H4YhLcxCsQHc83DZ5SdGjqi9OXX7cRVButnuoKCxTbxFZc3c0sDc7UMTyDQ1iEdvYYl4X+WphMMWVhb55qkmYn+8DjCzS8aA6AiPtanFInwK7vwohAhIvuONVpt4t58e1kUptcEJKJ7XoCx+9Ds/D0hohDIPXUc4LnvK70emJSEd/at7N1q7mifwLoHEUeFzmAxLr1dX97RKLIXpWNCm7u0ToThurMhn9jY3XkqjwXo439/rZIJQa6ZDsWdMCMCf4w/sn3LI4kj02838YUjcyjOfHfYEe0rRio4fjPvVo3zqptp0mVpdTpynW2DlyK8JcVcrBqdNJS+9agAn3pug7vGh7vTDJb3DgElusTbJd3pwm8kMdLz4oyJeKjBE1KKLXFvLPlz7gSBFJO/qpjJP/NQNw6+85MpmFXSz08m5F4iShIdRZkqdupXxqgyf96GLOuwb8M5ZBYHpYut9thcPfge32w+JhWIVAHcnmN6z4PKVs5eKlaZbKGhBhT+l+pUS8DZwYfn/bck84i0O5aBMvpZQ1Sqniu7byiAleC1X4Wf3CDtDL+2JdwV9rTVpYUuXugoCW2wmE8yl5U34K+vrWtxt7PwFapUnSiV4XL1cIdWuMxkDyRQUcxazwewOe9ND3EOnSXBwGmAiDX0WXFfz8U5tXsC42CmaA4zJGOVuZjeKyujXUStJM1CQsYbatpR1aJ092c7kU/Vuxv9HGzX8mfhdUPP6+V9PWYfNNg80lA8r0q/UA7aGo81ri4TYGCq+EqmFrRG0ZCJ0iqKwldILYVmUnHIbulcrH9hA3IQg32gtVZjPpWMNglwSbpNJnygWkaC+Juy9JtwIqiFj/YoBrm07kYu4Kyq432i3+j3O7Po4ru3rNL/UqFDAJnSXEw4aKdpzdH+U8wyloTsmUY25GSSy7DKY0F3vAUQErTD6+apE9/TQtRBjhgmWRlpUQyjnbqSspHVMJHZ/+J2S93847vgxm2caNwiIBQ1+DkdO8zIGRlU+R131E4d2zGPLUkU8uI0frdMsRm1pCAsAiTcHHvsBTikw3w0POMi+919h8Z10zenu0Do71DVNuiyCwxZx3ajTv4OFRf6fLMgkIFvgZH5B7Gk0gy7sXH54mYdgwNXx473+Zzue6HQRBrdL0N0qopLOkNwRM9ZZZ7tyUx6Cq1ofRrLBq6VqHnobvsREEhXiRWd3WorJpFA4YvBc67Xgav2tdZGW9UwHISfXU7Jy+7IFARAhEboWyuJPW4MNRMl77Eiy7Y1Kh+s960KazYd7V2h46b4GSjRKiYc+z6SKphlnTWdhzvIepnH/sqLeT+rezsAM7nL3XQAlVG3m+4fQL6yRgukLg3rnS06ZTf99+DLEVOp2+FXpLT5GahDZuTthDlR6UwYJMv/MsHLOteGLZATJWfncVEK9X4Y3RIpAIkWQUEX/QngZF4k//966upBJ+YLQEdM45dhZ6xrWlYuoI5Eozqg4wQsyHNKOCWYEbWBZhlubvjEqOEyPvY/mzQYBKW7VtxD4FuOcNxzyFpUVCjU189pADTPJ75F2zzzD7ik7FdwdTCVpkJB0pb7V0FoqNzs14vgZ5pSU+vfCoT5f455/LBB56GZjiraGJ9RZ8Ez7Ip6SIhKOtOkjyIqz2+rlFhwektHLJaNeECEFpVRJSWeiwEkjflxhyIqKVJwwWbmxbRUVAeMdkrOAe5JY3xbeocY7X5XhDSEJlfHpaYuHlCTn1S0sBDhT+giND+GvLhzt7M9NPlsBIABZ2kDq92T9STuUty/q4246Z5O7abMccXwWgfDlITjYAvKVq9Y/03wwjXe8fFs+mctzbEGwV4lX7o+G3YGWVwo4x3Q2eIeC2EapijKjimXT3QgV5kig919vDID5HwHIq0f3wuU9O8YarO0kTPOhW/Z5f8Ex6TJzJ8IFWZxY19Agn9PPNC8b/ZapDfr5GS09zZtDt2sUPVI1+wypgtOpuYGhf32FHlcSbVk2y1AKI3h6Cjk+YaKCtnWF1at2Wl4foPRKiUwh4CCIp4gLLAHLKzj3MF6oPoO+JHwuUPUx7wWgLNfuF7jLOZjHwBr6MmRU8fEsQMIjwvEy2FzhrJKwLrM/eBXpvYpmRcsFupU7xfOdTg/MtzTn9ue5M4GlUlymbHFY4WKs/KN5psHB5fzf85gY7uEmdKHEOZCqD8yAaTpvgh+A11mdxJSSE6XbB8LBSS/c834qnvC48Cj1JrlCvQRDVf6WpG2sxfKcCPHpl+r6/sUTRCY1F/ZTZoN4V2l0ZEtxB+I5kS64L5FqmeLvY7FJB0R97OGFZD/vuLHQaREi5WerSTQyN/gq44Qb7X/ovoicv0jd4Y0d1dU/rq//u+t97xE/32o9WNB7TrX2GNLiatP2RcguiZsHwBYFwjF3zLYeQyk8cBLUPOpGQK/1tXlxoXlm25K/2uXqw22TIwg+TAXZwoQ+lTDG3Ae38yDLk8TOzx9qi3Yl1ST+gRNepGAjgLubqVDzNX5kFeqALivG2JiAsjvwhaPQf70am/0zg0hBgwclVjbykaU78WY62/5vIpHrVS/IAGaEH1A3dYDCdbAvA/1yTLngja9hS4GudlFi5zHepH8R8XmEGDwzE+MoHbCRzk8yCy3DClMmt4i7OtEpGvzR2GtEFR2dAsOx3lYVVlFFSgu3W/wAQlc0T8uUOCBOWb6hkKfFCQs8vVKw27aTMv3fpjo8DZjsfxGKjI5ClhHMrEYa6cweQb1q/BfhywGT+8iqv104JdOco+oycc9maRFec4T0wZIUOsqkC/fIZ5+e0k9KV6hPDfwdmvTnLVF/ah8p32+YdgONqMjVF4d9+ant3RvYr2pjc5+4RnkJF8Z+EPJG0kYsbT8OgdZm2GVY9XYGZlETx8//i6a79w/zvW2E8Cfv+nx0fZ/M72C7iHWkmuSoyCeh1mqQCnhadwdkHI6kNRKPvSUgjjVtENuutelsiONuA84TIyKvQGESweELacmGVL4vyTSh7IB0R1s9+gUeGioDBkozLLzKHUb2WSvJ9T0pOZq7Z3ThMJcRSlnespWK+6TI5aQJyAFCG/1mYEBSTMxZ5gzh+KEbS52ToBGWeCTxz2rM8L0WoffE5Hpy4KCdsg9ntLE8PV2gc6HhdX89ArNgwnwaOJmFDIVXJAaHZwjaaZpNtroJ77V1pR5wILD56BrIbBPtfFnYNtPNTdhfPAivBEN4sosH/QdjyOx4fpkJyaFbEnXjqaK3OQDfe7XEyiuFt/+eBib7SawArKJ6zQVyqzg/N8bwDnDLBePQenoQ2ISkrXNw/iYG0vc8LygJbIzYSWZvHL4+jnmTxQK0A0LaJcUoOZ+a/EmybBY1AYWSYAQ338FY+ygm2at6svbeW9LSUYQoZD1XYTQLyRMX854qOsgvu7ZvELcyI0UUqPFcxUXH8gS/OnebRUmHorr1kmV9HGUeRhUgAWZp/GFf8YVTsdsSpoNerLFO0J8JDhOiR5PjyzNEkApT2Q7etoKVhDXRdlF/KFRsN6lVRijAx3v7Bmd77p5XItmfkET8yeqZQU2AI+AP1kpHgrFAH7IUnbTxVfkZOv6HaBIuBMjIQzgUxp8VUdHy5CuTXhFxTpcDQXeK5tto6Vyc8sGoFvLc4+lv/g1/NJoG2VRF9X7uUwYweDc3tDtAJZHViZWWFRn8B5U6Xxcaa6JzxaZGh5mhKnuKh/DQGkyL40zqtBzHSpVJyiMIqmHg1zIa1Xvob70H+t0+SlcuQxckzW05T0QlzF1kgCZX4ZWoJWjQd8sS3nHAv0M6BP9f/huBrhlkDRQxsfvXDNapRnJfg1Qp8ejFhPgxRpf837WQqWqUZEGuwaAmnsFk11a7sN2g78DKcD8asFVoP54vvPT+gbp8N5aPDeT+SJ0cdaX+MdC9q0LlnaN+ijgxUNZKvW1cMfywI3X+apFq+4SduxkntzBH5cmDuDylehdWwq0p81+N2jj23UBSAsHyvKkXhAAD+/3UM/eBrYInB04ZzkWQ9mMYW+AZquVNNL26okEzlHdjW1+HKHRUjDx/uixaVKMA1Ql5zFlQmwEHY1P+n9jNWLJx4zYbUtTc/9EAuMopWO9veSXmD7MCdZRyN7+CF0raf2YVJsKxol+W2uKwqWnZduxf/TRNpFp2farDsyKrTc2rrGOCf+3MT9+jOhAqvUZIeEgmB+LA0/NLNPdexpvjQjFlc9uZRNCB8hpUMsDebXWR1UEZCyWnvHlxHBfC1L0NvffcfXfJE+I/rITuhO4DgrZs176QJOeQPgZk5Ql3Q6Mzrck7nU9FMbcxH9WU4tKzzi89Mtm/kXdvOMuHXwLxJa5YBnbXCUa1yBPw1Qlw6+qPajMbjohRCIvJq6Mm55aP0CkGPggpDM0+v0FnPngcCEKYvPBy0/cFqinzoEvkknWh58NFRNMWKa0hTGwt4tOaV6HQkIvI+ZzF1D4f6TG0aI6AAW7Mu9RmWpxUvv8FriNTtvD/F7zA60+A1IDth1xjs6SE86/wJu+Pe2aTrXou9AO/10goRcA5bFRlhfbSCcPrMFAnhrsx3NNTXdAzR1bAMAhYLJABTbjrligSPOW+4EwpIcAu2FTCtvWCu4t76z9aA9Ajwc79s8roYolp5E7L6YdjBSnnzGZwhH8f7iC+kdMbhYAG/zcLuy0weIs2xxMszELFZOFHX4CC+DzennEGMOoT0bNicrbx9X1ucrbcU3Mtdu+8v4JCaQnk4YbmogApSCA2ThGFo7VCZJAO2s/N2TlY3dpSM4iAF5ODqHJnM6jkZs9tOS5QwRrIxLzjbLxrI15pUT9Gfu2+4SaGDxNjxSjufnNEZPCVz/MRDRmM/lKo1b03hkHkostQOHmdCpqG2ePlXd72pjOIR04VgPrQ3G5YdAH+ccIBhh+UMv/TtiGnI45AG6efiSwwAp8gHkCu6IOqvEPNfDYkna8SyMivZAGz6v51mLA+lnOoj94dR6ux1xSCdvNWk8dmw2v2UiNdYv7TBer2eLjLFqVpbRqOHhclfxpUlwkEc4A1PSL+SlZLp0KyiGOX/c5p9JVIXg/g156d3ILJdgmporBmJelISooF3I/Cce48uuAfp51W2jcB6wOWZBQCuWdvolA+Y7siqE90nAFZjR03lr3Y1nueqbiF5U40zIp9v4tnGvq7fI21Y18MOEpdEEC27AS+LHjMKkEP4K1Uzh23eCJa/hXxc+46eBtby1wRM262ZMrFhGB6sSlOfL70nat8T149LkwzxTUeIYKSoo4V4yR5hf4CA4C6pwKd7TMW6Cjyhrl6kpTQOgdn30CLh7/wieEof0Vq/nMyLPfkehVoaSuKe6eTzv8F+RxsLUT1QOfHg0YVUTS+J8IUFwLeVrB7ZjmqXOYDPpjI/hAMZsu4J63TMCdJNmh4FTkyc2Y20j2TuYJPs3xfMK6Ty5dlxAEf5AOZc/aQJVrrIvTTreLZWbC6w59j0XLwWEDH/jXqptabIDCb8VxQV6Pw5z16EqdVZ0vHsA8gkXoKYDWTx+UHn3et2bIZWk36gfY1pY7+pepKndefoVuWWv4XI+MounJMhW/OeauuTSRce09mzh3Qv1Menazm+sW4RB21l01qS2kSaHIVuKT83Grw/+LEJvez2A0hY3XAaODojccjlZBF35pW3WkvQjwL0EtscUo9te8yECFDwazWFUPc4JY7+luW+SwnDy8nWRVkWe8sfLAi2UAHH73QA5AbwUIdQOpfxOqzE15o+ffeLw1UzyKZLFUcgCqhUDpFl7bfjf+qV4LjkCCZQ36jEnTqS+gq0KMilQ/seiegMaMsIvLVFNuC+LuxC89AbGwXW9wyWiy+P2/rhgZw0B9mu8e/XZOchjbRDxmSSl60ZfkaMCvPbPhgti4Xf2JI3dcFr1YhbHLtW7y1wrTRg2g7/+ldHcG1oXtnXjisv+Wd1voKJNbkVg+oKtteIbETU8WkrwYJmFqyeKkwnswwPhXDMzApASpqJqA5BeBq4AAtARwz3gUNIQGEuHoGY2qaHBLtX/3mM8d2ua93uPSQeyfRMzbWwMC7evVsdQc1HktDyjSqoXUfmZnKGA5fvKvqx9Cot5rbA9mLGhFumd1Jz2iybyQyije2ujpzwGuUZjl8ZviOlOg0qo6K4Krl7R9vahPPQkfinVCh3Q98zWGC75mVfhdPF0TqP6uxpgSO6Db6SJe8AQJhZdPJP6heEMCRkqUGB6N99LBMx4zHXC9/DuF4FbfhnXwnYIBz9R83hRean/TfpX8NGDPlbJTI7SRIQADG8ZxziH/wFHdnDgEufVW0bbXrob28h1+Vrz51+8/yjZ7JnRXR9Jy7nzQZMCP2/J1Dcu3UDpwdfnH5EUckrKGZ5v+TdcdP10arhYG+edJZmmVdGyOpeTq7vUBoGM3xy4e2Z4mSkMDLiKFoa9Yw7SJmzKFH/P4rGSIvhquK2XWaPOFNzXtyXk2qLtTLuU9VtFhDm26UNn6NmY9FSTX/+Ug7DeVE9ZIP1U+wob3ntvcOFUFsMRrsVGYxa7mDF5BaQbZSbiQacwREFCQVvN/TcmVYBRwyhDmm3sidF13gRhHTRHBpjVbpA//Yr46Wv8dabdsZcCl5Cv+KcpXC4iptfQJ8q8w/QYaHVozmxddWXHIvbP3Qg4iriuktJRfhEozdEbFSKildh3yMaSO4snSySbzQ9h6oY4QRnyag1MIbQlKVHGbKKtTr+uOxemTppEjqTTCjv7FTLZGvdHpsfSlyXiIKq0s/FSjtziXRi0teVvOjEaLIB8dU1JBLRcvOd8cwus25mX0kH6JdtYN7DRv4N93u2t6qEm1oncelLaKinLS42NC63cVluY/DJ/qK9sFi4q5Qxn4oA3ubdF+NOd7g2VeQOhHiSheBNuZLwbtVQ5+sb/r5tPlg8eON1MGvzt5XrIZ2d3dAAraNKlM+lQ1eTZsc0FFVGvOvvLxasjo1SN5YhiG4X/buv2oOQ8zPjgImzWU4ndsLAJD7IH9Lq7Uohk2q27RVzrgYwjihM+S3AAjnnE7pe7hScaA+TDgOh9i/WFPRjNxF0Y6nhSD+poSAdhNyaQoBvujLeBlopRHEKjkIMy0Dw/dQCa1NjSfooZBAW6SjwyNbEvRlawWx70kUEnyLnWt6FrdoVY7MHlasTHq13XkyncnqrQoemr9YSQju7erbvYAusMvU+/g9HzsqgQ3oco5EGpyjYfdqJcRFsadWbMafInmdQRX9F07gw9KnAqgtoK96HpuNnVtzlOBb9nAgXoxXwmge9n3Y7Q+w2J/bn56cTaN0OPbMyy5PWpWHMExtU33mMu/aafotycWd/zHuFBAWy3VhodaFjIDbkNLFH4Nk6q+wifzoQ1rYrv6rXDYVhuiXTg0lBTlswLmdMRj1Bo2yNq6UUorRc2SHW95T2l3x4cpeuvKELB2QeJOeDAAj9JHn5HewXktqEqIllPIBBSlkC/xIBKQfS/JKs6wS6Dn2xcB0B7sFx4T/icMFoCfxZLbtw9LJThCCAUSyYF6VOOIzD0h/ln7HTha8cYHj1wC8eSs56WyKucHKMn6MjE8qgjzPhZE24trLumiJjsLtW6g+l40V3Y3i9l5NfSstITGFkTJqDmf3LFU+EnrN13woi1MrFWfe4NcTRwxZLZIjQDHfp08vWlQWWSjqeYaHXkorj5f7MWeUr6z19lyQ9J5G8WW2n89EBuHne/qGJXSGcQSG7MhfhwMBW9fQlNQdr+vgHhSnBHA/cciCyp4qQV+cdZrtOvZ29BF0602VVcDCInNeFH5/uV67CfXjnG/1eJLya21m/dDk1ZVuGvKk6UUA65cKpIlhtwvxu7rhT5Tm/+svus5mrlsQZpwO2JQ5/aCaNYMCu8NugHP8fCTgvfLLuxoXYqv5V02VyVJGmbcj5g2wyXdakXCPqbu+9FKpmKv4T57YaeYV86QppehzYnRF7a6ZYqmVAm3+PNfZ62ZBnHdPQ3CcOyWMBE3RlEcqs3TdHkqlftrHVZf5LgPW/trFkrBIXZlxmp4mh5ln89SVLty/WV8dsgMG07WhyF25GWOIrm7CDc4Jl7Ltg69uI2N7pMHGj27LAVYJtevJZwNUy1ns3w2FaRuMxJZWjJL9WZpdmhreRncQD7TsBCuoCutjzDFkBq1ztuVDt3BY6deSQVd5BuQkltIOcftZxHU8IWvSOUM4MPoM29FSnaBuf7sMZ1AKeQrZKzZdx3He9189Qr5brZC0PXCBMOF9b7f+LqQKNVE7TnzhqcbDJZrMGhUZTyqXQ0W8U+RieYNVaxxxOQzSjqpj8C8eN2wUcbFZ5Tu8+9a/gAsfItz0F9Rl1oFgkx3Up57nIDJTT3/d+8TAxuvDhCe8+hokwiizy95rmtV0alkr1VGdrqrwe3T63H2vxqBrBf26EDbsR71Vg4uDmdu4t+EPoBeqrzAeVxk3Hu22TdwjC6q2OcSVvKSPawhrrOt1Re14s1DUbCt729vUpj04Ab9QqnXJfmGqVz8lm0g70j9zED3PUFkwzYPi+UPORQ8tCCt0cA0RZWDRmyhC3BfIGygrPZRx6x8PtUZLGdghZySWjxsFApcJDd2/jno9mS0YDqx4u3BQ5tlpDEt9E7rnCczGjagUpFqMc+r2v+kSqnJ3+rE7y2UGLntNnQ1tWBKqrQSeoJQ8K3VMJA2Bnhfj/rtQPn1pqVj1McllFbQDXwb6jIi3UMoKScUL570POgxD25bZSohYHlQ3Zirgk6QeBWNMQbyZnfWcYwEykgOjUG9BUjCAYSxBI/xpqUIy0vTxfBRQsOXMktze8h8H+uB4RTZbnSp3rWMvH4W1P33Qqx7lNbiPTvxzLsGZCw98sF1zKWbPn6/X7fYb/SaHiIhbCkquOUklhc3S3oBDvJY3unrZFm69Dn59yEGG/E7OnhFNnU+LgBr31TXeOOCvtjBU5vBhIR/uugUxJFoXCS99rrOLOliySDstYCiuXO7Wzb1cBKuKO7ElVib6HiMcIxSBmHWJZq+bXGGdEmUJnAJP02JtRymh4dqWA9qTe5UM94ngr8sl/XITM6PKlhH6XfLn39Q6yFLpBT8e8IB3JFLrhJJnpLZjn6iKFynwj8cssOK/5yuGn/uLi9TVoYGWUXymx9j7w33csTZ2yqtl9DMgPAjTa0lr8b/FjwrT6nuVjxXIobXvhUSfPlVopZjs5r4YpHZVOrkSNhgF0KdHJnqIwKe/Qy3zkUPK9Is+WxWdbPw4JidQCdBp8/nk2heeYgml/MWR7z3EWd68O2QfL0f+ZSZvEDencTyCAoadn8NmGk03FJdbnqGoonLvtqD4dGk3PmENGr1TnRZNerf7BhWx9Xf9wk81mS7ez7QWzT3jLcQSQE4zy3Nc3y2ouJgn12ZkUB9dqFh4w07qaS8AW92xCVAzb5mshDa+L37UvIz6c+yH/GtE4oJqhqBUZ5N2RknfjjQ8V5NDQpdV4i9X8JX7qmBsgPzy6Iatcvw/nYxtwxmL1YIueOV02kinSy7lcduwm09gNRyMVYH0Q8nyDLASoeWKUD7lMjOWU1mrTIvb1rci8T6W0Eh8qVJ+jFwEBhAJfIxzgzTM7MvtFt6y1mh/yj/DLDr3ExVn2oeQKS1OeRCyyvfHh0epM3PwlrWxh89RTM/sgGQzVtiCrQUA4pzEbxsYXcUsyoQ0TcZ3XmujL0FifoQckZ6rInkyT5nJP1MzUiNkoMaIlWKbjZyKBb9z6DhVdWV1cvpRzz7bX6ME7iPLHNp16tqF/aCv2/4tE54AxRDushlrbLRwdkC07j5O4O/AiRVhSGMWv4tR6oBezkeO2zaIwEluYOsAbGMsgHO4ZwOnyldPHN2UqWQ3X6bfjv45XH9iwgN/sLDx4mM/Q38Pgvy4ZSaEmeL2F/XGNpL+ApwBu8oLJ6iHUWYkoY3r028lP0u9bOWjnFZkqAWmmsB/BvC1nD7VpBS/smH90qEzyD7GhYPx0ORpO71fWeNfcU1aP0yzXSBghh55w147SU/hX/MXt9FtKIMwRnlxEUnv3l0io0+Jd22JTCfIyrWbA45CzVo1p5B+4J9Fps2dQwE00BZoyYZtwKhqRmNNzOSaa1pnTf0C+E0abMIoSZVB79rENZYoSvB6z5I/FkTCAf321BxHS7rNJDSx5gF9wRT6i3dsyv1CFaIg/GpeVVwC41vgp+Fig9utlE5irCfFEgwzqdDhy3YhP2oDrETXvf9Sin4rO+QXstpFr6azveq1JCDgMZWWS7vdy/f1eNJJkhvHVhz+hprYb3Lp4Fcvj110VA/c9cFRGl6KC8N+EIX1qCnkV5EKudzuBQwJcC29jHM5MrTtrXZVRwPm9mfTSROOO9DOOEcLRtv7HeoOMkoT2AM//SSTjlNzCVzNFeuTHYUUDSVNIkw8xX8e//ftf1FXJTdVR7daFs/YxvMxicFJq3PWGf2IQAjClv6SObI5BLWhjdS/z5qIOH99P0DoPB0dEqZ0Ng0MCZyUgOpJiy2XAecJkcKl3iD+vVqsvN8kZyyzgOhBFmH0c74LHKqxtgCvyDsHsxgrJJmG0F7pmBiwLNmHLeWmrrPy9U1hpC1UN2+PvNIVND47Y5aHXIqxeEf5EkZUMDxTmrhCcDZqRxKXNIWcARzX/Tjc2RokeV5C6C4cPeZSaH1xIDfNa8aw2GcXD3WIwuMUi4+l/aeOSJZTcIQX7wXckeUzOWZ4wp/XO1c6+rnBU7JMdm2WMn2RBY0LT896IhsOvWf1Eg1c/OFyEWqsMCK/6q9TJG82skXKwrNMiXW3zk9pTyEvidrNIDwk0KlrJzR2g/6xC0v2+wAmLgjuC3PHIWEoAcMH/xK8HQsQhWbjyBir1YLrtPdlELEglVmzeenS1701g4as7eU4pndPZ9z1QMe/99YBTFBlxvJU6RQqdp4b3lDFMTix5EovTgazZRQ8VFw26GJ5VPnYCBvVFPoKrSkn7SRJ5vdLVZDaaG7SdIGxHPx7I9B3I8poT1+llBmlulJ8idz6slFCT1/XtdB70nBOZdX+IXE/MCikR/rArPLuTCddE1kGEqh3q0Oj1JnZX2piIhoCxbnC//la3aAADzLSJMmSi5WpzlbQms9SM/hiSGukwuqvUe5bQUz6Ra7Vw9F5KvMSAmIYnOQzz9KBRfPdriN1iYcvUSrSfk5SjtPdr8GkGTfXdt85VhZ7jYU3yFppPqv/fjgxarYRL9Fgmz1XhUH07maKUfSxzfUaO+cIRua0O9OSn2O8l86Qgk/IOpnIX4Yko+zQeTc+3JVm4IbxbblEgsR7dmHdU0yI8qK4x3ktV/zhzSLwzemnLKYaZPvvoZyX03iVdQlEGLkGeVNXTUdivP5uABV6HpUiRUCGTzTlV1JmW0KJDX6wMcCcuGo35bNs3VSY/S1wukr3CV79Tdl/RK89puhoBg6ummAsWY2OWxg8Uw65fNeggbl10syzMrq52pDJ5fO+hEAGIPRvMjgxM4EwskzcHo4wv409hVa6YLPtDR/A9Kzm7Hno3/JHjHO38zE2fzpeLpFTtfYNzgzyxjKoSMDFvKN4zYu8mXEIoGtj+rP9Ef+8om/jY4joo3vfyujkklgG9RBC/esVzBsZReACoL+ALUlymIuYHPdzI9M1q3ENXz5pvzL2fJMYc5V4wfxLOs4NqRhCgPDHX/U/A9qYab3dSOB+x/GGD67/EL+CjCAV2Uhwfz+fZErN3MBKe33jCqOGuYQMuaHDL37QAgtCDEs4NGWu/5VTtNmg+etv0ePFULCbtjcL6Mn4fq/Gv2BfB3ucESL38asCAbNYm5ltDP+ms7roNUL6VHs1+Of4t5n1VBYulPeX35rnqjHKjMwBRr+MyFVNhR2eOYPvf5n15qKlbzRrqpu3Kb7pQDXHIFcDDnwavB6xbsh7KbF5WwEZeDsmkkltGi8Bfv9RihrzweLQG3xQWm8seisTl5i393xLm6Rj7plxsRMtJVqqmkyvfwzIa5wMlyPh6zXURG8hLddYm8czkB4ICmzwGvNsneM8Q5fBAjk+9J5eUYZWIsguv66zTvAA9o3/XO+lJCSKcG9hFN+F8rxt5/PrSi8TymNYc669NH3T3e2orKrSJOto1a4voeK5edo2/AtSBHCuZR3gRdCFwfZxLMjRk122u/s5+5yIH6ft8+wiqQPYEM0R6hyKMr3dY6eCE7+GQCRsyIBuMFEozPIIOb05cXSg8FLm7yk6yLnGNZ7tPEDhkNxsZh3zhaS60eFLg2NCfy+S+8tSblZaZ4ottRuchb2kc7lgZ+VfgKiwYCogzF5TTTYIDrk9tPTYArEVyk6xgTYQj/7V8if9RAwWyc083c0puFz8gHYVbx1MAvWkZFP0D7IQMMg6wBAFWhrNP6/satcIKGJ1/1hE3FmeWgg6qnS+ArqwYsMDWL1EhgdeEcpyQiW6/p6RCs/HUiKGGuv0Z0tKf8l4g6Av79nEwoGeI9OKbMEk8prvEjp4y2Z0KTZWIJb4Zppl051rnwyHuhvxv6jp2gXs+Ms/OB40KHhXLfYuq4WcOqByTfoGNTik9Ce8A4V01ka25DOC7cj4fs34H/NPa+/06L0bd8JMboOxpoZCeCHl8yPv/MAJth/1ijC12+PRJXTB8fS4X+iEECyv1RjEKVBushuMXZHyUvuxzPoU5XYO9fBAl8rI/43zeF72cRSrSOdz+bOb9kEGIgfgZ64PPRjSuR5gMbBpTEpe2NBuqyypWWoYsUSTbBkheI0yt+g0yPt+ElBBeeYn3Fu7uMi091Y/yOJcVwETKinmjXj9qqSCafV2DkQZgrOWjU96p3vGsBgZ9cQ4PmeYRW2WCOQHW3HEdxA0OonQOycAd5QWHBn9l2Fh3MqFeiigJM+I8KJ9cnaBx+vxCCO0RmlHMl/UqCevszUb1tynyngYFpchVx2DX4STdzQHf3CSNvEgiTT1ROSMtgM+IBxgh7ttwUVywPdOKHUefDRQaVTXI0/hsQruRdc6OGFW4QgEApgcgV7fkIB1o3V5/chBGZ6HLAgKMiOzRfCd3VmgsBuKBiAruUj36nSrnOANl6AjGKp2YGVStnk8QKpdqyKw5dr2fwEbtLifAnngFRqn1LKzLGgLcd0Xxn352T/w8iQVhBZCdEoifD406LIdrVR6J5mwYb7u7I8sw5LrgM23CETBKjkKJy9hQwNX5rikxcFHB0ZDFoIkPotklNujGcKX+VzfimVkl2AnFBqSI2veB2nfVYN0sQyL4rIQLg+Me9qgjgQdGdcjGy++CkqVlXN3beHS9W9f2MAHkaVxsYMdfgf8byNFiwO33E1JJV+SAgFjFO+bVDvZ+K0an6x+miPA1MUulCxVWK63xut29CQI1cvd3vBi/+boKwHzKp+U8W7ofFP7XxNPNhVKhsdbl4xWLvHkc8mHXQsTtJmw2BPsAu9Mool+GMxdVWaRn3df3XUiGWpJrtWvtwPuc6BdsTn9UriECxl74mUfebwjAsn/p/wjvOo8EqlYV2+SrJQQhq97jFTjA14Dg/Z8eB1T8hkqakVEtlmqy7vBs70Z5HmqJKnbfPO60bv+tl/ZMSR1tPyQMdemn/baAw5R66ej/yG3OgVDOlg5hIKTvY46dCOa0lPj9myDAGq/sFXxCw5dG8inhVt+096jqp10b9XXNg6nOVs/mW9BwcFVHzx1whtx7qjCufqwVRK8ivm7/wxbAu3cpgIbTJYGjXpKGjTMMFoRB9HE2r01RFC4id+PQ/95UzqkTRQEzOerTDWMcsHXsSvqahfUMNRlnHnjuiHBJZdsn9meaWDN9bpbBh6ZyzB8B0hCm1+CdlgvUAi85yulsMxyCQ98Xhy2/cm5AalJYfvvPP+FnYD4cyWYP6oYBZnyIx5dz3t++ID3o5mRvqEY/yqvxbWFcZNY9Vy2yjJqc4hxsZQUqitwfR/cA4JeeZJA5KfQXU49t+wjGRo7uv1W2KUAtcw+BNVg3YQKn2bmvkaJ6HnnudWZan+7AxqslNX2aMhyAHijg7oDLUID25wslgz+5yMoYeqRqh2iArkgIbtUr+3c3usnhb3zw83zoNYR02uZNELStcMbjYKrBlBhdQI7E4x68rxFoNgb7+ZNzuGDCE68iC5HDY/v5F3vQZlMu1LXnShlynPEAxtJjp4Nt3Zb9HqZi1h6Cj+XoddXbn1QmsZbeMJ22zJUUn5xho2d8zipHxbuOA9Y2th456tw47iABNoSJnVHDWAb3Yhu+xu9aY+w/M8u8yRM3B+Aio9zx1G2D0PLb1VyK0bUILz30pTMivWBjnyOUXQ3hVwIWcs44VGlnzgAufQ+VtgrUQTWcWWzx1d0sm1UieVVursC1gjU64zxhwU5uJxbgZbygUNw4GR+Mr9IwVPSv1znt2MZmKpFNec/ezXUi4AJCv+XIQcjDfBspJXPcdxuorgBbok5G2Sxp4rJexS2bxVL4fKzOQc1bfKa8S5h3BMaEIMuPojXeB4tomypQ6sO9EVR6qph8haZTinb8n+eE3TDtve0AdPm9/qmnGUiy5sZbbQqmd3GaL+9Njre5NW/IyfZPuGhYV7T3Jlz++jOWARTcwhQsjbE+yJ7P/jQHaS8fUu/GHxpQuQ6MSHENOdlIVY6qsgNupdxp6WlTPIaJzkMNpaWRAbn/P+F79SZHPINNUFqTgR5mSipx3mMSXUVfccJAU72QXhIcVYRxxGbUkQbIiKMaBwOPNDft2G/r/ZB4o1YbB4vi5AKKIu9kET7IgSYyFfb4SMRDAIln5GBaQ19juL1hVBjgg65s4xhOnubvAhCfR3zwoNtg1mo2VsfBNr1bKkJpYSxyGd4owP7bG+2K314DYfwiI/pu3PBe4V6wMCNJhj+dHQ0yu52QOSwf2QQQi3Qdz4yYrNOaQSLx5vJ9++5bJqUUmEoLc6ztY6Vkxt7oRAMzYHTbnbuFshDehCq+vbD8FOjQg2CyYYVKUQtiK6YsuAy59M3jJkNG86HP6ES57lsPDnS/4SgwvtYGynCn/XZBa2caSdX1A0CflFj0/p2ehYCDqbR30Gn0iAUKhdSxK+v5v/X/mzVihscgqSuaOGXEEDuNlmxCkeFU+/SDnqlVSp5ZyY1YBgtCc23w333nynx+rXRl7hhi9TghfxxhO6ND+e5oZqVCnPWZYTBX42VLZHdVuz/hLvS97IiYS6KNhlyqaJpC/BRj4iFvyHDB2o3WsgzqvyaogZjvHTfsxKis/nu2EziXR2yo2OXyhh2ae8ObfAwMC2aDeAkjm1qkedIMA0gSVQIZ+IEflN9GUo0cdl2S3nGJ2Zvp/CEvl5sgEKTsVON1ubjAzrpSOpY6SpsoLVCG9f/Nijiu4cB3SNe/I5dwkLrCuCmXGuBtpwpHNYTTX+e8pF9w60XiFPUDL8zNQetRqJjtkI69rEycElXjDH7C8fcfRh1wRhpSn1uu7p6101Xvc40ivh/jAQbNNlczdvzBHDKwfO9ynwcjxbcEq9zSsuDjCae0Qel99p2tOL9wetp/+a1edcpSZpIf9Nh8WI31IptwdWQmZZ3C7NsBq1vMCfdLwTbVo8au4lMeE7Atltp6lrE24lKsQhGtnunxR98NeeL2/Se6iFyTvGgw9He6FUA7NeBSQHLfqPfIrElqbZGa66zDgZhXvM/DvG0lY4UAoulaYC27K7cG03dFh+DJs6+R8joevTjCEB70mRc6tZVA1VfkLcMcPpjblpaOx3bu9ey+qYmQP2lWmQJZH49NI4RH7RvtI4ehfd8zggfa1cobiOZj2+FJtX2z2foDg1PYzqf7NHAaQCvWKaT6VqEausRg1K16cGiKlCQXAwNW+hrXndsq+CO/5ZZjohzKk/t57ALpHoEKaGQzNbnqwFXPUpebjSB4ptDD11avRpzcDTSCGX+APhzIHeKGRqMPN6mal79heSmhDEDelwV1WfzBo2SUb5/Tim1VSDK/5+Vyqjl+8MZ5XN0g0TmgsYVIPxW0lNj9kIbgzn7kf92Wu0hJB/C78wKg3AaBsBFyQ14vH0mO6vJny9lkVol7mPuMme044CAt89407l5AmCWJPUS1SSqLEC8OdW4R2hjzWnNHpyTCOPKoTbNhd/l90NeP5+ERrmZj2ARKI4GxlsATT6g5Pfl51PQiJmPtyqF1BInkLn+Wnf2pJbZfkrbOY5oud1ZOJ3LEnAChkkiaH+fNAwNZyRL3wkQtWgU1hYXvPUkpaNpEBDVZbqB1a39dQFHW6JmIi6+WkYCJcf5Vz6+/RhXXsHiWJWRemgdSyWBf8T5VAllmAsPHuNp6J41+xbkhV7/oxrtVLyRK1Wh/6BOslMLnGe0OzC93LBlNdfDOsyy1gjESogZKwa7pAvm4JYWap3ttfQIQaOFF264KoL4U0cwVoRiq9gghJtQ+6pZxv8YJaa580l8XGmplvmmuunMm3n00yDXROAXJHsFLiKwLsUgGOesNnRi0Kwj+hFCD5vrVrNCTLV6Js7NJgOu2VbSkEf5tVuhcJX7fwBGFBrWQdT+uJZXAWBdBLoesSFGQsG6EH2webhm1j0aFu1iNqed0/aRdTOBTqiAYfXxlYr3Orb80Me9UxzYmr5/QL2UqCk24N3WYmDhaIo+mO5mo7e+la+qy7PngoOlwAsHpUeJgkZ6lV5doRNmDLRKoGcqe0D/XnaYx6gGl3K4N8pnlFXTVfTJIv6ZZQjcsk2/gPplwcVZoNct6y8L14szbAtm7j6jSqNxI7hL3guY9RPUZagRbgZP5XYrdQQVxEZ6CuI9zA9DhwoxwJXoMcfWd609+FImJvDGqYhDyH7CH5IM9Ued/9UOsGQxbPLYYtY8EbqyS4QuAszy4OtPr2mrdDxEM+q2M9hmx0FX7La6aWJLIA9OGeE45cm2B0/LYxsPVvpxfFq2IZ64uK5WX3TY+WaAXl52ksI2wu9m8Nw8v+ckk2nDD/PVyqph6Ye4QLttPAEaOpai5c9/oevb+oFrFqmBNeYdAu1i8oEb1ILEJYqCV66Se7llkEgVHSWkKkDN3rBtspxMlabxg8TBHFNgvkap4HfgzDH+GDWKtkwnG21DdRf3sSILMLA9vvvhU+wN7a3LyP6vKRCgLL5DQefW/iApW2qXVshqX7hIRyN3kJ11FIy8Ok16xGiAcx5vSsuCn8VDB9sHWaWyRmV2vfsr0Jma/P1+auPgIO6g32Wo4wGLea6A3yOMfeVJ7tl2QZCewRI7uNX6UcFm1BcGY5oBKLBUx+j+g51GXXiokkOE4fVQPBuU78UoMv+7kGXsTOz+njSmG8hvOUjlpk1rI7NYXxwxRoC8rzXagNec57IT/+1YDYxY8O84yEoqkuOLlFMdEHoF1Oi0P18Jta3nIqWPLxAhJdqjmlbwT6xM5NzGKbwbomeBye1Go/Toq2CrSJXIubmfNKCkzCtdmNMDeimv+ZKp+Pj5Z1hQoyYL6vzGzVfxaMhStKBNIGpXobMB/nLtCR4Y6MVhiOW5FhhXneH7as2VMwYkEVD6y4oJAX0wmVEn5Gj+s3osxDORkK2nqUej9SQQj1PTdsvGJZRxZdmfRYBllx6gp5MkMxv+G19rovGzjZVKgEQN1M+oWrAP+pBdRwVY0YUtl0AcYcg7kDMBme9Fs+a+x0CNDREkJ8J4yehtaZmKzhHjj6TlKS5voVO/8kwE1dEoiZUDO9Wmpqza6fTqPaXG5jiXJltR36vFPdwTgfr2LIlcN52RnCOvToVAP/wxMWADvsYb2D+ZXm0fqWXH3CgnxVT/aRlSb0WR6V1GWRybh1pMcW91ePoQfXKgkLBS8Qolp0t5CxXDM9tHdOGgxkk6d5pa9Rd8JtLyinMP5QGe6rfSDlZlkc4jiHP0Xhno7+hvpzijSQlIkmmk6MUny6EBf4hsvz0vEAHXw+dr45q4hTAoMVmBKDhdaBou/KH1ssDfmh9QkQtlrASP0PQv6okZWmZNmVaCN1AwzjCANjtZpSK6G3IWllhS+s8T8bkUL0ZP4p90hfbsjSlSbFhDY+Ok5w0Or2XLTH5oYyh/CGR0nCwXfrcczcbU+KXmPEefPRfemDmDlzBrirVaBeXeYxr3MxZTiBGzzCFlfczqump2DDxvi/POVURljiQotVrVvm4TR6Rn5OQwNo0wd4CQGz9nibC7iOV1106fqg9GgbGnZU0x38Tn3dvsmxO/k0nTlCaKxn/IxBA8a8ZQWVpdLPvIHHMfTIshXlOVvKNcWOP5RQms3ACxNoPNx5JnkUeKVj5UlnCLOHMgWitjR61dGWBqDNw/xZeYEROVeRyAQHF33zjk3GauFCGKM7TPzuEaIcQCPGM1Dh8sLog1EyEY+FmHMAVad9zISoJ4DGZZhDFshMr4vI1Rxx3OfEPmhBViBbdEfQcIXmpnSI20A5P69L3o4ecz3dq2bv59PbSlKbl9XSi5C6ODa78R7+9Y/a168x8aWadvCdaZmacrV1X/Phj87W+XI01kJVyR05nh/3oMOXoh8G564cvRr2VSE0/EsoIHjmCOEJFUqCbDlkl3wrRAEKz9OyMDqC2k59fC/B8npmpmu2ePUH1FV6mALfBBvjfhedXtJ3g/D59wsAE8lvgVPwiFxtOl235x8IBNKIsg6c7XJTNhkhL5tAZfvyUFiK4Rsw13gnAv84MvRSVcno5rAvC6AJEhvpOXUT//Ij4BJPH2WXr4jlWyRgkjXQWOY7fqcoW9wWpor78BO5SehsjzCKTJ3FcNiyLYq4Z6hFI+vKNsxxgUYTXk/H8+zdY3hY6kNH8j2+hKOUy9x1lJcLaksjQa/2iq216D1Qer831HUIufGPjv1Stc6gOBnD1+CF+AgFWOPMbU4XyI1Xd9Oe69OCxgyOjjFZL2gv5dMuK3RW+TVddFYVMxVxJYl6jVbnQD5YhigIFKti4aLOrVVbz31V+Qym57GbHJ99yGdTXTuFcBD1hPP76xYrMagMRk5NQhrmhR2DQTMM+NKqk5vdMwgq2ddex0KcQEMH8HUc+cMQlOTxTGiBrd8avHB1OK8y40FJIx6YzDly0p57XbaF4R7S7Ee7nKlJciH7a8HRtexCIzJxZgAMqqLvBL4A7V+myITgxWjLHFSvLtw5tEV0AYoRjLECRZK4A9R9syrwf7Y6baLfLrKKkEkrzHjjdL6nIJ3uCJS2HAU5Dfqvm6POYD/bKgmN52BG66P+DYxbPSV/8m/dRDbNGPKU3HX1kxEsI7M8Jwxw3SfjCt7PtYT4+nAobjJO+lncBr+Nv8I+MUARfyg/6LiEKWp3qqqJQo2HDjuIVeuM/dYUl2nHE2h/jebyTo7pHaB6T/15XmY0zWyz1MchXm2HZqdEzVAzusiQ+hH8IpN9m3yyo0xsDJPk/Q4PUTv41PCQpfyoYgffQOxHPtl186Y/lUW1NT5I0HDrI3Wn5jALu+BAqIONqQ1FVAg6JBxwquQ+fKzTtTvsBHbQMILMOXiy2UXkVfHppVp2oZRKGJVvWe1muRPZhlbiIfEiNqqtik5Xpx00YupynHQtpWxxf238T2Pe/yzNRi6MX5tMLzvZOOjs//DS+rJucWP2TMk0lB0ebj5NKgIgm4YhpYAsMYkNSWHV4+OgdMUr9T7n/YUZzo5P45f3Lesqmd7/86Miy+gZLAx6HkI4Mm+ps2tf+iN4dx9kdE7mI/9AbB5j93XU68J9OC2dX7TTNWU7urta6e/6vSQ3pDTpbF9ESICfCCNQC7H/LdOEefQuHi08cgNv+Hgs6LHw4gVUj1rBp4A/mux4U23E0QzPaQ7QEB9edu0sufRl882CIS8vouvnWZTQ8C2M8T8CfKJf0+mLOt6PsJTwNkCQrYj44m7FwvdN1rl5Cr7i28050RKpNZPCQ8Rn7vwFVuuQ59zH0KMQfojOb61ZGnqzBA5w/7wJQ2X4eRCCn6v84sh4KIM6waSZKyPd2UCaqrOQ9zMlxxnlgaSdCckJLUb36tSdPUk5bKmQVhoHO+GyoQwhjv86AotNJ0lGHSAYK+Xd19ez1ElG7DjSyONwfuIVu8NBbYCNUWJptcAVTPNgMwpSFyyzx5ZMoVqtnn9OKuerGNtdSkC0rngMAMdd74DZvQlUBtnxRLnA3M0SbK0cXkaFpwxPd1WV95/3CvnB9nQvDa9+YawO294oRtJ4A2YHdQ+5cmuTQsGvsn1Fxhssm+Syxu8I8bvp++B3PUphFmj/Civ71NDyagUrVMUzVh16n3U+P36mGzcBKxx1J/zViXr52PNC00pk9bo8UWmjJlozEA8pgFXTqZB26u3vVP4s/tzMx+T5U//YVCDVUUh939wCQqqMU02RSI7XA4+ss7Kgwd+62FCuk0xqlt2rsQVrs42TUV6LwiGec5aBYnQjOHLPkk78HM4dwF8zH0utcs6Qsk0gIkLBuoIAt9CmpsNDJd0jc1jtHjXkIdlMVN+PTp++9Xyvwcmnns3AZTNhaQB9rD5E/9QDDf9x01bZzg9P/wSgh/fgUnmLjKahTSic0w/+eciIGhMWuGrIDGTJ89rNOUBzKotWisRunmgfGuc639MMk+lUkpRmWjn6DJHVDDPJE2pR0KS/5UbCwPEZAdEbod0Iz1sbF1sifcIEYUwMFsN7fKaUeoVdyKol3ugHy9QgSKAw8vrqBoNJSAR9kyAUWrc2MvNJFigs+IINVmHBkGXdjByFBIIa3Tc9cAUZxLY/XowDOqJl7g8LOrmZL+bBUbfBBWNYGILfVNrlttiRD19JBtHX3hMirmsyQNQwxRx1Be6TPYimZhopvj6ks0cacccGJbEn7GLUImT+z9Nkoa5RN73oTeCHdjrNLt+5P1gMHm/Zk3pElpKK8ihL9/01GDfU6PLKo5cNaHLdiNl0JHSdvneXbC6E9jTcquSS3YNe0ZzQYfAGunjS8TVNEWlGpwLBtCIIp7ZZHgiAPFQUMchLLaDT14GaoxQW7Ac6jfBnC7KSw6XkDLLpB2/DF4Pf84JJAPbbnq1Wdbd8A9jqyZc89ZyaiuV4I3cAbconoyg0T1fl/J08gIrSNdfuSlqmiYJJVqMNpH2P0o3PzVzGj7ltjLctoHj5dmUKPPb1fLZaOls/0Lrd2gnjCA8sZy0twI9ynULFIzMeCnbgAd0fQzBMkniuDvNeffPqgLnHh+SsVMo3BCxgm+5Ba2u8cLeCecMeo1dLHQrmZ7XRBcw3RM/63IlgK1P1miH4yI1XKirCYzPsK6Kuu80llZXLKKVPIv9eFIYJ7qWnoYxk4AHZIzZY4HdSjgQMcn5DCeRW6d7cS+rgeWvfWw33QMxceiZRKdHmgB33Vd/g6CokqZwbqafcrFWj/sB7QylVcRyef+l/LW91hxWne6tfK7x7/5vhnwHY9LHPcK8oJjm6cOBRS3ENWHw11p05TY1d550WHxtYQzzUatFB6wigCYGxk4T6gXcS/A/o15Y8fhM3xGt9nROBOSzUJPq3tTMm+IG1c9GZbQ5ZXNWp9d5Rtxd96i5WNyz3lCLw+O4FCQ3Ew3f6nxf6XVN3m1TTV3uTyfRQUFnVHBgwJBYNG+7gRu1SF+jw+zW1P2MHi15vj74m3Sm9zKNAIhhXaSuagby8vLUTrwl3omRdTFV+Hy/EQDlmLrkw6JiwQCOd15KnLDr3lCOeq8Sgg5cPFT9VjvAy+iufEivlX+c7qTHc5+5Mp0HpNifXf5wXeHrDBZhJQF3Dp+nei+axXe8+jYRbjWtL2JJcM1UMJXFZmRUml5y+IWEaUoLCnpV7Mkkx/6tB//q5bcU16C35CITHXi1lP4oQ1+8ay/v8ToGsYDc+cDwk01dF/sjTk02wHEF95NFukoNRmjCCgR9bdelQsE2fxLVVpWI/E+FDc5eJVbJOK3f+W9GvnjZ8ZgH//sTStEAXsz+2XmyKw+FybYgL/hSSbOsfm5K1/MXL3RZvmNJctzqwO/OPtUfqsRGdNI+tbuEtRxw1q7leCD8C4K7eyjtaAVKLjHN6+bPQthBg6Edr1BuK1+3MS7ONlx6z7toofkaKLRnt6tbOssDsWiZBKobhuFrly23rfYHMA2uKyJDLshxKymQwsIxzxBx9MC+Np4mv2vQ4WA/Nj6RM3DEeodznyu2uAePnEf1QHafAUzbfZ38ySiMdF1SwpPd5QdWP2g80dC0OotRaipw/DMvgh+CbFBIoWFEHtNfs5Xz10ULc+u2pMYWGJfknpbBarrNNGM5ePLzXxcvD/Rhe+kWMjabyGXiHMadb70cq85S9MP31i5x+s6Y2e3RXyi8wVBHfU8K0oi7YeHSncAbK9PNI9CjuwcV2mF9snmtenZeBSoLOvMzUBcd9Kd6mgiMrIXIwjGBFTSVGcyxhTydsKYhgGWmBBOhwjfd36oRkaT0zGtwq7w9Femj5GeMqElUxJqlqko8aaB94mRFQi4CCNiCuYgrPnauXuTRVavq7pPGD6Neyjf7YhDrb/cfg0oOTCd/3TUzZBLnAdHlkagrxNB4XZ7oZOcUvGbJuwnz/PLr7lTcq3CwuUJrK7rl2NJw8xEqDWNdgJCXTTbcAc7etpvJYR8oDToVrwdFA55ZTnoo49vDYeV6OMJ2Ft5c1Bo7CljualN3yeiw23398dn6Rjxb8qM9nU1D9MOrYE4Z8xeegq0yNPfpBHBo8XK1XIuVJuAwFMj45oomAR47lmBbTytx1dhepOnMvHLrD6uuSOsANgMspIxG2rspJxTcHLZxQOZZ51kpzCjXFr2x+o3RYqxmi6e98ehBn/T9pllzrTBD9tC7Vi7CUOKWEn7Ez4pSzKWdWNt2Inq92P8Ml+6+FMcyCPnkPFuTFO5hooBjTcegtyOUfzSckjGkZWnSSuQDboCKVEJeeCuza4jpIpkfuxWc1ZFGDkoF6mzfx8LlhdmTrVo6kD3r8wizyzhiTCHu/Y2SnTHLLgEgL+2oQCUE/6+YJ2FAfZPsCz5giFlETeeor8a9SrGb5uXfTcqpW5odlMlamsF9aHOK29RzIXsL47w7eY6JCMNS+whsCu5L5hJPSSIsJWdag39iCTKcDknXjweurhUS+StRAd+CJoFPSkThwGuVXCxEksc15u/OJam1FiXcn/BPWY0HVUc2XTzgOnDoU0xi78lluYsO2Yo7/rv4+VtMDhQdkcrRkL/hkLrQiXy7bYtunizpMAkeyGPwFC2FkRNTpDEHHWRjKAzMfiF1y2/9t6zVOagalz/Gc+5l4sliE84YA4J5ggJTXurRcNIEmgP1fS5x6/ktRDZl6KAg5z7seT+T52GZEhQJMjmJ/hU40+4IDjfIKY9V40Z3AZ0j1g3hvcvebzmZz88uWIfRMVLQ6zR9ezJ3IiUatThECwHKh5ZTPAazM3Hc2mpk+2aOsMjfCfainreD6GcZzmGIitM/NV8+q/YK1GcOzA3jCMZy79vQYWTSjCQqvWI9mMesHP6cDcqgoYYBtFdbw1Fxi8DAl5/CRHycqzpl5PkRiC1g4NP4a03g+WT1J5F+DAE1WXTee9XWd4tQrrz62TrQpWp+6rKj+4qj8dKwGwvDN/Yt97M7nMnCN+nr6CA1mFZq2L4Aylo/AbkxA5pNvuup12+xGgRpsD8ihHf3nrWkU6Fv5Ilb83Jtnnqh4sF1l3niTFtSAL39HQJJUzL+V90+zxH1sBLqR+Ib27Fz6H2oDis6idZov83GvPyFnAOQaHvcbCO5uOw3TcH1kmVi3xnveF71hPSnhsFxxsRgRhFo82AVZ9NgOMuuHQ2NIbkpEZTq9GKhsFWuho1nkvNpssnU8ns0RFG2l7yBXzd7XlrPtERwzsKoPSOyN/UdDHICm7WWFTDXezZ0Cbw29NR+Y9fv2ZOdYT1i+ZRhGmUbtqmivbhyQ22Rmm3a5KMy1EXsE148xSZ2igg0ThOKsLPxy796iL4SB2J1+262xQ3feXl8BoXPCHHO182gGqCFdQg5/be2uNFlsoaRe2XAB5LTU10ervwbmhxcv5ttX1Ms+m1aWbtlrvlzsc712WJAxKVmyUOkcVzUTSrjP8SPSyAsbC48AuTAfR0WUG9igMNYtmLwt032JskkHGV4eFHIqAhRd1rflk2NFtMeiZcg0n1ql2QKwpSWYvDbEaT0pjX4cNU5iJNx+gtexcGH9eQLnJYHz7d/8jDUf6LjrzCtY3Srl9lTm9qe1kyLaGFXsM5o2vYNV1oW0E2ZP/DliWdZkWE4jmeXeCWJqb+M/p/4uV+6cI5gPSY/fRH60ntellReb2kRCnjM/RumdnuKfwfTEUqQH7qYhA2lTx58oIHsouzF0qrwWa0BeIN/BHWrsoRN0D6BOmMFBY068OLgPeu9O/CrjUX1fyqck45CctXlaF2tOcuCPOoWsr5JgGtmIfjdWKGOmucTQgVXsdCsLeyidi/9mDWQjBqCB4IyVMahOc+OJEnraUkj/3Fp+cXeg5d+JymgFeviYYGLSGx5kescnWsc5vgZzAejZ03Fa44UlIc+cufPgHhKOjXR5BCCN2hCIKc+JhNc4UsvwiAjrYcga2ANrpada4cz+vV0990Zv4s19yBVkwqG/PKPV/OMRD2wV22AdCjPEbiZw/aAe7OBXGRJ5Tbo0PwRnZ/gERoBGzkMAzR3IvieZEMe/7gsjQSiSSDQQLi9eLM7j3cJVE4n8Rx4muz57bIRVG/5zGcDWmHGLdELAJUqx0eUMNKmGRXyi6KRkD6318DjQuo7EB0m9hvewezivGv3tFfTT4CBfn2lkCMAmhB6JPJU7ah0iEL6gIoxSOJZK0IblLzjWPcfxj4MbeMLi3SuopdExnTLIVBbMwpaXeLc+NFwcQV+UNMAE2mI0C3W/VyPk3ikAgiKU5Drr16Ts36DwCu3x801yMU5BraJ6uxDy0m4ceYs+sWXpzLXQPw6LNj52t2+V1GKqg83TAx7Qevf/1K5kgN1Y64MHKvm4hhPYeiuiVKVdOPNShe+yduev+fvO3mWSyZOjH4LG6e/o8NQKItDb3rW8gKEzRwjLf0AisMggheoOnDsgqTUOAUaHsCL8TBbxcKGTBOZ0Qewai+rpyKgltYb1nyUVJgjz2+73wjxI4l7bWkSKljBN569rCOxGFhf8rIL38E1dZhErnqoUHnbl09YMATGx4D0MznGXN8uZgfjI1akVpEYgzCBTTib8kK2u8cO45HYzpQSmt7YMhtbNEBAAqlSC4T1wBEgE2ckbFZmiOcO3YYXjx983i7p0hLydont9WbHNe2Vwd8nvvX9SUb8g4IzgQCq6LdYKQQRsYjHnYaETbKAK6yBEauXt/pO37MxvZOsL4VI1PA+bv+J9n6fRlspYKCLs/3LN6hUV1dAgZmJU1EV0+fIURTKJTjC/hhzCLm0uMGrlNdYe+8WlAJesZwrqMUy/Ok5DF4krh+OeAlEyyRH+OA382RlZ2ghj2Ojfn4yWyBXqfJLy4B4zleXDtnwYrO7Ap3uHsOXJ1LBBEyLICdJ6JwbKrKHD+k3p36/NR/lw8MfCgKnWzCVbR4RZbo5AHSe6He+R8n2//HcNfLgA70ncHxAebajkzShIwwh2GoWNIreCURHsixUSoMS4WNkC1ftsJf6fSFx8UIS62hsFOr0TS4A5atSGOptIsyokEIWvJZL3JlFpHjUNSS+JGGwZZhl6/WC0ao0Vm0nBaaRxoSDOFyqBZPgwXdXTRkoBIMAKQrDBtWeB9raIyCArUs7CBSifWIKiC4tFEmCMHruYkgOPcetfVUvl7x2/inXSh6ymghDjwKfximgNXRnZOIM7eELcwvow0gDpB7mT68LFCechaad1IqSvNPucfj6OwaFFZ5wPFPbWylP750yctvo4xtFTafObo9YJgHzaGohTnM7QkdHs71UBii7ok7ipRgI79lLErFEjS8IuEen40dKSaZhAvBqiPMUjsSO17WA9AN0pk4Bw9PK9zg3gdEaPddSnRopLN5ZtO8XSm98nbRBCdql5PbjzMey16JOmrkGQYCuib/IY2uBMgJC+BpJm0wwamYJm+593hmqAauoTz2DGD6LVCiK5/EBu2ADo63659oE4G3i0KgcFEMyPuoV3KfIpEvphxpFghrxB0WaVDb1HSyR7jgFMoTQxjaaDZ/fbkZe2lH4af7uwVP9zNabYqWUiZxTosdZoGfB/BbVl2zQgpNeS6CJVigvxpghMDcACpf/6r1JxA1xx9kxjMX2whO7ruQRE+oW+jaQH0ohkCqah0Cfb14KyDmTl9jF45GlrYnAWSim12ifv2bJbp49C+uZa/qbwyPUjbLMWWjWkrEzOlRjpcSsFjPHUnLyMMljc2g1Cj1H587axEDGrIqHa3+C4FMo8fbT4UyN81E9/ArwHaRTuQaEk7LyrWVOYag53TOd9Xh5tQFlRVbbg7+fNs8E8jKk0tgrgd5VF1qcSMgnjTlRHKYr49hoXMz+jGDPtukL5CSya7nAUCDdVNmWNlHUW6JrK4XND6FDr1F3G/0/AqHyoi4xzFEJwUkOxo+phV6JeBz5OebCR+f/ft3VfWaGfrvf0f83BVxmg3H9p1KwwhL6qb8NOSNQKCGRhezspkodYq4l9qHlig6y5zjzpphGxvJFRsIpLHALoTOUOBKmMHel/+eCK8hgQjo+/z0qUT3e/qm0rnJch7Ytf0tnkPW//IUY0w/OoxlXN0aeIjoON8jTuXkOeO4ZOeVINsBhmoaGuk0Yt5HwkGXsOuwapegvvaIjvGzBF5EE3muYn2lyG6VJDPrWdp0/7yzAa3KliY9Z+Nr+dOf0qO0gJK28nX5so3K5ohTUY2ZZd+Ug0acNgUF8YeujxbzzmYmeHGHHsnfVzlZbDy/MivLw3i+w3G+gK/RQ6aqEvsoIHPQswIHh016As9vsQKiy73MR3jvdh+Kr7Vu4teeGzlZNRLszgnyA/QVS5o/5cbYo7vMQp8O94DjMYYaQ+m4pwIeNrqO7vFEMIeYmxJgissFSz1WTG4po5Yw0z4NXwNzX8su1lfGpPm6WfAMzwjFmdwILv/4B2oCiw1WQhqTrqMGIGw1xpgyBRDcmT5P06DR66zEgKWf+9aaqHuB3PNSTZWFmJDDLM+SdQYPL68kmHINfZY/2PJwQG0TG7dBecaLzpCNrkpAgW4SP4s4GTAjjz0LHzd0FNx19XI25DgjZAkT1o+mBnh+O1Jgfvf8Sdoaeiry1AQMSCuqfEfxPUvka44+M7CwdlA9Co4seWncB2IMIsq2zjFaSqZUS+qumCs7UyAHzpiw7gZV3lg2emXJ5ABFufx4G4R8Vlgbg83ViQbEv4WRv0KMcgfLU/Vp3FN7L67pdWDnrzuE9u+5VOTZt/sDreYVPgUp6ukBg643qfK6/KA9378zQWw9HGsI7TPXbbmNOBvhybbyZifYEIIqh+V9uW6AAmqeiaHHUeu0xQsMyBPOWm9qt/A4PRiuoEIAflBdfLnuqlLBHJeTu6VlmDY/AkIa/1TvvMPaMtJSTq58+VzT80eNLwy0EnO9V5MHa7jTHx4r2jcL6EE/Aux1Ldx6Bl1BnaGGk9zOFmB9B5n/jF6/2nrBH9uohPeC1l2GY+WAzapT86+mojTOyRPlYqkNA5UkhWoas2O1N+oCt3+G2hx7bwJGBph4+YYMZ5Eru2/K5Rg4wQ3lanT8SbZXDNCpj2mfLAUPJlyP4cliyFJbVudu/pYaA7KaxPyU6GODI8pichnSga3edC9yxuMg4WZvZMmWFO0Dziw84LN73zJN6S6jPcz8n4QoIx2SJeVeRBsarZeDovfYJ0cthAx8DDRRFHcIlzVVUJkRGADSk9yaj8012/jXBVCN0D1AWdxlG372f6wdeDJaPb3M2oWSJVZh+TNdRUnhQA5WpQYkuZ4A0B5e4xebTWrQv2oSNWRQwS6vI+aM705E7L1Nhw132hIYQq5L5Qw1kRIa2ou15eH5ADq6oO0VtkCjH4abAL7aNX/sKp7tOYIq69Rf8NL/2haMvis4xYkPFYRYiaAxFjo2D44sA811SEpArIuXJso+F+/vteUmpZffs4oGtHfB9dFo+54AiVFfNexebDwvyWx+8WDsprAWGdrBYEiPvjn+pQp6YzE2ojgCLfVWasM/8riLLUi83CgRSzA44hFJBo3nBZrMrlR4CiRhYbs1eZ956DAZVQPZ6Mg2cp2r/0cDcuoY9gKTDupDGy6gtgJ95sjXuQX1d2AOfCuE8yu2gdT7t5JAiB2AMU6rqS64dGhsrtBKclrBnLnmJ7uQtD9QAV9MVwYkUeioPKU6D5ae+eEde/HBZSwrvnZt9sljScIKdEhy7MWpC+aqzpnPZFVzrram2JJoKlkO35ZO/4KcpM5BdNb4uQEi4cqMuXL2csrm/uGPeEEpf8NxK5y6xfys3wx4J/vNk5+qN4imPgHoLumXquiQEuRdurhy5B0OlPgGMRLSLQQHsann/lmgows9s3JXnxp6tQm+VG302jtveGnh/n9rbbv47YXZVF6fGYosFNyeYVGYz+4qLao1LOk4O0qRplJdvzeIKSd6PDWDoio+cz/GlRJWZLKZocTVSZ0mtcPTmxVVK5pbQ9qaGe/x6/+hU7srawy5Ej1pPqQ2fUpBg5Y7MkRt3Hknwd2dKeYuBSfW6Gu5u29wO1a/Zyvx2xpH2Rmfv8zD8CL1rjkQOvveHl5knzkT5vSLA4TugDYMnOj+KRLsoZ2mUuQ/04lRWnSeuUitfX08JJ/Fn+4bJ/jplkquXnNZWgFDvLlEyqDY3J1opBHHnzfUv2FqZCZBtmQUaXNrcQo/CwKvuoWPNA5UxUxi6+vrNLFaAYGslosOz0vqzvVM1va0wvwOt88wsrjF8mW845Kdjf2rejAUebzXLCYFzXKcDs4d5UDLYQp8EfuTeH0phIdnZvFFShpdmqXEooAbYDgRn1eKOZNAoCXWm7ZOqSKOY0ShtDrMTBzzEs+a5dfxdyZk16aiAhpSLqcEkNGKUzQJv1eAyJk5C1qlMtj5jUwYen6wiOxLT8d5vaukPnnYqK7uokdw7prcLuqD5LQAEUhlEgyl+pZOaxDZeeMFyjYyWdLt5RD7qogYU/Ez6HhWEPEVYabV1VLGshzJdwx9pC9XiVE2mUbBvYRcqO0hFByeYiKdunATDU7AIbT9gVC9MXG2/eblQXRCzwLxUYboxFJXCGo4oRNjKuCrBkGFp9VF1UuyymcETyB7fVamm8+ceUe4AWQfw8Abn7+N+x4vqlzY4U8wfeUTOJdBQr73ouOU+rkkWGIGL3xWzNrnR9X7KYpl2B3/eOLUenDonK62pSVix6FNizlMWRtoxkfF332Ke+lgCgev1KUv6WfyVspkEF8vj3xeif5qRZiBdv/QQaTqSJwXI5qLm8IOAgtgSgLnJ4/N8TPMvOuB6R1gLIuESOc2bwJead6shp4F1zQnfis1fXZn7sYXbKyTbEucIg2cXzAHlHiJrHjgaDrjjDEeXvr878czBwTxB494rVowSyOcUr1FmxbEaRvTfLVSOiUfW2MmcXP8l0rnRoikZWELsczJrLXoq01WmJCRkNH4GuqLJd5CgtYXYA6N1k4uP7Sd5xgGKD+nA4SvCSbiocV1fmk8v/JDEBtHlsGQIQsmSzE0o+tFdfDT/FdrUXb96DOxY4tZLcZURPSa0larPye2NA62gqdXccvcmima36I5eAVyDm7JYZiZcUKDCrZ03AK/h8jjYzbalHu8KPthxEcMXs5XI9vaHhkBKrK8dN9864SRHbIGUc64o3id6aCFjmZXSRzN2aWdj76qB2eccMIhQ2l0k48NCUerTM+59S6HqnHb6D/vUiAXzG3dI/S3gvFdgEUBqcVZ5MyFiFfjKJPWiCMIbuiaLYy6cXTfhmjAJqjrnBIqG3RKMd+mLTHuqgEDOWL+Bd+ghI8zYzJHZlWZjRRLL2EDvsLmgkLP/hIdIIo9pzvo1utaHXDbfk8YffEjQ6wPL3e1dELklcw2KHZvTyodiltUMMK9ZCWto6FnjNTltnbSAOnYEuiMyybVPUBdJE73CG/yhdvA/Ol0FS/n0ZpKs2WIOlqm/HwRW6a2JoDcmRsRI2Oz7wz+niFpxFDTN/VQ9uX7wIQXBpvOz+292S7x7Ym2dB2wSwEPc4h8+u2U+TwoSbc/nAUatuuYQ7Saf2mF4aoZw3Q0Apknxo5kSimfLaQHfsuKXeGnSfHtdsPFMY81mU/DgiapzHyMQn7aEKfqpTn6mKZhbyxEaz49/5/OmMw7JT2QezGwBaZqn0JfIbxaJG0bmGch1Nk9y32+11aREZmZ0fRegFirq5oAB5mtRmWOyA2iNtYDRqQpCdOjkfpZtDcn70u2N3QStuZsk9Aav/ygP+jzxR8xTr66NguO/Psc79EXcZePE87K4ZesMJrNu1q9abfI4ANmQJpjqcD6ieE7PLGMV8nWo5Wv5EdOMFPZR6R11LhYo/7bwSqRXWMFkbUp1olzdibwBzGPBr2hebNqGuYNvCj/79JtjvmHBgRgLesIXfc1aZjRiNnE/UqDpKPsDwIdFXIu6CC1Dp7CNgEZwiCjytS+/2hRpDJwVAY1wvzyCLVQMQ+2tM79MAfcWzSRbs3wUh9mZOBbdyNGyEH/ttlH/EUindZ+mI5L805wa/sMDmh+q6ukH5lIoWe2D/61TNQqaj7ocPTP4bhiZncAehlpgTOg3s8YcFVFQei9W8UFVMKTnqcg7lpR9eAJsd1vEOFNbdq8zGDzgFY1k4NlZjV6/e7tMrmCTm3717hhBiIEgl/UHMWV7ASBqNfyfE624gEwqFSjLcCdgM//1aHVHEgVanEptQ9K/80Yhj0SWBVkrU28l/SBNEsFBQSuuQzuMIQKIrIvu9xGdBMqiMzOYDB4x7o4ipqYTIM4iFy/n5wdYdf03Tx0IGy8QfefaBNzWKo04em5UvvvrXcJ2acF/CMYnAVK0IWDT25otjmV9UE+BFpQTR9gn98gjTZeXOOFNdPHBnLvKQQHxPhpMaiX+3SQA0I2J89C90fk1vXHcs+Rw2RAND5DnFl63pJsaFHQ7EqYSZ8KmgpzHyHSLxERCXYqOJMr/swPPKJ+jm+90btNkX9f7ke7TEWyEDw+pu/HVAClchRbOhLf5l9WzTHucs3EUYd9W8iHJt7A/kyDTaXxpCLvt5vxaFSkBQ/9VHZ0fZ+z2Q2xQwPAzPMXZVbxQnFZtjLPA3n6Y2j3EzTTOweDKFU+6g+PIb6QQq1CBlANNQXbQHKQw+WfFC/Z8yuzXolnOv+rMcwfhZH6ReGsNHIwpE9OKjyx5EqZ83M7Uum9cs8wKkyN0W/PrLkcJgkD6eIP+9l5PW6yMZC/99RLKxyG23A2pgwYqwn/LNxOV44FR3FNBduvSEo/vKIL1mB/g6+Vdi76tmuCjlgu7NYI0rtaKiUU6kqmoDTVobxNZ/aVlK+WwaY54jhP/2b6/8hVTEFYNZlNdDuGJOl1DxSk92tOvBM4xXXQtxvAbGa48a/l916koREHVWup6qotYvo4LWIr1GuUCtGg53ysVo9NqmTGZCvU0o0qfUAc036I8REv4RVBZ2UJUGqFxpsQe+BpFgrjys2WhxVoNig3dcN+UGg15ildI5g1zAECyckVtL4hsmxwKRNaODzIaryOEOZbhVyvnThVFSqu+leIW1dV8BYZfzt07YoJ0hVhs4V58PxhFOt7UmtcDeC/cN+IS2cASM5swhliq+r72PrKyuWx3kmD6QKP9LSjgiPqsFIL6PGO+Ld8OYN/ojttaETglQnI4cMTIGH229WxQVDhFrHWjVjL9pfVC6iercNgkeaMfxUdVr39QJ5WHivh2Xbt+tJggQao1PJiMwVlUqF7IkZ9HD10SIXWa5anpeWL+CSYvfaVgMHHl9uXKL3SDFrecopP89PUhMDaTyJhnaJ1X/hyXN25kWUEX4Eay9KY1z4KpL/+MfprAW2wYajkbBIi0gY6NnGdwon1W0wTya7oILiN9l3/f1eqz7KQEJ1VtjcXq7GdiFN5HMzcwwhRX0qLb1byJe1M4NXX/EwoPFZTn8nfsEqx2T1/cQkrgN/rYw1FKzQSkd8uMMTa3E+3d+T0CDFp2GNdsjh8+Bv2iHWZ0xf1syNxmqSrj5/FcczYzX8+X96AwjU35CbaZh4oDeihJrXtM+86nEgI/npql3hdMkmN9gOhikLre1JBrSEHD7MR2Brw1rSJa7yjfNBogHPiDu4rwcrrF3Prxq0Ut4SQ2Gd9cwmTzrf8OkBceBoQ+zLwJP5mV6DSXKJfxXbGFC77zYIvbRfupu+u6NjVM5nr72Q9cr+8Wk4znYvPLivh7xkCmhpuMJsB/LpuxPYseC1L8VHiUbClJH/eIkG1VPRNiMDJni7qe+ZQCUsfqGkmILwN++dmkfWBofQ6MT5p0y9wu5VohMxqCMzqxiJfwF10ANOAwUmBAimeuXe41P2RE/tO/AyMdnd10CWdZwoy4xerNZ8/3l4MA16LpTCJKaMzDpzmWwIUiTmSM54r8g+U/h6gn2MHBLpKssH8F1EGWVERv8Go/2droGeXf+tzT3RbUSgvX4WFOzOxGL8+MkOLkEk6g7Wh8H2isO7AeU6nl24dAps+fgZRGfrR+sdG8knnQmDZpkQSqyN8ZwmMaWKwk944wzBmFOz7M6ZQxanL4dM8ltq/Z+YuH6s3yNR7kc00PlCFX20MQO+laUkBwqnLb5GF7pxfMCgHJuj0GP3BxqG3/xp5vHo/crwS1RrGeAQ/h/wuVg5hQaOsmLRHrxtVuy/8MoCCVLw9cHWAU3C+aOG1T4TGZ+GgiFRzFxX2qER+PDDfnLIFbhskkjKl2IXhlCvzgJ1cVzJFHM/fZqOPwsaQlFN6woEz7T23BxIhJ6rEKszndqYU0UopSBw1339CZdslpJyLydRC2fJE4Qs3geeoqnSaypLAJO8+nooeuHeOAL0Wt9HSmNrUPcQcs/xUrh46GVUz/Raj1uW/FZZyCVNKCOEZQlhHp65aTwXQHoBU1wAfbdHciYBpQKhmz9cRD0TufbKWNQxgMu7ef8kWdO8znq4ri1SSMtZte6m08aGaBNZSLsizSVoiUymXzCbP8CoRMCNHaiyfXyncJtjFS0nSyhHm0xlYjCiZWQGLoryjHT1OWYXklur3SD5ZZNwNg8UwiYNkHYosNuufxWb8QEiLB5wm8vivefTAZRRcaiZjm3cOhQnMLBI4z9k31+NM9QC0OmNn+xeQZ9Q4OsQZcsla7FYHOl+NuEsR4MgJP/+slLIKeq7i47/GwpGr28iY5S0VNou+bHU/vp0th9To8WGB+CCNM+6WEkB9XHY3viN/7ME93NP/WNBKZuI+CEBGu0KWs6teA0HETCp4MhzeIhhS50YoKUfJ4SqBAV86BvQjAZtCDn+rvljnuzVG5woNOvL+9xE16BcRLpaGTEMcQd1b8NHhEvlvnuO0nHg/XnqODRtZmOt3iN+PL2zc+NHfyraGYEsmBJ4ng0yfFPHUlYDqHskS6bJ5EgJXbB5Znnjd0q6gR5Qf8zs61u9f/iDhmh5FWdD39DEdLdQe/gOyzumC3uu+O4YI+ndgCyr/7sG+hHRWDszu/fkm1mmKuq2ET8f1jIKx0JMz21jb+w3GrLbAPHhTMFDhkX+OCI2GG4UWGOgZyEZEN2IrKodexlsu2C8m98PK8bW/k3OIklQO3h+ZtMUE9KKV1Tla9K4Qu7qSDPPXSpM+taiONo15g8UjdetlK7dh3bGU9o3VjFgANep5DItFB1EBV1UkuEpMj6kpWCgWLa4/naBxDuuA8BU7Y+0c4roMeWxAhXg0UcdVTWM4V/y/Q3/U2TJRV5Bo0tgXzXlqB+jM9bOj6RQDVAJA8mWFu9nvllkZCN0mliGOCUAAAE9pKTfmF/AOvQtYVbchO9iSsQq++hi/9Gi3VU+qW2kitqNyTx/SrhDWdn9MIyZ95rSPWL9fQDZVWXJDCMFQ9AF3TiY6HCgCDZxQ7Hjcu8l8AxfR9gs5zZwvGvys+2OCs25wWEAr9bs03NoXyhgqzPhKIRx0XkQayt30NJp8xzOyYsV9yGbs4e/OqZhxykZcsFmi+otQYN4ep3QtYJCHFwe2WcHcjSEQU2D8Q4AjkLlauKnzlf0GIPSDDdK3VRD1Mj1n/9FdZlfAK1EDbzdj0Upi75b2UquCw2PaUplbuNIxGNsqm/4Xd2ygB3BkUHsO+GDKRu0dcUu38N9IFOhUt1zfHiauDtpkmYsBYXJlvctPUQ7N/S1/i99Ukh10txEu8jco/J9ZqccrYsL+4arja6dB+18h7XkjxRnhVjhaV3mSUAa3loyZdnH5z8UYDPrehR5z2bKPyB13exd8mAJZ854WJBCD0mNlihXuVDbEBCWQkpupiJQyrcksM9zt9EuvQ/SMLlD8MYbVxwzlcXn8RXrOcdmpy5Ah5Vstw4CXBGUerrLVfM5+5rkmMKLEgQoc5iy1kB5G8LolWaeCUfoz361Ls6ZDatLjFIJSQlopUB+takQt+BYLLDxMEDdHSQh2ZpOgBXc6DIc/nFewbugt+EAk9T/Xka0Tx2Tz31c/lxe7eT7y30sBgJIvgOCpySd8Ab3Znz9yTgCJVDxYuXQzqHoSqt0+Xvre3HHNP53J515vPOvfI7xORPKLvoOmcV5p+tyE5k3eFFTJEnTM0vPtCmh9R62AWS1eUsQxqFqA1D6T9qMzpPwmN3VQZr86NQTeS2p/vdWij+haGOd8tFwlz7aRuy/cPQWklAKRfEVH2oZWM6YXJ5Oq6FnYlfoFJ+walySLFcedizU2Ou8tfD4GauBG6pMDeHfvYGqLmGolYBZgxrrltIVTRauVGeTBIoWawDKHUPM4fWpoH1Yq1SQBBTdDJVUuBZTjLB4Ervg13xdK3n6jzftg9uvp7sW4nyo0Zg7auPX4j0CBtW8UnxBoAFq5xSRQt1NDkfuv4ehddu3qFbwUebqmmIcaVdE1Z7wpUlm7DcyKlD8o6nuLWOmlsPe9ANhZimd3NKScYFJWjaOQVUZS06izv7pyTw+9quEc1TptZ3OMI+2zThM56JHcJFVVi7kbzHVSass5TZ+iSA60Ymyavrbcn1dAccWXs/TNAzBNGVVkFMA04GH/D85fUxdOkxx5p3g4KexctDC2cu4d1jGAqJWJhfHHd/q86fJewFmFVBAtnEOIvmrQGpkjQ0jKj69kDaYr8WADYzswAL0d6+DjZgugGZeZbOz4dnDZhmZ8pvz4/RtMqxLf5NAqwWFUNBx8wH5BFCXImfmU2fYupMerJRRnEv34Jt/DQ9NepRZExPjyGcXVTFHMvlzwJNfkP+jNbg+nAy2vJuFIg09q2Vvuk/IGnxf/bqPSCVOibhtzPN8jTeUDJVH5uzVrmwLwvMa5mF30QWDxYI+MCFok3p8znuajg9mbc84E9wi2Jc0D2LQFzR/sLrpG9I2ni+NdGsvFfJT+JcnoMfj09EyPHAjaxZCxHB6nBbKBfKBU7mEJKm2cN0kXq0sOdZcl2DGzwDjLzPOUeCbKAO90zjbaAcop8AgIrlUpQPrTaf8XKg+Nzh5UgFufX/CzUTdkDkJNP8KgfsMm5f0cnmp/iAZsRiT3HMwqUKJPwFRgYO/6MVuQ+5LOM+V2BHNoHZ0wAczb/ym12Fd9tJfAQKgAfotA6+JtDEQE9NcEU/St/8pNWTTLPlftkyFhNB275/Y2dqybqY79vcR0MMby933MpCy6qgQnS3Z+cm9TQGuIUYc3q91WzInILmlRMR2QqDB7r31XqcTYJi3DmkODMAt6+VYj8hP16fGupTfRDXXYumhTEdKToGh95ziC1MpXNRez5PY87Z9ErcCb/eJz+zv8/RKh7BYn7jaUBRMoJEyIJGEkhpHqFtzlop+1YtG3D3Jx/O7mOZpgJ7aKb+NobUsaUe9ElSf5+PeIOhvlyDsKn+AOIrAjZdZbJskly3N4yRkStT/hnuxrrdCZSu61SNm6JHEpaw6cx/NOXXcZj2nAuUu9AJJ7z66MEUA8YgSLC47ipn0esfQxMDwenPdT+KKmyF+Ez0WCesi0cGc2LdGm4seZXPzrRQ/SUNwHLxb5hQq6nysk+JuW7PCUAb8zKLxwbOUlRyqhUPegeyNKk/UPtU9N5UIAnNrxmC+g8gDh2pyxmKlW6WlNKqzZWHtBw/pIJGQOtqcIiKL+zOf17MsGwVGlVCQ6ve3JDz5rLOhvpMFrJDPX1ut/LBNOOjZDCBWIxMd+gWyGuR3x7C5qrQSSq0DMWvW6eN2OAlxj9A4ZPU7Fvr2AIELTVtj619fupZgUWh3gNT2l0pJJDKtyUhJswi5qFnH81GsQ43+10E6n4bXsUkvGaprazqxen9bxlgbHJrsxNy7JgUnPkudqx0sjuZDBka0R2JU8Ho/ApDKdTsqzvd7z/QZ5OrxTp+KpOcNN96OlrRJo+4bSz2DVfu2RMsN7gPo90i8QulcUZ37/T+51IInYEfEn3DOlQWkwR9RAY3EC+iWduvGGPCvCC7voCa/eHIoBFIQmnTq+YkSS7/kJ7ihtHe3QaQurYqvweNM+uMwKMh8SjysKWc6lNtiNoOM7i/EZTQA/nGu54cA1o15Qgvmunc9LdLilLrKFLKWbwyY1/gcsSrmEojA02Yy1VLT4EHChdWbuY2fz0yqsP66iH6skFDHDLy3pR2XkhUqRxJjlCbwe5HY8fzS7gToxj8894eHX8ByX/N/s1sDNp2p1VbOm/srqJE7GjOvCIB56a/jtVSaOGFhA2iiP7o7bUynYWUdb4syh8LL7vVl+6ipmM3wk4xiozFFhptdHIiFfk044t9S/vaQX8UHZHJj+hSNgP2ACBFYa6xRs2Oh/ffeVJZeMMgPo5sAUEJY+JCxM8YcQBZPPmmidGfgX4CAFbirtoy7Ajt+w0nSHbLzaOyUjaty+3PV60dvo234cDYLqYW3iPBm1zxSyYZF/c/qQa45CuAtkIdHMi/AVj0sgh6jRnn/OBS7PdGTAd9t7ShG6KM1wErz4+VvbH4CnnF18IqTGTMzy+s1y6QMmN+PmZwWg6gy9Ih8PZLG4fFC/aCtDDUOsEl1B1kkgWx/YnzRNULa5416V97MocAifByBqXua/RMCbSpOwnB4OoPdrhSCa9OQWtnZH581Zv6l8LKMpbWtmV0J6e1twEG3zosK1UlQDZIGqoz2/WkR06IqDI6e6I+XCBr46YOC5viyobMPX4sq4p8S8WmEGGX/Wy/j2mnodULg21idM9L4/jD/6r8Ur4ndPcyN8vVhEDc0XrH3Tv05omBo/GO2+x7ms06IgIbHVQC3gdWFNuinsaNZFrpgtuQPV08jM3J1Fttpx3JGFjw0cYLl/og3GmbVwNrMwjWXL220SD/IMjw25hY+v/5Fdp8z/9B4m7xpk1JqiimDkEzRhYCGSbTDmeAvmrZHXUWJDHIo3ZZkPOGtwqTnGSVhwjlo/wbmGWRGStiyoUQxp1m+dzcJZaAjkiTkYqObq6lxAU7kmvt2MH+noIk+4GEYPeA6W6rRV1gCVl11Vb5UigepdoIVC5ua+Yl4mPa/mTVNwQh1YRy4NnB4EMlQ7P7K6AFqCt0XeXUZHYTMvEUuO60n3Z86cfOoTclqO1P2mR1KxQUXSoobg7THHOMJ1+a0B4jsj2kxM9oc26qDNWySuhLjS44ZdGhEeKbtc6rYhb0fo2BDleWU83OAfUNHBLoCAxMc1HfW+QntuY5rW9zB3OXr0CIVRAMBY1SJjqZXeOBZSJnmYtGhNAfaOfwieha/sKSV6VnHkMnoyHd0MfZnocfBKr3Y2Z2BQSnSLSWsFOx3ZdWSChyzoxYuVqGWbV4KNfgD9l7s6CuYRod+JZo73XhFVylbx0UViYejddPHc2SG5zks6Yh+IGuZRSESmofEO6BYZ2iUI2hej10gEnoqqFcq4AOmELk9paK/FUW8VQ1npBcoa3kykVCjxNuqnhOLOLH7sRd2cQ82HnCIkI7aIsa2yBKH1IGhQv3lpJQx6XEE0foyQEspqBGKboZU7LRKnvvgK8ApDKwU3+uoHfTx/Mua0LmeELyXrUBbwTLnCaMWaJMA/tBmvyE5bZhpZGt9pwlOqsyLXfIkmmCF1Y1Hf7kYAT0uvcwCD1bTLOTMHjNuPhHgk5tGvTSZLQH92K3+Sz7X8lmLeG/bP7TNTnz0gGQ2tgY4PDw7oXzvTvUxWixab+fJfh2KEpd2mp/N3fXejIDsOHsdI1dBSR3ddtPIeEG3qmWWBq6dxbI2ejC6qTCczSgJkT3rXDc1sfbVgBqk4TAZUbVWx7xfFtm12bNnTx00vPkneVJIm9ZERUtsKRTzlVMFB/djYm3nwl+kxsv7/HCqlJDPMDyczmfcY3ava5YSM0sDzINfayhvO05+p0QmG940mno6SJyV3to66XnR/XjclrI/O9b7nSwMFZpoNWpkuEM6WaE+PEJpQeh3yADbkOJurTb2YzrrWU8PUGi0Eoou9IHcC0od1a5rmiad8i15TmHnoSj2H3g+6VvlRYuseTOLcSnrO/bZjVYyMvx2nB3b86kYy5vFRzYm7bW9BfVukry9wVs5YHQmhxWqozhwIvc0U4SrCMRosPzKxehhEZfqX0xbpUOmNvRKZm6ZKXZNrqFZ6tWJD3wq6/vqctY1XELqo3w3MYVk0brJsGSme/RYPWMJvLlNRCcSACcZOHoYOV5+MSuFBMx3z0rUUf7PddkKQNYwVCVQGCPNaedOq4uElSpEc7TXtboGg3MSh3/T5FpdUPZfTBhAhutQmZG4msfPtJhy4fOgjIucb3y5+uPhFwf98dUwN+tzRdbbx6bIZOauYuHV67vNie2e7v0x/c679h0agPXqQ3BuZ82xT5LA+csoFMfyEuXXSGvr7YJcF/L9oelQtPTjffqHdbOLMgjaWPQ2JzV5UIJTbaECnFQmJML8Amvre8Zi/t4yW8lLxlUWJ2Cjh/2fVuOnS8cWdbwLFyomy5cAFWReLnx4oNt8ID1JEa6JlwFcZ1GnRjQkAM9vCrsCrOpLVq1UKcpubqM9i/PSrfv0DltGSCagr5nt+8AG/MLLlwyCEiQAinU787pvh633IOu5H3eO0sa+QZlutBUlTk0D8BXmZpLlgth9GJvfYR+Lp2E7SbrYTEJXM7S3rTMYba9sBBVi+R+Xss10DZnzj7om+YTBV0rLaK0sf6yHzwEEYmUGaokbOaofiQmwtb1Wn0vrOsnE1FDSP7OOkPwoj2JnxdP4lufJhbVSAkAYV/xfwnKtYhp8AhYx8FXUriRFs5Lh0lpgWpCSpSw+pbx6oFJ1FWI81gKktd4bLUfpHlGu/jXV3QTGCd78KtIQ1sp1/3RKSDv2FieMZQFZiHW2O4P9Wo0KmumJ7YP5ThBkWFQtHIc2lRBEtkzpOcQIW1g2WUSRiQvTYj/UqN8TWSyf4UKeaTUQ5ndXahFwNllyGwELuyvlVFuPdx3zTtLtsyb6J4WPbWpKtN/Z7FZvrEGRlNSbB++lHhUgccK63ePOXQX4HFvbIGcfoQv/ERcb3w3Klet9/b2OjOJmi0wz63NkItG0er6NvW7rHHMPDTM7woMS0VAFKm5e9v+H63H3+MO/QD1z93cgWpFy+gOWm/1LmB0B3oD/adyBdUTXsl1eIGKA05mR87qdmPvmibvAOW/xBqZ8nuHOq1v447OJE6Vvj835UluYWgrbjOYRJvyt4mb1v33161h2kIB5gp9ME5NWTZjXoxtCJimHg5SqpVo3eSU7ZL+kTz/vrthdRNDtWPuVTsRAangt5Ri+fXtFAISYKxFBteCdcDuMjH27dn9V6vqUJF4TjJYmea9O9TIqGuXWES75UIr8Nvnhibj4Liof7GOgu20XSj8GX5aweRrBzb9QiK5Xpj74SsiA/NDzWOjbEHVVNC0ArN6QxsaJMORDxFxF7OivXuekzkZ3irA6pjnmUvs2z2h6YUy6Xe2aVjBYwGYpaY12f+zpVhQ92PcLeVBEUlhoXA6CvM/xGUn9sw7qcnPTbFZYSproPwtaQPHfz4x9bFvIpk6s3BhUEG83ab+7uNT2+UQbrYtfcGyXhijVH5mUFBGemIlqVdpChQ8LEXTfO9I7CgQQ2fhcxOzH/7s/HWalheS735VzQIbQZZu2n10oCwx/+tUSdRuOV6mGE5Aqtl+XV7kg5T5KBJaaKPeUbp98t95oK0fMZfbCpqIEu8cppDOutlj8bYD4kxgYKzU0rtIGx8pHD6u4BGO+vTOLLI/LCxqky/jfbrwla6LkkqO234yjPYdSVeI2xDphRUt963/c8aBlFDfevquzpAGiwTYlClVzWwNShNepLkXbUv5CLPkKF0+Lu2/KhGRz6pzwuQhaZ63Lv3pey/l5cQUdUONxsE/GtQumHKp/VznSNKrQnkY92hqAIizyzTFOOeAaeEo6nuIbriHt9xuKskD9VNqxAPVuQBvfpP33+SX5+/fxH28voB2ambNZ701yzFxGsRuBUMhl0dNw5hBGkpnlg0tz7DJNp9XrOlkSZen/YgkK50sfyPyK/VW4xwzyCI5v+Z6b1Xm5q1dTczvMoSnaexBhBI1ZbpIEttCq3EPqV8yVXcqxXfv0MlWFeI/+Zs/t4pSjmnXo5uxv1MH0JpHw+qBwyZd6JCvcBIGi0C8JAoXRujUKRfbHoMtkZKFzOTbEEccraO6dN9ZY6ZFxYONO8E/zo2eI5SCqG8ok4OdXw/4IJenCxgUb7+BElAfb+5QdiAY3vl25169OzldYUfavz5I4Lnx3E0jjqejh0yjRp4IKvkoh9EsWACl1JsX0vebXq+FyvZDLANcSr1DlalGDdlyXtEzsE2LQtVGWqnU/mZvxIh6J22snR8bx0Ppj9SdS1iabGTF0VBYoBMkbxRzFrFOWYzGRyVKaCnpo/AAF4wQFmnGcZlHD5BuKwtlrx0TIHWPk9Z3/sg9UgxBtJqzSSOx5twJU4J+AGbpyuZUCZPQbA40JkkfxefgAkfFWHs9du2G4LdRe4rzRnhq1mWuVKiVXQgFP/R3dsp75NhqgSbaWP/gemj7Ufa0WT5hviDvjmivdJbErCGpwqwJGRGQTk5sqlv+wW8pxsWTCcE1iKKXvnOgKTxaURB9t0gkD5Wq77H8dop4wIQzWgGISelXgbLvfJXZcCCOx4iv7t0/lW70yajZpGDPBF/LYRmVqdD/BswiHx/BCzEvWnJVLczNhD7hLObzaRvoRMo3NFecqm9jobOFI1CrG4ftWLNL5VjyokIGiss2LvwcLUu/oTdeKG7ViBIQ6/BlX65P69EnYrarNbRS5iTNaaS75BkhN5h61eDmXw+hcz34ToL7TLhjsSEi7Vs0ue8gmFPOqNoxCmxC/v19i22IKurk6hSJhf4xVR6Iz8g5bnhnPl43UgYpWaI5LX//Tkb15VYgl7g7HilqnhL4KHf3J5WBaL7HJm6hJr9DXzKmyP2IKVzL2dK0hEegok5aUvvcXY1qByLyIJLaXUdKyvjpiOBQV4frU7QaaShTOybMADnaLqJnCfFuGHK7qtfVSqVboiTzO/Vcw82w2nBgGXXUv+XgSSJzLnKHmxjhayK4V96OPgDy5F+Zi531//elqV6z00Aytv8BQphaLr3vwYx/VlzOs21zj67ZyfyHsPGeTiSRC5aJtaNKUDgLwBFKiC3IdBTp7x/5emVX5Z4ptpwgICrMv3y4OevMKT2bk0qWc6h1RgDObaqJAKAlLo/rZWdGmpzp0ZgH6Ad5b0NSF9kmxMvUXppIjThOejfYm0qyYloaaieRKwTw8nNY33lcoVjGxjj6wUFWO6E9giajKvqZWLTn5w8odmyzLtBxr8cNXMXo+dUl/8pXDV0Y8Wt+7xWKGcBHWzWyN7P4zP4HbyUTKpfjOpzdSlNHYXl1U6eaYsDeuamlcxFylgKtzaJRCxMz6aOK6FmEHFZT8+aPaPMpptvseSU9sXHrQmR3+RCRt2/Hv/WbByo12Nu1bowBCCoiVvqvgkg9QiJ/qNnkCxUooveTESqlCcZqtvSwidsvVZXs7eZgnM85RXxRSC/hzzRZyibJHjbQw3rCihwApnd/HX43eZyqIyme6P67+MtRGLstngZkwbQuTZC4Xej8k2IILzWvs371LifpPug3gnCwhMH/mUZX6N7a3krQeChY4ujpdYLwdPEjG4s34EDYGz+dZDUDJOZS1PSth46yiOtMa+1rexeqX6ka5f8oxICa8kBDmjriNUnGktQ3up/XytjhkgBw5uZ5TM1fyPoVZaaFR/U60uospmrM7iqR1ow7X+nFeOT3tvDlSHb/RYVUD+yCgnuL+58oYF40QlZmHR/kbkB3ZkanAp9wXCMfIM8DbrLKHIxBcHtUq96oLBFooRuCSP2s1N/NYpjU5Jp+24D8XL0UZnNUj0YefWPsDvjvu0i73yvHIwqLgEcKK2S30AJDpQZGigoKk3LdQemTCd43CVIujc+JdxfN1Xom+7bqNwGQU919Y58AmKHD3FeZrsRuh6RnYs899wZ296CiFH4czd2F2jba8FN/AoktOmuIAAuvR5+WD1J+2R214nq9mP3DpuFqNDJxTWVevGgtJYUVrr26edlzaibLLwJZd9GTUVmCrIND3tyubGO6nixfkMJXteI3DmT7XfQ54+HGXHTzskHby3CwteMhl6yWmThtLN425ofd8bCF9zM0SXlPg7e0XcWAysoPtkXl39r5GiEOB4y+03EGP+TAkB8cLfkpQnCFi0rs+K4pKDDhc581kpDy50ILW9i6FrK1Xi7FaerKyN3SVFQYW/vlFHgNbdYjOCNSZm6/kl+yDB9cIKIHL03aDJ1HT8UgKiU6x6KoXcjjyrgwe29mMFQn+ssCL1u+Xv6B6EOoUoFqk8hpCWjm0ckqh6nKletBW/AEcaZAuCHmKAZ71BSdkaenUoDyCxgVg2YqTlbH3cBYtXFwONDf3PH8tter7CCyDh6ySu7j+OwZUe/aIbEZ61jCJil88vSeG0im1ZgRmJflklfGnhnCV6CrxkmqOaj2oTR8WlMVgC5Hty1fLebmWGW0bHIF8tesJFeZnH4BomlMsYmfP3ugbD82aOkZvaNqRJkvhe9Eny3ChreKg7up/gg8ohguUprIhaKMG/CM5ssxUjY8LlpWoC05MRxkzB85LJEtMfEm7YqOgzXbWw6TwrsSDfOQVYTVliXj/VKQ1DdVddnQ5nYUHXZ4fBgvjhsaeoZJ//hFNMo4ZzM+4wv72Hj5SNp8wLaSy+Ss4xmeZ64kKU9nsSHkrqDZhCpby1l4kPlpbs4Osy0jMubmM/U+b2kuWbSCLx0GZW6FpOrTWi5U52GFa29xAMicm5Df4JfXUrHDTwmkaICT/geH2+KTHXDxK2MyXmVIXnV/FN3yN6jREaSXTfiXIrh7LqgoQOMtSJvdWckXRYt0U774Pujt5cQE/w0Q8U6jw2zJo/7nzIw4nXGlxwHMETltWRiBs4AMpoGjke3v3LrMqRq4EumG5Czp5D8ObZ1WB2JmDNRXee3fpRM7RqLWvy0s7Th+GJ7KdZXeGdjPqvbcc+Q8tVKY/piSThg4Q9VSb1nkhynKpYBu4N4hF+OE4cheu4eMWvYTQt+3n3TMzDZl4aJAUvdpUq2Tu486TFksXehAtHBynNAGU+xD6YJ6gKDzvbnYw6TMUNv1zeZ73k71POO9JatXV5+Og7gf9SRC+VxngMLTJ4Kq+0aKvfij/vOLBX+k3/RCi12h1/DduLJvvt7XTmBN/jPWreSI3UxCXwcZkNrJbQRSTJF0PSUJ3bDsXpAKQTL/BmG4DhbymaeaMCgUMaeH19wfCc1nbsqRxQmxpqwITORCTE/coipN/Q/edEfFUIV8ltR8lfy+UOEooq3L0+Pj6Xz+bALLB6H6DuZKSq9vB9n83iM8zirMEOf6fenQApGP1wDmLaCobLMhy22dVCIA2WPY0uMG8q7iRqMi5iE2l6rywEo1m9etivPArrpz+4cnxaHU0jKPvr7y5x1TDdA5Mv/eYSqPoqs2SidiLQ1jV5ZObJ2vqb7w1ll3K9WH1p5d3yi0O1c2wq9LvBwzk2L851TEkUNWi4yiYcKeGkuxxFnX+pTcR63rv/wkMYBF1uH4qvqcY1rgNjOE19Xi4xQtialuscpTOp+3UvVo19JAyWaMPXzQwfknJyqZhoCBUmrOssghno8gfoEyqx+Vz0hGxWnnu6ATr+obF6KRhEOgB2a6/k+hxNN+O7XkLJlbPFf3zTjkD4wckkw9YhwD9N8ASTMwO3hibtWDTmsKGHpTXPpyvkAktEbree2KuZh1JsUwTJnID1DgSQk0wXcW7zLzJHmpOiwfL1K3wxzsvBCeVzJ7q4VOJzcfy6DkIMdOpH0SRIsGO1xrO2BPL7aMqYkW8C9WrByOvDV5ScldQuSFJ4XqKNqWN+5IzJhkEAp5FITjcCqUKbg9TCiLUY35luwwUNtCK0gbYXeLbjWcRu1/wOe6HUPlWVjH9ZEDc8iEHNgvrwnJyUmgUFNA6Zj8TydLDbOCQG4vTHNCssPOa2pifvky4zS0Bwkzw9tDlwk+17gnkAMaUb+Sqtx6Z4OnmLiR09mJWnOVu6Y3ytxm7/XP9gSrKUN3GxOVYRXbGqbY+ZVc2vo/NwGeDM1MqNDt84Q5Z8cW1L71LV+9yTPwkNQxwR8PVxhwwTunJnb7QeZGxkXY3eVJJoK/9vmukeA5VVtSM0Y/Yc9xl4w+N4Y+T2gXSq/C2X74uNB91iPAQDV5umB8WJXxYm0sm+cVEsGdrkKdhdvArvAXQfzg1Q7wcQydSzI3J22BiS0m/uef0z7niynbIM/R9vozanmEf1vKL+PVbfYIYmq0hLCuTEvTvDTe5xFQGUh77DGV/ZzOUv+0GPg1UVWHZX3vrMmc5bpFcZOHThTo3f6/VNbWlRQf+VXJdQcV3m+G4jFkEgBep2H5SfVgnkMvAgdKHVNZK0v3TW1LxU+benkWd8kfKBT6rutztxBM7ggnJ4BBAszJI4IKkzFe2uDiyqAorqEvdfHgDMDpudr8/vqVStp60j2jftA0LKsPaCwqDlumnVOcujXe1wcWIssRTky6mdGxAkvQnzRoLbxDa3pYHVRPaguFX9V0ELC/6MUSROGIw/WmB6904TMtz6mcBj5aj6jNQRsQsL3CHyWRhu7ubwlhbGIuQ10ZivHiEWrLLAeLwpYFpUJAXqIDlj6JDuuLj6GLPtXvViS5MLkDwsp9mtiS9I1rNCZFNeLcNsJ8J6O9nXmU/gnZqWYmrwEs1eJzzwxdeinXif/L1kjEaO4oBv1/MlvqjBkiOMob7DPwJo5b5HJt9Nfu9Ysf3DfSHA/pSid+PO/3YT9AvOrwgFEG/Yx8zP3qH/z0DAhZCyhmoK5BQ3+viq83+85uJ9g3UOxjq9i8R6xDRuaKSkdObvH1PSaB7ep6qMyUd+20ZP8jh4q4KlhXub/7iDbBsWZO4PHL/utvb5LhUABNtrIyeiP4p+PNbvPMRqOfK7BfM9RFY/E1airGqil+TKyr5D1jp5KsI6I6gVIreC3HMw2/RESttK5Eu9uHA334pUba+tm/auUK32eQh9KqX7OVlRlTBqvbr5LdqFOiIuVGqfeAnT5kaw+/7iussurZjmxBgwBQ6Q5g5eWrYV25B/deIALKFeLs9qXWn/iHDMZnVGEFqRKzzngyYTqh7bgyxhb57mBzsZO1BpiyJUY/RngPcQKO5A36VrljGn/1rTKaFZ3Z95qfxwmEhgkFDQ1cwOiGiU83pNFatyqOt3ctdCCw2YRgWKlXI+RNtZmtrKlQJqcAc2jeliSrKVscU61FdjlXo6Tu/Eu38MctcWfT7r7/DoI/VM0HR3r16wIM+FgI0kiqBFe5iWtlLhDemN9ItHw/cf33ZWSdKinFwV0DncDIi0QSaMq3MvF4qVjpwDfxGPPWvCUieTLgS9bekf3p3lXTL8aLwe4diObr4Sq2w9aGtnj5ZP5PlP7NYU+W9IBlSMlT/gwRfplesiOWspwaxgtO3e71Jg0Qt5MX/hEBy/ZNN93WJj2mG8dUs22h8dItpB+sOh75GDZSZasTBtjjmJvSvwCprhEXYMza/vrCl6XDCkvb98wjNvItfEjtDe5/TeKURSAJNXN5TqrzmMvynrj0ct2T518OQ4HHih0d69RPWZySPuLylkp6It3vWe2hikB/c+FXSJkahZ8hdCgntDGOXyeGweFK4nZnEGdNVbufw3+RaGjyKAuGepz18PFEiZ8eBc8jYPwFlseCCN6gZFYW8z7IgKtqJCQSoacuHFHgngYeQt8gtNjVLnMoeC530rC8aroHx0oaiOmpUEuZqsnPrkBAPa3rU3V6jGeVh9nqx17EPy/WcMpvN53BIGRW98HFj4gACMxYzyMmVaukTuKtcqxVlbk2gJ6kGRohVZtQSYlu7150v7PJtzaVIVg69Zl6mHgqL2ypnirqZIJ7ygpHHOu9s23YZrnQEQBsI06nXIa/4otXGhawlnsccHpa3p9XKZdTiKpGAAK2P6vLty65/x09rVY2kgCbYQcS8gAvwzC4Z1TtJXkBMcLuSgDZf6c64OcJM7RvP3yb7ppOcNv7+ROJ3bgQdftjrTQ3OJqLMU7IsIYBUVHUn3KAFVay1D2byz5NJoiBj8ypkkqFIC7zaZZzJ+BC/W2WZF8bV1SZcCm/nP2YrEsjWVNevi8vvSuaaeQvGpHX9yY64rPmHcyOburpKltRr2KQwF40rA8gqgLMr/f8g0vdFbAhe++VFD9csnU1o9sVSb38HJ3hClWF2GEm8ml7xLiLUnAyvus/j27B2fEQFZT/qZlfWHFLpYHml3HmKVWEyDRhQgyqVTphp7qiHEMjloXrfbqkwjs+TuRZ+nHs19ioxqw2NcKFZKS7HMRscSLiYGWlArLbSMfg47c1B0CeLROcFJhcqueLZGIHrUACQyBqWp7NhnktBg+boIsx9t8QYFgVWOeOAemR06Yh5dAsZBoOxhaL4tZatBsbmG3v0QSJdQihK2Sn2GoYwFUME11l6tTez0SvPMAwpjzY8Hc+TBewv8J16lhlXFt8KCa2V2PgCydtWMIBKaoaPta4ZpyU6SKg2FA+U/b3QedqtYQMQ+Y6To8KvpoxcS58SdEjt8vysydOVYjA2+ZtEtT4Yc/hpHjqYhsLOXH/q20OxxVdNK+eEdHXSrKNmLGWZPRUa5D+0pkMGedu+GDU0J7a6imQ0oOkSGEPzdYejz1axF8tCPFIDGJpWa8Apy6MebdsvrLWW4qd/45qrXMyLCTpj8ZcBHZZcgI2/AxltijHR7OmPAenqrtZ3BPE8MCNuL3RPTEExlv4oPZ93cApL7hVAdyLy64/rQtnuunNInP/U+IWNCDrCti3OeiPfgCYxfCrIWO48fgByT8JiB36th+Hp+CaSrZfRL6IS4e92B08eT8+4t1lMbcRT+xmJ3qHDP5VpeaOMwz5baxtj3Meu3OjWA1zQ0ONbQY16tt1hh6O7t2fbJYohb54llPblSdPUSUvLLXBIJ4pLkmWr3TZ5ht0q1mMxu+zmd213LlV8D/P7rjV3h4AuOGNN5kohNGzyDxzmCvbV3MQz/EF790V//r06oC3p891g6AySUWHg53n9eGb8kCpYZcGU0sQXm+J7wyRpwky74IpFxIYZno5303U1YDmTr6Ith1X67REYsl4Nl7n8MxyfvaqrKQ3frMPKigGs3mjDpU4hTiLHSkS1Zb5LGlFhHAMN+ri2I1POKn6Lr5fXPh4Ot36JIvgmXXoGgiUBw62iG6npeynnHmPRR0AeYk5rMjg/1CUlRnbN+wNsjzlw/kU7oBEjUO+WPjviMqSYfHK3T4gkKOG8oJVeL39yx0rP9E6ApU8znu6xiURBo0QKRTRS9DSPv0tTVQykGolcZtfrviTNIn+PyYzODxzOeROR9hW+jg0tGpKaXLbxp3NFfUPElr3g2HwlzwQdS8x1IQLXDMZDYmy1wht8eAVnhjj7pbwFzTQAB8Yhb5UniTKexylll3VRo2bNePCqsbmWkDDy47dyWP6I6frdIKPobHVJvQfn6ci6wOHwKxP7hGUERO1s7G/nHo+bZc6n9RQy3j3nZ3vHMBdpyq630XhRm9ZCnclQ6O14lQ2+QBfHekFvkgatol8Xm0NUo0/CG/MKI29ZF/IeM0+Ey9uSIHBBY3L4sU0nHHvYqtjfXEu+Jw4yAgJm/zvH6PFRyRY6rDrgBb0DeMg/bFbzwu4bpwuzhy2V+eyrivy/sQCvSMKT82SC/QyhUJfGRk6TLn8K+sna2WdF/zNowVZOUSR/TXpi5GcIk7BKgAAETC0D4ZCD50Dd/eeN5EmoeMTXMKiwfUNlhWFUPn95P+r+fxWf8dkD99PbxD7aRz/ZuMvmW1op31RQ15koyzQfj4MNSzqnPrqeW+/ZDPpgDM/ONW0QAcYaycPaXJBl6WGiyGMXnOPrtO/J3opg60YYYTnZTdPYypZZ+vV58iiPbjDd0k9p+2wbHuoGOJyDBKybYBiqWou+HekCyPrh1JRQYumnj3+nU/3d2rjG9GWV0Xqom0jLE8WBUYOabL8VCE2Vt3kISX8XXOOdOpcGZ+aADiIR0HwiOSbj9g7v9j65nfmpqKHEPe0JKCgAdlLQRhDy6ajfB7vd8Js4H3LeJw6kUZog6RFKjCtL/r1xqXJsevkD+03ENJCmLw0V332hFYMvWH6HDdLBobG0sYQ0dLXE3KMyPhTGzpEBN5T+71B65144mw3YHrCEFaIJ0YTyo4NpyWIuw5ZeumldMIFEPmpekZMA13aTGgFPHZr4FWzqKV7Rr3YvHL2zsrB2353r6OvmzbuGRXaFNFp1LHTnc3Hbu8xIVDOgjtQlHb6wuGW+0olA+isJvIw2ZrThpM2GpCVfgrjO7KJQeriZzXGzkLWDCLW6mPz/VVp86KVAEgJChIQrenwoAfBxuydevZtzpqwhR/QVt55JzDbnYRJJC8ZQoYayK/vJ7/qXjwQytsljaUx0m64zAx7p0rP9EYFjmjuBWPLsLrtNWdUtr66u/mOhItcdbi4lho4Qi4QZkxSGD8sbUkMExuQHLqy9Udj4IWJy0nndwmFcmM+HqsjC3nhCTP9ynNNLRb/tH9+0DlfO9CPcTDKlLmiiwbihFWw1YbCUY4nuZYDjZ2CMl+kBPxIrUF8DljqHONSq4Pv5ciqbpl2lwW26gM8EV8BDua16SZYAo5WbHmFlBj3asOES8EBlx6Db29tDcchr8WYmNkL5tZ3XlrMFN3G3BSS8Ff5z2ju0czoWE0UiXCFvbjZvHHQJU2nPPS5djfSlIwiYMOgpfYmsRvMNgC8ev/3o83jIkHNRY1eb3uBgfW+WvxOAe3nghE2cDGxTds+Bmm/domE5ekorLoUETroMjaJZaQ7J1djrIpvBIpLL3drQ8sJEMDfyJjRWy6e70sM1s7uhYSM3TFt44JCLK39/HHSuUKyiufFboEVod2rk9ugK92MP9Fe5IRwVkE9VUvEMU8O16dT/2GFxRLfZEnIwftq2CNwxgGI7vTr1hN+I7f0hsSG1IIWb//wdlJ2E2MwLG9OYuefhtc0W+rC3JvcAq8WTFsLzHFADza+HguesJYK0eaQ+dyJ0uOZDg6ViilaK79NKiDZKIWhY/XiJ8/UWv8w8nb2I9mfNg4usT0+mP77E8GU6sPsY4FDLm1LuUnxfyQeNbp77o9DnHCPrx6EqdWq4oVnO4yyjpKT4WghTZtHka7djUdQN12ZfIAuk9ZqNN4RElsK+DuAnyrR6+YBxmudkgTgmipdMmz+pu7tinjgzgecJWXa1GEtIsxz/4cKPUfPovlDHRSKOykjTIr4au7uJfPRLDm1SqZXn4m/nzHbQHIJ0/Z3Fm0DY7MmBLEFSNWxso4tOQPTztJkOb0tNEjCdb5W0WUYbuODAKU5EIMX9JszjnAR6Pw3F/o7dlfCSghCRmd4knkrgR1hiTji0iENVrgdMJaEQtAZEWUu3VKyPRq57Mt2nm53NG9VUjKwmhks91gsdY2KOAUBs98APgRPMfwKR3Qjh3yLkRhYwPOAo/4mhwoWUVGpdVO7s1gldeMLolNubginIqDTe8LZxwfSLggA00D/WjHWhxFWR+OmAtFvtlJjx85hQlKPtr+U/WI8JvqbmbSRoJEOb5e+AI7MV+aC34YvcL71D3GR1jd2WTH5m0i5lfFf5vTb0YCUxLiG5b+ZfJPtbZsAG4yu/unXtUIQujdDbp+EEljJDNrXmZbgk7TGOjF2OAsIdPk5P5kgwVehm1Ig7dSMewe36B/f7BTCMXkYfPbVKhewaN3JfU1Szhoh+66vTTVB86v3M50HPAI0YOoGky8OYBuWQ/x5g8l4QWHNDWR1N4lhH86m6GopfIDKny4uIzEuSUJyrSATArQH/2vh561lOWLE0omPNgcCqLdgHcsIqXjEiIU+QsZtLqBnQSUY+URpMKjZGlAybIWFG7d0jD6jUMs6kd4vwSvuLj5WtR1ET900pLWJDW04jhDyn237ke2+IVGFJZJMKsRwFKhlMXlL5UTcyrYTIgklRrEMWSACfo++moIsGZLIakwxv1ceInPlL8ZM3KN4txHhcp2vcw+qaDJLn+Nu/rmFHAQiu2DBmkPco5v+MykFB49WK50x43vXWUYkvy16/WT3q86xSdHpUqdsI8DIZZXUe73P95oDfL4p59TDJcCvky/mRIyZ4aGeglzoQHg2cvK7osSEFQVqBCQPbRhfx2genWOEqqjLrkAZPZJiNSV2o+xi9Nbo8sQrdWBbIdi8E0fCsPMYhxgN4Yan/sbGrD97POYsQiMienWWW6uRHJfYJi4Q2hagfLnVGZ4zT1QdFR2cpTYC+MSI0bfLMNcpdNCvK19ycpU7hx6CgPcXZ7pTBkYJfbAz4np07Gvwv0N3dhL7BqlTOqqKSgiOWIj/fhkLcYeXCJDwh8VYssuU6erZ7ZxQiCJ2+8g56l/v5TTI+BGxalJuymIHajX0VFywYPIqxYT7Em2O/kyKY3B7hTA3OH0qIAR6x2qzlx2/eEyKxFOi1LbSD5WIiQ0VzBXqf6ScPhEiLTCExMLVYlmVr6lZN2WNwsqplHltloavdjBiE4gESwQqRDvUoT7u8KXg25PgfBCks4x3o3rGoYXw7Cxkge1Wyhw+QR29YoB4IgutVguO4Y1/svB7zzr6agzX2wr0Obzt5XXxrERFQ7gJgMBlTxirloTKkyydFo/OYLIvwHaP2Gw70RLwZu/9X2ZEw88XvkKHZALLOq3DUWSu1NQveY9BC3/ZCQGqX23E5SZW7q44EMk9ncJpaIyyZ/fYM5dFGBS8gIf29ICg5RBLiSanKsUa6nXA/f5l/Hl1YlHM7vYxQ684mGbh4LZ2JKNtIPPaIK5PtlqB9oQex+9wkG+zjffMfHvs3irrfDgYxsgj9zwKC3jtmQAn/YLpQ1VzYwfg+Jun5LINWIOPlJ4To/RtuK6O5+CeWe80izfrChSaGjeeiXBEAbWC8C5ZaDcqm1ZXUZNIKfQ08qd8vYty3lwCy3i9XsUkZBSwBL94oWzOPtvF+7RP0AW3S3uNQBlZplxwtM6Nh9B9owXcVhFGvhgp5pKVthpzkmzotHfjLQnknoiBrUTMbnDpoM4WMDt4EuE9r8on9zjK1v06rdqwJQ9cVN70TYWbL0W00n8kLmL/IVTY0TtPKNOYuKzQyZcpSNhMSUx/el7y6fk2oUJiYgBwDZlpSI6Ka6RKQ65lK1mIW6vT/EQM1VHalGN09OV5IQJfJS/uIt3nW4dZ+uK1d3BhORW5YVVPEqacz09LxwstQwwVZgH8LX8YG2+8HoX0XSNcwO+TlXia8+8DJwMLl1TshRHTRkkeeXHcMMlWrDNjw4viu7ePJPXcmJW/PvtcVngoGlZWXFc9/Bq0eskdvY9pPPi2iTuM8mIWOuhdLXfc9UeOO/P0JWHHDUXLzObdnmnyVAFi3nRjnDdyhqFWyb+L79zJ8qAn7QmWwhHzrP9SaymSCUNMP/Bgtz/Q/+MmLYQM4rHEFU5gAcHygeJYDn1hbc2wBW1kpuAYR++Ukeya68G6Zh6JPsnOcZDvsgETxUsxA++gdEl/qrbDdtQxoQpcg/3RbQ7i811D9sZyYYOIyOkr9ZyisfGU/RRdctlz7ZNqJrm1qnbCNXW4bqEMAaGO0rRQ/vRC5WOXG9cImohmNYqW8pY8fZV7orf/nkKha5i1IHFZnMlM7Q3V0xZmHhH/T1lp0ZPCp9msxlcXLKvr/4+S11QxXsOV7SlnzDZ68ddINCShBp7iAy7LAygN74om196em8qw5INNHLbCWBCIp1+gHfIgS4dN2b3oAl168dHqFhD4MD4g1FAevBmtA4MupcQieLsSHAwCah0ljozEjT7ouy6IhYjY+ilBWnMV2jwDJxSDDNJ1v6D8plFZbkMSZ0HxPB09XQqVZvfrIlwqdDo45X6lF8/WZHYMLEdvgi14qH0jO63F3LYKWj7fs1NjJIr0TdbF/48JX24WSmyuH5BH3nTUGoiPHwJFFC6kHx+8BwxsmX1DQBKSVdWgr4flFoLqxMBdPRZD+DNoX6co0nDESbO4Y93ImRSmVQTnXO7DWnpNtuEnclM/Rxfjt2WczbGVQISRFFgiz5Ct2vD+mY+sD9nN1bH6q1XNHebXlrHk7bqdm+edni3MexjMEdvft3axS9pcE8V3VgY1FuuyZ1O+lTM/GCZUMLALVBGxxJi0SMzo7jycYK5CLg/NBrMPzzlqwcvS5hzIdwwkVLnieEbG+gf7CXFDBfIdon0SdP3U6xZ7nIqLBMSoqANmBkzjAwx5uhrtavsw5q6z0CyWBMDMPSrrUkVlg+G175/BE+vD8l9xH9jtpkFFrOhWCgLIM0oPbcGSvgUF/p7bIYWD2bh/nK28zllFvwlJb6abBy1eeUWN9z+XuFr4kyCpa9WdksMj5jWYJcUS9so/WOx/KfMB7wgrkwhmZW/gkcbF3cfOTO9h0DRmGTqr9LkGgaMRA7QCG7HNkZmvUN6/sntzFh2CMCLo0+qk9HCVlwH8wei6b/jQja9BiAGlrGEbf9nxS0KVU6lMNfj3PW8ePJaDy3fUsJ9pbsO3/+g6k62cwOj+xAA56sCdoopLz1rz0IrlPVzeBlS+QNJovGZN8uxxosaQQtw6CAjGfSytKfOgFfY7PPmI1ngtqJBp2PROZmt9Lg5pfbMD7vSUXjuxJlspzSbkfDd2zRx+UEqxpgDn5FE2N8Gb0E5ed86QuMKdZsx0mrzKkUcpgMYW1oh+I0lLGk7g+ZS5oMWUrj9YoKa+RVv7EjMsLwsw/3NdIDZGBQeBN7PzhhKNsAOFBh4F5lJf1zYtRBD76SXbtfBP2LL8t8bh4fKrQE2LzCDee/qo5ZkcEYYCB7t8qhlZ4XqBivQ6cwEsPxWkwvusTnvVSrxXrUCKfLVEgZpym5zGIwP2wsCx9HtVgSoxPeu28Z801UcpCGutVdnKb6FdR64FAK96idzh1TUPveibloNc1UOcy2XyRyAXiiyfTjmOgPqwq91cEmmeZoIyEb4xLFgur8+FNWL9ejIRLGNSq/Q+Jg/V+nAkX3RAxQR1bKgIPrEJ2PkpGOOHJNmor+pwcNgz6pzXqlguuTNMnKnOecHWTtJq0NIM7QEEH0HGRA7rspek3Toio7c8Gzcd6Ed//F4/HU1AFTfn4+wrvnfOMDKaPaZQtt7eYNHRzqwJqzr/v9m1w9yNUxmiAGGKcXYY/1qZvZTBVS5AMA4PtC19g1eQuuUKv6dlyL3Mc2Tudt7Y6eXbz2FWzU0dgiWpTwqv2Y85M+Agc1pDBrC5ecChwgtpO8vBl59Cq+sW4flqpUCpIESeVNxAxN4K0JQbN7IQtf+1viXWe8bXSODScj1GU6vDW6sRIWI81n0DUJX4q7tifcbej+Lne27P3p/Rp0+TVo7BepDOkGLNThJbVGWeQuUVDBFqku6xJ7GF/eB5WFefxfY5GH0vqkPQvdhVc29hnpa8YYtQKfPhL15jsrapS85dGgUaarAYtWkVbj+A3ii6Tw3MSRLSllXSy8/8djSSEtkB0bTyd73KK0SvbHXvhG+matcCqM+DdcdtpR9+PVBgbMlFhunfQdj0Xd5nmSHzDPQ7Cy6ZXON11wEPEkDfvN4lLu0nwGcsKyY9I3Y5UOoWLglNF7Aj6vhdZ/LSBauhuRWUQhwHnuYXk889WOAe1kMbbgWDgRKf24tLuVi0tkwanktovLyPiuDbNjDuOdyKKQm7mbpg68Vywuz7U/UNIwn3JT9RQ0OJJdNntwTGX4d8b8XKWIz98TxYtWerdIdaxtsGknWzYwlGvWQ6uFQwKCvH70Yvx7HJb9tfJV1e8lSJofGUzRpxVFw/0lTWLku/wwNx4/oqFu6oMdsbEWm+b1b/Z8foKO3dk2xkbDMHoN/fNGn+R1v5w+ZTyuWTS31gdUSafdNfrLLqNKpLT1/us8FzwJMxxVuvboZjln4wVXitp2xdPIXxwmAyFq2DwI9NSssgmPQpVfox6zV3niCMrR5Mx0iUC3OfAaZ3wb55Ygpazsg+860BuQMO65rE/WNKWaNPIMQFvG9/IYUmvh6XTV3cyklkFrKi+LbWkJDAtFgwDXSDp/igRvNR5qLEvqUVPr6eYRYmXkVh45Wfk0wA7b7JgKfpmLoN2ZOk1oCQGauk7hCVUv99baZRLFsJ4vARSHI6ZIJipF6+CZHsrU+WUBsyQSg59UY1OyxwksGZZwOWIO2lql+A/syJWKXT1fTXthn9m3b6BNKGww1x7gUTzyd6hphWGJVrq4Dn14g0F/5n0Q4tTIv9xQ1W0ryV8ZL7Dx3+DoACir+GVF3TDXfDd78+mU7SQdGQjYnRA7MI8Qo/1PGhyYFKAfti7f8nnxoNXsVpYoLtu+zIgeTExl160AqLuNYejaMh/sMv6yCfEYyoGGJ1BE/BNp2pHb/Skt1My0O/nl+SiRZIQkqWofiTK4gkj225KwTmuX0kYq/axbI5yL8Kun5CkLAewTtYqn0Xp12hzgA5SfduMH1cx+j7dQK9HD2V+QIXvaLzGK194WP4oD0BTFUwzd8FtLedEmCbalEXyw1xeNxux70N4nl4kWh+hGdWoazJ8R007qEwoJXiwEgtILpLdyenX3fPNzpe5nrp9qmHQOg3oP4WW0Dk2qGKcDnYTji2I8Tn6+MFv9Glq9H7GqmE23xqDmZyqebi3fu92vRlYb8aTDjWeRWuH/bVCQkiaQUlVAig9kQ6/9VodK/I3ZZdTZ8cOcl7PEef2hzGPyxIClYNQ1dRnxWpSkrh9JA07+wKSTVW26UAFj52aAVNS2M2VpfB9ZyDb5XkGXPlb12os450hrWXOEgZyQuMheTYz7yyrJyIpUesbY2G9QVuh6yHqdcsCD7j3PZGvBtr9Vkys1kfCuK0c2FNCx4x3Pp0YFeHUEMyt/ZaVwwe2sVQ6pq/ScdH7eriYzdwAiRdxON22k0xxhcZpUlX00XeG+n4gGoVwLZ08InnQd+cgrzFHa1tgJ9MySDvQPknz/1DfRgvr8Hqkw+EQk8aS4eDaN0s2uFwD+f1WvBY1EC1qankTSqrgJ57ZJg9bh++t5VD2atgA67EOS5vLUoeI7AFN1KS3vv9SiZ9eJVD1uWJYGjgUzTV5lk+iHIK5R5pvU2L8BU6ThYluABm8AMwQJ8OU1CXuooFq/MEysu14Md6iPuBuhFs2Ar7x8J1uj8rVsJHkLDWgLp86Lg9MXytoZ8TkcbA7Eu9ZO2CNig8R+AMtpX4XW+QKbyKgIDCn9VNvexlB3zxNN7C8v0Ra9ovkO1igU+N/vdJEnO+9k66XqJl0ibAr2I9hDbTaPJkDvAYkv7YK4EFGc16ryUgdUucJT+P6+ZVFEP4joeu7G/4FsmbxIXyj6ZC2rK2gS6pwhzIoNHay5q9+yoQMReSiPGCUHxk/NMJG0tt8HyJ75WLUbdUGD4cTH9u3Tzm4M73hyHuIlEtn35FaxT36qqk1sPCAXHu0ozQDx2gAVIuU7xQ+hnq122oKv/9WMIXbbZKf5A4txREJLRyrNLMcc/k/88C0C1w5V0Ya85VwmZfUCPLLWN76TnDgL0xXwfZPZy8vg/c9yjxtTkoigOdR+S0oWzv53xQU9t0qD/vrE4e1mdiQyJafXUNrjo7yMGdk6vI/2Y5gs9+KTtymrOuk9O2tf2nKB7zsCrVzH7i1xqAUELE5b66nbF9jWj5je9/eD68Z5N8jZhjWaatZzhxFwlc0XZkKOeBGe+quj4523vy/kkhLdWvqHOogucEzHWO0yzaXHQ227AueckWVmhdXO8+/oUW+ujO56xokICAokwLhQhKHj7a46m2QOsPekDdaMgihBlHCd64MXlBZYY6OtaeQQXnhC7ET3lxxpXtynmIbcuDlOLDwOxh/KjWSllapg6sG8E8ZipSUoFoGUZzoD4n50liL7CLqG0MOSsRe+3Tmuaw+5BQVeaffwFYzqCK71wT3cwVcVOMWdy44IolKRFwUJEo/NRl4GFDlct3DfBuQ/i+cGQgA4SbgzUV0KMA3Dm+v+rc1uVbOqcqJreM/CjRjTzo0P8FwlaSfITuU8hZFEuV0bxme/ErNC/U+29mxNpJt3ZhAZgsFFcPkMTaBJqlxWtidzKBMn6zVuHFzA3awzCc8akccpPhfJZCpH8QkP3G9jn6wQ7Sf0hQyyCI5GPfV/jPj0iDMV1FAKKgnVCRY7fO4mc96tY1JiKP3UX29AlquYydEM0a02EPWkij2wslqxoolyiaAfkzsfszSS3ZEW6wud8ZTTz620V2g3pKzB3C6O/Yh7d1c1pEGwBX3YPBQE4ngCpnu4KpWra+CT98RWiMa8KuDO5o2bRzwz2qQxPL+NXsF9ruf87gTHTl0AlChPfg0mged7xEr5BvU01ZZy2Wo8gGblj3GhNZ+gVxxV+0M794qlJ7vMx4Y36gqY0J7dzzEppW/HOPlT7ooE/shQ/j7Nh+CUzxdJoo4rpoRVXKtzFvb2b6RkXJy7RRahEmQCud6Hj61K64c+HIhjhPcEfrEyDgvT1fEPLNh6aRw6zXUibnn+Ib1OQmyat1ipSzZs2004gXRfKmKg063NWP/9LyxMSmcmAdRLqzB0SpHLSgVdyAlQmQigbl9ZloPyDc5glRFZZ200dk6j4SfHPd2ICAw4o4dGvYecBkkkohQRcG8G8nvRFwV0QaGa5Z6/Ex+7yqDmtaZ5Kb8MFA9nII51xtSEGKr1jLU7tc4PLuNvbC8OhdCdDFpBMUQXG/g0Nu8jXBVd/hUJQiVGeSmaOBN7Bo4Iaf8l+6wakcTbPEKYfAlL7sbytDV4OXNHaxzPBLQweApN696sPnwNciqqejVBK0shZJIz3Z3Vlb5JsbgBZISYeVI1iv0Xi9lfBZqV+pHQDVKphs/hMCBGf/oztqO/9D+IqjxmGAAggwnQODyyPyIsLSwKiBhMgoF8P+dMTMvptuE6N8X+RHv1oP8tpcmnBWqfyENwd97qf3DURBB5d7+YFsSrlx4PaZ9CJETMORpaf2zuC2eTaOGCkyL6SxPDejcJI74/J5roz4LxPhCj1CYfWyY2YO2KhQC9UxhWcePZmAKx9Nm3aWZ8IeRO7haZxWb5q1yDIVlFjs8Ri/oT/Nh11wS9fXpPDW8RaZZ6epmJxUxM3ZUMn5RVwNb/Urv/GD69gP/myM65ZgzLVtkVYE48VzwFhNhp4tRNmDXdfDiy5ksnG3/spX/ru7IJQMlzpVadevrB6ooekymkUWZsNQ6wuDDT1MasI9DaZ9j+cnoycsGPGnXZvkErte5WNW98JxsOddNBl4h9Bs/gKusl1Puaj9tnCHZdSlFFkp5BGa4TG7UPSxj7IRWsFmcdBNPgygZQGHPC/8D8nWUCqAI+rF8NPwatsRuIzIB67HeVdNHijFBvnDQNXKoO6UAKxV7BFP/T3wtcm+SERWEQkmSuQIjX0Hgs5Wq7Ak0DOybi4NeRBVul4Q5I0RDyDueQCDRO8c6yWC/egRQl869gdHSHXZieOaM2FYgqgtm7hYliuf24ASQ9yU6nI1rdn/qw1nJaSgzQgyHmxjQSnmtad3BfLFn0vipgGmGWmcS+nqgWuq5RiglT+RnxRqBWbQB5aUSArIQZ/MJ+O6Wvq9Ap2YdMPHioX9OjUelRUINon/wyeVyi+d3w/7zIfbfu19JeMrfM5GC9QUNKorTg2bj/M6SeE/54wZrTtXLomrqoOFwfMm0fy7OAwYFEWwAkKEL6IQjDs6vxP/GqcV3rjnPXzyImncY14/xa8Bwj9miOukNeoL6fPYVF0H8kGKdiWy+EChkzdhX/JOMvxdQAwfTIPARFQG5uZMnkgU3qQ/n75db7qoSjFysaip7lPnhmAbQ/5L2+pxDinYkUM3PTME0zTYxXaINYcqpPz27rlCnLZN4RsApuLJUFN5TBu2XI6ZAQdMlPZURMqh5/sIHaEhPn8dOmpAM9XBc2nG6F42uDE0ORH5TTPozEuX9NUCCvSPIqhZ8syk70xKTyNhdu0yX26OgJwm0JcRfYJTNWKolapFob3IqSenR9tdJfCZvGuV88yMv7inuVdE/+SZayrAGsJfozwmXik4A43CwGYN7XcsZTFnqJNB1//Bok6YFYW+F0WOauJAJQ3fGY+t3KCL6xnDtc898OAZcX5Iprt02qUGuW9PRS8hi5jd1tJHhV6BsjFAHoGpreGiZyrhBvGmT1zKodqE10thDcy+Rr+mnWaVNiqEGG8QJ3otcaQLVDOq+Rcyg0pHNslOBa9MgLOBYRE8miVPu1wBJsglNW+/JZ9gkJyfxWBerOqFK7EPxYThaQP4VSJWCFicgXujDvH3M90IbWx7s/53ixd55Dv3+PVO3S4OUgAUszoQiGlKTtOsCrsGKDIxFzcYwUabGD4rxqwMxUf2zAC4Az9D8X5Z3TnsZ+ad6oHLw66/AjW+ZhWs9YyyP3KauvRQ+i4gZpYMOJnTr/B3pQD6KYqvBOJr8H6slqpnx42ht4J1pn3Q2669FnoVDcKjfk2pnv0yxx9c8RdB87mGIsh4whK0tppTniScEO7E957qbKLGL4Ax8/xcBqVfBuTDZ0R5+VdvNg+56ltzUwYuA7+i41ZPi3rUpNcgAD9HxKm1NVr/ALvq93JlXPzq1TsBtXFSDiXiWa2ZI1JDgvZCGfA2nhpTtTejhHFi7tAOSr6GRGc1Ymz16VV7qh2I3ud4sG6fF0j6bYgwjU0I/kbdf+5bA7YCzeI4ZIdEmMQXO5ZygcAQpkag6uwxP0SeCZg7ZXAsOTT47tptluGLsWH8nZUJFhsjAOGZaCMnOwuw4sv5pJN4izrY42JklfDJ2xh/3WGeYJR2CTwRjUfkPbmrJUD4T6UevMNZGRzenmx0eVEHhJlSvfdeZAD1JXxQmRjsP6r/RF4azuTMp1RZUvCIr3W6Ty30YKCTWKoPFRpdp9GOyOyGEhxYwH5w6ArVya+4jl9qbsbWpBn5aSMsYHo64JPzN8VzGfSs0R2OWBM+7GlurD5jAfgV6zZkO7877iPKz+bicW6A080rFr3N4u75tp1XAs8xcd+0kLX1u8ROnuO6a9rAsXndj7chfq0tdYxuvvcMg5OAqaw8uguYfvh9RlXiqZyySdhU8pVF5Z95GVt5IblV4cWnOHORYWFmy31Y3eS8vL1Ijmu5X0ec/T1f9osBsluUY714tYwlUf3AYUD3HIuIJbHoZAExWvxASN2RkSJVYWqfG3EjOmNwRqVv3zFKpNiZpS1PVbswd18RW4VFqhanV1j54TPDGQpdFxkHEJxn9AqyGIYWcCc+5NMcwPrmiE79n70TpKvZ93SXHYYtOv4IT+abC1D1iD6UAYJHV2m6ig6TDu0f09wRr6Q+hS6vrQWlIfOs0KYwqiZjmonhVPa3NTdU6kSDxnT6lme6+fa/dccsIRPmONJ4Oh2WwJlix/eJUqaLj47i8pYoRdfjrH30hfDb3CqMPCC12jYP53ZQNFmBlRgs3afvHpw/lKHl9YEl2mdhlEVPEPGG8oJtG6sEnJCHmOmbLrkm12BKuo9semUNj7lwRXQ7patmZ6o9SyTAhjV6sZWm7VWqkQOyFKUeeQheuJVQMzPLU4k/ifd8vX36Hzj5dPjemdHp2Nz0v9qBNmQtB7NsvN4jF/6bUEgWYyT/egvbiAH8nxG9P78ZtLqJ4vM5qVGxVNBI3uQcJVFZd8QSykiS1JGk1CVFK10XsUqm1MIYATYBdgk8Rw5s2JLa7T467pHGh6ZPvbBIWNBF4SRIhGotI6hpJBmbxxdKzJm//aQq5fViXW5zpLplnBaGuYvvQfXKa03RwBitAE5bN5+7AEq4mvomZv9mGEoPEXHEN/mtCrcmNrPRpEiUhl60gIq8TWrQw8mpLGSV329F5SYRieFnldAA7bRf135P9KtiabW6TmLFar/pZxiRC2rr5jbRsOiN9Cg1tL/XEFzhMaKRngqruvYg+ZP2KypFP8c/XfVOc+uCsPMrZHvfjpTU8K8lWKWGlttlKJODw7NP/aC5ZK79B0Iwr0Sk3fgTGLiSVlYG+A7sVMcb2Yh4uumbRBPNZwibApWlJ2z8Zv0MJ8baAsLbNuiwDLH5VTsBYLMFoom2pjq2KHj8v124cyfmipqf6VNH7zUavSO12vxRyxVs7ZKq6oM1oWthkg1XAeHItgcd9SBONkB49VAS58LgihdcQ3OInj8yiEqriOelnah3h6vBfSlZI9WFxJ6yyiV9SonetVUrXrN/jBPPIK0rT7GrRQF2K870rP5rNXc7angaHbAkCnnp3FghAAbxopOZAu2cmPJqGDyZ2jWnQrHfPDpmjRrvKpkgdV5KrCdJakodeVq6/KlloOyJrCy/KfF3YlHStq6tkFcGVrDOSsobGy8yQxITA3uvNF+FJJdBONRyILtf2RP32VYo5nbPOw9sGQPGLamzjllsTiCodZ/mwlaMRa5wbHxDHcdssa9+Ozpx8fTTaGTxkwv+R1YU07dN0J3G0Kds1iTyza5w4RbygPjtQXmpvFU+/IFlTcGQBPxU+CL6w5pHNR3nB6XbA6q3bGEkVxSL6sZAE+1+Dsnvoq1thlkdkPT1BE09IqAkmtCoH4FOfx/km/SkP6ohSnFf0BeTQb/Rum9ebNr0pFtjRdCydA7/6KFLyHGZx35NbsReskNCh1RQOmN1W3v85vtX6Q2YQAv+F+5XBDjHA+KVv9JYzclq+jT6bfeZWHWC5I1EUNkUzF+VklydBbEIE/xPHQ7fSZhKRN8qwu5lK1GdjDwRyU6X1TYcZ3qZMr5Hq0iCJAtR85XDz/LyCZWlydkohzVyaFhIslOVXDpkFnsfWgtljapIWuVhhovpiDLbO3VM8i18Y1HnSJ5IOxPlZimKx3cuHOpmWPwoym46kRLhS0vn5jQ2JpII9EAOpA8A/sQfdARgZJYintlPQNKRN9Zdx/+lLHotr1T/OJBeoVEE+TgoqlAhbJZl8QAQHq/VBf/ieWziJzOG43TONkgh870Ov9EXG/IYChlJfaIQa5sZseHgwmGcFHaouCkS2dNNkABOZHAB5v6PxJhioFkWpSnWZmpgtj4XGWUoodq7LD/HbIQBW0/KvnAgoDyVyUZigYMVmpYVIp0n8zJqoYvD1ccrlsF5nARYOf9U+4862X02MTR/2hV1ZdGvuAMc27aplYJyc4zkB0x3Lw6wqIlmszSQqdVsaRy0o4QJwSnqPzWDnBAb0ielioLvdlQmWeiKj4ztoOYtstG5093PRvvDuRRMx8EpevyqWrVQTBqJVIgQB4Px0BbRH3YviT/WHLhzfmdcSszncDOlBhf/LR9XuFUcYPry9GrDsao1ZK7jYFaDAyqHf6s2AnStGCVpKEFryJhYvQc9kyiF5sKlCkGeOvM6+pK5grFVz0gA/sInJaX733LAqzmxlvxNior5wkOoc6XUD7h1Umgk58Le5NrRcJQ30wIqQigqAaZEd2ppi/Kw6XuMuxwTIKOc17Fj/bUtx8ITC2WfnzeTtLxfRvkxmb8Mz4kXFKMqLww3Tywvrgh65IHrVLk/TZ/QNYtCXHDhzJarP8EeXp8nIjIO7kvUij0iXsa4SqOKVLEtI8NDEh3cd77x/4KhYqh+XeCvtdxCvkUuliSxZ1X0JPYigWJYo+Gicb3JpFqs9Uaw/FiFX1yY5dOveGi7fIyOEWJCHtaCtFe5u2hWt8t4ug60PBeYQgrKhTPcSbtNsvg+iGDCUGvMCoOReqa80CFjJFRRjMP1CTQvNeTvrs9pjtq2zEpEEaOLgLpa39WUhmLCNs+q89gLgD+RkHFkYGqApavTYqAs/CMritD6QtgWd3xdYcG5ZfOnbitvXbocHayAI8URQ8bGTMc3m4BCp7fipeArYQiOIyDRYh3gi6W0vdiwl0bn8eCNBSh1SFyh0dCTCHmDtPnlxQjnA3EPSuDMgaO7e+pYWql51nTiOTb1P95bkG3TRnjX65eghcvgskCe/AVJuMVjSpbb++K+VzfopAk2Zr/zyqai4LFcZOJL4ZlghiQ2msa65AlADFr0ikuEw7GtzyKdHFrWsMlXEnzJ/ewT7dOLipsabe0t4vNB9nBxVHKqvdAneW5d75x7vNPqgsUwHAT4Yn0xmmIHzeWQO/SSZqFGCHLxaA3RMexSrggETOOliD9G63Z2xaCkViWVF5+9olaeEr2WnWLWRFBEfBjOLWFVSU1FC/tCrP01ET71YOfpUaxPbbwau8xiaYijtl8NmJEc/UDEVvPH7fhVjEROWExjKPwypmBuxBP0pO52BIXPHSt0nfZNplBwfNLS/TSXG2V/hidc3BUNx7UQwRO+2BbTLPaZb+/qAklbsC4JazitxQvOV+I/h+f48wHuCt7ycFSQX3GqRM7QAl5Fq3qyUSZPGzD7IvcHjkPNHYL3Y2GG5e5GV3M8Tcv6dtMoBnRTvNk/iCG7sfuqz133LsAh2Xftf7kPLUlrhHl9lzJtOhfrY2bpKYVMQ03tApmwywSYf14n7KQYYHMtPQFdHI81DuGwdd9gkUex0vcU9NlKSbS1gfWgBMUH0ZhepKVXSzuSUqJSQcvExWQarzhaC6xgOge9ijkoa5B8Tk6fhT7FQk6oZflz59Vp/lHmxzchZe+ss0mXUoK/N8wN/H/JU5bwkE6eoHYNNyuxv7uMd/mld0wDmPKpdaW9+wwXaLOIaA9rjGtlfFc86V/MZV2s7iJkhWcyTsCH6Zm3V/pQCjjYn2g+mwIzO98yr1O0jCj3FFiioQuTV9pHryeZo0P5Qd8PJR5Hh8UeKrtJveLLWB0CyHWc7DeBcKc5qrZ3gwxini9jslbCyT1xCIIQLxXbh+Mu8HzpxqXQxeLCNU85r3tc0J397eK43z8TJQlMxY9z3ilMbUvsxhFNd4YhCB4mZVM7QQur8KlmNFYOj+WimvYn5wNm3yL5FdTc4WRsAKufsBOTrkH6e3yKaLyuktWVpN5wN+9eZ9lzuV6y8iS3yZHGP0HXxsivb2xAMn3tIR6YyN4z157qY7pgDNq5s/H41sc15WrmpozCmDzpTFxSqd+Kymm3VwSAkfbTITJj5b4nQ+MZR3t7VJVDjU7GdPefLQ8P2rwbxgixO1yIDwSv74RFVr1V574sjBD/uwURaTljer3/G/nScuskJzVluJ9hLCM0gc8GOj6COh2QWOMguoHsbYHPdPaVb7kFyCR0iMArbDeCrrPGSrZji3HUEZMVOQgAC3xGqw11qAP0ioc/5tO8+++EfrQ/r8bl3XTA/NqlNZoHqXhjVCsjAsQHFntDFI8yL3Rq055qgypdtiqLOR7ml+evtLLlRd0wnhYA4FGZ8IsrYZTO2wV1a2E1MgqvAx4nicdpZ3tNsWCPB/tKXJOV425aN3yJZU7q4rt0eCOhjqsPERx8ov23M4RJUeN8K1aO13K8lH62+Z/ZVLkyNLKGfk4N544Mshm40a4xy16F1f3aqeAf5ckouwxnuskxZEdyV230STgrfEtBBKjNvIN/BPJCOLeTjJGosIP1iRq7UZ1TWCxJo5yKWawHBg84fh3IDEFFWY+KEcX2QT42DrlDSr0guvuU1WAVA4L5XgxeM0n/sAeidD2gUPqVJoZ756l6OeTktz7uxPz8sO8U81KdMTDElamrqjXXi6ID/9sq6L4XJ9Lq/qawWarGLhO2C/1oRcjg4t2aOEuw0uVV2zUlW4Z+MGa2qodb0VGjTe5GsE/115pNGNGiWCfs7CBTnkFuSjQMawxEIZztyW2E+HzvOYXTgVeBwyAvlwEbfJW0EAR3+rwu+kvdL8M8y3sBtWPfQUE1ecn+2L5uWFVWUvhNjpTi6yotEoTVawGGUII5FzH8NARSp2lHrS5v2100nopn/12W/Wx8+oFj+BP5msNOEC0Y6WEYXex43ikHkFi26DPXEOhbthx54/K4UnTShXCiaysCLIFp9qOG0Hd3E/0+E8ZIIm1mJlpilEl6sbqgvGOofUZOF7vVywS+lX9ra2tRWcWxDHO62upVhUMmEwdnvfSu68Dzt9OYKmTWqZuuqDV+HgC8cfkSFoVKMemiwcnHKtvUS7jDvOQoRonSoSYUHmAavXqaeWUdIcF1vi31Y3EyuRaZQLCx/eFfdqbG9GXN6JdpMnr4oe+2xHQ/03PTh68ciTwNpq1IhRnTNxGYHGloqo/VKilJLPTjwymqJ+j3GzZySN/SUWo2Sp+tD0DZuDa5cTeX8NneiwQU7mIeocMxvQNy6Qh8q1CsqxaGyXEu0QEKf8p86OBMKRtN8xYOiw+EtyMoe+OoNxms0ua4ns6Z0gfSRvgOwN2jPzwjW5TpQ0y6o4fMiRG8lc3X2zLg4eUrdI/DYWOMu7YCtU5SQnteVJ5cfvwlPUkKw/Xo6Ay8tL6GipuZSj5q1jihJmfEmqwbNhlsHwgmFBCA6OT+NAuuBAewT2MiICJmmdz2wieyknNjSUUl8FxeQ2FZo0p2hUa8KrAzIT/xFG/OryvHCd5Ix8tnXCzNxhX1w6M3s0M6x5iWJ82sAw6/40CtJuE2wM9KEHv+KZlar5HuXPqjKRGa75VIpO28nLZcvh1OkYurwXYgwCntiXAnSXQsqQ5ri6x+rhtCo5LLIQjUdTa3Xh0rWa1EPab5UsRvFMfL/iOK43kBb1psin27d1rIyY0oGRHQMcHzuEHjjFDQ1BNkopOmOBlgcIRUvN/3PTP6bKR80N/DgKkqsF0D/UdeJgPy2dsFOcY82HM1Bs00SqVrEF2yAOIhxqhZDWeNERG2n04W323tOE8goN+Tkl7Dout+iezYwZoTrI1JOBNEvcgMD4wdB17kvK7uYWRtF9m4ix81fuIXa4Y9leU8uftxqiHEXy5AMzUbwenh9tZuA/KPsvi7oH/Vc7J8aI1C8yg61FrOpPXY0/4nwKdndUf+TWEqBWg7t+AS78cnP/tFB+Ap+4v3XphJVcEuORZ69TZOOuzro9MRDGA7NTrs8DIRgVfKBViA/7fUxCRmA8ot/zPH+opQuJoUJd95zouEQRpIW8wnIHOZFpQkbVAxLXWQspXKh3xXruOAgEg9w5k9AdRTn9Ng4GhD7Q5YHouAQdlde/mrVZ6fJIthoG76w/PCSLnXvDwlCezK36RT70zYdPPrrH3Q9Zn7xBmUfUcwD/zvRXKryJMl6A+asU+ZrPA2T3WNWbAZrIfh5dUwq6QCQ6IpXvZgJpLkCGL4w4fmST+s7YCM53UB4ddufvQOseDE0TYrZI28D8qD+C/7R2JMpw9mNotL+vfsk8fWau2qfc31FFZD1qKu0fYHE/8ckWvhpjS+92mRCu3MY+MyFKE1oLDEIZmwzPenC7RB63rPHDyURorNCE9V/W/iOyPL019bkqElABYAXofU/tZG/33NGWc3KMRYILbXTZFBJCRYHPqH7U1U3UN4KyGnKa8c/3mrEYdGCIw6ibIVXT7tVtxe0TjY7O0xy6R5Tv69UaKio5e8RqcaLXl8kG7PncGanc7HXdbtj57g5QnJ86WIvB72NgBAFO/X1kAjZCLGnXsywWWVjasKI0zfVdRHK2clhOg2Yh7ad7NcYl19Kxyvu7RgXXK845HUAw9JkJSxN8edKDonKJNv3Bc/4r8eteAwAhpb23gq6EbKJR1jO0kXAbQm264aoy0HfGuZbqMY6Z4OAGmpq//i1WBh0uEuzwhS36/TOfBOwmTqWFxdPGdxNhUi4//0Sa3KDrdfez1GXD44dVUHJ+cfrUunWZb+ZlHHHHQnihgroJY/P6eT99Sou+w+JcZ2nqFnf6blS1EU/+v0kuDPKD/zCApQ4q4YZ9dfSswkAN65SUKc9sX/cW9ryh7J4hCNkkHUFWDhvFH2A2bRIzBmTobV42XoomYCTdphIu15gmY4m0ujAKiGShXFT//QaFuoNZGWpbp/4gV+CcSnTqKULLs/VHzaFrYXr7x9K9haSm7CxxaDbphUNRykub3ED4HhAJbI7dppvFwRqLdCglUATZD8THv4W32XT7414c95HOjbDIi4l+B+C0nXPsslQaZk7kiRlXU7LnREIA49A6OlrFbskyxaQ/9FDgAgLMIkDps3bIKHt1obOrnNWDQaqzTXnOXLWWmPu/W+CAxeIKoXEKVdipQ053I2ronKcpuolHa1mTPW5rbEJBedWhIG+hdxC8GMv3i/JPCLsg+IIm3OTc1umTEgrLCIVm/+mRHGkN7CTm4hFK2zOWU7v6+cVunuwQKum9d2uO1OzrlW1bSmh55fOd29R78WGGb17/XhXbf2moWPoqHDtyQP016Pcplrrzach6/i9rwc2QB1ax4QCtmY7bW8v+NiN63KOcl64LsReYT0yOBcBLSeX30JT52/YsxdY/fayfj97+yBf7GVpZLfeYDdGI3mDINXEixJwLy8GzOQU/GxLJaCVMtTPVdPmQWUgOGWKFyRWWtbvDVejntNA5NGnNmmscO+sD2pJdNqZJ7ztAfuRh/r0oSVXA9HNSgFeIQfoCJWcjTdHc5J/+XNNHYs4CA5jrZw764g2visrkAmhoRJGYBQ+jiv9IOj1c+f777fuA+m2z6mOJYLwxYoQ99iQR7YhI6giHN8ar8WHbugp9IW9ni0shzasD9rAb8kR9E77Z8WiOv3DD1vE27EsjzxHQVeN/XwDYxG4DhGtMIOmwIuRpddjM62vJc5X56PjKfmNZ9s5nCjXTZ4qxJIwdW0pe3qE2WAdasSb3oGu5C+qraMoCHq5Cdzcg01HMDZB1cxoPyi2MI1mBxsV/8FC6rQRYezhFFMIG41cp6AfZ4WnJpj4UNXlu8fz2F+TscssprmyRE7qevcKtUGx0pPbZ4EfIb5uOBXPe487y2eLctjH5pmPMY4zyUlbdjCWMNdQnNG2xxNQ36Q8qNUrMS7IiMBtM+7fB92uKDDKjxmyPXj4rwsS7PNkuxb0lnCXH9tQxPJ9xPrsHc6l1/GYy1RjTQ9kSinajeXAJIPKjk9PTHGwHOyvuk+9Wu8mUQSsKU/zWT0a/s83EXADkCau47Tky42f55yOMfYPWN+bX8qjTT55VMXbpfTcn3FZri79gMIGqdWm0Hy/qwCjymkRMdtA1Fq8+nqNHDSHCRLjbME9aNjsyINbQCGBnf9h2ZzkMCRKrAY70GVsb3dHc7i61+8afDjlqk9qeCY1CjtVGl155LfqQkqtOK+NqYqQ7lo5ZQYaPAncSt4NdY4hyl47XjAe1vFALxDcBNYTjZAe07l7R8yLZ9sVM3WiJ1aUWu9zLLr6H5AfDIVHYMv1vBEbjux9Ye3a2FVdYyQVLfyFVZFwO2pzk3x9shFyE1UcJONSaknvQBVeFBpC5SfM0mUBKAxLESLBu/hs92wUxf+/1A9Q/3dDq034b2GT3RBhvpYz0uzV94B/O5RWI9Q2ql7YfT+1qFkrRjqv0+mH7evn1KB3E04j9HxjvkkmjBBq67a3rhYbvmNhL1sPhv1ythWoK08vvB3chQFwtNFhmSDC5yrT5yzzCIy4VGLsnMUuH/HfbYQv0fekdaDdu2WZmz3tBXWVfOpV4LonwvHobqL/wIx/RC8dCT7iup1rYE1RUJscHOE5+UmPqa+jqq+4I/x1tNdURv+dnIMT7NixfMTvw6bt4eppjg6TrZUwjtTS7UV++B9Uru5p2E7J+NZZAZmTvd+V5sNGljeIVDRCiqFwmQtbWrrwbC1NVTn2d70q18Y9sSSqbG/Cyiqw0kZl3mIXgstTn4cyujlIIUaoTmnJVXG9a9U3t2IrX9QEK6Ri2YRSb/c1WhaVm8eclf+m3ySX2fzRGpLfXWa47Myxxldt0G/FNngYWKGT/u9uI96U3jhbiOVjo4QUb/oNCVGb0v6JLDxSImpJawUb3Eb7iwPuKAdshilPWLiy3yJMqhfKmgEoioqXNi4bbuygBg6gVLtyUbuDSww4p071QPlGoE1FsGobHwl9uAMjoRPRfSfAbfkI3bYfWkpS1NgedpBQkjlrfEnEyum4ShBc4fyCh6iLxopAu2+7g5FTCFYFrVR9uyr4stfsdvd4K7uvw0wqZ3bx+q9bZ7aH6Pf6S4ApkJ71WwcBiYHxb7Q5ZH9tbv6+cei4CdMIF03mKXfdd+Al+3urGcz+iLAsfPnGA1ztfSdr4ENmn3CA2jhmjGzUjtigc35c9ZOsNK1uA6bSHv8VDV3qpNb+Ci6TL+poB2zV9QnACpJjPLfIt0a23yNCzI10Yqe765yLZIWZeiq0C6skG/YDJf9iL7cu+CYIMKl0gXXEJF71EIofbo+E3EvBhbgnaW6CQf8rDObaVKRu4ZNEgPkYtOk9RbBFpjTYeewpZa//usMvZn9tCUa9FGMLdKI4memhSg3oYq8e5ETQb+NlyumTMdgRIvmhtxNWNZ5Grx8ayrFRealmHLRDwAjXby/MPDf5XBmXTU145wXKzn+t4TU/F486y+rgu3KEjhUY6JpNhr1lZDXR9fTUGo7HhwJL4vG2I6I5Lt2UX4a8/M3XWKPsPHk75NmXzQUwtWBmXN+k6HLWrioSNftrz8CetIsb9F9ICbY1Q/lJx9ezaEVPNGCCqTQmgUO7+TNSNlaixFg7bgWOJdjGxwjYft+7zdMcB5qrlEHwxCqzUCZu0Wvcld06kxssJ4cPWcMQJz9fSu2bugX7fckiqABD6IOfqsZpRCybpdD7ZaQc9jS/04RJ7rnhbv5ORCrYfbkWMk1FjsogOeObZh4JXlfjabfo/2UweHdkTREg1vgyWNPzoUp0O5Z0R1mtnz7COuaAx5/Pds52glEhzwfAPPoeBNTKg6Nl+PxTWsnD++La5TyvEl2aCdsevyXpsNpFNjpViS/LGRCity73NF74A++t4aOl/oDXs1jPKNggt42SBX+THrjiZbDlk7sfIW5iD/xMSM2eXKdcp+aWYR+9iDmZ+H/zuxGWa42MxsFnt8jSypaUPFCcgohFMyyfizvS6Mxf5B64mg+l7dht5IDvqbS6Sv7oBgaDjsSXLccUkLW0BeSwEVVxIT3TDvFuFZzWlFeo+ceJz1PSHzZiptqJYoZwzv2QrOHuj4Kb0GbxJr2mL2reKDLgGMc5cyb6tdbFkjs4Bk3V2ZhNKaUSnz47xvarkHXREoM3HP2PKa4U0hlkRCUkNOOxkfsVbD9cC8TykHpEUbtLtPVUEPsfv3pgHwQ51K0iiy4LlvUIBig++E9B2tHX/xwkIIdhOL4Y4One4es6Ee4onK3Dwbp8HCfEeBoP7pUekcB7uQkqEs94tRtZyWROAGKdhDl6hSFBCyrMsIiY9/3iAH6lr1nIFqsL9uss0pWwSpZIVtaD3/TGhNuqIUlsvBafXTEJAEy3QcyZJ9sRA/zjm738cDpzkTtcvlA4Lb5nyBV5jOyxM3dtxqyzJovBASXhWGWW0b1g9sf6jjMSWUCnVK7CZBJzOx3CE7vZ1a2WS2uXWurd7nsLf1EWZTB3FgtDd3QYVYkN1ovA4D2dqAT/fdXySB7xspK/YJ/p+4O+qlEFA1SJ2Ds5/8CzNtfcycz/A3j5kPlZQ0qY1R5FE3PwBAWqkYB9hCRXFTZUcOM5SGTbWL3+01S9WmcZvGketvXH1tRXTjrd8WdFaRUlX2+uasXR/MiAjqnpTALUBUTDcNPa2NfrPvf2eVhIaXaUr+2IzzudKT0AceqjUgR+4gxeSkODH8vajD2+DONP9XHF9jv+HJbec/3G5GVuoh+ZS6W7E8ah/o1q9rZzbivvOPu80NIy0Ib7Mv5mf+Bwf/zZeuzpiPb/7f9DfdwD6Tf7XmhYz+Pz3darx4EiS3aQBC9C1MgTTAIziPxM8M5qBYBNKvVMqEXBHjnbRdCNeCZeOy8kXZfMpLUmWtuGLXVnM1i3Snsm/c7BtzL4Fl823tUAJqGUAhJ8Frq6fakIJ+0b+g/L1w63lO1YHJG/yPLAI1WeXeJi2uaABqA1Ju8q2x2NtL+Vob9LRa9hCuKXkzEdP8OlV7kpvLDFg6IJnE9idbKPcxsFLbfckekgCLlJa5ovm6xwPC1OKS9xj72wsxVGpvqHNeXtS6XbNT3/arSuQWQYOOMvWCXXceuXu80RpdNK0ZAIuQzQAWEYcuXhFgyfZrzqom1BwDdBpyF4NV4bfjGbcioEJDXFbbIFpEXMxgkafBM1GZCzYzYcLpQibSW2rgr74EOIgvjOoh3tc75+ZiyQNL7cyZY8qcbp3MWNc8SNKR8L+edQbzUC8PPYIwoQCHA8kvrUNDZ/47rC+UeBwBzdSugptk9wIFs0lLekCBlawQ2exu4oOAKLX6TEZy5JVEZKscXyUYfHvuijmG46SGTs748W2mkIjDHqRwkCUcB1z6X+MqvGcbMixa4rrTR5rqIBQL13wlxFmLMyyX6rC3Zqdndqb6wbts8D7twqx6w2nl9mk2G4yTHrd6H4N44Zl6g3MQcuHspQ7kjUhs8BLyFEsYLczivIpx20LULeNGxptRojV663o9qj7PLCFJMpnzTpgK+B0uLpAtzS/yolXiq3hbVjULvd9BAD/62s/hZofvcobwWvh77KE/pcvJfbJypsWEj8MtSpPR7HYZ21AQ0WyZqstjf8b7TXK1FPXKq95hCDt3s6Nh2Ibfnh/5npsrTaNlzXNhsnw8OjaXLPInLY8w4gs5e3igDeVQlVpK2BxHb0HmYCaeHUb5myQzz0fsTqjjYGGlQo8wQECIAlXhNcwdX8WmHVwzSihn40vFicBngFmuyd9DqyAILx+TzLf/dic883Rcrknd7aZmuR6lSIx3aVgouVXzQ/WGEZfMbE3iJgCoMHybI4OxwxFtTTSEWygXjMM+F/vTN2vrFpdixqpTykZILxoeOXF4TDUSfnjgzvo+75zMWCysW+TvnjU+JbqFshlkDgD7KA6YfgwqMVyRWkuyUfYKFx7wUd0x6oNWKc1I5OzYl35zYRSXOL8p9Kk4jLRmF9saEg2jqtfCLnvKIMRb3HZJWsv1zQ2U7hDOxctW5/EZAfLYOrVE0ECxQhrLxuRAHyBVW/sc1W9Vbr2Q0B6CHeeyvg7nI7Uq4m3db4fO1rQxG0vANLH8oGHnBI9GLgMt7B+sIiLH5q0tfWaxwaYwdqr7VC/NZW+gq+cA0HP4l2SXDqXnTV+Q9F4hJev9ga2Au+UBjF1DyNYL7hF382diddz1kfeytsJAjTGfP3SVVTz0GLKg7PU/F3bWT3hxeS4XZlAc4mN9cyd85WbL51Gg+PxqgZ0i8FoIYuY1jGyw20NM5BsipaubOWJ5UddCB9PUQpypH66FmgoFq/BsgYrIsFznXPugsXUmbVHaaOxvvhE7xU4tzk0X308JKPnmj6EfacjlSqs6HdhMPP4vfqrI9PPSgNFq/32FUNii+n/slTtLJrHasxtpSG1ZoqIC8qTic5RqAEEcvphi5Z3RMPGvmNd12ziAJNJG6LV+pWMp1pnqiDcvNYkP+aDGl8te2VyuMOxGCD4UMmnUQ0K9ZPeSaqdOPNGGiW022OtAzHEKaG2sT1CVoYpJOCnXTx54hjTBPz9EQE3UGeKZCwlyvSlyjfUY88dPiUgs/YrgkIHuTDAXn++AiyKE1rp95S1CoP60+KWKrA0n/tAWAfy4fPf+vJw4Eqg+JbtsYUGbcgPfbj6wb70ZDoWfWx8mMtQZiH7YuFR0k/qVVUBUVayBGyIp2s9jyB0q7Heo6zWBglgs2PWd+c9+34egn0APCHKkLmnsDpwcWpDzbcz7UsUFJwlNvJdHS25+hwtUmC10DEWM74ZItwP8MAKiFm3kJtyzFY9Q89KzglnQKCY+g7S+ct6mvYsUMNHDF8G/EngdoD5XP2kGtM2JMgva6tqAFdmnVv4FL/tO5FpThe/zay3hoOufjQeLLgONOnneGn9DESHjq2Q5SsZO9vDfxU0Qe2SGuaoNxORPrSpBqspqHMNgzVosooJkEEDFIOoGSSMI91XUKgxK8SVXeXium8jE6xtO3I9ozMO4wVnNHO9b+zdq8xIsXvIOE4zJ+eXm36H9FoY5iFo2KfLw/CDADMM8NHI2xxhgwKRpa88j4qHR/37YcV1QJ7bqTPbsJ12ypgETLbQQTPZwkjtFH3lnWYg6N4+tjGVEfiNWEPqaPisQyLWqKt1yVxJYInVu8X8fIacC8gRbJkE1V1j++2CPx4igj+QVxONXnIC9QJUcmjpYCztzMJrfta2l/u+ydlOXA3Nm0Q3hSyr8mhdEThiBdfLTKC6zTOn0oaN9TRhQzdzvbQ5uFsVjDeI3Q1lQuWUKtrOO1TLg/hsXXzLmlwXkXjxljh4IPZfkNGMhGWw31iOmgVF1mtWqd4IHc4TPB/oOY3ciWKAnMk6aXzCattCnRAceP8DgJElzTr29f94K98utYgf+SHIFW8hJbSQWEA7rL60GScUiSWo+wXTiegLLbp+Vs8bf74qBikKygvWS5ZBgQT9g28woERN2qVY6+m7GdGEFCkz5rjC60PA/2SvnKr3V0LePAAnT7oL+HM9s3Vi5rWJpGunf+4vLzPWmcBDWdn8hCvucLWfFXNztd0KGgmQ+KYn67z2nOqIM3ItISw1kwboaS7q51tUSBAjRCzo6f9Mc2a1kDs5c4+XzbWK0k+f47qv1AJlAugfTi6D3T45Q/XLuGS3kqOhnr8dIgDWPOSAuXtV9p01+iGr/0h2ApOjGX8iRYTOc3Hax3/klC45L5REFX2J7m41rf+3YfzJD+PRiIWL09WMm2iRee8r86iygC7wiFXkwQ5truz1EhvBebGkeqgBipfs+2Tm3l7bEOXTgyophYsWfjYRHQcWbwYRLqkMUF/iV3O5TdJCWA9bbrQ/Pg7dk7QiN/p0n8X0B5M13afAgn+OGY6c9E4AsX7GNTECgsh/VIIHArxtVORWQ3IrnTL07SUb9Q3HkorI6/AOddT2ptQFclGy/IToDoP10/RqLK59L8RJqrvADVrfy4ngK+cORalhOjMISJKTzPHKCgXNpyJ++JpKAtxz8OvpEJ0B2Rce456RlOeTOcbHVnTXIKZVFQq3QIp3jmEvfIPR5I8DGOev2QG3TAT7KaDp0Mu0OYZFEfIaLxVr1mh5j/1+AK9o0Tz8pJjY3Wvbu691CCHN98fReMa0rzXOT6W0zZp/r2LS0fwBwGWayCv+3UB+A5qngkWL8FdQ6ZIhOL/yXNqEl7Gp81GeLmEkPL8um7fcI773mRq/mp+Vvsr6px2Nqgc/hbwt8UNmVu9fTCOBtwWiXKHePPBen5YSulTvXVdMOgJNRvoPwn4deAsaZwTDSJ2anhl2ds94j0e1PueDkB0sOJoRpm4ebhyO35PUcLf+lZdFBHCyXxu9L3ZBqTyEACe1y8V3FwCz79m22tcmXJpqA8mEwe11YSA485ddQAibjzsRyB3LWoZsqZJE3grmnjSugCdbg0dUFAKOjBPH/QDWiC59tE7if+aAO1+Evjc2Sp3mEXxgi/buJ3zpsirXH2IXSKWjrYcRpvAky3B6FZzf4yEQHKU8SYcLAfL38pfJWSCefVV1hz9rKQdA1nYZ8RYUMvd8FqmK0L9QRz4oqZy0opR4+aXyveSZvkSHMSAhW0KrDXNWYDADohCW4pkxO314JJzcTuSQt5rQsWBGvLSTg8BecHWghqHKeNtQ7PxDsZNk27PAZY0LO3Hqpg8WACjDKFFkjMBWp5CdIJd3++WTFLoodetjYBdopU7eFR0/1mCdf9S+xcGwXYFkZnzKPYbgrHS0tfEtKv+ZXMKlmQYxSCvIqvCWEqwnnRqxwZCuu4slqw2EPwD7s6p+i0OkhWIP3jeWkwwLw5TfuL59EgFNTPyDvo5qyHjtEjzXi4qBt2klUEn3LaDQPWdDPsopZdyTQc8Nrli4XYt3XUxmOYtlkfluQsJuqWDjmv/QBNhKwHArWGA7Wc8cz64RmWIxU7Dhl904QhH7MGGo+JyOxZ7N0u+iWPhgHbCoPmH9ihGMHSRoJmntiNXK1H7jeUUdb0WjSWYwLQOaMJLSxFk75OtqlFLQZ9nrp0L49SXZk4i+xhnYvszmq1bPqLWjNWqNL4I+8YjsbDtz9SsIq+bdvMIytHC7wlQUkglRkrCnZ783Rbo8/XjHLMO4PWryIq45z3NkRgQEXUQKrUHI3wNbAVshvUWnLLng/phjmPZGyI+ZzTnM4a2PPphAap5IvpKZiMtPCbYsBEXFK7NW9l815dlDtL62okxDvybdJT3M1tI/+4RMZMlgRSMtMUPNT11bnu2KmBjOiIDFzpn3lLUVLfGFzME6Rv6OqG9CiGcH2AyCL54qhrkcfLpiSFHAIuxNd3SPtWqqvS6P4DxBv0vSH9AdTyhyIUOjFIfXKVMRyB8LNgv8693wDyFnGgi7poLeZ5GdDkNTsCN58LiwfEGga88457h4JbAXVCHwRCMZo4vjGoZa+JHlWqCGl0uywr3UmAYWwWQJ5m5S49aaF5sTxBQVOckqMdTSUzCwY9WcY8lYTXooCfRwayO3qVK1XHnlGYFTFgr/tfoTATrLPL6ar272WVLkFNhdkYqBRrRMdYEgAKEqZHR5iEci5zYQoR1RU8n549VUbIyum1p/x9FvRmwNsDO71nzcsuwMsMwF3CFKk+MnHaNB3BFurchXtGjDsSO6kp2Y5wUJarwyPhHZryeS08H3f3oYwgJuIa73NCKDaGUdHaD7ZSdQYSrKGWyGbZinIkW9fcWCA5snfuK8j31/i4ZtnW+9OtkxQBJUOK99c0rf+3JbpYhtTEDNKuE86sORKFmniqHvuY1E8Dy4+K5+SAVbiiU5CpiCp7sU22cSlNFUNjaOVfYD0EyxdttQqj2LgyPkPupdImjZWQkOwSYN27RLCzV+t8qf07VKLPn/vSZsDdzjCoXy1S8VJeWR0kW2k24dCj4GLQQiArpaU2kXL3j+q/cmue6gORali3LjMkBxAKhJe2IN06bC7ixJ2CS4XURaw7yBapg3FajwbBBfnqLeaM8Jt/Jrn/KYuSnoLyyCVo/uTg0uQ59ZgBeEnb095sfXQ0uPK5p7e/pTkjEDntZ+8WMNjdHaybeWkvkq1Vdyk6PctsoKeVGNSS3mYJ95PJTuvrgjZIheVTv2nHOi0dwrBRMOLMMxPxIvFsK46IebBrSty0oHRkorYYTFW9S78Xdy2cdr5gGgxX3M/kSAfy/4PMcfJV1xnsCG1dfhTeXnGF30z2BYgjmYjc+2eEi83TnVknLnqQsEeIXuyrC9T9mO9Wi3v3JX3F+/00TufgQ1xAYHkNWMwB/YAgLgXDkARoP4rP/VgS5xSd92YOzlQeOHOLizxMmIX8vVct1t7sjVaqBRephrvjqUsm+BAxmUesQKbvG+UwvEgU7AA9x0aTu+xDIqqYvqjrt3EfIr18dRCFgre+ye59M8fnNvhN9DdI5MX230p8U2Db3Y8bSBVra25M+zViVHwFsIJsoEyw3hkfVFdIibcTfpBZx8i8UktMnV3yfNd0zwqdA/V9HeXknxr7nccVX/KCRZjYVfm3A8bTOiRpez17W67rDXCEdxJnDQizIcbf/25R3yY9DG5V89I3SsA6DnSu5hoKipGAl27I85rL+C21tEEQS+Q3v9GjI4By4I8h6ViP2oGwCIpYf6PiQxM2idKJsz+9YRWPw6DlgolAdbaYSOePOE4DPqjL+AxFL4c34dAi/1ZixiDUo85u64fdmMUufTC0AXrkOj9n/g7jE2lKMJ11p1mKTRzC0Ps3L+a3SJSdy7HhAv8ThBfrsnp7lFtzADdW+8LHGlouS95vkCTveX287unOQ5l76oBlMs2p+tj5MG60I6bbMuemAIWqyXp9KfFQ7Hb2MA4fK5d1uaHH2k8bYK1eaK5xoOba8zJAAXjgyB1OWGpDJfJpbupA3CZKaTTul1m5ApTyvO90tjdFb355VxE+g9PZxBsInoQSGOeVngcv2UjnjlP4QUToAABqOZF32SJmWI9H1CsQiYuRKOnpKVaA1wZPYV+TUPAvDE433b9yWfdNHac3A3nwlP5nzBIJ3nt2au78SlR03xMQ5lEqN2VnMiQMgyTZAC2Gh+oQfVsVzhZVCu1xRtp5S0mZk+OOB1w1Nuz9zFnlDi5Q5w3Og3M7AJkAjVupv4shmRsDUkLjbTTzlFOStWoTK8hYey7/99E8rAjRixa0fWVRBJhVgXp0P5BAfZD2qiquAUiUGtvopCUun+bpvEO8GZCKCk11MtldG+6oYsxwjfmScmoZe7QjsV9AhNMqNudNC+Iu+0DPE4sYx4RNIXiolSuWSnKnKEr7AWFpvmRgz6PgJwvZPQ0KWm9ogFLYHxY6QAZe1mmfLYLLNAC5a4DZZh+30Tgm3TC9MNavkQZwEx12fntZry8IwRrdZ+DSMkcJNo4qB/DgS6a81B1W7Sb8EBmh2eCK3d857dv8t6Clh/ozfly5iS5uKoac+JCZE/5p+7RFlU4ULSzYgQQUiyYQtVBzxFplJo2RvmSo8+cBr441UtpDKhpwev0Kx+Az7+zgiS1pjp+Z00jJXkPr3GNfTbGfgPXPBnh0JXPc7RwETMtXKqRTdB/xzPSSnUumkh2z9CGnEljWKGpYwSh5Zac60Fqp0GvgIu+vU0ysxQbPkudHT1yG+quMCb0pCUbrzlp1R/TPyFrVbE80MReRMn1T5mbT4HcfaTtVuSBLMakewhv3l+Ar7YnmY/LVkzqfMrSYyCzQbddLK9mf/ckUIFxMt5tjWtx1/4+qvu1XH0zofMuKZ+fxfBeX+0UVtr7HTr01/zsxg1a/wBVm4O5rA1o9lKsqlL0E3j0Zl49gI0thwXkwvBOEL4bqIrmF2UICWWxNBe23GTAGXI81XeY7A+rbdOSr3piIdkRirehhm7IRW0PbINVVQV5Gw5Xcu9OE0DcdPYpLTlrZoOwOpScoR5Ss4myEyBoWG1WKStSmxDXlg84TnWT1GUGo6brmrMjwHVuPQXXxJotbPXc8myK9fWl9z4fM5eJ9sdHJu4EL+XpTlwCSnPz+H6ktYgHqjVdMxkylqxgt+eG8fsMCSQqalBRsEbUP4wMrJFpZ9eM2cvE49JpttX86UdnfzgZhUO6sEII1vL8ETum5qDj1tBtwg3pkh3OwYc3mIZBwBA8vgHK4uXzE1HoTNCc1TQNcTFFrtT45BIdtm6AKs9jnUx82FE5TJSNBMWd3hIKsb0cowagKEB+AEM8Z0ljn00trGnRrF188Dctx8xbE1vg6mMoBIC+FsyPefrRwjodFXb0LBy0LCfl5a3EDAY0/u/dKKd+LS0x5P9U7j+ACYJAZ/EbBxU3cIfH6Md0U0HscJwZeCkaLR5lMSf72KEi9aVHv/45eYgCt0PQgSzgdtrMzFOjV4hu1OaaN0zgpgPCVn7i4GYL6ZZ0SnEOhOvJhVCaQ0KNAELQnzapMmA9VU1LYJbdvAj4vvv7DX28thEFjCNyTNEV92Rx9NmuFiQ4hCw5B/6gVyk5rh2HlRTAu4ILjaXB2JSN5BhvTfRd7wnKTKOlacR6NOChFXZFurOwHuCMkm62tKr209ZzM6vgB4bpkmJPdi5b3M9GqWxpKPHFhVuJ+jD58rBqM5VkmvN3Yy6eWJ6g9w/e2S/fiGrd6bgoklTERGe5ooZrMLKnZ0nDLpYagz2uUJIe7itDDj/9aBMo0hctsJJV1c37L9arnzRe8NexCnb54/OW7d4CU91o0APDiav4h/Ws1iei+Z/oiwtH91K6HJo5IARVfWV6k9afrPx5dvNfiA8Pp5ZJlS+IXVbtqtnblS1RFQTFyFv6KzKv5Zp6xktwk2izoJTGlSRDTdeeZpCZBp+VbcEh51/R1Dv1E9qQJGnRCXoz57DBbL0kQksHXWJpE12KDZA/7vswhDC8SfqztbL4XUgWArlyZuraFjdB+MBXitEXAqIXrfPMWQpTEu//EXn7PyaamI5fzLRk1BHF4EajaPGFso/wJpx4cLZPbu05NU5/BMHSVWPqgx9BqaDnMLWeIsV3j9/+ipzEacW3qXptNEJ5inTx2F1KX4QyuZSIO1l1VP3FCi1nTulYjjCWTstQXbu/zQUErfU7AcYfwwYBiYfGpHWZa8vW4pYoJm6ffhx09vq3IwObPvzwcB6qfe4CxPGTRG2ZWuPkmm3K2GZtK0HbJzYPfCJEzQc2zEP11J0RGh+MIu/FQy/9eyR27G+1tXAqve6x26pON8mDc+onp78tgqT7Vj7RvEAJwCOu4EKEICL+5Q2UVMutmbHRRD4ozJOjDqQ3zdo+hvY/RLbEUELlYR5DZfok68xJzobVTF0bju3JJMahAklukaJaLkIM1CBoJpxl2/5oClkP8asIjyZKFpdsxbXKdNgBE+oQOBPgPBjMOhRVjzcByHCSlZTRWHZLSuJF2YgCD9rjI3PqTQJ6un7SY9QUI36c07JRW6qh/2cj0dANgKyXAPlqk5m3rClt4NqMBH/F3yV2irCgGkNWwDN6tn2KSMALDFzS9VppApjsPnNc8AOTzAyNiBtsGaioCYiqknNDGDMAtNPDqo84uatvdXiCWb3rIDlUVe08UY9ORtJGQuN3oL9kL5IiUeQAniFGkZq4jdzKwP+8mJqGs/IJ1c6t+JJ8U8i22Z2vp5r/cMBQjGqa3b1ZTPso2GeA99NroDdI2ZF4Acq4+z009fXNdbc2tvlIcCMkVQD73F59Gbi+0uMf+bFvOLol2JmnMKOiqUKnFUQXNbLAVgjOmbQYRUbqcXoMtL4XNMpY+LYJmXiA6hhQIcOvDUqiN9NYzDtkQYH14ljdhB7XAJeTAdmT0arMg0Hw3O2+gs13n9fF3pNLkAoirrDnjbfl3AEM7eYELVV/x0pp8DImNN0HlviL+NeSh5U9Fe+bS8/9/AbRcKPYgY/G95fipsuedx4Q2T6gFqLu/rZtU6NcHntmLyIfWEyrxD8AtsQkOt//O8+mzdGCfWTuNxA5dHvjJrZXdxGWKKEN50e94lB+Fa7N61e/nb+wQ9D3oL+GQyTXoo3EwALOa9WUge0Fzp3TAnACuMA7YSJEFJFdkk1bQ99S4WI61VI+riOIe6m7DPRbjs9iP3eHwfG24el/Wf4KnmNwmhcPAictGdoNF1HD5RIhvchBx6IfIACD2lbll0WP+J3URHP/7vfZoPbaS6yRg6w738+hkyNtl2B7Iy2bAfkEcH5W6gZUo+POSxjhHrV4ZiMbP6DUN131vTxI0BFf0LEDgTW1e+knmdq64wAFSDeUqPJADQzjQFEa+gk3J9i7Ex4PFQq/4xjBjQ/apnwQWrs0pv/rPlwQhDO57Cj3prfryze+ac2H72mbQkrnR/Ju0sQ44ylhCnqICQmRt2y7ABzex5fcm+9lhRdvwK4Qz07hw9zFdTO2pp5W5FkpP7Ex+Qv9R/20TGtYXKSEZXwlxkAsw+dshIWAxLr3gn+NoNHQH712WWeBVPWojSVEKzVhqpVhLUkRGal+c4UkMiOX39ztkSJFeoaGPNHb9D1SKDfUxAhw245WmutHNlh2l+LQj2SPCmvZbXmpS4RWX2a99Ql9Y1+DxBTgIRTbjJwExKnxj5oOM7OgctRrEgQ+gAGjTdU5NTHxu6UOp4VC0xIupmpkiKc4xOYuwyh8TBs4CaU6NiWQjfTz/bIdLBpR2qOQ5EPeWJR6/J3NW2UlOPj4QjAW4hkEpF3rzUWOB6mApu8oEgEg7y9DgxmWNxNMMugn8yvMoil6BJXX0r3/O3dVUmsUkCn/s9zjdhlbcU/sOEpnk0hvexpnxtBKcW4VCBqMJEbEhUrv2yuA9+AlcpkTMPgvsN1DvIG9SQr2lh15/IpjjyTIs+8e4QiyTsvxToiceh/fpVWKtJhBpWB1fgGLjtO4UFhjFlLPAhvuvrmrNT88o0hW6BoHta/veJQC0Ng3Esj3jUuosIf/BMpdC1Fo8aqZbtHjMtsb3CpkQu6ujFiXV+58G/rUKQ7P8mrVrRE1sZmAZTzxMOys+Y7gyxYxc6YgjkjfIVgW52+iCuIy5EjoBUPkUksX+yN92fhj50baCc+HgLww5O9JtU92O7+rc7KyivfgUlk7xf8qpcjIT4ULg4picRda7CGEOA/6UnWKIGmjifrkb7CkmADKHP1aiWUdjbOHGijqAv4RVbNClzSxHKB4hvliPlmUoYD5geYbCGF1+XSWeEjRHC/3KdiAJVIs4ZdoX4JbJ+/Ky1vaJlc+Uw4kXDqWJxljZFK3rxFjtS8TSfMAABHjovQCiRkxGsC2qo45Bq7Jzmb8FHE0poH72WfuXwD8+5/SP+I6RKpwVk0OkI4b36gF2SaqZH41QahU6xvbfO/C+mP9hAPUqCNrY6mMQBtu98D+xhZZw/jK3lEMUWPrhB0HRiDt/Fl/b62H3ABJo9N7XT1zNRqwOOhcejAsd0E4QZ0kAbuCvgB1Iqn+pMpRQuljzDyt6I0JeUJo0XpbFoh9DmN3KKk2l+LcDoTbRBV4IlGpzJBzX+Ao1fIyejznn5A8+HLwHbsjPjpHRCkRYhQ5R+izBb+DXtbhqglOq8+0pwpXbevEAzs8QavClaNm1ACauVA1MF7WmMJFBQzg7yISJJy21rVON8TL/uDqC4X6JCFtegVW/0uViINgWWtpxdKElkZpRv5OovelcAU6Wifbn4TPVaAm/Fmv0zhSLkCQ8yophUHqvM6uRJ49qZQNvLbLnvzIC6+UZ3lBrsbNXVhL2NtXmL3+SFEeFWfXGRnwBid5WAhODOJ5Dni9Rg3ZeQgbQ/3lsBGDJyvNFzD5LPQ2ZbuvOLStt3PLguiM5ES9kbtL1WujRPWYZsjbkRlOQvo9AdBK4V3I5hRTtyoWtMxsxFzlcfqBX5tRpUJRK2S3qW62Oghmk1UMtJxF1jYcNw3v6Ckqtkqqdg87FjuIA1bqm+MjpesNcdfuG+XOwI1eycDp34z/VyIif5Ga41XnObAJiC3q+TEvBwCl7qiYujPPRSO++fyXM9mqkv/dG2WrcS3NIWJ7uUxDvjLbUVNG4xBsCcOv4+q/rdKhriUgYHXiopJ3DwCsPoCNgTNawIzdQnL6xcAKiTsN7SRDv9QyCPBxwEQNYXZl6c2SJTRcysg9ZR1HBeGEHEZOMxVZJE/kqcNHmZTiBxdm24CcTOXE53RucDnvu89hkKkPC2vTC2uMl4Ukj0iidQiMwRASQpPv1Fk/Y9ONvi19dDUOE3cugHuCg8NSx0kImjf82sDmM+b5OGUKJSLS2C9jcyzneirCTpZWQW3A7jeqwsFSH/rTrDixym2HP/oucG8Tg2TZL7uyp4wEhHoTAWO2Hkke47TCIVq8DB8AROfeqS8ECLNcfspuRobNApERbMfnac3k/Bk5XinNsHbBjOd2Dvsa77HQUQiDErxmxa2iVZmqaPweZl9DlU6jPO+s3jWtHrkFRV7A2fyO9gOzUphSKC+dET5mauMU3vFixUrIgtaqDXzO5MyuTP4quY1xIc0WIJ+PJNqiACR5vDre7K0SWtICDkPZwDqgJ3XzW6M4SDXAA+Rq5+wsnWSZBQLLWL03Vurf3ee0CJFDY5//ToLnTV07GQd4S2QaglOc3F0pcbYbwMAadiHFZxHwsPGlWfxC3sJv/VeHlnT2Q9eBqb/GWt+T3KvHAUY8dSZ1J+ZMMzZm3RYSMxhA/yxZoEDb+0pJz4ubEeyLX+8D3xoCI2PrkBGJ6uh37dcXZi/PBxeiVTJDtW2PAXRQfRlaqKvLpDsM+E0aeDxRtFuVil5CgwfFZkfRjK6x6MbdyAueveXoUdWzGust03DZlOt7oOIiAblzPqof4BpATossxrS/ApImGDdJJEPecKtb6w35wcMTUYGoYiJLMa2h9kzE9rmoCJLpy+Q5hO1hcdjaEzZnShsFjIcI0F3RMJos6VhLUhQtd7wd/sjpwSiJbPRjzz6StNT/mujATX7w6yVUR8j8vZ7KL4ZiMZGAfbvRyv3it1sor4vvSNQplzSCVUX6/1ZhPrylJ3Mwp3kpztYkaR6Y7vkFdSYUIxl/QVmRrBcosSwNNhI46FzMePR36pXc0sShyR/8UCroAGvtxgN+hscDPog1o/Zpg/r1THpCEQkAcrZ/5AxMo4iPs70vMHKj3EwgKIYetzY9B0ynd/XG3MDZRJaj7nKXEocOZ2LAAuVn2+1DV8vf6HnNTRmpUULOxyxr8tmm1yeZUk5H6poht4/gMNlRnYbQykCyKAZjH7DR1WcQ3w1tdj6Pyxygyj/2QhZBongjzRqHj42Ydpcb1L19Bn+fhm5n+64ryUMjOv6Nam5yus/JfqGD9dEcGvniYn5s1Pno5Q8L10aRxDZkwZZAESEuil9dAM349JegVmoBNJewAaFS/8+0CWc63+5EKcnb0y5PiG01seLUY8mBxi33CIN8eCuAjAk/yo8f7Q5q8b2WC6f3uXFg9F+oZL4PambBRomqEJsvqw/5TGEv0dtvnzG/BUeG1TpcP7ExC8TSW81HQZFouefSfFNggEQ2RxyqO1FXQS5laGqtAClBE41dwaF/R6IxPdWzvJdAYgl4Oym2bntFwaSoXzM/xXTMamDvkG9QH0gDFvbwuBPVefQHtbt8kkV6+UQQuh5pi7uP0lBvvTf/1edcA+vXLdR3ZJISax29huxI902ee3n/+Q6or8Tu4PeOAO2Jv4kMkBDQSA8aJFABBBaz+l9TBjczaXKBDAh6h5ZXBuEKYns71tyRejw5ry4lSCTzgPs+mJduiqd6CBnKHOl1K6F2HX4o8eC4I8CTktrJm7IKsyboK1poMrkZV0tgg/m9hYZ+mFDmHmAvfoCwLS8pPI0d4c3coI9npdXr61MCS9KTR++mXfVHN47qkFCYyXeYlLlGYb3Gn7X6rB2EpyETBsGdxjJtLSFR6z6SkSJKpGBBlIcvGKDR0wK6E+54biI63twAxwJWEMVUekhqH09NguXoqneBNiajnKothAN5KZyjIIwzbB+cQk4EGZRIOFCqDdJu/6Wd5+wipdJVQraz/V8Eym3fq03g95TjxVis0nEqtn2G6TaEAOTpYKneI5GrmPFIqzeBbQy9tHQw62DTeZt1q5dKrGEZ5GsTQCAzL7D7G87FHPEmqsqGSh26/D+UACnKMZZXEbhBbBruEhTBN5YYpep+5lb/SlVaLAFVsHq5bAGOgxRxJfzGVotGl+fA2DzuPj7QHgyzuKAFnaL0xDHVNF1JUeKdJOYQfMqvgh+s7uZTF9X07RbC3+5BhMjnLWij0AOvu80a+FSx+a/lUtaCXEbqn4rx721WNBK8Q0lbgYoZEM41TslPjRTWXSg0GNGOKLl7ofjlbPVzEn/0tTOKhQtiDYYGRg43kr8V+E5MKzRYAxzVPdTyRQy836xFcQ14lLpUPVfY1V5mTdY88XJ4s22gRQyAPIIrkVldN0QTyXZFBO/uvN7MzGB2QDZpk4wJk5+bVXYXY1YULVRt+tV+6JHltuNHkbjfq7mas4R2gvGFaOX0N6kCOQnU3KISi/6PIT4CY7gx70XT9CUeNm2iOo9DVtJYkP+t9FDN67m4mlivL5jOYihYWHht+V//Bb5DUoP2TZBNKG6T+cKEZ4U6LTJzIKEhkoZrTsc5jRq0chh4U16sH9JzSXhGV1uBTAY+mnvQY0gCVKtn7N7wlgFloORgJRIw22ufvtN91r6hmCmi0yBTcZ0v2R4vyQMShHu0TVhpDFmo5G6uCPB+qKWl1XSJpPQoHgpMOrCVDLbGmOqfWQvqMxU8V/3SlEBrOxDUNsI61e91FAtNAe8Iv2/UfQe7j7fGVhiE2cdPzkKYNW2x198qCuDwT8jLsjNC/0KVesvqC5pwQE5e4+baOoHvWwszCCnRKhh0pZELHLiu3Yh93Zw2F205Me6yKWgFyzvplcHBesVuKnHABCQ0Au5RTiHEZk+miwLJC43lwwvhVVMqMdC1mBBCKV0pmm3ICWWJkDb3OCMvryxvc2MLr6/XsCTPwkjxiykVvvNejLM5gWU8Q4w5q0KETTZW1d/zUv5BSUwyFO/5BvYJ+lyIy5kmV4gqrICfe8WFve+sK6ywrSkFr1cq3nUBLmEAXsjUeXJwSsVaFbRV1PVd/tAtcQh1VTGYhWgmzu7EB5+LV5XAuhZ0VfurEKR1R4YO41wJ9DJfTU7m+13dYddOgbmmVZO6f7PoNd1wqjEqysGRJKonInwAvsO8B3Gze0RpBhyM7j+6n2+KDqqRNIqqHDyPmjQ3KShNKnS+pKliQ6aiLxuhOkVeSfgv3p+B3RF6+apKrNJ1ub7g35AS4pa6rcq5E7D3N5bhgNdvjjZKjdrmLmHvSLaul7fzVHd32om9oM0TTLVsA/95EbZbk8h1ufmB8Pfmq9ezucyGXfxKYR2F3AuNWQQWkfrl/+8SeiJ0jjvEGd8Ks9xsM3Ja4u692CxmJ3ZqcoN/g0pkYl74LLQAf7XlqETN7V6X5Mpg1tVwmtHAM+TEqtsgjwfUp6glaISwsk8HUa5RazubSV9kZ5Z3fYb+WXLSG8Dec8g3p1l6FVVqp1DRgHShZLeW66KVdbOwZ//DbzhZpSGaV5rYj1EvmX+nehioUbUSXyixegp63R10GrjV0oV+W5t/oBQ9kWWlVeFEE8CmAEURCU+VCCmB2nsoyhHjmidKfT7ULRQlAAFT6zOa5vGewqSDTsHF/r8nnzM1EHWzruYbbHlYFw25TiANhhk82JeQE0SLdGrI6qw6r6ocNAgzzT/90ifNLCT+wTx48SIMennfF9Pgekt1iwshxijWYD50dnikY6eIzG/XlxEjGs4elvOupoRWs0er8TGmXd46htwR7nNe+P0FS/Dr6l+/Wr3+QdJ5nDcNTt95G9JA4DOnGL7kfm5fVevnVIqEaNbqnPI2V+iTIvUMa3NH7/Ns5QIMPqVyR5fBAy2EAnBZhLlLanUupTr6kkbW4rkZ76aJNeewPVaAARzc408DG1eX65FeSVDdpFHGyKmmIXQOycZ5tx/WcdKd5lZ8AtecRxR5/6x54dDYBZbmrwXTQrNTy2H33HRIRKp824qc/uhR+1pQJy4lwKf8z67IvUCeiQQ0DvyfmKsfCJ+7UjVaUAG/0wzw9b4zYQDbMP1aEQCzkCodtW26yhAvrVmI/cg/w9nZqLKIPIoGLo0KxpJvCPDpSpYKxv653l9VPnXNDp8ieo3Wcf+Ie1fhmyOECcvzC6nh/tqqPPOqI3oTnykqiFSxBMP1EckkIuJRJ5KrPSeqi3sdq7vdT6lbhAdn+K1TKjn+eobN8B0277lkTRmErk1NG6VEsVAzaWBSbNW1NpRLbDHr9jXRkKw8a1kVM8HJheIRfsIYq1bV5iZtwlulEAv1rI+Ifp8NEP/Y4RTCcStpkKrPCQWhq6u5tVNA7Vq0wOqtfF0hZpGVTnSyX+YUFxOF2SySf60nZdzbtIaqmvFlNH0pejNaLkP4SwUalTvTkhBs/t3MnFJ+RT2ao71gxNTAg1jgOwmSF0NQErcDtMPsBac3R0fWgcMqv6KCYNrFtTfJUeYSOyksGrr5TTA/DtAZIgEayTP8wAX/Xh180GiARaXgnl7zXNaqh5Yqygue/wou+XfVsAg4ZACUFVl6nWiYSb3PPkrz8vV93Mx/9o3Vr832chhnSA6eqv6PUJvFsOQtsMPDEl/jwsKQ4Rs+BPDhnconOGaZQtawasug2bQRXr+UA8b4AoRV8WZOeFR5EJGbS+z4/s2S90a8y09jIel2717C/QWcdZ2fXY52CfAVHou1fAklSwaBzNQ3E5Z8eL5O6xJIIVuDWi2ICwj60I5jNSRo0SPAnqamvijgSxiCVwoMVFPVvqaaSluzdREqOmM36viWQzbKiW/x5U65h+tjZCBjcJTGNpG0c39Lnp8zO8O7xhQHBI8urcrjC2ZTHNaqltkrvsf6h2AOlpRgwWwWmNU56nwCHDvAFVD7JXUHC2ecsrpwSJ40QDYwmJ5xagTlGcpKS0xvWoPXWQAYhoBfFUUG1mLapr38a5ZWzRhsvRlF35fP+Q8oR5E3gmyToknQCrkJA7xN6mijEGIQtG7qSEGP6rhOlRHw6Nuvc9bsYgeBtqK72hnTFXuyD3xMcUolSFMadCFpE8tSK89rNNVgoc5POhHeraWx2d++fPu991v/HHqetFCziGnjOEOy/PhlE20st2Tc6nu2xoi8CojcjtHtb5jttJ9imXhScPigirBU8Tg28UtQ+rfUmi+TCSnpxuXDFzmdl+Xpd4FEkx/J84NlYj6f0VEio7PUJMWSLVZBVZHSPEt7QZz0ufXu0vRvoodT3uvhFMV+qOA17dWDWLLVCQyP2GbCp3bmYhTFQsDn/HPYN6d3asnjaxrKwZ1G1OINrDizCo/Bc1w1fXWsuw9gNcX/Ebp6odzd2AbQbrtA5Zhs17uvef0Q+9YhFYr8P/puUiuYRuucGFuxBMU0Oqdiya04VZ3kjbifv8aRGt7ZJU/Fe8yepu5dW2jLisIxuL/9Uct2+pPRKPOh5Wd/0ZWJP7iE2zDNEeRiKS23JAFgpfCZYNhh9OeJJDX6h6KBJ40HY+H4gdZ3jBpQ7B9PcinfdeWk8gkDI21Lmr3JimMLF6AggmH4EWaPcLRSoPZT+YfNNJyYoNkWENn16wEUVdmJHjLZQqhdZpGQKRaYQ/gczr7br8kzMatlLhbN8I0B7yRJ+0hqhXEZvLjBaNH8X7Eh+frTyP8rV/a0bvTGg0rG+d8d7MP/aqqAElXuhgjpyzPuuMVU1VEd/2Gf1oWJ8yXBmtUeABzBDMRKqbm+hK0PMrdoCk24KrBHX5OJ4HXYfNkOM2QbA91Vro1TDrBnbLVdiAb1aXTsEZbBUK7w+tHP9gc7fD3/vjgtFBfevFMuMfgQprD5M9045Bi7seWl6Pj7lDfMRTffLP4R5qauWnrcTBy6Kpc9kKeii+HsCU8/F/LhCn24lzvrJMMU3JLCbXBEymfWPBKiG3m+UfIjCx9tWdWi6PFwkhaiwzYzf3F1PbqG4oMbDaHKOuXpyn58U+dZ2PW77DoVsUatNT372Q28Gzud8lfK0Acp49kod42UbXJ3xyW+9BWR2lhMvIyHPCEhrIj4P9/22HUmEBIyTnsfvi0JfmZCjZEsZI4rdlyQz7ibBqSBVeA39ALwo9HzCgDkBO9xChrh16d+RgJRIvv/rw9GxxUmRG1kZDJFn4kyrqU1JHROw4hjWJqgherqRQrkxsDQDIymxF8I7Xubv0tN8aeLsZdV4guGk+YAxtX/PvK6Gvhfo10F45gt0/OS5VMpMC20cFHFCZ09e+EhcB6liqSTVs2Z6G4xFFc00FtN+ynqhP1kZolBx46lvW1V0wT33a7wKtKsV4pZe6u88ImoisbPVIauHuNCDitzsQq2zDISGRiJPSOP7rP99/MD/Gwr17Q9oknLcFRaiNH4s4v0iG+ZPpGy/xubvkzxMQAKE/dZvm9EClPcGhADMAfmD4T3G/F8mQJA3fvFi/XS3gbU972/evy3N12Y3gW7FI+C2VC9BHVdYjiK+uFws8wpRK76SFoLnvdzpfg8KdtI3GWhCcmMR9LKIQtwnq2E9yoGCknyoTts1CWD7j6mlT561XjzmLHGZBs1B5PnD27PXnHOf42UDyV8OSRQK61So8pDMkbWiZPxMMyPNuS4VK3vVioj62XKO8F+37XJKwwOHhPyHQ3HVadrZ5cxX6C2eGwR5tMuNlg5c3afXmO6rHqQthOwBUJ4Lble2lewhgGZQiRMgogLXgjSdlQ4a8QCrQEngQr5DHOR4uzegs/G/KseUi2HjPgu+m4YkbpIr26e71ehDAtPDQI8zXneCIobbJDY5Ws7oZLZfCLvA7FGoQNZO6N8ol0p5Fc15cBofQBkKtGu8UkgJsHmHbG61s/cCyVnU4bZaJhE66G2KMzrGLKcVrVlPe/CFnxITWhIiC7lWQu4hMuiArFJt8WYX52ccHRgQ6QHREsmiWqXkJgam9ULk0yVs/OwgsmI40tG0P5A8TM8v4neJEx9hy0GMrULNeoDpyumfW4pNtJI3d1liLAuVEhbvzVafV2qRf2fy8l48+J9wxm0N753ciKmJsUPAXlJlsUw8IagHDZXlDId2qUwqsJ3dJw89hGOapclw3nhdWxvOSM7IpCmDqwgZ6jjoIUNUIVRf1B1TunOT28MP4jkSVuS94X0JzAXzde1guxWLYc5H88kKfHYsSYPhNzj4YxM7evdCa6nH0CkxKf5oSicPtRJqWY+oX5tBHqzcHdwajAKMvjuyVzBoLA/fP+I2F2++1fm3S0gACEbYQADnwo5dI7kRdkpvprTMTf/T+VUt/DdovVtZ++7WMJYadJiPzlpTnk2mfBGiVmb1kdfNfYc/ePLbdfcvIZm2ognQaKR8JsSHTmqkfHm1hw9/nNaLvc1NyEo+KAWsH7zU+C4i66IIKdjjJfVS9Vuf5rRMbzP8iqmz/0m5kLyUqpXllVU7srsNBEWBBD9ACEGdjvo/G+Oh8grP3K8Oa5dIdYfLkmNe5hmojwvsMWnKjevIjgl4axuyXniUD1EdWtHRcMrGxuQSZ9a12dIF8+TKqjSrEN7j5HEqIT62lINJIq2p1r6yl/XTnZndHHE7zr1CQxxO9wJMWcw3JbTMSSm1ZlccOLVAMrC23ZCzk9Uuf+mIbjNqHy5IehD4OXlOb1hgCWgBgXQbM1/9Bc8pDCTeTVRyL9TxcXDv/zfH6PGmCn3+/4QSX+HkctDq/o098i39l3kkVgEQvKZsdfoj0aPVsxIThNZVQ/2OskE6seq28dw2InwKQ+OVFHiRHTDSKnncTlgXZlL4yAAdkim5IVj2+GiXvacUDkCmfE6wHn9PN6SEeAF//gjSsxgaob3n+qoN4Bv0GhThVk3F29p5QtYsH0OE1hmQflUnmxp5FArl0qLQqjpKeE/3ZNIUkQ4Gl+SQ+zgMkvwxvPh53kLDFbe19znTspTUpzLgUBeweiCfbn5tV4bLJGpNTwbycoAxl09+RxhQ/ckHPQdo0qKUhNXTKpEiStvblPuLkSUhDlSrXkw/85cm4TENko4N/JLj/+j//3qdDbupKg59RRf375UVrlOsNfQYXsb2P7q2kdXwrZ18vzL/hq4IgCzdTJ7/5RJogvrG/EmCSt0ij+4VAGIzvmDBhY4hTa+GlTD3DU7CVAO5xHecAjZ6hl6MnFgXHdNeKem1qDm2O9lv3nLDkf1eeIp5e18UuWzqIsFCW+7+KUT9NPBENWumd2D5w5CmDY8SpX9/7iO8M6ofeNpvDZNXDZRveJFYNhSsLLEL75Mb0fgBoiZVSju9x9BrLPoh6dEJk6kwFyQ9KGKS73fNLqQLnbrWq8xkj8JxTx92mnO11fY3TqU/1BOjQVzZxLXgzxVjojZ4/9L15MY5iWBLeWNtiR7GGENsNfjtmmLFEzUisB3nD/Iqrq8Hlh+Pxzjcgn/uFnNgnibopQ7BMWlSIywGEiLXRCO5+fmu2whMOFwAQ4sAzBIocGwt3BiBYb/3+2BchQ/hIIzYJb7NZ3DfMfRfybsfIr5ECyWHrQBWpiwbrZvI9DHmc56h/q8Miv1GSz7ALvEZqmoatJtEG3ZEIdCvzu9gpHjxd1YkDTAtx06P10LLN8QNoaWZ/alUPnvF9eoDFsDfhMx6eCXVqCdJRrd6h6dlBRssUntGT5A4unj4OndsrufvP2/If5/jW2O2xj/apOypmYf66wcdHSFVPTd4NocZeWUTR2E6snWfpwnijh+2Tt3gEmH/nLmuoAjtLl/3h1rnGzATPKTo/IjT8B2aQJ/6dBPLj3MRd+0skEK/TMiRZuPiCfhIaQ9oDi/fkXcumO4DNlJ+1VyP2UplOh/NYhX066RkAlFx8BpBBr8SzP3ikpCjNayQr174d2IpyhTp3sm1fu2CobgzKs1KF64mEO8vIXV2y9gpMNS5RaYzb/LBvyHUG9RnAlO0cA7gGMIwa2ftEjfqW/rYz0f21ypd21h/w/7GX5aSWK9ZqbzWdpZtSDzCraLLEpZb2PkMT+qj9TGf5UgGH0w3ykroBkL0qjBaBd4z9m6909euUo2YU0ZCigKHVtF9WKNGkOh4RL71KP//1Q48zPnpgqcPRj/wJAlls0K7Csx/RDHm39g+1VzdVK5LhAPUlYsICKCBVzxCWMrTeKyTKM12hFBxPlvjC5cOELhTSnzqzp5sPCRT/FFx9x+WzpZTIUyn9Gg4SA/Jux2odvpQgSPRSN3jlL3Zp/IqwdDNQ0HnG2j2b8WmXcwGTJtwrn/P/fCptiGOJ6w8pf6ZngV1f9otu1AIFq8Qn4goi3L+vEvWLM22xBQMvtis2eZqaHcA0DDrbuDoVxITSJwlfBJ3inV8o+Iw9P2BuNwEpDwyA8doea1L1WiHeeFh4OP5JP4Jfs2J9uAdbHonCNTJEDT/tg0Z4OF1W4UYtYJr3sU7HCXv0HfLAeouROfuRVDGoxHWPHyMbhnVVySxv+tV1W6rivvbw5CZiKWsUprvq0cMAhSbyihPFujiTBMcgyXBxE2kzMkd4tmEeLtpELL0Kvhj4+33INLkzot2CDszi37s0kIx43TJaPo2R5yAHOtH61cPorL6owPywjnY0h8qY/Vy84v0h2PHkLIAkaA7wg9I19MchsUY/OU5dN5Q8UQ0UGa3bhjMvHZ/hKv0b2pifECO8Ok/109yoEVnpRAlht4fpM2rLcD1CfYTU5bYCEvIsOJ93DwzyON/6aORf8sgo9gO4tHGvKorDJ7L0qdyy7r6XKeLmWLg12gJMwyQku6M+rb3+F8y4iGz/XWDNYsjJfNrfU0UFlUXQd2Sc6kmVVju1NE8gl06IDmokdK9Qx3PJ1jOVbfcx1HptPADWr84tsyWHqVvawAIMVjKlHqo7sxSEXfCrEw+dbPpU5Ev0WkaKMH688TT351u1upHrFnmyC6fw6TFczNnbqKbmTfrVvDExgB3Nx2XlH6tRrtSK76sSy5JJifeMpxLdWMwRI4Og7djgYMXdRxrHkf5v4xQAhzDeZ94z7/0MkNzHXO00JBWqTD3ygzyR79rO0d59vsMKHMq35dAYAwumr9E0CdTzdh/bzZsrGGwxxltXWeifuFDHgE2INuoaQouwKYq0yAAkB4Sp0jdIISaw1F3UCkDKd26X4koMBMbBSXIzfnK9twjiCs125mj8E3JQ7yoBxKZxvrtsm0zw+GI+ogGKh+clJtlFo8GRUcTU8ACcCgG5K55n8Mt9iVDYAVKt6h+LC4qtrdOkQ02eXbhN3UbVVitS68fpixx46+I+XQs32jGtDfAX8kdSPx1P01QV2OO6sYLVp4mxcZBzVYojL3don4DPOBLcxvTeLLcir1IBdTsHeDwZgxfLp+cvAXpJWD+IE+Dike5bcVItnIwPNevU6l6P3bfNlJphcxa6haZkGxqM9s+1ZdqTrRfHK7J6cYviN2glz6u+MuAQp9rfzZXEIlb1qUBuK01ItXqqLBrl1jTqXiRGv2OI2Eu2Q+5F+xt8gCbuZzRXaRKfkqGm063sXgz+y+wTkfcsKt9ezICGvZ8w8yI6b3ymynSkPHbVsgjPBl9v7WXfXduM6ItxYw/i/lQIK4rKMqFkW2GST/5uMJMyEsZD986ndYfdFpAmYgfUNBWs5MUuKOZ+6plivivzjARzOL/JBkha/Oc0U1LR3HdbsnkfKzZV4eOVg8eyrqnnzZbdCkGMIt/4nO+q4Xge3jW2b+5t1bf4b1CRV+xumvirk6Ruk+p12rKW1hMW/ef6Y3sXiYKaJ90g+JhWUfySTTghguW1NuTPVVH9cCfhtuzXFsG7vSyCuuLG2glU/naaTwgJ+8o19kdRym49mRDnbqq8nAXtSKQO5wDuUWzgibcWsYIYojh/NkYFl89mU+4qq1M6F9mAf/Jmq5MuMq5PCXZpAWfX8urZwlv1ZLKQTYz1risoeRXSYldGNmCYBVQPTK9WTejcoN54KRaBDf1SQ3kqRHVtqvk3/Hzr/uPR3I8cJzipXe9QsrqOWnbQ8/7H08k4s1Q5QaxBTLc/HxfO8U5zIKLIYOrFFX/CLPzvlafRS+hAKjJRhwHUPKf6urVT73nq30lu5W/RuMk2nDqkqXzr4eyE7bSUJ6Tp3HhP07zykG+38tihTzksL51/vMBAYCCFRz/DZ4zWXK9atfRNJfCq2UNr80V/2DS4t6N/J77tz3q54AbIl3JFS5MqhIlvHYyBdp4PTyoPgYvnH1olOKnKlBKXQJIT7qbm76CH6LpReS9mkrwNVxY4bmklS1hpGhK7CtR255p7+zRe8YDVvZtXfz8ybhdN5uvUj6LpliB7gzPQaGwW+YDJJGhkFHUSdhBDXEZM8UCPNkOj0i6q/H0ja8S5SOxndepIueJ0V5JD8FzSAaro35wj6VWjfcSQI6HOzH/0u8mFwQbfiv+sMI/uU7VWiBFgeTVWPKrlv9zajEvOIMo9f/yVY11P/U6nPfyBs1T0mh8rrlKU0EZKaLi0O3CqzNZGPBob0ohYvDiY/rM0FS+Nhl9/tkv6zROOTvq4I/xhxJQ0lFt5VAzAxBiync1Gkbp1HZRHqvVKRnaOO8Aid8IdYHfapg7FFm+c6G4bkLnncn4vJsazueQQgupqvoGatnnCYRwGVb4m1UpuCzZtxlpYRpMcMGQB7skhqVQHIJH1QyQZ+i37HK9e8ygIoJzeN0CWy8FTLJDuYwuBokyp8L8WDzq+9M/z9OCSIPN172BKA7ypOwafAB4ZcPUavNNwxBwSrYQ25DEaYU3QoLdwvQGAMBMQyAhQBolsSGrYHCoELSAZMQu+vzLJ/NUdUXZ9mrwCaN/NSpqAgFNzfFNW2uGiNg7aM8A/gVjeBvdoS9XYIxr1EH2v6j2RXuWXcSq8SxtG7v2Qj+dy47tZWMVEYLEvfta1uirmK9NU3kdiQMb3vRAfHUooOn4TI9WVmc+VWS9EcSDyPGjwVXjSm7GbMyFM5QQSYn/+Zv0wq+9o042Zsr/DbP4hHtr7YPPVB+TevWRSlJ2A2ULpfRjS5R0Wc5pXFMLhzffK0827N/n80vFZRssVHYGxw0RCIeDfJL5uj71KK+BpkYAtNJVhsp5X9gjqklLboHrjyprvo4IfwsInKv2DjaXC9/TPrBEJ8JN544ZqgeG/GpkBNnp5GtFsblmhnYxMwgSzto1HEfvHE5A6ziWFSQDct8I2NKSxjm5bpAAOZpeCbt+rg75hsjRTyhTLGqtnkbvSepSwxV2GuDx++F9dkDiRmqiKLrWnfcwodQ7e/NLjniUeJyNuiBI3zNnqpvTsIHK43rRq/HSCYQYP8zfn4eLuIP0jmWo9s53Qu5rOD13sU9z3Ega/fukraS5JoUoisAIz+YFVbK9LUJAquyC0hbU5MmVQE1aravqW6zNv1ghKqiFbwdffCpm5YP8FoCXjXIrAHqY/Ctu8MpxtI5X94Bqgou0uGE14FAGXqXnPU6GLFbnKcHVi9OqUEvKdfO3nV5ZeentapEm/7mmhHktEgF7QNFDc9/XR3II7WB/xOV0iGkBCg+uRNKWesQ12YuF+mYbinos7mpDb+9peJTFC4ad3L4FjQeKIfGE6V3ofSujiQ7eH3tytYx7m1H2dn1Mvz4wbjKQOzoxtsUsE1JQnRxFlCsBn6yuJeqykMphKF1a9HoWopZ+gMTMPEI1m9gUCynAnu4NBB1YVI8RQf53Yw1y1j0AiMl1z/brCagrl0VbpJmlkcQWgY4HTUOLK816RrVJ/Xa6Q0nxyRJCzaiXXC5XptcgZBMTuCPgPy0pIHyqn9Jpwp9i0MKWE6FFXNaHRI6GEXLNoEoWTFevzOVrZgFpUQjV1iDa/xAyC24T76Vai+lzCG89O3nsdxlSkG2XAx0AzwYl5WrXi/ZQGWWW81KNtHxncsjNqgwCNXWfuHG3HrZmnOmW1J/bG7IQ6krrAF38uABmIHtbm6KZUv1uYBoJ/b4CEDziNniSHd/UTDqHffQ9S04V7ahU2wdFfn2fbwKCDa/YSI6YBYspdi8PSyEpRm9jZdg25c5c8vvX9DiXKz8ePCvfyT8l77NTMuHqYrFUq2KjSwW2b/bC+KzdvL2Tu5gOc938iYpSvrKvR6+8sAdNSXXdYsxzWRZxc5HkZrbN2wdn2jgRih1csvsj7n4QJwaZP1Dl4rE0eNKM1MCq3tRE/cg98GR5H1nCBovlRu0tKFIKVJ5ElnAcuhY+bnXWhgl6IQcLUlVvyqLUEuiJNd7ED8C8Y3iOKSi/C6H+8PIvKkHfqAp0NHWv/JAonaRHZT0kK7o/3yIB9qplIacwxLdir3RR6g5gBe0RziNpyOmJbwGWXGMJjLki49P81QXC6toh1FoXzA8TdQSe1AAf7QrwxvKBron7SrjWfP3feBbG3rVCYLWA9AgsiiNRSzCuzYEuyw+PwOTdPEGqmViO/YoPG+OrA67MvBTILV+uo5/iLDOTCe7nPVubb5PMjmro3qad3g3CnVPL3E79sNF0n0QwN8r9e/77oS8cHXdtuVSV5O+1Krsz5asT67IlfHTdvz8m/SQtyild+mEzegCcFdCPl3hTW1+lPIB3+8ReiRD40xOgd8oe7nR93ILXq5x2JIQ9FfZysB7cTmpo+FuU3fiO+7+W37N25KfbLEEDsePW/QRj3cx8eKKsckq+LI1SuYdCZaR6XAKVXQVrx3xK9wYG2gmnPk5RNKn64CkQeNn2BHAk/vMdyqcODcJhIWh/Q1JjBcq7EL6aVMwijmDZrxrAjMmix4mntMMbKEhdelsNn2VD2BR1mIwaKO0Cq8I4PZDsGqaleGkeD0/dcYvgVL+ofcoA8umqVmysAcgIgjTd26wkZySuwNStVwDEcJwTmOzQf0QuvOkLU7HbxwhVsUD9/rALYqYnQOg+Ed++4ETgW1tpl/9p5D+rw80I8m4b1y0KUvv/LmFucotMVEOqH+7xGkaHZybFgyRIUfaOHkE+TWnJ7n2C4c6ABeGo/W2XHwnvm5XayAvZqIvn1CPgkChfziVAGU+e8YglD1hpNFeZlTHXWMnKPn6cR3+7K23Rl9lY9CcaZZwJYjB7YYDmM1A8ztwrQcQb+OaYZY88QFQoYIYNAI9zRvEY31LDYaL9vZSx65gebgPLXXq5KMiAclQePg74YjOVmfuxWZXnDd79USTp54Y73BMgzNdvkG8+ILs5EYzFewgtnN9Cb5oGKZZzopD/O0XG8Wr/XhB5hrGhaUviF+eOgiHBRQrVh/c/U4MogirIPHXNdGE1v4IEoiPijD8815v1dvTd2QmGN7yJReiN2LtR44A9iTA01p6q4dtH+05duV4YnqTsJUOmhHTVc9uv6bTyOMLiZt6OspQ7vlEIiK4NBmVQAPa8gmn3eb0b6khlSjtJZSGKGHZoMKLRnPK+KR95XwxyYau9USWGsn0+HrbDWkDfHjPxLtuNDjIPVK1bmdG1YsO6XHWZ1EVMwSiOVnJIH56+0qAUzqoMJ/CuCYqoh3ADzuHp0JBi8q3//1KiRdZQy01mEgjhjC43191F6MPUeJOfYM3d8k5O5HDtQKJqI+TTELfmzx+Gj+PWce+F16j7hjf44bVDAVOUuTkqFi3Bn2jq2X0QPsYmQt78eEyHNjKKPQ9qJhLDljx+pMDADmWebllTy8xgWD2QfaUGliC2ngg2Qk60ReXgsSY5iMW24bp2SFaoxO53+4ZxNKt8UsTufkf0IdoSJBBo1rco2uLaHnIzTrc3PFTwaf4gI5EMfc40QK6fHVxXtUGN1OcmKfXl3tjE4qlQbZ/48yfXPGsqj0/TYSShtCX0l7Y4zIEmJ1mqdsDqkl9vWlhsY6z338zwyF8qDQPWW7cIqqU28ovwOkeQsV+6SqWa49R840dhMhujPERRhiuQ3pXJGyoKHAKrTAfFAlWp1ytVFs5ruWQyNwVzlMIEVRpudjUkYXyZt70+gf8NtRN8KziTedf47K7joUB88NiOqP4TJVYGxn9fQ5S8t8/kC0cFTdambCORH+IB2mzGTwWkUoqI98rPyYlwuaVRRwZAun9CIA0xgDknBQITZHAUbgd58YSJAPxAl0zBAFmpHFY/yGDrEWG6N+mLx4mo0dm6g1llb0Vze5qbl9fPGLx/nmBoKBTkxPud9SUloxFd7XPX3bdyIGcPpsXFYeUoREhEI9Wpt3IHsjXsoRR7V74JG09vlWc8/uII12E5Y8cnv1nBaFTs6FBYFl5Pjb6uLksodReReVJ7ZGIrWKKNjp2iL+Yic4E0GMWffrgBf7RYlQFRciSlzbvwwz31uSghiRLNdQFB445EIEouxv84mFx2j0FceW3nzK3AYWeuZd67eb58X5/oN2FZwZSjoS5+WKw4KC1FPDWWxYE9yb/OLs0Y+V/uiYTKE/65tkQzK5Ekl0OLktkU6BQc5aCcyKfwVKuIAZXN14zWA+aFQdvFy9MrQdnSUCQz9SJxNMBryDnkiaR8KsNzYFDKNGJ3P2C7NgvGOBy2hDMAN28wsS4OXL8GxG9ENjlFvld2geOeVGccEW0X33ac8hWDKQuDEsW9hWDil33GfQSojBpHKIwW7m+2555vq0rmf/9o91RHvCVQABHmTKdZ4N/1fFp4RfyxS1/c6mTTV9/3Uote7tzLYR7cXvnd+cKg4BiSnyZy5GIQgbMU/Kn5NBhlXfUAiZ60/jFyJYu1WwXmvZBXpe1ZX7U51juFGRd9zPZPwoRMbP4CjOhsBQ4wZ2qAsXgKg3wG914m61oppeTxytgOJ3BXsRyD5ZTTmcaMsYNcOj+ENnMICkyl7C9Bq8NMkYyhf+iZTGC+4RKyg8IYb0SZUiqoCJKUOf3s9NcaG3yDDHYmd57KVdVdkdL2zzi0ughxuw1NsxfGvwrtFJ3qQ3wIGV+7zmA7/pFOrRhHdjOp8DvBfVPu2+gD9zELj1wfZiHKtKmGxlDfxnBAHN9TENd4b7AKt15VQTmWswsXuNbgjkdXYRSqKkjYg9gDrDtVQUxUg8B9vthfcUkqfhnJWesRAI1ZynaRxkpghk673+HvI0Ksenv3Twll8LG2ToGJSAQP5TXTqTcjaWdunUgxRr6FqZzAujOYVhotV+qWm4jUWLAETPJ47DteFQp1m6zaaOdct5BdeTzCB5y78Qi+u6QI/W/7RAvjXebeGBfmc5Mt7pEppD5RWZoYkCBYgr6pUYVTKlStrWS+67M6lbhTylUK/P1a37wQjNreaVMudH/ss31G+RvD6q4xMq+0sYMd1uDLShR7lAQN7pCMXuCeox6FvJBppJwCmpc9Hqdz7NOpTUz6x7vJX/UARET/HPZgKTGHTKw0yyJWci7p/DAUJbttyIITGCsjfNlOOfN+PcMSO+AwvuVxqsTvvLcloYl0f3eQymYu3Vgsm9bHrFMrK5OSX2Kzg1eOCPOIns7WccD4jb96hVcOPVbgFQLK1xghxmE8Cv2qwuJPVztBTOMNQaFjFeZLUDKaaBOhIj1nkqDTX0s3NyK8UJ0kK+ikcLBcbrG4Exf/1VY7Eml88DV2lN46V/5cB2Mz9OfaFWonHYQJN0Grk+29a3lx5CR5qcMyzAnnUYYsS62BDFnqKZzqo8ZWd/JB+hJMK27WIwjk8YAGwUmx3jGqDNpptHXerDfx40bzw2seqhEy2Zzav52X/dHj59zaXn1jRW4XIzwzKR1DYGGfYagadhgBXpzHum0YEVH/hFyagKQ9svF3sK6c/mEJeCxQTgI0Pm8rcZRmkWxJBFdHbMcDF/9v4mPD/6DbOrzAtkR18fbWStIKzC1u46PRlHJcVaAZDUjAEPyaanOIAuR8IkedrgyE3pviSjrCbG0eDVPReXeffL/SbVLMBaCpkfmFQnu+DM281p+KOPkka/QIaz2GVZH9C4+zFCxrpi0FokC696FDE8YugcpnodTG6xR4jK+NWGZ3hYlnGSC75UEKsEQivr8wXLMQwMLttGUjdLOfuHbv6ZsWPUTWPQN7arTYw9+RXDPABmnGpkzQI0n8xXzPTW5YCcGyE/pmIw0mCQNnDS1IHeYGcTNdgRdRpOdLGI27Oi/aqO50WSX4iZn3VkDUPmHvfOQVDjTTKR+4QZw0AfMt4mEXP36pI5x5dj9xo+JxhInQa2BPOPxWPz7pkMb08B/vpgzx9d9z5TSgcahfcA54d4Hqx3pAGhbBUt/M3bCyO8aGH3bFtF8Ij586IqSNOcqwh1N9bfn4PUuh1yBeo1vwTtGKIeUTGwYNgIjgADu2Pd+nUp5QT2bbfL3RPXImnjpA3xgzOEGzOVta2XTZgmARSJT/Dj6ylngSVn4b7REmL31udf9KQxLnkYZcQsk4JBl1EmpDbYICWB+Hjwr7SJE+z95KzQRJjMUd94zdhJLYsJaYJZ5XyXrOTchwUCmc7CsyYe3DVRlpn93hek8sy7sDG7dkC+yf7/jbjbTQOboY4Y2VVCiNSTrD/1AzNhQtbTLKDTxoPU3m+1nhM2OWs1DCwTGekqFkQZouGaR3xZeBQqOabisgd25uzljNEKYSNF3T7sOJ3u7IAL7bf2VmXD22DRGgZuljgemxWev5EdsMYFKA/xrz3pEqvoo4YzXBTqkrwRSV1S8xL02p1RF4HcLsljC0hu7RGhI5dI0Y4cWKoYMCLPD3sVDy3Yh1uxwSMhoFEXnrywXZKgJTNsuqFZtwrF2VNXZZ5r+JgloENxFfHR6JHQgcVZ4XH4yb2177oW7T5xg2CuzgzSyW1bOSxz2P7sekY/hk6ofltx3564JCpuSk4nf771UNNf2FJ5JE5C41zgDt+eu+NBYSfJt6S9uE/xoZ4oeT80bOjPsgf7VuQWB5AvUywXl7tN5PTZXjQsNJSdrKURv72nalsb+AlrE4Rw+HkpfdO+qjwfOWJUFOHUO28z4cjruN+nh3vZ1DBtIXi8NCy5C8EC6hNH6rGzDXdnf3MiwiTkv6EJFQVmFHaHrOXmdNjpiMgcxmzW/pKBwzhK3gWnoTQ+JWP8mmlMAQFFYxx2iq10D3Oe8on5ttCwFgO0vnXRWDYaefIIYysnd34+g4dcLnb5lyhWYd+DAMTd0vU4Mo4sxvry6fG47wC3bUeHYIbx5WgkeSiADSJrZsvJa+7I51Hie5/m5+Ray9CHoI7+4SB51VoYRiQ6Wb+geUP+D8fdxf0ubVDQmI7o9PnmuJrXqXipHf8c+e3x23cyMeas2MGxycw3nI/APRrgawXZ9CpstcVi57k28Vm0h7/pcfp21NemPljpVJeCdGYRbvNSLz1MMVsOKliqOY9TUPvXeuyNNnXOAFaHWWwRFiQJ6Kvht91KT8BPZDNYaG2/WfOJes4HxEz0aA65CvotZAQRcixxARp/SA+Jmtb+rmBDN3OcYQ/Rc2KF7H4fRMHHZ2x/RCRh/5aa8zaQt2+SWCNTMVauOx83NwAgeVuNGre8MursBVls2K5xylS1bdxQN3R/uOqrFgQXvcHH/zcXgZaYQQexKdM4AkGSwsSGj5zb2Th0ymPlNy4XRUty6ix6nMuaIkxrdUD189QGaPvKSo80A7uj6nMOcAWYcR74oTP4FKOrInUl26L3giGunjPs30KwRq38A2jcfNvYtAvI0Hyt7hcOBm1z93nktyAvehjrGa0dPgMa9PE5SxYxjuIOvu5C9koI/RoYw/4Z3ifmQ4i5z6gUMdac+Fn6Hm86CG19MqVVZLPDO3U4oY3z15cxI0B3eHQbKps54gnRqKVuKB9SCnGMtr0WwyJ6wWvi2ESRBf7GclB6lCEeCMivWhrHEKDeLvqU6ewKl9bJll4txiA5tWOfAyiHtRfVQiVuRNPgw1gh9ylT6Zy+yiB6PPkfKd/VIM2Qb0FoYfvO/BZNfHrVWecjNESePsGaywWRwbVCH9V1keIvTf8eT0BaBqTfQWxeSwqOKDJ93fBmD8ltgwoD5usVe/3vL9Gs6rz8RU78D6cc5msduf3cD4/BO5klLVfGj5J0adnEkLoX28AALGdTBOlUgI+IbLJCqbN3qKvo6IuVI3wAqK/lovJWRnZj4DbtmpJKgaXvqreQgZHQQSfPs9gyHTQ0qvYcW6ALWeDC611Rhylkf2AbYC4yvYLPIvmooHbFAuoCdkZLo5J46VthltFTw2Oe0QcHGt2S9RD/lTJsP5YOUd6l2nbvMznlRG+ZI/Awi2xWNmHm/6sh0GawRYqtgPhI0wUC9ifjsfcmnO5xeQefcFlBg+MT3EkQCUHaa30CZP2+ZzkV+vFiJ8DhYjFMFkkLEpKGkWCFvxkw7yZjSflE9E2lnD/tLUO1yzM1Z+KyJ4rUz83zCiswHtPiLWIscqG/nozI4OmW54DiYvixgiZKt9YATVLYSl8w8j2uvkx+1Xw2gHGLJb/cMbxH28rbJTt8+Np/WIC2XNWZQLK27aYSxZUH5noYfyrDh7yq24wObhHl2+BS+bAt+ypJ60OtwLfC9jxcgrP17+rf6aQC7+k5CrTdRMEcr6jpETMhT0J44eQkj0Bb6LrdSX002xFUur+uD4cYlW52Pnf6RgFnu+LaBJ5EvUkVgi8vCfF+J/Y3qX5mqQMjUnfy3YMbADJNxpO0R592Xc/eSglQ87Jo454WiPTj8kuapRL0T9HvxBjYija5pKUs0vtcWfgmEaHuEXmAJbE1KjOai2MV8Qp+pHvwMolFDerE7VEyxadxWcSLM9o3XJY2Mf5dIBChJ5KWDKoeOUvLH4AO7FOm8pJlCQsg5HoU4PXRdcPhoKL3PLdFPXiUZHizjOtSo5KKD+kmV0twaPcjImmWlR67mMecbWGBOGTzIJ9J/vjR9XfkHAUF5JX1QSVaI5qSTTjB2HXq0iCKUZ9BC1qBN6S1LumOZuSBcp4Dkakwu2X+dJnl8TcA+oTP/r7HphRz6azJUKpGG7EIMqCim5/p+CuEwHm0SwEEW30fhFVA3gKE9EYfziEdcrApLZE7EVeMKv9iq0/W7+3Xq4GOPRRLvZd6Gr469gokG7xjs28iKZ4YHWYfUWD3l2ilwWkBQEOSK3Ldn8CieuaTt2FY2YRCHOgB7fXIx4NPX2M/W5ny0jSKGgomWZdECd732XD019v9Ts5fFYF08tQMZIrnCCJkd9p4Hwxbpswl+iK0eB3bNNlZ6NJ342LTqnnGzRvlGM+j/S0N7jvux3LSIfAKgQY6KC1FmnzAikdYZ72ilFuDHKdTIe//Pu2TOnG99QN4vyC2ky7bsia5yTKhxQfO3rI6uCG9lLLNR0iknssqicD+udd+CdeW9PZXIMsG/rCRzO+Kr4PuLo458k4MIbL5ioGwUlo5kalhGwqSLt3Tnx/AMqoDdSf0wvDtMmakDL19WEfW3CZxP+xAu6/uIsUa0FgpJxwjgBfWopjrwW8Ch7OzkuZr9nnt2u/D4i9fGdyIvgBdFSNw6Qkivyipy4r80VbOK0ifA0Q30gdYMdEtJdPGQHCUncfQlSX0/P8P1sSeM9chdujo/KAQ3bk+SpQSu0rCJ0Zb1kJVhw3VcNGiW+Ee4Kvt0dllgDT5cF9Jz6hooTf5TdtXWQNZq6DLfsj12jsQZywF4QWV4nHeUiOYhQUBkNDrOp8LVdtE01KHDuRz0ReN8uP+tmIudC3ZV4QqRUIq9ufDXpU+yOpHyAfxhYXYZ2cTAemsac/2cfDy1kvctWcGXomEJCqi8ZeCZ0Hs397/C07xrSWuIHfel5Iwyp+NV95RoE7wXmb6gJV0MEa47ykds+E/GI9Jqxb8W3NV+KyhZcFquaqaHs3lNPLqYAHhPX1Z1SmBcYNB0QhUSLF3O4hGOhpiUgdxA+Sr/fZ8IJAs3BVWRxgjAiywJ7tvbINEVY3zUaQwjmm9WjQPZJhgFUbWZhvOKrYOULH4nfvv/2Iwsl4cw0GzyBj1LyqhuO17Ku62W7RLqD5x/BBIbSlfHKBZL6PYfAqJtbgYb30c2pAJUkNYR12Ao0q3SRnzGDsCgsfQFMr48+fEcqVdASwruiWGuGGvndwmaUH2kVmtU7jpxO6jNXTyhof7QFRNDKsKE7SmBkzqu3pBwK+G0RMU46pOKxae8+LllJfYzuGE6bLvqie/+d0Dxd4pDAgKjXdHa5XeqnnepdjViJQ67NQT/7pF7Wzvj86G9hXZXhCLDEnWwv56ZvURhY2nZxQgRQ7anm+pj7VYeCDp/Ns6RaiCfuZyjrr74vy5gZmTeSHDXo8YGiMPTQKMg/qpQevz+PRLXiOAwxNtxqjUoM5eUWsXb52hyRQDD59MVAWWdWnNi1dOBkdWe2Os9KhUMke7M7i1Sp6Tbc7DFP3cyCvn6KmR7wX7Gjy7BigVfCigkNDvl0F7Xncx5lqzohnTsBJUD7z41BEs4uYV7AR08Ro3D82SSUZeanJVwBaQjYZ7DPyCsQmm7Q1NUkuJbtGynrc9giHzJei9h3PTFTeT6wQA+ofkR75L+UaEpEHcQory40+pGayXkvsh8oiuVdTFg7OYzWB9IDew0rJFGPs/qqSvp5vQ8j5QBaKtxSxmJNVLp0MkFR5cCFxCEX7/8izZg6eDFxsZQVmOXh4rSe+8uqQLJPMfohQd5nZ8YoHyNv0Jf/SETUY/ySd9EtKlr99ZI9Vqg57ppgOdJDh3e/WdDpPgkixu+rL9bbCxuy3ouMrV6GDp0SPA188R1TdPd+QT3rpRvqvWFIxHKCKanut44j39rQ1jfHzgI6dJNoccJCibZfxk8S+voqECgi4VQgIFVdhpF9Z6z70Wvg7xBOISSoDiLt1VdQKSpMtIF+Q18vhFEwBXdQdvNyQRfx/SEljjgO0XQmHuRljydZzH845laBQqAJD5DQBYdFviwULecQMpj/GDeXnS0JZ2JnwRm/Nx239rR+Utv2DTNcu8JTN6Efiir4nZs57ByD2hnubZCpZ4Tl1bN0MCoq8WRND1ria2MVa/isoNrgg/fhTGjxt74Xfz5rLsuKgL8pVffM426eZYABhKnmPDsoVzj9CngxZvhx6csG5FFi09zh72tAEPSke7EgF0cyJfi0MpN4n+vvMFTOGBP93vqb0WuKv4p4CfAUauNihiCBdLaEire5ayYzhrRf8dnZaH/dQern0NgDqoL5wIEeO22UG/y7x409C6TevoI/aGvIn3o3Deoh75A1WwGqVX/MJm/2Af4miommRYsJhMe1bGjYg1HIFyjbHtGy7JNjFSdoHUG0pQqfxIm8Pqv6MI4NLo1LtBuiMnM9ygomTtJY3nA/7U0NonYKCpuUoMZ2erhnr/ssGtemu4SNxuKpYkdBpI10yabLquVm2QZVWxjrIlm956GM5CQdMwqg0aCVTFGopyWMWb3o5kIUBxwY49aLynBoK1popUuR1uNqhAl2+GyEumNvbFnJxM5TnzDxDfb/oesSSzx5TnvQX4yHWsWstNqQBQdAcyLeNFvMcrbYYl3iege2ufddpP+vamXwbjyQxMmr2fAJGQV/wDL0UT6aJp0h6Cya7zyvk69UcVYv/t4nHQSoSjjXD8X8Iv2OZcraca41ZA/GfSYPN6uVU+JnfMhlyKkBBTupWkY5oLUOd6DnT31bMLB4BL6krtli7+uk9+f8APsr3L6fy97VMYqzLHD0bAIMnLN0xDURV7/QVeMunq2W5tQph4ccH/sPPaT3ngWo0VaxjnMWMYWcaYfRlSp3H4JWS5IYLatNxJMdgpGgz1eINVaNBmwI4Fly7gcPsJLuQVppIm1Vu4EYubYxHw5vTaWyN+OgMPv8Z0jjohu/imqf6zRhx7xCrTMzizbcKl6ElhyKZYFPRAcBCEoZmKZs3OztpkAEwbDUyuilnrf/BIUa96T6pLWj3LjF7wctOgeoHjeVRcZra0Hi8hEIZr3O36eIYPNrXRn5ExDcgOPI8E5OaNMMFQiIgdyaXdvNCGaOrCFhgPLaruItI2gjU+iWBTCUCKe5f9DZ2GS4J2unnlCYcqWU4BOLJvr2yKbwJDnSNCft07viEBRaSBvZjKyz5yZ2BFrfdGnX1VRPpXhm9G+T7UvU+y9XEQqEqZoTvJvmbn0ii7VUK3rIbnYwv0qcacW0ubslC+tIltXoyVXUD7MnjXimmRe8oHT0GmRZydqG25EMaBlK6nywGtnB1IF4iJg3RmAlFr1ioMkUT6AXlJ8p2Kh4MA9aKbnzfHxe2b+o2IOF9XMGPHWXCJtIhOM879NJHPQD+qRaKV+fWjHhKFacvaymNZot+9vfEk2hBxY+uCzplWRQWr90tCLPjmH705rmSsdDa4kyPbkJORlxsPpbnB01FYH9lXqtrG6R4IqZ+dGWOV6czi6tF7qv4yC3cGu68kHxCObHzCmqalAgJL3cCdPKAZZMElMMNnwSi+PRTLJnAxaKjzoNES8Pt8V0RVPxNFNjRZzBqKErH6EmSXLlOLLyiR9BtlxoldQ/q9hn1E3ByZL1qwb1Ru04ly7f7vtOQc9p4/iHG6yYFFnjN6GOhDtFQu4sUqk/p+kO4pqQrJ93/nCWS1l1oIw06Aitgk7ieB5oslnYZB/e+OPIRv+TJdcrrtY4noPIasU1ORRcOZ10FyAryTrQop7y1xOIhVHu1T9f+uo5yihlwDis0dlnYkRfLBNRxYNaVAoG1BlbfdneHwFlRCCHThOD6/WA3XqVfi5LU9cK5ouDdPhaQ0HfB6i4z/A9pE1Jmb5lZzW9b7xKFSVRUUe4iGnLBoHcZJkRJf2zDt4w3JUZAN/CEVsiBGp0rqu+DZ2dolPytY7PeQwP+RlEFEyDdxBo8orqrtKOhmA44BNs1HIMLu+XpYMTqBoMm7Pi64B71JHYHwQmndbCbsgqxfavw/Pg/k0zLVjshaRd+yCLZIh7u+gTeQVBBHzszILPXO9e/BIIfVW3sZMDdNJ2XYZC9nb3wCd2cPDAs5PEbiIgCaev9yXdQXnYtxR72XKf9ZuY/1OkvY3fYH08W42FHj5LxZVA0uEThetYY0CdYkuX2uQbWnjg/89I9zv99POBUBr3Vpx11BU6O2ajwuuvWb99CMOe0oELveYT9oc7FCeLgSIwK4Tu2m90CTSgshiihFOjm3BEN9TguWspxUhsZxKAI5a8XPmlhoJis99qhPF5eX+iD/gOp3xj6KNGZvVyqbKSKDP1+4n6ndsueOhtEs/rsTWEWd2qOktIeq0sQNocxPQ0Eabv+Aag7uWLLLArgFUis4v0stwpoYq+pTP7yzVF/WqPmLBK5Oq0N94R0Ye9tekb752fP8oP5bXzGrfGpIdLnm3S4BEOBjQsEsuVvvlxGGUe9XpBIa5zEuX18YW9PU+ZczQxDW4JvXX9JPdNTdQH8FS33QzblRUCOtvssArmOb6ZPQieMNapngv6fsDyRzIjsEhnfU5GcSFuZxP0g0CTFRH1UjBBHWPd4/5dw7wN6fSB/plq31GNKsUdpY0L61HfCYLkT+QqYI2glZSRlMUOo+m5iEF61i+nm5QB5k9aTe7GkJ/w80aNw1BT4LLsc7n9nhpoUPW8VgjcnQBF6UtGxUlbJun5gtLLbKLXZNUGtfY7l8NkrrYIpkeJcO8U01crTjRbSni8ibF32vqA5CGjLM9n9QIjhYzVvSpDkM22TYjxBFUgS+C9jpL7ySvcRAH0xyZKwwnWrEpJ52pEsIEIOTH5IBh1mtLCwNJt1YJ/bRK1p2B/OgG7du0El0Le+aTx8+eZtCnGkGrCgccok4gSiiWmMuqD0vjUh3VMvbgcTSKQMckhhEhFz/OLz2GexUV4ZcNhgMqyr3BmFjQlvtkZGISTqO2YJ4Ab1OPeccjMPssGUMQQ+zCsuwMS9mp/p4XH8bo3mcTVoxgXFRYXEtrrj8dYmoHDoRiKIAUZC/ZjMFTtftXL6817l85st8WvTmWMyW1WzaNQdH2+zauEvOvwPr1DmtuPtUKex3ZJrwpY/GcPe/8UeuuWnaUh+aXQsUBXvfOLNlgevhGMhNmFSekuXj6/LDxBw9GZZRgVfHqQ8d6U+YWE+YjJrXmoUv3ev1jRR4Vgy+dTIc4jD2IlfpbhtltVtzlsFzlS3yxUUotSfpZVmQ3RY5KmtAEGH71SGrSKV2z6t8HrJK1woSmXLMYReBicD+TZav0dbHLzvTSvUIq1Lese4UeLGy3msTPUB6+ALxffnDnFShKAE+kqTDlQLQOBvz3nTtAgwSM95D3lYGKNBAMELcvIZM4gH8MBT2Bhp11TFVR8pE5M4uZ5p0mRR59RsniN3i/X/D69GKEeIPOLFo6zt/nZgKoTftgABrofLn6RYMK3mnzcbaiTTQZBS5oH8rUEBc8VMI42wBXj75Ff6oG3g7oc79s1vqeG79jho7s6PxZPlec9cwXu8298zmtDl17HFYoCj6Sjxg+QbvR8p6C9Xe4quUvlUTyaKdBKI34osHk2N/6gWS24szli1903LePXC+ixXHWB1yv9uMrDWfTqdwyBj/6VyFarDDZgkMDDO8nl8LZKpkfz9k3kla56XOWoY161rVHx6XIJJRtMv12fH0i+y/0NRPLP2A2SD4vKiZFA+VKcPLYH0SPrSXi60aZw2/ECQo13EGJzyrnebmyJfgsvXIyLonnJ6hUAO46hbbD4FZ+J7PnZ5n/pbXRQeHY8In34oflkqBrZ0o18MYOO1hYtWxbDTSUU6ZCHig4O/pg7MjsYI+AqA39Z+9gE9DMzQum5lJaIW+v054X6GapPJAYhtis6ZXfLy86G9NqxfqNboUc4eRUr29LOalgeSMmKTLVAGIDRM2uyP/96qyhRo/mgmN/UJ6aCob0H/mAqh5y34Ci4bBYdPtUGA4BcrFZuKbZtpUUonwb5Z9FH+M4mdcHpxpsAod1X3SGfd5Zp+28PGplgeFlzh1vShvwqGVsFy5U6tZjrzEhF0iGJOg0CI+zD1yLF/JAqDqwC0YpTeY5EF9fmnKK94zfjc1oNdi8LJBeWnvbCSbF1oY4ZwbUKCxhNNYuGYVuLSoyN9EwoKFAKqY3unHX+utpodUqKi2deYJ+PYdPofZ1HpFXQNR4D0LIJ8Si5veTrrGD2BPMRiqTDdDYHSM7d22Y54+rmmFUYV2OnDaJ4oQDrRdqVwY05nB8lV17dtYazj2KDR4xsbb8VndSzd+UYQ994Jbae6pi1z8+VpJKrBilHTaiRyFb3aSokQMYQdexb5R+zavxV+WEcrDYHz3SVav9npXIhCgjsCa1GNRsvv8QXQ8Pn/JRZFtGauKjOqykRTJdC6E52XFcifafJvVdVUpKkp2OC/Da6Oem6zdzoCFUPhckB4CxtD1YupzR2O7Jc1RADN40h+r3JlVEnD1A0b/eFntPQphOSghuncPEfioq5LSHN6T+4EysFuiRlSDLvghVcJKPKacK29Vwm2Cwx4tcUfrbpnLRze5UZnT0yN8pXpHd0YFy3dWKJqdlTti6qeGINFH28icn5VCrF/3o60stNYpNWH8vGoTzrL6QHxMrirBjBY+0x6qDDAbOpMdWurvB/nMq0sQTfeixtXr0r/0uvhmET/WZx67Oj2jyPHIZkAZrB979rd37c5IiweVn/fAJbuHs8A/09z9xpgQLJZ3ykxAhRG8SjkXnEqrm3EV7kVGLsLBYF6erwJEuslt841+8XczXDr/Jhg+e2+AsGiriMC6mkQ8bw9a6wytuaas6WAj1AsFt78yj4LNi1VLjCmM4qjbJJ7q+oHWiKBq/PrHmzM8o7+HsB6P+BGgRclxCC3LekneVDWk97GjrSzRvrj5Qqrc9rq3f5yMvRddqLuMUCuNaIuHVslFfubB7KuvRqSIR5w7bNBov4j9lg2enDNuv/gIFype2hHOAeXcr3/Jpac17U5rA3excia3JSF3L8hONA/xP0vECcUUh5nVpuSCU9xjVoyt9g/Z3XmTf3TsCC6L6YrswCkMZjRBIK39thJBwO10SbVJ1ktElGnMbLNoug62zmLl23HjDMuQC8GYjW+JqlyBl7cYWBGaKks1UAji98tAwNclWK62MYCLWn9BwcMsphJ1AuLkXKViKyQASlbbfFHCYVJyQ3/tNxidjQ8KjrTtXp/HAJcLls8LSS89nEtVAiaQECFot+Yj85+mTEbdIjvZCMix93ePa05AYtpaooSuVt9XnqfEeEbP0m6MvEE9938fGEsGQB7qRLDyUFIkB4G3MrC+plMha0lykrVdqjdpZQaiE960iGWz+s+FTXkI/cj4CLZnY0LZlzr4H9mAu+b2gFuvDAzeJvAEzgWIlQ6vqeSkQvrRzmZD6s/wAACzXvsUIIGy898ugePwHboZ1OgG5to9d6aNkMvcXOkstf8pOSp6b25O569o1CJoDVYI7n31CjjxuAwKfpGt/n+vk/pBvFyrWTdFgoCq3Rjf9edoQPq5pO2rZxDnDaQoHq6bkoEF/D1DenQggN1BZ52eczwBReNzD0++mLoJ3CkT21ecXOMS5dr8N8ae0QGV++UbRW0y4jQQQRqavkFgXaKfhRO89ol51umYi1pv9kNRfIPf92CvHAZjgmOW7or1Ubm0R/y3/0zNw2X6Z7Bh2S3r9/9HoX2efCzlCKFC17SVx7rdqgmo7S6anxxLHFzR5HXVl9CKRe+XXf9c02qmK0YiJr0je04nTJy/PQc7LUuwgg0G7VLC6p+uOZFDoZ3n6qlIO6bIPyDFSfYwimP0NJFncsjgfk6whxcXoCrCrXGth0uj/vxTC4QMeGSf5eI/1pylTkk1QuE/1WaddkD4AUXSu3YN5TUstIviFh7CNf3jPMmFfiClGbjhhSDDK3llXi5P9AyI9cneR6zJhC+ic/z1hXYXgt9o1EenKZNFevuCaTd5dG2gf5Vvhnj729pOLpEKk2XR5J0LZSdEH9pl2Tn5IGwVMQc/xtfpBxeOZuJ36Ng4/6hbJA4YrahUzNTon5YLdmyV1EA2vLML4gxrSlyiBPprc1FyMll+pc11KE9qmcr40k0SDT8GMijk+ntvOspBy/pTlB9sHBgQ4blmQpyT0h0yd9RJ8H/OKNAQ2sBeptPUd9HQbmNsdlHvJkO0zTqtWAIWZf5ijdLJni9WCrfyQ/6UtUrMnSjxfnI3od4sDquQkRnatTxVfb3KWVIU/VbKZ7uyRscNrYrlHSxUoa83Fu9Zf5nZAPuo7JUgICC9XurfLLTIv9f2ywCu7BhjoeF27YvmymAkCthadI1hO6/cYHm/eVE4gpaaZJ8q37ho0XotbPRcfF4siL0Q7iBwAk3da87VmR7rJ1VzXx1NlRU2fQpjCZpTJERPL7SxjIwHt3W3fQUYQr2Je7KFfSzDgXGjEDV/gw7gnWMdlLWbt6Qv4OH53MbtKMFb5IYVv6ykmdUegx2EDzmI0pxL+UmrCj3e49g9O/VG+EdpMWxma3WjeqTD7yjXxe8eN9btigMAi2SHJJ/1ph/4IOckbaTeR5TXwrbe/H5rywuZqEnp8fCHT3C/5S9nx9SfbEmpStnnQJfe/D5yqwqZo0UG7g5MW+UDRaEx5f07uc7rz69S8C+odR4LO9Mkr+UHZfyJvAk8w4yB+gkfW6jHuAC22D5FQs6j4ZoKWwQuT3vQ6zCwi3G6U3RDfmGJK/eOMAoWdzCJvmDSrfDjLW+Wasqo26TI1ejP6PHv3au0pk53/JHvII03j4bwp+GLwxNr3mdZooY9cPrYRkU4v3Op8DOiPs3Nls61ApR2Fm4vrKGlIn7s6+rXi2pbUOzN4+PXJ9bA+90vz6+0Pn09ud5sWmQ+LbZKV/ROLs5mQAc1bAXAHF4o7PCTlpwIqm1MeZlek1ciZDCYgm/0cUtjbw9uckcHZu/EGbmK7BaN/zehNmJXbM2jg69efBq3Cq6X73Tw8XN0f7qqG2/0uDbevT70SfCEBUmVIVTcdrmunq47x5kyXNtjm+6uq+mWIwoYDy8QuTd6HQeBXlBKByh/Nzq96uhRPXPfKTHMRweZpL643VOHam2Q4Hh3KkKJODNOPieaGvPXsXUcWlWY7vI964XtqqeodVwGBbejeQbe+df//6bHmY7S/3llOEVh6LF9cpoUTCY3hDcJV+4dMZRD0agMAT3QY9wTeaAaMByBjoy3029lNwPRg1MBPq65nDCOmVDqfn3YSO0zPcdL2Hd6qhzsn6+l2pM3MmZaOW5lLUIqJTsSP0Lt64mXERoH1Z59aikA+6x/TE88XsUWG+BaE0j4py2IWmjWBpvP3yCEQp85SyHbanv3z/CDqaSL2xib6JMTaqAfxytJSTuWJxy1S5dUVdp4lPPtrAMxoecXC8xSVoF2T3qtkdUoKexR0K7m7hNCR+biIXDiQVQPwjATnRoovLgH4JzsWbnZhfvU/0loo/azUbLQBU2/3Apj6bhccDazpuJ62wWQrpked36cuPxZ17K1ZW+pG42gD3n5z67Ia1osq9tfmyrTaUVrF/c9c/6ZfqvX6UJHiG2lzv+eA3V7fmGs9hTW3USIt6THm1CCdU/oa0tBoEXZp5lJNURnzsj0UC27hZg1KYWnRVgxztMuwrEUBfrTVAd0tRcBmt8G6PGyQnqI3wnaIb5PU3kqeJp4g/NrLzFLxIpbjMryuZJP7hWuSPMkv9kbLJImt/vzfU8gWRnycbc7qOSBw1zHhjP3cU2ya0frpeB0nf5D86Wasp9y0pjy859btUMJoh9iZPTEtJLia2AeO8PFpKiLTbv8kD3aT6BrDVoLO/NTiMrKDlT+5JCKkOEi7sVqSli9SmgJjdfr599WrMJuKRJ3C+kppQiJdRvYLzkCjkKtgETA0yaKwvJ0QrSHbbqyRm/oh2IFoyb6u424tWMurCtsafJpeef7gv7l+KEGcQgu+Dl+oGBMjS6IKkcdp14SV3qVnk6Br4vfgIXo1JfcoXCF3tIFXfCgy+SXvwxjqjyttX8O+LPxqFloqfQ8L6cq9G2M1Po3WdM+yvny1vF9+XbBIVMUjCVgMarVlNe8+ezNtzD7BqpuEhJJF4gkj0Uk5z21FIyTiQWHv+JQPXELv7mtIXffxzkuM6jf85n3eBvwd9nKJbo8teiD1BiNNQye7tx+cm7BncjlKP8cEsjV+Itl4h3xgdo9p55yj89RnGSPWDK3MHB/Br4InpkR+Ejtt2KXTme4iNHSKak5sjEPmPzXYmdJlbsV6AfsL1/jTTb/2XMCyVGnx0U2YALCyeQj8t7vMNV3tHu9l6CWdroIo40J5i/gSFhqR/5YRbwYs4JbmkCQrX9L77LOQYxA2dXQjIuN6+SnjYqsuvG8JcFsc7xfhpbHB/EBx9CtSy7+hdz2+/Hvqkudks6oaAy7fUCJPWplBwggd0mSAw+cnUGX/JO+YTKejuYjD1rjL5LNTuYAdmdo2d+l/sndq1ejepOCkuszuMI222kUqNpYveMm/lyldEPsATpCVLZMlhDhHkdgFF6UdGbsPv9l//KW4v6Ra5kKb3rtrEYtzySvO0N+in8CJmBh+EPRgmMrzennZLO3nDawtUcJPcBJm/5Mf8NLMvf84zQAH/lNRsZJ7DXR7d+eDPlS5xYQr/Sg7beKf5do6xg302Ad2kt7UTj3aojecFezaGvK2zTwfxMxKm9fnBTAioSlnAuv2Ctg4g9jUbABtGfwroooKkOOzzmFG8K+5BxzxlE6notVHMBmxBYqnY/QGpYDig780px5CQPq9/Kg+qDJv0DiWpHBG7XLmEihVSiOs2jLWTrT5KA7cPqCaxvDp1FYXrtzcx2hAvLeEU8+D6NQuhHPrxrYRxczDGW8FqA3iAFleG/T+S0yVBfYm+2Dt/bhHp6TONn3ayPl0R16cGqSLBWds6f93EFsBpKIiSvb139JFleSevEr5/2Dn6abgrSd9Sq8INgOg0Qh6wYEUJuwVs7hWJs/1I36mmJEPNT7k3slnmQHqrJom0H98VWqGah7KaOzx0a0hBCLejwm0wkKBAlX0c5vxj+t+p3XDpntnD7zM5FuWNI5v3fWhzwRqjO51x/vQ7UL+i7dSaDpEOddB/UdOUyDzCDQ/uOOsDTiKPUom2bTivG/RDhuJwyS3Dq10WBSmX7phcddlGYYGYc8fWH/WUxO8Hh5qp6bX4MAfTvAAvNN/Wv42q/T1JfnjQllW9VCm70elG33ZAMpitxXgySga9ijG8vL2BDe3SpgGauDRljonHMxTt33sjZs9E+G7SqOQ+AYDMOevZhIy3O3gPAyFTMarZTGCn12+8JbVloGu3WSj8Tl/Jo7RfgZs77rFmwyrLH1QBk06SfmRa04WbCduSXvvOffEhBcEXmspTcw6I6pneavWy/WhITwWWDu6Nf7bBa+2I2jLN4DudOxd2UO42Fv6YFzgrm5JdYthwQUii4DXskS+YpRuwEANw7yhF2Qxagd7y9iMdXkNrjhmjsUH15NPtEQiAD382Mi+UOY4ixzXQ5xSUS/QyqkQSqWAlMBnnlJwHMx/qDDKqves5guDWh3dDmoyF3OVrusbCoHAJ4PA78gE5iHR/nmQnr1JMxIfyTHKrdEKRlDE8a6RZdItpLH5RCXeVGUaNc30WxYsi7vYU+v6msaFmPKFfp0hDT6pVFvytO++sI4yTzb+yCtGpxGwhzewmDUyKh/mFbIwPT1YjeYRtK7vtilAm9PrAWwhF6f5IssJr4imseHn1oaLXrNeZw10/WTIjVyhKUrbQk2VMvdmx+SoXfGv0NhRkpuJQrFl8ziHsYzf3KTp24qHBa3/l+4aPam+9YYIu08UTdAM9erUDzcvlxvCmAB3o1zPrLUFwcxrIUBgm497bQERLjyNV4+HglbEaLlWe2Zi3+REbmLcfuApvTa78fZpw0YWpxmUOuxlvDzaxI31LhLEoqXgxm7NAduZdGBbRpSzGlJmq5GihiCA43BGtIXWwuoFojjeRSaY/G92NqTMaYf10nXaCwcCQXSeKbo7F9CG8oNeuGbtZlII1UeqTjGqo98xMB9zjDbfXwjYfiCfq+UidcGyv9TE1YQv2mGS/c3lYh85+d8Zy3vgC4cKFomAbXunJvGVCptp6hoH4eHoCTZKbtt/zoxtanxQ0yOT6SjrDK/Ue9t8wnkOjlYo51jp2YHXkSbG5HZX45R4HZ/6ueZI7R9sVXSu6RIDN/P13tESgUwRtZFy9hyLic4D1RpFT5WY2nqDAHEwf9Z1waF8PrTV1BtjNl41MZezGg3zzKkuUbYrw0fM1MULLHHYOYT5BUJ98gl8rO3PQ4GZ9xGmCdpUBzUdB2VtDE4M4Jk9fz1DJiI9jMrcDdvBc9w6sK0z3UCUnbsUoXKcs8hB5gbVQBNBoZxfYk7Kzlekjbnxc3zOC/Nd1SX+ZUyShnk1yQs2GAnO3PGLzXxcdA0bayQaW9YfUcuXlbY5GXIKO1qWSBf3MhhRsqWRf2bIwHH/+eE0DalSYZVZXrNDas1sKe/Cmab4ZSX1VZTxzpEWMa/ZSBkxUAPeoq9bjIsMa9Nql+/OMuQ7wlKe3+UNgzN/9psuyEILIC4TlZ6mub+5e0RuwMmaqUNm61QSiH+sacw4msN41EQrIz1fqLHkIvWfDjdj5vwtzhKsT3wHb/h5oa4eXJq9yMNMntw7txL+1pohUrAXhr2klCmycyjB0a9CS6em8xqs/uSB7zpbPxDihv9xROEPEFJnv3ETxqrfICRVir8kZAvL4OOADmQPLIVnt+85k5LALgsTuh8v5WKL8D6gNJ+dJWovUfWJEFFFNmnatU7kSK/7xMDN+GAhAjOME3sfxc6za3PLq6LWLe7r3+1zoGvFEhz1ymiDZRecomINZKyOfoxGAvTAysdjHXFVfRdxHdkr7Lf0X3PPP3ogRogK7Hkv3oN4lp3KosCmCuNQSaC9dqTjH0rc34p8tJ3lUwSwwvK+lIB7RVvv5Vf1HiTVRXB2Ud8zO4qGwta6LCOLd2G7ohM8LoELm0QFfYFc6H6FsdB6890vwJaCEHsVxh237/MfJgdYnsq8cih+B8IKNIh225OqjuLVLq2icRKR1vFDJSe8YMHWxs9Pmu8/1DUMqcv28IL1tboQVSlNZERiOTG29UhXzqK91CfN96y4XK66urevml396RjER2UDKHTXPYT05+OskOiP0iRBUW4PTSBwjR767Dq3oJzd63cTuGgkbAQ20PTpVjZHfOK8R+sDM08palrQSKs3LS2RKUvdsz03jOCPssxbnKnqO1b+rZHjEgU6OL8t6KCFLXh+BdFujpErmV6zw+55HmdaFmEHPpTaFBC3i8SMAhtbQLe5RIOzur8H/axGNKih6QpLM591vMvOibBfpZY3LFMCUVuoVVVMRuahpcdySgLjd0zLU0CiqmeESj2T24lNy22BPpmMIurzJnt8Ae5LznQdkYfFBFIIbLeKT4u6lsaCi/5omES27/svs9XCGn3m+ZjfryqS6ruERpjO46MzQz6hrQ1K7mULDE+uRX82/NKAVf4deWNGhg/YuzRhcQ4pCnMN5eP8bFOJW+iAuI4yXNCwURCHJdqfGqS47tJLegM7p7AejDRQAZAxLoTc1yEMDMrATE+iXb33q1HV4Ts8mJTvNP5l+H3KeJ6bFQ9ZcU7+Ku50O5IfnnzGpOv72g3pkAqQAqtLeTMGfA5bxnqxu58KCy/YPeiyK53SKx/MqWb9o6h0wvAVXymksAz66cDHKRkxheIUQWgmlSWqg5JOTVcfBNOdSyalH87sTsvvxVAFI/vpZv+U3JuJLh1Z2x2Wy8J6rCXaIjfNWRjXmWXjkxG5FUvGs7gX125ZTjt2nj7tjDjxMR1ec3VBwEVHVfzJn4XZHatxVDQhzgAFST/ULKGmAwrg1a739Q3CiTEexVMdh74Ph3FWehlGwzWmJ8v2FuTcZZ6VZ1i/bCx1vcnaU0aLFTqipRF3cQnTfHABK72d3AoY4ZKFMoTmqjSNh8ZLNo5LgQGljgYrccxIRhWBv6d2SLtsW6W5bBBQJ1FuP/E90oqDSFVx623pGWgMuzJirz8CEvqMaiUaj5QN8GMUPL6DTdKyZwU/W4gbpGIz4hmNX9bf2kzbTAuQgrDpi6ehOe88puDyRvO43dqt8z4V7Dxf693MUoJPl0Ij7HRNLdgfS7GhI51jQVF/QX4aDljAzE3Hi5FRe7cW7ES7ov3DZq4ifrj1hIqHxYiteoi0es7R06LZ6ysOv7LkrjpgAvgjv5JTzazqMpR/HkBQMe8v425EMNsjwEk15I9o20wdjTSzhZyXUYGyV9CnY1TaPlOR/bSbmorWRO8ntmNKoL+9gRlpVfaCGrEpBSOPcEKe2F8BZhmnYp1wLXn15q50T8jizZMAxL5fI5bBPTRrlQmNBilNrWKnEVZVIfVeZckY93wb6mYFzpZ7Gl26y3YoxfqIXlKpslqBcwLfzLEw5c4J8XbVQGtEobPlfA3PL3ulXcCls1+4wy8RmCMPH24BDHErDtToPJ2Owa0ZeKOXoILO3jUz7K9pXiuZCy+h2lSrOpNQl/6Ew6XMS9s0HNjf+UP2k9SyAWKzfNpR89jhwrJZKPdOs1th2aaLE/OXjfsluz0UBtz5L4ptjV5MiMcH++uHfLmmeFMmXoVKSCcZHjaKqxkMwuD0r4MdSueLy7zH3fBFTNqKKMMxckawAj/+E0FXg2U2haShmkprrEIvanJohDikgT6LFoe5RRDJ8bkdv2KmWyJ6QjsYqwLuw4kXMjvfEbyBJZjYYIa/0tYNPsnLxMYTq4PjpDVwQyuyRJhPuFEGWsKog5z3H/XnHdCxpky+IfkGxeYgbMT4BhkKGOvfV35awxWvdnORAO6lK+eMiyqk9YKas2PCOYhNYCtqBkmF2ZTss5UQOa/emSFc7DtlfaYQVODeFQJ2QTpExR85u2F/YNdvh+WLp4ClqEgXgvZkgGKRWLvLt2cWvKkJ1cjD67Uk2BMva7AnhON7JJTkk2/1LRLrM64kUxRcTueW8oPiRaXNOxplGqm03TtN7szupHJ4h8KbWR3kxx1rBJNlvUPbdWfUQ+/qPCnm0V3rpJgOqHHNbThdMj62N52KhShj2oWahziU9T+ZoWqASaqK3jOrDWn2FHPYlCOrSccq81SOeVdFyE2jZoCJAFS5fTJnar29NBKCcdreeAfNUVS3GYDE9JYBdFEivlzdRpKmX6MFKM1LbKuftGCsMjBNh84PhxLiKGyLYVrroEaSRikiJtu9vvnqOsxzPiL9rlnsh6I7VsnyGGLuw98sjs9aTb3HmM2IgaXFR6wbz51o7mJ/1nuOI7Lw1n3gfDuW88u2pZVEbfcuvG0qv6rzMAid3xpjWRTMkzxc40kV+0DWy1T1/UM4iEF9ZbM0pYOxX2F/C1VKgIBP/TbKcY4CB5C8srBO+PhQCpow0F7l3Dkf8/L8pbC/A1eoh9zttOJliNScEwB2mfhVn1F/DmoK+aCY81+X/M/L1A4bj63BZk/PusfW31ayyIqSPsAlS5YBLoOyrT6q5YLGJvaAtK6NysyKx9TDc+friTLNd7zzcYYON8RMZOv8JND02+myE7Hy1y69QsMvbpMimvz3F2xhDiJu16PGAOmEOv13DS0fd/aHBATD1zytt50+jMsAesd6zN3DQfGWBfAYQHKn/pBNOKLERs9n8sHgiJlHDpFfmfmwoo/gHrdODwQKQ56k1jyyX693891/2VnAd4nX5GnNY90vBdq5Bk7hhDivK/xkgySj57eWYV6ezLcoQoxB/bMGle5SqIk9vx7XCE8Q/SOGxiyopAsGhq+hVRMgYfsChWj6yNsxQu3ofNxHM1lM9OIFDPR9hURhjU8sYxouYECH2PshVlQu6HCMPFLwau7zkJtvCWOGzzKQu/cc5cSyyvGSDzvx8vS6/bCJV6sl2pWacv2r27vpXlogArkWk1VzF1xnVshVe6/rVEQhg2P6WQKnTJmtvAxTJn5xwcykYNUBRrfdGo7Dd/gGifZGJLxiIEjhCdVJIWXI+Zi3tqx1g2SvD2/5ySQC945xHepxv578mFj0igruWKw+WgDcPEC11LMXh/DSDWYAlGRmoOvBTpfRGE+AGzUEgW64mzHHUiUOSd0/XnBhZUq3nGenN+xyefTFkvFaRlHqwD/CedDryTNP/iPu2PllE8p6PGLlCN5ngb27uttThzy0IH6kp1v2RvWcxcg3C1jsvsnxp6EWHvo0Sx5AXi3im2Sy/cLM+ka2ODZ4ahRgQvblKqzV90pNfPUPvlxYSwwOTEJu3VKMP2zyLqQUYMtwF2XOahXtxoZDd2abkAXVeQ5d491C1U0Jmx5RoniV2OejeDThKzNvCP4R3Vi0LZRh3iBDvtlM5CAAPlhWJGhC+yVXFr8aLXNF6fnJkZE0IwrK4dV1odaSaFzo2e0mlk8IEn6KCGeU52g6hQCD/dGtoPfGIHww4eFonSd82eeeDsLxrYOqyKQ9Iv78bW8niJeEKGvyPYEwUl+/DAtM3ciXqse11fFy5QNeiHRLQIHCXzmVlinPGaM6/IAvnPaES1KlVhTpRD3ZV0Vnk+7xzi9uyktZdH7UUrqILiVywlL0znfBuO+B2w1FntI0lW7eJw178LDAkGv+CF1rST4ylqHr4jWgaD4tuPZyGHNz+hseL4BmHirI/NYTgtVuGumgaX2/V55qMdp7Ol9Dd/Bq5RqTn5FFIoDBA3IyvTS3KhMrsfgiKApIDovdy8AR2UVCtF5RR2MuqbGGJEbNJ7iLgcbJyuNHztu2+VPDRBSJNwis6rOa8ABBIlUTcPHVpjV1Dyd2x1ex7LIMdCijWg3YSMvVCTqlN8tV8I3swSXNCrwmZ48+65DQekpKzsMIpYy76npMogKSTiFMaMgCYXZ/Ne1D1IjBnbEw5mSWxcbDWlnTgXW7bmA9lyV+eS9EGyXbcFeUerw68ONOmhYIKNik1q1x9Gdjbs2L/xRgeNVvPbFUHkMPwIO3gU6SODJg78ewkdbd1YjhgxEVRys/jL7r/FhtxSFD5p5M1+rsvwlS4rey16h2dOh7E9ibFVdlLb8N7EVMOewEMFjUrE4s16yaDEqHeIHgcAauc4hJci15ca0fF3KAuSmhwzypxws+UZP+CQkFb5ktC5NRJM33Vso533135iv63tGXsShUAYfYUkM/6CdVWgM4TtRXctn4ykzNq8qADloD/zlXnvebTYnTtQZrAZAqw1C6kyRKHF3HwULyEF0qdYMDtwTCxM6HesHrjWkyNORYFfRdHXeeLHi6d/SeUdjpuZpZyX+ldnlIPYbBAdEFYcoDEIBS8onbBqAcX5HevBc2Uqtu6R8kw1DEm7oW+RMtA43bLjEcb4/nn+aDxv7IGfImzoh4qZC7N8oXnP9zzWWwtwnyQjLiAJn7vZjfXlZGHaKVAiRB1q32XBAUxBZDyula5Vk9g0Bw3tMPeoWxRC3Qc6A0EcyhSUeoFgo2lJ+qvcQEoA+7UCwNl1COileoGGF1nY2ghOh97j+/tBMaUFqJzxj0hy5K78Rrms41ZnWeqtI1r2AZj2FD7zt6dqsIAdy0PcUoy5mOpEoMKWCv7n20k/dzmVNEVPwqXBUGGPXJz0UlTol8wcEk7tqHT5YOCqshSmYDC35wQYcVK2F4WkcbYZmrHPgOWUxbGZyxXOgC9GYk3MgxI16zd8ByjDWnE/KNUtrEppXfKdA3zyQfJ1V1lqbG4ssVwQJ9EzWOFaPy7k4bSuNomqL/MC60vaJHlWyA3ze5V2LkF7jt1/eBEjvd7mywzHhDY69UsC6dnqvDAr2OWuegPeJ16p8V8nqE3VrAD8jAx18yUOx0f2gFMB3yCV+KMsic5pcannKvWqJOoYvZ0c5PbiZ5fBsDxwq8nzrgH6Bgf1KiF5RMWgtMJ75Br+mtDOT6jKooNJfZcaqcB2qZ66C6pP8i8GQ3EGzWn4s5RiZg6FwOmBZIL98XdcDyoRROl0pis05ySoOEXkjk6mwi5k+smYhumNQNwTmHd/kH4Y9eSOfCsdFiLwgDjqvtVnBciqj0l1lhaRKe4S58qE8qW+IKTA5XHKN6NB0GukyRf7GRMVqyy50QZJbhx6kmBEb7IIusA7CECZwm+4ra6Qvrq+bUcikdk15EtsOYqD9a1phzw18YqeSDkG6JxjkxMw0NA7stiT/mlrGVK40M1BQNyq3DD2HITFGL+hgUdp5hSoV1xRTA8X9bOe++DG0LSkcIoQ2+HzEzGzTxIW02gxvsyiaXCQzdwa2mV1INwRBwRUA2yFWdab8avPuJuvj4xfcGsZPDXBJo/oYHzT+Q6AtNbRrDc/b/h5Lcjd79Lu7HCvbA8h4yoFPhfckgvE93gACWfFgrIDWX+9RrzTPNOcjuxNYoOIv9zNeuhDl29voQc0ZSqHFTR8YU4PP318351XnaV/ULot6YckX5Mbv19tdUyMvBiSGXTNlFIPceCRhvejwYL8+42JdsyY8ZgJN0saCQARLVfHs6K5cNdoxOYiRar/1PJ608UlCsIQABdckzJQ2reEU8cqk2HQVipE767ILLpp1UmdwhugzOaVyJV21A8mceyHX320zqGL6Q3zKE1lyIdPxGgkuKYvEYjEfpUW2aQymeN1fiN5aXLJrtOf9QKC11xl3otKkkuMVnskzaPdp3qix1J4yS2wNuPEAI19Ot1ssmceT2aGxKc+vquzJG7kMziOcNmkF/dt1X294Oyoaeu9UGlDNoWq7c+ePp5Bw5A7JiHLmP9tshUOadJJvtzPmebEjv+B9Y06ev9yqYb8lZ7Y7pORto/50rlICy9iEisnicfICVHplxVAblszggLnVQqqpxA2xyzg6YuNA0WRN4aL1FtnIUCiZFIKugyIVFDtL04MyeM3tVujZS02omwAFFUdgExvLrQVbQovE8Pyh8xktgkiFsIh5RIRcgTjx1AjAPWLOX1u748QlckLGTORwWNESxEsUm9XRJPiyTzf6v4ybZ5n2V+I4s90PiPzmASUYR8+jBO4iwo4TAR/UuUu+d34K539tM0fNmI6UBQWeJYw1YJvXsLUypYBxhFQ4aZVTHMq8q3NT1CWdh354XXf9etlapgD0ZL1PG4AsmjfZEQnQVPD3dsbZzfU6v9X+PmOCQ0RuaxM76pDp6G2ZLCkpxH9szXVwsaEf4gbc/fcqI1O+DjU+hxe2FyDQNqNyJ1fGur8iSWjgtHZ6IWKOSeaudZaJD4kr0FxWsV7azKvGGd7ucucu/XfwPYsWaU4p+X9trj/KGu6zBbUBrb9cc4LTqtxKbUFPmSBVDtlKJHUZhJ9BVCu2ElyFEjJWVMrAlT4U+6UBXSgeGKH5oHMuhjUWI7UVdoANuMSeVhGPigfxXnS/mzVz2V370Acjmq9ON4QRARhkAkvtOU+/E+nSXPuTfKJDBfBPrb8ens7azxEpBPbfyY8wHSbdwoWsV0rntZBEmwGuqLXUi88XXYUvl+D1nscxEfTzlF8AAoW4HnQ7IGw+FMguQSHmONGBEabxEwGFdn4mDm94rEkSJmF+KFv+MQJ4EWOYRAzTp42eZ6s7NxgbBRYb/vIHO1DlcfiNYR0xeRZnE6s6w9/zHEXce6FkXJZleSTaFqOxaPEeHzzjK+XNSZpsS4TwYC1kRfkQp2ojKY6g74PY8wP094edEjdvFLVz1NNFNrjmBsd8Erdpceh+BeqVXN+6ZZ4SPKBDrcrkGf2ZBA9x8onQ1vNQmi4FgQ3SGf/aGWSPkyEmse3OaoX8N8TaXQLIPza9h6qyHqZPWz72e0mB/rWOB6MbQTSN4fscR0p4iNc39tFqpqEO0nAKOEFXsLHuLi137Uo630puO3Zx2V1aEiUD/3pUE1aL8UEyORd5EOrm64NXioflOCN/hRD5dkhfH1+dqoNG7MctDjpDsDDOKh4yVY4ouuaMu1DXgc+byoAnX+LClR1HJXqxi1GR4eLp+1975O9ENYlxg0IHt9UzXWQ1rYNdXTqZlLJU/vBzDl8PPt3F4jo7E4hS5rqimzms9LZxO5vODc3unmDtkC2f4FuLfc4+gAatiyfH1Z2edm/ohLIRrBHwB56cXEZ6zDslUhR/fN8ubnCt849jJROiz4omsxwx+hiuz2Ubk8ppWnwTxMcCuj21ZJwyFPTp+owvJy8+VgOepNCENNt4iVb9K8lbEws0BExAtUY8xbjh40L7EQNOHgSjTrd6ocQPWvRzBHhHQCHsvWk1KhfwqqN7ErdviRU8TfUz0wJsS0mUVkPy5LP7d0a3U/2ASS8LxrJlXyDZfmUZXY5gxDoh55DBAsuc6ilz7y3nkc50NC+6A/PGammo1EUT4Hu4nRQr3nFMV78kJKdop1dE8OcyHBaEk81G41QorWcv5Fe5p2kyZ2yoUd4M0LsMfG2ruIT/mBPhLXrYsT2MzZVenwKHX1IimNSv/JXU2AfQ2v95oYg1amfZEcnF606vi8arpCreHgqGd+I8iKFMMTEmYiNaf70+Z0zKnyld4jCmzbutoaD6wIZlSk1Wqpe7qv1EslOmbuPK54DQ4j/7jasvW73wWFnRKMCXbqFrs98uQLkigHmpBpiODTGjNOxUQLg47A+xAiG7MqM+siuTvF27wXvhS5olMwBzBtBX5YnrfUwugwObTloyrfkl2ywDwKrhHk2DuMTvu7NSzm5isUE1Tn5IDeOayusd2XI99qAwEaTkufxYZNY8+AdCFNmpAnfiVCq/6OnH7wWqdEBPNVgEkV3jakeTeYuiFrX6cAmi3pDrGtrh68st/UJ+pB/qERXVk27+gsjmgvxt1YPEYF5AMm72VucM7ZCc3BjizvwnV+lpqc09Hcj8zO9rtiKv/GnywW8/FszFKVL5XNGNJyUETf/TAFUKHBIMq3gdLNaIzzufrO1rHVvdKDGGxNCcFr7fm2teXY/daiigQvGj4P4DICMbT2zKukTXaotHsH91aX/ODHHlA48og32AH7louuTloXOtGaVWORkvIiD0iNOA2iG2SA4bI+fQWM8ye2NDHTD9bZDtUKA/pu1TIpupKv9dLV2eNQ0SRHCowrmDRmHGeZZu40BttluxMOyznHKnnPdxRDghf/tJNS3s/lBTHSwcN+atKd22sfT5gVqmZHo7OjNxhVWYsmycAjt6oRtsbhhtIR6QSJ5oEVGuZmuU7iO1DnB/WzJZdxD7nage/5J0fmRH2Hde15vql6FjmnUGqyatLt9SFt/BuM96RruXGfkoOrekbIDYLsDAS/qFXaASM8wc9uv0TW+uIHNU6pzLUGIfwoY+W7R4SvfqREJX6jQ+SUpFw8Fy8T1yuEaBv8wpCSNDayxoxjLlAdddAEE/lU45/GpevYJx7wW8xiZ/vNS5du7Sn05+Xb/uKNGO5zzTxb74z/YMs51dTAneb97Pd83+rKkFMJgq35/ZkEM5Lv08I1DzirPKuBEhL24wrPshjXZnsl2qYf33DXbdq2AxfNWadAtalghDyCaNSTs4DiO9tQ/95RafOuympzymFn5R3L7FrOGj2FvhAiYpjOBhte2RqMwZSjgQ9cWbyeeBJFEhkeyNf2yU3teQp2gumBctoTFThWC9rEpQXW8jmnzqkZbkkP2rGSX/fG9nPuukrUY7Uyalzr/VOocBQYOhkz8sllTPcHAih1gmIQMW3nvxYta8L6dFY45tEqYjPQ3BVLUoL0JPXPLi7iox/+J0vMohK4rRaCIeYi3ZvAGRFgoJnBl9aJxm3D8ejnTqRF6tV7M6wpvDf5xEqfS6XSsge7tpjtqWW2BZTljmFYQqvaOqN/vGev3yCeVBmV5quAtNcpfPb11ViFtXsrw+0qrs+eOWwpy6C4DcXFvCsxcolX+GUcfLm3WK6723aPVKeAiyTclDQOwrN2qGCO20j5emnqYe4jIu/PDNfwmK/euKSZEAVni7b7q3wGzj2lxub2097WUK8xb3mzSbvtnhkJKzStEDXD1wmj2rLJoYrnrUCING4auROziVDG0Bv/MmrRtZJRlZ/ZE/QxjmhzXNsf8t1yLiEYJ0FqzJO6IlIweywkjqnAAXad/QLl1niRQ+5vd+SvazjICOppcKY7+xdRHmFLGlkwCdio3Cl3Wl6IopgIFBKNMiCb6WOhFQVmKs2c+IC5nSr/yhY4JjhbH1pM7TwliMePY3+fdBPIs+Q8Ca6A9bSiIqQORIt8rz5Sr5L3DrCIwemBRIvh5eG6CoVbExHBGyZNzW3HUuLTJk9I4ouWI0G4CNsAk/oZTCZEEQQwF21V2eSBXA18EQg2o4eISbtaWbmwF+0mPPMDVkZXQiYh/jOp+PXhZH2fP5k3NMyoFAAtTpqntuEVsA19i/cgT4PS6/qwPElFvncJjooAbyPe/DTYQHFvv4UWgHqURTiWh7qzjqx34N20MCSFNndyrRNoLm42MQhVO7LYtc6ajdcg+tP7bsfNEGDfF/WYgEXpDkEyUQzqMe2MdhAWK5ILFJFbmmlQ+cpKoWwzh76Rqa2lvTaJO6FWBcv0bhv57FaFU+n27TpopzEiWNQ8fI0mGUqp2Yyw3GKdYJL++SmWk6MCjV6g9weXeR0htPCAfVb15uX2ffRtr30NTGb/ZpH6ys6MHbpwxWQ/FFIDwreKwQWmWwoV++JmtlP/y+S6tWnSCfeEVafqHO/XquNymdQOu35WtXaWTlJ45QgM+PsaGpndRfqDBDGKn+SYpr3bZzSdLfPcJNs9eDbWLP7LQYXG2CBY5PLxFNzGvmAMeAKgOGgGRX7y++wBPyi52chI0j3eGJy2lU3SQMLsh+MTMqM8NaiE502pYQUpalmURblqyrlKHXqIYQx7N6P+nOlSCa2YI6n//BrKff9Cg+RpsjSTCJxZUZEWgqiTOuPTwHhr3MQl9CU0W7UqSxMOJsIYb0bX1ifAQFByHluG1yU/0/kbxQ9Cp44NdtUZMYBjZykGrIbUORNz6gRO0q67sXl25qwlNG4Po6cbGg+8FrWSC9bLEUaw5Ree31yNGliZm5pfuu9n2hCQZEq2QuP/fgrwhTwV+A3yjNWpjOBQBkDPSrtGdgXEzDKAvVKm2CWREj+nCZRy8bQ9jJpFk8m1umBluAtWLm6AvmTEYgV5bI26yQz0B90Lg+9Yg3c3k4Z7WUFUBNfKkXegym08g51KjbTLOTaVNrMmyi9qpyDssrM4/ylS5Xv3mwWAEzYWvm9tV+a0Ke7JTVet6eVQSbIJKXY3tEWur0xkHSHrYGxiMvNX+j6FZGzjUS2HH4Q4ugxwO2jpEAdGIY7+FsERaQM//sFPq/xA7nhxKqX/1QP+JPISuu4FxnNiTCIt5T4xjKHwKtgCg4CDf9uerm2MEefydUf60jUEQqo2F93u+LDqjEZde0V1r74l7w2MIYvHAvHQABAoBggO8zp7e2/dFOEuhPnIRcNaJgL+cdXF5r5by+CZiBbLdxJoZnXN54FquWOzqIDbZkx66icm5iTdltogaTKDaUJrQ4SL76vjFysmiaSLxWZlgPM7imE9LkdwuYA45TVcKJ4M8RdilVN4b+pYMp0Zp/4Ex4T+Q/kvy1IoW4W+DfODf+7g8d+Hk0fAX/9ihq5MEU5ZtKDipii7711PWPyN+GzHt0IjZK9ryvjV0sdM7946LjME4aAfmD6zQbZgUVv9bdLVH3qropqXOnX7ziL4T3Yq9yJ06VGquSOFi3QMI4xUyBZwVOQOYCI8Gx1fdH9SKo5qkcKdDiqMJPMSLb9kCd7R2CzwBWwH/09EHqT25yLBYptNbZWuL55H5l+h8yHlFfRYaAFqa9zaiHiGBTxiou6XCMfP+Dy7K9R+S30S5yzllT0rNAzAqZkI2ajgeaGJGnCXrs7J9JjEC4wvJDem7j1qMcF2RTchPGpcOMREIZqVeUzSWsFv57saoW6U8RcWzy4p5SJazHHMcKkDHa7D/tWktciSHM/SnsP+5Kq31UMK6Y1pp30IghKBNEYPpUpqEJm1VcNVShJfXv2FrK1X9Hmr0SZWvoJ7vkAnE2lFGl97cxGE9UJZOoLEbwtUrhf+KecoVFiISLJ760TuGmlB1ZGO/cMFW8CMSR3yIak8CjI2bs2t/Sv2HWRPm+Da0zwr1sCJMK8O+9jpVE/TKb/p1UJHd4ion8AdMUDQQo3EDyvg2mPgIIbSC5htab2+ebn3TXEOvO8Jb181xiTbDkQ6Fo9qxwODIH7tRoFRDbjwQgm3FWLMqGP1QliZYQAbJetity0qFhQo+86zOyaoaqObXJhkS1rEQWm1LTP7FbFmNbSHCa3QNe91sGCj9sFO8e5DWMZYBYukZc0/RdOlzTLH24hgPcbp5e0PTwzeBEbE5EAGxCPsNNNqAPJckl7tuLlPO6fwRQC6gTW5/Eb73HMtBG2mEHKpClpT+DYy7pY9z+CEkVV/yq8pYE26vvKzdcbP08D73w+Th0uqSLaERMrILWY0juLyb5lkBvQCy4WNXTNuwxata3XeuGIky/24thAFB7dONkeuR9XXsbMpU7I2snKmcIYVvLREa7regnrVi1uygqCXY8z7xiK3RLid8TXJYzoG9/lzfBdifJFWaLkb6UyHg3cMLeSXfnYuWlDgPU1h/W1DCtiwgM1DqnvaDGOsFSTxuIFqhESEfeSHjQL8GGBZS/KhfjXJF8aGPBkWfD8aODv9ocQFUR6Q4zZKiMNuh48GvA3giMmh3Lqqwt8GBsSdhN4t+yki9zdqZAHeiIH1leqNNrJYheZjGMSPJlNNHdAU7Bp/QU3yBsv1MbZT5L0+tKYtI1f08BCPbr5U8enRPX7eZosRzXdARNeOQ0LS70XNwkL1LhOwR7q6YUw9RqpkvbYOJQn7llpXdG81Zegsd62MnU6tVqB2hO2QJw5rFopWTJMebkptn/ETaIhQMemKVTCVZf961ZmPO2qnVpBPidy0V1wBuGQ4D6I/FB2tFoM1JRg4Fl6wd9TP3ak1Bq1hMQ/hAhnt9wZl7qFLO4Y4ko9ZX5Gb9TvvRXD6CL3+Vv68kVAun3WAgq2keMoF1hYUyTZumaG0iBobVjL29UUvaZ50Bf4JxTafrfiw9gmsjCkstEkBawAYjjrapCssB4NZbxeSU9mFJTcW6R6/IAurtpQVM5BTnvppRm8xYsbYV54gR6RkpVMmRwldp4fqHDi9EJtcswzUsnuqw8eI391S6RK7HJyx63xlJMLviSZjeogN9z3PLPJKAROJzhbGI75uHl8Xe89kDn+u1ZUbNCeBst8U+o5kNEjPQVjYsJhEYNwoCwZd8f4t7W/2orob1AeiBwbAqCHGg2X0x1NuOUV5GfKqkxeIgWdOdSywKPAi/yRjJppYfBrcrEiiyHyAtNr4jK1PxdabvoDhONgmCt9YmZvWpRC1kTsTda0AbTWRCmqUf3YiXgcmY7PNL7lupE8V6LmT/ZgOEMbOzxNDYHVdlNg5ugBD+cq4BPsLsfNRSV/5V90/C3NGR/mW4EoVY51nEvfehaKR2Y0ap6ZyV4bp2078qVVFCoykP+zP2SUOgHrkOaB1u/yK5poImWAoRakl3GCZnixhoM8ndJNTz9EUNvSSvcGKYqTc2oxFxZjLQOmE5SQAv5p2UX9Iq9VTeTNpZsQujzh6jxjcXpa0CSUkinWRsXzhC/vznP64NaT53oA15tgBVocX/0F3DqjMCKZqGw2GEX9WK0xQkc8uYtts3ceFQbT9HDUDdVN1dznuhr2TkSlp/VoH5NiNTcYLB4cu6RVHjsBUq3Y+baRNq/yXgv9vLrRTBaC45nX0w9C6UzMhRuFsT3muFmYPH7cdmvfG+2+8QwNA6G9Xi8vcXep054tUnw4g1NtJzLsv/8If9xvVG20zMbCDtTb0Z2MS5RI8KTtNbmYz5zGxb1dNppDXdLbBksPIPONRFJpGw5udzmtoGrwq4EUUWIaawH7rEveAu3OWEr2cPrOSFpBlO87UN3bnvuQo+ijsJz+FPj0Nq50WcdgPIwoCRcEsocsSNXf8JYREDDJZC0NjI0PbFWhs9XirU6ft/tG8SbxB48jhVXxVVO7Et+AWkZyrCLyxrr8Gt5yuJb1JJeqV3tEiEvJFwhzeHix/p4tMdP1McdAUr3BUJMgzPUJeCzwhKjtAxR0vjDqrMoRYRucJcfCRvg7fermgJotZeq6Nw/IbEgbZ/lVOLSEFb1gXZ4Sa5LSWWdmg1T+zEtXdHjt9PpK1+8kryuibPQRmh4iF25abZHKAWy2eeD+FZGT1xIhSYJLZT3LJlgUqIHmEMM4eb9zF7ShmbpGmsOxixglbm59vSD67CKa2kUhyhB8FELiHOrWU0Md+BvIaM49qn7J+TtD0oL/UgzxdQScSeFyjD4a6XDpo6zqZbXKjL9JP5B8nHyepzdktehudM+RgQcbid69ZesnVP+7cAcRuHGVunmxo0YHlcJjSNBJKpHRvN3ME72OHzFgLrFQyGY83eaINiYCpUJllb5u2Pc/uois3EQH8tqD+OPRO5KnK9XBlXC0fs7RhYN42rE5YoMvP2BjrkwtVojXX04X9wUEmJD2DLAxDP2j3kaEzidSokSY6pDfHpVO2dkAqHlCuz+vnZh7wAwGlwP4+CbDXi4FWKPGMglVbeQ5Koe4xVRIExwrY+S8fYBmywN0TDfszNqVVG79bu0VEwaqxiPmD+VWtu3Y6V10hr4psRnmTwuf5+HnP9XJgFHVQB70Sa0sSO7b6OyVjGcY4WmHiggfj7OL0FOiYLqC84gg1yE+9n7u8VKvb9u767AhfoTWEAJL+RQtRrUBpPRBpM07BKPB0gLL2K/LsXwDjLS9ZWlOWks6BdLYoHzefjnXzHWpyUiNiSO47aF+RP0klSBjxM8aJf8o+KUWRqcvTPICRG4uykeT7hPvjlvMrYJNPErNPy1kInsY/pKSai5rgEYIrTN6YpxH63iuSFnl08ZTketVoHBbc0IklNh7DSG0TS26c4CXWlJY6wKzqceF5mlHAP6X3jae26Vjm1/Q+pif0kqZ7dXBXfGI4yvitPcnAYR3ehLpx8+kWX4r75cmV8M1insk+JNaDDzR8XYlUUII/0ja0Kv757/rj4dMkbv1MPF1hYCNnwvlPu9rYeUwluPWoBpCawP0JUGVm6JXymDhwxMEKB05CL0Ec0h6WEDrH/5lNL+YnKed0l94L/ru5dS6Zw/RL3QSW+S4CQCiFY6djGUgWGAj0uOjx4SY5Sw+rP592HZUkTd7L6LBXI6BTTWGc29qlOOMtwnSgqJ7XUhJaXno7xxVsCB6t58hvLzYEmY09vZwqlMJ9fx4uFHy9iygQdutzM7HsDfNZwnc0M3EfDyZNS8Gu9RQYQTvO2lUnXlcA7DlOAblTwibB9Kb5qIe54FugeKnB5gCq//BoJpz46agCLjye3aoQG+HM9iHZoiNytLR29zy1TKHV9uWysvkDpXZSAth3rC+9CNrhJhX16BkCaa+dTz8C7uCIjDrQ9UhAIy2l0SSnZf8Saziuaour1Vv0JvzxrfACDSLHlW9rueidGLcdp1/2XP8wvE7k5VG4JdaZ594AYmDO2Kk+UGzin6MUp+hjWWG2C/UfiBCTlhG2aLGypbY4MLR8Ctb65bSbkJZd7lXkj03zzpe0XQjDnF8aP15zD2Siv1DjTg2zPJ3VR9mbduTAJyit3i8UstD3DzV1CfXrr1GZjOMEdBG+X/ewAjwnOrr92sOX5vCdcpyyBzgp7RnNNuLSEOFHknq+KYkEItBCnYqURC/RctQNHahGAUooLDTPyR/dz9s6gMy3SViBYuF9Uy1M81JLvbqPZLenmYe9SML/b9+LFTOzdVIvFW+oqrcI2e1KkzT3Y370iu7cyp9GFqWzSrL/eQ6SkOKGvnbXPokZsiPIo5guR9AYEe12WNsxP7MTiWIy+Dcgav0xYt7FVQS9W6Ov7qCBH1z/0S5ITjMBnSMN9EI4zKlyqx5NkO80OI1f45aifNFli0no2oBfenJaiWiBjkS9aDeHzePXo0r+/HINejUZoheoaYvAwmwwdl5R6GSmM2/PfJ2JqSvh3J24rMVj7T2aTogNUq9dy+s9vv8yMOuX2mrHJRlHaUPhjHtSuUsS5EbVCu5bTZKojQDAZhA8UVhjaQEgLHrxl01bQQXjpSRi1WOj6mJA2PGaRvaKh3j7I6hDXk0OvJmbrOfelLO0skiHWCAXgw4PsEr8oZXbupooP81nxg1KTJ46RTsvt9UQygXx37qseeFFcJtB4btGeohEaCX6BPOPMCJjm1eCB5Czs7TglGZPIDCVOpOqRi6b3XkAOV70QTRiIGm5SdDikRJKAB+3URMBtJMwqHO90WG8WwlFIikZGSEnivm3JS6BlpLt8YQbALLx7F/9rO2skSxMBsPCGEcinBVY0ARaG4P9r3qgfZw29+h6fWzV0ShgwAqL8ZnzGp3l6mMg0r81uf2C2nS/CDNfrBWqHtk16ju7XZJugkG+WeGxExh7vWNqXLzJMPNJg4YLSH2jw52eTkiZQOQ4SjOA6YJa0Am2BhbwgD2MdBac5F6H11viBDxzXlbb1A4Be4SfYoTUT/D93DTlA7Cr03f4cDVofxrM4zr9JmrGBj3k6zgDuCCxXA0Xi5CEl6i8KlNopz9yMvWodmxRwa1ecOBwcfoLIoEcNOXXw3igwH3k+88Rd2JvQbI/aEpCaaieMFWslv6zXoFuraQMWp62NNhPQ3YG326dTNZBFXgfoklc12oOWc+NsdkLVG7bjAvfCLlRc07t7JMlrVyPd6dhRyn0nwBYskxLMQvv8EbVNZBMy/9iIEl7X7ThfTmaoTQS0m+IiUb0nx39wEZnzAhLQM7eXm2xIRAuaHcPo6HlwMj77U+M6rznzXWasAdpHQugxPXlss6uEjo3n1REQzVCN8gC7cBA9gzFRbFmWR3MuUrD+dAzrdGYPOKyEwpFpZFvXpzqtyz9KUgvFz1vW/l+JguvMzZp9a/+gjeOkSdBzZGcsCeurl+OPI0F/yKJN6pQosjxaaDU3GloTdfGv9cz/Q0K9M7UbxzF2xG9jpHKVd2EPg3h/SAGACakpc+GsGyPDmItgboW7R8iYaT+8wS9bpUAlyFBQn+NfD1MOpbS/1ujf9uDXY/tatHJqwkiicJvLla91TdfdPY55749P45cHOG5+SCSveAB3qBfBuv7tSuXZmgwv3w8+gqgcmpzhx2zDG0C4PXbZSEuq+KImk0nYdeWUhw8LThAKvTD3jo6gYZekHwbY8UOw0uPxRBiAkNezVPH0oUIx9uD0OTnN7Ly991OdlFNMYtG0T7O29uV8rBATuNYXYapUk1Qzk+oaIFpPkDoGX0V8RG8wwNzqcbG/VX6zfmXBQXz2eBjimlfbEmANrmC1wGD8Rpyyxf/rjJp/AEmfEOV9jiZ1Ik3PV18eMAjtEwT4v4w3aUOay/rdixtso7hhJ5dcV/Y0u0cb3//zxSFaRvjg74uXhfB49XLuHoMyrxiOfXhS94Ojlg+44C1yzpyehtpr6XAcJuLa8/K9qTurmDSvACHPcWBNSsKjqXNI0nHyQwN9B3J7ezGN3i+by9K0IvTsMrgEFf07aGy+5tZqe5gRIyT6B1PAI2hmipS71CPNBgHLv1gbKeJZI0/osEfbjDbpyOVTa3UNyL4MXW+f7Sut+exYhKuDB3Of6nWc6UxCOsC5cvqqQw/LMQtlZxOhHGM33huNwk0OooS7ncv92/SWXaHsCFLU6fwEm7gBc15WEltZgsEijKOFU+CNwsqiSfLZCUeeSzNv0UI50S/jx7ZylCwtQMgRz1iyGdtIwm78GJxI5WrnAOs0vwO+IWgXn9pnOnKz7/y2G7GtoHXrYtD4VEPGxFNh+GNo0Lxyy7lek7aeUay0axg+K+vpL+CP7LurtcL2lbM3IYiHJFg6NhwisAK67beRDwjC9F0jH8xWvWA2qaVo0DG3qx9mabDC103rncVFARh7p6E9dYR0wtf3+N4LKs3FmYJTeXcYBDd0qRfR+apRYCbLVHzKCe/acb2jzF85GqWoiohrb4Coi7kbVb5ZhxcNKoih1xs1U4Im0p2fi8TfJOxwEIYkIlOyMShcw/uZbqXI6/cjNwbCt5iy55TxJd2ESE468wGkT62nHJpW1LInSn221wI6J8pjEYacrgQnp761QIwv34/f39Lj8tkrDVdUb27FvYOt/bfOJXZDh8EGTHFw+OKSwu044LdBwk92lSbGZqXBhjqp2QSOg7u0GY4CEtGpMxvdOzwd/fDZmx4IVQDD2ka9yy2WVMu7M1/Y0xV0J7tzxOXWPae4ucJ4tqZHqiDJEPqBiW73/8S2znR07IqnGqCq4c19GoATzrVpw8l2LM3l4Ju1uw6eOST8kxf6+H1mfZCsTrdf7q7X3i0Fwl13nzn1to4DBUynzx3HfUAUFrcaiTQgx2t4UwO8pf18hR2PpFcg+ymIYIQHW3i25kCG+dU262G7zn5yoLVdIOMGePL6SUhz70BXfJe8kUvK6pjul60oyIpRBiF5D+VoNCGhCzAFyUnXpYhhvx4BNtsd7J6w6gH3P1aHneAmOe7NtsZLXF/9y8OyamShalmOdadeFS9UY6GpiHeXh+Im6FXq+zMJ5GdDILrFp+VRQGyU+eBmd1CyWSMXAJeX4jmtWwFJFwmciOZWtH40TacgL9Fb+rMmET/BMnXhoKWgxNO23wzOtVU7j8PzqOeuzRL3IV23PyCN58GQqA+Ybc0Qbzud33DasAQRPk68Qh5xN089KHaRSQB87XlCkRbqe6QKcYmZ/ga0bgH54QVcwA2ILO123ml24lGpc9oGXz6zYCn9sgf4JqhyTKPz1Sfo9/IWaPTY8W95Ae7PT3h/X/5E7K+WEQILlAcFKL2amdeDvsQQyD7UEKzDlEL7B2G1IHlAt6F7yX74xJ2CfJf16hgC72kX5ZNogCXEN92aTT/wiLEsjGiSSjxPj+s48O+x88IVtL5Xcq121vmbCBNgsLA2aFlPMHJOVW/BvNTqFyd0/aFo1MV4Rhv4GtfF6FXh5HG3pcKQA0nD/SxoXe2PK8MbvsxZVSdypY8zdhaN08QG/3WWAEuWdrbO4r5MpinuObezsUwNBrxMgZVLsAzwkK+emzRViQv33D5Cz7S+MgSsY/fP7X+KBVIISB+sI6LO1d4zDBbLFskY0hoRWJ4b0MV2ZmZffVdlOJWwGkoPDuhju1nv/pFm2doh5WZsZCMqAm5K0ozUgyPdcvfCbckpGlXwkKYcXTvavyxhtrvOvxdfras3Ltqve5g9fk68Hz0EgluljbyQkt8vaqly3jrH7suL2K7dXa1Baod/2igXkcJy09g/gltsYBO+OIP8m8B10CJGqbVoCKJlARNLjB6yBweWBNUYi49GXo/pa/ss/n0dKoPFjKHfFLawSD0SQgqF8xK+soufCI4jjpCTWvwUJ+g0/WAuFbum63bmzeDNeFOd5tWuBmljtnX62slt9bsO6g5eMaKxKF/tnXKhWTWHtA/1zzcFJdfm1a/PyiPRt13TS7kDbepgMOZq9QbMEDX7ikK7HnCgwclEzN5CGhC1BAz0vG4reJTbJqXKxKWxs7IEyfGBPH/ednpo1wMZu77jXDvMwU3I4sD+/crFodMcmWDI5eIEK5YfXh9oJogH1ZDrHCyYirfIegcE7VD9Re24/ptzsPKKlgHk5FJGTTcFg2xnIj3lS6gg9LUPrFgF3SF9dajx6EGKiYpmWBJe1BtcXEJ49SMxdRrdoUHSgvf/94xS/W+GRSd5TAoKcIc6kCztUMP7EPmwZId0THLmPe0y7g/kgoe+7z1zUiHr4Er+DvX/zUXqWGfK4M1FXvr9z2i62U58k/Lebhu/NredkY+ZAk84iRzF2hXN7EYsp9uCAGxdMWYDNTgz5MU0xtX3Oa0Euk/rylAbIi95m/SDwUZRrp8Tqs72vJgwdDBYOXPQWAxH8loTrz4n+nFsSn2PZwPUhgDBjSXXFKkhyyfBN3S1xlFnjZtdgmO2rvOueJjAOuDbAbZdb6HtCq1+Ya7bbfbwsK6ES0v5OkYQ+V7BBFe+4erdFZeAS4BFYmpRSqxb6BEO7Cpx3h8eMhe4WCP8UAPCjTY0ppFUk2v0I9wtqFqilqpL6C1EpcrTtL85bNDiQfg0IkU3DqkVNKJY2HGxMR0gCnUrxO+wRGUds5f/iedL2//RP+JHnDj+58Y1Npz27pEKtbanvq1gJ/a0Ck1gD57vmBKoYkz2jF7oZfMtbRQnSCXRjnw1TtZpT9ExUOOlbpMJTNUiB6ofLFiJVKiom/v/l2p7a5wKgpo+0dFRijQoIaJlVK/HFDNOuGeIigt5biAwhI3AV/cVLGFdwqbh9ZIqEWm6G9YxwEK6+0l7ukynCf8NTAwECcMcja3SmJuVkou/NQwJyJI3IvVkgiQHx/f5SMXL4jzitc88xaZ/3rXErCBsFpDElBnzey8IYbgYO3dCSc/KOu/gt/07v7Qx24kMvoHHweXGaXjt9sVAutvNy85zy20WK+Bb6CP9HQc059RuJKnFcw8yRuFxLxTZQy3rmuriRPLMrxisjgtBPzprN7CrUVPrTEwb3mfMwSssJ8Ev/hlVprYFJ014Dm2xRG3IjkbdcWUdyv4OK8zlFF2C4mJAvrGLjx0JEv/gJJb2MQkCOG9BqU4fmXJbXycKwKbo3+TCwoguYPyYaQHk6IBdKk8P2KXwQd/JcRYFY/eQPLZyoT1UqHVZx+IUUpgJ12pMY0xDKJaL4RTO+77TKpeCCxo/K94f4q1KmY8OMLzui3izs4fbCdX2uDK3/DkBT9ZXW5OhxIBOYtUvJ/LcRWZC2XHwdFfsGWXXALkaY0sGO0AFvFWoALnB72vfM97HUJYaR6RWOvGDXOa9NctrA/c47SgABc5f6bLCYBdga722i6l8nfsnDQTRuqjCtGmZWcGTN+ERgW9nGRe2cHJfK4r78MqKGa4v1S6f+ZulQIKzzq5lldwU/tD5y5AeytV0w4IigxeU7QUda/OaX9YkxOil23dtkQ5vfj7fvng/Dem3JR7n/aDyRbZqph5K0pvQu+PZlPLXaVcrm054Nhs5e/PHdhkMmRi6a+6cqH0RrO8JrscjfNW2SURgAm3J4IgnUcnO/a484VuL79Rqyeka3nKpaDbXmlGqULqjk6ikDj88DuUjzcE0mZmyuHi94WKajaaLk/OJ/9sH7r4/Ugy39vgsAmb+2hBMy5aynl70fSWALNYIofvfRBmOyxcodSAemYbw4FtfhK4GfRCFgA09hDI97ZmhpTF8JbTbEaLFvHKBbRZWVCC2b9IC0STf/HQkNtUoLvaeVe9RMRnjUY0cFffx9iM9znrlXqPQBXC/ZaqXs4sU0TKXxizzZsJJ+QGuC3r1tGXA7EsHHeGfpe5YJWtyQU2eH9g6ZOyCCPE1H4H8lGL6xNRrw0cYWh3JkKvGV+eVlbqpd5jL6Ljw+9WH3OfCXltB7XQUxyuJ/QFWi9tbZHml3QJOZrz9rw5pM6DBqtslJB7u2rIF9LjCfVg7Oc1dSx0YyClFWjG+ydYxh0zTsO/80dH59BSWgNxM9pM48MPD7G1wmS50oXLmTc76tsRodeijQjuAqm3dFAS89K0ieBHNSk0reFb3ljFCHBPKKyWzYTrPDEHQK4y5xVk8Ou8Ytdy0+IpVKRuca+TOh1GBXbPjdjytCXB9lNCIvhMMh6qRVGRYM5BasN/XYa34qvFgIc5WBFNAqzQ+g57aSH3uSll2jhpRXFP8s+/GeKddRHLu92zHxmFsPRha9flX0+gFUC4iiITTBWOKc8i/2veQ/9XQC4/pXtcR8+Aqr+Zaa32rgmap0ykb5sRy8G7U0Ryw7A33/Pgq2L+Q2hmmBKOR/uHNfF6DP9bbs9csK0vRjVa3o84yKLizXsfNMP2uC5pFsFWty0+JCKtuwf6BiklvM4n7Z+T+sP3B6ZpQ0ODRDS9u+C+ovmKjhZKV01ez0oLUJ6Kgx3ijDJIbtlEob+eunDWWXJXwK2GRlpvJy5GeO+IE+K6Xcd0wz8/f7+ErMTfa9kSd5Z5qluzTS1tBn+aYFIvJvhUKUh6fX9sT0/iBCGsAIXMODvyLrAV6twv6kd68w9N1Pm/SUkoB8zKdku+1U4HGeObztPeVVfXa7a2AjqrTh43W9aOUT2IBjmsIwYbRpj1Yc/GOeLirVoaM1FWxlEEdMTKaUcTHZWX+UR6km1tIauuduqw+MNFdUtPAvv/rq2JU7AB3XCPDH6UbTLrrJE8GQ7ZDntXiBilqK0Hln9eRW+koR6pkOruKb/fThQAjTlfBSIpWuS+PAysZIHtVx1+9lFX9FgRp4baZlMo/jiM7jvbeLI+LjfrxvGmj42s5lq6WQqEISL26i7nkWlvy3qYbRc7JUC9/sdY9I082e2cVWaT/8YDCjrWZfLJ4EvGivfoJr+R0PXgKzHxXw/T3HZspC1d8swTqOzMHPjSvZzau1xFrw4sNNGRkDLAcdXiuif2bzATtqFWzYI8H8amQglwRZBCJ/Aw7Ixs77gA+lpE1Ovnqh37u6FDDqHMg4+d+jvEfjPNptVNvMYnaJEpYQpKtzOOYGZ0FtXR0t+ijKwMxMeqtm38b4McmSgIycAcNSwmuu0vhiOkwwcwEc4A5X+TZeHeoPGqt1oyjbPnabyGnM4lFDrJymP/9Y/wZqeJ9952TGnQmRD11W4c/27iYDMfkmEy3MndFUSf9vf+vco+RM/jJrXWnD9CAG5diOlnftxT/CcuG77RPcHUeFgpthmNQgC9zaesu0y851w7kOjrQb2UzooPrBFQgybejTKuq/6HDFgC4k+55nR91EY7+dy9PL+KrXj9yCDZvl2Um/CiWPC9UHAmlyhLIfL3C+J3wXgxS8NevpxPQZ8G3zMLdeHNcqzyTyOYOVc1I26hVtGvwOpbTnp56DBpr/OaWdAo6oiWUDPml6Wh9e2Z0wVCPugYTo8ppcO8lBIt60tkbpu8ZT4lnpGe0vjuRKSGJy++Sjr63fO0qTgXQHjtsZnjiafaqME/aDIIqts/Bt80Ad2qzp8Vn2Ngkk7X0J98gpH839f0U/z1qPHiq3kPBXfskv+gnJY3tOEsyNCeAeHvwV3Gd5n7HlxrDqj3St31Vpe0q7e6BKqme9QauTK2r/aOnDa0SejfotSCIJbAYXhEsvQjLNB4YjWpHkmbFtounM9RYLYJaw/Lwgwl1OkGGAlbXnk+Kefjpl7oYWJ7Kyrkpi0P1m2PLKyHl2+3tkE2ANDAY5iQ+R14cVgqi5gBWWEhekLQSvrhuTPRVkNSfiHrez2hnGozEskJc4VRaA1xto/vGRhM1xvse3wIG8TBSuHvtcgvEHQq9oJBbmDQNHDyj72gIBW3FOl6Jh5sRxVJE8I8HDM6sCq8TNaCutktz7FSJ5huaYpjfxYSdbfuWPobqdo8W31tEx1PlV/s5ZHZ+RacvumMwYnLImd2j4SZjsrtRqz1VTXN5Di+dVwOLL/pcFz+Sm5QvhtYNGfeob6YqFPG/PW3BknTHshXJWT+PFzWYYEhFDdGAzmIJavSzMadzx4A2GI0yrztDmKJ6yDzBMU4bDueRBpTo1fUqHcArp/f9aShSkJov4oxk34l1alI8NQzorANj4hLPkDaH8M5UtY5bRSzeANme4095rDEFZSDo/JOX6BCqnpywtmpLBn1bMJg/tqTgKxJcpgvVcYLEMhg9rEQrcgyTkfvYZx7QBLUf26T32JhDddUfHN7ZPi+XF2io9DpfltlwRCP/08ICKlxDbZ8KgwngrjWtxalwDGfbP20wx0TkXL5uhY/1MjEssp7SRFCiGT/BwNeJibNL8GY9pa97ryasZIRN6r7ftwqyqFbwnxj6j2nvwNhUJK6LXx04IaJ2p8qnhRa23m6kn6SlybzeYe9bGK1BsBl0ILxbjwEulcMe9P2pwDwcfU0dTVlYhE1HeEm8TPCDpr3pd7wxNoDaaOP4N+MAoIH7yhT0RbBJ1/jxYxnuKAxPiMjkwhZMX9JnyaP64JiQ3vOci7DHL1Tpoys6MWzA57E0Rqx5yuuwRP9Nismq0MBB4SJDiW5l6gE8Wb/KCdJpINX5CE2UMG/CB0322bM1pEKLnwhVU+1JwD5mXwdxDIvQk7C6RbZXO8psiEeJRLNbwSyrWvjiGcJPRJU3mA6mWL8Nw2FiC/kKNn/C1ChF5qmqZpjC8tyNfBdcBY4vdquaSlsODG8diQ5ALv+iESv9GiaNe/7hutquuPfce2HtB06ZibGbUnRtuXqYSwPuYNHRMGjtqJ0gpl8y5aeaYAqfjlltg7FqDhFb/hnTT3YTVnPRIu7/Kbn72tfP+gZ5Mw7WshPiua+BhnBHRi0xnFnWIvQqfOanOo6MZtcRUby7NQzlARpfTa1rHtd9e8lcOZFC0RJeIsklN0hQCEX+04QCgpkikcK1bMrjjxgX6jPfAtVkK9w7TOFwoCcHqdGpIW6D0nGHiKNGNA5GUXTs74iIXDlhNOoAf5LYNYzT/toZ4o/01Ht4edF7RDwA41SNeMtg636gBodg0T4s7RNAftaBkwJnSYvApHsn9CgNu8UrtrwsUj5eFVVXqTUfpq2I2PqWr+IJEmU9yE0LkCNs7N2CNJVD2vkCYxcMIMv/offc3rPKkec/b7Pidh9b4fGBjnyGeRKRFAwPuAxRkzO2x+YlRNTn1K6OTvSp6VMsAD4/CsZm22IP6WAC3jurmWDglX8mGMLejIB7Hql+pne5tBm/CDKZo7eM/sSVjp3NhirPMAhy+Kynk67VUdYznwRUlgvCoJCF8ZQIA0hvrOCR7Dl5LAg2mO/qp7RIymTWTiXb+ftJ/CSvD+ntZNDdEYCwWzqY/9jUESMawQc0s6wkvhVc17i1c3gqtK5KrYzOviZIy0P45jr6FeC4pPTuASy3LJKstiOh846qD0rjpWjZWoZ8p0Jq3G99DQO8kHR+34mY5er86y+WKpBX+1D7EphqZVYUM0jV+KTZr3cTrx/7zm6PBzwvo4ZZyY4NPN5Jj+viscbEBrty6kdzFrj0aV/U8SttB+5dUiO10GdhNeOsgFbHCeB+6uvNKIivLxfru17oDg/z3ouCSxuc9CL6eSnCQxaG+JnuyZ6ryi8M5ijMe8oLgRLbxanocY5DZpE9uP0hFWULD1B0KgYtIJ99PTpN/x9HBTYLpzQuzpIv/H3u+qR3FOEhdWhCdezwDypl0abPMVjDH15XXI6sIXiwu7sQ6gAzCunFmmwHYm392cMFXYNGf1rS7+pxIQYKs2prTGNumVrl6wJzKg8mIHbbrHYoUOBodPEDSu4zPj7uQ8iVzwP756lamqRGU86dmGj/KQjG2+4avDDin22pn2UmH+N4ysq3cOQLnyTvvr95nRTr/fRvH5r7BQVUpdFiz11SLsalO2zpNEcL+uvFUSUCr8NBAybEvq5HiIHCSM3GQ58ASaG0CM9xOclcsRYZ4/jgE5U+9cpP5QavF9i5iK+lmxJCjqIcDqF1nuC26b7aAPll7+c3qrj+r2FSbeDBIk3DnMavFVAqO842etOi3+dy5zGZcFMUwUwGDHGAAY7QXcR53QGx5uqe9lOKxlE6SQqeNJooZNzVv7Fi1Pb2e09lqyuE+sbcv9FEPEOOXdaBnlv17xb1P1KqZc3UqbYEDTc6FE3Crnbz16kQEzxNM7LP87GDyyOpdrhbas7rw4vp3xytys8RO/z9YQ+2nfhZ1CYEpHSkQbC88JiFidyCdshEtqaAo3lvKSwyfe4CG4TQBWeVQURh6mVN2zx5uDMLejiEP01PqoqQhFjZk9HsMDn3yU1oh9ljmp89LNAdqYRy4XbT/WVfL2iIUMBigq31BrQxDm33RA10dz4MkdH5N5k26YOZPeGKIYiwhy9kMErwUGcg7Uve14vx6C4fIFNNwmOl8Un+R28TuUpibocT1am2J5PP0uDLAq/Zhj2kR1iDQVoz2qca/oQUH3i0EutGMRfazOvcbD0KbudeUklfXUEDsRy0cVjt83lpSMLfoL2PcP3uM9GXjbrMGo+V9szORmn+5Meb83LgxFBsju7mzqRy4KsT7brFB+gnQwGSUf48wlvvpYBIZGS4baCE4dyoJkZZvdEnH6DVYjJLfKBLvaUz2+J8FCDgmmObeadWE3mMqgjX7o4T5eZeG11D7QTO5Dj+QXEA4ZeNoBCR98ntpqFyoNO+HaoL/C16v7J6rDWTAbS5NCJIhAbdaUNpagG/RBUiDQtkudHH6GLER4LkLgxzFsMUQruHyAmGoSuh2JuXFRMisVl2Az9FmWg33z09nLY310mmcMqVzTc/ycazU59kXYDiRovhX0g+mo9wwLSSVQ8efXtPH/kwAkvVhgsFKRDSzicDEF/Mu855hzxlVkCdsOKJdC0eJ54pALAIReUpMCzbmb6kO39zH2Kx15deNC61t65W57HHlmMkkLWo8GzAdGG7RL59YbDEZ+3ZY4JJ9H6WbEzMPddA1meqNN/ja4zmdSyVB5OmUQ80ezTS8J/P6ibZbCVoCd42zm3zocvq9tKmfBWNjFh3HXrUaGWS5A7BzYcWo08N542McAtAyoxVd5CSpk3hCShqOSAgdwI4PjBauDp8Zf58uI08BaNxbMRWMjPkVeoj1OlR1GaduOJgHQr2pBuYm+ycIfGHDwX3G1Gdv/zd9H3tMDLQIY9XvgPt/A1jQlpghVus3cBJxORW8fTDb5SzL2U3p5UyGINQuLFh6dQCQInJ+Rwi8b8+NiAL8ChdhOwXPMWAUutSNYgOe1MDd0Emk9RhDN4QLhmT4qowsxcp/zQtMnBiqlnQiIx3rORLCOslxke1J8vLJsJElAqRXI1DVdPM/wKhMTvQ0lF1qMNeEn9FsOe5eVIlY+NtfBX8GfLVxuyPscNM4fg3FJEFFZJsHLzF1AFdizxy55FnfgI2nS+NMudIGGKOu3n7+J+vnEyDZV/7RAXGrc5ZRgQOzWEGQ2/OgHCH6zi7dpp/MAuUBcMRD++UWljJFfgFQKeWx784uN7gkr/4BvXGL+krDUBe3H1tI1zV7HrS/3oISRAzxUFNgTz5zm+UeX9gMR9GyGOHXcxECrPMggo/6IEyadRdmBUfdvnzhrPGmoyOEDbaCyE0uQJNYcd3S7Baqa+pOEWzcJ2rQgtXdSElaMVdJMGJoNqXBeeNTtupjVthTvW8/KCU8AELsA7ZfoXqNrkO4sr+JorT+zSYcTabSdQ8uEWOX8WX5h7TgsIMlCtQXupCcZ+VZ9Xn+0/bNtaZLF2ksUadQ0kjIP22AmqKi1lJFxda9mlQ97VMLLGeb8Q/zHZaadMp/9/ZAdUHWmF+G6pWJoIAtPFXu64u/oW68pf1Rt49m9Xilnwkc840tTRO+i/oM8KGXwv5hnIsi9/mwdnbwlHP0dAh0R/q3QSFtJoHllSPY2AO0+d22Oe1LqNzq1DmQJ/FO97EqNvM8SjuocuUkuvcI+3Nli2z0Wwnyo644IcDdPZzqk0LC5gHQkSnH9xDl60fcCyNoUNYgZiLDk3bSnTonoZdzYlm/BeygBFdAeIRizjeRzkIkOgyaBSMhLfHKM3jdYHoPm0+WRZ7bpB79rcYkvJ7Ej1NM2xdjU67YZew/FYmTWIBL7hICLLl5Z1WDSSQvMnAgrn68XFT6nUISwCLN692u3iWWUxhZAW8xreugW7FduzpgW5gbrFm8oie2dEBSRjJYSIDTPzlv2DcGa8s5flEgQ2VVWj0J6zsBtQvEHW5QXyRc3EuKR626aH2rvpYmCjldvtpfdXu6+MetXFDpYpx8OFulBmklS3PuiIpsDHxnbEh0q1TezQb3BDR7lnlXXbMxvI7DWREmuKEX/uzHel+A4nUFN25DdocjjHCOwr5fv3ZqGA53szKZ5cMHDOO4QvBes1S+a9wgrrHK5IR4bABh2PEZHBemBXnGZfjEcYzTONhz/o0TqaN6yDwZ66YbLjgMCfqP5FLkqekn1zFpGMOHms+ie1nhMb3sfdGg1OU0QF+r0EyfBOn2dtJy5ighj4JreG2i0NK2UseKE71capEAS80QLDsQkMAujv16CWs2xreSz00ldjhQ/aAU2FBcfQCpjwQE7MJyBcfLdjq8X2YsvcvPFhsRM9bCZUZfsPHe1180pw6L01Uq7nBW8O2pTcIkzhcPriclPn0VXC8VTG2FsLkCWqjAlq316l7QKcjx6MtArOrTVgcihJU9DAMghoJFzJQSsbVm6ZCscJrWS+LN2y+f8R8+FUB/N7HdwN3biuM2vRglVGtvNfMd8NPR+Bngt2tt5nTkc0Vf3TG51KP5ORSJvVExbartKTGy9IOBgNFnqgCtFb17xmOiqJbXLvOLLVdgh7F5jGfgsRXl+u1EVXXrwgyDqFW2p611xbPjTyycOieC18UjqMA9o5X0LmvtsB9B7Ov1V1IADIlDeKKWzvCzlvW9rII0HFGUX14PRcLRc74FiKtx9adtBusqK0eHBiVwOkEifurkhyPLS1lcEN+e89oVr4+YYAl5+pS2WNgk9pbqZUxswFqXqhe1TdENWnGQ43zAP7L18bLQPfr0XmDtnig9j/MmBhc3qrb5GaHpDOEZHzS2PFo/eW2UT3KC3shPIR2cCfEu7J3eao5M+hQ7h4CuIVdaZtooQWa68HG0tUMFu12VxWn8CNOgeoN9S9A5XvzelelJ3vV5jxKqn2M7kshk20Qlv4CJPMUhjqD2pnZdINDoPRQWRqeKx3udOx5J3Kw3gLvYzWxzctLb0HqLfLdOGRl8M/mBOtyFu+euKSy0kPDEqAe7mCFLA59Od4hF2ljwB+pJn4olhgxFV7C6e6QhH358f33xwnURPEH69W7iAoOiyF5TKN/lzH9o2K/rAjIOUswhX7aSpAVIJYXeIhEExulE6jJISafHGB04/5300goEWtzkBZFpNrc8IVFifc0Z4femxuLLbkQ2hXfsiZOKP1bjUNczVCD2B8kBHIKUcRG3hLyRqsQ/BGG/12zZjUqqH67sE0uZIaBYfDw1sjJOK9Uk8fHsF8eMAGISMMCweTvRPgmjHaquY6HXRlu9M3ggVhWwUj8GwWqaOwdLiKvhkOs66WoD/H4pOEba1g3/N+PFt4sJHYGAE0sHuWqPpGaHKGvdHK9fxm+L9tk1jX2Ji83o/9lEl9SbDkfFY04EGY6JcheVNFsXutNsxbtdbjd67sq1BXyuSw7d6w4+UMVvbXGS0fJoQHYHwBScdJjyHI0UcpBp4VkTVJFzuVTc5obPEel9RqxGCvZNk0nkfE0Vo5zZOmpU1yfpoQL/LVmolm98P4kRH4deSskpqq+SVcfc/3QeugPrvG73ekTFRU7G3Sz+vYWi8DG9TjFIt3HWoqQtXLfynKY3iCjAGenxAxeXAza8rmMtNLo2IPBdzlAYj3Vc4NRkUg8Y5gsL62QDqTKTyP7hM1H1pBplpeoNydfXiVr/f/k2u/utdq4H5iDWwhuAEtp5hlNtQ75fWifggfAOiCPrdikyaBiZPJlhdpdJaZW8aOe+BzoMNFTbIFObvZ1cXosyNu5uw3+ZFXq+js/GjKIpH5GlVuHgHDi6c7JPf1ee0je+/UwyCMCo4sh6+1JznF/K5j6n+F/TNKxwkVAOza/vWgobHitaGAerNYqbV99sxueTVQ/WD6ybhQq4/CfG9E4bT02zu+T1JnP5IpLMHpvua3znURJp01jV8qUIBjBnh7x7j1r1/HxL9hwA0fqf942rswhjsBl3AGsBgd8UwG6xT+ONfxkjPawZXeWEmfau7MFVedOLOeYcy6tkN+kCmqiJZiLpiBBr8LZ7lhHPFAhUNOivOmHijIS9ycrdM61091L7PtA1InBTqD3LL8lf5XMRPzoKbPX3Y33aBrSXk4vxLZpovmVyfmWqCfiWWcmuH5BDrarQJShFzmp9JhIFtfbBMGgaxpV8lbMdUC4Tq8jliIH1U79f10HRMT4RaKgEh/QVxGn+5L81Lzd8Lc5Enkj0ocESnR0UefqnR6ut7y3tKi1fLknHRzP+FiILmvdEirf9d8D7yzqEsys5sg43X3GHOSGMxjGgPts+3RN3Ubhzsl+DeYy7psqcnCvag0tYqiek3fTXp9g+cnM+rmjc1/3mVdXHTy+8+vwlMsSG8HHxpdYE4uWfThJ9qSo7iALFJn5Q9vwqUAXZyp3gtotoFkDLnOxHY4IGt5Q22MbW09UE5YkZcU6CA5tTct059XGhvMT92h046rSNHbzWNP7YXIfRSfFANwtcDTxq1/HeBlh5j8HXkgwGwfxIM0IgG7VRjQHeOixhs60eJWlkh3jsK1Z2V0SQETw8mUJo+n9sPGCaoxeZ7yCqrFWf6j2fmEvxXdlaS9U5Mi2i6RIrrZ21Ypm3ii9O7F5ocCrTlSTMmXvLYeXcDnMfFnh3ciXsf8kLzCk+MtyE5FRtzYu34T7ZDPM3dAo1M+JsyJQ8Yy1C4E6d4AA/TBDp2U33AHlA6A42XA5/SD7Pplo/7XnBidxbX2iJPrBjmjT//DfbJMwYgE0Demece30o0Qtr/1lvk+5dumZxOTo8KokwNzEXIg8Vbhf7CyTOm9Pjcyvqiro/Pd+JtnqKmaWUOr+aUAtWoXf5Lk12LvjiKjZRScW2SGAkRtkFypC6u1kHMitjOWfCeu64DHZ3flrnU3jhpj9MUQy3eFeJXW/pvtgpW7Yi2wWTM0ZA3rnIZh8q31213wMdS2qKT5359bR2tQhXwYMy3vK5bPPcKQFCaiXK+ETd17jiOldBuzNSrnD96zTmngAQrpWR6u5LYWbdQndndsoU2hNUIbyOs8FFybvkSk+img6zO9WnD9MTbUww+cP7oQVF1g/Pn+dJPkB2uUmeOpOYRU0dzJF28X6Jv2Id1eAhgpsHonJN4XBOqFr2tyMuzG2GdZX2AkbUxM4ETg6GgEsCIYDcYq1zU5ntckig3WddBPW27YkTDtPHst54wpEzQQxRXKXx+4kmq1CnTnpg7yYCsaHtwxETvBcPn2abPxQr6NqBpgGbAnc4ynuMln3AVK1uHmya+u1qUNSLNB9LVQU2T1g1irkdaKaY7+VGynJx1DxsbJtEBUb1bItCe/7fj1it/rdCSb+atkQ+RIWdhcwTKMlSHz4Bm6VUwhsAcOagYiFzumUSjQ4dExng0fD8vLai9lSh0A+PQsJ9GZhp3dfZlKUlewAs5/R69noig7Ja+EGcJCVuox78qICCn6Oh47DpBtA6wJjCO0xH1irb5gm8MvxIwVAG94HzGmorQkERAOQPexA+1Zs8aSA17qEcc8Yq9NZlPeq4NGmu4N2mZ1nmfE6hfPOHYV0cwqDPS39YSlXmcV5zmUrl7DC9Hc6RdKeelG5fmg6ZouaIvqWpYGPCPkOJCP8b3ZQu8WM2iNvhpUlyWR01XLPBsNZwu2c/bkIaqrgYoBl+KpLUXBKlXjCDy/FWkFbBK0pyto+QZ+WqMP64CtonW/PJH7lXdngc3MuttF1P38UnqQgpuvfIssm8n/fAMqCLQ1dhqZRpiiqQmCOoMFn5MfRq0oiZBfuG1rWxMNsRIkhBrsaWjC/HIEna8tNNRY5T7Da0TVOE00w/v18mxi8VWoFi3c1CuRkQ9KTOfsMmPnAxmTSSzaNYXu1JNdmjLnCoXBTlWmg9v/yFflu+gd71RBdfa+JhU62rmsBnRqz2wW/nGPb8nnjFROuMr3Ib/ep3vSWLHiTctMZb6D2+QS92eM4Zz4X0FTmTaFGEwtmJAh5Z15e1PPuE38fFUQWHDrewZdF3AdB9oQUMJRPqUYOcwE1Mu/Dhc3rJw0eDYIFGLfG74IPe68T7c3CKguKuwA6fptu19+kf9XhEOfBcQVWxvv/TDfph2FT9UoKrdkC9Jo1XFvmGXCIFiK4+abPsMxSEj2tBDR2kW36/n1MnhSeNo8ymMdrQtMS+lW8Vl53QIrEs4Y9lvUopNXgNRZ0s6EbDcdPVA5yE9eTbyJwg5B8S4AYL7DsNG0tDQLYNzeMbB0QybiqBbhbyOmO0CB7TkiQb+wzJ+4i7zBQryWAbgDyfzhqsXVZxg2cyQOcXklDzz//woGtO++v5JjMb/VOG4z2AeaAnS4dermz4FGS8wF5w3lweSF4dPZeVlBW8/9egDrEeV0pZJgPoipaROuuY/xXrcQLiN1saCZhRECIfvtW4/zMXTdn+ALGxgZuTt7KKjxy1+SmAwdy/wm8erQYirXJww64Icrs3D6wK3nhyIKgSenbM5APfpRyJYJzUUEa7bWHoRxFzSI5WbI7oXz2bNCkFU5eklYsJoCzbWFbh8f5q0YP83Z//vUeKIBnf16o8hKHmbunyce+Ln+5OjOK3i8hNY2sgeWwhfFR2IzPsVSJTwH78Qw7c6QZ4i7B7pWbNgUDQ3F/2p445n6kT2HHH8du3gXodVRJeYOlgV4r9ceHJXeTgyHErQMhWef+k5Z2Q1TAy6jM0ItH8LZFQDz2VsSwX0BWf8xeSyVrvRFAFOoFsnjjAOR8m+TU/Z91R0AQ8vWBpSEDoDH5PnXZGB6higX5eWELQOmjDYv0+BgXm2N1Ru7QvCcq9idu/FSoHNl7dh5xEYDi7/AkkNeAaSH801imCYXzQd/QbvbobRwsLZ7juN4OkdgJR46iX6HIbw4/0cao/wRubRWioy70feRMlqpLP6Zzx83AnivKbsU3W2BfVN3TeyrTqTUrjh98D8Ed7brBpN/Bo4UYCveshDk+RuTEfic+daPI+EtTjYBf6tTvdG0NvJmOsmm6o0ePtWHVEffoNT8z8AGImwWy7HKOZyOa7MlAG8ZwCAc7fpE4jTKg/oSXan6f5XexDw6HZ7ILvAARbHrg+QMbesas5fYtpi1a5ZBEEsN5Srleyk3guHpEOxvVkCk8AeTynzPlSHFqQYZR8wWCUfUgBeFL+j3mE0j9BWEtUIcca2omfaeGDjukc0XccJkcb6din8pMultJj26KbthB0bo23PExIVh6oHgijztbLvBg2LnsHWXePXpbcRDjGYWjD7TdXvS/GPg8anJEywuBBnDzZmXU4F0zxEp2UsVLiJzCiclDwcmBAyFcoGWaexQKvARktkTwGj4erGLy2iHGYM0hN0PlGdcUvzLdfCmsk5hyNNTWzao4vgATrktonCuocfkTgz2ymSsPHvD7MLmBl9Y9tySpL0uXxHvBH5FzplHwj2hY86F4O/VuMf94u2S0CgMhVw845iFhCJxFjcxKffmBz4nBfxPsnDlGSCAmjrvcN2lhXVaGHcEXd0KZvpHIV+5qK/ECGQckmrjvUhoSV+sLPJD6B9DCqDeEMhSrRPq69098O4SKAU0RV+Rs4yCPTiopl4GJ7ux5rKOuOkwvQMgI3FgTrbneVN/eBXkFB/KAYDNxAfUPrNn24eQi5zetKRMiV8rty9UttA3Ngg8Irvc/PP4M5SeEXK90W8X2yuHX7ZLoHIwIDiTGRyqdTywaAsOObevr1yzwWDImdWLt9OrqFcWr4CCAmOKZgvxYk+Abws6WBc0VJeCLT1GYIFmVZ7IJm4RvcrLW7bgHYamNGQTW/f3A7nvcPv7dv4lNnfw6IxzscdctGrrIG9fyGhZRegdeYmQ5Fnwbd6FJYzB3MmRM8ldhk1OknE+TboQu5bsDcxHhChhsizYa6AXX+ukv6uwW4gGsz0vN/ClZ1iW3yKo4fvLck0QD6EON1qYyLOqLs6OB+VlkMIckg0+ug37E0ub10FUFkrPZ+CKUKYmvj0gPk8/eCMBa8kGzxqcocSLbaQGhBh551xbY2EORXCV94vrHaAEZKUMoC3TWTNlZ5/Rxf3letLfTarB/RPFBPa5FBYwSWI5E1tbluASxpvOUXnEXQ2eZrGbBglYAd+LriZZKm3ojRP45PNWT9r4iDCCj4THEmXIW9yvkP+TK1IhmRFkx0IARWa663g/mqrhf2NxOMvaSDgGah3yRMieqKTlZV3dicIQ7iW/mshu0UFzICijmRzTtPkkVfsdICrKS8RI0w3PGP3We4Z5ynDDRmKKmP+mw5/0jZVq5VS4OJwCFL/LjRK+RsyffPkDhqaqboRX3Hf3Dypp3WI2yQLXdqSPvYT/r87H+aou30XHyWw45Ymu5LJN//NNq5xDL6hzqQvfeTW3gdaH/OzGuxrwElrSPgUotadD/O+LyqcGaPM/gmeySncfXc5u80NKHoFHEDxvcVPYEru/3G1vC4Dx8WlJS3+KDPbmZK6a2ruydbq87fQMUH9Zs9gfpBmx7jD7l6MXYKMuQOUp4Y6kmldONjIuUhJsZpIlkXeZsUpL7s5GkZeCQ3iXUb4i56igdLHPHi3y1Uhw/mq10O0uj4hIu7WvW/Q/db+RbF06xAwmaZ7vP3CcfTpXrRhW5QIajBYU2maqN+BxLylJsbK6/ijoA+w6HtiE8m41dVFLKfN+ti0DWXBdugP9wm7XClAA+rbSz9jSnIEtuNYl3fC9MKoHeJolaXNp5+9wWkZd9H7NodEjYkakFuUTZ92847EwKEcp9rjAFngcQWwOKe2TCbeZdmYty2aoXDwOkLCJR/OwNoKI5SU4c9cnlLvIfX8qk+8P0QOed2ww5GNpF7w5j85yBVzqI6dBzIGI953pEHDBhKmbzohagO/R/TFRW2Q4Tj2wrMzFnbHBrd8cWUv5Rbke1gjrRrwcWLhX9t572P0RTQkC8tjhu7bHirtK+oXAnv3U9Z396aFLCq2IZew/0F6Gca1T4x3efJ7WOykXz73ikAIIY7qzjZfOR5VmTD1GiUfLCBA1Gm4POey7KCTh43UInZZM9DzgigtHOUPEC1kS17toM3OfTsQmOpN0+6IuvP11eg1kCydXbn1xCK/wgwVZZB+KK51HqulSuzkBHhqWQfdGV8+PyMeSpvSL2qSC8O3pvOaHhpwZNOnWr5fWi9tV4HR8TKDP+IoTTkZChZ4VqOFrfNn55kKPyfUPqT5rPZlLUzSQoMuDx6Ihb8r3P6CmV9C9x+jVyHVJre4SJIldGSCkEmJayQuAJHsZvFz4Y/L+Mn9BfOcoHPLxtm/TB8dKJHFK8rCXRYDffw+eZcro48dC0XYExuEwEZ+nkPB/MaISDSPFqxMZwVxdvXGtSxtvM4ZnUl0xIE3DXuAvcrwzQjoEjVMqLVNTn5ofqlDaF2TNZ/PsfJ0eLr28gcvJK2YGjz13TxlZYae1bQSjhaKt3RmuT4rKQZ55k0823o6tDgFvgiX5gfnpAP6ly6Mw95LfyP4OphzpJS3Oc7JJInFierDwVJl0wAUMVeVfKJUrBHO8v8u6/ygO8a9HZMiQPg78ICyqTuyfQ/xirDs0OWZnwsu3z7yTugbTOo/o/eWY/UPH9XofvF45P2Sv/lNih9z/adxdCWodb1DLdEmopFu6LrPjbv6ZCTLRRq6iaeskWZ2vD6nGY9rMEDnzvw/+aHxEnW54k8vpKqFTeRBVh0uJyIa1S2APBw3Q8iyYcuT4nZBEaFaKlt/VuC8ZJZmEZb9uJgdE2RuALxPjHEzE5tyTS1d/qvUxutOz8OIHOe3C6esHyWfE0Q97HeZ0UhbUyVefG5nm2IccBHwELrOXdz5hR3jaQWSAsJ/8OmvSBS9Q1bI5H4413q/OzOoXDqgOgT9kkYNTPIu+fwgOL4XQDMOR/JdrzwYSb9DAuMCjlWEPcQ01wpqSTo/wELPwpmm+n62a5ozvm/nn0cjZg4lLLKYBy+3qUCiivjlYb7dosdvI9UJvfTFk5KsH4kqbNUGVC2J2XfH8HbuAkfFVCppriCOUj1o/643IbyGdr7KE1AUmkga/IcxAaz29UcahWqnIpOtbfxnRlp/WtrBrNUwa3ma6zqCSQpJnfDfveByooA9b37TXmC1IM8yMapldz84MdHtUI8Zs4tYKxtnjOqpTMTebl6IMZnXGpliaSfwRVLbdduuMOliALSPaPIiBqJ5xHogX9Ya9PnzUE+YtOxtUSc5V3csucPXPA5wMSHL0SrctTy0SqeR/eITabPwoBjLQKfaUlJ30e425qC9OUDTt1eUOXBJ3gPnqwFJVxVlKPBNjRCrVZ137zc04XlED4/dcSRWy6uVUEbmMPWDIMagV3F/XYf1rr/kWF0XZZAFSq5e82aMmSaeJkKsuQh2VI2Ral4OgKBGB+NqUE02DpHIE1nbHZ3gNsq4m4XT30c8bLeK4tqM+1nkxfXulu2Iec5R+boYvhqZlx6XwBHQAM2gRbBK6hVZ/I5ew/7FJJiXEXLE3VGwqI4ftgzD8EUeV5/+CDe8S5v7/3Q5348i8DwtH3AsUPQfLiW4pdaOQjcoyL6JYYlCZdcti9PHoKCxryPqL1kxr0XqwFOauDF3bYz3ODSar9sgwESBN1YuqNmOoXdHxOdoVD3J1GvaeZ2XK9UHlz+eT/sTbO0ia5+XkhmUNSbqVCfmOHrum2as0oprepVlcdiqBl2yr8eTdz/cXd/fKDAWV4aH5A3nqWhnnsuMYsc6jgBuPOJEJOHAtESViH98sjCxW/jgoNulrBLxwM7Tlfd3jNP/fm/KPauX47KTnNLzBbPk+2JUQeO5jZPH1VVS3LkkTmQq3Mgfq//czhHXn0Or+1l2OGDnjQ8CJVt+smp1vy6l8vCdrIg4GokU+N1JaP+xW5zDrjFQSPhMiaBH3499woDD67gKhPd6jpLGPZLSyvxB9HRUy3g2vBhPtTmLr1uIxTc1MDot30KyUMR2+tdUPnqwkJDQan0DHZNL+qGC0oyecDvoOKP7yEZrOJBJu4qBJ6XGyv7F72m6Fg6w5yH6NrjEem/GU3my1KRnrRbJQ8gYgnDXhj9n1ZD2H+73PrcqKwYQyn7vkjDLotVrU/Mb6qRd7AdZ6xKPaBG4BWTmAYVX0U8br/eokEy/xSpDcX62lC6vxX6IB0bRHBnGSP8pGygaG/eZRtGjU1K2MLvQKM8ZudnPRTKOYIm7TVDoPyHY5E4QLN/GhE137BBy7mGMt5dfliarNmyY0iefbGmYMqPFuohz/i5+gtFn3AqkhMTUFpO5YeKiDpo4cWH1DSOgqREHC7SGhuUBiEShQKLxa+tdIExRH/4PeW6VNDj2kc18FGTt0SXG3WJKTqVcxcX9MjPXQUJfPyFq1qG7rqGlqWKZQhfCPF8mC4YFhSZXnwDDWQTTDuUR/h8IqpgNyxADtr9V1NO7vLjLcqOzXAfbOr2IAtE6lmsz0T12f3r4oCcbYhuRQILMLuNFwlX1+vqsACsU3EkGetYrfSXIwe93SEQ+LrOqJF7B+s8fTaW3R+LIjn96JAT3tizqfapbHWm/9d08iIfChIRIyICGggU1spWh4hboq/dgfBqkD6TUy9L7rqvSfCgRvgLf8gu0/wvjB+B1PMRFxEQAbZfGrmeklzkfGY0tb7weMGlbT1TjmuaIYl/XkmCycYNkDoX4MxVYU3Bu7WxfQKRWbc3lHkBJfG7tQJ80h8sLG8oeONWypkBmgAoki/GHGtaiJocwZt9FrmovSeIM+Z2lrupLKgL5ubOO2KjvzxFb3deQFSU6VTaCazRjxIOMkaqtErgcuqICkC7DBiHpk2YSB20Gx+5X3hmgRSrnrar2llcp5ifXy/UG6n5o5kAk6q7kw3MdGaX5/ltDjTLaDd1fesC0xDJB0r/7RESQ+zciZldi3nwZgtURpTRis66X0KurhtoMUsp6PYwCXFgPsqbreJ0NEzzDEfbCzrpH8v7vpI9S0ERC5WNXuxrT7NbkkhI2PZLqiAUMRleU3WcnOOyk69zuC1+LrTOetkwQuF/ts03I3kFQ9YBJWJmdY+wlarkSX30VLSSW9w3MU99DdONzMf9HcLPslp0PPh/OioFHeG/png2yA/2lXvX5RhU4LAvv0CEeMVbVEGSbEqCfOdlFIg84vjyvNzxosiOZbXkArbaklMNAnuWw5R0uqX4pO6QvQUiaogDhR9oBU/rjotq9fOjuB23pL0O+Yc29y8g02garLAC+2kVE1jumleoJHnfNPwOliB+ZIeUsioy3ed6S1ZQoOInCW6v2YT93gDkOO8vgpDtyz1m/Vi4M8CYZve4TFd8pJKOpvgTrNcGT9HxhLajhRTan75HqvM94ddgajkyL3quwG5AvIGDNT47+gRJWaAvkpGUCoAnzBHrakS9k1FD4qynVQOdawHpg95MCzIcnsMV7ToB1QqWoB9Ws+0rgJ3vdnLdR3ovM2vW09/u6nn/AIqj0Xt3lXqqOSC2m3YlQG0yl+8j2Pcl5bGKAphBv90hNjnxGEyI4U0cdOm0DYPz50B0K1y1RPpREc8DIeZuZisWpFVdxs6BwozL0UO9nbNNxrGVJJT2VSGrZwOa/Op6hkDV1Qzsr5JMLZdI3r5tF5jOXHLOqNHA9tbKks/j+fYE/c+XD35PhCcxoRWzmNciCdLZC6mqbYcK3VxIBJq9EruznpX0anaNGaR/hK7MSuW5cVR0q3UOcmhho2ntob4d0+qgS3DiJJfdJ9S5PqK/PkbCiVNVaoKmzQIRDeeYDY8nEh1Z/v8zaWKQpam6vyFTZATDzJHdKb+YhIxVSFjAtqqFdguuRHTmVT22bnjmdVGF8pknnBJWh2WkHGJOqFSEMSg1W496UA1CgZDpucoNtn9e/kEE3+Otqfk/jlLzkW29k+AemR9RTyCO/KWC+9Y03siV+XKrOknddcw1uVe4E2XOVBD3+AYzbGYBqI1ZfIAUyppsz2Z3OkhmsjDKigV4DxLTeTvQgWVmn+JNnwgSFMt1hp7Dl4VetV9kTlCTRszp59q452Ri6fjCGc+LB8WljhBb75pnytWprQJUMaSEAxE5cgA+3PqmxPOVakr0+G8Ia7/JEiKTCJyQnI2X2j4UyBxb3D5ehO+o6ekrnaOtE3qKGJApwO3a2rexluL6fjqrEqCRgjtYnGP6vWyUbouIFsAhQ64Bngrpw7N85/5nOD5ZfH3GfghrhrDHxcPNT0Fdcv9kIOZNZfCQ0QpEWAP6KJCBwBFbcNsPjFklpJsGx2SGmUTl2kqEvPkVHa4xcyhFW2rxagtXoafdIF/bvfeEG5f1TIXIRWw8sDoItuP1G3GBmiVRS5iXQgCLw+iLbiblLm2p4Fh33VSRCSZvkoAt5ObFyy7muYPTx36sGB+8Rhd3fFvvWe6QoyhdJO7fobyOnPbaASqh0o/yt1z/d1fR8WZC7kTuTEjWJuCWcfWuAmLv+mBaRsoall2zSk6H2LQFXPQPVIyF28WXv/1N2fxYCqT15YIV91MA1X1wHY3jTbgP+zYo/Q6sh0uhE7xqAA8X+R7V6LP9T9CWslmYr10c9c+3GE5CPR3DkuIlyB+1BA1e+8c9GKl6xtNrQ0zIwqRoC2VzvDWeu24sZUKzS9a+8tAP+TPvnjGGiVne18COAXMCucrGVaWDI2mtm3H+CfWirmGvviYl0ibjrzK6o68TncNbnE9qzKJWFh+imam4CpEp3Ftl8M7BJzx8uUHaSzOyigxn9NC5UOl2Jbb144r/liy4XBmCA0N9X34ruqEhJf08Zs53H1PQhhRtSuAwx/f5Y99WuS8lWq+EdSODYIHalhit8d5U0FR1jrbtLuGBZMpcioFcYwyx7s/16tX5JhpJbGpoWL1ZxY14lvYaR9RDPyPruFzUmCmHSWBDZrfRx1UWskuS5Ewweqm0h10TRgGDjfeHUcKuFj38FJyacMfdS6q1Lsl2wIYnDsHmP42D3oazS7ve0L3SNenvlJoj+lJu7/5VN3kvCJv4+jaM1oaaIWiwbasUZt4UKk8nZnnkZXi4ziWi37HhxSVEH6rmnrsTk1XwZvxFAGLOzKZlbMP1Io6yj8UdbGcAQkswWbX83j616Hl3raz1c1K8bh5eMIYgS/cwIlDIjwca/E2m9JB4lrstJU2E5EQ/+B6xRwhuBpO+J7HJMY2YlJRl+4GAFGPeGGu0J3D0HmwsUbsK9TtBhGdkqxH9Rymalr6SmcC3AHskdvtB2yt1sIdcxiEd+OJFnufOkcXc+WlHf7qbwjVzq0bf8bAaAJgPxLusQSwOZAGym5iQkYP3zg9i/blCF58pYgcwJDk81EoKbCOzZvjhwucZDvpT7+CgUsDPEKnBsHZLYbl9bxC9DDeD/qvZx1QsizLh+srgOre689lnCXIUdW4/1LjAei2YYSkNcyrSdnWiPr3iDuYIu/aKjtIA9EcDiUfkKJKr+62gQkNLdv0DNM/xYxAaz9cSYM4Ej9nTcLbmynrTuZVgwpCUN4CNFyCmxZCXYbkaaj1uM55vmruLTyMug9/wFpZ+J9lnCbm7EFVMz0ZbaFccqVVDlWyTcgBVvak7cmkKT2QdkcVv8R+8dWKV+rZxYJ4G1qOn3PFXtCWk5MMfxA4sOceTR+7W999IfOeSlTB3iXfeS8WC1x3+LvS7UnBMzRoaluvzeIGdX4uPFbPaE41xKxkKdIpETuO5s4nCL5cMrJ99KpBxKltxXn/xEqW3mUtJ5uLfK5n950ladUKkQVCNoSpmxbnOgDgE1BJJApLTPDyyY6zvY91N4+y5czeYjkPvqmxV6KKjforAwRAJUMaNaHwvCzi1FPxWDjIVhHdRuHdHobxHcMD+NMav27Ob90iAgfCKSlKfFqC1g6GD+Nf7vLE/rkqqQxv5b0qngszUmQxvFf1knifOhy8hoXmX05eOVAQ5PKwCX3J/MZaFev+0mt1zclXjPa/UpJyIHVj7n51P31+eFFiKwZaVXehFJNKHTadUqB+GaVvQAVLtyqcgkwC8xLD+c8F39TQZIF4OXnJFSJfdpkI1kk4vACf6bqh8ThaPIOjV1GCDuT1e2VBq6NM1DtUGOuxs/6zjJj2tZEEsbdnNjGL4FCVH5pM0TMfT++/Wo9xdDd2a2iExOzYAJs/qyPOPOLs59/c+IcCzPdhL5qyk59pfjXtfU3p7//6PDP8yRjoSueaXLr19otbcG8m2xkU9tqP+uAQMyzy2xS+yUppoZ4+5bUMtyLSxVezE/2Z/zPT9joTzvPPyTLWplzKBhjtNJUq+flr16EWKDoH4e4aQfSipjwygWp1KUGVr/jJdcuO+3Ls1AvPaqBmq+Wio5ebmwi32fA6/+anUSKDPv9W2b7f3jaSl6BgayG9DcdAmHOMzy2XUiVSJ78xwMqsXjkU/7Di3wyAImd6k/8wuGvhWyQk/Yn82prA1+Fq3FHhH6u8j1kWB0PSDtfBYlx01/NQoh52iAucjLFr3b+6znsKHctn7Sd8QYMOGhf6Qe9yh8X4170APsbtMXQluNniGVtRDyVcbykduHWAA2tFz54iFKx19qkrd4ID2UojlRKXry8LfA/vhp8k/H0IRf3qgEOYED2CGgERi6+xRxEPNv7sA/FeYN3GjPVZIEDDaZMKUyK5w1eJ053Nf/74SId/BcmbgqUhA6AsoNUIFEu4y4VrqEZj5LlevkHOLrFHviTXKw0p/nHPjE/I2coYMteK869gkn8+EbbLKy/x+rLNtTE0E6OklxzOsL7YUTnjJXqGMXWigEcU5jQcty8C94pGMbu1Uv0vJg5P4MXrLfkDXjItiAiEjI62CpJ9C+3l19tU+mNoPRgfgcbSXanqbaHHEyo9pA18CMnFX5YW+Rk8QyXhjXBp3OSwtJberaN+2HkFDAbtS+cSBot3cTiVkYE4mGpoDNy9GXT2gWS/RxuJ0D+OVs+/fd3RSA0XHvUEgaI3zunVY9bINfQRqfStIWIMPi7q+cpxGSvkNprhnUjojNs6PmS0Kkm8q2FY0jUsLUsxF0oZwRkEauhKNoxVgVezjUdChbpP/a388JEKHJPxVKfcSXoxyWGrRsbSPs8FWpjSoFhMB4ist/4/ksL089jBIrLEK0vn+Wl2EzMGZMk5SgPpYUuGkaWg1DpfTrLZUXkq2pLc3MjcmBfq+a4sgmRgwURyEWTitopZCOWidPo3vHaNBxUrhtkMdAgWEJ4YK/z+WstUjeiDV/ApVsIfh7Ph/XThH3EJ+bEUVTmCo4z6Y1iRPpu0bYBEaFTD8QiTYkaG2rU/HSoQqg/pYy8jxYXNcVt5lcT7YWB/o/mFQiK4FLCPxs9eftnXJc8N6nhJcJCCUwPul8xKzW84hebenu6u539LjeAUl28UJU/NW8/0Q3cVeXaedqFue30cQ5DSIxaXYtyqAAmjE6ZUSvjp9NwaVTLPZK7pVfq7ffFbrQbCe9/gha3PDCVp6Fjmvi87BoSvLlEps39+wbpROP0Hili3p3KGrJdauu2hEvGAhkVlX+/koRj3lXQGQZyVmGW0sXD3gI0C5xOya1rASt+r1nXeRht0cdY6iz4RBDswp5MA4Fkudcwg2nZ6JyMh3Jw8L5R8jvTQ1DLdcc7LefCoX/Sr8PV0xed57z7ouGWBfNnm+aMS3T6872F6PQHd2gjK6j7nLDC47hBEm74pcQaU1ZytcwaHah5ZDQPvU32wnGRX/5ZMBigViPB9CtkE7M7GBTKnCog3C1dIZZ2aPBxLMTomW3uo6HRqZqz/q1kGnuk5Hq6wU+O8t4fIp2ZXNTO8kiXp7T9NrLtW+xfWvJ9u6gsaNy/zNevNo00kwEEcdigdb5HDmvXGFRnzjS9sUAABWdOchq97QhonkfQngAbXz1H7xJ1YTstU7HvjIChcKcL3jH67LLvFgPQd2cnS8B4/Fl9q/H1MbL4Mq4Lb9ANDHg3wcV5Q9CAIlPzIhpkO8VykxU/dkTRmGGFsk8QW8qlzLcsOeUedDgjt6KUD9N7mW/2u4on8JImuc8Uw2R8c1hTfqht5kWqFmsDk6M4mRrvCEQVvn8qsnPjNuFmz4+qH82HPGD2+yzwo1otwJkN/N2caqCcZLvCq9EdYw19z8E/74IzY2kWBdNzxYcNa8nDScQdueLSVNLgLa5C1lkDzoX8GGlj9qSGpQUesnFCabh9hyccmwWsTjYBqAQPCNyx/xNTVgVEjKkAdegFwLK5dN+2tEKFiq13XSa31UpunjDz51R5EWkBe/3pzjPbsm7FD11dzH9DNYpH/fSKL/DUJkLMwJ21hThUGtJ6LQ+lpK0UDelZNldGSS5cORykJQkG0rUj92oaMYpkqapRT9r3eCFWZmIO1DMCQz0av0rLv4HXpzSJ3tAXEUO/o5ZMkNNBDMAGmzv+w4x759wrkwN8JgLq1tQpAJn17poKCvaA55DK+1Uhlc6TAccE6P6XkMEeG54cYSZu7mTGWkJKTEsrsdoO8mw/08+fDfEUGTs03LUVEIMlbsdsRoE33MKQirLmG/ty77Id2RRmDOqJ+PuuOpWKpnGCkEr6+psgq4C4dBGTZBuLsYZKmnuah0lnZMhQ+03IZ7bXAK8adJHfOQB12miFBM88gbnxRuapBm1hXGTo8zvUQphNQ3KsvHE3TUZ93NxBMqj8iVQRQkfHwwJTCmb6ZmS2Gkm8JUQaa7hjB7/Jm0SB6L2HZodx1Z/81L/6KF78/lN34YHEfK6J5WMsDIByf+4+zV8+CrRoGI2ZnRtIdRPFlsj+3KSa9fdlzEEczTH2J0dqdtn7oM8PdcUD8p7KEn5sdZbL+GQzny631Nt0HskhLJ/R/sI6j+TMASzGpH1BE3f+IaQ5vuCarIR2YcAtDUA/fRLuSCWsWiu9OBCjrSU9Gh6ZsPXQfZUYpW+HfjY5Kg00ivQUMJdtzVVKLQx6uxtxAsAqgpczOVsGHnkbYQVb9z2iYgC7DNyXYQPLzpB1Y/lSTKWG0QW6BYetTrjAsU7fl8WXRJ18uteYhOQAiFlKeGfM8xnu8n+hhiZ7ZH7bCS9JYwL89IbHEMZ+t8JztmSuIpM3irBZJzRfOOxDO+jLTWuYsnPT0pdQdcqFGUGq/7R2uxXZ4VXMT5dbdsopb7Ulub7uIPvsRPK6MjP/+Ak4QaLzm03ARQNO6dU1MhAP72gp77dGnwUZ6quM+BzALYWEFGvakN++sihUulg56k7gKkyHHKFXpHXqD7kiJ1iSDcQpCE+1eHZw8JoXz+hBA3Z2sTOZqPU+eYQszqcPWKjCpVfVvO1M3gq1BnRxnggTin70xgYK8e4Rp8mg5aGIyLSXv3eao3IjgswLRqqLmd+Sb2ACoaiE5rLHlj7ahNv0eklCiElU1b47wXPsHwvT+XBMPs8xtSX+/xtpfu9ouQNiAcmawJ4ZDSi0hGIKTQqdQ7tvb+gHrxi6qrLvL0Vxdfadfq9oWGCqHLahPnkBJhaMkc7CjqhPJZ0o3VXu7zkum+gVzJdRn3h0dyqQWnmB1AnUiU2rMFXwTJLtfC6ghMcw80mc2Z4XpK+xvbqNrkl9AAU4ZQ1p9OV+T3Z5cJXxTYQ1GdAGjg0GNmzlb+LgagZpG+bMFgV4s+Cf0K3XFfM82G61FIWg3LQ3TgPGtbtKYTz/AH7HxRS+GbXAKjFKRqkIwxCmNX62OhpvWe5QPIgx0KT/1eUs8e/imJ5/1jKKtr8nzZWV+U3t1/q4VdDDnGPN8yE2PU5ljSuQrVoJ1P20U7QGQXSqko26un4O3DGAvUmCbKT5HV9pp7d+foiDjcjooCfYZYNwk50zdxoB0AHMBjYq4YmkUKBhUWal+L7V0O7IabRhlneLNGawYK/Xsql1mt4lVsKZymwcWJTcShe5O+nGEJJxtNPcwXQ4xurcuPzoh03kFraKJIISf60jStBy2u7yjNzW6ebfyWew2rHNURixoohoaemSDktRxyoX0sodMvnQDVi1dOKNkVD5r/i8T9cyWUoQrHe8BknHpqjjNlfadm61LtzKOzIvBn3qtj15osshRAP9PUNSfRx6tOWC6ZD+R1N00VOUmv8wAvgg87ETMT2h7v5pT4x5VeCfWezEHXiyxXNp21GvX3RsgxE7QzZe2U7RU0rhjeMtO3Fp8RTEHqkQAjLmcjrxi7sy1Ao5cHPWgrsv7WBJeEvEraCiRHcHDaD0C4aSaBE4cGJUUGzRu9ydGgEhkDIIDQvE+tYGZNMVF9PeRxF2nLQgpzVWffiwv6z9y7nTTpsTinfHl9QO6nm9mH30CUf6BbfuCQHsmYncy6nfddCiRW1YAPz4ryzaSOaRywGULWtUL04ObOjBfYevyyDRniqm0umG6AYIF0+CjZDi26YRl82W2S1Db7XQaCha3cDnZeCUU0OuzOTwKKaU4hv0Mn/4hVhGOqUzmRZ7i+AIRE4y1Iy2jtgeyrC1OCaon4UVk6i/7oKWbDULk+gZl+IhiuOmd1kMSb5jWnA1dmbZOIu/grKzVcuN9PK1O7o88SPSckMWY1jWcD+jORQXNiZLMMM8VkSgWZwRA0K5o8f/8NTG0QV1yVzVu37JkhzSEA5K1LImkOb033HSzLJFo69KcfxqgbUP/cSS5rdhwtVB2G2NLWtqtjeeryPd+sdhqBa6shWlroOXNi/kwo0n7Anu+Z4hvHclAe327w4HuQMr4Zl6lQYelN6ua0tr8FeXpyCgc8kH4YibYSZ4lsZTTKMqvErY39gQtYvt5xGd8C1rM6klY1uc66OwQnFXReshEw2jLeB59xLMnVYRoUDvVN6copNphZ6JWk0ERIeETaevgJ8/xXg3URcuiDOwm6DxDFdg/pOvwf+b35mIHq1VSH8B9to0RQ5fqhBgJVTjR7SJjgExCStv3kJ+ViqOPFTXSGOp1bua+9mUIKwxIBtKVNfR+ibEqJ+oUo7D4OKI89P2mCNjH+jr8BDSvMqM0Kc8be8/9TBeWTxFfxW8HamyleIuApUQPQE9N4mV71WpcA6KAMX/9iyi1UwIQ5NxEkIY0NaG41Lhu7kRVh/gUglRu5dRR/NgXnhISuFW9wWYM66nplrYQU6CsHUWQlGJ3sNuTdBTebp4GgrFxvkcDurt1OP4AoZRu2qtBK6CM7ZeGHIgzrkWQ/wxHdDggXj2ojyvWcEaG6kRJlxZ0fGSnL8cpN5x8HFyE6ovuHT26T2ehnpG8kfphsPuD9coicYPbfsHCCrtURm0Jq8DDlTtFD8NW0PEGaK7sltZKB0dIaaxo2rItRw//k8E1HglYU5dkxFmUuyq2gXjnV7+y9rgeFA1ZKXP5oAXzAmCS1kqnbY3+tFvLdN06H0FCI+Z1dFF5V071rBymfWD9YrTyzVHQe77qm02AF9fcUnObFc3S7LUAgNBiJdF4IpjPio/OLIsB7THrJcTMbhN+yc098ACsG2XHwLzOstX5wCMMeKGq6YNvRd1CIIdTHa9IJxFRlkZwwbtDol0dSRtuBklKufk4e3LlfJ0TtBbtSmt2yjVMZrBAjaQOonIhObjjxlEEDiAfSHBlhT5GLZGcw3Gci59+0yd7Eg+PKYIKEIiRodT2dGgYhgI1UuZlZjxa21U86t9KYwHKXyG0x5xYcxwoabZL5qtJHN53rh+vZWwvCKJRvHZ8HHJ3SRF+FGdUYLr4kQLhyDk2KWiHwYIDr7vWsROB0skz9H/NN6I84TexrbjrGtzeRqJahAw2f/DVx+WabMPrw92ytDfv7BSOmzNsh+PYUV/NIwm8fJ+fR+6N42jXu0O7raKnmCVhWede7tmQ86OD+UqHtFmm8THK06+L6dG7NMb8gHzSgBoSe7f12vo4PsZw/HMgrl4X7M+HP5SL0ceLDl/0ovSS60nTTjff4a7DATv7Q5K/QN8rDovuFmp8ZsuMFqAozHzmvro2x9ACHIwCwCJoM+JUjztQ/LF62N1wNjkK0REroNOcvwK9vr8ZcOCRXuhWgzEe4fqyHOaJwHMlAgbEKqy5fdM8aYw9TbL28k44sIeSoxi7ik/IQ3wRGnl4+VROmQD0o49m1x4PxqWe8JbDLYFQjCmIwwFH2OX8u4pA1xfbEpjBtlxWtpdTN9hlj0tOrG83OrwVQAAu0KihLyxIeabjzOXPP4zvzpn0F30Z9avAvM1gD5TEB5kUYghP69a2dMZEu9mJ3yAsAkTvyRGG94n7sXND44hYpslVtsrWA9d5Wf/jNn4+CP3KmSm4DiI2EL+zO55DrE/aTUmKmX5Lr/YiiVVQ7d4+QODpvc5hbaH/wTRmFih9JctPNW58tOO2hax4xh7sIIQWAJk9s3eJCkFrxz1liLFiVpoUZSD8YTSXA5QBNdO/8cR62XCDXD6DFXngGyKQ13SQcbY9n4P7P+NIZpLrl7Jkx3W1Z5YNMdWtqMX0IVH5m1UfDq0LAJWUbxOR5PZWXPkmMe2C9FI1ev/rzHDoqn2eRPBbx4HdMnHf75nymhOSRA5YeprBjVilvXh89vg3V3OpifKN9m1h8V7FrLWfFk76awcWZ5IiRzS9Ebgbumr5YYbtIc5O+27eFMM9BoqAW4KlxVAGOnmC8qR4tc3JcTQnEL0jSvNmwr2/wE5KBlNQu6UF2WdidLTpzaOgfhkFNgrMy6deOABHSzIK8NiB+ykbR+HsFO5PRckiJ7+Fjxwl6lAiwMpRxIZYe5OgnNEbuVVHR3s1qDNmin77196igDpKK/0hGjAZNu7j64O2jF8jFnvD3kRF+yL3AsGA7ARRbSl4dps7hXPO/TC8hP/0e802B/mJG/XzT/BhVA6D4pfTBtnrzcrJgpeuDYr0deda3uNIuVC7g0WjFaCVvC9oZzWQJZzWELxhNayMED/883LU+n3A+0HbQobE+xn63Q5xCBOXe3h3UZLXTV/iAYIxiwY80wwBnKDX1IRjlYvqr2x18lXkerhqzpEjekmJad3qlBicmHOGaiEfmdoopgBTT+QW37rMrD9gcvd7RYnKUGAEv7lKRNWlizHHF4Ip+dU8Rpw+PaSBd88ZnPZiwLu+QmsQk771KBIEHvWE5vZFXm+0LGbKb75CcO36F00H6tUiRekNae710Z0pB1hmGT3VJGxGkxK+p1BfCEk3CkpdOKa4g75bY9nl/rG6ddIlHr68K2CzggWkRToBuNgQS7AXZ38CrRcf84ZGhqa7jKDBuVIgb50rAS39nXg5Qm3xXVcpW12VdxOi/g4Q1sn298UGFYleCJc7A/dIQm9X+uE5LgWRCu+imIdlWrX/yFWYzzhSb1j9+wzdVqfNGnBfyaFNG7Vn/o21U+mK7nQHs5gjxiqqXUx7x1EQz1gHBRX8VrKsQijpluB6qhLCyOlG+OCwJOZxdKRvGmOctoxxfKwfNAuCktmH09fq57Acal8ZdhoIq14EzOsMxZ5xiAoXP6VG2oHrCB8KCmOI95PlgsKC5UhGPqNkOh19bCgsGrvbLQTYVAevu7xBTw9y3MM6+MA9AjnXhnV3fUq23+fGs9brde8Vq+RNfuh76m+OVI4SbgoZzjCHXGeB7fiE9zG4Qgh0hlqblILpn5c3Yxd0qSWK9uDwKTEbEgPrNoaF/f0pl/hOIMZ//Z9DcFK8a13gmBAyw+sS3oVLpi2IWJeydGdHJQh045gretugqDb7tJQtT9nPq0tS4XuZPduuY3zu6hWMDJjtF5ZqqP8OV7hhUv9dBAACmnck+O0JjOZNEvard01EMGHvCo8tr3mVNtdaIg9Mfo98Sa0bHupgKZlsCrfRDXUsM4Xeym2jdC4s/kI0IkzQQfImFob6K9N7PzQotMySpaAFiDJR8/jIsjeFkbmTZyjlU0zJ7OQsHX/0cWSQcnn8i2U5W9SbKclPrtFP9IIBEt+ATlWSnFgCs1DfMXz6V1Devfz9l9zQW0yHd6e0itwpMh3pXtMaTlDCPtmTKE0XGHc0WEn/J4fTvAtohLuqyUxsMw4HHgXVVLFmJdb5M4GK3bghyQhcXuuzw6hdsENuaODXzD4178oVaLI+pIomokQXKaYVMoMkp7Cmwif+NgsDOxiuJ9xgwS2wTjSZ/1UClhaKRPkvMxFPhkJAboR6FAUmh/dTkqIRqrDL29fqrxKsjyMKnPGwpuKJ/ToxEVzWpToxVbFYnHzOYYdAorMhuMpHy1a5/E6iIyENL8Bw9KSwCqlQRkm3wgKs00tPfKcfZ6C23tjZOhF77MU4rPUKRfKKGU/HQm+k0WZGRDNUqQUG+PpsB5rBl0AslbHcsMx4K2DuoqYQn/ZnFMauMHgWMJB9cHe030M0i7QOg8ABQ+L9+aZcx3YE+b5ZRakavLh6fKYijXkR7hvqPlp/USE3H4A27rz5LyZja4xv0xTekB7mdtjpQysatD6AvmCoYgTiw0Ia770oMF3S56PjXZyaAuqUh2+v6fAD/FElomCUz2D1KeckW3Pu8SDCOwH3RVu2txu3mhGwSFD+Mepf/e3PdSb0f7tgzf/1vtvTtB0VQqNeIZ/XLnx3xlJ3DIYHqszV87GpBc19bKJ6BHnJyyBnHPeOcqVytAICWAEYtmmrPSaBeZuODkklfDFgjZerLhYRcNIHopNQ2DOl9k0M8KYIL+hqSK2w3VGeCaqHdmds8uKHhrbxjzBqnb02+SzVuVfe3a+OgAYrkT4IrrVrUiXobwaMUUoUDVLw/9FLkWJImtaeH+P8r/ggByxfb+81UKk6UmGf0CW6wnlSOn7KYZq32Yl+WmA6yvtkUgADy1XZTKgGrVwpczV9uvkL0IbXR4WBzbM9syi+eZPyZf/OzhpoM+Hzon1v/UBuDqpFwZbKeEfkLbrhDzP01aSbgWYmoYU/LVsjL0dklAxIdmA2puaVFUfE5zTf5TiW6tjPcQXyrfJAL2btfSoAwnFQM4x7YE2y2Ten0HXCmfAj5jU2lPR63T5ddE4JE6Qeoyvm2RPoFuvwRCZRnmRr1bwkaqjHRADPv4GvXmgNtRWPNapter6xgUH0ACYH5UVdYevT9z5kkXqfH+PU4IYKGIW44PgIy6m3i6C/U1Qm+jYE/O62wOkLJTNDav87gd1qKA/IK+JR2Xp2qCpCv5k5otaERzM63vkG832XrVHxLfLXySoulPBNnL+/vt9wBIjvASuvAQXgetVKNAnWjEeZMTmTGHej3hWk8M9wG72SAA1FXLpvXpp1+GViTuOGA/6jC0wH5jNJYSjkInxOGAdcMvXso/ueVM8C8puChvbGxodGIyvaDEnqTxrskhvOgiBWbXkkZ4wSdM5GP7VYsFfTZieZ6tCo3lmq33oeNobkJgoZl4OSTKVcYjBzMCkbfrEnj8R1oHc7Sq5uFw7t4m7spwqmk38TmlVp1mReGYoUoAuvKSKqW7oy0Jw92Snx5Uv/TlFHBBPdq0GbyiSDm9RJjD2uvRnL9RXumUSBTZDhzkBwA7oidVhwbuq5bw8Vl8QvOI3n4p/1KWFiT1CpaJsYNziTznm5ZERYHgsK35fo9kXYQKgj/hmDuuphUZGngTasycySHNqFPS+QIPQIzzfOPO0ni12hav5P6SqRCgUurUudHue3iiZgEIzdx/XL5Y3WE0DOYqg70/JLbiadyLszUAq+yB40QOQjPW8opGz7x4qwCszh9SlWj0/+m9BS/ojfJ7jO9qQmAw7nj65fP6PWpwaX2PvpAIh5sdcigXActMd4ltI7crex7p/k/mdjL5wa6DnrxZJpdga/JzuYe/QlnT+SworunQXRZl8HW7nBk2ihv+bfmrsxc9VSwla99NeDQRDntWXwBRWHMXnaQZ3We76aIDWjGzGyVHWpvNOxhoaT2lBXLBhMlsLfpchz+w854D+VQBadkSjYh5bA0miubwniN98TWTYVhldj0kZpMtetUO30vxFopIOCVahflQtVvL0GCoBBFeTq/ayQCFxG983Fky7blp46fC6zt9J7pchVdGvPUnxZfNEj26YOPgbF++xxnsEFeLcftR7Cnt5/6XHKGkVLNhZz37hG9vRbNKUaMypRU/ehIzRdeTqWeeoLufAULGsGgVG+GStDyDttvHcegbYkxrXQ31SPtDEYj/SKt2kAQAUTnAGDf7Oo2+9cvLCpeOlw+gA3reCqsnz2N7DXLPJX/fEKVvnDv1ESAoU9yU4iIC12HwCZqbN0tA2Nevp06FXBaCeeStE9Ep34oXAyQtkFdHZlva8CVb7H+BWKwbauDh8ywanRDSWlaB8crhTr6onX8BuhT1Pt+sAKbs6OpE+xH3gdmuZLUYnwtAuXfK9fdzV0iStIAmSAN0Kc7DRvfLKj74vUFoimTKAxM4PkcrVz6/KSeHJS9OLZGxYPBMA5a4iy5zt9m8xSDAoWokyGGl1uHIw/Mpb6NFflk/7TsObHf912RB4O+11KfpXGtDJJo0GD5v1llCZbCGeiiZEac6/LuNFETbleyziU1mUeQerCl2YFVHOvWqYqkf7OlTFc+lVdYZGD5k+jPkhdYgK2WdGwRaxBlSJtI89PMgnru+Px9Q4Y/qggkHA8XBt0P7t7FkXgK4hGY9sLpLaqCc3iwyhiUYGsqCsyAvrSm2KlfGkIxfqsJH/FD2sIP6s12D45UE2wgnuBYwGrVQqxdTTSUTTU/p8mNfaDsdbvAfpFIwZtfHB5nGQBX7cCh2oKwb6GgdnGUpP3Lwucy7jbNu+7wv6PKAz/sxaR5XR62krRismuaM0eAw68MifX0tP16cbAOYdiSf8mAUBNBnQQFYUXUJhFLkMcSTyJdTZlCLL22etmKHBU8HJo5KGt1UiDImp/X/dH5yZB7F91PBvaAtLCeIG/bpkOJZ4Ufz/d142Hi2eBKCZpWDkq0nBcOkxYlHnqiJ71ohx8c7NAmVSZ1nV46KTNVqbckP6RzvojVF7t62VIoSG2SSBgUCGaVAbqtk904xkbcyIhTRGRgzUxTCrRCt7u7ekSVufjnXLAvB9BHTWMaW+DIlSTSrC3xEuP7kKTAYdTwA9Ayn8Z4KDMNFIsm7x0n7x8iXoD2QkyGkLn7LYb/SykooD2KpkAtTttx0Ucu9Vb08cbhDkEerMb99modkBsF8DAYFQ8ZOQxu7V/OqAu4W1QiiCx9HVNmXGHtFEHohZgo+eC9f9W6FBGXyA+mxJY/w3c0IWCo6yXtRGgnDeoF8fj4mtJGwQw/OLT3pMvBVltphJTvaQFiBvuKo0V+HibdkGH4rWac6qb5sw9kksjmwyfAvtpzdg4sghW8pUd8NKnyaMYwIYeZcaJxxEyMBZQWO4oEBi3Zt+MkzZbFTJJESYwFqRzTp6+JPeVSECQzuo9fv13sOCu1FE3mQm9uxYaC4I3RMpHJgZtzolt5P048iK1YDSTwDy6Dvck12yEZyM/k5hP5jZRqP/83iBdvduasZ2ORyZqd9rcG1cUOLIOM7aHSgdA8DBM4xfIL1uMJPCMY03it8hnIxCqYi33s1dmjvJkFzUc54wurJv53TggXUhTkQfxUCz3OG7uSioaI35Gtm3zuKtlcQNswsgonMC3w+3iCaKOi9seV4cqqK/FMBecs5iORIvUBvWdJLGYCctnntmtaN4arZ87O/dqwldxGaPI1bJ5Jzzpg8vg2jj6yZ67CaAEeohuF6lBZcPbiqyCapPayJas52JdnNaAb687Chyw8VXA7ExB+cv7QVzgApG9xDPPZZCYZW2WmJhRXqo8sucF4iiTLzuk6FFWG5HPYPLq75v7NWOeMUuBJMQh8Yk5uVgLpEf7+EKN7FPiyGr5krWduVxekwuXJCke5KgFc9OezbhKw4onpnqSvqXhhpGekf1S6rfi6ZN3u3Alg3HPBt/6Opubt5KXICIEISGFREi109eLsdPurh+uRAwSRclhzObH4c3urzfc1AazmVvPrRPxHJtCHQxBU3NDOAztG1jvPJI7qlfWXcNqEMi5VX+RFKwepLWrEzZzJ3GebdEl+3ZIuo0nPi7FejjUmCxvIBeqNhXhN8zMTciRPItPjzDtS5pTb6j1h+2rdHM75JTJdCNCabHr+9tXyYEW4ltrghQKoQqZvxCqlbHOKHcchXFLD/nbHYmmv0GDNw0MCEgi3WkxfOGb4LPzTwHbnLRK3VaomZg2iHAciAMwEv6KRHZArhCtocs/YUE3x5UUmILwmrI76IPzvrvQogXSnWnTohNDM4SwznFCKV+ivkzVXPWLOST/4twYAkn/BGxpNvhZELjZQbOdLs3J7AZEgknbkOClEoU+uYjDtL6cKT6nCASXYA7SxUUBaKtV5bTY61dvUHU+/N5DuArFHJw9SX5v3sVpSbGHHq1/UfLsRmtcBcW9sNhefgUHOdhrMC7884+ogYnGHFuqOJqkwmKY6VLJacgaxeiwBAdseMRfU8Psx7kQaRwplonKlYXVDoHgcYwUKmIajAR5PRaHdJqvpcn1kp/G46qcnWiH75bcjCjZ68QhE699yWG9pB0Oz13jrCeuhV2SOHuMLFvltM6XBHMFTf4F+HsYvs58sY/Ou3PYXcL7JZnKvw9FUc+gaQQIyBnCCdUFf7CNWj3mAVPVub1RHX642r1vXkIlxRQa23YsqKTD7dswOwXw47/4Z8IVV7+4OsIp+G01IalV05KnY+Zj1DeT2AqJhIqS6cDXPauQIYjD383DzKKPxDUArUSQhT7NmgV0luvQv/UdqBIjC1LpwV88meKoKyqt9OHCy2XAo6Vu2g3IXSb4+L+nmNgLohyv9mbkXsZErWlUGjgRktCGKIflSbJA6ep8y72FrbtenZf3K5zZgYHd81WR0+zrFMMyOPXZjBQGtXJMR6MPHN8rvd+qhwsuJl21YcfMhlsskxWfMNaw8hfG08cjqwEeuWBdSPtFfuVyUq/Ee+rmDcB04oR9whNkf+5KhbeGQvX7jvcFsKnJLRo4YBiAcI3ySKrzVnlnud9iASzW071yWYk3XapvPeNDtQ7R/hJ6nJiBtBpR1Qtg70FgPbxziErUnCct9vLhjuEeEYhNXg4NiaNY26NE62xtS7skwytGezLH8p37zEbL0W8Ydd6l4QF4GLAui9hD0xDYozW+rFmPGOv+nK8f175vD1+xhSGZ6WWrRtHt6Q5lE+fzKn8g0mGMlkCVKRQkDEy0OSQSUPu1Uno9KnXbwSaZjHLf3we832wLtYyc/xrwjULihqoQ2sU6m4dEOYWY1MIrXVHQhgUvrcAeWF0DS3UBmHh4asNAKRoKV4qErx56SjrAjk1cTD8wGutfz293LHyyhBk81sxkFeLwINDSkcNzMSUiV2S58cFDB2LFpDxHtJir8fYnLyJlgZkBdBfrCRbaQP5fkljpHi1Sv5xOLPTyR1dtuynvV+C89How10yGH6KGgS1fgRA9+p4GxCQqKexFq1LTXZfz/kT/Q8/INetg3k9mahEGO3dCgYRaAY6wm2Yy14A3tEcer1PjaAJcHni4qL3OC4zsYr5ROLifFRX8vSj0ZC0GdwWzTSxqJGxJZcfcwT8Sfqx7bIJ+ivB9bl60Yg9FAxdCjz8Hjk5lupaXERRxsd5e3uGf998uFQaaA39GD+OZNMg0BdSJ7Hq7YPO/mbwfaQwVUKNp9ZzAyEwNxbqlviz7DBm6BxUyl/YShn5cCthxhQSYjPmna7+0p7rdPFsJuQgS0iHs+CO/QR1Pkx0kUXqsuMI59J840Uq9GZGEeSfdS4XjeicyUsO3PfAQLlPgDBWajJIo9JEV/9KOq7LcH0V9wYmoThm7YuzZ7jlK4TlJuzWcMgHxGUjZuN0zKj19l+Rd1nee91Ze2hQG9bIeuiHOgzaC8UUVUOtHdeO/dl/2gd/JLOeu5HB8ukPPYw2L+uqp4aDD1X0TSFgb7kNQ+6oIC7bZxsx6EZWqMorWlkhjNi/8BTocOww8pF9BNqUP1b1Mc2hwaOR/gGPgsNfhLvVJswvhBcJ7l8t+R+3x/DYmnKV9RDyApWPmD0AKQK+PFdcCwIo3VuJ/oBBKbyBcLl/ydPu0EAX+SAGsocix/AAQTN/YAuH6NnaZa6YeFQyXMsaLukWhc/qfkCTBC4pwhKCkdOU5qogt1srD8vcWpiTiFqud66QzoSg0WeX+s701CGoN1IALqFVyNNmMg6/G6cVwMi0pUZMhcERVSIeA5egNOyGvzeRjavToBsv3X691KKhKGk7S922nUlFxaVA2jfWLi6VY1By3oSDgy29o3Y7rTvztJh5DZICwEFJgPMHF43w6kj8XwF1f5APtB0EDE9IQRaFvljU1hYuHc1kw6IbxP97wdkcbQiArV45h/bm5FHJhjwSzowbcShcx4CO4y+xKzKApn4XxyH4OWxJ0eD1b8xdCroU1yct64ZgkDI1bs6AV/PETc/DytivzaIV05jGFjhqkwVG/leQO7HUa7/nuuO5D9s20d0juPE5S2k2x9Si2sqqLVeXOvJBr278zqjCS/ob5a0AuUQfBhMXCNEtPn5dBu3PpY3wDVlOBkR3JQLZY23k+cuyzyaZCVWugtBs6gqy1js8n465+4soNKPKvSN2o3hWvi/JUv+vEgLEaL1+P+PWbxjaTzmW5VleT4TP9BaX2qxX06SwA8JzOPsPuvhaArAFMi4GrT2giy0HmEg6bQ6PYqrXJtBENea5Sqifm+f4LeFk8fE2X6/4NAc6oyPlVIgiKAWmHdOvPPJyjgTHY4nRNRq3MWPedHlhxlcXaRKOeexiigDfVrv/2DkBm3aVxBCsYp1Z+0y5KtqE1q5YTeriOvhcYaCmEQHTsri/Jk9edEsZFSr5xE1LzyGdaecIGdFaJtE12IoY/zuSrHBmHkZ7ofhH3c5dNvFJW0Vlx+UDz3O9qZy9g9fxJIl8JJDnlrl+Fk6oEiZMp0Vme/EGiImeipTiOYTOceYUQqlNzWfRzHirqExSYcuwmjtAkrHSXxc/Sm3L+XfKfajWK3/4mjpBYfXFdA5b+PFKhT04E0uaD4c7zPXtzC2TjC0dZ18YScxpC6c7+r4IzIG4K4jN61D1cFocjQ34YWhfCz2PzNEaSN1wEvVGIQuZlA56pLmdfSoRS1uuVsq58nj6uSa+bp9w4D0PenA5IKkzEMmK1QrHr5Ur+UxPWXxUjL5O09Wzyz4TSIGYFtPcZeC8Ish7/LKjAUmiF43dtl19Ud50D/+meSCOr8mOKzA8ioKg+kC7mVh164G+MMoQ9UmFwCmmLOKZe6LzIwoSUQ8nHkjZFk1r0PqLHpeZvKMCT8dcNZVY5/rjoXR/z92sd/iOC3wtYRi7HPAdIiY3iTMIvelxDoUhf+X8OB1UoOVbqTw68mUhap5vsNhVslNl1PgxUR6v0HkDXyGarYmfgTjvddVpKIPtuhCOuShLdC0hq6mHA9bZidWOZX2dwY+twhN0sKYhIvlo5jiIIwaGwrOygEMwU7lkPzIm3gyNOTsbzGdmGy/chJcjv0HqCkxQEcYxWLoxq3pXDfUkZzrPGF2S7WRwRS5DokfHrRYXYa2LaFPgyXq6PHGBLLn50dIJH/YcG++bbqM7sTmQYZR+juH4rgI1sC423N01FNHCCj2NvJdAdnPSI3AgGw7DHI6tivnE184bBwfW1aYXqfWdyYtWjaYdM5Xq86YXo4a14rfa0mxRs5huI3MdOtRLa+gbFxub9Ee1hQuYaxHwVrdIC0Nu2zqfUkavxAuFJ5dEo2aP6YBXLHKZbIFJVEFTlBvfuvV/6P3vIwe1Rcdr/xg73ZMpVZvb0u7BHXqld1Fh2iTrFoI6Vjm2VUWHeEUZ3cgXxT5gypngGnE9r0tO+jJeYmQIDlPqWtuPO4Nsln4V32SkvbAy7N6/6mssIVOXh5PlXv9/PJ6J4K7nIsCGNDbQYdAnKCFjwNP0mD5AClBu45OGx3w4V4BLreQ8HRatE7rsc1OcullhT3YGa1GBzly2/yY8zyF2icBVRZhxZjWPep+nHZ0g2D/ZEytTGN8i0QtrNdRPCQNaVUdHz2QJZlp5fL/W2UZSdb8reTwXkJQLh+dzJVnubY/dy1cVI5TWeazXHKXP825H/5L79xE4iiX1aqJ/gIPrXHTF1RuX9XD4+fwICUe4nLr+gXUBgGpYkRA1vC3tXJBWUvlP9cMS39aiXl6M8D50rJB2HDFLx08Ge9V8k6njPBuWFK0DgmZw7ENTCPlSR6mTLnvKoNsuaiQbqPkjySe1njNIVoNXtiQxOYh8LeGZ9STT8HsfpswRKbAX54cpY+yVnlf35QqAjtc6a+4Y3DtU2wR2QnjB1QJDRYTooJoFlA3boC4MuQHjHPDdkLr1M4eiHUOOD0jREM978yv+OTc5LqGgI54W8ViW04pD5wnLTquBCYrkdlSqrslSjKf1TzSZRoEznx6ZcyPV2SGyuNAMUA+wEtL0qwf6XGwMLC3wjU3p72cFFeD+nCFuAGM4GfcoRsXBNrlnvZKWL16BCZ92hKfY6r/u1h7ZFHoDlwZ7Us0l/YRCCRZLd8usCCZPS+f3QBtlQKEWHdQHR88KSisqLZhj0Ddp+PpDLdegcuZ59f+ZwimriXC0q62D7of2dwIexOEh+5u7yvIL3PLvxQEqA5491dSk2NPaeWOgbr//Ht9Eb0tW5V9VqsmOSbhD3xfrtUdRxSnPSfC2xvJUpRpufzdAF+UVsnhCI3x0GaPDhL3LPEJl4+Y9LViCxMDV3C82U4eZQayD9Y9KjE++mpU6ACfATcc6vDqcWi4lSn//Y6ik05l/C0tNEqsddotxmiL+ZBuEf/txaFk5ofDsPaiSnMYwC3ogRGrxXpzo3upuMWaIiiT+d4oOewk32JJMSDRJb/lqB98ef0WpAnXzGeAUwfFkjm+GknIdBYVtVcHHW8tKJVARgkXTng9/+FO/vPQgHdd0Etnd8PdNQl1EAqH1GZvDDZkogHIW+lu/rChmUE/0Mq8tRVBcC5+iKeGypF4qKJz7FKk9znyWO33H/Wxu5jNfztLavnKeG6z1Vtn/ZBLyVSikj4+/8LFpHRRNEykE7nI2rFphchgY2nEKpOb2zwVlmeyk8OW77O3RzorqYDRyhPgMiNUw8lq78WVan3TNVHYh6WiBRfuZ+Ii409/iliku7t/neumtCNHkcGDUn5uowgFdzxIixNNubmUmBVYfnBLt/rHrnU3+ahS8FTIvZ6Q1ZdxgDwRpWTg0zzOyNg/SPGjTNwwmHTwXpsbcS2akvlBUWF2I0JHYfCxSIqnuHxrydXlQe0RsgzEQplSybmQ0AEKleCB/3xUyifKPLQLY5xEno4THA5kkKRR2siJFhE945DCh/RNi/lE57Yat3hV6gngdhLd59XqImnrHv2StpHDNNftoQVfEoIJyDpDyvaS66r4ellGaf3mVbwZats+CB/9mjXrPmjPFJ32225rOXlDTzVc4GandB8InCOW5ETxK0zF93RUFNc7tthkXIBmAn1a9B69ll8QOKMRnm9dPfkIL4jiggXQbazsQKyy0YCu+PGJ4Ep3kcEJY3s8dFRyQW89RqOoUJoaOMPP7a+uTpqdhuHgcNCNVwuRwzTfjpQudiNCKIElIR+F1wCV2413hgkhok9clox5UP0vpkMxNektTi0iKu2xU9P7xA5BjQO8fJmMvLuz9BAM1PH2bFXmB7ckOML6pvQGICLNakfnlM1k1MZxuSrrWBgeu5CsWpE285fmupQmRmg7I3uSkyBUGnE0zCEPbYOnTl0nYNPZXNtl4xWJl8I39E9xDZsXmh5edI4NxR6ickyMJADTPIIy3KIpMMTIP+HK2jN18Qah+QZYgB6iFNRUZy7MdxweEK84pyBpi8JTL76WteZlkObGl+HZIy706cHfAHq0Dx3lLN0E2/g7WEjx2TkGQzfl6LWyr9CpwOcZp36xVQtPED8Ryg4wfUh9XfO5feWp9t1mnEU4XcmfOyGwM/jJPdMBM4SWCWbm08xp/MguDCqsqR+Hu7IWjIZmwSp4iPS7BVhd1qyESIruwpsa93NAV2Ye30jynRlbD6e9o0YMOS3a5YKKM+FvcyfjTcf/qLpbsJ1kvpfnrMsTeLG1pJE+gO23Wttxc4rGEogEFWEYl4DQo8L52cEJWg7skCVjQuPW3n8CG+0nXdZ/dm0A/BUTTnaYTlUTJ+rodEHiXaJrbhXJnWNP2rcySgNvFzsLzerhe5CfnSXB8OHmO59HS5ofP0To0qG0CAFKVDr2YTSPpO2O72C1GgqPxpT6LSvZWbbKuj9WrMBzuBFWrO+r86h7qTyurscjwYwQsKRK1AFGDBiSjEhDO0lnrJdg7pZf9F+rosAZu3jTTN+WzB4fOh16TdhKorzADOpXMamj7K8Hk+HOzpDIlAWpLm/Ih0vpuBp6qHPVwmjnW0HFBoblNItu8e8wGVbaZ4yA+YC5WawMRIiwKD8+iP4r1rOqVSYSc/kUhvHEqacdQGQNztCk6kngj/U4fnFpV0VPzn3T87IbBkB5meByUvoLwZbBrVse+stfsjfX2/TlX/Os/1MUJwIyG6MGy7ype1NZD8RuWdizA9oZbj8+hx32nM/clxXMvnwktka10E6MluK3RxazsJJDmLuogwOBj/sCzjzwJG9Rx0Dg+hxvVNtQOf2ACsM7e2U88boWZWIXnxOtNc4aDM6k2KTk5u2YX6vfLxnZAiD1Hpba0WNijes3co8ayPw7he9oICDxA11aocbt9OG+3Bj81b5Ije4f0XUzCRUf5ymlOS4peMx2dBhmfG0hIc6oReUMSjqKr93wx6PapdC5MI7pxWNDRsIJYPLC2RAS56kKP7zKtR2WJAWhi3RKiw5IIYIKzonYwS6U3/8qMI1mvIa+rvyZOLiuXtDDzrPcJv/MqRphdB3R+KH8C8LScEkGNjqhatiRoUNtI8tEgIEenToe5OFvGsMvq5s3X6m5WcQk7HbtZp5dPFYieOvysSaeLjJRuMRmL6KkdaHTpNYXqwKQjv0Rx8n79JO/eUyNFLlcHUWXgMuzwUK9+sxaV7paD5RJrtuyjLRAx1lHIEeKiP9VPLKAasBC75cCsYO/4c84wnPOqDLCCmF4AyNqHM1oojnKySX8UdgCLq8AD4y7qZ3U4AnFv9zYabFWQtcBHRD7RdKGWfJo+ekft+XwjQCJfOLTGlWYLvoklRM8CwMEcMEaqDqpq4w8G4Rg8ZB/xBqyxyUJ21IkCrTXOJDmzMBWiJV5n/sG0T3GsT2grL/Uxt1KmLUSOSAxAoAMrjlT4tEClXNQXsMKP/7jBxe844d/cvQ0WHcsgkAPF5bmyBGCwKqjJZ0ua49740jIrBT2Yl5xw+bkzJRgquy5KQrYlKEl/gWCel66DK7Pztoj80V/F2YXZ4vvbErkYmCLKtq08SIdwPOqHpYJEl1tKa+YDp3yH4ETf13gSrUJcPFGLLzrC+aCZpu5YkvmTYgO8CD+sA1tCesdljMuIuTOxeU2qvvqbuj4B2jdXNs/m0N9aCRMDDIDlwAfCF46s31twhlD5KQ1t5KMf8fWlRAHUmzPlgbYob5CiJWu39mtazPCupwD3SYW0nUnTnt1QXfn9XqIoOTnY2SUrKEsuxWsX9AClt1CrGofF934wph76IwgGBDRn4T3e1OAUhYqiUlM7j4keRoofqE/tNuqVAi0qq3kWbxS3E39eg9m6eyoe/j4T4Cbn5kNuhkKvFG60lc56julciqLuQUG2dOJ5aUMuX9cgraTxFkFnveDwoqsiZKicbVu1bWIUbW/3OdZ5C1X6ztAJEraWe2JcTo7xKKHioI3WpO7wnRksKjJhuXBzaVWV7NAsd7G3GJB7ozV9/39oOgmyj/VHyh183ZO7wywa46YkCSwuOykkSbDtRyh3oE0H/1IglfHncOmHTwFN/yKw31UfPeXxCFy+yuLNjwmJT1r0Mx025HgZDtigXu8gX8Z1M9kvct/Z6jfUbKg4N4y2EaLBQKx8awB8zr79Z+57xUfDjSP+sEvAOtgG/DmFgRP7vL5rkmWt00cdVnV23Rm6HpmNLzSlQldUedSi8ShCxny4wYtkD9wlB5I/Fa7cWB2LvLGJBTLL2rr9Jkl2Sl9b9iWlJ7RI0l5yDbTrTFljiUdaEdUaYC1htyRv30rFEHXSdMMiwGLTkRrxFmCYTiz5JyJ/1U6brckjdadgQB2PJzlJmAFhfKTPlYBQEvvxgT6HBHw/QXBJ+CahshnFyWyw5o6pPmpimNw4STKNN0tCFpynIghPpaXeXN2hZpXr9zTDwhl/jDCIEka3hapJwgly/dQC/54whnx2Vauf1hLF52MwKAV9CF2J+u86G/H8MiBs/AoH6xhPToeMJqW+c7FFXoewdBlucUWk4e+D+0escW88NG3SFBpwo/Jv7KPBjpI23Hd5rN1BKSsbb6rGmwIMVcnVzt8Xz1IAjmkulTUlfocdASAA2Mmgr0zkzarHYP3hxOgOYVPi0RRhPpIfC9E7rdFWKwysVeQarQ+QAjgBccI4iqwhEiA4t0yFbcm10AMoJrIIecg6NsDTumACWvDvmzbuYJ38fLC3IftO7l4kPemoHIBvcaIgMQrAti5WuM8GkOFAcScEBZT9WyyziTU4Wy/pMbmIxHrMdoaRi+3R4WJ+m9zMPLyamHy2OK7RA795bzQ7o37GdqiqLZEvRS4rTvo0QEo+h9Z5pnzUERvbTY3k7xoPd8Gqh4Iil4hT0dNkN4dWOxC8RjOH5Q/cvI8Eli/Fje6LDJLyFQ03j2gdJvqjGyka18kL4Co1cgQkMOMv7I27H61vNaWKL/WfSYpJvWKi37sLlKkaBc4CRqN5wnJNNxqD0+CgfoBOVnkpMDanjFUfWqQps8H7ti9s21sgRpDwIhA9evwV6Rjxu6h6fpFoW6ewGjKqsemZCeM7ralkxr++k6Qg3OnB2okjA2+hr1XAnSg+Mld1LXEC43imF250Lar3TvMRmTZGnd+nK44mkMaLPORwZ9qFNDfTuV01SV1MyiB6YThw4YVR3pPzS8HlIdOuWZU5TZIua6N5YKPIy7hEZ+l6LoEzNq2Vhnq35Q9eZ7P3JLgMTD2ycITZq0XwgbVBycPkhPpgNLD7O9+CUlFxgjgkTIIwwmGLEpcw+leLctZwm6VjHeNjCGSI3nukTAXk2sIt7H9o5wW70YX6ylXdDnAAi4hr9GGPVElSBxdYXzZLgPh29SixsFVTcIln8XV4pfrY5Y0JTy+meynDQOfcdbdfn0yMf3VtlUJTYV+z8kJ3BfVPiKGHz41kFTkVZDEulh8TSpvwL21Mgk76wPZxwYx+HZMjDdksDXUZcttFrlJ4u6Bmhh8oARAupuCKDzcwbfRZ7PSiaYkcPsJOc4W2QXVyPk7Ncr3Yv/UFwHODO+0FUY36OhtzvTNxhZORnql+7hXh9p/8nJG2zLxzCnVkEMCoBLvknXPJIxW+WIqnGt5EsHg383XX7nyiVMIPR4PX7aVjSUdM8X2clmeX3mnFxb2QIN+GUzM0/z7b48yDHZ1Wczt1CD4kkk0Ba0SviNTG08AuFEK/zkv56FMcu5KvfKNlNKr+kEqhXlid4+APlpUOO4Ou5izusdaLuJm3jzUdZao2CLndtamg+zmNt321k9Ty2mXog8RS9webZV+3NzfJcw778Y87iGrDEtPkR3BiNisVGqkDrX1QMVOwSZ0bnqqIeHiPMJbaKwaDCv/Z2MN4EsTnbgTSUvSkpxkKdqaeiQbMSn80NU5FCYgFulwDyC0KlIvz1hxqYq++jWfmjEjC7fCICHtVsZlo/BCizPlf6JyaJnqju+eMVJrtUZgcIxRPQzsSFrR8CPyPg1oCNQGzjJqJl3ZqWIK6RY5IIGXUUVECrd0zQw3Lf5lSGw/6oBl9QNGN4luwAiqiY2BhhNNajUdNHvN4RKlsKt28A+yikmJkr+VGb9szv26mxToLNoc+54bnkL4EcYGberfvzZN9t1Fttl2xcsLEBbIZtApjoaicBMBmEF0ajO7+HwPVHqvMOJtFUbnBc3DDv68OIUS3MZKQ8YJZs2BxKx8P20+ONsEm7z6V70BpX+yr6lI0UFoRHXFQn3mVDuJ+skRg+K1L//9tlg6gLDPn/ZKCiSxUiAcGbrPKGPNSPeUvrtQHGy9Qzz/TflmFNeJ0HB76NhdDX9PML/xaoG/x0CjzmxD15738rcH/r4BzjgTXc6pyTIxl96HD5yvp/4u/F/f6nX1Z+PxOLZP6sgtxA3bl63j/cAykXsy+NaViZdOV7m5Nj6NaIF33ajmH2b7mUlS2e6Y1niQgQVlwLq0QgwY/+i/d8Ep4edM/nNfS1S2G0DAIBrkLhYqdvFeFvyDv/2+J0uMRibBarqivX5MMxavRbvqUqaaQT+xJMxUT3UnnT0w/laho7yDt3AtVLC3cv8ccd0t3NVH4SqIGW2/p1ONjVbOLvjFZw8gvTo1pzmnH0u6Srx9f/SrMsxXPkXLLjw207mBfj2qrokmmjG8gM+DqJyIcRCjLLMY8MHfWjua6U8qiGelF/w/px1vfaQFu/zvdx71XbM1lBNWHycZkhCzNSHWd7Et7cb1nklRyqMHaBad9loJ2uFvls3F92fKKXDy7wYlVCzJE+inOs/DFqKH+bPFZeZnpNRq3m5q1MM2SpkHlU4+56zxFUMYB/Q1XXTOe8D+iqcwchYWz+4XEVNMwRACeq/JCFp+SHFNF6M4qu9gDCJ97eD5LuldSzRJwbWCtz024gO5o1ZqaZqrCpDNc33tPkS33p3BdfP8skR3uysWYutYx37Njw9C4tATGvdVq9XoqMS/gEoC/81hc1qL8Ta1zmm8JI4IS/Ubr+Bq8q03TkaOjl5NcIGrsDK45Pua/dGa+/2GcyuiETh1LW/dGYBIsz7TtRWW7cvIybA+xV7WbPQoP9w2f9JwkoUhrc27Z1j8RQuDUFpaONjUA1WERy1Y6hUMnMb0zqZ39ywOsEN/we2WOQUaoHhYND1x+eCFpMYIIH+nrmk9D5pARs2xQB5SNW7d/hxSuK5xR5McDexVKZ0YxMBDQCy/kGXFroTYotOWkhbWY5XhJWrNMyN2hZPofEATSaGyupbKAmtlIifdVEdjTYJyCAqZLmqtyjSHnAexlcnvwdZUozgfWp+QkjjBaEzi22LV41PRz8XgRs4yXrunw6qDrz6YVmuhO2+g965PqjN1hpT6DJm67BCQ16db8cC3CNq/khZx4Fv6VQanWSFTZLsPq3RpNb+ILw67dKP889NopnsB/EPQGp+bDlYOaLeNORu/ocrx6MpuJAuH3tJkOvb3vw4c+DnL3k/Y0ewJSwcTLDfyTw+QIimpz0GHic6+bHja2GDrKz2hSxIBOuiXoIcuY6w7/3yzUEvdC8usGXmd080DzXEitsAzW8iFvxKUethLv6x6pIUhpyWszbnCynZoX/9yuqphGUJorpymFkrY+C/xmLm22HRs3zH3f0I8ifA6HW3wNu+mkjUdRlmWxoI7Vm62kofxVjxcWZ9wyOWBn4FVNoDGtWMrv+px3ZzpqsWPaMbJ0fB1nBMCHCvJOIj825On0H13133WQsdZEPDiidDACKJxlmsslyh8APYwWTn1HaurHImTVjZa99JDVXEDip/Ioqnuzs9Jom1OfyhiNSpRhSebH0gqELVWyAs+4mTSSu4WJ8mcC57InStA8heMhV9wiLGRCUrhlH+lMHSlBqdz98ZcNBjcYEae5s7kwWsrMCUbBn04f3r2sNl1woLSYPUZy0zygjkGMVl7bfnJyDc1iRSbsFBW68kkgeuWYyKHLejYE4DHZtOWArUgOtXQm9oAC/2yacZ8MTfnYfWNNCVjtWlbn6h8bAW2mqEjiSpTv20Q1BYRv14ZGI2c4Pq3FRjUHP2m5xS+MYKxyLTSF9Wzc5PAwiVi2ywY59y5hTuKEWxtyj2IdTl1i1O2ZucQ1l6Zz52aF3aPY1OYNzclydgRi3l1pK2qROuWjHkx9RQiBERM1E6eATbA5z+RmraUoDHd3t/Ji43xcLiyOGRXCz3BU1V1ImuxhDi29NOJTOYTbMksY1uH/5ogtnvpsT4J48vk30Yfa+Jyo7YBe7gfPE03xVVP9uf+BxZTSqiAxqRfKLGEA9DCF7z2fc3kJHFtIJaC2g3A5kBFMQEozhKSBP0HQenWSuGRUZqgYAc34dRqZPZPqfbLfOTEt9ZOqsWqaVwciw1Ned0Tz7uQXSZbgfHu3MOhoI/sUu6qrhLR61BjuR04smttDdeGW7rs2//769wRjhntq7I0OvVTfkcg68Sr3fxOKMa4Sk/XnmV0a4KWKBOeOMf+SSWcuhixHavk2ftVDNrSo0kTDAtLdIxAG3UnNE+dkBLLsbIglm/hi533AaDpS3/ehpV81WlrMGE9rMzwFVYSOHJr57zkXB/ZNp5sI3OPh3422qTxp2TkT9ozDWyvZdFsfYRHKpA6yI6GfYIgWRUo41vBdcYxWvi37qTKadqlafVfkwsWR562hBIw8LwtQJSegW/RE1MxGyiSD2PU02KXH82G+47S/tH4GiSoUDM9MvT6LO6ittggPLvHMFhPfbyojrMC7OAAcm12itydJMABC3fxEpyWBeEDCG3C6osnpiOPMsVRBGZkE2GY0kVtVhRcA4fUTe5GbVIlDkLbTEW8dY55Bilork7Ym+qPXl+fNsgAza8DAAcZKr0wALx7L00scItEjsFymkUQKmh1rZmJmX80e5Z6lg23X4KhYcomcVjTCTTug+Ev1flbhcVJHgzwHqfK69K1EJZp0etwRKg4YSpMOwjoBqdefkgZPG1m9jMs9pXreh9+LujSWVQjCa2C3aHbwGKGNdWYmnJB7iL0cXWsGjZzhJTlJklF3RXO8o8Oju7vszWMjOz8Qjv4d3Vq14bH6vxsp0pAAxORsIKnReplAGgsq+WZkEyFzEdzVeiP7xjHPwg4d3qEeVJzbGVUJiDrTPa5e91Qt7g+uukAPQLqxVNNLPaz/suXb2yjwxCHKofwR6MRzn5cwrg3irZrM+1/MsYDFNw1HtdvZT2Sl9Jr7lUCCL3zv2j76OWZobooSc+T2o78uMxt7XAvHLJSfCmzG3InWPQ8HB39/Hr9F+TD7298CL6iRBgmXBCoDeUWgAP7E/pD4rPHi4WQqiE+aKPKV7eq3sF4G/zIkvU8qYd7feGkMQ8h4/9fclvuTMo4LiAZ9wFLfRyNiJ8pgQj2z6E36H1N+6NAXMRUrKz1gWx3PTylktsBHtP4+TuGclj3IEzceiZhBmwH//fMDAjcAG+LrExZ5h7HsweWdd7SWi+5dIP4JU5tT+j0MXkKQG1b4cF8GtkLClg6TcSUWiiqRBW6R6Hsyf3hURWgyGafD7qJykK238xDm7yNcPOU7QG3xl9KkO7nzXVtM87M2+VcFuMwYmE1I8eEgZnp6MABs0+zfMZRN8MnBRL71FsT1YOVg1ya3fK/GjYs1jpjgmHrhqKaSY5LYbMORwNvEhCjsjZ68Y7Nf1Ftk08HnkmxdSHililHMfvAjI8OpkGUBBFw/r8gtrAA3aLL2mFFK4YFXIjnboiKDJRzDOTVWCmaosFi3Su7aUhzMfdjH9fOd/9XG2RLc/3hj1x1Q/AW9ZDB7Oai5zcfxwPu+dJZtuUNE+9Jqiv0LJSvRouQY/u1sQ77mhNwal8g+Kw3rkGAc3oOtSfavmZgBxBSS5qGSlqav9HDd3IWpuzSD9TnxkmRyWInlVKYN/jbp+r/GO3f+NR6gN2GU4O4NW/QYfjjgZGl9CzrT5W1Tm3jrVQtoc2KIwcvoiryyJnNrzOLTkQ5GZf67QudrLv1bCt+d9yi4IrhO5F5VrrKahnQwxf/G97nvBqXRm/QfSSbSaYEv2k9/f/lYYjQZjrIqSZfWGJCzuikr9FzgK9RG3zB0wNlKxXvfdgRGiIxVC4q9r27vGut++BxIB1S69WyZ5idBZCS325jiNUIjWn3fnDDeMe2B1S9lJwk6Op/lfmw9RXrV5yZDXSmz/Wkl8HTnKzbaG1yune2FZzfqjmLsYAtqs2AOfVcg1wrggSxhjfxc1cA/LNhQQYaEib35buCfR9vMYXXjh6d3s0m0VlVsaQZgh+LiriAZFLRsOSu8X1aLAKDxYClzJCC4L1QaAZhm6xNn+Ni/lVKOmd+u84rwkUEqPzO9vippsTkLNC1DkEZ9mxoSKc6Hjig0GOuw9L9nvNRCvyxjFNB/pZuRBPKqgZQxqu5FgdiQj5Ud/i7mMPBrtD1hrO83IIzl3NYkGD70SMiuR9lNwZYZFucKusnISxV0R48yXOlMlCInUD3djtfytKdrsyxY3m2uwqZMx85eRU9MyNcg65NuwcZ7rWOVJXZDYGTcqqZX5b8JoGE+Qs52k72HzFmVxA4AjORbIVfw7KNyzD4ZfNcK72lZWpeZFt/WWX+O/y6CEdj0VkkHLkXvxHjcv1lG8m1bh1Duxs9RZIABniPS723uegIVFkNoqqenxqVeWnwlyPtv95yJ+WL1O3ZDHsCIodLjMpMcmvM+IJRSBPmQ7mcDvlfPTlBLZPnzNfuTV2py74p27IkRRr0Zk4D21kKyolKdhdEyGND8OnyHGmTXC68CUs16B+EBPkyhuQ9Q5RZAa5qH9he25TfbiyxAfnz2NuGTpNR82RcHv3BeX+5E+a99YUuf2ET9jZ7I9ON/+7/QsHZXIG7ZFwN/WcUlSH1cUJAsWLgiRlLOslz3ZcK5+dAo22tI/o+hiop3csLV0LVOSWICaHW15GZunA8DSjbogZ0bdC2qX2qHXTZjkmVFIic///obxynK014Z+pDDxRTnEz0g8gZuwCwmA+PMHMGnjOcGmSDyFc0BcRyvkDvUKyNjoe3bns9oWtUrICmCUddKd+HwPAiNjEXqf/lJtmipY7x40LAYYtO/EH69FTfasqbX3ERn3DCNSCPDWE9N3JvvjODg9k7jvDdDaTQq9x5JgIr7+Ib0nZoYdehoUEFhLg+nYUu1bhHtlxvxPL8mxNY2MAde41JwuMBQ/vUy5UQMLtkLwHPOesZMrYJQPtRTMcs1Gn6HeygFmE9FgS7ztDlQDeQzPNDgLdoXUr6DyWcOJFLqrb/+RZ8Tk1dB2OaggmAaVFUDcWKR7AgAjtfEEDGMC/ZOqjjP0HknAYR5GzTuhunfqVU0fZBNuuyxXaj8oKOijpslOjGP6yS0G5SqNoPWFCqoRfNB+YK9P5sa7zL/f6JJhA/zGlpUDksGabYuhMyn94pTQCavvDE/dDO23fgeK3joRcN3hdQYrntO2hleTASMRjwGhSuCpmDbROEuHBOkRwi8mtU5SNanoS6nW8rGAxcubTDjjI1qvRUOEiNoH11n36LYEwvMDSgwX8nkniA8sy+DpVcqk4CKVlg+1U9X6+ECAR+xAIp6/Ze8zfe2jIgVaIISq4Emcii8x3+n/V7TJkA5cCyEJ1hY2tNB+3hl4QdaBYzsY0etWW/n6HIFMfjPQKRr6zFWfXvtqYqFxjojzJNuJw+G4B+QrwB+j17K8LlnWKU4I/WKqjuvJZgq18BzqNw9U9cdr7zU+M1xI29gJ9RErsBhmpL+zfyO1aEYiUPlCCNztz0ZcJZR0rZ+d/M8VpQIgUcNetQy1hEzLO1QWPJNLFSHvnJI3G6l7ZABtOaQ1m181ZIAmXPEEiwnhwdTyxPtHCEMhgHRnNVwj9UOEwlmHJJPwW43dpNdaPGpUEJfnpSSbQMAGVEyEE6dtvyqw4GigIAV9vyATl4GuiyTpezEqyqOHEeXU5tk78A/cjqV+qcKeZOH9UdBFXNU9IO04MMjSVqoFsajCkIcuT0JEVXDE8MfhC+ZYGcyDuQQlCwEVT0IXpC8MXqyVQIgJusv6bUt1XqIGkQyRlwChH8oL4rss/TyNhepsD91+FZROYjDv3YLX4/ZxBdR0BGXdDLAhwUZxkwSlbvRYWespLw//1saflV+09+XyaH4aIe1MvdOZm7L312Qx+GQRpTAVr9iAVWZC3W47GAuVTWmvyD+tuaqhGgWP9G0n0qHFz8qeCY/vmJDGBDnAVo7evyutfKJ7I7iERSUSG4ZwMhulzW8bnzUGdwIXKh67PRK+/z9Of+ntoGTZ1vBGGGITkoYZnNQi5K6nVig3kVxROHVu5b6JMWiDKcGVEAbX66BuhQd6C4cWy1zJvYwLCgk3OgAiPTFYWZkVeh8cV1Y0942hkYu8lESnXwttgPfwSadV67CmzLKdXVRDsiWn7NXcOqq8CLPWn65hmTN0L7L94TKLZE1hii79GRi60HrNYwOoiMx7CWRc+aKAVylRWCqdaBUFOw7ypRk03qS+aORyKBB3QKL2Vdln0Mt0Y4jrDzipfz6UVoNVOyvsua2r0ARDFqdim6gZpnybLyltAVOUJVUTMI34ZwDskaURymV7XK1TLPtrWW2G9O+WCZR2TFsDAdv0JSnyC6wR9Dmaoiv3DwXVLp60/xSkxmH/7CkyelH8aJV539ScqXoU43bxjP5LAoKDoB4qd5w9znmIDDXun++sAhGBM0zQRm2CiDAZfhoNCa0gxOiromcb9QUQoYnz6g3kkfobxTdCkws+2d7iOeb5AiiCPA1VfgY8Y+4/GdNdES8yfeYz6GjEgEMj2oy5K21zr+v3j4nVZOLcnkJApFQkxD3PdogRa332nSBhFsg1FE6OGqHf3wR6x0JB0kjpWtkfi2/4uS+6oaSimatHvK20t/z5RufLfunbSTr8RLyRcq2A6zySjUQFQOOl0CTnjpxTGuC91cbHCgS/wyNEQ0ZBeZSHexH90f6hQYcAAAcJ1JISaat43Eh+1SZYoXRXAUGPBzAvWO8R3AJcTVTLIRmktnKZPo7aY2P5dVwIUvwFBLTzWBPui7hiFCcKqbRUh5DxcYrj8udrsgdnunslmqlc/SaNONt4Ilv4KZz4puEwFjV4M+poNltOGxO0qMvwIL2CVMRrcw1QlD8lEV4bt/w1h5sXaIuctZ1fM/VxwR5woIURzUcuPbIB7f/ZStGWybdzzb5ZuHHjCzyop4GW++f+loBvgmmmQH9i//EB1n3QKQFNbJq6F6fLwa4AdS26boywGWoLKYgyieSGEJqdzteW1wIx+emLwtlHdRUgwEQGVxRXeqYKkGV5EpERVYJglITJnYwkxsU8ybSQkI/DOr7JfgMfGzMsAWMIjGiYskuveyEYbQ/Mc4GroLyK3bUYqeQRT70qa88P+zI3qSENxdFODT2Coqxg7rG7PHnGdAfA8CkSw0yMAAMlJIqKFXA5RChamyesZ+EgOQkMAqAjaLJRy3Ln8aB8js4KWuLHQF1pCNLQUyNCXLj8Oc2XwfZVHfyEUox1QJo+XAO3IJwnA3nPg1N7SJAc8/VQlegcFRrgCcEDAuAvcO9Epm5lyjPAR0AAlksvgZVhuE4UjoBy4QTckHKJi+evkn3P1f89RLl1E/uMe0vI57I+z8T7H55DThE3ganmipENnzk5QlN3IBTKplDsAKdKRYAJuLAAEvpcYGz6pZKoAC8BV7ntvgFplMl+srOM7l3lUosAHUUABB9kZtbruNuIbTAWp/InBCRsM/IzAYAAIiG3rswJp5BvQqsH+IHeOvmkVDtJCKQbIsY4u2YkaaDY8x0ky6AXxPmoOJoyc+P8pWhyfAsFPM4AAPegB7HyytPNhQfqIpOdyLn5oU/C06TfnnEpqn6OzX1Q/fC8Xi9PCTze27xZ2i7AprEVoAiwYAmBlOmkD8Ag6PLcVsB0AAH8AAKGEeBYnUBFEoA4smAFkzfcBjDpMBzUm6r7a8N896MPRk+SGgEdQAEuPu30MwwmAAAAAXitOIdi2dP7SEJzgwEpbCMwvg5pFZrCRhOBI4/mk5YJQrnKGATC0yyfiAIPT0AAAAAAYJOyClX4qC5Z5Rt1k9NH3pEGRQZO1kfDgXXTWI7EzuJdrOKzEpAAAAtUL18Y8t1sUY5f6S8vyN8aoA6/VJIIUilAIfyUVsYkNPDbENSHWRelaDYer98nwNw+F0sR762LkX11PjYdTmaQ7R+GlOxEAJGLvaxlwKlqnOlWR4pt/cPQtOtmrV9xmf+9Mk4OqQhddbgnlPgQEMIRBUqk2YrVJ68f1hfCSfD5aE2lYcjEnzYrls0M82Vdh+FhKvkoT3QULbOu3I1DzBn0X5QXw1xC2rXyu0qA+5fj6ymlzhG5Y8CqCJlftU5QMm6DSDFmktlJ9kYGShdLKoxtLmcZCefDlvcPfZBgafjv8EhEoadcQjGixvSfhM4C1zSPaeITWTWUp8GRoiwVH2MVajVXtYpScpqTJAGoPkNnRSFM+EKs2DOA0mzw78ALu61yiOSiUxs9qT1QIsa/i3zCL9I3YgVHutQGm7lPYqf6eUq3DiorAvtpTI1iUrzRXskmJo36kD7TeQzUIBn2piAAA=",
at='Rajdhani, "Bahnschrift", "DIN Alternate", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',
Ln='"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif',
Vy='"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
By={
  body:"#ffd43b",
  wing:"#efbd27",
  head:"#ffd43b",
  beak:"#ff8c1a",
  vest:"#4b5a2e",
  helmet:"#5b6b35"
},
Ly={
  duck:By,
  tank:{
    body:"#b0bca1",
    wing:"#839580",
    head:"#d7d9b5",
    beak:"#eda14b",
    vest:"#334139",
    helmet:"#536952",
    visor:"#d8deaa"
  },
  scout:{
    body:"#a2e1ea",
    wing:"#63aec1",
    head:"#bfe8ea",
    beak:"#ef9f46",
    vest:"#2f5866",
    band:"#f18c44"
  }
},
Ey={
  body:"#a3abb0",
  wing:"#858e94",
  head:"#2f7d4f",
  beak:"#f2b134",
  vest:"#6b4a35",
  band:"#d64545"
},
Wy={
  body:"#3d4248",
  wing:"#2c3035",
  head:"#24282c",
  beak:"#e0a030",
  vest:"#17191c",
  helmet:"#2b2f33",
  visor:"#ff4d4d"
},
Qy={
  body:"#f7f3ea",
  wing:"#e6dfd0",
  head:"#f7f3ea",
  beak:"#f4b400"
},
Tc={
  body:"#f4f4f0",
  wing:"#dcdcd4",
  head:"#f4f4f0",
  beak:"#ff8a1e"
},
Sc={
  bandit:Ey,
  elite:Wy,
  chicken:Qy,
  goose:Tc,
  armored:{
    body:"#827887",
    wing:"#615464",
    head:"#b898a3",
    beak:"#ffb771",
    vest:"#48414e",
    helmet:"#59435b",
    visor:"#ff9273"
  },
  lookout:{
    body:"#d6b681",
    wing:"#9d784d",
    head:"#e5c796",
    beak:"#b86d32",
    vest:"#645039",
    band:"#e8b13b"
  },
  shield:{
    body:"#7d8a99",
    wing:"#586572",
    head:"#a9b6c2",
    beak:"#ffb771",
    vest:"#3f4a57",
    helmet:"#4a5663",
    visor:"#8fd0ff"
  },
  hen:{
    body:"#e8d5b0",
    wing:"#c4a878",
    head:"#f2e4c6",
    beak:"#e09a2c",
    vest:"#b98b4e",
    band:"#d94f3d"
  },
  harborBoss:{
    ...Tc,
    body:"#accad1",
    wing:"#557d89",
    head:"#cee6e8",
    vest:"#27475f",
    band:"#b14638"
  },
  foundryBoss:{
    ...Tc,
    body:"#b38e7b",
    wing:"#75554b",
    head:"#d9bc9d",
    vest:"#523840",
    helmet:"#574147",
    visor:"#ff8542"
  },
  broodQueen:{
    body:"#e7e9c4",
    wing:"#a8bf72",
    head:"#f6f3d9",
    beak:"#ffb43b",
    vest:"#6c8247",
    band:"#ffd75e"
  },
  frostMarshal:{
    body:"#d9f2fc",
    wing:"#87b9d4",
    head:"#eefaff",
    beak:"#7fd8ef",
    vest:"#3d6b85",
    helmet:"#9fdcf2",
    visor:"#d9f6ff"
  },
  ironGuard:{
    body:"#241a1e",
    wing:"#120f12",
    head:"#2c2226",
    beak:"#d94b3f",
    vest:"#0d0b0d",
    helmet:"#3a1216",
    visor:"#ff3b30"
  },
  flameAce:{
    body:"#3a3a3c",
    wing:"#242426",
    head:"#e8e2d4",
    beak:"#ff9a1f",
    vest:"#7a2a12",
    helmet:"#5a3a1e",
    visor:"#ffb03a"
  },
  radarWarden:{
    body:"#e8f4f8",
    wing:"#9cc6d8",
    head:"#f4fbfd",
    beak:"#ffb771",
    vest:"#2f5f78",
    helmet:"#c8e4ee",
    visor:"#4ad1ff"
  },
  duckKing:{
    body:"#ffdf7d",
    wing:"#d4a12e",
    head:"#fff1bd",
    beak:"#ff9a1f",
    vest:"#5b2d78",
    helmet:"#7a4a9e",
    band:"#ffd75e",
    visor:"#b56cff"
  }
};
function Pt(r,a){
  const l=document.createElement("canvas");
  return l.width=Math.max(1,Math.round(r)),
  l.height=Math.max(1,Math.round(a)),
  l
}
function Ro(r){
  let a=r>>>0;
  return()=>(a=a*1664525+1013904223>>>0,a/4294967296)
}
function Do(r,a){
  if(r.startsWith("rgba")||r.startsWith("rgb"))return r;
  const l=parseInt(r.slice(1),16);
  return`rgba(${l>>16&255},${l>>8&255},${l&255},${a})`
}
function He(r,a,l,s,i,c){
  const f=Math.min(c,s/2,i/2);
  r.beginPath(),
  r.moveTo(a+f,l),
  r.arcTo(a+s,l,a+s,l+i,f),
  r.arcTo(a+s,l+i,a,l+i,f),
  r.arcTo(a,l+i,a,l,f),
  r.arcTo(a,l,a+s,l,f),
  r.closePath()
}
function we(r,a,l,s,i,c=0){
  r.beginPath(),
  r.ellipse(a,l,Math.max(.01,s),Math.max(.01,i),c,0,ne),
  r.fill()
}
function Zs(r,a,l,s,i,c,f,d,m,b,p,y=!1){
  r.fillStyle="rgba(15,22,10,0.22)",
  we(r,a+2,l+i*.55,i*1.05,i*.68),
  r.save(),
  r.translate(a,l),
  r.rotate(s);
  const g=y?1:1+Math.sin(f*2)*.05;
  r.scale(g,2-g);
  const v=d?"#ffffff":null,
  O="rgba(20,16,12,0.55)",
  LW=Math.max(1,i*.07),
  sh=(C,k)=>{
    const z=r.createRadialGradient(-i*.25,-i*.35,i*.1,0,0,i*1.1);
    return z.addColorStop(0,k),
    z.addColorStop(.55,C),
    z.addColorStop(1,"rgba(0,0,0,0.35)"),
    z
  },
  lt=(C,k)=>{
    if(!C||C[0]!=="#")return C;
    let n=parseInt(C.slice(1),16),
    R=n>>16&255,
    G=n>>8&255,
    B=n&255;
    R=Math.min(255,R+(255-R)*k|0),
    G=Math.min(255,G+(255-G)*k|0),
    B=Math.min(255,B+(255-B)*k|0);
    return`rgb(${R},${G},${B})`
  };
  if(!y){
    const H=Math.sin(f)*i*.35;
    r.fillStyle="#e87d12",
    r.strokeStyle="rgba(90,40,0,0.6)",
    r.lineWidth=LW*.8;
    for(const Q of[-1,1]){
      const X=-i*.1+H*Q;
      r.beginPath(),
      r.moveTo(X-i*.28,Q*i*.52),
      r.lineTo(X+i*.2,Q*i*.38),
      r.lineTo(X+i*.2,Q*i*.66),
      r.closePath(),
      r.fill(),
      r.stroke()
    }
  }
  r.fillStyle=v??c.wing,
  r.strokeStyle=O,
  r.lineWidth=LW,
  r.beginPath(),
  r.moveTo(-i*.72,-i*.36),
  r.lineTo(-i*1.3,-i*.14),
  r.lineTo(-i*1.42,0),
  r.lineTo(-i*1.3,i*.14),
  r.lineTo(-i*.72,i*.36),
  r.closePath(),
  r.fill(),
  r.stroke(),
  r.fillStyle=v??sh(c.body,lt(c.body,.35)),
  r.beginPath(),
  r.ellipse(0,0,i,i*.86,0,0,ne),
  r.fill(),
  r.stroke();
  if(!v){
    r.strokeStyle="rgba(0,0,0,0.12)",
    r.lineWidth=LW*.8;
    for(const Q of[-.25,0,.25])r.beginPath(),
    r.arc(-i*.55,Q*i,i*.35,-.9,.9),
    r.stroke()
  }
  for(const Q of[-1,1]){
    r.fillStyle=v??sh(c.wing,lt(c.wing,.25)),
    r.strokeStyle=O,
    r.lineWidth=LW,
    r.beginPath(),
    r.ellipse(-i*.18,Q*i*.6,i*.62,i*.28,Q*.18,0,ne),
    r.fill(),
    r.stroke();
    if(!v){
      r.strokeStyle="rgba(0,0,0,0.18)",
      r.lineWidth=LW*.7;
      for(const X of[-.55,-.3,-.05])r.beginPath(),
      r.moveTo(-i*.18+X*i,Q*i*.48),
      r.lineTo(-i*.18+X*i-i*.18,Q*i*.72),
      r.stroke()
    }
  }
  c.vest&&!v&&(r.fillStyle=c.vest,r.strokeStyle="rgba(0,0,0,0.45)",r.lineWidth=LW,He(r,-i*.64,-i*.5,i*.84,i,i*.22),r.fill(),r.stroke(),r.fillStyle="rgba(0,0,0,0.28)",He(r,-i*.52,-i*.38,i*.26,i*.3,i*.06),r.fill(),He(r,-i*.52,i*.08,i*.26,i*.3,i*.06),r.fill(),r.fillStyle="rgba(255,255,255,0.12)",r.fillRect(-i*.6,-i*.46,i*.76,i*.08));
  if(m&&!y){
    const H=m.len+i*.5,
    B=i*.1-b;
    r.fillStyle="rgba(0,0,0,0.5)",
    r.fillRect(B-1,i*.3-1,H+2,7),
    r.fillStyle=m.color,
    r.fillRect(B,i*.3,H,5),
    r.fillStyle="rgba(255,255,255,0.22)",
    r.fillRect(B,i*.3,H,1.4),
    r.fillStyle="#121212",
    r.fillRect(B+H-3,i*.3+.5,3.5,4),
    m.mag>12&&(r.fillStyle=m.color,r.fillRect(B+H*.42,i*.3+4,4,m.mag>40?7:5)),
    r.fillStyle=v??c.wing,
    r.strokeStyle=O,
    r.lineWidth=LW*.8,
    r.beginPath(),
    r.ellipse(i*.38-b*.5,i*.44,i*.2,i*.2,0,0,ne),
    r.fill(),
    r.stroke()
  }
  let S=i*.58,
  T=i*.56;
  p===2&&(S=i*1.08,T=i*.42,r.strokeStyle="rgba(20,16,12,0.5)",r.lineWidth=i*.52,r.lineCap="round",r.beginPath(),r.moveTo(i*.3,0),r.lineTo(S-T*.3,0),r.stroke(),r.strokeStyle=v??c.body,r.lineWidth=i*.42,r.beginPath(),r.moveTo(i*.3,0),r.lineTo(S-T*.3,0),r.stroke(),r.strokeStyle="#ffcf3a",r.lineWidth=2.5,r.beginPath(),r.arc(i*.35,0,i*.42,-1.2,1.2),r.stroke());
  r.fillStyle=v??sh(c.head,lt(c.head,.4)),
  r.strokeStyle=O,
  r.lineWidth=LW,
  r.beginPath(),
  r.ellipse(S,0,T,T,0,0,ne),
  r.fill(),
  r.stroke(),
  r.fillStyle=v??c.beak,
  r.beginPath(),
  r.moveTo(S+T*.55,-T*.42),
  r.quadraticCurveTo(S+T*1.75,-T*.18,S+T*1.6,0),
  r.quadraticCurveTo(S+T*1.75,T*.18,S+T*.55,T*.42),
  r.closePath(),
  r.fill(),
  r.stroke(),
  v||(r.strokeStyle="rgba(0,0,0,0.3)",r.lineWidth=LW*.7,r.beginPath(),r.moveTo(S+T*.6,0),r.lineTo(S+T*1.5,0),r.stroke(),r.fillStyle="rgba(0,0,0,0.35)",we(r,S+T*1.05,-T*.14,T*.05,T*.04),we(r,S+T*1.05,T*.14,T*.05,T*.04)),
  p===2&&!v&&(r.fillStyle="#222",we(r,S+T*.5,0,T*.22,T*.22));
  if(y){
    r.strokeStyle="#111",
    r.lineWidth=1.6;
    for(const H of[-1,1]){
      const B=S+T*.3,
      Q=H*T*.5,
      se=T*.2;
      r.beginPath(),
      r.moveTo(B-se,Q-se),
      r.lineTo(B+se,Q+se),
      r.moveTo(B+se,Q-se),
      r.lineTo(B-se,Q+se),
      r.stroke()
    }
  }else if(p===2)r.fillStyle="#111",
  r.fillRect(S+T*.12,-T*.85,T*.42,T*1.7),
  r.fillStyle="rgba(255,255,255,0.5)",
  r.fillRect(S+T*.18,-T*.7,T*.12,T*.4);
  else for(const H of[-1,1])r.fillStyle="#fff",
  we(r,S+T*.3,H*T*.55,T*.24,T*.22),
  r.fillStyle="#141414",
  we(r,S+T*.36,H*T*.55,T*.15,T*.15),
  r.fillStyle="#fff",
  we(r,S+T*.42,H*T*.5,T*.06,T*.06);
  c.helmet&&!v&&(r.fillStyle=c.helmet,r.strokeStyle="rgba(0,0,0,0.5)",r.lineWidth=LW,r.beginPath(),r.arc(S-T*.08,0,T*1.07,Math.PI*.42,Math.PI*1.58),r.closePath(),r.fill(),r.stroke(),r.fillStyle="rgba(255,255,255,0.18)",we(r,S-T*.45,-T*.3,T*.35,T*.22),r.strokeStyle="rgba(0,0,0,0.25)",r.beginPath(),r.arc(S-T*.08,0,T*.8,Math.PI*.6,Math.PI*1.4),r.stroke()),
  c.visor&&!v&&!y&&(r.fillStyle=c.visor,r.fillRect(S+T*.16,-T*.78,T*.28,T*1.56),r.fillStyle="rgba(255,255,255,0.45)",r.fillRect(S+T*.2,-T*.7,T*.08,T*.5)),
  c.band&&!v&&(r.strokeStyle=c.band,r.lineWidth=T*.34,r.beginPath(),r.arc(S,0,T*.86,Math.PI*.55,Math.PI*1.45),r.stroke(),r.strokeStyle="rgba(0,0,0,0.25)",r.lineWidth=1,r.stroke()),
  p===1&&!v&&(r.fillStyle="#e23b3b",r.strokeStyle="rgba(100,0,0,0.6)",r.lineWidth=LW*.7,[[S-T*.35,.3,.22],[S,.32,.24],[S+T*.35,.26,.2]].forEach(([X,A,Bq])=>{
    r.beginPath(),
    r.ellipse(X,0,T*A,T*Bq,0,0,ne),
    r.fill(),
    r.stroke()
  })),
  r.restore()
}
function s2(r){
  const a=new Path2D;
  for(const l of r.roads){
    a.moveTo(l[0],l[1]);
    for(let s=2;s<l.length;s+=2)a.lineTo(l[s],l[s+1])
  }
  return a
}
function i2(r,a,l=!0,s=s2(a)){
  const i=r.getContext("2d");
  if(!i)return;
  const id=a.__id??(a.w===3200&&a.h===2400?"island":"x"),
  TH={
    island:["#5e8743","#b8995f","#4b93b5","#c4b393","#3a2f28","#365d2b"],
    harbor:["#5f6e64","#3c4144","#3f84a6","#b9b2a2","#2c3438","#3f5f44"],
    foundry:["#5c5850","#3a3a37","#3f84a6","#a89c88","#241f1c","#4a5a3a"],
    hatchery:["#566a40","#786543","#4b8a7a","#b8a882","#2a2a1c","#2f4a2a"],
    outpost:["#a4b8c0","#d9e5e7","#7fb0c2","#e6edf0","#3a4a52","#9ab8c0"],
    airbase:["#66625c","#3c3f42","#3f84a6","#b0a898","#2a2e32","#4a5a3a"],
    mausoleum:["#6e6a58","#928972","#3f84a6","#c8bc9e","#2a2420","#4f6040"]
  }
  [a.__mid??id]??["#5e8743","#b8995f","#4b93b5","#c4b393","#3a2f28","#365d2b"];
  i.save(),
  i.fillStyle=TH[0],
  i.fillRect(0,0,r.width,r.height),
  i.scale(r.width/a.w,r.height/a.h);
  if(a.__mid==="airbase"){
    i.fillStyle="rgba(90,30,12,0.45)",
    i.fillRect(0,a.h*.58,a.w/2,a.h),
    i.fillStyle="rgba(220,236,244,0.6)",
    i.fillRect(a.w/2,a.h*.58,a.w/2,a.h)
  }
  i.fillStyle="rgba(0,0,0,0.12)";
  for(const c of a.pads)(c.type==="base"||c.type==="platform"||c.type==="parking")&&i.fillRect(c.x,c.y,c.w,c.h);
  for(const c of a.pads)c.type==="runway"&&(i.fillStyle="#3c3f42",i.fillRect(c.x,c.y,c.w,c.h),i.fillStyle="#f2f2ea",i.fillRect(c.x,c.y+c.h/2-6,c.w,12));
  i.strokeStyle=TH[1],
  i.lineWidth=70,
  i.lineJoin="round",
  i.lineCap="round",
  i.stroke(s);
  i.fillStyle=TH[2];
  for(const c of a.water)c.w&&c.h?i.fillRect(c.x-c.w/2,c.y-c.h/2,c.w,c.h):(i.beginPath(),i.arc(c.x,c.y,c.r,0,ne),i.fill());
  const big=a.floors.filter(c=>c.w*c.h>=40000);
  i.fillStyle=TH[3];
  for(const c of big)i.fillRect(c.x,c.y,c.w,c.h);
  i.strokeStyle=TH[4],
  i.lineWidth=22;
  for(const c of big)c.w*c.h<300000&&!/场|丘|路|岸|广|道|焦土|雪原|区|前厅/.test(c.name||"")&&i.strokeRect(c.x+11,c.y+11,c.w-22,c.h-22);
  if(!l){
    i.fillStyle=TH[4];
    for(const c of a.solids)c.f&Xt&&c.kind!=="bound"&&c.kind!=="propcover"&&c.t===0&&i.fillRect(c.x,c.y,c.w,c.h)
  }
  i.fillStyle=TH[5];
  for(const c of a.trees)c.solid&&!(c.x<0||c.y<0||c.x>a.w||c.y>a.h)&&(i.beginPath(),i.arc(c.x,c.y,c.r*.9,0,ne),i.fill());
  if(l){
    for(const c of a.extractions)i.fillStyle="#8effbd",
    i.strokeStyle="#0e3a22",
    i.lineWidth=12,
    i.beginPath(),
    i.arc(c.x,c.y,48,0,ne),
    i.fill(),
    i.stroke();
    for(const c of a.enemySpots.filter(f=>Yn[f.type]?.boss))i.fillStyle="#ff895d",
    i.strokeStyle="#4f271e",
    i.lineWidth=14,
    i.beginPath(),
    i.arc(c.x,c.y,58,0,ne),
    i.fill(),
    i.stroke()
  }
  i.restore()
}
class Gy{
  canvas;
  ctx;
  W=1;
  H=1;
  dpr=1;
  quality=2;
  touchDevice;
  grass;
  groundPatterns={
  };
  floorPat={
  };
  asphalt;
  glowCache=new Map;
  iconCache=new Map;
  gearIconCache=new Map;
  armorIconAtlas=new Image;
  canopies=[];
  snowBushCanopies=[];
  scorch;
  minimap=null;
  vignette=null;
  roadPath=null;
  v={
    l:0,
    r:0,
    t:0,
    b:0
  };
  ftAcc=0;
  ftN=0;
  lowFor=0;
  staticMap=null;
  warm=3;
  lily=[];
  tall=[];
  low=[];
  constructor(a){
    this.canvas=a,
    this.ctx=a.getContext("2d",{
      alpha:!1
    }),
    this.touchDevice=("ontouchstart"in window||navigator.maxTouchPoints>0)&&!window.matchMedia("(pointer: fine)").matches,
    this.armorIconAtlas.src=qy,
    this.buildAssets()
  }
  buildAssets(){
    const a=Ro(77);
    {
      const c=Pt(256,256),
      f=c.getContext("2d");
      f.fillStyle="#6f9a4b",
      f.fillRect(0,0,256,256);
      const d=m=>{
        for(const b of[-256,0,256])for(const p of[-256,0,256])m(b,p)
      };
      for(let m=0;m<70;m++){
        const b=a()*256,
        p=a()*256,
        y=8+a()*26,
        g=a()<.55?"rgba(88,132,58,0.32)":"rgba(132,172,92,0.22)";
        d((v,S)=>{
          f.fillStyle=g,
          we(f,b+v,p+S,y,y*.8,a()*3)
        })
      }
      f.lineCap="round";
      for(let m=0;m<260;m++){
        const b=a()*256,
        p=a()*256,
        y=2.5+a()*4,
        g=-Math.PI/2+(a()-.5)*1.2,
        v=a()<.75?"rgba(62,98,40,0.45)":"rgba(170,205,115,0.35)";
        d((S,T)=>{
          f.strokeStyle=v,
          f.lineWidth=1.2,
          f.beginPath(),
          f.moveTo(b+S,p+T),
          f.lineTo(b+S+Math.cos(g)*y,p+T+Math.sin(g)*y),
          f.stroke()
        })
      }
      this.grass=this.ctx.createPattern(c,"repeat")
    }
    const l=(c,f,d,m)=>{
      const b=Pt(192,192),
      p=b.getContext("2d"),
      y=Ro(m);
      p.fillStyle=c,
      p.fillRect(0,0,192,192);
      for(let g=0;g<430;g++){
        const v=y()*192,
        S=y()*192,
        T=1+y()*4,
        H=1+y()*3,
        B=y()<.5?f:d;
        p.fillStyle=B;
        for(const Q of[-192,0,192])for(const se of[-192,0,192])we(p,v+Q,S+se,T,H,y()*ne)
      }
      return this.ctx.createPattern(b,"repeat")
    };
    const L2=(c,f,d,m,k)=>{
      const b=Pt(384,384),
      p=b.getContext("2d"),
      y=Ro(m),
      W=(fn)=>{
        for(const Q of[-384,0,384])for(const se of[-384,0,384])fn(Q,se)
      };
      p.fillStyle=c,
      p.fillRect(0,0,384,384);
      for(let g=0;g<26;g++){
        const v=y()*384,
        S=y()*384,
        T=40+y()*90,
        B=y()<.5?"rgba(255,255,255,0.035)":"rgba(0,0,0,0.05)";
        W((Q,se)=>{
          const G=p.createRadialGradient(v+Q,S+se,0,v+Q,S+se,T);
          G.addColorStop(0,B),
          G.addColorStop(1,"rgba(0,0,0,0)"),
          p.fillStyle=G,
          p.fillRect(v+Q-T,S+se-T,T*2,T*2)
        })
      }
      for(let g=0;g<1500;g++){
        const v=y()*384,
        S=y()*384,
        T=.8+y()*3.2,
        H=.8+y()*2.4,
        B=y()<.5?f:d,
        R=y()*ne;
        W((Q,se)=>{
          p.fillStyle=B,
          we(p,v+Q,S+se,T,H,R)
        })
      }
      const cr=(n,col,w)=>{
        p.lineCap="round";
        for(let g=0;g<n;g++){
          let v=y()*384,
          S=y()*384,
          a0=y()*ne;
          const pts=[[v,S]];
          for(let j=0;j<4+y()*5;j++)a0+=(y()-.5)*1.3,
          v+=Math.cos(a0)*(8+y()*14),
          S+=Math.sin(a0)*(8+y()*14),
          pts.push([v,S]);
          const ww=w*(.6+y()*.8);
          W((Q,se)=>{
            p.strokeStyle=col,
            p.lineWidth=ww,
            p.beginPath(),
            p.moveTo(pts[0][0]+Q,pts[0][1]+se);
            for(const[x1,y1]of pts)p.lineTo(x1+Q,y1+se);
            p.stroke()
          })
        }
      },
      blot=(n,cols,r0,r1)=>{
        for(let g=0;g<n;g++){
          const v=y()*384,
          S=y()*384,
          T=r0+y()*(r1-r0),
          C=cols[Math.floor(y()*cols.length)],
          K=5+Math.floor(y()*4),
          pts=[];
          for(let j=0;j<K;j++){
            const an=j/K*ne,
            rr=T*(.6+y()*.5);
            pts.push([Math.cos(an)*rr,Math.sin(an)*rr*.75])
          }
          W((Q,se)=>{
            p.fillStyle=C,
            p.beginPath(),
            p.moveTo(v+Q+pts[0][0],S+se+pts[0][1]);
            for(const[x1,y1]of pts)p.lineTo(v+Q+x1,S+se+y1);
            p.closePath(),
            p.fill()
          })
        }
      };
      if(k==="harbor"){
        blot(14,["rgba(40,55,60,0.16)","rgba(90,70,40,0.12)"],14,34);
        cr(26,"rgba(30,38,38,0.28)",1.4);
        for(let g=0;g<40;g++){
          const v=y()*384,
          S=y()*384;
          W((Q,se)=>{
            p.fillStyle="rgba(230,225,200,0.22)",
            p.fillRect(v+Q,S+se,1.6,1.6)
          })
        }
      }else if(k==="foundry"){
        blot(18,["rgba(20,18,16,0.28)","rgba(60,40,25,0.18)"],10,30);
        cr(34,"rgba(22,20,18,0.42)",1.6);
        blot(10,["rgba(150,75,30,0.16)"],8,20);
        for(let g=0;g<70;g++){
          const v=y()*384,
          S=y()*384;
          W((Q,se)=>{
            p.fillStyle="rgba(255,150,60,0.25)",
            p.fillRect(v+Q,S+se,1.4,1.4)
          })
        }
      }else if(k==="hatchery"){
        blot(30,["rgba(70,95,35,0.32)","rgba(105,125,50,0.26)","rgba(50,60,30,0.3)"],10,28);
        blot(12,["rgba(60,45,30,0.25)"],12,30);
        for(let g=0;g<160;g++){
          const v=y()*384,
          S=y()*384,
          a0=y()*ne,
          ll=4+y()*6,
          C=y()<.5?"rgba(140,95,45,0.45)":"rgba(165,120,50,0.4)";
          W((Q,se)=>{
            p.fillStyle=C,
            we(p,v+Q,S+se,ll,ll*.45,a0)
          })
        }
      }else if(k==="outpost"){
        blot(22,["rgba(255,255,255,0.32)","rgba(235,245,252,0.38)"],16,46);
        blot(10,["rgba(130,170,190,0.14)"],10,24);
        cr(14,"rgba(120,160,180,0.35)",1.1);
        for(let g=0;g<120;g++){
          const v=y()*384,
          S=y()*384;
          W((Q,se)=>{
            p.fillStyle="rgba(255,255,255,0.7)",
            p.fillRect(v+Q,S+se,1.3,1.3)
          })
        }
      }else if(k==="mausoleum"){
        const T=48;
        p.strokeStyle="rgba(40,38,32,0.28)",
        p.lineWidth=2;
        for(let g=0;g<=384;g+=T){
          p.beginPath(),
          p.moveTo(0,g),
          p.lineTo(384,g),
          p.stroke();
          for(let x=(g/T%2)*T/2;x<=384;x+=T)p.beginPath(),
          p.moveTo(x,g),
          p.lineTo(x,g+T),
          p.stroke()
        }
        for(let g=0;g<384;g+=T)for(let x=(g/T%2)*T/2;x<384;x+=T)y()<.35&&(p.fillStyle=y()<.5?"rgba(255,240,200,0.05)":"rgba(0,0,0,0.06)",p.fillRect(x+1,g+1,T-2,T-2));
        blot(22,["rgba(70,100,50,0.24)","rgba(90,120,60,0.2)"],6,18);
        cr(20,"rgba(35,32,28,0.4)",1.2)
      }
      return this.ctx.createPattern(b,"repeat")
    };
    this.groundPatterns={
      harbor:L2("#748174","rgba(208,198,166,0.13)","rgba(39,52,52,0.15)",3201,"harbor"),
      foundry:L2("#6b675d","rgba(205,178,127,0.1)","rgba(28,29,28,0.18)",3202,"foundry"),
      hatchery:L2("#657449","rgba(177,185,112,0.14)","rgba(39,48,30,0.17)",3203,"hatchery"),
      airbase:L2("#6e6a64","rgba(200,190,170,0.12)","rgba(30,28,26,0.18)",3206,"foundry"),
      outpost:L2("#aabdc3","rgba(239,249,249,0.45)","rgba(76,112,127,0.14)",3204,"outpost"),
      mausoleum:L2("#7d7966","rgba(203,187,145,0.13)","rgba(48,48,43,0.16)",3205,"mausoleum")
    };
    {
      const c=Pt(96,64),
      f=c.getContext("2d"),
      d=["#a37c53","#977249","#9d774e","#906c46"];
      for(let m=0;m<4;m++){
        f.fillStyle=d[m],
        f.fillRect(0,m*16,96,16),
        f.fillStyle="rgba(70,48,28,0.55)",
        f.fillRect(0,m*16+15,96,1);
        const b=m*37%96;
        f.fillRect(b,m*16,1,15),
        f.fillStyle="rgba(255,240,210,0.06)",
        f.fillRect(0,m*16,96,2)
      }
      this.floorPat.wood=this.ctx.createPattern(c,"repeat")
    }
    {
      const c=Pt(48,48),
      f=c.getContext("2d");
      f.fillStyle="#bdb4a1",
      f.fillRect(0,0,48,48);
      for(let d=0;d<2;d++)for(let m=0;m<2;m++)f.fillStyle=(d+m)%2?"#d9d2c1":"#d0c8b5",
      f.fillRect(d*24+1,m*24+1,22,22);
      this.floorPat.tile=this.ctx.createPattern(c,"repeat")
    }
    {
      const c=Pt(128,128),
      f=c.getContext("2d");
      f.fillStyle="#9b988f",
      f.fillRect(0,0,128,128);
      for(let d=0;d<260;d++)f.fillStyle=a()<.5?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.06)",
      f.fillRect(a()*128,a()*128,1+a()*3,1+a()*3);
      f.strokeStyle="rgba(0,0,0,0.12)",
      f.lineWidth=1,
      f.strokeRect(.5,.5,127,127),
      f.beginPath(),
      f.moveTo(20,30),
      f.lineTo(40,44),
      f.lineTo(52,40),
      f.stroke(),
      this.floorPat.concrete=this.ctx.createPattern(c,"repeat")
    }
    {
      const c=Pt(96,96),
      f=c.getContext("2d");
      f.fillStyle="#4c4d50",
      f.fillRect(0,0,96,96);
      for(let d=0;d<200;d++)f.fillStyle=a()<.5?"rgba(0,0,0,0.12)":"rgba(255,255,255,0.07)",
      f.fillRect(a()*96,a()*96,1.5,1.5);
      this.asphalt=this.ctx.createPattern(c,"repeat")
    }
    const s=[["#2d4f24","#3f6b2f","#4f7f38","#6a9a48"],["#284a22","#355f2c","#47753a","#5f8f45"],["#33501f","#4a6f2a","#5d8636","#7aa04a"]],
    i=[];
    for(let c=0;c<3;c++){
      const f=Pt(220,220),
      d=f.getContext("2d"),
      m=s[c],
      b=[[110,110,64]];
      for(let p=0;p<7;p++){
        const y=p/7*ne+a()*.5,
        g=38+a()*14;
        b.push([110+Math.cos(y)*g,110+Math.sin(y)*g,34+a()*14])
      }
      i.push(b),
      d.fillStyle=m[0];
      for(const p of b)we(d,p[0],p[1],p[2]+5,p[2]+5);
      d.fillStyle=m[1];
      for(const p of b)we(d,p[0],p[1],p[2],p[2]);
      d.fillStyle=m[2];
      for(const p of b)we(d,p[0]-p[2]*.25,p[1]-p[2]*.25,p[2]*.68,p[2]*.68);
      d.fillStyle=m[3];
      for(let p=0;p<9;p++){
        const y=b[Math.floor(a()*b.length)];
        we(d,y[0]-y[2]*.4+a()*6,y[1]-y[2]*.4+a()*6,6+a()*9,5+a()*7)
      }
      this.canopies.push(f)
    }
    for(let c=0;c<3;c++){
      const f=Pt(220,220),
      d=f.getContext("2d"),
      m=s[c],
      b=i[c],
      p=Ro(4100+c*17);
      d.fillStyle=m[0];
      for(const y of b)we(d,y[0],y[1],y[2]+5,y[2]+5);
      d.fillStyle=m[1];
      for(const y of b)we(d,y[0],y[1],y[2],y[2]);
      d.fillStyle=m[2];
      for(const y of b)we(d,y[0]-y[2]*.25,y[1]-y[2]*.25,y[2]*.68,y[2]*.68);
      d.fillStyle="rgba(210,233,236,0.22)";
      for(const y of b)we(d,y[0]+y[2]*.12,y[1]+y[2]*.22,y[2]*.78,y[2]*.56);
      d.strokeStyle="rgba(246,253,253,0.94)",
      d.lineCap="round";
      for(const[y,g,v]of b)d.lineWidth=Math.max(7,v*.3),
      d.beginPath(),
      d.arc(y,g,v*.82,Math.PI*1.1,Math.PI*1.9),
      d.stroke();
      d.fillStyle="rgba(252,254,254,0.96)";
      for(const[y,g,v]of b)we(d,y-v*.14,g-v*.48,v*.6,v*.27,-.12);
      d.fillStyle=m[3];
      for(let y=0;y<9;y++){
        const g=b[Math.floor(p()*b.length)];
        we(d,g[0]-g[2]*.4+p()*6,g[1]-g[2]*.4+p()*6,5+p()*8,4+p()*6)
      }
      d.fillStyle="rgba(255,255,255,0.85)";
      for(let y=0;y<14;y++)we(d,38+p()*144,38+p()*140,1+p()*2.2,1+p()*1.6);
      this.snowBushCanopies.push(f)
    }
    {
      const c=Pt(128,128),
      f=c.getContext("2d"),
      d=f.createRadialGradient(64,64,4,64,64,64);
      d.addColorStop(0,"rgba(20,16,12,0.85)"),
      d.addColorStop(.55,"rgba(30,24,18,0.5)"),
      d.addColorStop(1,"rgba(30,24,18,0)"),
      f.fillStyle=d,
      f.fillRect(0,0,128,128);
      for(let m=0;m<10;m++){
        const b=a()*ne,
        p=30+a()*30;
        f.strokeStyle="rgba(15,12,10,0.5)",
        f.lineWidth=2+a()*3,
        f.beginPath(),
        f.moveTo(64,64),
        f.lineTo(64+Math.cos(b)*p,64+Math.sin(b)*p),
        f.stroke()
      }
      this.scorch=c
    }
  }
  glow(a){
    let l=this.glowCache.get(a);
    if(!l){
      l=Pt(128,128);
      const s=l.getContext("2d"),
      i=s.createRadialGradient(64,64,0,64,64,64);
      i.addColorStop(0,Do(a,1)),
      i.addColorStop(.22,Do(a,.55)),
      i.addColorStop(.6,Do(a,.12)),
      i.addColorStop(1,Do(a,0)),
      s.fillStyle=i,
      s.fillRect(0,0,128,128),
      this.glowCache.set(a,l)
    }
    return l
  }
  emoji(a){
    let l=this.iconCache.get(a);
    if(!l){
      l=Pt(76,76);
      const s=l.getContext("2d");
      a==="GUN"?(s.fillStyle="#d7d9dc",s.strokeStyle="#2a2d31",s.lineWidth=3,s.beginPath(),s.moveTo(6,30),s.lineTo(52,30),s.lineTo(52,26),s.lineTo(70,26),s.lineTo(70,34),s.lineTo(52,36),s.lineTo(44,36),s.lineTo(40,52),s.lineTo(32,52),s.lineTo(34,40),s.lineTo(20,40),s.lineTo(10,48),s.lineTo(4,44),s.lineTo(10,38),s.closePath(),s.fill(),s.stroke(),s.fillStyle="#9ea3a8",s.fillRect(44,38,7,12)):(s.font=`54px ${Vy}`,s.textAlign="center",s.textBaseline="middle",s.fillText(a,38,42)),
      this.iconCache.set(a,l)
    }
    return l
  }
  drawIcon(a,l,s,i){
    if(a.startsWith("gear:")){
      const c=a.slice(5);
      if(c.startsWith("w_")){
        let d=this.gearIconCache.get(c);
        if(d||(d=new Image,d.src=n2(c.slice(2)),this.gearIconCache.set(c,d)),d.complete&&d.naturalWidth>0){
          const m=i*88/144;
          this.ctx.drawImage(d,l-i/2,s-m/2,i,m);
          return
        }
        this.ctx.drawImage(this.emoji("GUN"),l-i/2,s-i/2,i,i);
        return
      }
      const f=G1[c];
      if(f!==void 0&&this.armorIconAtlas.complete&&this.armorIconAtlas.naturalWidth>0){
        const d=this.armorIconAtlas.naturalWidth/3;
        this.ctx.drawImage(this.armorIconAtlas,f*d,0,d,this.armorIconAtlas.naturalHeight,l-i/2,s-i/2,i,i);
        return
      }
      this.ctx.drawImage(this.emoji("🦺"),l-i/2,s-i/2,i,i);
      return
    }
    this.ctx.drawImage(this.emoji(a),l-i/2,s-i/2,i,i)
  }
  resize(a,l,s){
    this.W=a,
    this.H=l;
    // 小游戏固定 2x 分辨率：原自适应会在真机低帧时把 quality 降到 0（dpr=1），
    // 导致文字/图标发糊。这里锁定 2x，性能自适应仅继续影响粒子数量。
    this.dpr=2,
    this.canvas.width=Math.round(a*this.dpr),
    this.canvas.height=Math.round(l*this.dpr);
    const c=this.touchDevice?8e5:1e6;
    s.cam.base=Math.max(.5,Math.min(1.7,Math.sqrt(a*l/c))),
    s.viewW=a,
    s.viewH=l,
    s.maxParticles=this.quality>=2?700:this.quality===1?450:260;
    const f=Pt(Math.max(2,a/2),Math.max(2,l/2)),
    d=f.getContext("2d"),
    m=f.width/2,
    b=f.height/2,
    p=d.createRadialGradient(m,b,Math.min(m,b)*.55,m,b,Math.hypot(m,b));
    p.addColorStop(0,"rgba(6,8,12,0)"),
    p.addColorStop(1,"rgba(6,8,12,0.6)"),
    d.fillStyle=p,
    d.fillRect(0,0,f.width,f.height),
    this.vignette=f,
    this.staticMap!==s.map&&this.buildStatic(s)
  }
  buildStatic(a){
    this.staticMap=a.map,
    this.lily=[];
    const l=a.map;
    this.tall=l.solids.filter(i=>i.f&Xt&&i.kind!=="bound"&&i.kind!=="propcover"),
    this.tallRound=l.solids.filter(i=>i.f&Xt&&i.kind==="propcover"),
    this.low=l.solids.filter(i=>!(i.f&Xt)&&i.kind!=="water"&&i.kind!=="container"&&i.kind!=="bound"),
    this.roadPath=s2(l);
    const s=Ro(5);
    for(const i of l.water)if(!(i.w&&i.h))for(let c=0;c<2;c++){
      const f=s()*ne,
      d=s()*Math.max(1,i.r-40);
      this.lily.push({
        x:i.x+Math.cos(f)*d,
        y:i.y+Math.sin(f)*d,
        r:7+s()*6
      })
    }
    this.minimap=Pt(l.w/10,l.h/10),
    l.__mid=a.mapId,
    i2(this.minimap,l,!1,this.roadPath)
  }
  trackPerf(a,l){
    if(this.warm>0){
      this.warm-=a;
      return
    }
    if(!(a>.1)&&(this.ftAcc+=a,this.ftN++,this.ftAcc>2)){
      const s=this.ftAcc/this.ftN;
      this.ftAcc=0,
      this.ftN=0,
      s>1/48?this.lowFor++:this.lowFor=0,
      this.lowFor>=3&&this.quality>0&&(this.quality--,this.lowFor=0,this.warm=2,this.resize(this.W,this.H,l))
    }
  }
  render(a,l,s,i){
    this.trackPerf(i,a),
    this.staticMap!==a.map&&this.buildStatic(a);
    const c=this.ctx,
    f=this.W,
    d=this.H,
    m=this.dpr,
    b=a.cam,
    p=b.zoom,
    y=b.x+b.kx,
    g=b.y+b.ky;
    c.setTransform(m*p,0,0,m*p,m*(f/2+b.sx-y*p),m*(d/2+b.sy-g*p));
    const v=this.v;
    v.l=y-f/2/p-70,
    v.r=y+f/2/p+70,
    v.t=g-d/2/p-70,
    v.b=g+d/2/p+70,
    c.fillStyle=a.mapId==="outpost"?"#586e78":"#2a4224",
    c.fillRect(v.l,v.t,v.r-v.l,v.b-v.t),
    c.fillStyle=this.groundPatterns[a.mapId]??this.grass,
    c.fillRect(Math.max(0,v.l),Math.max(0,v.t),Math.min(a.map.w,v.r)-Math.max(0,v.l),Math.min(a.map.h,v.b)-Math.max(0,v.t));
    a.mapId==="airbase"&&this.drawAirGround(a);
    const S=a.mode==="raid";
    this.drawPads(a),
    this.drawRoads(a),
    this.drawWater(a),
    this.drawFloors(a),
    this.drawDecor(a),
    this.drawExtractGround(a),
    this.drawDecals(a),
    this.drawGroundShadows(a),
    this.drawScenery(a),
    this.drawContainers(a),
    this.drawLow(),
    this.drawParticles(a,0),
    this.drawGrenades(a),
    this.drawEnemies(a),
    S&&(!a.player.dead||a.outcome==="extract")&&this.drawPlayer(a),
    this.drawZones(a),
    this.drawCanopies(a),
    this.drawParticles(a,1),
    S&&this.drawFog(a),
    (this.__mid=a.mapId,this.drawWalls()),
    this.drawHazards2(a),
    this.drawPropGlow(a),
    this.drawAdditive(a),
    this.drawWorldUI(a,l),
    c.setTransform(m,0,0,m,0,0),
    this.drawAtmos(a,f,d),
    this.vignette&&c.drawImage(this.vignette,0,0,f,d),
    S&&(this.drawScreenFx(a),s!=="menu"&&this.drawHUD(a,l,s)),
    a.bagOpen&&this.drawBag(a)
  }
  drawBag(a){
    const l=this.ctx,
    s=this.W,
    i=this.H,
    c=Wc(s,i,!0),
    f=l2(s,i,c);
    l.save(),
    l.setTransform(this.dpr,0,0,this.dpr,0,0),
    l.fillStyle="rgba(0,0,0,0.72)",
    l.fillRect(0,0,s,i),
    this.panel(f.x,f.y,f.w,f.h,12),
    this.txt("背包 · 点枪/甲装备 · 点其他丢弃",f.x+14*c,f.y+17*c,13*c,"#ffd23f","left",800);
    const d=a.lootValue;
    this.txt(`¥${Ee(d)} · ${a.player.backpack.length}/${a.player.capacity}`,f.x+f.w-14*c,f.y+17*c,12*c,"#ffcf4a","right",700,at);
    for(const p of f.slots){
      const y=a.player.backpack[p.index];
      if(l.fillStyle=y?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.025)",l.strokeStyle=y?_e[y.def.rarity]:"rgba(255,255,255,0.09)",l.lineWidth=y&&y.def.rarity>=4?2.5:1.2,He(l,p.x,p.y,p.w,p.h,7),l.fill(),l.stroke(),!y)continue;
      this.drawIcon(y.def.icon,p.x+p.w/2,p.y+p.h*.36,p.h*.44),
      (y.def.kind==="weapon"||y.def.kind==="armor")&&(l.fillStyle="#8dffbb",l.beginPath(),l.arc(p.x+p.w-9*c,p.y+9*c,4*c,0,ne),l.fill());
      const g=y.def.name.length>5?y.def.name.slice(0,5):y.def.name;
      this.txt(g,p.x+p.w/2,p.y+p.h*.72,Math.max(9,10*c),"#f2efe6","center",700),
      this.txt(`¥${Ee(y.def.value)}`,p.x+p.w/2,p.y+p.h*.88,Math.max(8,9*c),"#ffcf4a","center",700,at)
    }
    const m=f.dropLowest,
    b=f.close;
    l.fillStyle="rgba(255,120,90,0.16)",
    l.strokeStyle="#ff8a5c",
    l.lineWidth=1.4,
    He(l,m.x,m.y,m.w,m.h,7),
    l.fill(),
    l.stroke(),
    this.txt("丢弃最低价值",m.x+m.w/2,m.y+m.h/2,12*c,"#ffb08a","center",800),
    l.fillStyle="rgba(255,255,255,0.07)",
    l.strokeStyle="rgba(255,255,255,0.25)",
    l.lineWidth=1,
    He(l,b.x,b.y,b.w,b.h,7),
    l.fill(),
    l.stroke(),
    this.txt("关闭",b.x+b.w/2,b.y+b.h/2,12*c,"#ddd","center",800),
    l.restore()
  }
  inView(a,l,s){
    const i=this.v;
    return a>i.l-s&&a<i.r+s&&l>i.t-s&&l<i.b+s
  }
  drawPads(a){
    const l=this.ctx;
    for(const i of a.map.pads)if(!(i.x>this.v.r||i.x+i.w<this.v.l||i.y>this.v.b||i.y+i.h<this.v.t))switch(i.type){
      case"runway":{
        l.fillStyle="#7a756c",
        l.fillRect(i.x-10,i.y-10,i.w+20,i.h+20),
        l.fillStyle=this.asphalt??"#3c3f42",
        l.fillRect(i.x,i.y,i.w,i.h),
        l.fillStyle="rgba(0,0,0,0.25)",
        l.fillRect(i.x,i.y,i.w,6),
        l.fillRect(i.x,i.y+i.h-6,i.w,6),
        l.fillStyle="#e0c040",
        l.fillRect(i.x,i.y+14,i.w,3),
        l.fillRect(i.x,i.y+i.h-17,i.w,3),
        l.fillStyle="#f2f2ea";
        for(let x=i.x+80;x<i.x+i.w-80;x+=70)l.fillRect(x,i.y+i.h/2-3,40,6);
        for(const e of[i.x+14,i.x+i.w-54])for(let y=i.y+30;y<i.y+i.h-30;y+=14)l.fillRect(e,y,40,7);
        l.fillStyle="rgba(240,240,230,0.9)",
        l.font="bold 40px monospace",
        l.save(),
        l.translate(i.x+90,i.y+i.h/2),
        l.rotate(Math.PI/2),
        l.textAlign="center",
        l.fillText("09",0,14),
        l.restore(),
        l.save(),
        l.translate(i.x+i.w-90,i.y+i.h/2),
        l.rotate(-Math.PI/2),
        l.textAlign="center",
        l.fillText("27",0,14),
        l.restore();
        for(let x=i.x+40;x<i.x+i.w;x+=120)for(const y of[i.y-4,i.y+i.h+4])l.fillStyle=(x/120|0)%2?"#ff5040":"#7fd0ff",
        l.beginPath(),
        l.arc(x,y,3.5,0,6.283),
        l.fill();
        break
      }
      case"base":l.fillStyle="#8f8873",
      l.fillRect(i.x,i.y,i.w,i.h),
      l.fillStyle="rgba(0,0,0,0.05)";
      for(let c=i.x;c<i.x+i.w;c+=80)l.fillRect(c,i.y,2,i.h);
      l.strokeStyle="rgba(240,220,120,0.45)",
      l.lineWidth=4,
      l.setLineDash([24,16]),
      l.strokeRect(i.x+40,i.y+40,i.w-80,i.h-80),
      l.setLineDash([]);
      break;
      case"canopy":l.fillStyle=this.floorPat.concrete,
      l.fillRect(i.x,i.y,i.w,i.h),
      l.strokeStyle="rgba(200,40,40,0.55)",
      l.lineWidth=6,
      l.strokeRect(i.x+3,i.y+3,i.w-6,i.h-6);
      break;
      case"parking":l.fillStyle=this.asphalt,
      l.fillRect(i.x,i.y,i.w,i.h),
      l.fillStyle="rgba(255,255,255,0.6)";
      for(let c=i.x+10;c<i.x+i.w;c+=50)l.fillRect(c,i.y+6,3,40);
      break;
      case"field":l.fillStyle="#6e5536",
      l.fillRect(i.x,i.y,i.w,i.h),
      l.fillStyle="rgba(40,28,15,0.35)";
      for(let c=i.y+8;c<i.y+i.h;c+=26)l.fillRect(i.x+6,c,i.w-12,6);
      break;
      case"platform":l.fillStyle=this.floorPat.concrete,
      l.fillRect(i.x,i.y,i.w,i.h),
      l.fillStyle="#e8c547",
      l.fillRect(i.x,i.y,i.w,6);
      break;
      case"helipad":{
        const c=i.x+i.w/2,
        f=i.y+i.h/2;
        l.fillStyle="#6d6f72",
        l.beginPath(),
        l.arc(c,f,i.w/2,0,ne),
        l.fill(),
        l.strokeStyle="#e8c547",
        l.lineWidth=5,
        l.beginPath(),
        l.arc(c,f,i.w/2-10,0,ne),
        l.stroke(),
        l.fillStyle="#f0ede4",
        l.fillRect(c-26,f-30,10,60),
        l.fillRect(c+16,f-30,10,60),
        l.fillRect(c-16,f-5,32,10);
        break
      }
      case"dock":l.fillStyle=this.floorPat.wood,
      l.fillRect(i.x,i.y,i.w,i.h),
      l.fillStyle="#5c4126";
      for(let c=i.x;c<i.x+i.w;c+=45)l.fillRect(c,i.y-4,8,i.h+8);
      l.fillStyle="#8a3b2b",
      He(l,i.x+i.w-30,i.y+i.h+6,70,30,14),
      l.fill(),
      l.fillStyle="#c7a26a",
      He(l,i.x+i.w-22,i.y+i.h+12,54,18,8),
      l.fill();
      break
    }
    const s=this.v;
    for(const i of a.map.tracks){
      if(i<s.t-20||i>s.b+20)continue;
      l.fillStyle="#5a4630";
      const c=Math.max(0,Math.floor(s.l/22)*22),
      f=Math.min(a.map.w,s.r);
      for(let d=c;d<f;d+=22)l.fillRect(d,i-18,9,36);
      l.fillStyle="#8e9296",
      l.fillRect(c,i-12,f-c,3.5),
      l.fillRect(c,i+9,f-c,3.5)
    }
  }
  drawRoads(a){
    if(!this.roadPath)return;
    const l=this.ctx;
    l.lineJoin="round",
    l.lineCap="round";
    const i={
      island:{
        shoulder:"#97794c",
        base:"#b39563",
        crown:"rgba(120,92,58,0.35)",
        mark:"rgba(120,92,58,0.35)",
        dash:[26,20]
      },
      harbor:{
        shoulder:"#2c3133",
        base:"#3c4144",
        crown:"rgba(240,240,230,0.85)",
        mark:"#e0c040",
        dash:[30,26],
        asphalt:1
      },
      foundry:{
        shoulder:"#2a2a28",
        base:"#3a3a37",
        crown:"rgba(240,240,230,0.85)",
        mark:"#e0c040",
        dash:[30,26],
        asphalt:1
      },
      hatchery:{
        shoulder:"#4e4934",
        base:"#786543",
        crown:"rgba(157,131,78,0.34)",
        mark:"rgba(194,172,119,0.58)",
        dash:[9,25]
      },
      outpost:{
        shoulder:"#718b95",
        base:"#d9e5e7",
        crown:"rgba(116,148,159,0.5)",
        mark:"rgba(239,249,249,0.82)",
        dash:[20,21]
      },
      mausoleum:{
        shoulder:"#51534d",
        base:"#928972",
        crown:"rgba(204,189,152,0.45)",
        mark:"rgba(215,204,172,0.7)",
        dash:[11,17]
      },
      airbase:{
        shoulder:"#2a2c2e",
        base:"#3c3f42",
        crown:"rgba(240,240,230,0.85)",
        mark:"#e0c040",
        dash:[30,26],
        asphalt:1
      }
    }
    [a.mapId];
    if(i.asphalt){
      l.lineCap="butt",
      l.lineJoin="miter",
      l.strokeStyle=a.mapId==="foundry"?"#6a6258":a.mapId==="harbor"?"#8a8e8a":"#8a8478",
      l.lineWidth=92,
      l.stroke(this.roadPath),
      l.strokeStyle=i.shoulder,
      l.lineWidth=80,
      l.stroke(this.roadPath),
      l.strokeStyle=this.asphalt??i.base,
      l.lineWidth=72,
      l.stroke(this.roadPath),
      l.strokeStyle="rgba(240,240,230,0.85)",
      l.lineWidth=2.5;
      for(const o of[-30,30]){
        l.save(),
        l.translate(0,0),
        l.setLineDash([]),
        l.restore()
      }
      l.strokeStyle="#e0c040",
      l.lineWidth=3,
      l.setLineDash([30,26]),
      l.stroke(this.roadPath),
      l.setLineDash([]),
      l.lineCap="round",
      l.lineJoin="round";
      return
    }
    l.strokeStyle=i.shoulder,
    l.lineWidth=a.mapId==="island"?66:80,
    l.stroke(this.roadPath),
    l.strokeStyle=i.base,
    l.lineWidth=a.mapId==="island"?54:62,
    l.stroke(this.roadPath),
    a.mapId==="outpost"?(l.strokeStyle="rgba(91,126,139,0.42)",l.lineWidth=3,l.setLineDash([28,20]),l.stroke(this.roadPath),l.strokeStyle="rgba(250,255,255,0.72)",l.lineWidth=1.5,l.setLineDash([15,33])):a.mapId==="mausoleum"?(l.strokeStyle="rgba(67,67,59,0.28)",l.lineWidth=7,l.setLineDash([3,21]),l.stroke(this.roadPath),l.strokeStyle=i.mark,l.lineWidth=1.5,l.setLineDash([2,20])):(l.strokeStyle=i.crown,l.lineWidth=a.mapId==="island"?6:a.mapId==="harbor"||a.mapId==="foundry"?2.2:5,l.setLineDash(i.dash)),
    l.stroke(this.roadPath),
    l.setLineDash([])
  }
  drawWater(a){
    const l=this.ctx,
    s=a.map.water;
    if(!s.some(d=>this.inView(d.x,d.y,(d.w||d.r*2)+40)))return;
    const i=a.mapId==="outpost",
    c=(d,m)=>d.w&&d.h?{
      x:d.x-d.w/2-m,
      y:d.y-d.h/2-m,
      w:d.w+m*2,
      h:d.h+m*2
    }
    :null;
    l.fillStyle=i?"#d0dce0":"#cdb88a";
    for(const d of s){
      const m=c(d,22);
      m?l.fillRect(m.x,m.y,m.w,m.h):(l.beginPath(),l.arc(d.x,d.y,d.r+22,0,ne),l.fill())
    }
    l.fillStyle=i?"#8bb1bc":"#4b93b5";
    for(const d of s)d.w&&d.h?l.fillRect(d.x-d.w/2,d.y-d.h/2,d.w,d.h):(l.beginPath(),l.arc(d.x,d.y,d.r,0,ne),l.fill());
    l.fillStyle=i?"#719ba8":"#3f84a6";
    for(const d of s)if(d.w&&d.h){
      const m=c(d,-42);
      l.fillRect(m.x,m.y,m.w,m.h)
    }else l.beginPath(),
    l.arc(d.x,d.y,Math.max(5,d.r-42),0,ne),
    l.fill();
    const f=a.realT;
    l.strokeStyle=i?"rgba(235,250,252,0.42)":"rgba(255,255,255,0.22)",
    l.lineWidth=2;
    for(let d=0;d<s.length;d++){
      const m=s[d],
      b=m.w||m.r*2;
      for(let p=0;p<2;p++){
        const y=(f*.35+d*.3+p*.5)%1;
        l.globalAlpha=1-y;
        const g=m.x+Math.sin(d*3+p)*b*.14,
        v=m.y+Math.cos(d*2+p)*(m.h||m.r*2)*.1;
        l.beginPath(),
        l.ellipse(g,v,10+y*40,5+y*18,0,0,ne),
        l.stroke()
      }
    }
    if(i){
      l.save(),
      l.beginPath();
      for(const d of s)d.w&&d.h&&l.rect(d.x-d.w/2,d.y-d.h/2,d.w,d.h);
      l.clip(),
      l.strokeStyle="rgba(235,250,252,0.23)",
      l.lineWidth=2;
      for(const[d,m]of s.entries())if(!(!m.w||!m.h))for(let b=0;b<3;b++){
        const p=m.x-m.w*.4+(d*47+b*89)%Math.max(1,m.w*.8),
        y=m.y-m.h*.35+(d*29+b*31)%Math.max(1,m.h*.7);
        l.beginPath(),
        l.moveTo(p,y),
        l.lineTo(p+14,y+7),
        l.lineTo(p+28,y+4),
        l.lineTo(p+41,y+13),
        l.stroke()
      }
      l.restore()
    }
    l.globalAlpha=1,
    l.fillStyle=i?"#c1d5d8":"#5d9a46";
    for(const d of this.lily)l.beginPath(),
    l.arc(d.x,d.y,d.r,.4,ne-.1),
    l.lineTo(d.x,d.y),
    l.fill()
  }
  snowYard(i){
    this.__sy??=new Map;
    let C=this.__sy.get(i);
    if(C)return C;
    const P=40,
    W=Math.ceil(i.w+P*2),
    H=Math.ceil(i.h+P*2);
    C=Pt(W,H);
    const g=C.getContext("2d"),
    q=Ro(Math.round(i.x*13+i.y*7+i.w)),
    FIELD=i.name==="冰霜雪原";
    if(!FIELD){
      g.fillStyle=this.floorPat.concrete,
      g.fillRect(P,P,i.w,i.h);
      g.fillStyle="rgba(150,185,205,0.28)",
      g.fillRect(P,P,i.w,i.h);
      g.strokeStyle="rgba(60,80,95,0.18)",
      g.lineWidth=2;
      for(let X=P+90;X<P+i.w-20;X+=90)g.beginPath(),
      g.moveTo(X,P),
      g.lineTo(X,P+i.h),
      g.stroke();
      for(let Y=P+90;Y<P+i.h-20;Y+=90)g.beginPath(),
      g.moveTo(P,Y),
      g.lineTo(P+i.w,Y),
      g.stroke()
    }else{
      for(let k=0;k<i.w*i.h/16000;k++){
        const x=P+q()*i.w,
        y=P+q()*i.h,
        r=40+q()*50,
        G=g.createRadialGradient(x,y,r*.1,x,y,r);
        G.addColorStop(0,"rgba(235,245,250,0.22)"),
        G.addColorStop(1,"rgba(235,245,250,0)"),
        g.fillStyle=G,
        g.beginPath(),
        g.ellipse(x,y,r,r*.6,q()*3,0,6.283),
        g.fill()
      }
    }
    const blob=(x,y,r,c)=>{
      const G=g.createRadialGradient(x,y,r*.15,x,y,r);
      G.addColorStop(0,c),
      G.addColorStop(.6,c.replace(/[\d.]+\)$/,m=>(parseFloat(m)*.6)+")")),
      G.addColorStop(1,"rgba(240,247,250,0)"),
      g.fillStyle=G,
      g.beginPath(),
      g.ellipse(x,y,r,r*(.55+q()*.25),q()*3,0,6.283),
      g.fill()
    };
    const per=2*(i.w+i.h),
    n=Math.ceil(per/90);
    for(let k=0;k<n;k++){
      let t=q()*per,
      x,
      y;
      t<i.w?(x=P+t,y=P):t<i.w+i.h?(x=P+i.w,y=P+t-i.w):t<2*i.w+i.h?(x=P+i.w-(t-i.w-i.h),y=P+i.h):(x=P,y=P+i.h-(t-2*i.w-i.h));
      const r=18+q()*22;
      blob(x,y,r,"rgba(232,242,246,0.55)")
    }
    for(let k=0;k<Math.max(1,i.w*i.h/70000);k++){
      const x=P+40+q()*(i.w-80),
      y=P+40+q()*(i.h-80),
      r=24+q()*30;
      blob(x,y,r,"rgba(240,247,250,0.42)")
    }
    for(let k=0;k<Math.max(1,i.w*i.h/90000);k++){
      const x=P+60+q()*(i.w-120),
      y=P+50+q()*(i.h-100),
      rx=30+q()*45,
      ry=rx*(.45+q()*.3);
      g.fillStyle="rgba(170,215,235,0.32)",
      g.beginPath(),
      g.ellipse(x,y,rx,ry,q()*3,0,6.283),
      g.fill();
      g.strokeStyle="rgba(255,255,255,0.45)",
      g.lineWidth=1;
      for(let c=0;c<3;c++){
        let cx=x,
        cy=y,
        a=q()*6.283;
        g.beginPath(),
        g.moveTo(cx,cy);
        for(let s=0;s<4;s++)a+=(q()-.5)*1.2,
        cx+=Math.cos(a)*rx*.25,
        cy+=Math.sin(a)*ry*.25,
        g.lineTo(cx,cy);
        g.stroke()
      }
      g.fillStyle="rgba(255,255,255,0.35)",
      g.beginPath(),
      g.ellipse(x-rx*.35,y-ry*.35,rx*.25,ry*.15,-.4,0,6.283),
      g.fill()
    }
    if(i.w>200){
      const y0=P+i.h*(.3+q()*.4);
      for(const d of[-9,9]){
        g.strokeStyle="rgba(90,110,125,0.22)",
        g.lineWidth=6,
        g.setLineDash([14,6]),
        g.beginPath(),
        g.moveTo(P-10,y0+d);
        for(let X=P;X<=P+i.w+10;X+=40)g.lineTo(X,y0+d+Math.sin(X*.01)*10);
        g.stroke()
      }
      g.setLineDash([])
    }
    let fx=P+q()*i.w*.3,
    fy=P+i.h*(.2+q()*.6),
    fa=q()*.6-.3;
    for(let k=0;k<Math.min(26,i.w/22);k++){
      fa+=(q()-.5)*.25,
      fx+=Math.cos(fa)*20,
      fy+=Math.sin(fa)*20;
      if(fx>P+i.w-10)break;
      const s=k%2?5:-5;
      g.fillStyle="rgba(80,100,115,0.28)",
      g.beginPath(),
      g.ellipse(fx-Math.sin(fa)*s,fy+Math.cos(fa)*s,4.5,2.6,fa,0,6.283),
      g.fill()
    }
    return this.__sy.set(i,C),
    C
  }
  drawAirGround(a){
    const c=this.ctx,
    v=this.v;
    const MX=a.map.w/2,
    Y0=a.map.h*.58;
    let g=c.createLinearGradient(MX-240,0,MX+240,0);
    g.addColorStop(0,"rgba(70,25,10,0.42)"),
    g.addColorStop(.5,"rgba(0,0,0,0)"),
    g.addColorStop(1,"rgba(190,225,240,0.5)");
    const yt=Math.max(Y0-200,v.t);
    c.fillStyle="rgba(70,25,10,0.42)",
    c.fillRect(v.l,yt,MX-240-v.l,v.b-yt),
    c.fillStyle="rgba(190,225,240,0.5)",
    c.fillRect(MX+240,yt,v.r-MX-240,v.b-yt),
    c.fillStyle=g,
    c.fillRect(MX-240,yt,480,v.b-yt);
    g=c.createLinearGradient(0,Y0-200,0,Y0);
    g.addColorStop(0,"rgba(110,106,100,1)"),
    g.addColorStop(1,"rgba(110,106,100,0)"),
    c.fillStyle=g,
    c.fillRect(v.l,Y0-200,v.r-v.l,200);
    this.__abd??=(()=>{
      const P=Ro(4242),
      o=[];
      for(let k=0;k<160;k++){
        const x=P()*a.map.w,
        y=Y0+P()*(a.map.h-Y0);
        o.push([x,y,4+P()*14,x<MX])
      }
      return o
    })();
    for(const[x,y,r,L]of this.__abd)x>v.l&&x<v.r&&y>v.t&&y<v.b&&(c.fillStyle=L?(r>12?"rgba(255,120,40,0.35)":"rgba(30,15,8,0.5)"):(r>12?"rgba(255,255,255,0.55)":"rgba(120,170,200,0.35)"),c.beginPath(),c.ellipse(x,y,r,r*.6,x*.01,0,ne),c.fill())
  }
  lavaYard(i){
    this.__ly??=new Map;
    let C=this.__ly.get(i);
    if(C)return C;
    const P=40,
    W=Math.ceil(i.w+P*2),
    H=Math.ceil(i.h+P*2);
    C=Pt(W,H);
    const g=C.getContext("2d"),
    q=Ro(Math.round(i.x*11+i.y*5));
    const soft=(x,y,r,c)=>{
      const G=g.createRadialGradient(x,y,r*.1,x,y,r);
      G.addColorStop(0,c),
      G.addColorStop(1,"rgba(0,0,0,0)"),
      g.fillStyle=G,
      g.beginPath(),
      g.ellipse(x,y,r,r*(.55+q()*.3),q()*3,0,6.283),
      g.fill()
    };
    for(let k=0;k<i.w*i.h/6000;k++)soft(P+q()*i.w,P+q()*i.h,40+q()*50,"rgba(35,18,10,0.35)");
    const per=2*(i.w+i.h);
    for(let k=0;k<0;k++){
      let t=q()*per,
      x,
      y;
      t<i.w?(x=P+t,y=P):t<i.w+i.h?(x=P+i.w,y=P+t-i.w):t<2*i.w+i.h?(x=P+i.w-(t-i.w-i.h),y=P+i.h):(x=P,y=P+i.h-(t-2*i.w-i.h));
      soft(x,y,22+q()*22,"rgba(25,14,8,0.55)")
    }
    for(let k=0;k<i.w*i.h/9000;k++)soft(P+30+q()*(i.w-60),P+20+q()*(i.h-40),18+q()*40,q()<.5?"rgba(15,8,5,0.5)":"rgba(70,35,18,0.35)");
    for(let k=0;k<Math.max(3,i.w/120);k++){
      let x=P+40+q()*(i.w-80),
      y=P+30+q()*(i.h-60),
      a=q()*6.283;
      const pts=[[x,y]];
      for(let s=0;s<6+q()*5;s++)a+=(q()-.5)*1.1,
      x+=Math.cos(a)*(10+q()*16),
      y+=Math.sin(a)*(10+q()*16),
      pts.push([x,y]);
      for(const[w,c]of[[7,"rgba(255,90,20,0.25)"],[3.5,"#c8401a"],[1.6,"#ffb040"]]){
        g.strokeStyle=c,
        g.lineWidth=w,
        g.lineCap="round",
        g.lineJoin="round",
        g.beginPath(),
        pts.forEach(([X,Y],n)=>n?g.lineTo(X,Y):g.moveTo(X,Y)),
        g.stroke()
      }
    }
    for(let k=0;k<i.w*i.h/2500;k++){
      const x=P+q()*i.w,
      y=P+q()*i.h;
      g.fillStyle=q()<.25?"rgba(255,150,60,0.7)":"rgba(160,150,140,0.35)",
      g.fillRect(x,y,1.6,1.6)
    }
    for(let k=0;k<Math.max(2,i.w/200);k++){
      const x=P+50+q()*(i.w-100),
      y=P+40+q()*(i.h-80);
      soft(x,y,34,"rgba(10,5,3,0.55)"),
      g.fillStyle="rgba(20,10,6,0.7)",
      g.beginPath(),
      g.ellipse(x,y,11,7,q()*3,0,6.283),
      g.fill(),
      g.strokeStyle="rgba(255,120,40,0.35)",
      g.lineWidth=1.5,
      g.beginPath(),
      g.ellipse(x,y,13,8.5,0,0,6.283),
      g.stroke()
    }
    return this.__ly.set(i,C),
    C
  }
  drawFloors(a){
    const l=this.ctx,
    s=this.v;
    for(const i of a.map.floors)if(a.mapId==="airbase"&&i.name==="熔岩焦土"){
      if(i.x>s.r+40||i.x+i.w<s.l-40||i.y>s.b+40||i.y+i.h<s.t-40)continue;
      l.drawImage(this.lavaYard(i),i.x-40,i.y-40)
    }else if(a.mapId==="outpost"&&/场|丘|路|岸/.test(i.name||"")||a.mapId==="airbase"&&i.name==="冰霜雪原"){
      if(i.x>s.r+40||i.x+i.w<s.l-40||i.y>s.b+40||i.y+i.h<s.t-40)continue;
      l.drawImage(this.snowYard(i),i.x-40,i.y-40)
    }else i.x>s.r||i.x+i.w<s.l||i.y>s.b||i.y+i.h<s.t||(l.fillStyle=this.floorPat[i.type],l.fillRect(i.x,i.y,i.w,i.h),l.fillStyle={
      harbor:"rgba(80,110,130,0.10)",
      foundry:"rgba(120,70,30,0.10)",
      hatchery:"rgba(70,90,30,0.14)",
      outpost:"rgba(170,210,235,0.16)",
      mausoleum:"rgba(90,60,110,0.08)",
      airbase:"rgba(80,80,90,0.06)"
    }[a.mapId]??"rgba(0,0,0,0)",l.fillRect(i.x,i.y,i.w,i.h),(()=>{
      const E=Math.min(26,i.w/4,i.h/4);
      let g=l.createLinearGradient(0,i.y,0,i.y+E);
      g.addColorStop(0,"rgba(0,0,0,0.22)"),
      g.addColorStop(1,"rgba(0,0,0,0)"),
      l.fillStyle=g,
      l.fillRect(i.x,i.y,i.w,E);
      g=l.createLinearGradient(i.x,0,i.x+E,0);
      g.addColorStop(0,"rgba(0,0,0,0.16)"),
      g.addColorStop(1,"rgba(0,0,0,0)"),
      l.fillStyle=g,
      l.fillRect(i.x,i.y,E,i.h);
      g=l.createLinearGradient(i.x+i.w,0,i.x+i.w-E,0);
      g.addColorStop(0,"rgba(0,0,0,0.12)"),
      g.addColorStop(1,"rgba(0,0,0,0)"),
      l.fillStyle=g,
      l.fillRect(i.x+i.w-E,i.y,E,i.h);
      if(i.w*i.h>120000){
        l.fillStyle="rgba(0,0,0,0.05)";
        const st=i.type==="wood"?96:120;
        for(let X=i.x+st;X<i.x+i.w-20;X+=st)l.fillRect(X,i.y,2,i.h);
        for(let Y=i.y+st;Y<i.y+i.h-20;Y+=st)l.fillRect(i.x,Y,i.w,2);
        const P=Ro(Math.round(i.x*7+i.y));
        for(let k=0;k<Math.min(40,i.w*i.h/9000);k++){
          const X=i.x+20+P()*(i.w-40),
          Y=i.y+20+P()*(i.h-40),
          Rr=10+P()*26;
          l.fillStyle=P()<.5?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.04)",
          l.beginPath(),
          l.ellipse(X,Y,Rr,Rr*.6,P()*3,0,6.283),
          l.fill()
        }
      }
    })())
  }
  drawDecor(a){
    const l=this.ctx,
    s=this.v,
    i=a.map.decor,
    c=a.mapId==="outpost",
    f=a.mapId==="hatchery",
    d=a.mapId==="mausoleum",
    m=[];
    for(let y=0;y<i.length;y++){
      const g=i[y];
      g.x>s.l&&g.x<s.r&&g.y>s.t&&g.y<s.b&&m.push(y)
    }
    l.fillStyle=f?"#536b39":d?"#586244":c?"#496b50":"#3f6a2e",
    l.beginPath();
    for(const y of m){
      const g=i[y];
      g.t===3&&(l.moveTo(g.x+g.s,g.y),l.arc(g.x,g.y,g.s,0,ne),l.moveTo(g.x+g.s*.9+g.s*.6,g.y+4),l.arc(g.x+g.s*.6,g.y+4,g.s*.9,0,ne))
    }
    l.fill(),
    l.fillStyle=f?"#82954f":d?"#7d8150":c?"#8ba99a":"#548a3c",
    l.beginPath();
    for(const y of m){
      const g=i[y];
      g.t===3&&(l.moveTo(g.x-3+g.s*.6,g.y-3),l.arc(g.x-3,g.y-3,g.s*.6,0,ne))
    }
    if(l.fill(),f||d||c){
      l.fillStyle=c?"rgba(244,252,253,0.9)":f?"rgba(207,205,128,0.68)":"rgba(220,204,151,0.58)",
      l.beginPath();
      for(const y of m){
        const g=i[y];
        g.t===3&&(l.moveTo(g.x+g.s*.65,g.y-g.s*.5),l.arc(g.x+g.s*.52,g.y-g.s*.56,Math.max(1.3,g.s*.13),0,ne))
      }
      l.fill()
    }
    l.strokeStyle=c?"#e8f2f2":f?"#9aa75b":d?"#9a9869":a.mapId==="foundry"?"#9a8058":"#4f7836",
    l.lineWidth=c?1.35:1.6,
    l.lineCap="round",
    l.beginPath();
    for(const y of m){
      const g=i[y];
      g.t===0&&(l.moveTo(g.x,g.y),l.lineTo(g.x-g.s*.5,g.y-g.s),l.moveTo(g.x,g.y),l.lineTo(g.x,g.y-g.s*1.2),l.moveTo(g.x,g.y),l.lineTo(g.x+g.s*.5,g.y-g.s))
    }
    l.stroke(),
    l.fillStyle="#86a843",
    l.beginPath();
    for(const y of m){
      const g=i[y];
      g.t===4&&(l.moveTo(g.x+g.s,g.y),l.ellipse(g.x,g.y,g.s,g.s*.45,g.rot,0,ne),l.moveTo(g.x+g.s*.45,g.y),l.ellipse(g.x,g.y,g.s*.45,g.s,g.rot,0,ne))
    }
    l.fill(),
    l.fillStyle=c?"#d6e4e6":a.mapId==="foundry"?"#85847b":"#a19c90",
    l.beginPath();
    for(const y of m){
      const g=i[y];
      g.t===2&&(l.moveTo(g.x+g.s,g.y),l.ellipse(g.x,g.y,g.s,g.s*.7,g.rot,0,ne))
    }
    l.fill();
    const b=c?["#eff8f8","#b7dfeb","#ffffff","#d8e2eb"]:f?["#f1e59c","#ef9fba","#f4f0d9","#cbb3e5"]:d?["#e9d18b","#dfbdc2","#f2e6ba","#cfc4a7"]:["#f4e8a0","#f2a7c3","#ffffff","#c9a7f2"],
    p=m.map(y=>i[y]).filter(y=>y.t===1);
    for(const y of p){
      if(l.save(),l.translate(y.x,y.y),l.rotate(y.rot),!c&&!f&&!d&&a.mapId!=="harbor"){
        l.fillStyle=b[y.c%b.length],
        l.beginPath(),
        l.arc(0,0,y.s,0,ne),
        l.fill(),
        l.restore();
        continue
      }
      if(!c&&(f||d||a.mapId==="harbor")&&(l.strokeStyle=f?"#6d8746":"#687b4b",l.lineWidth=Math.max(1,y.s*.22),l.beginPath(),l.moveTo(0,y.s*.18),l.lineTo(0,y.s*1.8),l.stroke(),l.beginPath(),l.moveTo(0,y.s*1.05),l.lineTo(-y.s*.75,y.s*.78),l.moveTo(0,y.s*1.35),l.lineTo(y.s*.68,y.s*1.08),l.stroke()),l.fillStyle=b[y.c%b.length],c){
        for(let g=0;g<5;g++){
          const v=g*ne/5;
          l.beginPath(),
          l.ellipse(Math.cos(v)*y.s*.55,Math.sin(v)*y.s*.55,Math.max(1.2,y.s*.35),Math.max(1,y.s*.23),v,0,ne),
          l.fill()
        }
        l.fillStyle="#96bbc5"
      }else{
        for(let g=0;g<5;g++){
          const v=g*ne/5;
          l.beginPath(),
          l.ellipse(Math.cos(v)*y.s*.52,Math.sin(v)*y.s*.52,Math.max(1,y.s*.36),Math.max(.8,y.s*.22),v,0,ne),
          l.fill()
        }
        l.fillStyle="#e4bd58"
      }
      l.beginPath(),
      l.arc(0,0,Math.max(1.2,y.s*.24),0,ne),
      l.fill(),
      l.restore()
    }
    if(f||a.mapId==="harbor"){
      l.lineCap="round";
      for(const y of m){
        const g=i[y];
        if(g.t===5){
          l.save(),
          l.translate(g.x,g.y),
          l.rotate(g.rot);
          for(let v=-2;v<=2;v++){
            const S=v*g.s*.22,
            T=v*g.s*.2;
            l.strokeStyle=v%2?"#78904b":f?"#657b3f":"#81916a",
            l.lineWidth=Math.max(1.2,g.s*.13),
            l.beginPath(),
            l.moveTo(0,0),
            l.quadraticCurveTo(S+T*.4,-g.s*.55,S+T,-g.s*(1.2+Math.abs(v)%2*.18)),
            l.stroke(),
            (v===0||v===2)&&(l.fillStyle="#c4a76a",l.beginPath(),l.ellipse(S+T,-g.s*1.2,g.s*.13,g.s*.32,-.15,0,ne),l.fill())
          }
          l.restore()
        }
      }
    }
  }
  drawExtractScene(i,s){
    const l=this.ctx,
    R=i.r,
    K=i.scene;
    if(!K)return;
    l.save(),
    l.translate(i.x,i.y);
    const box=(x,y,w,h,c,o)=>{
      l.fillStyle=c,
      l.fillRect(x,y,w,h),
      o&&(l.strokeStyle=o,l.lineWidth=2,l.strokeRect(x,y,w,h))
    };
    if(K==="helipad"){
      l.fillStyle="#3c3f42",
      l.beginPath(),
      l.arc(0,0,R+18,0,ne),
      l.fill(),
      l.strokeStyle="#e0c040",
      l.lineWidth=5,
      l.beginPath(),
      l.arc(0,0,R+10,0,ne),
      l.stroke(),
      l.fillStyle="#f2f2ea";
      const h=R*.55;
      l.fillRect(-h*.6,-h,h*.32,h*2),
      l.fillRect(h*.28,-h,h*.32,h*2),
      l.fillRect(-h*.6,-h*.16,h*1.2,h*.32);
      for(let k=0;k<12;k++){
        const A=k/12*ne;
        l.fillStyle=Math.sin(s*4+k)>0?"#ff5040":"#7a2a20",
        l.beginPath(),
        l.arc(Math.cos(A)*(R+14),Math.sin(A)*(R+14),3.5,0,ne),
        l.fill()
      }
    }else if(K==="parking"){
      box(-R-30,-R-10,R*2+60,R*2+20,"#3a3d40","#7a7468");
      l.fillStyle="#e8e8e0";
      for(let x=-R-20;x<=R+20;x+=34)l.fillRect(x,-R-6,3,R*.8),
      l.fillRect(x,R*.2+6,3,R*.8);
      l.fillStyle="#2a5a9a",
      l.fillRect(-14,-R-28,28,20),
      l.fillStyle="#fff",
      l.font="bold 16px sans-serif",
      l.textAlign="center",
      l.fillText("P",0,-R-12)
    }else if(K==="dock"||K==="boat"){
      for(let x=-R-10;x<R+10;x+=14){
        const g=l.createLinearGradient(x,0,x+13,0);
        g.addColorStop(0,"#b8895a"),
        g.addColorStop(1,"#8a6238"),
        l.fillStyle=g,
        l.fillRect(x,-R*.7,13,R*1.4)
      }
      l.strokeStyle="#3a2814",
      l.lineWidth=2,
      l.strokeRect(-R-10,-R*.7,R*2+20,R*1.4);
      for(const x of[-R-6,R+6])for(const y of[-R*.7,R*.7])l.fillStyle="#3a3f42",
      l.beginPath(),
      l.arc(x,y,6,0,ne),
      l.fill();
      K==="boat"&&(l.fillStyle="#f2efe6",l.strokeStyle="#2a4a6a",l.lineWidth=2,l.beginPath(),l.moveTo(-R*.6,-R*1.05),l.lineTo(R*.6,-R*1.05),l.quadraticCurveTo(R*.95,-R*.9,R*.6,-R*.75),l.lineTo(-R*.6,-R*.75),l.closePath(),l.fill(),l.stroke())
    }else if(K==="rail"){
      box(-R-30,-R*.5,R*2+60,R,"#8a8478","#4a4640");
      l.fillStyle="#e0c040",
      l.fillRect(-R-30,R*.5-6,R*2+60,4);
      for(const y of[R*.75,R*1.15])l.fillStyle="#6a6458",
      l.fillRect(-R-40,y,R*2+80,4);
      for(let x=-R-36;x<R+40;x+=18)l.fillStyle="#5a3e24",
      l.fillRect(x,R*.65,8,R*.6)
    }else if(K==="gate"||K==="arch"){
      const c=K==="arch"?["#7a2a1f","#d4b66a"]:["#4a4f52","#e0c040"];
      box(-R-12,-8,14,R*.9,c[0],"#1a1a1a"),
      box(R-2,-8,14,R*.9,c[0],"#1a1a1a"),
      box(-R-20,-20,R*2+40,14,c[0],"#1a1a1a"),
      l.fillStyle=c[1],
      l.fillRect(-R-16,-17,R*2+32,3);
      if(K==="gate")for(let x=-R+10;x<R;x+=22)l.fillStyle=(x/22|0)%2?"#e0c040":"#2a2a2a",
      l.fillRect(x,-20,11,14)
    }else if(K==="tunnel"||K==="sewer"){
      l.fillStyle="#1a1816",
      l.beginPath(),
      l.ellipse(0,0,R*.55,R*.4,0,0,ne),
      l.fill(),
      l.strokeStyle=K==="sewer"?"#6a6e70":"#8a7f6a",
      l.lineWidth=6,
      l.stroke(),
      K==="sewer"&&(l.strokeStyle="#4a4e50",l.lineWidth=2,[-.2,0,.2].forEach(k=>{
        l.beginPath(),
        l.moveTo(-R*.45,k*R),
        l.lineTo(R*.45,k*R),
        l.stroke()
      }))
    }else if(K==="sluice"){
      box(-R-20,-14,R*2+40,28,"#5a6268","#2a3034");
      for(let x=-R-14;x<R+20;x+=16)l.fillStyle="#7a8288",
      l.fillRect(x,-10,10,20);
      l.fillStyle="#c0392b",
      l.beginPath(),
      l.arc(R+30,0,9,0,ne),
      l.fill()
    }else if(K==="plane"){
      l.fillStyle="#7d8a92",
      l.strokeStyle="#2a3236",
      l.lineWidth=2,
      l.beginPath(),
      l.ellipse(0,0,R*1.6,R*.32,0,0,ne),
      l.fill(),
      l.stroke(),
      l.beginPath(),
      l.moveTo(-R*.2,0),
      l.lineTo(-R*.5,-R*1.5),
      l.lineTo(-R*.1,-R*1.5),
      l.lineTo(R*.4,0),
      l.lineTo(-R*.1,R*1.5),
      l.lineTo(-R*.5,R*1.5),
      l.closePath(),
      l.fill(),
      l.stroke(),
      l.beginPath(),
      l.moveTo(-R*1.3,0),
      l.lineTo(-R*1.6,-R*.55),
      l.lineTo(-R*1.45,0),
      l.lineTo(-R*1.6,R*.55),
      l.closePath(),
      l.fill(),
      l.stroke();
      l.fillStyle="#3d6f8a",
      l.beginPath(),
      l.ellipse(R*1.3,0,R*.18,R*.14,0,0,ne),
      l.fill();
      for(const k of[-1,1])l.fillStyle="#4a555c",
      l.beginPath(),
      l.ellipse(-R*.15,k*R*.85,R*.2,R*.1,0,0,ne),
      l.fill()
    }
    l.restore()
  }
  drawExtractGround(a){
    const l=this.ctx,
    s=a.realT;
    for(const i of a.extracts){
      if(!this.inView(i.x,i.y,i.r+120))continue;
      this.drawExtractScene(i,s);
      const c=a.exZone===i;
      l.fillStyle=c?"rgba(90,255,150,0.2)":"rgba(90,255,150,0.1)",
      l.beginPath(),
      l.arc(i.x,i.y,i.r,0,ne),
      l.fill(),
      l.save(),
      l.translate(i.x,i.y),
      l.rotate(s*.4),
      l.strokeStyle="rgba(110,255,160,0.85)",
      l.lineWidth=4,
      l.setLineDash([18,12]),
      l.beginPath(),
      l.arc(0,0,i.r,0,ne),
      l.stroke(),
      l.setLineDash([]),
      l.restore();
      const f=s*.8%1;
      l.strokeStyle=`rgba(110,255,160,${.5*(1-f)})`,
      l.lineWidth=3,
      l.beginPath(),
      l.arc(i.x,i.y,i.r*(.3+f*.7),0,ne),
      l.stroke(),
      c&&(l.strokeStyle="#7dffb0",l.lineWidth=8,l.beginPath(),l.arc(i.x,i.y,i.r-8,-Math.PI/2,-Math.PI/2+a.exProg/Fs*ne),l.stroke())
    }
  }
  drawDecals(a){
    const l=this.ctx;
    for(const s of a.decals)this.inView(s.x,s.y,s.r*2)&&(l.save(),l.translate(s.x,s.y),l.rotate(s.rot),l.drawImage(this.scorch,-s.r*1.6,-s.r*1.6,s.r*3.2,s.r*3.2),l.restore())
  }
  drawGroundShadows(a){
    const l=this.ctx;
    l.fillStyle="rgba(16,26,12,0.26)",
    l.beginPath();
    for(const s of a.map.trees)this.inView(s.x,s.y,s.r*2)&&(l.moveTo(s.x+12+s.r,s.y+14),l.ellipse(s.x+12,s.y+14,s.r,s.r*.85,0,0,ne));
    l.fill(),
    l.fillStyle="rgba(0,0,0,0.2)",
    l.beginPath();
    for(const s of this.tall)s.x>this.v.r||s.x+s.w<this.v.l||s.y>this.v.b||s.y+s.h<this.v.t||l.rect(s.x+6,s.y+8,s.w,s.h);
    l.fill()
  }
  drawScenery(a){
    const l=a.map.props;
    if(!l||l.length===0)return;
    const s=this.ctx;
    for(const i of l)if(this.inView(i.x,i.y,80*i.scale)&&(Dy(s,i),i.kind==="vending_machine")){
      const c=a.containers.find(f=>f.type==="vending"&&f.x===i.x&&f.y===i.y);
      c&&c.revealed>=c.items.length&&(s.fillStyle="rgba(10,18,20,0.48)",s.fillRect(i.x-18*i.scale,i.y-44*i.scale,28*i.scale,54*i.scale))
    }
  }
  drawContainers(a){
    const l=this.ctx,
    s=a.realT;
    for(const i of a.containers){
      if(!this.inView(i.x,i.y,40))continue;
      const c=i.revealed>=i.items.length;
      if(i.body){
        const f=i.etype??"bandit",
        d=Sc[f],
        m=Yn[f];
        l.globalAlpha=.92,
        Zs(l,i.x,i.y,i.angle,i.w/2,d,0,!1,null,0,f==="chicken"?1:m.boss?2:0,!0),
        l.globalAlpha=1
      }else i.type!=="vending"&&this.drawCrate(i,s);
      if(!c){
        const f=i.y-(i.body?22:i.h/2+12)+Math.sin(s*3+i.id)*3;
        l.fillStyle=i.revealed>0?"#ffe9a0":"#fff6cf",
        l.beginPath(),
        l.moveTo(i.x,f-6),
        l.lineTo(i.x+4.5,f),
        l.lineTo(i.x,f+6),
        l.lineTo(i.x-4.5,f),
        l.closePath(),
        l.fill(),
        l.strokeStyle="rgba(80,60,10,0.6)",
        l.lineWidth=1,
        l.stroke()
      }
      (a.nearC===i||a.search&&a.search.c===i)&&(l.strokeStyle="#ffd23f",l.lineWidth=2,l.setLineDash([6,4]),l.lineDashOffset=-s*20,i.body?(l.beginPath(),l.arc(i.x,i.y,24,0,ne),l.stroke()):l.strokeRect(i.x-i.w/2-5,i.y-i.h/2-5,i.w+10,i.h+10),l.setLineDash([]))
    }
  }
  drawCrate(a,l){
    const s=this.ctx,
    i=a.shake>0?Math.sin(l*70)*a.shake*8:0,
    c=a.w,
    f=a.h,
    d=a.x-c/2+i,
    m=a.y-f/2;
    s.fillStyle="rgba(0,0,0,0.28)",
    s.fillRect(d+3,m+4,c,f);
    const b=a.revealed>=a.items.length,
    p=(y,g,v,S,T,H,B,Q=1)=>{
      He(s,y,g,v,S,T),
      s.fillStyle=H,
      s.fill(),
      B&&(s.strokeStyle=B,s.lineWidth=Q,s.stroke())
    };
    switch(a.type){
      case"starter":s.fillStyle="#5a6a4a",
      He(s,d,m,c,f,3),
      s.fill(),
      s.strokeStyle="#2a3424",
      s.lineWidth=2,
      s.stroke(),
      s.fillStyle="#e8e4d0",
      s.fillRect(d,m+f/2-2.5,c,5),
      s.fillRect(a.x+i-2.5,m,5,f),
      s.fillStyle="rgba(255,255,255,0.15)",
      s.fillRect(d+2,m+2,c-4,3);
      break;
      case"crate":s.fillStyle="#a3723f",
      s.fillRect(d,m,c,f),
      s.fillStyle="#8a5d30",
      s.fillRect(d,m+f/3,c,2),
      s.fillRect(d,m+2*f/3,c,2),
      s.strokeStyle="#6a4522",
      s.lineWidth=2.5,
      s.strokeRect(d+1,m+1,c-2,f-2),
      s.beginPath(),
      s.moveTo(d+2,m+2),
      s.lineTo(d+c-2,m+f-2),
      s.stroke();
      break;
      case"toolbox":s.fillStyle="#c23b2f",
      He(s,d,m,c,f,3),
      s.fill(),
      s.fillStyle="#a02e24",
      s.fillRect(d,m+f*.45,c,3),
      s.strokeStyle="#3a3a3a",
      s.lineWidth=3,
      s.beginPath(),
      s.moveTo(d+c*.3,m+4),
      s.lineTo(d+c*.7,m+4),
      s.stroke();
      break;
      case"medbox":s.fillStyle="#eeeae0",
      He(s,d,m,c,f,3),
      s.fill(),
      s.strokeStyle="#a9a397",
      s.lineWidth=1.5,
      s.stroke(),
      s.fillStyle="#d9383a",
      s.fillRect(a.x+i-3,a.y-8,6,16),
      s.fillRect(a.x+i-8,a.y-3,16,6);
      break;
      case"weaponcase":s.fillStyle="#3f4a35",
      He(s,d,m,c,f,4),
      s.fill(),
      s.strokeStyle="#252b1f",
      s.lineWidth=2,
      s.stroke(),
      s.fillStyle="#c9c2a5",
      s.fillRect(d+7,m+f/2-3,5,6),
      s.fillRect(d+c-12,m+f/2-3,5,6),
      s.fillStyle="rgba(255,255,255,0.12)",
      s.fillRect(d+3,m+3,c-6,3);
      break;
      case"pc":p(d,m,c,f,3,"#252a31","#171b20",1.2),
      p(d+3,m+3,c-6,f-6,2,"#414852");
      for(let y=0;y<3;y++)s.fillRect(d+5,m+12+y*4,c*.42,1.3);
      s.fillStyle=Math.sin(l*4+a.id)>0&&!b?"#4ad1ff":"#1f6f8a",
      s.beginPath(),
      s.arc(d+c-6,m+7,1.6,0,ne),
      s.fill();
      break;
      case"desktop":{
        const y=c*.78,
        g=f*.6;
        p(d+1,m+1,y,g,3,"#222831","#11161b",1.2),
        p(d+4,m+4,y-6,g-7,2,b?"#27485b":"#286f87"),
        s.fillStyle="rgba(173,242,255,0.75)",
        s.fillRect(d+6,m+6,y*.25,1.6),
        s.fillRect(d+6,m+10,y*.48,1.2),
        s.fillStyle="#69d8e8",
        s.fillRect(d+y*.61,m+g*.54,y*.16,2),
        p(d+y*.36,m+g-1,y*.18,f*.12,1.5,"#6d7680"),
        p(d+y*.2,m+f*.69,y*.56,f*.11,1.5,"#454c55","#242930",.8);
        for(let v=0;v<6;v++)s.fillRect(d+y*.23+v*y*.075,m+f*.72,1.5,1.1);
        break
      }
      case"laptop":{
        p(d+1,m+1,c-2,f-2,3,"#303943","#171c21",1.2),
        p(d+4,m+3,c-8,f*.43,2,b?"#253f4b":"#28758d","#1a272e",.8),
        s.fillStyle="rgba(184,244,255,0.8)",
        s.fillRect(d+7,m+6,c*.42,1.4),
        s.fillRect(d+7,m+9,c*.58,1),
        s.fillStyle="#bac4ca";
        for(let y=0;y<2;y++)for(let g=0;g<6;g++)s.fillRect(d+5+g*(c-10)/6,m+f*.59+y*3,2.2,1.3);
        p(d+c*.38,m+f*.78,c*.24,f*.12,1.2,"#697782");
        break
      }
      case"safe":s.fillStyle="#6f7780",
      s.fillRect(d,m,c,f),
      s.strokeStyle="#454b52",
      s.lineWidth=3,
      s.strokeRect(d+1.5,m+1.5,c-3,f-3),
      s.fillStyle="#c9ced4",
      s.beginPath(),
      s.arc(a.x+i,a.y,6,0,ne),
      s.fill(),
      s.strokeStyle="#454b52",
      s.lineWidth=2,
      s.beginPath(),
      s.moveTo(a.x+i,a.y),
      s.lineTo(a.x+i+Math.cos(l+a.id)*5,a.y+Math.sin(l+a.id)*5),
      s.stroke();
      break;
      case"duffel":s.fillStyle="#5b6b3a",
      He(s,d,m,c,f,10),
      s.fill(),
      s.fillStyle="#3e4a27",
      s.fillRect(d+c*.28,m,4,f),
      s.fillRect(d+c*.66,m,4,f),
      s.strokeStyle="#2b331b",
      s.lineWidth=1.5,
      s.beginPath(),
      s.moveTo(d+6,m+f/2),
      s.lineTo(d+c-6,m+f/2),
      s.stroke();
      break;
      case"treasure_chest":s.fillStyle="#493321",
      He(s,d,m+f*.18,c,f*.78,4),
      s.fill(),
      s.fillStyle="#9a6533",
      He(s,d+2,m+f*.2,c-4,f*.7,3),
      s.fill(),
      s.fillStyle="#b77d3d",
      He(s,d+3,m+2,c-6,f*.42,5),
      s.fill(),
      s.strokeStyle="#5e3d22",
      s.lineWidth=1.5,
      s.stroke(),
      s.fillStyle="#e3b953",
      s.fillRect(d+4,m+f*.43,c-8,3),
      s.fillRect(d+c*.17,m+3,3,f-6),
      s.fillRect(d+c*.78,m+3,3,f-6),
      s.fillStyle="#f2d477",
      He(s,d+c*.43,m+f*.38,c*.16,f*.28,2),
      s.fill(),
      s.fillStyle="#815526",
      s.beginPath(),
      s.arc(d+c/2,m+f*.52,1.4,0,ne),
      s.fill();
      break;
      case"coin_pile":{
        const y=[[d+c*.28,m+f*.55,5],[d+c*.52,m+f*.68,5.5],[d+c*.72,m+f*.48,4.5],[d+c*.4,m+f*.35,4],[d+c*.66,m+f*.28,4.4],[d+c*.52,m+f*.48,5.5]];
        for(const[g,v,S]of y)s.fillStyle="#b67e22",
        s.beginPath(),
        s.ellipse(g+1,v+2,S,S*.68,0,0,ne),
        s.fill(),
        s.fillStyle="#efc34e",
        s.beginPath(),
        s.ellipse(g,v,S,S*.68,0,0,ne),
        s.fill(),
        s.strokeStyle="#a46c1b",
        s.lineWidth=1,
        s.stroke(),
        s.fillStyle="rgba(255,245,183,0.8)",
        s.fillRect(g-S*.42,v-.7,S*.7,1);
        break
      }
    }
    a.open>0&&a.type!=="duffel"&&(s.fillStyle="rgba(15,12,8,0.55)",s.fillRect(d+3,m+3,c-6,f-6)),
    b&&(s.fillStyle="rgba(20,20,20,0.35)",s.fillRect(d,m,c,f))
  }
  drawLow(){
    const a=this.ctx,
    l=this.v;
    for(const s of this.low){
      if(s.t===0){
        if(s.x>l.r||s.x+s.w<l.l||s.y>l.b||s.y+s.h<l.t)continue
      }else if(!this.inView(s.x,s.y,s.r))continue;
      switch(s.kind){
        case"sandbag":{
          a.fillStyle="#8f7a52",
          He(a,s.x,s.y,s.w,s.h,6),
          a.fill(),
          a.fillStyle="#c4ad7e";
          const i=s.w>s.h,
          c=Math.max(2,Math.round((i?s.w:s.h)/20));
          for(let f=0;f<c;f++)i?He(a,s.x+f*s.w/c+1.5,s.y+2,s.w/c-3,s.h-4,6):He(a,s.x+2,s.y+f*s.h/c+1.5,s.w-4,s.h/c-3,6),
          a.fill();
          break
        }
        case"car":{
          const i=["#c0392b","#2e6fb5","#d9a21b","#5f7c3a"];
          a.fillStyle="rgba(0,0,0,0.3)",
          He(a,s.x+4,s.y+6,s.w,s.h,10),
          a.fill(),
          a.fillStyle="#1d1f22";
          const c=s.w>s.h;
          c?(a.fillRect(s.x+14,s.y-3,18,s.h+6),a.fillRect(s.x+s.w-32,s.y-3,18,s.h+6)):(a.fillRect(s.x-3,s.y+14,s.w+6,18),a.fillRect(s.x-3,s.y+s.h-32,s.w+6,18)),
          a.fillStyle=i[s.v%4],
          He(a,s.x,s.y,s.w,s.h,10),
          a.fill(),
          a.fillStyle="#2a3440",
          c?He(a,s.x+s.w*.25,s.y+5,s.w*.5,s.h-10,6):He(a,s.x+5,s.y+s.h*.25,s.w-10,s.h*.5,6),
          a.fill(),
          a.fillStyle="rgba(255,255,255,0.18)",
          c?a.fillRect(s.x+s.w*.3,s.y+8,s.w*.4,3):a.fillRect(s.x+8,s.y+s.h*.3,3,s.h*.4);
          break
        }
        case"pump":a.fillStyle="rgba(0,0,0,0.25)",
        a.fillRect(s.x+3,s.y+4,s.w,s.h),
        a.fillStyle="#e8e2d4",
        a.fillRect(s.x,s.y,s.w,s.h),
        a.fillStyle="#c0392b",
        a.fillRect(s.x,s.y,s.w,12),
        a.fillStyle="#222",
        a.fillRect(s.x+6,s.y+18,s.w-12,8);
        break;
        case"fence":{
          a.fillStyle="rgba(70,55,35,0.85)",
          a.fillRect(s.x,s.y,s.w,s.h),
          a.fillStyle="#5c4630";
          const i=s.w>s.h,
          c=i?s.w:s.h;
          for(let f=0;f<=c;f+=40)i?a.fillRect(s.x+f-3,s.y-3,6,s.h+6):a.fillRect(s.x-3,s.y+f-3,s.w+6,6);
          break
        }
        case"rock":a.fillStyle="rgba(0,0,0,0.25)",
        we(a,s.x+4,s.y+5,s.r,s.r*.85),
        a.fillStyle="#7f7d77",
        we(a,s.x,s.y,s.r,s.r*.88),
        a.fillStyle="#9d9b94",
        we(a,s.x-s.r*.25,s.y-s.r*.25,s.r*.55,s.r*.45);
        break;
        case"hay":a.fillStyle="rgba(0,0,0,0.25)",
        we(a,s.x+4,s.y+6,s.r,s.r*.9),
        a.fillStyle="#d9b75a",
        we(a,s.x,s.y,s.r,s.r),
        a.strokeStyle="#b08e3c",
        a.lineWidth=2,
        a.beginPath(),
        a.arc(s.x,s.y,s.r*.6,0,4.5),
        a.stroke(),
        a.beginPath(),
        a.arc(s.x,s.y,s.r*.25,1,5.5),
        a.stroke();
        break;
        case"woodcrate":{
          if(s.dead){
            a.fillStyle="rgba(60,40,22,0.55)";
            for(const[x,y,w,h]of[[4,6,12,4],[18,14,10,3],[8,20,14,3],[22,4,8,3]])a.fillRect(s.x+x,s.y+y,w,h);
            break
          }
          const x=s.x,
          y=s.y,
          w=s.w,
          h=s.h,
          D=6,
          dm=1-s.hp/s.maxHp;
          a.fillStyle="rgba(0,0,0,0.3)",
          a.fillRect(x+4,y+h,w,D+2);
          a.fillStyle="#6e5030",
          a.fillRect(x,y+h-1,w,D);
          a.fillStyle="rgba(0,0,0,0.25)";
          for(let k=x+5;k<x+w-3;k+=7)a.fillRect(k,y+h,1.5,D-1);
          a.fillStyle="#b08854",
          a.fillRect(x,y,w,h);
          a.fillStyle="#c9a06a",
          a.fillRect(x+2,y+2,w-4,4),
          a.fillStyle="#8f6c40",
          a.fillRect(x+2,y+h-6,w-4,4);
          a.strokeStyle="#3a2a1a",
          a.lineWidth=1.8,
          a.strokeRect(x+.5,y+.5,w-1,h+D-1.5);
          a.strokeStyle="#7a5530",
          a.lineWidth=3.5,
          a.beginPath(),
          a.moveTo(x+4,y+4),
          a.lineTo(x+w-4,y+h-4),
          a.stroke();
          if(dm>.3){
            a.strokeStyle="#2a1a0c",
            a.lineWidth=1.3,
            a.beginPath(),
            a.moveTo(x+w*.3,y+2),
            a.lineTo(x+w*.45,y+h*.5),
            a.lineTo(x+w*.35,y+h-2),
            a.stroke()
          }
          if(dm>.6){
            a.beginPath(),
            a.moveTo(x+w*.75,y+2),
            a.lineTo(x+w*.6,y+h*.6),
            a.stroke(),
            a.fillStyle="rgba(30,18,8,0.5)",
            a.fillRect(x+w*.4,y+h*.35,6,5)
          }
          break
        }
        case"barrel":if(s.dead){
          a.fillStyle="#2a2420",
          we(a,s.x,s.y,s.r*.8,s.r*.6);
          break
        }
        a.fillStyle="rgba(0,0,0,0.3)",
        we(a,s.x+3,s.y+4,s.r,s.r),
        a.fillStyle="#b3342a",
        we(a,s.x,s.y,s.r,s.r),
        a.strokeStyle="#7d2019",
        a.lineWidth=2,
        a.beginPath(),
        a.arc(s.x,s.y,s.r*.65,0,ne),
        a.stroke(),
        a.fillStyle="#f2c230",
        a.beginPath(),
        a.moveTo(s.x,s.y-6),
        a.lineTo(s.x+5.5,s.y+4),
        a.lineTo(s.x-5.5,s.y+4),
        a.closePath(),
        a.fill(),
        s.hp<20&&(a.fillStyle=`rgba(255,${150+Math.random()*80},40,0.9)`,we(a,s.x+4,s.y-4,3+Math.random()*3,3+Math.random()*3));
        break;
        case"tree":a.fillStyle="#5c4126",
        we(a,s.x,s.y,s.r,s.r);
        break
      }
    }
  }
  drawParticles(a,l){
    const s=this.ctx;
    for(const i of a.particles){
      const c=i.type===xl;
      if(l===1!==c||i.type===ti||i.type===Un||i.type===ai||i.type===Yl||!this.inView(i.x,i.y,40+i.size))continue;
      const f=i.life/i.max;
      switch(i.type){
        case Bc:{
          s.globalAlpha=Math.min(1,f*2.5),
          s.fillStyle="rgba(0,0,0,0.15)",
          i.z>1&&we(s,i.x,i.y+2,i.size*.9,i.size*.4),
          s.fillStyle=i.color,
          we(s,i.x,i.y-i.z,i.size,i.size*.42,i.rot);
          break
        }
        case Ec:s.globalAlpha=Math.min(1,f*3),
        s.fillStyle=i.color,
        s.save(),
        s.translate(i.x,i.y-i.z),
        s.rotate(i.rot),
        s.fillRect(-i.size,-i.size*.45,i.size*2,i.size*.9),
        s.restore();
        break;
        case Lc:s.globalAlpha=Math.min(1,f*3),
        s.fillStyle=i.color,
        s.save(),
        s.translate(i.x,i.y-i.z),
        s.rotate(i.rot),
        s.fillRect(-i.size,-i.size,i.size*2,i.size*1.4),
        s.restore();
        break;
        case a2:case xl:s.globalAlpha=f*(i.type===xl?1:.9),
        s.fillStyle=i.color,
        we(s,i.x,i.y,i.size,i.size);
        break;
        case Js:s.globalAlpha=f,
        s.strokeStyle=i.color,
        s.lineWidth=2+f*5,
        s.beginPath(),
        s.arc(i.x,i.y,i.size,0,ne),
        s.stroke();
        break
      }
    }
    s.globalAlpha=1
  }
  drawGrenades(a){
    const l=this.ctx;
    for(const s of a.grenades){
      const i=qt[s.kind],
      c=s.egg?"#f4edda":s.kind==="smoke"?"#8e9ba1":s.kind==="flash"?"#e8dfa8":s.kind==="fire"?"#a4472c":"#3d4a2c";
      if(l.fillStyle="rgba(0,0,0,0.3)",we(l,s.x+2,s.y+3,5,3.5),l.fillStyle=c,we(l,s.x,s.y-s.z,s.egg?5:6,s.egg?6.5:6),s.egg&&(l.fillStyle="#d9c9a4",we(l,s.x-1.5,s.y-s.z-1.5,2,2.5)),l.fillStyle=(s.fuse<.6?Math.sin(a.realT*40)>0:Math.sin(a.realT*14)>0)?"#ff4040":i.color,we(l,s.x+Math.cos(s.spin)*2,s.y-s.z+Math.sin(s.spin)*2,2,2),s.z<4&&s.kind!=="flash"){
        const f=Math.max(.08,.55*(1-s.fuse/i.fuse));
        l.strokeStyle=s.kind==="smoke"?`rgba(190,205,215,${f})`:s.kind==="fire"?`rgba(255,110,50,${f})`:`rgba(255,70,50,${f})`,
        l.lineWidth=2,
        l.setLineDash([8,8]),
        l.beginPath(),
        l.arc(s.x,s.y,i.radius,0,ne),
        l.stroke(),
        l.setLineDash([])
      }
    }
  }
  drawZones(a){
    const l=this.ctx;
    for(const s of a.fires){
      const i=Math.min(1,(s.dur-s.t)/1.2),
      c=l.createRadialGradient(s.x,s.y,6,s.x,s.y,s.r);
      c.addColorStop(0,`rgba(255,140,40,${.3*i})`),
      c.addColorStop(.7,`rgba(220,70,24,${.18*i})`),
      c.addColorStop(1,"rgba(180,40,20,0)"),
      l.fillStyle=c,
      l.beginPath(),
      l.arc(s.x,s.y,s.r,0,ne),
      l.fill(),
      l.strokeStyle=`rgba(255,150,60,${.4*i})`,
      l.lineWidth=2,
      l.setLineDash([10,8]),
      l.beginPath(),
      l.arc(s.x,s.y,s.r,0,ne),
      l.stroke(),
      l.setLineDash([])
    }
    for(const s of a.smokes){
      const i=Math.min(1,s.t/.5,(s.dur-s.t)/.8);
      l.save(),
      l.globalAlpha=.72*i;
      for(let c=0;c<5;c++){
        const f=s.pulse*.35+c/5*ne,
        d=s.r*(.28+.07*Math.sin(s.pulse*1.4+c)),
        m=l.createRadialGradient(s.x+Math.cos(f)*d,s.y+Math.sin(f)*d,8,s.x+Math.cos(f)*d,s.y+Math.sin(f)*d,s.r*.78);
        m.addColorStop(0,"rgba(206,214,218,0.5)"),
        m.addColorStop(1,"rgba(182,193,199,0)"),
        l.fillStyle=m,
        l.beginPath(),
        l.arc(s.x+Math.cos(f)*d,s.y+Math.sin(f)*d,s.r*.78,0,ne),
        l.fill()
      }
      l.restore()
    }
  }
  drawEnemies(a){
    const l=this.ctx,
    s=a.mode==="raid";
    for(const i of a.enemies){
      if(i.dead||s&&i.visA<.03)continue;
      l.globalAlpha=s?i.visA:1;
      const c=i.def.encounter?.phases[i.skillPhase];
      if(c&&this.inView(i.x,i.y,c.range)&&this.drawBossWindup(i,c.range,a.realT),!this.inView(i.x,i.y,60))continue;
      const f=i.type==="chicken"?1:i.def.boss?2:0;
      let d=i.aim;
      if(i.special==="stun"&&(d+=Math.sin(a.realT*20)*.3),i.special==="honkWind"||i.special==="chargeWind"||i.special==="summonWind"){
        const m=1+Math.sin(a.realT*40)*.04;
        l.save(),
        l.translate(i.x,i.y),
        l.scale(m,m),
        l.translate(-i.x,-i.y),
        Zs(l,i.x,i.y,d,i.r,Sc[i.type],i.walk,i.flash>0,i.weapon,i.kick,f),
        l.restore()
      }else Zs(l,i.x,i.y,d,i.r,Sc[i.type],i.walk,i.flash>0,i.weapon,i.kick,f);
      if(i.def.boss&&this.drawBossIdentity(i),i.chillT>0){
        l.save(),
        l.globalAlpha=Math.min(.85,i.chillT*.5)*(s?i.visA:1),
        l.strokeStyle="#9fe6ff",
        l.lineWidth=2,
        l.beginPath(),
        l.arc(i.x,i.y,i.r+4,0,ne),
        l.stroke();
        for(let m=0;m<3;m++){
          const b=a.realT*1.6+m*2.1;
          l.beginPath(),
          l.moveTo(i.x+Math.cos(b)*(i.r+9),i.y+Math.sin(b)*(i.r+9)),
          l.lineTo(i.x+Math.cos(b)*(i.r+15),i.y+Math.sin(b)*(i.r+15)),
          l.stroke()
        }
        l.restore()
      }
      if(i.type==="shield"&&i.armor>0){
        l.save(),
        l.translate(i.x,i.y),
        l.rotate(d);
        const m=i.r;
        l.fillStyle=i.armor/i.armorMax>.5?"#5b7590":"#4a4f58",
        l.strokeStyle="#a8c8e8",
        l.lineWidth=2,
        l.beginPath(),
        l.moveTo(m*.35,-m*.95),
        l.lineTo(m*.95,-m*.7),
        l.lineTo(m*1.05,0),
        l.lineTo(m*.95,m*.7),
        l.lineTo(m*.35,m*.95),
        l.closePath(),
        l.fill(),
        l.stroke(),
        l.fillStyle="#d9e6f2",
        l.fillRect(m*.62,-m*.12,m*.2,m*.24),
        l.restore()
      }
    }
    l.globalAlpha=1
  }
  drawBossIdentity(a){
    const l=this.ctx,
    s=a.r;
    if(l.save(),l.translate(a.x,a.y),l.rotate(a.aim),l.lineJoin="round",l.lineCap="round",a.type==="flameAce"){
      const H=s*1.08,
      T=s*.42;
      l.fillStyle="#c0392b",
      l.strokeStyle="#5a140c",
      l.lineWidth=1.5,
      l.beginPath(),
      l.moveTo(s*.2,-s*.5),
      l.quadraticCurveTo(-s*.6,-s*.9,-s*1.35,-s*.55),
      l.lineTo(-s*1.2,-s*.3),
      l.quadraticCurveTo(-s*.5,-s*.55,s*.3,-s*.2),
      l.closePath(),
      l.fill(),
      l.stroke();
      l.fillStyle="#6a4422",
      l.strokeStyle="#2a1a0c",
      l.beginPath(),
      l.arc(H,0,T*1.08,Math.PI*.4,Math.PI*1.6),
      l.closePath(),
      l.fill(),
      l.stroke();
      for(const k of[-1,1])l.fillStyle="#4a3018",
      l.beginPath(),
      l.ellipse(H-T*.4,k*T*1.05,T*.35,T*.22,0,0,ne),
      l.fill();
      l.strokeStyle="#2a2a2a",
      l.lineWidth=s*.09,
      l.beginPath(),
      l.moveTo(H+T*.1,-T*.95),
      l.lineTo(H+T*.1,T*.95),
      l.stroke();
      for(const k of[-1,1]){
        const g=l.createRadialGradient(H+T*.15,k*T*.48,1,H+T*.15,k*T*.48,T*.36);
        g.addColorStop(0,"#fff0a6"),
        g.addColorStop(1,"#d9781a"),
        l.fillStyle=g,
        l.strokeStyle="#2a2a2a",
        l.lineWidth=1.6,
        l.beginPath(),
        l.arc(H+T*.15,k*T*.48,T*.32,0,ne),
        l.fill(),
        l.stroke()
      }
      for(const k of[-1,1])l.fillStyle="#9aa4a8",
      l.beginPath(),
      l.moveTo(-s*.2,k*s*.75),
      l.lineTo(-s*.75,k*s*1.15),
      l.lineTo(-s*.55,k*s*.7),
      l.closePath(),
      l.fill()
    }else if(a.type==="radarWarden"){
      l.save(),
      l.translate(-s*.75,0),
      l.rotate((typeof performance<"u"?performance.now():0)/700);
      l.fillStyle="#d8e6ec",
      l.strokeStyle="#2f5f78",
      l.lineWidth=1.6,
      l.beginPath(),
      l.ellipse(0,0,s*.28,s*.62,0,0,ne),
      l.fill(),
      l.stroke();
      l.strokeStyle="rgba(47,95,120,0.5)",
      l.lineWidth=1;
      for(const k of[-.35,0,.35])l.beginPath(),
      l.moveTo(-s*.2,k*s),
      l.lineTo(s*.2,k*s),
      l.stroke();
      l.fillStyle="#4ad1ff",
      l.beginPath(),
      l.arc(s*.08,0,s*.08,0,ne),
      l.fill(),
      l.restore();
      l.strokeStyle="#2f5f78",
      l.lineWidth=s*.08,
      l.beginPath(),
      l.moveTo(-s*.4,0),
      l.lineTo(-s*.65,0),
      l.stroke();
      const H=s*1.08,
      T=s*.42;
      l.strokeStyle="#9cc6d8",
      l.lineWidth=s*.05,
      l.beginPath(),
      l.moveTo(H-T*.6,-T*.7),
      l.lineTo(H-T*1.3,-T*1.5),
      l.stroke();
      l.fillStyle="#ff4a3a",
      l.beginPath(),
      l.arc(H-T*1.3,-T*1.5,s*.07,0,ne),
      l.fill();
      l.fillStyle="#1d3c4c",
      l.fillRect(H+T*.05,-T*.55,T*.5,T*1.1),
      l.fillStyle="#4ad1ff",
      l.fillRect(H+T*.12,-T*.45,T*.36,T*.9)
    }else if(a.type==="goose"){
      l.fillStyle="#2b2b2b",
      l.strokeStyle="#f2d36b",
      l.lineWidth=2;
      for(const i of[-1,1])l.beginPath(),
      l.moveTo(-s*.2,i*s*.3),
      l.lineTo(s*.25,i*s*.86),
      l.lineTo(s*.45,i*s*.72),
      l.lineTo(s*.05,i*s*.2),
      l.closePath(),
      l.fill(),
      l.stroke();
      l.fillStyle="#c72f2f",
      l.strokeStyle="#5a0f0f",
      l.lineWidth=1.5,
      He(l,s*.55,-s*.12,s*.36,s*.24,s*.08),
      l.fill(),
      l.stroke(),
      l.fillStyle="#f2d36b",
      l.beginPath(),
      l.arc(s*.73,0,s*.07,0,ne),
      l.fill()
    }else if(a.type==="harborBoss"){
      l.fillStyle="#1c2a3a",
      l.strokeStyle="#d9b25a",
      l.lineWidth=2,
      l.beginPath(),
      l.ellipse(s*1.06,0,s*.5,s*.62,0,0,ne),
      l.fill(),
      l.stroke(),
      l.fillStyle="#2a3d52",
      l.beginPath(),
      l.ellipse(s*1.06,0,s*.32,s*.42,0,0,ne),
      l.fill(),
      l.fillStyle="#f2efe6",
      l.font=`bold ${s*.38}px sans-serif`,
      l.textAlign="center",
      l.textBaseline="middle",
      l.fillText("☠",s*1.06,0),
      l.strokeStyle="#b9c3c8",
      l.lineWidth=s*.11,
      l.beginPath(),
      l.moveTo(s*.2,s*.75),
      l.lineTo(s*.2,s*1.15),
      l.arc(s*.4,s*1.15,s*.2,Math.PI,Math.PI*.15,!0),
      l.stroke(),
      l.strokeStyle="#6d4a2a",
      l.lineWidth=s*.14,
      l.beginPath(),
      l.moveTo(-s*.5,-s*.85),
      l.lineTo(s*.2,-s*.6),
      l.stroke(),
      l.strokeStyle="#b14638",
      l.lineWidth=s*.12,
      l.beginPath(),
      l.arc(-s*.1,0,s*.7,-.6,.6),
      l.stroke()
    }else if(a.type==="foundryBoss"){
      for(const i of[-1,1])l.fillStyle="#3b302c",
      l.strokeStyle="#ff8542",
      l.lineWidth=2,
      l.beginPath(),
      l.arc(-s*.6,i*s*.55,s*.26,0,ne),
      l.fill(),
      l.stroke(),
      l.fillStyle="#ffb36a",
      l.beginPath(),
      l.arc(-s*.6,i*s*.55,s*.1,0,ne),
      l.fill();
      l.fillStyle="#4a3a36",
      l.strokeStyle="#1d1715",
      l.lineWidth=2,
      He(l,-s*.95,-s*.32,s*.34,s*.64,s*.1),
      l.fill(),
      l.stroke();
      const i=l.createRadialGradient(-s*.2,0,1,-s*.2,0,s*.38);
      i.addColorStop(0,"#fff1b0"),
      i.addColorStop(.5,"#ff8a2a"),
      i.addColorStop(1,"rgba(255,80,20,0)"),
      l.fillStyle=i,
      l.beginPath(),
      l.arc(-s*.2,0,s*.38,0,ne),
      l.fill(),
      l.strokeStyle="#9a8a80",
      l.lineWidth=s*.16,
      l.beginPath(),
      l.moveTo(s*.3,-s*.7),
      l.lineTo(s*.9,-s*1.05),
      l.stroke(),
      l.fillStyle="#5a5552",
      l.strokeStyle="#222",
      l.lineWidth=1.5,
      He(l,s*.78,-s*1.3,s*.46,s*.3,s*.06),
      l.fill(),
      l.stroke()
    }else if(a.type==="broodQueen"){
      l.fillStyle="#615f37",
      l.strokeStyle="#d6c47a",
      l.lineWidth=2,
      l.beginPath(),
      l.ellipse(-s*.78,0,s*.56,s*.78,0,0,ne),
      l.fill(),
      l.stroke();
      for(const[i,c]of[[-s*.92,-s*.34],[-s*.92,s*.34],[-s*.62,0]])l.fillStyle="#fff3c8",
      l.beginPath(),
      l.ellipse(i,c,s*.15,s*.21,-.18,0,ne),
      l.fill(),
      l.strokeStyle="#b6a36a",
      l.lineWidth=1,
      l.stroke(),
      l.fillStyle="rgba(255,255,255,0.75)",
      l.fillRect(i-s*.06,c-s*.12,s*.08,s*.04);
      {
        const H=s*1.08,
        T=s*.42;
        l.strokeStyle="#7a5a1a",
        l.lineWidth=s*.16,
        l.beginPath(),
        l.arc(H,0,T*.92,Math.PI*.58,Math.PI*1.42),
        l.stroke(),
        l.strokeStyle="#f4d76d",
        l.lineWidth=s*.11,
        l.beginPath(),
        l.arc(H,0,T*.92,Math.PI*.58,Math.PI*1.42),
        l.stroke();
        for(const k of[-1,0,1]){
          const A=Math.PI+k*.42,
          X=H+Math.cos(A)*T*.92,
          Y=Math.sin(A)*T*.92,
          O=s*.2;
          l.fillStyle="#f4d76d",
          l.strokeStyle="#7a5a1a",
          l.lineWidth=1,
          l.beginPath(),
          l.moveTo(X+Math.cos(A+1.4)*s*.07,Y+Math.sin(A+1.4)*s*.07),
          l.lineTo(X+Math.cos(A)*O,Y+Math.sin(A)*O),
          l.lineTo(X+Math.cos(A-1.4)*s*.07,Y+Math.sin(A-1.4)*s*.07),
          l.closePath(),
          l.fill(),
          l.stroke(),
          l.fillStyle=k?"#8fd36a":"#e0533c",
          l.beginPath(),
          l.arc(X,Y,s*.05,0,ne),
          l.fill()
        }
      }
    }else if(a.type==="frostMarshal"){
      l.fillStyle="#31586e",
      l.strokeStyle="#9be5ff",
      l.lineWidth=2,
      l.beginPath(),
      l.moveTo(-s*.55,-s*.72),
      l.quadraticCurveTo(-s*1.5,0,-s*.55,s*.72),
      l.lineTo(-s*.18,s*.44),
      l.lineTo(-s*.18,-s*.44),
      l.closePath(),
      l.fill(),
      l.stroke();
      for(const d of[-s*.72,s*.72])l.fillStyle="#8ddcf4",
      l.beginPath(),
      l.ellipse(-s*.18,d,s*.32,s*.22,0,0,ne),
      l.fill(),
      l.stroke();
      const i=s*.2,
      c=0,
      f=s*.22;
      l.strokeStyle="#e4fbff",
      l.lineWidth=Math.max(1.5,s*.055);
      for(let d=0;d<6;d++){
        const m=d*Math.PI/3;
        l.beginPath(),
        l.moveTo(i,c),
        l.lineTo(i+Math.cos(m)*f,c+Math.sin(m)*f),
        l.stroke()
      }
      l.fillStyle="#e4fbff",
      l.beginPath(),
      l.arc(i,c,s*.07,0,ne),
      l.fill()
    }else if(a.type==="ironGuard"){
      {
        const H=s*1.08,
        T=s*.42;
        for(const i of[-1,1])l.fillStyle="#2a1a1d",
        l.strokeStyle="#b3262c",
        l.lineWidth=1.5,
        l.beginPath(),
        l.moveTo(H-T*.2,i*T*.85),
        l.quadraticCurveTo(H-T*.1,i*T*1.6,H-T*.9,i*T*1.75),
        l.lineTo(H-T*.55,i*T*.95),
        l.closePath(),
        l.fill(),
        l.stroke();
        l.strokeStyle="#5a0f12",
        l.lineWidth=s*.2,
        l.lineCap="round",
        l.beginPath(),
        l.moveTo(H-T*1.25,0),
        l.lineTo(H+T*.35,0),
        l.stroke(),
        l.strokeStyle="#d8282e",
        l.lineWidth=s*.13,
        l.beginPath(),
        l.moveTo(H-T*1.25,0),
        l.lineTo(H+T*.35,0),
        l.stroke(),
        l.strokeStyle="rgba(255,190,170,0.6)",
        l.lineWidth=s*.04,
        l.beginPath(),
        l.moveTo(H-T*1.1,-s*.025),
        l.lineTo(H+T*.25,-s*.025),
        l.stroke()
      }
      for(const i of[-s*.68,s*.68])l.fillStyle="#1a1013",
      l.strokeStyle="#b3262c",
      l.lineWidth=2,
      He(l,-s*.45,i-s*.27,s*.68,s*.54,s*.2),
      l.fill(),
      l.stroke(),
      l.strokeStyle="#6d1a1e",
      l.lineWidth=1.5,
      l.beginPath(),
      l.moveTo(-s*.3,i),
      l.lineTo(s*.05,i),
      l.stroke();
      l.fillStyle="#a81e24",
      l.strokeStyle="#ffb3a3",
      l.lineWidth=2,
      He(l,s*.12,s*.46,s*.64,s*.38,s*.13),
      l.fill(),
      l.stroke(),
      l.fillStyle="#ffd5ad",
      l.beginPath(),
      l.arc(s*.45,s*.65,s*.09,0,ne),
      l.fill()
    }else if(a.type==="duckKing"){
      l.fillStyle="#51266e",
      l.strokeStyle="#e4c56d",
      l.lineWidth=2,
      l.beginPath(),
      l.moveTo(-s*.52,-s*.62),
      l.quadraticCurveTo(-s*1.45,0,-s*.52,s*.62),
      l.lineTo(-s*.1,s*.42),
      l.lineTo(-s*.1,-s*.42),
      l.closePath(),
      l.fill(),
      l.stroke(),
      l.strokeStyle="rgba(255,240,180,0.5)",
      l.lineWidth=1,
      l.beginPath(),
      l.moveTo(-s*.7,-s*.4),
      l.quadraticCurveTo(-s*1.15,0,-s*.7,s*.4),
      l.stroke();
      const H=s*1.08,
      C=s*.44;
      l.fillStyle="#dcae45",
      l.strokeStyle="#7a5a1a",
      l.lineWidth=1.6;
      const pts=[];
      for(let k=0;k<10;k++){
        const ang=k/10*ne,
        rr=k%2?C*.72:C;
        pts.push([H+Math.cos(ang)*rr,Math.sin(ang)*rr])
      }
      l.beginPath(),
      pts.forEach(([x,y],k)=>k?l.lineTo(x,y):l.moveTo(x,y)),
      l.closePath(),
      l.fill(),
      l.stroke(),
      l.fillStyle="#f6dc7a",
      l.beginPath(),
      l.arc(H,0,C*.55,0,ne),
      l.fill(),
      l.fillStyle="#c0392b",
      l.beginPath(),
      l.arc(H,0,C*.2,0,ne),
      l.fill();
      for(let k=0;k<5;k++){
        const ang=k/5*ne;
        l.fillStyle=k%2?"#5bc0eb":"#bb70ee",
        l.beginPath(),
        l.arc(H+Math.cos(ang)*C*.86,Math.sin(ang)*C*.86,C*.1,0,ne),
        l.fill()
      }
      l.strokeStyle="#c9a24a",
      l.lineWidth=s*.1,
      l.beginPath(),
      l.moveTo(s*.42,s*.5),
      l.lineTo(s*.95,s*.78),
      l.stroke(),
      l.fillStyle="#e8c466",
      l.strokeStyle="#7a5a1a",
      l.lineWidth=1.2,
      l.beginPath(),
      l.arc(s*1.02,s*.82,s*.14,0,ne),
      l.fill(),
      l.stroke(),
      l.fillStyle="#bb70ee",
      l.beginPath(),
      l.arc(s*1.02,s*.82,s*.07,0,ne),
      l.fill()
    }
    l.restore()
  }
  drawBossWindup(a,l,s){
    if(a.special==="newWind"){
      const i=this.ctx,
      c=a.def.encounter?.ringColor??"rgba(255,90,70,0.9)",
      m=a.castSkill;
      i.save();
      for(const L of a.lines||[]){
        i.globalAlpha=.25+.15*Math.sin(s*18),
        i.strokeStyle=L.wall?"rgba(160,230,255,0.8)":"rgba(255,60,40,0.6)",
        i.lineWidth=L.w*2,
        i.lineCap="round",
        i.beginPath(),
        i.moveTo(L.x0,L.y0),
        i.lineTo(L.x1,L.y1),
        i.stroke(),
        i.globalAlpha=.9,
        i.strokeStyle=L.wall?"#9fe6ff":"#ff5a46",
        i.lineWidth=3,
        i.setLineDash([16,10]),
        i.stroke(),
        i.setLineDash([])
      }
      if(m==="scan"){
        const A0=a.scanA+(1-a.specialT/(a.def.encounter?.phases[a.skillPhase]?.windup??1))*2.4,
        R0=a.scanR??900;
        i.globalAlpha=.28,
        i.fillStyle="#4ad1ff",
        i.beginPath(),
        i.moveTo(a.x,a.y),
        i.arc(a.x,a.y,R0,A0-.22,A0),
        i.closePath(),
        i.fill(),
        i.globalAlpha=.9,
        i.strokeStyle="#9fe6ff",
        i.lineWidth=2,
        i.beginPath(),
        i.moveTo(a.x,a.y),
        i.lineTo(a.x+Math.cos(A0)*R0,a.y+Math.sin(A0)*R0),
        i.stroke()
      }
      for(const q of a.marks||[]){
        const r=q.blink?(a.def.encounter?.phases[a.skillPhase]?.range??300):m==="magma"?105:m==="eggrain"?110:95;
        i.globalAlpha=.25+.15*Math.sin(s*18),
        i.fillStyle="rgba(255,60,40,0.5)",
        i.beginPath(),
        i.arc(q.x,q.y,r,0,ne),
        i.fill(),
        i.globalAlpha=.9,
        i.strokeStyle="#ff5a46",
        i.lineWidth=3,
        i.setLineDash([10,7]),
        i.beginPath(),
        i.arc(q.x,q.y,r,0,ne),
        i.stroke(),
        i.setLineDash([]),
        i.beginPath(),
        i.moveTo(q.x-12,q.y),
        i.lineTo(q.x+12,q.y),
        i.moveTo(q.x,q.y-12),
        i.lineTo(q.x,q.y+12),
        i.stroke()
      }
      if(m==="spiral"||m==="fortify"||m==="blink"){
        i.globalAlpha=.5+.3*Math.sin(s*20),
        i.strokeStyle=c,
        i.lineWidth=4,
        i.beginPath(),
        i.arc(a.x,a.y,a.r+18+Math.sin(s*12)*4,0,ne),
        i.stroke();
        if(m==="spiral")for(let k=0;k<12;k++){
          const an=k/12*ne+s;
          i.beginPath(),
          i.moveTo(a.x+Math.cos(an)*(a.r+20),a.y+Math.sin(an)*(a.r+20)),
          i.lineTo(a.x+Math.cos(an)*(a.r+44),a.y+Math.sin(an)*(a.r+44)),
          i.stroke()
        }
        if(m==="blink"){
          const p=this.game?.player;
        }
      }
      i.restore();
      return
    }
    if(a.special!=="chargeWind"&&a.special!=="honkWind"&&a.special!=="summonWind")return;
    const i=this.ctx;
    i.save(),
    i.globalAlpha*=.72+.2*Math.sin(s*20),
    i.beginPath();
    const c=a.def.encounter?.ringColor,
    f=(m,b)=>c?.startsWith("rgba")?c.replace(/[\d.]+\)$/,`${m})`):b;
    if(a.special==="chargeWind"?(i.moveTo(a.x,a.y),i.lineTo(a.x+a.cdx*l,a.y+a.cdy*l),i.lineWidth=a.r*2,i.strokeStyle=f(.3,"rgba(255,70,56,0.3)"),i.stroke(),i.strokeStyle=c??"#ff5546"):a.special==="summonWind"?(i.arc(a.x,a.y,Math.min(260,l*.42),0,ne),i.fillStyle=f(.12,"rgba(150,240,120,0.12)"),i.fill(),i.strokeStyle=c??"#b4ff8c"):(i.arc(a.x,a.y,l,0,ne),i.fillStyle=f(.14,"rgba(255,141,50,0.14)"),i.fill(),i.strokeStyle=c??"#ffa94f"),i.setLineDash([14,9]),i.lineWidth=4,i.stroke(),i.setLineDash([]),a.special==="summonWind"){
      const m=Math.min(260,l*.42);
      for(let b=0;b<6;b++){
        const p=b/6*ne+s*.15,
        y=a.x+Math.cos(p)*m,
        g=a.y+Math.sin(p)*m;
        i.fillStyle=a.type==="duckKing"?"#e7c76c":"#fff0bb",
        i.strokeStyle=a.type==="duckKing"?"#fff2ba":"#8eaa58",
        i.lineWidth=2,
        i.beginPath(),
        i.ellipse(y,g,6,9,p,0,ne),
        i.fill(),
        i.stroke()
      }
    }
    if(a.special==="honkWind"&&a.type==="frostMarshal")for(let m=0;m<8;m++){
      const b=m*ne/8+s*.08;
      i.strokeStyle="rgba(220,250,255,0.9)",
      i.lineWidth=2.5,
      i.beginPath(),
      i.moveTo(a.x+Math.cos(b)*l*.76,a.y+Math.sin(b)*l*.76),
      i.lineTo(a.x+Math.cos(b)*l*.98,a.y+Math.sin(b)*l*.98),
      i.stroke()
    }
    if(a.special==="chargeWind"&&(a.type==="ironGuard"||a.type==="duckKing")){
      const m=a.x+a.cdx*l,
      b=a.y+a.cdy*l,
      p=Math.atan2(a.cdy,a.cdx),
      y=a.type==="duckKing"?"#ffe18a":"#ffb49a";
      i.save(),
      i.translate(m,b),
      i.rotate(p),
      i.fillStyle=y,
      i.beginPath(),
      i.moveTo(12,0),
      i.lineTo(-8,-9),
      i.lineTo(-5,0),
      i.lineTo(-8,9),
      i.closePath(),
      i.fill(),
      i.restore()
    }
    const d=a.def.encounter?.skillLabels?.[a.castSkill??a.def.encounter?.skill??"slam"];
    if(d){
      i.font=`bold 12px ${Ln}`,
      i.textAlign="center",
      i.textBaseline="middle";
      const m=a.y-a.r-30,
      b=i.measureText(d).width+20;
      i.fillStyle="rgba(10,14,18,0.8)",
      He(i,a.x-b/2,m-10,b,20,9),
      i.fill(),
      i.fillStyle=c??"#ffe18a",
      i.fillText(d,a.x,m)
    }
    i.restore()
  }
  drawPlayer(a){
    const l=a.player,
    s=l.weapons[l.cur],
    i=Ly[l.character.id];
    let c=l.aim;
    l.rollT>0&&(c+=(1-l.rollT/.3)*ne*(l.rollDx>=0?1:-1)),
    l.rollT>0&&(this.ctx.globalAlpha=.25,Zs(this.ctx,l.x-l.rollDx*18,l.y-l.rollDy*18,c-.8,l.r,i,l.walk,!1,null,0,0),this.ctx.globalAlpha=1),
    Zs(this.ctx,l.x,l.y,c,l.r,i,l.walk,l.flash>0,s?s.def:null,l.kick,0)
  }
  drawCanopies(a){
    const l=this.ctx,
    s=a.player,
    i=a.realT;
    for(const c of a.map.trees){
      if(!this.inView(c.x,c.y,c.r*1.3))continue;
      const f=a.mode==="raid"&&Math.hypot(s.x-c.x,s.y-c.y)<c.r*.95;
      l.globalAlpha=f?.38:.95;
      const d=c.r*2.3+Math.sin(i*1.3+c.x*.01)*1.5,
      m=a.mapId==="outpost"?this.snowBushCanopies[c.v]:this.canopies[c.v];
      l.drawImage(m,c.x-d/2,c.y-d/2,d,d)
    }
    l.globalAlpha=1
  }
  drawFog(a){
    const l=this.ctx,
    s=a.player,
    i=this.v,
    c=s.x,
    f=s.y,
    d=3e3;
    l.beginPath();
    const m=(b,p,y,g)=>{
      const v=b-c,
      S=p-f,
      T=d/(Math.hypot(v,S)||1),
      H=y-c,
      B=g-f,
      Q=d/(Math.hypot(H,B)||1);
      l.moveTo(b,p),
      l.lineTo(y,g),
      l.lineTo(y+H*Q,g+B*Q),
      l.lineTo(b+v*T,p+S*T),
      l.closePath()
    };
    for(const b of this.tall){
      if(b.x>i.r||b.x+b.w<i.l||b.y>i.b||b.y+b.h<i.t)continue;
      const p=b.x,
      y=b.y,
      g=b.x+b.w,
      v=b.y+b.h;
      f>y&&m(p,y,g,y),
      c<g&&m(g,y,g,v),
      f<v&&m(g,v,p,v),
      c>p&&m(p,v,p,y)
    }
    for(const b of this.tallRound||[]){
      const R0=b.t===1?b.r:Math.min(b.w,b.h)/2,
      X=b.t===1?b.x:b.x+b.w/2,
      Y=b.t===1?b.y:b.y+b.h/2;
      if(X+R0<i.l||X-R0>i.r||Y+R0<i.t||Y-R0>i.b)continue;
      const dx=X-c,
      dy=Y-f,
      D=Math.hypot(dx,dy);
      if(D<R0+4)continue;
      const A=Math.atan2(dy,dx),
      w=Math.asin(Math.min(1,R0/D)),
      E=d/(D||1);
      const p1=[c+Math.cos(A-w)*Math.sqrt(D*D-R0*R0),f+Math.sin(A-w)*Math.sqrt(D*D-R0*R0)],
      p2=[c+Math.cos(A+w)*Math.sqrt(D*D-R0*R0),f+Math.sin(A+w)*Math.sqrt(D*D-R0*R0)];
      l.moveTo(p1[0],p1[1]),
      l.lineTo(p1[0]+(p1[0]-c)*E,p1[1]+(p1[1]-f)*E),
      l.lineTo(p2[0]+(p2[0]-c)*E,p2[1]+(p2[1]-f)*E),
      l.lineTo(p2[0],p2[1]),
      l.closePath()
    }
    l.fillStyle="rgba(12,15,24,0.72)",
    l.fill()
  }
  drawHazards2(a){
    const l=this.ctx,
    t=a.realT;
    for(const w of a.icewalls||[]){
      if(w.dead||!this.inView(w.x,w.y,30))continue;
      l.globalAlpha=Math.min(1,w.life),
      l.fillStyle="rgba(20,60,80,0.3)",
      l.beginPath(),
      l.ellipse(w.x+3,w.y+6,w.r,w.r*.6,0,0,ne),
      l.fill();
      const g=l.createLinearGradient(w.x-w.r,w.y-w.r,w.x+w.r,w.y+w.r);
      g.addColorStop(0,"#e6fbff"),
      g.addColorStop(1,"#5cb4cf"),
      l.fillStyle=g,
      l.strokeStyle="#2f7d96",
      l.lineWidth=1.5,
      l.beginPath();
      for(let k=0;k<6;k++){
        const A=k/6*ne+w.x;
        l[k?"lineTo":"moveTo"](w.x+Math.cos(A)*w.r,w.y+Math.sin(A)*w.r)
      }
      l.closePath(),
      l.fill(),
      l.stroke(),
      l.globalAlpha=1
    }
    for(const M of a.mines||[]){
      if(!this.inView(M.x,M.y,30))continue;
      const on=M.t>=M.arm;
      l.fillStyle="#2f4a56",
      l.strokeStyle="#9fe6ff",
      l.lineWidth=1.5,
      l.beginPath(),
      l.arc(M.x,M.y,9,0,ne),
      l.fill(),
      l.stroke(),
      l.fillStyle=on&&Math.sin(t*10)>0?"#4ad1ff":"#1d3c4c",
      l.beginPath(),
      l.arc(M.x,M.y,3.5,0,ne),
      l.fill()
    }
  }
  drawPropGlow(a){
    const l=a.map.props;
    if(!l)return;
    const s=this.ctx,
    i=a.realT,
    G={
      furnace_vent:[90,"255,120,40",.34,6],
      lava_pool:[120,"255,110,30",.38],
      lava_fissure:[100,"255,120,40",.32],
      royal_lantern:[85,"255,200,110",.36,0],
      rune_pillar:[60,"255,205,90",.22,0],
      frost_pylon:[80,"140,225,255",.3,-2],
      ice_beacon:[70,"150,230,255",.26],
      spore_pod:[70,"180,255,120",.22],
      egg_nest:[60,"255,230,160",.16],
      nest_cluster:[60,"200,255,150",.14]
    };
    s.save(),
    s.globalCompositeOperation="lighter";
    for(const c of l){
      const f=G[c.kind];
      if(!f||!this.inView(c.x,c.y,f[0]*c.scale))continue;
      const d=f[0]*c.scale*(1+.07*Math.sin(i*2.3+c.x*.01));
      s.globalAlpha=Math.min(1,f[2]*1.6),
      s.drawImage(this.glow("#"+f[1].split(",").map(n=>(+n).toString(16).padStart(2,"0")).join("")),c.x-d,c.y+(f[3]||0)*c.scale-d,d*2,d*2)
    }
    s.globalAlpha=1,
    s.restore()
  }
  drawAtmos(a,l,s){
    const i=this.ctx,
    c=a.mapId,
    f={
      harbor:["rgba(150,185,205,0.10)","fog",30,"rgba(220,235,240,0.10)"],
      foundry:["rgba(255,120,40,0.08)","ember",70,"#ffb35a"],
      hatchery:["rgba(90,140,40,0.10)","spore",55,"rgba(200,255,140,0.55)"],
      outpost:["rgba(170,215,255,0.10)","snow",140,"rgba(255,255,255,0.85)"],
      mausoleum:["rgba(70,40,100,0.12)","mote",45,"rgba(255,215,120,0.75)"],
      airbase:["rgba(120,110,120,0.06)","ember",50,"#ffb35a"]
    }
    [c];
    if(!f||a.training)return;
    i.fillStyle=f[0],
    i.fillRect(0,0,l,s);
    this.atm&&this.atm.id===c&&this.atm.w===l||(this.atm={
      id:c,
      w:l,
      p:Array.from({
        length:f[2]
      },()=>({
        x:Math.random()*l,
        y:Math.random()*s,
        z:.4+Math.random()*.9,
        o:Math.random()*6.28
      }))
    });
    const d=Math.min(.05,Math.max(0,a.realT-(this.atmT??a.realT)));
    this.atmT=a.realT;
    const m=a.cam,
    b=(m.x-(this.atmCx??m.x))*m.zoom,
    p=(m.y-(this.atmCy??m.y))*m.zoom;
    this.atmCx=m.x,
    this.atmCy=m.y;
    i.save(),
    f[1]==="ember"&&(i.globalCompositeOperation="lighter");
    for(const y of this.atm.p){
      y.o+=d*1.5;
      let g=0,
      v=0;
      f[1]==="snow"?(g=Math.sin(y.o)*18-25,v=60):f[1]==="ember"?(g=Math.sin(y.o)*14,v=-45):f[1]==="spore"?(g=Math.sin(y.o)*10,v=-8):f[1]==="mote"?(g=Math.cos(y.o)*8,v=Math.sin(y.o*.7)*8):(g=22,v=0);
      y.x+=(g*y.z)*d-b*y.z*.35,
      y.y+=(v*y.z)*d-p*y.z*.35,
      y.x<-60&&(y.x+=l+120),
      y.x>l+60&&(y.x-=l+120),
      y.y<-60&&(y.y+=s+120),
      y.y>s+60&&(y.y-=s+120);
      if(f[1]==="fog"){
        const Z=140*y.z;
        i.globalAlpha=.22,
        i.drawImage(this.glow("#e1eef2"),y.x-Z,y.y-Z,Z*2,Z*2),
        i.globalAlpha=1;
        continue
      }
      const S=f[1]==="snow"?1.2+y.z*1.6:f[1]==="ember"?.8+y.z*1.4:1+y.z*1.8;
      i.globalAlpha=f[1]==="mote"||f[1]==="ember"?.5+.5*Math.sin(y.o*3):1,
      i.fillStyle=f[3],
      i.beginPath(),
      i.arc(y.x,y.y,S,0,6.283),
      i.fill()
    }
    i.restore()
  }
  drawWalls(){
    this.mapId=this.__mid;
    const a=this.ctx,
    l=this.v,
    s=[];
    for(const i of this.tall)i.x>l.r||i.x+i.w<l.l||i.y>l.b||i.y+i.h<l.t||s.push(i);
    const WP={
      island:["#3a2f26","#6b5a48","#8a775f","#b8a68a"],
      harbor:["#2c3438","#56636a","#75848b","#a9b7bc"],
      foundry:["#241f1c","#4a3d36","#665449","#9a7f6a"],
      hatchery:["#2a2a1c","#5a5236","#7a7048","#a99c6a"],
      outpost:["#3a4a52","#7d94a0","#a9bfc9","#eef6f8"],
      mausoleum:["#2a2420","#6a5c48","#8c7c62","#cbb98f"],
      airbase:["#2a2e32","#4f565c","#6f777e","#aab2b8"]
    }
    [this.mapId]??["#2b2723","#4e4740","#6a6158","#9a8f80"],
    WH=10,
    ws=s.filter(i=>i.kind==="wall");
    a.fillStyle="rgba(0,0,0,0.28)",
    a.beginPath();
    for(const i of ws)a.rect(i.x+5,i.y+WH,i.w,i.h);
    a.fill(),
    a.fillStyle=WP[0],
    a.beginPath();
    for(const i of ws)a.rect(i.x,i.y,i.w,i.h+WH);
    a.fill(),
    a.fillStyle=WP[1],
    a.beginPath();
    for(const i of ws)a.rect(i.x+1,i.y+i.h-1,i.w-2,WH);
    a.fill(),
    a.fillStyle="rgba(0,0,0,0.18)";
    for(const i of ws)if(i.w>i.h)for(let k=i.x+14;k<i.x+i.w-4;k+=22)a.fillRect(k,i.y+i.h,1.5,WH-1);
    a.fillStyle=WP[2],
    a.beginPath();
    for(const i of ws)a.rect(i.x+1,i.y+1,i.w-2,i.h-2);
    a.fill(),
    a.fillStyle=WP[3],
    a.beginPath();
    for(const i of ws)a.rect(i.x+1,i.y+1,i.w-2,2.5);
    a.fill(),
    a.fillStyle="rgba(0,0,0,0.12)",
    a.beginPath();
    for(const i of ws)i.w>i.h?a.rect(i.x+1,i.y+i.h*.55,i.w-2,1.5):a.rect(i.x+i.w*.55,i.y+1,1.5,i.h-2);
    a.fill();
    for(const i of s)if(i.kind==="cargo"){
      const PAL={
        o:["#c8641e","#e08a42","#8a3f10"],
        b:["#2f6c9e","#4f8cbe","#1c4568"],
        r:["#a8352b","#c8574a","#6e1d16"],
        g:["#3f7a4a","#5f9a68","#24502c"],
        y:["#b89a3a","#d6b85a","#7a6420"],
        w:["#9aa3a6","#bcc4c6","#5e676a"],
        t:["#2f7f86","#4fa0a6","#1a4f54"]
      },
      SET={
        harbor:"bbrotwgbro",
        foundry:"orwgowrg",
        hatchery:"gtwgbg",
        outpost:"bwrbwt",
        mausoleum:"rwgr",
        airbase:"wbwgrw",
        island:"obrgy"
      }
      [this.mapId]??"obrgy",
      HS=((Math.round(i.x)*73856093)^(Math.round(i.y)*19349663)^(i.v*83492791))>>>0,
      C=PAL[SET[HS%SET.length]],
      H=i.w>=i.h,
      L=H?i.w:i.h,
      T=H?i.h:i.w,
      V=8;
      a.save(),
      a.translate(i.x,i.y),
      H||(a.translate(i.w,0),a.rotate(Math.PI/2));
      a.fillStyle="rgba(0,0,0,0.3)",
      a.fillRect(6,T,L-2,V+2);
      a.fillStyle=C[2],
      a.fillRect(0,T-1,L,V);
      a.fillStyle="rgba(0,0,0,0.25)";
      for(let x=6;x<L-4;x+=8)a.fillRect(x,T,2,V-1);
      const g=a.createLinearGradient(0,0,0,T);
      g.addColorStop(0,C[1]),
      g.addColorStop(.5,C[0]),
      g.addColorStop(1,C[2]),
      a.fillStyle=g,
      a.fillRect(0,0,L,T);
      a.fillStyle="rgba(0,0,0,0.16)";
      for(let x=8;x<L-6;x+=7)a.fillRect(x,3,2.2,T-6);
      a.fillStyle="rgba(255,255,255,0.1)";
      for(let x=10;x<L-6;x+=7)a.fillRect(x,3,1,T-6);
      a.fillStyle="rgba(0,0,0,0.35)",
      a.fillRect(0,0,L,2.5),
      a.fillRect(0,T-2.5,L,2.5),
      a.fillRect(0,0,4,T),
      a.fillRect(L-4,0,4,T);
      a.fillStyle="#2a2a2a";
      for(const[x,y]of[[0,0],[L-7,0],[0,T-7],[L-7,T-7]])a.fillRect(x,y,7,7);
      a.fillStyle="rgba(255,255,255,0.25)";
      for(const[x,y]of[[1,1],[L-6,1]])a.fillRect(x,y,4,1.5);
      a.fillStyle="rgba(0,0,0,0.3)",
      a.fillRect(L-22,4,1.5,T-8),
      a.fillRect(L-13,4,1.5,T-8);
      a.fillStyle="#d8d8d0";
      for(const x of[L-18,L-9])a.fillRect(x,T*.3,2,T*.4);
      const P=Ro(Math.round(i.x*3+i.y));
      for(let k=0;k<Math.max(2,L/40);k++){
        const x=8+P()*(L-30),
        y=3+P()*(T-6),
        r=3+P()*7;
        a.fillStyle="rgba(110,55,25,0.35)",
        a.beginPath(),
        a.ellipse(x,y,r,r*.6,P()*3,0,6.283),
        a.fill()
      }
      if(L>110&&T>40){
        a.fillStyle="rgba(255,255,255,0.75)",
        a.font=`bold ${Math.min(12,T*.24)}px monospace`,
        a.textBaseline="middle",
        a.fillText(["DUCK","QUAK","GOOS","MALL"][i.v%4]+" "+String(100+Math.round(i.x+i.y)%900),12,T/2)
      }
      a.restore()
    }else if(i.kind==="train"){
      const c=["#6b3d2b","#3d4a5c","#5e6150"];
      a.fillStyle="#222",
      a.fillRect(i.x-3,i.y+4,i.w+6,i.h-8),
      a.fillStyle=c[i.v%3],
      a.fillRect(i.x,i.y,i.w,i.h),
      a.fillStyle="rgba(255,255,255,0.1)",
      a.fillRect(i.x,i.y+i.h/2-2,i.w,4),
      a.fillStyle="rgba(0,0,0,0.2)";
      for(let f=i.x+20;f<i.x+i.w-10;f+=40)a.fillRect(f,i.y+4,3,i.h-8)
    }else if(i.kind==="rack"){
      a.fillStyle="#4f5459",
      a.fillRect(i.x,i.y,i.w,i.h);
      const c=["#b88a4a","#8a6a3a","#6d7f8c","#a14a3a"],
      f=i.w>i.h,
      d=Math.floor((f?i.w:i.h)/26);
      for(let m=0;m<d;m++)a.fillStyle=c[(m+i.v)%4],
      f?a.fillRect(i.x+3+m*26,i.y+3,22,i.h-6):a.fillRect(i.x+3,i.y+3+m*26,i.w-6,22)
    }
  }
  drawAdditive(a){
    const l=this.ctx;
    l.globalCompositeOperation="lighter";
    for(const i of a.lights)this.inView(i.x,i.y,i.r)&&(l.globalAlpha=Math.min(1,i.life/i.max*.9),l.drawImage(this.glow(i.color),i.x-i.r,i.y-i.r,i.r*2,i.r*2));
    const s=a.realT;
    for(const i of a.extracts)this.inView(i.x,i.y-200,300)&&(l.globalAlpha=.35+Math.sin(s*3)*.1,l.drawImage(this.glow("#6dff9e"),i.x-34,i.y-420,68,440),l.globalAlpha=.25,l.drawImage(this.glow("#6dff9e"),i.x-i.r*1.3,i.y-i.r*1.3,i.r*2.6,i.r*2.6));
    for(const i of a.beams){
      const c=Math.min(1,i.life/i.max*1.5);
      l.globalAlpha=c*.9,
      l.drawImage(this.glow(i.color),i.x-30,i.y-520,60,540),
      l.globalAlpha=c*.6,
      l.drawImage(this.glow(i.color),i.x-90,i.y-90,180,180)
    }
    l.globalAlpha=1,
    l.lineCap="round";
    for(let i=0;i<2;i++)for(const c of[0,1]){
      l.strokeStyle=c===0?i===0?"rgba(255,220,140,0.25)":"#fff6cf":i===0?"rgba(255,110,60,0.3)":"#ffb08a";
      for(const f of a.bullets){
        if(f.from!==c||!this.inView(f.x,f.y,60))continue;
        f.chill?l.strokeStyle=i===0?"rgba(120,210,255,0.35)":"#bff0ff":f.explosive?l.strokeStyle=i===0?"rgba(255,120,50,0.35)":"#ffd08a":l.strokeStyle=c===0?i===0?"rgba(255,220,140,0.25)":"#fff6cf":i===0?"rgba(255,110,60,0.3)":"#ffb08a";
        const d=Math.hypot(f.vx,f.vy)||1,
        m=Math.min(Math.hypot(f.x-f.ox,f.y-f.oy),d*(c===0?.034:.032));
        l.lineWidth=i===0?f.w*3:f.w,
        l.beginPath(),
        l.moveTo(f.x-f.vx/d*m,f.y-f.vy/d*m),
        l.lineTo(f.x,f.y),
        l.stroke()
      }
    }
    for(const i of a.particles){
      if(i.type!==ti&&i.type!==Un&&i.type!==ai&&i.type!==Yl||!this.inView(i.x,i.y,40+i.size))continue;
      const c=i.life/i.max;
      if(i.type===ti)l.globalAlpha=c,
      l.strokeStyle=i.color,
      l.lineWidth=i.size,
      l.beginPath(),
      l.moveTo(i.x,i.y),
      l.lineTo(i.x-i.vx*.03,i.y-i.vy*.03),
      l.stroke();
      else if(i.type===Un){
        l.globalAlpha=Math.min(1,c*1.4);
        const f=i.size*2;
        l.drawImage(this.glow(i.color),i.x-f/2,i.y-f/2,f,f)
      }else if(i.type===ai){
        l.globalAlpha=1,
        l.save(),
        l.translate(i.x,i.y),
        l.rotate(i.rot),
        l.fillStyle=i.color;
        const f=i.size;
        l.beginPath(),
        l.moveTo(-2,0),
        l.lineTo(f*.3,-f*.35),
        l.lineTo(f*1.6,0),
        l.lineTo(f*.3,f*.35),
        l.closePath(),
        l.moveTo(0,-f*.6),
        l.lineTo(f*.2,0),
        l.lineTo(0,f*.6),
        l.lineTo(-f*.2,0),
        l.closePath(),
        l.fill(),
        l.restore(),
        l.drawImage(this.glow("#ffcf7a"),i.x-f*1.5,i.y-f*1.5,f*3,f*3)
      }else{
        l.globalAlpha=Math.min(1,c*1.5),
        l.fillStyle=i.color;
        const f=i.size;
        l.save(),
        l.translate(i.x,i.y),
        l.rotate(i.rot),
        l.beginPath(),
        l.moveTo(0,-f*1.6),
        l.lineTo(f*.4,-f*.4),
        l.lineTo(f*1.6,0),
        l.lineTo(f*.4,f*.4),
        l.lineTo(0,f*1.6),
        l.lineTo(-f*.4,f*.4),
        l.lineTo(-f*1.6,0),
        l.lineTo(-f*.4,-f*.4),
        l.closePath(),
        l.fill(),
        l.restore()
      }
    }
    l.globalAlpha=1,
    l.globalCompositeOperation="source-over"
  }
  bubble(a,l,s,i,c,f){
    const d=this.ctx;
    d.save(),
    d.translate(a,l),
    d.scale(f,f),
    d.fillStyle=i,
    He(d,-9,-11,18,20,6),
    d.fill(),
    d.beginPath(),
    d.moveTo(-4,8),
    d.lineTo(0,14),
    d.lineTo(4,8),
    d.fill(),
    d.fillStyle=c,
    d.font=`900 15px ${at}`,
    d.textAlign="center",
    d.textBaseline="middle",
    d.fillText(s,0,0),
    d.restore()
  }
  drawWorldUI(a,l){
    const s=this.ctx,
    i=a.realT;
    if(a.mode==="raid"){
      for(const d of a.enemies)if(!(d.visA<.3||!this.inView(d.x,d.y,60))){
        if(!d.def.encounter&&d.special==="chargeWind"&&(s.save(),s.translate(d.x,d.y),s.rotate(Math.atan2(d.cdy,d.cdx)),s.fillStyle=`rgba(255,60,40,${.18+.15*Math.sin(i*30)})`,s.fillRect(0,-d.r,390,d.r*2),s.strokeStyle="rgba(255,80,60,0.7)",s.lineWidth=2,s.strokeRect(0,-d.r,390,d.r*2),s.restore()),!d.def.encounter&&d.special==="honkWind"){
          const m=1-d.specialT/.6;
          s.strokeStyle=`rgba(255,150,60,${.4+m*.5})`,
          s.lineWidth=3,
          s.beginPath(),
          s.arc(d.x,d.y,60+m*230,0,ne),
          s.stroke()
        }
        if(d.hurtT>0&&!d.def.boss){
          const b=d.x-16,
          p=d.y-d.r-15;
          s.globalAlpha=Math.min(1,d.hurtT*2)*d.visA,
          s.fillStyle="rgba(0,0,0,0.6)",
          s.fillRect(b-1,p-1,34,6),
          s.fillStyle="#ff5a4a",
          s.fillRect(b,p,32*Math.max(0,d.hp/d.maxHp),4),
          d.armorMax>0&&(s.fillStyle="#7fb2ff",s.fillRect(b,p-4,32*Math.max(0,d.armor/d.armorMax),2.5)),
          s.globalAlpha=1
        }
        if(d.alertT>0){
          const m=d.alertT>1?1+(d.alertT-1)*3:1;
          s.globalAlpha=Math.min(1,d.alertT*3),
          this.bubble(d.x,d.y-d.r-26,"!","#ffcf33","#3a2600",m),
          s.globalAlpha=1
        }else d.qT>0&&(d.state==="search"||d.state==="hunt")&&(s.globalAlpha=Math.min(1,d.qT*2)*.9,this.bubble(d.x,d.y-d.r-26,"?","#f2efe6","#333",.9),s.globalAlpha=1)
      }
      const f=a.player;
      if(!f.dead){
        const d=f.weapons[f.cur];
        if(d&&d.reloadT>0&&(s.strokeStyle="rgba(0,0,0,0.5)",s.lineWidth=5,s.beginPath(),s.arc(f.x,f.y,f.r+9,0,ne),s.stroke(),s.strokeStyle="#ffd23f",s.lineWidth=3,s.beginPath(),s.arc(f.x,f.y,f.r+9,-Math.PI/2,-Math.PI/2+(1-d.reloadT/d.def.reload)*ne),s.stroke()),f.healT>0&&(s.strokeStyle="rgba(0,0,0,0.5)",s.lineWidth=5,s.beginPath(),s.arc(f.x,f.y,f.r+14,0,ne),s.stroke(),s.strokeStyle="#6dff9e",s.lineWidth=3,s.beginPath(),s.arc(f.x,f.y,f.r+14,-Math.PI/2,-Math.PI/2+(1-f.healT/f.healDur)*ne),s.stroke()),a.nearC&&(!a.search||a.search.c!==a.nearC)){
          const m=a.nearC,
          b=l.touchMode?`搜索 · ${m.name}`:`[E] 搜索 · ${m.name}`;
          s.font=`700 12px ${Ln}`;
          const p=s.measureText(b).width+18,
          y=m.y-(m.body?34:m.h/2+30)+Math.sin(i*4)*1.5;
          s.fillStyle="rgba(18,20,24,0.85)",
          He(s,m.x-p/2,y-11,p,22,11),
          s.fill(),
          s.strokeStyle="#ffd23f",
          s.lineWidth=1.5,
          s.stroke(),
          s.fillStyle="#ffe9a0",
          s.textAlign="center",
          s.textBaseline="middle",
          s.fillText(b,m.x,y+1)
        }
      }
    }
    for(const f of a.extracts){
      if(!this.inView(f.x,f.y,200))continue;
      s.font=`800 15px ${Ln}`,
      s.textAlign="center",
      s.textBaseline="middle";
      const d=`撤离点 ${f.id} · ${f.name}`;
      s.lineWidth=4,
      s.strokeStyle="rgba(0,30,10,0.75)",
      s.strokeText(d,f.x,f.y-f.r-18),
      s.fillStyle="#8dffbb",
      s.fillText(d,f.x,f.y-f.r-18)
    }
    s.textAlign="center",
    s.textBaseline="middle";
    for(const f of a.texts){
      const d=Math.min(1,f.life/f.max*2.5),
      m=f.max-f.life<.12?1+(.12-(f.max-f.life))*4:1;
      s.globalAlpha=d,
      s.font=`800 ${Math.round(f.size*m)}px ${at}`,
      s.lineWidth=3.5,
      s.strokeStyle="rgba(10,10,14,0.85)",
      s.strokeText(f.text,f.x,f.y),
      s.fillStyle=f.color,
      s.fillText(f.text,f.x,f.y)
    }
    s.globalAlpha=1
  }
  drawScreenFx(a){
    const l=this.ctx,
    s=this.W,
    i=this.H,
    c=a.player,
    f=c.hp/c.maxHp;
    if(!c.dead&&f<.35){
      const y=(.35-f)*1.6*(.7+.3*Math.sin(a.realT*6)),
      g=l.createRadialGradient(s/2,i/2,Math.min(s,i)*.3,s/2,i/2,Math.hypot(s,i)/2);
      g.addColorStop(0,"rgba(180,0,0,0)"),
      g.addColorStop(1,`rgba(180,0,0,${Math.min(.6,y)})`),
      l.fillStyle=g,
      l.fillRect(0,0,s,i)
    }
    c.hurtT>0&&(l.fillStyle=`rgba(255,30,30,${c.hurtT*.35})`,l.fillRect(0,0,s,i)),
    a.flash.t>0&&(l.fillStyle=`rgba(${a.flash.color},${Math.min(.55,a.flash.t)})`,l.fillRect(0,0,s,i));
    const d=a.cam,
    m=s/2+(c.x-d.x-d.kx)*d.zoom+d.sx,
    b=i/2+(c.y-d.y-d.ky)*d.zoom+d.sy,
    p=Math.min(s,i)*.16+30;
    for(const y of a.dmgInds)l.strokeStyle=`rgba(255,60,50,${y.t*.85})`,
    l.lineWidth=7,
    l.lineCap="round",
    l.beginPath(),
    l.arc(m,b,p,y.ang-.28,y.ang+.28),
    l.stroke()
  }
  panel(a,l,s,i,c=10){
    const f=this.ctx;
    f.fillStyle="rgba(14,16,20,0.74)",
    He(f,a,l,s,i,c),
    f.fill(),
    f.strokeStyle="rgba(255,255,255,0.09)",
    f.lineWidth=1,
    f.stroke()
  }
  txt(a,l,s,i,c,f="left",d=700,m=Ln){
    const b=this.ctx;
    b.font=`${d} ${i}px ${m}`,
    b.textAlign=f,
    b.textBaseline="middle",
    b.fillStyle=c,
    b.fillText(a,l,s)
  }
  drawHUD(a,l,s){
    const i=this.ctx,
    c=this.W,
    f=this.H,
    d=l.touchMode,
    m=Wc(c,f,d),
    b=a.player,
    p=a.realT,
    y=l.layout,
    g=214*m,
    v=(d?118:86)*m;
    this.panel(12,12,g,v);
    const S=a.timeLimit-a.t,
    T=S<(a.training?15:60);
    this.txt("剩余时间",24,12+15*m,11*m,"rgba(230,226,214,0.6)","left",600),
    this.txt(Po(S),24,12+38*m,30*m,T&&Math.sin(p*8)>0?"#ff5a4a":T?"#ffb0a8":"#f2efe6","left",700,at),
    this.txt("背包价值",12+g-12,12+15*m,11*m,"rgba(230,226,214,0.6)","right",600),
    this.txt(`¥${Ee(a.lootValue)}`,12+g-12,12+36*m,19*m,"#ffcf4a","right",700,at),
    this.txt(`背包 ${b.backpack.length}/${b.capacity}`,24,12+66*m,12*m,b.backpack.length>=b.capacity?"#ff8a5c":"#cfcabb","left",600),
    this.txt(`击杀 ${a.stats.kills}`,12+g-12,12+66*m,12*m,"#cfcabb","right",600),
    d&&this.drawBars(24,12+82*m,g-24,m,!0),
    a.zoneT>0&&(i.globalAlpha=Math.min(1,a.zoneT*2),this.txt(`📍 ${a.zoneName}`,16,12+v+18*m,14*m,"#f2efe6","left",700),i.globalAlpha=1);
    const H=d?y.mm:Math.round(176*m),
    B=H*a.map.h/a.map.w,
    Q=c-12-H,
    se=12;
    this.panel(Q-4,se-4,H+8,B+8,8),
    this.minimap&&i.drawImage(this.minimap,Q,se,H,B);
    const ie=H/a.map.w;
    if(a.training&&!b.backpack.length){
      const X=a.containers[0];
      i.fillStyle="#ffd23f",
      i.fillRect(Q+X.x*ie-3,se+X.y*ie-3,6,6)
    }
    for(const X of a.extracts){
      const C=4+Math.sin(p*4)*1.5;
      i.fillStyle="#6dff9e",
      i.beginPath(),
      i.arc(Q+X.x*ie,se+X.y*ie,C,0,ne),
      i.fill(),
      this.txt(X.id,Q+X.x*ie,se+X.y*ie-10,10*m,"#b8ffd4","center",800,at)
    }
    i.fillStyle="#ff4a3a";
    for(const X of a.enemies)X.visA<.5||(i.beginPath(),i.arc(Q+X.x*ie,se+X.y*ie,X.def.boss?3.5:2.2,0,ne),i.fill());
    const ce=c/a.cam.zoom,
    fe=f/a.cam.zoom;
    i.save(),
    i.beginPath(),
    i.rect(Q,se,H,B),
    i.clip(),
    i.strokeStyle="rgba(255,255,255,0.35)",
    i.lineWidth=1,
    i.strokeRect(Q+(a.cam.x-ce/2)*ie,se+(a.cam.y-fe/2)*ie,ce*ie,fe*ie),
    i.restore(),
    i.save(),
    i.translate(Q+b.x*ie,se+b.y*ie),
    i.rotate(b.aim),
    i.fillStyle="#ffd23f",
    i.strokeStyle="#3a2a00",
    i.lineWidth=1,
    i.beginPath(),
    i.moveTo(6,0),
    i.lineTo(-4,-4),
    i.lineTo(-2,0),
    i.lineTo(-4,4),
    i.closePath(),
    i.fill(),
    i.stroke(),
    i.restore();
    const J=c<640,
    te=J?12+v+30*m:14;
    let j=te;
    const ee=a.enemies.filter(X=>X.def.boss&&!X.dead).slice(0,3),
    le=(J?27:33)*m,
    Z={
      strafe:"扫射",
      napalm:"燃烧",
      scan:"锁定",
      icewall:"冰墙",
      mines:"地雷",
      charge:"冲撞",
      slam:"震地",
      pulse:"冲击",
      summon:"召唤",
      barrage:"炮击",
      spiral:"弹幕",
      eggrain:"抛卵",
      blink:"闪现",
      fortify:"壁垒",
      magma:"熔渣"
    };
    for(const[X,C]of ee.entries()){
      const P=Math.min(420*m,c*(J?.8:.5)),
      A=c/2-P/2,
      V=te+4+X*le,
      Y=C.def.encounter,
      ue=C.castSkill??Y?.skillCycle?.[C.castCount%Y.skillCycle.length]??Y?.skill,
      q=ue?Z[ue]:"",
      M=ue?Y?.skillLabels?.[ue]??q:"",
      R=Y?.ringColor??"#ffb37a";
      this.txt(`👑 ${C.def.name}${Y?.skillName?` · ${Y.skillName}`:""}${M?` · ${M}`:""}${Y?` · 阶段 ${C.phase+1}`:""}`,c/2,V+2,(J?12:14)*m,R,"center",800),
      i.fillStyle="rgba(0,0,0,0.6)",
      i.fillRect(A-2,V+12*m,P+4,12*m+4),
      i.fillStyle="#e8463a",
      i.fillRect(A,V+12*m+2,P*Math.max(0,C.hp/C.maxHp),8*m),
      i.fillStyle="#7fb2ff",
      i.fillRect(A,V+20*m+2,P*Math.max(0,C.armor/C.armorMax),4*m)
    }
    ee.length&&(j=te+4+ee.length*le+4*m);
    for(let X=0;X<a.msgs.length;X++){
      const C=a.msgs[X],
      P=Math.min(1,C.t*6)*Math.min(1,(3.4-C.t)*2);
      i.globalAlpha=Math.max(0,P),
      i.font=`700 ${13*m}px ${Ln}`;
      const A=i.measureText(C.text).width+22,
      V=j+X*24*m+0;
      i.fillStyle="rgba(14,16,20,0.62)",
      He(i,c/2-A/2,V,A,20*m,10*m),
      i.fill(),
      this.txt(C.text,c/2,V+10*m+1,13*m,C.color,"center",700)
    }
    if(i.globalAlpha=1,a.exZone&&!a.ended){
      const X=c/2,
      C=f*.24,
      P=34*m;
      i.fillStyle="rgba(10,30,18,0.7)",
      i.beginPath(),
      i.arc(X,C,P+6,0,ne),
      i.fill(),
      i.strokeStyle="rgba(255,255,255,0.12)",
      i.lineWidth=6,
      i.beginPath(),
      i.arc(X,C,P,0,ne),
      i.stroke(),
      i.strokeStyle="#6dff9e",
      i.beginPath(),
      i.arc(X,C,P,-Math.PI/2,-Math.PI/2+a.exProg/Fs*ne),
      i.stroke(),
      this.txt((Fs-a.exProg).toFixed(1),X,C+1,20*m,"#eafff1","center",700,at),
      this.txt("撤离中 · 保持在区域内",X,C+P+22*m,14*m,"#8dffbb","center",800)
    }
    if(!a.ended){
      const X=a.cam;
      for(const C of a.extracts){
        const P=c/2+(C.x-X.x-X.kx)*X.zoom,
        A=f/2+(C.y-X.y-X.ky)*X.zoom,
        V=40*m;
        if(P>V&&P<c-V&&A>V&&A<f-V)continue;
        const Y=Math.atan2(A-f/2,P-c/2),
        ue=12+v+48*m,
        q=f-(d?130:150)*m,
        M=Math.max(V,Math.min(c-V,P)),
        R=M>c-H-40?Math.max(ue,B+44*m):ue,
        L=d&&M>c*.55?Math.max(R+10,f-300*m):q,
        O=Math.max(R,Math.min(L,A)),
        oe=Math.round(Math.hypot(C.x-b.x,C.y-b.y)/10);
        i.save(),
        i.translate(M,O),
        i.rotate(Y),
        i.fillStyle="rgba(30,60,40,0.85)",
        i.beginPath(),
        i.arc(0,0,15*m,0,ne),
        i.fill(),
        i.fillStyle="#6dff9e",
        i.beginPath(),
        i.moveTo(22*m,0),
        i.lineTo(10*m,-8*m),
        i.lineTo(10*m,8*m),
        i.closePath(),
        i.fill(),
        i.restore(),
        this.txt(C.id,M,O+1,13*m,"#b8ffd4","center",800,at),
        this.txt(`${oe}m`,M,O+24*m,11*m,"#b8ffd4","center",700,at)
      }
    }
    if(d?this.drawWeapon(c/2,f-14,m,!0):(this.drawBars(20,f-66*m,250*m,m,!1),this.drawWeapon(c-20,f-20,m,!1)),this.drawLoot(a,m,d),a.banner){
      const X=a.banner,
      C=Math.min(1,X.t*5)*Math.min(1,(X.dur-X.t)*2.5),
      P=X.t<.25?1+(.25-X.t)*2.2:1;
      i.save(),
      i.globalAlpha=Math.max(0,C),
      i.translate(c/2,f*.36),
      i.scale(P,P);
      const A=i.createLinearGradient(-c*.35,0,c*.35,0);
      A.addColorStop(0,"rgba(10,12,16,0)"),
      A.addColorStop(.5,"rgba(10,12,16,0.75)"),
      A.addColorStop(1,"rgba(10,12,16,0)"),
      i.fillStyle=A,
      i.fillRect(-c*.35,-36*m,c*.7,76*m),
      i.font=`900 ${40*m}px ${Ln}`,
      i.textAlign="center",
      i.textBaseline="middle",
      i.lineWidth=6,
      i.strokeStyle="rgba(0,0,0,0.6)",
      i.strokeText(X.text,0,-6*m),
      i.fillStyle=X.color,
      i.fillText(X.text,0,-6*m),
      this.txt(X.sub,0,26*m,15*m,"#f2efe6","center",600),
      i.restore()
    }
    if(a.training&&s==="playing"&&!a.ended){
      const X=Math.min(6,a.tutorialStage),
      C=d?["击退挡路的小鸡（右半屏拖动开火）","向右走进军械室，点「搜索」拾取冲锋枪","击退军械室的 2 名鸭匪","搜第二个补给箱 · 点背包可换上掉落的枪","前往绿色撤离点","撤离点遭伏击！击退 2 名鸭匪","留在撤离区内坚守 6 秒"]:["击退挡路的小鸡（鼠标瞄准射击）","向右走进军械室，按 E 拾取冲锋枪","击退军械室的 2 名鸭匪","搜第二个补给箱 · 点背包装备掉落的枪","前往绿色撤离点","撤离点遭伏击！击退 2 名鸭匪","留在撤离区内坚守 6 秒"],
      P=Math.min(c-24,380*m),
      A=d&&c>=700?12:24+Math.max(v,B);
      this.panel((c-P)/2,A,P,48*m),
      this.txt(`新手行动  ·  ${X+1}/7`,c/2,A+13*m,11*m,"#ffd23f","center",800),
      this.txt(C[X],c/2,A+32*m,11.5*m,"#f2efe6","center",700)
    }
    if(a.tutorialT>0&&a.tutorialT<7.6&&!a.ended&&s==="playing"&&!a.search){
      const X=Math.min(1,a.tutorialT)*Math.min(1,(7.6-a.tutorialT)*3);
      i.globalAlpha=Math.max(0,X);
      const C=d?["左半屏拖动 移动 · 右半屏拖动 瞄准并自动开火","靠近容器点「搜索」 · 翻滚可闪避子弹","目标：拾取武器 → 击退鸭匪 → 搜刮 → 安全撤离"]:["WASD 移动 · 鼠标 瞄准/射击 · 空格 翻滚闪避","E 搜索 · R 换弹 · G 投掷 · T 切雷 · H 治疗 · Q 切枪 · Esc 暂停","目标：拾取武器 → 击退鸭匪 → 搜刮 → 安全撤离"],
      P=Math.min(c-40,470*m),
      A=76*m,
      V=a.cam,
      Y=f/2+(b.y-V.y-V.ky)*V.zoom;
      let ue=d?c>f?f*.25:f*.6:f-200*m;
      !d&&Math.abs(Y-(ue+A/2))<A/2+50*m&&(ue=Math.max(12+v+30*m,f*.2));
      const q=c/2-P/2;
      this.panel(q,ue,P,A),
      C.forEach((M,R)=>this.txt(M,c/2,ue+16*m+R*22*m,(R===2?13:12.5)*m,R===2?"#ffd23f":"#e8e4d8","center",R===2?800:600)),
      i.globalAlpha=1
    }
    d?a.ended||this.drawTouch(a,l,m):!a.ended&&l.mouseX>-100&&this.drawCrosshair(a,l)
  }
  drawBars(a,l,s,i,c){
    const f=this.ctx,
    d=this._g.player,
    m=(c?10:14)*i,
    b=Math.max(0,d.hp/d.maxHp);
    if(!c){
      this.panel(a-8,l-30*i,s+16,82*i);
      const v=qt[d.selectedThrowable],
      S=[["🩹",d.bandages,"H"],["💉",d.medkits,"H"],[v.icon,d.throwables[d.selectedThrowable],"G/T"]];
      let T=a;
      for(const[H,B,Q]of S)f.globalAlpha=B>0?1:.35,
      this.drawIcon(H,T+9*i,l-15*i,18*i),
      this.txt(`×${B}`,T+21*i,l-14*i,13*i,"#f2efe6","left",700,at),
      this.txt(Q,T+42*i,l-14*i,10*i,"rgba(255,255,255,0.4)","left",700,at),
      T+=62*i,
      f.globalAlpha=1
    }
    f.fillStyle="rgba(0,0,0,0.55)",
    He(f,a,l,s,m,m/2),
    f.fill();
    const p=b>.5?"#5fd36a":b>.25?"#ffb93b":"#ff4f4f";
    b>0&&(f.fillStyle=p,He(f,a,l,Math.max(m,s*b),m,m/2),f.fill(),f.fillStyle="rgba(255,255,255,0.18)",f.fillRect(a+m/2,l+2,Math.max(0,s*b-m),m*.25)),
    this.txt(`${Math.ceil(d.hp)}`,a+8,l+m/2+1,(c?10:12)*i,"#0e1a0f","left",800,at);
    const y=l+m+5*i,
    g=(c?6:8)*i;
    f.fillStyle="rgba(0,0,0,0.55)",
    He(f,a,y,s,g,g/2),
    f.fill(),
    d.armorMax>0&&d.armor>0&&(f.fillStyle="#5aa8ff",He(f,a,y,Math.max(g,s*d.armor/d.armorMax),g,g/2),f.fill()),
    c||this.txt(d.armorMax>0?`护甲 ${Math.ceil(d.armor)}/${d.armorMax}`:"无护甲",a,y+g+10*i,11*i,"rgba(200,220,255,0.75)","left",600)
  }
  drawWeapon(a,l,s,i){
    const f=this._g.player,
    d=f.weapons[f.cur];
    if(!d)return;
    const m=f.weapons[f.cur===0?1:0];
    if(!i){
      const y=230*s,
      g=76*s;
      this.panel(a-y,l-g,y,g),
      this.txt(d.def.name,a-14,l-g+16*s,13*s,_e[d.def.rarity],"right",800);
      const v=d.ammo===0?"#ff5a4a":d.ammo<=d.def.mag*.25?"#ffb93b":"#f2efe6";
      this.txt(`/${d.def.mag}`,a-14,l-26*s,16*s,"rgba(242,239,230,0.55)","right",700,at),
      this.ctx.font=`700 ${16*s}px ${at}`;
      const S=this.ctx.measureText(`/${d.def.mag}`).width;
      this.txt(`${d.ammo}`,a-18-S,l-30*s,34*s,v,"right",700,at),
      d.reloadT>0?(this.ctx.fillStyle="rgba(255,255,255,0.12)",this.ctx.fillRect(a-y+14,l-12*s,y-28,4*s),this.ctx.fillStyle="#ffd23f",this.ctx.fillRect(a-y+14,l-12*s,(y-28)*(1-d.reloadT/d.def.reload),4*s),this.txt("换弹中…",a-y+14,l-26*s,12*s,"#ffd23f","left",700)):m&&this.txt(`Q ⇄ ${m.def.short}`,a-y+14,l-26*s,12*s,"rgba(242,239,230,0.55)","left",700,at);
      return
    }
    const b=`${d.def.short}  ${d.ammo}/${d.def.mag}`;
    this.ctx.font=`700 ${15*s}px ${at}`;
    const p=this.ctx.measureText(b).width+26;
    this.panel(a-p/2,l-28*s,p,26*s,13*s),
    this.txt(b,a,l-15*s+1,15*s,d.ammo===0?"#ff5a4a":"#f2efe6","center",700,at),
    d.reloadT>0&&(this.ctx.fillStyle="#ffd23f",this.ctx.fillRect(a-p/2+10,l-6*s,(p-20)*(1-d.reloadT/d.def.reload),3*s))
  }
  drawLoot(a,l,s){
    const i=a.search;
    if(!i)return;
    const c=this.ctx,
    f=this.W,
    d=this.H,
    m=i.c,
    b=Math.max(1,m.items.length),
    p=Math.min(72*l,(f-60)/Math.max(b,3)-8),
    y=8*l,
    g=12*l,
    v=b*p+(b-1)*y,
    S=Math.max(240*l,v+g*2),
    T=p+48*l,
    H=f/2-S/2,
    B=s?d-56*l-T:d-104*l-T;
    this.panel(H,B,S,T,12),
    c.fillStyle="#ffd23f",
    c.fillRect(H+12,B,40*l,3),
    this.txt(m.name,H+g,B+18*l,14*l,"#f2efe6","left",800);
    const Q=m.revealed>=m.items.length;
    if(this.txt(Q?m.items.length?"已搜完":"空空如也":"搜索中…",H+S-g,B+18*l,12*l,Q?"#8dffbb":"#ffd23f","right",700),!m.items.length)return;
    const se=f/2-v/2;
    for(let ie=0;ie<m.items.length;ie++){
      const ce=m.items[ie],
      fe=se+ie*(p+y),
      J=B+34*l;
      if(ie<m.revealed){
        const te=ce.def.rarity,
        j=a.realT-ce.at,
        ee=j<.25?1+(.25-j)*1.3:1;
        c.save(),
        c.translate(fe+p/2,J+p/2),
        c.scale(ee,ee);
        const le=c.createLinearGradient(0,-p/2,0,p/2);
        le.addColorStop(0,`rgba(${Gn[te]},0.12)`),
        le.addColorStop(1,`rgba(${Gn[te]},0.5)`),
        c.fillStyle=le,
        He(c,-p/2,-p/2,p,p,8),
        c.fill(),
        c.strokeStyle=_e[te],
        c.lineWidth=te>=4?2.5:1.5,
        c.stroke(),
        c.fillStyle=_e[te],
        c.fillRect(-p/2+6,p/2-4,p-12,3),
        this.drawIcon(ce.def.icon,0,-p*.14,p*.46);
        const Z=ce.def.name.length>5?ce.def.name.slice(0,5):ce.def.name;
        this.txt(Z,0,p*.2,Math.max(9,11*l),"#f2efe6","center",700),
        this.txt(`¥${Ee(ce.def.value)}`,0,p*.36,Math.max(8,10*l),"#ffcf4a","center",700,at),
        ce.taken||(c.fillStyle="rgba(0,0,0,0.6)",He(c,-p/2,-p/2,p,p,8),c.fill(),this.txt("背包满",0,0,12*l,"#bbb","center",800)),
        j<.3&&(c.fillStyle=`rgba(255,255,255,${(.3-j)*2.5})`,He(c,-p/2,-p/2,p,p,8),c.fill()),
        c.restore()
      }else if(c.fillStyle="rgba(255,255,255,0.05)",He(c,fe,J,p,p,8),c.fill(),c.strokeStyle="rgba(255,255,255,0.12)",c.lineWidth=1,c.stroke(),ie===m.revealed){
        const te=B1[ce.def.rarity]*(m.body?.8:1),
        j=Math.min(1,i.t/te),
        ee=fe+p/2,
        le=J+p/2-4*l,
        Z=p*.24;
        c.strokeStyle="rgba(255,255,255,0.15)",
        c.lineWidth=4,
        c.beginPath(),
        c.arc(ee,le,Z,0,ne),
        c.stroke(),
        c.strokeStyle="#ffd23f",
        c.beginPath(),
        c.arc(ee,le,Z,-Math.PI/2,-Math.PI/2+j*ne),
        c.stroke(),
        c.save(),
        c.translate(ee,le),
        c.rotate(a.realT*5),
        c.fillStyle="rgba(255,255,255,0.6)",
        c.fillRect(Z*.35,-1,Z*.4,2),
        c.restore(),
        this.txt("搜索中",ee,J+p-12*l,10*l,"rgba(255,255,255,0.6)","center",600)
      }else this.txt("?",fe+p/2,J+p/2,22*l,"rgba(255,255,255,0.25)","center",800,at)
    }
    s||this.txt("[E] 关闭 · 离开自动关闭",f/2,B+T+12*l,11*l,"rgba(255,255,255,0.45)","center",600)
  }
  drawCrosshair(a,l){
    const s=this.ctx,
    i=a.player;
    if(i.dead)return;
    const c=i.weapons[i.cur],
    f=l.mouseX,
    d=l.mouseY,
    m=c?c.def.spread*(Math.hypot(i.vx,i.vy)>60?1.3:1)+i.bloom:.05,
    b=Math.max(5,Math.min(70,Math.tan(m)*a.aimDist*a.cam.zoom))+3;
    s.lineCap="butt";
    for(const[p,y]of[["rgba(0,0,0,0.7)",4],["#ffffff",2]])s.strokeStyle=p,
    s.lineWidth=y,
    s.beginPath(),
    s.moveTo(f-b-8,d),
    s.lineTo(f-b,d),
    s.moveTo(f+b,d),
    s.lineTo(f+b+8,d),
    s.moveTo(f,d-b-8),
    s.lineTo(f,d-b),
    s.moveTo(f,d+b),
    s.lineTo(f,d+b+8),
    s.stroke();
    if(s.fillStyle="#fff",s.fillRect(f-1,d-1,2,2),a.hitmark.t>0){
      const p=a.hitmark.kill;
      s.strokeStyle=p?"#ff4a3a":"#ffffff",
      s.globalAlpha=Math.min(1,a.hitmark.t*7),
      s.lineWidth=p?3:2;
      const y=6,
      g=p?14:11;
      s.beginPath(),
      s.moveTo(f-y,d-y),
      s.lineTo(f-g,d-g),
      s.moveTo(f+y,d-y),
      s.lineTo(f+g,d-g),
      s.moveTo(f-y,d+y),
      s.lineTo(f-g,d+g),
      s.moveTo(f+y,d+y),
      s.lineTo(f+g,d+g),
      s.stroke(),
      s.globalAlpha=1
    }
    c&&c.reloadT>0?(s.strokeStyle="#ffd23f",s.lineWidth=3,s.beginPath(),s.arc(f,d,b+14,-Math.PI/2,-Math.PI/2+(1-c.reloadT/c.def.reload)*ne),s.stroke()):c&&c.ammo===0&&this.txt("R 换弹",f,d+b+22,12,"#ff6a5a","center",800)
  }
  drawTouch(a,l,s){
    const i=this.ctx,
    c=l.layout,
    f=a.player,
    d=a.realT,
    m=c.stickR,
    b=(g,v,S,T)=>{
      if(g.id>=0){
        i.fillStyle="rgba(255,255,255,0.08)",
        i.beginPath(),
        i.arc(g.ox,g.oy,m,0,ne),
        i.fill(),
        i.strokeStyle="rgba(255,255,255,0.3)",
        i.lineWidth=2,
        i.stroke();
        let H=g.x-g.ox,
        B=g.y-g.oy;
        const Q=Math.hypot(H,B);
        Q>m&&(H*=m/Q,B*=m/Q),
        i.fillStyle=S?"rgba(255,140,60,0.75)":"rgba(255,255,255,0.45)",
        i.beginPath(),
        i.arc(g.ox+H,g.oy+B,m*.42,0,ne),
        i.fill()
      }else i.strokeStyle="rgba(255,255,255,0.16)",
      i.lineWidth=2,
      i.setLineDash([6,6]),
      i.beginPath(),
      i.arc(v.x,v.y,m,0,ne),
      i.stroke(),
      i.setLineDash([]),
      this.txt(T,v.x,v.y,12*s,"rgba(255,255,255,0.3)","center",700)
    };
    b(l.moveS,c.moveHint,!1,"移动"),
    b(l.aimS,c.aimHint,l.firing(),"瞄准射击");
    const p=f.weapons[f.cur];
    for(const g of c.btns){
      const v=l.held.has(g.id);
      let S=!1,
      T="",
      H=-1,
      B=g.label;
      if(g.id==="grenade"&&(T=`${f.throwables[f.selectedThrowable]}`,S=f.throwables[f.selectedThrowable]<=0,B=qt[f.selectedThrowable].icon),g.id==="throwableNext"&&(S=St.reduce((se,ie)=>se+f.throwables[ie],0)<=1),g.id==="heal"&&(T=`${f.bandages+f.medkits}`,S=f.bandages+f.medkits<=0,f.healT>0&&(H=1-f.healT/f.healDur)),g.id==="roll"&&f.rollCd>0&&(H=1-f.rollCd/.72),g.id==="reload"&&p&&p.reloadT>0&&(H=1-p.reloadT/p.def.reload),!!l.buttonAvailable(g.id)){
        if(g.id==="swap"){
          const Q=f.weapons[f.cur===0?1:0];
          B=Q?Q.def.short:"—",
          S=!Q
        }
        i.globalAlpha=S?.4:1,
        i.fillStyle=v?"rgba(255,210,63,0.4)":"rgba(16,18,24,0.55)",
        i.beginPath(),
        i.arc(g.x,g.y,g.r,0,ne),
        i.fill(),
        i.strokeStyle=v||g.id==="heal"&&f.hp<f.maxHp?"#ffd23f":"rgba(255,255,255,0.32)",
        i.lineWidth=2,
        i.stroke(),
        H>=0&&(i.strokeStyle="#ffd23f",i.lineWidth=3,i.beginPath(),i.arc(g.x,g.y,g.r-3,-Math.PI/2,-Math.PI/2+H*ne),i.stroke()),
        this.txt(B,g.x,g.y+1,(g.id==="swap"?10:12)*s,"#f2efe6","center",800),
        T&&(i.fillStyle="#ffd23f",i.beginPath(),i.arc(g.x+g.r*.72,g.y-g.r*.72,8*s,0,ne),i.fill(),this.txt(T,g.x+g.r*.72,g.y-g.r*.72+1,10*s,"#2a1d00","center",800,at)),
        i.globalAlpha=1
      }
    }
    if(l.interactVisible&&a.nearC){
      const g=c.interact,
      v=1+Math.sin(d*6)*.05;
      i.fillStyle=l.held.has("interact")?"rgba(255,230,120,0.95)":"rgba(255,210,63,0.88)",
      i.beginPath(),
      i.arc(g.x,g.y,g.r*v,0,ne),
      i.fill(),
      i.strokeStyle="rgba(255,255,255,0.7)",
      i.lineWidth=2,
      i.stroke(),
      this.txt("搜索",g.x,g.y+1,15*s,"#2a1d00","center",900),
      this.txt(a.nearC.name,g.x,g.y-g.r-10*s,11*s,"#ffe9a0","center",700)
    }
    const y=c.pause;
    i.fillStyle="rgba(16,18,24,0.6)",
    i.beginPath(),
    i.arc(y.x,y.y,y.r,0,ne),
    i.fill(),
    i.strokeStyle="rgba(255,255,255,0.3)",
    i.lineWidth=1.5,
    i.stroke(),
    i.fillStyle="#f2efe6",
    i.fillRect(y.x-5*s,y.y-6*s,3.5*s,12*s),
    i.fillRect(y.x+1.5*s,y.y-6*s,3.5*s,12*s)
  }
  bind(a){
    this._g=a
  }
}

// === 优化版追加导出（供小游戏入口使用）===
export { Ay as Game, Gy as Renderer, zy as Input, Go as CHARACTERS, fa as LOADOUTS, Yn as ENEMIES, jc as RAID_MAPS, Xl as getRaidMap, Bo as LOOT, ty as LOOT_BY_RARITY, _e as RARITY_COLORS, Ee as fmtMoney, Po as fmtTime };
