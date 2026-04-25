import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';

/**
 * FormField Component
 * A wrapper for form elements that connects to react-hook-form context
 * for validation status and error messaging.
 */
const FormField = ({ name, label, isRequired, children, className }) => {
  const { formState: { errors } } = useFormContext();

  // Helper to get error for nested names like "customer.name"
  const getNestedError = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const error = getNestedError(errors, name);

  return (
    <div className={cn("flex flex-col gap-0.5 w-full", className)}>
      {label && (
        <Label variant="micro">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child, {
          className: cn(
            child.props.className,
            "w-full",
            error && "border-red-500 bg-red-50 focus-visible:border-red-500"
          ),
        });
      })}
    </div>
  );
};

export default FormField;
