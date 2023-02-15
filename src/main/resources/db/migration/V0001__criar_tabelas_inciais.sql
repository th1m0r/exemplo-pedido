--
-- Definition of table produto
--
CREATE TABLE produto
(
    id        bigint PRIMARY KEY AUTO_INCREMENT,
    ean       bigint       NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    unique index idx_produto_ean (ean),
    index idx_produto_descricao (descricao ASC)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- Definition of table fornecedor
--
CREATE TABLE fornecedor
(
    id            bigint PRIMARY KEY AUTO_INCREMENT,
    razao_social  VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


--
-- Definition of table pedido
--
CREATE TABLE pedido
(
    id            bigint PRIMARY KEY AUTO_INCREMENT,
    fornecedor_id BIGINT NOT NULL,
    data_cadastro DATE,
    constraint fk_pedido_fornecedor foreign key (fornecedor_id) references fornecedor (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


--
-- Definition of table pedido_itens
--
CREATE TABLE pedido_item
(
    id         bigint PRIMARY KEY AUTO_INCREMENT,
    pedido_id  BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade DECIMAL(20, 6),
    preco      DECIMAL(20, 6),
    constraint fk_pedido_item_pedido foreign key (pedido_id) references pedido (id),
    constraint fk_pedido_item_produto foreign key (produto_id) references produto (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;



insert into fornecedor (razao_social, nome_fantasia)
values ('CDA - CENTRAL DE DISTRI AZEVEDO LTDA.', 'CDA'),
       ('DISTRIBUIDORA DOS PRODUTOS KERO KERO LTDA.', 'KERO KERO'),
       ('RIOGRANDENSE DISTRIBUIDORA LTDA', 'RIOGRANDENSE'),
       ('INDUSTRIA E COMERCIO DE SABAO GUARANI LTDA', 'GUARANI'),
       ('TRES CORACOES ALIMENTOS S.A.', 'TRES CORACOES'),
       ('MARTINS COMERCIO E SERVICOS DE DISTRIBUICAO S.A.', 'MARTINS');
