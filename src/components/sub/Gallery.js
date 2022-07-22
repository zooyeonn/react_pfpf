//npm i react-masonry-component
import Layout from '../common/Layout';
import Popup from '../common/Popup';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	const masonryOptions = { transitionDuration: '0.5s' };

	/*
	interest 방식 호출
	getFlickr ({
		type: 'interset'
	}) */

	/*
	search 방식 호출
	getFlickr ({
		type: 'search'
		tags: '검색 
	})
	*/

	const getFlickr = async (opt) => {
		const key = '9d27d4e7c855390feed232f6f320da9c';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 50;
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
		}

		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			if (json.data.photos.photo.length === 0)
				return alert('해당되는 이미지를 찾을 수 없습니다');
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');

			setTimeout(() => {
				setEnableClick(true);
			}, 500);
		}, 1000);
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		input.current.value = '';

		if (!result) return alert('검색어를 입력해 주세요');
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({
			type: 'search',
			tags: result,
		});
	};

	useEffect(() => {
		getFlickr({ type: 'user', user: '195947625@N02' });
	}, []);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='process'>
					<h2>Gallery</h2>
				</div>
				<div className='txt'>
					<p>
						National Geographic stories take you on a journey that's always
						enlightening, often surprising, and unfailingly fascinationg. Lorem
						ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				{Loading && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
					/>
				)}
				<div className='box'>
					<div className='btn'>
						<button
							onClick={() => {
								if (!EnableClick) return;
								setEnableClick(false);
								setLoading(true);
								frame.current.classList.remove('on');
								getFlickr({ type: 'interest' });
							}}>
							Interest Gallery
						</button>

						<button
							onClick={() => {
								if (!EnableClick) return;
								setEnableClick(false);
								setLoading(true);
								frame.current.classList.remove('on');
								getFlickr({ type: 'user', user: '195947625@N02' });
							}}>
							My Gallery
						</button>
					</div>

					<div className='searchBox'>
						<input
							type='text'
							ref={input}
							placeholder='Enter a search term'
							onKeyUp={(e) => {
								if (e.key === 'Enter') showSearch();
							}}
						/>
						<button onClick={showSearch}>SEARCH</button>
					</div>
				</div>

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span
												onClick={(e) => {
													if (!EnableClick) return;
													setEnableClick(true);
													setLoading(true);
													frame.current.classList.remove('on');

													getFlickr({ type: 'user', user: e.target.innerText });
												}}>
												{item.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			{Open && (
				<Popup setOpen={setOpen}>
					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title}
					/>
				</Popup>
			)}
		</>
	);
}

export default Gallery;
