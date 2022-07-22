import Layout from '../common/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect } from 'react';

function Location() {
	const path = process.env.PUBLIC_URL;
	const { kakao } = window;
	const container = useRef(null);

	const mapOption = {
		center: new kakao.maps.LatLng(37.57003092882389, 126.98917851771233),
		level: 3,
	};

	useEffect(() => {
		const map_result = new kakao.maps.Map(container.current, mapOption);

		const markerPosition = new kakao.maps.LatLng(
			37.57003092882389,
			126.98917851771233
		);
		const marker = new kakao.maps.Marker({
			position: markerPosition,
		});
		marker.setMap(map_result);

		const mapTypeControl = new kakao.maps.MapTypeControl();
		map_result.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
		const zoomControl = new kakao.maps.ZoomControl();
		map_result.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);
	}, []);

	return (
		<>
			<Layout name={'Location'}>
				<div className='process'>
					<h2>Location</h2>
					<div className='wrap'>
						<div className='txt1'>
							<h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
							<p>
								Renesa thrives on rich collaborations to push our thinking.{' '}
								<br />
								A continuous state of reinvention, driven by our partners in the
								process, is essential to our work.
								<br />
								At the heart of all of our work is a commitment to shaping the
								built environment both in the service of humanism and the
								longevity of our planet. Our interdisciplinary design process
								ensures that our projects are both poetic and pragmatic, where
								high design works in conjunction with sustainable building
								performance.
							</p>
						</div>
						<article>
							<img src={`${path}/img/location.jpg`} alt='' />
						</article>
						<div className='txt2'>
							<h3>HISTORY</h3>
							<div className='inner'>
								<h4>2022</h4>
								<p>Lorem ipsum dolor sit amet consectetur.</p>
								<h4>2021</h4>
								<p>Lorem ipsum dolor sit.</p>
								<h4>2020</h4>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui.
								</p>
								<h4>2019</h4>
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
									reiciendis tempore quibusdam incidunt.
								</p>
								<h4>2018</h4>
								<p>Lorem ipsum dolor sit amet.</p>
								<h4>2017</h4>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
							</div>
						</div>
					</div>
				</div>
				<div id='map' ref={container}></div>
				<div className='bottom'>
					<div className='txt3'>
						<h3>Contact Us</h3>
						<h4>National Geographic</h4>
						<p>104, Jong-ro, Jongno-gu, Seoul, Republic of Korea</p>
						<p>TEL: 1234-5678 / FAX 1234-5678</p>
						<p>E-MAIL: National@Geographic.co.kr</p>
					</div>
					<div className='box1'>
						<FontAwesomeIcon icon={faPhone} />
						<h3>Phone</h3>
						<p>Tel: 1234-5678 / FAX 1234-5678</p>
					</div>
					<div className='box2'>
						<FontAwesomeIcon icon={faEnvelope} />
						<h3>E-Mail</h3>
						<p>National@Geographic.co.kr</p>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Location;
