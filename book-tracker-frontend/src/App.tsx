import { BookOpen, Eye, Pencil, Plus, Star, Trash } from 'lucide-react'
import './style.css'
import { useEffect, useState } from 'react'

type Book = {
  id: number;
  name: string;
  author: string;
  genre: string;
  pages: number;
  currentPage: number;
  status: number | string;
  rating: number;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);

  async function fetchBooks() {
    const response = await fetch('http://localhost:5040/api/books');
    const data = await response.json();
    setBooks(data);
  }

  useEffect(() => {
    fetchBooks()
  }, []);

  return (
    <main className='min-h-svh px-14 py-6'>
      {isOpenCreateDialog && (
        <dialog className='block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 p-6 z-10 size-full'>
          <div className='bg-white p-6 rounded-md'>
            <form>
              <h2 className='text-lg font-bold'>Adicionar Livro</h2>
              <p className='text-sm text-zinc-500'>Adicione um novo livro à sua coleção. Preencha os detalhes abaixo.</p>

              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="name">Nome do Livro</label>
                    <input className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="text" placeholder='Nome do Livro' />
                  </div>
                  <div>
                    <label className='text-sm font-medium block' htmlFor="author">Autor(a)</label>
                    <input className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="text" placeholder='Autor(a)' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="genre">Gênero</label>
                    <input className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="text" placeholder='Gênero' />
                  </div>
                  <div>
                    <label className='text-sm font-medium block' htmlFor="pages">Páginas</label>
                    <input className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="number" placeholder='Páginas' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="currentPage">Página atual</label>
                    <input className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="number" placeholder='Página atual' />
                  </div>
                  <div>
                    <label className='text-sm font-medium block' htmlFor="status">Status</label>
                    <select name="status" id="status" className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200'>
                      <option value="0">Para ler</option>
                      <option value="1">Lendo</option>
                      <option value="2">Finalizado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="rating">Avaliação</label>
                    <input type="range" className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' min={0} max={5} />
                  </div>
                </div>
              </div>

              <div className='flex gap-2 mt-6 justify-end'>
                <button type="button" onClick={() => setIsOpenCreateDialog(false)} className='border border-zinc-200 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-200 hover:text-zinc-700 transition-colors hover:cursor-pointer'>Cancelar</button>
                <button type="submit" className='bg-black text-white text-sm font-medium px-3 py-2 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
                  Adicionar livro
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      <header className='flex justify-between items-center flex-wrap gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Gerenciador de Livros</h1>
          <p className='text-zinc-500'>Gerencie sua coleção de livros</p>
        </div>
        <div>
          <button onClick={() => setIsOpenCreateDialog(true)} className='flex gap-2 items-center bg-black text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
            <Plus strokeWidth={1.5} size={18} />
            Adicionar livro
          </button>
        </div>
      </header>

      <section className='mt-6 border border-zinc-200 rounded-md p-6'>
        <span className='flex items-center gap-2 flex-wrap'>
          <BookOpen size={20} />
          <h1 className='text-2xl font-semibold'>Coleção de livros</h1>
        </span>
        <p className='text-sm text-zinc-500'>N livros em sua coleção</p>

        <div className='mt-6'>
          <div className='overflow-auto rounded-md border border-zinc-200'>
            <table className='w-full'>
              <thead className='border-b border-zinc-200'>
                <tr className='hover:bg-zinc-100 transition-colors text-sm text-zinc-500'>
                  <th className='font-medium px-4 h-12 text-left'>Nome</th>
                  <th className='font-medium px-4 h-12 text-left'>Autor(a)</th>
                  <th className='font-medium px-4 h-12 text-left'>Gênero</th>
                  <th className='font-medium px-4 h-12 text-left'>Páginas</th>
                  <th className='font-medium px-4 h-12 text-left'>Página atual</th>
                  <th className='font-medium px-4 h-12 text-left'>Status</th>
                  <th className='font-medium px-4 h-12 text-left'>Avaliação</th>
                  <th className='font-medium px-4 h-12 text-right'>Ações</th>
                </tr>
              </thead>
              <tbody className='text-sm font-medium [&_tr:last-child]:border-0'>
                <tr className='border-b border-zinc-200 hover:bg-zinc-100 transition-colors'>
                  <td className='p-4'>Nome do Livro</td>
                  <td className='p-4'>Editora</td>
                  <td className='p-4'>Quantidade</td>
                  <td className='p-4'>Quantidade</td>
                  <td className='p-4'>Quantidade</td>
                  <td className='p-4'>Quantidade</td>
                  <td className='p-4'>Quantidade</td>
                  <td className='p-4 flex justify-end gap-2'>
                    <button className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
                      <Eye size={17}/>
                    </button>
                    <button className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
                      <Pencil size={17}/>
                    </button>
                    <button className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
                      <Trash size={17}/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
