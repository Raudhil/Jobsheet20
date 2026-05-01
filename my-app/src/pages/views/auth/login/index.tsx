import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Tampilanlogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl = typeof query.callbackUrl === "string" ? query.callbackUrl : "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    if (!email) {
      setError("Email wajib diisi");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        form.reset();
        push(callbackUrl);
        return;
      }

      setError(res?.error || "Login failed");
    } catch {
      setError("wrong email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.login}>
      <h1 className={style.login__title}>Halaman login</h1>
      {error && <p className={style.login__error}>{error}</p>}
      <div className={style.login__form}>
        <form action="" onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label
              htmlFor="email"
              className={style.login__form__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className={style.login__form__input}
            />
          </div>

          <div className={style.login__form__item}>
            <label
              htmlFor="password"
              className={style.login__form__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              minLength={6}
              required
              className={style.login__form__input}
            />
          </div>
          <button type="submit" className={style.login__form__button}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={style.login__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in with Google"}
          </button>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl, redirect: false })}
            className={style.login__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in with GitHub"}
          </button>
        </form>
        <br />
        <p className={style.login__form__text}>
          Tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Tampilanlogin;