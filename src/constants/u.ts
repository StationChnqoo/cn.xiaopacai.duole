import { Dimensions } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';
import TTS from 'react-native-tts';
const { width } = Dimensions.get('window');

export const vibrate = () => {
  // Optional configuration
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  // Trigger haptic feedback
  trigger('impactLight', options);
};

/**
 *
 * @param length
 * @returns
 */
export const uuid = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < 11; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randIndex);
  }
  return result;
};

export const dip2px = (dip: number) => {
  return Math.round(dip * (width / 375));
};

export function fs(size: number) {
  if (width >= 430) return size + 2; // iPhone12 Plus/Pro Max
  if (width >= 390) return size + 1; // iPhone12/Pro
  return size; // SE
}

const cardMap: Record<string, string> = {
  '0': '十',
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九',
  'J': '勾',
  'Q': '圈',
  'K': '凯',
  'A': '尖',
  'Y': '鹰',
  'X': '小王',
  'W': '大王',
};

const actionMap: Record<string, string> = {
  '落': '拉',
};

export const speak = (text: string) => {
  let mapped: string;
  if (text.includes('.')) {
    const action = text.split('.')[1];
    mapped = actionMap[action] || action;
  } else if (cardMap[text]) {
    mapped = cardMap[text];
  } else {
    mapped = text;
  }
  TTS.speak(mapped);
};
