module.exports = function(grunt) {

  var files = [
    'engine/Bah.js',
    'engine/Tche.js',
    'engine/helpers/*.js',
    'engine/managers/*.js',
    'engine/scenes/*.js',
    'engine/main.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
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
    jshint: {
      src: files,
      options: {
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  
  grunt.registerTask('default', ['jshint', 'concat']);
  grunt.registerTask('prod', ['jshint', 'concat', 'uglify']);

};