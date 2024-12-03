using Entity.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Models
{
    public class Order : BaseEntity
    {
        public required string Code { get; set; }
        public OrderType Type { get; set; }
        public required OrderStatus Status { get; set; }
    }
}
