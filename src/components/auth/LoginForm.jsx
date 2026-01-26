import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuth } = useAuth();
  const submitForm = (data) => {
    const user = { ...data };
    setAuth({ user });
    navigate("/");
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
      {/* Submit */}
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
