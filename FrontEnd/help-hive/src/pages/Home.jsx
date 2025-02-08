import bgImage from "../assets/BG.png";
import Button from "../components/Button";

function Home() {
  return (
    <div
      className="flex flex-col items-left justify-start min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="ml-10">
        <header className="text-left mt-16">
          <h1 className="text-6xl font-bold text-black mb-4">
            Welcome to HelpHive
          </h1>
          <h2 className="text-3xl font-semibold text-black mb-4">
            The Volunteer Network
          </h2>
        </header>
        <main className="text-left">
          <div className="bg-white rounded-lg p-6 max-w-2xl mb-8 shadow-lg border-orange-500 border-2 mt-10 md:mt-20">
            <p className="text-lg text-gray-900 mb-5">
              A platform where volunteers and organizations come together to
              create meaningful change. Join us and make an impact today.
            </p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition">
              Explore
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 max-w-xl shadow-lg border-orange-500 border-2">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              Why us?
            </h2>
            <p className="text-gray-900 mb-5">
              If you want to volunteer, host a campaign, or connect with others,
              HelpHive is your perfect platform.
            </p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition">
              Join us
            </button>
          </div>
        </main>
      </div>
      <footer className="mt-5 md:mt-auto text-center text-white text-sm">
        <p>&copy; 2025 HelpHive. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
