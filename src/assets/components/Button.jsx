
import React from 'react';

const Button = ({ value, onClick, id }) => {
  return (
    <button id={id} className="button" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
