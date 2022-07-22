import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function Community() {
	const dummyPosts = [
		{ title: 'Hello5', content: 'Here comes description  in detail.' },
		{ title: 'Hello4', content: 'Here comes description  in detail.' },
		{ title: 'Hello3', content: 'Here comes description  in detail.' },
		{ title: 'Hello2', content: 'Here comes description  in detail.' },
		{ title: 'Hello1', content: 'Here comes description  in detail.' },
	];
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);
	const [Posts, setPosts] = useState(dummyPosts);

	//폼요소 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
		inputEdit.current.value = '';
		textareaEdit.current.value = '';
	};

	//글 저장 함수
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('Enter both title and text');
		}
		setPosts([
			...Posts,
			{ title: input.current.value, content: textarea.current.value },
		]);
		resetForm();
	};

	//글삭제 함수
	const deletePost = (index) => {
		console.log(index);
		//filter기존 배열을 복사해서 filtering (전개 연산자를 쓰지 않아도 불변성 유지)
		//파라미터로 전달된 index 순번만 제외만 나머지 데이터들만 필터링해서 반환
		setPosts(Posts.filter((post, idx) => idx !== index));
	};

	const enableUpdate = (index) => {
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//글 출력 모드 변경 함수
	const disableUpdate = (index) => {
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	//실제 글 수정 함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			resetForm();
			return alert('수정할 제목과 본문을  모두 입력하세요');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	//Posts의 값이 변경될 때마다 콘솔 출력
	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='process'>
				<h2>Community</h2>
			</div>
			<div className='inputBox'>
				<input type='text' placeholder='enter a title' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='5'
					placeholder='enter the text'
					ref={textarea}></textarea>
				<br />

				<div className='btnSet'>
					<button onClick={resetForm}>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//반복되는 포스트에 enableUpdate=true값이 있으면 수정 모드로 랜더링
								<>
									<div className='editTxt'>
										<input
											type='text'
											defaultValue={post.title}
											ref={inputEdit}
										/>
										<br />
										<textarea
											cols='30'
											rows='4'
											defaultValue={post.content}
											ref={textareaEdit}></textarea>
										<br />
									</div>
									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
									</div>
								</>
							) : (
								//반복되는 포스트에 enableUpdate=true값이 없으면 일반 출력 모드로 랜더링
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>
											<FontAwesomeIcon icon={faPlus} />
										</button>
										<button onClick={() => deletePost(idx)}>
											<FontAwesomeIcon icon={faMinus} />
										</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
export default Community;

/*
	Create (데이터 저장 - 글저장)
	Read (데이터 읽기 - 글읽기)
	Update (데이터 수정 - 글수정)
	Delete (데이터 삭제 - 글삭제)
*/
