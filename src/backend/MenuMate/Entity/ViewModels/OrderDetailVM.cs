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
    public class OrderDetailVM:IMapBoth<OrderDetail>
    {
        public int? Id { get; set; }
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public string? ItemName { get; set; }
        public int Qty { get; set; }
        public ItemStatus Status { get; set; }
    }

    public class OrderDetailValidator : AbstractValidator<OrderDetail>
    {
        public OrderDetailValidator()
        {
            RuleFor(x => x.OrderId).NotEmpty().WithMessage("OrderId is required.");
            RuleFor(x => x.Qty).NotEqual(0) .WithMessage("Value must not be 0.");
            RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required.");

        }
    }
}
