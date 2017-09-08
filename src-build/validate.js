'use strict';Object.defineProperty(exports, '__esModule', { value: true });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _lodash = require(

'lodash');var _jjv = require(
'jjv');var _jjv2 = _interopRequireDefault(_jjv);

var jjv = new _jjv2['default']();exports['default'] = 
jjv.validate.bind(jjv);

/*
  adapterOptions:
    - tcp: https://nodejs.org/dist/latest-v5.x/docs/api/net.html#net_socket_connect_options_connectlistener
    - upd: https://nodejs.org/api/dgram.html#dgram_socket_bind_options_callback
           (but really use: 'protocol', 'port', 'host' as 'address')
  levelMap:
    https://en.wikipedia.org/wiki/Syslog#Severity_level
*/

jjv.addType('function', function (v) {return (0, _lodash.isFunction)(v);});
jjv.addSchema('config', { 
  type: 'object', 
  example: { 
    name: 'tcpGraylog', 
    silent: false, 
    level: 'info', 
    handleExceptions: false, 
    humanReadableUnhandledException: false, 
    formatter: function formatter(v) {return v;}, 
    gelfPro: { 
      host: 'localhost', 
      port: 12201 }, 

    baseMsg: { 
      autor: 'nskazki@gmail.com' }, 

    levelMap: { 
      'panic': 3, // as error
      'log': 7 // as debug
    } }, 

  properties: { 
    name: { 
      type: 'string' }, 

    silent: { 
      type: 'boolean' }, 

    level: { 
      type: 'string' }, 

    handleExceptions: { 
      type: 'boolean' }, 

    humanReadableUnhandledException: { 
      type: 'boolean' }, 

    formatter: { 
      type: 'function' }, 

    gelfPro: { 
      type: 'object', 
      properties: { 
        adapterName: { 
          type: 'string', 
          'enum': ['udp', 'tcp'] }, 

        adapterOptions: { 
          type: 'object', 
          properties: { 
            port: { type: 'integer' }, 
            host: { type: 'string' }, 
            localAddress: { type: 'string' }, 
            localPort: { type: 'integer' }, 
            family: { type: 'integer' }, 
            lookup: { type: 'function' }, 
            protocol: { type: 'string' } } } } }, 




    baseMsg: { 
      type: 'object' }, 

    levelMap: { 
      type: 'object', 
      patternProperties: { 
        '.': { type: 'integer' } } } } });module.exports = exports['default'];