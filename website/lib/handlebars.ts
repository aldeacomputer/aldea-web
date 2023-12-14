import { Plugin } from 'vite'
import handlebars, { HandlebarsPluginConfig } from 'vite-plugin-handlebars'

// TODO: remove once https://github.com/alexlafroscia/vite-plugin-handlebars/issues/192 is resolved
function patchedHandlebars(config: HandlebarsPluginConfig = {}): Plugin {
  const plugin = handlebars(config)
  plugin.handleHotUpdate = ({ file, server }) => {
    if (/partials\/.*\.hbs/.test(file)) {
      server.ws.send({ type: 'full-reload' })
    }
  }
  return plugin as Plugin
}

export { patchedHandlebars as handlebars }