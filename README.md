# omniFFold - city_block_combined_prototype

This prototype includes:
- Python pipeline for pedestrian detection and contrail tracking
- Edge and object detection overlays
- Point cloud and Gaussian splat generation
- Viewer setups for Unity, Blender, and Three.js

## Setup Instructions
1. Install Python dependencies in `pipeline/requirements.txt`
2. Run the pipeline on sample data in `data/`
3. Open visualizers in `viewers/` to explore outputs

Compatible with MOTChallenge and PETS2009 datasets.

>
city_block_combined_prototype/
├── data/                  # MOT/PETS datasets
    └── npc_block_config.json   ← make sure this file exists
├── pipeline/              # Python tracking + rendering
├── viewers/
│   ├── unity/             # Unity project
│   ├── blender/           # .blend file + assets
│   └── threejs/           # Web viewer
├── output/                # Exports: contrails, splats, PLY
└── README.md              # Full setup + usage guide
>
city_block_combined_prototype/
└── data/
    └── npc_block_config.json   ← make sure this file exists
