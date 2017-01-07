module.exports = function(grunt) {

  grunt.config.set('watch', {
    assets: {
      files: ['assets/**/*', 'tasks/pipeline.js', '!**/node_modules/**'],
      tasks: ['syncAssets', 'linkAssets']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
