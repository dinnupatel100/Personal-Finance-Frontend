import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import image from "../images/Designer.png";
import { SignIninitialValues, SignInvalidationSchema } from "../constants/constant";
import { useLoginUser } from "../hooks/registration";


const SignIn = () => {
  const { mutate , isPending} = useLoginUser();

  const onSubmit = (values:any) =>{
   mutate(values);
  }

  return (
  <div className="flex h-screen bg-stone-200">
    <div className="Signin ml-14 my-14 shadow-2xl rounded-l-xl" 
      style={{width: "55%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
    </div>
      <div className="flex flex-1 mr-14 my-14 shadow-2xl flex-col justify-center pt-0 px-12 lg:px-8 w-1/3 bg-stone-100 rounded-r-xl">
        <h2 className="font-bold text-2xl text-center">
          Sign in to your account
        </h2>
        <Formik
          initialValues={SignIninitialValues}
          onSubmit={onSubmit}
          validationSchema={SignInvalidationSchema}
        >
          <Form className="">
            <div className="mb-4 mt-12">
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
            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-20"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Submitting' : 'Sign In'}
              </button>
              <Link to='..\signup' className="hover:underline">Don't have an account?</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};


export default SignIn;