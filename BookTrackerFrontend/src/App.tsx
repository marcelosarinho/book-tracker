import { BookOpen, CircleCheck, CircleX, Eye, Pencil, Plus, Star, Trash } from 'lucide-react';
import './style.css';
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import { Button, IconButton } from '../components/Button';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';

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

type Dialogs = {
  create: boolean;
  success: boolean;
  error: boolean;
  delete: boolean;
  view: boolean;
}

type Errors = {
  title?: string[];
  author?: string[];
  genre?: string[];
  pages?: string[];
  currentPage?: string[];
  status?: string[];
  rating?: string[];
}

const Status: { [key: number]: string } = {
  0: 'Para ler',
  1: 'Lendo',
  2: 'Finalizado'
}

const StatusColors: { [key: number]: string } = {
  0: 'zinc',
  1: 'blue',
  2: 'green'
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
  const [dialogs, setDialogs] = useState<Dialogs>({
    create: false,
    success: false,
    error: false,
    delete: false,
    view: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [successDescription, setSuccessDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  async function fetchBooks() {
    const response = await fetch('http://localhost:5040/api/books');
    const data = await response.json();
    setBooks(data);
  }

  function openDialog(dialog: keyof Dialogs) {
    setDialogs((prevDialogs) => ({
      ...prevDialogs,
      [dialog]: true,
    }))
  }

  function closeDialog(dialog: keyof Dialogs) {
    setDialogs((prevDialogs) => ({
      ...prevDialogs,
      [dialog]: false,
    }))
  }

  async function findBook(id: number) {
    const response = await fetch(`http://localhost:5040/api/books/${id}`);
    const data = await response.json();

    setBook(data);
    openDialog('create');
  }

  function openCreateBookDialog() {
    openDialog('create');
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

    if (name === 'status' && value === '2') {
      setBook((book) => ({
        ...book,
        currentPage: book.pages,
        [name]: value,
      }))

      return;
    }

    if (name === 'status' && value === '0') {
      setBook((book) => ({
        ...book,
        currentPage: 0,
        [name]: value,
      }))

      return;
    }

    setBook((book) => ({
      ...book,
      [name]: value,
    }))
  }

  function validateInputs() {
    setErrors({});
    let valid = true;

    if (book.title.trim() === '') {
      valid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: (prevErrors.title ?? []).concat('O campo Livro é obrigatório!'),
      }))
    }

    if (book.author.trim() === '') {
      valid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        author: (prevErrors.author ?? []).concat('O campo Autor(a) é obrigatório!'),
      }))
    }

    if (book.genre.trim() === '') {
      valid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        genre: (prevErrors.genre ?? []).concat('O campo Gênero é obrigatório!'),
      }))
    }

    if (book.pages <= 0) {
      valid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        pages: (prevErrors.pages ?? []).concat('Número de páginas deve ser maior que 0!'),
      }))
    }

    if (book.currentPage > book.pages) {
      valid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        currentPage: (prevErrors.currentPage ?? []).concat('Página atual deve ser menor ou igual ao número de páginas!'),
      }))
    }

    return valid;
  }

  async function handleSubmitBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateInputs();

    if (!valid) {
      return;
    }

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

      setSuccessMessage('Livro ' + (book.id ? 'editado' : 'adicionado') + ' com sucesso!');
      setSuccessDescription('O livro ' + book.title + ' foi ' + (book.id ? 'editado' : 'adicionado') + ' na sua coleção.');
      openDialog('success');
      fetchBooks();
    } catch (error) {
      setErrorMessage('Erro ao ' + (book.id ? 'editar' : 'adicionar') + ' livro!');
      setErrorDescription('Ocorreu um erro ao ' + (book.id ? 'editar' : 'adicionar') + ' o livro ' + book.title + ' na sua coleção.');
      openDialog('error');
      console.log(error);
    } finally {
      closeDialog('create');
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

      setSuccessMessage('Livro removido com sucesso!');
      setSuccessDescription('O livro ' + book.title + ' foi removido da sua coleção.');
      openDialog('success');

      fetchBooks();
    } catch (error) {
      setErrorMessage('Erro ao remover livro!');
      setErrorDescription('Ocorreu um erro ao remover o livro ' + book.title + ' da sua coleção.');
      openDialog('error');
      console.log(error);
    } finally {
      closeDialog('delete');
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className='min-h-svh lg:px-14 md:px-10 px-6 lg:py-6 md:py-4 py-2'>
      {dialogs.create && (
        <Modal className='animate-in'>
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
                    <Input errors={errors.title} type='text' placeholder='Digite o nome do livro' id='title' name='title' value={book.title} onChange={handleChangeInput} className='mt-2' />
                  </div>
                  <div>
                    <Label htmlFor="author">Autor(a)</Label>
                    <Input errors={errors.author} type='text' placeholder='Digite o nome do autor(a)' id='author' name='author' value={book.author} onChange={handleChangeInput} className='mt-2' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre">Gênero</Label>
                    <Input errors={errors.genre} type='text' placeholder='Digite o gênero do livro' id='genre' name='genre' value={book.genre} onChange={handleChangeInput} className='mt-2' />
                  </div>
                  <div>
                    <Label htmlFor="pages">Páginas</Label>
                    <Input errors={errors.pages} min={0} type='number' placeholder='Digite o número de páginas' id='pages' name='pages' value={book.pages} onChange={handleChangeInput} className='mt-2' />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentPage">Página atual</Label>
                    <Input errors={errors.currentPage} min={0} type='number' placeholder='Digite a página atual' id='currentPage' name='currentPage' value={book.currentPage} onChange={handleChangeInput} className='mt-2' />
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
              onClick={() => closeDialog('create')}>
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

      {dialogs.success && (
        <Modal className='animate-in text-center'>
          <Modal.Body>
            <div className='flex justify-center mb-4'>
              <CircleCheck stroke='#00c950' strokeWidth={2} size={100} />
            </div>

            <h2 className='text-lg font-bold'>{successMessage}</h2>
            <p className='text-sm text-zinc-500'>{successDescription}</p>
            <Button
              className='mt-3'
              variant='primary'
              size='small'
              onClick={() => closeDialog('success')}>
              Fechar
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {dialogs.error && (
        <Modal className='animate-in text-center'>
          <Modal.Body>
            <div className='flex justify-center mb-4'>
              <CircleX stroke='#fb2c36' strokeWidth={2} size={100} />
            </div>

            <h2 className='text-lg font-bold'>{errorMessage}</h2>
            <p className='text-sm text-zinc-500'>{errorDescription}</p>
            <Button
              variant='primary'
              size='small'
              onClick={() => closeDialog('error')}>
              Fechar
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {dialogs.delete && (
        <Modal className='animate-in'>
          <Modal.Header>
            <Modal.Title>Remover o livro {book.title}</Modal.Title>
            <Modal.Description>Tem certeza que deseja remover o livro {book.title}? Esta ação é irreversível!</Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant='outlined'
              size='small'
              onClick={() => closeDialog('delete')}>
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

      {dialogs.view && (
        <Modal className='animate-in'>
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
                  <Label className='text-zinc-500 mb-2' htmlFor='status'>Status</Label>
                  <Badge color={StatusColors[Number(book.status)]}>{Status[Number(book.status)]}</Badge>
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
              onClick={() => closeDialog('view')}>
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

      <Card className='mt-6'>
        <span className='flex items-center gap-2 flex-wrap'>
          <BookOpen size={20} />
          <h1 className='text-2xl font-semibold'>Coleção de livros</h1>
        </span>
        <p className='text-sm text-zinc-500'>{books.length} livros em sua coleção</p>

        <div className='mt-6'>
          <div className='overflow-auto rounded-md border border-zinc-200'>
            <Table>
              <Table.Head>
                <Table.Row className='text-sm text-zinc-500'>
                  <Table.HeadCell className='text-left'>Nome</Table.HeadCell>
                  <Table.HeadCell className='text-left'>Autor(a)</Table.HeadCell>
                  <Table.HeadCell className='text-left'>Gênero</Table.HeadCell>
                  <Table.HeadCell className='text-left'>Páginas</Table.HeadCell>
                  <Table.HeadCell className='text-left'>Página atual</Table.HeadCell>
                  <Table.HeadCell className='text-left'>Status</Table.HeadCell>
                  <Table.HeadCell className='text-left'>Avaliação</Table.HeadCell>
                  <Table.HeadCell className='text-right'>Ações</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body className='text-sm font-medium'>
                {books.length === 0 ? (
                  <Table.Row>
                    <Table.Data colSpan={8} className='p-4 text-center'>Nenhum livro registrado</Table.Data>
                  </Table.Row>
                ) : (
                  books.map(book => (
                    <Table.Row key={book.id}>
                      <Table.Data>{book.title}</Table.Data>
                      <Table.Data>{book.author}</Table.Data>
                      <Table.Data>{book.genre}</Table.Data>
                      <Table.Data>{book.pages}</Table.Data>
                      <Table.Data>{book.currentPage}</Table.Data>
                      <Table.Data>
                        <Badge color={StatusColors[Number(book.status)]}>{Status[Number(book.status)]}</Badge>
                      </Table.Data>
                      <Table.Data>
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
                      </Table.Data>
                      <Table.Data className='flex justify-end gap-2'>
                        <IconButton onClick={() => {
                          setBook(book);
                          openDialog('view');
                        }}>
                          <Eye size={17}/>
                        </IconButton>
                        <IconButton onClick={() => findBook(book.id)}>
                          <Pencil size={17}/>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setBook(book);
                            openDialog('delete');
                          }}>
                          <Trash size={17}/>
                        </IconButton>
                      </Table.Data>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </Card>
    </main>
  )
}

export default App
