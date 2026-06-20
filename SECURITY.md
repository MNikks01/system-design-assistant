# System Design Assistant — SECURITY

Baseline: contextos/SECURITY.md. Moderate surface (designs + optional codebase grounding).

- **RBAC:** Owner/Admin/Member/Viewer on designs/projects; scoped keys.
- **Audit:** design/ADR changes, grounding access.
- **Secrets:** provider/#2 keys in vault; never in designs/logs.
- **Encryption:** TLS; at-rest; backups encrypted.
- **Codebase grounding:** inherits #2's tenant isolation + code-privacy (D-010); grounding is read-only + scoped to repos the org owns.
- **Data (D-010):** designs/codebase context never train a model; deletable; configurable retention.
- **Tenant isolation:** `org_id` + RLS; design memory + prep sessions tenant-scoped.
- **App sec:** Zod validation, parameterized queries, dep/secret scanning, SAST.
- **Compliance:** privacy/security page; SOC 2 if enterprise (likely via ContextOS); on-prem (V3).
- **Threats:** (1) cross-tenant design/code leak → RLS + #2 isolation; (2) sensitive architecture in designs → access control + retention; (3) credential theft → vault.
