import { describe, it, expect } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { createForm, type FormField } from '@/lib/pdf/processors/form-creator';

/**
 * End-to-end tests for the Form Creator processor using the real pdf-lib
 * (the loader is intentionally NOT mocked here), covering the static
 * 'label' field type added for the Form Builder preset: labels must be
 * drawn as page text and must NOT appear as AcroForm fields.
 */
async function makeOnePagePdfFile(): Promise<File> {
  const doc = await PDFDocument.create();
  doc.addPage([612, 792]);
  const bytes = await doc.save();
  const file = new File([new Uint8Array(bytes)], 'input.pdf', { type: 'application/pdf' });
  // jsdom's File does not implement arrayBuffer(); attach the real bytes.
  const copy = new Uint8Array(bytes);
  Object.defineProperty(file, 'arrayBuffer', {
    value: async () => copy.buffer as ArrayBuffer,
  });
  return file;
}

async function readBlobBytes(blob: Blob): Promise<Uint8Array> {
  // jsdom's Blob does not implement arrayBuffer(); use FileReader instead.
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
}

describe('FormCreatorProcessor (real pdf-lib)', () => {
  it('creates text/checkbox/radio AcroForm fields and keeps labels out of the form', async () => {
    const file = await makeOnePagePdfFile();
    const fields: FormField[] = [
      { type: 'text', name: 'full_name', pageNumber: 1, x: 50, y: 700, width: 200, height: 24 },
      { type: 'text', name: 'comments', pageNumber: 1, x: 50, y: 640, width: 300, height: 60, multiline: true },
      { type: 'checkbox', name: 'agree', pageNumber: 1, x: 50, y: 600, width: 20, height: 20 },
      { type: 'radio', name: 'choice', pageNumber: 1, x: 50, y: 560, width: 20, height: 20, options: ['Yes', 'No'] },
      { type: 'label', name: 'label_1', pageNumber: 1, x: 50, y: 730, width: 200, height: 24, text: 'Section Title', fontSize: 12 },
    ];

    const output = await createForm(file, { fields });

    expect(output.success).toBe(true);
    expect(output.result).toBeInstanceOf(Blob);

    const outBytes = await readBlobBytes(output.result as Blob);
    const outDoc = await PDFDocument.load(outBytes);
    const form = outDoc.getForm();
    const names = form.getFields().map((f) => f.getName()).sort();

    // Exactly the interactive fields — the label must not be among them
    expect(names).toEqual(['agree', 'choice', 'comments', 'full_name']);
    expect(() => form.getTextField('full_name')).not.toThrow();
    expect(() => form.getCheckBox('agree')).not.toThrow();
    expect(() => form.getRadioGroup('choice')).not.toThrow();
    expect(form.getRadioGroup('choice').getOptions()).toEqual(['Yes', 'No']);
  });

  it('does not fail the export when a label cannot be WinAnsi-encoded (CJK text)', async () => {
    const file = await makeOnePagePdfFile();
    const fields: FormField[] = [
      { type: 'text', name: 'applicant', pageNumber: 1, x: 50, y: 700, width: 200, height: 24 },
      // Chinese label: Helvetica cannot encode it. In this test environment the
      // CJK webfont cannot be fetched either, so the label must be skipped
      // gracefully instead of failing the whole export.
      { type: 'label', name: 'label_cjk', pageNumber: 1, x: 50, y: 730, width: 200, height: 24, text: '姓名', fontSize: 12 },
    ];

    const output = await createForm(file, { fields });

    expect(output.success).toBe(true);
    const outBytes = await readBlobBytes(output.result as Blob);
    const outDoc = await PDFDocument.load(outBytes);
    const names = outDoc.getForm().getFields().map((f) => f.getName());
    expect(names).toEqual(['applicant']);
  });
});
