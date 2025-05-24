const { z } = require('zod');

const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    ),
    role: z.enum(["candidate", "admin"],{
        errorMap: () => ({ message: "Role must be either 'candidate' or 'admin'" })
    })
});
const loginSchema = z.object({
    username: z.string(),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    )
})

module.exports = { 
    signupSchema,
    loginSchema
}