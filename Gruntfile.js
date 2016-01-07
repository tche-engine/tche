var pkg = require("./package.json");
module.exports = function(grunt) {

  var files = [
    'engine/pollyfills/*.js',
    'engine/Bah.js',
    'engine/Tche.js',
    'engine/helpers/*.js',
    'engine/classes/*.js',
    'engine/sprites/*.js',
    'engine/sprites/maps/*.js',
    'engine/managers/*.js',
    'engine/scenes/Scene.js',
    'engine/scenes/SceneLoading.js',
    'engine/scenes/SceneLaunch.js',
    'engine/scenes/SceneLoadMap.js',
    'engine/scenes/SceneMap.js',
    'engine/globals/*.js'
  ];
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {},
      dist: {
        src: files,
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    "jshint": {
      src: files,
      options: {
        esnext: true,
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    },
    "watch": {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
  },
  "copy": {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ['dist/**', "sample-game/**", 'package.json', "engine/libs/**"],
            dest: 'tmp/'
          },
        ],
      },
    },
    "babel": {
      options: {
        // sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {

        }
      }
    },
  };

  config.babel.dist.files['dist/' + pkg.name + '.js'] = 'dist/' + pkg.name + '.js';

  grunt.initConfig(config);
  grunt.registerTask("bower-install", ["bower-install-simple:prod"]);
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks("grunt-bower-install-simple");
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('default', ['jshint', 'concat', 'babel','uglify']);
  grunt.registerTask('server', ['default', 'http-server']);
  grunt.registerTask('build', ['default', 'copy', 'nwjs']);

};
