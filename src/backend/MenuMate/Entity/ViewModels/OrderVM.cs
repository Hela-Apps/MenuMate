using Entity.Enums;
using Entity.Mappings;
using Entity.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.ViewModels
{
    public class OrderVM:IMapBoth<Order>
    {
        public int? Id { get; set; }
        public required string Code { get; set; }
        public OrderType Type { get; set; }
        public required OrderStatus Status { get; set; }
    }

    public class OrderValidator : AbstractValidator<Order>
    {
        public OrderValidator()
        {
            RuleFor(x => x.Code).NotEmpty().WithMessage("Order Code is required.");
            RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required.");

        }
    }
}
