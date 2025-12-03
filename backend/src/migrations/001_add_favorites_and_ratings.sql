-- Migration 001: Adiciona tabelas de favoritos e avaliações
-- Data: 2025-12-03
-- Descrição: Sistema de favoritos e avaliações de receitas

USE `teste_receitas_rg_sistemas`;

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuarios` INT(10) UNSIGNED NOT NULL,
  `id_receitas` INT UNSIGNED NOT NULL,
  `criado_em` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_favorito` (`id_usuarios` ASC, `id_receitas` ASC),
  INDEX `fk_favoritos_usuarios_idx` (`id_usuarios` ASC),
  INDEX `fk_favoritos_receitas_idx` (`id_receitas` ASC),
  CONSTRAINT `fk_favoritos_usuarios`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_favoritos_receitas`
    FOREIGN KEY (`id_receitas`)
    REFERENCES `receitas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS `avaliacoes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuarios` INT(10) UNSIGNED NOT NULL,
  `id_receitas` INT UNSIGNED NOT NULL,
  `nota` TINYINT UNSIGNED NOT NULL COMMENT 'Nota de 1 a 5',
  `comentario` TEXT NULL,
  `criado_em` DATETIME NOT NULL,
  `alterado_em` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_avaliacao` (`id_usuarios` ASC, `id_receitas` ASC),
  INDEX `fk_avaliacoes_usuarios_idx` (`id_usuarios` ASC),
  INDEX `fk_avaliacoes_receitas_idx` (`id_receitas` ASC),
  CONSTRAINT `fk_avaliacoes_usuarios`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_avaliacoes_receitas`
    FOREIGN KEY (`id_receitas`)
    REFERENCES `receitas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `check_nota_range`
    CHECK (`nota` >= 1 AND `nota` <= 5)
) ENGINE = InnoDB;

-- Adiciona índice para melhorar performance de buscas
ALTER TABLE `receitas`
ADD FULLTEXT INDEX `ft_nome_ingredientes` (`nome`, `ingredientes`);
