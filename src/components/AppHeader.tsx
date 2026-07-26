import { SOCIETY_FOR_NEUROECONOMICS_URL } from "../lib/regions";
import { ThemeToggle } from "./ThemeToggle";
import type { Theme } from "../lib/useTheme";

interface AppHeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function AppHeader({ theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-title">
        <span className="app-header-mark">NE</span>
        <div>
          <h1>Neuroeconomics</h1>
          <p>An interactive atlas of the decision-making brain</p>
        </div>
      </div>
      <div className="app-header-actions">
        <a href={SOCIETY_FOR_NEUROECONOMICS_URL} target="_blank" rel="noopener noreferrer">
          Society for Neuroeconomics ↗
        </a>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
