const uppercamelize = require('uppercamelcase');
const fs = require('fs');
const path = require('path');

function indexEntry() {
  const Components = fs.readdirSync(path.resolve(__dirname, '../packages'));
  const importList = Components.map(name => `import ${uppercamelize(name)} from './packages/${name}';`)
  const exportList = Components.map(name => `${uppercamelize(name)}`);
  const content = 
  `${importList.join('\n')}

export {
  ${exportList.join(',\n  ')}
};
`
  fs.writeFileSync(path.join(__dirname, '../index.js'), content);
}

indexEntry();
