import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es, ca } from "date-fns/locale";
import * as Yup from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formattedDate(date: string, formatStr = "PPp"): string {
  const eventDate = new Date(date);
  return format(eventDate, formatStr, { locale: ca, timeZone: "UTC" } as any);
}

export const eventSchema = Yup.object()
  .strict()
  .shape({
    name: Yup.string()
      .required("El nombre del evento es obligatorio")
      .max(50, "El nombre no puede tener más de 50 caracteres"),
    description: Yup.string().max(
      150,
      "La descripción no puede tener más de 150 caracteres"
    ),
    tags: Yup.array()
      .max(3, "No se pueden agregar más de 3 tags")
      .of(Yup.string().max(15, "Cada tag no puede tener más de 15 caracteres")),
    location: Yup.string()
      .required("La ubicación es obligatoria")
      .max(40, "La ubicación no puede tener más de 40 caracteres"),
    price: Yup.string()
      .required("El precio es obligatorio")
      .max(30, "El precio no puede tener más de 30 caracteres"),
    link: Yup.string().max(
      200,
      "El enlace no puede tener más de 200 caracteres"
    ),
  });

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese una dirección de correo electrónico válida")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Ingrese un correo electrónico con un dominio válido"
    )
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
    )
    .required("La contraseña es obligatoria"),
});
