module.exports = {
  name: 'generate:component',
  description: 'Create new component inside src/component',
  run: async toolbox => {
    const  {
      parameters,
      template,
      filesystem,
      print: { success, error }
    } = toolbox

    const name = parameters.first
    
    if (!name) {
      error('Component name must be specified')
      return
    }

    const package = await filesystem.read('package.json', 'json')
    const isReactNative = !!package.dependencies['react-native']

    await template.generate({
      template: 'component.js.ejs',
      target: `src/components/${name}/index.js`,
      props: { name: name }
    })

    const styleTemplate = isReactNative
      ? 'styles-rn.js.ejs'
      : 'styles-react.js.ejs'

    await template.generate({
      template: styleTemplate,
      target: `src/components/${name}/styles.js`
    })

    success(`Generated ${name} component.`)
  }
}