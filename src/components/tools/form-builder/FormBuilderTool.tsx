'use client';

import React from 'react';
import { FormCreatorTool } from '@/components/tools/form-creator';

export interface FormBuilderToolProps {
  className?: string;
}

/**
 * PDF Form Builder — the quick, simplified preset of the Form Creator engine.
 * Upload an existing PDF and add a few common fields (text, textarea,
 * checkbox, radio) plus static text labels. For blank PDFs, templates and
 * advanced field types, use the full Form Creator instead.
 */
export function FormBuilderTool({ className = '' }: FormBuilderToolProps) {
  return <FormCreatorTool preset="builder" className={className} />;
}

export default FormBuilderTool;
