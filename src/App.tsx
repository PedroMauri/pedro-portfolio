import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import About from "@/pages/About";
import CaseStudyPage from "@/pages/CaseStudy";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Work from "@/pages/Work";

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
