// SignUpForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

// The context is how you can access the global
// state 
import { UserContext } from '../../contexts/UserContext';

import { signUp } from '../../services/authService';

const SignUpForm = () => {
    // navigate is a function that takes in a path 
    // we defined on one of our routes

    // consume the context! 
    // here we can destructure setUser, or user state
    const {setUser} = useContext(UserContext)

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });

    const { username, password, passwordConf } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });

    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            // signUp is from our authService
            const newUser = await signUp(formData)
            // updating the UserContext user state!
            setUser(newUser)
            console.log(newUser, " <- new User (decoded jwt token)")
        } catch (err) {
            console.log(err)
            // update the state to whatever the error message is 
            // to display to the user
            setMessage(err.message)
        }

        console.log(formData); // this line will print the form data to the console
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='name'
                        value={username}
                        name='username'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='confirm'>Confirm Password:</label>
                    <input
                        type='password'
                        id='confirm'
                        value={passwordConf}
                        name='passwordConf'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    );
};

export default SignUpForm;
