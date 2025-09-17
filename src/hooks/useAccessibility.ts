import { useState, useEffect } from 'react';
import { AccessibilityManager } from '../utils/accessibility';

export const useAccessibility = () => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const manager = AccessibilityManager.getInstance();

  useEffect(() => {
    manager.initialize();
    setFontSize(manager.getFontSize());
    setHighContrast(manager.isHighContrast());
  }, [manager]);

  const increaseFontSize = () => {
    const newSize = fontSize + 2;
    manager.setFontSize(newSize);
    setFontSize(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = fontSize - 2;
    manager.setFontSize(newSize);
    setFontSize(newSize);
  };

  const resetFontSize = () => {
    manager.setFontSize(16);
    setFontSize(16);
  };

  const toggleHighContrast = () => {
    manager.toggleHighContrast();
    setHighContrast(manager.isHighContrast());
  };

  return {
    fontSize,
    highContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    announceToScreenReader: manager.announceToScreenReader,
  };
};