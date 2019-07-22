import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header'; // [L163]


test('Should render Header correctly', () => {
    
    // [L163] - adding startLogout
    const wrapper = shallow(<Header startLogout={() => {}}/>);                         
    expect(wrapper).toMatchSnapshot();       
    
//    expect(wrapper.find('h1').text()).toBe('Expensify');    
//    const renderer = new ReactShallowRenderer();
//    renderer.render(<Header />);//    
//    expect(renderer.getRenderOutput()).toMatchSnapshot();

});

// [L163]
// Test case requires spies  jest.fn()
test('Should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});