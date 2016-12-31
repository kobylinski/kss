'use strict';

module.exports = function(grunt){
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({
		kss: {
			build: {
				options: {
					template: './template',
					helpers: './template/helpers',
					css: '../node_modules/kss/demo/styles.css',

				},
				files: {
					'example': [ './node_modules/kss/demo' ] 
				}
			}
		},
		sass: {
			build: {
				options: {
					outputStyle: 'compact'
				},
				files: {
					'template/public/styles.css': 'template/styles/styles.scss' 
				}
			}
		},
		watch: {
			styles: {
				files: [ 'template/**/*.scss' ],
				tasks: [ 'sass', 'kss' ] 
			},
			teplates: {
				files: [ 'template/**/*.html' ],
				tasks: [ 'kss' ]
			}
		}
	});

	grunt.registerTask('build', 	['sass', 'kss']);
	grunt.registerTask('default', 	['build', 'watch']);
};