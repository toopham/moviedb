import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import {setDate} from '../client/constants/date';

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


    describe('Nav component', () => {
      let wrapper;
  
      beforeAll(() => {
        wrapper = shallow(<Nav />);
      });
  
      it('Renders a <nav> wrapper with one child ul', () => {
        expect(wrapper.type()).toEqual('nav');
        expect(wrapper.children()).toHaveLength(1);
      });

      it('Renders a <ul> with 4 li', () => {
        expect(wrapper.find('ul').children()).toHaveLength(4);
      });
    });

    describe('NavSearch component', () => {
      let wrapper;
  
      beforeAll(() => {
        wrapper = shallow(<NavSearch />);
      });
  
      it('Renders a <div> wrapper with one child div', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(1);
      });

    });

    describe('NavSearchBar component', () => {
      let wrapper;
  
      beforeAll(() => {
        wrapper = mount(<Router><NavSearchBar /></Router>);
        wrapper = wrapper.find(NavSearchBar);
      });
  
      it('Renders a <div> wrapper with 3 children elements', () => {
        expect(wrapper.find({className: 'nav-search-bar'}).type()).toEqual('div');
        expect(wrapper.find({className: 'nav-search-bar'}).children()).toHaveLength(3);
      });

      it('Renders a input navSearchBarInput', () => {
        expect(wrapper.find({id: 'navSearchBarInput'})).toHaveLength(1);
      });

    });

    describe('NavSearchBar component', () => {
      let wrapper;
  
      beforeAll(() => {
        wrapper = shallow(<Popular />);
      });
  
      it('Renders a <div> wrapper with className popular-wrapper', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(2);
      });

      it('Renders a div with className popular', () => {
        expect(wrapper.find({className: 'popular'})).toHaveLength(1);
      });

      it('Renders a div with className sort-options', () => {
        expect(wrapper.find({className: 'sort-options'})).toHaveLength(1);
      });

      it('Renders Modal component', () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
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


  describe('Loading component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<Loading />);
    });

    it('Renders a <div> tag with 3 children', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.children()).toHaveLength(3);
    });

    it('Renders h3 and h4', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('h3').text()).toEqual('Searching & Loading Results');
      expect(wrapper.find('h4').text()).toEqual('Please be patient.');
    });

    it('Renders img', () => {
      expect(wrapper.find('img')).toHaveLength(1);
    });
  });

  describe('MoviePlacard component', () => {
    describe('MoviePlacard component with no poster_path', () => {
      let wrapper;
      const props = {
        setModal: jest.fn(() => 'set Modal'),
        movie: {
          title: 'Dragon', 
          release_date: '01-01-2022',
          overview: 'Overview of Movie',
          vote_average: 7.9,
          poster_path: null, }
      };

      beforeAll(() => {
        wrapper = shallow(<MoviePlacard {...props}/>);
      });

      it('Renders a <div> wrapper tag with onClick', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(3);
        expect(wrapper.props().onClick()).toEqual('set Modal');
      });

      it('Renders a <div> className movie-placard-detail', () => {
        expect(wrapper.find({className: 'movie-placard-detail'})).toHaveLength(1);
        expect(wrapper.find({className: 'movie-placard-detail'}).children()).toHaveLength(3);
      });

      it('Renders a <div> className movie-placard-img', () => {
        expect(wrapper.find({className: 'movie-placard-img'})).toHaveLength(1);
        expect(wrapper.find({className: 'movie-placard-img'}).props().style).toHaveProperty('background', 'black');
      });

      it('Renders a Rating component', () => {
        expect(wrapper.find(Rating)).toHaveLength(1);
        expect(wrapper.find(Rating).props().rate).toEqual(79);
      });

    });

    describe('MoviePlacard component with poster_path', () => {
      let wrapper;
      const props = {
        setModal: jest.fn(() => 'set Modal'),
        movie: {
          title: 'Dragon', 
          release_date: '01-01-2022',
          overview: 'Overview of Movie',
          vote_average: 9.9,
          poster_path: '/path/to/poster', }
      };

      beforeAll(() => {
        wrapper = shallow(<MoviePlacard {...props}/>);
      });

      it('Renders a <div> wrapper tag with onClick', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(3);
        expect(wrapper.props().onClick()).toEqual('set Modal');
      });

      it('Renders a <div> className movie-placard-detail', () => {
        expect(wrapper.find({className: 'movie-placard-detail'})).toHaveLength(1);
        expect(wrapper.find({className: 'movie-placard-detail'}).children()).toHaveLength(3);
      });

      it('Renders a <div> className movie-placard-img', () => {
        expect(wrapper.find({className: 'movie-placard-img'})).toHaveLength(1);
        expect(wrapper.find({className: 'movie-placard-img'}).props().style).toHaveProperty('backgroundImage', `url(\"https://image.tmdb.org/t/p/w94_and_h141_bestv2${props.movie.poster_path}")`);
      });

      it('Renders a Rating component', () => {
        expect(wrapper.find(Rating)).toHaveLength(1);
        expect(wrapper.find(Rating).props().rate).toEqual(99);
      });

    });
  });

  describe('Pagination component', () => {
    let wrapper;
    const props = {
      page: 2,
      totalPages: 5,
      query: 'Dragon',
      searchParams: {get: (param) => param}, 
    };

    beforeAll(() => {
      wrapper = shallow(<Pagination {...props}/>);
    });

    it('Renders a <div> wrapper tag', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.children()).toHaveLength(1);
    });

    it('Renders a 99 pages with 1 active', () => {
      expect(wrapper.find({className: 'page-button'})).toHaveLength(6);
      expect(wrapper.find({className: 'page-button-active'})).toHaveLength(1);
      expect(wrapper.find({className: 'page-button-active'}).text()).toEqual('2');
    });
  });

  describe('Rating component', () => {
    let wrapper;
    const props = {
      rate: 99
    };

    beforeAll(() => {
      wrapper = shallow(<Rating {...props}/>);
    });

    it('Renders a <div> wrapper tag', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.text()).toMatch('Rating: 99%');
    });

    it('Renders a PieChart', () => {
      expect(wrapper.find(PieChart)).toHaveLength(1);
    });
  });

  describe('Search component', () => {
    let wrapper;
    const props = {
      query: 'Dragon',
      searchParams: {get: (param) => param}, 
    };

    beforeAll(() => {
      wrapper = mount(<Router><Search {...props}/></Router>);
      wrapper = wrapper.find(Search);
    });

    it('Renders SearchFilter and SearchResults and Modal components', () => {
      expect(wrapper.find(SearchFilter)).toHaveLength(1);
      expect(wrapper.find(SearchResults)).toHaveLength(1);
      expect(wrapper.find(Modal)).toHaveLength(1);
    });

  });

  describe('SearchFilter component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<SearchFilter />);
    });

    it('Renders div wrapper', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.children()).toHaveLength(2);
    });


    it('Renders search-filter-header and search-filter-categories', () => {
      expect(wrapper.find({className: 'search-filter-header'})).toHaveLength(1);
      expect(wrapper.find({className: 'search-filter-categories'})).toHaveLength(1);
    });

  });

  describe('SearchResults component', () => {
    describe('SearchResults component with 2 results', () => {
      let wrapper;
      const props = {
        page: 2,
        setModal: jest.fn(() => 'set Modal'),
        setPage: jest.fn(() => 'set Page'),
        query: 'Dragon',
        searchParams: {get: (param) => param}, 
        results: {
          movies: {
            results: [
              {id: '12345',},
              {id: '67890',},
            ],
            total_results: 2,
          },
        },
      }

      beforeAll(() => {
        wrapper = shallow(<SearchResults {...props} />);
      });

      it('Renders div wrapper', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(3);
      });

      it('Renders MoviePlacards', () => {
        expect(wrapper.find(MoviePlacard)).toHaveLength(2);
      });

      it('Does not render Loading component and no-results ', () => {
        expect(wrapper.find({className: 'no-results'})).toHaveLength(0);
        expect(wrapper.find(Loading)).toHaveLength(0);
      });

      it('Renders Pagination', () => {
        expect(wrapper.find(Pagination)).toHaveLength(1);
      });


    });

    describe('SearchResults component with no results', () => {
      let wrapper;
      const props = {
        page: 2,
        setModal: jest.fn(() => 'set Modal'),
        setPage: jest.fn(() => 'set Page'),
        query: 'Dragon',
        searchParams: {get: (param) => param}, 
        results: {
          movies: {
            results: [
            ],
            total_results: 0,
          },
        },
      }

      beforeAll(() => {
        wrapper = shallow(<SearchResults {...props} />);
      });

      it('Renders div wrapper', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(2);
      });

      it('Renders no-results div ', () => {
        expect(wrapper.find({className: 'no-results'})).toHaveLength(1);
        expect(wrapper.find(Loading)).toHaveLength(0);
      });

      it('Renders Pagination', () => {
        expect(wrapper.find(Pagination)).toHaveLength(1);
      });


    });

    describe('SearchResults component while Loading results from API', () => {
      let wrapper;
      const props = {
        page: 2,
        setModal: jest.fn(() => 'set Modal'),
        setPage: jest.fn(() => 'set Page'),
        query: 'Dragon',
        searchParams: {get: (param) => param}, 
        results: {
          movies: {
            results: [
            ],
            total_results: -1,
          },
        },
      }

      beforeAll(() => {
        wrapper = shallow(<SearchResults {...props} />);
      });

      it('Renders div wrapper', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.children()).toHaveLength(2);
      });

      it('Renders Loading component ', () => {
        expect(wrapper.find({className: 'no-results'})).toHaveLength(0);
        expect(wrapper.find(Loading)).toHaveLength(1);
      });

      it('Renders Pagination', () => {
        expect(wrapper.find(Pagination)).toHaveLength(1);
      });


    });

  });

});