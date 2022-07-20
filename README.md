### rust like match in javascript
This is just a little experiment, not very useful!
I really liked Rusts `match` and so this is an attempt to kind of emulate it using JS.

#### Usage
```javascript
import match, { T, V, _, Some } from 'rust-match'

// Equality matching with V()
const someValue = 1
const value = match(someValue, 
  // V will match against the actual value passed as the first argument to match
  V(1)(v => '1 matched someValue'),
  V(2)(v => 'this does not match someValue'),
)
console.log(value) // will print "1 matched someValue"

// Type matching with T()
const someNumber2 = 1
const value2 = match(someNumber2, {
  T(Number)(v => 'type was Number!'),
  T(Function)(v => 'type was not a function!')
})
console.log(value2) // will print "type was Number!"

// Match expressions
const someNumber3 = 1
const value4 = match(someNumber3, {
  Some(v => v + 1 === 2)('matched expression!'),
  // This will also match, but only the first matching branch will be used
  // so this will be ignored
  V(1)(v => 'matched value 1'),
  V(2)(v => 'matched value 2')
})
console.log(value3) // will print "default!"

// No matches, fall back to default with _()
const someString = 'this is a string yo!'
const value3 = match(someNumber, {
  T(Number)(v => 'type was Number!'),
  T(Function)(v => 'type was not a function!'),
  _(v => 'default!')
})
console.log(value3) // will print "default!"

```
