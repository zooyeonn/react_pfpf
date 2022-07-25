import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//fetch 함수 이름 변경
export const fetchYoutube = createAsyncThunk(
	//고유의 문자값 등록 (내부적으로 actionType 생성할 때 활용되는 값)
	'youtube/requestYoutube',
	async () => {
		//axios 요청할 URL 생성
		const key = 'AIzaSyAQ_q12A-8fN0wGsk6h9ZQJ_GL2AssIeis';
		const playlist = 'PL5EyAeUspyQJ6thaGeeEDM-onb8h9GybD';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		//해당 url로 axios 호출
		const response = await axios.get(url);
		//배열 값이 내보내지도록 처리
		return response.data.items;
	}
);

//슬라이스 이름 변경
const youtubeSlice = createSlice({
	//내부적으로 쓰일 고유 문자값 등록
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},

	//아래 각각 대괄호 안에 fetch 함수 이름 등록
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});
export default youtubeSlice.reducer;
