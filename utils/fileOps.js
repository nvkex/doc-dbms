const { formatData } = require('../validators/store.validator');
const fs = require('fs');

/**
 * Initialize store if it doesnt exist.
 * @param {String} path - Path to store
 */
const initStore = async (path) => {
    try {
        await fs.promises.access(path);
    }
    catch {
        fs.writeFile(path, '', (err) => {
            if (err)
                throw err;
        });
    }
}

/**
 * Read data from store
 * @param {String} path - Path to store
 * @returns Data from store
 */
const readFromStore = async (path) => {
    var content = await fs.readFileSync(path).toString('utf8');
    var data = formatData(content);
    return data
}

/**
 * Write data to store
 * @param {Object} data - Data in JSON format to be written to store
 * @param {String} path - Path to store
 * @returns success/error
 */
const writeToStore = async (data, path) => {
    try {
        await fs.writeFileSync(path, JSON.stringify(data));
        return true;
    }
    catch (err) {
        return err;
    }
}

module.exports = {
    initStore,
    readFromStore,
    writeToStore
}