const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
 
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
 
    return [year, month, day].join('-');
}

const formatDatedmy = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
 
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
 
    return [day, month, year].join('-');
}

const FechaEdicion = (date) => {
    //let arregloDeSubCadenas = date.split(separador);
    //let arrayDate           = arregloDeSubCadenas[0].split(separador2); 
    var h = new Date(date);
    return h;
    //return [ arrayDate[2], arrayDate[1], arrayDate[0] ].join('-');
}

const FechaEdicionYMD = (date) => {
    let arregloDeSubCadenas = date.split('-');
    //let arrayDate           = arregloDeSubCadenas[0].split(separador2); 
    //var h = new Date(date);
    //return h;
    return [ arregloDeSubCadenas[2], arregloDeSubCadenas[1], arregloDeSubCadenas[0] ].join('-');
}


const CommaFormatted = (amount) => {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	 a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

export {
   formatDate,
   FechaEdicion,
   CommaFormatted,
   formatDatedmy,
   FechaEdicionYMD

}
  