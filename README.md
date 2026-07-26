# Neuroeconomics — Interactive 3D Brain

An interactive 3D atlas of the brain regions studied in neuroeconomics —
the field applying neuroscience to decision-making, value, and choice.
Click a region to see it highlighted on a real segmented anatomical mesh,
read its role, and follow every cited paper straight to its DOI.

## What it does

- Twelve regions central to neuroeconomics (vmPFC, OFC, DLPFC, TPJ, SMA,
  VTA, ACC, PCC, NAcc, Caudate, Insula, Amygdala) — click one in the
  sidebar, or click/hover its highlighted piece directly on the brain.
- The camera flies to whatever you select and ghosts the rest of the
  brain so the target stands out.
- **Explode view** — breaks all 76 segmented anatomical pieces apart
  along threads radiating from the centre, then reassembles them.
- Every cited paper links to its verified DOI; every region links back
  to [`neuroeconomics-research.md`](neuroeconomics-research.md), the
  source notes this app is built from.
- Light and dark themes, persisted locally.
- See [`ANATOMY.md`](ANATOMY.md) for exactly which regions are real
  anatomical structures versus hand-verified approximations, and how
  the whole pipeline fits together.

## Tech stack

- [Three.js](https://threejs.org/) via
  [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) and
  [drei](https://github.com/pmndrs/drei)
- [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
  for the glow/bloom effect on highlighted regions
- React + TypeScript, built with [Vite](https://vitejs.dev/)
- Mesh built from [BodyParts3D](http://lifesciencedb.jp/bp3d/)
  (CC BY-SA 2.1 Japan) via a Python/trimesh pipeline — see
  [`assets/source/build_segmented_brain.py`](assets/source/build_segmented_brain.py)

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
  components/   Scene, mesh, camera, sidebar panel, loading screen
  lib/           Region and paper data, brain-part lookups, theme
assets/source/   Mesh build pipeline (not needed to run the app)
public/          Final compressed brain.glb the app actually loads
neuroeconomics-research.md   Source notes: regions, roles, cited papers
ANATOMY.md       Full breakdown of every mesh piece and how it maps to a region
```

## Roadmap

Done this pass:

- ✅ Real segmented anatomical mesh (76 named pieces), not a placeholder
- ✅ Explode view with connecting threads
- ✅ Camera fly-to per region, with an opening approach shot on load
- ✅ Light/dark theme
- ✅ Every paper linked to a verified DOI; books/reviews linked to a
  stable catalogue page

Still open:

- Putamen and globus pallidus are already separate pieces in the mesh
  but not yet mapped to a region — a "basal ganglia loop" region would
  be free to add.
- A circuit view: selecting a region could also glow the other regions
  the cited papers describe it as functionally connected to (e.g. the
  VTA → NAcc → vmPFC reward pathway).
- A guided "tour" mode that auto-cycles through all 12 regions.

## License

[MIT](LICENSE)
