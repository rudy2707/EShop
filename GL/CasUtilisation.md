# Stories
* C'est l'histoire d'un utilisateur qui a envie d'aller a la migros qui ne veut pas sortir de chez lui mais qui a une connexion internet.
* Le client dans le magasin veut ramasser un produit sur une etagere et le mettre dans son panier
* Le client avec son panier veut pouvoir aller a la caisse et va payer ses courses
* Le client ne trouve pas le produit qu'il cherche et demande a un employe du magasin de l'aider
* Le client n'est pas content avec un de ses articles dans le panier et souhaite le retirer
* Le client va voir dans le rayon d'a cote les produits proposes


# Cas d'utilisation

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