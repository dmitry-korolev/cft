import path from 'path'

export const dbPath =
  process.env.NODE_ENV === 'production'
    ? (filename: string) => path.join(__dirname, 'db', filename)
    : (filename: string) => path.join('db', filename)
