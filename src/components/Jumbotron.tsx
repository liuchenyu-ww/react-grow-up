/**
 * JumbotronComponent
 * Created by vdfor at 2018/05/29
 */

import { Button } from 'antd';
import * as React from 'react';

interface IProps {
  title: React.ReactNode;
  description: React.ReactNode;
  buttonTitle?: string;
  onButtonClick?: () => void;
  style?: React.CSSProperties;
}

const JumbotronComponent: React.SFC<IProps> = (props) => {

  const { style, title, description, buttonTitle, onButtonClick } = props;

  const styles = style || {};

  return (
    <div style={styles}>
      <div style={{ padding: '0 60px' }}>
        <h1>{title}</h1>
        <p>{description}</p>
        <Button type="primary" size="large" onClick={onButtonClick}>{buttonTitle || 'Learn more'}</Button>
      </div>
    </div>
  )
}

export default JumbotronComponent;
