namespace RentACarApp.Dtos
{
    public class RentedCarDto
    {
        public int Id { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public decimal Price { get; set; }

        public int HorsePower{ get; set; }

        public int Year { get; set; }

        public bool isRented { get; set; }
    }
}
