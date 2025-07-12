# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `yarn dev` - Start development server for all packages
- `yarn dev:portal-admin` - Start admin portal development server  
- `yarn dev:portal-tenant` - Start tenant portal development server
- `yarn build:development-and-start:portal-admin` - Build and start admin portal in development mode
- `yarn build:development-and-start:portal-tenant` - Build and start tenant portal in development mode

### Building
- `yarn build:development:portal-admin` - Build admin portal for development
- `yarn build:development:portal-tenant` - Build tenant portal for development
- `yarn build:production` - Build for production
- `yarn build:production:all` - Build all packages for production

### Linting and Type Checking
- `yarn lint:eslint` - Run ESLint
- `yarn lint:eslint:fix` - Run ESLint with auto-fix
- `yarn lint:tsc` - Run TypeScript compiler checks
- `yarn lint:stylelint` - Run Stylelint for CSS/SCSS
- `yarn lint:cspell` - Run spell checker

### Plugin Development
- `yarn create:plugin` - Interactive script to create a new plugin

### Docker
- `yarn docker:build` - Build Docker images
- `yarn docker:build:all` - Build Docker images for all packages

### Utilities
- `yarn prettier` - Format code with Prettier
- `yarn check:packages` - Validate package consistency
- `yarn init:all` - Initialize package names, root tsconfig, and vscode settings
- `yarn commit` - Interactive commit using commitizen (conventional commits)
- `yarn sort-package-json` - Sort package.json files across all packages

### Testing and Serving
- `yarn start:portal-admin` - Start admin portal from built files
- `yarn start:portal-tenant` - Start tenant portal from built files

### Git Hooks
The project uses Husky for git hooks:
- Pre-commit: Runs `lint-staged` to lint and format staged files automatically

## Architecture Overview

This is a **monorepo** using Yarn workspaces that contains a plugin-based console system for the tKeel IoT platform. The architecture is organized into two main portal types with supporting shared packages.

### Package Structure

**Core Portals:**
- `tkeel-console-portal-admin` - Administrative portal for platform management
- `tkeel-console-portal-tenant` - Tenant-specific portal for end users
- `tkeel-console-portal-base` - Shared portal base components and logic

**Plugin Architecture:**
The system uses a micro-frontend plugin architecture where functionality is split into discrete plugins:

**Admin Plugins** (`tkeel-console-plugin-admin-*`):
- `custom-config` - Custom configuration management
- `notification-configs` - Notification system configuration
- `plugins` - Plugin management interface
- `service-monitoring` - Service health and monitoring
- `tenants` - Tenant management
- `usage-statistics` - Usage analytics and reporting

**Tenant Plugins** (`tkeel-console-plugin-tenant-*`):
- `alarm-policy` - Alarm rule configuration
- `alarms` - Alarm monitoring and management
- `data-query` - Data querying interface
- `data-subscription` - Data subscription management
- `device-templates` - Device template management
- `devices` - Device management interface
- `networks` - Network configuration
- `notification-objects` - Notification target management
- `plugins` - Plugin management for tenants
- `roles` - Role and permission management
- `routing-rules` - Data routing configuration
- `users` - User management

**Shared Libraries:**
- `tkeel-console-business-components` - Business-specific React components
- `tkeel-console-components` - Generic UI components
- `tkeel-console-charts` - Chart and visualization components
- `tkeel-console-icons` - Icon components
- `tkeel-console-hooks` - Reusable React hooks
- `tkeel-console-themes` - Theme and styling system
- `tkeel-console-types` - TypeScript type definitions
- `tkeel-console-utils` - Utility functions
- `tkeel-console-constants` - Application constants
- `tkeel-console-request-hooks` - API request hooks

### Key Technologies
- **React 18** with TypeScript
- **Webpack 5** for bundling with micro-frontend support
- **Yarn 3** workspaces for monorepo management
- **ESLint + Prettier** for code quality
- **Emotion** for CSS-in-JS styling
- **Handlebars** for templating
- **Less/Sass** for additional styling support
- **Commitizen** for conventional commit messages
- **Husky + lint-staged** for git hooks and pre-commit validation

### Path Aliases
The project uses TypeScript path aliases prefixed with `@/` for all packages. For example:
- `@/tkeel-console-components/*` → `./packages/tkeel-console-components/src/*`
- `@/tkeel-console-hooks/*` → `./packages/tkeel-console-hooks/src/*`

### Plugin Development Pattern
Each plugin follows a consistent structure:
- `src/App.tsx` - Main plugin component
- `src/routes/index.tsx` - Plugin routing configuration
- `src/pages/` - Page components
- `src/components/` - Plugin-specific components
- `src/hooks/` - Plugin-specific hooks
- `config/` - Environment-specific configuration

### Development Workflow
1. Use `yarn dev:portal-admin` or `yarn dev:portal-tenant` for development
2. Create new plugins using `yarn create:plugin` which scaffolds the standard structure
3. All plugins are independently deployable as micro-frontends
4. Shared components should be added to appropriate shared packages, not duplicated across plugins

## Claude Code 自主工作流程 (Autonomous Development Process)

### 项目背景和目标 (Project Background)
- **项目来源**: 本项目 fork 自 `tkeel-io/console`
- **重构目标**: 形成一个全新的可拔插前端架构
- **最终计划**: 重构完成后将创建一个全新的项目
- **开发流程**: 为保证开发流程可追溯，使用分支和 PR 管理整个重构过程
- **PR 提交目标**: 所有功能开发完成后，PR 提交到 `imneov/console` 仓库

### Environment Requirements
- **Node.js**: >=20.0.0  
- **Yarn**: >=3.0.0 (locked to Yarn 3.1.1)
- **GOPATH**: ~/go (for any Go-related tooling)
- **PATH**: Include `/Users/neov/go/go1.20/bin/` for Go binaries

### Development Enhancement Process (Based on KEP Methodology)

Claude 应该按照 KEP 方法论进行自主开发，每个阶段都有明确的验证和质量门控：

#### Phase 1: 需求分析与设计 (Enhancement Proposal)
1. **需求分析** - 接收项目需求，分析功能范围和技术可行性
2. **TodoWrite规划** - 使用TodoWrite工具创建详细的任务清单，分解复杂功能
3. **设计提案** - 生成结构化的技术设计文档 docs/kep/，包括：
   - 功能动机和目标
   - 设计理念和实现方案  
   - 风险评估和替代方案
   - 测试计划和验收标准
4. **依赖检查** - 确认所需的包依赖和技术栈兼容性，检查现有代码库

#### Phase 2: 实现开发 (Implementation)
5. **代码实现** - 按照设计提案进行编码，标记TodoWrite任务为in_progress
6. **实时任务管理** - 在每个功能点完成后立即标记TodoWrite任务为completed
7. **错误处理循环** - 执行以下自动化循环直到成功：
   - 查看错误信息 (Check error messages)
   - 思考可能的错误原因 (Think about possible causes)  
   - 修改代码 (Modify code)
   - 运行开发服务器验证：
     - `yarn dev:portal-admin` - 管理员门户开发
     - `yarn dev:portal-tenant` - 租户门户开发
   - 自行观察运行结果，如果失败则重复此循环
   - 更新TodoWrite任务状态

#### Phase 3: 质量保证 (Stabilization)
8. **自动化代码质量检查** - 必须全部通过（并行执行）：
   - `yarn lint:tsc` - TypeScript 类型检查 (必须优先执行)
   - `yarn lint:eslint:fix` - 自动修复 ESLint 问题
   - `yarn lint:stylelint` - 样式检查
   - `yarn lint:cspell` - 拼写检查
9. **功能验证** - 确保功能按预期工作，验证TodoWrite中的所有任务已完成
10. **回归测试** - 如果验证失败，返回步骤7进行修复

#### Phase 4: 发布准备 (Release)
11. **分支管理** - 为每个功能创建独立的特性分支
    - 分支命名格式：`feature/功能名称-简短描述`
    - 例如：`feature/plugin-architecture-refactor`
12. **提交代码** - 使用 `yarn commit` 进行规范化提交
13. **最终验证** - 确保所有功能正常运行，检查TodoWrite任务全部完成
14. **清理工作** - 删除临时文件和调试代码，清理TodoWrite任务列表
15. **PR 创建** - 向 `imneov/console` 仓库提交 Pull Request
    - PR 标题应清晰描述功能特性
    - PR 描述应包含：
      - 功能概述和动机
      - 主要变更点
      - 测试验证结果
      - 相关的 TodoWrite 任务完成情况

### 自主工作的关键规则
- **TodoWrite强制管理**: 所有复杂任务必须使用TodoWrite进行规划和跟踪
- **分支驱动开发**: 每个功能必须在独立的特性分支上开发，完成后提交PR
- **重构目标导向**: 所有开发工作都应围绕"可拔插前端架构"这一重构目标进行
- **自动化错误修复**: 遇到错误时，必须分析原因并自动修复，不要等待人工干预
- **质量门控**: 每个阶段都有明确的成功标准，必须达到才能进入下一阶段
- **增量开发**: 每个小功能都要单独验证，避免大批量修改
- **失败恢复**: 连续3次失败时，重新分析需求和设计方案
- **工具批量使用**: 当需要多个工具时，在单个响应中并行调用以提高效率
- **代码库优先**: 优先编辑现有文件而非创建新文件，除非绝对必要
- **PR 追溯性**: 每个功能开发完成后必须创建PR到 `imneov/console`，确保开发流程可追溯

### 调试和开发技巧
- 使用 `yarn show:dev-server-ports` 查看开发服务器端口
- 使用 `yarn show:base-paths` 查看基础路径配置
- TypeScript 项目引用已配置，支持高效编译
- 支持 CSS Modules 和 TypeScript 插件集成

### 强制质量要求
- 所有提交必须符合 conventional commits 规范
- 预提交钩子会自动运行 linting 和格式化
- 代码必须通过所有 TypeScript 类型检查
- 遵循项目的 React 和 TypeScript 最佳实践
- 必须验证功能在实际开发服务器中正常运行
- 完成后必须运行完整的 lint 检查链
- **分支管理要求**: 每个功能必须在独立分支开发，分支名必须具有描述性
- **PR 要求**: 所有功能完成后必须创建详细的 PR，包含完整的变更说明
- **重构一致性**: 所有变更都必须朝着可拔插前端架构的目标推进

### 紧急情况处理
- **连续失败阈值**: 同一问题连续失败3次后，必须重新评估方案
- **复杂度降级**: 如果当前实现过于复杂，考虑简化方案
- **依赖问题**: 遇到包依赖冲突时，优先检查现有项目的依赖版本
- **性能问题**: 开发服务器启动失败时，检查端口占用和内存使用情况
- **分支冲突**: 如果出现分支冲突，优先保证主分支的稳定性
- **PR 问题**: 如果 PR 创建失败，检查分支状态和提交历史
- **重构偏离**: 如果发现开发方向偏离可拔插架构目标，立即调整方案