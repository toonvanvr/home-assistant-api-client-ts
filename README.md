# Home Assistant API Client

Unofficial WebSocket and HTTP REST API client for Home Assistant written in TypeScript

**Project Status:** Working towards initial release

## Design Goals

- [ ] Simple to use without documentation
- [ ] Highly extensible for power users
- [ ] Strict in terms of typing and following official specifications
- [ ] Supporting all platforms: Node, Deno, Bun, browsers

## Design

### No configuration required for default setups

Defaults to [`homeassistant.local`](https://homeassistant.local)

```typescript
const ha = new HomeAssistant()
```

### Fully configurable

```typescript
// TODO
```