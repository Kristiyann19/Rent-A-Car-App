using RentACarApp.Database.Enums;
using RentACarApp.Database.Models;

namespace RentACarApp.Dtos.CarDtos
{
    public class AllCarsDto
    {
        public int Id { get; set; }
        public string Make { get; set; }

        public string Model { get; set; }

        public decimal Price { get; set; }

        public RegionEnum Region { get; set; }

        public bool IsRented { get; set; }

        public List<IFormFile> ImageFiles { get; set; }

        public List<Image> Images { get; set; } = new List<Image>();

    }
}
