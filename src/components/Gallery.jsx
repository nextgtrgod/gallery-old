import React from 'react';

import Image from './Image';
import Link from './Link';
import NotFound from './NotFound';
import Slideshow from './Slideshow';

import { layoutConfig } from './layoutConfig';



export default function Gallery({ match, data }) {

	const pageNumber = +(match.params.page || 1);
	const count = 12;
	const pagesCount = Math.ceil(data.length / count);

	// 404
	if (pageNumber !== pageNumber ||
		pageNumber < 1 ||
		pageNumber > pagesCount) {
		return (
			<NotFound key='page-not-found' data={data} />
		);
	};

	const chunkStart = count * (pageNumber - 1);

	const content = data.slice(chunkStart, chunkStart + count);

	let linkPrev = (pageNumber - 1) || pagesCount;
	let linkNext = ((pageNumber + 1) % (pagesCount + 1)) || 1;

	const layout = layoutConfig.full[(pageNumber - 1) % 3];


	return (
		<div className='gallery' data-page={('0' + pageNumber).slice(-2)}>
			<Link grid={layout.links[0]} direction='prev' to={`/${linkPrev}`}/>

			{content.map((item, index) => 
				<Image key={index} data={item} grid={layout.images[index]} />
			)}

			<Link grid={layout.links[1]} direction='next' to={`/${linkNext}`} />
		</div>
	)
}