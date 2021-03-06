// Generated by CoffeeScript 1.12.7
(function() {
  var Pipe, XunitFilePipe, fs,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  fs = require('fs');

  Pipe = require("./Pipe");

  XunitFilePipe = (function(superClass) {
    extend(XunitFilePipe, superClass);

    function XunitFilePipe(stdout, stderr, options) {
      var outputFile, outputStream;
      this.stdout = stdout;
      this.stderr = stderr;
      this.options = options;
      this.stdout.setEncoding("utf8");
      this.stderr.setEncoding("utf8");
      outputFile = this.options.pipeToFile;
      outputStream = fs.createWriteStream(outputFile, {
        flags: 'w',
        encoding: 'utf8'
      });
      this.stdoutBuffer = '';
      this.stdout.on("data", (function(_this) {
        return function(data) {
          var i, len, line, lines, results;
          _this.stdoutBuffer += data;
          lines = _this.stdoutBuffer.split('\n');
          if (lines.length === 1) {
            return;
          }
          _this.stdoutBuffer = lines.pop();
          results = [];
          for (i = 0, len = lines.length; i < len; i++) {
            line = lines[i];
            if (line.indexOf('##_meteor_magic##xunit: ') === 0) {
              results.push(outputStream.write(line.substr(24) + '\n'));
            } else {
              results.push(process.stdout.write(line + '\n'));
            }
          }
          return results;
        };
      })(this));
      this.stderr.on("data", (function(_this) {
        return function(data) {
          return process.stderr.write(data);
        };
      })(this));
    }

    return XunitFilePipe;

  })(Pipe);

  module.exports = XunitFilePipe;

}).call(this);
