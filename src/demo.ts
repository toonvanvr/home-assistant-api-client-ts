import { HaApiClient } from './core/ha-api-client.ts'
import { HaAuthToken } from './model/ha.types.ts'

const ha = new HaApiClient({
  accessToken: Deno.env.get('HA_ACCESS_TOKEN') as HaAuthToken,
  url: Deno.env.get('HA_ACCESS_TOKEN') as string,
})

const resp = await ha.ws.send({
  type: 'ping',
})

console.log(resp)
