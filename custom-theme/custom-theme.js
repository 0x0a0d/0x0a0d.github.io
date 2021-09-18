const fs = require('fs')
const path = require('path')
const theme = require('./custom-theme.json')

const colors = Object.entries(theme).reduce((colors, [key, color]) => {
  const m = key.match(/^color-(?<name>.+?)(?:-(?<transparent>transparent))?(?:-(?<palette>\d+))?$/)
  if (m == null) throw new Error(`Could not process color key '${key}'`)

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

fs.writeFileSync(path.join(__dirname, '../app.colors.json'), JSON.stringify(colors, null, 2))
fs.writeFileSync(path.join(__dirname, '../app.colors.scss'), `:root {
${
  Object
    .entries(theme)
    .map(([name, value]) => {
      return `  ${name.startsWith('--') ? '' : '--'}${name}: ${value};`
    })
    .join('\n')
}
}`)
