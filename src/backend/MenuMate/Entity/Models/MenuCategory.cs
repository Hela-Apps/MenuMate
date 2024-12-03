using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Models
{
    public class MenuCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public ICollection<Item> Items { get; set; }
    }
}
