const BASE = 'https://dummyjson.com'
const API_BASE = import.meta.env.VITE_API_URL || getDefaultApiBase()

function getDefaultApiBase() {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://bani-backend.onrender.com/api'
  }

  return 'http://localhost:5000/api'
}

async function request(path, options = {}) {
  const token = localStorage.getItem('bani-token')
  let res

  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Не удалось подключиться к серверу. Проверьте, что backend запущен и указан VITE_API_URL.')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const validationMessage = Array.isArray(data.errors) ? data.errors[0]?.msg : ''
    throw new Error(getRussianApiError(validationMessage || data.message))
  }

  return data
}

function getRussianApiError(message) {
  const messages = {
    'API request failed': 'Ошибка запроса к серверу',
    'Email is already registered': 'Этот email уже зарегистрирован',
    'Invalid email or password': 'Неверный email или пароль',
    'Valid email is required': 'Введите корректный email',
    'Password is required': 'Введите пароль',
    'Password must be at least 6 chars': 'Пароль должен быть не короче 6 символов',
    'Name must be 2-80 chars': 'Имя должно быть от 2 до 80 символов',
    'Phone is too long': 'Телефон слишком длинный',
    'Not authorized, token failed': 'Сессия истекла. Войдите снова',
    'Not authorized, no token': 'Войдите в аккаунт',
  }

  if (!message) return messages['API request failed']
  return messages[message] || message
}

export async function getProducts(limit = 6) {
  const res = await fetch(`${BASE}/products?limit=${limit}`)
  if (!res.ok) throw new Error('Не удалось загрузить каталог')
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Товар не найден')
  return res.json()
}

export async function getUsers(limit = 3) {
  const res = await fetch(`${BASE}/users?limit=${limit}`)
  if (!res.ok) throw new Error('Не удалось загрузить специалистов')
  return res.json()
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getCurrentUser() {
  return request('/auth/me')
}
