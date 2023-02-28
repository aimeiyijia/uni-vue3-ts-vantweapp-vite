import { inject } from 'vue'

import { Router, routeRule } from '../options/base'
import { routeLocationKey, routerKey } from './injectionSymbols'

/**
 * Returns the router instance. Equivalent to using `$router` inside
 * templates.
 */
export function useRouter(): Router {
  return inject(routerKey)!
}

/**
 * Returns the current route location. Equivalent to using `$route` inside
 * templates.
 */
export function useRoute(): routeRule {
  return inject(routeLocationKey)!
}
