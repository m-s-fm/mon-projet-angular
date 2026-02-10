
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

### 4. Structure des Tests Unitaires & Intégration
L'application inclut désormais une suite de tests complète validant la stabilité du code.

**Outils utilisés :** Jasmine (Framework de test), Karma (Runner), TestBed (Angular Testing Utilities).

#### 4.1. Tests de Services (`TaskService`, `NotificationService`)
- Validations CRUD : `addTask`, `deleteTask`, `updateTask`.
- Gestion d'état : Vérification des BehaviorSubjects et Observables.
- Logique métier : Tri des tâches, mise en avant (`isHighlighted`), bascule terminé/non terminé.
- Mocks : Utilisation de `createSpyObj` pour isoler les dépendances (ex: `NotificationService` dans `TaskService`).

#### 4.2. Tests de Composants (`TaskEdit`, `TaskHighlight`)
- **Tests Unitaires Isolés** (`task-highlight.simple.spec.ts`) :
  - Test de la classe pure sans dépendance Angular (`new Component()`).
  - Validation rapide de la logique interne (ex: accesseurs, méthodes simples).

- **Tests d'Intégration DOM** (`task-highlight.spec.ts`) :
  - **`TestBed`** : Configuration d'un module de test dynamique.
  - **`ComponentFixture`** : Interfaçage avec le cycle de vie et le DOM.
  - **`fixture.detectChanges()`** : Déclenchement manuel de la détection de changement pour mettre à jour le template.
  - **Validation DOM** : Vérification que les valeurs (`@Input`) sont correctement rendues dans le HTML (`nativeElement.querySelector`).

#### 4.3. Bonnes Pratiques Appliquées
- **Injection de Dépendances** : Utilisation de `TestBed.inject()` pour récupérer les services.
- **Espions (`spies`)** : Surveillance des méthodes (`spyOn`, `toHaveBeenCalledWith`) pour vérifier les appels sans exécuter la logique réelle.
- **Asynchronisme** : Utilisation de `async/await` et `compileComponents` pour la compilation des templates.
