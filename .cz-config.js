/** @type {import('cz-git').UserConfig} */
module.exports = {
  types: [
    { value: 'feat', name: 'feat: 一个新的特性' },
    { value: 'fix', name: 'fix: 修复一个Bug' },
    { value: 'docs', name: 'docs: 变更的只有文档' },
    { value: 'refactor', name: 'refactor: 代码重构，注意区分特性、修复' },
    { value: 'test', name: 'test: 添加一个测试' },
    { value: 'build', name: 'build: 修改项目构建系统配置' },
    { value: 'ci', name: 'ci: 修改项目继续集成流程' },
    { value: 'chore', name: 'chore: 改变构建流程、或者增加依赖库、工具等' },
    {
      value: 'improvement',
      name: 'improvement: 用于对当前实现进行改进而没有添加新功能或修复错误的提交'
    },
    { value: 'merge', name: 'merge: 仅进行分支合并' },
    { value: 'revert', name: 'revert: 回滚到上一个版本' }
  ],

  messages: {
    type: '选择一种你的提交类型:',
    customScope: '填写需求或设计编号 (可选):',
    subject: '描述(必填):',
    body: '长描述，使用"|"换行(可选):\n',
    breaking: '破坏性说明 (可选):\n',
    footer: '缺陷系统关联的缺陷编号:\n',
    confirmCommit: '确定提交?'
  },
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['customScope', 'body', 'breaking', 'footer'],
  subjectLimit: 100
}
