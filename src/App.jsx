import { useState, useCallback, useRef, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
  useBlocker,
  Link,
  useParams,
  useOutletContext,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ConfirmModal from "./components/ConfirmModal";
import "./index.css";

// Lazy loading chunks
const Home = lazy(() => import("./pages/Home"));
const VocabStudy = lazy(() => import("./pages/VocabStudy"));
const GrammarStudy = lazy(() => import("./pages/GrammarStudy"));
const Quiz = lazy(() => import("./pages/Quiz"));
const SequentialStudy = lazy(() => import("./pages/SequentialStudy"));

// Loading Fallback
const GlobalLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      gap: "16px",
    }}
  >
    <div
      className="spinner"
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid var(--border-subtle)",
        borderTopColor: "var(--accent-blue)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <div style={{ color: "var(--text-muted)" }}>Loading...</div>
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizInProgress, setQuizInProgress] = useState(false);

  const location = useLocation();

  const isLessonRoute = location.pathname.includes("/lesson/");
  const match = location.pathname.match(/\/lesson\/(\d+)\/(\w+)/);
  const activeLesson = match ? parseInt(match[1], 10) : 1;
  const activePage = match
    ? match[2]
    : location.pathname === "/sequential"
      ? "sequential"
      : "home";

  // React Router v7 hook to block navigation if a quiz is in progress
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      quizInProgress && currentLocation.pathname !== nextLocation.pathname,
  );

  const handleConfirmLeave = () => {
    setQuizInProgress(false);
    if (blocker.state === "blocked") {
      blocker.proceed();
    }
  };

  const handleCancelLeave = () => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        activeLesson={activeLesson}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="app-content">
        {/* Mobile Top Bar */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-subtle)",
            position: "sticky",
            top: 0,
            zIndex: 60,
          }}
          className="mobile-topbar"
        >
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Menu ဖွင့်ရန်"
          >
            ☰
          </button>
          <div
            style={{
              fontFamily: "var(--font-jp)",
              fontSize: "1.2rem",
              color: "var(--text-primary)",
            }}
          >
            日本語 N5
          </div>
        </div>

        {/* Sub-tab nav for Browse (lesson-specific) mode */}
        {isLessonRoute && (
          <div
            className="subtab-bar"
            style={{
              display: "flex",
              gap: "4px",
              padding: "12px 24px",
              borderBottom: "1px solid var(--border-subtle)",
              background: "var(--bg-secondary)",
              position: "sticky",
              top: 0,
              zIndex: 55,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div className="tabs" style={{ flex: 1, maxWidth: "400px" }}>
              <Link
                to={`/lesson/${activeLesson}/vocab`}
                className={`tab-btn ${activePage === "vocab" ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
                style={{ textDecoration: "none" }}
              >
                📚 ဝေါဟာရ
              </Link>
              <Link
                to={`/lesson/${activeLesson}/grammar`}
                className={`tab-btn ${activePage === "grammar" ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
                style={{ textDecoration: "none" }}
              >
                📝 သဒ္ဒါ
              </Link>
              <Link
                to={`/lesson/${activeLesson}/quiz`}
                className={`tab-btn ${activePage === "quiz" ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
                style={{ textDecoration: "none" }}
              >
                🎯 စစ်ဆေး
              </Link>
            </div>
            <Link
              to="/"
              className="btn btn-ghost btn-sm"
              style={{ color: "var(--text-muted)", textDecoration: "none" }}
            >
              ← ပင်မ
            </Link>
          </div>
        )}

        {/* Sequential top bar */}
        {activePage === "sequential" && (
          <div
            style={{
              padding: "8px 24px",
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Link
              to="/"
              className="btn btn-ghost btn-sm"
              style={{ color: "var(--text-muted)", textDecoration: "none" }}
            >
              ← ပင်မ
            </Link>
          </div>
        )}

        {/* Page Content Rendered Here via React Router with Suspense */}
        <Suspense fallback={<GlobalLoader />}>
          <Outlet context={{ setQuizInProgress }} />
        </Suspense>
      </main>

      {/* Confirm leave-quiz modal */}
      <ConfirmModal
        isOpen={blocker.state === "blocked"}
        title="စစ်ဆေးချက် မပြီးသေးပါ!"
        message={
          "စစ်ဆေးချက် မပြီးဆုံးသေးပါ။\nထွက်သွားလျှင် တိုးတက်မှု ဆုံးရှုံးမည်ဖြစ်သည်။\nဆက်လက်စစ်ဆေးမည်လား?"
        }
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />

      <style>{`
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

// Wrappers to pass down URL parameters and Context
function VocabStudyWrapper() {
  const { id } = useParams();
  return <VocabStudy lesson={parseInt(id, 10)} key={`vocab-${id}`} />;
}

function GrammarStudyWrapper() {
  const { id } = useParams();
  return <GrammarStudy lesson={parseInt(id, 10)} key={`grammar-${id}`} />;
}

function QuizWrapper() {
  const { id } = useParams();
  const { setQuizInProgress } = useOutletContext();
  return (
    <Quiz
      lesson={parseInt(id, 10)}
      key={`quiz-${id}`}
      onQuizStateChange={setQuizInProgress}
    />
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sequential", element: <SequentialStudy /> },
      { path: "/lesson/:id/vocab", element: <VocabStudyWrapper /> },
      { path: "/lesson/:id/grammar", element: <GrammarStudyWrapper /> },
      { path: "/lesson/:id/quiz", element: <QuizWrapper /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
