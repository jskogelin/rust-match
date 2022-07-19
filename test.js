import match, { V, T, _ } from './index.js'
import assert from 'assert'

const g = (s) => console.log(`\x1b[32m ${s} \x1b[0m`)
const it = (s) => process.stdout.write(`\x1b[33m ${s} \x1b[0m`)
const c = (s) => console.log(`✅ `)

const value = 1

it('should match a type')
const test = match(value,
  // V(1)(val => 'one'),
  T(Error)(err => 'error'),
  T(Number)(err => 'matched a number'),
)
assert(test === 'matched a number')
c()




it('should match a value')
const test2 = match(value,
  T(Error)(err => 'error'),
  V(1)(v => `matched value ${v}`),
)
assert(test2 === 'matched value 1')
c()



it('should default')
const defaultTest = match(value,
  T(Error)(err => 'error'),
  V(2)(v => `matched value ${v}`),
  _(v => 'matched default!')
)
assert(defaultTest === 'matched default!')
c()

it('should throw an error if no branch matches')
let errorTest
try {
  match(value,
    T(Error)(err => 'error'),
    V(2)(v => `matched value ${v}`)
  )
} catch (err) {
  errorTest = err
}

assert(errorTest instanceof Error)
c()
console.log('\x1b[32m Success! \x1b[0m 🎉')
