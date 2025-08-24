import { configureStore } from "@reduxjs/toolkit";
import GenerateUnverifiedUserReducer from "../features/auth/signUp/hook/generateUnverifiedUserSlice";
import RegisterReducer from "../features/auth/signUp/hook/registerSlice";
import ResendVerificationCodeReducer from "../features/auth/signUp/hook/resendVerificationCodeSlice";
import LogInReducer from "../features/auth/login/hook/logInSlice";
import ForgetPasswordReducer from "../features/auth/forgetPassword/hook/forgetPasswordSlice";
import CheckCodeReducer from "../features/auth/forgetPassword/hook/checkCodeSlice";
import ResetPasswordReducer from "../features/auth/forgetPassword/hook/resetPasswordSlice";
import CitiesReducer from "../features/cities/hook/citiesSlice";
import HomeReducer from "../features/home/hook/homeSlice";
import EventsReducer from "../features/events/hook/eventsSlice";
import GuidesReducer from "../features/guides/hook/GuidesSlice";
import ToursReducer from "../features/tours/hook/toursSlice";
import LogoutReducer from "../features/user/hook/logoutSlice";
import GetUserInfoReducer from "../features/user/hook/getUserInfoSlice";
import UpdateUserReducer from "../features/user/hook/updateUserSlice";
import ResetPassworddReducer from "../features/user/hook/resetPasswordSlice";
import FeedBackReducer from "../hooks/feedBackSlice";
import PaymentReducer from "../hooks/paymentSlice";
import GuideAvailabiltyReducer from "../features/guides/hook/guideAvailabilitySlice";
import CartReducer from "../hooks/cartSlice";
import NotificationReducer from "../hooks/notificationSlice";
import RequiredIdsReducer from "../hooks/requiredIdsSlice";
import SearchReducer from "../hooks/searchSlice";
export const store = configureStore({
  reducer: {
    generateUnverifiedUser: GenerateUnverifiedUserReducer,
    register: RegisterReducer,
    resendVerificationCode: ResendVerificationCodeReducer,
    login: LogInReducer,
    forgetPassword: ForgetPasswordReducer,
    checkCode: CheckCodeReducer,
    resetPassword: ResetPasswordReducer,
    home: HomeReducer,
    cities: CitiesReducer,
    events: EventsReducer,
    guides: GuidesReducer,
    logout: LogoutReducer,
    tours: ToursReducer,
    getUserInfo: GetUserInfoReducer,
    updateUser: UpdateUserReducer,
    resetPasswordd: ResetPassworddReducer,
    feedback: FeedBackReducer,
    payment: PaymentReducer,
    guideAvailabilty: GuideAvailabiltyReducer,
    cart: CartReducer,
    notifications: NotificationReducer,
    requiredIds: RequiredIdsReducer,
    search: SearchReducer,
  },
});
