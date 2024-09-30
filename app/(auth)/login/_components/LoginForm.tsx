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
import { useState, Suspense } from "react";
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import SocialButton from "@/components/Buttons/SocialButton";
import { toast } from "sonner";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function LoginFormContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [loading, setLoading] = useState(false);

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
    <div className="flex justify-center m-4">
      <div className=" p-4 rounded-md border-2 w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-xs">
            Enter your credentials to continue
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button
              disabled={loading}
              variant={"default"}
              type="submit"
              className="w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <span className="flex justify-center text-sm mt-4">
              Don&apos;t have an account?
            </span>
            <Link href="/signup">
              <span className="text-sm flex justify-center cursor-pointer underline">
                Sign Up!
              </span>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
