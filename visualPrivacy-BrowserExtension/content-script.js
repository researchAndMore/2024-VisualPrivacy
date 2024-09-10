// create popup window
const container = document.createElement('div');

// inject webpage and add popup
document.body.appendChild(container);

// style for popup window
container.style.position = 'fixed';
container.style.top = '20px';
container.style.right = '20px';
container.style.width = '250px';
container.style.height = '200px';
container.style.backgroundColor = 'rgb(244,244,244)';
container.style.padding = '';
container.style.borderRadius = '5px';
container.style.zIndex = '9999'; // Ensure the element is above other content

// connect to a port with the background script
const port = chrome.runtime.connect({ name: 'visualPrivacy' });

// create a long-live connections to the service worker
port.onMessage.addListener(async (message) => {
    // console.log(message.statusCode);
    if (message.statusCode === 0) {
        // add html to popup
        container.innerHTML = message.popup;

        // update icons
        // document.getElementById('visual-privacy-icon-refresh').src = chrome.runtime.getURL('figures/IconRefresh.png');

        // get button to close the popup and add an event listener
        const closeButton = document.getElementById('visual-privacy-toggle');
        closeButton.addEventListener('click', toggleVisualPrivacy, false);

        // get button to open accordions and add an event listener
        const collectionButton = document.getElementById('privacyCollectionButton');
        const sharingButton = document.getElementById('privacySharingButton');
        const controlButton = document.getElementById('privacyControlButton');
        const securityButton = document.getElementById('privacySecurityButton');

        // send events to news website (only for integration with the news website)
        collectionButton.addEventListener('click', () => {
            sendEvent('collection');
            toggleContent('privacyCollectionContent');
        });
        sharingButton.addEventListener('click', () => {
            sendEvent('sharing');
            toggleContent('privacySharingContent');
        });
        controlButton.addEventListener('click', () => {
            sendEvent('control');
            toggleContent('privacyControlContent');
        });
        securityButton.addEventListener('click', () => {
            sendEvent('security');
            toggleContent('privacySecurityContent');
        });

        // Show waiting content
        toggleElement('visual-privacy-loading-content');
    } else if (message.statusCode === 1) {
        // add information to the popup window
        changeContent(message);
        container.addEventListener('mouseover', onMouseOver);
        container.addEventListener('mouseout', onMouseOut);

        // hide the waiting section
        // toggleElement('visual-privacy-loading-content');

        // display the content section
        // toggleElement('visual-privacy-content');
    } else if (message.statusCode === 2) {
        // retrieve hypermedia references related to privacy policy
        let hrefs = getPrivacyLink();
        if (hrefs.length === 1) {
            // parse the url
            const urlObject = new URL(window.location.href);
            const rootDomain = `${urlObject.protocol}//${urlObject.hostname}${
                urlObject.port ? `:${urlObject.port}` : ''
            }`;
            let href;

            if (hrefs[0].startsWith('/')) {
                href = rootDomain + hrefs[0];
            } else {
                href = hrefs[0];
            }

            const messageContentScript = {
                statusCode: 3,
                href: href,
            };

            // send hypermedia reference to the service worker
            port.postMessage(messageContentScript);
        } else {
            // hide the waiting section
            toggleElement('visual-privacy-loading-content');

            // display the form section
            toggleElement('visual-privacy-form');

            // event listener for the form
            const submitButton = document.getElementById('visual-privacy-form-button');
            submitButton.addEventListener(
                'click',
                () => {
                    const href = document.getElementById('privacy-link').value;

                    const messageContentScript = {
                        statusCode: 3,
                        href: href,
                    };

                    // hide the form section
                    toggleElement('visual-privacy-form');

                    // display the waiting section
                    toggleElement('visual-privacy-loading-content');

                    // send the privacy link from the form to the service worker
                    port.postMessage(messageContentScript);
                },
                false
            );
        }
    } else if (message.statusCode === 21) {
        // initialize a DOMParser and parse the html doc
        const parser = new DOMParser();
        const doc = parser.parseFromString(message.privacyPolicies, 'text/html');
        let privacyPolicy = doc.body.textContent;

        privacyPolicy = privacyPolicy.replace('\n\n', '');

        // send only the text within the html tags of the privacy policy to the service worker
        const messageContentScript = {
            statusCode: 11,
            privacyPolicy: privacyPolicy,
        };

        port.postMessage(messageContentScript);
    } else if (message.statusCode === 22) {
        // add information to the popup window
        changeContent(message);

        // Attach event listeners to the container
        container.addEventListener('mouseover', onMouseOver);
        container.addEventListener('mouseout', onMouseOut);
    } else if (message.statusCode === 999) {
        // change the status icon to error
        toggleElement('visual-privacy-loading-content');
        toggleElement('visual-privacy-error-content');
        document.getElementById('error-image').src = chrome.runtime.getURL('figures/IconError.png');
    }
});

function changeContent(message) {
    /*
    This function gets all information which the Chrome extension needs to display the privacy context.
    It includes the overall grade, the counters of the categories, and the subcategories. Within the function, the html
    tags are changed.
     */

    // hide the waiting section
    toggleElement('visual-privacy-loading-content');

    // display the content section
    toggleElement('visual-privacy-content');
    // Change the styling

    container.style.backgroundColor = '';

    document.getElementById('visual-privacy-scale').classList.add('w3-hide');
    // document.getElementById('visual-privacy-header').classList.add('w3-hide');
    document.getElementById('visual-privacy-toggle').classList.add('w3-hide');
    document.getElementById('visual-privacy-verbose').classList.add('w3-hide');

    // container.style.height = '300px';

    // Update the grade's image
    document.getElementById('visual-privacy-rating-grade').src = chrome.runtime.getURL(
        message.privacyPolicies.gradeImg
    );

    // Update the scale
    if (message.privacyPolicies.grade === 'A') {
        document.getElementById('scale-a').classList.add('w3-border');
    } else if (message.privacyPolicies.grade === 'B') {
        document.getElementById('scale-b').classList.add('w3-border');
    } else if (message.privacyPolicies.grade === 'C') {
        document.getElementById('scale-c').classList.add('w3-border');
    } else if (message.privacyPolicies.grade === 'D') {
        document.getElementById('scale-d').classList.add('w3-border');
    } else if (message.privacyPolicies.grade === 'E') {
        document.getElementById('scale-e').classList.add('w3-border');
    } else if (message.privacyPolicies.grade === 'F') {
        document.getElementById('scale-f').classList.add('w3-border');
    } else if (message.privacyPolicies.grade === 'G') {
        document.getElementById('scale-g').classList.add('w3-border');
    }

    // Update categories
    colorResponse(message.privacyPolicies.counter, message.privacyPolicies.categories);

    // Subcategory collection
    let collection_counter = message.privacyPolicies.categories.collection.collection_counter;
    let purpose_counter = message.privacyPolicies.categories.collection.purpose_counter;
    let retention_counter = message.privacyPolicies.categories.collection.retention_counter;

    document.getElementById('subcategory-collection').innerText =
        message.categories.collection.collection[collection_counter];
    document.getElementById('subcategory-purpose').innerText = message.categories.collection.purpose[purpose_counter];
    document.getElementById('subcategory-retention').innerText =
        message.categories.collection.retention[retention_counter];

    const collection_counters = [collection_counter, purpose_counter, retention_counter];

    const collection_dots = ['dot-collection', 'dot-purpose', 'dot-retention'];

    doSubcategory(collection_counters, collection_dots);

    // Subcategory sharing
    let sharing_counter = message.privacyPolicies.categories.sharing.sharing_counter;
    let sale_counter = message.privacyPolicies.categories.sharing.sale_counter;
    let disclosure_counter = message.privacyPolicies.categories.sharing.disclosure_counter;

    document.getElementById('subcategory-sharing').innerText = message.categories.sharing.sharing[sharing_counter];
    document.getElementById('subcategory-sale').innerText = message.categories.sharing.sale[sale_counter];
    document.getElementById('subcategory-disclosure').innerText =
        message.categories.sharing.disclosure[disclosure_counter];

    const sharing_counters = [sharing_counter, sale_counter, disclosure_counter];

    const sharing_dots = ['dot-sharing', 'dot-sale', 'dot-disclosure'];

    doSubcategory(sharing_counters, sharing_dots);

    // Subcategory control
    let control_counter = message.privacyPolicies.categories.control.control_counter;
    let rightToBeForgotten_counter = message.privacyPolicies.categories.control.rightToBeForgotten_counter;
    let correctness_counter = message.privacyPolicies.categories.control.correctness_counter;

    document.getElementById('subcategory-control').innerText = message.categories.control.control[control_counter];
    document.getElementById('subcategory-rightToBeForgotten').innerText =
        message.categories.control.rightToBeForgotten[rightToBeForgotten_counter];
    document.getElementById('subcategory-correctness').innerText =
        message.categories.control.correctness[correctness_counter];

    const control_counters = [control_counter, rightToBeForgotten_counter, correctness_counter];

    const control_dots = ['dot-control', 'dot-right-to-be-forgotten', 'dot-correctness'];

    doSubcategory(control_counters, control_dots);

    // Subcategory security
    let security_counter = message.privacyPolicies.categories.security.security_counter;
    let anonymization_counter = message.privacyPolicies.categories.security.anonymization_counter;
    let accountability_counter = message.privacyPolicies.categories.security.accountability_counter;

    document.getElementById('subcategory-security').innerText = message.categories.security.security[security_counter];
    document.getElementById('subcategory-anonymization').innerText =
        message.categories.security.anonymization[anonymization_counter];
    document.getElementById('subcategory-accountability').innerText =
        message.categories.security.accountability[accountability_counter];

    const security_counters = [security_counter, anonymization_counter, accountability_counter];

    const security_dots = ['dot-security', 'dot-anonymization', 'dot-accountability'];

    doSubcategory(security_counters, security_dots);
}

function doSubcategory(counters, dots) {
    switch (counters[0]) {
        case 0:
            document.getElementById(dots[0]).style.backgroundColor = 'green';
            break;
        case 1:
            document.getElementById(dots[0]).style.backgroundColor = 'yellow';
            break;
        case 2:
            document.getElementById(dots[0]).style.backgroundColor = 'red';
        default:
            break;
    }

    switch (counters[1]) {
        case 0:
            document.getElementById(dots[1]).style.backgroundColor = 'green';
            break;
        case 1:
            document.getElementById(dots[1]).style.backgroundColor = 'yellow';
            break;
        case 2:
            document.getElementById(dots[1]).style.backgroundColor = 'red';
        default:
            break;
    }

    switch (counters[2]) {
        case 0:
            document.getElementById(dots[2]).style.backgroundColor = 'green';
            break;
        case 1:
            document.getElementById(dots[2]).style.backgroundColor = 'yellow';
            break;
        case 2:
            document.getElementById(dots[2]).style.backgroundColor = 'red';
        default:
            break;
    }
}

// Function to close the popup window
function toggleVisualPrivacy() {
    container.style.display = 'None';
}

function toggleElement(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf('w3-show') == -1) {
        x.className += ' w3-show';
    } else {
        x.className = x.className.replace(' w3-show', '');
    }
}

// Toggle for further information
function toggleContent(id) {
    let i = 0;

    const categories = [
        'privacyCollectionContent',
        'privacySharingContent',
        'privacyControlContent',
        'privacySecurityContent',
    ];

    while (i < categories.length) {
        let element = document.getElementById(categories[i]);

        if (id === categories[i]) {
            if (element.className.indexOf('w3-show') === -1) {
                element.classList.add('w3-show');
                container.style.height = '500px';
            } else {
                element.classList.remove('w3-show');
                container.style.height = '400px';
            }
        } else {
            element.classList.remove('w3-show');
        }

        i++;
    }
}

// Assign a color based on the type counter
function colorResponse(counter, categories) {
    const color = {
        good: [145, 210, 100],
        medium: [252, 239, 100],
        bad: [220, 115, 44],
    };

    let collection;
    let sharing;
    let control;
    let security;

    let collectionCounter = categories.collection.counter;
    let sharingCounter = categories.sharing.counter;
    let controlCounter = categories.control.counter;
    let securityCounter = categories.security.counter;

    if (collectionCounter <= 2) {
        collection = color.good;
    } else if (collectionCounter <= 4) {
        collection = color.medium;
    } else {
        collection = color.bad;
    }

    if (sharingCounter <= 2) {
        sharing = color.good;
    } else if (sharingCounter <= 4) {
        sharing = color.medium;
    } else {
        sharing = color.bad;
    }

    if (controlCounter <= 2) {
        control = color.good;
    } else if (controlCounter <= 4) {
        control = color.medium;
    } else {
        control = color.bad;
    }

    if (securityCounter <= 2) {
        security = color.good;
    } else if (securityCounter <= 4) {
        security = color.medium;
    } else {
        security = color.bad;
    }

    document.getElementById('privacyCollectionButton').style.backgroundColor = `rgb(${collection})`;
    document.getElementById('privacySharingButton').style.backgroundColor = `rgb(${sharing})`;
    document.getElementById('privacyControlButton').style.backgroundColor = `rgb(${control})`;
    document.getElementById('privacySecurityButton').style.backgroundColor = `rgb(${security})`;
}

function getPrivacyLink() {
    const links = document.querySelectorAll('a');

    const hrefs = [];

    links.forEach((link) => {
        const href = link.getAttribute('href');

        if (href) {
            if (href.includes('privacy')) {
                hrefs.push(href);
            }
        }
    });

    return hrefs;
}

// Function to change style when user hovers over the element
function onMouseOver() {
    const categories = [
        'privacyCollectionContent',
        'privacySharingContent',
        'privacyControlContent',
        'privacySecurityContent',
    ];

    for (let i = 0; i < 4; i++) {
        if (document.getElementById(categories[i]).className.indexOf('w3-show') === -1) {
            container.style.height = '400px';
        } else {
            container.style.height = '500px';
            break;
        }
    }

    container.style.backgroundColor = 'rgb(244,244,244)';
    document.getElementById('visual-privacy-scale').classList.add('w3-show');
    // document.getElementById('visual-privacy-header').classList.add('w3-show');
    document.getElementById('visual-privacy-toggle').classList.add('w3-show');
    document.getElementById('visual-privacy-verbose').classList.add('w3-show');
}

function onMouseOut() {
    container.style.height = '60px'; // Change the background color to blue
    container.style.backgroundColor = '';

    document.getElementById('visual-privacy-scale').classList.remove('w3-show');
    // document.getElementById('visual-privacy-header').classList.remove('w3-show');
    document.getElementById('visual-privacy-toggle').classList.remove('w3-show');
    document.getElementById('visual-privacy-verbose').classList.remove('w3-show');
}

function sendEvent(message) {
    window.postMessage({ source: 'chrome_extension', buttonPress: message }, '*');
}

// After a period of time, the popup becomes smaller
// setTimeout(() => {
//     // Change the styling

//     container.style.height = '60px';
//     container.style.backgroundColor = '';

//     document.getElementById('visual-privacy-scale').classList.add('w3-hide');
//     // document.getElementById('visual-privacy-header').classList.add('w3-hide');
//     document.getElementById('visual-privacy-toggle').classList.add('w3-hide');
//     document.getElementById('visual-privacy-verbose').classList.add('w3-hide');

//     // Attach event listeners to the container
//     container.addEventListener('mouseover', onMouseOver);
//     container.addEventListener('mouseout', onMouseOut);
// }, 5000); // After 5 seconds, do ...
