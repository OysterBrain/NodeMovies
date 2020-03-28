# NodeMovies

## INSTALLATION

Pour installer ce projet vous devez : 

  - cloner le projet via ce Github
  - se placer dans le repertoire 
  - effectuer la commande **npm start** pour installer toutes les dépendances utiles au projet. 
 
 ## LANCER PROJET 
 
Pour lancer le projet vous devez :

  - avoir tous les accès pour ce répertoire 
  - changer les accès msql (user et nom de la base) dans le fichier de configuration qui se trouve le dossier **server** et qui s'appelle **manifest.js**
  - créer une base de donnée du nom spécifié dans le fichier de configuration
  - une fois que toutes ces étapes ont été faites lancer le projet avec la commande **npm start**
  
  ## UTILISER PROJET
  
Pour utiliser le projet vous devez :
  - lancer le projet et ajouter un utilisateur dans la base de donnée dans la table **user**
  - se rendre sur l'url **http://localhost:3000/documentation**, une page swagger s'ouvre avec toutes les routes possibles du projet
  - pour accéder à l'ensemble des routes il faut être authentifier pour cela il faut :
      + via la route **user/login** récuperer le token en saisissant le login et le mot de passe ainsi enregistré
      + copier ce token et le coller dans l'onglet **authorize** en haut à droite
  
   Si vous avez suivi toutes ces étapes vous pouvez avoir accès à l'ensemble des routes du projet. :rocket:
   