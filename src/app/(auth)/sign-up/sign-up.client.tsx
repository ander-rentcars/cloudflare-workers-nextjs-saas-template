"use client";

import { signUpAction } from "./sign-up.actions";
import { type SignUpSchema, signUpSchema } from "@/schemas/signup.schema";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { useEffect } from "react";
import Link from "next/link";

const SignUpPage = () => {
  const { execute: signUp, error } = useServerAction(signUpAction)
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    toast.dismiss()

    if (error) {
      toast.error(error.message)
    }
  }, [error]);

  const onSubmit = async (data: SignUpSchema) => {
    toast.promise(signUp(data), {
      loading: "Creating your account...",
      success: "Account created successfully",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-10 bg-card rounded-xl shadow-lg border border-border">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:text-primary/90">
              Sign in
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-3 py-2"
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
                  <FormLabel className="text-sm font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full flex justify-center py-2.5"
            >
              Create Account
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <p className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="font-medium text-primary hover:text-primary/90">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary hover:text-primary/90">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
