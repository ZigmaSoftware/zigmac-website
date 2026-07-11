import React from 'react';

interface StateFilterProps {
  states: string[];
  selectedState: string;
  onStateSelect: (state: string) => void;
  stickyTop?: number;
  stickyTopClass?: string;
  showTabSwitcher?: boolean;
  activeTab?: 'completed' | 'ongoing';
  onTabChange?: (tab: 'completed' | 'ongoing') => void;
  showPrivateTab?: boolean;
  isPrivateActive?: boolean;
  onPrivateTabClick?: () => void;
}

export const StateFilter: React.FC<StateFilterProps> = ({
  states,
  selectedState,
  onStateSelect,
  stickyTop,
  stickyTopClass = 'top-16',
  showTabSwitcher = false,
  activeTab = 'completed',
  onTabChange,
  showPrivateTab = false,
  isPrivateActive = false,
  onPrivateTabClick,
}) => {
  const hasActions = showTabSwitcher || showPrivateTab;

  return (
    <nav
      className={`sticky ${stickyTop === undefined ? stickyTopClass : ''} border-y border-border bg-background/95 backdrop-blur z-40`}
      style={stickyTop === undefined ? undefined : { top: `${stickyTop}px` }}
    >
      <div className="max-w-[1400px] mx-auto px-[5%] py-2 flex flex-wrap items-center gap-3">
        <div className={`flex flex-wrap gap-2 ${hasActions ? 'flex-1' : 'justify-center w-full'}`}>
          {states.map((state) => (
            <button
              key={state}
              onClick={() => onStateSelect(state)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                !isPrivateActive && selectedState === state
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        {hasActions && (
          <div className="ml-auto flex items-center gap-2 shrink-0">
            {showTabSwitcher && (
              <div className="relative inline-grid grid-cols-2 rounded-full border border-border bg-muted/60 p-1">
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                    activeTab === 'ongoing' ? 'translate-x-full' : 'translate-x-0'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => onTabChange?.('completed')}
                  className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:py-2 sm:text-sm ${
                    activeTab === 'completed'
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Completed
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange?.('ongoing')}
                  className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:py-2 sm:text-sm ${
                    activeTab === 'ongoing'
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Ongoing
                </button>
              </div>
            )}

            {showPrivateTab && (
              <button
                type="button"
                onClick={onPrivateTabClick}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isPrivateActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                Private Projects
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
