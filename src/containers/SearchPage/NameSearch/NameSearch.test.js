import { shallow } from 'enzyme';
import React from 'react';
import { findByAttr } from '../../../testUtils/testUtils';
import NameSearch from './NameSearch';
import moxios from 'moxios';
import axios from '../../../axiosCocktail'



const setup = () => {
    const wrapper = shallow(<NameSearch />)
    return wrapper
}


describe('NameSearch', () => {
    test('renders without error', () => {
        const wrapper = setup()
        expect(findByAttr(wrapper, 'component-name-search').length).toBe(1)
    })
    test('adds drinkNameInput to component state onChange of input', () => {
        const wrapper = setup()
        findByAttr(wrapper, 'drink-name-input').simulate('change', { preventDefault: () => {}, target: {value: 'manhattan'}})
        expect(wrapper.state().drinkNameInput).toBe('manhattan')
    })

    describe('mocking axios call', () => {
        let wrapper;
        const expectedResponse = {
          drinks: [
            {
              strDrink: "'57 Chevy with a White License Plate",
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
              idDrink: '14029',
            },
          ],
        };

        beforeEach(() => {
          wrapper = setup()
          moxios.install(axios);
        });

        afterEach(() => {
          moxios.uninstall();
        });

        test('fetched drinks data is added to state on submit', (done) => {
          wrapper.setState({drinkNameInput: 'manhattan'})
          findByAttr(wrapper, 'submit-button').simulate('click', {preventDefault: () => {}});

          moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: expectedResponse
            }).then(() => {
              expect(wrapper.state().drinks).toEqual(expectedResponse.drinks);
              done();
            })
          });
        });
    });

})
