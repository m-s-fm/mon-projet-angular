
### 1. Structure du flux
- Le service `TaskService` utilise un **BehaviorSubject** 
  pour stocker et diffuser la liste des tâches.
- Le composant `Home` s'abonne à ce flux via `tasks$` 
  et le **pipe async**.

### 2. Mise à jour des données
- La méthode `addTask()` ajoute une tâche puis appelle 
  `next()` pour émettre la nouvelle liste.
- La méthode `removeTask()` supprime une tâche puis émet 
  à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.

### 3. Points clés retenus
- Pas besoin d'appeler `getTasks()` à chaque fois : 
  la donnée est **vivante**.
- `| async` gère l'abonnement et le désabonnement 
  automatiquement.
- Le flux reste cohérent entre le service et la vue.

### 4. Optimisations et Sécurité (Mise à jour)
- **Performance (OnPush)** : `TaskHighlight`, `TasksPage`, et `TaskEdit` utilisent désormais `ChangeDetectionStrategy.OnPush` pour minimiser les cycles de détection de changement.
- **Réduction du temps de chargement** : Remplacement du lien CDN pour `bootstrap-icons` par un package npm local, éliminant une requête bloquante au démarrage.
- **Sécurité (XSS)** : Audit de sécurité réalisé. Aucun usage de `innerHTML` ou script inline détecté. Tests unitaires ajoutés pour vérifier l'échappement des inputs malveillants.

