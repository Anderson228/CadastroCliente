/ **
    * jquery.mask.js
    * @version: v1.14.16
        * @autor: Igor Escobar
            *
 * Criado por Igor Escobar em 10 / 03 / 2012. Por favor, reporte qualquer bug em github.com / igorescobar / jQuery - Mask - Plugin
    *
 * Copyright(c) 2012 Igor Escobar http://igorescobar.com
 *
 * A licença do MIT(http://www.opensource.org/licenses/mit-license.php)
 *
 * A permissão é concedida, gratuitamente, a qualquer pessoa
    * obter uma cópia deste software e documentação associada
    * arquivos(o "Software"), para lidar com o Software sem
    * restrição, incluindo, sem limitação, os direitos de uso,
 * copiar, modificar, mesclar, publicar, distribuir, sublicenciar e / ou vender
    * cópias do Software e para permitir pessoas a quem o
        * O software é fornecido para isso, sujeito às seguintes
            * condições:
 *
 * O aviso de direitos autorais acima e este aviso de permissão serão
    * incluído em todas as cópias ou partes substanciais do software.
 *
 * O SOFTWARE É FORNECIDO "TAL COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO,
 * EXPRESSOS OU IMPLÍCITOS, INCLUINDO MAS NÃO SE LIMITANDO A GARANTIAS
    * DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM OBJETIVO ESPECÍFICO E
        * NÃO INFRACÇÃO.EM NENHUM CASO OS AUTORES OU OS DIREITOS DE AUTOR
            * OS TITULARES SÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE,
 * EM UMA AÇÃO DE CONTRATO, TORT OU DE OUTRA FORMA, DECORRENTE
    * DE, FORA OU EM CONEXÃO COM O SOFTWARE OU O USO OU
        * OUTROS NEGÓCIOS NO SOFTWARE.
 * /

            / * jshint laxbreak: true * /
                / * jshint maxcomplexity: 17 * /
                    / * definição global * /

                        // Padrões UMD (Universal Module Definition) para módulos JavaScript que funcionam em qualquer lugar.
                        // https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
                        (function (factory, jQuery, Zepto) {

                            if (typeof define === 'função' && define.amd) {
                                define(['jquery'], fábrica);
                            } else if (typeof exportações === 'objeto' && typeof Meteor === 'indefinido') {
                                module.exports = factory(require('jquery'));
                            } outro {
                                fábrica(jQuery || Zepto);
                            }

                        }(função($) {
                            'use strict';

                            var Máscara = função(el, máscara, opções) {

                                var p = {
                                    inválido: [],
                                    getCaret: function () {
                                        experimentar {
                                            var sel,
                                                pos = 0,
                                                ctrl = el.get(0),
                                                dSel = document.selection,
                                                cSelStart = ctrl.selectionStart;

                                            // Suporte do IE
                                            if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                                                sel = dSel.createRange();
                                                sel.moveStart('caractere', -p.val().comprimento);
                                                pos = sel.text.length;
                                            }
                                            // suporte ao Firefox
                                            caso contrário, se(cSelStart || cSelStart === '0') {
                                                pos = cSelStart;
                                            }

                                            retorno pos;
                                        } captura(e) { }
                                    }
            setCaret: function (pos) {
                                        experimentar {
                                            if (el.is(': focus')) {
                                                var range, ctrl = el.get(0);

                                                // Firefox, WebKit, etc.
                                                if (ctrl.setSelectionRange) {
                                                    ctrl.setSelectionRange(pos, pos);
                                                } mais {// IE
                                                    range = ctrl.createTextRange();
                                                    range.collapse(true);
                                                    range.moveEnd('caractere', pos);
                                                    range.moveStart('caractere', pos);
                                                    range.select();
                                                }
                                            }
                                        } captura(e) { }
                                    }
            events: function () {
                                        el
                                            .on('keydown.mask', função(e) {
                                                el.data('código-chave da máscara', e.keyCode || e.qual);
                                                el.data('valor do valor da máscara', el.val());
                                                el.data('máscara-previus-caret-pos', p.getCaret());
                                                p.maskDigitPosMapOld = p.maskDigitPosMap;
                                            })
                                            .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.comportamento)
                                            .on('paste.mask drop.mask', function () {
                                                setTimeout(function () {
                                                    el.keydown().keyup();
                                                } 100);
                                            })
                                            .on('change.mask', function () {
                                                el.data('alterado', verdadeiro);
                                            })
                                            .on('blur.mask', function () {
                                                if (oldValue! == p.val() && !el.data('alterado')) {
                                                    el.trigger('mudança');
                                                }
                                                el.data('alterado', falso);
                                            })
                                            // é muito importante que esse retorno de chamada permaneça nessa posição
                                            // otherwhise oldValue vai funcionar de buggy
                                            .on('blur.mask', function () {
                                                valorValor = p.val();
                                            })
                                            // seleciona todo o texto em foco
                                            .on('focus.mask', função(e) {
                                                if(options.selectOnFocus === true) {
                                            $(e.target).select();
                                        }
                                    })
                            // limpe o valor se não concluir a máscara
                            .on('focusout.mask', function () {
                                if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                                    p.val('');
                                }
                            });
            }
getRegexMask: function () {
    var maskChunks = [], tradução, padrão, opcional, recursiva, oRecursive, r;

    for (var i = 0; i < comprimento da máscara; i++) {
        tradução = jMask.translation[mask.charAt(i)];

        if (tradução) {

            pattern = translation.pattern.toString().replace(/. {1} $ | ^. {1} / g, '');
            opcional = tradução.opcional;
            recursivo = tradução.recursivo;

            if (recursivo) {
                maskChunks.push(mask.charAt(i));
                oRecursive = { dígito: mask.charAt(i), padrão: padrão };
            } outro {
                maskChunks.push(!opcional && !recursive ? padrão : (padrão + '?'));
            }

        } outro {
            maskChunks.push(mask.charAt(i).replace(/ [- \ / \\ ^ $ * + ?. () | [\] {}] / g, '\\ $ &'));
        }
    }

    r = maskChunks.join('');

    if (oRecursive) {
        r = r.replace(new RegExp('(' + oRecursive.digit + '(. *' + oRecursive.digit + ')?)'), '($ 1)?')
            .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
    }

    retornar novo RegExp(r);
}
destroyEvents: function () {
    el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('. mask'));
}
val: function (v) {
    var isInput = el.is('entrada'),
        method = isInput ? 'val' : 'texto',
        r;

    if (argument.length > 0) {
        if (el[método]()! == v) {
            el[método](v);
        }
        r = el;
    } outro {
        r = el[método]();
    }

    retornar r;
}
calculateCaretPosition: function (oldVal) {
    var newVal = p.getMasked(),
        caretPosNew = p.getCaret();
    if (oldVal! == newVal) {
        var caretPosOld = el.data('mask-previus-caret-pos') || 0,
            newValL = newVal.length,
            oldValL = oldVal.length,
            maskDigitsBeforeCaret = 0,
            maskDigitsAfterCaret = 0,
            maskDigitsBeforeCaretAll = 0,
            maskDigitsBeforeCaretAllOld = 0,
            i = 0;

        para(i = caretPosNew; i < newValL; i++) {
            if (!p.maskDigitPosMap[i]) {
                pausa;
            }
            maskDigitsAfterCaret++;
        }

        para(i = caretPosNew - 1; i > = 0; i--) {
            if (!p.maskDigitPosMap[i]) {
                pausa;
            }
            maskDigitsBeforeCaret++;
        }

        para(i = caretPosNew - 1; i > = 0; i--) {
            if (p.maskDigitPosMap[i]) {
                maskDigitsBeforeCaretAll++;
            }
        }

        para(i = caretPosOld - 1; i > = 0; i--) {
            if (p.maskDigitPosMapOld[i]) {
                maskDigitsBeforeCaretAllOld++;
            }
        }

        // se o cursor estiver no final, mantenha-o lá
        if (caretPosNew > oldValL) {
            caretPosNew = newValL * 10;
        } se if (caretPosOld > = caretPosNew && caretPosOld! == oldValL) {
            if (!p.maskDigitPosMapOld[caretPosNew]) {
                var caretPos = caretPosNew;
                caretPosNew - = maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
                caretPosNew - = maskDigitsBeforeCaret;
                if (p.maskDigitPosMap[caretPosNew]) {
                    caretPosNew = caretPos;
                }
            }
        }
                    else if (caretPosNew > caretPosOld) {
            caretPosNew + = maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
            caretPosNew + = maskDigitsAfterCaret;
        }
    }
    retornar caretPosNew;
}
comportamento: função(e) {
    e = e || window.event;
    p.invalid = [];

    var keyCode = el.data('código-chave da máscara');

    if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
        var newVal = p.getMasked(),
            caretPos = p.getCaret(),
            oldVal = el.data('valor-máscara-previus') || '';

        // isso é uma compensação para dispositivos / navegadores que não compensam
        // cursor de posicionamento da maneira certa
        setTimeout(function () {
            p.setCaret(p.calculateCaretPosition(oldVal));
        }, $.jMaskGlobals.keyStrokeCompensation);

        p.val(newVal);
        p.setCaret(caretPos);
        retornar p.callbacks(e);
    }
}
getMasked: function (skipMaskChars, val) {
    var buf = [],
        valor = val === indefinido ? p.val() : val + '',
        m = 0, maskLen = mask.length,
        v = 0, valLen = value.length,
        offset = 1, addMethod = 'push',
        resetPos = -1,
        maskDigitCount = 0,
        maskDigitPosArr = [],
        lastMaskChar,
        Verifica;

    if (options.reverse) {
        addMethod = 'unshift';
        deslocamento = -1;
        lastMaskChar = 0;
        m = maskLen - 1;
        v = valLen - 1;
        check = function () {
            retornar m > -1 && v > -1;
        };
    } outro {
        lastMaskChar = maskLen - 1;
        check = function () {
            retornar m < maskLen && v < valLen;
        };
    }

    var lastUntranslatedMaskChar;
    while (check()) {
        var maskDigit = mask.charAt(m),
            valDigit = value.charAt(v),
            tradução = jMask.translation[maskDigit];

        if (tradução) {
            if (valDigit.match(translation.pattern)) {
                buf[addMethod](valDigit);
                if (translation.recursive) {
                    if (resetPos === -1) {
                        resetPos = m;
                    } else if (m === lastMaskChar && m! == resetPos) {
                        m = resetPos - deslocamento;
                    }

                    if (lastMaskChar === resetPos) {
                        m - = deslocamento;
                    }
                }
                m + = deslocamento;
            } else if (valDigit === lastUntranslatedMaskChar) {
                // correspondeu ao último caractere de máscara não traduzido (bruto) que encontramos
                // provavelmente uma inserção desloca o caractere de máscara da última entrada; cair
                // por meio e apenas incrementa v
                maskDigitCount--;
                lastUntranslatedMaskChar = indefinido;
            } senão se(translation.optional) {
                m + = deslocamento;
                v - = deslocamento;
            } senão se(translation.fallback) {
                buf[addMethod](translation.fallback);
                m + = deslocamento;
                v - = deslocamento;
            } outro {
                p.invalid.push({ p: v, v: valDigit, e: translation.pattern });
            }
            v + = deslocamento;
        } outro {
            if (!skipMaskChars) {
                buf[addMethod](maskDigit);
            }

            if (valDigit === maskDigit) {
                maskDigitPosArr.push(v);
                v + = deslocamento;
            } outro {
                lastUntranslatedMaskChar = maskDigit;
                maskDigitPosArr.push(v + maskDigitCount);
                maskDigitCount++;
            }

            m + = deslocamento;
        }
    }

    var lastMaskCharDigit = mask.charAt(lastMaskChar);
    if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
        buf.push(lastMaskCharDigit);
    }

    var newVal = buf.join('');
    p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
    return newVal;
}
mapMaskdigitPositions: function (newVal, maskDigitPosArr, valLen) {
    var maskDiff = options.reverse ? newVal.length - valLen : 0;
    p.maskDigitPosMap = {};
    for (var i = 0; i < maskDigitPosArr.length; i++) {
        p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
    }
}
retornos de chamada: function (e) {
    var val = p.val(),
        alterado = val! == oldValue,
        defaultArgs = [val, e, el, options],
        retorno de chamada = função(nome, critério, argumentos) {
            if (tipo de opções[nome] === 'função' && critérios) {
        opções[nome].apply(this, args);
    }
};

retorno de chamada('onChange', alterado === true, defaultArgs);
retorno de chamada('onKeyPress', alterado === true, defaultArgs);
retorno de chamada('onComplete', val.length === mask.length, defaultArgs);
retorno de chamada('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, opções]);
            }
        };

el = $(el);
var jMask = this, oldValue = p.val(), regexMask;

mask = typeof mask === 'função' ? mask(p.val(), indefinido, el, opções) : mask;

// métodos públicos
jMask.mask = máscara;
jMask.options = opções;
jMask.remove = function () {
    var caret = p.getCaret();
    if (jMask.options.placeholder) {
        el.removeAttr('espaço reservado');
    }
    if (el.data('mask-maxlength')) {
        el.removeAttr('maxlength');
    }
    p.destroyEvents();
    p.val(jMask.getCleanVal());
    p.setCaret(cursor);
    return el;
};

// obtém valor sem máscara
jMask.getCleanVal = function () {
    return p.getMasked(true);
};

// obtém valor mascarado sem que o valor esteja na entrada ou elemento
jMask.getMaskedVal = function (val) {
    return p.getMasked(false, val);
};

jMask.init = function (onlyMask) {
    onlyMask = onlyMask || falso;
    opções = opções || {};

    jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
    jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
    jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);

    jMask = $.extend(true, {}, jMask, opções);

    regexMask = p.getRegexMask();

    if (onlyMask) {
        p.events();
        p.val(p.getMasked());
    } outro {
        if (options.placeholder) {
            el.attr('espaço reservado', options.placeholder);
        }

        // isso é necessário, caso contrário, se o usuário enviar o formulário
        // e pressione o botão "voltar", o preenchimento automático apagará
        // os dados. Funciona bem no IE9 +, FF, Opera, Safari.
        if (el.data('mask')) {
            el.attr('preenchimento automático', 'desativado');
        }

        // detecte se for necessário, deixe o usuário digitar livremente.
        // for é muito mais rápido que forEach.
        for (var i = 0, comprimento máximo = verdadeiro; i < comprimento da máscara; i++) {
            var translation = jMask.translation[mask.charAt(i)];
            if (translation && translation.recursive) {
                maxlength = false;
                pausa;
            }
        }

        if (comprimento máximo) {
            el.attr('maxlength', mask.length).data('mask-maxlength', true);
        }

        p.destroyEvents();
        p.events();

        var caret = p.getCaret();
        p.val(p.getMasked());
        p.setCaret(cursor);
    }
};

jMask.init(!el.is('entrada'));
    };

$.maskWatchers = {};
var HTMLAttributes = function () {
    var input = $(isso),
        opções = {},
        prefixo = 'máscara de dados',
        mask = input.attr('máscara de dados');

    if (input.attr(prefixo + 'reverse')) {
        options.reverse = true;
    }

    if (input.attr(prefixo + 'clearifnotmatch')) {
        options.clearIfNotMatch = true;
    }

    if (input.attr(prefixo + 'selectonfocus') === 'true') {
        options.selectOnFocus = true;
    }

    if (notSameMaskObject(entrada, máscara, opções)) {
        retornar input.data('mask', new Mask(this, mask, options));
    }
}
notSameMaskObject = função(campo, máscara, opções) {
    opções = opções || {};
    var maskObject = $(campo).dados('máscara'),
        stringify = JSON.stringify,
        valor = $(campo).val() || $(campo).text();
    experimentar {
        if (typeof mask === 'function') {
            máscara = máscara(valor);
        }
        retornar tipo de maskObject! == 'objeto' || stringify(maskObject.options)! == stringify(opções) || maskObject.mask! == mask;
    } captura(e) { }
}
eventSupported = function (eventName) {
    var el = document.createElement('div'), isSupported;

    eventName = 'on' + eventName;
    isSupported = (eventName em el);

    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = tipo de[eventName] === 'função';
    }
    el = nulo;

    return isSupported;
};

$.fn.mask = function (máscara, opções) {
    opções = opções || {};
    var selector = this.selector,
        globals = $.jMaskGlobals,
        interval = globals.watchInterval,
        watchInputs = options.watchInputs || globals.watchInputs,
        maskFunction = function () {
            if (notSameMaskObject(this, mask, options)) {
                return $(this).data('mask', new Mask(this, mask, options));
            }
        };

    $(this).each(maskFunction);

    if (seletor && seletor! == '' && watchInputs) {
        clearInterval($.maskWatchers[seletor]);
        $.maskWatchers[seletor] = setInterval(function () {
            $(document).find(seletor).each(maskFunction);
        }, intervalo);
    }
    devolva isso;
};

$.fn.masked = function (val) {
    retornar this.data('mask').getMaskedVal(val);
};

$.fn.unmask = function () {
    clearInterval($.maskWatchers[this.selector]);
    delete $.maskWatchers[this.selector];
    retorne this.each(function () {
        var dataMask = $(this).data('mask');
        if (dataMask) {
            dataMask.remove().removeData('mask');
        }
    });
};

$.fn.cleanVal = function () {
    retorna this.data('mask').getCleanVal();
};

$.applyDataMask = função(seletor) {
    seletor = seletor || $.jMaskGlobals.maskElements;
    var $ selector = (instância do seletor de $)?seletor: $(seletor);
    $ selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
};

var globals = {
    maskElements: 'input, td, span, div',
    dataMaskAttr: '[máscara de dados]',
    dataMask: true,
    watchInterval: 300,
    watchInputs: true,
    keyStrokeCompensation: 10,
    // versões antigas do chrome não funcionam muito bem com eventos de entrada
    useInput: ! / Chrome \ /[2 - 4][0 - 9] | SamsungBrowser / .test(window.navigator.userAgent) && eventSupported('input'),
    watchDataMask: false,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    tradução: {
        '0': { padrão: / \ d / },
        '9': { padrão: / \ d /, opcional: true },
        '#': { padrão: / \ d /, recursivo: verdadeiro },
        'A': { padrão: / [a-zA-Z0-9] / },
        'S': { padrão: / [a-zA-Z] / }
    }
};

$.jMaskGlobals = $.jMaskGlobals || {};
globals = $.jMaskGlobals = $.extend(true, {}, globais, $.jMaskGlobals);

// procurando entradas com atributo de máscara de dados
if (globals.dataMask) {
    $.applyDataMask();
}

setInterval(function () {
    if ($.jMaskGlobals.watchDataMask) {
        $.applyDataMask();
    }
} globals.watchInterval);
}, window.jQuery, window.Zepto));