module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: 'js/*.js',
                dest: 'js/build/global.min.js'
            }
        },

        sass: {
            options: {
                outputStyle: 'compressed',
            },
            dist: {
                files: {
                    'css/main.css': 'sass/main.scss',
                    'css/grid.css': 'sass/grid.scss',
                    'css/classic.css': 'sass/classic.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%']
            },
            no_dest: {
                src: 'css/*.css' // globbing is also possible here
            },
        },

        watch: {
            options: {
                livereload: 35730
            },
            site: {
                files: ["*.html", "**/*.html", "*.md", "**/*.md", "**/*.yml", "*.yml", "!_site/*.*", "!_site/**/*.*"],
                tasks: ["shell:jekyllBuild"]
            },
            js: {
                files: ["js/*.js"],
                tasks: ["uglify", "shell:jekyllBuild"]
            },
            css: {
                files: ["sass/*.scss", "sass/partials/*.scss", "sass/partials/components/*.scss", "sass/partials/layout/*.scss", "sass/modules/*.scss"],
                tasks: ["sass", "autoprefixer"]
            }
        },

        buildcontrol: {
            options: {
                dir: '_site',
                commit: true,
                push: true,
                message: 'Built _site from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'https://github.com/user/reponame.git', // change that
                    branch: 'gh-pages' // adjust here
                }
            }
        },

        shell: {
            jekyllServe: {
                command: "jekyll serve"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-build-control');

    // Default task(s).

    grunt.registerTask("serve", ["sass", "shell:jekyllServe"]);
    grunt.registerTask("default", ["sass", "autoprefixer", "watch:css"]);
    grunt.registerTask("deploy", ["buildcontrol:pages"]);
};

