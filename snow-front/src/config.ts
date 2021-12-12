import * as dotenv from 'dotenv'

const configPath = process.env.CONFIG_PATH || './env/.env'
console.log(`Loading environment config from '${configPath}'...`)
dotenv.config({ path: configPath } )
class Config {
  public serverUrl = process.env.SERVER_URL || 'https://snowboard-school.herokuapp.com/api'
}

const singleton = new Config()
export default singleton