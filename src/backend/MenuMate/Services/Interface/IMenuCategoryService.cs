using Entity.Models;
using Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IMenuCategoryService
    {
        Task<MenuCategory> Add(MenuCategory menuCategory);
        Task<MenuCategory> Get(int id);
        Task<MenuCategory> Update(MenuCategory menuCategory);
        Task<IEnumerable<MenuCategory>> GetAll();
        Task<MenuCardVM> GetMenuCard();
        Task<int> GetLastId();
    }
}
