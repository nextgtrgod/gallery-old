import React from 'react';


export default function Image(props) {

	let data = props.data;

	return (
		<div
			key={props.index}
			className='gallery__item'
			style={{
				backgroundImage: `url('${data.small}')`,
				gridArea: `${data.grid}`,
				color: `${data.hover}`
			}}
		/>
	)
}