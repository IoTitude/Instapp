/* Server configuration
 *
 * This information might be best hidden from GitHub but at this point in
 * development it doesn't matter much.
 */
angular
  .module('instapp.baasBoxService')
  .constant('SERVER_CONFIG', {
    'BASE_URL': 'http://192.168.142.37:9000',
    'APPCODE': '1234567890'
  })
