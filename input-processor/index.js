// process inputted text

module.exports = function(defGetter) {
	var functions = {};

	functions.process = function(text, callback) {
		// pick out words, filtering out blank array items
		var words = text.split(/\s/g).filter(function(word){
			return !!word;
		});

		var defs = [],
			count = 0;

		words.forEach(function(word){
			defGetter(word, function(def) {
				count++;
				if (def.hasDefinition) {
					defs.push(def.description);
				}
				if (count === words.length){
					callback(defs);
				}
			});
		});

	};

	return functions;
}