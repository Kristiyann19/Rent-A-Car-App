using FluentValidation;
using RentACarApp.Contracts;
using RentACarApp.Dtos;
using RentACarApp.Services;
using RentACarApp.Validations;

namespace RentACarApp
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRentACarServices(this IServiceCollection services)
        {
            services
                .AddScoped<ILoginService, LoginService>()
                .AddScoped<IRegisterService, RegisterService>()
                .AddScoped<ICarService, CarService>()
                .AddScoped<IAgentService, AgentService>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IValidator<RegisterDto>, RegisterValidator>();

            return services;
        }
    }
}
