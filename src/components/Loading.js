import React from 'react';
import Logo from '../images/loading.png.gif';
import './Loading.css';

const Loading = (() => {
  
  return (
    <div className="imglogo">
      <img src={Logo} width="80" height="80" />
    </div>
  )
});

export default Loading;