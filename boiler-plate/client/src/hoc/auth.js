import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";

const Auth = (SpecificComponent, option, adminRoute = null) => {

    // option
    // null  -> 아무나 출입이 가능한 페이지
    // true  -> 로그인한 유저만 출입이 가능한 페이지
    // false -> 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {

            dispatch(auth()).then(response => {

                if(!response.payload.isAuth) {
                    // 로그인 하지 않은 상태에서

                    // 로그인한 유저만 출입이 가능한 페이지(option = ture)를 들어가려고 할때 Login 페이지로 이동
                    if(option) {
                        navigate("/login");
                    }
                } else {
                    // 로그인 한 상태에서

                    // 관리자만 들어갈 수 있는 페이지를 들어가려고 할때 관리자(admin) 아닌 경우 Landing 페이지로 이동
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate("/");
                    } else {
                        // 로그인한 유저가 출입불가능한 페이지를 들어가려고 할 때 Landing 페이지로 이동
                        if(option === false) {
                            navigate("/");
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}

export default Auth;