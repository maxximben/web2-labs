import { HttpService } from './HttpService'
import { LaureatesService } from './LaureatesService'
import { PrizesService } from './PrizesService'

const http = new HttpService('https://api.nobelprize.org/2.1')

export const prizesService = new PrizesService(http)
export const laureatesService = new LaureatesService(http)
