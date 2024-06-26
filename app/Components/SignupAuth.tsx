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
import LogoButton from "./Buttons/LogoButtons";
import Link from "next/link";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export function SignupAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        data
      );
      setLoading(false);
      toast.success("Signup successful!");
      router.push("/auth/login");
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message === "User already exists") {
          toast.error("Email already exists");
          // toast.error("Email already exists!", {
          //   className: "bg-red-500 text-white text-lg",
          // });
        } else {
          form.setError("email", { message: err.response.data.email });
          form.setError("password", { message: err.response.data.password });
        }
      } else if (err.formErrors) {
        const formErrors = err.formErrors.fieldErrors;
        if (formErrors.email) {
          form.setError("email", { message: formErrors.email[0] });
        }
        if (formErrors.password) {
          form.setError("password", { message: formErrors.password[0] });
        }
      }
    }
  };

  return (
    <div className="flex justify-center m-6 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-auto ">
        <Form {...form}>
          <FormLabel className="flex justify-center text-2xl text-black font-bold py-2">
            Sign Up
          </FormLabel>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="black"
              size="full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign Up"}
            </Button>
            <FormLabel className="flex justify-center text-gray-500">
              or continue with
            </FormLabel>
            <LogoButton
              logoSrc="/assets/google-logo.jpg"
              altText="Google Logo"
              buttonText="Google"
            />
            <LogoButton
              logoSrc="/assets/github-logo.webp"
              altText="GitHub Logo"
              buttonText="GitHub"
            />
            <span className="flex justify-center text-sm mt-4">
              Already have an account ?
            </span>
            <Link href="/auth/login">
              <span className="text-sm flex justify-center cursor-pointer underline">
                Login!
              </span>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
