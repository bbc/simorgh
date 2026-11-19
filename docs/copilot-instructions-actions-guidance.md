# Copilot instruction types and skills in a repo

This document summarizes the main customization mechanisms for GitHub Copilot, with quotes from official GitHub documentation for cross-checking. Most are repository-level (committed to the repo), with the exception of personal skills, which are user-level (stored in your home directory).

## 1) Repo-wide custom instructions

- **File:** `/.github/copilot-instructions.md`
- **Scope:** applies broadly to requests made in the context of the repository
- **`applyTo` required?** No

### From the docs

> “Repository-wide custom instructions, which apply to all requests made in the context of a repository.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “These are specified in a `copilot-instructions.md` file in the `.github` directory of the repository.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “Repository-wide instructions (using the `.github/copilot-instructions.md` file).”

Source: [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)

### When to use it

Use repo-wide custom instructions for general repository guidance, such as coding standards, testing conventions, architectural preferences, and commands Copilot should know about for most tasks in the repo.

### A note on `AGENTS.md`

You may also see an `AGENTS.md` file referenced elsewhere. It is a cross-tool instructions file designed to be recognized by multiple AI agents, including non-Copilot tools. For our work, prefer `.github/copilot-instructions.md`: it serves the same always-on, repository-wide purpose for Copilot and has broader, more reliable support across Copilot tools (including Copilot code review). Use `.github/copilot-instructions.md` as the single source of repository-wide instructions.

### From the docs

*That `AGENTS.md` is intended for use across multiple agents:*

> “VS Code automatically detects an `AGENTS.md` Markdown file in the root of your workspace and applies the instructions in this file to all chat requests within this workspace. This is useful if you work with multiple AI agents in your workspace and want a single set of instructions recognized by all of them…”

Source: [Use custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

*That `.github/copilot-instructions.md` is supported in more Copilot tools (the support matrix lists it, but not `AGENTS.md`, for Copilot code review in VS Code):*

> “Copilot code review — Repository-wide instructions (using the `.github/copilot-instructions.md` file).”

Source: [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)

---

## 2) Path-specific custom instructions

- **Files:** `/.github/instructions/**/*.instructions.md`
- **Scope:** applies to requests made in the context of files that match the `applyTo` glob
- **`applyTo` required?** Only for automatic path-based application. The frontmatter `applyTo` glob is what makes a file apply automatically to matching paths. If it is omitted, the file is valid but is not applied automatically — it can still be attached manually to a chat request or matched by its description.

### Frontmatter meaning

Frontmatter is a small metadata block at the top of a Markdown file. In Copilot path-specific instruction files, it is used to specify the `applyTo` glob pattern.

### From the docs

> “applyTo — Glob pattern that defines which files the instructions apply to automatically, relative to the workspace root. Use `**` to apply to all files. If not specified, the instructions are not applied automatically, but you can still add them manually to a chat request.”

Source: [Use custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

Example:

```md
---
applyTo: "src/components/**/*"
---
Use React function components.
```

### Where the files live

Path-specific instruction files are maintained in the `.github/instructions` directory. You can organize them into subdirectories (for example, by team, language, or module); the directory is searched recursively.

```text
repo/
└─ .github/
   ├─ copilot-instructions.md          # repo-wide (section 1)
   └─ instructions/
      ├─ frontend/
      │  ├─ react.instructions.md
      │  └─ accessibility.instructions.md
      ├─ backend/
      │  └─ api-design.instructions.md
      └─ testing/
         └─ unit-tests.instructions.md
```

### From the docs

> “These are specified in one or more `NAME.instructions.md` files within or below the `.github/instructions` directory in the repository.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “VS Code searches these folders recursively, to enable you to organize instructions files in subdirectories. For example, you can group instructions by team, language, or module.”

Source: [Use custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

> “Path-specific custom instructions, which apply to requests made in the context of files that match a specified path.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “These are specified in one or more `NAME.instructions.md` files within or below the `.github/instructions` directory in the repository.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “Create one or more `NAME.instructions.md` files, where `NAME` indicates the purpose of the instructions. The file name must end with `.instructions.md`.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “At the start of the file, create a frontmatter block containing the `applyTo` keyword. Use glob syntax to specify what files or directories the instructions apply to.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “Path-specific instructions (using `.github/instructions/**/*.instructions.md` files).”

Source: [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)

### Interaction with repo-wide instructions

> “If the path you specify matches a file that Copilot is working on, and a repository-wide custom instructions file also exists, then the instructions from both files are used.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

### When to use it

Use path-specific instructions when only part of the repo needs special guidance, such as different conventions for frontend, backend, tests, scripts, or generated files.

---

## 3) Skills

- **File:** `SKILL.md` inside a skill-specific directory
- **Project-skill directories documented by GitHub:** `/.github/skills`, `/.claude/skills`, or `/.agents/skills`
- **Scope:** task-specific; Copilot loads a skill when relevant
- **`applyTo` required?** No
- **Loaded automatically just because it exists?** No. Copilot decides when to use a skill.

### From the docs

> “Skills allow Copilot to perform specialized tasks.”

Source: [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

> “Agent skills are folders of instructions, scripts, and resources that Copilot can load when relevant to improve its performance in specialized tasks.”

Source: [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

> “Project skills, stored in your repository (`.github/skills`, `.claude/skills`, or `.agents/skills`)”

Source: [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

> “Skill files must be named `SKILL.md`.”

Source: [Adding agent skills for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)

> “When performing tasks, Copilot will decide when to use your skills based on your prompt and the skill's description.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

> “When Copilot chooses to use a skill, the `SKILL.md` file will be injected in the agent's context, giving the agent access to your instructions.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

### Skills versus custom instructions

GitHub explicitly distinguishes when to use custom instructions versus skills.

### From the docs

> “We recommend using **custom instructions** for simple instructions relevant to almost every task (for example information about your repository's coding standards), and **skills** for more detailed instructions that Copilot should only access when relevant.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

### Personal skills

In addition to project skills, GitHub documents personal skills, stored in your home directory and shared across projects.

### From the docs

> “Personal skills, stored in your home directory and shared across projects (`~/.copilot/skills` or `~/.agents/skills`)”

Source: [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

### When to use it

A skill is a task playbook, not ambient repo policy. It is best for repeatable, specialized workflows where Copilot should only receive the extra instructions when the task is relevant.

Examples:

```text
repo/
└─ .github/
   └─ skills/
      └─ convert-theme-to-scss-modules/
         └─ SKILL.md
```

or:

```text
repo/
└─ .agents/
   └─ skills/
      └─ migrate-api-client/
         └─ SKILL.md
```

## How Copilot uses them conceptually

When Copilot is working on a file or task, a useful mental model is that it may use:

1. **Repo-wide instructions**
   - `/.github/copilot-instructions.md`

2. **Path-specific instructions that match the file**
   - `/.github/instructions/**/*.instructions.md` with matching `applyTo`

3. **Relevant skills**
   - task-specific playbooks selected based on the prompt and skill description

4. **Your prompt**
   - the immediate task request

Note: GitHub documents **three types of repository custom instructions** — repo-wide, path-specific, and agent instructions (`AGENTS.md`). Skills are a **separate** mechanism, not a custom-instruction type. The list above shows the mechanisms relevant to our usage; `AGENTS.md` is omitted in favour of `.github/copilot-instructions.md` as noted in section 1.

### From the docs

*The three documented custom-instruction types (repo-wide, path-specific, and `AGENTS.md`):*

> “VS Code supports three types of repository custom instructions.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “Agent instructions (using an `AGENTS.md` file).”

Source: [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)

*That skills are a separate mechanism, not a custom-instruction type:*

> “We recommend using custom instructions for simple instructions relevant to almost every task … and skills for more detailed instructions that Copilot should only access when relevant.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

*How each mechanism applies:*

> “Repository-wide custom instructions, which apply to all requests made in the context of a repository.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “Path-specific custom instructions, which apply to requests made in the context of files that match a specified path.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

> “When performing tasks, Copilot will decide when to use your skills based on your prompt and the skill's description.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

> “When Copilot chooses to use a skill, the `SKILL.md` file will be injected in the agent's context, giving the agent access to your instructions.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

### Important caveat

This is a conceptual model, not an exhaustive precedence algorithm. The docs explicitly state the instruction types and the path-matching behavior, but they do not provide a complete ordering algorithm for every Copilot tool.

---

## Precedence and specificity

A cautious mental model is:

- **repo-wide instructions** provide broad repository guidance
- **path-specific instructions** add guidance when the current file path matches `applyTo`
- **skills** are selected for relevant specialized tasks
- **your prompt** is the immediate request for the current interaction

### From the docs

For path-specific plus repo-wide instructions:

> “If the path you specify matches a file that Copilot is working on, and a repository-wide custom instructions file also exists, then the instructions from both files are used.”

Source: [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)

For skills:

> “When performing tasks, Copilot will decide when to use your skills based on your prompt and the skill's description.”

Source: [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

### Caveat

The docs support these scoping rules directly, but they do not fully spell out an exhaustive precedence algorithm for every Copilot tool. Avoid treating “more local / more specific wins” as a universal quoted GitHub rule beyond the documented path-specific matching behavior.

---

## Example layout

```text
repo/
├─ .github/
│  ├─ copilot-instructions.md
│  ├─ instructions/
│  │  ├─ frontend.instructions.md
│  │  └─ api.instructions.md
│  └─ skills/
│     └─ convert-theme-to-scss-modules/
│        └─ SKILL.md
└─ src/
   ├─ components/
   │  └─ Button.tsx
   └─ api/
      └─ users.ts
```

For work on `src/components/Button.tsx`, Copilot may use:

- `/.github/copilot-instructions.md`
- any matching `/.github/instructions/**/*.instructions.md` file
- a relevant skill if the task matches the skill description
- your prompt

This example is synthesized from the documented scopes and locations above.


## Official docs

- [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)
- [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [Adding agent skills for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)