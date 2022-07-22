import Layout from '../common/Layout';
import Popup from '../common/Popup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function Youtube() {
	const path = process.env.PUBLIC_URL;
	const [Vids, setVids] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyAQ_q12A-8fN0wGsk6h9ZQJ_GL2AssIeis';
		const playlist = 'PL5EyAeUspyQJ6thaGeeEDM-onb8h9GybD';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		axios.get(url).then((json) => {
			setVids(json.data.items);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				<div className='process1'>
					<h2>Youtube</h2>
				</div>
				<div className='process2'>
					<p>
						National Geographic stories take you on a journey that's always
						enlightening, often surprising, and unfailingly fascinationg. Lorem
						ipsum dolor sit amet consectetur adipisicing elit. Et iure iusto nam
						non voluptates aut illum ullam atque nostrum voluptatem? Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Esse, nisi!
					</p>
				</div>
				<div className='process3'>
					<img src={`${path}/img/vid.jpg`} alt='' />
				</div>
				{Vids.map((vid, idx) => {
					const tit = vid.snippet.title;
					const desc = vid.snippet.description;
					const date = vid.snippet.publishedAt;

					return (
						<article key={idx}>
							<div
								className='pic'
								onClick={() => {
									setOpen(true);
									setIndex(idx);
								}}>
								<img
									src={vid.snippet.thumbnails.standard.url}
									alt={vid.snippet.title}
								/>
							</div>
							<div className='txt'>
								<h3>{tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h3>
								<p>{desc.length > 300 ? desc.substr(0, 300) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
						</article>
					);
				})}
			</Layout>

			{Open && (
				<Popup setOpen={setOpen}>
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}></iframe>
				</Popup>
			)}
		</>
	);
}

export default Youtube;
