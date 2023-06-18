import z from "zod"

export const registerSchema = z.object({
    folio: z.string({
        required_error: "El campo del folio es requerido"
    }),
    password: z.string({
        required_error: "El campo contraseña es requerido"
    }).min(6, {
        message: "La contraseña debe contener al menos 6 caracteres"
    })
});

export const loginSchema = z.object({
    folio: z.string({
        required_error: "El campo del folio es requerido"
    }),
    password: z.string({
        required_error: "El campo contraseña es requerido"
    }).min(6, {
        message: "La contraseña debe contener al menos 6 caracteres"
    })
});