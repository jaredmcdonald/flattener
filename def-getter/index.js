// this module processes definitions returned from ../dictionary-module

var dictionary = require('../dictionary-module');

dictionary.configure('62003798-387a-4ed6-a397-b4a6acb020e3');

// private function to return random number between 0 and n
var randomNumber = function(n) {
	return Math.floor((Math.random() * (n + 1) ));
};

// private function to drill into definition response and extract some text
var getRandomDefinition = function (entries) {
	var whichEntry = randomNumber(entries.length),
		def = { 
			hasDefinition: false,
			description: null
		},
		attempts = 0,
		maxAttempts = 20;

	// make 20 attempts to get a definition
	while (attempts < maxAttempts && !(entries[whichEntry] && entries[whichEntry].def && entries[whichEntry].def[0].dt &&
		   typeof entries[whichEntry].def[0].dt[0] === 'string') ) {
		attempts++;

		if (attempts === maxAttempts) {
			return def;
		}
		whichEntry = randomNumber(entries.length);
	}

	def.hasDefinition = true;
	def.description = entries[whichEntry].def[0].dt[0].replace(/^\:/, '');

	return def;
};

module.exports = function(word, callback) {
	dictionary.getWord(word, function(definition){
		
		if (!definition || !definition.entry_list || !definition.entry_list.entry || !definition.entry_list.entry.length) {
			callback({
				hasDefinition: false,
				description: null
			});
		} else {
			def = getRandomDefinition(definition.entry_list.entry)
			callback(def);
		}

	});
};