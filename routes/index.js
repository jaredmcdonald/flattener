module.exports = function() {
	var defGetter = require('../def-getter'),
		functions = {};

	// INDEX
	functions.index = function(req, res){
		res.render('index', { title: 'Express' });
	};

	// WORD API
	functions.getWord = function(req, res) {
		defGetter(req.params.word, function(definition){
			res.json({def : definition});			
		});
	};

	return functions;
};
