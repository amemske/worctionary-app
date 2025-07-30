import { useState } from "react";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import TagList from "@/components/TagList";

export default function App(): React.JSX.Element {
  const [tags, setTags] = useState<string[]>([
    "NFT",
    "Metaverse",
    "Sustainable",
    "Sonder",
    "FOMO",
    "Ghosting",
  ]);

  const handleTagClick = (tag: string): void => {
    console.log(`Tag clicked: ${tag}`);
    // Handle tag click logic here
  };

  const handleHeaderSearch = (search: string): void => {
    console.log(`Header search: ${search}`);
    // Handle header search logic here
  };

  const handleHeroSearch = (search: string): void => {
    console.log(`Hero search: ${search}`);
    // Handle hero search logic here
  };

  return (
    <main className="bg-background min-h-screen text-white">
      <Header onSearch={handleHeaderSearch} />
      <Hero onSearch={handleHeroSearch} />
      <TagList title="Trending" tags={tags} onTagClick={handleTagClick} />
      <TagList title="For you" tags={tags} onTagClick={handleTagClick} className="pb-8 md:pb-12" />
    </main>
  );
}
