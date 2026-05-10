const BASE = 'https://dummyjson.com'

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
