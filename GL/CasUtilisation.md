---
header-includes:
    - \usepackage{fancyhdr}
    - \pagestyle{fancy}
    - \rhead{27.10.2015}
    - \lhead{}
    - \fancyfoot[LE]{\thepage}
---

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

Authentification

**Acteurs**

Le client

**But**

Permettre au client de s'authentifier sur le site web.

**Résumé Métier**

Le client doit pouvoir être identifié pour pouvoir acheter des produits.

**Scénario Nominal**

**Scénario Alternatif**

1. Le client n'a pas de compte utilisateur.
2. Information de connexion erronée.

**Exception**


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


