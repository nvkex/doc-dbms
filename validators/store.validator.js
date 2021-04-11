const { MAX_STORE_SIZE } =  require("../constants");

const formatData = (content) => {
    if (!content)
        return {};
    else
        return JSON.parse(content);
}

const validateStoreSize = (store) => {
    const storeSize = Buffer.byteLength(JSON.stringify(store)) / 1024;
    if (storeSize > MAX_STORE_SIZE)
        throw "Store size limit exceeded (" + MAX_STORE_SIZE + ")."
    else
    return true;
}

module.exports = {
    formatData,
    validateStoreSize
}