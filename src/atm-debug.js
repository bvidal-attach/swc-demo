var promociones = document.querySelectorAll('.realplaza-product-custom-0-x-productSummaryPrice__Tag__Card');
console.log(promociones);

promociones.forEach(function(promociones){
    var elementPadre = promociones.closest('.vtex-search-result-3-x-galleryItem');
    if (elementPadre) {
        elementPadre.innerHTML = '<div><p style="display: inline; background: yellow;">OFERTA</p>'.concat(elementPadre.innerHTML).concat('</div>');
    }
});