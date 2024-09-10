function gradeResponse(counter) {
    if (counter <= 1) return { gradeImg: `figures/PrivacyRatingA.png`, grade: 'A' };
    if (counter <= 5) return { gradeImg: `figures/PrivacyRatingB.png`, grade: 'B' };
    if (counter <= 9) return { gradeImg: `figures/PrivacyRatingC.png`, grade: 'C' };
    if (counter <= 13) return { gradeImg: 'figures/PrivacyRatingD.png', grade: 'D' };
    if (counter <= 17) return { gradeImg: `figures/PrivacyRatingE.png`, grade: 'E' };
    if (counter <= 21) return { gradeImg: `figures/PrivacyRatingF.png`, grade: 'F' };
    if (counter <= 24) return { gradeImg: `figures/PrivacyRatingG.png`, grade: 'G' };
    return 'Error';
}

function gradePolicy(boolArray) {
    let privacyPolicy = {
        grade: 'C',
        counter: 0,
        gradeImg: 'figures/PrivacyRatingC.png',
        categories: {
            collection: {
                counter: 0,
                collection_counter: 0,
                purpose_counter: 0,
                retention_counter: 0,
            },
            sharing: {
                counter: 0,
                sharing_counter: 0,
                sale_counter: 0,
                disclosure_counter: 0,
            },
            control: {
                counter: 0,
                control_counter: 0,
                rightToBeForgotten_counter: 0,
                correctness_counter: 0,
            },
            security: {
                counter: 0,
                security_counter: 0,
                anonymization_counter: 0,
                accountability_counter: 0,
            },
        },
    };

    if (boolArray[0]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.collection.counter += 2;
        privacyPolicy.categories.collection.collection_counter = 2;
    } else if (boolArray[1]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.collection.counter += 1;
        privacyPolicy.categories.collection.collection_counter = 1;
    }

    if (boolArray[2]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.collection.counter += 2;
        privacyPolicy.categories.collection.purpose_counter = 2;
    } else if (boolArray[3]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.collection.counter += 1;
        privacyPolicy.categories.collection.purpose_counter = 1;
    }

    if (!boolArray[4]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.collection.counter += 2;
        privacyPolicy.categories.collection.retention_counter = 2;
    } else if (!boolArray[5]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.collection.counter += 1;
        privacyPolicy.categories.collection.retention_counter = 1;
    }

    if (boolArray[6]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.sharing.counter += 2;
        privacyPolicy.categories.sharing.sharing_counter = 2;
    } else if (boolArray[7]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.sharing.counter += 1;
        privacyPolicy.categories.sharing.sharing_counter = 1;
    }

    if (boolArray[8]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.sharing.counter += 2;
        privacyPolicy.categories.sharing.sale_counter = 2;
    } else if (boolArray[9]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.sharing.counter += 1;
        privacyPolicy.categories.sharing.sale_counter = 1;
    }

    if (boolArray[10]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.sharing.counter += 2;
        privacyPolicy.categories.sharing.disclosure_counter = 2;
    } else if (boolArray[11]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.sharing.counter += 1;
        privacyPolicy.categories.sharing.disclosure_counter = 1;
    }

    if (!boolArray[12]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.control.counter += 2;
        privacyPolicy.categories.control.control_counter = 2;
    } else if (!boolArray[13]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.control.counter += 1;
        privacyPolicy.categories.control.control_counter = 1;
    }

    if (boolArray[14]) {
        //
    } else if (boolArray[15]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.control.counter += 1;
        privacyPolicy.categories.control.rightToBeForgotten_counter = 1;
    } else {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.control.counter += 2;
        privacyPolicy.categories.control.rightToBeForgotten_counter = 2;
    }

    if (boolArray[16]) {
        //
    } else if (boolArray[17]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.control.counter += 1;
        privacyPolicy.categories.control.correctness_counter = 1;
    } else {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.control.counter += 2;
        privacyPolicy.categories.control.correctness_counter = 2;
    }

    if (boolArray[18]) {
        //
    } else if (boolArray[19]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.security.counter += 1;
        privacyPolicy.categories.security.security_counter = 1;
    } else {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.security.counter += 2;
        privacyPolicy.categories.security.security_counter = 2;
    }

    if (boolArray[20]) {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.security.counter += 2;
        privacyPolicy.categories.security.anonymization_counter = 2;
    } else if (boolArray[21]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.security.counter += 1;
        privacyPolicy.categories.security.anonymization_counter = 1;
    }

    if (boolArray[22]) {
        //
    } else if (boolArray[23]) {
        privacyPolicy.counter += 1;
        privacyPolicy.categories.security.counter += 1;
        privacyPolicy.categories.security.accountability_counter = 1;
    } else {
        privacyPolicy.counter += 2;
        privacyPolicy.categories.security.counter += 2;
        privacyPolicy.categories.security.accountability_counter = 2;
    }

    const grade = gradeResponse(privacyPolicy.counter);

    privacyPolicy.grade = grade.grade;
    privacyPolicy.gradeImg = grade.gradeImg;

    return privacyPolicy;
}

// Generate a list of privacy policy questions and processe the response

const question = `You are only allowed to answer with yes or no. Please answer the following questions according to the above context:
  
    1. Does the website collect or store sensitive personal data from its users? 
    2. Does the website collect or store personal data from its users?
    3. Does the website automatically perform profiling based on user data?
    4. Does the website provide personalised content based on user data?
    5. Is user data deleted after a pre-determined amount of time?
    6. Is user data deleted after completion of each session?
    7. Is any personal user data shared with third-parties?
    8. Is any anonymous user data shared with third-parties?
    9: Is personal user data ever sold?'
    10: Is anonymized user data ever sold?'
    11: Is the website subject to disclosure requests from government agencies outside the jurisdiction of its users?'
    12: Does the website only disclose user data to government agencies when legally required?'
    13: Must users opt-in before data is collected?'
    14: Can users opt-out of data collection?'
    15: Can user data related to a user be completely removed upon request?'
    16: Can user data related to a user be hidden upon request?'
    17: Can users amend all data collected from them?'
    18: Can users amend any of the data collected from them?'
    19: Is the service provider certified to be compliant with the latest version of either ISO 27001 or NIST 800-53?'
    20: Was the service developed in compliance with the OWASP (Mobile) Top 10 standard and tested according to the OWASP Mobile/Web security Testing Guide or equivalent?'
    21: Is user data anonymised?'
    22: Is user data pseudonomised?'
    23: Is the service provider legally accountable for privacy violations?'
    24: Is the privacy policy legally binding?'`;

// Format the API response
function formatApiResponse(response) {
    return response.choices[0].message.content
        .replace(new RegExp(/[0-9]+.\s/g, 'g'), '')
        .replace('\n\n', '')
        .split('\n')
        .map((response) => response.includes('Yes'));
}

function splitPrivacyPolicy(policy, n = 5) {
    const privacyPolicyLength = policy.length;
    const splitSize = Math.ceil(privacyPolicyLength / n);
    const result = [];

    for (let i = 0; i < n; i++) {
        const start = i * splitSize;
        const end = start + splitSize;
        const part = policy.slice(start, end);
        result.push(part);
    }

    return result;
}

async function summarizePrivacyPolicy(policy) {
    const result = [];
    let n = 5;
    let privacyPolicy = splitPrivacyPolicy(policy, n);

    for (let i = 0; i < n; i++) {
        let systemPrompt = 'You are a helpful system to summarize privacy policies.';
        let prompt = `Privacy Poliy: ${privacyPolicy[i]}\nGuess all relevant information for the questions, and summarize them.`;
        const res = await waitForApi(systemPrompt, prompt);
        result.push(res.choices[0].message.content);
    }

    return result.join(' ');
}

function waitForApi(systemPrompt, prompt) {
    return new Promise((resolve, reject) => {
        const key = 'your-key';
        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
                'OpenAI-Organization': 'your-organization',
                'OpenAI-Project': 'your-project',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-16k',
                temperature: 0.9,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt },
                ],
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) reject(data.error);
                else resolve(data);
            });
    });
}

function fetchCategories(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((categories) => {
                resolve(categories);
            });
    });
}

function fetchPrivacyPolicies(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((privacyPolicies) => {
                resolve(privacyPolicies);
            });
    });
}

function fetchPopup(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text();
            })
            .then((popup) => {
                resolve(popup);
            });
    });
}

let connections = {};

chrome.runtime.onConnect.addListener(async (port) => {
    const tabId = port.sender.tab.id;
    const tabUrl = port.sender.tab.url;
    connections[tabId] = port;

    let popupURL = chrome.runtime.getURL('popup/popup.html');
    let privacyPoliciesURL = chrome.runtime.getURL('data/privacy-policies.json');
    let categoriesURL = chrome.runtime.getURL('data/categories.json');

    const popup = await fetchPopup(popupURL);
    let privacyPolicies = await fetchPrivacyPolicies(privacyPoliciesURL);
    const categories = await fetchCategories(categoriesURL);

    let message = {
        statusCode: 0,
        popup: popup,
        privacyPolicies: {},
        categories: categories,
    };

    port.postMessage(message);

    let keys = Object.keys(privacyPolicies);

    const foundObject = keys.find((item) => tabUrl.includes(item));
    if (foundObject) {
        message.statusCode = 1;
        message.privacyPolicies = privacyPolicies[foundObject];

        port.postMessage(message);
    } else {
        message.statusCode = 2;
        port.postMessage(message);
    }

    port.onDisconnect.addListener(() => {
        delete connections[tabId];
    });

    port.onMessage.addListener(async (messageContentScript) => {
        // console.log(messageContentScript.statusCode);
        try {
            if (messageContentScript.statusCode === 0) {
                // console.log(messageContentScript.log);
            } else if (messageContentScript.statusCode === 3) {
                const htmlDoc = await fetch(messageContentScript.href, {})
                    .then((response) => {
                        return response.text();
                    })
                    .then((htmlDoc) => {
                        return htmlDoc;
                    });

                message.statusCode = 21;
                message.privacyPolicies = htmlDoc;
                port.postMessage(message);
            } else if (messageContentScript.statusCode === 11) {
                let privacyPolicy = await summarizePrivacyPolicy(messageContentScript.privacyPolicy);

                const systemMsg =
                    "You are a law scholar who is specialized in EU GDPR privacy policies. You are only allowed to answer with 'Yes' or 'No'.";

                let response = await waitForApi(systemMsg, `${privacyPolicy} \n${question}`);

                response = formatApiResponse(response);

                let privacyPolicies = gradePolicy(response);

                message.statusCode = 22;
                message.privacyPolicies = privacyPolicies;

                port.postMessage(message);
            }
        } catch (error) {
            message.statusCode = 999;
            port.postMessage(message);
        }
    });
});
