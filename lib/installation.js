module.exports = ({ config, fs, exec, createLink }) => {
    const { FILES_PATH } = config
    if(!fs.existsSync(FILES_PATH)) {
        fs.mkdirSync(FILES_PATH);
        exec(`
            cd ${FILES_PATH}
            ${createLink('https://learn.co/curriculum', 'curriculum')}
            ${createLink('https://github.com/flatiron-school/education-team-wiki', 'wiki')}
        `)
    }

}