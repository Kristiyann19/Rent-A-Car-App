using Microsoft.AspNetCore.Identity;
using RentACarApp.Database.Models;
using RentACarApp.Dtos;
using RentACarApp.Services;

namespace RentACarApp.Contracts
{
    public interface IRegisterService
    {
        void Register(RegisterDto register);
    }
}
