import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/routes/index";
import Projects from "@/routes/projects";
import WorkSlug from "@/routes/work-slug";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="chip mb-6">404</div>
        <h1 className="text-4xl font-semibold">Signal lost.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist — but the rest of the case files do.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="btn-primary">Return home</Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work/:slug" element={<WorkSlug />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
