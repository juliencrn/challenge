import { useCallback, useMemo } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as yup from "yup"

import { login } from "../../lib/slices/userSlice"
import { LoginProps } from "../../types/User"
import Button from "../atoms/Button"
import { Fieldset } from "../atoms/FormUtils"
import TextInput from "../atoms/TextInput"

function useLoginForm() {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().email().defined(),
        password: yup.string().min(4).required(),
      }),
    []
  )

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = useCallback((values: LoginProps) => {
    dispatch(login(values))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  }
}

export default function LoginForm() {
  const { register, onSubmit, errors } = useLoginForm()

  return (
    <form onSubmit={onSubmit}>
      <Fieldset label="Email" error={errors.email?.message}>
        <TextInput {...register("email")} />
      </Fieldset>

      <Fieldset label="Mot de passe" error={errors.password?.message}>
        <TextInput type="password" {...register("password")} />
      </Fieldset>

      <Button type="submit" fullWidth>
        Connexion
      </Button>

      <Link href="/register">
        <a className="text-indigo-500 text-center block mt-3">Inscription</a>
      </Link>
    </form>
  )
}
