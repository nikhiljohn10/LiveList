module.exports = function(grunt) {

  grunt.config.set('jst', {
    dev: {
      files: {
        '.tmp/public/jst.js': require('../pipeline').templateFilesToInject
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jst');
};
