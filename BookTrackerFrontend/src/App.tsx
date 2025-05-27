import { BookOpen, CircleCheck, CircleX, Eye, Pencil, Plus, Star, Trash } from 'lucide-react'
import './style.css'
import { useEffect, useState } from 'react'
import { Modal } from '../components/Modal'

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  currentPage: number;
  status: number | string;
  rating: number;
}

const Status: { [key: number]: string } = {
  0: 'Para ler',
  1: 'Lendo',
  2: 'Finalizado'
}

const StatusColors: { [key: number]: string } = {
  0: 'bg-zinc-200',
  1: 'bg-blue-200',
  2: 'bg-green-200'
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    genre: '',
    pages: 0,
    currentPage: 0,
    status: 0,
    rating: 0,
  });
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = useState(false);
  const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenViewDialog, setIsOpenViewDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successDescription, setSuccessDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  async function fetchBooks() {
    const response = await fetch('http://localhost:5040/api/books');
    const data = await response.json();
    setBooks(data);
  }

  async function findBook(id: number) {
    const response = await fetch(`http://localhost:5040/api/books/${id}`);
    const data = await response.json();

    setBook(data);
    setIsOpenCreateDialog(true);
  }

  function openCreateBookDialog() {
    setIsOpenCreateDialog(true);
    setBook({
      id: 0,
      title: '',
      author: '',
      genre: '',
      pages: 0,
      currentPage: 0,
      status: 0,
      rating: 0,
    });
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setBook((book) => ({
      ...book,
      [name]: value,
    }))
  }

  async function handleSubmitBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      book.rating = Number(book.rating);
      book.status = Number(book.status);

      await fetch('http://localhost:5040/api/books' + (book.id ? `/${book.id}` : ''), {
        method: book.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      setIsOpenSuccessDialog(true);
      setSuccessMessage('Livro ' + (book.id ? 'editado' : 'adicionado') + ' com sucesso!');
      setSuccessDescription('O livro ' + book.title + ' foi ' + (book.id ? 'editado' : 'adicionado') + ' na sua coleção.');
      fetchBooks();
    } catch (error) {
      setErrorMessage('Erro ao ' + (book.id ? 'editar' : 'adicionar') + ' livro!');
      setErrorDescription('Ocorreu um erro ao ' + (book.id ? 'editar' : 'adicionar') + ' o livro ' + book.title + ' na sua coleção.');
      setIsOpenErrorDialog(true);
      console.log(error);
    } finally {
      setIsOpenCreateDialog(false);
      setBook({
        id: 0,
        title: '',
        author: '',
        genre: '',
        pages: 0,
        currentPage: 0,
        status: 0,
        rating: 0,
      });
    }
  }

  async function deleteBook(id: number) {
    try {
      await fetch(`http://localhost:5040/api/books/${id}`, {
        method: 'DELETE',
      });

      setIsOpenSuccessDialog(true);
      setSuccessMessage('Livro removido com sucesso!');
      setSuccessDescription('O livro ' + book.title + ' foi removido da sua coleção.');

      fetchBooks();
    } catch (error) {
      setErrorMessage('Erro ao remover livro!');
      setErrorDescription('Ocorreu um erro ao remover o livro ' + book.title + ' da sua coleção.');
      setIsOpenErrorDialog(true);
      console.log(error);
    } finally {
      setIsOpenDeleteDialog(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className='min-h-svh lg:px-14 md:px-10 px-6 lg:py-6 md:py-4 py-2'>
      {isOpenCreateDialog && (
        <Modal>
          <Modal.Header>
            <Modal.Title>{book.id ? 'Editar Livro' : 'Adicionar Livro'}</Modal.Title>
            <Modal.Description>{book.id ? 'Edite os detalhes do livro da sua coleção.' : 'Adicione um novo livro à sua coleção.'} Preencha os detalhes abaixo.</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <form id='create-book-form' onSubmit={handleSubmitBook}>
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="title">Livro</label>
                    <input id='title' name='title' value={book.title} onChange={handleChangeInput} className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="text" placeholder='Livro' />
                  </div>
                  <div>
                    <label className='text-sm font-medium block' htmlFor="author">Autor(a)</label>
                    <input id='author' name='author' value={book.author} onChange={handleChangeInput} className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="text" placeholder='Autor(a)' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="genre">Gênero</label>
                    <input id='genre' name='genre' value={book.genre} onChange={handleChangeInput} className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="text" placeholder='Gênero' />
                  </div>
                  <div>
                    <label className='text-sm font-medium block' htmlFor="pages">Páginas</label>
                    <input id='pages' name='pages' value={book.pages} onChange={handleChangeInput} className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="number" placeholder='Páginas' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="currentPage">Página atual</label>
                    <input id='currentPage' name='currentPage' value={book.currentPage} onChange={handleChangeInput} className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200' type="number" placeholder='Página atual' />
                  </div>
                  <div>
                    <label className='text-sm font-medium block' htmlFor="status">Status</label>
                    <select id='status' name="status" value={book.status} onChange={handleChangeInput} className='mt-2 text-sm w-full p-2 rounded-md border border-zinc-200'>
                      <option value="0">Para ler</option>
                      <option value="1">Lendo</option>
                      <option value="2">Finalizado</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-sm font-medium block' htmlFor="rating">Avaliação</label>
                    <div className='flex gap-1 mt-2'>
                      {[1, 2, 3, 4, 5].map((ratingNumber) => (
                        <Star
                          className='hover:cursor-pointer'
                          key={ratingNumber}
                          strokeWidth={1.5}
                          fill={ratingNumber <= book.rating ? 'black' : 'none'}
                          onClick={() => setBook((book) => ({ ...book, rating: ratingNumber }))}
                        />
                      ))}
                    </div>
                    <input
                      id='rating'
                      name='rating'
                      className='hidden'
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      defaultValue={book.rating}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setIsOpenCreateDialog(false)}
              className='border border-zinc-200 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-200 hover:text-zinc-700 transition-colors hover:cursor-pointer'>
              Cancelar
            </button>
            <button form='create-book-form' type="submit" className='bg-black text-white text-sm font-medium px-3 py-2 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
              {book.id ? 'Editar' : 'Adicionar'} livro
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {isOpenSuccessDialog && (
        <Modal className='text-center'>
          <Modal.Body>
            <div className='flex justify-center mb-4'>
              <CircleCheck stroke='#00c950' strokeWidth={2} size={100} />
            </div>

            <h2 className='text-lg font-bold'>{successMessage}</h2>
            <p className='text-sm text-zinc-500'>{successDescription}</p>
            <button onClick={() => setIsOpenSuccessDialog(false)} className='mt-4 bg-black text-white text-sm font-medium px-3 py-2 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
              Fechar
            </button>
          </Modal.Body>
        </Modal>
      )}

      {isOpenErrorDialog && (
        <Modal className='text-center'>
          <Modal.Body>
            <div className='flex justify-center mb-4'>
              <CircleX stroke='#fb2c36' strokeWidth={2} size={100} />
            </div>

            <h2 className='text-lg font-bold'>{errorMessage}</h2>
            <p className='text-sm text-zinc-500'>{errorDescription}</p>
            <button onClick={() => setIsOpenErrorDialog(false)} className='mt-4 bg-black text-white text-sm font-medium px-3 py-2 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
              Fechar
            </button>
          </Modal.Body>
        </Modal>
      )}

      {isOpenDeleteDialog && (
        <Modal>
          <Modal.Header>
            <Modal.Title>Remover o livro {book.title}</Modal.Title>
            <Modal.Description>Tem certeza que deseja remover o livro {book.title}? Esta ação é irreversível!</Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <button onClick={() => setIsOpenDeleteDialog(false)} className='border border-zinc-200 text-zinc-700 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-200 hover:text-zinc-700 transition-colors hover:cursor-pointer'>
              Cancelar
            </button>
            <button onClick={() => deleteBook(book.id)} className='bg-black text-white text-sm font-medium px-3 py-2 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
              Remover livro
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {isOpenViewDialog && (
        <Modal>
          <Modal.Header>
            <Modal.Title>Livro {book.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="grid gap-3 mt-4">
              <div className='grid grid-cols-2 gap-2'>
                <div className='text-sm'>
                  <label className='font-medium text-zinc-500'>Autor(a)</label>
                  <p>{book.author}</p>
                </div>

                <div className='text-sm'>
                  <label className='font-medium text-zinc-500'>Gênero</label>
                  <p>{book.genre}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className='text-sm'>
                  <label className='font-medium text-zinc-500'>Páginas</label>
                  <p>{book.pages}</p>
                </div>

                <div className='text-sm'>
                  <label className='font-medium text-zinc-500'>Página atual</label>
                  <p>{book.currentPage}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className='text-sm'>
                  <label className='mb-2 block font-medium text-zinc-500'>Status</label>
                  <span className={`${StatusColors[Number(book.status)]} px-2 py-1 rounded`}>{Status[Number(book.status)]}</span>
                </div>

                <div className='text-sm'>
                  <label className='font-medium text-zinc-500'>Avaliação</label>
                  <div className='flex gap-1 mt-2'>
                    {[1, 2, 3, 4, 5].map((ratingNumber) => (
                      <Star
                        key={ratingNumber}
                        strokeWidth={1.5}
                        fill={ratingNumber <= book.rating ? 'black' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setIsOpenViewDialog(false)} className='mt-4 bg-black text-white text-sm font-medium px-3 py-2 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
              Fechar
            </button>
          </Modal.Footer>
        </Modal>
      )}

      <header className='flex justify-between items-center flex-wrap gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Gerenciador de Livros</h1>
          <p className='text-zinc-500'>Gerencie sua coleção de livros</p>
        </div>
        <div>
          <button onClick={() => openCreateBookDialog()} className='flex gap-2 items-center bg-black text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-zinc-800 transition-colors hover:cursor-pointer'>
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
        <p className='text-sm text-zinc-500'>{books.length} livros em sua coleção</p>

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
                {books.length === 0 ? (
                  <tr className='border-b border-zinc-200 hover:bg-zinc-100 transition-colors'>
                    <td colSpan={8} className='p-4 text-center'>Nenhum livro registrado</td>
                  </tr>
                ) : (
                  books.map(book => (
                    <tr key={book.id} className='border-b border-zinc-200 hover:bg-zinc-100 transition-colors'>
                      <td className='p-4'>{book.title}</td>
                      <td className='p-4'>{book.author}</td>
                      <td className='p-4'>{book.genre}</td>
                      <td className='p-4'>{book.pages}</td>
                      <td className='p-4'>{book.currentPage}</td>
                      <td className='p-4'>
                        <span className={`p-2 rounded-md text-xs ${StatusColors[Number(book.status)]}`}>{Status[Number(book.status)]}</span>
                      </td>
                      <td className='p-4'>
                        <div className='flex gap-1'>
                          {[1, 2, 3, 4, 5].map((ratingNumber) => (
                            <Star
                              key={ratingNumber}
                              size={20}
                              strokeWidth={1.5}
                              fill={ratingNumber <= book.rating ? 'black' : 'none'}
                            />
                          ))}
                        </div>
                      </td>
                      <td className='p-4 flex justify-end gap-2'>
                        <button onClick={() => {
                          setBook(book);
                          setIsOpenViewDialog(true);
                        }} className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
                          <Eye size={17}/>
                        </button>
                        <button onClick={() => findBook(book.id)} className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
                          <Pencil size={17}/>
                        </button>
                        <button
                          onClick={() => {
                            setBook(book);
                            setIsOpenDeleteDialog(true);
                          }}
                          className='p-2 rounded-md hover:bg-zinc-200 hover:cursor-pointer transition-colors'>
                          <Trash size={17}/>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
