using BookTrackerApi.Enums;

namespace BookTrackerApi.Models
{
  public class BookDTO
  {
    public long Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Genre { get; set; }
    public int Pages { get; set; }
    public int CurrentPage { get; set; }
    public ReadingStatus Status { get; set; } = ReadingStatus.ToRead;
    public int? Rating { get; set; }
  }
}