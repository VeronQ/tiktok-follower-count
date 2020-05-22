/**
 *
 * @param time
 * @returns {string}
 */
export const getTime = (time = new Date()) => {
  return `${time.getHours().toString().padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)}:${time.getSeconds().toString().padStart(2, 0)}`
}
