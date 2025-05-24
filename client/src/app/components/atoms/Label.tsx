'use client';

import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className, ...rest }) => (
  <label htmlFor={htmlFor} className={`block font-medium mb-2 ${className ?? ''}`} {...rest}>
    {children}
  </label>
);
