/* Server configuration
 *
 * This is a template of the configuration needed for connecting to the
 * backend service provided by BaasBox. Change these to suit your needs.
 */
angular
  .module('instapp.baasBoxService')
  .constant('SERVER_CONFIG', {
    'BASE_URL': 'localhost:9000',
    'APPCODE': '1234567890'
  })
