/**
 * jQbrick // SwipeEvents
 */

module.exports = function (grunt) {

// ----------------------------------------------------- //
// ---[[   G R U N T   C O N F I G U R A T I O N   ]]--- //
// ----------------------------------------------------- //

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		clean: {
			build: ['build/']
		},
		
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			src: ['src/**/*.js'],
			build: ['build/swipe-events.js']
		},
		
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> :: v<%= pkg.version %> :: <%= grunt.template.today("yyyy-mm-dd") %> */\n' + 
						'(function() {\n\n\n',
				footer: '\n\n\n})();'
			},
			scripts: {
				src: [
                    'src/config.js',
                    'src/swipe-events.js',
                    'src/mouse-events.js',
                    'src/touch-events.js',
                    'src/utils.js',
                    'src/utils-tolerance.js',
                    'src/utils-directions.js',
                    'src/public.js'
                ],
				dest: 'build/swipe-events.js'
			}
		},
        
        uglify: {
            build: {
                files: {
                    'build/swipe-events.min.js': ['build/swipe-events.js']
                }
            }
        },

		watch: {
			build: {
				files: ['src/**/*'],
				tasks: ['build']
			}
		}
		
	});


// ---------------------------------------------------//
// ---[[   L O A D   L I B R A R Y   T A S K S   ]]--- //
// ---------------------------------------------------//
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');



// --------------------------------------------- //
// ---[[   A V A I L A B L E   T A S K S   ]]--- //
// --------------------------------------------- //

	grunt.registerTask('build', [
		'clean:build', 
		'jshint:src', 
		'concat:scripts',
		'jshint:build',
        'uglify:build'
	]);
	
	grunt.registerTask('default', ['build']);

	grunt.registerTask('ci', ['build', 'watch:build']);
	
};


