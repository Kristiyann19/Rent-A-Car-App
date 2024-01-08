namespace RentACarApp.Database.Models
{
    public class Image
    {
        public int Id { get; set; }
        public byte[] Bytes { get; set; }
        public string Description { get; set; }
        public string FileExtension { get; set; }
        public decimal Size { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
    }
}
