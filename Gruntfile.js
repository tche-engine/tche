module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sources: [
      'engine/pollyfills/*.js',
      'engine/Bah.js',
      'engine/Tche.js',
      'engine/helpers/*.js',
      'engine/classes/*.js',
      'engine/spriteTypes/*.js',
      'engine/mapTypes/*.js',
      'engine/skinTypes/*.js',
      'engine/objectTypes/object.js',
      'engine/objectTypes/creature.js',
      'engine/objectTypes/npc.js',
      'engine/objectTypes/player.js',
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
    ],
    
    jshint: {
      options: {
        esnext: true,
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      },
      dist: {
        src: '<%= sources %>'
      }
    },

    concat: {
      dist: {
        src: '<%= sources %>',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    babel: {
      options: {
        presets: ['babel-preset-es2015']
      },
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd : (grunt.option('path') || "./game") + "/",
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

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    },
    
    nwjs: {
      options: {
        platforms: ['linux', "win", "osx"],
        buildDir: './bin/',
        version: '0.12.0',
      },
      src: ["./tmp/game/**"]
    }
  });

  /*grunt.registerTask('bower-install', ['bower-install-simple:prod']);
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-bower-install-simple');*/
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['dist', 'copy']);
  grunt.registerTask('server', ['default', 'http-server']);
  grunt.registerTask('build', ['default', 'nwjs']);
  grunt.registerTask('dist', ['jshint', 'concat', 'babel', 'uglify']);
};
