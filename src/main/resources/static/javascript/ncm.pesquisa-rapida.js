var Aratu = Aratu || {};

Aratu.PesquisaRapidaNcm = (function() {

	function PesquisaRapidaNcm() {
		this.pesquisaRapidaNcmModal = $('#pesquisaRapidaNcm');
		this.ncmDescricaoInput = $('#ncmDescricao');
		this.pesquisaRapidaBtn = $('.js-pesquisa-rapida-ncm-btn');
		this.containerTabelaPesquisa = $('#containerTabelaPesquisaRapidaNcm');
		this.htmlTabelaPesquisa = $('#tabela-pesquisa-rapida-ncm').html();
		this.template = Handlebars.compile(this.htmlTabelaPesquisa);
		this.mensagemErro = $('.js-mensagem-erro');
	}

	PesquisaRapidaNcm.prototype.iniciar = function() {
		this.pesquisaRapidaBtn.on('click', onPesquisaRapidaNcmClicado.bind(this));
		this.pesquisaRapidaNcmModal.on('shown.bs.modal', onModalPesquisaNcmShow.bind(this));
	}

	function onModalPesquisaNcmShow() {
		this.ncmDescricaoInput.focus();
	}

	function onPesquisaRapidaNcmClicado(event) {
		event.preventDefault();

		$.ajax({
			url : this.pesquisaRapidaNcmModal.find('form').attr('action'),
			method : 'GET',
			contentType : 'application/json',
			data : {			
				ncmDescricao : this.ncmDescricaoInput.val(),
			},
			success : onPesquisaNcmConcluida.bind(this),
			error : onErroPesquisaNcm.bind(this)
		});
	}

	function onPesquisaNcmConcluida(resultado) {
		Swal.close();
		this.mensagemErro.addClass('d-none');
		const html = this.template(resultado);
		this.containerTabelaPesquisa.html(html);

		const TabelaNcmPesquisaRapida = new Aratu.TabelaNcmPesquisaRapida(this.pesquisaRapidaNcmModal);
		TabelaNcmPesquisaRapida.iniciar();
	}

	function onErroPesquisaNcm() {
		this.mensagemErro.removeClass('d-none');
	}

	return PesquisaRapidaNcm;
}());

Aratu.TabelaNcmPesquisaRapida = (function() {
	function TabelaNcmPesquisaRapida(modal) {
		this.modalNcm = modal;
		this.ncm = $('.js-ncm-pesquisa-rapida');
	}

	TabelaNcmPesquisaRapida.prototype.iniciar = function() {
		this.ncm.on('click', onNcmSelecionado.bind(this));
	}

	function onNcmSelecionado(evento) {
		$('.js-mensagem-cadastro').addClass('d-none');
		this.modalNcm.modal('hide');
		const ncmSelecionado = $(evento.currentTarget);
		let ncm = {
			id: ncmSelecionado.data('id'),
			codigo: ncmSelecionado.data('codigo'),
			descricao: ncmSelecionado.data('descricao')
		}

		ncmSelecionado.trigger("ncm-selecionado", [ncm]);

		//$('.label-ncm-codigo').val(`${ncmSelecionado.data('codigo')} - ${ncmSelecionado.data('descricao')}`);
		//$('.produto-ncm-codigo').val(ncmSelecionado.data('codigo'));
	}

	return TabelaNcmPesquisaRapida;
}());

$(function() {
	const pesquisaRapidaNcm = new Aratu.PesquisaRapidaNcm();
	pesquisaRapidaNcm.iniciar();
});