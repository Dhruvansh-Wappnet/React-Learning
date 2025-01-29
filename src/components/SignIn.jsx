import React from 'react';
import { useDispatch } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import  { useApiClient } from '../api/ApiService';
import { toast } from 'react-toastify';
import { login } from '../features/loginUserSlice';

const SignIn = () => {
  const apiClient = useApiClient();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignIn = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post('api/login/', {
        email: values.email,
        password: values.password,
      });

      // If API call is successful, navigate to the dashboard
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        navigate('/dashboard');

        dispatch(login(response.data));

        // If API call is successful, it first displays the toast message on the sign-in page (full toast message) and then navigates to the dashboard
        // toast.success(response.data.message, {
          // onClose: () => navigate('/dashboard'),
        // });

        // If API call is successful, navigate to the dashboard and then display the toast message on the dashboard
        // navigate('/dashboard', { state: { toastMessage: response.data.message } });

      }
    } catch (error) {
      console.log(error);
      
      // Handle API error
      if (error.response && error.response.data) {
        const userNotActive = error.response.data.non_field_errors[0] || 'Invalid credentials';
        toast.error(userNotActive);
        // setErrors({ email: error.response.data.non_field_errors || 'Invalid credentials' });
      } else {
        setErrors({ email: 'Something went wrong. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
