### rust like match in javascript
This is just a little experiment, not very useful!
I really liked Rusts `match` and so this is an attempt to kind of emulate it using JS.

#### Usage
```javascript
import match, { T, V }

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

// No matches, fall back to default with _()
const someString = 'this is a string yo!'
const value3 = match(someNumber, {
  T(Number)(v => 'type was Number!'),
  T(Function)(v => 'type was not a function!'),
  _(v => 'default!')
})
console.log(value3) // will print "default!"
```
