class VerifyRequest {
	/**
	 * check request body to make sure it contains all required properties
	 * @param {Object} body the req.body
	 * @param {Array}  required property names that should be in request
	 */
	missing(body, required) { return required.filter(r => !body[r]) };

	/**
	 * strip out properties from req.body that are not in the table definition 
	 * or are not updarteable
	 * @param {*} body the req.body
	 * @param {*} allowed property names allowed in the request
	 */
	strip(body, allowed) {
		return allowed.filter(r => body[r]).reduce((acc, curr) => {
			acc[curr] = body[curr];
			return acc;
		},{});
	}
};

const verifyRequest = new VerifyRequest();

export default verifyRequest;
