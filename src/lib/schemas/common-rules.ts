import { z, ZodSchema } from "zod";
import { FieldValues, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFunction } from "i18next";

export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
});

export type FileSchema = z.infer<typeof fileSchema>;

export const validateFile = (
  field: string,
  t: TFunction,
  acceptedTypes: string[] = ["image/"], // Default: Images only
  maxSizeMB: number = 5 // Default: 5MB
) =>
  z
    .custom<File | FileList | File[]>(
      (val) => {
        if (!val) return false;
        if (val instanceof File) return true;
        if (val instanceof FileList) return val.length > 0;
        if (Array.isArray(val) && val.length > 0 && val[0] instanceof File)
          return true;
        return false;
      },
      { message: t(`validations.${field}.required`) }
    )
    .transform((val) =>
      val instanceof FileList ? val[0] : Array.isArray(val) ? val[0] : val
    )
    .refine(
      (file) => acceptedTypes.some((type) => file.type.startsWith(type)),
      {
        message: t(`validations.${field}.pattern`),
      }
    )
    .refine((file) => file.size <= maxSizeMB * 1024 * 1024, {
      message: t(`validations.${field}.size`),
    });


/* export const validateImageFile = (filed: string, t?: TFunction) =>
  z
    .instanceof(File, { message: t?.(`validations.${filed}.required`) })
    .refine((file) => file.type.startsWith('image/'), {
      message: t?.(`validations.${filed}.pattern`),
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: t?.(`validations.${filed}.size`),
    }); */
export const validateImageUrl = z
  .string()
  .url()
  .refine((url) => url.match(/\.(jpeg|jpg|gif|png|svg|webp|avif)$/i), {
    message: "URL must be an image",
  });

const extractFile = (value: FileList | null): string | File =>
  (value && value[0]) || "";

//! to extract the file from the filelist
export const createCustomResolver = <T extends FieldValues>(
  schema: ZodSchema<T>
): Resolver<T> => {
  return (data, context, options) => {
    const newData = {
      ...data,
      img: {
        en: extractFile(data.img.en as unknown as FileList),
        ar: extractFile(data.img.ar as unknown as FileList),
      },
    };
    return zodResolver(schema)(newData, context, options);
  };
};
export const createCustomResolverForUser = <T extends FieldValues>(
  schema: ZodSchema<T>
): Resolver<T> => {
  return (data, context, options) => {
    const newData = {
      ...data,
      file: extractFile(data?.file as unknown as FileList) || "",
    };
    return zodResolver(schema)(newData, context, options);
  };
};

/*
const phoneRegex = new RegExp(/^(05)/);
export const validateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invalidEmail });

export const validatePhone = z
  .string()
  .min(1, { message: messages.phoneIsRequired })
  .max(10, { message: messages.invalidPhone })
  .regex(phoneRegex, {
    message: messages.phoneNotFound,
  });
 export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

export const validateNewPassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });
 */
