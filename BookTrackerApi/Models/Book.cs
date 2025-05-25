using BookTrackerApi.Enums;

namespace BookTrackerApi.Models
{
  public class Book
  {
    public long Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Genre { get; set; }
    public int Pages { get; set; }
    public int CurrentPage { get; set; }
    public ReadingStatus Status { get; set; } = ReadingStatus.ToRead;
    public int? Rating { get; set; }
    public string? Secret { get; set; }
  }
}