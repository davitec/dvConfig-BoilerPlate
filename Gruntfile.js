module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat : {
      options: {
        separator: '\n'
      },
      dist : {
        // the files to concatenate
        src: ['src/app-start.js',
              'src/utility/**/*.js',
              'src/services/**/*.js',
              'src/directives/**/*.js',
              'src/controller/**/*.js',
              'src/widgets/**/*.js',
              'src/app-end.js'],
        // the location of the resulting JS file
        dest: 'app/dvConfig.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */ \n'
      },
      build: {
        src: [''],
        dest: 'app/dvConfig.min.js'
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);

};
