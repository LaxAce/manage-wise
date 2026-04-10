import Link from "next/link";

import Title from "@components/common/Title";
import { CookiesEnum } from "@constants/enums";
import { logout } from "./server-actions/authActions";
import { Logo, ThemeSwitcher } from "@components/common";
import { getCookie } from "./server-actions/cookieActions";

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Move tasks between columns in an instant. Your workflow, your pace.",
  },
  {
    icon: "🎯",
    title: "Stay Focused",
    description: "Subtasks break down complexity. See exactly how much is done at a glance.",
  },
  {
    icon: "🌙",
    title: "Built for You",
    description: "Light or dark — Managelly adapts to your environment and mood.",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    description: "Your boards are yours. Email verification keeps your account safe.",
  },
];


export default async function LandingPage() {
  const token = await getCookie(CookiesEnum.AUTH_TOKEN);

  return (
    <div className="min-h-screen bg-white-F4F7FD dark:bg-black-20212C duration-500 overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white-FFFFFF/80 dark:bg-gray-2B2C37/80 backdrop-blur-md border-b border-gray-E4EBFA dark:border-gray-3E3F4E">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>
            {token ?
              (
                <form
                  action={async () => {
                    "use server";
                    await logout();
                  }}
                  className="text-[13px] font-semibold text-gray-828FA3 hover:text-violet-635FC7 duration-200 px-4 py-2"
                >
                  <button>Logout</button>
                </form>
              ) :
              (<Link
                href="/login"
                className="text-[13px] font-semibold text-gray-828FA3 hover:text-violet-635FC7 duration-200 px-4 py-2"
              >
                Log in
              </Link>)}
            <Link
              href="/register"
              className="text-[13px] font-bold text-white-FFFFFF bg-violet-635FC7 hover:bg-violet-A8A4FF duration-200 px-5 py-2.5 rounded-full"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-635FC7/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-A8A4FF/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-635FC7/10 text-violet-635FC7 text-xs font-bold px-4 py-2 rounded-full mb-8 border border-violet-635FC7/20">
            <span className="w-1.5 h-1.5 bg-violet-635FC7 rounded-full animate-pulse" />
            Your personal task command center
          </div>

          <Title />

          <p className="text-lg text-gray-828FA3 max-w-xl mx-auto leading-relaxed mb-10">
            Managelly is a Kanban-style task manager that helps you ship more,
            stress less, and stay in full control of your work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="text-[15px] font-bold text-white-FFFFFF bg-violet-635FC7 hover:bg-violet-A8A4FF duration-200 px-8 py-4 rounded-full inline-flex items-center justify-center gap-2"
            >
              Start for free →
            </Link>
            {!token && (<Link
              href="/login"
              className="text-[15px] font-bold text-violet-635FC7 bg-violet-635FC7/10 hover:bg-violet-635FC7/20 duration-200 px-8 py-4 rounded-full inline-flex items-center justify-center"
            >
              Log in to my account
            </Link>)}
          </div>
        </div>

        {/* Mock board preview */}
        <div className="relative mt-20 max-w-5xl mx-auto w-full">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white-F4F7FD dark:from-black-20212C to-transparent z-10 pointer-events-none rounded-b-2xl" />
          <div className="bg-white-FFFFFF dark:bg-gray-2B2C37 rounded-2xl shadow-2xl border border-gray-E4EBFA dark:border-gray-3E3F4E overflow-hidden">
            {/* Mock navbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-E4EBFA dark:border-gray-3E3F4E">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-EA5555" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-bold dark:text-white-FFFFFF text-black-000112">Platform Launch</span>
              <div className="w-24 h-8 bg-violet-635FC7 rounded-full" />
            </div>
            {/* Mock columns */}
            <div className="flex gap-6 p-6 overflow-hidden h-64">
              {[
                { label: "TODO", color: "#49C4E5", count: 3 },
                { label: "DOING", color: "#8471F2", count: 4 },
                { label: "DONE", color: "#67E2AE", count: 3 },
              ].map((col) => (
                <div key={col.label} className="flex-shrink-0 w-[200px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                    <span className="text-xs font-bold text-gray-828FA3 tracking-widest">{col.label} ({col.count})</span>
                  </div>
                  {Array.from({ length: col.count }).map((_, i) => (
                    <div key={i} className="bg-white-F4F7FD dark:bg-black-20212C rounded-lg p-3 mb-3 shadow-sm">
                      <div className={`h-2.5 bg-gray-828FA3/20 rounded mb-2 ${i % 2 === 0 ? "w-full" : "w-4/5"}`} />
                      {i % 2 === 0 && <div className="h-2 bg-gray-828FA3/10 rounded w-2/3" />}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold dark:text-white-FFFFFF text-black-000112 mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-gray-828FA3 text-lg max-w-md mx-auto">
            Simple on the surface. Powerful underneath.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white-FFFFFF dark:bg-gray-2B2C37 border border-gray-E4EBFA dark:border-gray-3E3F4E rounded-2xl p-8 hover:border-violet-635FC7/50 duration-300 group"
            >
              <span className="text-4xl mb-4 block">{f.icon}</span>
              <h3 className="text-lg font-bold dark:text-white-FFFFFF text-black-000112 mb-2 group-hover:text-violet-635FC7 duration-200">
                {f.title}
              </h3>
              <p className="text-gray-828FA3 text-[13px] leading-[23px]">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-white-FFFFFF dark:bg-gray-2B2C37 duration-500">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold dark:text-white-FFFFFF text-black-000112 mb-4">
            Up and running in minutes
          </h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Create an account", desc: "Register with your email. We'll send a verification link." },
            { step: "02", title: "Build your boards", desc: "Create boards for your projects with custom columns." },
            { step: "03", title: "Track & ship", desc: "Add tasks, break them into subtasks, and move them to done." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-5xl font-bold text-violet-635FC7/20 mb-4">{item.step}</div>
              <h3 className="text-lg font-bold dark:text-white-FFFFFF text-black-000112 mb-2">{item.title}</h3>
              <p className="text-gray-828FA3 text-[13px] leading-[23px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center bg-violet-635FC7 rounded-3xl p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <h2 className="text-3xl font-bold text-white mb-4 relative">
            Ready to become great today?
          </h2>
          <p className="text-white/70 mb-8 relative">
            Join and start managing your tasks with clarity.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-violet-635FC7 font-bold px-8 py-4 rounded-full hover:bg-white-F4F7FD duration-200 relative"
          >
            Create your free account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-E4EBFA dark:border-gray-3E3F4E py-8 px-6 text-center text-gray-828FA3 text-xs">
        © {new Date().getFullYear()} Managelly. Built with purpose.
      </footer>
    </div>
  );
}