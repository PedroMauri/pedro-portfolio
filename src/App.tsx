import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLayout } from "@/components/layout/PageLayout";
import About from "@/pages/About";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyPage from "@/pages/CaseStudy";
import Home from "@/pages/Home";
import KanopiShare from "@/pages/KanopiShare";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Resume from "@/pages/Resume";

function LegacyProjectsRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/projects/${slug}` : "/projects"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<CaseStudies />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/share/kanopi" element={<KanopiShare />} />
          <Route path="/case-studies" element={<Navigate to="/projects" replace />} />
          <Route path="/case-studies/:slug" element={<LegacyProjectsRedirect />} />
          <Route path="/work" element={<Navigate to="/projects" replace />} />
          <Route path="/work/:slug" element={<LegacyProjectsRedirect />} />
          <Route path="/contact" element={<Navigate to="/#get-in-touch" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
      <Analytics />
    </BrowserRouter>
  );
}
