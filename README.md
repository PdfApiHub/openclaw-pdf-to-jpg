# PDF to JPG — OpenClaw Plugin

Convert PDF pages to high-quality JPG images using the [PDFAPIHub](https://pdfapihub.com) API. This OpenClaw plugin gives your AI agent the ability to extract pages from any PDF as images with full control over resolution, quality, and dimensions.

## What It Does

Transform PDF document pages into JPG, PNG, or WebP images — one page at a time or the entire document in a single call. Ideal for thumbnails, previews, archiving, and image-based workflows.

### Features

- **High-Quality Conversion** — Crisp images with DPI from 72 to 300
- **Quality Control** — Adjustable compression quality from 1 to 100
- **Custom Dimensions** — Set width and/or height with automatic aspect ratio
- **Multiple Formats** — Output as JPG, PNG, or WebP
- **Page Selection** — Convert a single page, page ranges, or all pages
- **Quick Thumbnails** — One-click 400px preview of page 1
- **PDF Info** — Check page count and metadata before converting
- **Flexible Output** — Download URL, base64 string, or raw file

## Tools

| Tool | Description |
|------|-------------|
| `pdf_to_jpg` | Convert PDF pages to JPG with custom DPI, quality, and dimensions |
| `pdf_page_preview` | Quick 400px thumbnail preview of the first page |
| `pdf_info` | Get PDF metadata: page count, file size, encryption status |

## Installation

```bash
openclaw plugins install clawhub:pdf-to-jpg
```

## Configuration

**Privacy note:** PDFs you convert are uploaded to PDFAPIHub's cloud service for rendering. Files are auto-deleted after 30 days.

```json
{
  "plugins": {
    "entries": {
      "pdf-to-jpg": {
        "enabled": true,
        "apiKey": "your-api-key-here"
      }
    }
  }
}
```

Or use the `env` approach:

```json
{
  "plugins": {
    "entries": {
      "pdf-to-jpg": {
        "enabled": true,
        "env": {
          "PDFAPIHUB_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

## Usage Examples

Just ask your OpenClaw agent:

- *"Convert this PDF to JPG images: https://example.com/report.pdf"*
- *"Convert pages 1-3 at 300 DPI: https://example.com/brochure.pdf"*
- *"Show me a thumbnail preview of this PDF"*
- *"How many pages does this PDF have?"*
- *"Convert page 5 to a high-quality PNG"*

## Use Cases

- **Document Previews** — Generate thumbnail images for PDF documents in galleries and file browsers
- **Social Media Sharing** — Convert PDF flyers and posters to shareable JPG images
- **Archiving** — Convert PDF pages to images for long-term storage in image-based systems
- **Presentations** — Extract PDF slides as images for embedding in web pages or presentations
- **OCR Preprocessing** — Convert PDF pages to images before running OCR or computer vision
- **E-commerce** — Extract product catalog pages as individual product images

## API Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)

## License

MIT
