function convertToArray(fileContent) {
	fileContent = fileContent.replaceAll("\r\n", "\n") ;
	var rawLines = parseToLines(fileContent) ;

	var ignoreCamma = false ;
	var element = "" ;
	var elements = [] ;
	var lines = [] ;

	for (var i=0; i<rawLines.length; i++) {
		col = 0 ;

		var rawLine = rawLines[i] ;

		if (rawLine == "") {
			continue ;
		}
		
		if (rawLine.startsWith("#")) {
			continue ;
		}

		for (var x=0; x<rawLine.length; x++) {
			var c = rawLine[x] ;

			if (c == '"') {
				ignoreCamma = !ignoreCamma ;
			} else if ((c == ',' || c == '\t') && !ignoreCamma) {
				elements.push(element) ;
				element = "" ;
			} else {
				element += c ;
			}
		}

		if (!ignoreCamma) {
			elements.push(element) ;
			lines.push(elements) ;

			element = "" ;
			elements = [] ;
		} else {
			element += '\n' ;
		}
	}

	return lines ;
}

function parseToLines(contents) {
	var lines = new Array() ;
	var ignoreCamma = false ;
	var line = "" ;

	for (var x=0; x<contents.length; x++) {
		var c = contents[x] ;

		if (c == '"') {
			ignoreCamma = !ignoreCamma ;
			line += c ;
		} else if (c == '\n' && !ignoreCamma) {
			lines.push(line) ;
			line = "" ;
		} else {
			line += c ;
		}
	}

	if (line != "") {
		lines.push(line) ;
	}

	return lines ;
}
