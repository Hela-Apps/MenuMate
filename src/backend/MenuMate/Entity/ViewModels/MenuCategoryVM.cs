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
    public class MenuCategoryVM:IMapBoth<MenuCategory>
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
    }

    public class MenuCategoryValidator : AbstractValidator<MenuCategory>
    {
        public MenuCategoryValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
            RuleFor(x => x.Code).NotEmpty().WithMessage("Code is required.");
            RuleFor(x => x.Active).NotEmpty().WithMessage("Active is required.");

        }
    }
}
