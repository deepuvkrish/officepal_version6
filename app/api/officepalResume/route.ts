// ./app/api/officepalResume/route.ts
// ./app/api/cvGenerate/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();
    const isProd = process.env.NODE_ENV === "production";

    // Do not predeclare browser type here
    let browser: import("puppeteer-core").Browser | import("puppeteer").Browser;


    if (isProd) {
      const chrome = (await import("chrome-aws-lambda")).default;
      const puppeteer = (await import("puppeteer-core")).default;

      browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: (await chrome.executablePath) || "/usr/bin/chromium-browser",
        headless: chrome.headless,
        defaultViewport: chrome.defaultViewport,
      });
    } else {
      const puppeteer = (await import("puppeteer")).default;

      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: { top: "40px", bottom: "60px", left: "20px", right: "20px" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:10px;text-align:center;width:100%;margin-top:10px;">My Resume</div>`,
      footerTemplate: `<div style="font-size:10px;text-align:center;width:100%;margin-bottom:10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error: unknown) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
