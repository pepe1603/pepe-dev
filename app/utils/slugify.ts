export const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .normalize('NFD')                 // elimina acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')     // solo letras, números, espacios
    .trim()
    .replace(/\s+/g, '-')             // espacios → -
    .replace(/-+/g, '-')              // evita --
}
