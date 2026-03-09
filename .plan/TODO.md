# TODO

## Backlog
- [ ] Add end-to-end coverage for AI review/report serialization using a reproducible local backend harness instead of stubs.
- [ ] Evaluate optional integration points for Semgrep, CodeQL, gitleaks/trufflehog, and dependency vulnerability scanners.
- [ ] Rename remaining internal/backend identifiers that still say `codex_sdk` even though the Python path uses the OpenAI Responses API directly.
- [ ] Add backend provenance to AI-generated report sections so downstream agents can distinguish Codex SDK, Codex CLI, and Claude-backed outputs.

## In Progress

## Blocked

## Done
- [x] Investigate security-analysis flow, Codex SDK integration, reporting outputs, and concrete bugs in the end-to-end pipeline
- [x] Add first-class security analysis output and report sections for high-signal hardcoded network and env findings
- [x] Add per-run report archival so agent findings are preserved under `.aigiscode/reports/`
- [x] Add end-to-end coverage for `aigiscode analyze` security findings and archived report outputs
- [x] Align the JSON report contract with documented `graph_analysis.*` paths and expose `--output-dir` across commands for dedicated report locations
