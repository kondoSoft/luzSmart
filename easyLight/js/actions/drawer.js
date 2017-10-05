
import type { Action } from './types';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const OPEN_SWIPER = 'OPEN_SWIPER'
export const CLOSE_SWIPER = 'CLOSE_SWIPER'
export function openDrawer():Action {
  return {
    type: OPEN_DRAWER,
  };
}
export function closeDrawer():Action {
  return {
    type: CLOSE_DRAWER,
  };
}
export function openSwiper ():Action {
    return {
        type: OPEN_SWIPER,
        payload: false
    }
}
export function closeSwiper ():Action {
    return {
        type: CLOSE_SWIPER,
        payload: true
    }
}