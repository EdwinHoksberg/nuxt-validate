import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
<% if (options.lang) { %>
import <%= options.lang %> from 'vee-validate/dist/locale/<%= options.lang %>'

Validator.localize('<%= options.lang %>', <%= options.lang %>)
<% } %>

<% if (options.nuxti18n) { %>
  export default function ({ app }) {
    if (app.i18n.loadedLanguages[0]) {
      const lang = app.i18n.loadedLanguages[0]

      import [lang] from `vee-validate/dist/locale/${lang}`

      //Loading languages for Vee
      Validator.localize(`${lang}`, lang)

      //Localizing the app when user refresh or access a localized link
      Validator.localize(lang);

      //Called everytime language change
      app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
        Validator.localize(newLocale);
      }
    }
  }
<% } else { %>
  Vue.use(VeeValidate, <%= JSON.stringify(options.nuxtValidateOptions, null, 2) %>)
<% } %>

