namespace RentACarApp.Validations;
using FluentValidation;
using RentACarApp.Dtos;

public class AgentValidator : AbstractValidator<AgentDto>
{
    public AgentValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().Length(2, 30);
        RuleFor(x => x.LastName).NotEmpty().Length(2, 30);
        RuleFor(x => x.PhoneNumber).NotEmpty().Matches("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
    }
}
