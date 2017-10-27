import React from 'react';
import { Link } from 'react-router-dom';

import Slideshow from './Slideshow';


export default function NotFound({ data = [] }) {

	let isSlideshow = data.length;

	return (
		<section className='not-found' data-slideshow={isSlideshow ? true : false}>
			{isSlideshow ? 
				<Slideshow data={data} />
				: null
			}

			<div className="bg"></div>

			<h1>404</h1>
			<h3>page not found</h3>

			<Link to='/'>go back</Link>

		</section>
	)
}