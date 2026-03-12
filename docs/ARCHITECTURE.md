# Architecture

## Purpose
This repository is a React + Vite frontend template intended to be extended for product UIs while preserving a stable developer experience.

## Current foundation
- React application bootstrapped through `src/main.jsx`
- Vite build and dev server
- ESLint configuration in `eslint.config.js`
- Docker support under `docker/`
- Stage and master build parameter files

## Agent-friendly architecture expectations
- Keep entrypoints explicit.
- Keep routing, state, API, and UI concerns separated.
- Prefer adding focused modules over large monolithic files.
- Document any new cross-cutting pattern in `docs/`.
