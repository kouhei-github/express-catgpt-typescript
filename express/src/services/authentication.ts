import * as crypto from 'crypto'
import * as process from 'process'

const SECRET = process.env.SECRET_KEY_GENERATE

export const random = () => crypto.randomBytes(128).toString("base64")
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac("sha256", [salt, password].join("/")).update(typeof SECRET === "undefined" ? "" : SECRET ).digest("hex")
}
