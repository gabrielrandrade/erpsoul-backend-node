-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Nov-2024 às 22:37
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dberpsoul`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl`
--

CREATE TABLE `tb_acl` (
  `id_acl` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL,
  `id_perfil` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_acl`
--

INSERT INTO `tb_acl` (`id_acl`, `tipo`, `descricao`, `id_perfil`) VALUES
(1, 1, 'MASTER', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_assinatura_plano`
--

CREATE TABLE `tb_assinatura_plano` (
  `id_assinatura_plano` int(11) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_expedicao` date NOT NULL,
  `id_dados_bancario` int(11) NOT NULL,
  `id_plano` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_bandeira`
--

CREATE TABLE `tb_bandeira` (
  `id_bandeira` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_categoria_conta`
--

CREATE TABLE `tb_categoria_conta` (
  `id_categoria_conta` int(3) NOT NULL,
  `tipo` int(3) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `id_cliente` int(11) NOT NULL,
  `nome` varchar(50) COLLATE utf8_bin NOT NULL,
  `cpf` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `cnpj` varchar(14) COLLATE utf8_bin DEFAULT NULL,
  `dt_nasc` date NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `id_tipo_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_status` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`id_cliente`, `nome`, `cpf`, `cnpj`, `dt_nasc`, `id_endereco`, `id_tipo_cliente`, `id_usuario`, `id_status`) VALUES
(1, 'Alexandra', '92826003003', NULL, '2005-06-13', 1, 1, 1, 2),
(2, 'Alexandre', '09682549000', NULL, '1975-06-29', 2, 1, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_competencia`
--

CREATE TABLE `tb_competencia` (
  `id_competencia` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_conta`
--

CREATE TABLE `tb_conta` (
  `id_conta` int(11) NOT NULL,
  `vencimento` date NOT NULL,
  `vencimento_original` date NOT NULL,
  `num_documento` varchar(30) COLLATE utf8_bin NOT NULL,
  `id_finalidade_nf` int(11) NOT NULL,
  `id_nota_fiscal` int(11) NOT NULL,
  `id_forma_pagamento` int(2) NOT NULL,
  `id_categoria_conta` int(11) NOT NULL,
  `id_tipo_conta` int(11) NOT NULL,
  `id_status_conta` int(3) NOT NULL,
  `id_ocorrencia` int(11) NOT NULL,
  `id_portador` int(11) NOT NULL,
  `id_competencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_dados_bancario`
--

CREATE TABLE `tb_dados_bancario` (
  `id_dados_bancario` int(11) NOT NULL,
  `nome_cartao` varchar(100) COLLATE utf8_bin NOT NULL,
  `numero_cartao` varchar(100) COLLATE utf8_bin NOT NULL,
  `cvv` varchar(3) COLLATE utf8_bin NOT NULL,
  `cpf_cartao` varchar(11) COLLATE utf8_bin NOT NULL,
  `validade` date NOT NULL,
  `id_bandeira` int(2) NOT NULL,
  `id_tipo_cartao` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_empresa`
--

CREATE TABLE `tb_empresa` (
  `id_empresa` int(11) NOT NULL,
  `razao_social` varchar(100) COLLATE utf8_bin NOT NULL,
  `nome_fantasia` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(250) COLLATE utf8_bin NOT NULL,
  `telefone` varchar(12) COLLATE utf8_bin NOT NULL,
  `cnpj` varchar(14) COLLATE utf8_bin NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_endereco`
--

CREATE TABLE `tb_endereco` (
  `id_endereco` int(11) NOT NULL,
  `tipo_logradouro` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `logradouro` varchar(60) COLLATE utf8_bin NOT NULL,
  `numero` varchar(8) COLLATE utf8_bin NOT NULL,
  `cep` varchar(8) COLLATE utf8_bin NOT NULL,
  `cidade` varchar(30) COLLATE utf8_bin NOT NULL,
  `uf` varchar(2) COLLATE utf8_bin NOT NULL,
  `bairro` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_endereco`
--

INSERT INTO `tb_endereco` (`id_endereco`, `tipo_logradouro`, `logradouro`, `numero`, `cep`, `cidade`, `uf`, `bairro`) VALUES
(1, NULL, 'Rua Antônio Luís Saião', '48', '02356080', 'São Paulo', 'SP', 'Jardim Virginia Bianca'),
(2, NULL, 'Avenida Mazzei', '1091', '02310001', 'São Paulo', 'SP', 'Vila Mazzei');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_finalidade_nf`
--

CREATE TABLE `tb_finalidade_nf` (
  `id_finalidade_nf` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_forma_pagamento`
--

CREATE TABLE `tb_forma_pagamento` (
  `id_forma_pagamento` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_fornecedor`
--

CREATE TABLE `tb_fornecedor` (
  `id_fornecedor` int(11) NOT NULL,
  `tb_fornecedorcol` varchar(45) COLLATE utf8_bin NOT NULL,
  `razao_social` varchar(100) COLLATE utf8_bin NOT NULL,
  `nome_fantasia` varchar(100) COLLATE utf8_bin NOT NULL,
  `cnpj` varchar(14) COLLATE utf8_bin NOT NULL,
  `responsavel` varchar(30) COLLATE utf8_bin NOT NULL,
  `telefone` varchar(20) COLLATE utf8_bin NOT NULL,
  `email` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_natureza`
--

CREATE TABLE `tb_natureza` (
  `id_natureza` int(1) NOT NULL,
  `tipo` int(1) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_natureza`
--

INSERT INTO `tb_natureza` (`id_natureza`, `tipo`, `descricao`) VALUES
(1, 1, 'Pessoa Física'),
(2, 2, 'Pessoa Jurídica');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_nota_fiscal`
--

CREATE TABLE `tb_nota_fiscal` (
  `id_nota_fiscal` int(11) NOT NULL,
  `numero_serie` varchar(50) COLLATE utf8_bin NOT NULL,
  `dt_emissão` date NOT NULL,
  `dt_hsaida` date NOT NULL COMMENT 'Data e Hora da saída nota fiscal',
  `id_unidade` int(11) NOT NULL,
  `id_venda` int(11) NOT NULL,
  `id_finalidade_nf` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_upload_nf` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_ocorrencia`
--

CREATE TABLE `tb_ocorrencia` (
  `id_ocorrencia` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_parcelamento`
--

CREATE TABLE `tb_parcelamento` (
  `id_parcelamento` int(11) NOT NULL,
  `tipo` varchar(30) COLLATE utf8_bin NOT NULL,
  `qtd_parcela` varchar(5) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_perfil`
--

CREATE TABLE `tb_perfil` (
  `id_perfil` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_perfil`
--

INSERT INTO `tb_perfil` (`id_perfil`, `tipo`, `descricao`) VALUES
(1, 1, 'MASTER');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_plano`
--

CREATE TABLE `tb_plano` (
  `id_plano` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL,
  `preco` varchar(10) COLLATE utf8_bin NOT NULL,
  `periodo` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_portador`
--

CREATE TABLE `tb_portador` (
  `id_portador` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_produto`
--

CREATE TABLE `tb_produto` (
  `id_produto` int(11) NOT NULL,
  `sku_produto` varchar(50) COLLATE utf8_bin NOT NULL,
  `nome_produto` varchar(50) COLLATE utf8_bin NOT NULL,
  `marca_produto` varchar(50) COLLATE utf8_bin NOT NULL,
  `validade` date NOT NULL,
  `largura` float NOT NULL,
  `altura` float NOT NULL,
  `peso_liquido` float NOT NULL,
  `peso_bruto` float NOT NULL,
  `formato` varchar(20) COLLATE utf8_bin NOT NULL,
  `gtinean` varchar(20) COLLATE utf8_bin NOT NULL,
  `gtinean_tributario` varchar(20) COLLATE utf8_bin NOT NULL,
  `id_portador` int(11) NOT NULL,
  `id_tipo_produto` int(11) NOT NULL,
  `id_unidade_medida` int(11) NOT NULL,
  `id_reabastecer_produto` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  `id_status_produto` int(3) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_reabastecer_produto`
--

CREATE TABLE `tb_reabastecer_produto` (
  `id_reabastecer_produto` int(11) NOT NULL,
  `quantidade` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_servico`
--

CREATE TABLE `tb_servico` (
  `id_servico` int(11) NOT NULL,
  `servico` varchar(100) COLLATE utf8_bin NOT NULL,
  `cod_servico` int(11) NOT NULL,
  `cod_lc` float NOT NULL,
  `aliquota_iss` float NOT NULL,
  `valor_servico` float NOT NULL,
  `descricao` varchar(250) COLLATE utf8_bin NOT NULL,
  `dt_inicio` timestamp NOT NULL DEFAULT current_timestamp(),
  `dt_vencimento` date NOT NULL,
  `id_natureza` int(1) NOT NULL,
  `id_status` int(3) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_servico`
--

INSERT INTO `tb_servico` (`id_servico`, `servico`, `cod_servico`, `cod_lc`, `aliquota_iss`, `valor_servico`, `descricao`, `dt_inicio`, `dt_vencimento`, `id_natureza`, `id_status`, `id_cliente`, `id_usuario`) VALUES
(1, 'Higienização Ap', 51, 51, 1, 1, 'Fazer faxina no apartamento sozinha sexta', '2024-10-29 21:12:17', '2025-10-30', 2, 4, 1, 1),
(2, 'Lavar roupa', 51, 51, 2, 1000, 'LAVAR ROUPA', '2024-10-29 22:00:12', '2025-11-15', 1, 4, 2, 1),
(3, 'Cozinhar', 111, 123, 2, 12000, 'Jantar', '2024-11-05 19:07:12', '2024-11-06', 1, 4, 1, 1),
(4, 'Cozinhar', 123, 123, 2, 12000, 'Almoço', '2024-11-05 19:08:28', '2025-11-06', 1, 4, 1, 1);

--
-- Acionadores `tb_servico`
--
DELIMITER $$
CREATE TRIGGER `verifica_vencimento` BEFORE UPDATE ON `tb_servico` FOR EACH ROW BEGIN
    IF NEW.dt_vencimento < CURRENT_DATE AND OLD.id_status != 3 AND OLD.id_status != 5 AND OLD.id_status != 6 THEN
        SET NEW.id_status = 5;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_status`
--

CREATE TABLE `tb_status` (
  `id_status` int(3) NOT NULL,
  `tipo` int(3) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_status`
--

INSERT INTO `tb_status` (`id_status`, `tipo`, `descricao`) VALUES
(1, 0, 'INATIVO'),
(2, 1, 'ATIVO'),
(3, 2, 'CONCLUÍDO'),
(4, 3, 'EM ANDAMENTO'),
(5, 4, 'VENCIDO'),
(6, 5, 'CANCELADO');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_status_conta`
--

CREATE TABLE `tb_status_conta` (
  `id_status_conta` int(3) NOT NULL,
  `tipo` int(3) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_status_produto`
--

CREATE TABLE `tb_status_produto` (
  `id_status_produto` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(50) COLLATE utf8_bin NOT NULL,
  `id_portador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_cartao`
--

CREATE TABLE `tb_tipo_cartao` (
  `id_tipo_cartao` int(1) NOT NULL,
  `tipo` int(1) NOT NULL,
  `descricao` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_cliente`
--

CREATE TABLE `tb_tipo_cliente` (
  `id_tipo_cliente` int(1) NOT NULL,
  `tipo` int(1) NOT NULL,
  `descricao` varchar(8) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_tipo_cliente`
--

INSERT INTO `tb_tipo_cliente` (`id_tipo_cliente`, `tipo`, `descricao`) VALUES
(1, 1, 'Físico'),
(2, 2, 'Jurídico');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_conta`
--

CREATE TABLE `tb_tipo_conta` (
  `id_tipo_conta` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_produto`
--

CREATE TABLE `tb_tipo_produto` (
  `id_tipo_produto` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tipo_venda`
--

CREATE TABLE `tb_tipo_venda` (
  `id_tipo_venda` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tokens`
--

CREATE TABLE `tb_tokens` (
  `id_token` int(11) NOT NULL,
  `token` varchar(512) COLLATE utf8_bin NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `expira_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_tokens`
--

INSERT INTO `tb_tokens` (`id_token`, `token`, `criado_em`, `expira_em`, `id_usuario`) VALUES
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMDgzMzQxMCwiZXhwIjoxNzMwOTE5ODEwfQ.KQxeuUc54brcphGd2wtzcRwhd5qxNzcZIcFtwkvNUF0', '2024-11-05 19:03:30', '2024-11-06 19:03:30', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_unidade`
--

CREATE TABLE `tb_unidade` (
  `id_unidade` int(11) NOT NULL,
  `nome_unidade` varchar(50) COLLATE utf8_bin NOT NULL,
  `telefone` varchar(12) COLLATE utf8_bin NOT NULL,
  `email` varchar(200) COLLATE utf8_bin NOT NULL,
  `faturamento` float NOT NULL,
  `lucro_liq` float NOT NULL,
  `vl_patrimonio` float NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_unidade_medida`
--

CREATE TABLE `tb_unidade_medida` (
  `id_unidade_medida` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_upload_nf`
--

CREATE TABLE `tb_upload_nf` (
  `id_upload_nf` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) COLLATE utf8_bin NOT NULL,
  `nome_empresa` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(250) COLLATE utf8_bin NOT NULL,
  `email_contador` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  `senha` varchar(60) COLLATE utf8_bin NOT NULL,
  `hash` varchar(60) COLLATE utf8_bin NOT NULL,
  `cpf` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `cnpj` varchar(14) COLLATE utf8_bin DEFAULT NULL,
  `whatsapp` varchar(14) COLLATE utf8_bin NOT NULL,
  `cargo` varchar(50) COLLATE utf8_bin NOT NULL,
  `faturamento` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_perfil` int(2) NOT NULL,
  `id_status` int(3) NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `id_plano` int(2) NOT NULL,
  `id_assinatura_plano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`id_usuario`, `nome`, `nome_empresa`, `email`, `email_contador`, `senha`, `hash`, `cpf`, `cnpj`, `whatsapp`, `cargo`, `faturamento`, `id_empresa`, `id_perfil`, `id_status`, `id_endereco`, `id_plano`, `id_assinatura_plano`) VALUES
(1, 'Gabriel', 'Senac', 'gabrielrandradesp@hotmail.com', 'gabrielrandradesp@hotmail.com', '$2b$10$tqNJgr.Bc0J2WIqSYYQPFe882t5j2btlO1vPdNQocq7E9cUWbszde', '$2b$10$EMiDcAiOgalfZ.o1YjYR3uDIPdW9ruiC36Ob.Ba4Z7jFFqK5Mb7Be', NULL, '03709814000198', '11932193532', 'Contador', '10000', 0, 1, 2, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_venda`
--

CREATE TABLE `tb_venda` (
  `id_venda` int(11) NOT NULL,
  `valor_total` float NOT NULL,
  `id_venda_produto` int(11) NOT NULL,
  `id_venda_servico` int(11) NOT NULL,
  `id_parcelamento` int(11) NOT NULL,
  `id_forma_pagamento` int(2) NOT NULL,
  `id_tipo_venda` int(11) NOT NULL,
  `id_unidade` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_venda_produto`
--

CREATE TABLE `tb_venda_produto` (
  `id_venda_produto` int(11) NOT NULL,
  `qtd_produto` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_venda_servico`
--

CREATE TABLE `tb_venda_servico` (
  `id_venda_servico` int(11) NOT NULL,
  `id_servico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_acl`
--
ALTER TABLE `tb_acl`
  ADD PRIMARY KEY (`id_acl`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`),
  ADD KEY `FK_id_perfil` (`id_perfil`);

--
-- Índices para tabela `tb_assinatura_plano`
--
ALTER TABLE `tb_assinatura_plano`
  ADD PRIMARY KEY (`id_assinatura_plano`) USING BTREE,
  ADD KEY `FOREIGN` (`id_dados_bancario`,`id_plano`) USING BTREE;

--
-- Índices para tabela `tb_bandeira`
--
ALTER TABLE `tb_bandeira`
  ADD PRIMARY KEY (`id_bandeira`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_categoria_conta`
--
ALTER TABLE `tb_categoria_conta`
  ADD PRIMARY KEY (`id_categoria_conta`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `FOREIGN` (`id_endereco`,`id_tipo_cliente`,`id_usuario`,`id_status`) USING BTREE;

--
-- Índices para tabela `tb_competencia`
--
ALTER TABLE `tb_competencia`
  ADD PRIMARY KEY (`id_competencia`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_conta`
--
ALTER TABLE `tb_conta`
  ADD PRIMARY KEY (`id_conta`),
  ADD KEY `fk_tb_conta_tb_categoria_conta1` (`id_categoria_conta`),
  ADD KEY `fk_tb_conta_tb_competencia1` (`id_competencia`),
  ADD KEY `fk_tb_conta_tb_forma_pagamento1` (`id_forma_pagamento`),
  ADD KEY `fk_tb_conta_tb_nota_fiscal1` (`id_nota_fiscal`),
  ADD KEY `fk_tb_conta_tb_ocorrencia1` (`id_ocorrencia`),
  ADD KEY `fk_tb_conta_tb_portador1` (`id_portador`),
  ADD KEY `fk_tb_conta_tb_status_conta1` (`id_status_conta`),
  ADD KEY `fk_tb_conta_tb_tipo_conta1` (`id_tipo_conta`),
  ADD KEY `FOREIGN` (`id_finalidade_nf`,`id_nota_fiscal`,`id_forma_pagamento`,`id_categoria_conta`,`id_tipo_conta`,`id_status_conta`,`id_ocorrencia`,`id_portador`,`id_competencia`,`id_usuario`) USING BTREE;

--
-- Índices para tabela `tb_dados_bancario`
--
ALTER TABLE `tb_dados_bancario`
  ADD PRIMARY KEY (`id_dados_bancario`),
  ADD KEY `FOREIGN` (`id_bandeira`,`id_tipo_cartao`),
  ADD KEY `fk_tb_dados_bancario_tb_tipo_cartao1` (`id_tipo_cartao`);

--
-- Índices para tabela `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `UQ_cnpj` (`cnpj`),
  ADD KEY `FK_id_endereco` (`id_endereco`) USING BTREE;

--
-- Índices para tabela `tb_endereco`
--
ALTER TABLE `tb_endereco`
  ADD PRIMARY KEY (`id_endereco`);

--
-- Índices para tabela `tb_finalidade_nf`
--
ALTER TABLE `tb_finalidade_nf`
  ADD PRIMARY KEY (`id_finalidade_nf`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_forma_pagamento`
--
ALTER TABLE `tb_forma_pagamento`
  ADD PRIMARY KEY (`id_forma_pagamento`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_fornecedor`
--
ALTER TABLE `tb_fornecedor`
  ADD PRIMARY KEY (`id_fornecedor`),
  ADD UNIQUE KEY `UQ_cnpj` (`cnpj`);

--
-- Índices para tabela `tb_natureza`
--
ALTER TABLE `tb_natureza`
  ADD PRIMARY KEY (`id_natureza`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_nota_fiscal`
--
ALTER TABLE `tb_nota_fiscal`
  ADD PRIMARY KEY (`id_nota_fiscal`),
  ADD KEY `FOREIGN` (`id_unidade`,`id_venda`,`id_finalidade_nf`,`id_cliente`,`id_upload_nf`),
  ADD KEY `fk_tb_nota_fiscal_tb_cliente1` (`id_cliente`),
  ADD KEY `fk_tb_nota_fiscal_tb_finalidade_nf1` (`id_finalidade_nf`),
  ADD KEY `fk_tb_nota_fiscal_tb_upload_nf1` (`id_upload_nf`),
  ADD KEY `fk_tb_nota_fiscal_tb_venda1` (`id_venda`);

--
-- Índices para tabela `tb_ocorrencia`
--
ALTER TABLE `tb_ocorrencia`
  ADD PRIMARY KEY (`id_ocorrencia`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_parcelamento`
--
ALTER TABLE `tb_parcelamento`
  ADD PRIMARY KEY (`id_parcelamento`);

--
-- Índices para tabela `tb_perfil`
--
ALTER TABLE `tb_perfil`
  ADD PRIMARY KEY (`id_perfil`) USING BTREE,
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_plano`
--
ALTER TABLE `tb_plano`
  ADD PRIMARY KEY (`id_plano`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_portador`
--
ALTER TABLE `tb_portador`
  ADD PRIMARY KEY (`id_portador`) USING BTREE,
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `fk_tb_produto_tb_fornecedor1` (`id_fornecedor`),
  ADD KEY `fk_tb_produto_tb_reabastecer_produto1` (`id_reabastecer_produto`),
  ADD KEY `fk_tb_produto_tb_status1` (`id_status_produto`),
  ADD KEY `fk_tb_produto_tb_tipo_produto1` (`id_tipo_produto`),
  ADD KEY `fk_tb_produto_tb_unidade_medida1` (`id_unidade_medida`),
  ADD KEY `FOREIGN` (`id_portador`,`id_tipo_produto`,`id_unidade_medida`,`id_reabastecer_produto`,`id_fornecedor`,`id_status_produto`,`id_usuario`) USING BTREE;

--
-- Índices para tabela `tb_reabastecer_produto`
--
ALTER TABLE `tb_reabastecer_produto`
  ADD PRIMARY KEY (`id_reabastecer_produto`);

--
-- Índices para tabela `tb_servico`
--
ALTER TABLE `tb_servico`
  ADD PRIMARY KEY (`id_servico`),
  ADD KEY `FOREIGN` (`id_status`,`id_usuario`,`id_natureza`,`id_cliente`) USING BTREE;

--
-- Índices para tabela `tb_status`
--
ALTER TABLE `tb_status`
  ADD PRIMARY KEY (`id_status`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_status_conta`
--
ALTER TABLE `tb_status_conta`
  ADD PRIMARY KEY (`id_status_conta`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_status_produto`
--
ALTER TABLE `tb_status_produto`
  ADD PRIMARY KEY (`id_status_produto`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`),
  ADD KEY `FK_id_portador` (`id_portador`);

--
-- Índices para tabela `tb_tipo_cartao`
--
ALTER TABLE `tb_tipo_cartao`
  ADD PRIMARY KEY (`id_tipo_cartao`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_tipo_cliente`
--
ALTER TABLE `tb_tipo_cliente`
  ADD PRIMARY KEY (`id_tipo_cliente`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_tipo_conta`
--
ALTER TABLE `tb_tipo_conta`
  ADD PRIMARY KEY (`id_tipo_conta`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_tipo_produto`
--
ALTER TABLE `tb_tipo_produto`
  ADD PRIMARY KEY (`id_tipo_produto`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_tipo_venda`
--
ALTER TABLE `tb_tipo_venda`
  ADD PRIMARY KEY (`id_tipo_venda`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_tokens`
--
ALTER TABLE `tb_tokens`
  ADD PRIMARY KEY (`id_token`) USING BTREE,
  ADD KEY `FK_id_usuario` (`id_usuario`);

--
-- Índices para tabela `tb_unidade`
--
ALTER TABLE `tb_unidade`
  ADD PRIMARY KEY (`id_unidade`),
  ADD KEY `FOREIGN` (`id_empresa`,`id_endereco`),
  ADD KEY `fk_tb_unidade_tb_endereco1` (`id_endereco`);

--
-- Índices para tabela `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  ADD PRIMARY KEY (`id_unidade_medida`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_upload_nf`
--
ALTER TABLE `tb_upload_nf`
  ADD PRIMARY KEY (`id_upload_nf`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Índices para tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UNIQUE` (`email`,`cpf`,`cnpj`) USING BTREE,
  ADD KEY `FOREIGN` (`id_empresa`,`id_perfil`,`id_status`,`id_endereco`,`id_plano`,`id_assinatura_plano`) USING BTREE;

--
-- Índices para tabela `tb_venda`
--
ALTER TABLE `tb_venda`
  ADD PRIMARY KEY (`id_venda`),
  ADD KEY `fk_tb_venda_tb_cliente1` (`id_cliente`),
  ADD KEY `fk_tb_venda_tb_forma_pagamento1` (`id_forma_pagamento`),
  ADD KEY `fk_tb_venda_tb_parcelamento1` (`id_parcelamento`),
  ADD KEY `fk_tb_venda_tb_tipo_venda1` (`id_tipo_venda`),
  ADD KEY `fk_tb_venda_tb_unidade1` (`id_unidade`),
  ADD KEY `fk_tb_venda_tb_venda_servico1` (`id_venda_servico`),
  ADD KEY `FOREIGN` (`id_venda_produto`,`id_venda_servico`,`id_parcelamento`,`id_forma_pagamento`,`id_tipo_venda`,`id_unidade`,`id_cliente`,`id_usuario`) USING BTREE;

--
-- Índices para tabela `tb_venda_produto`
--
ALTER TABLE `tb_venda_produto`
  ADD PRIMARY KEY (`id_venda_produto`);

--
-- Índices para tabela `tb_venda_servico`
--
ALTER TABLE `tb_venda_servico`
  ADD PRIMARY KEY (`id_venda_servico`),
  ADD KEY `FK_id_servico` (`id_servico`) USING BTREE;

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_acl`
--
ALTER TABLE `tb_acl`
  MODIFY `id_acl` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_assinatura_plano`
--
ALTER TABLE `tb_assinatura_plano`
  MODIFY `id_assinatura_plano` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_bandeira`
--
ALTER TABLE `tb_bandeira`
  MODIFY `id_bandeira` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_categoria_conta`
--
ALTER TABLE `tb_categoria_conta`
  MODIFY `id_categoria_conta` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_competencia`
--
ALTER TABLE `tb_competencia`
  MODIFY `id_competencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_conta`
--
ALTER TABLE `tb_conta`
  MODIFY `id_conta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_dados_bancario`
--
ALTER TABLE `tb_dados_bancario`
  MODIFY `id_dados_bancario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_empresa`
--
ALTER TABLE `tb_empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_endereco`
--
ALTER TABLE `tb_endereco`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_finalidade_nf`
--
ALTER TABLE `tb_finalidade_nf`
  MODIFY `id_finalidade_nf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_forma_pagamento`
--
ALTER TABLE `tb_forma_pagamento`
  MODIFY `id_forma_pagamento` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_fornecedor`
--
ALTER TABLE `tb_fornecedor`
  MODIFY `id_fornecedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_natureza`
--
ALTER TABLE `tb_natureza`
  MODIFY `id_natureza` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_nota_fiscal`
--
ALTER TABLE `tb_nota_fiscal`
  MODIFY `id_nota_fiscal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_ocorrencia`
--
ALTER TABLE `tb_ocorrencia`
  MODIFY `id_ocorrencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_parcelamento`
--
ALTER TABLE `tb_parcelamento`
  MODIFY `id_parcelamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_perfil`
--
ALTER TABLE `tb_perfil`
  MODIFY `id_perfil` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_plano`
--
ALTER TABLE `tb_plano`
  MODIFY `id_plano` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_portador`
--
ALTER TABLE `tb_portador`
  MODIFY `id_portador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_reabastecer_produto`
--
ALTER TABLE `tb_reabastecer_produto`
  MODIFY `id_reabastecer_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_servico`
--
ALTER TABLE `tb_servico`
  MODIFY `id_servico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tb_status`
--
ALTER TABLE `tb_status`
  MODIFY `id_status` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tb_status_conta`
--
ALTER TABLE `tb_status_conta`
  MODIFY `id_status_conta` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_status_produto`
--
ALTER TABLE `tb_status_produto`
  MODIFY `id_status_produto` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_tipo_cartao`
--
ALTER TABLE `tb_tipo_cartao`
  MODIFY `id_tipo_cartao` int(1) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_tipo_cliente`
--
ALTER TABLE `tb_tipo_cliente`
  MODIFY `id_tipo_cliente` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_tipo_conta`
--
ALTER TABLE `tb_tipo_conta`
  MODIFY `id_tipo_conta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_tipo_produto`
--
ALTER TABLE `tb_tipo_produto`
  MODIFY `id_tipo_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_tipo_venda`
--
ALTER TABLE `tb_tipo_venda`
  MODIFY `id_tipo_venda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_tokens`
--
ALTER TABLE `tb_tokens`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_unidade`
--
ALTER TABLE `tb_unidade`
  MODIFY `id_unidade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  MODIFY `id_unidade_medida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_upload_nf`
--
ALTER TABLE `tb_upload_nf`
  MODIFY `id_upload_nf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_venda`
--
ALTER TABLE `tb_venda`
  MODIFY `id_venda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_venda_produto`
--
ALTER TABLE `tb_venda_produto`
  MODIFY `id_venda_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_venda_servico`
--
ALTER TABLE `tb_venda_servico`
  MODIFY `id_venda_servico` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_assinatura_plano`
--
ALTER TABLE `tb_assinatura_plano`
  ADD CONSTRAINT `fk_tb_assinatura_plano_tb_dados_bancario1` FOREIGN KEY (`id_dados_bancario`) REFERENCES `tb_dados_bancario` (`id_dados_bancario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_conta`
--
ALTER TABLE `tb_conta`
  ADD CONSTRAINT `fk_tb_conta_tb_categoria_conta1` FOREIGN KEY (`id_categoria_conta`) REFERENCES `tb_categoria_conta` (`id_categoria_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_competencia1` FOREIGN KEY (`id_competencia`) REFERENCES `tb_competencia` (`id_competencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_finalidade_nf1` FOREIGN KEY (`id_finalidade_nf`) REFERENCES `tb_finalidade_nf` (`id_finalidade_nf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_forma_pagamento1` FOREIGN KEY (`id_forma_pagamento`) REFERENCES `tb_forma_pagamento` (`id_forma_pagamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_nota_fiscal1` FOREIGN KEY (`id_nota_fiscal`) REFERENCES `tb_nota_fiscal` (`id_nota_fiscal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_ocorrencia1` FOREIGN KEY (`id_ocorrencia`) REFERENCES `tb_ocorrencia` (`id_ocorrencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_portador1` FOREIGN KEY (`id_portador`) REFERENCES `tb_portador` (`id_portador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_status_conta1` FOREIGN KEY (`id_status_conta`) REFERENCES `tb_status_conta` (`id_status_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_tipo_conta1` FOREIGN KEY (`id_tipo_conta`) REFERENCES `tb_tipo_conta` (`id_tipo_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_dados_bancario`
--
ALTER TABLE `tb_dados_bancario`
  ADD CONSTRAINT `fk_tb_dados_bancario_tb_bandeira1` FOREIGN KEY (`id_bandeira`) REFERENCES `tb_bandeira` (`id_bandeira`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_dados_bancario_tb_tipo_cartao1` FOREIGN KEY (`id_tipo_cartao`) REFERENCES `tb_tipo_cartao` (`id_tipo_cartao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD CONSTRAINT `fk_tb_empresa_tb_endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_nota_fiscal`
--
ALTER TABLE `tb_nota_fiscal`
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_finalidade_nf1` FOREIGN KEY (`id_finalidade_nf`) REFERENCES `tb_finalidade_nf` (`id_finalidade_nf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_unidade1` FOREIGN KEY (`id_unidade`) REFERENCES `tb_unidade` (`id_unidade`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_upload_nf1` FOREIGN KEY (`id_upload_nf`) REFERENCES `tb_upload_nf` (`id_upload_nf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_venda1` FOREIGN KEY (`id_venda`) REFERENCES `tb_venda` (`id_venda`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD CONSTRAINT `fk_tb_produto_tb_fornecedor1` FOREIGN KEY (`id_fornecedor`) REFERENCES `tb_fornecedor` (`id_fornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_reabastecer_produto1` FOREIGN KEY (`id_reabastecer_produto`) REFERENCES `tb_reabastecer_produto` (`id_reabastecer_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_status1` FOREIGN KEY (`id_status_produto`) REFERENCES `tb_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_status_produto1` FOREIGN KEY (`id_portador`) REFERENCES `tb_status_produto` (`id_portador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_tipo_produto1` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tb_tipo_produto` (`id_tipo_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_unidade_medida1` FOREIGN KEY (`id_unidade_medida`) REFERENCES `tb_unidade_medida` (`id_unidade_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_servico`
--
ALTER TABLE `tb_servico`
  ADD CONSTRAINT `fk_tb_servico_tb_status1` FOREIGN KEY (`id_status`) REFERENCES `tb_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_unidade`
--
ALTER TABLE `tb_unidade`
  ADD CONSTRAINT `fk_tb_unidade_tb_empresa1` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_unidade_tb_endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_venda`
--
ALTER TABLE `tb_venda`
  ADD CONSTRAINT `fk_tb_venda_tb_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_forma_pagamento1` FOREIGN KEY (`id_forma_pagamento`) REFERENCES `tb_forma_pagamento` (`id_forma_pagamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_parcelamento1` FOREIGN KEY (`id_parcelamento`) REFERENCES `tb_parcelamento` (`id_parcelamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_tipo_venda1` FOREIGN KEY (`id_tipo_venda`) REFERENCES `tb_tipo_venda` (`id_tipo_venda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_unidade1` FOREIGN KEY (`id_unidade`) REFERENCES `tb_unidade` (`id_unidade`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_venda_produto1` FOREIGN KEY (`id_venda_produto`) REFERENCES `tb_venda_produto` (`id_venda_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_venda_servico1` FOREIGN KEY (`id_venda_servico`) REFERENCES `tb_venda_servico` (`id_venda_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tb_venda_servico`
--
ALTER TABLE `tb_venda_servico`
  ADD CONSTRAINT `fk_tb_venda_servico_tb_servico1` FOREIGN KEY (`id_servico`) REFERENCES `tb_servico` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
