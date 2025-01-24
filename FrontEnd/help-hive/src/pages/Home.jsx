import "../App.css";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-purple-200 p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-500 mb-4">
          Welcome to HelpHive
        </h1>
        <h2 className="text-5xl font-bold text-green-500 mb-4">
          The volunteer Network
        </h2>
        <p className="text-lg text-gray-700 max-w-xl">
          A platform where volunteers and organizations come together.
        </p>
      </header>
      <main className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Get Started
        </h2>
        <p className="text-gray-600 mb-8">
          Whether you want to volunteer, host a campaign or connect with other
          volunteers, HelpHive is the app for you.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 space-x-0 md:space-x-4 mx-6 md:mx-0">
          <button className="bg-orange-400 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-500 transition">
            Join as Organizer
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition">
            Explore
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition">
            Join as Volunteer
          </button>
        </div>
      </main>
      <footer className="mt-12 text-gray-600 text-sm">
        <p>&copy; 2025 HelpHive. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
