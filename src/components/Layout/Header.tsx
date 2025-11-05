import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Contrast, Plus, Minus, ChevronDown } from "lucide-react";
import { I18nContext } from "../../context/I18nContext";
import { useAccessibility } from "../../hooks/useAccessibility";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const location = useLocation();
  const {
    fontSize,
    highContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
  } = useAccessibility();
  const { language, toggleLanguage, t } = React.useContext(I18nContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const hoverTimeout = useRef<number | null>(null);

  const openMenu = (name: string) => {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setOpenDropdown(name);
  };

  const scheduleCloseMenu = () => {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = window.setTimeout(() => {
      setOpenDropdown(null);
      hoverTimeout.current = null;
    }, 150);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      children: [
        { name: "Our Story", href: "/about/story" },
        { name: "Vision & Mission", href: "/about/vision-mission" },
        { name: "Management Team", href: "/about/management" },
        { name: "Our Doctors", href: "/about/doctors" },
        { name: "Awards & Recognitions", href: "/about/awards" },
        { name: "Annual Activity Reports", href: "/about/reports" },
        { name: "BDSEC News", href: "/about/news" },
        { name: "Hospital Location", href: "/about/location" },
      ],
    },
    {
      name: "Our Services",
      children: [
        { name: "Eye Care center", href: "/services/eye-care" },
        { name: "Outreach", href: "/services/outreach" },
        { name: "Tele-Ophthalmology", href: "/services/tele-ophthalmology" },
        { name: "Education & Training", href: "/services/education" },
        { name: "Research", href: "/services/research" },
      ],
    },
    {
      name: "Resources",
      children: [
        { name: "Publications", href: "/resources/publications" },
        { name: "For Staffs: SOPS and Guidelines", href: "/resources/sops" },
      ],
    },
    {
      name: "For Patients",
      children: [
        { name: "About the eye", href: "/patients/about-eye" },
        { name: "Eye Diseases & Treatment", href: "/patients/diseases" },
        { name: "What to expect at BDSEC?", href: "/patients/what-to-expect" },
        { name: "Insurance", href: "/patients/insurance" },
        { name: "Give us your Feedback", href: "/contact#contact-form" },
      ],
    },
    {
      name: "Get Involved",
      children: [
        { name: "Donate", href: "/get-involved/donate" },
        {
          name: "Organize an outreach",
          href: "/get-involved/organize-outreach",
        },
      ],
    },
    { name: "Education & Training", href: "/services/education" },
    {
      name: "Notice",
      children: [{ name: "Vacancy", href: "/notice/vacancy" }],
    },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path?: string) => path && location.pathname === path;
  const hasActiveChild = (item: NavItem): boolean => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => hasActiveChild(child));
    }
    return false;
  };

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Accessibility Bar (hidden on scroll) */}
      {!isScrolled && (
        <div className="bg-gray-100 border-b hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-1 gap-2 sm:gap-3 flex-wrap">
              {/* Branding on top bar */}
              <Link
                to="/"
                className="flex items-center gap-2 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-brandDeep rounded min-w-0 flex-1"
              >
                <img
                  src="/logo.png"
                  alt="Bahir Dar Eye Care Center logo"
                  className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover flex-shrink-0"
                />
                <div className="leading-tight min-w-0">
                  <span className="block text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {t("brand.name")}
                  </span>
                  <span className="hidden sm:block text-xs text-gray-600">
                    {t("brand.tagline")}
                  </span>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 sm:space-x-2 ml-auto flex-wrap gap-y-2">
                <span className="text-xs text-gray-600">
                  {t("accessibility.fontSize")}
                </span>
                <button
                  onClick={decreaseFontSize}
                  className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brandDeep"
                  aria-label="Decrease font size"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs text-gray-600 min-w-[2rem] text-center">
                  {fontSize}px
                </span>
                <button
                  onClick={increaseFontSize}
                  className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brandDeep"
                  aria-label="Increase font size"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              {/* Language toggle */}
              <div className="hidden md:flex items-center ml-2">
                <button
                  onClick={toggleLanguage}
                  className="px-2 py-0.5 rounded text-xs border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brandDeep"
                  aria-label="Toggle language"
                >
                  {language === "en" ? "EN" : "አማ"}
                </button>
              </div>
              <button
                onClick={toggleHighContrast}
                className={`hidden md:flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors ${
                  highContrast
                    ? "bg-yellow-500 text-black"
                    : "text-gray-600 hover:text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-brandDeep`}
                aria-label="Toggle high contrast mode"
              >
                <Contrast className="h-3 w-3" />
                <span>{t("accessibility.contrast")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header (fixed, always visible). On desktop, offset below the accessibility bar until scrolled */}
      <div
        className={`fixed left-0 right-0 ${
          isScrolled ? "top-0" : "top-0 md:top-[48px]"
        } bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Mobile: branding on left; burger on right */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                to="/"
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brandDeep rounded"
              >
                <img
                  src="/logo.png"
                  alt="Bahir Dar Eye Care Center logo"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="leading-tight">
                  <span className="block text-base font-semibold text-gray-900">
                    Bahir Dar Eye Care Center
                  </span>
                  <span className="block text-xs text-gray-600">
                    Vision Excellence
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-0.5"
              role="navigation"
            >
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative flex items-center"
                  onMouseEnter={() => item.children && openMenu(item.name)}
                  onMouseLeave={scheduleCloseMenu}
                >
                  {item.children ? (
                    <>
                      <button
                        className={`px-2 py-2 text-xs font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandDeep flex items-center gap-0.5 ${
                          hasActiveChild(item)
                            ? "text-brandDeep bg-brandYellow/20"
                            : "text-gray-700 hover:text-brandDeep hover:bg-brandYellow/10"
                        }`}
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          )
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                          onMouseEnter={() => openMenu(item.name)}
                          onMouseLeave={scheduleCloseMenu}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href || "#"}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                isActive(child.href)
                                  ? "text-brandDeep bg-brandYellow/20 font-medium"
                                  : "text-gray-700 hover:text-brandDeep hover:bg-brandYellow/10"
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      className={`px-2 py-2 text-xs font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandDeep flex items-center ${
                        isActive(item.href)
                          ? "text-brandDeep bg-brandYellow/20"
                          : "text-gray-700 hover:text-brandDeep hover:bg-brandYellow/10"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/appointments"
                className="bg-brandYellow text-brandDeep px-6 py-2 rounded-full text-sm font-medium hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2 whitespace-nowrap"
              >
                {t("header.bookAppointment")}
              </Link>
              <Link
                to="/admin"
                className="text-brandDeep border border-brandDeep px-6 py-2 rounded-full text-sm font-medium hover:bg-brandGreen/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2"
              >
                {t("header.admin")}
              </Link>
            </div>

            {/* Mobile menu button on right */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-brandDeep focus:outline-none focus:ring-2 focus:ring-brandDeep rounded"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <nav className="py-4 space-y-1" role="navigation">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenMobileDropdown(
                              openMobileDropdown === item.name
                                ? null
                                : item.name
                            )
                          }
                          className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                            hasActiveChild(item)
                              ? "text-brandDeep bg-brandYellow/20"
                              : "text-gray-700 hover:text-brandDeep hover:bg-brandYellow/10"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openMobileDropdown === item.name
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {openMobileDropdown === item.name && (
                          <div className="pl-4 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href || "#"}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setOpenMobileDropdown(null);
                                }}
                                className={`block px-3 py-2 text-sm transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                                  isActive(child.href)
                                    ? "text-brandDeep bg-brandYellow/20 font-medium"
                                    : "text-gray-600 hover:text-brandDeep hover:bg-brandYellow/10"
                                }`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href || "#"}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 text-base font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                          isActive(item.href)
                            ? "text-brandDeep bg-brandYellow/20"
                            : "text-gray-700 hover:text-brandDeep hover:bg-brandYellow/10"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                {/* Accessibility controls on mobile */}
                <div className="px-3 pt-2 mt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Font Size</span>
                    <span className="text-sm text-gray-600">{fontSize}px</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decreaseFontSize}
                      className="flex-1 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brandDeep"
                      aria-label="Decrease font size"
                    >
                      <Minus className="inline h-4 w-4 mr-1" /> Smaller
                    </button>
                    <button
                      onClick={increaseFontSize}
                      className="flex-1 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brandDeep"
                      aria-label="Increase font size"
                    >
                      <Plus className="inline h-4 w-4 mr-1" /> Larger
                    </button>
                  </div>
                  <button
                    onClick={toggleHighContrast}
                    className={`mt-3 w-full py-2 rounded text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                      highContrast
                        ? "bg-yellow-500 text-black"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label="Toggle high contrast mode"
                  >
                    <Contrast className="inline h-4 w-4 mr-2" /> High Contrast
                  </button>
                </div>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/appointments"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-brandYellow text-brandDeep px-3 py-2 rounded text-base font-medium text-center hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-brandDeep border border-brandDeep px-3 py-2 rounded text-base font-medium text-center hover:bg-brandGreen/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep"
                  >
                    Admin Panel
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
