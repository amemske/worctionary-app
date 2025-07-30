import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface HeaderProps {
  onSearch?: (search: string) => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, className = "" }): React.JSX.Element => {
  const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState<boolean>(false);
  const [headerSearchValue, setHeaderSearchValue] = useState<string>("");
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeaderSearchValue(e.target.value);
  };

  const handleInputFocus = (): void => {
    setIsHeaderSearchFocused(true);
    setIsSearchExpanded(true);
  };

  const handleInputBlur = (): void => {
    setIsHeaderSearchFocused(false);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(headerSearchValue);
    }
  };

  const handleExitSearch = (): void => {
    setIsSearchExpanded(false);
    setIsHeaderSearchFocused(false);
    setHeaderSearchValue("");
  };

  const handleSearchIconClick = (): void => {
    setIsSearchExpanded(true);
  };

  return (
    <header className={`flex items-center justify-between px-4 md:px-6 py-4 bg-backround border-b border-gray-800 ${className}`}>
      {/* Logo Section - Hidden on mobile when search is expanded */}
      <div className={`flex items-center gap-2 transition-all duration-300 ${
        isSearchExpanded ? 'opacity-0 md:opacity-100 scale-0 md:scale-100' : 'opacity-100 scale-100'
      }`}>
        <img src="/task1/wordtionary-logo.svg" alt="Logo" className="w-5 h-5" />
        <div className="text-white font-semibold text-lg">Wortionary</div>
      </div>

      {/* Search Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon - Only visible when search is not expanded */}
        <div className={`md:hidden ${isSearchExpanded ? 'hidden' : 'block'}`}>
          <button
            onClick={handleSearchIconClick}
            className="p-2 rounded-full hover:bg-[var(--badge-bg)] transition-colors"
            aria-label="Open search"
          >
            <Search className="text-[var(--text-muted)] text-lg" />
          </button>
        </div>

        {/* Desktop Search Input */}
        <div className="hidden md:block" style={{ position: "relative" }}>
          <span className="absolute left-3 top-[5px]">
            <Search className="text-[var(--text-muted)] text-sm size-[22px]" />
          </span>
          <Input
            type="text"
            value={headerSearchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            placeholder="Search"
            aria-label="Search"
            className={`pl-11 bg-[var(--badge-bg)] text-[var(--text-muted)] border rounded-[var(--radius-custom)] w-[160px] transition-colors header-search-input ${
              isHeaderSearchFocused ? "border-primary" : "border-[var(--search-border)]"
            }`}
          />
        </div>

        {/* Mobile Expanded Search - Only visible when search is expanded */}
        <div className={`md:hidden fixed top-0 left-0 right-0 h-[75px] bg-background z-50 flex items-center px-4 ${
          isSearchExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
        } transition-all duration-300`}>
          <div className="flex items-center w-full gap-3">
            <button
              onClick={handleExitSearch}
              className="p-2 rounded-full hover:bg-[var(--badge-bg)] transition-colors"
              aria-label="Exit search"
            >
              <ArrowLeft className="text-[var(--text-muted)] text-lg" />
            </button>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-[5px]">
                <Search className="text-[var(--text-muted)] text-sm size-[22px]" />
              </span>
              <Input
                type="text"
                value={headerSearchValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                placeholder="Search"
                aria-label="Search"
                className={`pl-11 bg-[var(--badge-bg)] text-[var(--text-muted)] border rounded-[var(--radius-custom)] w-full transition-colors header-search-input ${
                  isHeaderSearchFocused ? "border-primary" : "border-[var(--search-border)]"
                }`}
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Avatar - Hidden on mobile when search is expanded */}
        <Avatar className={`${isSearchExpanded ? 'hidden md:block' : 'block'}`} style={{ width: "32px", height: "32px" }}>
          <AvatarImage src="/task1/avatar_placeholder.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header; 