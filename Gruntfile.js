var argv = require('minimist')(process.argv.slice(2));

module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  var files = [
    'engine/pollyfills/*.js',
    'engine/Bah.js',
    'engine/Tche.js',
    'engine/helpers/*.js',
    'engine/classes/*.js',
    'engine/spriteTypes/*.js',
    'engine/mapTypes/*.js',
    'engine/skinTypes/*.js',
    'engine/sprites/*.js',
    'engine/sprites/maps/*.js',
    'engine/sprites/windows/*.js',
    'engine/windows/*.js',
    'engine/managers/*.js',
    'engine/scenes/Scene.js',
    'engine/scenes/SceneLoading.js',
    'engine/scenes/SceneLaunch.js',
    'engine/scenes/SceneMapLoading.js',
    'engine/scenes/SceneMap.js',
    'engine/scenes/SceneWindow.js',
    'engine/scenes/SceneTitle.js',
    'engine/globals/*.js'
  ];
  var config = {
    pkg: pkg,
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
          {
            expand: true,
            cwd : argv.path || "./game" + "/",
            src: ["**/*"],
            dest: 'tmp/game/'
          },
          {
            expand : true,
            src : ["dist/tche.js"],
            flatten : true,
            dest : "tmp/game/tche/"
          },
          {
            expand : true,
            src : ["engine/libs/pixi.js/bin/pixi.js", "engine/libs/fpsmeter/dist/fpsmeter.min.js", "engine/libs/SoundJS/lib/soundjs-0.6.2.min.js"],
            flatten : true,
            dest : "tmp/game/libs/"
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
    "nwjs": {
      options: {
        platforms: ['linux', "win", "osx"],
        buildDir: './bin/',
        version: '0.12.0',
      },
      src: ["./tmp/game/**"]
    },
  };

  config.babel.dist.files['dist/' + pkg.name + '.js'] = 'dist/' + pkg.name + '.js';

  grunt.initConfig(config);
  grunt.registerTask("bower-install", ["bower-install-simple:prod"]);
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks("grunt-bower-install-simple");
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('default', ['jshint', 'concat', 'babel','uglify', 'copy']);
  grunt.registerTask('server', ['default', 'http-server']);
  grunt.registerTask('build', ['default', 'nwjs']);

};
