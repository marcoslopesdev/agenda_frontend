import Popup from 'reactjs-popup';
import FormularioContato from '../formulariocontato/FormularioContato';

import 'reactjs-popup/dist/index.css';
import './ModalContato.css'

function ModalContato() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Novo Contato
                    </button>
                }
                modal
            >
                <FormularioContato />
            </Popup>
        </>
    );
}

export default FormularioContato;