import React from 'react';

import preload from '../modules/preload';


export default class Image extends React.Component {
	constructor(props) {	
		super(props);

		this.state = {
			data: this.props.data,
			background: null,
			loaded: false
		}
	}

	componentWillMount = () => {

		preload(
			this.state.data.small,
			() => this.setState({ background: this.state.data.small })
		);

	}

	render() {
		return (
			<div
				key={this.props.index}
				className={'gallery__item' + (this.state.background ? ' loaded' : '')}
				style={{
					backgroundImage: (this.state.background ? `url(${this.state.background})` : null),
					gridArea: this.props.grid,
					color: this.state.data.hover
				}}
				tabIndex={0}
			/>
		)
	}
}