'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	//host: 'mongodb://userexample:us3rP4ssw0rd@localhost:27017/example',	
	//host: 'mongodb://gib:qwerty@ds245805.mlab.com:45805/heroku_dt4zfk5h',
	host: 'mongodb://heroku_xkszw8tl:5g64asgbist33iset5veufb2po@ds219051.mlab.com:19051/heroku_xkszw8tl',
	jwtSecret: 'MyS3cr3tK3Y',
	port: 3000,
	bodyLimit: '100kb',
	corsHeaders: ['Link'],
	//authTokenExpiresIn: 3600,
	authTokenExpiresIn: 360000,
	refreshTokenExpiresIn: 2592000
};
//# sourceMappingURL=config.js.map