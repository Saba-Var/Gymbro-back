import { padToTwoDigits } from 'utils/numbers.util'

export const getDateSegments = (date?: Date) => {
  const now = date || new Date()

  const day = now.getDay()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  return { day, month, year, hours, minutes, seconds }
}

export const generateFileDateName = (): string => {
  const now = new Date()

  const dateSegments = getDateSegments(now)

  const day = padToTwoDigits(dateSegments.day)
  const month = padToTwoDigits(dateSegments.month)
  const year = dateSegments.year.toString().slice(-2)
  const hours = padToTwoDigits(dateSegments.hours)
  const minutes = padToTwoDigits(dateSegments.minutes)
  const seconds = padToTwoDigits(dateSegments.seconds)

  const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`

  return formattedDate
}
