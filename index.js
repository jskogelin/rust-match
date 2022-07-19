export default function match (matchTarget, ...branches) {
  let matchingResultHandler
  let defaultBranch

  for (const branch of branches) {
    const matchingBranch = branch(matchTarget)

    if (matchingBranch) {
      matchingResultHandler = matchingBranch
    } else if (branch.default) {
      defaultBranch = branch(matchTarget)
    }
  }

  // Default to default branch if one is found
  if (defaultBranch && !matchingResultHandler) {
    matchingResultHandler = defaultBranch
  }

  if (!matchingResultHandler) {
    throw new Error(`No matching branch found for ${matchTarget}!`)
  } else {
    return matchingResultHandler(matchTarget)
  }
}

export function T (comparatorType) {
  return (resultFn) => {
    // Comparator
    return (actualType) => {
      const resultHandler = () => resultFn(actualType, comparatorType)
      // If the type of value matches type, return a function
      // which runs the result handler
      if (comparatorType === Number && typeof actualType === 'number') {
        return resultHandler
      }
    }
  }
}

export function V (comparatorValue) {
  return (resultFn) => {
    // Comparator
    return (actualValue) => {
      const resultHandler = () => resultFn(actualValue, comparatorValue)
      // If the type of value matches type, return a function
      // which runs the result handler
      if (comparatorValue === actualValue) {
        return resultHandler
      }
    }
  }
}

function defaultHandler (handler) {
  this.defaultBranch = true

  return (matchTarget) => {
    return () => handler(matchTarget)
  }
}

export const _ = defaultHandler.bind({})
