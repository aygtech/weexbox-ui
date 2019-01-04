const fs = require('fs-extra')
const path = require('path')
const uppercamelize = require('uppercamelcase')

function buildComponentsEntry() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../components'))
  const excludes = ['index.js', 'style', 'assets', '.DS_Store']
  const components = dirs.filter(dirName => excludes.indexOf(dirName) === -1)

  const importList = components.map(
    name => `import ${uppercamelize(name)} from './${name}'`
  )
  const exportList = components.map(name => `${uppercamelize(name)}`)

  const content = `
// 此文件由config/build-entry.js自动生成
${importList.join('\n')}

export {
  ${exportList.join(',\n  ')}
}
`
  fs.writeFileSync(path.join(__dirname, '../components/index.js'), content)
}

buildComponentsEntry()
