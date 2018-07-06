import { action, observable } from 'mobx';

class RootStore {

  @observable authed: boolean = true;

  @action setAuthed = (authed: boolean) => {
    this.authed = authed;
  }

}

const rootStore = new RootStore();

export default rootStore;
