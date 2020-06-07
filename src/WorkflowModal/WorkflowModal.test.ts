import React from 'react';
import { shallow } from 'enzyme';
import WorkflowModal from './WorkflowModal';

describe('<WorkflowModal />', () => {
  test('renders', () => {
    const wrapper = shallow(<WorkflowModal />);
    expect(wrapper).toMatchSnapshot();
  });
});
