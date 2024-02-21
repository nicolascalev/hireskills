import { z } from "zod";

function dateStringOrNull() {
  return z.union([
    z.null(),
    z.string().min(1).transform(value => new Date(value)),
    z.string().nullable().transform(() => null),
    z.date(),
  ]);
}

export const profileSchema = z.object({
  fullName: z.string().min(1).max(50),
  company: z.string().max(50).optional(),
  role: z.string().max(50).optional(),
  location: z.string().max(50).optional(),
  startedCoding: dateStringOrNull(),
  startedProfessionalExperience: dateStringOrNull(),
  summary: z.coerce.string().max(1000).optional(),
});
