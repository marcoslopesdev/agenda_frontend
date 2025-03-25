import imgFundo from "../../assets/img-fundo.png"

function Home() {
    return (
        <>
            <div className="[background-color:#97d5fb] flex justify-center mt-12 homeBanner">
                <div className="grid grid-cols-2 w-full text-[#2f7ddf]">
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Agenda de Contatos!
                        </h2>
                        <p className='text-xl'>
                            Conecte, organize e nunca perca um número importante!
                        </p>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src={imgFundo}
                            alt="Imagem Página Home"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home