# RoadGuard

**Intelligent Road Safety & Hazard Reporting System**

RoadGuard is a student engineering project exploring how low-cost hardware, software, and data analysis can help detect potential road hazards, share location-based reports, and improve driver awareness.

> **Project status:** Prototype / Under Development

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [Project Goals](#project-goals)
- [Planned Features](#planned-features)
- [System Architecture](#system-architecture)
- [Hardware Concept](#hardware-concept)
- [Software Stack](#software-stack)
- [Enclosure Specifications](#enclosure-specifications)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Development Roadmap](#development-roadmap)
- [Limitations and Safety](#limitations-and-safety)
- [Documentation Website Requirements](#documentation-website-requirements)
- [License](#license)

---

## Overview

RoadGuard aims to develop a low-cost system that identifies possible road hazards using motion sensor data and location information.

The system is designed around three main components:

1. **Hardware:** Collects motion data from a sensor mounted inside a vehicle.
2. **Software:** Processes sensor readings to identify unusual events and estimate their confidence.
3. **Reporting interface:** Displays reported events on a map so users can review potential hazards.

A future version may explore crash-event detection and emergency notification workflows. These capabilities require extensive testing and must not be treated as reliable emergency services without proper validation.

## The Problem

Road hazards such as potholes, damaged road surfaces, and unexpected impacts can create risks for drivers and passengers.

However, road hazard information may be incomplete, outdated, or difficult to access while travelling.

RoadGuard explores whether affordable sensors and collaborative reporting can help identify potential hazards and make their locations easier to communicate.

## Project Goals

- Build an affordable hardware prototype.
- Collect and analyze motion sensor readings.
- Associate detected events with GPS coordinates.
- Display potential hazards on a map.
- Investigate ways to reduce false reports using repeated observations.
- Evaluate the system under controlled, safe conditions.
- Create a clear and maintainable software architecture.

## Planned Features

### 1. Road Event Detection

Analyze accelerometer and gyroscope readings to identify unusual vehicle motion that may correspond to road irregularities.

The first implementation should use interpretable thresholds and recorded sample data before attempting machine learning.

### 2. Location-Based Reporting

Attach GPS coordinates and timestamps to detected events.

A map interface can display event locations and relevant report information.

### 3. Confidence-Based Verification

Assign confidence scores to reports using measurable evidence, such as:

- Sensor signal strength.
- Repeated detections near the same location.
- Agreement between separate observations.
- Available contextual information.

A confidence score must not be presented as proof that a hazard exists.

### 4. Driver Alerts

A future interface may notify drivers about relevant nearby reports. Alert timing, accuracy, and usability must be tested before practical road use.

### 5. Crash-Event Research

Investigate whether sensor data can distinguish potential severe impacts from ordinary driving events.

This is an experimental feature. It must not automatically claim that a crash occurred or replace emergency services.

---

## System Architecture

The proposed architecture separates hardware collection, event analysis, data storage, and visualization.

```text
Vehicle Motion
      |
      v
ESP32 + MPU6050
      |
      v
Sensor Data Collection
      |
      v
Python Event Analysis
      |
      v
Location-Tagged Event
      |
      v
Backend API + Database
      |
      v
Web Dashboard + Map
```

### Component Responsibilities

| Component | Responsibility |
|---|---|
| ESP32 | Collect sensor readings and handle embedded-device tasks |
| MPU6050 | Measure acceleration and angular velocity |
| GPS source | Provide event coordinates and timestamps |
| Python | Process data and evaluate detection rules |
| Backend API | Validate, store, and serve reports |
| Database | Store reports, locations, timestamps, and verification data |
| Web interface | Display events and provide user-facing controls |

The architecture is provisional and may change as the prototype is tested.

## Hardware Concept

The initial hardware concept includes:

- **ESP32:** Microcontroller for collecting and transmitting sensor readings.
- **MPU6050:** Accelerometer and gyroscope for measuring motion.
- **GPS source:** A smartphone GPS source may be used during early development to reduce hardware complexity.
- **OLED display:** Optional small display for local status information.
- **Power input:** Power connection appropriate for the selected hardware.
- **Enclosure:** A protective housing designed around the final component dimensions.

Component selection and mounting arrangements must be verified before manufacturing.

---

## Software Stack

### Current Prototype Tools

| Technology | Purpose |
|---|---|
| Python | Geometry generation and future sensor-data processing |
| `trimesh` | Programmatic 3D mesh construction |
| `manifold3d` | Boolean geometry operations |
| STL | Portable 3D model export format |

### Proposed Application Technologies

These technologies are candidates for the software system and should not be considered implemented until the corresponding code exists.

| Technology | Proposed role |
|---|---|
| Django REST Framework | Backend API |
| SQLite | Early development database |
| PostgreSQL | Potential production database |
| React | Web dashboard |
| Map library | Visualization of reported hazard locations |
| NumPy | Numerical processing of sensor readings |
| scikit-learn | Optional model experimentation when sufficient data is available |

---

## Enclosure Specifications

The initial RoadGuard enclosure is a parameterized structural model intended for prototyping.

| Parameter | Specification |
|---|---:|
| Outer width | 120 mm |
| Outer depth | 80 mm |
| Outer height | 40 mm |
| Wall thickness | 2 mm |
| Floor thickness | 2 mm |
| OLED opening | 25 × 10 mm |
| Power cable opening | 5 mm diameter |
| Screw holes | 3 mm nominal diameter |

### Enclosure Design Requirements

- Hollow internal cavity.
- Open top for access to the internal components.
- Front opening for the OLED display.
- Rear opening for the power cable.
- Lid-supporting lip or ledge.
- Screw holes positioned to support a compatible lid design.
- Exportable STL model for inspection and prototype fabrication.

**Important:** The enclosure is a preliminary design. The lid, screw positions, clearances, component mounting points, and cable routing must be verified against the actual hardware before fabrication.

### Generate the STL Model

Install the required Python dependencies:

```bash
python -m pip install trimesh manifold3d
```

Run the model generator:

```bash
python roadguard_enclosure.py
```

The expected output is:

```text
roadguard_enclosure.stl
```

The generated STL can be opened in a compatible 3D viewer or CAD application.

---

## Repository Structure

The repository may follow this structure as the project develops:

```text
RoadGuard/
├── README.md
├── index.html
├── main.css
├── index.js
├── roadguard_enclosure.py
├── roadguard_enclosure.stl
├── hardware/
│   ├── README.md
│   └── diagrams/
├── software/
│   ├── backend/
│   ├── frontend/
│   └── sensor_analysis/
├── data/
│   └── README.md
└── docs/
    ├── architecture.md
    ├── hardware.md
    └── testing.md
```

This is a suggested structure, not a claim that every directory or file already exists.

Generated files, dependencies, secrets, private data, and unnecessary large datasets should be excluded from version control where appropriate.

---

## Getting Started

### Requirements

- Python 3.10 or newer is recommended for the initial Python tools.
- `pip` for installing Python dependencies.
- A compatible STL viewer for inspecting the enclosure.
- A code editor for modifying the source files.

### Run the Enclosure Generator

1. Clone or download the repository.
2. Open a terminal in the project directory.
3. Install `trimesh` and `manifold3d`.
4. Run `roadguard_enclosure.py`.
5. Open the resulting STL file in a 3D viewer.
6. Verify the dimensions and openings before using the model for fabrication.

The web documentation page can be opened directly through `index.html` when its required files are present.

---

## Development Roadmap

### Phase 1 — Structural Prototype

- [ ] Finalize the enclosure geometry.
- [ ] Validate the STL mesh.
- [ ] Check component fit and cable clearances.
- [ ] Prepare the initial hardware layout.

### Phase 2 — Sensor Data Collection

- [ ] Read data from the MPU6050.
- [ ] Record sample sensor measurements.
- [ ] Collect safe, controlled examples of ordinary motion and simulated road events.
- [ ] Document sensor orientation and mounting conditions.

### Phase 3 — Event Analysis

- [ ] Implement an initial threshold-based detector.
- [ ] Test it against recorded sample data.
- [ ] Measure false positives and missed detections.
- [ ] Investigate whether more advanced classification is justified.

### Phase 4 — Reporting Application

- [ ] Define the road-event data schema.
- [ ] Build an API for event submission and retrieval.
- [ ] Store coordinates, timestamps, and event confidence.
- [ ] Build a map-based reporting interface.
- [ ] Test repeated-report verification.

### Phase 5 — Integration and Evaluation

- [ ] Integrate the sensor device with the software.
- [ ] Evaluate reliability under controlled conditions.
- [ ] Document limitations and test results.
- [ ] Prepare a reproducible demonstration.

---

## Limitations and Safety

RoadGuard is a research and prototyping project, not a certified automotive safety system.

- Sensor spikes do not necessarily indicate potholes or collisions.
- GPS coordinates may be inaccurate or unavailable.
- Different vehicles, sensor orientations, mounting positions, and speeds can affect readings.
- Machine learning performance must be measured using representative data.
- Emergency notifications must not be presented as reliable or connected to emergency services unless a verified integration exists.
- Testing must not involve deliberately dangerous driving or creating hazards on public roads.
- Location data should be handled with appropriate privacy and security protections.

Any claims about accuracy, safety improvements, or real-world performance must be supported by documented testing.

---

## Documentation Website Requirements

The repository includes a planned documentation website using three files:

- `index.html` — Semantic page structure and documentation content.
- `main.css` — Responsive styling, layout, and design tokens.
- `index.js` — Optional client-side interactions.

### Design Direction

The website should use a **minimal, futuristic, dark technical aesthetic**. It should look like documentation for a serious engineering project rather than a generic marketing landing page.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#070B14` | Main page background |
| Surface | `#0D1524` | Cards and panels |
| Borders | `#17243A` | Dividers and outlines |
| Primary cyan | `#22D3EE` | Links, highlights, active navigation |
| Violet accent | `#8B5CF6` | Secondary emphasis |
| Main text | `#E6EDF7` | Headings and primary text |
| Muted text | `#7789A4` | Secondary descriptions |

### Layout Requirements

- Responsive sidebar navigation on desktop.
- Compact mobile navigation on smaller screens.
- Clear page title and project overview.
- Dedicated sections for getting started, files, features, hardware, color palette, and technology.
- Reusable cards, subtle borders, and restrained glow effects.
- Readable code blocks with copy buttons where useful.
- Accessible contrast, keyboard navigation, and reduced-motion support.
- No unnecessary JavaScript dependencies.
- No fabricated repository links, implementation claims, test results, or hardware capabilities.

### Instructions for AI Coding Assistants

When generating or modifying the documentation website:

1. Read this README before writing code.
2. Keep `index.html`, `main.css`, and `index.js` separate.
3. Use semantic HTML and maintainable CSS custom properties.
4. Keep the visual design consistent with the palette above.
5. Make the page responsive and usable on desktop and mobile.
6. Use JavaScript only for useful interactions.
7. Do not claim planned features are implemented.
8. Do not invent external links, contributors, licenses, or test results.
9. Preserve accurate dimensions and technical details from this README.
10. Return complete, working file contents when asked to generate the website.

---

## License

No license has been specified yet.

Add an appropriate `LICENSE` file before describing the project as open source or granting reuse rights. Until then, do not assume that the code or design may be freely redistributed.

---

**RoadGuard — Exploring smarter ways to detect, report, and understand road hazards.**
