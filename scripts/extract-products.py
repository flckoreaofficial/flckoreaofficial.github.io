"""Extract original embedded product images; requires PyMuPDF. No image synthesis."""
import sys
from pathlib import Path
import pymupdf as fitz

document = fitz.open(sys.argv[1])
output = Path('public/products')
output.mkdir(parents=True, exist_ok=True)
# PDF page (one-based), image block number. Original product artwork only.
assets = {
    'zsd-1': (13, 3), 'hbm-bonder': (11, 25), 'mcpd-1': (19, 17),
    'saw-equipment': (22, 19), 'back-grind': (7, 5), 'thin-die-ejector': (14, 17),
    'magnetic-collet': (17, 9), 'saw-kit': (21, 11),
    'pulse-heater': (20, 7), 'ceramic-tool': (20, 9), 'emi-plate': (12, 27),
}
for name, (page, number) in assets.items():
    if name == 'saw-kit':
        # Retain the PDF's numbered labels together with the kit diagram.
        pix = document[page - 1].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(140, 140, 610, 495))
        pix.save(str(output / f'{name}.png'))
        print(f'{name}: page {page}, numbered diagram')
        continue
    pdf_page = document[page - 1]
    info = next(b for b in pdf_page.get_image_info(xrefs=True) if b['number'] == number)
    pix = fitz.Pixmap(document, info['xref'])
    # PDF stores transparency separately. Preserve that mask when exporting PNG.
    resource = next(b for b in pdf_page.get_images(full=True) if b[0] == info['xref'])
    if resource[1]:
        if pix.alpha:
            pix = fitz.Pixmap(pix, 0)
        pix = fitz.Pixmap(pix, fitz.Pixmap(document, resource[1]))
    if pix.colorspace and pix.colorspace.n > 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    pix.save(str(output / f'{name}.png'))
    print(f'{name}: page {page}, {pix.width} x {pix.height}')
