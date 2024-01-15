namespace RentACarApp.Validations;
using FluentValidation;
using RentACarApp.Dtos;

public class CarValidator : AbstractValidator<CarDto>
{
    public CarValidator()
    {
        RuleFor(x => x.Make).NotEmpty().Length(2, 30);
        RuleFor(x => x.Model).NotEmpty().Length(2, 30);
        RuleFor(x => x.Price).NotEmpty();
        RuleFor(x => x.Transmission).NotEmpty();
        RuleFor(x => x.Engine).NotEmpty();
        RuleFor(x => x.Region).NotEmpty();
        RuleFor(x => x.Color).NotEmpty().MaximumLength(40);
        RuleFor(x => x.Region).NotEmpty();
        RuleFor(x => x.Description).NotEmpty().MaximumLength(5000);       
        RuleFor(x => x.CubicCapacity).NotEmpty().LessThan(10000);
        RuleFor(x => x.Year).NotEmpty().GreaterThan(1930).LessThan(DateTime.Now.Year);
    }
}
