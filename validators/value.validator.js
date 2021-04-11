const { MAX_BUFFER_LENGTH } =  require("../constants/constants");

const checkValueSize = (value) => {
    const size = Buffer.byteLength(JSON.stringify(value)) / 1024;
    if (size > MAX_BUFFER_LENGTH)
        throw "Value cannot be greater than " + MAX_BUFFER_LENGTH + "."
    else
        return true;
}

module.exports = {
    checkValueSize
}