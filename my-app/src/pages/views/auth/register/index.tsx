import Link from "next/link";
import style from "./Register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string).trim();
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      if (response.status === 200) {
        form.reset();
        push("/auth/login");
        return;
      }

      let errorMessage = "An error occurred";
      try {
        const data = (await response.json()) as { name?: string };
        if (data?.name) {
          errorMessage = data.name;
        }
      } catch {
        if (response.status === 400) {
          errorMessage = "Email already exists";
        }
      }

      setError(errorMessage);
    } catch {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>
      {error && <p className={style.register__error}>{error}</p>}
      <div className={style.register__form}>
        <form action="" onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label
              htmlFor="email"
              className={style.register__form__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className={style.register__form__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label
              htmlFor="Fullname"
              className={style.register__form__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label
              htmlFor="Password"
              className={style.register__form__label}
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              minLength={6}
              required
              className={style.register__form__input}
            />
          </div>
          <button type="submit" className={style.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <br />
        <p className={style.register__form__text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;