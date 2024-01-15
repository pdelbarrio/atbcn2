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
      .required("El nom de l'esdeveniment és obligatori")
      .max(50, "El nom no pot tenir més de 50 caràcters"),
    description: Yup.string().max(
      150,
      "La descripció no pot tenir més de 150 caràcters"
    ),
    tags: Yup.array()
      .max(3, "No es poden afegir més de 3 tags")
      .of(Yup.string().max(15, "Cada tag no pot tenir més de 15 caràcters")),
    location: Yup.string()
      .required("La ubicació és obligatòria")
      .max(40, "La ubicació no pot tenir més de 40 caràcters"),
    price: Yup.string()
      .required("El preu és obligatori")
      .max(30, "El preu no pot tenir més de 30 caràcters"),
    link: Yup.string().max(200, "L'enllaç no pot tenir més de 200 caràcters"),
  });

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese una dirección de correo electrónico válida")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Ingressi una adreça de correu electrònic vàlida"
    )
    .required("El correu electrònic és obligatori"),
  password: Yup.string()
    .min(8, "La contrasenya ha de tenir almenys 8 caràcters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "La contrasenya ha de contenir almenys una lletra majúscula, una lletra minúscula i un número"
    )
    .required("La contrasenya és obligatòria"),
});
