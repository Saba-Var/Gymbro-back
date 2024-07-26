export const getRandomEnumValue = <
  T extends { [key: string]: string | number },
>(
  enumObject: T
): T[keyof T] => {
  const enumValues = Object.values(enumObject)
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex] as T[keyof T]
}
