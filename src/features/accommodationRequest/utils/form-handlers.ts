import type { ChangeEvent, Dispatch, FormEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import type {
  FormErrors,
  FormData,
  RequiredFieldName,
  FieldName,
} from '../types';

// Update email field and validate email format on change
export const handleEmailChange = (
  e: ChangeEvent<HTMLInputElement>,
  setFormData: Dispatch<React.SetStateAction<FormData>>,
  setFormErrors: Dispatch<React.SetStateAction<FormErrors>>
) => {
  const value = e.target.value;
  setFormData((prev) => ({ ...prev, email: value }));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    setFormErrors((prev) => ({ ...prev, email: 'Required' }));
  } else if (!emailRegex.test(value)) {
    setFormErrors((prev) => ({
      ...prev,
      email: 'Please enter a valid email address',
    }));
  } else {
    setFormErrors((prev) => ({ ...prev, email: '' }));
  }
};

// Validate required fields on blur (when user leaves input)
export const handleBlur = (
  fieldName: RequiredFieldName,
  formData: FormData,
  setFormErrors: Dispatch<React.SetStateAction<FormErrors>>
) => {
  const value = formData[fieldName];

  // Check if string field is empty
  if (typeof value === 'string' && value.trim() === '') {
    setFormErrors((prev) => ({ ...prev, [fieldName]: 'Required' }));
  }

  // Check if array field is empty
  if (Array.isArray(value) && value.length < 1) {
    setFormErrors((prev) => ({ ...prev, [fieldName]: 'Required' }));
  }
};

// Handle changes for most inputs (text, select)
// Extract value and clear any previous error for that field
export const handleChange = (
  newValue:
    | ChangeEvent<HTMLInputElement>
    | SelectChangeEvent<string | string[]>
    | string,
  fieldName: FieldName,
  setFormData: Dispatch<React.SetStateAction<FormData>>,
  setFormErrors: Dispatch<React.SetStateAction<FormErrors>>
) => {
  const value = typeof newValue === 'string' ? newValue : newValue.target.value;

  setFormData((prev) => ({ ...prev, [fieldName]: value }));
  setFormErrors((prev) => ({ ...prev, [fieldName]: '' }));
};

// Handle changes for multiple select inputs
// Update selected values and clear error
export const handleMultipleSelect = (
  event: SelectChangeEvent<string[]>,
  fieldName: FieldName,
  setFormData: Dispatch<React.SetStateAction<FormData>>,
  setFormErrors: Dispatch<React.SetStateAction<FormErrors>>
) => {
  const selectedValues = event.target.value as string[];

  setFormData((prev) => ({
    ...prev,
    [fieldName]: selectedValues,
  }));
  setFormErrors((prev) => ({ ...prev, [fieldName]: '' }));
};

// Handle form submission: validate, save data, reset form, show confirmation
export const handleSubmit = (
  e: FormEvent<HTMLFormElement>,
  formData: FormData,
  setFormData: Dispatch<React.SetStateAction<FormData>>,
  setFormErrors: Dispatch<React.SetStateAction<FormErrors>>,
  setSubmitted: Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  const errors = {
    name: '',
    email: '',
    phoneNumber: '',
    preferredContactMethod: '',
    accommodations: '',
    accommodationsNote: '',
    consentConfirmation: '',
  };

  // Validate form data, populate errors object
  const isValid = validateFormData(errors, formData);
  setFormErrors(errors);

  // If form is valid, save data and reset form
  if (isValid) {
    localStorage.setItem('accommodationRequest', JSON.stringify(formData));

    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      preferredContactMethod: '',
      accommodations: [],
      accommodationsNote: '',
      additionalDetails: '',
      consentConfirmation: false,
    });

    setSubmitted(true);
  }
};

// Validate each required field and update errors
const validateFormData = (errors: FormErrors, formData: FormData): boolean => {
  let valid = true;

  if (!formData.name.trim()) {
    errors.name = 'Required';
    valid = false;
  }

  if (!formData.email.trim()) {
    errors.email = 'Required';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    valid = false;
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Required';
    valid = false;
  } else if (!formData.phoneNumber.trim().startsWith('+')) {
    errors.phoneNumber = 'Phone number must include country code';
    valid = false;
  }

  if (!formData.preferredContactMethod) {
    errors.preferredContactMethod = 'Required';
    valid = false;
  }

  if (!formData.accommodations || formData.accommodations.length < 1) {
    errors.accommodations = 'Required';
    valid = false;
  }

  if (
    formData.accommodations.includes('other') &&
    !formData.accommodationsNote.trim()
  ) {
    errors.accommodationsNote = 'Required';
    valid = false;
  }

  if (!formData.consentConfirmation) {
    errors.consentConfirmation = 'Please check';
    valid = false;
  }

  return valid;
};
