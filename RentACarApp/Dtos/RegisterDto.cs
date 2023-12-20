using System.ComponentModel.DataAnnotations;

namespace RentACarApp.Dtos
{
    public class RegisterDto
    {

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        [Compare(nameof(Password))]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; } = null!;

    }
}
