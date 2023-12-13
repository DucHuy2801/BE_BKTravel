CREATE DATABASE bktravel;
DROP TABLE IF EXISTS `bktravel`.`user`;
CREATE TABLE `bktravel`.`user` (
    `user_id` CHAR(36) PRIMARY KEY NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `first_name` NVARCHAR(30) NOT NULL,
    `last_name` NVARCHAR(30) NOT NULL,
    `gender` NVARCHAR(6),
    `date_of_birth` DATE,
    `phone_number` CHAR(10),
    `role_user` VARCHAR(20) NOT NULL,
    `hashedRt` VARCHAR(200),
    UNIQUE (`username`),
    UNIQUE (`email`)
);


DROP TABLE IF EXISTS `bktravel`.`customer`;
CREATE TABLE `bktravel`.`customer` (
    `customer_id` CHAR(36) PRIMARY KEY NOT NULL,
    `score` INT DEFAULT 0,
    `user_id` CHAR(36),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);
