# Home Assistant Notification Rules

- Whenever you set `input_select.antigravity_build_status` to "Pending" to request approval, you MUST send a push notification to the user's mobile device using the `.agents/notify.ps1` helper script:
  `powershell -ExecutionPolicy Bypass -File .agents/notify.ps1 -Title "Approval Required" -Message "A build is pending approval. Please review the plan in your IDE and toggle status to Approved."`
- Whenever a major implementation step completes successfully, send a progress notification:
  `powershell -ExecutionPolicy Bypass -File .agents/notify.ps1 -Title "Step Completed" -Message "Completed step: [Step Description]"`
- Upon final validation and completion of the overall task, send a completion notification:
  `powershell -ExecutionPolicy Bypass -File .agents/notify.ps1 -Title "Task Completed" -Message "Task was fully completed and validated successfully."`

## Automation Pipeline: Concept to Code

### Pipeline Gates
- **Gate 1 (Manual Handoff):** Raw structural JSON/TS blueprints from AI Studio are saved to `.agents/pending-approval/blueprint.json`.
- **Gate 2 (Standalone Execution):** Standalone agent parses the blueprint, builds the deployment playbooks, and writes them to `.agents/workflows/active/build-pages.md`.
- **Gate 3 (IDE Execution):** IDE Agent continuously monitors `.agents/workflows/active/`. Upon detecting `build-pages.md`, it autonomously executes file creation across `v2-development/cms/` and `v2-development/frontend/`.

### LocalWP Frontend Deployment Rule
- **Asset Synchronization**: Whenever frontend changes are compiled in `v2-development/frontend/`, the agent must:
  1. Build the production assets using `npm run build`.
  2. Copy all built files from `v2-development/frontend/dist/assets/` to `app/public/assets/`.
  3. Update references to the JS/CSS bundles inside `app/public/index.html` to target the newly generated file names.