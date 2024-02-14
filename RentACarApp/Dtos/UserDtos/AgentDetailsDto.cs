using RentACarApp.Database.Models;

namespace RentACarApp.Dtos.UserDtos
{
    public class AgentDetailsDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public int RoleId { get; set; }

        public List<Car> UserCar { get; set; } = new List<Car>();
    }
}
