const crypto = require("crypto");

exports.deterministicPartitionKeyRefactor = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
 
    if(!event) {
        return TRIVIAL_PARTITION_KEY;
    }

    /**
     * No need this if statement because we removed null case
     */
    //if (event) {
        if (event.partitionKey) {
            candidate = event.partitionKey;
        } else {
            const data = JSON.stringify(event);
            candidate = crypto.createHash("sha3-512").update(data).digest("hex");
        }
    //}

    /**
     * No need this if statement because candidate never be null
     */
    //if (candidate) {
        if (typeof candidate !== "string") {
            candidate = JSON.stringify(candidate);
        }
    //} 
    /**
     * No need this else statement because this is for only event is null 
     */
    //else {
    //    candidate = TRIVIAL_PARTITION_KEY;
    // }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    return candidate;
};