import { combineReducers } from "redux";
import User from './User';
import WishlistSlice from "./WishlistSlice";
export default combineReducers({
   User,
   wishlist: WishlistSlice
})