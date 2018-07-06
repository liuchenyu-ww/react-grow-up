import { HomeAction } from './action';
import { HomeState } from './state';

export const states = {
  home: new HomeState()
};

export const actions = {
  home: new HomeAction(states)
};
