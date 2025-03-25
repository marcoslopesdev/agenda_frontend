import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {
    let data = new Date().getFullYear()

    return (
        <div className="flex justify-center bg-[#2f7ddf] text-white py-2">
            <div className="container flex flex-row items-center justify-between px-4">
                <p className='text-sm font-semibold'>
                    Agenda - Comércio S.A. | Copyright: {data}
                </p>
                <div className='flex items-center gap-2 text-sm'>
                    <span>Desenvolvido por Marcos Lopes</span>
                    <a href="https://www.linkedin.com/in/marcosaflopes/" target="_blank">
                        <LinkedinLogo size={20} weight='bold' />
                    </a>
                    <a href="https://github.com/marcoslopesdev" target="_blank">
                        <GithubLogo size={20} weight='bold' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer