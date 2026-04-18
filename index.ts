import type { PluginEntry } from "@anthropic/openclaw-plugin-sdk";

const API_BASE = "https://pdfapihub.com/api";

async function callApi(
  endpoint: string,
  body: Record<string, unknown>,
  apiKey: string
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CLIENT-API-KEY": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`PDFAPIHub API error (${res.status}): ${text}`);
    }
    throw new Error(
      `PDFAPIHub API error (${res.status}): ${(parsed as any).error || text}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return {
    success: true,
    content_type: contentType,
    message: "Binary file returned. Use output='url' or output='base64' for usable results.",
  };
}

function getApiKey(config: Record<string, unknown>): string {
  const key = (config.apiKey as string) || "";
  if (!key) {
    throw new Error(
      "PDFAPIHub API key not configured. Get a free key at https://pdfapihub.com"
    );
  }
  return key;
}

function buildBody(params: Record<string, unknown>): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      body[key] = value;
    }
  }
  return body;
}

const plugin: PluginEntry = {
  id: "pdfapihub-pdf-to-jpg",
  name: "PDF to JPG",
  register(api) {
    // ─── PDF to JPG ──────────────────────────────────────────
    api.registerTool({
      name: "pdf_to_jpg",
      description:
        "Convert PDF pages to high-quality JPG images. Supports custom DPI (72-300), quality control (1-100), custom dimensions, and multiple output formats. Convert a single page or all pages at once.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "URL of the PDF file to convert.",
          },
          file: {
            type: "string",
            description: "Base64-encoded PDF file content.",
          },
          page: {
            type: "number",
            description: "Single page number to convert (1-based).",
          },
          pages: {
            type: "string",
            description:
              "Page range to convert. E.g. '1-5', '1,3,5', 'all'. Converts multiple pages.",
          },
          image_format: {
            type: "string",
            enum: ["jpg", "jpeg", "png", "webp"],
            description: "Output image format. Default: 'jpg'.",
          },
          dpi: {
            type: "number",
            description:
              "Resolution in DPI (72-300). Higher DPI = sharper image but larger file. Default: 150.",
          },
          quality: {
            type: "number",
            description:
              "Image quality (1-100). Higher = better quality. Default: 85.",
          },
          width: {
            type: "number",
            description: "Output image width in pixels. Maintains aspect ratio if only width is set.",
          },
          height: {
            type: "number",
            description: "Output image height in pixels. Maintains aspect ratio if only height is set.",
          },
          output: {
            type: "string",
            enum: ["url", "base64", "both", "file"],
            description: "Output format. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body = buildBody(params);
        if (!body.image_format) body.image_format = "jpg";
        return callApi("/v1/convert/pdf/image", body, apiKey);
      },
    });

    // ─── PDF Page Preview ────────────────────────────────────
    api.registerTool({
      name: "pdf_page_preview",
      description:
        "Quick preview of the first page of a PDF as a small 400px-wide JPG thumbnail. Useful for checking PDF content before full conversion.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "URL of the PDF file to preview.",
          },
          file: {
            type: "string",
            description: "Base64-encoded PDF file content.",
          },
          output: {
            type: "string",
            enum: ["url", "base64", "both"],
            description: "Output format. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          page: 1,
          image_format: "jpg",
          quality: 80,
          width: 400,
        };
        return callApi("/v1/convert/pdf/image", body, apiKey);
      },
    });

    // ─── PDF Info ────────────────────────────────────────────
    api.registerTool({
      name: "pdf_info",
      description:
        "Get PDF metadata and page count. Returns number of pages, file size, encryption status, and other document properties. Useful for checking a PDF before conversion.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "URL of the PDF file.",
          },
          base64_pdf: {
            type: "string",
            description: "Base64-encoded PDF file content.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        return callApi("/v1/pdf/info", buildBody(params), apiKey);
      },
    });
  },
};

export default plugin;
