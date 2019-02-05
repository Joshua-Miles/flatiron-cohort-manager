module.exports = () => (name) => {
    return (`
        open "${name}.webloc"
    `)
}