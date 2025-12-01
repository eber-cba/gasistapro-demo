import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './IncrementButton.css';

const IncrementButton = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  disabled = false,
  size = 'medium' // small, medium, large
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (inputValue === '') {
      onChange(0);
      return;
    }

    const numValue = parseInt(inputValue, 10);
    
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(numValue, max));
      onChange(clampedValue);
    }
  };

  const sizeClass = `increment-button-${size}`;

  return (
    <div className={`increment-button-container ${sizeClass}`}>
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="increment-btn decrement"
        aria-label="Decrementar"
      >
        <FaMinus />
      </motion.button>

      <input
        type="number"
        value={value === 0 ? '' : value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="increment-input"
        placeholder="0"
      />

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="increment-btn increment"
        aria-label="Incrementar"
      >
        <FaPlus />
      </motion.button>
    </div>
  );
};

export default IncrementButton;
