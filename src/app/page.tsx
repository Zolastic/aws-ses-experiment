import SendEmail from "@/components/SendEmail";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] text-slate-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-700 sm:text-[5rem]">
          AWS-<span className="text-slate-400">SES</span> APP
        </h1>
        <SendEmail />
      </div>
    </main>
  );
}
