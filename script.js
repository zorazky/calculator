function getHistory() {
	return document.getElementById('history-value').innerText;
}

function printHistory(num) {
	document.getElementById('history-value').innerText = num;
}

function getOutput() {
	return document.getElementById('output-value').innerText;
}

function printOutput(num) {
	if (num === '') {
		document.getElementById('output-value').innerText = num;
	} else {
		document.getElementById('output-value').innerText = getFormattedNumber(num);
	}
	
}

function getFormattedNumber(num) {
	if ( num === '-') {
		return ''
	}
	let n = Number(num);
	let value = n.toLocaleString('en');
	return value;
}

function reverseNumberFormat(num) {
	return Number(num.replace(/,/g,''));
}

//this is not an array is a HTML collection of nodes
const operators = document.getElementsByClassName('operator');

[...operators].forEach(function(operator) {
	operator.addEventListener('click', function() {
		if (operator.id === 'clear') {
			printHistory('');
			printOutput('')
		} else if (operator.id === 'backspace') {
			let output = reverseNumberFormat(getOutput()).toString();
			if (output) {
				output = output.substr(0, output.length - 1);
				printOutput(output);
			}
		} else {
			let output = getOutput();
			let history = getHistory();
			if (output === '' && history !== '') {
				if (isNaN(history[history.length-1])) {
					history = history.substr(0, history.length-1);
				}
			}
			if (output !== '' || history !== '') {
				output = output === '' ? output : reverseNumberFormat(output);
				history = history + output;
				if (operator.id === '=') {
					let result = eval(history);
					printOutput(result);
					printHistory('');
				} else {
					history = history + operator.id;
					printHistory(history);
					printOutput('')
				}
			}
		}
	}) 
  });

  const numbers = document.getElementsByClassName('number');

[...numbers].forEach(function(number) {
	number.addEventListener('click', function() {
		let output = reverseNumberFormat(getOutput());
		if (output !== NaN) {
			output = output+number.id;
			printOutput(output);
		}
	})
  });
  
  