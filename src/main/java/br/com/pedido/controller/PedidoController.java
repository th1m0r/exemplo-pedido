package br.com.pedido.controller;

import br.com.pedido.model.Pedido;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("pedidos")
public class PedidoController {


    @GetMapping("/novo")
    public ModelAndView novo(Pedido pedido) {
        ModelAndView mv = new ModelAndView("pedido/CadastroPedido");
        return mv;
    }

    @PostMapping(value = {"/novo", "{\\d+}"})
    public ModelAndView salvar(Pedido pedido, BindingResult result, RedirectAttributes attributes) {
        if (result.hasErrors()) {
            return novo(pedido);
        }
        attributes.addFlashAttribute("mensagem", "Produto salvo com sucesso!");
        return new ModelAndView("redirect:/");
    }

}
