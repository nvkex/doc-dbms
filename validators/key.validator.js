const { MAX_KEY_LENGTH } =  require("../constants/constants");


const validateKeySize = (key) => {
    if (key.length > MAX_KEY_LENGTH)
        throw "Key cannot be of more than " + MAX_KEY_LENGTH + " characters.";
    else
        return true;
}

const validateKeyLife = (data) => {
    if(!data)
        throw "Key doesn't exist in store!";
    if(data.timeToLive == null)
        return true;
    
    const currentTime = parseInt(new Date().getTime()/1000);
    if(currentTime - data.iat > data.timeToLive)
        throw "Key expired. Cannot operate on this key."
    else
        return true;
}

module.exports = {
    validateKeySize,
    validateKeyLife
}