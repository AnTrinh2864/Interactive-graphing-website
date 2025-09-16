import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Dock } from "./components/dock/Dock";
import { DockCard } from "./components/dock-card/DockCard";
import { Card } from "./components/card/Card";

const THEMES = [
  { src: "/assets/Tea.png", theme: undefined }, // default
  { src: "/assets/ocean.png", theme: "theme-ocean" },
  { src: "/assets/Sunset.png", theme: "theme-sunset" },
];

const Theme: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const setTheme = (theme?: string) => {
    document.body.classList.remove("theme-ocean", "theme-sunset");
    if (theme) {
      document.body.classList.add(theme);
    }
    setActiveTheme(theme);

    if (theme) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved || undefined);
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
              isActive={activeTheme === theme} // highlight active
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
