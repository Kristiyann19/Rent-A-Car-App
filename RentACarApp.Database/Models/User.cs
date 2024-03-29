﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace RentACarApp.Database.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string NormalizedUserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string NormalizedEmail { get; set; }

        public string PasswordSalt { get; set; }

        public string Password { get; set; }

        public string EmailConfirmationToken { get; set; }

        public bool IsEmailConfirmed { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }

        public List<Car> UserCars { get; set; } = new List<Car>();

        public List<RentalCar> RentalCars { get; } = new List<RentalCar>();
    }

    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .Property(x => x.UserName)
                .IsRequired()
                .HasMaxLength(30);

            builder
                .Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(30);

            builder
                .Property(x => x.Password)
                .IsRequired();

            builder
                .Property(x => x.FirstName)
                .HasMaxLength(30);

            builder
                .Property(x => x.LastName)
                .HasMaxLength(30);
        }

    }

    //TEST
    //tEST2
}