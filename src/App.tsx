import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { ProgressProvider, useProgress } from "./context/ProgressContext";
import { Dashboard } from "./pages/Dashboard";
import { ChapterPage } from "./pages/ChapterPage";
import { LessonPage } from "./pages/LessonPage";
import { OrbitalPracticePage } from "./pages/OrbitalPracticePage";
import { AssessmentPage } from "./pages/AssessmentPage";
function Shell() {
  const { progress, storageFailed } = useProgress();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus();
  }, [location.pathname]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header>
        <Link className="brand" to="/">
          <span className="brand-icon">◎</span> orbital
          <span className="brand-sub">CHEMISTRY, CONNECTED</span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink end to="/">
            My learning
          </NavLink>
          <NavLink to="/chapters/chapter-11">Chapter 11</NavLink>
        </nav>
        <div className="xp">
          <span>✦</span> {progress.xp} XP
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {storageFailed && (
          <p role="alert" className="feedback">
            This browser couldn’t save progress. You can keep learning, but
            progress may be lost when you close or refresh the page.
          </p>
        )}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chapters/chapter-11" element={<ChapterPage />} />
          <Route path="/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/practice/orbitals" element={<OrbitalPracticePage />} />
          <Route path="/assessments/11.4" element={<AssessmentPage />} />
          <Route
            path="*"
            element={
              <>
                <h1>Page not found</h1>
                <Link to="/">Go to your dashboard</Link>
              </>
            }
          />
        </Routes>
      </main>
      <footer>
        Small steps. Stronger understanding.
        <span>Original learning content · Progress saved on this device</span>
      </footer>
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <Shell />
      </ProgressProvider>
    </BrowserRouter>
  );
}
