import { useSyncExternalStore } from 'react';

export type Locale = 'zh' | 'en';

const STORAGE_KEY = 'duckops3d-locale';
const DEFAULT_LOCALE: Locale = import.meta.env.MODE === 'english' ? 'en' : 'zh';

const ENTRIES: [string, string][] = [
  ['隐私政策', 'Privacy Policy'],
  ['首领击倒', 'Boss down'], ['载具摧毁', 'Vehicle destroyed'], ['连杀 ×', 'Kill streak ×'], ['战斗得分', 'Combat score'],
  ['载具试验场', 'Vehicle Proving Ground'], ['进入载具试验场', 'Enter Vehicle Demo'],
  ['装甲车、飞行与炮台操控试玩', 'Drive armor, fly aircraft, and crew guns'],
  ['不限时 · 不消耗装备', 'No time limit or gear cost'], ['自由练习 · 无装备消耗', 'Free practice · No gear cost'],
  ['自由练习 · 不限时', 'Free practice · No time limit'], ['自由练习', 'Free practice'],
  ['靠近载具按 E 进入 · 靶区会反击', 'Press E to enter a vehicle · Targets return fire'], ['WASD 移动 · 靠近载具按 E', 'WASD move · E to enter nearby'],
  ['载具耐久', 'Vehicle HP'], ['驾驶员生命 ', 'Pilot HP '], ['车体 ', 'Hull '],
  ['载具被击毁 · 驾驶员损失一半最大生命', 'Vehicle destroyed · Driver loses half of max HP'],
  ['飞机坠毁', 'Aircraft destroyed'], ['驾驶员阵亡', 'Driver killed'], ['可重新进入试验场练习', 'Restart to practice again'],
  ['WASD 转向 · 空格起降 · G 投弹', 'WASD steer · Space fly/land · G bombs'],
  ['WASD 驾驶 · 鼠标瞄准 · 左键开火', 'WASD drive · Mouse aim · Click fire'],
  ['鼠标瞄准 · 左键开火 · E 离开', 'Mouse aim · Click fire · E exit'],
  ['主战坦克', 'Battle tank'], ['履带两栖装甲车', 'Amphibious APC'], ['八轮装甲车', 'Wheeled APC'],
  ['战斗机', 'Fighter'], ['螺旋桨运输机', 'Prop transport'], ['固定式榴弹炮', 'Howitzer'], ['双管高射炮', 'Twin AA gun'],
  ['调试模式', 'Debug Mode'], ['调试模式已解锁全部正式战区', 'Debug mode has unlocked all raid zones'],
  ['调试模式已开启', 'Debug mode enabled'], ['全部正式战区可以进入。调试状态保存在本机。', 'All raid zones are unlocked. Debug mode is saved on this device.'],
  ['关闭调试模式', 'Turn Off Debug Mode'], ['输入调试密码', 'Enter debug password'],
  ['密码不正确，请重试。', 'Incorrect password. Try again.'], ['进入调试模式', 'Enable Debug Mode'],
  ['苍龙重型坦克', 'Azure Dragon Heavy Tank'], ['牵引式榴弹炮', 'Towed Howitzer'], ['击败烈焰王牌后解锁战斗机', 'Defeat Flame Ace to unlock the fighter'],
  ['驾驶苍龙重型坦克 · 敌方装甲正从远处合围', 'Drive the Azure Dragon. Enemy armor is closing from a distance.'],
  ['摧毁全部高射炮后开放撤离', 'Destroy all AA guns to open extraction'], ['剩余高射炮', 'AA guns remaining'],
  ['高射炮', 'AA gun'], ['敌方 · ', 'Enemy · '],
  ['防空火力已清除 · 撤离点开放', 'Air defenses are down. Extraction is open.'], ['防空火力已清除', 'Air defenses are down'],
  ['敌方高射炮已击毁', 'Enemy AA gun destroyed'],
  ['前往地图上标出的撤离点', 'Head to an extraction point marked on the map'], ['敌方坦克增援', 'Enemy tank reinforcements'],
  ['僚机投弹！', 'Wingman bombing run!'], ['西侧停机坪', 'West Apron'], ['降落后可离开', 'Land before exiting'],
  ['起飞或离开', 'Take off or exit'], ['[空格] 降落 · [G] 投弹', '[Space] Land · [G] Drop bomb'],
  ['[空格] 起飞 · [E] 离开载具', '[Space] Take off · [E] Exit vehicle'],
  ['靶标命中 ', 'Hits '], [' · 高度 ', ' · Altitude '], ['投弹', 'Drop bomb'], ['起飞', 'Take off'], ['降落', 'Land'],
  ['请先降落再离开飞机', 'Land before exiting the aircraft'], ['请飞到空地上方再降落', 'Find clear ground before landing'],
  ['四将军试炼、双王城堡与封印御花园', 'Four generals, the royal duo, and the sealed garden'],
  ['击败六名首领后开放王家宝库与御花园', 'Defeat all six bosses to open the royal vaults and garden'],
  ['地狱 · 六首领', 'Hell · Six bosses'], ['四将军 → 孵巢鸭后与鸭王', 'Four generals → Broodqueen and Duck King'],
  ['向北挑战四将军 · 城堡内迎战鸭后与鸭王', 'Head north through four generals · Face the Broodqueen and King in the castle'],
  ['宝库、御花园和撤离点将在双首领击败后开放', 'Defeat both royal bosses to open the vaults, garden, and exits'],
  ['击败另一位首领才会解除王家封印', 'Defeat the other royal boss to break the seal'],
  ['闸门已开放 · 下一站：', 'Gate open · Next: '],
  ['烈焰机库', 'Flame Hangar'], ['雷达指挥厅', 'Radar Command Hall'], ['中央旗庭', 'Central Flag Court'],
  ['西侧塌墙', 'West Wall Breach'], ['东侧塌墙', 'East Wall Breach'],
  ['王家宝库、御花园和撤离点已开放', 'The royal vaults, garden, and exits are open'],
  ['王家封印已解除', 'Royal seal broken'], ['潮汐船坞', 'Tidal Dock'], ['熔炉大厅', 'Furnace Hall'],
  ['寒晶议事厅', 'Frostcrystal Hall'], ['铁壁军械厅', 'Ironwall Armory'], ['南侧集结营地', 'Southern Staging Camp'],
  ['御花园北门', 'Royal Garden North Gate'], ['宝库东廊', 'East Vault Passage'],
  ['王家西宝库', 'West Royal Vault'], ['王家东宝库', 'East Royal Vault'], ['御花园', 'Royal Garden'],
  // Core UI and raid language
  ['鸭鸭鸭行动 3D', 'Duck Duck Extraction 3D'], ['搜 · 打 · 撤', 'Loot · Fight · Extract'],
  ['搜刮物资，活着撤离', 'Loot gear and make it out alive'], ['行动开始 · 搜刮物资，活着撤离', 'Raid started · Loot gear and make it out alive'],
  ['行动', 'Raid'], ['战区', 'Zone'], ['地图标记 ·', 'Map markers ·'], ['选择战区', 'Select Zone'], ['当前战区', 'Current Zone'],
  ['撤离点', 'Extraction Point'], ['撤离', 'Extract'], ['正式撤离', 'successful extractions'], ['撤离成功', 'Extraction successful'],
  ['撤离成功！', 'Extraction successful!'], ['成功带回', 'Successfully extracted'], ['未能撤离', 'Failed to extract'], ['行动失败 · 阵亡', 'Raid failed · Killed'], ['行动失败 · 失踪', 'Raid failed · MIA'],
  ['阵亡', 'Killed'], ['失踪', 'MIA'], ['击杀', 'Kills'], ['双杀', 'Double kill'], ['三杀', 'Triple kill'], ['四杀', 'Quad kill'], ['五杀', 'Penta kill'], ['暴走', 'Rampage'],
  ['存活', 'Survived'], ['失踪', 'MIA'], ['撤离成功', 'Extracted'], ['剩余时间', 'Time left'], ['背包价值', 'Loot value'], ['带出物资', 'Loot extracted'], ['击杀奖励', 'Kill reward'], ['损失物资', 'Loot lost'], ['本局得分', 'Raid score'], ['最高分', 'Best score'],
  ['仓库', 'Stash'], ['仓库余额', 'Stash balance'], ['仓库配装', 'Stash loadout'], ['仓库配装 · 无装备费', 'Stash loadout · No gear cost'], ['仓库配装 ·', 'Stash loadout ·'], ['仓库还是空的。撤离时带回枪械和护甲，或在商店购买。', 'Your stash is empty. Extract weapons and armor, or buy them in the shop.'],
  ['出击/撤离', 'Raids / extracts'], ['选择角色', 'Choose a character'], ['选择出击装备', 'Choose a loadout'], ['选择已拥有的枪或护甲，或在「药品与投掷物」里配置携带量。', 'Select a weapon or armor you own, or set carried quantities under Medical & Throwables.'],
  ['开始行动', 'Start Raid'], ['新手行动', 'Training Raid'], ['新手行动完成', 'Training complete'], ['新手行动结束', 'Training ended'], ['重玩新手行动', 'Replay Training'], ['直接开始正式行动', 'Start a full raid'], ['开始正式行动', 'Start a full raid'], ['再次部署', 'Deploy Again'], ['重新部署', 'Redeploy'], ['重开训练', 'Restart Training'], ['再练一次', 'Train Again'], ['返回大厅', 'Return to Lobby'], ['继续行动', 'Resume Raid'], ['行动暂停', 'Raid Paused'], ['放弃行动 · 返回大厅', 'Abandon Raid · Return to Lobby'],
  ['免费', 'Free'], ['免费部署', 'Free deployment'], ['免费训练 · 搜箱、射击、撤离', 'Free training · Loot, fight, extract'], ['新手行动免费，可以随时重开', 'Training is free. Restart any time.'],
  ['搜刮物资，挑战各战区的首领，在倒计时结束前', 'Loot gear, challenge each zone’s boss, and'], ['活着撤离', 'extract before time runs out'], ['。带回的物资会存入仓库。', '. Extracted gear goes to your stash.'],
  ['搜刮物资，挑战各战区的首领，在倒计时结束前活着撤离。带回的物资会存入仓库。', 'Loot gear, challenge each zone’s boss, and extract before time runs out. Extracted gear goes to your stash.'],
  ['规则', 'Rules'], ['操作与规则', 'Controls & Rules'], ['键鼠操作', 'Keyboard & Mouse'], ['触屏操作', 'Touch Controls'], ['移动', 'Move'], ['鼠标', 'Mouse'], ['瞄准射击', 'Aim & Fire'], ['瞄准 · 左键射击', 'Aim · Left-click to fire'], ['空格', 'Space'], ['右键', 'Right-click'], ['翻滚（无敌闪避）', 'Roll (invulnerable dodge)'], ['翻滚', 'Roll'], ['换弹', 'Reload'], ['治疗', 'Heal'], ['投掷', 'Throw'], ['切雷', 'Switch throwable'], ['切枪', 'Switch weapon'], ['背包', 'Backpack'], ['搜索', 'Search'], ['暂停 · 静音', 'Pause · Mute'], ['切换声音', 'Toggle sound'], ['自动开火', 'Auto-fire'],
  ['搜索容器 / 尸体', 'Search container / body'], ['切换武器', 'Switch weapon'], ['切换语言', 'Switch language'],
  ['靠近容器点「搜索」 · 翻滚可闪避子弹', 'Approach a container and tap “Search” · Roll to dodge bullets'], ['左半屏拖动 移动 · 右半屏拖动 瞄准并自动开火', 'Drag the left half to move · Drag the right half to aim and auto-fire'], ['左半屏拖动移动；右半屏拖动瞄准并', 'Drag the left half to move; drag the right half to aim and'], ['（带吸附、预判和子弹微调）；右下按钮翻滚 / 换弹 / 投掷 / 切雷 / 背包 / 治疗 / 切枪；靠近容器点击「搜索」。', '(with aim assist and leading); use the lower-right buttons to roll, reload, throw, switch throwables, open the backpack, heal, or switch weapons. Approach a container and tap “Search”.'],
  ['WASD 移动 · 鼠标 瞄准/射击 · 空格 翻滚闪避', 'WASD move · Mouse aim/fire · Space dodge-roll'], ['E 搜索 · R 换弹 · G 投掷 · T 切雷 · H 治疗 · Q 切枪 · Esc 暂停', 'E search · R reload · G throw · T switch throwable · H heal · Q switch weapon · Esc pause'],
  ['搜刮物资放入背包（默认 20 格，可在仓库强化扩容）。捡到更好的枪械/护甲会立即自动装备；点「背包」可查看物资，点带绿点的枪/甲可直接换装，点其他物品则丢弃，也能一键丢弃最低价值物品。', 'Loot goes into your backpack (20 slots by default; upgrade capacity in the stash). Better weapons and armor equip automatically. Open the backpack to inspect loot, tap a green-marked weapon or armor to equip it, or tap another item to drop it. You can also drop the lowest-value item.'],
  ['进入', 'Enter'], ['绿色撤离点', 'green extraction zone'], ['停留 6 秒即可撤离。带出的枪械、护甲入库，其余物资折现。', 'Stay for 6 seconds to extract. Weapons and armor go to your stash; other loot converts to coins.'], ['阵亡或 6 分钟超时：背包物资与出击装备', 'On death or after 6 minutes: backpack loot and raid gear are'], ['全部丢失', 'lost'], ['鹅老大镇守军事基地，击败它可获得顶级物资。', 'The Goose Boss guards the military base. Defeat it for top-tier loot.'],
  ['暂无记录', 'No records yet'], ['完成一次撤离来登上排行榜！', 'Complete an extraction to enter the leaderboard!'], ['本地排行榜', 'Local Leaderboard'], ['排行榜', 'Leaderboard'], ['🏆 本地排行榜', '🏆 Local Leaderboard'], ['🏆 排行榜', '🏆 Leaderboard'], ['🎮 操作与规则', '🎮 Controls & Rules'], ['杀 ·', 'Kills ·'], [' 名', ''], ['排行榜第', 'Leaderboard rank'], ['★ 新纪录！', '★ New record!'], ['背包空空如也', 'Backpack is empty'], ['件枪械或护甲已入库 · 其余物资折现 ¥', ' weapons/armor added to stash · other loot converted to '], ['仓库增加 ¥', ' added to stash: '],
  ['地图标记 ·', 'Map markers ·'], ['绿色为候选撤离点', 'Green marks possible extraction points'], ['橙色为首领驻地', 'Orange marks boss locations'], [' 次解锁', ' extractions to unlock'], ['当前战区', 'Current Zone'], ['关闭', 'Close'],
  ['撤离成功', 'Extraction successful'], ['成功带回训练物资。首通奖励已领取。', 'Training loot extracted. First-clear reward claimed.'], ['训练时间结束，可以免费再试一次。', 'Training time is up. Try again for free.'], ['可以免费再试一次。', 'You can try again for free.'], ['（跑刀）', '(Knife Run)'], ['（跑刀）', '(Knife Run)'], ['· 存活', '· Survived'], ['· 击杀', '· Kills'], ['· 装备「', '· Gear: “'], ['已带回', 'Extracted'], ['已丢失', 'Lost'], ['丢失物资', 'Loot lost'], ['背包物资与出击装备', 'backpack loot and raid gear'], ['背包价值', 'Loot value'], ['带出物资', 'Loot extracted'], ['击杀奖励', 'Kill reward'], ['放弃或重新部署将损失本局背包物资与出击装备', 'Abandoning or redeploying loses this raid’s backpack loot and gear'],
  ['确认重开？', 'Restart this raid?'], ['重新部署会放弃本局，并扣除下一局的装备费（如有）。确定重开？', 'Restarting abandons this raid and charges the next loadout fee, if any. Restart?'], ['返回大厅会放弃本局物资和出击装备。确定放弃？', 'Returning to the lobby abandons this raid’s loot and gear. Abandon?'],
  ['新手行动  ·', 'Training Raid ·'], ['E 搜索', 'E Search'], ['R 换弹', 'R Reload'], ['Esc 暂停', 'Esc Pause'],
  ['移速', 'Move speed'], ['% · 甲', '% · Armor'], ['仓库 ·', 'Stash ·'], [' 件', ' items'], ['物资', 'Loot'], ['装备费 ¥', 'Loadout cost: Coins '], ['装备费', 'Loadout cost'], ['仓库配装 · 无装备费', 'Stash loadout · No gear cost'], ['当前战区', 'Current Zone'], ['正式行动', 'Full Raid'],
  // Characters, maps, enemies, weapons, loot and upgrades
  ['小黄', 'Sunny'], ['均衡', 'Balanced'], ['铁头', 'Ironhead'], ['重甲', 'Heavy Armor'], ['快羽', 'Swiftwing'], ['侦察', 'Scout'],
  ['鸭鸭岛', 'Duckling Isle'], ['农场与军事基地', 'Farm and Military Base'], ['通用补给、军械和保险箱', 'General supplies, weapons and safes'], ['入门', 'Beginner'],
  ['盐雾货港', 'Saltmist Harbor'], ['水道、装卸场与集装箱', 'Waterways, cargo yards, and containers'], ['码头补给、武器箱和船长航海日志', 'Dock supplies, weapon crates, and the Captain’s Log'], ['赤炉工厂', 'Redforge Works'], ['铸造线、炉前广场与控制室', 'Foundry line, furnace yard, and control room'], ['控制室机箱、保险箱和封存炉芯', 'Control-room computer cases, safes, and the Sealed Core'], ['困难', 'Hard'], ['腐叶孵化场', 'Rotleaf Hatchery'], ['沼泽育雏棚、孵化控制室与巢穴', 'Swamp brood sheds, hatchery control room, and nest'], ['巢穴补给、冰风 MP9 与鸭后金蛋', 'Nest supplies, Icewind MP9, and the Broodqueen’s Golden Egg'], ['精英 · 持续召怪', 'Elite · Summons reinforcements'], ['霜锋哨站', 'Frostedge Outpost'], ['冰封机库、雷达站与冻土广场', 'Frozen hangars, radar station, and permafrost yard'], ['军械库、传说枪械与双首领战利品', 'Armories, legendary weapons, and double-boss loot'], ['噩梦 · 双首领', 'Nightmare · Double Boss'], ['鸭王陵寝', 'Duck King Mausoleum'], ['王陵回廊、双宝库与王座大厅', 'Royal tomb corridors, twin vaults, and throne hall'], ['双宝库至臻物资、RPG 与鸭王御座', 'Mythic loot from both vaults, an RPG, and the Duck King’s Throne'], ['地狱 · 四招轮换', 'Hell · Four rotating attacks'],
  ['湖畔小屋', 'Lakeside Cabin'], ['船屋', 'Boathouse'], ['红色谷仓', 'Red Barn'], ['农舍', 'Farmhouse'], ['便利店', 'Convenience Store'], ['指挥部', 'Command HQ'], ['民居A', 'Residence A'], ['民居B', 'Residence B'], ['民居C', 'Residence C'], ['民居D', 'Residence D'], ['一号仓库', 'Warehouse 1'], ['二号仓库', 'Warehouse 2'], ['车站', 'Station'], ['工具棚', 'Tool Shed'], ['入口训练场', 'Entry Training Ground'], ['军械室', 'Armory'], ['训练出口', 'Training Exit'],
  ['北岸补给站', 'North Shore Supply Point'], ['南侧货棚', 'South Cargo Shed'], ['港区办公室', 'Harbor Office'], ['船长仓储', 'Captain’s Storehouse'], ['码头仓库', 'Dock Warehouse'], ['南部堆场', 'South Yard'], ['中央装卸场', 'Central Loading Yard'], ['主码头引道', 'Main Dock Approach'], ['登船码头', 'Boarding Pier'], ['南侧堆货区', 'South Cargo Stack'], ['北岸登船梯', 'North Shore Boarding Stairs'], ['南门货运道', 'South Gate Freight Road'], ['货港入口', 'Harbor Entrance'], ['装卸通道', 'Loading Corridor'], ['外港闸口', 'Outer Harbor Gate'],
  ['分拣车间', 'Sorting Workshop'], ['炉前控制室', 'Furnace Control Room'], ['主控室', 'Main Control Room'], ['铸模仓库', 'Mold Warehouse'], ['备件库', 'Parts Depot'], ['机车库', 'Locomotive Garage'], ['炉渣堆场', 'Slag Yard'], ['炉前广场', 'Furnace Plaza'], ['北检修道', 'North Service Road'], ['南炉渣区', 'South Slag Field'], ['冷却塔侧门', 'Cooling Tower Side Gate'], ['铁路装运口', 'Rail Loading Gate'], ['工厂外门', 'Factory Entrance'], ['控制室与装运区', 'Control Room and Loading Area'],
  ['育雏大棚', 'Brood Greenhouse'], ['孵化控制室', 'Hatchery Control Room'], ['饲料仓', 'Feed Store'], ['观察哨', 'Watch Post'], ['孵化工棚', 'Hatchery Shed'], ['东侧巢室', 'East Nest Chamber'], ['东北孵卵室', 'Northeast Incubation Room'], ['南巢育成房', 'South Brood Room'], ['孵化中庭', 'Hatchery Atrium'], ['鸭后孵化巢', 'Broodqueen’s Nest'], ['西侧腐叶道', 'West Rotleaf Path'], ['北岸吊桥', 'North Shore Suspension Bridge'], ['东侧排水门', 'East Drain Gate'], ['北缘育雏棚', 'North Brood Shed'], ['西侧育雏棚', 'West Brood Shed'], ['中央孵化中庭', 'Central Hatchery Atrium'], ['鸭后蛋巢', 'Broodqueen’s Egg Nest'], ['南侧腐叶区', 'South Rotleaf Field'], ['南巢育成区', 'South Brood Area'],
  ['冰封机库', 'Frozen Hangar'], ['雷达站', 'Radar Station'], ['北兵营', 'North Barracks'], ['补给仓', 'Supply Depot'], ['指挥所', 'Command Post'], ['南机修库', 'South Repair Garage'], ['冰塔观测所', 'Ice Tower Observatory'], ['雪下军械库', 'Buried Armory'], ['冰封中庭东场', 'East Frozen Courtyard'], ['冰封中庭南岸', 'South Frozen Courtyard'], ['霜羽元帅雪丘', 'Frostfeather Marshal’s Snowbank'], ['铁壁统领擂台东场', 'Ironwall Arena East'], ['铁壁统领擂台南场', 'Ironwall Arena South'], ['西侧冻土路', 'West Permafrost Road'], ['东侧广场', 'East Plaza'], ['北岭撤离台', 'North Ridge Extraction'], ['南岭运输口', 'South Ridge Freight Gate'], ['北缘雷达雪坡', 'North Radar Slope'], ['西侧机库与元帅雪丘', 'West Hangar and Marshal’s Snowbank'], ['冻土中央走廊', 'Central Permafrost Corridor'], ['铁壁擂台与东哨所', 'Ironwall Arena and East Watch'], ['南侧运输坡', 'South Freight Slope'], ['冰塔观测哨', 'Ice Tower Watch'],
  ['王座大厅', 'Throne Hall'], ['西宝库', 'West Vault'], ['东宝库', 'East Vault'], ['禁卫营', 'Royal Guard Barracks'], ['鸭王私人宝库', 'Duck King’s Private Vault'], ['回廊哨', 'Corridor Watch'], ['南库', 'South Vault'], ['西侧碑亭', 'West Stele Pavilion'], ['东侧祭殿', 'East Shrine'], ['碑林回廊', 'Stele Gallery'], ['王陵广场', 'Royal Tomb Plaza'], ['王家秘库前厅', 'Royal Treasury Foyer'], ['神道', 'Sacred Way'], ['西门神道', 'West Gate Sacred Way'], ['东陵货运口', 'East Tomb Freight Gate'], ['北侧神道与殿廊', 'North Sacred Way and Hallway'], ['西侧禁卫与西宝库', 'West Guards and West Vault'], ['东侧王家秘库', 'East Royal Treasury'], ['南侧外陵与运输道', 'South Outer Tomb and Freight Road'], ['西侧碑亭与碑林', 'West Pavilion and Stele Gallery'],
  ['湖畔码头', 'Lakeside Pier'], ['直升机坪', 'Helipad'], ['下水道井口', 'Sewer Hatch'], ['火车站台', 'Train Platform'], ['湖畔', 'Lakeside'], ['农场', 'Farm'], ['加油站', 'Gas Station'], ['村庄', 'Village'], ['军事基地', 'Military Base'], ['仓库区', 'Warehouse District'], ['铁路货场', 'Rail Yard'],
  ['普通', 'Standard'], ['优秀', 'Uncommon'], ['精良', 'Rare'], ['史诗', 'Epic'], ['传说', 'Legendary'], ['至臻', 'Mythic'],
  ['面包屑', 'Bread Crumbs'], ['旧报纸', 'Old Newspaper'], ['玉米棒', 'Corn Cob'], ['螺丝钉', 'Screw'], ['卷纸', 'Toilet Paper'], ['旧袜子', 'Old Sock'], ['午餐肉罐头', 'Canned Luncheon Meat'], ['电池', 'Battery'], ['手电筒', 'Flashlight'], ['扳手', 'Wrench'], ['速溶咖啡', 'Instant Coffee'], ['强力磁铁', 'Strong Magnet'], ['军用对讲机', 'Military Radio'], ['机械硬盘', 'Hard Drive'], ['机械表', 'Mechanical Watch'], ['望远镜', 'Binoculars'], ['游戏手柄', 'Game Controller'], ['化学试剂', 'Chemical Reagent'], ['军用平板', 'Military Tablet'], ['侦察无人机', 'Recon Drone'], ['古董相机', 'Antique Camera'], ['加密芯片', 'Encrypted Chip'], ['显微镜', 'Microscope'], ['古董花瓶', 'Antique Vase'], ['一袋金币', 'Bag of Coins'], ['军用笔记本', 'Military Laptop'], ['鸭王王冠', 'Duck King’s Crown'], ['神秘石像', 'Mysterious Idol'], ['鸭之心', 'Duck Heart'], ['池塘之泪', 'Tears of the Pond'], ['量子鸭脑', 'Quantum Duck Brain'], ['黄金奖杯', 'Golden Trophy'], ['火箭模型', 'Rocket Model'], ['鸭力汽水', 'Duck Power Soda'], ['柑橘汽水', 'Citrus Soda'], ['瓶装水', 'Bottled Water'], ['盐味薯片', 'Salted Chips'], ['罐装咖啡', 'Canned Coffee'], ['备用电池组', 'Spare Battery Pack'],
  ['绷带', 'Bandage'], ['急救针', 'Medkit'], ['破片手雷', 'Fragmentation Grenade'], ['烟雾弹', 'Smoke Grenade'], ['闪光弹', 'Flashbang'], ['燃烧瓶', 'Molotov'], ['范围爆发伤害，可引爆油桶', 'Area blast damage; can detonate fuel barrels'], ['烟雾持续 9 秒，阻断敌人视线', 'Smoke lasts 9 seconds and blocks enemy vision'], ['范围内敌人目眩 2.6 秒，停止射击', 'Blinds enemies in range for 2.6 seconds'], ['地面燃烧 6 秒，持续灼烧范围内目标', 'Burns the ground for 6 seconds, damaging targets in range'],
  ['一级护甲', 'Level 1 Armor'], ['二级护甲', 'Level 2 Armor'], ['三级护甲', 'Level 3 Armor'], ['四级护甲', 'Level 4 Armor'], ['五级护甲', 'Level 5 Armor'], ['六级护甲', 'Level 6 Armor'],
  ['M9 鸭牌手枪', 'M9 Duck Pistol'], ['MP5 冲锋枪', 'MP5 SMG'], ['M870 霰弹枪', 'M870 Shotgun'], ['M4A1 突击步枪', 'M4A1 Assault Rifle'], ['AWM 狙击步枪', 'AWM Sniper Rifle'], ['M249 轻机枪', 'M249 Light Machine Gun'], ['MP9 冲锋枪', 'MP9 SMG'], ['AK47 突击步枪', 'AK-47 Assault Rifle'], ['SVD 精确射手步枪', 'SVD Marksman Rifle'], ['渐变之影 M4A1', 'Gradient Shadow M4A1'], ['M4·影', 'M4 Phantom'], ['龙纹 AWM', 'Dragon AWM'], ['AWM·龙', 'AWM Dragon'], ['M134 火神炮', 'M134 Minigun'], ['RPG 火箭筒', 'RPG Launcher'], ['冰风 MP9', 'Icewind MP9'], ['冰MP9', 'Ice MP9'], ['玄铁破壁者', 'Blacksteel Breaker'], ['破壁者', 'The Breaker'], ['AA12 雷霆霰弹', 'AA12 Thunder Shotgun'], ['HK416 疾风突击', 'HK416 Assault'], ['巴雷特 M82 重狙', 'Barrett M82 Sniper'], ['AA12', 'AA12'], ['HK416', 'HK416'], ['M82', 'M82'],
  ['其他', 'Other'], ['发射器', 'Launchers'], ['霰弹枪', 'Shotguns'], ['手枪', 'Pistols'], ['精确射手', 'Marksman Rifles'], ['狙击枪', 'Sniper Rifles'], ['冲锋枪', 'SMGs'], ['机枪', 'Machine Guns'], ['突击步枪', 'Assault Rifles'], ['通用枪械', 'General Firearms'], ['武器属性', 'Weapon Stats'], ['武器', 'Weapon'], ['护甲', 'Armor'], ['伤害', 'Damage'], ['射速', 'Fire Rate'], ['弹匣', 'Magazine'], [' 发', ' rounds'], ['散布', 'Spread'], ['装填', 'Reload'], [' 秒', ' sec'], ['穿透', 'Penetration'], ['范围爆发伤害，可引爆油桶', 'Area blast damage; can detonate fuel barrels'], [' · 半径 ', ' · Radius '], ['爆炸', 'Explosive'], ['% 护甲', '% armor'], ['无视', 'Ignores '], ['命中冰缓', 'Slows on hit'], [' 弹丸 · 收束改造专属', ' pellets · Shotgun choke mod'],
  ['暴走鸡', 'Raging Chick'], ['鸭匪', 'Duck Raider'], ['精英鸭匪', 'Elite Duck Raider'], ['护甲鸭', 'Armored Duck'], ['哨戒鸭', 'Sentry Duck'], ['盾卫鸭', 'Shield Duck'], ['投弹母鸡', 'Bomber Hen'], ['鹅老大', 'Goose Boss'], ['震地波无视掩体并击退，翻滚可躲；它会呼叫附近同伴围攻', 'The shockwave ignores cover and knocks you back; dodge-roll to evade. The boss calls nearby allies to swarm you.'], ['震地更频繁、范围更大，呼叫的鸭匪更多', 'More frequent, wider shockwaves and more raiders summoned'], ['鹅老大羽冠', 'Goose Boss Crest'],
  ['铁钩船长', 'Captain Ironhook'], ['看到红色冲撞路线后横向闪避，引它撞上货柜', 'Dodge sideways when the red charge path appears and lure the captain into a container'], ['冲撞预警缩短，冲得更远', 'Shorter charge warning and longer charge distance'], ['船长航海日志', 'Captain’s Log'], ['炉心监工', 'Furnace Foreman'], ['橙圈内会受到热浪冲击，退圈或躲到实墙后', 'The orange zone is hit by a heat wave. Leave it or hide behind a solid wall.'], ['热浪范围扩大，间隔缩短', 'Wider heat waves with shorter cooldowns'], ['封存炉芯', 'Sealed Furnace Core'],
  ['孵巢鸭后', 'Broodqueen'], ['孵巢潮', 'Brood Tide'], ['孵巢爆发', 'Nestburst'], ['鸭后孵巢翻涌！', 'The Broodqueen’s nest erupts!'], ['它会持续孵出小鸡与投弹母鸡，清掉巢边杂兵再输出首领', 'She keeps hatching chicks and bomber hens. Clear the minions around the nest, then attack the boss.'], ['孵化速度翻倍，每波数量增加，还会带出精英鸭匪', 'Hatching doubles in speed, each wave grows, and elite raiders join the fight'], ['鸭后金蛋', 'Broodqueen’s Golden Egg'],
  ['霜羽元帅', 'Frostfeather Marshal'], ['极夜寒潮', 'Polar Night'], ['霜环爆发', 'Frost Ring'], ['霜羽释放寒潮！', 'The Marshal unleashes a cold wave!'], ['冰蓝圈内会被寒潮击退，且它的子弹会减速；霜羽元帅与铁壁统领同场', 'The ice-blue zone knocks you back, and the Marshal’s bullets slow you. The Frostfeather Marshal and Ironwall Commander fight together.'], ['寒潮范围扩大、预警缩短', 'Wider cold waves with shorter warnings'], ['霜羽元帅徽记', 'Frostfeather Insignia'], ['铁壁统领', 'Ironwall Commander'], ['钢铁破阵', 'Iron Breaker'], ['铁壁冲锋', 'Ironwall Charge'], ['黑红重甲正面免疫大半伤害，绕后或将它的护甲打穿；击杀必掉传说武器「玄铁破壁者」', 'Its black-and-red armor blocks most frontal damage. Flank it or pierce the armor. It always drops the legendary Blacksteel Breaker.'], ['冲撞更频繁、距离更远', 'More frequent and longer charges'], ['铁壁统领勋章', 'Ironwall Medal'],
  ['鸭王', 'Duck King'], ['王权轮招', 'Royal Rotation'], ['王座震地', 'Throne Quake'], ['禁卫召集', 'Royal Guard Call'], ['御驾冲锋', 'Royal Charge'], ['王权冲击', 'Royal Impact'], ['鸭王轮换震地、召集成员、冲撞与王权冲击四种招式，注意识别预警形状', 'The Duck King rotates between a quake, a guard call, a charge, and a royal impact. Watch each warning shape.'], ['四连招式全面提速，召唤更多护卫', 'All four attacks speed up and summon more guards'], ['鸭王御座', 'Duck King’s Throne'],
  ['木箱', 'Wooden Crate'], ['工具箱', 'Toolbox'], ['医疗箱', 'Medical Crate'], ['武器箱', 'Weapon Crate'], ['电脑机箱', 'Computer Case'], ['台式电脑', 'Desktop Computer'], ['笔记本电脑', 'Laptop'], ['保险箱', 'Safe'], ['旅行包', 'Travel Bag'], ['贩卖机', 'Vending Machine'], ['宝箱', 'Treasure Chest'], ['金币堆', 'Coin Pile'],
  ['跑刀', 'Knife Run'], ['零成本', 'No Cost'], ['M9 手枪 · 1 绷带', 'M9 Pistol · 1 Bandage'], ['突击', 'Assault'], ['MP5 · 二级甲 · 绷带×2 · 急救针 · 手雷', 'MP5 · Level 2 Armor · 2 Bandages · Medkit · Grenade'], ['重装', 'Heavy'], ['火力压制', 'Suppressive Fire'], ['M4A1 · 四级甲 · 绷带×3 · 急救针×2 · 手雷×2', 'M4A1 · Level 4 Armor · 3 Bandages · 2 Medkits · 2 Grenades'],
  ['扩容背包', 'Expanded Backpack'], ['每级 +4 格', '+4 slots per level'], ['20 格', '20 slots'], ['翻滚训练', 'Roll Training'], ['每级翻滚冷却 −0.07 秒', 'Roll cooldown −0.07 sec per level'], ['0.72 秒', '0.72 sec'], ['轻装疾行', 'Lightfoot'], ['每级移速 +6%', 'Move speed +6% per level'], [' 格', ' slots'],
  ['轻量扳机', 'Light Trigger'], ['扩容弹鼓', 'Drum Magazine'], ['自动化枪机', 'Full-Auto Conversion'], ['战术准镜', 'Tactical Optic'], ['竞赛枪管', 'Match Barrel'], ['快拉枪机', 'Quick Bolt'], ['弹链箱', 'Belt Box'], ['重型弹头', 'Heavy Warhead'], ['集束弹头', 'Cluster Warhead'], ['稳定枪机', 'Stable Bolt'], ['高装药', 'Hot Load'], ['穿甲弹', 'Armor-Piercing Ammo'], ['扩容弹匣', 'Extended Magazine'], ['轻量复进', 'Light Recoil Spring'], ['收束器', 'Choke'], ['快速弹夹', 'Fast Reload'], ['高爆战斗部', 'High-Explosive Warhead'], ['射速 +30%（手枪专属）', 'Fire rate +30% (pistols only)'], ['弹匣容量 +100%（冲锋枪/霰弹/机枪专属）', 'Magazine +100% (SMG/shotgun/LMG)'], ['射速 ×2.2 · 单发伤害 −25% · 散布 +15%（霰弹枪转全自动）', 'Fire rate ×2.2 · Damage −25% · Spread +15% (full-auto shotgun)'], ['散布 −40% · 射程 +15%（突击/狙击专属）', 'Spread −40% · Range +15% (rifles/snipers)'], ['伤害 +18% · 射程 +8%（狙击/精确射手专属）', 'Damage +18% · Range +8% (snipers/DMR)'], ['射速 +35% · 装填 −20%（狙击枪专属）', 'Fire rate +35% · Reload −20% (snipers)'], ['弹匣容量 +75%（机枪专属）', 'Magazine +75% (LMG)'], ['直击伤害 +60% · 爆炸伤害 +15%（火箭筒专属）', 'Direct hit +60% · Blast +15% (RPG)'], ['爆炸范围 +45% · 爆炸伤害 −15% · 直击 −15%（火箭筒清群弹头）', 'Blast radius +45% · Blast −15% · Direct −15% (RPG crowd round)'], ['后坐 −35% · 枪口上跳 −20%（不加散布）', 'Recoil −35% · Muzzle rise −20% (no spread penalty)'], ['伤害 +25% · 爆炸伤害 +25%', 'Damage +25% · Blast damage +25%'], ['穿透 +2', 'Penetration +2'], ['弹匣容量 +50%', 'Magazine capacity +50%'], ['射速 +20%', 'Fire rate +20%'], ['散布 −45%（仅霰弹枪）', 'Spread −45% (shotguns only)'], ['装填时间 −40%', 'Reload time −40%'], ['爆炸伤害 +40% · 范围 +15%（仅火箭筒）', 'Blast damage +40% · Radius +15% (RPG only)'], ['射速+30%', 'Fire rate +30%'], ['弹匣+100%', 'Magazine +100%'], ['全自动', 'Full auto'], ['准镜', 'Optic'], ['伤害+18%', 'Damage +18%'], ['射速+35%', 'Fire rate +35%'], ['弹匣+75%', 'Magazine +75%'], ['直击+60%', 'Direct +60%'], ['范围+45%', 'Radius +45%'], ['后坐−35%', 'Recoil −35%'], ['伤害+25%', 'Damage +25%'], ['穿透+2', 'Penetration +2'], ['弹匣+50%', 'Magazine +50%'], ['射速+20%', 'Fire rate +20%'], ['散布−45%', 'Spread −45%'], ['装填−40%', 'Reload −40%'], ['爆炸+40%', 'Blast +40%'], ['自修复涂层', 'Self-Repair Coating'], ['强化框架', 'Reinforced Frame'], ['复合插板', 'Composite Plates'], ['破甲应急', 'Emergency Breaker'], ['脱战 4 秒后每秒恢复 5 点护甲', 'Restore 5 armor per second after 4 seconds out of combat'], ['护甲上限 +25%', 'Armor cap +25%'], ['护甲吸收比例 60% → 78%', 'Armor absorption 60% → 78%'], ['护甲打空时免疫伤害 1.2 秒（CD 10 秒）', 'Become invulnerable for 1.2 seconds when armor breaks (10 sec cooldown)'], ['自动回甲', 'Armor Regen'], ['上限+25%', 'Armor cap +25%'], ['吸收78%', '78% absorption'], ['破甲无敌', 'Break Shield'], ['绷带×', 'Bandage ×'], ['急救针×', 'Medkit ×'], ['自定义配装', 'Custom Loadout'], ['仅携带入库装备', 'Use stashed gear only'],
  ['全部', 'All'], ['伤害', 'Damage'], ['射速', 'Fire Rate'], ['弹匣', 'Magazine'], ['散布', 'Spread'], ['装填', 'Reload'], ['穿透', 'Penetration'], ['治疗 40 点生命', 'Restore 40 health'], ['治疗 90 点生命', 'Restore 90 health'], ['拥有的装备', 'Owned Gear'], ['药品与投掷物', 'Medical & Throwables'], ['购买装备', 'Buy Gear'], ['角色强化', 'Character Upgrades'], ['卸下', 'Unequip'], ['携带药品/投掷物 ×', 'Carry medical/throwables ×'], ['可用余额', 'Available Coins'], ['先在仓库买入并持有药品/投掷物，再勾选本次携带量；出击时从库存扣除，成功撤离后归还并加上路上搜到的补给。投掷物携带总数上限', 'Buy and hold medical supplies or throwables in your stash, then select how many to carry. They are deducted on deployment and returned after a successful extraction, along with any supplies found in the field. Throwable carry limit: '], ['，库存无上限。', '; stash capacity is unlimited.'], ['库存', 'In stock'], ['· 携带', '· Carrying'], ['· 单价 ¥', '· Unit price: Coins '], ['买入 ¥', 'Buy · Coins '], ['卖出 ¥', 'Sell · Coins '], ['减少携带', 'Reduce carried amount'], ['增加携带', 'Increase carried amount'], ['RPM · 弹匣 ', 'RPM · Magazine '], ['伤 ', 'DMG '], ['· 在库', '· In stash'], ['购买', 'Buy'], ['永久强化，对所有角色生效。等级越高，升级费用越贵。', 'Permanent upgrades apply to all characters. Higher levels cost more.'], ['当前', 'Current'], ['等级 ', 'Level '], ['已满级', 'Max level'], ['升级 ¥', 'Upgrade · Coins '], ['排序方式', 'Sort by'], ['按价值', 'Value'], ['按稀有度', 'Rarity'], ['按名称', 'Name'], ['· 护甲', '· Armor'], ['已配装 · 卸下', 'Equipped · Unequip'], ['配装', 'Equip'], ['已配装的物品无法卖出', 'Equipped items cannot be sold'], ['卖出一件', 'Sell one'], ['改造槽', 'Mod Slots'], ['护甲改装', 'Armor Mods'], ['已满 · 同类改造不可重复', 'Full · Duplicate mods are not allowed'], ['这个分类还没有装备，去商店买一件吧。', 'No gear in this category. Buy something in the shop.'], ['仓库还是空的。撤离时带回枪械和护甲，或在商店购买。', 'Your stash is empty. Extract weapons and armor, or buy them in the shop.'], ['武器改造按枪种开放：手枪可装轻量扳机，冲锋枪与机枪有扩容弹鼓/弹链箱，霰弹枪可改自动化枪机或收束器，突击步枪与狙击枪有战术准镜，狙击枪另有竞赛枪管与快拉枪机，火箭筒可在高爆、重型、集束三种弹头间选择；普通枪 2 槽、传说枪 3 槽。护甲 1–6 级可选，五/六级甲有 3 个改装槽（自动回甲、上限 +25%、吸收 78%、破甲 1.2 秒无敌）。已配装物品不可卖出；药品与投掷物在仓库买入后按携带量带入行动。', 'Weapon mods depend on weapon type: pistols take a light trigger, SMGs and LMGs get drum/belt magazines, shotguns can convert to full-auto or take a choke, rifles and snipers get a tactical optic, snipers also take a match barrel or quick bolt, and RPGs choose between high-explosive, heavy, or cluster warheads. Standard guns have 2 slots; legendary guns have 3. Choose from Armor Levels 1–6; Level 5 and 6 armor have 3 mod slots (regen, +25% cap, 78% absorption, or 1.2 sec break shield). Equipped gear cannot be sold. Buy medical supplies and throwables in the stash, then carry what you need into a raid.'],
  ['货物价值', 'Loot value'], ['地图标记', 'Map markers'], ['正式撤离次数', 'successful extractions'], ['背包满', 'Backpack full'], ['搜索中', 'Searching'], ['搜索中…', 'Searching…'], ['已搜完', 'Searched'], ['空空如也', 'Empty'], ['关闭 · 离开自动关闭', 'Close · closes automatically when you leave'], ['[E] 关闭 · 离开自动关闭', '[E] Close · closes automatically when you leave'], ['[E] 搜索 ·', '[E] Search ·'], ['搜索 ·', 'Search ·'], ['护甲', 'Armor'], ['无护甲', 'No Armor'], ['换弹中…', 'Reloading…'], ['丢弃最低价值', 'Drop Lowest Value'], ['背包 · 点枪/甲装备 · 点其他丢弃', 'Backpack · Tap gun/armor to equip · Tap other items to drop'], ['鼠标', 'Mouse'], ['· 阶段', '· Phase'], ['冲撞', 'Charge'], ['震地', 'Quake'], ['冲击', 'Impact'], ['召唤', 'Summon'], ['新手行动', 'Training Raid'],
  ['击退挡路的小鸡（右半屏拖动开火）', 'Defeat the blocking chick (drag the right half to fire)'], ['向右走进军械室，点「搜索」拾取冲锋枪', 'Move right into the armory and tap “Search” to pick up the SMG'], ['击退军械室的 2 名鸭匪', 'Defeat the 2 raiders in the armory'], ['搜第二个补给箱 · 点背包可换上掉落的枪', 'Search the second supply crate · Open the backpack to equip the dropped gun'], ['前往绿色撤离点', 'Reach the green extraction point'], ['撤离点遭伏击！击退 2 名鸭匪', 'Ambush at the extraction point! Defeat 2 raiders'], ['留在撤离区内坚守 6 秒', 'Stay inside the extraction zone for 6 seconds'], ['击退挡路的小鸡（鼠标瞄准射击）', 'Defeat the blocking chick (aim and fire with the mouse)'], ['向右走进军械室，按 E 拾取冲锋枪', 'Move right into the armory and press E to pick up the SMG'], ['搜第二个补给箱 · 点背包装备掉落的枪', 'Search the second supply crate · Open the backpack to equip the dropped gun'], ['目标：拾取武器 → 击退鸭匪 → 搜刮 → 安全撤离', 'Goal: Pick up a weapon → Defeat raiders → Loot → Extract safely'],
  ['背包 · 丢弃最低价值', 'Backpack · Drop lowest value'], ['丢弃最低价值', 'Drop Lowest Value'], ['撤离点遭伏击！', 'Ambush at the extraction point!'], ['撤离点：', 'Extraction points: '], ['广告复活', 'Revive via ad'], ['重返战场 · 物资保留', 'Back to the fight · Keep your loot'], ['复活成功！立刻转移，敌人暂时被击退', 'Revived! Move now; nearby enemies are pushed back temporarily'], ['治疗被打断', 'Healing interrupted'], ['已丢弃', 'Dropped'], ['已装备', 'Equipped'], ['生命值已满', 'Health is full'], ['没有医疗物资', 'No medical supplies'], ['切换至', 'Switched to'], ['没有投掷物', 'No throwables'], ['投出', 'Threw'], ['鸡蛋！', 'Egg!'], ['背刺!', 'Backstab!'], ['格挡', 'Blocked'], ['破甲!', 'Armor broken!'], [' 出现了！双首领战', ' appeared! Double boss fight'], [' 出现了！', ' appeared!'], ['注意首领技能预警', 'Watch for boss attack warnings'], ['的遗体', ' remains'], ['击败', 'Defeated'], [' 名首领存活', ' bosses remain'], ['还有', 'Remaining: '], ['搜刮它的遗体获取顶级物资', 'Loot its remains for top-tier gear'], ['闪避', 'Dodge'], ['护甲已损坏！', 'Armor broken!'], ['护甲碎裂', 'Armor shattered'], ['应急护盾！', 'Emergency shield!'], ['破甲应急护盾启动 · 1.2 秒免疫', 'Emergency break shield active · 1.2 sec immunity'], ['背包物资全部丢失', 'All backpack loot lost'], ['带出物资 ¥', 'Loot extracted · Coins '], ['行动时间耗尽 · 失踪', 'Time expired · MIA'], ['背包已满 · 可以考虑撤离了', 'Backpack full · Consider extracting'], ['背包已满，丢弃', 'Backpack full, drop'], ['绷带 +1', 'Bandage +1'], ['急救针 +1', 'Medkit +1'], ['装备', 'Gear'], [' · 点背包可装备', ' · Open backpack to equip'], ['拾取', 'Picked up'], ['获得新武器：', 'New weapon: '], [' · 背包已满', ' · Backpack full'], ['物品：', 'Item: '], ['发现', 'Found'], ['★ 大红出货 ★', '★ High-tier loot! ★'], ['武器到手！', 'Weapon acquired!'], ['军械室附近出现鸭匪，开火击退它们', 'Raiders near the armory! Open fire and push them back'], ['补给到手', 'Supplies acquired'], ['前往绿色撤离点，注意最后的埋伏', 'Head to the green extraction point and watch for a final ambush'], ['挡路的小鸡还剩', 'Chicks remaining: '], ['通路打开', 'Path clear'], ['向右进入军械室，搜武器箱拿枪', 'Head right into the armory and search the weapon crate'], ['鸭匪还剩', 'Raiders remaining: '], ['鸭匪已清除', 'Raiders cleared'], ['它们掉了枪！点「背包」点带绿点的枪即可换装', 'They dropped a weapon! Open “Backpack” and tap the green-marked gun to equip it'], ['搜第二个补给箱，然后前往撤离点', 'Search the second supply crate, then head to extraction'], ['提示：点背包 → 点绿色的枪 → 换上鸭匪的武器', 'Tip: Open Backpack → Tap the green-marked gun → Equip the raider’s weapon'], ['埋伏击退！', 'Ambush repelled!'], ['留在撤离区内完成撤离', 'Stay inside the extraction zone to complete the extraction'], [' · 坚守 ', ' · Hold for '], ['⚠ 撤离点遭伏击！', '⚠ Ambush at extraction!'], ['两名鸭匪已从近处扑来，击退它们', 'Two raiders are closing in. Defeat them.'], ['⚠ 敌人正在逼近撤离点！', '⚠ Enemies are closing in on extraction!'], ['撤离中断！', 'Extraction interrupted!'], ['⚠ 侦测到敌方小队进入战区', '⚠ Enemy squad detected in the zone'], ['剩余 60 秒', '60 seconds remaining'], ['尽快前往撤离点！', 'Reach an extraction point quickly!'], ['晕眩!', 'Stunned!'], ['震地践踏！', 'Quake stomp!'], ['震地！附近鸭匪被唤醒', 'Quake! Nearby raiders are alerted'], ['炉心热浪！', 'Furnace heat wave!'], ['寒潮减速！', 'Cold wave slowed you!'], ['鸭后的巢穴已挤满杂兵', 'The Broodqueen’s nest is crowded with minions'], ['孵巢增援！', 'Nest reinforcements!'], ['召集护卫！', 'Guards summoned!'], ['召来 ', 'Summoned '], [' 名增援', ' reinforcements'], ['冰缓!', 'Chilled!'], ['冰弹减速！', 'Ice rounds slowed you!'], ['烟雾展开！', 'Smoke deployed!'], ['目眩!', 'Blinded!'], [' 个目标，目眩 2.6 秒', ' targets blinded for 2.6 sec'], ['闪光命中', 'Flash hit'], ['闪光弹未命中目标', 'Flashbang missed'], ['燃烧区域形成，靠近会被灼烧', 'Burning area created. Keep your distance.'],
  ['撤离中 · 保持在区域内', 'Extracting · Stay in the zone'], ['搜索中…', 'Searching…'], ['背包', 'Backpack'], ['搜索中', 'Searching'], ['[E] 搜索 ·', '[E] Search ·'], ['关闭', 'Close'], ['关闭 · 离开自动关闭', 'Close · closes automatically when you leave'],
  ['无网络请求', 'No network requests'], ['点击开始', 'Tap to start'], ['鸭鸭补给', 'Duck Supplies'],
  ['重新部署会放弃本局，并扣除下一局的装备费（如有）。确定重开？', 'Restarting abandons this raid and charges the next loadout fee, if any. Restart?'], ['返回大厅会放弃本局物资和出击装备。确定放弃？', 'Returning to the lobby abandons this raid’s loot and gear. Abandon?'],
  // App Store 海外版补齐：空军基地与双首领
  ['烈焰王牌', 'Flame Ace'], ['冰霜雷达官', 'Frost Radar Warden'], ['冰火空军基地', 'Fire & Ice Airbase'],
  ['低空扫射', 'Low strafe'], ['凝固汽油弹', 'Napalm'], ['加力冲刺', 'Afterburner Dash'],
  ['雷达锁定', 'Radar Lock'], ['冰墙封锁', 'Ice Wall'], ['冰霜地雷', 'Frost Mines'],
  ['熔岩焦土、冰霜雪原与中央跑道', 'Lava fields, frozen tundra, and a central runway'],
  ['机库军械、双传说保险箱与 RPG', 'Hangar arms, twin legendary safes, and an RPG'],
  ['噩梦 · 冰火双首领', 'Nightmare · Fire & Ice Double Boss'],
  ['熔岩焦土', 'Lava Scorched Ground'], ['冰霜雪原', 'Frost Tundra'], ['中央跑道', 'Central Runway'],
  ['它会呼叫僚机沿红色航线低空扫射，看到航线立刻横向离开；凝固汽油弹会留下一串燃烧带', 'It calls wingmen to strafe along red flight paths — dodge sideways as soon as you see them. Napalm leaves a trail of burning ground'],
  ['扫射变成两条交叉航线，燃烧带更长', 'Strafing becomes two crossing paths with longer burn trails'],
  ['雷达扫描线扫过你时会被锁定并遭到狙击，躲进掩体切断视线；它会竖起冰墙封路、在地上撒冰霜地雷', 'The radar sweep locks onto you and calls in sniper fire — break line of sight with cover. It raises ice walls to block paths and scatters frost mines'],
  ['雷达转速加快，冰墙更长，地雷更多', 'Radar spins faster, ice walls grow longer, and more mines appear'],
  ['僚机扫射！', 'Wingman strafe!'], ['被雷达锁定！', 'Radar lock!'], ['冰墙封锁！', 'Ice wall!'],
  ['战斗机', 'Fighter Jet'], ['扫射', 'Strafe'],
  ['焦土空袭', 'Scorched Earth Raid'], ['极地雷网', 'Polar Minefield'],
  ['塔台直升机坪', 'Tower Helipad'], ['西侧运输机', 'West Transport'], ['中央停车场', 'Central Parking'],
  ['王牌飞行徽章', 'Ace Pilot Badge'], ['极地雷达核心', 'Polar Radar Core'],
  ['正在载入行动', 'Loading the game'], ['仓库分区', 'Armory sections'], ['本次配装', 'Current Loadout'],
  ['未配装', 'Empty slot'], ['商店筛选', 'Shop filters'], ['装备筛选', 'Gear filters'],
  ['属性与改造', 'Stats & Mods'], ['已配装', 'Equipped'], ['前往商店', 'Go to Shop'], ['商店', 'Shop'],
  ['设置', 'Settings'], ['语言', 'Language'], ['声音开', 'Sound on'], ['声音关', 'Sound off'], ['静音', 'Mute'], ['返回', 'Back'],
  ['大厅功能', 'Lobby tools'], ['准备出击', 'Prepare to deploy'], ['出击准备', 'Deployment preparation'],
  ['选择装备', 'Choose equipment'], ['下一步：选择装备', 'Next: Equipment'], ['下一步：选择战区', 'Next: Map'],
  ['1 级包', 'Level 1 pack'], ['2 级包', 'Level 2 pack'], ['3 级包', 'Level 3 pack'],
  ['使用自定义配装', 'Use custom loadout'], ['已选自定义配装', 'Custom loadout selected'],
  ['进入新手行动', 'Start training'], ['可出击', 'Available'], ['无装备费', 'No gear fee'],
  ['配装分区', 'Loadout sections'], ['背包分区', 'Backpack sections'],
  ['这个分类还没有装备。', 'This category is empty.'],
  ['背包没有装备。撤离时带回装备，或在背包的商店购买。', 'Your backpack is empty. Extract with gear or visit the shop.'],
  ['强攻', 'Breach'], ['厚甲', 'Heavy Armor'], ['配装风格', 'Loadout Style'],
  ['优先武器与投掷物', 'Weapons and throwables first'], ['火力、护甲与补给均衡', 'Balanced firepower, armor and supplies'],
  ['优先护甲与治疗', 'Armor and healing first'], ['出击预算', 'Raid budget'],
  ['携带补给', 'Carried supplies'], ['战术标记', 'Tactical markers'], ['无护甲', 'No armor'],
  ['选择配装', 'Choose a loadout'], ['单发伤害', 'Damage per shot'],
  ['实际装备费', 'Actual gear cost'], ['去商店买一把武器', 'Buy a weapon in the shop'],
];

const EN = new Map(ENTRIES);
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const matchPattern = new RegExp([...EN.keys()].filter((s) => /[\u3400-\u9fff]/.test(s)).sort((a, b) => b.length - a.length).map(escapeRegExp).join('|'), 'g');
const listeners = new Set<() => void>();

function defaultLocale(): Locale { return DEFAULT_LOCALE; }
function readStoredLocale(): Locale | null {
  try { const value = localStorage.getItem(STORAGE_KEY); return value === 'en' || value === 'zh' ? value : null; }
  catch { return null; }
}

let locale: Locale = readStoredLocale() ?? defaultLocale();

export function getLocale(): Locale { return locale; }

export function translate(source: string): string {
  if (locale !== 'en' || !/[\u3400-\u9fff¥]/.test(source)) return source;
  let result = source.replace(matchPattern, (match) => EN.get(match) ?? match);
  result = result.replace(/¥\s*/g, 'Coins ');
  result = result.replace(/(\d+(?:\.\d+)?)万/g, (_match, amount: string) => (Number(amount) * 10000).toLocaleString('en-US'));
  return result;
}

export function subscribeLocale(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribeLocale, getLocale, getLocale);
}

export function setLocale(next: Locale) {
  if (locale === next) return;
  locale = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage may be unavailable */ }
  applyDocumentLocale();
  for (const listener of listeners) listener();
}

function applyDocumentLocale() {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
  document.documentElement.dir = 'ltr';
  document.title = locale === 'en' ? 'Duck Duck Extraction 3D' : '鸭鸭鸭行动 3D';
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = locale === 'en'
    ? 'A single-player, top-down extraction shooter. Loot, fight bosses, and extract before time runs out.'
    : '鸭鸭鸭行动 3D · 鸭子搜打撤：搜刮物资、击败鸭匪与鹅老大，活着撤离！';
}

type TextRecord = { source: string; rendered: string };
type AttributeRecord = Map<string, TextRecord>;

export function installBrowserLocalization() {
  if (typeof document === 'undefined') return;
  applyDocumentLocale();

  const nativeConfirm = window.confirm.bind(window);
  window.confirm = (message?: string) => nativeConfirm(translate(message ?? ''));

  const textRecords = new WeakMap<Text, TextRecord>();
  const attributeRecords = new WeakMap<Element, AttributeRecord>();
  const attrs = ['aria-label', 'title', 'placeholder', 'alt'];
  const translateTextNode = (node: Text) => {
    let record = textRecords.get(node);
    if (!record || node.data !== record.rendered) {
      record = { source: node.data, rendered: node.data };
      textRecords.set(node, record);
    }
    const next = translate(record.source);
    if (node.data !== next) node.data = next;
    record.rendered = next;
  };
  const translateAttributes = (element: Element) => {
    let records = attributeRecords.get(element);
    if (!records) { records = new Map(); attributeRecords.set(element, records); }
    for (const name of attrs) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name) ?? '';
      let record = records.get(name);
      if (!record || current !== record.rendered) { record = { source: current, rendered: current }; records.set(name, record); }
      const next = translate(record.source);
      if (current !== next) element.setAttribute(name, next);
      record.rendered = next;
    }
  };
  const localizeSubtree = (root: Node) => {
    if (root.nodeType === Node.TEXT_NODE) translateTextNode(root as Text);
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root as Element);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let child: Node | null;
    while ((child = walker.nextNode())) {
      if (child.nodeType === Node.TEXT_NODE) translateTextNode(child as Text);
      else translateAttributes(child as Element);
    }
  };
  localizeSubtree(document.body);

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'characterData' && record.target.nodeType === Node.TEXT_NODE) translateTextNode(record.target as Text);
      else if (record.type === 'attributes' && record.target.nodeType === Node.ELEMENT_NODE) translateAttributes(record.target as Element);
      else for (const node of record.addedNodes) localizeSubtree(node);
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrs });

  const refresh = () => localizeSubtree(document.body);
  listeners.add(refresh);
  installCanvasLocalization();
}

function installCanvasLocalization() {
  if (typeof CanvasRenderingContext2D === 'undefined') return;
  const prototype = CanvasRenderingContext2D.prototype as CanvasRenderingContext2D & { __duckI18n?: boolean };
  if (prototype.__duckI18n) return;
  prototype.__duckI18n = true;
  const fillText = prototype.fillText;
  const strokeText = prototype.strokeText;
  const measureText = prototype.measureText;
  prototype.fillText = function (text, ...args) { return fillText.call(this, translate(String(text)), ...args); };
  prototype.strokeText = function (text, ...args) { return strokeText.call(this, translate(String(text)), ...args); };
  prototype.measureText = function (text) { return measureText.call(this, translate(String(text))); };
}
