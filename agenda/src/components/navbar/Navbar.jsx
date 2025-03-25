import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-[#2f7ddf] text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:underline">Agenda</Link>
        </h1>

        <div className="flex gap-6 text-lg">
          <Link to="/cliente/listar" className="hover:underline">Clientes</Link>
          <Link to="/cliente/cadastrar" className="hover:underline">Cadastrar Cliente</Link>
          <Link to="/contato/cadastrar" className="hover:underline">Cadastrar Contato</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;