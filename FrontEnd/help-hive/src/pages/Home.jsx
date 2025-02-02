import "../App.css";
import bgImage from "../assets/BG.jpg";
import Button from "../components/Button";

function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <header className="text-center mb-8 mt-16">
        <h1 className="text-5xl font-bold text-blue-500 mb-4">
          Welcome to HelpHive
        </h1>
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          The Volunteer Network
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl">
          A platform where volunteers and organizations come together to create
          meaningful change. Join us and make an impact today.
        </p>
      </header>
      <main className="text-center">
        {

        <Button/>}
         <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-6">
          Why us?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl">
          If you want to volunteer, host a campaign, or connect with others,
          HelpHive is your perfect platform.
        </p>
      </main>
      <footer className="mt-auto text-center text-gray-600 text-sm">
        <p>&copy; 2025 HelpHive. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
