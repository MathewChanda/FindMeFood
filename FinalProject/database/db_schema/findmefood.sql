-- user has id, name, email, (salt? + salted password )or password
-- Create user table
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`), 
  UNIQUE (`user_name`, `user_email`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `salt`, `password`) VALUES
	(1, 'student',  'student@gmail.com','48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4'),
	(2,  'graduate', 'graduate@gmail.com','801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc', 'e289219c34f9a32ebc82393f09719b7f34872de95463242b5ffe8bb4b11a5fe7d454f9f5d082c8207c5d69b220ba06624b4bb15ffa05cc7d7d53c43f9e96da6a');


-- -- keeping track of user's favorites
-- CREATE TABLE IF NOT EXISTS `user_fav` (
--   `fav_user_id` int(10) unsigned NOT NULL,
--   `fav_res_id` int(10) unsigned NOT NULL,
--   PRIMARY KEY (`fav_user_id`,`fav_res_id`),
--   KEY `FV_RES_ID` (`fav_res_id`),
--   CONSTRAINT `FV_RES_ID` FOREIGN KEY (`fav_res_id`) REFERENCES `restaurants` (`res_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `FV_USER_ID` FOREIGN KEY (`fav_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- keeping track of user's favorites
CREATE TABLE IF NOT EXISTS `user_fav` (
  `res_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `res_link` longtext NOT NULL DEFAULT '0',
  `res_image` varchar(100) NOT NULL DEFAULT '0',
  `res_cusine` varchar(100) NOT NULL DEFAULT '0',
  `res_name` varchar(100) NOT NULL DEFAULT '0',
  `res_price` varchar(10) DEFAULT NULL,
  `res_address` longtext DEFAULT NULL,
  `res_rating` decimal(2,1) DEFAULT NULL,
  `res_review_count` int(5) DEFAULT NULL,
  `fav_user_id` int(10) unsigned NOT NULL,
  `res_latitude` FLOAT(2) DEFAULT NULL,
  `res_longitude` FLOAT(2) DEFAULT NULL,
  UNIQUE(`res_link`, `fav_user_id`), 
  PRIMARY KEY (`res_id`), 
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`fav_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- adding some mock restaurant data 
INSERT INTO `user_fav` ( `res_id`, `res_link`, `res_image`, `res_cusine`, `res_name`, `res_price`, `res_address`, `res_rating`, `res_review_count`,`fav_user_id`, `res_latitude`, `res_longitude`) VALUES
	(100, 'link0', 'img_url0', 'Sushi stuff', 'Sushi Nine', '$$$', '3812 Western Blvd, Raleigh, NC 27606-1935', 4, 25 ,1, 1,1),
	(101, 'link1', 'img_url1', 'Beer stuff', 'Neuse River Brewing', '$$', '518 Pershing Rd Ste 100 Raleigh, NC 27608', 4.5, 30 ,1,1,1);
