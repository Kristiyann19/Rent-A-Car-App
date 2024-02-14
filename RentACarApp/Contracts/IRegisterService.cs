using RentACarApp.Dtos.UserDtos;

namespace RentACarApp.Contracts
{
    public interface IRegisterService
    {
        void Register(RegisterDto register);

        public bool CheckUserNameAvailability(string userName);
    }
}
