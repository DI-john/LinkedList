export function throwsOnTrue(cbFn, thisArg) {
  return function wrappedCbFn(value) {
    if(cbFn.call(thisArg, value)) {
      throw value;
    }
  }
}

export function throwsOnFalse(cbFn, thisArg) {
  return function wrappedCbFn(value) {
    if(!cbFn.call(thisArg, value)) {
      throw value;
    }
  }
}

export function accumulatesMatches(cbFn, thisArg, accum) {
  return function wrappedCbFn(value) {
    if(cbFn.call(thisArg, value)) {
      accum.push(value)
    }
  }
}
