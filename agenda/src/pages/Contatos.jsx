import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Contatos() {
  const { id } = useParams();
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/contatos/cliente/${id}`);
        setContatos(response.data);
      } catch (err) {
        setError('Erro ao carregar os contatos');
      } finally {
        setLoading(false);
      }
    };

    fetchContatos();
  }, [id]);

  if (loading) return <p>Carregando contatos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Contatos do Cliente {id}</h1>
      {contatos.length === 0 ? (
        <p>Não há contatos para este cliente.</p>
      ) : (
        <ul>
          {contatos.map((contato) => (
            <li key={contato.id}>{contato.nome} - {contato.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Contatos;