import React from 'react';

import Image from './Image';
import Link from './Link';
import NotFound from './NotFound';
import Slideshow from './Slideshow';

import { layoutConfig } from './layoutConfig';



export default function Gallery({ match, data }) {

	const currentPage = +(match.params.page || 1);
	const count = 12;

	// 404
	if ((currentPage < 1) || (currentPage !== currentPage) || (currentPage * count) - data.length >= 12) {
		return (
			<NotFound key='page-not-found' data={data} />
		);
	};

	const pagesCount = Math.ceil(data.length / 12);

	const chunkStart = count * (currentPage - 1);

	const content = data.slice(chunkStart, chunkStart + count);

	let linkPrev = (currentPage - 1) || pagesCount;
	let linkNext = ((currentPage + 1) % (pagesCount + 1)) || 1;

	const layout = layoutConfig.full[(currentPage - 1) % 3];


	return (
		<div className='gallery'>
			<Link grid={layout.links[0]} direction='prev' to={`/${linkPrev}`}/>

			<div className='page-number'>{ ('0' + currentPage).slice(-2) }</div>

			{content.map((item, index) => 
				<Image key={index} data={item} grid={layout.images[index]} />
			)}

			<Link grid={layout.links[1]} direction='next' to={`/${linkNext}`} />
		</div>
	)
}