import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const puppeteer = require('puppeteer');
import { addNew, deleteNew } from './actions';
import reducer from './reducers';
import { Balance } from '../components/Balance';
import { getHists } from "./selectors";

const sum = (a, b) => a + b;

test('add 1 and 2 equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})

const new_input = {
  id: 1,
  amount: 132.22,
  text: 'tax return'
};

describe('add_new', () => {
  it('should add a new income record', () => {
    const expectedAction_add = {
      type: 'ADD_NEW',
      playload:{
        id: new_input.id,
        text: new_input.text,
        amount: new_input.amount
      }
    };
    expect(addNew(new_input.text, new_input.amount)).toEqual(expectedAction_add);
  });
});

describe('delete_new', () => {
  it('should delete the record', () => {
    const expectedAction_del = {
      type: 'DELET_NEW',
      playload:{
        id: new_input.id
      }
    };
    expect(deleteNew(new_input.id)).toEqual(expectedAction_del);
  });
});

describe('new history reducer',() => {
  it('should return inital state', () => {
    expect(reducer(undefined, {})).toEqual({
      'newHistory':
        {
          allIds: [],
          byIds: {}
        }
    });
  });

  it('should return new record', () => {
    expect(
      reducer([],{
        type: 'ADD_NEW',
        playload: {
          id: new_input.id,
          text: new_input.text,
          amount: new_input.amount
        }
      })
    ).toEqual({
      'newHistory':
        {
          allIds: [...[new_input.id]],
          byIds: {
            [new_input.id]: {
              text: new_input.text,
              amount: new_input.amount
            }
          }
        }
    });
  });

  it('should delete the record', () => {
    expect(
      reducer({
        'newHistory':
          {
            allIds: [...[new_input.id]],
            byIds: {
              [new_input.id]: {
                text: new_input.text,
                amount: new_input.amount
              }
            }
          }
      }, {
        type: 'DELET_NEW',
        playload:{
          id: new_input.id
        }
      })
    ).toEqual({
      'newHistory':
        {
          allIds: [],
          byIds: {}
        }
    });
  });

});

const store_data = {
    'newHistory':
      {
        allIds: [1],
        byIds: {
          1: {
            amount: 132.22,
            text: 'tax return'
          }
        }
      }
  };

describe('getHists selectors', () => {
  it('should find history', () => {
    expect(getHists(store_data)).toStrictEqual(
      [{
        amount: 132.22,
        id: 1,
        text: "tax return"
      }]
    );
  });
});

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    newhist : getHists(store_data)
  };
  const enzymeWarpper = shallow(<Balance {...props}/>);
  return {
    props,
    enzymeWarpper
  }
}

describe('components', () => {
  describe('calculate balance', () => {
    it('should render balance part and subcomponents', () => {
      const { enzymeWarpper } = setup();

      expect(enzymeWarpper.find('h1').hasClass('no-margin')).toBe(true);

      expect(enzymeWarpper.find('p')).toHaveLength(2);

      expect(enzymeWarpper.containsMatchingElement(
        <h4>
          YOUR BALANCE
        </h4>
      )).toBeTruthy();

      expect(enzymeWarpper.containsMatchingElement(
        <p>
          {'$ 132.22'}
        </p>
      )).toBeTruthy();

    });
  });
});

describe('puppeteer testing', () => {
  test('should add input and submit', async() => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.click('input#text');
    await page.type('input#text', 'tax return');
    await page.click('input#amount');
    await page.type('input#amount', '132.22');
    await page.click('#submit_btn');

    await page.click('input#text');
    await page.type('input#text', 'tax return');
    await page.click('input#amount');
    await page.type('input#amount', '132.22');
    await page.click('#submit_btn');

    await page.click('input#text');
    await page.type('input#text', 'tax return');
    await page.click('input#amount');
    await page.type('input#amount', '132.22');
    await page.click('#submit_btn');

    const finalTest = await page.$eval('.income_value', e => e.textContent);
    expect(finalTest).toBe('$ 396.66');
    
  
    await browser.close();
  }, 100000);
});
