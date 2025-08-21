import {  createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios';




//REGISTER API
export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/v1/register', userData , config);
      // console.log('Registration Data:', data);
      return data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Registration failed. Please try again later'
      );
    }
  }
);


//LOGIN  API

export const login = createAsyncThunk(
  'user/login',
  async ({email,password}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post('/api/v1/login', {email,password} , config);
      // console.log('login Data:', data);
      return data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'login failed. Please try again later'
      );
    }
  }
);


//Loaduser
export const loadUser=createAsyncThunk('user/loadUser',async(_dirname,{rejectWithValue})=>{
  try {
    const {data} = await axios.get('api/v1/profile',{
         withCredentials: true, // IMPORTANT: send cookies/session
    })
    return data
    
  } catch (error) {
      return rejectWithValue(
        error.response?.data || 'LoadUser failed. Please try again later'
      );
    }
})


//LOGOUT FUNCTIONALITY

export const logout=createAsyncThunk('user/logout',async(__dirname,{rejectWithValue})=>{
  try {
    const {data} = await axios.post('api/v1/logout')
    return data
    
  } catch (error) {
      return rejectWithValue(
        error.response?.data || 'LoadUser failed. Please try again later'
      );
    }
})


export const updateProfile=createAsyncThunk('user/updateProfile',async(userData,{rejectWithValue})=>{
  try {

    const config = {
      headers:{
        'Content-Type' : 'multipart/form-data'
      }
    }
    const {data} = await axios.put('/api/v1/profile/update',userData,config)
    return data
    
  } catch (error) {
      return rejectWithValue(error.response?.data  || {message :'Profile Update Failed' });
    }
})




export const updatePassword=createAsyncThunk('user/updatePassword',async(formData,{rejectWithValue})=>{
  try {

    const config = {
      headers:{
        'Content-Type' : 'application/json'
      }
    }
    const {data} = await axios.put('/api/v1/password/update',formData,config)
    return data
    
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || {message :'Password update failed' });
    }
})


//FORGOT PASSWORD


export const forgotPassword=createAsyncThunk('user/forgotPassword',async(email,{rejectWithValue})=>{
  try {

    const config = {
      headers:{
        'Content-Type' : 'application/json'
      }
    }
    const {data} = await axios.post('/api/v1/password/forgot',email,config)
    return data
    
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || {message :'Email Send Failed ' });
    }
})



//RESET PASSWORD


export const resetPassword=createAsyncThunk('user/resetPassword',async({token ,userData},{rejectWithValue})=>{
  try {

    const config = {
      headers:{
        'Content-Type' : 'application/json'
      }
    }
    const {data} = await axios.post(`/api/v1/reset/${token}`,userData,config)
    return data
    
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || {message :'Email Send Failed ' });
    }
})

 const userSlice = createSlice({
    name:'user',
    initialState:{
        user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')) : null,
        loading:false,
        error:null,
        success:false,
        isAuthenticated:localStorage.getItem('isAuthenticated') === 'true' ,
        message:null
    },
    reducers:{
        removeError:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=null
        }
    },

    extraReducers:(builder)=>{
        //REGISTRATION CASES

        builder.addCase(register.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.success=action.payload.success
            state.user=action.payload?.user || null
            state.isAuthenticated= Boolean(action.payload?.user)

            //STORE IN LOCALE STORAGE
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  || 'Failed to load User Profile'
            state.user=null
            state.isAuthenticated=false
        })

        //LOGIN CASES

        
        builder.addCase(login.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.success=action.payload.success
            state.user=action.payload?.user || null
            state.isAuthenticated= Boolean(action.payload?.user)
            // console.log(state.user);


              //STORE IN LOCALE STORAGE
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  || 'Login failed .Please try again later '
            state.user=null
            state.isAuthenticated=false
        })



         //loading user cases
        builder.addCase(loadUser.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.user=action.payload?.user || null
            state.isAuthenticated= Boolean(action.payload?.user)
            
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  || 'Failed to load User Profile'
            state.user=null
            state.isAuthenticated=false


            if(action.payload?.statusCode === 401){
              state.user=null;
              state.isAuthenticated=false;
              localStorage.removeItem('user')
              localStorage.removeItem('isAuthenticated')
            }
        })



         //LOGOUT USER 
        builder.addCase(logout.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.loading=false,
            state.error=null
            state.user=null
            state.isAuthenticated=false
             localStorage.removeItem('user')
              localStorage.removeItem('isAuthenticated')
            
        })
        .addCase(logout.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  || 'Logout failed'

        })



        
         //UPDATE USER 
        builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.user=action.payload?.user || null
            state.success=action.payload?.success
            state.message=action.payload?.message
            
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  || 'Profile Update Failed'

        })


         
         //UPDATE password cases
        builder.addCase(updatePassword.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.success=action.payload?.success
            
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload  || 'Password update failed   '

        })




        //FORGOT PASSWORD CASES

        builder.addCase(forgotPassword.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(forgotPassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.success=action.payload?.success
            state.message=action.payload?.message
            
        })
        .addCase(forgotPassword.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload || ' Email Send Failed '

        })


        

        //RESET PASSWORD CASES

        builder.addCase(resetPassword.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.success=action.payload?.success
            state.user=null
            state.isAuthenticated=false
            
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload || ' Email Send Failed '

        })


        






    }

})

export const  { removeError,removeSuccess}=userSlice.actions;
export default userSlice.reducer;