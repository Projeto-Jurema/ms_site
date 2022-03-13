export const logger = {
  error: (data: string) => console.error(data),

  info: (data: string) => console.log(data),

  warn: (data: string) => console.warn(data),

  beautify: (data: any) => JSON.stringify(data, null, 2),
}
