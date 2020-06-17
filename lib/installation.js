module.exports = ({ config, fs, exec, createLink }) => {
    const { FILES_PATH } = config
    if(!fs.existsSync(FILES_PATH)) {
        fs.mkdirSync(FILES_PATH);
        exec(`
            cd ${FILES_PATH}
            git clone "https://github.com/flatiron-school/education-team-wiki.git" "Wiki"
            mkdir "Lecture-Code"
            echo ${JSON.stringify(JSON.stringify({"installed":{"client_id":"99498593105-cb5uudf69a4dqsketi51n2452derb08p.apps.googleusercontent.com","project_id":"eminent-ember-275300","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"KwHP76k9U-flD33DAdc5TiMt","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost:3000/oauth2callback"]}}))} > oauth2.keys.json
        `)
    }

}