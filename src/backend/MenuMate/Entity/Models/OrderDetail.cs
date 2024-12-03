using Entity.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Models
{
    public class OrderDetail : BaseEntity
    {
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public int Qty { get; set; }
        public ItemStatus Status { get; set; }
    }
}
