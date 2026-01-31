import { z } from "zod"

export const signInSchema = z.object({
  username: z.string().min(1, "กรุณากรอกชื่อผู้ใช้งาน"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน")
})

export const signUpSchema = z
  .object({
    username: z.string().min(3, "ชื่อผู้ใช้ต้องยาวกว่า 3 ตัวอักษร"),
    password: z.string().min(8, "รหัสต้องยาวกว่า 8 ตัวอักษร"),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "PasswordMismatch",
    path: ["confirmPassword"]
  })
