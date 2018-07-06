import { action, observable } from 'mobx';

class Store {
  @observable public title = '404';

  @action public changeTitle = () => {
    this.title = 'Not Found Page';
  }
}

export default new Store();
