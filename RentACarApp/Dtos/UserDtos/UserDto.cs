using RentACarApp.Database.Models;

namespace RentACarApp.Dtos.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }


        public int RoleId { get; set; }

        public List<RentalCar> RentalCars { get; set; } = new List<RentalCar>();

        public List<Car> UserCars { get; set; } = new List<Car>();
    }
}
