# Visual Privacy
This repository contains the code to run *Visual Privacy* a browser extension that automatically computes a privacy rating and visualizes a privacy label based on a website's privacy policy. 
*Visual Privacy* utilizes the Privacy Rating questionnaire proposed by Barth et al., 2021. This questionnaire consists of 24 questions that should be responded by the legal team of a company or by a web developer. According to the responses, a numerical rating is generated, which 
is then converted to a letter (A-G), where A is the best possible rating and G is the worst. The *Visual Privacy* tool aims to automate this step by evaluating the privacy policy of a website utilizing an LLM. 

To verify the impact of our tool, we conducted an online experiment in which we asked participants to 
navigate a news website that show them a privacy label. Thus, this repository contains both the source code of the *Visual Privacy* broswer extension, and the source code of the website we used for our experiments.






(Barth et al., 2021) Barth, Susanne, Dan Ionita, Menno DT De Jong, Pieter H. Hartel, and Marianne Junger. "Privacy rating: A user-centered approach for visualizing data handling practices of online services." IEEE transactions on professional communication 64, no. 4 (2021): 354-373. [https://ieeexplore.ieee.org/document/9612118]
