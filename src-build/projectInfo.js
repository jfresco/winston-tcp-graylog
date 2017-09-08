'use strict';Object.defineProperty(exports, '__esModule', { value: true });exports.projectVersion = projectVersion;exports.projectHost = projectHost;exports.projectRootModule = projectRootModule;exports.projectRootPackage = projectRootPackage;exports.projectName = projectName;exports.projectDir = projectDir;var _pkginfo = require(

'pkginfo');var _lodash = require(
'lodash');var _child_process = require(
'child_process');var _os = require(
'os');var _path = require(
'path');

function projectVersion() {
  try {var _projectRootPackage = 
    projectRootPackage();var version = _projectRootPackage.version;
    if ((0, _lodash.isString)(version) && (0, _lodash.trim)(version).length > 0) {
      return (0, _lodash.trim)(version);} else 
    {
      throw new Error('empty projectVersion');}} 

  catch (_err) {
    return 'unknown version';}}



function projectHost() {
  try {
    var params = { encoding: 'utf8', timeout: 1e3 };
    var cmd = 'hostname -f';
    return (0, _child_process.execSync)(cmd, params).replace(/[\n|\r]/g, '');} 
  catch (_err) {
    return (0, _os.hostname)();}}



function projectRootModule() {
  return (function _(_x) {var _again = true;_function: while (_again) {var module = _x;_again = false;
      if ((0, _lodash.isNull)(module.parent)) {return (
          module);} else {_x = 
        module.parent;_again = true;continue _function;}}})(
  module);}


function projectRootPackage() {
  return (0, _lodash.chain)(module).
  thru(projectRootModule).
  thru(_pkginfo.find).
  thru(require).
  value();}


function projectName() {
  try {var _projectRootPackage2 = 
    projectRootPackage();var _name = _projectRootPackage2.name;
    if ((0, _lodash.isString)(_name) && (0, _lodash.trim)(_name).length > 0) {
      return (0, _lodash.trim)(_name);} else 
    {
      throw new Error('empty projectName');}} 

  catch (_err) {
    return projectDir();}}



function projectDir() {
  try {
    var cwd = process.cwd();var _projectRootModule = 
    projectRootModule();var filename = _projectRootModule.filename;
    return '' + (0, _path.basename)(cwd) + (0, _path.dirname)(filename).replace(cwd, '');} 
  catch (_err) {
    return '[REPL on ' + projectHost() + ']';}}