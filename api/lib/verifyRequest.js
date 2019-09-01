class VerifyRequest {
	missing(body, properties) { return properties.filter(r => !body[r]) };

	strip(body, properties) {
		return properties.filter(r => body[r]).reduce((acc, curr) => {
			acc[curr] = body[curr];
			return acc;
		},{});
	}
};

const verifyRequest = new VerifyRequest();

export default verifyRequest;
