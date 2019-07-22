import React from 'react';

const Image = () => (
  <img
    src="https://images.unsplash.com/photo-1462834444171-02eff1c2a426?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=100"
    alt="beautiful mountains"
    style={{
      maxWidth: '97%',
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  />
);

export default Image;
