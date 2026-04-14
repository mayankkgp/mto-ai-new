import { z } from "zod";

export const enquirySchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  customer: z.object({
    name: z.string().min(1, "Customer Name is required"),
    poc: z.string().min(1, "POC Name is required"),
    city: z.string().min(1, "City is required"),
    contact: z.string().min(1, "Contact is required"),
  }),
  leadOverview: z.string().min(1, "Lead Overview is required"),
  leadDetails: z.string().optional(),
  type: z.string().min(1, "Enquiry Type is required"),
  leadDate: z.string().optional(),
  channel: z.string().optional(),
  commercials: z.object({
    orderValue: z.number().default(0),
    probability: z.number().min(0).max(100).default(50),
    expectedValue: z.number().default(0),
  }).optional(),
  roles: z.object({
    revenue: z.array(z.object({
      id: z.string(),
      name: z.string()
    })).min(1, "At least one Revenue Role is required"),
    supply: z.array(z.object({
      id: z.string(),
      name: z.string()
    })).optional().default([]),
  }),
  attachments: z.array(z.any()).optional().default([]),
  tasks: z.object({
    revenue: z.array(z.any()).optional().default([]),
    supply: z.array(z.any()).optional().default([]),
  }).optional().default({ revenue: [], supply: [] }),
  dropReason: z.string().optional(),
});
