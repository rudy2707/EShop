# Sprints



# Stories
Description | Priorite
--- | ---
C'est l'histoire d'un utilisateur qui a envie d'aller a la migros qui ne veut pas sortir de chez lui mais qui a une connexion internet | 1
Le client dans le magasin veut ramasser un produit sur une etagere et le mettre dans son panier | 3
Le client avec son panier veut pouvoir aller a la caisse et va payer ses courses | 5
Le client ne trouve pas le produit qu'il cherche et demande a un employe du magasin de l'aider | 6
Le client n'est pas content avec un de ses articles dans le panier et souhaite le retirer | 4
Le client va voir dans le rayon d'a cote les produits proposes | 2
Le client veut modifier la quantite d'un element situe dans le panier | X
Le client veut vider son panier | X
Un client veut supprimer un element du panier | X
Un client veut ajouter au panier en le selectionnant avec la souris | X
Le client veut avoir la description du produit en cliquant dessus | X
Le client veut connaitre le solde total de son panier | X
Le client veut rentrer ses informations de paiement et payer | X
Le client veut modifier son compte (nom, mot de passe, adresse) | X
Le client veut supprimer son compte | X
Le client veut payer mais il doit d'abord s'authentifier | X
Le client veut revenir au choix des categories | X
Le client veut pouvoir filtrer les produits par categories | X
Le client veut sortir du magasin | X
Le client veut voir son panier | X
Le client veut se deconnecter de son compte | X




# Cas d'utilisation

![alt text](http://yuml.me/4143895b "Use Case Diagram")


**Cas d'utilisation**

Visualisation des produits

**Acteurs**

Le client

**But**

Permettre au client de connaître les produits à disposition.

**Résumé Métier**

Le client accède à l'application web et voit les produits.

**Pré conditions**

Les produits doivent être référencés.

**Scénario Nominal**

**Scénario Alternatif**

1. Le client recherche un article en particulier.

**Exception**

1. Il n'y a pas de produit disponible.


---

**Cas d'utilisation**

Sélection de produits

**Acteurs**

Le client

**But**

Permettre au client de sélectionner des produits.

**Résumé Métier**

Le client doit pouvoir séléctionner le(s) produit(s) à acheter et les
mettre dans son panier.

**Pré conditions**

Le client doit être authentifié.

**Scénario Nominal**

**Scénario Alternatif**

**Exception**


---

**Cas d'utilisation**

Achat de produits

**Acteurs**

Le client

**But**

Permettre au client d'acheter des produits.

**Résumé Métier**

Le client doit pouvoir séléctionner le(s) produit(s) à acheter.

**Pré conditions**

Le client doit être authentifié.
Les produits doivent être disponibles.

**Scénario Nominal**

**Scénario Alternatif**

1. Acheter plusieurs produits d'un coup.
2. Avoir plusieurs fois le même produit.

**Exception**

1. Les produits ne sont pas en stock.


---