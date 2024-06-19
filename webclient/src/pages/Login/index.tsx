import React, {FormEventHandler, forwardRef, useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {
    HvButton,
    HvButtonProps,
    HvInput,
    HvInputProps,
    HvLogin,
    HvTypography,
    PolymorphicRef,
    theme
} from "@hitachivantara/uikit-react-core";
import useAuthenticated, {HOST} from "../../components/useAuthenticated";

// #region Styled components

const StyledRoot = styled("div")({
    width: 300,
    margin: "auto",
    paddingTop: 150,
    "& h3": {
        textAlign: "center",
    },
});

const StyledInput = styled((props: HvInputProps) => <HvInput {...props} />)({
    marginTop: 20,
    height: 90,
});

const StyledButton = styled(
    forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
        return <HvButton {...props} ref={ref}/>;
    }),
)({
    width: 120,
    float: "right",
    marginTop: theme.spacing(8),
    textTransform: `full-size-kana`,
});

// #endregion

async function callLogin(username: string, password: string) {
    const loginFormData = new URLSearchParams();
    loginFormData.append("j_username", username);
    loginFormData.append("j_password", password);

    return await fetch(`${HOST}/pentaho/j_spring_security_check`, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: loginFormData.toString()
    });
}

const Login = () => {
    const { isAuthenticated, mutate: authMutate } = useAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(location.state?.from ?? "/welcome");
        }
    }, [isAuthenticated]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        console.log("handle login submit", event);
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const {username, password} = Object.fromEntries(formData.entries());

        try {
            const response = await callLogin(username.toString(), password.toString());

            if (response.ok) {
                await authMutate();
                navigate(location.state?.from ?? "/welcome");
            } else {
                // handle errors
            }
        } catch (error) {
            console.error("error on login", error);
        }
    }, []);

    //only render if not auth, if auth redirect to home

    return (
        <HvLogin background="https://lumada-design.github.io/assets/login-bg1.png">
            <StyledRoot>
                <HvTypography variant="title2">Welcome</HvTypography>
                <form onSubmit={handleSubmit}>
                    <StyledInput label="Username" name="username" placeholder="Enter text" required/>
                    <StyledInput label="Password" name="password" placeholder="Enter text" required type="password"/>
                    <StyledButton type="submit" variant="primary">Login</StyledButton>
                </form>
            </StyledRoot>
        </HvLogin>
    );
}

export default Login;
