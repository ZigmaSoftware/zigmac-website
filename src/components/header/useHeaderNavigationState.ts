import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems, type NavItem } from "./navItems";

export const useHeaderNavigationState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();
  const dropdownRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const normalizePath = useCallback((path: string) => path.split("#")[0].toLowerCase(), []);

  const isActive = useCallback(
    (path: string) => normalizePath(location.pathname) === normalizePath(path),
    [location.pathname, normalizePath]
  );

  const isNavItemActive = useCallback(
    (item: NavItem) => isActive(item.path) || item.dropdown?.some((sub) => isActive(sub.path)) || false,
    [isActive]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateIndicatorToItem = useCallback((name: string) => {
    const itemEl = itemRefs.current[name];
    const navEl = navRef.current;

    if (!itemEl || !navEl) return;

    const itemRect = itemEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, []);

  const resetIndicatorToActive = useCallback(() => {
    const activeItem = navItems.find((item) => isNavItemActive(item));

    if (activeItem) {
      updateIndicatorToItem(activeItem.name);
      return;
    }

    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  }, [isNavItemActive, updateIndicatorToItem]);

  useEffect(() => {
    resetIndicatorToActive();
  }, [resetIndicatorToActive]);

  useEffect(() => {
    const handleResize = () => resetIndicatorToActive();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resetIndicatorToActive]);

  const activeMegaMenuItem = navItems.find(
    (item) => item.name === activeDropdown && item.megaMenu && item.dropdown
  );

  const megaMenuCols = activeMegaMenuItem?.name === "Products" ? 3 : activeMegaMenuItem?.dropdown?.length ?? 1;
  const megaMenuWidth = activeMegaMenuItem?.name === "Products"
    ? "min(84vw, 840px)"
    : megaMenuCols === 1
      ? "min(35vw, 340px)"
      : `min(${megaMenuCols * 26}vw, ${megaMenuCols * 270}px)`;

  return {
    activeDropdown,
    activeMegaMenuItem,
    dropdownRef,
    indicatorStyle,
    isMenuOpen,
    isNavItemActive,
    megaMenuCols,
    megaMenuWidth,
    mobileDropdown,
    navItems,
    navRef,
    resetIndicatorToActive,
    setActiveDropdown,
    setIsMenuOpen,
    setMobileDropdown,
    updateIndicatorToItem,
    itemRefs,
  };
};
