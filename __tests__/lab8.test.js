const { beforeAll } = require("@jest/globals");
const { data } = require("browserslist");

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const [response] = await Promise.all([
      page.waitForNavigation(500),
      page.click('journal-entry'),
    ]);
    let url = page.url();
    const hash = '/#entry1';
      expect(url).toMatch(hash);
  }, 10000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    
    const title = await page.$('header > h1');
    const title_value = await title.getProperty('innerHTML');
    const plainValue = await title_value.jsonValue();
    expect(plainValue).toBe('Entry 1');
  
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    
     //implement test5: Clicking on the first journal entry should contain the following contents: 
        //{ 
         // title: 'You like jazz?',
         // date: '4/25/2021',
          //content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
         // image: {
         //   src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
         //   alt: 'bee with sunglasses'
         // }
       // }
      
        let allArePopulated = true;
        let data, plainValue;
        const entry = await page.$('entry-page');
        data = await entry.getProperty('innerHTML');
        plainValue = await data.jsonValue();
          if (plainValue.title == 'You like jazz?') { allArePopulated = false; }
          if (plainValue.date == '4/25/2021') { allArePopulated = false; }
          if (plainValue.content == "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") { allArePopulated = false; }
          if (plainValue.src== 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455'){ allArePopulated = false; }
          if (plainValue.alt == 'bee with sunglasses'){ allArePopulated = false; }
        expect(allArePopulated).toBe(true);

  }, 30000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyAttribute = await page.$('body');
    let body_data = await bodyAttribute.getProperty('className');
    let body_data_value = await body_data.jsonValue();
    expect(body_data_value).toBe('single-entry');

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const [response] = await Promise.all([
      page.waitForNavigation(500),
      page.click('header > img'),
    ]);
    let url = page.url();
    const hash = '/#settings';
      expect(url).toMatch(hash);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.$('header > h1');
    const title_value = await title.getProperty('innerHTML');
    const plainValue = await title_value.jsonValue();
    expect(plainValue).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyAttribute = await page.$('body');
    let body_data = await bodyAttribute.getProperty('className');
    let body_data_value = await body_data.jsonValue();
    expect(body_data_value).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    const [response] = await Promise.all([
      page.waitForNavigation(500),
      page.goBack(),
    ]);
    let url = page.url();
    const hash = '/#entry1';
      expect(url).toMatch(hash);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, user is back to the home page', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    const [response] = await Promise.all([
      page.waitForNavigation(500),
      page.goBack(),
    ]);
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On home page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.$('header > h1');
    const title_value = await title.getProperty('innerHTML');
    const plainValue = await title_value.jsonValue();
    expect(plainValue).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On home page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyAttribute = await page.$('body');
    let body_data = await bodyAttribute.getProperty('className');
    let body_data_value = await body_data.jsonValue();
    expect(body_data_value).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    const [response] = await Promise.all([
      page.waitForNavigation(1000),
      page.evaluate(() => {document.querySelectorAll('journal-entry')[1].click()})
    ]);

    let url = page.url();
    const hash = '/#entry2';
    //expect(plainValue).toBe('test');
      expect(url).toMatch(hash);
  }, 10000);


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On second Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    
    const title = await page.$('header > h1');
    const title_value = await title.getProperty('innerHTML');
    const plainValue = await title_value.jsonValue();
    expect(plainValue).toBe('Entry 2');
  
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second entry page - checking <entry-page> contents', async () => {
    
    //implement test16: Clicking on the first journal entry should contain the following contents: 
     
       let allArePopulated = true;
       let data, plainValue;
       const entry = await page.$('entry-page');
       data = await entry.getProperty('innerHTML');
       plainValue = await data.jsonValue();
         if (plainValue.title == 'Run, Forrest! Run!') { allArePopulated = false; }
         if (plainValue.date == '4/26/2021') { allArePopulated = false; }
         if (plainValue.content == "Mama always said life was like a box of chocolates. You never know what you're gonna get.") { allArePopulated = false; }
         if (plainValue.src== 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg'){ allArePopulated = false; }
         if (plainValue.alt == 'forrest running'){ allArePopulated = false; }
       expect(allArePopulated).toBe(true);

 }, 30000);

  // create your own test 17
  // define and implement test17: Clicking the back button once should bring the user back to the home page
  it('Test17: Clicking the back button, user is back to the home page', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    const [response] = await Promise.all([
      page.waitForNavigation(500),
      page.goBack(),
    ]);
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });
  // create your own test 18
  // define and implement test17: Clicking on entry 10 -> check if URL changes appropriately
  it('Test18: Clicking second <journal-entry>, new URL should contain /#entry10 and header title should be Entry 10', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
     //const title = await page.$$('journal-entry[id="2"]');
     //const title_value = await title[1].getProperty('innerHTML');
    //const plainValue = await title_value.jsonValue();
    const [response] = await Promise.all([
      page.waitForNavigation(1000),
      page.evaluate(() => {document.querySelectorAll('journal-entry')[9].click()})
    ]);

    let url = page.url();
    const hash = '/#entry10';
    //expect(plainValue).toBe('test');
      expect(url).toMatch(hash);
    const title = await page.$('header > h1');
    const title_value = await title.getProperty('innerHTML');
    const plainValue = await title_value.jsonValue();
    expect(plainValue).toBe('Entry 10');
  }, 10000);

  // create your own test 19
// define and implement test19: Verify the entry page contents is correct when clicking on the second entry
it('Test19: On 10th entry page - checking <entry-page> contents', async () => {
    
   
     let allArePopulated = true;
     let data, plainValue;
     const entry = await page.$('entry-page');
     data = await entry.getProperty('innerHTML');
     plainValue = await data.jsonValue();
       if (plainValue.title == 'No, I am your father') { allArePopulated = false; }
       if (plainValue.date == '5/4/2021') { allArePopulated = false; }
       if (plainValue.content == "A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....") { allArePopulated = false; }
       if (plainValue.src== 'https://starwarsblog.starwars.com/wp-content/uploads/2021/04/star-wars-may-the-4th-2021-TALL-3973202.jpg'){ allArePopulated = false; }
       if (plainValue.alt == 'may the fourth be with you'){ allArePopulated = false; }
       if (plainValue.audio == 'https://drive.google.com/uc?export=download&amp;id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT'){ allArePopulated = false;}
     expect(allArePopulated).toBe(true);

}, 30000);
  // create your own test 20
  it('Test20: Clicking on Entry 10, user is back to the home page', async() => {
    // implement test10: Clicking on header title should bring us back to home page
    const [response] = await Promise.all([
      page.waitForNavigation(500),
      page.click('header > h1'),
    ]);
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  }, 10000);
});
