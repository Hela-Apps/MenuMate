using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.ViewModels
{
    public class MenuItemVM
    {
        public int MenuId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public List<ItemVM>? ItemList { get; set; }
    }
}
