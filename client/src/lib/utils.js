import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const formatter = new Intl.NumberFormat('pt-BR');

export function formatNumber(value) {
  return formatter.format(value ?? 0);
}
