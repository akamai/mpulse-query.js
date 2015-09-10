var log = require("../util/log"),
    api = require("../util/api");

function Query(queryUrl, apikey) {
    this.endpoint = queryUrl;
    this.apiKey = apikey;
}

Query.prototype.run = function (token, type, props, callback) {
    log.debug("run(token=" + token + ", type=" + type+ ", props=" + JSON.stringify(props) + ")");

    api(token, this.buildUrl(type), "GET", props, function(error, responseBody) {
	if(error) {
	    callback(error, null);
	    return;
	}

	callback(null, responseBody);
    });
}

Query.prototype.buildUrl = function (type, props) {
    var params = "";
    for(var name in props) {
	if (props.hasOwnProperty(name)) {
	    params += "&" + name + "=" + encodeURIComponent(props[name]);
	}
    }
    return this.endpoint + "/" + this.apiKey + "/" + type + "?format=json" + params;
};

module.exports = Query;
