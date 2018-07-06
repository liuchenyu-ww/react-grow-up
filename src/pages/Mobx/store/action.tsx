import { action } from 'mobx';
import { HomeState } from './state';

export class HomeAction {
  private home: HomeState;

  constructor({ home }: any) {
    this.home = home;
  }

  @action public changeTitle = () => {
    this.home.title = 'Hello, world!';
  }
}
