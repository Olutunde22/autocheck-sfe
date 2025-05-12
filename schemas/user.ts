import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  username: z.string().min(1),
  website: z.string().min(1),
});
