-- Disable check for foreign keys
SET FOREIGN_KEY_CHECKS=0;

-- -----------------------------------------------------
-- Data for table `shop_test`.`tblProduct`
-- -----------------------------------------------------
DELETE FROM `shop_test`.`tblProduct`;
INSERT INTO `shop_test`.`tblProduct` (`prodName`, `prodDescription`, `prodCategory`, `prodStock`, `prodPrice`, `prodMeshName`) VALUES
('Apple', 'This is just a fuckin'' apple', 5, 1, 3, 'Apple.obj'),
('Banana', 'Just for scale', 5, 2, 2, 'BananaGroup.obj'),
('BlueMilk', 'Milk for Smurfs', 3, 1, 4, 'BlueMilk.obj'),
('BrownEgg', 'Take that', 3, 1, 5, 'BrownEgg.obj'),
('CaramelDoughnut', 'Homer lifestyle', 6, 1, 5, 'CaramelDoughnut.obj'),
('Carrot', 'Donkey motivation', 5, 1, 2, 'Carrot.obj'),
('Chocolate', 'Always good to eat', 6, 1, 3, 'Chocolate.obj'),
('ChocolateDoughnut', 'Two good things in one', 6, 1, 3, 'ChocolateDoughnut.obj'),
('Emmental', 'When French people try to make cheese', 3, 1, 8, 'Emmental.obj'),
('Fish', '100% fresh guaranteed', 4, 1, 12, 'Fish.obj'),
('GreenMilk', 'Milk for Hulk', 3, 1, 11, 'GreenMilk.obj'),
('Gruyere', 'Real cheese', 3, 1, 9, 'Gruyere.obj'),
('Ham', 'No pig inside ... lol just kidding', 4, 1, 4, 'Ham.obj'),
('JamDoughnut', 'Jam it boy, JAM IT', 6, 1, 6, 'JamDoughnut.obj'),
('Lolipop', '+18', 6, 1, 3, 'Lolipop.obj'),
('PaperTowel', 'Clean your hands', 7, 1, 4, 'PaperTowel.obj'),
('Pepper', 'For people who don''t like food', 5, 1, 3, 'Pepper.obj'),
('Pumpkin', 'For sale between 15 oct and 31 oct', 5, 1, 11, 'Pumpkin.obj'),
('RedMilk', 'Milk for Rednecks', 3, 1, 33, 'RedMilk.obj'),
('Scotch', 'You can fix it with this', 8, 1, 69, 'Scotch.obj'),
('Steak', 'For everyday use', 4, 1, 24, 'Steak.obj'),
('Toblerone', 'Swiss chocolate for tourists', 6, 1, 13, 'Toblerone.obj'),
('ToiletPaper', 'Second thing most essential, first is your mom', 7, 1, 3, 'ToiletPaper.obj'),
('WhiteEgg', 'KKK egg', 3, 1, 4, 'WhiteEgg.obj'),
('YoghurtApple', 'Apple and yoghurt', 3, 1, 5, 'YoghurtApple.obj'),
('YoghurtNature', 'Nature and yoghurt', 3, 1, 4, 'YoghurtNature.obj'),
('YoghurtStrawberry', 'Straw and berry and yoghurt', 3, 1, 6, 'YoghurtStrawberry.obj'),
('YoghurtVanilla', 'Vanilla Ice yoghurt', 3, 1, 7, 'YoghurtVanilla.obj');

-- -----------------------------------------------------
-- Data for table `shop_test`.`tblCategory`
-- -----------------------------------------------------
DELETE FROM `shop_test`.`tblCategory`;
INSERT INTO `shop_test`.`tblCategory` (`catId`, `catLabel`) VALUES
(1, 'Bakery'),
(2, 'Beverages'),
(3, 'Dairy'),
(4, 'Meat and fish'),
(5, 'Fruits and vegetables'),
(6, 'Candy'),
(7, 'Personal Care'),
(8, 'Alcool');

-- -----------------------------------------------------
-- Data for table `shop_test`.`tblCustomer`
-- -----------------------------------------------------
DELETE FROM `shop_test`.`tblCustomer`;
INSERT INTO `shop_test`.`tblCustomer` (`cusFirstName`, `cusLastName`, `cusGender`, `cusEmail`, `cusPhone`, `cusPassword`) VALUES
('Tux', 'Torvalds', 'M', 'root@root.io', '007-007-007', '63a9f0ea7bb98050796b649e85481845'),
('Fire', 'Fox', 'M', 'fire@fox.xyz', '1337-1337-666', '21232f297a57a5a743894a0e4a801fc3');

-- Enable check for foreign keys
SET FOREIGN_KEY_CHECKS=0;
