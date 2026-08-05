import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

async function compilePDF(htmlPath: string, outPaths: string[]) {
  const fileUrl = `file://${path.resolve(htmlPath)}`;
  const newTabRes = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(fileUrl)}`, {
    method: "PUT",
  });
  const tabData = (await newTabRes.json()) as { webSocketDebuggerUrl: string };
  const wsUrl = tabData.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise((res) => {
    ws.onopen = res;
  });

  ws.send(JSON.stringify({ id: 1, method: "Page.enable" }));
  await new Promise((r) => setTimeout(r, 600));

  const msgId = Math.floor(Math.random() * 10000);
  ws.send(
    JSON.stringify({
      id: msgId,
      method: "Page.printToPDF",
      params: {
        displayHeaderFooter: false,
        printBackground: true,
        preferCSSPageSize: true,
      },
    }),
  );

  const result = await new Promise<{ data: string }>((resolve) => {
    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data as string) as { id: number; result: { data: string } };
      if (parsed.id === msgId) {
        resolve(parsed.result);
      }
    };
  });

  const pdfBuffer = Buffer.from(result.data, "base64");
  for (const outPath of outPaths) {
    fs.writeFileSync(outPath, pdfBuffer);
    console.log("✔ Generated:", outPath);
  }
  ws.close();
}

async function main() {
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox",
  ]);
  await new Promise((r) => setTimeout(r, 1200));

  try {
    const resumeDir = "/Users/mrsan/developer/resume";
    const publicDir = path.resolve("./public");

    await compilePDF(path.join(resumeDir, "resume_es.html"), [
      path.join(resumeDir, "resume_es.pdf"),
      path.join(publicDir, "resume_es.pdf"),
      path.join(publicDir, "cv.pdf"),
    ]);

    await compilePDF(path.join(resumeDir, "resume.html"), [
      path.join(resumeDir, "resume.pdf"),
      path.join(publicDir, "resume.pdf"),
    ]);
  } finally {
    chrome.kill();
  }
}

main();
