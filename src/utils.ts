
const buildExpect = (key, value, isObj) => {
  return `expect(${key}).${isObj ? 'toEqual' : 'toBe'}(${JSON.stringify(value)})`
}
export const object2expect = (obj, childDeepLevel = 0, arrayDeep: number, varName = 'result'): string[] => {
  if (varName == null) {
    throw new Error('varName must be set')
  }
  if (childDeepLevel <= 0) {
    return [buildExpect(varName, obj, true)]
  }
  if (typeof obj !== 'object') {
    return [buildExpect(varName, obj, true)]
  }
  return ([] as any).concat(...Object.entries(obj).map(([key, value]) => {
    const varKey = `${varName}?${/^[a-z0-9_$]+$/i.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`}`
    if (typeof value === 'object') {
      if (value == null) {
        return `expect(${varKey}).toBeNull()`
      } else if (Array.isArray(value)) {
        if (arrayDeep === 0) {
          return buildExpect(varKey, value, true)
        }
        return ([] as any).concat(
          buildExpect(`${varKey}?.length`, value.length, false),
          ...value.slice(0, arrayDeep).map((item, index) => {
            return object2expect(item, childDeepLevel - 1, arrayDeep, `${varKey}[${index}]`)
          })
        )
      } else if (childDeepLevel > 0) {
        return object2expect(value, childDeepLevel - 1, arrayDeep, varKey)
      } else {
        return buildExpect(varKey, value, true)
      }
    }
    return buildExpect(varKey, value, false)
  }))
}

// tailwindcss, windicss
export const initTailwindJsonColorConverter = (theme: {[k: string]: string}) => {
  const colors = Object.entries(theme).reduce((colors, [key, color]) => {
    const m = key.match(/^color-(?<name>.+?)(?:-(?<transparent>transparent))?(?:-(?<palette>\d+))?$/)
    if (m == null) throw new Error(`Could not process color key '${key}'`)

    // @ts-ignore
    const { name, transparent, palette } = m.groups
    if (colors[name] == null) {
      colors[name] = {
        DEFAULT: null
      }
    }
    if (transparent != null) {
      // ignore transparent
      // if (colors[name].transparent == null) {
      //   colors[name].transparent = {}
      // }
      // colors[name].transparent[palette] = color
    } else {
      if (palette == null) {
        colors[name].DEFAULT = color
      } else {
        colors[name][palette] = color
      }
    }
    return colors
  }, {})

  Object.keys(colors).forEach(name => {
    if (colors[name].DEFAULT == null) {
      if (colors[name]['500'] == null) {
        delete colors[name].DEFAULT
      } else {
        colors[name].DEFAULT = colors[name]['500']
      }
    }
  })
  return {
    exportJSON: () => JSON.stringify(colors, null, 2),
    exportCSS: () => `:root {
${
  Object
    .entries(theme)
    .map(([name, value]) => {
      return `  ${name.startsWith('--') ? '' : '--'}${name}: ${value};`
    })
    .join('\n')
}
}`
  }
}
