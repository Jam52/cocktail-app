import React from 'react';
import { shallow } from 'enzyme';
import { findByAttr } from '../../testUtils/testUtils';
import { storeFactory } from '../../testUtils/testUtils';

import RandomPage from './RandomPage'
import { UnconnectedRandomPage } from './RandomPage'

const initialState = {}

const setup = (state = initialState) => {
    const store = storeFactory(state)
    const wrapper = shallow(<RandomPage store={store}/>).dive().dive()
    return wrapper;
}

describe('RandomPage', () => {
    test('renders w/ error', () => {
        const wrapper = setup()
        expect(findByAttr(wrapper, 'component-random-page').length).toBe(1)
    })
    test('has access to randomDrinks list in redux state', () => {
        const wrapper = setup()
        expect(wrapper.instance().props.randomDrinks.drinks).toEqual([]);
    })
    test('calls addRandomDrinks on mount', () => {
        const mockAddRandomDrinks = jest.fn();
        const wrapper = shallow(<UnconnectedRandomPage addRandomDrinks={mockAddRandomDrinks} randomDrinks={{drinks:[]}}/>)
        const mockCalls = mockAddRandomDrinks.mock.calls.length;
        expect(mockCalls).toBe(1)
    })
})