import { BitlyClient } from 'bitly'

const { BITLY_TOKEN } = process.env

const bitly = new BitlyClient(BITLY_TOKEN as string)

export default bitly
