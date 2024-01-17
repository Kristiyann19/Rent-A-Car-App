using RentACarApp.Database.Enums;

namespace RentACarApp.Dtos
{
    public class SearchCarDto
    { 
        public string Make { get; set; }

        public string Model { get; set; }

        public decimal Price { get; set; }

        public int Year { get; set; }

        public int HorsePower { get; set; }

        public string Color { get; set; }

        public int CubicCapacity { get; set; }

        public int Mileage { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public EngineEnum? Engine { get; set; }

        public TransmissionEnum? Transmission { get; set; }

        public RegionEnum? Region { get; set; }

        public CategoryEnum? Category { get; set; }
    }
}
