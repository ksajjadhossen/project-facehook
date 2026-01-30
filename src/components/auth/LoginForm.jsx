import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { setAuth } = useAuth();
  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData,
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          console.log(`login time Auth token === ${authToken}`);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `user with the email "${formData.email}" is not found `,
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* email */}
      <Field label={"Email"} error={errors.email}>
        <input
          className={`auth-input ${errors.message ? "border-red-500" : "border-gray-200"} `}
          {...register("email", { required: "Email Id is required" })}
          type="email"
          name="email"
          id="email"
        />
      </Field>
      <Field label={"Password"} error={errors.password}>
        <input
          className={`auth-input ${errors.message ? "border-red-500" : "border-gray-200"} `}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "your password must be at least 8 characters. ",
            },
          })}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      <div className="text-red-600 mb-3">{errors?.root?.random?.message}</div>
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
