//  ./app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();
    const isProd = process.env.NODE_ENV === "production";

    let puppeteer;
    let browser;

    if (isProd) {
      const chrome = (await import("chrome-aws-lambda")).default;
      puppeteer = (await import("puppeteer-core")).default;

      browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: (await chrome.executablePath) || "/usr/bin/chromium-browser",
        headless: true,
      });
    } else {
      puppeteer = (await import("puppeteer")).default;

      browser = await puppeteer.launch({
        headless: true,
        // You can specify executablePath here if your system doesn't pick up Chromium automatically
        // executablePath: "/usr/bin/google-chrome"
      });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
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
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
