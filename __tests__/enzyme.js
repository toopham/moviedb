import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter as Router, Link} from 'react-router-dom';


//Main components
import Footer from '../client/components/Footer';
import Header from '../client/components/Header';
import Main from '../client/components/Main';
import MainSearch from '../client/components/MainSearch';
import Modal from '../client/components/Modal';
import MovieCard from '../client/components/MovieCard';
import MovieModal from '../client/components/MovieModal';
import Nav from '../client/components/Nav';
import NavSearch from '../client/components/NavSearch';
import NavSearchBar from '../client/components/NavSearchBar';
import Popular from '../client/components/Popular';


// path /search components
import Error from '../client/components/Search/Error';
import Loading from '../client/components/Search/Loading';
import MoviePlacard from '../client/components/Search/MoviePlacard';
import Pagination from '../client/components/Search/Pagination';
import Rating from '../client/components/Search/Rating';
import Search from '../client/components/Search/Search';
import SearchFilter from '../client/components/Search/SearchFilter';
import SearchResults from '../client/components/Search/SearchResults';


configure({ adapter: new Adapter() });

describe('React unit tests for landing components', () => {

	describe('Footer component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<Footer />);
    });

    it('Renders a <div> tag with h3 and p', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('p').text()).toEqual('Disclaimer: This website is a personal project to try to replicate the design and implementation of themoviedb.org');
      expect(wrapper.find('h3').text()).toEqual('Author: Tu Pham');
    });
  });

	describe('Header component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<Router><Header /></Router>);
			wrapper = wrapper.find(Header);

    });

    it('Renders a <div> tag wrapper with header div and navbar div', () => {
      expect(wrapper.find({ className: 'header'}).type()).toEqual('div');
			expect(wrapper.find({ className: 'navbar'}).type()).toEqual('div');
    });

		it('Renders 3 children in navbar div', () => {
      expect(wrapper.find({ className: 'navbar' }).children()).toHaveLength(3);
    });

		it('Renders Link ', () => {
      expect(wrapper.find(Link)).toHaveLength(1);
    });

		it('Renders Nav ', () => {
      expect(wrapper.find(Nav)).toHaveLength(1);
    });

		it('Renders NavSearch ', () => {
      expect(wrapper.find(NavSearch)).toHaveLength(1);
    });


  });

	describe('Main component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<Main />);

    });

		it('Renders MainSearch component ', () => {
      expect(wrapper.find(MainSearch)).toHaveLength(1);
    });

		it('Renders Popular component ', () => {
      expect(wrapper.find(Popular)).toHaveLength(1);
    });

	});

	describe('MainSearch component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<Router><MainSearch /></Router>);
			wrapper = wrapper.find(MainSearch);
    });

		it('Renders MainSearch div with 4 children ', () => {
			expect(wrapper.find({ className: 'mainSearch'})).toHaveLength(1);
			expect(wrapper.find({ className: 'mainSearch'}).children()).toHaveLength(3);
    });


	});


});



describe('React unit tests for Search components', () => {
  describe('Error component', () => {
    let wrapper;
    const props = {
      error: '404 Error',
    };

    beforeAll(() => {
      wrapper = shallow(<Error {...props} />);
    });

    it('Renders a <div> tag with h3 and p', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('h3').text()).toEqual('Cannot connect to server API');
      expect(wrapper.find('h4').text()).toEqual('Please try again later.');
    });
  });

});