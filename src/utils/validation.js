import { toast } from 'sonner';

/**
 * Imperative utility to trigger validation error toasts.
 * Replaces the declarative ValidationAlert component.
 */
export const triggerValidationToast = (errors, onDiscard, showDiscardOption) => {
  if (!errors || errors.length === 0) return;

  const hasUnsubmittedTask = errors.includes("Unsubmitted Task");
  const title = hasUnsubmittedTask ? "Unsubmitted Task" : "Missing Required Fields";
  const description = errors.join(' • ');

  const action = showDiscardOption && onDiscard ? {
    label: 'Discard',
    onClick: onDiscard
  } : undefined;

  toast.error(title, {
    description,
    duration: 4000,
    action
  });
};
