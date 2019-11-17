export interface FrameworkDefinition {
  id: string
  display: string
  detection: {
    packageJSON: string[] | ((packages: string[]) => boolean)
  }
  languageIds: string[]
  keyMatchReg: Record<string, RegExp[]>
  refactorTemplates: (keypath: string, languageId?: string) => string[]
}