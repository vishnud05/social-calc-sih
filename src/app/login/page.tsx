import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="grid place-items-center h-screen">
      <form className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border"
        />
        <button
          formAction={login}
          className="p-2 bg-blue-700 rounded-lg text-white"
        >
          Log in
        </button>
        <button
          formAction={signup}
          className="p-2 bg-blue-700 rounded-lg text-white"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
