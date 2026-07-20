# Neuroeconomics — Interactive 3D Brain

An interactive 3D brain visualization built with Three.js. Regions
implicated in value-based decision-making — drawn from a running
collection of neuroeconomics research notes — light up on the mesh
and surface the papers behind them.

> **Status: early prototype.** The brain itself is a placeholder
> ellipsoid with markers at approximate MNI coordinates. See
> [Roadmap](#roadmap) for the plan to swap in an anatomically
> segmented mesh.

## What it does

- Click a region in the sidebar (vmPFC, OFC, DLPFC, TPJ, SMA, VTA,
  ACC, PCC, NAcc, Caudate, Insula, Amygdala) to highlight it on the
  3D brain and read its role in value-based decision-making.
- Each region links back to the source research in
  [`neuroeconomics-research.md`](neuroeconomics-research.md).

## Tech stack

- [Three.js](https://threejs.org/) via
  [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) and
  [drei](https://github.com/pmndrs/drei)
- [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
  for the glow/bloom effect on active regions
- React + TypeScript, built with [Vite](https://vitejs.dev/)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Before committing changes:

```bash
npm run lint
npm run typecheck
```

## Project structure

```
src/
  components/   Scene, mesh, markers, and sidebar panel
  lib/           Region data and the MNI-to-scene coordinate mapping
neuroeconomics-research.md   Source notes: regions, roles, and cited papers
```

## Roadmap

- Replace the placeholder ellipsoid with a real anatomical mesh —
  likely [Z-Anatomy](https://www.z-anatomy.com/) for structural
  regions (amygdala, insula, cingulate, caudate, brainstem/VTA),
  which ship as individually named, segmented objects.
- Highlight structural regions via their actual sub-mesh instead of
  a surface marker; keep the marker approach for cortical/functional
  regions (vmPFC, dlPFC, OFC, TPJ) that have no discrete anatomical
  boundary.
- Camera fly-to on region select.

## License

[MIT](LICENSE)
