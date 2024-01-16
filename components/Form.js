import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
        width: 300px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    input[type="submit"] {
        width: 100px;
        background-color: #ccc;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    span {
        color: red;
    }
`;

export default function Form() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ mode: 'onChange' });
    console.log(watch()); // watch input value by passing the name of it
    const onValid = (data) => {
        console.log('valid', data)
        reset({ username: "", password: "", email: "" });
    }
    const onInvalid = (errors) => {
        console.log('invalid', errors)
    }

    return (
        <StyledForm onSubmit={handleSubmit(onValid, onInvalid)}>
            <input {...register("username", {
                required: "username is required",
                minLength: {
                    message: "The username should be longer than 5 chars.",
                    value: 5
                }
            })}
                type='text'
                placeholder='username' />
            <input {...register("password", {
                required: "password is required"
            })}
                type='text'
                placeholder='password' />
            {errors.password && <span>This field is required</span>}
            <input {...register("email", {
                required: "email is required",
                // validate: {
                //     notGmail: (value) =>
                //         !value.includes('@gmail.com') ? "" : 'Do not use gmail'
                // }
            })}
                type='text'
                placeholder='email' />
            {errors.email?.message}
            <input type="submit" />
        </StyledForm >
    );
}