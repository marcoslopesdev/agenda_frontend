import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import ListaClientes from './components/clientes/listaclientes/ListaClientes'
import FormularioCliente from './components/clientes/formulariocliente/FormularioCliente'
import DeletarCliente from './components/clientes/deletarcliente/DeletarCliente'
import ListaContato from './components/contatos/listacontatos/ListaContatos'
import FormularioContato from './components/contatos/formulariocontato/FormularioContato'
import DeletarContato from './components/contatos/deletarcontato/DeletarContato'
import Contatos from './pages/Contatos';
import ContatosCliente from './pages/ContatosCliente';


import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cliente/listar" element={<ListaClientes />} />
            <Route path="/cliente/cadastrar" element={<FormularioCliente />} />
            <Route path="/cliente/atualizar/:id" element={<FormularioCliente />} />
            <Route path="/cliente/deletar/:id" element={<DeletarCliente />} />
            <Route path="/contato/listar" element={<ListaContato />} />
            <Route path="/contato/cadastrar" element={<FormularioContato />} />
            <Route path="/contato/atualizar/:id" element={<FormularioContato />} />
            <Route path="/contato/deletar/:id" element={<DeletarContato />} />
            <Route path="/cliente/contatos/listar/:id" element={<Contatos />} />
            <Route path="/cliente/contatos/:id" element={<ContatosCliente />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}


export default App