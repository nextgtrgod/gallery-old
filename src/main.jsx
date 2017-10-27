import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import main from './styles/main.styl';

import makeRequest from './modules/makeRequest';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			onLoading: true
		};
	}

	async getData() {
		try {
			let res = await makeRequest('GET', '/api/getData');

			if (res.status === 'success') {
				this.setState({ data: res.data.images });
			} else {
				console.log(res.message);
			}

		} catch (error) {
			console.log(error);
		};
	}

	componentWillMount() {
		this.getData();
	}

	render() {
		return (
			<Router>
				<Switch>

					{this.state.data ?
						<Route
							path='/:page?'
							render={props => {
									return (
										<Gallery data={this.state.data} {...props} />
									)
								}
							}
						/>
						: null
					}
	
				</Switch>
			</Router>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('root'));









// import imagesLoaded from 'imagesloaded';


// document.addEventListener('DOMContentLoaded', () => {

// 	const galleryItems = document.getElementsByClassName('gallery__item');


// 	[...galleryItems].map(item => {
// 		imagesLoaded(
// 			item,
// 			{ background: true },
// 			() => {
// 				item.classList.add('loaded');
// 			});
// 	});

// });