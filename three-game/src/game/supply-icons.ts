const art = {
  bandages: new URL('../assets/supply-bandage.webp', import.meta.url).href,
  medkits: new URL('../assets/supply-medkit.webp', import.meta.url).href,
  grenade: new URL('../assets/supply-grenade.webp', import.meta.url).href,
  smoke: new URL('../assets/supply-smoke.webp', import.meta.url).href,
  flash: new URL('../assets/supply-flash.webp', import.meta.url).href,
  fire: new URL('../assets/supply-fire.webp', import.meta.url).href,
};

const legacyIcons: Record<string, keyof typeof art> = {
  '🩹': 'bandages', '💉': 'medkits', '💣': 'grenade', '🌫️': 'smoke', '✨': 'flash', '🔥': 'fire',
};

export function supplyIcon(id?: string): string | undefined {
  return id ? art[(legacyIcons[id] ?? id) as keyof typeof art] : undefined;
}
