import type { SelectChangeEvent } from '@mui/material/Select';
import type { ChangeEvent } from 'react';

// Required form field names.
// These fields must have values before form submission.
export type RequiredFieldName =
  | 'name'
  | 'email'
  | 'preferredContactMethod'
  | 'accommodations'
  | 'phoneNumber'
  | 'consentConfirmation'
  | 'accommodationsNote';

// Optional form field names.
// These fields are not mandatory for submission.
type OptionalFieldName = 'additionalDetails';

// All possible form field names.
export type FieldName = RequiredFieldName | OptionalFieldName;

// Form data structure representing all form fields.
export type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  preferredContactMethod: string;
  accommodations: string[];
  accommodationsNote: string;
  additionalDetails?: string; // Optional field
  consentConfirmation: boolean;
};

// Error messages for form fields.
// Each field maps to a string error message.
export type FormErrors = {
  name: string;
  email: string;
  phoneNumber: string;
  preferredContactMethod: string;
  accommodations: string;
  accommodationsNote: string;
  consentConfirmation: string;
};

// Props for a text input field component.
export interface FormTextFieldProps {
  id: string;
  fieldName: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  onBlur?: (fieldName: string) => void;
  error?: boolean;
  helperText?: string;
  rows?: number;
  size?: 'medium' | 'small';
  multiline?: boolean;
  required?: boolean;
}

// Represents a single menu item for a select dropdown.
interface MenuItemProps {
  value: string;
  label: string;
}

/**
 * Props for a select dropdown component.
 * @template TValue - the type of the value, string or array of strings (for multiple select)
 */
export interface FormSelectProps<TValue extends string | string[]> {
  labelId: string;
  fieldName: string;
  label: string;
  selectId: string;
  value: TValue;
  selectLabel: string;
  onChange: (e: SelectChangeEvent<TValue>, fieldName: string) => void;
  onBlur?: (fieldName: string) => void;
  error?: boolean;
  helperText?: string;
  menuItems: MenuItemProps[];
  multiple?: boolean;
  required: boolean;
}
