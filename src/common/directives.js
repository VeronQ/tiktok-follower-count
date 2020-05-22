import Odometer from 'odometer'
import 'odometer/themes/odometer-theme-default.css'

/**
 *
 * @type {{bind: out.bind, unbind: out.unbind}}
 */
export const out = {
  bind: (el, binding, vnode) => {
    el.out = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.out)
  },
  unbind: (el) => {
    document.body.removeEventListener('click', el.out)
  },
}


/**
 *
 * @type {{bind: odometer.bind, unbind: odometer.unbind, update(*, *, *): void}}
 */
export const odometer = (() => {
  let odometer = []

  return {
    bind: (el, binding) => {
      const {value, expression} = binding
      odometer[expression] = new Odometer({
        el,
        value,
        duration: 2000,
      })
    },
    update(el, binding) {
      const {value, expression} = binding
      odometer[expression].update(value)
    },
  }
})()
