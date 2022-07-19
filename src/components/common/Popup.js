import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

function Popup(props) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<aside className='pop'>
			<div className='con'>{props.children}</div>
			<span className='close' onClick={() => props.setOpen(false)}>
				<FontAwesomeIcon icon={faRectangleXmark} />
			</span>
		</aside>
	);
}

export default Popup;
