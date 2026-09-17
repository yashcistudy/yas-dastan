/** Persian digits, used for counters and indexes. */
const PERSIAN = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => PERSIAN[Number(digit)])
}

export function twoDigits(value) {
  return toPersianDigits(String(value).padStart(2, '0'))
}
