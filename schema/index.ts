import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(6, {
    message: "Minimum of 8 is characters required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum of 8 is characters required",
  }),
});

export const EventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.date({
    required_error: "Date of event is required.",
  }),
  category : z.string().min(1, "Category is required"),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  location: z.string().min(1, "Location is required"),
});


export const EventApiSchema = EventSchema.extend({
  startDate: z.string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid date format"
    })
    .transform((str) => new Date(str))
});