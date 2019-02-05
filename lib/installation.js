module.exports = ({ config, fs, exec, createLink }) => {
    const { FILES_PATH } = config
    if(!fs.existsSync(FILES_PATH)) {
        fs.mkdirSync(FILES_PATH);
        exec(`
            cd ${FILES_PATH}
            git clone "https://github.com/flatiron-school/education-team-wiki.git" "Wiki"
        `)
    }

}