var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var res = generateMessage('arvin','Test');
		expect(res.from).toBe('arvin');
		expect(res.text).toBe('Test');
		expect(typeof res.createdAt).toBe('number');
	});
});