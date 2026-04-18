---
name: pdf-to-jpg
description: "Convert PDF pages to high-quality JPG images with customizable DPI, resolution, and quality. Extract individual pages, batch convert entire documents, or generate quick thumbnails. Powered by PDFAPIHub."
---

# PDF to JPG

Convert PDF document pages into high-quality JPG images with full control over DPI, quality, dimensions, and output format.

## Tools

| Tool | Description |
|------|-------------|
| `pdf_to_jpg` | Convert PDF pages to JPG with custom DPI (72-300), quality (1-100), and dimensions |
| `pdf_page_preview` | Quick 400px thumbnail preview of the first page of a PDF |
| `pdf_info` | Get PDF metadata: page count, file size, encryption status |

## Setup

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

**Privacy note:** PDFs you convert are uploaded to PDFAPIHub's cloud service for rendering. Files are auto-deleted after 30 days.

Configure your API key in `~/.openclaw/openclaw.json`:

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

Or use the `env` approach (OpenClaw injects it into `config.apiKey` automatically):

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

## Usage Examples

**Convert all pages to JPG:**
> Convert this PDF to JPG images: https://example.com/report.pdf

**Convert specific pages at high DPI:**
> Convert pages 1-3 of this PDF to JPG at 300 DPI: https://example.com/brochure.pdf

**Quick preview:**
> Show me a preview of this PDF: https://example.com/document.pdf

**Check page count before converting:**
> How many pages does this PDF have? https://example.com/book.pdf

**High quality PNG output:**
> Convert page 1 to a high-quality PNG at 300 DPI: https://example.com/flyer.pdf

## Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)
