import Header from "../header/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-purple-600">Admin Dashboard</h1>
        <p>Only admins can access this page.</p>
      </div>
    </>
  );
}
