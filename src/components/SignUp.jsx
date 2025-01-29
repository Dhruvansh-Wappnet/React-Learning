import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/ApiService';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications


const SignUp = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, 'First Name must be at least 2 characters'),
    //   .required('First Name is required'),
    last_name: Yup.string()
      .min(2, 'Last Name must be at least 2 characters'),
    //   .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    user_type: Yup.string().required('User Type is required'),
  });

  // Initial values for Formik form
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: '',
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post('api/register/', values);
      if (response.status === 201) {
        navigate('/login'); // Redirect to login page on success
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        const emailErrorMessage = error.response.data.email[0];
        // setErrors({ email: emailErrorMessage });
        // Show the error message as a toast
        toast.error(emailErrorMessage); // Use react-toastify to display the error as a toast
      } else {
        toast.error({ submit: 'Signup failed, please try again.' });
      }
      console.error('Signup error:', error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-600">First Name</label>
                <Field
                  id="first_name"
                  name="first_name"
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-600">Last Name</label>
                <Field
                  id="last_name"
                  name="last_name"
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label htmlFor="user_type" className="block text-sm font-medium text-gray-600">User Type</label>
                <Field as="select" id="user_type" name="user_type" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select User Type</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="organization">Organization</option>
                  {/* <option value="admin">Admin</option> */}
                </Field>
                <ErrorMessage name="user_type" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {errors.submit && <div className="text-red-500 text-sm mt-4">{errors.submit}</div>}

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
