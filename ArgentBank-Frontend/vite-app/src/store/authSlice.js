import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action to connect and get token
export const logIn = createAsyncThunk('auth/logIn', async ({ username, password, rememberMe }, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username, // use email as API needs
        password
      })
    });

    // handle if api response isn't "ok"
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur d\'utilisateur ou de mot de passe');
    }

    // get data from response
    const data = await response.json();
    const token = data.body.token;

    // handle storage based on "rememberMe"
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('rememberedEmail', username);
    } else {
      sessionStorage.setItem('token', token);
      localStorage.removeItem('rememberedEmail');
    }

    return { token };

  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Create redux slice on handle authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token') || sessionStorage.getItem('token'),
    rememberMe: localStorage.getItem('rememberedEmail') ? true : false,
    status: 'idle',
    error: null
  },
  reducers: {
    // reset token and authentication state id disconnected
    logOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      if (!state.rememberMe) {
        localStorage.removeItem('rememberedEmail');
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // update token
        state.isAuthenticated = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        // update state if connexion fails
        state.status = 'failed';
        state.error = action.payload || 'Erreur lors de la connexion';
      });
  }
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;