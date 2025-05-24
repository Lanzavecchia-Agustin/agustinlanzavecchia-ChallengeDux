'use client';

import React from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';

export const Input: React.FC<InputTextProps> = ({ className, ...props }) => (
  <InputText {...props} className={`w-full ${className ?? ''}`} />
);
