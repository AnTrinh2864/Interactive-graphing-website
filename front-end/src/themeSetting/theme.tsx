import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Dock } from "./components/dock/Dock";
import { DockCard } from "./components/dock-card/DockCard";
import { Card } from "./components/card/Card";
import type { ThemeName } from "./themeColors";

const THEMES: { src: string; theme: ThemeName }[] = [
  { src: "/assets/Tea.png", theme: "default" },
  { src: "/assets/ocean.png", theme: "ocean" },
  { src: "/assets/Sunset.png", theme: "sunset" },
];
interface ThemeProps {
  activeTheme: ThemeName;
  setActiveTheme: (t: ThemeName) => void;
}

const Theme: React.FC<ThemeProps> = ({ setActiveTheme }) => {
  const [open, setOpen] = useState(false);

  const setTheme = (theme: ThemeName) => {
    document.body.classList.remove("theme-ocean", "theme-sunset");
    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
    setActiveTheme(theme??"default");
  };

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeName) || "default";
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
        </Dock>
      </div>
    </>
  );
};

export default Theme;
