/*!
* Start Bootstrap - Agency v7.0.4 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function onContactFormSubmit(event) {
    event.preventDefault();
    console.log("form submission - init")

    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var data = {
        to: 'info@itkanrepairs.com',
        from: email,
        subject: 'New Contact Form Submission',
        text: message
    };

    fetch('https://email.us-east-1.amazonaws.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Amz-Content-Sha256': 'UNSIGNED-PAYLOAD',
            'X-Amz-Date': new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''),
            'Authorization': 'AWS4-HMAC-SHA256 Credential=YOUR_AWS_ACCESS_KEY/20211015/us-east-1/ses/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=YOUR_SIGNATURE'
        },
        body: JSON.stringify({
            Action: 'SendEmail',
            Source: email,
            Destination: {
                ToAddresses: ['info@itkanrepairs.com']
            },
            Message: {
                Subject: {
                    Data: 'New Contact Form Submission'
                },
                Body: {
                    Text: {
                        Data: message
                    }
                }
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.MessageId) {
                document.getElementById('submitSuccessMessage').classList.remove('d-none');
                document.getElementById('contactForm').reset();
            } else {
                document.getElementById('submitErrorMessage').classList.remove('d-none');
            }
        })
        .catch(error => {
            document.getElementById('submitErrorMessage').classList.remove('d-none');
        });
}

function checkMessage() {
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');

    messageInput.addEventListener('input', () => {
        if (messageInput.value.length > 0) {
            submitButton.classList.remove('disabled');
        } else {
            submitButton.classList.add('disabled');
        }
    });
}

// Initialize the checkMessage function
checkMessage();
