import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

function Footer() {
	return (
		<footer>
			<article>
				<div className='info'>
					<h3>Infomation</h3>
					<ul>
						<li>Lorem ipsum dolor sit amet consectetur.</li>
						<li>Lorem ipsum dolor sit.</li>
						<li>Lorem ipsum dolor sit amet consectetur.</li>
					</ul>
				</div>
				<div className='customer'>
					<h3>Customer Service</h3>
					<ul>
						<li>T. 1544-6052</li>
						<li>F. 0505-205-6060</li>
						<li>E. zooyeonn.github.io</li>
					</ul>
				</div>
				<div className='follow'>
					<h3>Follow us</h3>
					<ul>
						<li>
							<FontAwesomeIcon icon={faInstagram} />
							<span>Instagram</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faCommentDots} />
							<span>KaKao</span>
						</li>
					</ul>
				</div>
			</article>
			<div className='copy'>
				<p>copyright &copy; zooyeon - All RIGHT RESERVED.</p>
				<ul>
					<li>Admin</li>
					<li>Sitemap</li>
					<li>community</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
