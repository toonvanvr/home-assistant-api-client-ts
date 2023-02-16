# Home Assistant API Client

Unofficial WebSocket and HTTP REST API client for Home Assistant written in TypeScript

**Project Status:** Working towards initial release

## Design Goals

- [ ] Simple to use without documentation
- [ ] Highly extensible for power users
- [ ] Strict in terms of typing and following official specifications
- [ ] Supporting all platforms: Node, Deno, Bun, browsers
- [ ] Avoid external dependencies where possible
- [ ] Fully tested
- [ ] Automated release pipeline
- [ ] Uses modern TypeScript features
- [ ] Handle all error cases with a description and cause

## Design

### No configuration required for default setups

Defaults to [`homeassistant.local`](https://homeassistant.local)

```typescript
import { HAApiClient as HomeAssistant } from "ha-api-client"

const ha = new HomeAssistant({
  accessToken: 'xxxxxxxxxxxxxxxxxxxxxxx'
})
```

### Fully configurable

```typescript
// TODO
```
