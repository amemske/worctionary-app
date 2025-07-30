import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface HeaderProps {
  onSearch?: (search: string) => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, className = "" }): React.JSX.Element => {
  const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState<boolean>(false);
  const [headerSearchValue, setHeaderSearchValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeaderSearchValue(e.target.value);
  };

  const handleInputFocus = (): void => {
    setIsHeaderSearchFocused(true);
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

  return (
    <header className={`flex items-center justify-between px-6 py-4 bg-backround border-b border-gray-800 ${className}`}>
      <div className="flex items-center gap-2">
        <img src="/task1/wordtionary-logo.svg" alt="Logo" className="w-5 h-5" />
        <div className="text-white font-semibold text-lg">Wortionary</div>
      </div>
      <div className="flex items-center gap-4">
        <div style={{ position: "relative" }}>
          <span>
            <span>
              <span className="absolute left-3 top-[5px]">
                <Search className="text-[var(--text-muted)] text-sm size-[22px]" />
              </span>
            </span>
          </span>
          <Input
            type="text"
            value={headerSearchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            placeholder="Search"
            aria-label="Search words and phrases"
            className={`pl-11 bg-[var(--badge-bg)] text-[var(--text-muted)] border rounded-[var(--radius-custom)] w-[160px] transition-colors header-search-input ${
              isHeaderSearchFocused ? "border-primary" : "border-[var(--search-border)]"
            }`}
          />
        </div>
        <Avatar style={{ width: "32px", height: "32px" }}>
          <AvatarImage src="/task1/avatar_placeholder.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header; 