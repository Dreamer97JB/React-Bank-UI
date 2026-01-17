import { type ApiError } from '../types/domain'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''
export const apiBaseUrl = rawBaseUrl.endsWith('/')
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl

const mockBaseUrl = '/mocks'

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const response = await fetch(`${apiBaseUrl}${normalizedPath}`, {
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

export async function requestJson<T>(path: string) {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return (await response.json()) as T
}

export function isNetworkError(error: unknown) {
  if (error instanceof TypeError) {
    return true
  }

  if (error instanceof Error) {
    return /failed to fetch|networkerror|load failed/i.test(error.message)
  }

  return false
}

export async function requestWithFallback<T>(
  path: string,
  options: RequestInit = {},
  fallbackFile?: string
) {
  if (!apiBaseUrl && fallbackFile) {
    return requestJson<T>(`${mockBaseUrl}/${fallbackFile}`)
  }

  try {
    return await apiRequest<T>(path, options)
  } catch (error) {
    if (fallbackFile && isNetworkError(error)) {
      return requestJson<T>(`${mockBaseUrl}/${fallbackFile}`)
    }
    throw error
  }
}
