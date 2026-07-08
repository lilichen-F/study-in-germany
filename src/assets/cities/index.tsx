import type { FC } from 'react';
import Berlin from './Berlin';
import Frankfurt from './Frankfurt';
import Munich from './Munich';
import Duesseldorf from './Duesseldorf';
import Fallback from './Fallback';

const REGISTRY: Record<string, FC<{ className?: string }>> = {
  berlin: Berlin,
  frankfurt: Frankfurt,
  munich: Munich,
  duesseldorf: Duesseldorf,
};

export function CityIllustration({ cityKey, className }: { cityKey?: string; className?: string }) {
  const C = (cityKey && REGISTRY[cityKey]) || Fallback;
  return <C className={className} />;
}

export const KNOWN_CITY_KEYS = Object.keys(REGISTRY);
