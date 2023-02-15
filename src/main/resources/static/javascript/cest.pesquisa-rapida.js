var Aratu = Aratu || {};

Aratu.PesquisaRapidaCest = (function () {

    function PesquisaRapidaCest() {
        this.pesquisaRapidaCestModal = $('#pesquisaRapidaCest');
        this.codigoNcmInput = $('#pesquisaCestCodigoNcm');
        this.pesquisaRapidaBtn = $('.js-pesquisa-rapida-cest-btn');
        this.containerTabelaPesquisa = $('#containerTabelaPesquisaCest');
        this.htmlTabelaPesquisa = $('#tabela-pesquisa-rapida-cest').html();
        this.template = Handlebars.compile(this.htmlTabelaPesquisa);
        this.mensagemErro = $('.js-mensagem-erro');
    }

    PesquisaRapidaCest.prototype.iniciar = function () {
        this.pesquisaRapidaBtn.on('click', onPesquisaRapidaCestClicado.bind(this));
        this.pesquisaRapidaCestModal.on('shown.bs.modal', onModalPesquisaCestShow.bind(this));

        $(document).on("ncm-selecionado", (event, ncm) => {
            this.codigoNcmInput.val(ncm.codigo);
            this.pesquisaRapidaBtn.click();
        });
    }

    function onModalPesquisaCestShow() {
        this.codigoNcmInput.focus();
    }

    function onPesquisaRapidaCestClicado(event) {
        event.preventDefault();
        $.ajax({
            url: this.pesquisaRapidaCestModal.find('form').attr('action'),
            method: 'GET',
            contentType: 'application/json',
            data: {
                codigoNcm: this.codigoNcmInput.val() + "%",
            },
            success: onPesquisaCestConcluida.bind(this),
            error: onErroPesquisaCest.bind(this)
        });
    }

    function onPesquisaCestConcluida(resultado) {
        Swal.close();
        this.mensagemErro.addClass('d-none');
        const html = this.template(resultado);
        this.containerTabelaPesquisa.html(html);

        const TabelaCestPesquisaRapida = new Aratu.TabelaCestPesquisaRapida(this.pesquisaRapidaCestModal);
        TabelaCestPesquisaRapida.iniciar();
    }

    function onErroPesquisaCest() {
        this.mensagemErro.removeClass('d-none');
    }

    return PesquisaRapidaCest;

}());

Aratu.TabelaCestPesquisaRapida = (function () {

    function TabelaCestPesquisaRapida(modal) {
        this.modalCest = modal;
        this.cest = $('.js-cest-pesquisa-rapida');
    }

    TabelaCestPesquisaRapida.prototype.iniciar = function () {
        this.cest.on('click', onCestSelecionado.bind(this));
    }

    function onCestSelecionado(evento) {
        $('.js-mensagem-cadastro').addClass('d-none');
        this.modalCest.modal('hide');
        const cestSelecionado = $(evento.currentTarget);
        let cest = {
            id: cestSelecionado.data('id'),
            codigo: cestSelecionado.data('codigo'),
            descricao: cestSelecionado.data('descricao')
        }
        cestSelecionado.trigger("cest-selecionado", [cest]);
    }

    return TabelaCestPesquisaRapida;

}());

$(function () {
    const pesquisaRapidaCest = new Aratu.PesquisaRapidaCest();
    pesquisaRapidaCest.iniciar();
});