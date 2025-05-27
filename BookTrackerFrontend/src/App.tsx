import { BookOpen, CircleCheck, CircleX, Eye, Pencil, Plus, Star, Trash } from 'lucide-react';
import './style.css';
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import { Button, IconButton } from '../components/Button';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

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
                    <Label htmlFor="title">Livro</Label>
                    <Input type='text' placeholder='Digite o nome do livro' id='title' name='title' value={book.title} onChange={handleChangeInput} className='mt-2' />
                  </div>
                  <div>
                    <Label htmlFor="author">Autor(a)</Label>
                    <Input type='text' placeholder='Digite o nome do autor(a)' id='author' name='author' value={book.author} onChange={handleChangeInput} className='mt-2' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre">Gênero</Label>
                    <Input type='text' placeholder='Digite o gênero do livro' id='genre' name='genre' value={book.genre} onChange={handleChangeInput} className='mt-2' />
                  </div>
                  <div>
                    <Label htmlFor="pages">Páginas</Label>
                    <Input type='number' placeholder='Digite o número de páginas' id='pages' name='pages' value={book.pages} onChange={handleChangeInput} className='mt-2' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentPage">Página atual</Label>
                    <Input type='number' placeholder='Digite a página atual' id='currentPage' name='currentPage' value={book.currentPage} onChange={handleChangeInput} className='mt-2' />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select id='status' name="status" value={book.status} onChange={handleChangeInput} className='mt-2'>
                      <option value="0">Para ler</option>
                      <option value="1">Lendo</option>
                      <option value="2">Finalizado</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Avaliação</Label>
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
                    <Input
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
            <Button
              variant='outlined'
              size='small'
              type="button"
              onClick={() => setIsOpenCreateDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant='primary'
              size='small'
              form='create-book-form'
              type="submit">
              {book.id ? 'Editar' : 'Adicionar'} livro
            </Button>
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
            <Button
              variant='primary'
              size='small'
              onClick={() => setIsOpenSuccessDialog(false)}>
              Fechar
            </Button>
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
            <Button
              variant='primary'
              size='small'
              onClick={() => setIsOpenErrorDialog(false)}>
              Fechar
            </Button>
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
            <Button
              variant='outlined'
              size='small'
              onClick={() => setIsOpenDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant='primary'
              size='small'
              onClick={() => deleteBook(book.id)}>
              Remover livro
            </Button>
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
                  <Label className='text-zinc-500' htmlFor='author'>Autor(a)</Label>
                  <p>{book.author}</p>
                </div>

                <div className='text-sm'>
                  <Label className='text-zinc-500' htmlFor='genre'>Gênero</Label>
                  <p>{book.genre}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className='text-sm'>
                  <Label className='text-zinc-500' htmlFor='pages'>Páginas</Label>
                  <p>{book.pages}</p>
                </div>

                <div className='text-sm'>
                  <Label className='text-zinc-500' htmlFor='currentPage'>Página atual</Label>
                  <p>{book.currentPage}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className='text-sm'>
                  <Label className='text-zinc-500' htmlFor='status'>Status</Label>
                  <span className={`${StatusColors[Number(book.status)]} px-2 py-1 rounded`}>{Status[Number(book.status)]}</span>
                </div>

                <div className='text-sm'>
                  <Label className='text-zinc-500' htmlFor='rating'>Avaliação</Label>
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
            <Button
              variant='primary'
              size='small'
              onClick={() => setIsOpenViewDialog(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <header className='flex justify-between items-center flex-wrap gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Gerenciador de Livros</h1>
          <p className='text-zinc-500'>Gerencie sua coleção de livros</p>
        </div>
        <div>
          <Button onClick={() => openCreateBookDialog()} className='flex gap-2 items-center'>
            <Plus strokeWidth={1.5} size={18} />
            Adicionar livro
          </Button>
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
                        <IconButton onClick={() => {
                          setBook(book);
                          setIsOpenViewDialog(true);
                        }}>
                          <Eye size={17}/>
                        </IconButton>
                        <IconButton onClick={() => findBook(book.id)}>
                          <Pencil size={17}/>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setBook(book);
                            setIsOpenDeleteDialog(true);
                          }}>
                          <Trash size={17}/>
                        </IconButton>
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
