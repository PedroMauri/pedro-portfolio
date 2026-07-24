import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLayout } from "@/components/layout/PageLayout";
import About from "@/pages/About";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyPage from "@/pages/CaseStudy";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Resume from "@/pages/Resume";

function LegacyWorkRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/case-studies/${slug}` : "/case-studies"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/work" element={<Navigate to="/case-studies" replace />} />
          <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
          <Route path="/contact" element={<Navigate to="/#get-in-touch" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
      <Analytics />
    </BrowserRouter>
  );
}
