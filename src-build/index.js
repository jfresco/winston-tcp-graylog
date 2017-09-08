'use strict';Object.defineProperty(exports, '__esModule', { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();var _get = function get(_x3, _x4, _x5) {var _again = true;_function: while (_again) {var object = _x3, property = _x4, receiver = _x5;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {_x3 = parent;_x4 = property;_x5 = receiver;_again = true;desc = parent = undefined;continue _function;}} else if ('value' in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}}};function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass, superClass) {if (typeof superClass !== 'function' && superClass !== null) {throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _simpleDebugger = require(

'simple-debugger');var _lodash = require(


'lodash');var _projectInfo = require(
'./projectInfo');var _util = require(
'util');var _bluebird = require(
'bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);var _debug = require(
'debug');var _debug2 = _interopRequireDefault(_debug);var _winston = require(
'winston');var _winston2 = _interopRequireDefault(_winston);var _moment = require(
'moment');var _moment2 = _interopRequireDefault(_moment);var _clearRequire = require(
'clear-require');var _clearRequire2 = _interopRequireDefault(_clearRequire);var _validate = require(
'./validate');var _validate2 = _interopRequireDefault(_validate);

var wtgDebug = new _debug2['default']('libs-winston-tcp-graylog');var 

WinstonTcpGraylog = (function (_winston$Transport) {_inherits(WinstonTcpGraylog, _winston$Transport);
  function WinstonTcpGraylog() {var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, WinstonTcpGraylog);
    _get(Object.getPrototypeOf(WinstonTcpGraylog.prototype), 'constructor', this).call(this);

    (0, _simpleDebugger.debugEvents)(this);
    (0, _simpleDebugger.debugMethods)(this, ['on', 'once', 'emit', 
    'addListener', 'removeListener']);

    this._setupConfig(config);
    this._setupLevelMap();
    this._setupBaseMsg();
    this._setupGelf();

    var baseConfig = { 
      name: 'tcpGraylog', 
      silent: false, 
      level: 'info', 
      handleExceptions: false, 
      humanReadableUnhandledException: false, 
      formatter: function formatter(v) {return v;} };

    (0, _lodash.merge)(this, baseConfig, this._config);

    this.log = this.log.bind(this);}_createClass(WinstonTcpGraylog, [{ key: '_setupConfig', value: 


    function _setupConfig(config) {
      var err = (0, _validate2['default'])('config', config);
      if (err) throw new Error('WinstonTcpGraylog#new problem: config has wrong format!      \n\t config: ' + 
      (0, _util.inspect)(config) + '      \n\t err: ' + 
      (0, _util.inspect)(err));
      this._config = config;

      wtgDebug('config: %j', config);
      return this;} }, { key: '_setupLevelMap', value: 


    function _setupLevelMap() {
      var myMap = { 
        'emergency': 0, 
        'emerg': 0, 
        'alert': 1, 
        'critical': 2, 
        'crit': 2, 
        'error': 3, 
        'err': 3, 
        'warning': 4, 
        'warn': 4, 
        'notice': 5, 
        'note': 5, 
        'information': 6, 
        'info': 6, 
        'log': 6, 
        'debug': 7 };

      this._levelMap = (0, _lodash.extend)(myMap, this._config.levelMap || this._config.levels);

      wtgDebug('levelMap: %j', this._levelMap);
      return this;} }, { key: '_setupBaseMsg', value: 


    function _setupBaseMsg() {
      var appVersion = (0, _projectInfo.projectVersion)();
      var facility = (0, _projectInfo.projectName)();
      var host = (0, _projectInfo.projectHost)();

      var myBaseMsg = { appVersion: appVersion, facility: facility, host: host };
      this._baseMsg = (0, _lodash.extend)(myBaseMsg, this._config.baseMsg);

      wtgDebug('baseMsg: %j', this._baseMsg);
      return this;} }, { key: '_setupGelf', value: 


    function _setupGelf() {
      (0, _clearRequire2['default'])('gelf-pro');
      this._gelf = require('gelf-pro');
      this._gelf.setConfig(this._config.gelfPro);

      wtgDebug('gelfPro: %j', this._config.gelfPro);
      return this;} }, { key: '_normalizeMeta', value: 


    function _normalizeMeta(object) {var _this = this;
      var myMap = (0, _lodash.isArray)(object) ? _lodash.map : _lodash.mapValues;



      return myMap(object, function (v) {
        if ((0, _lodash.isObject)(v) && v.message && v.stack) {
          return { message: v.message, stack: v.stack };} else 
        if ((0, _lodash.isFunction)(v) || (0, _lodash.isRegExp)(v) || (0, _lodash.isBoolean)(v)) {
          return v.toString();} else 
        if ((0, _lodash.isObject)(v)) {
          return _this._normalizeMeta(v);} else 
        {
          return v;}});} }, { key: 'log', value: 




    function log(humanLevel, fmtMsg, rawMeta, callback) {var _this2 = this;
      if (this.silent) {
        var res = 'WinstonTcpGraylog#handler skip: module was silent!';
        wtgDebug(res);
        this.emit('skip', res);
        return callback(null, res);}


      // prepare resMsg
      var level = this._levelMap[humanLevel];
      if (!(0, _lodash.isNumber)(level)) {
        var err = new Error('WinstonTcpGraylog#handler problem: level not found!         \n\t humanLevel: ' + 
        humanLevel);
        wtgDebug(err);
        this.emit('error', err);
        return callback(err);}


      var short_message = fmtMsg.
      split(/[\r\t\n]/).
      filter(function (v) {return (0, _lodash.isString)(v) && (0, _lodash.trim)(v).length > 0;})[0];

      if (!short_message || short_message.length === 0) {
        var res = 'WinstonTcpGraylog#handler skip: catch empty message:         \n\t fmtMsg: ' + 
        fmtMsg + '         \n\t rawMeta: ' + 
        (0, _util.inspect)(rawMeta);
        wtgDebug(res);
        this.emit('skip', res);
        return callback(null, res);}


      var full_message = fmtMsg;
      var humanTime = (0, _moment2['default'])().format('DD/MM HH:mm:ss (Z)');
      var curMsg = { level: level, humanLevel: humanLevel, short_message: short_message, full_message: full_message, humanTime: humanTime };
      var resMsg = this._normalizeMeta((0, _lodash.extend)({}, this._baseMsg, rawMeta, curMsg));

      // prepare and send gelfMsg
      var gelfMsg = this._gelf.getStringFromObject(resMsg);
      return _bluebird2['default'].
      fromNode(function (cb) {return _this2._gelf.send(gelfMsg, cb);}).
      then(function (res) {
        wtgDebug('send', gelfMsg);
        _this2.emit('send', gelfMsg, res);
        callback(null, gelfMsg, res);})['catch'](

      function () {var rawErr = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var message = 'WinstonTcpGraylog#handler problem: gelf-pro return error!           \n\t err: ' + (
        rawErr.message || (0, _util.inspect)(rawErr));
        var err = rawErr.message ? 
        (0, _lodash.extend)(rawErr, { message: message }) : 
        new Error(message);
        wtgDebug(err);
        _this2.emit('error', err);
        callback(err);});} }]);return WinstonTcpGraylog;})(_winston2['default'].Transport);exports['default'] = 




WinstonTcpGraylog;
_winston2['default'].transports.TcpGraylog = WinstonTcpGraylog;module.exports = exports['default'];