var Aratu = Aratu || {};

Aratu.MascaraCpfCnpj = (function() {
	
	function MascaraCpfCnpj() {
		this.radioTipoPessoa = $('.js-radio-tipo-pessoa');
		this.labelCpfCnpj = $('[for=cpfOuCnpj]');
		this.inputCpfCnpj = $('#cpfOuCnpj');
		this.labelRgIe = $('[for=rgOuIe]');
		this.inputRgIe = $('#rgOuIe');
		this.inputIm = $('#im');
	}
	
	MascaraCpfCnpj.prototype.iniciar = function() {
		this.radioTipoPessoa.on('change', onTipoPessoaAlterado.bind(this));
		var tipoPessoaSelecionada = this.radioTipoPessoa.filter(':checked')[0];
		if (tipoPessoaSelecionada) {
			aplicarMascara.call(this, $(tipoPessoaSelecionada));
		}
	}
	
	function onTipoPessoaAlterado(evento) {
		var tipoPessoaSelecionada = $(evento.currentTarget);
		aplicarMascara.call(this, tipoPessoaSelecionada);
		this.inputCpfCnpj.val('');
		this.inputRgIe.val('');
	}
	
	function aplicarMascara(tipoPessoaSelecionada) {
		this.labelCpfCnpj.text(tipoPessoaSelecionada.data('documentofederal'));
		this.labelRgIe.text(tipoPessoaSelecionada.data('documentoestadual'));
		this.inputCpfCnpj.attr('placeholder', tipoPessoaSelecionada.data('documentofederal'));
		this.inputRgIe.attr('placeholder', tipoPessoaSelecionada.data('documentoestadual'));
		this.inputCpfCnpj.mask(tipoPessoaSelecionada.data('mascara'));
		this.inputCpfCnpj.removeAttr('disabled');
		this.inputRgIe.removeAttr('disabled');
		if(tipoPessoaSelecionada.val()=== 'JURIDICA') {
			this.inputIm.removeAttr('disabled');		
		} else {
			this.inputIm.attr('disabled', 'disabled');
		}
	}
	
	return MascaraCpfCnpj;
	
}());

$(function() {
	var mascaraCpfCnpj = new Aratu.MascaraCpfCnpj();
	mascaraCpfCnpj.iniciar();
});