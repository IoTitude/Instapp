/*
 * Configuration for the ErrorService.
 */

angular
  .module('instapp.errorService')
  .constant('errMsg', {
    DEFAULT: 'Something went wrong. Sorry :(',
    SERVER_NOT_FOUND: 'Unable to connect to server.',
    BAD_REQUEST: '400: Check your username and password.',
    UNAUTHORIZED: '401: Unathorized. Please sign in first.'
  })
