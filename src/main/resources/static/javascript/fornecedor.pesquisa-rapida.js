var Aratu = Aratu || {};

Aratu.PesquisaRapidaFornecedor = (function () {

    function PesquisaRapidaFornecedor() {
        this.pesquisaRapidaFornecedorModal = $('#pesquisaRapidaFornecedor');
        this.razaoSocialInput = $('#pesquisaFornecedorRazaoSocial');
        this.pesquisaRapidaBtn = $('.js-pesquisa-rapida-fornecedor-btn');
        this.containerTabelaPesquisa = $('#containerTabelaPesquisaFornecedor');
        this.htmlTabelaPesquisa = $('#tabela-pesquisa-rapida-fornecedor').html();
        this.template = Handlebars.compile(this.htmlTabelaPesquisa);
        this.mensagemErro = $('.js-mensagem-erro');
    }

    PesquisaRapidaFornecedor.prototype.iniciar = function () {
        this.pesquisaRapidaBtn.on('click', onPesquisaRapidaFornecedorClicado.bind(this));
        this.pesquisaRapidaFornecedorModal.on('shown.bs.modal', onModalPesquisaFornecedorShow.bind(this));
    }

    function onModalPesquisaFornecedorShow() {
        this.razaoSocialInput.focus();
    }

    function onPesquisaRapidaFornecedorClicado(event) {
        event.preventDefault();
        $.ajax({
            url: this.pesquisaRapidaFornecedorModal.find('form').attr('action'),
            method: 'GET',
            contentType: 'application/json',
            data: {
                razaoSocial: this.razaoSocialInput.val(),
            },
            success: onPesquisaFornecedorConcluida.bind(this),
            error: onErroPesquisaFornecedor.bind(this)
        });
    }

    function onPesquisaFornecedorConcluida(resultado) {
        Swal.close();
        this.mensagemErro.addClass('d-none');
        const html = this.template(resultado);
        this.containerTabelaPesquisa.html(html);

        const TabelaFornecedorPesquisaRapida = new Aratu.TabelaFornecedorPesquisaRapida(this.pesquisaRapidaFornecedorModal);
        TabelaFornecedorPesquisaRapida.iniciar();
    }

    function onErroPesquisaFornecedor() {
        this.mensagemErro.removeClass('d-none');
    }

    return PesquisaRapidaFornecedor;

}());

Aratu.TabelaFornecedorPesquisaRapida = (function () {

    function TabelaFornecedorPesquisaRapida(modal) {
        this.modalFornecedor = modal;
        this.fornecedor = $('.js-fornecedor-pesquisa-rapida');
    }

    TabelaFornecedorPesquisaRapida.prototype.iniciar = function () {
        this.fornecedor.on('click', onFornecedorSelecionado.bind(this));
    }

    function onFornecedorSelecionado(evento) {
        $('.js-mensagem-cadastro').addClass('d-none');
        this.modalFornecedor.modal('hide');
        const fornecedorSelecionado = $(evento.currentTarget);
        let fornecedor = {
            id: fornecedorSelecionado.data('id'),
            razaoSocial: fornecedorSelecionado.data('razao-social'),
            nomeFantasia: fornecedorSelecionado.data('nome-fantasia')
        }
        fornecedorSelecionado.trigger("fornecedor-selecionado", [fornecedor]);
    }

    return TabelaFornecedorPesquisaRapida;

}());

$(function () {
    const pesquisaRapidaFornecedor = new Aratu.PesquisaRapidaFornecedor();
    pesquisaRapidaFornecedor.iniciar();
});