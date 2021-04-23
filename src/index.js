import './css/index.css'
import vClickOutside from 'click-outside-vue3'
import MultiSelect from './MultiSelect'

const install = (Vue) => {
  Vue.use(vClickOutside)
  Vue.component(MultiSelect.name, MultiSelect)
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

MultiSelect.install = install

export default MultiSelect
