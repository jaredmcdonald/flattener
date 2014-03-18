module.exports = function() {
	var defGetter = require('../def-getter'),
		inputProcessor = require('../input-processor')(defGetter),
		functions = {};

	// INDEX
	functions.index = function(req, res){
		res.render('index', { results : false });
	};

	// WORD API
	functions.getWord = function(req, res) {
		defGetter(req.params.word, function(definition){
			res.json({def : definition});			
		});
	};

	// SUBMITTED TEXT
	functions.text = function(req, res) {

		inputProcessor.process(req.body.text, function(array){
			res.render('index', { results : true, text : array.join(' ') })
		});
	
	};

	return functions;
};
