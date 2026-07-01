/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

// Using https://formspree.io

document.addEventListener("DOMContentLoaded", function() {
  // Get the form element
  const form = document.getElementById("my-contact-form");

  form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents the page from redirecting to Formspree

    // Get the message divs
    const loadingMessage = form.querySelector('.loading');
    const errorMessage = form.querySelector('.error-message');
    const sentMessage = form.querySelector('.sent-message');

    // Show loading, hide others
    loadingMessage.classList.add('d-block');
    errorMessage.classList.remove('d-block');
    sentMessage.classList.remove('d-block');

    // Package the form data
    const formData = new FormData(form);

    try {
      // Send the data to Formspree in the background
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json' // This tells Formspree not to redirect us
        }
      });

      if (response.ok) {
        // Success!
        loadingMessage.classList.remove('d-block'); // Hide loading
        
        // Set your custom success message
        sentMessage.innerHTML = "Thanks for getting in contact!";
        sentMessage.classList.add('d-block'); // Show success message
        
        form.reset(); // THIS CLEARS THE INPUT FIELDS!
        
        // Optional: Hide the success message after 5 seconds
        setTimeout(() => {
            sentMessage.classList.remove('d-block');
        }, 5000);

      } else {
        // Formspree returned an error (e.g., missed a required field)
        const data = await response.json();
        throw new Error(data.error || "Oops! There was a problem submitting your form");
      }
    } catch (error) {
      // Show the error message
      loadingMessage.classList.remove('d-block');
      errorMessage.innerHTML = "Oops! There was a problem submitting your form.";
      errorMessage.classList.add('d-block');
    }
  });
});

// Not needed as using https://formspree.io
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!');
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//       if ( recaptcha ) {
//         if(typeof grecaptcha !== "undefined" ) {
//           grecaptcha.ready(function() {
//             try {
//               grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
//               .then(token => {
//                 formData.set('recaptcha-response', token);
//                 php_email_form_submit(thisForm, action, formData);
//               })
//             } catch(error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: 'POST',
//       body: formData,
//       headers: {'X-Requested-With': 'XMLHttpRequest'}
//     })
//     .then(response => {
//       if( response.ok ) {
//         return response.text();
//       } else {
//         throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
//       }
//     })
//     .then(data => {
//       thisForm.querySelector('.loading').classList.remove('d-block');
//       if (data.trim() == 'OK') {
//         thisForm.querySelector('.sent-message').classList.add('d-block');
//         thisForm.reset(); 
//       } else {
//         throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
//       }
//     })
//     .catch((error) => {
//       displayError(thisForm, error);
//     });
//   }

//   function displayError(thisForm, error) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.error-message').innerHTML = error;
//     thisForm.querySelector('.error-message').classList.add('d-block');
//   }

// })();
