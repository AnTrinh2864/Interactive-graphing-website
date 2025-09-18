import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Dock } from "./components/dock/Dock";
import { DockCard } from "./components/dock-card/DockCard";
import { Card } from "./components/card/Card";
import type { ThemeName } from "./themeColors";

const ALL_THEMES = [
  "theme-forest", "theme-forest_dark",
  "theme-ocean", "theme-ocean_dark",
  "theme-love", "theme-love_dark",
  "theme-orange", "theme-orange_dark",
  "theme-liliac", "theme-liliac_dark",
  "theme-monochrome", "theme-monochrome_dark"
];

/**
 * Apply a theme+mode combination to <body>, persist it, and return the actual applied theme.
 */
export function applyTheme(theme: ThemeName, mode: string): ThemeName {
  // cleanup
  document.body.classList.remove(...ALL_THEMES);

  let currTheme = theme;
  if (mode === "dark") {
    if (!currTheme.includes("_dark")) {
      currTheme = (currTheme + "_dark") as ThemeName;
    }
  } else {
    if (currTheme.includes("_dark")) {
      currTheme = currTheme.split("_")[0] as ThemeName;
    }
  }

  document.body.classList.add(`theme-${currTheme}`);
  localStorage.setItem("theme", currTheme);
  localStorage.setItem("mode", mode);

  return currTheme;
}

/**
 * Restore theme+mode from localStorage (with defaults).
 */
export function loadTheme(): { theme: ThemeName; mode: string } {
  const savedTheme = (localStorage.getItem("theme") as ThemeName) || "forest";
  const savedMode = localStorage.getItem("mode") || "light";
  return { theme: savedTheme, mode: savedMode };
}

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
    const applied = applyTheme(theme, mode);
    setActiveTheme(applied);
  };

  const setCurrentMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    const applied = applyTheme(activeTheme, newMode);
    setActiveTheme(applied);
  };


  
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
