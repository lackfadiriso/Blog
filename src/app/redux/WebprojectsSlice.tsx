import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { About, MyCertificates, Project, ProjectsList } from '../types'
import axios from 'axios';

export const getWebProjectItems = createAsyncThunk<Project[], string>(
    "WebprojectsSlice/getProjectItems",
    async(language: string) => {
        try{
            const response = await axios.get(`/data/${language}.json`);
            if (response.status < 200 || response.status >= 300) throw new Error("Network response was not ok");
            const data = response.data
            console.log(data.projects)
            return Object.values(data.projects);
        }catch(err){
            console.log(`have a error: ${err}`);
            return [];
        }
    }
)

export const getMenuItems = createAsyncThunk<Project[], string>(
    "WebprojectsSlice/getMenuItems",
    async(language: string) => {
        try{
            const response = await axios.get(`/data/${language}.json`);
            if (response.status < 200 || response.status >= 300) throw new Error("Network response was not ok");
            const data = response.data
            return data.my;
        }catch(err){
            console.log(`have a error: ${err}`);
            return [];
        }
    }
)

export const getCertificateItems = createAsyncThunk<MyCertificates[], string>(
    'WebprojectsSlice/getCerificateItems',
    async(language: string) => {
        try{
            const response = await axios.get(`/data/${language}.json`);
            if (response.status < 200 || response.status >= 300) throw new Error("Network response was not ok");
            const data = response.data
            return data.certificates

        }catch(err){
            console.log(`Have a error ${err}`);
            return [];
        }
    }
)


export const getAboutItems = createAsyncThunk<About[], string>(
    "WebprojectsSlice/getAboutItems",
    async(language: string) => {
        try{
            const response = await axios.get(`/data/${language}.json`);
            if (response.status < 200 || response.status >= 300) throw new Error("Network response was not ok");
            const data = response.data;
            return data.about;
        }catch(err){
            console.log(`have a error ${err}`);
            return [];
        }
    }
)

const initialState : ProjectsList = {
    projectsItems: [],
    mainItems: [],
    aboutItems: [],
    certificateItems: [],
    error: null,
    language: "eng",
}


export const WebprojectsSlice = createSlice({
  name: 'WebprojectsSlice',
  initialState,
  reducers: {
    changeLang(state, action){
        state.language = action.payload
        localStorage.setItem("lang", action.payload)
    }
  },

  extraReducers: (builder) => {
    // Project page items
    builder.addCase(getWebProjectItems.rejected, (state, action) => {
        state.error = action.error.message || "Undefined Error"
    })
    builder.addCase(getWebProjectItems.pending, (state, action) => {
        state.error = null;
    });
    builder.addCase(getWebProjectItems.fulfilled, (state, action) => {
        state.projectsItems = action.payload;
        state.error = null;
    });

    // Main menu items
    builder.addCase(getMenuItems.rejected, (state, action) => {
        state.error = action.error.message || "Undefined Error"
    })
    builder.addCase(getMenuItems.pending, (state) => {
        state.error = null;
    });
    builder.addCase(getMenuItems.fulfilled, (state, action) => {
        state.mainItems = action.payload;
        state.error = null;
    });

    // About me items
    builder.addCase(getAboutItems.rejected, (state, action) => {
        state.error = action.error.message || "Undefined Error"
    })
    builder.addCase(getAboutItems.pending, (state) => {
        state.error = null;
    });
    builder.addCase(getAboutItems.fulfilled, (state, action) => {
        state.aboutItems = action.payload;
        state.error = null;
    });

    // About my certificates
    builder.addCase(getCertificateItems.rejected, (state, action) => {
        state.error = action.error.message || "Undefined Error"
    })
    builder.addCase(getCertificateItems.pending, (state) => {
        state.error = null
    })
    builder.addCase(getCertificateItems.fulfilled, (state, action) => {
        state.certificateItems = action.payload;
        state.error = null
    })
  }
})

export const { changeLang } = WebprojectsSlice.actions
export default WebprojectsSlice.reducer