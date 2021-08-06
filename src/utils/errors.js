class ThrowErrorCustom extends Error {
    constructor(options) {
        super();
        this.message = options.message || "Unknown Error";
        this.status = options.status || 404;
    }
}

module.exports = { ThrowErrorCustom };