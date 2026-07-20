---
name: react-threejs-standards
description: Code standards for all React and Three.js (react-three-fiber) code in this repo. Load before writing or reviewing any component, hook, or scene code here.
---

# React + Three.js standards for neuroeconomics

The overriding rule: **the least code that solves the problem.** Every component, hook, and prop earns its place. When two designs work, pick the one with fewer concepts, fewer layers, fewer lines. No speculative abstraction: no context, wrapper, or config system built for a future that hasn't arrived.

## Naming

- Descriptive names, full words: `participantCount`, not `x` or `cnt`. Names must sound natural read aloud; if a name needs decoding, rename it.
- Components: `PascalCase` nouns (`TrialTimeline`, `BrainMesh`). Hooks: `camelCase` starting with `use` (`useTrialData`). Files match their default export's name.
- Booleans read as predicates: `isLoading`, `hasError`, not `loading`, `error` (reserve those for the value itself).
- Event handlers: `onX` prop, `handleX` implementation (`onSelect` prop calls `handleSelect` internally).
- No abbreviations unless universal (`id`, `ref`, `idx` in a tight loop only).

## Comments

- Comments explain **why**, never what. If a comment describes what the next line does, delete it and make the code clearer instead.
- No section-title or banner comments (`// ---- helpers ----`). Structure comes from file layout and component boundaries, not headings.
- Exported hooks and components get a one-line doc comment only when usage isn't obvious from the signature and prop types.
- If a component needs a paragraph of explanation, the design is wrong. Split it or fix the data flow.

## Components

- One responsibility per component. If the name needs "and," split it.
- Small enough to read without scrolling past ~150 lines. Extract a child component or hook when JSX nests past three levels or logic outgrows rendering.
- Presentation and data-fetching are separate: a component either renders props, or a hook fetches/derives data — not both tangled in one body.
- Props are a flat, typed interface. No prop that's secretly three different shapes behind `any`.
- Prefer composition (children, render props only when genuinely needed) over configuration objects with many optional flags.

## Hooks

- Follow the Rules of Hooks; no conditional or looped hook calls.
- Custom hooks return the smallest useful shape: a value, or `{ data, isLoading, error }` — not a grab-bag of unrelated state.
- `useEffect` is a last resort, not a default. Prefer derived state, event handlers, or a library's built-in data layer. Every effect needs a dependency array that's actually correct — no `// eslint-disable` to silence it.
- Memoize (`useMemo`, `useCallback`) only when a measured re-render cost justifies it, not by default.

## Types

- Model the domain with types and unions; no magic strings or numbers. A trial phase is a union of literals, not a free-form `string`.
- Every component's props are an explicit `interface` or `type`, not inferred from destructuring.
- No `any`. `unknown` plus a narrowing check when the shape is genuinely unknown at that boundary.

## State

- State lives as close to where it's used as possible. Lift only when two siblings genuinely need to share it.
- Derive, don't duplicate: if a value can be computed from existing state/props during render, compute it — don't store it separately and sync with an effect.
- Global state (context, store) only for values truly global to the app (theme, session, auth) — not as a shortcut around prop drilling two levels deep.

## Three.js / react-three-fiber

- Scene graph mirrors the JSX tree: one component per meaningful mesh/group, not one giant `useEffect` building the scene imperatively.
- Geometries, materials, and loaded assets (`useLoader`, `useGLTF`) are created once and reused — never recreated inside the render loop or on every render.
- `useFrame` callbacks do the minimum per-frame work (transform updates, uniform updates); no allocation of new objects (`new Vector3()`, `new Color()`) inside the callback — allocate once with `useRef` or `useMemo` and mutate in place.
- Dispose what you create: geometries, materials, and textures allocated outside R3F's managed tree are cleaned up in a `useEffect` return, or left to R3F's automatic disposal by not bypassing it.
- Keep physics/animation state (positions, rotations) in refs mutated per-frame, not in React state — React state re-renders are for UI, not for 60fps transforms.

## Errors & loading

- Async data (models, trial data, textures) has explicit loading and error states surfaced to the user — never a silent blank scene.
- Wrap Three.js scenes likely to fail (bad asset URL, WebGL context loss) in an error boundary; never let a scene crash the whole app.

## Idiom

- Array methods (`map`, `filter`, `reduce`) over manual loops when building JSX or derived data.
- Ternaries for simple two-way JSX branches; extract to a variable or early return when a ternary would nest or wrap.
- Destructure props at the function signature, not line-by-line inside the body.
- Prefer named exports for components in a shared module; default export only for a file's single, obvious primary component.

## Architecture

- Flat until it hurts: start with `components/`, `hooks/`, `lib/`; split further only when a folder exceeds ~10 files or a real domain boundary appears (e.g. `scene/` vs `ui/`).
- Data fetching and transforms live in hooks or `lib/`, never inline in a component body beyond a single clear call.
- Dependencies are a cost. Justify each one; prefer what React and `three` already give you before reaching for a new library.

## Gates

Code isn't done until all pass clean:

```
npm run lint
npm run typecheck
npm test
```

Every rule the linter can enforce should be a lint rule, not a review comment repeated by hand.
