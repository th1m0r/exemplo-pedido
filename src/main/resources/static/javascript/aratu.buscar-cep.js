Aratu = Aratu || {};

Aratu.BuscarCep = (function() {

	function BuscarCep() {
		this.inputCep = $('#cep');
	}

	BuscarCep.prototype.iniciar = function() {
		this.inputCep.on('focusout', onCepInput.bind(this));
	}

	function onCepInput(evento) {
		evento.preventDefault();
		//var k = evento.which || evento.keyCode;
		//if (k == 13) {
			var cep = this.inputCep.val();
			fetch(`https://viacep.com.br/ws/${cep.replace('-','')}/json/`)
				.then(response => response.json())
  				.then(data => onPesquisaConcluida(data))
  				.catch(err => onErroPesquisa(err));
  							
{/*			$.ajax({
				url: `https://viacep.com.br/ws/${cep.replace('-','')}/json/`,
				method: 'GET',
				contentType: 'application/json',
				success: onPesquisaConcluida.bind(this),
				error: onErroPesquisa.bind(this)
			});*/}
		//}

	}

	function onPesquisaConcluida(resultado) {
		Swal.close();
		$('#cidade').val(resultado.localidade);
		$(`#uf option[value='${resultado.uf}']`).prop('selected', true);
		$('#bairro').val(resultado.bairro);
		$('#ibge').val(resultado.ibge);
				
		if(resultado.logradouro) {
			var logradouro = resultado.logradouro.split(' ');
			$(`#tipoLogradouro option[value='${logradouro[0].toUpperCase()}']`).prop('selected', true);
			$('#logradouro').val(logradouro.slice(1).join(' '));
			$('#numero').focus();		
		} else {
			$('#logradouro').val('');
			$('#tipoLogradouro').focus();			
		}
		
	}

	function onErroPesquisa(e) {
		console.log(e)
		Swal.fire('Oops!', e.responseText || 'Não foi possível consultar o cep.', 'error');
	}
	return BuscarCep;

}());

$(function() {
	var buscarCep = new Aratu.BuscarCep();
	buscarCep.iniciar();
});
