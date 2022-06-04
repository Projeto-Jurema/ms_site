export const logger = {
  error: (data: any) => console.error(data),

  info: (data: any) => console.log(data),

  warn: (data: any) => console.warn(data),

  beautify: (data: any) => JSON.stringify(data, null, 2),
}
