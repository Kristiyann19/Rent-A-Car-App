namespace RentACarApp.Validations;
using FluentValidation;
using RentACarApp.Dtos.UserDtos;

public class RegisterValidator : AbstractValidator<RegisterDto>
{
    public RegisterValidator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty()
            .Length(2, 30);

        RuleFor(x => x.Email)
            .EmailAddress()
            .NotNull()
            .Length(2, 30);

        RuleFor(x => x.Password)
            .NotEmpty()
            .Length(6, 30);

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty()
            .Length(6, 30);
    }
}
