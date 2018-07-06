import * as React from 'react';
import JumbotronComponent from '../../components/Jumbotron';

class HomeComponent extends React.Component<{}, {}> {

  toCharon = () => {
    location.href = '/index-charon.html';
  }

  render() {
    return (
      <div>
        <JumbotronComponent
          title="charon is ready!"
          description="charon，冥卫一。采用dark主题、侧边栏布局，定位于中后台管理应用。"
          buttonTitle="了解更多"
          onButtonClick={this.toCharon}
        />
      </div>
    )
  }
}

export default HomeComponent;
