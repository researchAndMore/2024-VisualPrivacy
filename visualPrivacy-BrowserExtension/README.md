
# Visual Privacy Browser Extension

This is a Chrome Extension that searches for links with 'privacy' in the path. If a link is found, it automatically evaluates the content of this page. If no link is found, the user is asked to provide the link with the privacy policy content of this webiste. The page content is sent to the OpenAI GPT API, which answers 24 yes/no questions about the privacy policy from which a score from A to G is calculated and displayed.

The content-script and the service-worker communicate through chrome.runtime statusCodes

## Service worker

Status code:

0 -> init service worker -> 1: Website is known and already has an assigned rating, 2: Did not find privacy policy in the lookup table

3 -> fetch privacy content from url -> 21

11 -> get privacy rating with GPT -> 22

## Content script

Status code:
0 -> init popup

1 -> changing content based on the already known privacy information of the website

2 -> looking for privacy policy page in html links -> 3

21 -> parse privacy policy html -> 11, 999

22 -> change popup content based on privacy rating, 999

999 -> Error

