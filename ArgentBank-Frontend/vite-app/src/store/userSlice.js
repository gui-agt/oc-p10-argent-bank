import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Access data user infos
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération du profil utilisateur');
      }

      const data = await response.json();
      return data.body; // user data from api
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      userName: localStorage.getItem('userName') || '',
      createdAt: '',
      updatedAt: '',
      id: ''
    },
    status: 'idle',
    error: null
  },
  reducers: {
    // Reducer to reset user profile
    clearUserProfile: (state) => {
      state.profile = {
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        createdAt: '',
        updatedAt: '',
        id: ''
      };
      // delate data from local storage
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('email');
      localStorage.removeItem('userName');

    },
    // save user data in local storage
    setUserProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem('firstName', action.payload.firstName);
      localStorage.setItem('lastName', action.payload.lastName);
      localStorage.setItem('email', action.payload.email); // save email just in case
      localStorage.setItem('userName', action.payload.userName);
    }
  },
  // handle different state for fetchUser and updateUser thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload; // store profile data in state
        // save data in local storage
        localStorage.setItem('firstName', action.payload.firstName);
        localStorage.setItem('lastName', action.payload.lastName);
        localStorage.setItem('email', action.payload.email); // save email just in case
        localStorage.setItem('userName', action.payload.userName);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user profile';
      })
      // action update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'updating';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        localStorage.setItem('firstName', action.payload.firstName);
        localStorage.setItem('lastName', action.payload.lastName);
        localStorage.setItem('email', action.payload.email);
        localStorage.setItem('userName', action.payload.userName);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update user profile';
      });
  }
});

// Action to send update data
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedProfileData, thunkAPI) => {
    // access state & token
    const state = thunkAPI.getState(); // access global state
    const token = state.auth.token;

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProfileData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour du profil utilisateur');
      }

      const data = await response.json();
      return data.body; // get updated data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { clearUserProfile, setUserProfile } = userSlice.actions;

export default userSlice.reducer;
