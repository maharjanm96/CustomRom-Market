"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
// import LogoButton from "./Buttons/LogoButtons";
import Link from "next/link";
import SocialButton from "@/components/Buttons/SocialButton";
import { Icons } from "@/components/ui/icons";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";

const signupSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name should be more than 5 characters" })
    .max(20, { message: "Name should not excced more than 20 characters" })
    .regex(/^[a-zA-Z\s]*$/, { message: "Name should contain only alphabets" }),
  contact: z
    .string()
    .min(10, { message: "Contact must not be less than 10 digits" })
    .max(10, { message: "Contact must not be long than 10 digits" })
    .regex(/^\d{10}$/, { message: "Contact should contain only digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        data
      );
      setLoading(false);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message) {
          toast.error("Already exists!");
        } else if (err.response.data.message) {
          toast.error("Already exists!");
        } else {
          form.setError("email", { message: err.response.data.email });
          form.setError("password", { message: err.response.data.password });
          form.setError("contact", { message: err.response.data.contact });
        }
      } else if (err.formErrors) {
        const formErrors = err.formErrors.fieldErrors;
        if (formErrors.email) {
          form.setError("email", { message: formErrors.email[0] });
        }
        if (formErrors.password) {
          form.setError("password", { message: formErrors.password[0] });
        }
        if (formErrors.contact) {
          form.setError("contact", { message: formErrors.contact[0] });
        }
      }
    }
  };

  return (
    <div className="flex justify-center m-4">
      <div className=" p-4 rounded-md border-2 w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription className="text-xs">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <div className="grid grid-cols-2 gap-6 mb-2">
          <SocialButton buttonText="Google" provider="google" />
          <SocialButton buttonText="GitHub" provider="github" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="98XXXXXXXX"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full rounded-sm" size="lg" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
            <span className="flex justify-center text-sm mt-4">
              Already have an account?
            </span>
            <Link href="/login">
              <span className="text-sm flex justify-center cursor-pointer underline">
                Login!
              </span>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
