import {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FormControl from '@mui/material/FormControl';
import { MuiTelInput } from 'mui-tel-input';
import { type FormErrors, type FormData } from '../../types';
import { FormTextField } from './FormTextField';
import { FormSelect } from './FormSelect';
import {
  handleBlur,
  handleChange,
  handleEmailChange,
  handleMultipleSelect,
  handleSubmit,
} from '../../utils/formHandlers';

// Component to render an Accommodation Request form
export const AccommodationRequestForm = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    preferredContactMethod: '',
    accommodations: [],
    accommodationsNote: '',
    additionalDetails: '',
    consentConfirmation: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phoneNumber: '',
    preferredContactMethod: '',
    accommodations: '',
    accommodationsNote: '',
    consentConfirmation: '',
  });

  // useEffect to help scroll to the top of the component to show the
  // confirmation message, and clear it after 10 seconds
  useEffect(() => {
    if (!submitted) return;
    if (submitted && topRef.current) {
      // Scroll smoothly to the top container when submitted becomes true
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const timer = setTimeout(() => setSubmitted(false), 10000);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div className="w-full sm:w-lg scroll-m-4" ref={topRef}>
      {/* Form submission confirmation message */}
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col justify-center items-center min-h-[4rem]"
      >
        {submitted && (
          <>
            <div className="flex gap-2">
              <p className="body-lg body-bold">Thank you!</p>
              <RocketLaunchIcon />
            </div>
            <p className="body-sm mt-1">
              Our team will contact you soon to ensure everything's ready for
              your journey.
            </p>
          </>
        )}
      </div>

      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleSubmit(e, formData, setFormData, setFormErrors, setSubmitted)
        }
        noValidate
        className="glass-bg p-4 border flex flex-col gap-6 items-start"
      >
        {/* Required Name Field */}
        <FormTextField
          id="name"
          fieldName="name"
          label="Full Name"
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 'name', setFormData, setFormErrors)
          }
          onBlur={() => handleBlur('name', formData, setFormErrors)}
          error={!!formErrors.name}
          helperText={formErrors.name}
          required
        />

        {/* Required Email Field */}
        <FormTextField
          id="email"
          fieldName="email"
          label="Email"
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleEmailChange(e, setFormData, setFormErrors)
          }
          onBlur={() => handleBlur('email', formData, setFormErrors)}
          error={!!formErrors.email}
          helperText={formErrors.email}
          required
        />

        {/* Phone Number Field */}
        <MuiTelInput
          id="phone-number"
          value={formData.phoneNumber}
          onChange={(newValue) =>
            handleChange(newValue, 'phoneNumber', setFormData, setFormErrors)
          }
          onBlur={() => handleBlur('phoneNumber', formData, setFormErrors)}
          error={!!formErrors.phoneNumber}
          helperText={formErrors.phoneNumber}
          defaultCountry="US"
          fullWidth
        />

        {/* Required Preferred Contact Method Field */}
        <FormSelect
          labelId="preferred-contact-method"
          fieldName="preferredContactMethod"
          label="Preferred Contact Method"
          selectId="preferred-contact-method-select"
          value={formData.preferredContactMethod}
          selectLabel="Preferred Contact Method"
          onChange={(e: SelectChangeEvent<string | string[]>) =>
            handleChange(
              e,
              'preferredContactMethod',
              setFormData,
              setFormErrors
            )
          }
          onBlur={() =>
            handleBlur('preferredContactMethod', formData, setFormErrors)
          }
          error={!!formErrors.preferredContactMethod}
          helperText={formErrors.preferredContactMethod}
          menuItems={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'either', label: 'Either' },
          ]}
          required
        />

        {/* Required Type of Accommodation Field */}
        <FormSelect<string[]>
          labelId="accommodations"
          fieldName="accommodations"
          label="Type of Accommodations Needed"
          selectId="accommodations-select"
          value={formData.accommodations}
          selectLabel="Type of Accommodation Needed"
          onChange={(e: SelectChangeEvent<string[]>) =>
            handleMultipleSelect(
              e,
              'accommodations',
              setFormData,
              setFormErrors
            )
          }
          onBlur={() => handleBlur('accommodations', formData, setFormErrors)}
          error={!!formErrors.accommodations}
          helperText={formErrors.accommodations}
          menuItems={[
            {
              value: 'mobility',
              label: 'Mobility assistance (e.g., ramp, lift)',
            },
            { value: 'visual', label: 'Visual assistance' },
            { value: 'hearing', label: 'Hearing assistance' },
            { value: 'cognitive', label: 'Cognitive support' },
            { value: 'other', label: 'Other' },
          ]}
          multiple
          required
        />

        {formData.accommodations.includes('other') && (
          <FormTextField
            id="accommodations-note"
            fieldName="accommodationsNote"
            label="Please describe the accommodation needed."
            value={formData.accommodationsNote}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, 'accommodationsNote', setFormData, setFormErrors)
            }
            error={!!formErrors.accommodationsNote}
            helperText={formErrors.accommodationsNote}
            rows={2}
            multiline
            size="small"
            required
          />
        )}

        {/* Additional Details */}
        <FormTextField
          id="additional-details"
          fieldName="additionalDetails"
          label="Additional Details"
          value={formData.additionalDetails ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 'additionalDetails', setFormData, setFormErrors)
          }
          rows={4}
          multiline
          size="small"
        />

        {/* Required Consent Checkbox */}
        <FormControl
          required
          error={!!formErrors.consentConfirmation}
          component="fieldset"
          className="text-left"
        >
          <FormControlLabel
            control={
              <Checkbox
                name="consentConfirmation"
                checked={formData.consentConfirmation}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const checked = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    consentConfirmation: checked,
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    consentConfirmation: '',
                  }));
                }}
              />
            }
            label="I understand this form helps the crew prepare for my accessibility needs and will be kept confidential."
          />
          <FormHelperText>{formErrors.consentConfirmation}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          className="w-full"
          aria-label="Submit accommodation request form"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
