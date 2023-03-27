import React, { useState } from 'react'

interface SwitchProps {
    onToggle: (checked: boolean) => void;
    checked: boolean;
  }

const Switcher: React.FC<SwitchProps> = ({
    onToggle, checked
}) => {

    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onToggle(newChecked);
      };
  
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider" />
    </label>
  )
}

export default Switcher