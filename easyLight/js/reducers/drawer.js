
import type { Action } from '../actions/types';
import { OPEN_DRAWER, CLOSE_DRAWER, CLOSE_SWIPER, OPEN_SWIPER } from '../actions/drawer';

export type State = {
    drawerState: string,
    drawerDisabled: boolean
}

const initialState = {
  drawerState: 'closed',
  drawerDisabled: true,
  closeSwiper: false,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: 'opened',
    };
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: 'closed',
    };
  }
  if (action.type === CLOSE_SWIPER) {
    return {
      ...state,
      closeSwiper: action.payload
    }
  }
  if (action.type === OPEN_SWIPER) {
    return {
      ...state,
      closeSwiper: action.payload
    }
  }
  return state;
}
