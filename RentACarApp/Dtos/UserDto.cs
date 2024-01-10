using RentACarApp.Database.Models;

namespace RentACarApp.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public int RoleId { get; set; }

        public List<RentalCar> RentalCars { get; set; } = new List<RentalCar>();
    }
}
