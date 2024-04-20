import fs from 'fs'
import path from 'path'

export const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')
