const originalPageTitle = document.title
const originalMetaContent = document.querySelector('meta[name="description"]')?.getAttribute("content");  
const originalCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");  
const h1Original = document.querySelector(".collection_h1")?.textContent


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


                 
const promoLabels = document.querySelectorAll('.product-promo-label');
const nextToPrice = document.querySelector('.product-next-to-price');
const imageWrappers = productItem.querySelectorAll('.boost-sd__product-image');
const priceWrappers = productItem.querySelectorAll('.boost-sd__product-price');


const productTags = productData.tags; 

promoLabels.forEach(promoLabel => {
  const requiredTag = promoLabel.getAttribute('data-required-tag'); 

  // Клонирай само ако продуктът има съответния таг
  if (requiredTag && productTags.includes(requiredTag) && imageWrappers.length > 0) {
    const alreadyCloned = productItem.querySelector(`.product-promo-label--cloned[data-required-tag="${requiredTag}"]`);
    if (!alreadyCloned) {
      imageWrappers.forEach(wrapper => {
        const clone = promoLabel.cloneNode(true);
        clone.classList.add('product-promo-label--cloned');
        clone.setAttribute('data-required-tag', requiredTag); 
        wrapper.parentNode.insertBefore(clone, wrapper);
      });
    }
  }
});


if (nextToPrice && productTags.length > 0 && priceWrappers.length > 0) {
  promoLabels.forEach(promoLabel => {
    const requiredTag = promoLabel.getAttribute('data-required-tag');
    
    if (requiredTag && productTags.includes(requiredTag)) {
      const alreadyClonedPrice = productItem.querySelector(`.product-next-to-price--cloned[data-required-tag="${requiredTag}"]`);
      if (!alreadyClonedPrice) {
        priceWrappers.forEach(wrapper => {
          const clone = nextToPrice.cloneNode(true);
          clone.classList.add('product-next-to-price--cloned');
          clone.setAttribute('data-required-tag', requiredTag); 
          wrapper.parentNode.insertBefore(clone, wrapper.nextSibling);
        });
      }
    }
  });
}
                    
                    
                     hasUpdated = true;
                  }
               } catch (e) {
                  console.warn(e);
               }
            }
         }),
      });
   },

  updateInfoBasedOnMetafiled: (componentRegistry) => {
    componentRegistry.useComponentPlugin('CollectionHeader', {
         name: 'Update title and meta info based on collection metafield',
         enabled: true,
         apply: () => ({
            beforeRender(element) {
               try {
                 if (window.collectionMetaFromLiquid) {
                   
                   const jsonInfo = JSON.parse(window.collectionMetaFromLiquid.customInfo)
                    const h1Elm = document.querySelector(".collection_h1")


                   const currentUrlObj = new URL(window.location.href);
  const params = currentUrlObj.searchParams;

  // Премахваме само параметъра "page"
  params.delete('page');

  // Конструираме отново URL без "page", но с останалите параметри
  const cleanUrl = currentUrlObj.origin + currentUrlObj.pathname + (params.toString() ? '?' + params.toString() : '');

                   
                   if (Array.isArray(jsonInfo)) {
                     jsonInfo.forEach(info => {
                       if (cleanUrl == info.url) {
                         console.log("matched")
                         if (h1Elm) { 
                           h1Elm.innerHTML = `<h1>${info.h1}</h1>`
                           //h1Elm.style.display = "block";

                                    }
                         document.title = info.meta_title
                         updateMetaDescription(info.meta_description)
                         updateCanonical(info.url)
                       } 
                     })

                     if (!jsonInfo.find(info => info.url == cleanUrl)) {
                                                console.log("not matched")
                         if (h1Elm) { 
                           h1Elm.innerHTML = `<h1>${h1Original}</h1>`
                           //h1Elm.style.display = "block";
                         }
                         if (originalPageTitle) document.title = originalPageTitle
                         if (originalMetaContent) updateMetaDescription(originalMetaContent)
                       if (originalCanonical) updateCanonical(originalCanonical)
                     }
                   }               
                 }
                 
              
                 
                 
               } catch (e) {
                  console.warn(e);
               }
              document.querySelector(".collection_h1").style.display="block";
            }
         }),
      });
   }
}

window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([customize.updateProductItemGrid, customize.updateInfoBasedOnMetafiled]);

function updateMetaDescription(newDescription) {  
  console.log(newDescription)
  let meta = document.querySelector('meta[name="description"]');  
  if (meta) {  
    meta.setAttribute("content", newDescription);  
  } else {  
    // If the meta description tag doesn't exist, create it  
    meta = document.createElement('meta');  
    meta.setAttribute('name', 'description');  
    meta.setAttribute('content', newDescription);  
    document.head.appendChild(meta);  
  }  
}  
function updateCanonical(newCanonical) {  
  console.log(newCanonical)
  let meta = document.querySelector('link[rel="canonical"]');  
  if (meta) {  
    meta.setAttribute("href", newCanonical);  
  } else {  
    // If the meta description tag doesn't exist, create it  
    meta = document.createElement('link');  
    meta.setAttribute('rel', 'canonical');  
    meta.setAttribute('href', newCanonical);  
    document.head.appendChild(meta);  
  }  
}  