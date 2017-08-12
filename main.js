#!/usr/bin/env node

'use strict';

const startup = require('./core/startup/startup.js'),
    direct = require.main === module;

module.exports = startup.run(direct, process.argv.slice(2), __dirname);
