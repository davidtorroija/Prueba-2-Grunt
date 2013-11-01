'use strict';

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // show elapsed time at the end
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Define Directory
        dirs: {
            js:     'src/js',
            build:  'dist'
        },

        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner:
        '\n' +
        '/*\n' +
         ' * -------------------------------------------------------\n' +
         ' * Project: <%= pkg.title %>\n' +
         ' * Version: <%= pkg.version %>\n' +
         ' *\n' +
         ' * Author:  <%= pkg.author.name %>\n' +
         ' * Site:     <%= pkg.author.url %>\n' +
         ' * Contact: <%= pkg.author.email %>\n' +
         ' *\n' +
         ' *\n' +
         ' * Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>\n' +
         ' * -------------------------------------------------------\n' +
         ' */\n' +
         '\n',

        // Minify and Concat archives
        uglify: {
            options: {
                mangle: false,
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                  '<%= dirs.build %>/forja.min.js': '<%= dirs.js %>/forja.js'
                }
            }
        },
        karma: {
          unit: {
            // configFile: 'karma.conf.js',
              options: {
                files: ['test/**/*.js','src/**/*.js'],//  JASMINE,
               // JASMINE_ADAPTER,
              },
              singleRun: true,
              browsers: ['PhantomJS'],
              frameworks:['jasmine'],
               // coverage reporter generates the coverage
              reporters: ['progress', 'coverage'],

              preprocessors: {
                // source files, that you wanna generate coverage for
                // do not include tests or libraries
                // (these files will be instrumented by Istanbul)
                'src/js/**/*.js': 'coverage'
              },
              coverageReporter : {
                type: 'text-summary', //'html' -> for html report, 'text-summary' -> for console report
                dir : 'coverage/'
              },

              // optionally, configure the reporter
              // coverageReporter: {
              //   type : 'html',
              //   dir : 'coverage/'
              // }
          }

        },
        jshint: {
            options: {
                jshintrc: 'configJshint.json'
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.js %>/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },

        // Notifications
        notify: {
          js: {
            options: {
              title: 'Javascript - <%= pkg.title %>',
              message: 'Minified and validated with success!'
            }
          }
        }
});


    // Register Taks
    // --------------------------

    // Observe changes, concatenate, minify and validate files
    grunt.registerTask( 'default', [ 'uglify', 'notify:js', 'jshint', 'karma' ]);

};