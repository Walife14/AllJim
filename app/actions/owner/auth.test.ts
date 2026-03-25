import { describe, it, expect, vi } from 'vitest'
import { login, signup } from './auth'
import { FormState } from '@/app/lib/definitions'

vi.mock('next/headers', () => ({
    cookies: () => ({
        get: vi.fn(),
        set: vi.fn(),
        delete: vi.fn(),
    })
}))

vi.mock('@/lib/supabase/server', () => ({
    createClient: () => ({
        auth: {
            signUp: vi.fn().mockResolvedValue({ data: {}, error: null })
        }
    })
}))

describe('Login Action', () => {
    it('should return an error when email is invalid format', async () => {
        const formData = new FormData()
        formData.append('email', 'invalid-email')
        formData.append('password', 'ValidPass123!')

        const result = await login({}, formData)

        expect(result.errors?.email).toContain('Please enter a valid email address.')
    })
    it('should return an error if the password is too short', async () => {
        const formData = new FormData()
        formData.append('email', 'test@gym.com')
        formData.append('password', '123')

        const result = await login({}, formData)

        expect(result.errors?.password).toContain('Password must be at least 8 characters long.')
    })
})

describe('Signup Action', () => {
    it('should return an error when passwords do not match', async () => {
        const formData = new FormData()
        formData.append('email', 'test@gym.com')
        formData.append('password', '123')
        formData.append('confirmPassword', '456')


        const result = await signup({}, formData) as FormState

        expect(result.errors?.confirmPassword).toContain('Passwords do not match.')
    })
    it('should return an error when email is invalid format', async () => {
        const formData = new FormData()
        formData.append('email', 'invalid-email')
        formData.append('password', 'ValidPass123!')
        formData.append('confirmPassword', 'ValidPass123!')

        const result = await signup({}, formData) as FormState

        expect(result.errors?.email).toContain('Please enter a valid email address.')
    })
    it('should return an error if the password is too short', async () => {
        const formData = new FormData()
        formData.append('email', 'test@gym.com')
        formData.append('password', '123')
        formData.append('confirmPassword', '123')

        const result = await signup({}, formData) as FormState

        expect(result.errors?.password).toContain('Password must be at least 8 characters long.')
    })
    it('should return an error if the password does not container a number', async () => {
        const formData = new FormData()
        formData.append('email', 'test@gym.com')
        formData.append('password', 'Password!')
        formData.append('confirmPassword', 'Password!')

        const result = await signup({}, formData) as FormState

        expect(result.errors?.password).toContain('Password must contain at least one number.')
    })
    it('should return an error if the password does not contain a letter', async () => {
        const formData = new FormData()
        formData.append('email', 'test@gym.com')
        formData.append('password', '12345678')
        formData.append('confirmPassword', '12345678')

        const result = await signup({}, formData) as FormState

        expect(result.errors?.password).toContain('Password must contain at least one letter.')
    })
})