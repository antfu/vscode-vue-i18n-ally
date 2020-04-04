import { ParsePathMatcher } from './PathMatching'

describe('PathMatching', () => {
  const cases = [
    ['{namespace}/**/{locale}.json', 'moduleC/nested/locales/zh-cn.json', 'moduleC', 'zh-cn'],
    ['{namespaces}/{locale}.json', 'modules/nested/en.json', 'modules/nested', 'en'],
    ['{namespaces}/{locale}.json', 'modules/nested/en.js', null],
    ['{namespaces}/{locale}.{json|yml}', 'modules/nested/en.yml', 'modules/nested', 'en'],
    ['{namespace}/{locale}.*', 'nested/en.whatever', 'nested', 'en'],
    ['{locale}/{namespaces}.*', 'zh-cn/hello/world/messages.json', 'hello/world/messages', 'zh-cn'],
    ['{locale}/modules/{namespaces}.*', 'jp/modules/hello/world.json', 'hello/world', 'jp'],
  ] as const

  for (const [map, path, expectedNamespace, expectedLocale] of cases) {
    it(map, () => {
      const re = ParsePathMatcher(map)
      const result = re.exec(path)

      if (!result) {
        expect(expectedNamespace).toBeNull()
      }
      else {
        expect(result.groups?.namespace).toEqual(expectedNamespace)
        expect(result.groups?.locale).toEqual(expectedLocale)
      }
    })
  }
})