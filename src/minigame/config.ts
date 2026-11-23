/** Replace the two placeholder IDs with rewarded-video ad units created in MP backend. */
export const AD_UNITS = {
  revive: 'adunit-REPLACE_WITH_REVIVE_ID',
  coins: 'adunit-REPLACE_WITH_COIN_ID',
} as const;

export const COIN_AD_REWARD = 20000;
export const COIN_AD_DAILY_LIMIT = 5;
export const REVIVE_HP_RATIO = 0.6;
export const REVIVE_ARMOR_RATIO = 0.3;

export function isAdConfigured(id: string) {
  return !!id && !id.includes('REPLACE_WITH');
}
