import React from 'react';
import classNames from 'classnames';


import preload from '../modules/preload';


export default class Image extends React.Component {
	constructor(props) {	
		super(props);

		this.state = {
			data: this.props.data,
			background: null
		};
	}

	componentWillMount = () => {

		preload(
			this.state.data.small,
			() => this.setState({ background: this.state.data.small })
		);

		console.log('Lock \'n Load');
	}

	componentWillUnmount = () => {
		console.log('I should go');
	}

	render() {
		let cls = classNames({
			'gallery__item': true,
			'loaded': this.state.background
		});

		return (
			<div
				className={cls}
				style={{
					color: this.state.data.hover,
					gridArea: this.props.grid
				}}
				tabIndex={0}>
				<div
					className='image'
					style={{
						backgroundImage: (this.state.background ? `url(${this.state.background})` : null)
					}}>
				</div>
				<div className='revealer'></div>	
			</div>
		)
	}
}