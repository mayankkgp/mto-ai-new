"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  InfoIcon,
  TriangleAlertIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group !fixed !top-0 !right-0 !left-auto !bottom-auto !flex !flex-col !items-end"
      duration={1500}
      icons={{
        success: null,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: null,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "!min-h-0 !w-fit !whitespace-nowrap !flex !items-center !justify-center !px-3 !py-1.5 !rounded-md !shadow-md !opacity-100 !border !text-[11px] !font-bold !tracking-tight !transition-none !transform-none !animate-none",
          success: "!bg-[#ECFDF5] !border-[#A7F3D0] !text-[#065F46]",
          error: "!bg-destructive !border-destructive !text-destructive-foreground !shadow-xl !rounded-xl !p-4",
          title: "!text-sm !font-bold",
          description: "!text-xs !font-medium !mt-0",
          closeButton: "!bg-white !text-gray-500 hover:!bg-gray-100 !border !border-gray-200"
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
