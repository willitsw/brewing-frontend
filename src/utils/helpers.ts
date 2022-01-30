// Check if input could be parsed to a number
export const isNumber = (value: any) => isNaN(Number(value)) === false;

// Turn enum into array - this might not work...
export function enumToArray(testEnum: any) {
  return Object.keys(testEnum)
    .filter(isNumber)
    .map((key) => testEnum[key]);
}

export function deepCloneObject(objectToClone: any) {
  return JSON.parse(JSON.stringify(objectToClone));
}
