import { QrCodePix } from 'qrcode-pix'

export const gen = async ({ value, name }: { value: number; name: string }) => {
  const qrCodePix = QrCodePix({
    version: '01',
    key: process.env.PIX_KEY as string,
    name,
    city: 'SAO PAULO',
    message: 'Contribuição para o Projeto Jurema',
    cep: '13860606',
    value,
  })

  return { QRCode: await qrCodePix.base64(), copyCode: qrCodePix.payload() }
}
