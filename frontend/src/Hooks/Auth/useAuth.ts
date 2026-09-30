import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type GlobalState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import type { loginInterface, signUpInterface } from "../../Types/types";
import {
  addUser,
  loginUser,
  logout,
  userProfile,
} from "../../Redux/Auth/AuthSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { token, isLoading, error, user } = useSelector(
    (state: GlobalState) => state.auth,
  );

  const signup = (data: signUpInterface) => dispatch(addUser(data));

  const login = (data: loginInterface) => dispatch(loginUser(data));

  const profile = () => dispatch(userProfile());

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return {
    token,
    isLoading,
    error,
    user,
    signup,
    login,
    logoutUser,
    profile,
  };
};
