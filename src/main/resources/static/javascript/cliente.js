var Aratu = Aratu || {};

$(function() {
	
	$("input, select").keypress(function(e) {
		var k = e.which || e.keyCode;
		if (k == 13) {
			e.preventDefault();
			$(this).next().find('input').first().focus();
		}	
	});    		


	var divEndereco = $("#box-endereco");
	var divTelefone = $("#box-telefone");
	
	

	var btnSalvarEndereco = $("#btn-salvar-endereco");
	var btnSalvarTelefone = $("#btn-salvar-telefone");
	

	var modalIncluirEnderenco = $("#incluirEnderecoModal");
	var modalIncluirTelefone = $("#incluirTelefoneModal");
		
	
	var selectTipoCliente = $("#tipoCliente");
	
	modalIncluirTelefone.on("shown.bs.modal", onModalTelefoneShow.bind(this));
	modalIncluirEnderenco.on("shown.bs.modal", onModalEnderecoShow.bind(this));	
	selectTipoCliente.on("change", onTipoClienteSelect.bind(this));
	btnSalvarEndereco.on("click", onBtnSalvarEndereco.bind(this));
	btnSalvarTelefone.on("click", onBtnSalvarTelefone.bind(this));	

	function onModalEnderecoShow(e) {
		$("#cep").focus();
	}
	
	function onModalTelefoneShow(e) {
		$("#contato").focus();
	}
	

	
	function onBtnSalvarEndereco(e) {
		e.preventDefault();
		modalIncluirEnderenco.modal('hide');
		divEndereco.html("");
		divEndereco.append("<div>" + $("#tipoLogradouro").val() + " " +
			 $("#logradouro").val() + ", " +			 $("#numero").val() + " - " +
			 $("#complemento").val() + "</div>")
		divEndereco.append("<div>" + $("#bairro").val() + "</div>")
		divEndereco.append("<div>" + $("#cidade").val() + "/" + $("#uf").val() + "</div>")
		divEndereco.append("<div>" + $("#cep").val() + "</div>")
	}

	function onBtnSalvarTelefone(e) {
		e.preventDefault();
		modalIncluirTelefone.modal('hide');
		divTelefone.html("");
		divTelefone.append("<div>" + $("#contato").val() + "</div>")
		divTelefone.append("<div>" + $("#email").val() + "</div>")
		divTelefone.append("<div>" + $("#telefone").val() + "</div>")
	}
	
	
	function onTipoClienteSelect(event) {
		event.preventDefault();
		$("#tipoFidelidade").val($('#tipoCliente option:selected').attr('class'));	
	}

});