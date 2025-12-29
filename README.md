# AMPscript Email Builder

A **schema-driven visual builder** for generating **Salesforce Marketing Cloud (SFMC) AMPscript** safely, deterministically, and at scale.

This project replaces free-text AMPscript editing with **typed, configurable blocks** that generate valid AMPscript through a controlled compilation process.

---

## Why This Exists

AMPscript is powerful—but fragile.

Small typos, invalid Data Extension names, or execution-order mistakes can silently break emails in production. This builder exists to:

- Eliminate copy-paste AMPscript errors
- Prevent invalid DE / field references
- Make AMPscript accessible without making it unsafe
- Enforce consistency across teams and campaigns
- Reduce QA and production defects by design

---

## Core Principles (Non-Negotiable)

- ❌ No free-text AMPscript editing (by default)
- ✅ All AMPscript is generated from **typed block schemas**
- ✅ Configuration happens via a **settings sidebar**, not code
- ✅ Output is deterministic and repeatable
- ✅ React + TypeScript only
- ✅ Schema-first, guard-railed architecture

If something can’t be expressed safely through a schema, it does not belong in v1.

---

## High-Level Architecture

This project follows an MVC-style pattern:

### Model
- Block definitions
- Settings schemas
- Data Extension metadata

### View
- Drag-and-drop canvas
- Settings sidebar
- Block UI components

### Controller
- Validation
- AMPscript compilation
- Export logic

UI components must not contain AMPscript logic.

---

## How It Works (Conceptually)

1. A user drags an AMPscript block onto the canvas
2. The block exposes configurable settings in the sidebar
3. The user configures DE names, fields, variables, etc.
4. The system validates the configuration
5. AMPscript is generated from a template at export time
6. Output is copied into SFMC safely

At no point does the user write AMPscript directly.

---

## Technology Stack

- **Frontend:** React
- **Language:** TypeScript (strict)
- **Drag & Drop:** `@dnd-kit/core` (or equivalent)
- **Build Tooling:** Vite
- **Backend:** None (v1)

---

## Repository Structure (Planned)

```text
docs/
  requirements.md             # Authoritative functional requirements
src/
  blocks/                      # Block definitions & schemas
  registry/                    # Block registry
  compiler/                    # AMPscript compilation logic
  validation/                  # Config validation rules
  components/                  # UI components
  state/                       # App state management