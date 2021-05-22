# Lab8_Starter
## Name: Abhishek Vasudevan
## PID: A15825162
## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

Within a Github action that runs whenever code is pushed. I would choose this option to make sure that all code that is pushed is tested and is correct. If we push more code later, then we can check all tests to make sure that new code did not change the outcomes from previous code.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, a unit tests do not allow for interactions between different components. In this example, allowing a user to write and send a message requires inputting information AND sending a message. This means that we would need to click on buttons which would require multiple components interacting with each other.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes, this would require testing a particular function after inputting a string parameter. Using expect and relevant matchers, we can easily figure out whether the length of the message is less than 80 because this does not require multiple moving parts.

1. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?


If we run our puppeteer tests with the field 'headless' to be true, then I expect that the test will run without showing the browser UI.

2. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

beforeAll(async () => {     
    await page.goto('http://127.0.0.1:5500');    
    const [response] = await Promise.all([   
      page.waitForNavigation(500),     
      page.click('header > img'),     
    ]);
