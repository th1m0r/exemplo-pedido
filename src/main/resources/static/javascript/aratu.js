var Aratu = Aratu || {};

Aratu.MaskMoney = (function () {

    function MaskMoney() {
        this.decimal = $('.js-decimal');
        this.plain = $('.js-plain');
    }

    MaskMoney.prototype.enable = function () {
        this.decimal.maskNumber({decimal: ',', thousands: '.'});
        this.plain.maskNumber({integer: true, thousands: '.'});
    }
    return MaskMoney;
}());

Aratu.MaskPhoneNumber = (function () {
    function MaskPhoneNumber() {
        this.inputPhoneNumber = $('.js-phone-number');
    }

    MaskPhoneNumber.prototype.enable = function () {
        var maskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        };

        var options = {
            onKeyPress: function (val, e, field, options) {
                field.mask(maskBehavior.apply({}, arguments), options);
            }
        };
        this.inputPhoneNumber.mask(maskBehavior, options);
    }
    return MaskPhoneNumber;
}());

Aratu.MaskCep = (function () {
    function MaskCep() {
        this.inputCep = $('.js-cep');
    }

    MaskCep.prototype.enable = function () {
        this.inputCep.mask('00000-000');
    }

    return MaskCep;
}());

Aratu.MaskDate = (function () {

    function MaskDate() {
        this.inputDate = $('.js-date');
    }

    MaskDate.prototype.enable = function () {
        this.inputDate.mask('00/00/0000');
        this.inputDate.datepicker({
            orientation: 'bottom',
            language: 'pt-BR',
            autoclose: true
        });
    }
    return MaskDate;
}());

Aratu.Security = (function () {
    function Security() {
        this.token = $('input[name=_csrf]').val();
        this.header = $('input[name=_csrf_header]').val();
    }

    Security.prototype.enable = function () {
        $(document).ajaxSend(function (event, jqxhr, settings) {
            jqxhr.setRequestHeader(this.header, this.token);
        }.bind(this));
    }
    return Security;
}());

numeral.locale('pt-br');

let data_options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Recife'
};

let formatar = new Intl.DateTimeFormat('pt-BR', data_options);
let formatarData = new Intl.DateTimeFormat('pt-BR');

Aratu.formatarMoeda = function (valor) {
    return numeral(valor).format('0.0,');
}

Aratu.formatarQuantidade = function (valor) {
    return numeral(valor).format('0.0,0');
}

Aratu.recuperarValor = function (valorFormatado) {
    return numeral().unformat(valorFormatado);
}

Aratu.formatarDataHora = data => formatar.format(data)
Aratu.formatarData = data => formatarData.format(data)

$(function () {
    let maskMoney = new Aratu.MaskMoney();
    maskMoney.enable();

    let maskPhoneNumber = new Aratu.MaskPhoneNumber();
    maskPhoneNumber.enable();

    let maskCep = new Aratu.MaskCep();
    maskCep.enable();

    let maskDate = new Aratu.MaskDate();
    maskDate.enable();

    // let security = new Aratu.Security();
    // security.enable();
});
