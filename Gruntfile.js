module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['build/libmultimarkdown.js', 'build/multimarkdown.js'],
        dest: 'build/multimarkdown_concat.js'
      }
    },
    grep: {
      dist: {
        files: {
          "dist/multimarkdown.js": ["build/multimarkdown_concat.js"]
        },
        options: {
          fileOverride: true,
          denotation: '',
          pattern: 'process.platform.match' //your pattern that will be excluded from file
        }
      }
    },
    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      "build/libmultimarkdown.js": {
        command: 'make build/libmultimarkdown.js'
      }
    },

    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   }
    // },
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint', 'qunit']
    // },
    typescript: {
      base: {
        src: ['src/*.ts'],
        dest: 'build/multimarkdown.js',
        options: {
          module: 'amd', //or commonjs
          target: 'es3', //or es5
          basePath: 'src/',
          sourceMap: true,
          declaration: true,
          comments: true
        }
      }
    },
    intern: {
      testTarget: {
        options: {
          runType: 'runner', // defaults to 'client'
          config: 'tests/intern',
          reporters: ['console', 'lcov'],
          // suites: ['myPackage/tests/all']
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-grep');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('intern')

  grunt.registerTask('test', ['intern']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['newer:typescript', 'newer:shell', 'newer:concat', 'newer:grep']);
};
