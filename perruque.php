<?php
$colors = ['Blond', 'Brun', 'Noir', 'Châtain', 'Roux'];
$products = [];
for ($i = 1; $i <= 200; $i++) {
    $color = $colors[($i - 1) % count($colors)];
    $products[] = [
        'id' => $i,
        'name' => 'NADEGE KABELO L\'INTERNATIONAL',
        'style' => sprintf('Modèle %03d', $i),
        'color' => $color,
        'length' => 18 + (($i - 1) % 10),
        'price' => 59 + (($i - 1) % 20),
        'description' => 'Perruque premium, texture douce et tenue parfaite. Idéale pour un style unique et élégant.',
    ];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NADEGE KABELO L'INTERNATIONAL - Boutique de perruques</title>
  <link rel="stylesheet" href="styles.css" />
  <script>
    window.productsData = <?= json_encode($products, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>;
  </script>
</head>
<body>
  <header>
    <h1>NADEGE KABELO L'INTERNATIONAL</h1>
    <p>La boutique officielle de perruques. Explorez plus de 200 modèles signés NADEGE KABELO L'INTERNATIONAL, avec une charte graphique rose élégante et féminine.</p>
  </header>

  <section class="hero">
    <div class="banner">
      <h2>Collection exclusive de perruques</h2>
      <p>Chaque perruque a été conçue pour offrir confort, brillance et style. Parcourez nos modèles et trouvez la coupe, la couleur et la longueur qui complètent votre personnalité.</p>
    </div>
  </section>

  <section class="controls">
    <input id="search-input" type="search" placeholder="Rechercher un modèle, une couleur ou une longueur" aria-label="Recherche de perruques" />
    <select id="color-filter" aria-label="Filtrer par couleur">
      <option value="">Toutes les couleurs</option>
      <option value="Blond">Blond</option>
      <option value="Brun">Brun</option>
      <option value="Noir">Noir</option>
      <option value="Châtain">Châtain</option>
      <option value="Roux">Roux</option>
    </select>
    <select id="sort-select" aria-label="Trier les produits">
      <option value="id">Trier par modèle</option>
      <option value="price">Trier par prix</option>
      <option value="length">Trier par longueur</option>
    </select>
    <span class="control-text" id="result-count">200 produits disponibles</span>
  </section>

  <main>
    <div class="grid" id="product-grid"></div>
  </main>

  <footer>
    <p>© 2026 NADEGE KABELO L'INTERNATIONAL. Boutique de perruques rose officielle. Livraison rapide en France et à l'international.</p>
  </footer>
  <script src="scripts.js"></script>
</body>
</html>
