import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Dock } from "./components/dock/Dock";
import { DockCard } from "./components/dock-card/DockCard";
import { Card } from "./components/card/Card";
import type { ThemeName } from "./themeColors";

const THEMES: { src: string; theme: ThemeName; }[] = [
  { src: "/assets/Tea.png", theme: "forest" },
  { src: "/assets/ocean.png", theme: "ocean" },
  { src: "/assets/Love.png", theme: "love" },
  { src: "/assets/Orange.png" , theme: "orange" },
  {src: "/assets/Liliac.png", theme: "liliac"},
  {src: "/assets/Monochrome.png", theme: "monochrome"}
];
interface ThemeProps {
  activeTheme: ThemeName;
  setActiveTheme: (t: ThemeName) => void;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>
}

const Theme: React.FC<ThemeProps> = ({ activeTheme, setActiveTheme, mode, setMode }) => {
  const [open, setOpen] = useState(false);

  const setTheme = (theme: ThemeName) => {
    document.body.classList.remove(
      "theme-forest_dark",
      "theme-forest",
      "theme-ocean", 
      "theme-love", 
      "theme-orange", 
      "theme-liliac", 
      "theme-monochrome",
      "theme-ocean_dark", 
      "theme-love_dark", 
      "theme-orange_dark", 
      "theme-liliac_dark", 
      "theme-monochrome_dark",
      );
    let currTheme = theme
    if (mode === 'dark') {
      if (!currTheme.includes('_dark')) {
        currTheme = (theme + '_dark') as ThemeName
      } 
    } else {
      if (currTheme.includes('_dark')) {
        currTheme = currTheme.split('_')[0] as ThemeName
      }
    }
    document.body.classList.add(`theme-${currTheme}`);
    localStorage.setItem("theme", currTheme);
    setActiveTheme(currTheme??(mode === 'dark'? "forest_dark":"forest"));
  };

  const setCurrentMode = () => {
    if (mode === 'dark') {
      setMode('light')
    } else {
      setMode('dark')
    }
  }
  
  useEffect(()=> {
    setTheme(activeTheme)
  }, [mode, setMode, setActiveTheme])
  
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeName) ||
       (mode==='dark'? "forest_dark":"forest");
    setTheme(saved);
  }, []);
  
  return (
    <>
      {/* Toggle Button */}
      <button className={styles.toggleButton} onClick={() => setOpen(!open)}>
        Choose Theme
      </button>

      {/* Sliding Theme List */}
      <div className={`${styles.themePanel} ${open ? styles.open : ""}`}>
        <Dock>
          {THEMES.map(({ src, theme }) => (
            <DockCard
              key={src}
              onClick={() => setTheme(theme)}
            >
              <Card src={src} />
            </DockCard>
          ))}
          <DockCard
            key={"light/dark"} 
            onClick={setCurrentMode
          }>
            <Card src= {"/assets/DarkMode.jpg"}></Card>
          </DockCard>
        </Dock>
      </div>
    </>
  );
};

export default Theme;
