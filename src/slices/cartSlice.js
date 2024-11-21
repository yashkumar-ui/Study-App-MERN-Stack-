import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// initial states 
const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

// create a cart slice 

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers:{
        addToCart: (state , action) => {
            const course = action.payload
            const index = state.cart.findIndex( (item) => item._id === course._id)

            if( index >= 0){
                // if the course already in the cart , then donot modify it 
                toast.error("Course already in cart")
                return
            }
            // if the course is not in the cart , push it in cart 
            state.cart.push(course)
            // update the total items 
            state.totalItems++
            state.total += course.price
            // update it to the local storage 
            localStorage.setItem("cart" , JSON.stringify(state.cart))
            localStorage.setItem("total" , JSON.stringify(state.total))
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))

            // show the toast 
            toast.success("Course added to the cart")

        },
        removeFromCart : (state , action) => {
            const courseId = action.payload
            const index = state.cart.findIndex( (item) => item._id === courseId)
            
            if(index >= 0){
                // remove the course from the cart 
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index , 1)

                // update it to the localStorage 
                localStorage.setItem("cart" , JSON.stringify(state.cart))
                localStorage.setItem("total" , JSON.stringify(state.total))
                localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))

                // show the total
                toast.success("course remove from the cart")
            }
        },
        resetCart : (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // update the local storage 
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },

    }
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;

export default cartSlice.reducer 