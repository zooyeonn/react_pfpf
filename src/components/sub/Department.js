import Layout from '../common/Layout';

function Department() {
	const path = process.env.PUBLIC_URL;
	return (
		<Layout name={'Department'}>
			<div className='process'>
				<h2>Process</h2>
				<div className='wrap'>
					<div className='txt1'>
						Out working method practices a simultaneous exploration of <br />
						traditional handicraft and cutting edge digital technology a <br />
						complementary relationship that drives our creative process.
					</div>
					<article>
						<img src={`${path}/img/meeting.jpg`} alt='' />
					</article>
					<h3>Start a project?</h3>
					<div className='txt2'>
						At the core of the design studio is a state-of-the art modelling
						<br />
						workshop equipped with 3D rapid prototyping capabilities and a{' '}
						<br />
						large, programmable manufacturing robot. Alongside traditional{' '}
						<br />
						woodworking machines, these tools enable rapid prototyping to <br />
						become an integral part of the design process. Ideas can move <br />
						seamlessly between analogue and digital worlds.
					</div>
				</div>
			</div>
			<div className='team'>
				<h2>Our team</h2>
				<div className='inner'>
					<div className='member1'>
						<img src={`${path}/img/member1.png`} alt='' />
						<h3>Becca</h3>
						<p>CEO</p>
					</div>
					<div className='member2'>
						<img src={`${path}/img/member2.png`} alt='' />
						<h3>Morgan</h3>
						<p>UI Designer</p>
					</div>
					<div className='member3'>
						<img src={`${path}/img/member3.png`} alt='' />
						<h3>Melanie</h3>
						<p>Art director</p>
					</div>
					<div className='member4'>
						<img src={`${path}/img/member4.png`} alt='' />
						<h3>Liam</h3>
						<p>Graphic Designer</p>
					</div>
					<div className='member5'>
						<img src={`${path}/img/member5.png`} alt='' />
						<h3>Aspyn</h3>
						<p>Back-end Engineer</p>
					</div>
					<div className='member6'>
						<img src={`${path}/img/member6.png`} alt='' />
						<h3>Oliver</h3>
						<p>Front-end Engineer</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Department;
