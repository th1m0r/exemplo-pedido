var Aratu = Aratu || {};

$(function() {
	
	$("input, select").keypress(function(e) {
		var k = e.which || e.keyCode;
		if (k == 13) {
			e.preventDefault();
			console.log($(this).find('input'))
			console.log(e.target)
			$(this).next().find('button').first().focus();
		}	
	});    		


	var btnSalvarParametros = $("#btn-salvar-parametros");
	var modalIncluirParametros = $("#incluirParametrosModal");
	var divParametros = $("#box-parametros")	
	
	btnSalvarParametros.on("click", onBtnSalvarParametros.bind(this));
	btnSalvarParametros.on("focus", onBtnSalvarParametros.bind(this));	

	function onBtnSalvarParametros(e) {
		e.preventDefault();
		divParametros.html("");
		divParametros.append("<div><i class=\"mr-2 fas fa-key\"></i>" + $("#labelCertificado")[0].innerText + "</div>")
		modalIncluirParametros.modal('hide');
		
	}	

});