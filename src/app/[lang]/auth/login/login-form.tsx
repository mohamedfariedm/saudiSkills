"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CustomInput, SubmitBtnComponent } from "@/components/form";
import { useTranslation } from "react-i18next";
import { signInSchema, signInType } from "./sign-in.schema";
import { routes } from "@/constants/routes";

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();

  const { t } = useTranslation("signin");

  const schema = signInSchema(t);
  const methods = useForm<signInType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "admin@admin.com",
      password: "admin@123456",
    },
  });

  const onSubmit = ({ email, password }: signInType) => {
    startTransition(async () => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("response", { response });
      if (response?.ok) {
        toast.success(t("toasts.login_success"));
        methods.reset();
        window.location.assign(routes.dashboard.index);
      } else if (response?.error) {
        toast.error(t("toasts.login_error"));
      }
    });
  };

  return (
    <div className="w-full py-5 lg:py-10">
      <Link href="/dashboard" className="inline-block">
        <Image src="/assets/logo_en_wide.png" width={100} height={100} alt="logo" />
      </Link>
      <div className="2xl:mt-5 mt-3 2xl:text-3xl text-2xl font-bold text-default-900">
        {t("title")} 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        {t("subtitle")}{" "}
      </div>
      <FormProvider {...methods}>
        <form
          className="w-full space-y-1 mt-5"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <CustomInput
            name="email"
            className="w-full"
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            //ServerErrors={ServerErrors}
          />
          <CustomInput
            type="password"
            name="password"
            label={t("form.password.label")}
            placeholder={t("form.password.placeholder")}
            //ServerErrors={ServerErrors}
          />

          <SubmitBtnComponent
            disabled={!methods.formState.isValid || isPending}
            isPending={isPending}
            value={t("form.SubmitBtnComponent.value")}
            className="mt-0"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LogInForm;
