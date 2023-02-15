import { HARestClient } from "./ha-rest-client"
import { HAWebSocketClient } from "./ha-websocket-client"

export class HAApiClient {
  private ws = new HAWebSocketClient()
  private rest = new HARestClient()
}
