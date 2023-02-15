package br.com.pedido.controller;

import br.com.pedido.model.Fornecedor;
import br.com.pedido.repository.FornecedorRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("fornecedores")
@AllArgsConstructor
public class FornecedorController {

    private final FornecedorRepository fornecedorRepository;

    @GetMapping("/pesquisar")
    public @ResponseBody ResponseEntity<List<Fornecedor>> pesquisar(String razaoSocial) {
        validarTamanhoNome(razaoSocial);
        return ResponseEntity.ok(fornecedorRepository.findByRazaoSocialContaining(razaoSocial));
    }


    private void validarTamanhoNome(String razaoSocialOuFantasia) {
        if (!StringUtils.hasLength(razaoSocialOuFantasia) || razaoSocialOuFantasia.length() < 3) {
            throw new IllegalArgumentException();
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Void> tratarIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().build();
    }


}
