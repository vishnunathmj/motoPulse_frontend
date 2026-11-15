import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      <header className="h-18 bg-[#17252B] flex items-center justify-center px-4">
        <div className="text-xl font-bold tracking-tight text-white">
          MotoPulse
        </div>
      </header>

      <main className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-12 sm:px-6">
        <section className="w-full max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17252B]">
            About MotoPulse
          </h1>
          <p className="mt-5 text-sm sm:text-base leading-7 text-slate-600">
            MotoPulse is a smart vehicle maintenance and fuel tracking application that helps you manage your vehicles, monitor fuel expenses, track maintenance records, and stay updated with important reminders.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="inline-flex min-w-28 items-center justify-center rounded-xl bg-[#0F9D91] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0D887E] focus:outline-none focus:ring-2 focus:ring-[#0F9D91] focus:ring-offset-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex min-w-28 items-center justify-center rounded-xl border border-[#0F9D91] bg-white px-5 py-2.5 text-sm font-semibold text-[#0A7067] transition-colors hover:bg-[#E6F5F4] focus:outline-none focus:ring-2 focus:ring-[#0F9D91] focus:ring-offset-2"
            >
              Register
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
