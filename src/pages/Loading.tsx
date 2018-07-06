import * as React from 'react';

const LoadingComponent = (props: { [key: string]: string | any }) => {
  if (props.error) {
    return <h1>Error!</h1>;
  } else if (props.timedOut) {
    return <h1>Taking a long time...</h1>;
  } else if (props.pastDelay) {
    return <h1>Loading...</h1>;
  } else {
    return null;
  }
};

export default LoadingComponent;
