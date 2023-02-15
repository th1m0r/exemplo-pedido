var Aratu = Aratu || {};

Aratu.PesquisaRapidaNaturezaReceita = (function() {

	function PesquisaRapidaNaturezaReceita() {
		this.pesquisaRapidaNaturezaReceitaModal = $('#pesquisaRapidaNaturezaReceita');
		this.naturezaDescricaoInput = $('#naturezaReceitaDescricao');
		this.pesquisaRapidaBtn = $('.js-pesquisa-rapida-natureza-receita-btn');
		this.containerTabelaPesquisa = $('#containerTabelaPesquisaRapidaNaturezaReceita');
		this.htmlTabelaPesquisa = $('#tabela-pesquisa-rapida-natureza-receita').html();
		this.template = Handlebars.compile(this.htmlTabelaPesquisa);
		this.mensagemErro = $('.js-mensagem-erro');
	}

	PesquisaRapidaNaturezaReceita.prototype.iniciar = function() {
		this.pesquisaRapidaBtn.on('click', onPesquisaRapidaNaturezaReceitaClicado.bind(this));
		this.pesquisaRapidaNaturezaReceitaModal.on('shown.bs.modal', onModalPesquisaNaturezaReceitaShow.bind(this));
	}

	function onModalPesquisaNaturezaReceitaShow() {
		this.naturezaDescricaoInput.focus();
	}

	function onPesquisaRapidaNaturezaReceitaClicado(event) {
		event.preventDefault();

		$.ajax({
			url : this.pesquisaRapidaNaturezaReceitaModal.find('form').attr('action'),
			method : 'GET',
			contentType : 'application/json',
			data : {			
				st : this.naturezaDescricaoInput.val(),
			},
			success : onPesquisaNaturezaReceitaConcluida.bind(this),
			error : onErroPesquisaNaturezaReceita.bind(this)
		});
	}

	function onPesquisaNaturezaReceitaConcluida(resultado) {
		Swal.close();
		this.mensagemErro.addClass('d-none');
		const html = this.template(resultado);
		this.containerTabelaPesquisa.html(html);

		const TabelaNaturezaReceitaPesquisaRapida = new Aratu.TabelaNaturezaReceitaPesquisaRapida(this.pesquisaRapidaNaturezaReceitaModal);
		TabelaNaturezaReceitaPesquisaRapida.iniciar();
	}

	function onErroPesquisaNaturezaReceita() {
		this.mensagemErro.removeClass('d-none');
	}

	return PesquisaRapidaNaturezaReceita;
}());

Aratu.TabelaNaturezaReceitaPesquisaRapida = (function() {

	function TabelaNaturezaReceitaPesquisaRapida(modal) {
		this.modalNaturezaReceita = modal;
		this.ncm = $('.js-natureza-receita-pesquisa-rapida');
	}

	TabelaNaturezaReceitaPesquisaRapida.prototype.iniciar = function() {
		this.ncm.on('click', onNaturezaReceitaSelecionada.bind(this));
	}
	function onNaturezaReceitaSelecionada(evento) {
		$('.js-mensagem-cadastro').addClass('d-none');
		this.modalNaturezaReceita.modal('hide');
		const naturezaReceitaSelecionada = $(evento.currentTarget);
		$('#cadastro-produto-natureza-receita').val(`${naturezaReceitaSelecionada.data('codigo')} - ${naturezaReceitaSelecionada.data('descricao')}`);
		$('#cadastro-produto-natureza-receita-hidden').val(naturezaReceitaSelecionada.data('codigo'));
	}

	return TabelaNaturezaReceitaPesquisaRapida;
}());

$(function() {
	const pesquisaRapidaNaturezaReceita = new Aratu.PesquisaRapidaNaturezaReceita();
	pesquisaRapidaNaturezaReceita.iniciar();
});