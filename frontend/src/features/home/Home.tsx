import Header from "../header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-green-600">Welcome to Home Page</h1>
        <p>You are logged in as a regular user.</p>
      </div>
    </>
  );
}
