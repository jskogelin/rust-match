import match, { V, T, _, Some } from './index.js'
import assert from 'assert'

const g = (s) => console.log(`\x1b[32m ${s} \x1b[0m`)
const it = (s) => process.stdout.write(`\x1b[33m ${s} \x1b[0m`)
const c = (s) => console.log(`✅ `)
const f = (s) => console.log(`🚨 ohhhhh shit `)
const asrt = b => {
  try {
    assert(b)
  } catch (err) {
    f()
    throw err
  }
  c()
}

const value = 1

it('should match a type')
const test = match(value,
  // V(1)(val => 'one'),
  T(Error)(err => 'error'),
  T(Number)(err => 'matched a number'),
)
asrt(test === 'matched a number')




it('should match a value')
const test2 = match(value,
  T(Error)(err => 'error'),
  V(1)(v => `matched value ${v}`),
)
asrt(test2 === 'matched value 1')



it('should default')
const defaultTest = match(value,
  T(Error)(err => 'error'),
  V(2)(v => `matched value ${v}`),
  _(v => 'matched default!')
)
asrt(defaultTest === 'matched default!')





it('should match by expression')
const expressionTest = match(value,
  Some(v => v + 1 === 2)(v => 'expression 1 matched!'),
  // This will also match, but it is later in the chain of branches and should be ignored
  V(2)(v => 'value 2 matched!')
)
asrt(expressionTest === 'expression 1 matched!')



it('should return first matching branch')
const breakTest = match(value,
  V(1)(v => 'first'),
  V(1)(v => 'second')
) 
asrt(breakTest === 'first')


// No??
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

asrt(errorTest instanceof Error)
console.log('\x1b[32m Success! \x1b[0m 🎉')
