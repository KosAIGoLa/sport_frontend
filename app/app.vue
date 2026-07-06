<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.only-mobile {
  display: none !important;
}

@media (max-width: 768px) {
  .only-desktop {
    display: none !important;
  }

  .only-mobile {
    display: initial !important;
  }

  div.only-mobile,
  section.only-mobile,
  article.only-mobile,
  aside.only-mobile,
  header.only-mobile,
  footer.only-mobile,
  main.only-mobile,
  nav.only-mobile {
    display: block !important;
  }

  button.only-mobile,
  a.only-mobile,
  span.only-mobile {
    display: inline-flex !important;
  }
}
</style>
