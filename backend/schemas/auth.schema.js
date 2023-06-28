const z = require("zod");

const registerSchema = z.object({
    folio: z.number({
        required_error: "El campo del folio es requerido"
    }),
    password: z.string({
        required_error: "El campo contraseña es requerido"
    }).min(6, {
        message: "La contraseña debe contener al menos 6 caracteres"
    })
});

const loginSchema = z.object({
    folio: z.string({
        required_error: "El campo del folio es requerido"
    }),
    password: z.string({
        required_error: "El campo contraseña es requerido"
    }).min(6, {
        message: "La contraseña debe contener al menos 6 caracteres"
    })
});

module.exports = {
    registerSchema,
    loginSchema
}