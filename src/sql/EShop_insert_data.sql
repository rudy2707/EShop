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
-- Data for table `shop_test`.`tblProduct`
-- -----------------------------------------------------
DELETE FROM `shop_test`.`tblProduct`;
INSERT INTO `shop_test`.`tblProduct` (`prodName`, `prodDescription`, `prodCategory`, `prodStock`, `prodPrice`, `prodMeshName`) VALUES
('Apple', 'This is just a fuckin'' apple', 5, 1, 1, 'Apple.obj'),
('Banana', 'Just for scale', 5, 2, 2, 'BananaGroup.obj'),
('BlueMilk', 'Milk for Smurfs', 3, 1, 1, 'BlueMilk.obj'),
('BrownEgg', 'Take that', 3, 1, 1, 'BrownEgg.obj'),
('CaramelDoughnut', 'Homer lifestyle', 6, 1, 1, 'CaramelDoughnut.obj'),
('Carrot', 'Donkey motivation', 5, 1, 1, 'Carrot.obj'),
('Chocolate', 'Always good to eat', 6, 1, 1, 'Chocolate.obj'),
('ChocolateDoughnut', 'Two good things in one', 6, 1, 1, 'ChocolateDoughnut.obj'),
('Emmental', 'When French people try to make cheese', 3, 1, 1, 'Emmental.obj'),
('Fish', '100% fresh guaranteed', 4, 1, 1, 'Fish.obj'),
('GreenMilk', 'Milk for Hulk', 3, 1, 1, 'GreenMilk.obj'),
('Gruyere', 'Real cheese', 3, 1, 1, 'Gruyere.obj'),
('Ham', 'No pig inside ... lol just kidding', 4, 1, 1, 'Ham.obj'),
('JamDoughnut', 'Jam it boy, JAM IT', 6, 1, 1, 'JamDoughnut.obj'),
('Lolipop', '+18', 6, 1, 1, 'Lolipop.obj'),
('PaperTowel', 'Clean your hands', 7, 1, 1, 'PaperTowel.obj'),
('Pepper', 'For people who don''t like food', 5, 1, 1, 'Pepper.obj'),
('Pumpkin', 'For sale between 15 oct and 31 oct', 5, 1, 1, 'Pumpkin.obj'),
('RedMilk', 'Milk for Rednecks', 3, 1, 3, 'RedMilk.obj'),
('Scotch', 'You can fix it with this', 8, 1, 1, 'Scotch.obj'),
('Steak', 'For everyday use', 4, 1, 1, 'Steak.obj'),
('Toblerone', 'Swiss chocolate for tourists', 6, 1, 1, 'Toblerone.obj'),
('ToiletPaper', 'Second thing most essential, first is your mom', 7, 1, 1, 'ToiletPaper.obj'),
('WhiteEgg', 'KKK egg', 3, 1, 1, 'WhiteEgg.obj'),
('YoghurtApple', 'Apple and yoghurt', 3, 1, 1, 'YoghurtApple.obj'),
('YoghurtNature', 'Nature and yoghurt', 3, 1, 1, 'YoghurtNature.obj'),
('YoghurtStrawberry', 'Straw and berry and yoghurt', 3, 1, 1, 'YoghurtStrawberry.obj'),
('YoghurtVanilla', 'Vanilla Ice yoghurt', 3, 1, 1, 'YoghurtVanilla.obj');

-- -----------------------------------------------------
-- Data for table `shop_test`.`tblCustomer`
-- -----------------------------------------------------
DELETE FROM `shop_test`.`tblCustomer`;
INSERT INTO `shop_test`.`tblCustomer` (`cusFirstName`, `cusLastName`, `cusGender`, `cusEmail`, `cusPhone`, `cusPassword`) VALUES
('Tux', 'Torvalds', 'M', 'root', '007', '63a9f0ea7bb98050796b649e85481845');
