import fs from 'fs'
import path from 'path'

const a = '/vercel/share/v0-project'
const b = '/vercel/share/v0-next-shadcn'

try {
  const realA = fs.realpathSync(a)
  const realB = fs.realpathSync(b)
  console.log('v0-project realpath:', realA)
  console.log('v0-next-shadcn realpath:', realB)
  console.log('Same path?', realA === realB)

  const statA = fs.statSync(a)
  const statB = fs.statSync(b)
  console.log('v0-project inode:', statA.ino)
  console.log('v0-next-shadcn inode:', statB.ino)
  console.log('Same inode?', statA.ino === statB.ino)

  // Check if v0-next-shadcn is a symlink
  const lstatB = fs.lstatSync(b)
  console.log('v0-next-shadcn is symlink?', lstatB.isSymbolicLink())
  if (lstatB.isSymbolicLink()) {
    console.log('symlink target:', fs.readlinkSync(b))
  }

  // Check a specific file in both to see if they're in sync
  const pkgA = fs.readFileSync(path.join(a, 'examples/ai-tools-example/package.json'), 'utf8')
  const pkgB = fs.readFileSync(path.join(b, 'examples/ai-tools-example/package.json'), 'utf8')
  console.log('\nai-tools-example/package.json same content?', pkgA === pkgB)
  console.log('\n--- v0-project version ---')
  const scriptsA = JSON.parse(pkgA).scripts
  console.log('scripts:', JSON.stringify(scriptsA, null, 2))
  console.log('\n--- v0-next-shadcn version ---')
  const scriptsB = JSON.parse(pkgB).scripts
  console.log('scripts:', JSON.stringify(scriptsB, null, 2))
} catch (e) {
  console.error('Error:', e.message)
}
