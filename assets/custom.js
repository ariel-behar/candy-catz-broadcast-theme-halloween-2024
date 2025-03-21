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



   
  var canonicalTag = document.querySelector('link[rel="canonical"]');
  var robotsMetaTag = document.querySelector('meta[name="robots"][content="noindex,nofollow"]');
  var url = window.location.href;

  if (canonicalTag && canonicalTag.href === "https://candycatz.com/404") {
    canonicalTag.parentNode.removeChild(canonicalTag);
   
  }

  if (canonicalTag && canonicalTag.href === "https://candycatz.com/account/login") {
    canonicalTag.parentNode.removeChild(canonicalTag);
   
  }
   if (canonicalTag && canonicalTag.href === "https://candycatz.com/collections") {
    canonicalTag.parentNode.removeChild(canonicalTag);
  }

  if (canonicalTag && /^https:\/\/candycatz\.com\/search(\?q=[^&]*)?/.test(canonicalTag.href)) {
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
