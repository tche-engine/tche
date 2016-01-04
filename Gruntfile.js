module.exports = function(grunt) {

  var files = [
    'engine/Bah.js',
    'engine/Tche.js',
    'engine/helpers/*.js',
    'engine/classes/*.js',
    'engine/sprites/*.js',
    'engine/managers/*.js',
    'engine/scenes/*.js',
    'engine/globals/*.js',
    'sample-game/scenes/*.js'
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
    },
    'http-server': {

      'dev': {

        // the server root directory
        root: "./",

        // the server port
        // can also be written as a function, e.g.
        // port: function() { return 8282; }
        port: 8080,

        // the host ip address
        // If specified to, for example, "127.0.0.1" the server will
        // only be available on that ip.
        // Specify "0.0.0.0" to be available everywhere
        host: "0.0.0.0",

        cache: 1,
        showDir: true,
        autoIndex: true,

        // server default file extension
        ext: "html",

        // run in parallel with other tasks
        runInBackground: false,

        // specify a logger function. By default the requests are
        // sent to stdout.
        logFn: function(req, res, error) {},

        // Proxies all requests which can't be resolved locally to the given url
        // Note this this will disable 'showDir'
        // proxy: "http://someurl.com",

        /// Use 'https: true' for default module SSL configuration
        /// (default state is disabled)
        // https: {
        //     cert: "cert.pem",
        //     key : "key.pem"
        // },

        // Tell grunt task to open the browser
        // openBrowser : true

      }

    },
    nwjs: {
      options: {
        platforms: ['linux',"win","osx"],
        buildDir: './generated', // Where the build version of my NW.js app is saved
        version: '0.12.0'
      },
      src: ['./tmp/**'] // Your NW.js app
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ['dist/**',"sample-game/**",'package.json',"engine/libs/**"],
            dest: 'tmp/'
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['jshint', 'concat']);
  grunt.registerTask('server', ['http-server']);
  grunt.registerTask('build', ['copy','nwjs']);
  grunt.registerTask('prod', ['jshint', 'concat', 'uglify']);

};
