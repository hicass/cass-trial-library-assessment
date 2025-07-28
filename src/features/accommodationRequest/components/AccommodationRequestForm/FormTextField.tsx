import type { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import type { FormTextFieldProps } from '../../types';

// Reusable MUI component for a controlled form input with 
// validation and custom handlers.
export const FormTextField = ({
  id,
  fieldName,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  rows,
  size = 'medium',
  multiline = false,
  required = false,
}: FormTextFieldProps) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, fieldName)}
      onBlur={() => onBlur?.(fieldName)}
      error={!!error}
      helperText={helperText}
      aria-required={required}
      required={required}
      rows={rows}
      size={size}
      multiline={multiline}
      fullWidth
    />
  );
};
