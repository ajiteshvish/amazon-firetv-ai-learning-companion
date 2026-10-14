# Architecture

This repository keeps Amazon's multi-TV monorepo architecture so shared React Native code can serve both Fire OS and Vega OS while platform-specific code remains isolated where required.

```text
Fire TV / Vega React Native app
             |
             v
        Backend API
             |
             v
 timestamp + transcript context
             |
             v
 AI layer (FUTURE WORK)
             |
             v
 contextual response back to TV
```

## Current scope

- `apps/expo-multi-tv`: Amazon's cross-platform React Native TV app for Fire OS, Android TV, Apple TV, and web.
- `apps/vega`: Amazon's Vega OS React Native app.
- `apps/api`: Minimal TypeScript/Fastify API with a health endpoint.
- `packages/shared-ui`: Shared TV UI from the Amazon starter.
- `packages/shared-types`: Small, platform-neutral TypeScript contracts shared with the API.

## Platform boundaries

Shared screens, components, and types should remain in packages whenever their behavior is truly common. Platform-specific integrations should stay in their respective app and use the starter's platform file resolution conventions when appropriate.

## Future work

The AI layer, timestamp/transcript processing, and all AWS integrations are explicitly **FUTURE WORK**. This bootstrap does not select an AI provider, AWS service, database, authentication system, transcript pipeline, or vector store.
