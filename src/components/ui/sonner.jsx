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
      className="toaster group"
      duration={1500}
      icons={{
        success: null,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: null,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        style: {
          '--toast-padding': '6px 12px',
          '--toast-min-height': '28px',
          '--toast-width': 'max-content',
        },
        classNames: {
          toast: "!text-[11px] !font-bold !tracking-tight !border !shadow-md !rounded-md !flex !items-center",
          description: "!text-xs !font-medium !text-gray-600 !mt-0",
          success: "!bg-[#ECFDF5] !border-[#A7F3D0] !text-[#065F46]",
          error: "!bg-red-50 !border-red-200 !text-red-800",
          info: "!bg-blue-50 !border-blue-200 !text-blue-800",
          warning: "!bg-yellow-50 !border-yellow-200 !text-yellow-800",
          closeButton: "!bg-white !text-gray-500 hover:!bg-gray-100 !border !border-gray-200"
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
