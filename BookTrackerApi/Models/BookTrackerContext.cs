using Microsoft.EntityFrameworkCore;

namespace BookTrackerApi.Models

{
  public class BookTrackerContext : DbContext
  {
    public BookTrackerContext(DbContextOptions<BookTrackerContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; } = null!;
  }
}