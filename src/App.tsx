import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLayout } from "@/components/layout/PageLayout";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import Aaip from "@/pages/Aaip";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyPage from "@/pages/CaseStudy";
import Documents from "@/pages/Documents";
import DocumentCategoryPage from "@/pages/DocumentCategoryPage";
import DocumentPerson from "@/pages/DocumentPerson";
import Education from "@/pages/Education";
import FrenchStudy from "@/pages/FrenchStudy";
import Home from "@/pages/Home";
import IeltsEnglish from "@/pages/IeltsEnglish";
import Immigration from "@/pages/Immigration";
import ImmigrationFolder from "@/pages/ImmigrationFolder";
import KanopiShare from "@/pages/KanopiShare";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import PrivatePortfolio from "@/pages/PrivatePortfolio";
import Resume from "@/pages/Resume";
import Wes from "@/pages/Wes";
import WorkHistory from "@/pages/WorkHistory";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/private-portfolio" element={<PrivatePortfolio />} />
          <Route path="/share/kanopi" element={<KanopiShare />} />
          <Route path="/study/french" element={<FrenchStudy />} />
          <Route path="/immigration" element={<Immigration />} />
          <Route path="/immigration/aaip" element={<Aaip />} />
          <Route path="/immigration/documents" element={<Documents />} />
          <Route path="/immigration/documents/ielts-english" element={<IeltsEnglish />} />
          <Route path="/immigration/documents/education" element={<Education />} />
          <Route path="/immigration/documents/education/wes" element={<Wes />} />
          <Route path="/immigration/documents/wes" element={<Navigate to="/immigration/documents/education/wes" replace />} />
          <Route path="/immigration/documents/work-history" element={<WorkHistory />} />
          <Route path="/immigration/documents/person/:personId" element={<DocumentPerson />} />
          <Route
            path="/immigration/documents/references"
            element={<Navigate to="/immigration/documents/work-history" replace />}
          />
          <Route
            path="/immigration/documents/identity"
            element={<Navigate to="/immigration/documents/identity-family" replace />}
          />
          <Route
            path="/immigration/documents/family"
            element={<Navigate to="/immigration/documents/identity-family" replace />}
          />
          <Route path="/immigration/documents/:slug" element={<DocumentCategoryPage />} />
          <Route path="/immigration/:slug" element={<ImmigrationFolder />} />
          <Route path="/documents" element={<Navigate to="/immigration/documents" replace />} />
          <Route
            path="/documents/ielts-english"
            element={<Navigate to="/immigration/documents/ielts-english" replace />}
          />
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
