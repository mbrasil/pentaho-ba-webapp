import React, {FormEventHandler, forwardRef} from "react";
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
import {HOST} from "../BrowseFiles/useBrowseFiles";
import {useNavigate} from "react-router-dom";

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

const Login = () => {
    //const navigate = useNavigate();

    async function callLogin(username: FormDataEntryValue, password: FormDataEntryValue) {
        try {
            const loginFormData = new URLSearchParams();
            loginFormData.append("j_username", username.toString());
            loginFormData.append("j_password", password.toString());

            const response = await fetch(`${HOST}/pentaho/j_spring_security_check`, {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                credentials: "include",
                redirect: "manual",
                body: loginFormData.toString()
            });

            if (response.ok || response.redirected) {
                const cookieHeader = response.headers.get("Set-Cookie");

                if (cookieHeader) {
                    const cookies = cookieHeader.split(", ");
                    cookies.forEach(cookie => {
                        console.log(cookie);
                    });

                    //navigate("/welcome")
                }

                return;
            }

            // handle errors
        } catch (ex) {
            console.error("error logging user", ex);
        }
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const {username, password} = Object.fromEntries(formData.entries());

        await callLogin(username, password);
    };

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
