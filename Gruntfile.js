var grunt = require("grunt");
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            appDirectory: 'helloword/helloword-win32-x64',
            authors: 'luohui',
            exe: 'helloword.exe',
            description:"helloword",
            loadingGif:"./static/loading.gif",
            iconUrl:"./src/assets/logo.png"
        }       
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);