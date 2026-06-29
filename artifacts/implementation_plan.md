# 🚀 Phase 2 Upgrade: Antigravity Hub (with Ideas Section)

An evolutionary upgrade for the Antigravity Hub featuring visual theme toggling (Light/Dark mode), persistent user progress tracking, an expanded tutorial catalog, and an **Interactive Idea Generator & Project Roadmap Builder** section.

---

## User Review Required

> [!IMPORTANT]
> **Theme Palette**: The light theme shifts from the deep space dark theme to a clean, crisp "Nebula White" canvas (`#f8fafc` background, slate texts, and frosted glass panels with colorful glows) to maintain the premium, high-fidelity look.
> 
> **Progress Persistence**: User progress (completed tutorials, last active session, and recent searches) will be saved in the client's `localStorage` so it persists across refreshes without requiring a backend database.
> 
> **Ideas Generator Scope**: We will add a dedicated interactive section where users select their level (Beginner, Intermediate, Expert) and category (Web, CLI, SDK, Science) to generate a custom conceptual project layout. The generator outputs:
> - A target architecture outline
> - An interactive checklist roadmap (Setup -> Core -> AI Integration -> Deployment)
> - Copyable starter code blocks tailored to that specific project

---

## Open Questions

> [!NOTE]
> 1. **Completion Celebration**: Confetti will fire upon *final* completion of a tutorial.
> 2. **Resetting Progress**: We propose placing it in the sidebar footer next to the copyright text.
> 3. **Ideas Integration**: Should ideas link directly to existing tutorials? Yes! If a user is building a "Basic CLI Calculator", the roadmap will link them to "Your First agy Session".

---

## Proposed Changes

### 📁 Config & Architecture

#### [MODIFY] [style.css](file:///e:/Learning/antigravity-projects/antigravity-hub/style.css)
- Add theme-specific CSS variable overrides for `.light-theme`.
- Add styling for the Theme Toggle button (animated sun/moon).
- Add checkmarks and progress indicators next to sidebar tutorial listings.
- Add recent search list styling inside the command palette.
- **[NEW]** Add layout and form controls styling for the Ideas Generator (interactive selector chips, roadmap timelines, task checkboxes, code wrapper, and difficulty indicator badges).

#### [MODIFY] [index.html](file:///e:/Learning/antigravity-projects/antigravity-hub/index.html)
- Add a Theme Toggle button in the header actions.
- Add a Progress reset button in the sidebar footer.
- **[NEW]** Add a sidebar navigation item for "Project Ideas" (`#ideas`).
- **[NEW]** Add a `<section id="ideas">` containing selector filters and a dynamic container for the roadmap card.

---

### 📚 Expanded Data & Tutorials

#### [MODIFY] [js/data/tutorials.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/data/tutorials.js)
Expand the tutorial list with new guides.

#### **[NEW]** [js/data/ideas-data.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/data/ideas-data.js)
Define a dataset of conceptual application ideas categorized by difficulty and type:
- **Beginner**: "agy-task-reminder" (CLI-based cron reminder), "gemini-nano-chat" (simple on-device page translation).
- **Intermediate**: "alphafold-visualizer" (biological protein alignment dashboard), "sdk-issue-auto-tagger" (Github webhook classifier).
- **Expert**: "aurasync-ambient-composer" (sensory spatial audio agent), "echothread-canvas-editor" (branching collaborative timeline writing editor).

---

### ⚙️ State & Components Upgrade

#### [MODIFY] [js/app.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/app.js)
- Maintain user state for `theme`, `completedTutorials`, and selected idea filters.
- Synchronize state changes to `localStorage`.
- Bind event handlers to redraw the Ideas Generator when filters are swapped.

#### **[NEW]** [js/components/ideas-generator.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/components/ideas-generator.js)
- Renders filter buttons for Difficulty (Beginner, Intermediate, Expert) and Category (Web, CLI, SDK, Science).
- Displays the matching Idea card with:
  - Title, description, and key challenge summary
  - An interactive step-by-step roadmap checklist (where clicking tasks strikes them through and saves to state)
  - Starter code block using the code highlighter
  - Expected output visualizer

#### [NEW] [js/components/theme-toggle.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/components/theme-toggle.js)
- Manages theme toggling and sun/moon icon rotations.

#### [MODIFY] [js/components/tutorial-stepper.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/components/tutorial-stepper.js)
- Render checkmarks for completed tutorials.

#### [MODIFY] [js/components/search-bar.js](file:///e:/Learning/antigravity-projects/antigravity-hub/js/components/search-bar.js)
- Read and save search history.

---

## Verification Plan

### Automated Verification
- Verify `npm run build` compiles successfully.

### Manual Verification
1.  **Ideas Selector**: Change difficulty to "Expert" and category to "Web", verifying "AuraSync" or "EchoThread" appears.
2.  **Roadmap Tasks**: Check off tasks in the roadmap and verify completion states persist or animate correctly.
3.  **Code Copying**: Copy the starter code and verify clipboard success toast triggers.
4.  **Theme Toggle & Progress Persistence**: Standard manual verification checks.
