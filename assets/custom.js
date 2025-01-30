/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line
window.addEventListener('DOMContentLoaded', () => {



   const breadcrumbScript = document.querySelector('script[type="application/ld+json"]');
    if (!breadcrumbScript) return;
    
    let breadcrumbData = JSON.parse(breadcrumbScript.textContent);
    if (!Array.isArray(breadcrumbData)) return;
    
    let breadcrumbs = breadcrumbData[0].itemListElement;
    
    // Вземане на последната колекция от localStorage
    let lastCollection = localStorage.getItem("lastCollection");
    if (lastCollection) {
        try {
            lastCollection = JSON.parse(lastCollection);
            breadcrumbs[1] = {
                "@type": "ListItem",
                "position": 2,
                "name": lastCollection.name,
                "item": lastCollection.url
            };
        } catch (e) {
            console.error("Invalid stored collection data", e);
        }
    }
    
    // Ако текущата страница е колекция, запомни я в localStorage
    const collectionMatch = window.location.pathname.match(/\/collections\/([^\/]+)/);
    if (collectionMatch) {
        let collectionName = document.querySelector("h1")?.innerText || collectionMatch[1];
        let collectionData = {
            name: collectionName,
            url: window.location.pathname
        };
        localStorage.setItem("lastCollection", JSON.stringify(collectionData));
    }
    
    // Актуализиране на JSON-LD
    breadcrumbScript.textContent = JSON.stringify(breadcrumbData, null, 2);
  
  var canonicalTag = document.querySelector('link[rel="canonical"]');
  var robotsMetaTag = document.querySelector('meta[name="robots"][content="noindex,nofollow"]');
  var url = window.location.href;

  if (canonicalTag && canonicalTag.href === "https://candycatz.com/404") {
    canonicalTag.parentNode.removeChild(canonicalTag);
   
  }

  if (canonicalTag && url.includes("variant=") && robotsMetaTag) {
    robotsMetaTag.parentNode.removeChild(robotsMetaTag);
    
  }

  
   var radioButton = document.querySelector('.radio__button.sale');
    if (radioButton) {
        var urlParams = new URLSearchParams(window.location.search);
        var hasVariantParam = urlParams.has('variant');
        if (!hasVariantParam) {
            var label = radioButton.querySelector('label');
            if (label) {
                try {
                  function isMobile() {
                    return window.innerWidth <= 768;
                }
                function disableScroll() {
                        document.body.style.overflow = 'hidden';
                        document.documentElement.style.overflow = 'hidden';
                }
                function enableScroll() {
                        document.body.style.overflow = '';
                        document.documentElement.style.overflow = '';
                }
                if (isMobile()) {
                disableScroll();
                }
                var mouseEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                label.dispatchEvent(mouseEvent);
                 if (isMobile()) {
                setTimeout(enableScroll, 100);
                 }
                } catch (error) {
                }
            } else {
            }
        } else {
        }
    } else {
    }
});

  




  // ^^ Keep your scripts inside this IIFE function call to 
  // avoid leaking your variables into the global scope.
})();
