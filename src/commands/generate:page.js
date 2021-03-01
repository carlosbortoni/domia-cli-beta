module.exports = {
  name: 'generate:page',
  description: 'Create new page inside src/pages',
  run: async toolbox => {
    const  {
      parameters,
      template,
      filesystem,
      print: { success, error }
    } = toolbox

    const name = parameters.first
    
    if (!name) {
      error('Page name must be specified')
      return
    }

    const package = await filesystem.read('package.json', 'json')
    const isReactNative = !!package.dependencies['react-native']

    await template.generate({
      template: 'component.js.ejs',
      target: `src/pages/${name}/index.js`,
      props: { name: name }
    })

    const styleTemplate = isReactNative
      ? 'styles-rn.js.ejs'
      : 'styles-react.js.ejs'

    await template.generate({
      template: styleTemplate,
      target: `src/pages/${name}/styles.js`
    })

    success(`Generated ${name} page.`)
  }
}