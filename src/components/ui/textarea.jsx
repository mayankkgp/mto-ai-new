import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils.js";

const textareaVariants = cva(
  "flex w-full rounded-md border border-input bg-transparent outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#1E40AF] disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
  {
    variants: {
      size: {
        default: "min-h-16 px-2.5 py-2 text-base md:text-sm",
        micro: "min-h-[26px] max-h-[80px] px-1.5 py-1 text-[11px] leading-tight resize-none overflow-y-auto",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const Textarea = React.forwardRef(({ className, size = "default", onChange, ...props }, ref) => {
  const internalRef = React.useRef(null);
  
  // Merge refs
  React.useImperativeHandle(ref, () => internalRef.current);

  const adjustHeight = React.useCallback(() => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, []);

  React.useEffect(() => {
    adjustHeight();
  }, [adjustHeight, props.value, props.defaultValue]);

  React.useEffect(() => {
    const textarea = internalRef.current;
    if (!textarea) return;

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        adjustHeight();
      });
    });

    resizeObserver.observe(textarea);

    return () => {
      resizeObserver.disconnect();
    };
  }, [adjustHeight]);

  const handleInput = (e) => {
    adjustHeight();
    if (onChange) onChange(e);
  };

  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size }), className)}
      ref={internalRef}
      onChange={handleInput}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
