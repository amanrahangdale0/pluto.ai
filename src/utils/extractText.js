/**
 * Text extraction for PDF + DOCX files.
 * Libraries are imported dynamically so they never load during SSR.
 */

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];
const PDFJS_VERSION = "3.11.174";

/** @returns {"pdf"|"docx"|"doc"|"unknown"} */
export function getFileKind(file) {
  const name = (file?.name || "").toLowerCase();
  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".docx")) return "docx";
  if (name.endsWith(".doc")) return "doc";
  return "unknown";
}

async function extractFromPdf(file) {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buffer }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it) => ("str" in it ? it.str : "")).join(" ") + "\n";
  }
  return text.trim();
}

async function extractFromDocx(file) {
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return (result?.value || "").trim();
}

/**
 * Extract plain text from an uploaded resume file.
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractTextFromFile(file) {
  const kind = getFileKind(file);
  try {
    if (kind === "pdf") {
      const text = await extractFromPdf(file);
      if (!text || text.length < 20) {
        throw new Error(
          "This appears to be a scanned PDF. Try a text-based PDF for best results."
        );
      }
      return text;
    }
    if (kind === "docx") {
      const text = await extractFromDocx(file);
      if (!text) throw new Error("We couldn't read any text from this file. Please check it.");
      return text;
    }
    if (kind === "doc") {
      throw new Error("Legacy .doc isn't supported — please export as PDF or .docx.");
    }
    throw new Error("Unsupported file type. Upload a PDF or Word document.");
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Failed to read the file.");
  }
}
