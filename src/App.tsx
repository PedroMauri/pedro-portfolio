import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import About from "@/pages/About";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyPage from "@/pages/CaseStudy";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";

function LegacyWorkRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/case-studies/${slug}` : "/case-studies"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/work" element={<Navigate to="/case-studies" replace />} />
          <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
          <Route path="/contact" element={<Navigate to="/#get-in-touch" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
