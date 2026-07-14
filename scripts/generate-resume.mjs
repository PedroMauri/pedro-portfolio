import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "pedro-mauri-resume.pdf");

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 48, bottom: 48, left: 54, right: 54 },
  info: {
    Title: "Pedro Mauri - Resume",
    Author: "Pedro Mauri",
  },
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

const ink = "#0B0B0B";
const muted = "#5B5B5B";
const accent = "#00959F";
const rule = "#D8E4E6";
const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

/** Consistent order: Employment type | Work mode | Dates */
function formatMeta({ type, mode, dates }) {
  return [type, mode, dates].filter(Boolean).join("  |  ");
}

function sectionTitle(title) {
  doc.moveDown(0.55);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(accent)
    .text(title.toUpperCase(), { characterSpacing: 1.2 });
  doc
    .moveTo(doc.page.margins.left, doc.y + 4)
    .lineTo(doc.page.margins.left + pageWidth, doc.y + 4)
    .strokeColor(rule)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.5);
  doc.fillColor(ink);
}

function roleBlock({ company, title, type, mode, dates, bullets }) {
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ink).text(company, { continued: false });
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(ink).text(title);
  doc.font("Helvetica").fontSize(9).fillColor(muted).text(formatMeta({ type, mode, dates }));
  doc.moveDown(0.22);
  doc.fillColor(ink).font("Helvetica").fontSize(9.5);
  for (const bullet of bullets) {
    doc.text(`-  ${bullet}`, {
      width: pageWidth,
      align: "left",
      paragraphGap: 1.5,
    });
  }
  doc.moveDown(0.4);
}

// Header
doc.font("Helvetica-Bold").fontSize(22).fillColor(ink).text("Pedro Mauri");
doc.moveDown(0.12);
doc.font("Helvetica").fontSize(11).fillColor(accent).text("Product Designer (UX & UI)");
doc.moveDown(0.28);
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(muted)
  .text("Calgary, Canada  |  +1 (368) 299-6803  |  contact@pedromauri.com");
doc.text("www.pedromauri.com  |  linkedin.com/in/pedro-mauri");

sectionTitle("Summary");
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(ink)
  .text(
    "Product designer with 7+ years of experience across B2B SaaS and digital products. I specialize in complex workflows, information architecture, and end-to-end product design - from discovery and prototyping through shipped UI. Strong at 0 to 1 products, cross-functional collaboration, and aligning design decisions with growth and business outcomes.",
    { width: pageWidth, lineGap: 2 },
  );

sectionTitle("Experience");

roleBlock({
  company: "BuildClock",
  title: "Senior Product Designer",
  type: "Part-time",
  mode: "Remote",
  dates: "Dec 2024 - Present",
  bullets: [
    "Lead product design for a startup field time-tracking platform serving Canadian contractors (GPS clock-in, approvals, billing-ready exports).",
    "Defined dual-persona experiences for field workers and admins; scoped an MVP and partnered with engineering to ship the live product.",
    "Prioritized mobile-web adoption and week-close workflows over feature depth for real field SaaS constraints.",
  ],
});

roleBlock({
  company: "Mattali Drywall Inc.",
  title: "Product Experience & Growth Strategist",
  type: "Full-time",
  mode: "Hybrid",
  dates: "Aug 2023 - Present",
  bullets: [
    "Own product experience and growth strategy across digital touchpoints to help attract, convert, and retain customers.",
    "Translate operational and sales needs into clearer journeys, messaging, and product opportunities.",
    "Partner with stakeholders to prioritize initiatives that improve customer experience and measurable growth.",
  ],
});

roleBlock({
  company: "Yethos",
  title: "Product Designer",
  type: "Part-time",
  mode: "Remote",
  dates: "Jul 2021 - Jul 2023",
  bullets: [
    "Redesigned community discovery so users can evaluate relevance, activity, and trust before joining.",
    "Improved information architecture, activity signals, and conversation-first layouts validated through usability testing.",
  ],
});

roleBlock({
  company: "Leaf",
  title: "Product Designer",
  type: "Part-time",
  mode: "Remote",
  dates: "Jan 2019 - Jun 2021",
  bullets: [
    "Designed HR management experiences for large corporate teams, with Team Network Health as a key differentiator.",
    "Structured team creation, communication, and manager insights around employee feedback signals.",
  ],
});

roleBlock({
  company: "Upsigns Digital Communication",
  title: "Senior Product Designer",
  type: "Full-time",
  mode: null,
  dates: "Apr 2019 - Jul 2023",
  bullets: [
    "Led UX/UI for digital products and client platforms from research and flows through high-fidelity design and design QA.",
    "Built and extended interface systems for consistency, faster delivery, and clearer collaboration with engineering.",
    "Facilitated discovery, prototyping, and stakeholder alignment to ship user-centered solutions under delivery constraints.",
  ],
});

sectionTitle("Selected work");
doc.font("Helvetica").fontSize(9.5).fillColor(ink);
const selected = [
  "BuildClock - Field time tracking for Canadian contractors (B2B SaaS, 0 to 1, mobile web).",
  "Yethos - Community discovery and engagement redesign (research, IA, prototyping).",
  "Leaf - HR platform and Team Network Health dashboards for large teams.",
];
for (const item of selected) {
  doc.text(`-  ${item}`, { width: pageWidth, paragraphGap: 1.5 });
}

sectionTitle("Skills");
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(ink)
  .text(
    "Product Design  |  UX Research  |  Information Architecture  |  Interaction Design  |  UI Design  |  Design Systems  |  Prototyping  |  Usability Testing  |  Design QA  |  B2B SaaS  |  0 to 1 Products  |  Cross-functional Collaboration",
    { width: pageWidth, lineGap: 2 },
  );

sectionTitle("Tools");
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(ink)
  .text("Figma  |  FigJam  |  Prototyping  |  Design systems  |  Product & engineering collaboration", {
    width: pageWidth,
    lineGap: 2,
  });

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`Wrote ${outPath}`);
