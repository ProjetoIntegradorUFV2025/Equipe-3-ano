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
-- Table `mydb`.`TB_CacaPalavras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TB_CacaPalavras` (
  `PK_CacaPalavrasId` INT NOT NULL,
  PRIMARY KEY (`PK_CacaPalavrasId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TB_RespostaCerta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TB_RespostaCerta` (
  `FK_CacaPalavras_Id` INT NOT NULL,
  `respostaCerta` VARCHAR(45) NOT NULL,
  INDEX `fk_TB_RespostaCerta_TB_CacaPalavras_idx` (`FK_CacaPalavras_Id` ASC) VISIBLE,
  CONSTRAINT `fk_TB_RespostaCerta_TB_CacaPalavras`
    FOREIGN KEY (`FK_CacaPalavras_Id`)
    REFERENCES `mydb`.`TB_CacaPalavras` (`PK_CacaPalavrasId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
