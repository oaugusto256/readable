import React from 'react';
import { BarLoader } from 'react-spinners';

const Loading = (props) => {
  return props.isTrue
    ? <div className="loading-container">
        <BarLoader />
      </div>
    : null;
}

export default Loading;