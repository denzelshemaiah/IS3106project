import React from 'react';
import homepage from '../../icons/homepage.png';


function Homepage() {
  return (
    <>
      <div className="bg-image" style={{
        backgroundImage: `url(${homepage})`,
        backgroundSize: 'cover',
        height: '80vh',
        width: '100%',
        display: 'block'
      }}>
      </div>
      <h1>test</h1>
    </>
  )
};
export default Homepage;