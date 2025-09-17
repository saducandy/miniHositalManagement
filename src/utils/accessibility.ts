export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private fontSize: number = 16;
  private highContrast: boolean = false;

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  setFontSize(size: number): void {
    this.fontSize = Math.max(12, Math.min(24, size));
    document.documentElement.style.fontSize = `${this.fontSize}px`;
    localStorage.setItem('hospital-font-size', this.fontSize.toString());
  }

  getFontSize(): number {
    return this.fontSize;
  }

  toggleHighContrast(): void {
    this.highContrast = !this.highContrast;
    if (this.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('hospital-high-contrast', this.highContrast.toString());
  }

  isHighContrast(): boolean {
    return this.highContrast;
  }

  initialize(): void {
    const savedFontSize = localStorage.getItem('hospital-font-size');
    const savedHighContrast = localStorage.getItem('hospital-high-contrast');

    if (savedFontSize) {
      this.setFontSize(parseInt(savedFontSize));
    }

    if (savedHighContrast === 'true') {
      this.toggleHighContrast();
    }
  }

  announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}