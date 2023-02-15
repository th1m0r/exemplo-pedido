Aratu = Aratu || {};

Aratu.DialogoExcluir = (function() {
	
	function DialogoExcluir() {
		this.exclusaoBtn = $('.js-exclusao-btn')
	}
	
	DialogoExcluir.prototype.iniciar = function() {
		this.exclusaoBtn.on('click', onExcluirClicado.bind(this));
		
		if (window.location.search.indexOf('excluido') > -1) {
			Swal.fire('Pronto!', 'Excluído com sucesso!', 'success');
		}22
	}
	
	function onExcluirClicado(event) {
		event.preventDefault();
		var botaoClicado = $(event.currentTarget);
		var url = botaoClicado.data('url');
		var objeto = botaoClicado.data('objeto');
		
		Swal.fire({
			title: 'Tem certeza?',
			text: 'Excluir "' + objeto + '"? Você não poderá recuperar depois.',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não'
		})
		.then((result) => {
			if(result.value) {
				 onExcluirConfirmado(url)
			}
		});
	}
	
	function onExcluirConfirmado(url) {
		$.ajax({
			url: url,
			method: 'DELETE',
			success: onExcluidoSucesso.bind(this),
			error: onErroExcluir.bind(this)
		});
	}
	
	function onExcluidoSucesso() {
		var urlAtual = window.location.href;
		var separador = urlAtual.indexOf('?') > -1 ? '&' : '?';
		var novaUrl = urlAtual.indexOf('excluido') > -1 ? urlAtual : urlAtual + separador + 'excluido';
		
		window.location = novaUrl;
	}
	
	function onErroExcluir(e) {
		console.log(e)
		Swal.fire('Oops!', e.responseText || 'Não foi possível excluir o cliente.', 'error');
	}	
	return DialogoExcluir;
	
}());

$(function() {
	var dialogo = new Aratu.DialogoExcluir();
	dialogo.iniciar();
});
