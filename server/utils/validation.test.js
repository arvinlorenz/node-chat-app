var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',()=>{
	

	it('should reject non-string values',()=>{
		var res = isRealString(099);
		expect(res).toBe(false);
	});

	it('should reject string with only spacess',()=>{
		var res = isRealString('       ');
		expect(res).toBe(false);
	});

	it('should allow string with non-space characters',()=>{
		var res = isRealString('  arvin');
		expect(res).toBe(true);
	});
});
