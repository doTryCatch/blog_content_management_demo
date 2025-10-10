import LoginForm from "@/components/loginForm";
import Image from "next/image";
import LandingPageImage from "@/public/contentManagement.png";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-svh grid md:grid-cols-2 bg-background text-foreground">
      {/* Left: Form */}
      <section className="flex justify-center px-6 py-12 m-10 md:px-10">
        <div className="w-full max-w-md">
          <h1 className="sr-only">Sign in</h1>
          <div className="mb-8">
            <p className="text-2xl font-semibold text-balance">
              Sign in to your account
            </p>
            <p className="text-muted-foreground">
              We’re excited to see what you’ll accomplish next.
            </p>
          </div>
          <LoginForm />
          {/* Sign up option */}
          <div className="mt-4 text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </section>

      {/* Right: Illustration */}
      <section className="hidden md:flex items-center justify-center bg-secondary text-secondary-foreground">
        <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-6">
          <div className="max-w-md text-center space-y-3">
            <p className="text-xs rounded-full border border-border px-2 py-1 text-muted-foreground">
              Demo Frontend — Blog Content Manager (Internship Assignment)
            </p>
            <h2 className="text-xl font-semibold text-balance">
              Passionate to get hired and contribute
            </h2>
            <p className="text-muted-foreground text-pretty">
              I'm eager to join your company, ship quality work, and grow fast —
              this demo UI presents a blog content manager.
            </p>
          </div>
          <Image
            src={LandingPageImage}
            alt="Passionate job seeker showcasing portfolio and interviewing to get hired"
            className="max-w-full h-auto scale-125"
          />
        </div>
      </section>
    </main>
  );
}
