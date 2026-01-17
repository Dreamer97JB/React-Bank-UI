import { type ApiError } from '../types/domain'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''
const baseUrl = rawBaseUrl.endsWith('/')
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const response = await fetch(`${baseUrl}${normalizedPath}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    let errorMessage = response.statusText

    try {
      const payload = (await response.json()) as ApiError
      if (payload?.message) {
        errorMessage = payload.message
      }
    } catch {
      // Ignore JSON parsing errors and fall back to status text.
    }

    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return null as T
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return (await response.json()) as T
  }

  return (await response.text()) as unknown as T
}
