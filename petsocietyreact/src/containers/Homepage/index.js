import React from 'react';
import Services from '../Services'
import homepage from '../../icons/homepage.png';


function Homepage() {
  return (
    <>
      <div className="bg-image" style={{
        backgroundImage: `url(${homepage})`,
        backgroundSize: 'cover',
        height: '90vh',
        width: '100%',
        padding : '0',
        margin : '0',
        display: 'block'
      }}>
      </div>
      <Services></Services>

    </>
  )
};
export default Homepage;