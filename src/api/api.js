const BASE = 'https://dummyjson.com'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('bani-token')
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
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
