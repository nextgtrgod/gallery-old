import React from 'react';

import Image from './Image';
import Link from './Link';
import NotFound from './NotFound';
import Slideshow from './Slideshow'; 


export default function Gallery({ match, data }) {

	const currentPage = +(match.params.page || 1);
	console.log(currentPage === currentPage);
	const count = 12;
	const chunkLength = count * (currentPage - 1);

	if ((currentPage < 0) || (currentPage !== currentPage) || (currentPage * count) - data.length >= 12) {
		return (
			<NotFound key='page-not-found' data={data} />
		);
	};

	const content = data.slice(chunkLength, chunkLength + 12);

	// let linkPrev = (currentPage > 1) ? (currentPage - 1) : 1;
	// let linkNext = (currentPage );


	return (
		<div className='gallery'>
			<Link direction='prev' to='/1'/>

			{content.map((item, index) => 
				<Image key={index} data={item}/>
			)}

			<Link direction='next' to='/2' />
		</div>
	)
}