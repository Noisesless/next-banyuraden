import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginSearchParams = {
    error?: string;
    callbackUrl?: string;
};

const errorMessage = (code?: string) => {
    if (!code) return null;
    if (code === "CredentialsSignin") return "Email atau kata sandi tidak valid.";
    return "Gagal login. Silakan coba lagi.";
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams?: Promise<LoginSearchParams>;
}) {
    const resolvedParams = searchParams ? await searchParams : undefined;
    async function loginAction(formData: FormData) {
        "use server";

        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");
        const rawCallback = String(formData.get("callbackUrl") || "/");
        const callbackUrl = rawCallback.startsWith("/") && !rawCallback.startsWith("//") ? rawCallback : "/";

        if (!email || !password) {
            redirect("/login?error=CredentialsSignin");
        }

        try {
            await signIn("credentials", { email, password, redirectTo: callbackUrl });
        } catch (err) {
            if (err instanceof AuthError) {
                redirect(`/login?error=${encodeURIComponent(err.type)}&callbackUrl=${encodeURIComponent(callbackUrl)}`);
            }
            throw err;
        }
    }

    const message = errorMessage(resolvedParams?.error);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mx-auto w-full max-w-md">
                <Card>
                    <CardHeader className="space-y-2">
                        <CardTitle>Masuk</CardTitle>
                        <CardDescription>Masuk untuk mengakses fitur internal.</CardDescription>
                        {message ? <p className="text-sm text-destructive">{message}</p> : null}
                    </CardHeader>
                    <CardContent>
                        <form action={loginAction} className="space-y-4">
                            <input type="hidden" name="callbackUrl" value={(resolvedParams?.callbackUrl?.startsWith("/") && !resolvedParams?.callbackUrl?.startsWith("//")) ? resolvedParams.callbackUrl : "/"} />
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nama@domain.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Kata Sandi</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Masuk
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
