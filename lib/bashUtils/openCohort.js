module.exports = ({ config, state }) => (name = state.activeCohortName) => {
    const { FILES_PATH } = config
    return (`
        cd "${FILES_PATH}/${name}"
    `)
}