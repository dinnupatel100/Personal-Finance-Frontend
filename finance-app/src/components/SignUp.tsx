import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../images/Designer.png";
import { useToast } from '@chakra-ui/react'
import { useAddUser } from "../hooks/registration";
import { SignUpInitialValues, SignUpValidationSchema } from "../constants/constant";


const SignUp = () => {
  const { mutate , isPending} = useAddUser();

  const onSubmit = async(values:any) =>{
    await mutate(values);
  }

  return (
  <div className="flex h-screen bg-stone-200 ">
    <div className="Signup ml-14 my-14 shadow-2xl rounded-l-xl" 
      style={{
        width: "55%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
    </div>
      <div className="flex flex-1 mr-14 my-14 shadow-2xl flex-col justify-center pt-0 px-12 lg:px-8 w-1/3 bg-stone-100 rounded-r-xl">
        <h2 className="font-bold text-2xl text-center">
          Register your account
        </h2>

        <Formik
          initialValues={SignUpInitialValues}
          onSubmit={onSubmit}
          validationSchema={SignUpValidationSchema}
        >
          <Form className="">
            <div className="mb-4 mt-10">
              <label
                className="block text-gray-900 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <Field
                type="text"
                className="bg-transparent border-solid border-2 border-gray-400 shadow appearance-none rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                name="firstName"
              />
              <ErrorMessage name="firstName">
                {firstNameError => <p className="text-red-700 text-xs">{firstNameError}</p>}
              </ErrorMessage>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-900 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <Field
                type="text"
                className="bg-transparent border-solid border-2 border-gray-400 shadow appearance-none rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                name="lastName"
              />
              <ErrorMessage name="lastName">
                {lastNameError => <p className="text-red-700 text-xs">{lastNameError}</p>}
              </ErrorMessage>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-900 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                type="email"
                className="bg-transparent border-solid border-2 border-gray-400 shadow appearance-none rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
              />
              <ErrorMessage name="email">
                {emailError => <p className="text-red-700 text-xs">{emailError}</p>}
              </ErrorMessage>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-900 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                type="password"
                className="bg-transparent border-solid border-2 border-gray-400 shadow appearance-none rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:"
                id="password"
                name="password"
              />
              <ErrorMessage name="password">
                {passwordError => <p className="text-red-700 text-xs">{passwordError}</p>}
              </ErrorMessage>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-20"
                type="submit"
                disabled={isPending}
              >
                {isPending? 'Submitting': 'Sign Up'}
              </button>
              <Link to='..\signin' className="hover:underline">Already have an account?</Link>
            </div>
          </Form>
        </Formik>
      </div>
      
    </div>
  );
};

export default SignUp;
