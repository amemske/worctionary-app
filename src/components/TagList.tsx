import { Badge } from "@/components/ui/badge";
import React from "react";
import type { KeyboardEvent } from "react";

interface TagListProps<T = string> {
  title: string;
  tags: T[];
  onTagClick?: (tag: T) => void;
  renderTag?: (tag: T) => React.ReactNode;
  className?: string;
}

const TagList = <T extends string = string>({ 
  title, 
  tags, 
  onTagClick, 
  renderTag,
  className = ""
}: TagListProps<T>): React.JSX.Element => {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>, tag: T): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onTagClick?.(tag);
    }
  };

  const handleTagClick = (tag: T): void => {
    onTagClick?.(tag);
  };

  const renderTagContent = (tag: T): React.ReactNode => {
    return renderTag ? renderTag(tag) : tag;
  };

  return (
    <div className={`mt-8 px-4 md:px-0 max-w-5xl mx-auto ${className}`}>
      <div className="text-white text-lg font-semibold mb-4">{title}</div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {tags.map((tag) => (
          <Badge
            key={String(tag)}
            role="button"
            tabIndex={0}
            onClick={() => handleTagClick(tag)}
            onKeyDown={(e) => handleKeyDown(e, tag)}
            className="bg-[var(--badge-bg)] text-[var(--text-muted)] hover:bg-[var(--badge-hover)] cursor-pointer py-2 px-3 md:px-4 text-sm md:text-base"
          >
            {renderTagContent(tag)}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagList; 