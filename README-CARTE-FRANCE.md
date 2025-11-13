# Carte de France 3D Interactive - Compatible Elementor

## Description

Carte de France interactive avec 101 départements, effets 3D premium type Apple Maps, et pop-ups glassmorphism pour la génération de leads SEO.

## Caractéristiques

- **Design Premium 3D** : Effets de relief, ombres douces, animations fluides
- **101 Départements** : France métropolitaine + DOM-TOM
- **Pop-up Glassmorphism** : Design moderne avec effet de flou
- **SEO Optimisé** : Génération automatique de slugs pour URLs propres
- **100% Compatible Elementor** : Fonctionne dans un widget HTML
- **Responsive** : S'adapte à tous les écrans
- **Aucune dépendance** : Pas de jQuery, React ou bibliothèques externes

## Installation dans Elementor

### Étape 1 : Ouvrir votre page Elementor
1. Connectez-vous à votre WordPress
2. Ouvrez la page où vous voulez ajouter la carte
3. Cliquez sur "Modifier avec Elementor"

### Étape 2 : Ajouter le widget HTML
1. Dans le panneau gauche, cherchez "HTML"
2. Glissez-déposez le widget HTML à l'endroit souhaité
3. Vous pouvez le placer dans n'importe quelle section/colonne

### Étape 3 : Copier-coller le code
1. Ouvrez le fichier `france-map-3d-elementor.html`
2. Sélectionnez TOUT le contenu (Ctrl+A)
3. Copiez (Ctrl+C)
4. Collez dans le widget HTML d'Elementor (Ctrl+V)

### Étape 4 : Publier
1. Cliquez sur "Mettre à jour" ou "Publier"
2. Testez la carte en cliquant sur les départements

## Configuration des URLs

Les URLs générées suivent automatiquement ce format :
```
/preparateur-mental-ville/[slug-de-la-ville]/
```

### Exemples de slugs générés :
- Paris → `paris`
- Le Havre → `le-havre`
- Saint-Étienne → `saint-etienne`
- Aix-en-Provence → `aix-en-provence`

### Créer les pages de destination

Vous devez créer des pages WordPress avec ces URLs pour que les liens fonctionnent :

1. **Option 1 : Pages manuelles**
   - Créez une page pour chaque ville
   - URL : `/preparateur-mental-ville/nom-de-la-ville/`

2. **Option 2 : Custom Post Type**
   - Créez un CPT "Préparateurs Mentaux"
   - Slug : `preparateur-mental-ville`
   - Ajoutez une entrée par ville

## Personnalisation

### Modifier les couleurs

Dans la section `<style>`, vous pouvez modifier :

```css
/* Couleur principale (départements au survol) */
.france-map-dept:hover {
  fill: #4f46e5; /* Bleu indigo - changez ici */
}

/* Couleur du bouton CTA */
.france-map-3d-popup-cta {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  /* Changez ces valeurs */
}
```

### Modifier le texte du pop-up

Dans la section HTML :

```html
<p class="france-map-3d-popup-text">
  Un préparateur mental certifié <strong>La Voie du Sommet</strong> est disponible dans cette ville et ce département.
</p>
```

### Changer le texte du bouton

Dans la section HTML :

```html
<button class="france-map-3d-popup-cta" id="popupCTA">
  Voir le préparateur mental →
</button>
```

## Données des départements

L'objet JavaScript contient les 101 départements avec leurs villes principales :

```javascript
const grandesVilles = {
  "01": { departement: "Ain", ville: "Bourg-en-Bresse" },
  "02": { departement: "Aisne", ville: "Saint-Quentin" },
  // ... etc
};
```

Pour modifier une ville, trouvez le numéro du département dans le code JavaScript et changez le nom de la ville.

## Compatibilité

- ✅ WordPress 5.0+
- ✅ Elementor Free & Pro
- ✅ Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Mobile & Tablette
- ✅ Compatible avec les thèmes WordPress

## Résolution de problèmes

### La carte ne s'affiche pas
- Vérifiez que vous avez bien collé TOUT le code (HTML + CSS + JS)
- Vérifiez qu'il n'y a pas d'autres widgets HTML dans la même section qui pourraient entrer en conflit

### Les clics ne fonctionnent pas
- Vérifiez la console JavaScript (F12) pour voir les erreurs
- Assurez-vous que le code n'a pas été modifié par erreur

### Le pop-up ne s'affiche pas
- Vérifiez qu'il n'y a pas de z-index plus élevé sur d'autres éléments de la page
- Le pop-up utilise `z-index: 999999`

### Les URLs ne fonctionnent pas (erreur 404)
- Créez d'abord les pages de destination avec les URLs correctes
- Vérifiez que les permaliens sont activés dans WordPress (Réglages > Permaliens)

## Support

Pour toute question ou personnalisation avancée, consultez la documentation Elementor ou contactez un développeur WordPress.

## Licence

Code fourni pour La Voie du Sommet - Utilisation libre pour votre projet.
