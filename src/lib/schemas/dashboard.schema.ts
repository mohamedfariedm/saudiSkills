import { z } from "zod";

export const dashboardSchema = z
  .object({
    // Security Section
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    twoFactorAuth: z.enum(["sms", "app", "email", "none"]),

    // Privacy Section
    dataSharing: z.boolean(),

    // Preferences Section
    notificationPreferences: z
      .array(z.enum(["email", "push", "sms"]))
      .min(1, "Select at least one notification method"),
    theme: z.enum(["light", "dark", "system"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type DashboardSettingsData = z.infer<typeof dashboardSchema>;
