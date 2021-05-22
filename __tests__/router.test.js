/**
 * @jest-environment jsdom
 */
import { expect, test } from '@jest/globals';
import { Console } from 'console';
//import { describe } from 'yargs';
import { pushToHistory } from '../scripts/router.js';

describe('Length tester', () => {
    test('Length of history is 2 after including entry 5', () =>{
        expect(pushToHistory('entry', 5).length).toBe(2);
    });
    test('Length of history is 3 after including home', () =>{
        expect(pushToHistory('home', 5).length).toBe(3);
    });
    test('Length of history is 4 after including settings', () =>{
        expect(pushToHistory('settings', 0).length).toBe(4);
    });
   
});


