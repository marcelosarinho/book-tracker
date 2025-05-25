import { BookOpen, Plus } from 'lucide-react'
import './style.css'

function App() {

  return (
    <main className='min-h-svh px-14 py-6'>
      <header className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Gerenciador de Livros</h1>
          <p className='text-zinc-500'>Gerencie sua coleção de livros</p>
        </div>
        <div>
          <button className='flex gap-2 items-center bg-black text-white text-sm font-medium px-4 py-2.5 rounded'>
            <Plus strokeWidth={1.5} size={18} />
            Adicionar livro
          </button>
        </div>
      </header>

      <section className='mt-6 border border-zinc-200 rounded-md p-6'>
        <span className='flex items-center gap-2'>
          <BookOpen size={20} />
          <h1 className='text-2xl font-semibold'>Coleção de livros</h1>
        </span>
        <p className='text-sm text-zinc-500'>N livros em sua coleção</p>

        <div className='mt-6'>
          <table className='rounded-sm'>
            <thead className='border'>
              <tr className='hover:bg-zinc-100 transition-colors text-sm text-zinc-500'>
                <th className='font-medium'>Nome</th>
                <th className='font-medium'>Autor(a)</th>
                <th className='font-medium'>Gênero</th>
                <th className='font-medium'>Páginas</th>
                <th className='font-medium'>Página atual</th>
                <th className='font-medium'>Status</th>
                <th className='font-medium'>Avaliação</th>
                <th className='font-medium'>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border'>
                <td>Nome do Livro</td>
                <td>Editora</td>
                <td>Quantidade</td>
              </tr>
              <tr className='border'>
                <td>Nome do Livro</td>
                <td>Editora</td>
                <td>Quantidade</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
