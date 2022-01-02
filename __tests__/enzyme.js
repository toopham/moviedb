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

		it('Renders mainSearch div with 4 children ', () => {
			expect(wrapper.find({ className: 'mainSearch'})).toHaveLength(1);
			expect(wrapper.find({ className: 'mainSearch'}).children()).toHaveLength(3);
    });

		it('Renders h1 and h2 ', () => {
			expect(wrapper.find('h1')).toHaveLength(1);
			expect(wrapper.find('h2')).toHaveLength(1);
			expect(wrapper.find('h1').text()).toEqual('Welcome.');
			expect(wrapper.find('h2').text()).toEqual('This is a replica of themoviedb.org');
		});

		it('Renders mainSearchBar with input ', () => {
			expect(wrapper.find({id: 'mainSearchBar'})).toHaveLength(1);
			expect(wrapper.find({id: 'mainSearchBar'}).children()).toHaveLength(2);
			expect(wrapper.find({id: 'mainSearchBar'}).type()).toEqual('div');
			expect(wrapper.find({id: 'mainSearchBarInput'}).type()).toEqual('input');
		});	

		it('Renders searchButton', () => {
			expect(wrapper.find({id: 'searchButton'})).toHaveLength(1);
			expect(wrapper.find({id: 'searchButton'}).type()).toEqual('button');
		});

	});

  describe('Modal component', () => {
    describe('default Modal component when props is set false', () => {
      let wrapper;
      let props = {
        modal: [false, {}],
        setModal: jest.fn(() => 'set Modal'),
      };

      beforeAll(() => {
        wrapper = shallow(<Modal {...props} />);
      });

      it('Renders nothing when props is set to false.', () => {
        expect(wrapper.type()).toEqual(null);;
      });

    });

    describe('Modal component when props is set true', () => {
      let wrapper;
      let props = {
        modal: [true, {}],
        setModal: jest.fn(() => 'set Modal'),
      };

      beforeAll(() => {
        wrapper = shallow(<Modal {...props} />);
      });


      it('Renders modal with className modal when props is set to true.', () => {
        expect(wrapper.type()).toEqual('div');;
        expect(wrapper.find({className: 'modal'})).toHaveLength(1);
        expect(wrapper.props().onClick()).toEqual('set Modal');
      });

      it('Renders modal-inner with 1 child', ()=> {
        expect(wrapper.find({className: 'modal-inner'})).toHaveLength(1);
        expect(wrapper.find({className: 'modal-inner'}).children()).toHaveLength(1);
      });

      it('Renders MovieModal ', ()=>{
        expect(wrapper.find(MovieModal)).toHaveLength(1);
      });

    });
  });

  describe('MovieModal component', () => {
    describe('MovieModal component when there is no backdrop image', () => {
      let wrapper;
      let props = {
          movie: {title: 'Movie Title', 
          original_title: 'Original Title', 
          release_date: '01-01-2022', 
          original_language: 'English', 
          overview: 'Overview of movie',
          backdrop_path: null,
        },
      };

      beforeAll(() => {
        wrapper = shallow(<MovieModal {...props} />);
      });

      it('Renders wrapper with className movie-modal.', () => {
        expect(wrapper.type()).toEqual('div');;
        expect(wrapper.find({className: 'movie-modal'})).toHaveLength(1);
      });

      it('Renders img div movie-modal-img with black background.', () => {
        expect(wrapper.find({className: 'movie-modal-img'}).type()).toEqual('div');
        expect(wrapper.find({className: 'movie-modal-img'}).props().style).toHaveProperty('background', 'black');
      });

      it('Renders div movie-modal-detail.', () => {
        expect(wrapper.find({className: 'movie-modal-detail'}).type()).toEqual('div');
      });

      it('Renders information of movie from props', () => {
        expect(wrapper.find({className: 'movie-modal-detail'}).children()).toHaveLength(5);
        expect(wrapper.find('h3').text()).toEqual('Title: '+props.movie.title);
      });

    });

    describe('MovieModal component when there is a backdrop image', () => {
      let wrapper;
      let props = {
          movie: {title: 'Movie Title', 
          original_title: 'Original Title', 
          release_date: '01-01-2022', 
          original_language: 'English', 
          overview: 'Overview of movie',
          backdrop_path: '/path_to_img',
        },
      };

      beforeAll(() => {
        wrapper = shallow(<MovieModal {...props} />);
      });

      it('Renders wrapper with className movie-modal.', () => {
        expect(wrapper.type()).toEqual('div');;
        expect(wrapper.find({className: 'movie-modal'})).toHaveLength(1);
      });

      it('Renders img div movie-modal-img with black background.', () => {
        expect(wrapper.find({className: 'movie-modal-img'}).type()).toEqual('div');
        expect(wrapper.find({className: 'movie-modal-img'}).props().style).toHaveProperty('backgroundImage', `url("https://www.themoviedb.org/t/p/w220_and_h330_face${props.movie.backdrop_path}")`);
      });

      it('Renders div movie-modal-detail.', () => {
        expect(wrapper.find({className: 'movie-modal-detail'}).type()).toEqual('div');
      });

      it('Renders information of movie from props', () => {
        expect(wrapper.find({className: 'movie-modal-detail'}).children()).toHaveLength(5);
        expect(wrapper.find('h3').text()).toEqual('Title: '+props.movie.title);
      });
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