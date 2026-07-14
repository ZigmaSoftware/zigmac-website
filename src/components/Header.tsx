import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/icons/zigmac -bp.png";
import { useHeaderBehavior } from "@/components/header/useHeaderBehavior";

const Header = () => {
  const {
    activeDropdown,
    activeMegaMenuItem,
    dropdownRef,
    heroHideArmed,
    indicatorStyle,
    isHeroHeaderHidden,
    isMenuOpen,
    isNavItemActive,
    megaMenuCols,
    megaMenuWidth,
    mobileDropdown,
    navItems,
    navRef,
    resetIndicatorToActive,
    setActiveDropdown,
    setIsHeroHeaderVisible,
    setIsMenuOpen,
    setMobileDropdown,
    shouldAutoHideHeroHeader,
    updateIndicatorToItem,
    itemRefs,
  } = useHeaderBehavior();

  return (
    <>
      {isHeroHeaderHidden && (
        <div
          className="fixed inset-x-0 top-0 z-[79] hidden h-10 xl:block"
          onMouseEnter={() => setIsHeroHeaderVisible(true)}
        />
      )}

      <header
        className={cn(
          "top-0 inset-x-0 z-[80] border-b transition-[transform,background-color,border-color,box-shadow] duration-300",
          "fixed",
          isHeroHeaderHidden ? "-translate-y-full" : "translate-y-0",
          "bg-background/95 border-border backdrop-blur shadow-sm"
        )}
        onMouseLeave={() => {
          if (shouldAutoHideHeroHeader && heroHideArmed && !isMenuOpen && !activeDropdown) {
            setIsHeroHeaderVisible(false);
          }
        }}
      >
        <div className="container-main flex items-center justify-center">
          <div className="flex items-center justify-between w-full h-16 md:h-[72px]">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={logo}
                alt="Zigma Blue Planet"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>

            <nav
              className="relative hidden lg:flex items-center justify-center gap-3 xl:gap-4 2xl:gap-8 flex-wrap"
              ref={(el) => {
                dropdownRef.current = el;
                navRef.current = el;
              }}
              onMouseEnter={() => {
                if (shouldAutoHideHeroHeader && heroHideArmed) {
                  setIsHeroHeaderVisible(true);
                }
              }}
              onMouseLeave={() => {
                resetIndicatorToActive();
                setActiveDropdown(null);
                if (shouldAutoHideHeroHeader && heroHideArmed && !isMenuOpen) {
                  setIsHeroHeaderVisible(false);
                }
              }}
            >
              <div
                className="pointer-events-none absolute left-0 top-3/4 h-[3px] bg-emerald-600 transition-[left,width,opacity,background-color] duration-500"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
              />

              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={item.megaMenu ? "static" : "relative"}
                  ref={(el) => {
                    itemRefs.current[item.name] = el;
                  }}
                  onMouseEnter={() => updateIndicatorToItem(item.name)}
                >
                  {item.dropdown ? (
                    <button
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      className={`flex items-center gap-1 py-4 text-[13px] font-medium transition-colors whitespace-nowrap xl:text-sm ${
                        isNavItemActive(item) ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center py-4 text-[13px] font-medium transition-colors whitespace-nowrap xl:text-sm ${
                        isNavItemActive(item) ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.dropdown && !item.megaMenu && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-max min-w-[200px] bg-card border border-border rounded-md shadow-xl p-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2 text-sm hover:text-primary"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {activeMegaMenuItem?.dropdown && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 z-50 bg-white border border-border rounded-xl shadow-2xl p-4"
                  style={{ width: megaMenuWidth }}
                >
                  <p className="text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase mb-4 px-1">
                    {activeMegaMenuItem.name === "Services" ? "Management systems" : `Our ${activeMegaMenuItem.name}`}
                  </p>

                  <div
                    className="grid gap-3 justify-items-stretch"
                    style={{ gridTemplateColumns: `repeat(${megaMenuCols}, 1fr)` }}
                  >
                    {activeMegaMenuItem.dropdown.map((sub) => {
                      const isServicesMenu = activeMegaMenuItem.name === "Services";
                      const isProductsMenu = activeMegaMenuItem.name === "Products";
                      return (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex h-full flex-col gap-2 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isProductsMenu ? "max-w-full" : ""
                          }`}
                        >
                          <div
                            className={`relative overflow-hidden rounded-lg ${
                              isServicesMenu
                                ? "aspect-[16/9] bg-muted"
                                : isProductsMenu
                                  ? "aspect-[15/8] bg-muted"
                                  : "aspect-[16/9] bg-muted"
                            }`}
                          >
                            {isServicesMenu ? (
                              sub.image ? (
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-secondary" />
                              )
                            ) : sub.image ? (
                              sub.mediaType === "video" ? (
                                <video
                                  src={sub.image}
                                  className="h-full w-full bg-[#6c4f37] object-cover scale-[1.08] transition-transform duration-500 group-hover:scale-[1.13]"
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  aria-label={sub.name}
                                />
                              ) : (
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              )
                            ) : (
                              <div className="w-full h-full bg-secondary" />
                            )}
                            {!isServicesMenu && (
                              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                            )}
                          </div>
                          <span className={`font-medium text-foreground text-center group-hover:text-primary transition-colors duration-200 leading-snug px-1 pb-1 ${
                              isProductsMenu ? "text-[0.76rem]" : "text-[0.9rem]"
                            }`}>
                            {sub.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </nav>

            <div className="hidden lg:block shrink-0">
              <Button asChild className="h-9 px-3 xl:h-10 xl:px-4">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

            <button
              className="lg:hidden p-2 transition-colors text-foreground"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isMenuOpen) setMobileDropdown(null);
              }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="container-main">
            <nav className="lg:hidden py-4 border-t border-border max-h-[70vh] overflow-y-auto pb-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                        className={`flex items-center justify-between w-full py-4 text-sm font-medium transition-colors ${
                          isNavItemActive(item) ? "text-primary" : "text-foreground hover:text-primary"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileDropdown === item.name && (
                        <div className="pl-4 pb-2 space-y-1">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block py-2 text-sm text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setMobileDropdown(null);
                                setIsMenuOpen(false);
                              }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center py-4 text-sm font-medium transition-colors ${
                        isNavItemActive(item) ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-border mt-4">
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    Contact Us
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
