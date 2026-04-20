import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cva } from "class-variance-authority";

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "not-last:border-b",
      "advanced-filter": "border-b border-gray-50 last:border-0",
    },
  },
});

const accordionTriggerVariants = cva("group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      "advanced-filter": "w-full px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:no-underline data-[state=open]:bg-primary/5 data-[state=open]:text-primary data-[state=open]:font-bold",
    },
  },
});

const accordionContentVariants = cva("text-sm data-open:animate-accordion-down data-closed:animate-accordion-up", {
  variants: {
    variant: {
        default: "overflow-hidden",
        "advanced-filter": "bg-gray-50/50 py-1 px-3 space-y-1",
    }
  }
});

function Accordion({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props} />
  );
}

function AccordionItem({
  className,
  variant = "default",
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props} />
  );
}

function AccordionTrigger({
  className,
  variant = "default",
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          accordionTriggerVariants({ variant }),
          className
        )}
        {...props}>
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  variant = "default",
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ variant }), className)}
      {...props}>
        {/* Need to keep the wrapper div for the animation if possible, but the request asks to apply variant to content directly?
            Wait, the prompt says "AccordionContent: Add an advanced-filter variant. Styles: "bg-gray-50/50 py-1 px-3 space-y-1" (Note: override default pb-4 pt-0)."
            It seems the styles are for the container. */}
        <div
            className={cn(
                "h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
                variant === "advanced-filter" ? "" : "pt-0 pb-2.5",
                className
            )}>
            {children}
        </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
