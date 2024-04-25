CREATE DATABASE  IF NOT EXISTS `financedbschema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `financedbschema`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: financedbschema
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `federaltaxtable`
--

DROP TABLE IF EXISTS `federaltaxtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `federaltaxtable` (
  `federalId` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `federalTax` decimal(12,0) NOT NULL,
  `incomeLowBound` float NOT NULL,
  `incomeHighBound` float NOT NULL,
  `maritalStatusImp` varchar(45) NOT NULL,
  `FICA` float NOT NULL,
  PRIMARY KEY (`federalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `federaltaxtable`
--
-- ORDER BY:  `federalId`

LOCK TABLES `federaltaxtable` WRITE;
/*!40000 ALTER TABLE `federaltaxtable` DISABLE KEYS */;
/*!40000 ALTER TABLE `federaltaxtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financedata`
--

DROP TABLE IF EXISTS `financedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financedata` (
  `financeID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `currentYear` int DEFAULT NULL,
  `monthlyExpenses` decimal(12,0) DEFAULT NULL,
  `annualGrossIncome` decimal(12,0) DEFAULT NULL,
  `dependents` varchar(5) NOT NULL,
  `numberOfDependents` int DEFAULT NULL,
  `goal` int DEFAULT NULL,
  PRIMARY KEY (`financeID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  CONSTRAINT `emailFK` FOREIGN KEY (`email`) REFERENCES `userlogin` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financedata`
--
-- ORDER BY:  `financeID`

LOCK TABLES `financedata` WRITE;
/*!40000 ALTER TABLE `financedata` DISABLE KEYS */;
INSERT INTO `financedata` VALUES (2,'georgebush',2019,1000,10000,'1',23,1000000),(3,'wilcolsd@gmail.com',2024,700,11500,'0',0,15000),(4,'test@test.com',2019,1000,1000,'0',0,0);
/*!40000 ALTER TABLE `financedata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statetaxtable`
--

DROP TABLE IF EXISTS `statetaxtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statetaxtable` (
  `stateId` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `stateTax` decimal(12,0) NOT NULL,
  `state` varchar(45) NOT NULL,
  `incomeLowBound` float NOT NULL,
  `incomeHighBound` float NOT NULL,
  `maritalStatusIp` varchar(45) NOT NULL,
  PRIMARY KEY (`stateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statetaxtable`
--
-- ORDER BY:  `stateId`

LOCK TABLES `statetaxtable` WRITE;
/*!40000 ALTER TABLE `statetaxtable` DISABLE KEYS */;
/*!40000 ALTER TABLE `statetaxtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdata`
--

DROP TABLE IF EXISTS `userdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdata` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `FirstName` varchar(56) NOT NULL,
  `LastName` varchar(56) NOT NULL,
  `filingStatus` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL DEFAULT 'AL' COMMENT '2 Alphabetical Abreviation for each State',
  `hasCompletedForm` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `email_idx` (`email`),
  FULLTEXT KEY `maritalStatus` (`filingStatus`),
  CONSTRAINT `email` FOREIGN KEY (`email`) REFERENCES `userlogin` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--
-- ORDER BY:  `userID`

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
INSERT INTO `userdata` VALUES (1,'test','Test','test','Test','WI',0),(5,'georgebush','george','bush','single','WI',0),(7,'wilcolsd@gmail.com','Colton','Williams','single','WI',0),(8,'test@test.com','TestName','TestName','single','WI',0);
/*!40000 ALTER TABLE `userdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `email` varchar(45) NOT NULL,
  `passwordHash` varchar(60) NOT NULL,
  `Create_Date` timestamp(4) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--
-- ORDER BY:  `email`

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES ('1','$2a$10$eiXhCmW6u2snRQkNxV63C..0cRNToeqNhghydpvbAOd.5IUgq0rP2','2024-03-28 17:32:02.1026'),('1@eres.com','$2a$10$qwMVuG0yNN3HWiKwqRY4OulQPTWoslLPK6dGUf9g2RvifiPzp2DKm','2024-04-13 01:58:18.5500'),('georgebush','test','2024-03-14 03:09:13.5628'),('test','test','2024-03-14 02:58:49.1414'),('test@test.com','$2a$10$I5kCTov2Pq8SUEZ4UsiQU.pVQX6aNA5heVkcvgoCHk3hCDFv78o8G','2024-03-20 02:01:19.3696'),('wilcolsd@gmail.com','$2a$10$W9rHKsjPpMZ1AvwVT/EvGO/tCsececDOFKGsS1TTR.fFGySpoUbOe','2024-03-16 02:04:42.1442');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'financedbschema'
--

--
-- Dumping routines for database 'financedbschema'
--
/*!50003 DROP PROCEDURE IF EXISTS `authUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `authUser`(in e varchar(45))
BEGIN
SELECT passwordHash FROM financedbschema.userlogin WHERE email = e;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFinanceData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`wcolton`@`100.67.246.199` PROCEDURE `getFinanceData`(in e varchar(45))
BEGIN
SELECT currentYear,monthlyExpenses,annualGrossIncome,dependents,numberOfDependents,goal from financedbschema.financedata where financedata.email = e;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUserInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`wcolton`@`100.67.246.199` PROCEDURE `getUserInfo`(in e varchar(45))
BEGIN
SELECT FirstName,LastName,filingStatus,state from financedbschema.userdata where userdata.email = e;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inputFinanceData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inputFinanceData`(in e varchar(45), in y INT, in monthEx DECIMAL(12,0),in ann DECIMAL(12,0),in dependent INT, in numOfDep INT,in goals varchar(45))
BEGIN
 INSERT INTO financedbschema.financedata (financedata.email, financedata.currentYear, financedata.monthlyExpenses, financedata.annualGrossIncome, financedata.dependents,financedata.numberofDependents,financedata.goal) VALUES (e,y,monthEx,ann,dependent,numOfDep,goals);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inputUserData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inputUserData`(in em varchar(56), in fname varchar(56), in lname varchar(56), in filestatus varchar(45),in st varchar(2))
BEGIN
INSERT INTO financedbschema.userdata (email, FirstName,LastName,filingStatus,state) VALUES(em,fname,lname,filestatus, st);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `signUpUserProc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `signUpUserProc`(in e varchar(45), in ph varchar(60))
BEGIN
INSERT INTO  financedbschema.userlogin (email, passwordHash,Create_Date) VALUES (e,ph,current_timestamp(4));
End ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 14:09:28
