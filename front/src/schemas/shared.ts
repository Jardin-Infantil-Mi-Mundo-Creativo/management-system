import { z } from 'zod';

export const enrollmentFilesSchema = z.object({
  documentsFile: z.any().optional(),
  studentPhoto: z.any().optional(),
});
