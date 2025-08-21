import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const getProduct = createAsyncThunk('product/getProduct', async ({keyword,page=1,category}, { rejectWithValue }) => {
    try {
        let link  = '/api/v1/products?page='+page;

        if(category){
            link+=`&category=${category}`;
        }
        if(keyword){
            link+=`&keyword=${keyword}`;
        }
        const data = await axios.get(link)
        // console.log('Response  ', data.data);
        return data.data


    } catch (error) {
        return rejectWithValue(error.response?.data || 'An Error Occured')
    }

})



//single product details
export const getProductDetails = createAsyncThunk('product/getProductDetails', async (id, { rejectWithValue }) => {
    try {
        const link = `/api/v1/product/${id}`
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An Error Occured')
    }
})



//Submit Review 
export const createReview = createAsyncThunk('product/createReview', async ( {rating,comment,productId} , { rejectWithValue }) => {
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }



        const { data } = await axios.put('/api/v1/review',{ rating,comment,productId },config);

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An Error Occured')
    }
})



const productslice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null,
        resultPerPage:4,
        totalPages:0,
        reviewSuccess:false,
        reviewLoading:false
    },
    reducers: {
        removeError: (state) => {
            state.error = null
        },
         removeSuccess: (state) => {
            state.reviewSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(getProduct.fulfilled, (state, action) => {
                // console.log('fulfilled action payload', action.payload);
                state.loading = false;
                state.error = null;
                state.products = action.payload.products
                state.productCount = action.payload.productCount;
                state.resultPerPage = action.payload.resultPerPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'something went wrong'
                state.products=[]
            })

        builder.addCase(getProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null
        })

            .addCase(getProductDetails.fulfilled, (state, action) => {
                // console.log('Product details', action.payload);
                state.loading = false;
                state.error = null;
                // state.products = action.payload.products
                // state.product = action.payload.productCount
                   state.product = action.payload.product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'something went wrong'
            })


        builder.addCase(createReview.pending, (state) => {
            state.reviewLoading = true;
            state.error = null
        })

            .addCase(createReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewSuccess = true;

                
            })
            .addCase(createReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.error = action.payload || 'something went wrong'
            })






    }

})


export const { removeError , removeSuccess} = productslice.actions;
export default productslice.reducer;