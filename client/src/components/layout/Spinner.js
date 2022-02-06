import React from "react";
import   spinner from '../../img/spiner.gif'
 
const Spinner = () => {
  return (
    <div>
      <img src={spinner} style={{width:'40px',margin:'auto', display:'block' }} alt="loading..." />
    </div>
  );
};

export default Spinner;
