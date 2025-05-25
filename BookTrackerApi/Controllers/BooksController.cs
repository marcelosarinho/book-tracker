using Microsoft.EntityFrameworkCore;
using BookTrackerApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookTrackerApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
	private readonly BookTrackerContext _context;

	public BooksController(BookTrackerContext context)
	{
		_context = context;
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooks()
	{
		return await _context.Books.Select(book => BookToDTO(book)).ToListAsync();
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<BookDTO>> GetBook(long id)
	{
		var book = await _context.Books.FindAsync(id);

		if (book == null)
		{
			return NotFound();
		}

		return BookToDTO(book);
	}

	[HttpPost]
	public async Task<ActionResult<BookDTO>> PostBook(BookDTO bookDTO)
	{
		var book = new Book
		{
			Title = bookDTO.Title,
			Author = bookDTO.Author,
			Genre = bookDTO.Genre,
			Pages = bookDTO.Pages,
			CurrentPage = bookDTO.CurrentPage,
			Status = bookDTO.Status,
			Rating = bookDTO.Rating
		};

		_context.Books.Add(book);
		await _context.SaveChangesAsync();

		return CreatedAtAction(nameof(GetBook), new { id = book.Id }, BookToDTO(book));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> PutBook(long id, BookDTO bookDTO)
	{
		if (id != bookDTO.Id)
		{
			return BadRequest();
		}

		var book = await _context.Books.FindAsync(id);

		if (book == null)
		{
			return NotFound();
		}

		book.Title = bookDTO.Title;
		book.Author = bookDTO.Author;
		book.Genre = bookDTO.Genre;
		book.Pages = bookDTO.Pages;
		book.CurrentPage = bookDTO.CurrentPage;
		book.Status = bookDTO.Status;
		book.Rating = bookDTO.Rating;

		try
		{
			await _context.SaveChangesAsync();
		}
		catch (DbUpdateConcurrencyException) when (!BookExists(id))
		{
			return NotFound();
		}

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteBook(long id)
	{
		var book = await _context.Books.FindAsync(id);

		if (book == null)
		{
			return NotFound();
		}

		_context.Books.Remove(book);
		await _context.SaveChangesAsync();

		return NoContent();
	}

	private bool BookExists(long id)
	{
		return _context.Books.Any(e => e.Id == id); ;
	}

	private static BookDTO BookToDTO(Book book) =>
		new BookDTO
		{
			Id = book.Id,
			Title = book.Title,
			Author = book.Author,
			Genre = book.Genre,
			Pages = book.Pages,
			CurrentPage = book.CurrentPage,
			Status = book.Status,
			Rating = book.Rating
		};
}