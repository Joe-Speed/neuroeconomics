import { FaGithub } from "react-icons/fa6";

const GITHUB_REPO_URL = "https://github.com/Joe-Speed/neuroeconomics";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-title">
        <span className="app-header-mark">NE</span>
        <div>
          <h1>Neuroeconomics</h1>
          <p>An interactive atlas of the decision-making brain</p>
        </div>
      </div>
      <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
        <FaGithub size={22} />
      </a>
    </header>
  );
}
