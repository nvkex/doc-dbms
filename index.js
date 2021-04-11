// Constants
const { DEFAULT_PATH, STORE_NAME } = require('./constants/constants');
const { readFromStore, initStore, writeToStore } = require('./fileOps');

// Validators
const { validateKeySize, validateKeyLife } = require('./validators/key.validator');
const { validateStoreSize } = require('./validators/store.validator');
const { checkValueSize } = require('./validators/value.validator');


class DataStorage {
    /**
     * Default constructor to initialize store path
     * @param {String} path Path to store
     */
    constructor(path) {
        if (path)
            this.path = path + STORE_NAME;
        else
            this.path = DEFAULT_PATH + STORE_NAME;

        this.connect();
    }

    /**
     * Connect to local store
     */
    async connect() {
        await initStore(this.path);
    }

    /**
     * Create a new key-value pair
     * @param {String} key 
     * @param {Object} value 
     * @param {Integer} ttl 
     * @returns Promise
     */
    async create(key, value, ttl = null) {

        // Validate key and value
        validateKeySize(key);
        checkValueSize(value);

        // Connect to Store
        await this.connect();

        // Read store contents
        var data = await readFromStore(this.path);

        // Check if key exists
        if (data[key]) {
            try {
                if (validateKeyLife(data[key]))
                    throw "Key already exists!"
            }
            catch {
                delete data[key];
            }
        }


        // Add key to store
        data[key] = { ...value, timeToLive: ttl, iat: parseInt(new Date().getTime() / 1000) };

        // Validate store size
        validateStoreSize(data);

        // Write data to store
        await writeToStore(data, this.path);

        // Return key without system defined variables
        delete data[key].timeToLive;
        delete data[key].iat;

        // Return promise
        return new Promise((resolve, reject) => {
            if (data[key])
                resolve(data[key]);
            else
                reject("Operation Failed!")
        });
    }

    /**
     * Read a key from store and return it in promise.
     * @param {String} key 
     * @returns Promise
     */
    async read(key) {

        // Check if key is passed
        if (!key)
            throw "Key cannot be empty!";

        // Connect to store
        await this.connect();

        // Read store contents
        var data = await readFromStore(this.path);

        // Validate key expiry
        validateKeyLife(data[key]);

        // Return key without system defined variables
        delete data[key].timeToLive;
        delete data[key].iat;

        // Return promise
        return new Promise((resolve, reject) => {
            if (data[key])
                resolve(data[key]);
            else
                reject("Operation Failed!")
        })
    }

    /**
     * Delete a key from store
     * @param {String} key 
     * @returns Promise
     */
    async delete(key) {
        // Check if key is passed
        if (!key)
            throw "Key cannot be empty!";

        // Connect to store
        await this.connect();

        // Read store contents
        var data = await readFromStore(this.path);

        // Validate key expiry
        validateKeyLife(data[key]);

        // Delete key from data
        delete data[key];

        // Write new data to store
        await writeToStore(data, this.path);

        // Return Promise
        return new Promise((resolve, reject) => {
            if (!data[key])
                resolve({ status: 200 });
            else
                reject("Operation Failed!")
        });
    }
}

module.exports = DataStorage;