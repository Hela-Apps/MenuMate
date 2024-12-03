import { px } from 'framer-motion';
import React from 'react';
import Select from 'react-select';

const SimpleDropdown = ({ data, onChange }) => {
  const options = data.map((item) => ({ value: item.id, label: item.name }));

  return (
    <Select
      defaultValue={options[-1]} // Select the first option by default
      options={options}
      onChange={onChange}
    />
    
  );
};

export default SimpleDropdown;
