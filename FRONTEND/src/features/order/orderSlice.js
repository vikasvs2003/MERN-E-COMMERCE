import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';





//CREATING ORDER 
export const createOrder = createAsyncThunk('order/createOrder', async (order,
    { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/new/order', order, config)
        // console.log('order data', data);
        return data


    } catch (error) {
        return rejectWithValue(error.response?.data || 'Order Creating Failed');
    }


})

// GET USER ORDERS
export const getAllMyOrders = createAsyncThunk('order/getAllMyOrders', async (_,
    { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/orders/user')
        // console.log('order data', data);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetched orders');
    }
})


// GET  ORDER DETAILS
export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (orderID,
    { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/order/${orderID}`)
        // console.log('order data', data);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetched Order Details');
    }
})


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        success: false,
        loading: false,
        error: null,
        orders: [],
        order: {}
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess: (state) => {
            state.success = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true,
                state.error = null

        })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false,
                    state.order = action.payload.order
                state.success = action.payload.success

            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Order Creating Failed'
            })

        //get all use order cases 

        builder.addCase(getAllMyOrders.pending, (state) => {
            state.loading = true,
                state.error = null

        })
            .addCase(getAllMyOrders.fulfilled, (state, action) => {
                state.loading = false,
                    state.orders = action.payload.orders
                state.success = action.payload.success

            })
            .addCase(getAllMyOrders.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Failed to fetched orders'
            })


             //get Order Details
        builder.addCase(getOrderDetails.pending, (state) => {
            state.loading = true,
                state.error = null

        })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false,
                    state.order = action.payload.order
                state.success = action.payload.success

            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Failed to fetched Order Details'
            })



    }
})


export const { removeErrors, removeSuccess } = orderSlice.actions
export default orderSlice.reducer;