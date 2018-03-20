var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var res = generateMessage('arvin','Test');
		expect(res.from).toBe('arvin');
		expect(res.text).toBe('Test');
		expect(typeof res.createdAt).toBe('number');
	});
});

describe('generateLocationMessage',()=>{
	it('should generate correct location message object',()=>{
		var res = generateLocationMessage('arvin','13.9354935','121.60888879999997');
		expect(res.url).toBe('https://www.google.com/maps?q=13.9354935,121.60888879999997');
		expect(res.from).toBe('arvin');
		expect(typeof res.createdAt).toBe('number');
	});
});