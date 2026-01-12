import logo from "../assets/images/logo.png";

export default function Header({ userName }) {
  return (
    <header className="bg-[#6C8F77] px-6 pb-6 pt-6 text-white">
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Sizzler" className="h-10" />
      </div>
      <h1 className="text-center text-lg font-semibold">
        Good Afternoon, {userName}
      </h1>
    </header>
  );
}
