import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";

interface HeroProps {
  onSearch?: (search: string) => void;
}

interface SearchBarProps<T extends string = string> {
  initialValue?: T;
  onSearch: (search: T) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = <T extends string = string>({ 
  initialValue = "" as T, 
  onSearch, 
  placeholder = "Type to search...",
  className = ""
}: SearchBarProps<T>): React.JSX.Element => {
  const [innerValue, setInnerValue] = useState<T>(initialValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    onSearch(innerValue);
  }, [innerValue, onSearch]);

  useEffect(() => {
    setInnerValue(initialValue);
  }, [initialValue]);

  const isActive: boolean = innerValue.trim().length > 0 || isFocused;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInnerValue(e.target.value as T);
  };

  const handleInputFocus = (): void => {
    setIsFocused(true);
  };

  const handleInputBlur = (): void => {
    setIsFocused(false);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch(innerValue);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`flex items-center bg-[var(--search-bg)] border pl-4 pr-2 py-2 rounded-[var(--radius-custom)] w-full max-w-xl mt-6 shadow-lg transition-colors ${className} ${
        isActive ? "border-primary" : "border-[var(--search-border)]"
      }`}
    >
      <Search className="text-[var(--text-muted)] text-sm size-6" />
      <Input
        value={innerValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type="text"
        placeholder={placeholder}
        aria-label="Search for words, phrases and meanings"
        className="flex-1 bg-transparent border-0 text-white placeholder:text-[var(--text-muted)] hero-search-input"
      />
      <Button type="submit" className="bg-primary hover:bg-primary/90 text-white ml-4">
        Search
      </Button>
    </form>
  );
};

const Hero: React.FC<HeroProps> = ({ onSearch = () => {} }): React.JSX.Element => {
  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-[var(--radius-custom)] overflow-hidden mt-8">
      <img src="/task1/hero-bg.png" alt="Abstract background with search interface overlay" className="w-full h-96 object-cover" />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-24">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-[-3px]">
          Search for words, phrases and meanings
        </h1>
        <SearchBar initialValue="" onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Hero; 