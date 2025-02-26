const customize = {
   updateProductItemGrid: (componentRegistry) => {
      componentRegistry.useComponentPlugin('ProductItem', {
         name: 'Add extra information',
         enabled: true,
         apply: () => ({
            afterRender(element) {
               try {
                  let hasUpdated = false;
                  let productData = element.getParams().props.product;
                  let productId = productData.id;
                  if (productData?.split_product) {
                     productId = productData.variant_id;
                  }
                  let productItem = document.querySelector('[data-product-id="' + productId + '"]');
                  if (productItem && !hasUpdated) {
                     const mainImage = productItem.querySelector('.boost-sd__product-image-img--main');
                     const hoverImage = productItem.querySelector('.boost-sd__product-image-img--second');
                     
                     if (mainImage && mainImage.alt && !mainImage.alt.endsWith('1')) {
                        mainImage.alt = `${mainImage.alt} 1`;
                     }
                     
                     if (hoverImage && hoverImage.alt && !hoverImage.alt.endsWith('2')) {
                        hoverImage.alt = `${hoverImage.alt} 2`;
                     }

                     hasUpdated = true;
                  }
               } catch (e) {
                  console.warn(e);
               }
            }
         }),
      });
   }
}

window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([customize.updateProductItemGrid]);