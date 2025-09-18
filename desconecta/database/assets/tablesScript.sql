-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`TB_Ilha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TB_Ilha` (
  `PK_Ilha` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomeIlha` ENUM('Dadolandia', 'Ciencias', 'Geografia', 'Matematica', 'Historia') NULL,
  `estadoIlha` TINYINT NULL,
  `foiJogada` TINYINT NULL,
  PRIMARY KEY (`PK_Ilha`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TB_ProgressoAluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TB_ProgressoAluno` (
  `PK_ProgressoAluno` INT NOT NULL,
  `pontuacaoTotal` INT NULL,
  `FK_Ilha_id` INT NOT NULL,
  PRIMARY KEY (`PK_ProgressoAluno`),
  INDEX `fk_TB_ProgressoAluno_TB_Ilha1_idx` (`FK_Ilha_id` ASC) VISIBLE,
  UNIQUE INDEX `PK_ProgressoAluno_UNIQUE` (`PK_ProgressoAluno` ASC) VISIBLE,
  CONSTRAINT `fk_TB_ProgressoAluno_TB_Ilha1`
    FOREIGN KEY (`FK_Ilha_id`)
    REFERENCES `mydb`.`TB_Ilha` (`PK_Ilha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TB_Desafio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TB_Desafio` (
  `PK_Desafio` INT NULL AUTO_INCREMENT,
  `FK_Ilha_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`PK_Desafio`, `FK_Ilha_id`),
  UNIQUE INDEX `PK_Desafio_UNIQUE` (`PK_Desafio` ASC) VISIBLE,
  INDEX `fk_TB_Desafio_TB_Ilha1_idx` (`FK_Ilha_id` ASC) VISIBLE,
  CONSTRAINT `fk_TB_Desafio_TB_Ilha1`
    FOREIGN KEY (`FK_Ilha_id`)
    REFERENCES `mydb`.`TB_Ilha` (`PK_Ilha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
