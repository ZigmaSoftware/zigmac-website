import { useHeaderNavigationState } from "./useHeaderNavigationState";
import { useHeaderHeroVisibility } from "./useHeaderHeroVisibility";

export const useHeaderBehavior = () => {
  const navigation = useHeaderNavigationState();
  const heroVisibility = useHeaderHeroVisibility({
    activeDropdown: navigation.activeDropdown,
    isMenuOpen: navigation.isMenuOpen,
  });

  return {
    ...navigation,
    ...heroVisibility,
  };
};
