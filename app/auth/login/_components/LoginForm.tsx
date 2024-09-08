"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import SocialButton from "@/components/Buttons/SocialButton";
import { toast } from "sonner";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setLoading(true);
      const formData = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      await login(formData, callbackUrl).then((response) => {
        if (!response) {
          toast.success("Welcome to ROM Market");
        }
        if (response?.error) {
          toast.error(response.error);
        }
        setLoading(false);
      });
    } catch (error: any) {
      toast.error(`${error.message}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg w-auto">
        <Form {...form}>
          <h2 className="flex justify-start text-3xl text-black font-bold py-2">
            Login
          </h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      {...field}
                      type="email"
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              variant={"default"}
              type="submit"
              className="w-full"
            >
              Login
            </Button>

            <span className="flex justify-center text-sm mt-4">
              Don't have an account?
            </span>
            <Link href="/auth/signup">
              <span className="text-sm flex justify-center cursor-pointer underline">
                Sign Up!
              </span>
            </Link>
            <div className="flex justify-center text-gray-500">
              or continue with
            </div>
          </form>
        </Form>
        <div className="mt-2 space-y-2">
          <SocialButton buttonText={"Google"} provider={"google"} />
        </div>
      </div>
    </div>
  );
}
