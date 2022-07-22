import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
function Members() {
	const path = process.env.PUBLIC_URL;
	const history = useHistory();
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		comments: '',
		age: '',
		gender: null,
		interests: null,
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);
	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = 'Enter at least 5 characters';
		}
		if (value.email.length < 8 || !/@/.test(Val.email)) {
			errs.email = 'Enter at least 8 characters including @';
		}
		if (
			value.pwd1 < 5 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 =
				'Enter at least 5 characters including English, numeric, and special characters';
		}
		if (value.pwd1 !== value.pwd2 || value.pwd2 < 5) {
			errs.pwd2 = 'Enter the same password';
		}
		//gender인증처리
		if (!Val.gender) {
			errs.gender = 'Choose your gender';
		}
		//interests인증처리
		if (!Val.interests) {
			errs.interests = 'Select one or more';
		}
		//comments인증처리
		if (Val.comments.length < 20) {
			errs.comments = 'Enter more than 20 characters';
		}
		if (Val.age === '') {
			errs.age = 'Enter your age';
		}
		return errs;
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};
	const handleRadio = (e) => {
		const { name } = e.target;
		const isCheck = e.target.checked;
		setVal({ ...Val, [name]: isCheck });
	};
	const handleSelect = (e) => {
		const { name } = e.target;
		const isSelected = e.target.value;
		console.log(isSelected);
		setVal({ ...Val, [name]: isSelected });
	};
	const handleCheck = (e) => {
		let isCheck = false;
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		inputs.forEach((el) => {
			if (el.checked) isCheck = true;
		});
		setVal({ ...Val, [name]: isCheck });
	};

	const handleReset = () => {
		setSubmit(false);
		setErr({});
		setVal(initVal);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};
	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('회원 가입이 성공적으로 완료되었습니다.');
			history.push('/department');
		}
	}, [Err]);
	return (
		<Layout name={'Members'}>
			<div className='process'>
				<h2>Sign Up</h2>
			</div>
			<div className='bg'>
				<img src={`${path}/img/universe.jpg`} alt='' />
			</div>
			<div className='inner'>
				<div className='box1'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'></legend>
							<table border='1'>
								<caption className='h'></caption>
								<tbody>
									{/* userid */}
									<tr>
										<th scope='row'>
											<label htmlFor='userid'>USER ID</label>
										</th>
										<td>
											<input
												type='text'
												placeholder='Enter your id'
												name='userid'
												id='userid'
												value={Val.userid}
												onChange={handleChange}
											/>
											<span className='err'>{Err.userid}</span>
										</td>
									</tr>
									{/* password */}
									<tr>
										<th scope='row'>
											<label htmlFor='pwd1'>PASSWORD</label>
										</th>
										<td>
											<input
												type='password'
												name='pwd1'
												id='pwd1'
												placeholder='Enter your password'
												onChange={handleChange}
											/>
											<span className='err'>{Err.pwd1}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='pwd2'>RE-PASSWORD</label>
										</th>
										<td>
											<input
												type='password'
												name='pwd2'
												id='pwd2'
												placeholder='Re-enter your password'
												onChange={handleChange}
											/>
											<span className='err'>{Err.pwd2}</span>
										</td>
									</tr>
									{/* email */}
									<tr>
										<th scope='row'>
											<label htmlFor='email'>E-MAIL</label>
										</th>
										<td>
											<input
												type='text'
												id='email'
												name='email'
												placeholder='Enter your e-mail address'
												value={Val.email}
												onChange={handleChange}
											/>
											<span className='err'>{Err.email}</span>
										</td>
									</tr>
									{/* Age */}
									<tr>
										<th scope='row'>
											<label htmlFor='age'>Age</label>
										</th>
										<td>
											<select name='age' id='age' onChange={handleSelect}>
												<option value=''>Choose your age</option>
												<option value='10'>10</option>
												<option value='20'>20</option>
												<option value='30'>30</option>
												<option value='40'>40</option>
												<option value='50'>Over 50</option>
											</select>
											<span className='err'>{Err.age}</span>
										</td>
									</tr>
									{/* gender */}
									<tr>
										<th scope='row'>GENDER</th>
										<td>
											<label htmlFor='male'>MALE</label>
											<input
												type='radio'
												id='male'
												name='gender'
												onChange={handleRadio}
											/>
											<label htmlFor='female'>FEMALE</label>
											<input
												type='radio'
												id='female'
												name='gender'
												onChange={handleRadio}
											/>
											<span className='err'>{Err.gender}</span>
										</td>
									</tr>
									{/* interests */}
									<tr>
										<th scope='row'>INTERESTS</th>
										<td>
											<label htmlFor='animal'>Animal</label>
											<input
												type='checkbox'
												id='animal'
												name='interests'
												onChange={handleCheck}
											/>
											<label htmlFor='nature'>Natural Environment</label>
											<input
												type='checkbox'
												id='nature'
												name='interests'
												onChange={handleCheck}
											/>
											<label htmlFor='climate'>Climate Issue</label>
											<input
												type='checkbox'
												id='climate'
												name='interests'
												onChange={handleCheck}
											/>
											<label htmlFor='space'>Space Science</label>
											<input
												type='checkbox'
												id='space'
												name='interests'
												onChange={handleCheck}
											/>
											<span className='err'>{Err.interests}</span>
										</td>
									</tr>
									{/* comments */}
									<tr>
										<th scope='row'>
											<label htmlFor='comments'>COMMENTS</label>
										</th>
										<td>
											<textarea
												name='comments'
												id='comments'
												cols='30'
												rows='5'
												value={Val.comments}
												onChange={handleChange}></textarea>
											<span className='err'>{Err.comments}</span>
										</td>
									</tr>
									{/* btn set */}
									<tr>
										<th colSpan='2'>
											<input
												type='reset'
												value='CANCEL'
												onClick={handleReset}
											/>
											<input
												type='submit'
												value='SEND'
												onClick={() => setSubmit(true)}
											/>
										</th>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}
export default Members;
