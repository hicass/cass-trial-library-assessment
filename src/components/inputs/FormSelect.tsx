import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { FormSelectProps } from '../../features/accommodationRequest/types';

// Reusable MUI select component with support for single/multi-select,
// form validation, helper text, and dynamic menu items.
export function FormSelect<TValue extends string | string[]>({
  labelId,
  fieldName,
  label,
  selectId,
  value,
  selectLabel,
  onChange,
  onBlur,
  error,
  helperText,
  menuItems,
  multiple = false,
  required = false,
}: FormSelectProps<TValue>) {
  return (
    <FormControl fullWidth required={required} error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<TValue>
        labelId={labelId}
        id={selectId}
        value={value}
        label={selectLabel}
        onChange={(e) => onChange(e, fieldName)}
        onBlur={() => onBlur?.(fieldName)}
        multiple={multiple}
        aria-required={required}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
